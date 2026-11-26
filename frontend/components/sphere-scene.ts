const tau = 2 * Math.PI;
const starColors = ["#8daeff", "#9cffe6", "#ff966e", "#c1a2ff"];

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

export function createSphereScene(context: CanvasRenderingContext2D, labels: HTMLElement[]) {
  // A repeatable surface keeps the opening frame stable across locale changes.
  let seed = 4627;
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  const glows = starColors.map(makeGlow);
  const particles = Array.from({ length: 6200 }, () => {
    const y = random() * 2 - 1;
    const longitude = random() * tau;
    const ring = Math.sqrt(1 - y * y);
    const x = Math.cos(longitude) * ring;
    const z = Math.sin(longitude) * ring;
    const phase = longitude * 5 + y * 9;
    const shell = 0.972 + 0.019 * Math.sin(phase) + 0.015 * Math.cos(y * 17 + longitude * 3) + random() * 0.025;
    const hue = 261 + y * 70 + 24 * x + (random() - 0.5) * 34;
    return {
      x: x * shell, y: y * shell, z: z * shell, phase,
      color: `hsl(${hue} 78% ${65 + random() * 28}%)`,
      size: 0.0022 + random() ** 2 * 0.0043,
      glow: random() < 0.022 ? glows[Math.floor(random() * glows.length)] : null,
    };
  });

  const anchors = labels.map((element, index) => {
    const y = labels.length === 1 ? 0 : 1.3 * ((index + 0.5) / labels.length - 0.5);
    const ring = Math.sqrt(1 - y * y);
    const angle = index * 2.4 + 0.3;
    return { element, x: ring * Math.sin(angle), y, z: ring * Math.cos(angle) };
  });

  return function draw(size: number, time: number) {
    const radius = size * 0.465;
    const center = size / 2;
    const angle = time * 0.095;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tilt = 0.12 * Math.sin(time * 0.13) - 0.08;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    context.clearRect(0, 0, size, size);

    for (const p of particles) {
      const z = p.z * cos - p.x * sin;
      const depth = z * ct + p.y * st;
      const wave = 1 + 0.013 * Math.sin(time * 0.68 + p.phase);
      const scale = radius * wave / (1 - depth * 0.095);
      const x = center + (p.x * cos + p.z * sin) * scale;
      const y = center + (p.y * ct - z * st) * scale;
      const light = (depth + 1) / 2;
      const dot = Math.max(0.55, radius * p.size * (0.68 + light));
      context.globalAlpha = 0.29 + light * (0.58 + 0.12 * Math.sin(p.phase + time));
      if (p.glow) {
        const halo = dot * 3.4;
        context.drawImage(p.glow, x - halo, y - halo, halo * 2, halo * 2);
      } else {
        context.fillStyle = depth > 0.54 ? "#e1e6ff" : p.color;
        context.fillRect(x, y, dot, dot);
      }
    }
    context.globalAlpha = 1;

    for (const anchor of anchors) {
      const z = anchor.z * cos - anchor.x * sin;
      const depth = z * ct + anchor.y * st;
      const scale = radius * 0.78 / (1 - depth * 0.095);
      anchor.element.style.left = `${center + (anchor.x * cos + anchor.z * sin) * scale}px`;
      anchor.element.style.top = `${center + (anchor.y * ct - z * st) * scale}px`;
      anchor.element.style.opacity = String(Math.min(1, Math.max(0, depth * 5)));
    }
  };
}
