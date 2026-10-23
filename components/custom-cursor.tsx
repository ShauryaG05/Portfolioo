"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;

    const syncPreference = () => {
      enabled = finePointer.matches && !reducedMotion.matches;
      document.documentElement.classList.toggle("has-custom-pointer", enabled);
      cursor.classList.toggle("site-cursor--enabled", enabled);
      if (!enabled) cursor.classList.remove("site-cursor--visible", "site-cursor--hovering", "site-cursor--pressed");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!enabled) return;
      cursor.style.setProperty("--pointer-x", `${event.clientX}px`);
      cursor.style.setProperty("--pointer-y", `${event.clientY}px`);
      cursor.classList.add("site-cursor--visible");
    };

    const onPointerOver = (event: PointerEvent) => {
      if (!enabled) return;
      const target = event.target;
      const interactive = target instanceof Element && Boolean(target.closest("a, button, [role='button']"));
      cursor.classList.toggle("site-cursor--hovering", interactive);
    };

    const onPointerLeave = () => cursor.classList.remove("site-cursor--visible", "site-cursor--hovering");
    const onPointerDown = () => cursor.classList.add("site-cursor--pressed");
    const onPointerUp = () => cursor.classList.remove("site-cursor--pressed");

    syncPreference();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    finePointer.addEventListener("change", syncPreference);
    reducedMotion.addEventListener("change", syncPreference);

    return () => {
      document.documentElement.classList.remove("has-custom-pointer");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      finePointer.removeEventListener("change", syncPreference);
      reducedMotion.removeEventListener("change", syncPreference);
    };
  }, []);

  return <div className="site-cursor" ref={cursorRef} aria-hidden="true" />;
}

