"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** ================== Farbpalette (aus deinem Bild) ================== */
const PAL = {
  paperA: "#EDEDED",
  paperB: "#E1E1E1",
  ink: "#121212",
  petrol: "#123C4C",
  teal: "#3CC5C1",
  aqua: "#77D7E0",
  cyanDeep: "#1F7C98",
  sand: "#E3DFD5",
  graphite: "#2C2C2C",
  shadow: "rgba(0,0,0,0.35)",
  white: "#FFFFFF",
};

/** ========= kleine Helfer ========= */
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rand = (seed: number) => {
  let s = seed >>> 0;
  return () => ((s = (1664525 * s + 1013904223) >>> 0) / 0xffffffff);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** ========= Value-Noise ========= */
function makeValueNoise(seed = 1) {
  const R = rand(seed);
  const G = Array.from({ length: 512 }, () => R());
  const hash = (x: number, y: number) =>
    G[((x * 374761393) ^ (y * 668265263)) & 511];
  const smooth = (t: number) => t * t * (3 - 2 * t);

  return (x: number, y: number, scale = 1) => {
    x *= scale;
    y *= scale;
    const xi = Math.floor(x),
      yi = Math.floor(y);
    const xf = x - xi,
      yf = y - yi;
    const v00 = hash(xi, yi);
    const v10 = hash(xi + 1, yi);
    const v01 = hash(xi, yi + 1);
    const v11 = hash(xi + 1, yi + 1);
    const ux = smooth(xf),
      uy = smooth(yf);
    const a = lerp(v00, v10, ux);
    const b = lerp(v01, v11, ux);
    return lerp(a, b, uy);
  };
}

/** ========= Pinselstriche ========= */
function paintBrush(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  seed = 1,
  density = 1100,
  softness = 0.65,
  tilt = 0
) {
  const R = rand(seed);
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(tilt);
  ctx.translate(-w / 2, -h / 2);

  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < density; i++) {
    const px = R() * w;
    const py = R() * h;
    const len = 4 + R() * 20;
    const ang = (R() - 0.5) * Math.PI * 0.25;
    const alpha = lerp(0.03, 0.22, Math.pow(R(), softness));

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + Math.cos(ang) * len, py + Math.sin(ang) * len);
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();
}

/** ========= Wash ========= */
function paintWash(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  blur = 18,
  alpha = 0.7
) {
  ctx.save();
  (ctx as unknown as { filter: string }).filter = `blur(${blur}px)`;
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  (ctx as unknown as { filter: string }).filter = "none";
  ctx.restore();
}

/** ========= Platten ========= */
function paintPlate(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  rotationRad = 0,
  withInnerInset = true
) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(rotationRad);
  ctx.translate(-w / 2, -h / 2);

  ctx.save();
  (ctx as unknown as { filter: string }).filter = "blur(10px)";
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = PAL.shadow;
  ctx.fillRect(-6, -6, w + 12, h + 12);
  (ctx as unknown as { filter: string }).filter = "none";
  ctx.restore();

  ctx.fillStyle = color;
  ctx.globalAlpha = 0.95;
  ctx.fillRect(0, 0, w, h);

  if (withInnerInset) {
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = "#000";
    ctx.fillRect(12, 12, w - 24, h - 24);
  }

  ctx.restore();
}

/** ========= Scratches ========= */
function paintScratches(
  ctx: CanvasRenderingContext2D,
  seed = 1,
  count = 1200,
  angle = Math.PI * 0.1,
  width = 1,
  light = true
) {
  const R = rand(seed);
  const { width: W, height: H } = ctx.canvas;
  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = light
    ? "rgba(255,255,255,0.85)"
    : "rgba(0,0,0,0.85)";
  ctx.lineWidth = width;

  for (let i = 0; i < count; i++) {
    const x = R() * W,
      y = R() * H;
    const len = 18 + R() * 36;
    const a = angle + (R() - 0.5) * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }
  ctx.restore();
}

/** ========= Linien ========= */
function paintInkLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width = 6,
  alpha = 0.9
) {
  ctx.save();
  (ctx as unknown as { filter: string }).filter = "blur(1.5px)";
  ctx.strokeStyle = PAL.ink;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  (ctx as unknown as { filter: string }).filter = "none";
  ctx.restore();
}

/** ========= Chips ========= */
function paintChips(
  ctx: CanvasRenderingContext2D,
  items: { x: number; y: number; s: number; color: string }[]
) {
  ctx.save();
  for (const c of items) {
    ctx.fillStyle = c.color;
    ctx.globalAlpha = 0.95;
    ctx.fillRect(c.x, c.y, c.s, c.s);
  }
  ctx.restore();
}

/** ========= Artwork Renderer ========= */
function renderArtwork(canvas: HTMLCanvasElement, seedBase = 7) {
  const ctx = canvas.getContext("2d")!;
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const W = Math.floor(canvas.clientWidth * DPR);
  const H = Math.floor(canvas.clientHeight * DPR);
  canvas.width = W;
  canvas.height = H;

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, PAL.paperA);
  grad.addColorStop(0.55, PAL.white);
  grad.addColorStop(1, PAL.paperB);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  paintScratches(ctx, seedBase + 11, 1400, Math.PI * 0.35, 1, true);
  paintScratches(ctx, seedBase + 12, 1200, Math.PI * -0.1, 1, false);

  paintPlate(ctx, W * 0.47, H * 0.18, W * 0.14, H * 0.34, PAL.petrol, 0.03);
  paintPlate(ctx, W * 0.30, H * 0.60, W * 0.18, H * 0.28, PAL.graphite, -0.08);

  paintInkLine(ctx, W * 0.10, H * 0.54, W * 0.92, H * 0.53, 7, 0.9);
}

/** ================== React-Komponente ================== */
export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cnv = canvasRef.current;
    const draw = () => renderArtwork(cnv, 7);
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(cnv);
    window.addEventListener("resize", draw);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <main>
      <header>
        <div>LOGO</div>
        <nav>
          <a href="/verzeichnis">VERZEICHNIS</a>
          <a href="/stiftungstag">STIFTUNGSTAG</a>
          <a href="/termine">TERMINE</a>
          <a href="/austausch">AUSTAUSCH</a>
          <a href="/ueber-uns">ÜBER UNS</a>
          <a href="#kontakt">KONTAKT</a>
        </nav>
      </header>

      <section ref={heroRef}>
        <canvas ref={canvasRef} />
        <motion.h1 style={{ y: yHero }}>Stiftungsvielfalt Saar</motion.h1>
      </section>
    </main>
  );
}
