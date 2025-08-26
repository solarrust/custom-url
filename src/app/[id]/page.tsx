import { UrlShortenerService } from "@/services/UrlShortenerService";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function fetchOriginalUrl(url: string) {
  const urlService = new UrlShortenerService();
  const response = await urlService.getUrlByShortUrl(url);
  return response?.originalUrl;
}

async function increaseVisitsCount(url: string) {
  const urlService = new UrlShortenerService();
  const urlData = await urlService.getUrlByShortUrl(url);
  const id = urlData?._id as string;

  await urlService.incrementVisitsCount(id);
  revalidatePath("/");
}

export default async function urlRedirect({
  params,
}: {
  params: { id: string };
}) {
  const original = await fetchOriginalUrl(`/${params.id}`);

  console.log({ original });

  if (original) {
    await increaseVisitsCount(`/${params.id}`);

    redirect(original);
  }

  redirect("/404");
}
