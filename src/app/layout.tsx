import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "sonner";
import BlogContextProvider from "@/contexts/BlogContext";
import { Manrope, Inter } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gadwa Blog",
  description: "Explore your digital garden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en" className="light">
        <body
          className={`${inter.variable} ${manrope.variable} antialiased font-inter`}
        >
          <BlogContextProvider>{children}</BlogContextProvider>
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </Provider>
  );
}
