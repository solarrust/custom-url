import { UrlShortenerService } from "@/services/UrlShortenerService";

export const revalidate = 0; // Always fetch fresh data
export const dynamic = "force-dynamic";

const fetchUrls = async () => {
  const shortenerService = new UrlShortenerService();
  const urls = await shortenerService.getAllUrls();
  return urls;
};

export async function GET() {
  const urls = await fetchUrls();
  const response = Response.json({ urls });
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}
