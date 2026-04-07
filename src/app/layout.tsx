import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "중간고사 족보 모음.pdf - Google Drive",
  description: "공유 문서가 도착했습니다. Google Drive에서 열어보세요.",
  openGraph: {
    title: "중간고사 족보 모음.pdf - Google Drive",
    description: "회원님과 문서를 공유했습니다. 탭하여 확인하세요.",
    type: "website",
    siteName: "Google Drive",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="icon"
          href="https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"
        />
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
