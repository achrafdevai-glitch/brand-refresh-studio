import { useState } from "react";
import { ImageOff } from "lucide-react";
import { useMediaUrl } from "@/hooks/useMediaUrl";
import { cn } from "@/lib/utils";

interface StorageImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** Skip lazy loading (use for above-the-fold imagery only). */
  eager?: boolean;
  fallbackClassName?: string;
}

/**
 * Image component that resolves private-storage paths to signed URLs,
 * lazy-loads by default and renders a graceful fallback when missing.
 */
export function StorageImage({
  src,
  alt,
  className,
  eager = false,
  fallbackClassName,
}: StorageImageProps) {
  const resolved = useMediaUrl(src);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted",
          fallbackClassName,
          className,
        )}
      >
        <ImageOff className="h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
      </div>
    );
  }

  if (!resolved) {
    return <div className={cn("h-full w-full animate-pulse bg-muted", className)} />;
  }

  return (
    <img
      src={resolved}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export default StorageImage;
