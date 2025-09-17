import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "College City Student Guide",
  description:
    "Your ultimate student guide for everything you need around campus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
