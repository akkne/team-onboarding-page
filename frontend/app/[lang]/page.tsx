const messages = {
  ru: { welcome: "Добро пожаловать в команду!", language: "Язык страницы" },
  en: { welcome: "Welcome to the team!", language: "Page language" },
};

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const copy = messages[lang === "en" ? "en" : "ru"];

  return (
    <main className="mx-auto max-w-5xl px-6 py-8 sm:px-12">
      <header className="flex items-center justify-between gap-3 border-b border-ink/20 pb-5">
        <span className="font-semibold tracking-tight" lang="en">Team Onboarding</span>
        <nav aria-label={copy.language} className="flex gap-1">
          {(["ru", "en"] as const).map((locale) => (
            <a key={locale} href={`/${locale}`} lang={locale} hrefLang={locale}
              aria-label={locale === "ru" ? "Русский" : "English"}
              aria-current={locale === lang ? "page" : undefined}
              className="rounded-md px-3 py-2 text-sm font-semibold hover:underline focus-visible:outline-2 aria-current:bg-ink aria-current:text-canvas">
              {locale.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>
      <h1 className="mt-20 max-w-2xl text-5xl font-semibold tracking-tight sm:mt-32 sm:text-7xl">
        {copy.welcome}
      </h1>
    </main>
  );
}
