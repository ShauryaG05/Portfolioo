"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";

const OrbitScene = dynamic(() => import("@/components/orbit-scene"), { ssr: false });

function OrbitFallback() {
  return (
    <div className="orbit-fallback" aria-hidden="true">
      <span className="orbit-fallback-ring orbit-fallback-ring--one" />
      <span className="orbit-fallback-ring orbit-fallback-ring--two" />
      <span className="orbit-fallback-core" />
      <span className="orbit-fallback-dot orbit-fallback-dot--one" />
      <span className="orbit-fallback-dot orbit-fallback-dot--two" />
    </div>
  );
}

export function InteractiveShowcase({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const onSceneReady = useCallback(() => setSceneLoaded(true), []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`orbit-stage ${className}${sceneLoaded ? " orbit-stage--active" : ""}`} ref={stageRef} aria-hidden="true">
      <OrbitFallback />
      {ready ? <OrbitScene onReady={onSceneReady} /> : null}
    </div>
  );
}
