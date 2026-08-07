import { createFileRoute, Outlet, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Layers,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BRAND } from "@/config/brand";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: `لوحة التحكم — ${BRAND.name}` },
      { name: "description", content: `إدارة الطلبات والمنتجات في ${BRAND.name}.` },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: `لوحة التحكم — ${BRAND.name}` },
      { property: "og:description", content: `إدارة الطلبات والمنتجات في ${BRAND.name}.` },
    ],
  }),
  component: DashboardLayout,
});

const menuItems = [
  { path: "/dashboard/orders", icon: ShoppingCart, label: "الطلبات" },
  { path: "/dashboard/products", icon: Package, label: "المنتجات" },
  { path: "/dashboard/categories", icon: Layers, label: "الأصناف" },
  { path: "/dashboard/delivery", icon: Truck, label: "التوصيل" },
  { path: "/dashboard/stats", icon: BarChart3, label: "الإحصائيات" },
  { path: "/dashboard/settings", icon: Settings, label: "الإعدادات" },
] as const;

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    void navigate({ to: "/admin", replace: true });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="sticky top-0 z-50 border-b border-gold/20 bg-card/90 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={BRAND.logo}
              alt={`${BRAND.name} logo`}
              className="h-9 w-9 rounded-full border border-gold/30 object-cover"
            />
            <h1 className="font-serif text-xl font-bold">لوحة التحكم</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild aria-label="المتجر">
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="تسجيل الخروج">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-57px)] w-64 border-l border-gold/15 bg-card md:block">
          <nav className="space-y-2 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  location.pathname === item.path
                    ? "bg-gold text-primary-foreground shadow-md"
                    : "hover:bg-secondary"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gold/20 bg-card md:hidden">
          <div className="flex justify-around py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${
                  location.pathname === item.path
                    ? "bg-gold/15 text-gold"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <main className="flex-1 p-4 pb-24 md:p-6 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
