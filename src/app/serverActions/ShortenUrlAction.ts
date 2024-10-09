"use server";
import { UrlShortenerService } from "@/services/UrlShortenerService";
import { revalidatePath } from "next/cache";

export const shortenUrl = async (formData: FormData) => {
  const originalUrl: string = formData.get("OriginalUrl") as string;
  const shortPart: string = formData.get("ShortPart") as string;
  const shortenerService = new UrlShortenerService();
  await shortenerService.shortenUrl(originalUrl, shortPart);
  revalidatePath("/");
};
