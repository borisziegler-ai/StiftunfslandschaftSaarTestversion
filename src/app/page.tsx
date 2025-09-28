"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Divider({ thick = 3, color = "#0ea5e9" }: { thick?: number; color?: string }) {
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
    "BILDUNG",
    "KULTUR",
    "UMWELT",
    "SOZIALES",
    "JUGEND",
    "SPORT",
    "FORSCHUNG",
    "FAMILIE",
    "POLITIK",
    "SAARLAND",
  ];

  return (
    <main className="bg-gradient-to-br from-cyan-50 via-white to-slate-100 text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur border-b border-cyan-200">
        <div className="text-cyan-700 font-bold">LOGO</div>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <a className="hover:text-cyan-600" href="/verzeichnis">Verzeichnis</a>
          <a className="hover:text-cyan-600" href="/stiftungstag">Stiftungstag</a>
          <a className="hover:text-cyan-600" href="/termine">Termine</a>
          <a className="hover:text-cyan-600" href="/austausch">Austausch</a>
          <a className="hover:text-cyan-600" href="/ueber-uns">Über uns</a>
          <a className="hover:text-cyan-600" href="#kontakt">Kontakt</a>
        </nav>
      </header>

      {/* Spacer */}
      <div style={{ height: 80 }} />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        {/* Abstrakte Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-1/4 w-[500px] h-[500px] bg-cyan-200/40 rotate-12 blur-2xl rounded-2xl" />
          <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-sky-400/30 -rotate-6 blur-2xl rounded-3xl" />
        </div>

        <div className="relative w-full px-6 md:px-12">
          <motion.h1
            style={{ y: yHero }}
            className="leading-[0.95] font-extrabold text-[12vw] md:text-[9vw] tracking-tight text-cyan-800"
          >
            Stiftungs<br />vielfalt<br />Saar
          </motion.h1>
          <p className="mt-6 md:mt-10 max-w-2xl text-slate-700 text-base md:text-lg">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen. Zugang für die Bürger. Gemeinsam geht mehr.
          </p>
          <div className="mt-8 flex gap-4">
            <Button className="bg-cyan-600 text-white hover:bg-cyan-700 rounded-lg px-6">Mehr erfahren</Button>
            <Button variant="outline" className="border border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white rounded-lg px-6">Kontakt</Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* MARQUEE */}
      <section className="relative bg-gradient-to-r from-cyan-100 via-white to-cyan-50 overflow-hidden">
        <div className="whitespace-nowrap py-6 text-cyan-800 font-semibold">
          <div className="animate-[marquee_24s_linear_infinite] flex">
            {[...categories, ...categories].map((cat, i) => (
              <span key={i} className="mx-10">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* FOOTER */}
      <footer id="kontakt" className="relative bg-slate-900 text-slate-300">
        <div className="px-6 md:px-12 py-12 grid md:grid-cols-2 items-end">
          <div>
            <p className="font-bold text-cyan-400 mb-2">Stiftungsvielfalt Saar</p>
            <p className="text-sm">© 2025 – Alle Rechte vorbehalten</p>
          </div>
          <div className="md:text-right text-sm">
            Musterstraße 1, 66119 Saarbrücken · info@stiftungsvielfaltsaar.de
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
