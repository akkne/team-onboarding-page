# Спецификация адаптации дизайн-системы Astryx

Документ фиксирует архитектурные правила, маппинг компонентов, перечень дорабатываемых модулей и дизайн-токены для внедрения дизайн-системы **Astryx** (`https://github.com/meta/astryx`) в сайт-визитку команды **recessed maxilla team** (отборочное задание «Волга.ТОП» 2026).

Спецификация опирается на текущую документацию проекта — [карту экранов](screens.md), [ведомость компонентов](components.md), [описание функций](features-description.md), [дизайн-систему](design-system.md), [архитектуру](architecture.md), [стек](tech-stack.md), [стиль кода](code-style.md) — и на исходники Astryx (`@astryxdesign/core@0.7.18`, срез репозитория `ac3e9a5`). Принятое решение зафиксировано в [ADR 0004](decisions/0004-astryx-design-system.md).

> **Статус реализации.** Документ описывает целевую спецификацию для следующего этапа разработки. В текущей версии `frontend/` пакеты Astryx ещё не установлены, а приложение отображает стартовую страницу-приветствие на `/ru` и `/en`.

---

## 1. Общая концепция и правила адаптации Astryx под наш стек

### 1.1. Совместимость со стеком и способ подключения

Стек проекта: **Next.js 16.4.6 (App Router, `output: "standalone"`, статическая генерация `/ru` и `/en`)**, **React 19.2+**, **TypeScript 5**, **Tailwind CSS 4** (`@tailwindcss/postcss`), **Node.js 22**.

Astryx (`@astryxdesign/core@0.7.18`, лицензия MIT) требует `react >= 19.0.0`, `react-dom >= 19.0.0` и `@stylexjs/stylex ^0.19.0` в `peerDependencies`. Несмотря на то что внутри библиотека написана на StyleX, она поставляет **предсобранные CSS и ESM-модули (pre-built dist)**. Это позволяет подключить её к нашему Next.js + Tailwind CSS 4 проекту **без StyleX build-плагина, Babel и изменений в `next.config.ts` / `postcss.config.mjs`**.

Целевой состав зависимостей в `frontend/package.json` на этапе внедрения:

| Пакет | Раздел | Назначение |
| --- | --- | --- |
| `@astryxdesign/core` | `dependencies` | Компоненты, провайдеры (`Theme`, `LinkProvider`, `InternationalizationProvider`), `reset.css`, `astryx.css`, `tailwind-theme.css`, локаль `ru-RU` |
| `@astryxdesign/theme-neutral` | `dependencies` | Базовая предсобранная тема для расширения (`extends: neutralTheme`) и реестр иконок на базе `lucide-react` |
| `@stylexjs/stylex` | `dependencies` | Обязательная peer-зависимость рантайма `@astryxdesign/core` |
| `@astryxdesign/cli` | `devDependencies` | Сборка предсобранного CSS кастомной темы (`astryx theme build`), аудит (`astryx doctor`), справка по API. Версия строго совпадает с `@astryxdesign/core` |

### 1.2. Сосуществование слоёв CSS: Astryx + Tailwind CSS 4

Astryx размещает свои стили в CSS-слоях `@layer reset`, `@layer astryx-base`, `@layer astryx-theme`. Tailwind CSS 4 использует слои `theme`, `base`, `components`, `utilities`. По официальному контракту Astryx (`packages/cli/assets/docs/tree/tailwind.doc.mjs` и `apps/example-nextjs-tailwind`), **все слои должны быть объявлены в первой строке `frontend/app/globals.css` до любых `@import`**, а сам `globals.css` обязан быть первым CSS-импортом в `frontend/app/[lang]/layout.tsx`.

Нарушение порядка (размещение `@layer` ниже `@import "tailwindcss"`) молча инвертирует каскад: слои Astryx окажутся приоритетнее Tailwind `utilities`, и переопределения через `className` перестанут работать.

Рекомендуемая структура `frontend/app/globals.css` (с подключением моста `@astryxdesign/core/tailwind-theme.css`, использующего `@theme reference inline` в полном соответствии с [стилем кода](code-style.md)):

```css
@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "@astryxdesign/core/reset.css";
@import "@astryxdesign/core/astryx.css";
@import "../themes/recessed-maxilla/theme.css";
@import "@astryxdesign/core/tailwind-theme.css";
@import "tailwindcss/utilities.css" layer(utilities);

/* Псевдонимы обратной совместимости с текущими классами проекта */
@theme reference inline {
  --color-canvas: var(--color-background-body);
  --color-ink: var(--color-text-primary);
}
```

Ключевые правила работы со стилями:
- **Не импортировать `fonts.css` из `@astryxdesign/theme-neutral` или `@astryxdesign/theme-matcha`** (см. ограничение по кириллице в разделе 1.4).
- **Разделение ответственности:** Astryx отвечает за компоненты и их состояния (hover, pressed, focus-visible, forced-colors, reduced-motion); Tailwind CSS 4 отвечает за внешнюю вёрстку, адаптивные отступы и утилиты поверх токенов Astryx (`bg-body`, `bg-surface`, `bg-card`, `text-primary`, `text-secondary`, `border-border`, `rounded-lg`).
- **Отсутствие коллизий токенов:** текущие переменные `--canvas` и `--ink` не пересекаются с пространством имён Astryx (`--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--text-*`, `--font-*`).

