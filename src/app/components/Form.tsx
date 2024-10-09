"use client";
import { FormEvent, useState } from "react";
import { shortenUrl } from "../serverActions/ShortenUrlAction";
import ErrorAlert from "./ErrorAlert";

export default function Form() {
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsAdded(true);
    try {
      shortenUrl(formData).finally(() => {
        form.reset();
        setTimeout(() => setIsAdded(false), 2000);
      });
    } catch (err) {
      setError(err as Error);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-x-2 justify-center m-14"
      >
        <label className="form-control w-full max-w-xs">
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
        <label className="form-control w-max max-w-xs">
          <div className="label">
            <span className="label-text">Short part</span>
          </div>
          <input
            type="text"
            placeholder="/Funny"
            name="ShortPart"
            className="input input-bordered input-primary w-24 max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt">Optional</span>
          </div>
        </label>
        <button type="submit" className="btn btn-active btn-primary w-28">
          {isAdded ? (
            <span className="loading loading-ball loading-md text-center"></span>
          ) : (
            "Whoosh!"
          )}
        </button>
      </form>
      {error ? <ErrorAlert error={error} /> : null}
    </>
  );
}
