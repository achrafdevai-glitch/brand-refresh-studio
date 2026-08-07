import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { ensureAdminAccount } from "@/lib/admin.functions";
import { BRAND } from "@/config/brand";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: `تسجيل دخول الإدارة — ${BRAND.name}` },
      { name: "description", content: `صفحة دخول لوحة تحكم ${BRAND.name}.` },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: `تسجيل دخول الإدارة — ${BRAND.name}` },
      { property: "og:description", content: `صفحة دخول لوحة تحكم ${BRAND.name}.` },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Provisions the single admin account from server-side secrets (idempotent).
  useEffect(() => {
    void ensureAdminAccount().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!loading && isAdmin) void navigate({ to: "/dashboard/orders", replace: true });
  }, [loading, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: signInError } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (signInError) setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-4 py-12"
      dir="rtl"
    >
      <div className="section-pattern pointer-events-none absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl border border-gold/20 bg-card/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col items-center text-center">
          <motion.img
            src={BRAND.logo}
            alt={`${BRAND.name} logo`}
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="h-24 w-24 rounded-full border border-gold/30 object-cover shadow-lg"
          />
          <h1 className="gradient-text mt-5 font-serif text-3xl">لوحة التحكم</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            الدخول مخصص لإدارة {BRAND.name} فقط
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-gold" />
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="h-12 rounded-xl border-border/60 bg-secondary/30 focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4 text-gold" />
              كلمة المرور
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-12 rounded-xl border-border/60 bg-secondary/30 focus:border-gold"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-destructive/10 py-2 text-center text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="btn-luxury h-12 w-full rounded-xl text-base font-medium"
          >
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "دخول"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="mx-auto mt-6 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          العودة إلى المتجر
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </main>
  );
}
