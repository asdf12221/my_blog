import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/blog", label: "博客" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/75 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            AB
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">asdf12221</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Personal Blog</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-zinc-200/80 bg-white/75 p-1 dark:border-zinc-700 dark:bg-zinc-900/80">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
