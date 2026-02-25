import "../styles/reset.css";
import "../styles/theme.css";
import "../styles/global.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import Providers from "@/server/query/providers";

const pretendard = localFont({
  src: "../../public/fonts/subset-PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const D2 = localFont({
  src: "../../public/fonts/D2Coding.woff2",
  variable: "--font-D2",
  display: "swap",
});

const SB = localFont({
  src: "../../public/fonts/SB-Aggro.woff2",
  variable: "--font-SB",
  display: "swap",
});

const paperlogy = localFont({
  src: [
    {
      path: "../../public/fonts/Paperlogy-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Paperlogy-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-paperlogy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orvit",
  description: "Orvit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} ${D2.variable} ${SB.variable} ${paperlogy.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
