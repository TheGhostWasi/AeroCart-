/**
 * Utility to optimize image URLs for performance.
 * Specifically handles Unsplash URLs by adding CDN parameters for format, quality, and sizing.
 */
export function getOptimizedImageUrl(url: string, width: number = 600): string {
  if (!url) return "";

  // Handle Unsplash URLs
  if (url.includes("images.unsplash.com")) {
    const baseUrl = url.split("?")[0];
    const params = new URLSearchParams();
    
    params.set("auto", "format");
    params.set("q", "80");
    params.set("w", width.toString());
    params.set("fit", "crop");
    params.set("fm", "webp"); // Enforce WebP format

    return `${baseUrl}?${params.toString()}`;
  }

  // Handle local paths or other external URLs
  return url;
}
