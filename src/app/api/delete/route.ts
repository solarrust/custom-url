import { UrlShortenerService } from "@/services/UrlShortenerService";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const shortenerService = new UrlShortenerService();
  const response = await shortenerService.getUrlById(id);
  await shortenerService.deleteUrlById(id);
  return Response.json(
    { message: `Delete ${response?.originalUrl}` },
    { status: 200 }
  );
}
