const autoTurnSeconds = 20;

// Pointer coordinates are fractions of the canvas so the response scales with the sphere.
export function trackSphereMotion(surface: HTMLElement) {
  const pose = { yaw: 0, pitch: -0.08, pointerX: 0.5, pointerY: 0.5, influence: 0, stretchX: 0, stretchY: 0, expansion: 0 };
  let dragging: number | null = null;
  let hovered = false;
  let yawSpeed = 0;
  let pitchSpeed = 0;
  let lastMove = 0;
  const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

  function move(event: PointerEvent) {
    if (!event.isPrimary) return;
    const rect = surface.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (dragging === event.pointerId) {
      const dx = x - pose.pointerX;
      const dy = y - pose.pointerY;
      const elapsed = Math.max(0.012, (event.timeStamp - lastMove) / 1000);
      pose.yaw += dx * 4;
      pose.pitch = clamp(pose.pitch - dy * 3, 1.1);
      yawSpeed = clamp(dx * 4 / elapsed, 5);
      pitchSpeed = clamp(-dy * 3 / elapsed, 4);
    }
    pose.pointerX = x;
    pose.pointerY = y;
    lastMove = event.timeStamp;
    hovered = true;
  }

  function down(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0) return;
    move(event);
    dragging = event.pointerId;
    yawSpeed = pitchSpeed = 0;
    surface.setPointerCapture(event.pointerId);
  }

  function release(event: PointerEvent) {
    if (dragging !== event.pointerId) return;
    dragging = null;
    if (event.timeStamp - lastMove > 100) yawSpeed = pitchSpeed = 0;
    hovered = event.pointerType === "mouse" && surface.matches(":hover");
  }

  function leave() {
    hovered = false;
  }

  const events = new AbortController();
  const options = { signal: events.signal };
  surface.addEventListener("pointermove", move, options);
  surface.addEventListener("pointerdown", down, options);
  surface.addEventListener("pointerup", release, options);
  surface.addEventListener("pointercancel", release, options);
  surface.addEventListener("lostpointercapture", release, options);
  surface.addEventListener("pointerleave", leave, options);

  return {
    pose,
    advance(dt: number) {
      const ease = 1 - Math.exp(-9 * dt);
      pose.yaw += dt * (2 * Math.PI / autoTurnSeconds);
      if (dragging === null) {
        pose.yaw += yawSpeed * dt;
        pose.pitch = clamp(pose.pitch + pitchSpeed * dt, 1.1);
        pose.pitch += (-0.08 - pose.pitch) * (1 - Math.exp(-dt));
      }
      pose.stretchX += (Math.abs(yawSpeed) * 0.045 - pose.stretchX) * ease;
      pose.stretchY += (Math.abs(pitchSpeed) * 0.045 - pose.stretchY) * ease;
      yawSpeed *= Math.exp(-4 * dt);
      pitchSpeed *= Math.exp(-4 * dt);
      pose.influence += (Number(hovered) - pose.influence) * ease;
      pose.expansion = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
    },
    disconnect: () => events.abort(),
  };
}

export type SpherePose = ReturnType<typeof trackSphereMotion>["pose"];
