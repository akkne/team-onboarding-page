import "../globals.css";
import { Providers } from "./providers";
import { teamName } from "../../data/team";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
    <html lang={lang} data-astryx-theme="recessed-maxilla">
      <body className="min-h-screen bg-body font-sans text-primary">
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}
