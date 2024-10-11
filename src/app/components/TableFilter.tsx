"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function TableFilter({
  name,
  sortParam,
}: {
  name: string;
  sortParam: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const currentFilter = params.get("filter");
  const [currentDirection, setCurrentDirection] = useState(
    currentFilter?.split("-")[1] || ""
  );

  const handleFilter = (sortParam: string) => {
    if (currentFilter === `${sortParam}-asc`) {
      setCurrentDirection("desc");
      params.set("filter", `${sortParam}-desc`);
    } else if (currentFilter === `${sortParam}-desc`) {
      setCurrentDirection("");
      params.delete("filter");
    } else {
      setCurrentDirection("asc");
      params.set("filter", `${sortParam}-asc`);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      onClick={() => handleFilter(sortParam)}
      className={`flex gap-x-1 align-text-bottom mx-auto text-primary focus-visible:outline-current focus-visible:outline-offset-2 focus-visible:outline rounded-sm focus-visible:leading-none`}
    >
      {name}
      <span className="block w-4 h-4">
        {currentDirection === "asc" && " ↑"}
        {currentDirection === "desc" && " ↓"}
      </span>
    </button>
  );
}
