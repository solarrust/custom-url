import { UrlShortenerService } from "@/services/UrlShortenerService";

export const revalidate = 60;
export const dynamic = "force-dynamic";

const fetchUrls = async () => {
  const shortenerService = new UrlShortenerService();
  const urls = await shortenerService.getAllUrls();
  return urls;
};

export async function GET() {
  const urls = await fetchUrls();
  const response = Response.json({ urls });
  response.headers.set("Cache-control", "no-store");

  return response;
}
