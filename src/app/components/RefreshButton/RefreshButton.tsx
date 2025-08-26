"use client";

import { useState } from "react";
import { refreshUrlsData } from "@/app/serverActions/RefreshUrlsAction";

export default function RefreshButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refreshUrlsData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isLoading}
      className="btn btn-sm"
      title="Refresh data"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );
}
