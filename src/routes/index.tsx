import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import PageTransition from "@/components/PageTransition";
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

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socials = [
  { key: "facebook", href: BRAND.social.facebook, label: "Facebook", Icon: Facebook },
  { key: "instagram", href: BRAND.social.instagram, label: "Instagram", Icon: Instagram },
  { key: "tiktok", href: BRAND.social.tiktok, label: "TikTok", Icon: TikTokIcon },
].filter((s) => s.href);

function Index() {
  return (
    <PageTransition>
      <main className="transition-theme min-h-screen overflow-hidden bg-background">
        <HeroSection />
        <CategoriesSection />

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gold/20 bg-gradient-to-t from-secondary/50 to-background px-4 py-12"
          dir="rtl"
        >
          <div className="container mx-auto">
            {socials.length > 0 && (
              <div className="mb-8 flex items-center justify-center gap-6">
                {socials.map(({ key, href, label, Icon }) => (
                  <motion.a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            )}

            <div className="mb-6 flex items-center justify-center gap-6">
              <div className="h-px max-w-32 flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <div className="h-2 w-2 rounded-full bg-gold" />
              <div className="h-px max-w-32 flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <div className="space-y-3 text-center">
              <h2 className="gradient-text font-serif text-2xl font-bold tracking-[0.2em]">
                {BRAND.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {BRAND.name}. جميع الحقوق محفوظة
              </p>
            </div>
          </div>
        </motion.footer>
      </main>
    </PageTransition>
  );
}
