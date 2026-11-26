import Image from "next/image";
import type { Locale, Project } from "../data/team";

const copy = {
  ru: { project: "Проект", idea: "Идея", more: "Подробнее", less: "Свернуть", source: "Репозиторий" },
  en: { project: "Project", idea: "Idea", more: "Read more", less: "Show less", source: "Repository" },
};

export function ProjectCard({ project, lang }: { project: Project; lang: Locale }) {
  const t = copy[lang];
  const title = project.title[lang];
  const [intro, ...sections] = project.story;

  return (
    <article className="rounded-2xl border border-line bg-panel p-6 md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
        <span className="section-label text-lilac">{t[project.kind]}</span>
        {project.href && (
          <a href={project.href} className="text-link text-muted hover:text-paper">
            {t.source}<span className="sr-only"> {title}</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        )}
      </div>
      <h3 className="card-title mt-3">{title}</h3>
      <p className="body-copy mt-3 max-w-prose text-muted">{project.description[lang]}</p>
      <details className="group mt-5">
        <summary className="pill w-fit cursor-pointer list-none gap-3 focus-visible:outline-3 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">{t.more}</span>
          <span className="hidden group-open:inline">{t.less}</span>
          <span className="sr-only"> — {title}</span>
          <span aria-hidden="true" className="size-2 -translate-y-0.5 rotate-45 border-r-2 border-b-2 group-open:translate-y-0.5 group-open:rotate-225" />
        </summary>
        <div className="mt-6 border-t border-line pt-6 md:mt-8 md:pt-8">
          <div className="grid items-center gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
            <Image
              src={project.screenshot.image[lang]}
              alt={project.screenshot.alt[lang]}
              sizes="(min-width: 1280px) 620px, (min-width: 1024px) 48vw, 90vw"
              className="h-auto w-full rounded-xl border border-line"
            />
            <div>
              <h4 className="card-title">{intro.heading[lang]}</h4>
              <p className="body-copy mt-3 max-w-prose text-muted">{intro.text[lang]}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 md:mt-8">
            {sections.map((section) => (
              <div key={section.heading.en} className="border-t border-line pt-5">
                <h4 className="card-title">{section.heading[lang]}</h4>
                <p className="body-copy mt-3 max-w-prose text-muted">{section.text[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </details>
    </article>
  );
}
