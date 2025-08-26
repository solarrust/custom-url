import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import UrlsList from "./components/UrlsList/UrlsList";
import LoginButton from "./components/LoginButton/LoginButton";

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
        <div className="flex justify-between items-center mt-16 mb-8">
          <h1 className="text-center flex-1">Custom URL 😎</h1>
          <LoginButton />
        </div>
        <Form />

        <UrlsList query={query} filter={filter} />
      </div>
      <Footer />
    </>
  );
}