### 1.3. Провайдеры, RSC-границы, SSR и работа без JavaScript

Аудит исходников `@astryxdesign/core` показал распределение компонентов по границам React Server Components:
- **Server-safe (без `'use client'`):** `Section`, `Grid`, `Stack`, `HStack`, `VStack`, `Card`, `Badge`, `VisuallyHidden`.
- **Client Components (`'use client'`):** `Theme`, `LinkProvider`, `InternationalizationProvider`, `AppShell`, `TopNav`, `TopNavHeading`, `TopNavItem`, `Layout`, `LayoutFooter`, `Heading`, `Text`, `Link`, `Button`, `ButtonGroup`, `SegmentedControl`, `TabList`, `Avatar`, `Token`, `Divider`, `Icon`, `MetadataList`, `ClickableCard`.

Правила интеграции в Next.js App Router (`frontend/app/[lang]/`):
1. **Данные и локализация контента остаются на сервере.** Структурированные данные участников, навыков и проектов (`frontend/data/`) и словари RU/EN загружаются в серверном компоненте `frontend/app/[lang]/page.tsx`.
2. **Единый клиентский слой провайдеров** `frontend/app/[lang]/providers.tsx` (`'use client'`):
   - `<Theme theme={recessedMaxillaTheme} mode="system">` — по умолчанию `mode="system"` не записывает принудительный `data-theme`, опирается на `color-scheme: light dark` из `reset.css` и автоматически следует системной светлой/тёмной теме ОС (как требует [design-system.md](design-system.md)).
   - `<LinkProvider component={NextLink}>` — направляет все ссылки Astryx (`Link`, `TopNavItem`, `Button href`) через `next/link`.
   - `<InternationalizationProvider locale={lang === 'ru' ? 'ru-RU' : 'en-US'} messages={lang === 'ru' ? {'ru-RU': ruCatalog} : undefined}>` с предгенерированным каталогом `@astryxdesign/core/locales/ru-RU.generated.js` — переводит встроенные служебные строки Astryx (например, `(откроется в новой вкладке)` у `Link` с `isExternalLink`, `Перейти к содержимому` и подписи навигации). При этом продуктовые тексты визитки остаются в нашем словаре (согласно контракту `architecture:internationalization` INV1).
3. **Гарантия SSR и работы при отключённом JavaScript** (требование [architecture.md](architecture.md)):
   - Кастомная тема обязательно компилируется заранее через `npx @astryxdesign/cli theme build` (создаёт `theme.css` и модуль с флагом `__built`), чтобы `<Theme>` не выполнял клиентскую runtime-инъекцию `<style>` через `useInsertionEffect`.
   - В серверном `frontend/app/[lang]/layout.tsx` на тег `<html>` сразу выводится `data-astryx-theme="recessed-maxilla"` (`<html lang={lang} data-astryx-theme="recessed-maxilla">`). Благодаря этому `@scope`-селекторы и CSS-токены применяются до гидратации и при полностью отключённом JS.
   - Вся навигация (переключатель `/ru` ↔ `/en`, 5 якорных ссылок `#about`..`#contact`, внешние контакты и проекты) реализуется реальными элементами `<a>` с `href`, без `onClick`-переходов.

### 1.4. Выявленные ограничения Astryx для нашего проекта

По результатам проверки исходного кода Astryx зафиксированы шесть ограничений, напрямую влияющих на проектирование:

