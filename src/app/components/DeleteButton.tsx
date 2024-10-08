"use client";
import React from "react";
import { deleteUrl } from "../serverActions/DeleteUrlAction";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button onClick={() => deleteUrl(id)}>
      <DeleteIcon />
    </button>
  );
}
