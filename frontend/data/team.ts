export const teamName = "recessed maxilla team";

export type Locale = "ru" | "en";
export type Translation = Record<Locale, string>;

export interface Member {
  name: Translation;
  role: Translation;
  group: string;
  contribution: Translation;
  photo?: string;
  skills: Translation[];
  contact?: string;
}

interface Project {
  title: Translation;
  description: Translation;
  kind: "project" | "idea";
  href?: string;
}

const repository = "https://github.com/akkne/team-onboarding-page";

export const team = {
  about: {
    ru: "Мы — студенты групп ИУ5-12/4 и ИУ5-13/4. На «Волга.ТОП» мы хотим проверить, как наши решения в дизайне, аналитике и разработке работают вместе. Первый результат — эта визитка.",
    en: "We are students from groups ИУ5-12/4 and ИУ5-13/4. We joined Volga.TOP to see how our design, analysis and engineering decisions work together. This site is our first result.",
  },
  event: { ru: "Волга.ТОП", en: "Volga.TOP" },
  year: 2026,
  motto: {
    ru: "У каждого своя роль. Собираем вместе.",
    en: "Different roles. One shared build.",
  },
  contact: repository + "/issues",
  repository,
  projects: [
    {
      title: { ru: "Визитка команды", en: "Team profile" },
      description: {
        ru: "Двуязычный сайт для отбора на «Волга.ТОП». Собрали команду, роли и стек на одной странице. Обе версии генерируются из общих данных на Next.js.",
        en: "Our bilingual site for the Volga.TOP qualifiers brings the team, roles and tools together. Next.js builds both language versions from the same data.",
      },
      kind: "project",
      href: repository,
    },
  ] as Project[],
  skills: [
    { category: { ru: "Языки", en: "Languages" }, items: ["TypeScript"] },
    {
      category: { ru: "Технологии", en: "Technologies" },
      items: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    },
    {
      category: { ru: "Инструменты", en: "Tools" },
      items: ["Docker Compose", "GitHub Actions", "ESLint", "npm"],
    },
  ],
};

export const members: Member[] = [
  {
    name: { ru: "Стукалов Артём Андреевич", en: "Artyom Andreyevich Stukalov" },
    role: { ru: "Дизайнер", en: "Designer" },
    group: "ИУ5-12/4",
    skills: [
      { ru: "Дизайн", en: "Design" },
      { ru: "Документация", en: "Documentation" },
    ],
    contribution: {
      ru: "Фронтенд, документация и подготовка архива ИИ-сессий.",
      en: "Frontend development, documentation and preparation of the AI session archive.",
    },
  },
  {
    name: { ru: "Стёпкин Артемий Юрьевич", en: "Artemiy Yuryevich Styopkin" },
    role: {
      ru: "Руководитель команды и технический руководитель",
      en: "Team Lead, Tech Lead",
    },
    group: "ИУ5-12/4",
    skills: [
      { ru: "Координация", en: "Coordination" },
      { ru: "Техлидство", en: "Technical leadership" },
    ],
    contribution: {
      ru: "Координация команды и руководство техническим направлением.",
      en: "Team coordination and technical leadership.",
    },
  },
  {
    name: { ru: "Зеленко Артур Олегович", en: "Artur Olegovich Zelenko" },
    role: { ru: "Frontend-разработчик", en: "Frontend developer" },
    group: "ИУ5-12/4",
    skills: [{ ru: "Фронтенд", en: "Frontend development" }],
    contribution: { ru: "Разработка фронтенда.", en: "Frontend development." },
  },
  {
    name: { ru: "Верховых Егор Дмитриевич", en: "Egor Dmitrievich Verkhovykh" },
    role: {
      ru: "Аналитик, креативный директор",
      en: "Analyst, Creative Director",
    },
    group: "ИУ5-13/4",
    skills: [
      { ru: "Аналитика", en: "Analysis" },
      { ru: "Редактура", en: "Editing" },
    ],
    contribution: {
      ru: "Аналитика, креативное направление и проверка README.",
      en: "Analysis, creative direction and README review.",
    },
  },
];
