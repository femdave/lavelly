import type { Metadata } from "next";
import { Dosis } from "next/font/google";
import "./globals.css";

const dosis = Dosis({
  weight: ["200", "300", "400", "700"], // Specify weights you need
  subsets: ["latin"], // Specify subsets you need
});

export const metadata: Metadata = {
  title: "Lavelly Miller, contemporary artist",
  description: "Paintings by contemporary artist, Lavelly Miller",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png", // Optional: for Apple devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dosis.className}>{children}</body>
    </html>
  );
}
