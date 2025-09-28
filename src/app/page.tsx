"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** ================== Farbpalette (aus deinem Bild) ================== */
const PAL = {
  paperA: "#EDEDED",
  paperB: "#E1E1E1",
  ink: "#121212",

  // Bild-Farben
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
  // LCG – deterministisch (damit der Look stabil bleibt)
  let s = seed >>> 0;
  return () => ((s = (1664525 * s + 1013904223) >>> 0) / 0xffffffff);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** ========= Value-Noise (simple & schnell) ========= */
function makeValueNoise(seed = 1) {
  const R = rand(seed);
  const G = Array.from({ length: 512 }, () => R());
  const hash = (x: number, y: number) => G[((x * 374761393) ^ (y * 668265263)) & 511];
  const smooth = (t: number) => t * t * (3 - 2 * t);

  return (x: number, y: number, scale = 1) => {
    x *= scale; y *= scale;
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const v00 = hash(xi, yi);
    const v10 = hash(xi + 1, yi);
    const v01 = hash(xi, yi + 1);
    const v11 = hash(xi + 1, yi + 1);
    const ux = smooth(xf), uy = smooth(yf);
    const a = lerp(v00, v10, ux);
    const b = lerp(v01, v11, ux);
    return lerp(a, b, uy); // 0..1
  };
}

/** ========= „Pinsel“-Striche als dichte Jitter-Lines ========= */
function paintBrush(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  color: string,
  seed = 1,
  density = 1100,
  softness = 0.65,
  tilt = 0 // -PI..PI
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
    const ang = (R() - 0.5) * Math.PI * 0.25; // leicht streuend
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

/** ========= weiche Wash-Flächen mit Blur & Multiply ========= */
function paintWash(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  color: string, blur = 18, alpha = 0.7
) {
  ctx.save();
  (ctx as any).filter = `blur(${blur}px)`; // Canvas 2D Filter API
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  (ctx as any).filter = "none";
  ctx.restore();
}

/** ========= dunkle geometrische Blöcke („Plates“) ========= */
function paintPlate(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  color: string,
  rotationRad = 0,
  withInnerInset = true
) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(rotationRad);
  ctx.translate(-w / 2, -h / 2);

  // Schatten
  ctx.save();
  (ctx as any).filter = "blur(10px)";
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = PAL.shadow;
  ctx.fillRect(-6, -6, w + 12, h + 12);
  (ctx as any).filter = "none";
  ctx.restore();

  // Platte
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.95;
  ctx.fillRect(0, 0, w, h);

  // leichte Innenkante
  if (withInnerInset) {
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = "#000";
    ctx.fillRect(12, 12, w - 24, h - 24);
  }

  ctx.restore();
}

/** ========= feine „eingekratzte“ Linien (Sgraffito) ========= */
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
  ctx.strokeStyle = light ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  ctx.lineWidth = width;

  for (let i = 0; i < count; i++) {
    const x = R() * W, y = R() * H;
    const len = 18 + R() * 36;
    const a = angle + (R() - 0.5) * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }
  ctx.restore();
}

/** ========= Rillen-/Hatching-Struktur ========= */
function paintHatching(
  ctx: CanvasRenderingContext2D,
  spacing = 8,
  angle = Math.PI * 0.5,
  alpha = 0.08
) {
  const { width: W, height: H } = ctx.canvas;
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(angle);
  ctx.translate(-W / 2, -H / 2);

  ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
  ctx.lineWidth = 1;
  for (let y = -H; y < H * 2; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(-W, y);
    ctx.lineTo(W * 2, y);
    ctx.stroke();
  }
  ctx.restore();
}

/** ========= „Tint“-Linien (stark, grafisch) ========= */
function paintInkLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  width = 6, alpha = 0.9
) {
  ctx.save();
  // leicht diffuse Kante
  (ctx as any).filter = "blur(1.5px)";
  ctx.strokeStyle = PAL.ink;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  (ctx as any).filter = "none";
  ctx.restore();
}

