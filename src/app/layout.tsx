import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "URL Customizer",
  description: "Alёna's personal service for making custom URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
