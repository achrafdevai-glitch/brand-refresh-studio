import { useQuery } from "@tanstack/react-query";
import { createSignedUrl, extractStoragePath } from "@/lib/media";

/**
 * Resolves any stored media reference to a URL the browser can load.
 * - Storage objects (private bucket) -> cached signed URL
 * - Everything else (CDN assets, absolute URLs) -> returned as-is
 */
export function useMediaUrl(source: string | null | undefined): string | undefined {
  const path = extractStoragePath(source);

  const { data } = useQuery({
    queryKey: ["media-url", path],
    queryFn: () => createSignedUrl(path as string),
    enabled: !!path,
    staleTime: 45 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });

  if (!source) return undefined;
  if (!path) return source;
  return data ?? undefined;
}
