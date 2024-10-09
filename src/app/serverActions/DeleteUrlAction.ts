"use server";
import { UrlShortenerService } from "@/services/UrlShortenerService";
import { revalidatePath } from "next/cache";

export const deleteUrl = async (id: string) => {
  const shortenerService = new UrlShortenerService();
  await shortenerService.deleteUrlById(id);
  revalidatePath("/");
};
