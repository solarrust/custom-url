import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import DeleteButton from "./DeleteButton";
import { deleteUrl } from "../../serverActions/DeleteUrlAction";
import { vi, Mock } from "vitest";

vi.mock("../../serverActions/DeleteUrlAction");

describe("DeleteButton", () => {
  const mockDeleteUrl = deleteUrl as Mock;

  beforeEach(() => {
    mockDeleteUrl.mockClear();
  });

  it("should handle delete action successfully", async () => {
    mockDeleteUrl.mockResolvedValueOnce({ success: true });

    const { getByRole, getByTestId } = render(<DeleteButton id="123" />);
    const button = getByRole("button");

    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(getByTestId("delete-loader")).toBeInTheDocument();

    expect(mockDeleteUrl).toHaveBeenCalledWith("123");
  });

  it("should handle delete action failure", async () => {
    mockDeleteUrl.mockRejectedValueOnce(new Error("Delete failed"));

    const { getByRole, getByTestId } = render(<DeleteButton id="123" />);
    const button = getByRole("button");

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(getByTestId("delete-loader")).toBeInTheDocument();

      expect(mockDeleteUrl).toHaveBeenCalledWith("123");
    });
  });
});
