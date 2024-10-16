"use client";
import React, { useState } from "react";
import { deleteUrl } from "../../serverActions/DeleteUrlAction";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleted, setIsDeleted] = useState(false);

  async function handleDelete() {
    setIsDeleted(true);
    try {
      await deleteUrl(id);
      setTimeout(() => setIsDeleted(false), 2000);
    } catch (err) {
      console.error(`Failed to delete URL: ${err}`);
      setIsDeleted(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleted}
      className="flex ml-auto btn-icon text-red-700/30 hover:text-red-700 focus-visible:text-red-700"
    >
      {isDeleted ? (
        <span
          className="loading loading-ball loading-md text-red-700"
          data-testid="delete-loader"
        ></span>
      ) : (
        <DeleteIcon />
      )}
    </button>
  );
}
