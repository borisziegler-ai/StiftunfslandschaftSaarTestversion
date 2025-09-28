"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** —— 1) Exact colors (adjust to match your artwork 1:1) —— */
const PALETTE = {
  // background whites/greys
  paperA: "#F1F1F1",
  paperB: "#E7E7E7",
  // main art colors
  teal:   "#00A0A8",  // bright turquoise
  aqua:   "#66D6D7",  // light cyan
  petrol: "#163844",  // deep blue-green
  sky:    "#4FA9C8",  // blue accent (optional)
  ink:    "#000000",  // black accents/lines
};

function Divider({ thick = 3, color = PALETTE.teal }: { thick?: number; color?: string }) {
  return <div aria-hidden style={{ height: thick, width: "100%", background: color }} />;
}

/** —— 2) SVG art background (geometric “brush” composition) —— */
function ArtBackground() {
  return (
    <svg
      aria-hidden
      className="art-bg"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grad paper base */}
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor={PALETTE.paperA} />
          <stop offset="60%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={PALETTE.paperB} />
        </linearGradient>

        {/* subtle line texture */}
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 L8 0" stroke="rgba(0,0,0,.05)" strokeWidth="1"/>
        </pattern>

        {/* soft blur & multiply to mimic “paint” */}
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="softer" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="22" />
        </filter>

        {/* edge hatch mask */}
        <mask id="edgeHatch">
          <rect width="1600" height="900" fill="white" />
          <g transform="translate(0,0)" opacity=".12">
            <rect width="1600" height="900" fill="url(#hatch)" />
          </g>
        </mask>
      </defs>

      {/* paper background */}
      <rect width="1600" height="900" fill="url(#paper)" />

      {/* --- big teal plates (rotated rects) --- */}
      <g opacity=".85">
        <g transform="translate(120,120) rotate(8)">
          <rect width="520" height="320" fill={PALETTE.teal} filter="url(#soft)" />
          <rect x="18" y="18" width="484" height="284" fill={PALETTE.teal} opacity=".85" />
        </g>
        <g transform="translate(980,160) rotate(-5)">
          <rect width="420" height="280" fill={PALETTE.aqua} filter="url(#soft)" />
          <rect x="14" y="14" width="392" height="252" fill={PALETTE.aqua} opacity=".8" />
        </g>
      </g>

      {/* --- petrol blocks (dense, darker) --- */}
      <g opacity=".9">
        <g transform="translate(760,210) rotate(2)">
          <rect width="230" height="280" fill={PALETTE.petrol} />
          <rect x="18" y="18" width="194" height="244" fill={PALETTE.petrol} opacity=".8" />
        </g>
        <g transform="translate(610,520) rotate(-3)">
          <rect width="300" height="220" fill={PALETTE.petrol} />
          <rect x="10" y="10" width="280" height="200" fill={PALETTE.petrol} opacity=".82" />
        </g>
      </g>

      {/* --- icy cyan wash (broad soft shapes) --- */}
      <g opacity=".7" filter="url(#softer)">
        <rect x="200" y="540" width="480" height="180" fill={PALETTE.aqua} />
        <rect x="980" y="520" width="420" height="200" fill={PALETTE.sky} opacity=".55" />
      </g>

      {/* --- thin black ink lines (graphical accents) --- */}
      <g stroke={PALETTE.ink} strokeWidth="6" opacity=".9">
        <line x1="140" y1="620" x2="720" y2="620" />
      </g>
      <g stroke={PALETTE.ink} strokeWidth="4" opacity=".7">
        <line x1="980" y1="280" x2="1320" y2="270" />
      </g>

      {/* small square chips */}
      <g opacity=".9">
        <rect x="1260" y="330" width="36" height="36" fill={PALETTE.sky} />
        <rect x="1320" y="360" width="28" height="28" fill={PALETTE.teal} />
        <rect x="1360" y="310" width="24" height="24" fill={PALETTE.aqua} />
      </g>

      {/* hatch mask for subtle texture on top */}
      <rect width="1600" height="900" fill="transparent" mask="url(#edgeHatch)" />
    </svg>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <main className="root">
      {/* Header */}
      <header className="hdr">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/verzeichnis">VERZEICHNIS</a>
          <a href="/stiftungstag">STIFTUNGSTAG</a>
          <a href="/termine">TERMINE</a>
          <a href="/austausch">AUSTAUSCH</a>
          <a href="/ueber-uns">ÜBER UNS</a>
          <a href="#kontakt">KONTAKT</a>
        </nav>
      </header>

      <div style={{ height: 80 }} />

      {/* HERO with SVG art */}
      <section ref={heroRef} className="hero">
        <ArtBackground />
        <div className="heroInner">
          <motion.h1 style={{ y: yHero }} className="title">
            Stiftungs<br />vielfalt<br />Saar
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

      <Divider />

      {/* Simple content blocks (text only as requested) */}
      <section className="blk">
        <h2>Wir machen Engagement sichtbar.</h2>
        <p>
          Seit 2011 vernetzt Stiftungsvielfalt Saar die saarländische Stiftungslandschaft, bündelt Wissen
          und öffnet Türen: für Projekte, Kooperationen und Akteure, die mitgestalten wollen.
        </p>
      </section>

      <Divider />

      <footer id="kontakt" className="ftr">
        <div>© 2025 Stiftungsvielfalt Saar</div>
        <div>Musterstraße 1, 66119 Saarbrücken · info@stiftungsvielfaltsaar.de</div>
      </footer>

      {/* —— 3) Page styles (no Tailwind) —— */}
      <style jsx global>{`
        .root {
          background: linear-gradient(135deg, ${PALETTE.paperA}, #ffffff 45%, ${PALETTE.paperB});
          color: #1f2937;
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        }
        .hdr {
          position: fixed; inset: 0 0 auto 0; height: 80px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; background: rgba(255,255,255,.85); backdrop-filter: blur(6px);
          border-bottom: 2px solid ${PALETTE.teal}; z-index: 50;
        }
        .logo { color: ${PALETTE.teal}; font-weight: 800; letter-spacing: .02em; }
        .nav { display: none; gap: 24px; text-transform: uppercase; letter-spacing: .14em; font-size: 13px; }
        @media (min-width: 900px){ .nav { display: flex; } }
        .nav a { color: #1f2937; text-decoration: none; }
        .nav a:hover { color: ${PALETTE.teal}; }

        .hero { position: relative; height: 100vh; display: flex; align-items: center; overflow: hidden; }
        .art-bg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .heroInner { position: relative; z-index: 1; padding: 0 48px; }
        .title {
          margin: 0; line-height: .95; font-weight: 900; letter-spacing: -0.02em;
          font-size: clamp(48px, 12vw, 9vw); color: ${PALETTE.petrol};
          text-shadow: 0 2px 0 rgba(0,0,0,.05);
        }
        .sub { margin-top: 24px; max-width: 720px; font-size: 18px; color: #334155; }
        .btns { display: flex; gap: 16px; margin-top: 24px; }

        .btn {
          display: inline-flex; align-items: center; justify-content: center; height: 44px;
          padding: 0 24px; border-radius: 8px; cursor: pointer; font-weight: 600;
          text-decoration: none; transition: all .2s ease-in-out;
        }
        .solid  { background: ${PALETTE.petrol}; color: #fff; border: 2px solid ${PALETTE.petrol}; }
        .solid:hover { background: ${PALETTE.teal}; border-color: ${PALETTE.teal}; }
        .outline{ background: transparent; color: ${PALETTE.petrol}; border: 2px solid ${PALETTE.petrol}; }
        .outline:hover{ background: ${PALETTE.petrol}; color: #fff; }

        .blk { padding: 64px 48px; max-width: 1100px; margin: 0 auto; }
        .blk h2 { font-size: clamp(32px, 5vw, 56px); color: ${PALETTE.petrol}; margin: 0 0 12px; }
        .blk p  { font-size: 18px; color: #334155; margin: 0; }

        .ftr { display: grid; grid-template-columns: 1fr; gap: 10px; padding: 40px 48px;
               background: ${PALETTE.petrol}; color: #d1d5db; }
        @media (min-width: 900px){ .ftr { grid-template-columns: 1fr 1fr; } }
        .ftr div:last-child { text-align: left; }
        @media (min-width: 900px){ .ftr div:last-child { text-align: right; } }
      `}</style>
    </main>
  );
}
