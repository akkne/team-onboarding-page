export const teamName = "recessed maxilla team";

export type Locale = "ru" | "en";
export type Translation = Record<Locale, string>;

export interface Member {
  name: Translation;
  role: string;
  group: string;
  achievements: { en: string; ru?: string }[];
  photo?: string;
  skills: string[];
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
    ru: [
      "Мы строим распределённые веб-системы, доводим проекты с нуля до продакшена. Берём на себя дизайн, аналитику, фронтенд- и бэкенд-разработку и деплой. Можем реализовать любые решения, от построения отказоустойчивых атомарных систем до работы с алгоритмами и внедрения ИИ в проекты.",
      "Мы познакомились в университете и поняли, что мы единомышленники. Наши качества дополняют друг друга, так что вместе мы можем разработать любое программное решение. Мы учимся на факультете ИУ в МГТУ имени Н. Э. Баумана.",
    ],
    en: [
      "We build distributed web systems and take projects from scratch to production. We handle design, analysis, frontend and backend development, and deployment. We can build all kinds of solutions, from fault-tolerant systems with atomic operations to algorithms and AI integrations.",
      "We met at university and realized we think alike. Our strengths complement each other, so together we can build any software solution. We study at the Faculty of Informatics and Control Systems at Bauman Moscow State Technical University.",
    ],
  },
  event: { ru: "Волга.ТОП", en: "Volga.TOP" },
  year: 2026,
  motto: {
    ru: "Мы построим вам вашу компанию",
    en: "We’ll build your company for you",
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
    {
      title: { ru: "Dobropay", en: "Dobropay" },
      description: {
        ru: "Платёжный шлюз с кабинетом магазина и документацией API на .NET 10 и Next.js. Интеграции с реальными платёжными провайдерами пока не реализованы.",
        en: "A .NET 10 and Next.js payment gateway with a merchant dashboard and API documentation. Integrations with real payment providers are not implemented yet.",
      },
      kind: "project",
      href: "https://github.com/akkne/dobropay",
    },
  ] as Project[],
  skills: [
    {
      category: "Frontend",
      items: [
        "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
        "Tailwind CSS", "PostCSS", "Node.js", "ESLint",
      ],
    },
    {
      category: "Backend",
      items: [
        "C#", ".NET", "ASP.NET Core", "Entity Framework", "LINQ", "SQL",
        "PostgreSQL", "MongoDB", "Redis", "Elasticsearch",
        "REST API", "gRPC", "YARP", "JWT", "Telegram API",
        "Web Push", "Mobile Push", "SMTP mailing",
        "Unit tests", "Integrational tests", "Module tests",
      ],
    },
    {
      category: "Architecture",
      items: [
        "Microservices", "Event-driven architecture", "Transactional Outbox",
        "Idempotent consumers", "Deduplication", "Dead-letter queues (DLQ)", "ACID",
      ],
    },
    {
      category: "Infrastructure",
      items: [
        "Docker", "Docker Compose", "Nginx", "S3", "Apache Kafka", "RabbitMQ",
        "Git", "CI/CD", "GitHub Actions", "Prometheus", "Grafana", "Loki",
      ],
    },
  ],
};

export const members: Member[] = [
  {
    name: { ru: "Стукалов Артём Андреевич", en: "Artyom Andreyevich Stukalov" },
    role: "Designer, Technical Writer",
    group: "ИУ5-12/4",
    skills: ["Design", "Documentation"],
    achievements: [
      {
        ru: "Входит в команду дизайнеров МГТУ им. Н. Э. Баумана.",
        en: "Member of the design team at Bauman Moscow State Technical University.",
      },
      {
        ru: "Диплом I степени на конференции «Эксперимент в космосе. Космос для всех» (2026) за систему компьютерного зрения для мониторинга усталости космонавта.",
        en: "First-degree diploma at “Experiment in Space. Space for All” (2026) for a computer vision system that monitors cosmonaut fatigue.",
      },
    ],
  },
  {
    name: { ru: "Стёпкин Артемий Юрьевич", en: "Artemiy Yuryevich Styopkin" },
    role: "Team Lead, Tech Lead",
    group: "ИУ5-12/4",
    skills: ["Coordination", "Technical leadership", "Backend"],
    achievements: [
      {
        ru: "1,5 года в продуктовой бэкенд-разработке.",
        en: "1.5 years building product backends.",
      },
      {
        ru: "Победитель Московской предпрофессиональной олимпиады школьников 2026 года по информатике.",
        en: "Winner, Moscow Pre-Professional Olympiad for Schoolchildren 2026 (CS Track).",
      },
      { en: "Co-founder of Sellevate." },
    ],
  },
  {
    name: { ru: "Зеленко Артур Олегович", en: "Artur Olegovich Zelenko" },
    role: "Frontend Developer",
    group: "ИУ5-12/4",
    skills: ["Frontend development"],
    achievements: [
      {
        ru: "Входит в команду разработчиков МГТУ им. Н. Э. Баумана.",
        en: "Member of the development team at Bauman Moscow State Technical University.",
      },
      {
        ru: "Призёр финального этапа научной конференции «Инженеры будущего».",
        en: "Prize winner in the final round of the “Engineers of the Future” science conference.",
      },
    ],
  },
  {
    name: { ru: "Верховых Егор Дмитриевич", en: "Egor Dmitrievich Verkhovykh" },
    role: "CEO, Analyst",
    group: "ИУ5-13/4",
    skills: ["Analysis", "Editing"],
    achievements: [
      {
        ru: "Победитель хакатона «Энергия города — в дело».",
        en: "Winner of the “City Energy — Into Action” hackathon.",
      },
      {
        ru: "Призёр исследовательского трека Московской предпрофессиональной олимпиады школьников 2026 года.",
        en: "Prize winner, Moscow Pre-Professional Olympiad for Schoolchildren 2026 (Research Track).",
      },
    ],
  },
];
