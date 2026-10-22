import { useRef } from "react";
import me from "./shaurya.png"; // transparent cutout, put in src/

// Cursor-follow "cyber" reveal: same cutout, red HUD-filtered, masked to
// (cursor circle ∩ person silhouette), full-section layer so cursor coords match. No deps, no re-renders: only CSS vars change.
const REVEAL = {
  backgroundImage: `repeating-linear-gradient(0deg,#0006 0 1px,transparent 1px 4px),
    linear-gradient(90deg,#ff3b3b44 1px,transparent 1px),
    linear-gradient(0deg,#ff3b3b44 1px,transparent 1px),url(${me})`,
  backgroundSize: "100% 100%,24px 24px,24px 24px,auto 88%",
  backgroundRepeat: "repeat,repeat,repeat,no-repeat",
  backgroundPosition: "0 0,0 0,0 0,50% 100%",
  filter: "grayscale(1) brightness(.5) contrast(1.8) sepia(1) saturate(9) hue-rotate(-50deg) drop-shadow(0 0 6px #f22)",
  WebkitMaskImage: `radial-gradient(circle 130px at var(--x,-999px) var(--y,-999px),#000 55%,transparent),url(${me})`,
  maskImage: `radial-gradient(circle 130px at var(--x,-999px) var(--y,-999px),#000 55%,transparent),url(${me})`,
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
    const r = root.current.getBoundingClientRect();
    root.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    root.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const leave = () => root.current.style.setProperty("--x", "-999px");

  return (
    <section
      ref={root}
      onPointerMove={move}
      onPointerLeave={leave}
      className="relative h-screen min-h-[640px] overflow-hidden bg-gradient-to-br from-orange-400 via-orange-600 to-amber-950 text-white"
    >
      <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-8 py-5 text-sm">
        <span className="font-semibold">SG</span>
        <div className="flex gap-8">
          <a href="#work">Work</a><a href="#skills">Skills</a><a href="#about">About</a>
        </div>
        <a href="#contact" className="rounded-full bg-rose-950 px-5 py-2">Let's Connect</a>
      </nav>

      <h1 className="pointer-events-none absolute inset-x-0 top-1/2 z-0 select-none text-center text-[22vw] font-semibold leading-none tracking-tight text-white/90">
        SHAURYA
      </h1>

      {/* character: base + cursor reveal */}
      <img src={me} alt="Shaurya Gupta" className="absolute bottom-0 left-1/2 z-10 h-[88%] -translate-x-1/2 object-contain" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20" style={REVEAL} />

      <div className="absolute left-8 top-28 z-30 max-w-xs">
        <h2 className="text-xl font-semibold leading-tight">BACKEND THAT SCALES,<br />AI THAT SHIPS</h2>
        <p className="mt-3 text-sm text-white/80">Full-stack developer focused on backend systems, machine learning and Web3.</p>
        <a href="#work" className="mt-6 inline-block rounded-full bg-rose-950 px-6 py-2 text-sm">Read More</a>
      </div>

      <div className="absolute right-8 top-28 z-30 max-w-xs text-right">
        <h2 className="text-4xl font-semibold leading-tight">FULL STACK<br />+ AI</h2>
        <p className="mt-3 text-sm text-white/80">Node · React · MongoDB · ML · Web3</p>
      </div>

      <div className="absolute bottom-8 left-8 z-30 flex gap-3 text-sm">
        <span className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">Backend</span>
        <span className="rounded-2xl bg-white/90 px-4 py-3 text-black">AI / ML</span>
        <span className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">Web3</span>
      </div>
    </section>
  );
}
