import CopyButton from "../components/CopyButton";
import DeleteButton from "../components/DeleteButton";
import ErrorAlert from "./ErrorAlert";

async function fetchUrls() {
  const response = await fetch(`${process.env.BASE_URL}/api/urls`);

  if (!response.ok) {
    throw new Error("Failed to fetch urls");
  }

  return response.json();
}

export default async function UrlsList() {
  let urls = null;
  let error: Error | null = null;

  try {
    urls = await fetchUrls();
  } catch (err) {
    error = err as Error;
  }

  return (
    <>
      <h2 className="text-center">All custom URLs</h2>

      {error ? (
        <ErrorAlert error={error} />
      ) : (
        <table className="table max-w-full table-pin-rows">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Custom URL</th>
              <th className="text-end">Visits</th>
            </tr>
          </thead>
          <tbody>
            {urls.urls &&
              urls.urls
                .toReversed()
                .map(
                  (url: {
                    _id: string;
                    originalUrl: string;
                    shortUrl: string;
                    visits: number;
                  }) => (
                    <tr key={url._id}>
                      <td>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={url.originalUrl}
                        >
                          <a
                            href={`${url.originalUrl}`}
                            target="_blank"
                            className="underline-offset-4"
                          >
                            {url.originalUrl.slice(0, 55).concat("...")}
                          </a>
                        </div>
                      </td>
                      <td className="flex gap-x-2 items-end">
                        <a
                          href={`${url.shortUrl}`}
                          target="_blank"
                          className="link link-primary underline-offset-4"
                        >
                          {`${process.env.BASE_URL}${url.shortUrl}`}
                        </a>
                        <CopyButton
                          url={`${process.env.BASE_URL}${url.shortUrl}`}
                        />
                        <DeleteButton id={url._id} />
                      </td>
                      <td className="text-end font-bold">{url.visits}</td>
                    </tr>
                  )
                )}
          </tbody>
        </table>
      )}
    </>
  );
}
