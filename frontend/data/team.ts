import type { StaticImageData } from "next/image";
import dobropayHome from "../app/assets/projects/dobropay.webp";
import qaAgentActivity from "../app/assets/projects/qa-agent-activity.webp";
import sellevateHome from "../app/assets/projects/sellevate.webp";

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
  story?: [StorySection & { screenshot: ProjectScreenshot }, ...StorySection[]];
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
      ],
      kind: "project",
      href: "https://github.com/akkne/qa-tester-agent",
    },
    {
      title: { ru: "Sellevate", en: "Sellevate" },
      description: {
        ru: "Артемий Стёпкин развивает Sellevate как сооснователь и технический руководитель. Платформа помогает компаниям обучать отделы продаж с помощью ИИ-агентов. Менеджеры тренируются отвечать на возражения покупателя до звонка реальному клиенту.",
        en: "Artemiy Styopkin is the co-founder and tech lead of Sellevate, a B2B platform that uses AI agents to train sales teams. Sales reps practice responding to buyer objections before they speak to a customer.",
      },
      story: [
        {
          screenshot: {
            image: { ru: sellevateHome, en: sellevateHome },
            alt: {
              ru: "Главная страница Sellevate показывает четыре возможности тренажёра, включая голосовые звонки и разбор каждой попытки.",
              en: "The Sellevate homepage presents four training features, including voice calls and feedback on each attempt.",
            },
          },
          heading: { ru: "Руководитель назначает практику и разбирает разговоры", en: "Sales managers assign practice and review conversations" },
          text: {
            ru: "Руководитель отдела выбирает сотрудников, задаёт срок задания и проходной балл. Менеджер ведёт диалог с ИИ-покупателем в чате или голосом и получает оценку своей попытки. Руководитель видит, кто достиг нужного результата, и может открыть конкретный разговор, чтобы обсудить ответ на возражение.",
            en: "A sales manager assigns practice to selected reps and sets a deadline and a passing score. Each rep speaks or chats with an AI buyer and receives feedback on the attempt. The manager can see who reached the target and open a conversation to discuss how a rep handled an objection.",
          },
        },
        {
          heading: { ru: "ИИ-покупатель поддерживает голосовой диалог", en: "The AI buyer can carry on a voice conversation" },
          text: {
            ru: "Сервис ИИ передаёт речь менеджера в OpenAI Whisper для распознавания. Языковая модель формирует реплику от лица покупателя, а Yandex SpeechKit озвучивает ответ. Менеджер может повторить сценарий с другой формулировкой и сравнить обратную связь.",
            en: "The AI service sends the rep’s speech to OpenAI Whisper for transcription. A language model generates the buyer’s reply, and Yandex SpeechKit reads it aloud. Reps can repeat the scenario, try a different approach and compare the feedback.",
          },
        },
        {
          heading: { ru: "Платформа распределяет задачи между десятью микросервисами", en: "Ten backend services run the platform" },
          text: {
            ru: "Шлюз YARP направляет запросы в сервисы обучения, компаний, организаций, учётных записей, ИИ, аналитики, уведомлений, общения и игровых достижений. Десятый сервис выполняет текстовые запросы через Codex CLI. Сервис обучения публикует события о завершении уроков в Apache Kafka, а сервис достижений по этим событиям обновляет прогресс сотрудника.",
            en: "The YARP gateway routes requests to services for learning, customer companies, organizations, identity, AI, analytics, notifications, social features and gamification. A tenth service runs text requests through Codex CLI. The learning service publishes lesson completions to Apache Kafka, and the gamification service uses those events to update each rep’s progress.",
          },
        },
      ],
      kind: "project",
      href: "https://github.com/akkne/sellevate",
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
      {
        ru: "Артемий руководит разработкой Sellevate как сооснователь проекта.",
        en: "Artemiy co-founded Sellevate and leads its engineering team.",
      },
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
