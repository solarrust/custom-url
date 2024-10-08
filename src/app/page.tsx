import { shortenUrl } from "./serverActions/ShortenUrlAction";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1>Customise URL</h1>
      <form action={shortenUrl}>
        <input type="text" placeholder="Enter URL" name="OriginalUrl" />
        <button type="submit">Short URL</button>
      </form>

      <Link href="/urls">All URLs</Link>
    </>
  );
}
