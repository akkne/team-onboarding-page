import type { SpherePose } from "./sphere-motion";

const tau = 2 * Math.PI;
const glowFraction = 0.035;
const starColors = ["#758aff", "#88ebdb", "#ff845e"];
const rimColors = ["#b4a3ff", "#cb9eaa", "#ff8463", "#b18eac", "#6481ff", "#679cca", "#81d7c7", "#98bfdd"];

function makeGlow(color: string) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 32;
  const brush = sprite.getContext("2d");
  if (!brush) return sprite;
  const glow = brush.createRadialGradient(16, 16, 0, 16, 16, 16);
  glow.addColorStop(0, "#fff");
  glow.addColorStop(0.16, color);
  glow.addColorStop(0.45, color + "70");
  glow.addColorStop(1, color + "00");
  brush.fillStyle = glow;
  brush.fillRect(0, 0, 32, 32);
  return sprite;
}

export function createSphereScene(
  context: CanvasRenderingContext2D,
  slots: HTMLElement[],
  labels: readonly string[],
) {
  // A repeatable surface keeps the opening frame stable across locale changes.
  let seed = 4627;
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  const glows = starColors.map(makeGlow);
  // Each path shares one paint. Depth bands retain the bright front and the coloured rim.
  const palette = ["2e", "6b", "ad"].flatMap(alpha =>
    rimColors.map(color => color + alpha),
  );
  const interiorColor = palette.push("rgba(184,194,221,0.22)") - 1;
  const frontColor = palette.push("rgba(235,238,248,0.80)") - 1;
  const particles = Array.from({ length: 15000 }, () => {
    const y = random() * 2 - 1;
    const longitude = random() * tau;
    const ring = Math.sqrt(1 - y * y);
    const x = Math.cos(longitude) * ring;
    const z = Math.sin(longitude) * ring;
    const phase = longitude * 5 + y * 9;
    const kind = random();
    const interior = kind >= glowFraction && kind < 0.13;
    const shell = interior ? 0.42 + random() * 0.52 : 0.98 + random() * 0.04;
    return {
      x: x * shell, y: y * shell, z: z * shell, phase, interior,
      size: 0.0023 + random() * 0.0033,
      glow: kind < glowFraction ? glows[Math.floor(random() * glows.length)] : null,
    };
  });

  const anchors = slots.map((element, slot) => ({
    element,
    names: labels.filter((_, index) => index % slots.length === slot),
    latitude: (slot - (slots.length - 1) / 2) * 0.56,
    longitude: [-0.44, 0.42, -0.32][slot],
    index: -1,
  }));

  return function draw(size: number, time: number, pose: SpherePose) {
    const radius = size * 0.40;
    const center = size / 2;
    const angle = pose.yaw + (pose.pointerX - 0.5) * pose.influence * 0.22;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tilt = pose.pitch + 0.12 * Math.sin(time * 0.23) - (pose.pointerY - 0.5) * pose.influence * 0.16;
    const breathing = 0.012 * Math.sin(time * 1.1);
    const width = 1 + pose.stretchX - pose.stretchY * 0.4 + breathing;
    const height = 1 + pose.stretchY - pose.stretchX * 0.4 - breathing;
    const reach = size * 0.23;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    context.clearRect(0, 0, size, size);

    const paths = palette.map(() => new Path2D());
    // The points are uniformly distributed, so any prefix still covers the whole sphere.
    const count = Math.min(particles.length, Math.max(6000, Math.round(size * size / 28)));
    for (let index = 0; index < count; index++) {
      const p = particles[index];
      const z = p.z * cos - p.x * sin;
      const depth = z * ct + p.y * st;
      const wave = 1 + 0.034 * Math.sin(time * 0.95 + p.phase)
        + pose.expansion * (0.2 + p.size * 170);
      const scale = radius * wave / (1 - depth * 0.095);
      const surfaceX = p.x * cos + p.z * sin;
      const surfaceY = p.y * ct - z * st;
      let x = center + surfaceX * scale * width;
      let y = center + surfaceY * scale * height;
      if (pose.influence > 0.01) {
        const dx = x - pose.pointerX * size;
        const dy = y - pose.pointerY * size;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < reach) {
          const push = (1 - distance / reach) ** 2 * reach * pose.influence / Math.max(1, distance);
          x += dx * push;
          y += dy * push;
        }
      }
      const light = (depth + 1) / 2;
      const dot = Math.max(0.65, radius * p.size * (0.55 + light));
      if (p.glow) {
        context.globalAlpha = (0.3 + light * 0.7) * (0.72 + 0.28 * Math.sin(p.phase + time * 2.6));
        const halo = dot * 3.4;
        context.drawImage(p.glow, x - halo, y - halo, halo * 2, halo * 2);
      } else {
        const band = depth < -0.35 ? 0 : depth < 0.1 ? 1 : 2;
        let color = frontColor;
        if (p.interior) {
          color = interiorColor;
        } else if (depth < 0.55) {
          const sector = Math.round(Math.atan2(surfaceY, surfaceX) * rimColors.length / tau);
          color = band * rimColors.length + (sector + rimColors.length) % rimColors.length;
        }
        paths[color].rect(x, y, dot, dot);
      }
    }
    context.globalAlpha = 1;

    for (let index = 0; index < palette.length; index++) {
      context.fillStyle = palette[index];
      context.fill(paths[index]);
    }

    for (const [slot, anchor] of anchors.entries()) {
      // Switch hemispheres at the silhouette, where the label has faded out.
      const longitude = angle + anchor.longitude;
      const side = Math.cos(longitude) < 0 ? -1 : 1;
      const ring = Math.sqrt(1 - anchor.latitude ** 2);
      const z = Math.abs(Math.cos(longitude)) * ring;
      const x = Math.sin(longitude) * side * ring * radius * width * 0.76;
      const y = (anchor.latitude * ct - z * st) * radius * height * 0.86;
      const phase = time / 4.8 + slot / 3 + 0.1;
      const index = Math.floor(phase) % anchor.names.length;
      if (anchor.index !== index) {
        anchor.element.textContent = anchor.names[index];
        anchor.index = index;
      }
      const fade = Math.min(1, (phase % 1) * 12, (1 - phase % 1) * 12);
      anchor.element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      anchor.element.style.opacity = String(Math.min(1, z * 5) * fade * (1 - pose.expansion));
    }
  };
}
