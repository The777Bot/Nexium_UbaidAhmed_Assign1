# Quote Generator App

A beautiful, modern quote generator built with [Next.js](https://nextjs.org), featuring a custom blend (light yellow/white) and dark theme toggle, smooth gradients, and a delightful user experience.

## ✨ Features

- **Quote of the Day**: Fetches a random quote from a public API or local data.
- **Topic Search**: Instantly discover inspiring quotes by topic (e.g., success, motivation, focus).
- **Random Quote**: Get a random quote at any time.
- **Copy to Clipboard**: Easily copy any quote.
- **Custom Theme Toggle**: Switch between a warm blend (white/yellow) theme and a sleek dark mode, with a single click.
- **Responsive & Accessible**: Works great on all devices and supports keyboard navigation.
- **Modern UI**: Uses Tailwind CSS, gradients, and card effects for a polished look.

## 🚀 Getting Started

1. **Install dependencies:**

```bash
pnpm install # or yarn install, npm install, or bun install
```

2. **Run the development server:**

```bash
pnpm dev # or yarn dev, npm run dev, or bun dev
```

3. **Open your browser:**

Go to [http://localhost:3000](http://localhost:3000) to see the app in action.

## 🖌️ Customization

- **Theme Toggle**: Click the sun/moon button in the header to switch between blend and dark mode.
- **Blend Theme**: The blend theme uses a white/yellow gradient for a warm, inviting look. Dark mode uses a classic dark palette.
- **Gradients**: Main content and cards feature smooth gradients for visual appeal.
- **Quotes Data**: Local quotes are stored in `src/data/quotes.json`. You can add or edit topics and quotes as needed.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com/) (for extra UI utilities)
- [TypeScript](https://www.typescriptlang.org/)

## 📁 Project Structure

- `src/app/` - Main app pages and API routes
- `src/components/` - UI components (including ThemeButton)
- `src/data/quotes.json` - Local quotes data
- `src/styles/globals.css` - Global styles and custom theme utilities

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or your favorite platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🙏 Credits

- Quotes API: [type.fit/api/quotes](https://type.fit/api/quotes)
- UI: Tailwind CSS, DaisyUI, and custom design

---

Enjoy your daily dose of inspiration! ✨