/** ========= kleine Chips ========= */
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

/** ========= Gesamtkunstwerk ========= */
function renderArtwork(canvas: HTMLCanvasElement, seedBase = 7) {
  const ctx = canvas.getContext("2d")!;
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const W = Math.floor(canvas.clientWidth * DPR);
  const H = Math.floor(canvas.clientHeight * DPR);
  canvas.width = W;
  canvas.height = H;

  // Papiergrund
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, PAL.paperA);
  grad.addColorStop(0.55, PAL.white);
  grad.addColorStop(1, PAL.paperB);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // leichte Rillen diagonal
  paintHatching(ctx, 10, Math.PI * 0.48, 0.06);

  // große Washes
  paintWash(ctx, W * 0.06, H * 0.08, W * 0.42, H * 0.35, PAL.teal, 22, 0.85);
  paintWash(ctx, W * 0.62, H * 0.12, W * 0.34, H * 0.28, PAL.aqua, 20, 0.75);
  paintWash(ctx, W * 0.50, H * 0.62, W * 0.40, H * 0.28, PAL.aqua, 26, 0.55);

  // dunkle Platten
  paintPlate(ctx, W * 0.47, H * 0.18, W * 0.14, H * 0.34, PAL.petrol, 0.03);
  paintPlate(ctx, W * 0.30, H * 0.60, W * 0.18, H * 0.28, PAL.graphite, -0.08);
  paintPlate(ctx, W * 0.77, H * 0.58, W * 0.12, H * 0.16, PAL.petrol, 0.06, false);

  // Pinsel-Flächen (viele feine Striche)
  paintBrush(ctx, W * 0.08, H * 0.10, W * 0.38, H * 0.30, PAL.teal, seedBase + 1, 1400, 0.7, 0.05);
  paintBrush(ctx, W * 0.64, H * 0.14, W * 0.30, H * 0.22, PAL.aqua, seedBase + 2, 1200, 0.7, -0.08);
  paintBrush(ctx, W * 0.53, H * 0.64, W * 0.34, H * 0.22, PAL.cyanDeep, seedBase + 3, 1300, 0.7, 0.02);

  // Licht-Scratches (weiß) & dunkle Scratches
  paintScratches(ctx, seedBase + 11, 1400, Math.PI * 0.35, 1, true);
  paintScratches(ctx, seedBase + 12, 1200, Math.PI * -0.1, 1, false);

  // fette Tintenlinien
  paintInkLine(ctx, W * 0.10, H * 0.54, W * 0.92, H * 0.53, 7, 0.9);
  paintInkLine(ctx, W * 0.62, H * 0.28, W * 0.84, H * 0.27, 5, 0.7);

  // Chips
  paintChips(ctx, [
    { x: W * 0.84, y: H * 0.32, s: clamp(W * 0.016, 12, 26), color: PAL.aqua },
    { x: W * 0.875, y: H * 0.36, s: clamp(W * 0.013, 10, 22), color: PAL.teal },
    { x: W * 0.90, y: H * 0.30, s: clamp(W * 0.010, 8, 18), color: PAL.cyanDeep },
  ]);

  // warme Sand-Wash rechts
  paintWash(ctx, W * 0.76, H * 0.10, W * 0.24, H * 0.32, PAL.sand, 18, 0.35);
}

