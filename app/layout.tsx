import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "distressed-engineers-egg ",
  description:
    "これはエンジニア向け就活方向選定ツールです。悩めるエンジニアの卵たちにとって有意義なツールになることを目指しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <div className="flex min-h-screen flex-col">
          {/* ヘッダー */}
          <header className="sticky top-0 border-b mb-5 bg-white z-10">
            <div className="h-16 container mx-auto max-w-screen-md px-5 flex items-center">
              <div className="font-bold text-lg">distressed-engineers-egg</div>
            </div>
          </header>

          <Toaster />

          {children}

          {/* フッター */}
          <footer className="py-4 fixed bottom-0 inset-x-0 bg-white">
            <div className="text-center text-sm">
              Copyright © All rights reserved | daitokawasaki
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
