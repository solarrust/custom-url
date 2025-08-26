"use server";

import { revalidatePath } from "next/cache";

export async function refreshUrlsData() {
  revalidatePath("/");
  revalidatePath("/api/urls");
}
