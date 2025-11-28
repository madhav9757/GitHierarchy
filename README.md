# 🌲 Git Tree Viewer

A modern web application built with **Next.js 14 (App Router)** and the **GitHub API**, allowing users to browse and view the file structure and content of public GitHub repositories.

---

## ✨ Features

* **Dynamic Routing:** Utilizes Next.js App Router's dynamic segments (`[username]`, `[repo]`, `[...path]`) for clean, SEO-friendly URLs.
* **Server Components:** Efficiently fetches data using Server Components, ensuring fast initial load and reduced client bundle size.
* **Interactive File Tree:** The `FileTreeViewer` component converts GitHub's flat API tree response into an interactive, expandable, and sortable hierarchical structure.
* **Syntax Highlighting:** Displays file contents with dynamic syntax highlighting using `react-syntax-highlighter`, automatically detecting the language from the file extension.
* **Theme Integration:** Switches code viewer themes (Dracula / VS) based on the app's dark/light mode using `next-themes`.
* **Shadcn/UI & Tailwind:** Built with **Tailwind CSS** and **shadcn/ui** components for a clean, modern, and responsive interface.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** v18+
* **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone <repository_url>
cd git-tree-viewer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

The application requires a GitHub Personal Access Token to fetch repository data via the API.

1. Generate a token: Go to **GitHub Developer Settings → Personal access tokens → Tokens (classic)**.
2. Click **Generate new token (classic)**.
3. Name the token (e.g., "Git Viewer Dev Token").
4. Only the `public_repo` scope is required (or leave unchecked for fully public data).
5. Copy the generated token.
6. Create a `.env.local` file in the project root:

```env
GITHUB_TOKEN=<YOUR_GITHUB_TOKEN>
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 🗺️ Usage and Routes

| Description          | URL Example                                   | Component                                       |
| -------------------- | --------------------------------------------- | ----------------------------------------------- |
| User Repositories    | `/user/madhav9757`                            | `app/user/[username]/page.tsx`                  |
| Repository File Tree | `/repo/vercel/next.js`                        | `app/repo/[username]/[repo]/page.tsx`           |
| File Content View    | `/repo/vercel/next.js/packages/next/index.ts` | `app/repo/[username]/[repo]/[...path]/page.tsx` |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for bug fixes, feature requests, or enhancements.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
