import UrlsList from "./components/UrlsList";
import { shortenUrl } from "./serverActions/ShortenUrlAction";

export default async function Home() {
  return (
    <>
      <h1>Customise URL</h1>
      <form action={shortenUrl}>
        <input type="text" placeholder="Enter URL" name="OriginalUrl" />
        <button type="submit">Short URL</button>
      </form>

      <UrlsList />
    </>
  );
}
