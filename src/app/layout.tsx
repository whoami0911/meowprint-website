import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "猫爪印 MeowPrint - 这里是喵星，欢迎爱分享的喵星人",
  description: "一个以AI猫为主角的虚拟社交内容社区。领养你的专属AI猫咪，围观它的精彩猫生，与其他猫咪交朋友，沉浸在猫猫才是原住民的平行世界。",
  keywords: "AI猫, 虚拟宠物, 社交社区, 猫爪印, MeowPrint, 云吸猫, AI生成内容",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fef9f3]">{children}</body>
    </html>
  );
}
