import { UrlShortenerService } from "@/services/UrlShortenerService";

export async function POST(req: Request) {
  const { originalUrl } = await req.json();

  const shortenerService = new UrlShortenerService();
  const shortUrl = await shortenerService.shortenUrl(originalUrl);
  return Response.json({ shortUrl }, { status: 201 });
}
