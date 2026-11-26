"use client";

import { useEffect, useRef } from "react";
import { createSphereScene } from "./sphere-scene";
import { trackSphereMotion } from "./sphere-motion";

export function ParticleSphere({ labels }: { labels: readonly string[] }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current!;
    const canvas = element.querySelector("canvas")!;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = createSphereScene(context, Array.from(element.querySelectorAll("li")), labels);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const movement = trackSphereMotion(element);
    let visible = false;
    let size = 0;
    let frame = 0;
    let previous = 0;
    let time = 0;

    function animate(now: number) {
      const dt = previous ? Math.min(now - previous, 100) / 1000 : 0;
      previous = now;
      time += dt;
      movement.advance(dt);
      draw(size, time, movement.pose);
      frame = requestAnimationFrame(animate);
    }

    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (size && visible && !document.hidden && !motion.matches) {
        frame = requestAnimationFrame(animate);
      }
    }

    const resize = new ResizeObserver(() => {
      size = canvas.clientWidth;
      if (!size) return;
      const pixels = Math.round(size * Math.min(window.devicePixelRatio, 1.5));
      canvas.width = canvas.height = pixels;
      context.setTransform(pixels / size, 0, 0, pixels / size, 0, 0);
      draw(size, time, movement.pose);
      element.dataset.ready = "";
      sync();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    resize.observe(canvas);
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      movement.disconnect();
      resize.disconnect();
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [labels]);

  return (
    <div ref={container} className="particle-sphere">
      <canvas aria-hidden="true" className="block size-full" />
      {labels.length > 0 && (
        <ul aria-hidden="true" className="sphere-labels pointer-events-none absolute inset-0">
          {labels.slice(0, 3).map((label, slot) => (
            <li key={slot} className="fine-print absolute max-w-[44%] rounded-sm bg-ink/85 px-2 py-1 text-center text-paper">
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
