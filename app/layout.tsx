import type { Metadata } from "next";
import "./globals.css";
import "../public/css/slide.css";
import "../public/css/color.css";
import "../public/css/text.css";

import { arita, maruburis } from "@/lib/fonts"

import Middle from "./middle";
import PrelineScript from "@/components/PrelineScript";
import ContextProviders from "@/context/ContextProviders";




export const metadata: Metadata = {
  title: "조이풀빌리지",
  description: "도천, 영덕, 포항 근교, 힐링, 숙소, 힐링숙소, 영덕숙소, 영덕호텔, 영덕숙박, 영덕힐링, 도천숲",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`
        ${maruburis.variable} 
        ${arita.variable} 
        font-sans 
        text-joyful-indigo ` 
      }> 
        <ContextProviders>
          <Middle>
            {children}
          </Middle>
        </ContextProviders>
        {/* <script src="../node_modules/preline/dist/preline.js"></script> */}
      </body>
      <PrelineScript />
    </html>
  );
}
