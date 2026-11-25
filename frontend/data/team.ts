export const teamName = "recessed maxilla team";

export type Locale = "ru" | "en";
export type Translation = Record<Locale, string>;

export interface Member {
  name: Translation;
  role: Translation;
  group: string;
  contribution: Translation;
  photo?: string;
  skills?: string[];
  contact?: string;
}

interface Project {
  title: Translation;
  description: Translation;
  kind: "project" | "idea";
  href?: string;
}

export const team = {
  about: {
    ru: "Мы участвуем в отборочном этапе Всероссийского хакатона «Волга.ТОП» 2026. Вместе проектируем интерфейс, разрабатываем сайт и готовим документацию.",
    en: "We are taking part in the qualifying round of the 2026 Volga.TOP national hackathon. Together we design the interface, develop the site and write its documentation.",
  },
  event: { ru: "Волга.ТОП", en: "Volga.TOP" },
  year: 2026,
  motto: undefined as Translation | undefined,
  captainContact: undefined as string | undefined,
  repository: "https://github.com/akkne/team-onboarding-page",
  projects: [] as Project[],
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
    contribution: {
      ru: "Координация команды и руководство техническим направлением.",
      en: "Team coordination and technical leadership.",
    },
  },
  {
    name: { ru: "Зеленко Артур Олегович", en: "Artur Olegovich Zelenko" },
    role: { ru: "Frontend-разработчик", en: "Frontend developer" },
    group: "ИУ5-12/4",
    contribution: { ru: "Разработка фронтенда.", en: "Frontend development." },
  },
  {
    name: { ru: "Верховых Егор Дмитриевич", en: "Egor Dmitrievich Verkhovykh" },
    role: {
      ru: "Аналитик, креативный директор",
      en: "Analyst, Creative Director",
    },
    group: "ИУ5-13/4",
    contribution: {
      ru: "Аналитика, креативное направление и проверка README.",
      en: "Analysis, creative direction and README review.",
    },
  },
];
