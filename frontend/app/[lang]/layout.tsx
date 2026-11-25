import "../globals.css";
import localFont from "next/font/local";
import { teamName } from "../../data/team";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const inter = localFont({
  src: "../assets/inter-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = { title: teamName };
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (lang !== "ru" && lang !== "en") notFound();

  return (
    <html lang={lang} className={inter.variable}>
      <body className="min-h-screen bg-ink font-sans text-paper antialiased">
        {children}
      </body>
    </html>
  );
}
