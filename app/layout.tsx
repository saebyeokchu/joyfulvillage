import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../public/css/slide.css";

import Middle from "./middle";
import PrelineScript from "@/components/PrelineScript";
import ContextProviders from "@/context/ContextProviders";

const maruburis = localFont({
  src: [
    {
      path: '../public/fonts/MaruBuri-ExtraLight.ttf',
      weight: '200'
    },{
      path: '../public/fonts/MaruBuri-Light.ttf',
      weight: '300'
    },{
      path: '../public/fonts/MaruBuri-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/MaruBuri-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../public/fonts/MaruBuri-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-maruburis'
})

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
      <body className={`${maruburis.variable} font-sans text-point ` }> 
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
