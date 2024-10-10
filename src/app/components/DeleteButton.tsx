"use client";
import React, { useState } from "react";
import { deleteUrl } from "../serverActions/DeleteUrlAction";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDelete() {
    setIsDeleted(true);
    deleteUrl(id).finally(() => {
      setTimeout(() => setIsDeleted(false), 2000);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleted}
      className="flex ml-auto btn-icon text-red-700/30 hover:text-red-700 focus-visible:text-red-700"
    >
      {isDeleted ? (
        <span className="loading loading-ball loading-md text-red-700"></span>
      ) : (
        <DeleteIcon />
      )}
    </button>
  );
}
