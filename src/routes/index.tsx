import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import PageTransition from "@/components/PageTransition";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/config/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND.name} — ${BRAND.tagline}` },
      { name: "description", content: BRAND.description },
      { property: "og:title", content: `${BRAND.name} — ${BRAND.tagline}` },
      { property: "og:description", content: BRAND.description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageTransition>
      <main className="transition-theme min-h-screen overflow-hidden bg-background">
        <HeroSection />
        <CategoriesSection />
        <SiteFooter />
      </main>
    </PageTransition>
  );
}