1. **Отсутствие кириллицы в шрифтах готовых тем.** В `@astryxdesign/theme-neutral/fonts.css` (`Figtree`) и `@astryxdesign/theme-matcha/fonts.css` (`DM Sans`, `Playwrite US Trad`) упакованы только наборы `latin` и `latin-ext` (кириллица есть лишь в `JetBrains Mono`). При подключении этих шрифтов русская версия `/ru` откатывалась бы на системные шрифты (а заголовки в `matcha` — на serif `Georgia`), ломая визуальное единство RU и EN. **Решение:** сохранять системный стек без засечек из [design-system.md](design-system.md) (он же является дефолтом `@astryxdesign/core`), одинаково поддерживающий кириллицу и латиницу без внешних сетевых запросов.
2. **`BaseProps` исключает HTML-атрибут `lang` (а `LinkProps` — `hrefLang`).** В `packages/core/src/BaseProps.ts` атрибут `lang` явно удалён через `Omit<React.HTMLAttributes<T>, ... | 'lang'>`. Для корректного озвучивания названия команды `recessed maxilla team` на `/ru` (`lang="en"`) нужно оборачивать название во внутренний `<span lang="en">` внутри `<Heading level={1}>`, а переключатель языков `RU` / `EN` (где требуются `lang` и `hrefLang`) реализовать собственным компонентом поверх нативных ссылок.
3. **`AppShell` + `TopNav` сворачивают меню на 360 px в JS-дровер `MobileNav`.** Ниже брейкпоинта `md` (768 px) `TopNav` скрывает пункты в кнопку бургер-меню и обрезает заголовок в одну строку (`white-space: nowrap; text-overflow: ellipsis`). Это противоречит [components.md](components.md) («на телефоне ссылки переносятся целиком, остаются видны и доступны с клавиатуры») и [screens.md](screens.md) (название и девиз могут занимать несколько строк на 360 px). **Решение:** отказаться от `MobileNav`-дровера и `TopNavHeading`, собрав адаптивную шапку с переносящимся якорным меню (`flex-wrap`).
4. **`Section` в Astryx рендерит `<div>`, а не семантический `<section>`.** Кроме того, `Section` применяет отрицательные поля для компенсации вложенного `container`-паддинга. **Решение:** для пяти разделов визитки использовать семантический HTML `<section id="..." aria-labelledby="...">` (компонент `PageSection`) в сочетании с `VStack` и `Divider` из Astryx.
5. **`Avatar` нельзя использовать для эмблемы команды.** Документация `Avatar.doc.mjs` прямо запрещает применять `Avatar` для логотипов и графики, не представляющей человека. **Решение:** создать отдельный SVG-компонент `TeamEmblem`.
6. **Принцип сдержанного использования `Card`.** Согласно `Card.doc.mjs`, `Card` предназначен исключительно для дискретных сущностей (профиль участника, проект), а не для оборачивания целых секций страницы. Это полностью согласуется с нашей композицией: разделы отделяются воздухом и `Divider`, а `Card` применяется только к карточкам участников и проектов.

---

## 2. Таблица соответствия: проект → Astryx → кастомизация

В таблице сопоставлены все экраны, сценарии и элементы из [screens.md](screens.md), [components.md](components.md) и [features-description.md](features-description.md).

