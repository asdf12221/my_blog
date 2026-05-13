"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Aperture } from "lucide-react";

export function CyberNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 py-3 backdrop-blur-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex cursor-pointer items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-md border border-blue-400/50 bg-blue-500/15 transition group-hover:border-blue-300">
            <Aperture
              size={17}
              className="text-blue-300 transition-transform duration-500 group-hover:rotate-90"
            />
            <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
          </div>
          <span className="text-[15px] font-bold tracking-[0.12em] text-slate-100">Adhere‘s blog</span>
        </Link>
        <div className="hidden gap-8 text-sm text-slate-400 md:flex">
          <Link href="/" className="transition-colors hover:text-blue-400">
            Articles
          </Link>
          <Link href="/blog" className="transition-colors hover:text-blue-400">
            Projects
          </Link>
          <a className="cursor-pointer transition-colors hover:text-blue-400">Nodes</a>
        </div>
      </div>
    </nav>
  );
}
