import CopyButton from "../components/CopyButton";
import DeleteButton from "../components/DeleteButton";
import ErrorAlert from "./ErrorAlert";
import Search from "./Search";
import TableFilter from "./TableFilter";

async function fetchFilteredUrls(query: string, filter: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/urls`);

  if (!response.ok) {
    throw new Error("Failed to fetch urls");
  }

  const data = await response.json();

  if (query === "" && filter === "") return data.urls;

  let filteredUrls = data.urls;

  if (filter) {
    filteredUrls = data.urls.sort((a: any, b: any) =>
      filter === `visits-asc` ? a.visits - b.visits : b.visits - a.visits
    );
  }

  if (query) {
    filteredUrls = data.urls.filter(
      (url: { originalUrl: string; shortUrl: string }) =>
        url.originalUrl.includes(query) || url.shortUrl.includes(query)
    );
  }

  return filteredUrls;
}

function showOriginalUrl(url: string) {
  if (url.length <= 65) {
    return url;
  }

  return url.slice(0, 55).concat("...");
}

export default async function UrlsList({
  query,
  filter,
}: {
  query: string;
  filter: string;
}) {
  let urls = null;
  let error: Error | null = null;

  try {
    urls = await fetchFilteredUrls(query.toLowerCase(), filter);
  } catch (err) {
    error = err as Error;
  }

  return (
    <>
      <h2 className="text-center mt-16">All custom URLs</h2>

      <div className="flex justify-end">
        <Search placeholder="Search by URL" />
      </div>

      {error ? (
        <ErrorAlert error={error} />
      ) : (
        <table className="table max-w-full table-pin-rows text-lg">
          <thead className="max-sm:hidden">
            <tr>
              <th>Original URL</th>
              <th className="text-center">Custom URL</th>
              <th className="text-center">
                <TableFilter name={"Visits"} sortParam={"visits"} />
              </th>
            </tr>
          </thead>
          <tbody>
            {urls &&
              urls
                .toReversed()
                .map(
                  (url: {
                    _id: string;
                    originalUrl: string;
                    shortUrl: string;
                    visits: number;
                  }) => (
                    <tr
                      key={url._id}
                      className="max-sm:grid max-sm:justify-items-start"
                    >
                      <td className="w-[40%] max-sm:max-w-full max-sm:w-full max-sm:overflow-hidden">
                        <div
                          className="sm:tooltip sm:tooltip-bottom custom-tooltip"
                          data-tip={url.originalUrl}
                        >
                          <a
                            href={`${url.originalUrl}`}
                            target="_blank"
                            className="link"
                          >
                            {showOriginalUrl(url.originalUrl)}
                          </a>
                        </div>
                      </td>
                      <td className="text-center">
                        <a
                          href={`${url.shortUrl}`}
                          target="_blank"
                          className="link link-primary"
                        >
                          {`${process.env.BASE_URL}${url.shortUrl}`}
                        </a>
                        <CopyButton
                          url={`${process.env.BASE_URL}${url.shortUrl}`}
                        />
                      </td>
                      <td className="text-center font-bold">{url.visits}</td>
                      <td className="text-end">
                        <DeleteButton id={url._id} />
                      </td>
                    </tr>
                  )
                )}
          </tbody>
        </table>
      )}
    </>
  );
}