| Фича / экран / блок проекта | Компонент / блок Astryx | Необходимая кастомизация и правила использования |
| --- | --- | --- |
| **Корневой каркас, темы, роутинг и i18n** (`/ru`, `/en`, системная светлая/тёмная тема, skip-link) | `Theme`, `LinkProvider`, `InternationalizationProvider`, `VisuallyHidden` | Вынести провайдеры в `frontend/app/[lang]/providers.tsx` (`mode="system"`, предсобранная тема `recessedMaxillaTheme`, каталог `ru-RU.generated.js` для `/ru`). Добавить `data-astryx-theme="recessed-maxilla"` на `<html>` в `layout.tsx` для SSR/no-JS. Добавить ссылку «Перейти к содержимому / Skip to content» с `VisuallyHidden` (либо `AppShell` с `height="auto"` и `mobileNav={false}`, если не мешает расположению `<h1>` в шапке — предпочтительнее лёгкий семантический каркас `<header>` / `<main>` / `<footer>` с `max-w-5xl`). |
| **Шапка: блок идентификации** (эмблема, `recessed maxilla team` как `<h1>`, девиз) | `HStack`, `VStack`, `Heading`, `Text`, `Divider` | `Heading` с `level={1}`, `type="display-2"` (адаптивный размер через Tailwind/тему), `textWrap="balance"`; внутри — `<span lang="en">{teamName}</span>` (обход `Omit<'lang'>` в `BaseProps`). Девиз — `Text` (`as="p"`, `type="large"`, `color="secondary"`). Эмблема — кастомный `TeamEmblem` с `aria-hidden="true"` (по [components.md](components.md), чтобы не дублировать `<h1>` для скринридера). Разрешить многострочный перенос на 360 px. |
| **Шапка: переключатель языка** (`RU` / `EN`, `aria-label` группы «Язык страницы / Page language», ссылок — «Русский» / «English», работа без JS) | **Нет прямой замены** (используются только токены Astryx через Tailwind Bridge) | Реализовать кастомный `LanguageSwitcher` (`<nav aria-label={...}>` + две ссылки `next/link` / `<a>` с `href="/ru"` и `href="/en"`, `lang`, `hrefLang`, `aria-label`, `aria-current={active ? "page" : undefined}`). Активное состояние — инверсия (`aria-current:bg-[var(--color-accent)] aria-current:text-[var(--color-on-accent)]`), фокус — токены `--focus-outline-*`. Всегда держать RU и EN в одну строку рядом даже на 360 px. |
| **Шапка: якорное меню** (5 ссылок на разделы `#about`, `#members`, `#skills`, `#projects`, `#contact`) | `TopNavItem` или `Link` внутри `HStack` (`as="ul"`, `wrap="wrap"`) | Разместить в отдельном `<nav aria-label="Разделы страницы / Page sections">`. Использовать `TopNavItem` (как визуальную пилюлю навигации с готовыми hover/focus-visible/press состояниями) либо `Link` (`color="secondary"`, `isStandalone`) с `whitespace-nowrap`, чтобы на 360 px ссылки переносились **целиком**, не разрывались внутри слова и не прятались в мобильный дровер. |
| **Секция «О команде / About us»** (заголовок и несколько абзацев о составе и мотивации) | `Heading`, `Text`, `VStack` | Обернуть в семантический `<section id="about" aria-labelledby="about-heading">` (`PageSection`). Заголовок — `Heading` (`level={2}`, `id="about-heading"`). Абзацы — `Text` (`as="p"`, `type="body"`), ограничить ширину строки `max-w-prose` (`65ch`) для комфортного чтения на 1440 px (`design:typography-hierarchy` DR5). |
| **Секция «Участники / Members» — сетка карточек** (3–5 участников; 1 / 2 / 3 колонки на 360 / 768 / 1440 px; нечётная карточка не растягивается) | `Grid`, `Heading`, `VStack` | `Grid` с `columns={{ minWidth: 280, max: 3, repeat: 'fill' }}` и `gap={6}` (или `gap={4}` на 360 px через адаптивный класс). Режим `repeat: 'fill'` гарантирует сохранение ширины колонки для нечётной последней карточки на 768 px (4 или 5 участников) и 1440 px (4 или 5 участников). |
| **Карточка участника** (фото/аватар, имя, роль, группа, навыки, личный контакт или контакт капитана) | `Card`, `Avatar`, `Heading`, `Text`, `Token`, `Link`, `VStack`, `HStack` | `Card` (`variant="default"`, `elevation="none"`). `Avatar` (`size={64}`, `shape="circle"`, `src={member.avatarUrl}`, `name={member.name}`, `tooltip={false}`) — фото и инициалы/графический аватар занимают ровно один слот `64×64 px`. Порядок DOM строго: `Heading` (`level={3}` — имя) → `Text` (`type="label"` — роль, допускает 2 строки) → `Text` (`type="supporting"`, `color="secondary"` — учебная группа) → группа `Token` (навыки) → `Link` в нижней части карточки (`mt-auto` через flex-колонку для выравнивания карточек в ряду). |
| **Группа меток навыков** (в карточке участника и в 3 категориях секции «Навыки команды / Team skills»: Языки / Технологии / Инструменты) | `Token` (read-only) или `Badge` (`variant="neutral"`) + `HStack` (`as="ul"`, `wrap="wrap"`) | Для `Token`: передавать **только** `label`, `size="sm"`, `color="default"` (строго без `onClick`, `href`, `onRemove`) — компонент рендерится как обычный `<span>` без роли кнопки и таб-остановки. Для чисто серверного рендера без клиентской гидратации альтернатива — `Badge` (`variant="neutral"`). В секции навыков каждую из 3 категорий оформить `VStack` + `Heading` (`level={3}`) + список `<ul>`/`<li>`. |
| **Секция «Проекты / Projects» и карточка проекта / идеи** (заголовок, текстовая пометка типа, описание, опциональная ссылка) | `Grid`, `Card`, `Badge`, `Heading`, `Text`, `Link`, `VStack`, `HStack` | `Grid` с `columns={{ minWidth: 340, max: 2, repeat: 'fill' }}` и `gap={6}` (1 колонка на 360 px, до 2 колонок на широких экранах). Внутри `Card` (`variant="default"`): строка заголовка `Heading` (`level={3}`) + `Badge` с текстовой меткой типа (`variant="teal"` для «Проект / Project», `variant="neutral"` для «Идея / Idea» — различимо по тексту в обеих темах и в `forced-colors`). Описание — `Text` (`as="p"`, `type="body"`). Ссылка рендерится **только при наличии `url`** (никаких пустых слотов). |
| **Контактные и внешние ссылки** (в карточках и подвале: «Связаться с капитаном / Contact the captain», «Открыть проект / View project», «Репозиторий / Repository») | `Link`, `VisuallyHidden` | `Link` с `isStandalone`, `hasUnderline` (или подчёркивание при hover + явный цвет ссылки) и `isExternalLink` для `http(s)://` (автоматически добавляет `target="_blank"`, `rel="noopener noreferrer"`, иконку `externalLink` и локализованный `<VisuallyHidden>(откроется в новой вкладке) / (opens in new tab)</VisuallyHidden>`). Для `mailto:` — без `isExternalLink`. Для повторяющихся ссылок добавлять уточнение адресата/проекта через `<VisuallyHidden>` внутри текста ссылки, сохраняя видимый текст в начале доступного имени (WCAG 2.5.3). |
| **Подвал / секция «Контакты / Contact»** (заголовок и 2 ссылки: контакт капитана и репозиторий) | `Divider`, `Heading`, `Link`, `VStack`, `Stack` (или `LayoutFooter`) | Семантический `<footer id="contact" aria-labelledby="contact-heading">` поверх `Divider` (`variant="subtle"`). Заголовок `Heading` (`level={2}`, `id="contact-heading"`). Две ссылки в контейнере `flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6` — вертикально на 360 px и в ряд на ≥ 640 / 768 / 1440 px. |

### Компоненты Astryx, которые намеренно **не** используются

