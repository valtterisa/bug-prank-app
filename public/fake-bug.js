// Client-only fake bug injector with erratic, insect-like motion.
(() => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const BUG_ID = "fake-bug-prank";
  const SHADOW_ID = "fake-bug-prank-shadow";
  if (document.getElementById(BUG_ID)) return;

  const cfg = {
    durationMs: 45000,
    bugSize: 18,
    panicEveryMs: [6000, 12000],
    panicDurationMs: 450,
    pauseEveryMs: [1200, 2600],
    pauseDurationMs: [120, 480],
    burstDurationMs: [160, 420],
    edgePadding: 12,
  };

  const bugImage =
    "data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='32' cy='36' rx='9' ry='13' fill='%232c2c2c'/%3E%3Cellipse cx='32' cy='26' rx='7' ry='7' fill='%233d3d3d'/%3E%3Cellipse cx='28' cy='24' rx='3' ry='6' fill='%23606060'/%3E%3Cellipse cx='36' cy='24' rx='3' ry='6' fill='%23606060'/%3E%3Ccircle cx='28' cy='24' r='1.8' fill='%23e5e5e5'/%3E%3Ccircle cx='36' cy='24' r='1.8' fill='%23e5e5e5'/%3E%3Cpath d='M32 17c4 0 8 5 8 10s-4 10-8 10-8-5-8-10 4-10 8-10z' fill='%23323232' opacity='0.35'/%3E%3Cpath d='M27 40c2 1 8 1 10 0' stroke='%236a6a6a' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M24 33c-6 3-10 4-14 2' stroke='%23404040' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M40 33c6 3 10 4 14 2' stroke='%23404040' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M25 29c-5 0-8-4-12-6' stroke='%23404040' stroke-width='2' stroke-linecap='round'/%3E%3Cpath d='M39 29c5 0 8-4 12-6' stroke='%23404040' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

  const bug = document.createElement("div");
  bug.id = BUG_ID;
  Object.assign(bug.style, {
    position: "fixed",
    inset: "0px",
    width: `${cfg.bugSize}px`,
    height: `${cfg.bugSize}px`,
    backgroundImage: `url("${bugImage}")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    pointerEvents: "none",
    zIndex: "2147483647",
    transformOrigin: "50% 50%",
    filter: "drop-shadow(0 0 2px rgba(0,0,0,0.4))",
  });

  const shadow = document.createElement("div");
  shadow.id = SHADOW_ID;
  Object.assign(shadow.style, {
    position: "fixed",
    inset: "0px",
    width: `${cfg.bugSize}px`,
    height: `${cfg.bugSize}px`,
    background: "radial-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0))",
    pointerEvents: "none",
    zIndex: "2147483646",
    transformOrigin: "50% 50%",
    filter: "blur(1px)",
  });

  const state = {
    pos: {
      x: Math.random() * (window.innerWidth * 0.6) + window.innerWidth * 0.2,
      y: Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2,
    },
    angle: Math.random() * Math.PI * 2,
    speed: 0,
    lastTime: performance.now(),
    pauseUntil: 0,
    nextPauseAt: performance.now() + randRange(cfg.pauseEveryMs),
    nextPanicAt: performance.now() + randRange(cfg.panicEveryMs),
    panicUntil: 0,
    burstUntil: 0,
    shadowPos: null,
    running: true,
  };

  function randRange([min, max]) {
    return min + Math.random() * (max - min);
  }

  function scheduleBurst(now) {
    state.burstUntil = now + randRange(cfg.burstDurationMs);
  }

  function schedulePause(now) {
    state.pauseUntil = now + randRange(cfg.pauseDurationMs);
    state.nextPauseAt = now + randRange(cfg.pauseEveryMs);
  }

  function schedulePanic(now) {
    state.panicUntil = now + cfg.panicDurationMs;
    state.nextPanicAt = now + randRange(cfg.panicEveryMs);
    state.angle += (Math.random() - 0.5) * Math.PI * 1.6;
  }

  function edgeAvoidance() {
    const { innerWidth: w, innerHeight: h } = window;
    const pad = cfg.edgePadding;
    let steer = 0;
    if (state.pos.x < pad) steer += 0.15;
    if (state.pos.x > w - pad) steer -= 0.15;
    if (state.pos.y < pad) steer += 0.15;
    if (state.pos.y > h - pad) steer -= 0.15;
    state.angle += steer;
  }

  function tick(now) {
    if (!state.running) return;
    const dt = Math.max(0.001, Math.min((now - state.lastTime) / 1000, 0.05));
    state.lastTime = now;

    if (now > state.nextPauseAt && now > state.pauseUntil) schedulePause(now);
    if (now > state.nextPanicAt && now > state.panicUntil) schedulePanic(now);
    if (Math.random() < 0.02) scheduleBurst(now);

    const paused = now < state.pauseUntil;
    const panicking = now < state.panicUntil;
    const bursting = now < state.burstUntil;

    const baseSpeed = paused ? 0 : randRange([30, 75]);
    const burstBoost = bursting ? randRange([50, 120]) : 0;
    const panicBoost = panicking ? randRange([180, 260]) : 0;
    const noise = (Math.random() - 0.5) * 0.6;
    const microTurn = (Math.random() - 0.5) * 0.25;

    state.angle += microTurn + noise * dt * 6;
    edgeAvoidance();

    const speedTarget = baseSpeed + burstBoost + panicBoost;
    state.speed += (speedTarget - state.speed) * 0.35;

    state.pos.x += Math.cos(state.angle) * state.speed * dt;
    state.pos.y += Math.sin(state.angle) * state.speed * dt;

    state.pos.x = Math.min(
      Math.max(cfg.edgePadding, state.pos.x),
      window.innerWidth - cfg.edgePadding,
    );
    state.pos.y = Math.min(
      Math.max(cfg.edgePadding, state.pos.y),
      window.innerHeight - cfg.edgePadding,
    );

    const facing = state.speed > 4 ? state.angle : state.angle + 0.2;
    const speedRatio = Math.min(1, state.speed / 240);
    const blur = speedRatio > 0.35 ? `blur(${(speedRatio * 2).toFixed(2)}px)` : "none";
    const scale = 0.92 + Math.sin(now * 0.002 + state.pos.x * 0.0004) * 0.06;

    const transform = `translate(${state.pos.x}px, ${state.pos.y}px) rotate(${
      (facing * 180) / Math.PI
    }deg) scale(${scale})`;
    bug.style.transform = transform;
    bug.style.filter = `drop-shadow(0 0 2px rgba(0,0,0,0.4)) ${blur}`;

    if (!state.shadowPos) state.shadowPos = { ...state.pos };
    state.shadowPos.x += (state.pos.x - state.shadowPos.x) * 0.25;
    state.shadowPos.y += (state.pos.y - state.shadowPos.y) * 0.25;
    shadow.style.transform = `translate(${state.shadowPos.x}px, ${
      state.shadowPos.y + 2
    }px) scale(${scale * 0.98})`;
    shadow.style.opacity = (0.35 + speedRatio * 0.4).toFixed(2);

    requestAnimationFrame(tick);
  }

  function start() {
    document.body.appendChild(shadow);
    document.body.appendChild(bug);
    state.lastTime = performance.now();
    requestAnimationFrame(tick);
  }

  function stop() {
    state.running = false;
    bug.remove();
    shadow.remove();
  }

  window.fakeBugStop = stop;

  if (cfg.durationMs > 0) {
    setTimeout(stop, cfg.durationMs);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    start();
  } else {
    window.addEventListener("DOMContentLoaded", start, { once: true });
  }
})();
