import Link from "next/link";

async function fetchUrls() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch urls");
  }

  return response.json();
}

export default async function UrlList() {
  let urls;

  try {
    urls = await fetchUrls();
  } catch (error) {
    return <div className="error">{(error as Error).message}</div>;
  }

  return (
    <div>
      <h1>All short URLs</h1>
      <Link href="/">Home</Link>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicked</th>
          </tr>
        </thead>
        <tbody>
          {urls.urls &&
            urls.urls.map(
              (url: {
                _id: string;
                originalUrl: string;
                shortUrl: string;
                clicked: number;
              }) => (
                <tr key={url._id}>
                  <td>
                    <a href={`${url.originalUrl}`} target="_blank">
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>
                    <a href={`/${url.shortUrl}`} target="_blank">
                      {`${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortUrl}`}
                    </a>
                  </td>
                  <td>0</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
