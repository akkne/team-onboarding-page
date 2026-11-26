"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "../data/team";
import { sphereLabels } from "../data/sphere-labels";
import { createSphereScene } from "./sphere-scene";
import { trackSphereMotion } from "./sphere-motion";

export function ParticleSphere({ lang }: { lang: Locale }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current!;
    const canvas = element.querySelector("canvas")!;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = createSphereScene(context, Array.from(element.querySelectorAll("li")));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const movement = trackSphereMotion(element);
    let visible = false;
    let size = 0;
    let frame = 0;
    let previous = 0;
    let time = 0;

    function animate(now: number) {
      if (now - previous >= 1000 / 30) {
        const dt = previous ? Math.min(now - previous, 100) / 1000 : 0;
        time += dt;
        movement.advance(dt);
        previous = now;
        draw(size, time, movement.pose);
      }
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
      const pixels = Math.round(size * Math.min(window.devicePixelRatio, 2));
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
  }, []);

  return (
    <div ref={container} className="particle-sphere group">
      <canvas aria-hidden="true" className="block size-full" />
      {sphereLabels.length > 0 && (
        <ul className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          {sphereLabels.map((label) => (
            <li key={label.ru} className="max-w-[45%] group-data-ready:absolute group-data-ready:-translate-1/2 rounded-sm bg-ink/85 px-2 py-1 text-center text-xs text-paper">
              {label[lang]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
