import { useRef } from "react";
import me from "../assets/shaurya.png";
import { ArrowDown, Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react";

// Cursor-follow "cyber" reveal: same cutout, red HUD-filtered, masked to
// (cursor circle ∩ person silhouette), full-section layer so cursor coords match. No deps, no re-renders: only CSS vars change.
const REVEAL = {
  backgroundImage: `repeating-linear-gradient(0deg,#0006 0 1px,transparent 1px 4px),
    linear-gradient(90deg,#ff3b3b44 1px,transparent 1px),
    linear-gradient(0deg,#ff3b3b44 1px,transparent 1px),url(${me})`,
  backgroundSize: "100% 100%,24px 24px,24px 24px,auto 88%",
  backgroundRepeat: "repeat,repeat,repeat,no-repeat",
  backgroundPosition: "0 0,0 0,0 0,50% 100%",
  filter: "grayscale(1) brightness(.5) contrast(1.8) sepia(1) saturate(9) hue-rotate(-50deg) drop-shadow(0 0 8px #f22)",
  WebkitMaskImage: `radial-gradient(circle 140px at var(--x,-999px) var(--y,-999px),#000 55%,transparent),url(${me})`,
  maskImage: `radial-gradient(circle 140px at var(--x,-999px) var(--y,-999px),#000 55%,transparent),url(${me})`,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
  WebkitMaskSize: "100% 100%,auto 88%",
  maskSize: "100% 100%,auto 88%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "0 0,50% 100%",
  maskPosition: "0 0,50% 100%",
};

export default function Hero() {
  const root = useRef(null);

  const move = (e) => {
    if (!root.current) return;
    const r = root.current.getBoundingClientRect();
    root.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    root.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const leave = () => {
    if (!root.current) return;
    root.current.style.setProperty("--x", "-999px");
  };

  return (
    <section
      id="about"
      ref={root}
      onPointerMove={move}
      onPointerLeave={leave}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-950 text-white flex flex-col justify-between pt-24 pb-8"
    >
      {/* Background Typography */}
      <h1 className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 select-none text-center text-[20vw] font-black leading-none tracking-tighter text-white/80 opacity-90 transition-all duration-300">
        SHAURYA
      </h1>

      {/* Interactive Silhouette Layers */}
      <img
        src={me}
        alt="Shaurya Gupta"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[88%] -translate-x-1/2 object-contain select-none drop-shadow-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        style={REVEAL}
      />

      {/* Left Pitch Card */}
      <div className="relative z-30 px-6 sm:px-12 max-w-sm">
        <div className="glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Full-Stack & Systems
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-white">
            Backend That Scales, <br />
            <span className="text-amber-200">AI That Ships.</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
            Specialized in robust backend architecture, scalable microservices, and practical machine learning deployment.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#work"
              className="px-5 py-2.5 rounded-full bg-stone-900/90 hover:bg-black text-white text-xs font-medium tracking-wide shadow-lg transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              Explore Work
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contact"
              className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-medium backdrop-blur transition-all"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Right Stats & Tech Card */}
      <div className="relative z-30 self-end px-6 sm:px-12 max-w-xs text-right mt-6 sm:mt-0">
        <div className="glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md text-left sm:text-right">
          <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white">
            FULL STACK <br />
            <span className="text-amber-200">+ AI / ML</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/90 font-mono font-medium">
            Node.js · Python · React · MongoDB · PyTorch · Web3
          </p>
          <div className="mt-4 flex items-center justify-start sm:justify-end gap-3 text-white/80">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:text-white transition"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@shauryagupta.dev"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:text-white transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Category Badges */}
      <div className="relative z-30 px-6 sm:px-12 flex flex-wrap items-center justify-between gap-4 mt-8">
        <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm font-medium">
          <span className="rounded-2xl bg-black/40 border border-white/15 px-4 py-2.5 backdrop-blur shadow-md">
            ⚡ Scalable Backend
          </span>
          <span className="rounded-2xl bg-white text-zinc-950 font-semibold px-4 py-2.5 shadow-md">
            🧠 AI / Machine Learning
          </span>
          <span className="rounded-2xl bg-black/40 border border-white/15 px-4 py-2.5 backdrop-blur shadow-md">
            ⛓️ Web3 Architecture
          </span>
        </div>

        <div className="text-xs text-white/70 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Available for innovative projects & roles
        </div>
      </div>
    </section>
  );
}
