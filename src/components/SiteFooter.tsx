import { Facebook, Instagram } from "lucide-react";
import { BRAND } from "@/config/brand";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socials = [
  { key: "facebook", href: BRAND.social.facebook, label: "Facebook", Icon: Facebook },
  { key: "instagram", href: BRAND.social.instagram, label: "Instagram", Icon: Instagram },
  { key: "tiktok", href: BRAND.social.tiktok, label: "TikTok", Icon: TikTokIcon },
];

const SiteFooter = () => {
  return (
    <footer
      className="border-t border-gold/20 bg-gradient-to-t from-secondary/50 to-background px-4 py-12"
      dir="rtl"
    >
      <div className="container mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-right">
          <img
            src={BRAND.logo}
            alt={`${BRAND.name} logo`}
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            className="h-16 w-16 rounded-full border border-gold/30 object-cover sm:h-18 sm:w-18"
          />
          <div>
            <h2 className="gradient-text font-serif text-2xl font-bold tracking-[0.2em]">
              {BRAND.name}
            </h2>
            <p className="mt-1 text-xs tracking-[0.3em] text-gold-light/80 uppercase">
              {BRAND.tagline}
            </p>
          </div>
        </div>

        <nav aria-label="روابط التواصل الاجتماعي">
          <ul className="flex items-center justify-center gap-4">
            {socials.map(({ key, href, label, Icon }) => (
              <li key={key}>
                <a
                  href={href || "#"}
                  target={href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex w-full items-center justify-center gap-6">
          <div className="h-px max-w-32 flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <div className="h-2 w-2 rounded-full bg-gold" />
          <div className="h-px max-w-32 flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {BRAND.name}. جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
