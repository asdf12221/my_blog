import { Link2 } from "lucide-react";

export function CyberSidebar() {
  return (
    <aside className="space-y-8 lg:col-span-3">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
        <div className="mb-4 h-16 w-16 animate-pulse rounded-full border border-blue-500/50 bg-blue-500/20"></div>
        <h2 className="text-xl font-bold">Jingyue Xu</h2>
        <p className="mt-1 text-xs text-slate-400">
          哈尔滨工业大学（威海） · 软件工程 2025级
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">Focus on:</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Github</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
          <Link2 size={14} className="text-blue-400" />
          <a
            href="https://github.com/asdf12221"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-blue-300"
          >
            github.com/asdf12221
          </a>
        </div>
      </div>
    </aside>
  );
}