/** ================== React-Komponente ================== */
export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cnv = canvasRef.current;
    const draw = () => renderArtwork(cnv, 7);
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(cnv);
    window.addEventListener("resize", draw);
    return () => { ro.disconnect(); window.removeEventListener("resize", draw); };
  }, []);

  return (
    <main className="root">
      <header className="hdr">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/verzeichnis">VERZEICHNIS</a>
          <a href="/stiftungstag">STIFTUNGSTAG</a>
          <a href="/termine">TERMINE</a>
          <a href="/austausch">AUSTAUSCH</a>
          <a href="/ueber-uns">ÜBER&nbsp;UNS</a>
          <a href="#kontakt">KONTAKT</a>
        </nav>
      </header>

      <div style={{ height: 80 }} />

      <section ref={heroRef} className="hero">
        <canvas ref={canvasRef} className="art" />
        <div className="heroInner">
          <motion.h1 style={{ y: yHero }} className="title">
            Stiftungs<br/>vielfalt<br/>Saar
          </motion.h1>
          <p className="sub">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen.
            Zugang für die Bürger. Gemeinsam geht mehr.
          </p>
          <div className="btns">
            <button className="btn solid">Mehr erfahren</button>
            <a className="btn outline" href="#kontakt">Kontakt</a>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section className="blk">
        <h2>Wir machen Engagement sichtbar.</h2>
        <p>
          Seit 2011 vernetzt Stiftungsvielfalt Saar die saarländische Stiftungslandschaft, bündelt Wissen
          und öffnet Türen: für Projekte, Kooperationen und Akteure, die mitgestalten wollen.
        </p>
      </section>

      <div className="footer">
        <div>© 2025 Stiftungsvielfalt Saar</div>
        <div>Musterstraße 1, 66119 Saarbrücken · info@stiftungsvielfaltsaar.de</div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        .root {
          background: linear-gradient(135deg, ${PAL.paperA}, #fff 45%, ${PAL.paperB});
          color: #1f2937;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        }
        .hdr {
          position: fixed; inset: 0 0 auto 0; height: 80px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; background: rgba(255,255,255,.85); backdrop-filter: blur(6px);
          border-bottom: 2px solid ${PAL.teal}; z-index: 50;
        }
        .logo { color: ${PAL.teal}; font-weight: 800; letter-spacing: .02em; }
        .nav { display: none; gap: 24px; text-transform: uppercase; letter-spacing: .14em; font-size: 13px; }
        @media (min-width: 900px){ .nav { display: flex; } }
        .nav a { color: #1f2937; text-decoration: none; }
        .nav a:hover { color: ${PAL.teal}; }

        .hero { position: relative; height: 100vh; display: flex; align-items: center; overflow: hidden; }
        .art { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
        .heroInner { position: relative; z-index: 10; padding: 0 48px; }
        .title {
          margin: 0; line-height: .95; font-weight: 900; letter-spacing: -0.02em;
          font-size: clamp(48px, 12vw, 9vw); color: ${PAL.petrol};
          text-shadow: 0 2px 0 rgba(0,0,0,.05);
        }
        .sub { margin-top: 24px; max-width: 780px; font-size: 18px; color: #334155; background: rgba(255,255,255,.6); padding: 8px 12px; display:inline-block; }
        .btns { display: flex; gap: 16px; margin-top: 24px; }
        .btn { display:inline-flex; align-items:center; justify-content:center; height:44px; padding:0 24px; border-radius:8px; cursor:pointer; font-weight:600; text-decoration:none; transition:all .2s ease-in-out; }
        .solid{ background:${PAL.petrol}; color:#fff; border:2px solid ${PAL.petrol}; }
        .solid:hover{ background:${PAL.teal}; border-color:${PAL.teal}; }
        .outline{ background:transparent; color:${PAL.petrol}; border:2px solid ${PAL.petrol}; }
        .outline:hover{ background:${PAL.petrol}; color:#fff; }

        .divider { height: 3px; background: ${PAL.teal}; width: 100%; }
        .blk { padding: 64px 48px; max-width: 1100px; margin: 0 auto; }
        .blk h2 { font-size: clamp(32px, 5vw, 56px); color: ${PAL.petrol}; margin: 0 0 12px; }
        .blk p  { font-size: 18px; color: #334155; margin: 0; }

        .footer { display:grid; grid-template-columns: 1fr; gap: 10px; padding: 40px 48px;
                  background:${PAL.petrol}; color:#d1d5db; }
        @media (min-width: 900px){ .footer { grid-template-columns: 1fr 1fr; } }
        .footer div:last-child { text-align: left; }
        @media (min-width: 900px){ .footer div:last-child { text-align: right; } }
      `}</style>
    </main>
  );
}
