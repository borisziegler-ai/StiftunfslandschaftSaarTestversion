"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Einfache Linie in Akzentfarbe
function Divider({ thick = 3, color = "#0096a5" }: { thick?: number; color?: string }) {
  return <div aria-hidden style={{ height: thick, width: "100%", background: color }} />;
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const categories = [
    "BILDUNG","KULTUR","UMWELT","SOZIALES","JUGEND",
    "SPORT","FORSCHUNG","FAMILIE","POLITIK","SAARLAND",
  ];

  return (
    <main className="page-root">
      {/* Header */}
      <header className="site-header">
        <div className="logo">LOGO</div>
        <nav className="site-nav">
          <a href="/verzeichnis">Verzeichnis</a>
          <a href="/stiftungstag">Stiftungstag</a>
          <a href="/termine">Termine</a>
          <a href="/austausch">Austausch</a>
          <a href="/ueber-uns">Über uns</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </header>

      {/* Platzhalter unter Header */}
      <div style={{ height: 80 }} />

      {/* HERO */}
      <section ref={heroRef} className="hero">
        {/* Hintergrund-Formen */}
        <div className="hero-bg">
          <div className="bg-base" />
          <div className="shape polygon1" />
          <div className="shape polygon2" />
          <div className="shape rect1" />
          <div className="line line1" />
          <div className="line line2" />
        </div>

        {/* Inhalt */}
        <div className="hero-content">
          <motion.h1 style={{ y: yHero }} className="hero-title">
            Stiftungs<br />vielfalt<br />Saar
          </motion.h1>
          <p className="hero-text">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen.
            Zugang für die Bürger. Gemeinsam geht mehr.
          </p>
          <div className="btn-row">
            <button className="btn btn-solid">Mehr erfahren</button>
            <a className="btn btn-outline" href="#kontakt">Kontakt</a>
          </div>
        </div>
      </section>

      <Divider />

      {/* MARQUEE */}
      <section className="marquee-wrap">
        <div className="marquee-track">
          {[...categories, ...categories].map((cat, i) => (
            <span className="marquee-item" key={i}>{cat}</span>
          ))}
        </div>
      </section>

      <Divider />

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="about-left">
          <h2 className="about-title">
            Wir machen <span className="underline">Engagement</span> sichtbar.
          </h2>
          <p className="about-text">
            Seit 2011 vernetzt Stiftungsvielfalt Saar die saarländische Stiftungslandschaft, bündelt Wissen
            und öffnet Türen: für Projekte, Kooperationen und Akteure, die mitgestalten wollen.
          </p>
        </div>
        <div className="about-right">
          <div className="about-block" />
        </div>
      </section>

      <Divider />

      {/* FOOTER */}
      <footer id="kontakt" className="footer">
        <div className="footer-inner">
          <div>
            <p className="footer-brand">Stiftungsvielfalt Saar</p>
            <p className="footer-note">© 2025 – Alle Rechte vorbehalten</p>
          </div>
          <div className="footer-addr">
            Musterstraße 1, 66119 Saarbrücken · info@stiftungsvielfaltsaar.de
          </div>
        </div>
      </footer>

      {/* Styles (styled-jsx, ohne Tailwind) */}
      <style jsx global>{`
        /* Grundlayout / Farben */
        .page-root {
          background: linear-gradient(135deg, #f0f0f0, #ffffff 45%, #d9d9d9);
          color: #1f2937; /* slate-800 */
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        }

        /* Header */
        .site-header {
          position: fixed; inset: 0 0 auto 0; height: 80px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(6px);
          border-bottom: 2px solid #0096a5;
          z-index: 50;
        }
        .logo { color: #0096a5; font-weight: 800; letter-spacing: 0.02em; }
        .site-nav { display: none; gap: 24px; text-transform: uppercase; letter-spacing: 0.14em; font-size: 13px; }
        @media (min-width: 768px) { .site-nav { display: flex; } }
        .site-nav a { color: #111827; text-decoration: none; }
        .site-nav a:hover { color: #0096a5; }

        /* Hero */
        .hero { position: relative; height: 100vh; display: flex; align-items: center; overflow: hidden; }
        .hero-content { position: relative; width: 100%; padding: 0 48px; }
        .hero-title {
          line-height: 0.95; font-weight: 900; letter-spacing: -0.02em;
          font-size: clamp(48px, 12vw, 9vw);
          color: #1c3c4c; /* petrol */
          margin: 0;
        }
        .hero-text { margin-top: 24px; max-width: 720px; font-size: 18px; color: #334155; }
        .btn-row { display: flex; gap: 16px; margin-top: 24px; }

        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          height: 44px; padding: 0 24px; border-radius: 8px; cursor: pointer;
          font-weight: 600; text-decoration: none; transition: all .2s ease-in-out;
        }
        .btn-solid { background: #1c3c4c; color: #fff; border: 2px solid #1c3c4c; }
        .btn-solid:hover { background: #0096a5; border-color: #0096a5; }
        .btn-outline { background: transparent; color: #1c3c4c; border: 2px solid #1c3c4c; }
        .btn-outline:hover { background: #1c3c4c; color: #fff; }

        /* Hero Background Shapes */
        .hero-bg { position: absolute; inset: 0; z-index: -1; }
        .bg-base {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #f0f0f0, #ffffff 45%, #d9d9d9);
        }
        .shape { position: absolute; opacity: 0.7; }
        .polygon1 {
          top: 80px; left: 40px; width: 400px; height: 400px;
          background: #0096a5; transform: rotate(12deg);
          -webkit-clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
                  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
        }
        .polygon2 {
          right: 0; bottom: -40px; width: 600px; height: 500px;
          background: #63d4d6; opacity: 0.6; transform: rotate(-6deg);
          -webkit-clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
                  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
        }
        .rect1 {
          top: 33%; right: 80px; width: 350px; height: 350px;
          background: #1c3c4c; transform: rotate(3deg);
          -webkit-clip-path: inset(10% 15% 5% 10%);
                  clip-path: inset(10% 15% 5% 10%);
        }
        .line {
          position: absolute; background: #000;
        }
        .line1 { bottom: 40px; left: 25%; width: 500px; height: 6px; opacity: 0.8; }
        .line2 { top: 25%; right: 33%; width: 300px; height: 4px; opacity: 0.6; transform: rotate(6deg); }

        /* Marquee */
        .marquee-wrap {
          background: linear-gradient(90deg, rgba(0,150,165,0.1), #fff, rgba(99,212,214,0.1));
          overflow: hidden;
        }
        .marquee-track {
          display: flex; gap: 40px; padding: 20px 0; color: #1c3c4c; font-weight: 600;
          animation: marquee 24s linear infinite;
          will-change: transform;
        }
        .marquee-item { margin: 0 20px; white-space: nowrap; letter-spacing: .15em; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* About */
        .about {
          display: grid; grid-template-columns: 1fr; min-height: 70vh; overflow: hidden;
        }
        @media (min-width: 900px) {
          .about { grid-template-columns: 1.2fr 0.8fr; }
        }
        .about-left { display: flex; align-items: center; padding: 64px 48px; }
        .about-title {
          font-size: clamp(36px, 5vw, 56px);
          line-height: 1.05; font-weight: 700; color: #1c3c4c; margin: 0;
        }
        .underline { text-decoration: underline; text-decoration-color: #0096a5; }
        .about-text { margin-top: 24px; max-width: 720px; font-size: 18px; color: #334155; }
        .about-right {
          display: flex; align-items: center; justify-content: center;
          border-left: 4px solid #0096a5;
        }
        .about-block {
          width: 70%; height: 70%; background: rgba(99,212,214,0.3);
          -webkit-clip-path: inset(10% 15% 5% 10%);
                  clip-path: inset(10% 15% 5% 10%);
        }

        /* Footer */
        .footer { background: #1c3c4c; color: #d1d5db; }
        .footer-inner {
          display: grid; grid-template-columns: 1fr; gap: 16px;
          padding: 48px 48px; align-items: end;
        }
        @media (min-width: 900px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        .footer-brand { color: #63d4d6; font-weight: 800; margin-bottom: 8px; }
        .footer-note, .footer-addr { font-size: 14px; }
        .footer-addr { text-align: left; }
        @media (min-width: 900px) { .footer-addr { text-align: right; } }
      `}</style>
    </main>
  );
}
