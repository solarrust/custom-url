import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Auth0ProviderWrapper from "./components/Auth0ProviderWrapper/Auth0ProviderWrapper";

export const metadata: Metadata = {
  title: "URL Customiser",
  description: "Alёna's personal service for making custom URLs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className="min-h-[100dvh] grid body">
        <Auth0ProviderWrapper>
          {children}
        </Auth0ProviderWrapper>
      </body>
    </html>
  );
}
