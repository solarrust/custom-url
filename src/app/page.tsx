import Form from "./components/Form";
import UrlsList from "./components/UrlsList";

export default async function Home() {
  return (
    <div className="p-8 max-w-7xl grid font-sans prose mx-auto">
      <h1 className="text-center">Custom URL 😎</h1>
      <Form />

      <UrlsList />
    </div>
  );
}
