/**
 * Central brand configuration for MERMAID STORE.
 * Everything brand-related (name, tagline, links) lives here so the
 * identity can be adjusted from a single place.
 */
import logoAsset from "@/assets/logo.png.asset.json";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";

export const BRAND = {
  name: "MERMAID STORE",
  nameAr: "ميرميد ستور",
  tagline: "Elegance In Every Detail",
  taglineAr: "أناقة في كل تفصيل",
  description:
    "متجر ميرميد للأزياء والحقائب النسائية الراقية — منتجات مختارة بعناية مع توصيل لكل ولايات الوطن.",
  logo: logoAsset.url,
  heroVideo: heroVideoAsset.url,
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },
} as const;
