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
    ru: "Мы - студенты групп ИУ5-12/4 и ИУ5-13/4. На «Волга.ТОП» мы хотим проверить, как наши решения в дизайне, аналитике и разработке работают вместе. Первый результат - эта визитка.",
    en: "We are students from groups ИУ5-12/4 and ИУ5-13/4. We joined Volga.TOP to see how our design, analysis and engineering decisions work together. This site is our first result.",
  },
  event: { ru: "Волга.ТОП", en: "Volga.TOP" },
  year: 2026,
  motto: {
    ru: "Дизайн, аналитика и разработка - в одной команде.",
    en: "Design, analysis and development in one team.",
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
      category: { ru: "Языки", en: "Languages" },
      items: ["C#", "SQL", "JavaScript", "TypeScript"],
    },
    {
      category: { ru: "Фронтенд", en: "Frontend" },
      items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS", "PostCSS"],
    },
    {
      category: { ru: "Бэкенд", en: "Backend" },
      items: [".NET", "ASP.NET Core", "Entity Framework", "LINQ"],
    },
    {
      category: { ru: "Данные и поиск", en: "Data and search" },
      items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "S3", "ACID"],
    },
    {
      category: { ru: "API и интеграции", en: "APIs and integrations" },
      items: [
        "REST API", "gRPC", "YARP", "JWT", "Telegram API", "Telegram Bot API", "Web Push",
        { ru: "Мобильные push-уведомления", en: "Mobile push notifications" },
        { ru: "Электронная почта", en: "Email" },
      ],
    },
    {
      category: { ru: "События и очереди", en: "Events and queues" },
      items: [
        "Apache Kafka", "RabbitMQ", "Transactional Outbox",
        { ru: "Идемпотентные консьюмеры", en: "Idempotent consumers" },
        { ru: "Дедупликация", en: "Deduplication" },
        { ru: "Очереди недоставленных сообщений (DLQ)", en: "Dead-letter queues (DLQ)" },
        { ru: "Доставка хотя бы один раз", en: "At-least-once delivery" },
      ],
    },
    {
      category: { ru: "Архитектура", en: "Architecture" },
      items: [
        { ru: "Микросервисы", en: "Microservices" },
        { ru: "Событийная архитектура", en: "Event-driven architecture" },
        { ru: "База данных на сервис", en: "Database per service" },
        { ru: "Согласованность в конечном счёте", en: "Eventual consistency" },
        { ru: "Шлюз API", en: "API gateway" },
        { ru: "Эшелонированная защита", en: "Defense in depth" },
      ],
    },
    {
      category: { ru: "Инфраструктура", en: "Infrastructure" },
      items: ["Docker", "Docker Compose", "Nginx", "CI/CD", "GitHub Actions"],
    },
    {
      category: { ru: "Наблюдаемость", en: "Observability" },
      items: ["Prometheus", "Grafana", "Loki"],
    },
    {
      category: { ru: "Разработка и тесты", en: "Development and testing" },
      items: [
        "Git", "Node.js", "npm", "ESLint",
        { ru: "Модульные тесты", en: "Unit tests" },
        { ru: "Контрактные тесты схем событий", en: "Event schema contract tests" },
      ],
    },
    {
      category: { ru: "ИИ и речь", en: "AI and speech" },
      items: [
        { ru: "ИИ-агенты", en: "AI agents" },
        { ru: "Распознавание речи", en: "Speech recognition" },
        { ru: "Синтез речи", en: "Speech synthesis" },
      ],
    },
  ],
};

export const members: Member[] = [
  {
    name: { ru: "Стукалов Артём Андреевич", en: "Artyom Andreyevich Stukalov" },
    role: {
      ru: "Дизайнер и координатор проекта",
      en: "Designer and project coordinator",
    },
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
