import { teamName } from "../team";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = { title: teamName };
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (lang !== "ru" && lang !== "en") notFound();

  return (
    <html lang={lang}>
      <body className="min-h-screen bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
