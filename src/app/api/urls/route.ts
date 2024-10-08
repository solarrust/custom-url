import { UrlShortenerService } from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";
// import { cache } from "react";

const fetchUrls = async () => {
  const shortenerService = new UrlShortenerService();
  const urls = await shortenerService.getAllUrls();
  return urls;
};

export async function GET() {
  const urls = await fetchUrls();
  const response = NextResponse.json({ urls });
  // response.headers.set(
  //   "Cache-control",
  //   "public, max-age=200, s-maxage=200, stale-while-revalidate=59"
  // );

  return response;
}
