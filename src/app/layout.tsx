import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Syne, Space_Mono } from "next/font/google";

import localFont from "next/font/local";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const syne = Syne({
//   subsets: ["latin"],
//   weight: ["500", "600", "700", "800"],
//   variable: "--font-syne",
//   display: "swap",
// });


// const spaceMono = Space_Mono({
//   subsets: ["latin"],
//   weight: ["400", "700"],
//   variable: "--font-space-mono",
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Site Guys.Co - Web design Studio",
//   description: "Small studio, sharp work. Strategy, design, and engineering in one team.",
// };


const synonym = localFont({
  src: [
    {
      path: "../../public/fonts/Synonym-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Synonym-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Synonym-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Synonym-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Synonym-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Synonym-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-synonym",
  display: "swap",
});

const chillax = localFont({
  src: [
    {
      path: "../../public/fonts/Chillax-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Chillax-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Chillax-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Chillax-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Chillax-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${synonym.variable} ${chillax.variable}`}>
      <body >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
