"use client";
import { FormEvent, useState } from "react";
import { shortenUrl } from "../../serverActions/ShortenUrlAction";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

export default function Form() {
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsAdded(true);
    try {
      await shortenUrl(formData);
      form.reset();
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      setError(err as Error);
      setIsAdded(false);
      console.error(`Failed to shorten URL: ${err}`);
    } 
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-x-2 justify-center mt-6 mb-24 max-sm:flex-wrap"
      >
        <label className="form-control max-w-xs basis-40 flex-grow">
          <div className="label">
            <span className="label-text">Enter URL</span>
          </div>
          <input
            type="text"
            placeholder="https://example.com"
            name="OriginalUrl"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
          <div className="label">
            <span className="label-text-alt">Required</span>
          </div>
        </label>
        <label className="form-control w-max max-w-24">
          <div className="label">
            <span className="label-text">Short part</span>
          </div>
          <input
            type="text"
            placeholder="/Funny"
            name="ShortPart"
            className="input input-bordered input-primary w-full"
          />
          <div className="label">
            <span className="label-text-alt">Optional</span>
          </div>
        </label>
        <button
          type="submit"
          className="btn btn-active btn-primary w-28 max-sm:w-full"
        >
          {isAdded ? (
            <span
              className="loading loading-ball loading-md text-center"
              data-testid="submit-loader"
            ></span>
          ) : (
            "Whoosh!"
          )}
        </button>
      </form>
      {error ? <ErrorAlert error={error} /> : ""}
    </>
  );
}
