import { MemberCard } from "../../components/member-card";
import { TeamEmblem } from "../../components/team-emblem";
import { members, team, teamName } from "../../data/team";

const copy = {
  ru: {
    about: "О команде",
    members: "Участники",
    skills: "Навыки",
    projects: "Проекты",
    contact: "Контакты",
    language: "Язык страницы",
    menu: "Разделы страницы",
    skip: "Перейти к содержимому",
    round: "Отборочный этап",
    meet: "Познакомиться с командой",
    project: "Проект",
    idea: "Идея",
    view: "Открыть проект",
    repository: "Репозиторий на GitHub",
    message: "Написать в GitHub Issues",
  },
  en: {
    about: "About us",
    members: "Members",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    language: "Page language",
    menu: "Page sections",
    skip: "Skip to content",
    round: "Qualifying round",
    meet: "Meet the team",
    project: "Project",
    idea: "Idea",
    view: "View project",
    repository: "GitHub repository",
    message: "Contact us on GitHub Issues",
  },
};

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang === "en" ? "en" : "ru";
  const t = copy[lang];
  const sections = [
    ["about", lang === "ru" ? "О нас" : t.about],
    ["members", t.members],
    ["skills", t.skills],
    ...(team.projects.length ? [["projects", t.projects]] : []),
    ["contact", t.contact],
  ];

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-10 focus:bg-paper focus:p-3 focus:text-ink"
      >
        {t.skip}
      </a>
      <header className="border-b border-line bg-ink">
        <div className="shell flex flex-wrap items-center justify-between gap-x-5 py-3 lg:min-h-18 lg:flex-nowrap">
          <a
            href={`/${lang}`}
            aria-label={teamName}
            className="flex items-center gap-2 text-[1.5rem] font-semibold tracking-[-0.065em]"
          >
            <TeamEmblem placement="header" />
            <span lang="en">rm.team</span>
          </a>
          <nav
            aria-label={t.menu}
            className="order-last mt-3 flex w-full flex-wrap items-center justify-between gap-x-1 border-t border-line pt-1 sm:gap-x-6 lg:order-none lg:mt-0 lg:w-auto lg:border-0 lg:pt-0"
          >
            {sections.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="py-2 text-sm font-medium text-muted hover:text-paper"
              >
                {label}
              </a>
            ))}
          </nav>
          <nav
            aria-label={t.language}
            className="flex rounded-full border border-line p-1"
          >
            {(["ru", "en"] as const).map((locale) => (
              <a
                key={locale}
                href={`/${locale}`}
                lang={locale}
                hrefLang={locale}
                aria-label={locale === "ru" ? "Русский" : "English"}
                aria-current={locale === lang ? "page" : undefined}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted hover:text-paper aria-[current=page]:bg-paper aria-[current=page]:text-ink"
              >
                {locale.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main id="main">
        <section
          aria-labelledby="hero-title"
          className="hero border-b border-line"
        >
          <div className="shell flex min-h-[36rem] flex-col items-start pt-12 pb-44 sm:min-h-[40rem] md:justify-center md:py-24 lg:min-h-[clamp(38rem,74svh,54rem)]">
            <p className="meta mb-7 flex flex-wrap items-center gap-3 text-mint">
              <span>
                {team.event[lang]} {team.year}
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-mint/50" />
              {t.round}
            </p>
            <h1 id="hero-title" lang="en" className="hero-title">
              {teamName}
            </h1>
            <p className="mt-6 max-w-[30ch] text-xl leading-snug tracking-tight text-paper md:text-2xl">
              {team.motto[lang]}
            </p>
            <a href="#members" className="pill mt-8">
              {t.meet}
            </a>
          </div>
        </section>
        <section
          id="about"
          aria-labelledby="about-title"
          className="border-b border-line"
        >
          <div className="shell section-space grid items-baseline gap-6 md:grid-cols-[1fr_2fr]">
            <h2
              id="about-title"
              className="meta flex items-center gap-3 text-mint"
            >
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {t.about}
            </h2>
            <p className="max-w-[38ch] text-[clamp(1.55rem,2.7vw,2.75rem)] leading-[1.18] tracking-[-0.045em]">
              {team.about[lang]}
            </p>
          </div>
        </section>
        <section
          id="members"
          aria-labelledby="members-title"
          className="shell section-space"
        >
          <h2 id="members-title" className="section-title mb-9">
            {t.members}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {members.map((member) => (
              <MemberCard key={member.name.ru} member={member} lang={lang} />
            ))}
          </div>
        </section>
        <section
          id="skills"
          aria-labelledby="skills-title"
          className="border-y border-line bg-panel"
        >
          <div className="shell section-space grid items-start gap-9 lg:grid-cols-[1fr_2fr]">
            <h2 id="skills-title" className="section-title">
              {t.skills}
            </h2>
            <dl className="divide-y divide-line border-y border-line">
              {team.skills.map(({ category, items }) => (
                <div
                  key={category.ru}
                  className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="meta text-mint">{category[lang]}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1 text-lg tracking-tight md:text-xl">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        {team.projects.length > 0 && (
          <section
            id="projects"
            aria-labelledby="projects-title"
            className="shell section-space"
          >
            <h2 id="projects-title" className="section-title mb-9">
              {t.projects}
            </h2>
            <div className="grid gap-4">
              {team.projects.map((project) => (
                <article
                  key={project.title.ru}
                  className="grid overflow-hidden rounded-2xl border border-line bg-panel sm:grid-cols-[1fr_2fr]"
                >
                  <div
                    aria-hidden="true"
                    className="grid min-h-32 place-items-center bg-paper p-5 sm:min-h-64"
                  >
                    <TeamEmblem placement="cover" />
                  </div>
                  <div className="flex flex-col items-start justify-center p-6 md:p-10">
                    <span className="meta text-lilac">{t[project.kind]}</span>
                    <h3 className="mt-3 text-3xl font-medium tracking-tight">
                      {project.title[lang]}
                    </h3>
                    <p className="mt-3 max-w-prose leading-relaxed text-muted">
                      {project.description[lang]}
                    </p>
                    {project.href && (
                      <a href={project.href} className="text-link mt-5">
                        {t.view}
                        <span className="sr-only">
                          {" "}
                          - {project.title[lang]}
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <footer id="contact" className="bg-lilac text-ink">
        <div className="shell section-space flex flex-wrap items-center justify-between gap-8">
          <h2 className="section-title">{t.contact}</h2>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <a
              href={team.contact}
              className="pill bg-ink text-paper hover:bg-panel focus-visible:outline-ink"
            >
              {t.message}
            </a>
            <a href={team.repository} className="text-link">
              {t.repository}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
