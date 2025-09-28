"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Divider mit Akzentfarbe
function Divider({ thick = 3, color = "#0096a5" }: { thick?: number; color?: string }) {
  return (
    <div aria-hidden style={{ height: thick, background: color, width: "100%" }} />
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const categories = [
    "BILDUNG", "KULTUR", "UMWELT", "SOZIALES", "JUGEND",
    "SPORT", "FORSCHUNG", "FAMILIE", "POLITIK", "SAARLAND",
  ];

  return (
    <main className="bg-gradient-to-br from-[#f0f0f0] via-white to-[#d9d9d9] text-slate-900 selection:bg-[#0096a5] selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur border-b border-[#0096a5]">
        <div className="text-[#0096a5] font-bold">LOGO</div>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <a className="hover:text-[#0096a5]" href="/verzeichnis">Verzeichnis</a>
          <a className="hover:text-[#0096a5]" href="/stiftungstag">Stiftungstag</a>
          <a className="hover:text-[#0096a5]" href="/termine">Termine</a>
          <a className="hover:text-[#0096a5]" href="/austausch">Austausch</a>
          <a className="hover:text-[#0096a5]" href="/ueber-uns">Über uns</a>
          <a className="hover:text-[#0096a5]" href="#kontakt">Kontakt</a>
        </nav>
      </header>

      {/* Spacer */}
      <div style={{ height: 80 }} />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        {/* Hintergrund-Formen */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f0] via-white to-[#d9d9d9]" />
          <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[#0096a5] opacity-80 rotate-12 clip-polygon" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[#63d4d6] opacity-60 -rotate-6 clip-polygon" />
          <div className="absolute top-1/3 right-20 w-[350px] h-[350px] bg-[#1c3c4c] opacity-70 rotate-3 clip-rect" />
          <div className="absolute bottom-10 left-1/4 w-[500px] h-[6px] bg-black opacity-80" />
          <div className="absolute top-1/4 right-1/3 w-[300px] h-[4px] bg-black opacity-60 rotate-6" />
        </div>

        {/* Inhalt */}
        <div className="relative w-full px-6 md:px-12 text-slate-900">
          <motion.h1
            style={{ y: yHero }}
            className="leading-[0.95] font-extrabold text-[12vw] md:text-[9vw] tracking-tight text-[#1c3c4c]"
          >
            Stiftungs<br />vielfalt<br />Saar
          </motion.h1>
          <p className="mt-6 md:mt-10 max-w-2xl text-lg text-slate-700">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen. Zugang für die Bürger. Gemeinsam geht mehr.
          </p>
          <div className="mt-8 flex gap-4">
            <Button className="bg-[#1c3c4c] text-white hover:bg-[#0096a5] px-6">Mehr erfahren</Button>
            <Button variant="outline" className="border border-[#1c3c4c] text-[#1c3c4c] hover:bg-[#1c3c4c] hover:text-white px-6">Kontakt</Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* MARQUEE */}
      <section className="relative bg-gradient-to-r from-[#0096a5]/10 via-white to-[#63d4d6]/10 overflow-hidden">
        <div className="whitespace-nowrap py-6 text-[#1c3c4c] font-semibold">
          <div className="animate-[marquee_24s_linear_infinite] flex">
            {[...categories, ...categories].map((cat, i) => (
              <span key={i} className="mx-10">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ABOUT */}
      <section id="about" className="relative min-h-[70vh] grid md:grid-cols-2 overflow-hidden">
        <div className="flex items-center px-6 md:px-12 py-16 relative z-10">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold leading-[1.05] text-[#1c3c4c]">
              Wir machen <span className="underline decoration-[#0096a5]">Engagement</span> sichtbar.
            </h2>
            <p className="mt-6 text-slate-700 max-w-xl text-lg">
              Seit 2011 vernetzt Stiftungsvielfalt Saar die saarländische Stiftungslandschaft, bündelt Wissen und öffnet Türen: für Projekte, Kooperationen und Akteure, die mitgestalten wollen.
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center border-l-4 border-[#0096a5]">
          <div className="w-[70%] h-[70%] bg-[#63d4d6]/30 clip-rect" />
        </div>
      </section>

      <Divider />

      {/* FOOTER */}
      <footer id="kontakt" className="rel
