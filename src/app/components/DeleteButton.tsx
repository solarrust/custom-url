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
    <button onClick={handleDelete}>
      {isDeleted ? (
        <span className="loading loading-ball loading-xs text-error"></span>
      ) : (
        <DeleteIcon className="fill-red-700/30 hover:fill-red-700" />
      )}
    </button>
  );
}