- **`SegmentedControl`** — это `role="radiogroup"` для клиентского выбора значения/режима (`value`/`onChange`, требует JS). Документация `SegmentedControl.doc.mjs` прямо указывает не применять его для навигации между страницами.
- **`TabList` / `Tab`** — ориентирован на переключение представлений с горизонтальной прокруткой (`overflow: scroll`) и не даёт нужной для `/ru` ↔ `/en` семантики `hrefLang` / `lang` без JS и инверсного стиля из [design-system.md](design-system.md).
- **`ButtonGroup`** — реализует roving tabindex на JS и предназначен для действий над объектом, а не для навигационных ссылок (`ButtonGroup.doc.mjs`).
- **`MobileNav` (автоматический дровер `AppShell`)** — прячет 5 якорных ссылок на 360 px за кнопку с JS-состоянием, что противоречит требованию видимого переноса меню на мобильном экране.
- **`ClickableCard`** — делает кликабельной всю поверхность карточки, тогда как в нашей визитке карточки проектов могут не иметь ссылки, а переходы по [screens.md](screens.md) оформляются явными обычными ссылками.
- **`MetadataList`** — семантически строит пары «ключ — значение» (`<dl>`), что избыточно для компактной карточки участника, где роль и группа читаются непосредственно под именем (`Heading` + `Text`).

---

## 3. Недостающие компоненты (собственная разработка)

Ниже перечислены проектные и композитные компоненты, которых нет в `@astryxdesign/core` в готовом виде (либо чьи штатные аналоги не отвечают требованиям RU/EN, no-JS и семантики). Все они размещаются в `frontend/components/`, оформляются утилитами Tailwind CSS 4 поверх токенов Astryx и переиспользуют примитивы ядра.

| Компонент (`frontend/components/`) | Почему пишем сами | Контракт и требования к реализации |
| --- | --- | --- |
| **`TeamEmblem.tsx`** | `Avatar` запрещён для логотипов; в Astryx нет бренд-эмблемы команды | Инлайн-SVG эмблема `recessed maxilla team` с `currentColor` (автоматическая адаптация под светлую/тёмную темы и `forced-colors`), `aria-hidden="true"` и `focusable="false"` рядом с текстовым `<h1>`. |
| **`LanguageSwitcher.tsx`** | В Astryx нет zero-JS переключателя локали на ссылках с `lang`, `hrefLang` и инверсным выделением | `<nav aria-label={copy.language}>` с двумя ссылками `next/link` (`/ru`, `/en`), атрибутами `lang`, `hrefLang`, `aria-label="Русский" \| "English"`, `aria-current={active ? "page" : undefined}`. Стилизация через токены `--color-accent`, `--color-on-accent`, `--focus-outline-*`. Работает без JS и сохраняет одну строку на 360 px. |
| **`SiteHeader.tsx` + `AnchorNav.tsx`** | `TopNav` + `AppShell` сворачивают меню на < 768 px в JS-дровер и не рассчитаны на `<h1>` + многострочный девиз | Семантический `<header>` с skip-link (`VisuallyHidden` до фокуса), верхней строкой (эмблема + `<h1>` + `LanguageSwitcher`), строкой девиза (`Text`), разделителем и `<nav aria-label={copy.sectionsNav}>` с переносящимся списком из 5 якорных ссылок (`#about`, `#members`, `#skills`, `#projects`, `#contact`) на `TopNavItem` или `Link`. |
| **`PageSection.tsx`** | Astryx `Section` рендерит `<div>` вместо `<section>` и добавляет negative-margin компенсацию | Лёгкая обёртка `<section id={id} aria-labelledby={headingId} className="scroll-mt-6">` с `VStack gap={6}` и `Heading level={2} id={headingId}`. Гарантирует единообразную иерархию заголовков и корректный скролл по якорям. |
| **`MemberCard.tsx`** | Доменная карточка участника с фиксированным порядком чтения и fallback-логикой фото/контакта | Собирается из Astryx `Card`, `Avatar` (`tooltip={false}`), `Heading` (`level={3}`), `Text`, `SkillGroup` (`Token`), `Link` + `VisuallyHidden`. Принимает типизированный объект участника из `frontend/data/team.ts`; при отсутствии `photo` показывает инициалы или графический аватар в том же слоте; при отсутствии личного контакта подставляет ссылку на капитана с уточнённым доступным именем. |
| **`SkillGroup.tsx`** | Нужен семантический список неинтерактивных меток с опциональным заголовком категории | Рендерит опциональный `Heading` (`level={3}` для секции «Навыки команды») и `<ul className="flex flex-wrap gap-2">` с `<li><Token label={skill} size="sm" /></li>` (или `Badge` для pure-RSC). Исключает поведение кнопки и поддерживает многострочный перенос без переполнения. |
| **`ProjectCard.tsx`** | Доменная карточка портфолио с двумя вариантами («Проект / Project» и «Идея / Idea») и условной ссылкой | Собирается из Astryx `Card`, `Badge`, `Heading` (`level={3}`), `Text`, условного `Link` + `VisuallyHidden`. Если `href` отсутствует, блок ссылки не рендерится вообще (нет пустого пространства). Тип всегда обозначен текстом в `Badge`. |
| **`SiteFooter.tsx`** | `LayoutFooter` рендерит `<div>` и рассчитан на нижние панели действий внутри `Layout` | Семантический `<footer id="contact" aria-labelledby="contact-heading">` с `Divider`, `Heading` (`level={2}`) и адаптивным контейнером (`flex-col sm:flex-row`) для двух ссылок: «Написать капитану / Contact the captain» и «Репозиторий / Repository». |

