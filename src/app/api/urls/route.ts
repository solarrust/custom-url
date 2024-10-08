import { UrlShortenerService } from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";

const fetchUrls = async () => {
  const shortenerService = new UrlShortenerService();
  const urls = await shortenerService.getAllUrls();
  return urls;
};

export async function GET() {
  const urls = await fetchUrls();
  const response = NextResponse.json({ urls });
  response.headers.set(
    "Cache-control",
    "private, max-age=10, s-maxage=10, stale-while-revalidate=10"
  );

  return response;
}
