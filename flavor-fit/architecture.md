## Стэк

Next js, TypeScript, Tailwind CSS

Nest js, TypeScript, Prisma ORM, PostgreSQL

Apollo + GraphQL

---

flow: Back-end -> Service -> Hooks -> UI (Component)
Auth + roles

## Проектирование/архитектура

_Feature-Based Modular Architecture_

<pre>
┣ 📂RED WINTER (draft)
┗ 📂src
  ┣ 📂app
  ┣ 📂features
  ┃ ┣ 📂auth
  ┃ ┣   📂components
  ┃ ┣   📂graphql
  ┃ ┣   📂hooks
  ┃ ┣   📂services  (api)
  ┃ ┣   📂types
  ┃ ┣ 📂dashboard
  ┃ ┣   📂components
  ┃ ┣   📂graphql
  ┃ ┣   📂hooks
  ┃ ┣   📂services  (api)
  ┃ ┣   📂types
  ┃ ┗ 📂profile
  ┃     📂components
  ┃     📂graphql
  ┃     📂hooks
  ┃     📂services  (api)
  ┃     📂types
  ┗ 📂shared
      📂config    (конфигурационные файлы)
      📂constants (константы)
      📂hooks     (общие хуки)
      📂types     (общие типы)
      📂ui        (общие компоненты интерфейса)
      📂utils     (утилиты и хелперы)
</pre>
