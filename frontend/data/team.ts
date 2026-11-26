import type { StaticImageData } from "next/image";
import dobropayHome from "../app/assets/projects/dobropay.webp";
import qaAgentActivity from "../app/assets/projects/qa-agent-activity.webp";
import qaAgentResult from "../app/assets/projects/qa-agent-result.webp";
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

interface ProjectScreenshot {
  image: Record<Locale, StaticImageData>;
  alt: Translation;
}

interface StorySection {
  heading: Translation;
  text: Translation;
  screenshot?: ProjectScreenshot;
}

export interface Project {
  title: Translation;
  description: Translation;
  story: [StorySection & { screenshot: ProjectScreenshot }, ...StorySection[]];
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
        ru: "Мы разработали сайт для отборочного этапа хакатона «Волга.ТОП». Члены жюри могут посмотреть работы команды, открыть их исходный код и узнать, какую роль выполняет каждый из четырёх участников.",
        en: "We built this site for the qualifying round of the Volga.TOP hackathon. Judges can review our projects, inspect the source code and see what each of the four team members contributes.",
      },
      story: [
        {
          screenshot: {
            image: { ru: teamHomeRu, en: teamHomeEn },
            alt: {
              ru: "Сфера справа от девиза команды показывает названия технологий.",
              en: "A sphere to the right of the team motto displays the names of technologies we use.",
            },
          },
          heading: { ru: "Посетители могут читать портфолио без JavaScript", en: "Visitors can read the portfolio without JavaScript" },
          text: {
            ru: "Мы храним сведения об участниках, описания проектов и переводы в одном файле TypeScript. Next.js при сборке создаёт из этих данных две HTML-страницы. Посетитель может переключить язык по ссылке и раскрыть описание проекта, даже если браузер блокирует скрипты.",
            en: "We keep member profiles, project descriptions and translations in one TypeScript file. Next.js generates two HTML pages from that file at build time. Visitors can follow a link to switch languages and expand each project description even if their browser blocks scripts.",
          },
        },
        {
          heading: { ru: "Сфера показывает технологии команды", en: "The sphere displays the technologies we use" },
          text: {
            ru: "Мы нарисовали сферу из частиц с помощью Canvas 2D. Посетитель может вращать её мышью или пальцем. Сфера берёт подписи из раздела «Навыки», поэтому новая технология появляется и в списке, и на сфере после одной правки.",
            en: "We used Canvas 2D to draw the sphere from individual particles. Visitors can drag it with a mouse or a finger to rotate it. The sphere takes its labels from the Skills section, so adding a technology to the list also adds it to the animation.",
          },
        },
      ],
      kind: "project",
      href: repository,
    },
    {
      title: { ru: "Dobropay", en: "Dobropay" },
      description: {
        ru: "Dobropay связывает заказ интернет-магазина с платежом по API. Магазин получает уведомление о смене статуса на свой сервер, даже если покупатель уже закрыл страницу оплаты.",
        en: "Dobropay links an online order to a payment through an API. The shop receives status updates on its own server even after the customer closes the checkout page.",
      },
      story: [
        {
          screenshot: {
            image: { ru: dobropayHome, en: dobropayHome },
            alt: {
              ru: "Главная страница Dobropay показывает заказ керамической кружки за 1 800 ₽ и выбор оплаты через СБП.",
              en: "The Dobropay homepage shows an order for a ceramic mug priced at 1,800 rubles and the option to pay through Russia’s Faster Payments System.",
            },
          },
          heading: { ru: "Мы разработали семь микросервисов на .NET 10", en: "We built seven microservices on .NET 10" },
          text: {
            ru: "Auth проверяет учётные данные сотрудников, а DeveloperApi управляет магазинами и ключами API. Payments ведёт учёт платежей, Notifications доставляет уведомления магазинам, а Receipts хранит чеки. Каждый из этих пяти сервисов использует собственную базу PostgreSQL. MerchantAdmin собирает данные для личного кабинета через внутренние API, а Email отправляет письма по SMTP.",
            en: "Auth verifies staff credentials, and DeveloperApi manages shops and API keys. Payments tracks payments, Notifications delivers updates to shops, and Receipts stores receipts. Each of these five services has its own PostgreSQL database. MerchantAdmin gathers data for the merchant dashboard through internal APIs, and Email sends messages over SMTP.",
          },
        },
        {
          heading: { ru: "Магазин может повторить запрос после обрыва связи", en: "A shop can retry a request after a connection failure" },
          text: {
            ru: "Магазин указывает уникальный ключ в заголовке Idempotency-Key при создании платежа. Сервис Payments возвращает сведения об уже созданном платеже, если магазин повторяет тот же запрос с тем же ключом. Сервис отклоняет запрос с кодом HTTP 409, если магазин использует прежний ключ для другой суммы.",
            en: "The shop sends an Idempotency-Key header when it creates a payment. Payments returns the existing payment details if the shop retries the same request with the same key. The API returns HTTP 409 if the shop reuses that key for a different amount.",
          },
        },
        {
          heading: { ru: "Сервис уведомлений повторяет доставку при сбое", en: "The notification service retries failed deliveries" },
          text: {
            ru: "Payments сохраняет новый статус платежа и событие для Apache Kafka в одной транзакции PostgreSQL. Notifications получает событие из Kafka и отправляет магазину HTTP-уведомление с подписью HMAC-SHA256. Сервис сохраняет результат каждой попытки и повторяет отправку, если сервер магазина временно недоступен.",
            en: "Payments saves the new payment status and its Apache Kafka event in a single PostgreSQL transaction. Notifications reads the event from Kafka and sends the shop a webhook signed with HMAC-SHA256. The service records each delivery attempt and retries if the shop’s server is temporarily unavailable.",
          },
        },
      ],
      kind: "project",
      href: "https://github.com/akkne/dobropay",
    },
    {
      title: { ru: "QA Tester Agent", en: "QA Tester Agent" },
      description: {
        ru: "Разработчик отправляет изменения в GitHub привычной командой git push. QA Tester Agent сам сверяет код с требованиями, пишет тесты для изменённого поведения и запускает их вместе с существующими проверками. Команда получает тесты и отчёт по коммиту в отдельной ветке.",
        en: "A developer pushes changes to GitHub as usual. QA Tester Agent automatically checks the code against the requirements, writes tests for the changed behavior and runs them alongside the existing suite. The team gets the tests and a report for that commit on a separate branch.",
      },
      story: [
        {
          screenshot: {
            image: { ru: qaAgentActivity, en: qaAgentActivity },
            alt: {
              ru: "Лента проверки показывает, как агент находит пять изменённых файлов, читает спецификацию и начинает составлять план.",
              en: "The activity feed shows the agent identifying five changed files, reading the specification and starting its test plan.",
            },
          },
          heading: { ru: "Команда подключает репозиторий один раз", en: "The team connects its repository once" },
          text: {
            ru: "Команда выбирает ветку и указывает, где лежат требования к продукту. GitHub Actions передаёт агенту диапазон коммитов при следующем push. Агент определяет, какие требования затронуло изменение, и проверяет обычные сценарии, граничные значения и обработку ошибок.",
            en: "The team selects a branch and points the agent to the product requirements. GitHub Actions sends the agent the commit range on the next push. The agent identifies which requirements the change affects and checks expected behavior, boundary cases and error handling.",
          },
        },
        {
          heading: { ru: "Агент использует язык и тестовый фреймворк проекта", en: "The agent uses the project’s own language and test framework" },
          text: {
            ru: "Агент читает конфигурацию сборки и существующие тесты, подбирает команды запуска и добавляет новые проверки в том же формате. Контейнер включает среды для Node.js, Python, Java, Go и .NET. Агент может установить дополнительные инструменты, если проекту нужен другой стек. Сервис сверяет коды завершения команд с отчётами JUnit или TRX, прежде чем подтвердить результат.",
            en: "The agent reads the build configuration and existing tests, selects the commands to run and writes new tests in the same framework. The container includes Node.js, Python, Java, Go and .NET. The agent can install additional tools for other stacks. The service checks command exit codes against JUnit or TRX reports before confirming a pass.",
          },
        },
        {
          heading: { ru: "Команда использует подписку ChatGPT для регулярных проверок", en: "The team can use its ChatGPT subscription for recurring checks" },
          text: {
            ru: "Агент вызывает модель через Codex CLI с учётной записью ChatGPT. Команда с подпиской, в которую входит Codex, может проверять изменения в пределах лимитов тарифа без отдельной оплаты токенов по API. Отчёт показывает расход входных и выходных токенов по каждому запуску.",
            en: "The agent calls the model through Codex CLI using a ChatGPT account. A team with an eligible subscription can use its included allowance for checks without a separate API token charge. Each run report shows how many input and output tokens the model used.",
          },
        },
        {
          heading: { ru: "Проверка из 663 тестов заняла две с половиной минуты", en: "The agent ran 663 tests in two and a half minutes" },
          text: {
            ru: "Агент добавил два теста для новой команды /ping и запустил их вместе с остальным набором. Все 663 теста прошли, а весь цикл до публикации отчёта занял 150,7 секунды. Команда может открыть отчёт по коммиту и проверить результат по журналу команд.",
            en: "The agent wrote two tests for a new /ping command and ran them alongside the existing suite. All 663 tests passed, and the full run through report publication took 150.7 seconds. The team can open the report for the commit and verify the result against the command log.",
          },
          screenshot: {
            image: { ru: qaAgentResult, en: qaAgentResult },
            alt: {
              ru: "Журнал фиксирует сборку двух новых тестов, результат всех 663 проверок без падений и публикацию отчёта за 150,7 секунды.",
              en: "The run log records two new tests compiling, all 663 tests passing and the report being published within 150.7 seconds.",
            },
          },
        },
      ],
      kind: "project",
      href: "https://github.com/akkne/qa-tester-agent",
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
