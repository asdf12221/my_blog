export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-zinc-200/70 dark:border-zinc-800">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 py-8 text-sm text-zinc-500 dark:text-zinc-400 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-medium text-zinc-700 dark:text-zinc-200">© {new Date().getFullYear()} asdf12221</p>
          <p className="mt-1">哈尔滨工业大学（威海） · 软件工程 2025级</p>
        </div>
        <p className="md:text-right">Powered by Next.js + Sanity · Hosted on GitHub Pages</p>
      </div>
    </footer>
  );
}
