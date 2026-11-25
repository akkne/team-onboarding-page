"use client";

import NextLink from "next/link";
import { Theme } from "@astryxdesign/core/theme";
import { LinkProvider } from "@astryxdesign/core/Link";
import { InternationalizationProvider } from "@astryxdesign/core/i18n";
import ruCatalog from "@astryxdesign/core/locales/ru-RU.generated.js";
import { recessedMaxillaTheme } from "../../themes/recessed-maxilla/built/recessed-maxilla";
import type { Locale } from "../../data/team";

export function Providers({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  return (
    <Theme theme={recessedMaxillaTheme} mode="system">
      <LinkProvider component={NextLink}>
        <InternationalizationProvider
          locale={lang === "ru" ? "ru-RU" : "en-US"}
          messages={lang === "ru" ? { "ru-RU": ruCatalog } : undefined}
        >
          {children}
        </InternationalizationProvider>
      </LinkProvider>
    </Theme>
  );
}
