"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type OrbitMarker = {
  mesh: THREE.Mesh;
  orbit: number;
  angle: number;
  speed: number;
  height: number;
};

export default function OrbitScene({ onReady }: { onReady: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }

    const width = Math.max(host.clientWidth, 1);
    const height = Math.max(host.clientHeight, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "orbit-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 40);
    camera.position.set(0, 0.15, 8.4);

    scene.add(new THREE.AmbientLight(0xdce6f1, 1.8));
    const keyLight = new THREE.PointLight(0xf3c84d, 34, 18);
    keyLight.position.set(-2.4, 2.8, 4.5);
    scene.add(keyLight);
    const coolLight = new THREE.PointLight(0xe1cf91, 24, 18);
    coolLight.position.set(3.6, -2.5, 1.5);
    scene.add(coolLight);

    const rig = new THREE.Group();
    scene.add(rig);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x20272e,
      roughness: 0.24,
      metalness: 0.62,
      clearcoat: 0.9,
      clearcoatRoughness: 0.18,
      emissive: 0x382d14,
      emissiveIntensity: 0.32,
    });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.04, 4), coreMaterial);
    rig.add(core);

    const innerCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 28, 28),
      new THREE.MeshBasicMaterial({ color: 0xf3c84d }),
    );
    rig.add(innerCore);

    const ringMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xf3c84d, transparent: true, opacity: 0.72 }),
      new THREE.MeshBasicMaterial({ color: 0xc58d34, transparent: true, opacity: 0.52 }),
      new THREE.MeshBasicMaterial({ color: 0xe1cf91, transparent: true, opacity: 0.46 }),
    ];
    const ringSpecs = [
      { radius: 1.65, x: 0.22, y: 0.08, z: 0.1 },
      { radius: 2.06, x: 1.04, y: -0.3, z: 0.64 },
      { radius: 2.34, x: -0.52, y: 1.18, z: -0.4 },
    ];
    ringSpecs.forEach((spec, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(spec.radius, 0.006, 5, 180), ringMaterials[index]);
      ring.rotation.set(spec.x, spec.y, spec.z);
      rig.add(ring);
    });

    const markers: OrbitMarker[] = [];
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f0ea,
      emissive: 0x493b1c,
      emissiveIntensity: 0.55,
      metalness: 0.4,
      roughness: 0.3,
    });
    for (let index = 0; index < 15; index += 1) {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(index % 4 === 0 ? 0.052 : 0.028, 10, 10), markerMaterial);
      rig.add(marker);
      markers.push({
        mesh: marker,
        orbit: 1.63 + (index % 3) * 0.34,
        angle: (index / 15) * Math.PI * 2,
        speed: (index % 2 === 0 ? 1 : -1) * (0.16 + (index % 5) * 0.018),
        height: Math.sin(index * 2.31) * 0.76,
      });
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let disposed = false;

    const placeMarkers = (elapsed: number) => {
      markers.forEach(({ mesh, orbit, angle, speed, height }) => {
        const currentAngle = angle + elapsed * speed;
        mesh.position.set(Math.cos(currentAngle) * orbit, Math.sin(currentAngle * 0.72) * height, Math.sin(currentAngle) * orbit * 0.56);
      });
    };

    const render = (elapsed: number) => {
      if (disposed) return;
      if (!reducedMotion.matches) {
        pointerX += (targetX - pointerX) * 0.035;
        pointerY += (targetY - pointerY) * 0.035;
        rig.rotation.y = pointerX + elapsed * 0.075;
        rig.rotation.x = pointerY + Math.sin(elapsed * 0.16) * 0.025;
        core.rotation.y = -elapsed * 0.11;
        core.rotation.x = Math.sin(elapsed * 0.12) * 0.045;
        innerCore.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.025);
      }
      placeMarkers(reducedMotion.matches ? 0 : elapsed);
      renderer.render(scene, camera);
    };

    const tick = (now: number) => {
      render(now * 0.001);
      frame = visible && !reducedMotion.matches ? window.requestAnimationFrame(tick) : 0;
    };
    const drawOnce = () => render(0);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion.matches && !frame) frame = window.requestAnimationFrame(tick);
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(host);

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = Math.max(host.clientWidth, 1);
      const nextHeight = Math.max(host.clientHeight, 1);
      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(host);

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const bounds = host.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.24;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -0.16;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };
    const onMotionPreference = () => {
      if (reducedMotion.matches && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        drawOnce();
      } else if (!reducedMotion.matches && visible && !frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
    reducedMotion.addEventListener("change", onMotionPreference);

    if (reducedMotion.matches) drawOnce();
    else {
      drawOnce();
      frame = window.requestAnimationFrame(tick);
    }
    onReady();

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      reducedMotion.removeEventListener("change", onMotionPreference);
      rig.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div className="orbit-webgl" ref={hostRef} aria-hidden="true" />;
}