---

## 4. Рекомендации по дизайн-токенам

### 4.1. Стратегия темизации: кастомная тема `recessedMaxillaTheme`

Вместо прямого использования `@astryxdesign/theme-neutral` (серая палитра + шрифт `Figtree` без кириллицы) или `@astryxdesign/theme-matcha` (шаг сетки 6 px, скругления 42 px и рукописный `Playwrite US Trad` без кириллицы) рекомендуется создать собственную предсобранную тему через `defineTheme` в `frontend/themes/recessed-maxilla/theme.ts`:

- **База:** `extends: neutralTheme` — наследует проверенную 4-пиксельную (`0.25rem`) шкалу отступов, сдержанные радиусы, быструю анимацию (`fast: 125ms`), реестр иконок `lucide-react` и мобильную адаптацию типографики.
- **Сборка:** `npx @astryxdesign/cli theme build frontend/themes/recessed-maxilla/theme.ts -o frontend/themes/recessed-maxilla/theme.css` — компилирует статический CSS без runtime-инъекции.
- **Палитра:** сохраняет фирменную светлую и тёмную палитру из текущего `frontend/app/globals.css` (`#f5f6ed` / `#183f34` и `#142620` / `#e3eedf`) и раскладывает её по семантической грамматике Astryx (`architecture:theme-tokens` INV10–INV14).

### 4.2. Цветовые токены (светлая и тёмная темы)

В таблице указаны кортежи `[light, dark]` (компилируются Astryx в CSS `light-dark(...)`) и расчётный контраст по WCAG 2.2 (нормы проекта и Astryx: ≥ 4.5:1 для текста, ≥ 3:1 для границ контролов и фокуса).

| Токен Astryx | Tailwind-класс (через bridge) | Светлая тема (Light) | Тёмная тема (Dark) | Назначение и проверенный контраст |
| --- | --- | --- | --- | --- |
| `--color-background-body` | `bg-body` (алиас `bg-canvas`) | `#f5f6ed` | `#142620` | Фон страницы (исходный `--canvas` из `globals.css`) |
| `--color-background-surface` | `bg-surface` | `#fbfcf7` | `#1b312a` | Основная поверхность и контейнеры |
| `--color-background-card` | `bg-card` | `#fbfcf7` | `#1b312a` | Фон карточек участников и проектов (мягко приподнят над `body`) |
| `--color-background-muted` | `bg-muted` | `#eaede0` | `#213a32` | Приглушённая поверхность / фон неактивных меток |
| `--color-text-primary` | `text-primary` (алиас `text-ink`) | `#183f34` | `#e3eedf` | Основной текст и заголовки (`10.72:1` / `13.23:1` на `body`; `11.32:1` / `11.56:1` на `card`) |
| `--color-text-secondary` | `text-secondary` | `#3d5e54` | `#a8c2b6` | Девиз, группа, вторичные подписи (`6.59:1` / `8.33:1` на `body`; `6.96:1` / `7.28:1` на `card`; `6.04:1` / `6.44:1` на `muted`) |
| `--color-text-accent` | `text-accent` | `#183f34` | `#a7e3c9` | Текст ссылок (`10.72:1` на `body` / `9.53:1` на `card` в тёмной; с подчёркиванием для явного отличия от основного текста) |
| `--color-accent` | `bg-accent-bg` | `#183f34` | `#e3eedf` | Инверсный акцент (активный язык RU/EN, цвет контура фокуса `--focus-outline-color`) |
| `--color-on-accent` | `text-on-accent` | `#f5f6ed` | `#142620` | Текст на акцентной заливке (`10.72:1` / `13.23:1`) |
| `--color-neutral` | `bg-neutral` | `#e4e8da` | `#274138` | Фон неинтерактивных меток `Token` / `Badge variant="neutral"` (`9.37:1` / `9.25:1` с `--color-text-primary`) |
| `--color-border` | `border-border` | `rgba(24, 63, 52, 0.18)` | `rgba(227, 238, 223, 0.18)` | Делители `Divider`, рамки `Card` (соответствует текущему `border-ink/20`) |
| `--color-border-emphasized` | `border-strong` | `#7a9288` | `#6f8d81` | Выраженные границы элементов (`3.24:1` / `3.82:1` на `card`, ≥ 3:1 по WCAG 1.4.11) |
| `--color-overlay-hover` | `bg-overlay-hover` | `rgba(24, 63, 52, 0.06)` | `rgba(227, 238, 223, 0.08)` | Подсветка при наведении (`TopNavItem`, ссылки языка) |
| `--color-overlay-pressed` | `bg-overlay-pressed` | `rgba(24, 63, 52, 0.12)` | `rgba(227, 238, 223, 0.14)` | Состояние нажатия |
| `--color-background-teal` / `--color-text-teal` | `bg-teal-subtle` / `text-teal-vivid` | `#d5ebe4` / `#114a3f` | `#1f473c` / `#b8efe0` | Метка `Badge variant="teal"` для типа «Проект / Project» (`8.11:1` / `8.13:1`) |
| `--color-background-gray` / `--color-text-gray` | `bg-gray-subtle` / `text-gray-vivid` | `#e4e8da` / `#183f34` | `#274138` / `#e3eedf` | Метка `Badge variant="neutral"` для типа «Идея / Idea» и меток навыков (`9.37:1` / `9.25:1`) |

