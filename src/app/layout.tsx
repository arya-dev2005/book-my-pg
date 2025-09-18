import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book My PG - Find Perfect Student Accommodation",
  description:
    "Discover comfortable and affordable PG accommodations near your college. Manage food, transport, and essentials all in one place.",
  keywords: "PG, student accommodation, hostel, college, food, transport",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
