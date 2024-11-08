import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./_css/slide.css";

import Header from "./_component/Header";
import Footer from "./_component/Footer";
import PrelineScript from "./_component/PrelineScript";
import { usePathname } from "next/navigation";
import Middle from "./middle";

const geistSans = localFont({
  src: "./_fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./_fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Middle children={children} />
      </body>
      <PrelineScript />
      
    </html>
  );
}