**Токены клавиатурного фокуса** (единые для всех компонентов Astryx и кастомных ссылок):
- `--focus-outline-width: 2px`
- `--focus-outline-style: solid`
- `--focus-outline-color: var(--color-accent)` (`10.72:1` в светлой и `13.23:1` в тёмной теме — кратно выше порога 3:1)
- `--focus-outline-offset: 3px`

### 4.3. Типографика

Опираемся на [design-system.md](design-system.md) («системный шрифт без засечек» и «адаптивный размер заголовка») и `tokens.stylex.ts` Astryx:

- **Шрифтовые стеки:**
  - `--font-family-body`: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
  - `--font-family-heading`: тот же стек (единое начертание для RU и EN, нулевой риск несовпадения глифов).
  - `--font-family-code`: `ui-monospace, "SF Mono", Monaco, Consolas, monospace` (если в навыках или технических фрагментах понадобится моноширинный акцент).
- **Типографическая шкала:** в `defineTheme` задать редакционный пресет Astryx `typography: { scale: { base: 16, ratio: 1.25 } }` (соответствует мобильному порогу читаемости `16px` для основного текста и плавной иерархии без резких скачков).

| Роль в визитке | Компонент и пропсы Astryx | Ориентир размера (base 16, ratio 1.25) | Примечания |
| --- | --- | --- | --- |
| Название команды в шапке | `Heading level={1} type="display-2"` (адаптивно: на 360 px уменьшить до `display-3` / `text-3xl sm:text-5xl`) | `31–48 px`, `font-semibold`, `tracking-tight`, `textWrap="balance"` | Всегда в исходном написании с `<span lang="en">` |
| Заголовки 5 секций | `Heading level={2}` | `25 px` (`--text-heading-2-size`), `font-semibold` | Единый уровень `h2` для всех пяти секций |
| Имя участника, название проекта, категория навыков | `Heading level={3}` | `20 px` (`--text-heading-3-size`), `font-semibold` | В карточке участника имя идёт строго первым перед ролью |
| Девиз в шапке | `Text as="p" type="large" color="secondary"` | `20 px` (`--text-large-size`), `font-normal` | Многострочный перенос на 360 px |
| Основной текст («О команде», описание проекта) | `Text as="p" type="body"` | `16 px` (`--text-body-size`), leading ≈ `1.5` | Ограничение строки `max-w-prose` (`65ch`) |
| Роль участника, ссылки меню/подвала | `Text type="label"` / `Link isStandalone` | `16 px`, `font-medium` | Для роли допускается перенос на 2 строки без усечения |
| Учебная группа, метки `Token` / `Badge` | `Text type="supporting" color="secondary"` | `13–14 px` (`--text-supporting-size`) | Контраст ≥ 4.5:1 в обеих темах |

### 4.4. Отступы, радиусы, elevation и движение

- **Отступы (`rem`, база `--spacing-1 = 0.25rem = 4px`, инвариант Astryx INV9):**
  - Внешние поля страницы: `24 px` (`--spacing-6` / `px-6`) на 360 px и `48 px` (`--spacing-12` / `sm:px-12`) на ≥ 640 px — прямое соответствие [design-system.md](design-system.md) («горизонтальные поля 24–48 px»).
  - Вертикальный ритм по `design:spatial-hierarchy` (`DR1`–`DR4`):
    - **Локальный зазор** (имя ↔ роль, метки внутри `SkillGroup`, иконка ↔ текст): `gap={1.5}`–`gap={2}` (`6–8 px`).
    - **Групповой зазор** (блоки внутри карточки, колонки в `Grid`, категории навыков): `gap={4}`–`gap={6}` (`16–24 px`).
    - **Межсекционный зазор** (между пятью секциями страницы и подвалом): `gap={10}`–`gap={12}` (`40–48 px`) или `py-10 sm:py-14`.
  - Внутренний отступ карточек `Card`: `padding={5}` (`20 px`) или дефолт темы `padding={4}` (`16 px`) — единый для всех карточек на странице.
