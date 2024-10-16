"use client";
import React, { useState } from "react";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";

export default function CopyButton({ url }: { url: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    setIsCopied(true);
    try {
      await navigator.clipboard.writeText(url);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error(`Failed to copy text: ${err}`);
      setIsCopied(false);
    }
  }
  return (
    <button
      onClick={handleCopy}
      className="btn-icon text-success/30 hover:text-success focus-visible:text-success ml-2"
    >
      {isCopied ? (
        <DoneSharpIcon className="fill-success" />
      ) : (
        <ContentCopySharpIcon />
      )}
    </button>
  );
}
