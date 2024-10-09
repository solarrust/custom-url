import React from "react";

export default function Loading() {
  return (
    <div className="grid place-items-center min-h-[100dvh] text-center">
      <div className="grid gap-y-6 justify-items-center">
        <div className="w-24 h-24">
          <img
            src="./icon.svg"
            alt="Fox icon"
            className="max-w-full max-h-full"
          />
        </div>
        <h1 className="font-bold text-3xl tracking-wide">Loading...</h1>
      </div>
    </div>
  );
}
