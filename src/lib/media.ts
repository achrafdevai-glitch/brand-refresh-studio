import { supabase } from "@/integrations/supabase/client";

export const MEDIA_BUCKET = "product-media";

/**
 * The storage bucket is private, so URLs saved in the database
 * (`.../object/public/product-media/<path>`) cannot be loaded directly.
 * We extract the object path and exchange it for a short-lived signed URL.
 */
export function extractStoragePath(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("blob:") || value.startsWith("data:")) return null;

  const marker = `/${MEDIA_BUCKET}/`;
  const index = value.indexOf(marker);
  if (index === -1) return null;

  const path = value.slice(index + marker.length).split("?")[0];
  return path ? decodeURIComponent(path) : null;
}

const SIGNED_URL_TTL = 60 * 60; // 1 hour

export async function createSignedUrl(path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (error) return null;
  return data?.signedUrl ?? null;
}
