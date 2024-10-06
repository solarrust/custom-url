import Link from "next/link";
import { shortenUrl } from "./serverActions/ShortenUrlAction";

export default function Home() {
  return (
    <>
      <h1>Short URL</h1>
      <form action={shortenUrl}>
        <input type="text" placeholder="Enter URL" name="OriginalUrl" />
        <button type="submit">Short URL</button>
      </form>
      <Link href="/urls">View all short URLs</Link>
    </>
  );
}
