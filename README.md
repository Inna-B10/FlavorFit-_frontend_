<!-- =========================================================                -->

<!-- README TEMPLATE FOR PORTFOLIO PROJECTS                                   -->
<!-- =========================================================                -->
<!-- Название скриншота: preview.png                                          -->
<!-- Блок Tech Stack обязателен                                               -->
<!-- Граница блока: от 🧩 Tech Stack до <!-- end:tech-stack -->
<!-- Между ними — только теги (бейджи) и подзаголовки                        -->
<!-- Названия в [] отображаются в портфолио, соблюдать регистр                -->
<!-- Основной стек и вспомогательные библиотеки разделены стоп-комментарием   -->
<!-- Название самого файла README.md                                          -->
<!-- =========================================================                -->

# 🚧 Work in Progress 🚧

# Project name: FlavorFit - frontend

### Project Goal/Description

[<img src="preview.png" height="250" align="right" style="margin-left:20px" />](preview.png)

FlavorFit is a comprehensive wellness platform focused on personalized nutrition, fitness tracking,
and smart meal planning. The project is designed to help users build healthier habits through
intuitive UX, meaningful data insights, and seamless integration of food, activity, and daily
planning. FlavorFit turns everyday wellness decisions into a guided, motivating, and enjoyable
experience.

### 🧩 Tech Stack

#### **🖥️ Frontend**

![Next.js](https://img.shields.io/badge/Next.js_16.1.4-424242?logo=nextdotjs)
![React](https://img.shields.io/badge/React_19.2.3-424242?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-424242?logo=typescript&logoColor=3178C6)
![TailwindCss](https://img.shields.io/badge/TailwindCss_4-424242?logo=tailwindcss&logoColor=06B6D4)

<!-- end:tech-stack -->

#### 🛠️ Libraries, Technologies, Tools & Others

![react-dom](https://img.shields.io/badge/react--dom_19.2.3-424242?logo=react&logoColor=61DAFB)
![clsx](https://img.shields.io/badge/clsx_2.1.1-424242)
![path-to-regexp](https://img.shields.io/badge/path--to--regexp_8.3.0-424242)
![react-icons](https://img.shields.io/badge/react--icons_5.5.0-424242)
![@tailwindcss/postcss](https://img.shields.io/badge/%40tailwindcss%2Fpostcss_4-424242)

<details style="border:1px solid #d4d4d4; border-radius:2px; padding:1rem;">
<summary><h4 style="display:inline; padding-left:6px;">🗃 Dependencies</h4></summary>

```bash
npm i react-icons
npm i path-to-regexp
npm i clsx
npm i @apollo/client@latest
npm i graphql@latest
npm i -D typescript @graphql-codegen/cli
npm i -D @graphql-codegen/typescript
npm i -D @graphql-codegen/typescript-operations
npm i -D @graphql-codegen/typescript-react-apollo
npm i -D @graphql-codegen/client-preset
npm i -D @graphql-codegen/introspection
npm i -D @parcel/watcher
npm i -D dotenv
npm i -D @trivago/prettier-plugin-sort-imports
npm i -D prettier-plugin-tailwindcss
npm i -D prettier
npm i react-hook-form
npx shadcn@latest init
npm i react-hot-toast
npm i jose
npm i @marsidev/react-turnstile
npm i @vercel/blob


# npx shadcn@latest add button
# npx shadcn@latest add input
# npx shadcn@latest add dropdown-menu
# npx shadcn@latest add avatar
# npx shadcn@latest add select
# npx shadcn@latest add textarea
# npx shadcn@latest add input-group
# npx shadcn@latest add field

```

</details>

## 💎 Features

🔷 **Personalized Dashboard** — daily overview of meals, workouts, hydration, calories, and activity
progress, combined with smart shopping lists

🔷 **Recipe Management** — detailed recipes with step-by-step instructions, nutritional breakdowns,
visuals, and community interaction through comments

🔷 **Smart Grocery Orders** — order tracking with real-time delivery status and estimated arrival
times

🔷 **Recipe Discovery & Search** — advanced filtering by dietary goals, cuisine, difficulty,
calories, and preparation time, with personalized recommendations

🔷 **Personal Profile & Goals** — body metrics, activity levels, and nutrition goals with clear
progress visualization and adaptive recommendations

---

### 📋 TODOs:

- [ ] navbar menu responsiveness
- [ ] page recipes (home):
- [ ] DELETE src\app\api\media-upload\avatar\route.ts
- [ ] **page profile:**
  - [ ] skeleton
  - [ ] ? submit/cancel buttons as component
- [ ] **page account:**
  - [ ] ? change password
  - [ ] skeleton
- [ ] page orders:
- [ ] page singel order:
- [ ] shopping list:
- [ ] cart:

<details style="border:1px solid #d4d4d4; border-radius:2px; padding:1rem;">
<summary><h4 style="display:inline; padding-left:6px;">✅ Done</h4></summary>

- [x] **page account:**
  - [x] upload avatar + [preview] + refresh
  - [x] reset(delete) avatar
  - [x] change firstName
  - [x] icons + labels
  - [x] sidebar
- [x] **page profile:**
  - [x] user form
  - [x] fitness form
  - [x] icons
  - [x] labels
  - [x] img depends on gender
  - [x] view last updated at
  - [x] sidebar (+ isActive)
- [x] **userMenu:**
  - [x] links account, profile, orders
  - [x] shopping list, cart, notifications
  - [x] logout
- [x] user/default avatar
- [x] header + responsiveness
- [x] icons
- [x] routes/pages
- [x] 404 page
- [x] captcha
- [x] **middleware/proxy:**
  - [x] middleware/proxy in case when front and backend on different domains
  - [x] secure user pages
  - [x] redirect from auth pages if authenticated
  - [x] redirect after login
  - [x] redirect after logout
- [x] **auth page:**
  - [x] reset password
  - [x] verification email
  - [x] resent verification
  - [x] logout
  - [x] cookies
  - [x] errors
  - [x] validation, messages
  - [x] login/register form
- [x] Configure Apollo and graphql codegen
- [x] logo
- [x] define the main functions
- [x] identify reusable components
- [x] project structure

</details>
