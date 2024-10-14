/*
TODO: Fix the test cases
*/

// import React from "react";
// import {
//   render,
//   fireEvent,
//   waitFor,
//   cleanup,
//   screen,
// } from "@testing-library/react";
// import DeleteButton from "./DeleteButton";
// import { describe, beforeEach, it, expect, afterEach, vi } from "vitest";

// vi.mock("@/serverActions/DeleteUrlAction");
// const mockDeleteUrl = vi.fn();

// describe("DeleteButton", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   afterEach(() => {
//     cleanup();
//   });

//   it("should delete the URL and show loading indicator", async () => {
//     mockDeleteUrl.mockResolvedValueOnce({});
//     const { getByRole } = render(<DeleteButton id="123" />);

//     const button = getByRole("button");
//     fireEvent.click(button);

//     expect(button).toBeDisabled();
//     expect(screen.getByTestId("delete-loader")).toBeInTheDocument();

//     await waitFor(() => {
//       expect(button).toBeDisabled();
//     });
//   });

//   it("should handle delete URL failure", async () => {
//     mockDeleteUrl.mockRejectedValueOnce(new Error("Failed to delete"));
//     const { getByRole } = render(<DeleteButton id="123" />);

//     const button = getByRole("button");
//     fireEvent.click(button);

//     expect(button).toBeDisabled();
//     expect(screen.getByTestId("delete-loader")).toBeInTheDocument();
//   });
// });
