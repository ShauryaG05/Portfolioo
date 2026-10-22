import { useState, useEffect } from "react";
import { Menu, X, FileText, Sparkles, Terminal } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight group text-white"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-orange-500/20 group-hover:scale-105 transition">
            SG
          </div>
          <span className="hidden sm:inline font-mono text-sm tracking-wider text-zinc-200">
            shaurya.dev
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a
            href="#about"
            className="hover:text-orange-400 transition-colors py-1"
          >
            About
          </a>
          <a
            href="#work"
            className="hover:text-orange-400 transition-colors py-1"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="hover:text-orange-400 transition-colors py-1"
          >
            Skills
          </a>
          <a
            href="#experience"
            className="hover:text-orange-400 transition-colors py-1"
          >
            Timeline
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 text-xs font-medium text-zinc-200 transition-all hover:border-orange-500/50"
          >
            <FileText className="w-3.5 h-3.5 text-orange-400" />
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-zinc-950 font-semibold text-xs tracking-wide shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-5 flex flex-col gap-4 text-sm backdrop-blur-xl">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-orange-400"
          >
            About
          </a>
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-orange-400"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-orange-400"
          >
            Skills
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-orange-400"
          >
            Timeline
          </a>
          <div className="pt-2 border-t border-zinc-800 flex gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-full bg-orange-500 text-zinc-950 font-semibold text-xs"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
