import Footer from "./components/Footer";
import Form from "./components/Form";
import UrlsList from "./components/UrlsList";

export default async function Home() {
  return (
    <>
      <div className="p-8 max-w-screen-xl font-sans prose mx-auto">
        <h1 className="text-center mt-16">Custom URL 😎</h1>
        <Form />

        <UrlsList />
      </div>
      <Footer />
    </>
  );
}
