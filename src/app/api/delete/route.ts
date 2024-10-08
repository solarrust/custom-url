import { UrlShortenerService } from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const shortenerService = new UrlShortenerService();
  const response = await shortenerService.getUrlById(id);
  await shortenerService.deleteUrlById(id);
  console.log(response?.originalUrl);
  return NextResponse.json(
    { message: `Delete ${response?.originalUrl}` },
    { status: 200 }
  );
}
