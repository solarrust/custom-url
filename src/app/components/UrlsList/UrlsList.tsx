import CopyButton from "../CopyButton/CopyButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import Search from "../Search/Search";
import TableFilter from "../TableFilter/TableFilter";
import RefreshButton from "../RefreshButton/RefreshButton";

async function fetchFilteredUrls(filter: string, query?: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/urls`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch urls");
  }

  const data = await response.json();

  if (filter === "" && !query) return data.urls;

  let filteredUrls = data.urls;

  if (filter) {
    filteredUrls = data.urls.sort(
      (a: { visits: number }, b: { visits: number }) =>
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
  if (url.length <= 40) {
    return url;
  }

  return url.slice(0, 40).concat("...");
}

export default async function UrlsList({
  query = "",
  filter,
}: {
  query: string;
  filter: string;
}) {
  let urls = null;
  let error: Error | null = null;

  try {
    urls = await fetchFilteredUrls(filter, query.toLowerCase());
  } catch (err) {
    error = err as Error;
  }

  return (
    <>
      <h2 className="text-center mt-16 mb-4">All custom URLs</h2>

      <div className="flex justify-between items-center mb-4">
        <RefreshButton />
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
