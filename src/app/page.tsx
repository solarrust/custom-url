import Footer from "./components/Footer";
import Form from "./components/Form";
import UrlsList from "./components/UrlsList";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string; filter?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "";

  return (
    <>
      <div className="p-8 max-w-screen-xl w-4/5 font-sans prose mx-auto">
        <h1 className="text-center mt-16">Custom URL 😎</h1>
        <Form />

        <UrlsList query={query} filter={filter} />
      </div>
      <Footer />
    </>
  );
}
