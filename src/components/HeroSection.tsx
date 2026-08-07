import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/config/brand";

const HeroSection = () => {
  const { data: settings } = useSettings();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroVideo = settings?.["hero_video"] || BRAND.heroVideo;

  const initialVideo = useRef(heroVideo);

  useEffect(() => {
    if (!videoRef.current) return;
    if (initialVideo.current === heroVideo) return;

    initialVideo.current = heroVideo;

    const video = videoRef.current;

    video.style.opacity = "0";

    const timer = setTimeout(() => {
      video.load();
      void video.play().catch(() => undefined);
      video.style.opacity = "1";
    }, 300);

    return () => clearTimeout(timer);
  }, [heroVideo]);

  const handleLogoDoubleClick = () => {
    navigate({ to: "/admin" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ pointerEvents: "none" }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          animate={{ y: [-20, 20], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-gold"
        />

        <motion.div
          animate={{ y: [20, -20], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute right-1/3 top-1/3 h-1.5 w-1.5 rounded-full bg-gold-light"
        />

        <motion.div
          animate={{ y: [-15, 15], opacity: [0.4, 0.9, 0.4] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/3 h-2 w-2 rounded-full bg-gold"
        />
      </div>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label="تبديل المظهر"
        className="glass absolute left-6 top-6 z-20 h-12 w-12 rounded-full border border-gold/40 transition-all duration-300 hover:scale-110"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-gold-light" />
        ) : (
          <Moon className="h-5 w-5 text-gold-light" />
        )}
      </Button>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Premium floating logo */}
        <motion.div
          className="group cursor-pointer select-none"
          onDoubleClick={handleLogoDoubleClick}
          title={BRAND.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [-8, 8, -8],
          }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1, ease: "easeOut" },
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="relative">
            {/* Rose gold aura */}
            <motion.div
              animate={{
                opacity: [0.35, 0.7, 0.35],
                scale: [0.95, 1.08, 0.95],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-8 rounded-full bg-gold/30 blur-3xl"
            />

            {/* Rotating halo ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-3 rounded-full border border-dashed border-gold/50"
            />

            {/* Logo */}
            <div className="relative h-44 w-44 overflow-hidden rounded-full border border-gold/30 shadow-2xl transition-transform duration-700 group-hover:scale-105 md:h-56 md:w-56 lg:h-64 lg:w-64">
              <img
                src={BRAND.logo}
                alt={`${BRAND.name} logo`}
                width={256}
                height={256}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />

              {/* Shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 animate-shimmer" />
            </div>
          </div>
        </motion.div>

        {/* Wordmark + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <h1 className="gradient-text font-serif text-4xl tracking-[0.25em] md:text-6xl">
            {BRAND.name}
          </h1>

          <p className="mt-4 text-base font-light uppercase tracking-[0.35em] text-gold-light/90 md:text-xl">
            {BRAND.tagline}
          </p>

          <div className="mx-auto mt-6 w-40 md:w-56">
            <div className="divider-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