- **Радиусы:** `--radius-inner: 6px` (`Token`), `--radius-element: 8px` (`TopNavItem`, `LanguageSwitcher`), `--radius-container: 12px` (`Card`), `--radius-full: 9999px` (`Badge`, круглый `Avatar`).
- **Elevation:** для статических карточек на странице использовать `elevation="none"` и чёткую границу `1px solid var(--color-border)`. Тени `--shadow-low` / `--shadow-med` не применять к обычным карточкам, чтобы сохранить визуальную лёгкость.
- **Движение:** наследовать `motion: { fast: 125, medium: 300, slow: 700, ratio: 0.75 }` из `neutralTheme`. Astryx автоматически отключает перемещения и анимации переходов при `prefers-reduced-motion: reduce` (`design:reduced-motion` DR1–DR4). Для плавной прокрутки к якорям включать `scroll-behavior: smooth` только внутри `@media (prefers-reduced-motion: no-preference)`.

### 4.5. Сетка и адаптивные контрольные точки (360 / 768 / 1440 px)

Брейкпоинты Astryx (`DEFAULT_WIDTH_BREAKPOINTS` в `breakpoints.ts`) полностью совпадают со шкалой Tailwind CSS 4: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`.

Контейнер контента: `mx-auto w-full max-w-5xl px-6 sm:px-12` (максимальная внешняя ширина `1024 px`, как в текущем `frontend/app/[lang]/page.tsx`; при плотном заполнении 5 карточками допускается расширение до `max-w-6xl` = `1152 px` с сохранением тех же правил колонок).

| Контрольная ширина | Полезная ширина контента (`max-w-5xl`) | Шапка и навигация | «О команде» | «Участники» (`Grid`) | «Навыки команды» | «Проекты» (`Grid`) | «Контакты» (подвал) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **360 px** (телефон) | `312 px` (`px-6`) | 1 колонка; название и девиз переносятся по строкам; `RU / EN` остаются рядом; 5 якорных ссылок переносятся целиком (`flex-wrap`), без бургер-дровера | 1 колонка, текст на всю ширину `312 px` | **1 колонка** (`minWidth: 280` автоматически сжимается до `100%`), `gap={4}` | 3 категории друг под другом, метки `Token` переносятся в несколько строк | **1 колонка** (`minWidth: 340` → `100%`), `gap={4}` | 2 ссылки вертикально в столбец (`flex-col gap-3`) |
| **768 px** (планшет, `md`) | `672 px` (`px-12`) | Блок идентификации и `RU / EN` в одну строку; якорное меню переносится по ширине при необходимости | 1 колонка, ограничена `max-w-prose` (`65ch`) | **2 колонки** (`(672 - 24) / 2 = 324 px ≥ 280 px`), `repeat: 'fill'` — 5-я карточка сохраняет ширину колонки | 3 категории вертикально или `Grid` 1–2 колонки, метки переносятся свободно | **1–2 колонки** (при `minWidth: 320` — 2 колонки по `324 px`; при `minWidth: 340` — 1 просторная колонка, 2 с `lg`) | 2 ссылки в ряд (`sm:flex-row sm:gap-6`) |
| **1440 px** (десктоп) | `928 px` (`max-w-5xl`) или `1056 px` (`max-w-6xl`) | Вся шапка и 5 ссылок меню комфортно помещаются в одну композицию | Абзацы ограничены `max-w-prose` (`65ch`), выравнены по левому краю | **3 колонки** (`max: 3`, `(928 - 48) / 3 = 293 px ≥ 280 px`), `repeat: 'fill'` — неполный второй ряд сохраняет ширину колонки | 3 категории в ряд (`Grid columns={{ minWidth: 260, max: 3 }}`) либо последовательно с ровной сеткой меток | **2 колонки** (`max: 2`, `(928 - 24) / 2 = 452 px`), `repeat: 'fill'` | 2 ссылки в ряд с достаточным интервалом |

---

## 5. Чек-лист проверки при внедрении в `frontend/`

Перед открытием PR с реализацией визитки на базе этой спецификации необходимо проверить:

- [ ] В `frontend/app/globals.css` первой строкой объявлено `@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;`, а `globals.css` импортирован первым в `frontend/app/[lang]/layout.tsx`.
- [ ] Кастомная тема собрана через `astryx theme build`, а на `<html>` выставлен `data-astryx-theme="recessed-maxilla"` (проверить рендер и переключение `/ru` ↔ `/en` с отключённым JavaScript).
- [ ] Пройдены обе локали **RU и EN**, включая названия разделов, роли, навыки, метки «Проект / Project» и «Идея / Idea», подсказки `(откроется в новой вкладке) / (opens in new tab)` и `aria-label` всех повторяющихся ссылок.
- [ ] Проверены системные **светлая и тёмная темы** (`prefers-color-scheme`), видимый клавиатурный фокус (`Tab` по всей странице) и `prefers-reduced-motion: reduce`.
- [ ] Проверено отсутствие горизонтальной прокрутки и корректность колонок на ширинах **360, 768 и 1440 px** (включая сценарий плотности: 5 участников, длинное имя, роль в 2 строки, несколько строк навыков).
- [ ] Успешно проходят команды проверки из `frontend/`: `npm run lint`, `npm run typecheck`, `npm run build`, а также `docker compose config --quiet` в корне репозитория.
