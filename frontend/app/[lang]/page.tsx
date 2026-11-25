import { Card } from "@astryxdesign/core/Card";
import { Token } from "@astryxdesign/core/Token";
import { MemberCard } from "../../components/member-card";
import { TeamEmblem } from "../../components/team-emblem";
import { members, team, teamName } from "../../data/team";

const copy = {
  ru: {
    about: "О команде",
    members: "Участники",
    skills: "Навыки команды",
    projects: "Проекты",
    contact: "Контакты",
    language: "Язык страницы",
    menu: "Разделы страницы",
    repo: "Репозиторий на GitHub",
    skip: "Перейти к содержимому",
    captain: "Написать капитану",
    project: "Проект",
    idea: "Идея",
    open: "Открыть проект",
  },
  en: {
    about: "About us",
    members: "Members",
    skills: "Team skills",
    projects: "Projects",
    contact: "Contact",
    language: "Page language",
    menu: "Page sections",
    repo: "GitHub repository",
    skip: "Skip to content",
    captain: "Contact the captain",
    project: "Project",
    idea: "Idea",
    open: "View project",
  },
};
const heading = "mb-6 text-3xl font-semibold tracking-tight";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang === "en" ? "en" : "ru";
  const t = copy[lang];
  const sections = [
    ["about", t.about],
    ["members", t.members],
    ["skills", t.skills],
    ...(team.projects.length ? [["projects", t.projects]] : []),
    ["contact", t.contact],
  ];
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-12">
      <a className="sr-only focus:not-sr-only" href="#main">
        {t.skip}
      </a>
      <header>
        <div className="flex items-center justify-between gap-2 py-5">
          <span className="font-mono text-sm font-semibold tracking-wide">
            {team.event[lang]} / {team.year}
          </span>
          <nav
            aria-label={t.language}
            className="flex rounded-lg border border-border p-1"
          >
            {(["ru", "en"] as const).map((l) => (
              <a
                key={l}
                href={`/${l}`}
                lang={l}
                hrefLang={l}
                aria-label={l === "ru" ? "Русский" : "English"}
                aria-current={lang === l ? "page" : undefined}
                className="rounded-md px-3 py-1 text-sm font-semibold hover:underline aria-current:bg-accent-bg aria-current:text-on-accent"
              >
                {l.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
        <div className="relative isolate overflow-hidden rounded-xl bg-accent-bg px-6 py-9 text-on-accent sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-10">
          <div>
            <h1
              lang="en"
              className="max-w-[12ch] text-on-accent text-5xl leading-[0.95] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              {teamName}
            </h1>
            {team.motto && <p className="mt-3">{team.motto[lang]}</p>}
          </div>
          <div className="mt-6 h-20 w-fit sm:mt-0 sm:h-36 lg:h-44">
            <TeamEmblem />
          </div>
        </div>
        <nav
          aria-label={t.menu}
          className="flex flex-wrap gap-x-6 border-b border-border py-3"
        >
          {sections.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="py-2 text-sm font-semibold hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main" className="space-y-12 py-10">
        <section
          id="about"
          aria-labelledby="about-title"
          className="grid gap-2 md:grid-cols-3"
        >
          <h2 id="about-title" className={heading}>
            {t.about}
          </h2>
          <p className="max-w-prose text-xl leading-relaxed md:col-span-2">
            {team.about[lang]}
          </p>
        </section>
        <section id="members" aria-labelledby="members-title">
          <h2 id="members-title" className={heading}>
            {t.members}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <MemberCard key={member.name.ru} member={member} lang={lang} />
            ))}
          </div>
        </section>
        <section id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title" className={heading}>
            {t.skills}
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {team.skills.map(({ category, items }) => (
              <div key={category.ru} className="border-t border-border pt-4">
                <h3 className="mb-3 text-lg font-semibold">{category[lang]}</h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item}>
                      <Token label={item} size="sm" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        {team.projects.length > 0 && (
          <section id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title" className={heading}>
              {t.projects}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {team.projects.map((p) => (
                <Card key={p.title.ru} padding={5}>
                  <Token label={t[p.kind]} size="sm" />
                  <h3 className="mt-3 text-xl font-semibold">
                    {p.title[lang]}
                  </h3>
                  <p>{p.description[lang]}</p>
                  {p.href && (
                    <a href={p.href} className="underline">
                      {t.open}
                      <span className="sr-only"> — {p.title[lang]}</span>
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      <footer id="contact" className="border-t border-border pt-8">
        <h2 className={heading}>{t.contact}</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {team.captainContact && (
            <a href={team.captainContact} className="underline">
              {t.captain}
            </a>
          )}
          <a href={team.repository} className="underline underline-offset-4">
            {t.repo} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
