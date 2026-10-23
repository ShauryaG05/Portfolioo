"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ScrollDistortionPortraitProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function ScrollDistortionPortrait({ src, alt, width, height }: ScrollDistortionPortraitProps) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = reducedMotion.matches
        ? 0
        : Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight * 0.82, 1)));
      stack.style.setProperty("--distortion-opacity", (progress * 0.3).toFixed(3));
      stack.style.setProperty("--distortion-one-x", `${(-11 * progress).toFixed(1)}px`);
      stack.style.setProperty("--distortion-two-x", `${(8 * progress).toFixed(1)}px`);
      stack.style.setProperty("--portrait-contrast", (1 + progress * 0.045).toFixed(3));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return (
    <div className="portrait-art" ref={stackRef}>
      <Image className="hero-portrait" src={src} alt={alt} width={width} height={height} loading="eager" sizes="(max-width: 700px) 88vw, (max-width: 1000px) 48vw, 40vw" />
      <Image className="hero-portrait-echo hero-portrait-echo--one" src={src} alt="" aria-hidden="true" width={width} height={height} sizes="(max-width: 700px) 88vw, (max-width: 1000px) 48vw, 40vw" />
      <Image className="hero-portrait-echo hero-portrait-echo--two" src={src} alt="" aria-hidden="true" width={width} height={height} sizes="(max-width: 700px) 88vw, (max-width: 1000px) 48vw, 40vw" />
      <span className="portrait-scanline" aria-hidden="true" />
    </div>
  );
}


