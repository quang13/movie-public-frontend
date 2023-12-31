import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

import LayoutComponent from "@/layout/layout";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-alice-carousel/lib/alice-carousel.css";

import { Suspense } from "react";
import Spinner from "@/components/Spinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phim hay",
  description: "Phim HD Vietsub, Phim võ thuật thuyết minh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense
          fallback={
            <div className="mx-auto flex h-screen w-screen items-center justify-center overflow-hidden">
              <Spinner />
            </div>
          }
        >
          <LayoutComponent>{children}</LayoutComponent>
        </Suspense>
        <GoogleTagManager gtmId="GTM-KGZZZK5F" />
      </body>
    </html>
  );
}
