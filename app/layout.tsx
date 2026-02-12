import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolHive - All-in-One Creative Tools for Digital Creators",
  description: "Transform your images and PDFs with powerful AI-powered tools. Background removal, upscaling, compression, and more.",
  keywords: ["image tools", "pdf converter", "background remover", "image compressor", "creative tools"],
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
