import type { StaticImageData } from "next/image";
import dobropayHome from "../app/assets/projects/dobropay.webp";
import teamHomeEn from "../app/assets/projects/team-en.webp";
import teamHomeRu from "../app/assets/projects/team-ru.webp";

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

interface StorySection {
  heading: Translation;
  text: Translation;
}

export interface Project {
  title: Translation;
  description: Translation;
  story: [StorySection, ...StorySection[]];
  screenshot: { image: Record<Locale, StaticImageData>; alt: Translation };
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
        ru: "К отбору на «Волга.ТОП» мы собрали на одной странице людей, их работы и технологии, которыми пользуемся вместе.",
        en: "For the Volga.TOP qualifiers, we built one page where you can meet the team, explore our work and see which tools we use together.",
      },
      screenshot: {
        image: { ru: teamHomeRu, en: teamHomeEn },
        alt: {
          ru: "Первый экран визитки с девизом команды и сферой из частиц, на которой видны названия технологий.",
          en: "The team homepage with our motto and a sphere of particles labelled with the technologies we use.",
        },
      },
      story: [
        {
          heading: { ru: "Знакомство с командой", en: "Meet the people behind the projects" },
          text: {
            ru: "Мы познакомились в Бауманке. Когда готовились к отбору, хотели показать, как наши навыки дополняют друг друга. Поэтому у каждого участника есть карточка с его ролью и достижениями, а у каждой работы — свой рассказ. Жюри может начать с проекта и тут же познакомиться с людьми, которые его сделали.",
            en: "We met at Bauman University. When we entered the qualifiers, we wanted to show how our skills fit together. Each team member has a card with their role and achievements, and each project has its own story. Judges can start with a project and meet the people who built it on the same page.",
          },
        },
        {
          heading: { ru: "Два языка, одна страница", en: "One page in two languages" },
          text: {
            ru: "Мы храним роли, проекты и переводы в одном файле TypeScript. При сборке Next.js создаёт из него русскую и английскую страницы. Проекты можно раскрывать, а язык переключать даже без JavaScript. Для интерактивной сферы мы берём названия прямо из списка навыков команды.",
            en: "We keep roles, projects and translations in one TypeScript file. At build time, Next.js uses it to generate the Russian and English pages. Visitors can expand a project or switch languages with JavaScript turned off. The interactive sphere draws its labels from our shared list of skills.",
          },
        },
        {
          heading: { ru: "Как мы обновляем сайт", en: "How we update the site" },
          text: {
            ru: "Чтобы добавить работу в портфолио, мы заполняем её карточку на двух языках. GitHub Actions проверяет код, типы и сборку перед слиянием. Готовую визитку запускаем одним контейнером через Docker Compose.",
            en: "To publish a project, we write its card in both languages. GitHub Actions checks the code, types and production build before we merge. We run the site in a single container with Docker Compose.",
          },
        },
      ],
      kind: "project",
      href: repository,
    },
    {
      title: { ru: "Dobropay", en: "Dobropay" },
      description: {
        ru: "Мы сделали платёжную песочницу, в которой магазин связывает оплату с заказом и узнаёт результат, даже если покупатель уже закрыл страницу.",
        en: "We built a payment sandbox that ties each payment to an order and tells the shop what happened, even after the customer closes the page.",
      },
      screenshot: {
        image: { ru: dobropayHome, en: dobropayHome },
        alt: {
          ru: "Главная Dobropay показывает покупку керамической кружки за 1 800 ₽, оплату через СБП и подтверждение заказа.",
          en: "The Dobropay homepage shows a 1,800-ruble mug order, its Faster Payments System checkout and the order confirmation.",
        },
      },
      story: [
        {
          heading: { ru: "Что видят магазин и покупатель", en: "What the shop and the customer see" },
          text: {
            ru: "Магазин передаёт номер заказа и сумму по API, а в ответ получает ссылку на оплату. Покупатель открывает её и проходит тестовую оплату. Роль банка в песочнице играет наш симулятор. Он подтверждает результат, магазин получает подписанное уведомление по HTTP, а при успешной оплате покупателю мы готовим демо-квитанцию.",
            en: "The shop sends an order number and amount to our API and gets a checkout link. The customer opens the link and makes a test payment. Our simulator plays the bank’s role in the sandbox. When it confirms the outcome, the shop receives a signed webhook and we prepare a demo receipt for the customer after a successful payment.",
          },
        },
        {
          heading: { ru: "Если запрос пришёл дважды", en: "When a request arrives twice" },
          text: {
            ru: "Если связь оборвалась после создания платежа, магазин может повторить тот же запрос с тем же Idempotency-Key. Мы вернём уже созданный платёж. Его статус и событие для Apache Kafka записываем одной транзакцией в PostgreSQL. Если брокер временно недоступен, событие дождётся отправки в Outbox. На стороне получателя Inbox распознает повтор по идентификатору события.",
            en: "If the connection drops after a payment is created, the shop can retry the same request with the same Idempotency-Key. We return the existing payment. We save its status change and the event for Apache Kafka in one PostgreSQL transaction. If the broker is down, the event waits in the outbox. Each consumer uses its inbox to recognise an event it has already processed.",
          },
        },
        {
          heading: { ru: "Семь сервисов и пять баз", en: "Seven services and five databases" },
          text: {
            ru: "Бэкенд мы разделили на семь микросервисов на .NET 10. У пяти из них своя база PostgreSQL 17. Auth хранит сессии, DeveloperApi — магазины и ключи, Payments — платежи, Notifications — подписки и доставки, Receipts — квитанции. Двум другим сервисам база не нужна. MerchantAdmin собирает данные для кабинета через внутренние API, а Email отправляет письма по SMTP.",
            en: "We split the .NET 10 backend into seven microservices. Five own a PostgreSQL 17 database each. Auth stores sessions, DeveloperApi manages shops and keys, Payments tracks payments, Notifications owns subscriptions and deliveries, and Receipts stores receipts. MerchantAdmin calls the other services’ APIs to build the dashboard, and Email sends mail over SMTP. Neither needs its own database.",
          },
        },
        {
          heading: { ru: "Как магазин узнаёт результат", en: "How the shop gets the result" },
          text: {
            ru: "В Kafka мы разделили сообщения провайдера и изменения статуса платежей по разным топикам. Notifications подписывает webhook и повторяет доставку при сбое. В Redis 7.4 держим ключ с коротким сроком жизни для каждого магазина, чтобы ограничить частоту отправки. За актуальным статусом кабинет обращается к Payments, где он хранится в PostgreSQL.",
            en: "Kafka carries provider callbacks and payment status changes in separate topics. Notifications signs each webhook and retries failed deliveries. We keep a short-lived key per shop in Redis 7.4 to limit how often we send webhooks. For the latest payment status, the dashboard asks Payments, which keeps the record in PostgreSQL.",
          },
        },
        {
          heading: { ru: "Как устроен демостенд", en: "Inside the demo environment" },
          text: {
            ru: "Кабинет и страницу оплаты мы сделали на Next.js. Caddy направляет запросы к интерфейсу и API, а Mailpit принимает тестовые письма с квитанциями по SMTP. Docker Compose поднимает контейнеры, запускает миграции и проверяет готовность сервисов. Так мы можем пройти весь путь заказа на одном стенде.",
            en: "We built the merchant dashboard and checkout with Next.js. Caddy routes requests to the frontend and APIs, and Mailpit catches test receipt emails over SMTP. Docker Compose starts the containers, runs migrations and checks service readiness, so we can follow an order from checkout to receipt in one environment.",
          },
        },
      ],
      kind: "project",
      href: "https://github.com/akkne/dobropay",
    },
  ] satisfies Project[],
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
