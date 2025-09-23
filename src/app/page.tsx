"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Sichtbare, von Tailwind unabhängige Trennlinie
function Divider({ thick = 3 }: { thick?: number }) {
  return (
    <div
      aria-hidden
      style={{ height: thick, background: "#000", width: "100%" }}
    />
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

  // Kategorien für Marquee
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
    <main className="bg-white text-black selection:bg-black selection:text-white">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white"
        style={{ borderBottom: "3px solid #000" }}
      >
        <div style={{ width: 112, height: 32, border: "1px solid #000" }} />
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <a className="hover:text-neutral-500" href="/verzeichnis">Verzeichnis</a>
          <a className="hover:text-neutral-500" href="/stiftungstag">Stiftungstag</a>
          <a className="hover:text-neutral-500" href="/termine">Termine</a>
          <a className="hover:text-neutral-500" href="/austausch">Austausch</a>
          <a className="hover:text-neutral-500" href="/ueber-uns">Über uns</a>
          <a className="hover:text-neutral-500" href="#kontakt">Kontakt</a>
        </nav>
      </header>

      {/* Spacer unter Header */}
      <div style={{ height: 80 }} />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-end md:items-center">
        {/* Hintergrund-Wappen */}
        <div className="absolute top-0 left-0 opacity-10 pointer-events-none select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="95 85 3000 3000"
            width="10000"
            height="10000"
            fill="white"
            stroke="black"
            strokeWidth="30"
          >
            {
}
          </svg>
        </div>

        <motion.div style={{ scale: scaleHero }} className="absolute inset-0" />
        <div className="relative w-full px-6 md:px-12">
          <motion.h1
            style={{ y: yHero }}
            className="leading-[0.95] font-extrabold text-[12vw] md:text-[9vw] tracking-tight text-left"
          >
            Stiftungs<br />vielfalt<br />Saar
          </motion.h1>
          <div className="mt-6 md:mt-10 max-w-2xl text-neutral-700 text-base md:text-lg">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen. Zugang für die Bürger. Gemeinsam geht mehr.
          </div>
          <div className="mt-8 flex gap-4">
            <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-6">Mehr erfahren</Button>
            <Button variant="outline" className="border border-black text-black hover:bg-black hover:text-white rounded-none px-6">Kontakt</Button>
          </div>
        </div>
      </section>

      {/* FETTE LINIE */}
      <Divider />

      {/* ÜBER UNS */}
      <section id="about" className="relative min-h-[80vh] grid md:grid-cols-2">
        <div className="flex items-center px-6 md:px-12 py-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold leading-[1.05]">
              Wir machen <span className="underline">Engagement</span> sichtbar.
            </h2>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Seit 2011 vernetzt Stiftungsvielfalt Saar die saarländische Stiftungslandschaft, bündelt Wissen und öffnet Türen: für Projekte, Kooperationen und Akteure, die mitgestalten wollen.
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center" style={{ borderLeft: "3px solid #000" }}>
          <div
            className="flex items-center justify-center text-neutral-500"
            style={{ width: "75%", height: "75%", border: "3px solid #000" }}
          >
            Visual Placeholder
          </div>
        </div>
      </section>

      <Divider />

      {/* MARQUEE */}
      <section className="relative bg-white overflow-hidden">
        <div className="whitespace-nowrap py-6 text-neutral-800">
          <div className="animate-[marquee_24s_linear_infinite] flex">
            {[...categories, ...categories].map((cat, i) => (
              <span key={i} className="mx-10">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* VERZEICHNIS */}
      <section id="verzeichnis" className="relative min-h-[70vh] grid md:grid-cols-12">
        <div className="md:col-span-7 flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">Alle Stiftungen auf einen Blick.</h3>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Alphabetisch und thematisch filterbar – schnell auffindbar nach Bereichen wie Bildung, Kultur, Soziales, Umwelt und mehr. Klein oder groß: jede Stiftung ist sichtbar.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/verzeichnis" className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black">Zum Verzeichnis</a>
              <a href="/stiftungstag" className="px-6 py-3 border border-black hover:bg-black hover:text-white">Stiftungstag</a>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative flex items-center justify-center" style={{ borderLeft: "3px solid #000" }}>
          <div style={{ width: "75%", height: "75%", border: "3px solid #000" }} />
        </div>
      </section>

      <Divider />

      {/* STIFTUNGSTAG */}
      <section id="stiftungstag" className="relative h-[90vh] flex items-center">
        <div className="relative px-6 md:px-12">
          <h3 className="text-6xl md:text-7xl font-extrabold leading-[0.95]">
            Stiftungstag <span className="underline">Saar</span>
          </h3>
          <p className="mt-6 max-w-2xl text-neutral-700 text-lg">
            Termine, Inhalte, Archiv. Konzentriert auf einer Seite. Klar strukturiert, barrierefrei, mobil erstklassig. Die Bühne für Austausch und Impulse.
          </p>
          <div className="mt-8">
            <Button className="rounded-none border border-black bg-black text-white hover:bg-white hover:text-black">Programm ansehen</Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* AUSTAUSCH */}
      <section id="austausch" className="relative min-h-[70vh] grid md:grid-cols-2">
        <div className="flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">Austausch & Vernetzung</h3>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Ein moderierter, datenschutzkonformer Raum für Bottom-up-Themen.
            </p>
            <div className="mt-8 flex gap-4">
              <Button className="bg-black hover:bg-neutral-800 rounded-none text-white border border-black">Zur Plattform</Button>
              <Button variant="outline" className="rounded-none border border-black hover:bg-black hover:text-white" asChild>
                <a href="/termine">Termine</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center" style={{ borderLeft: "3px solid #000" }}>
          <div style={{ width: "75%", height: "75%", border: "3px solid #000" }} />
        </div>
      </section>

      <Divider />

      {/* FOOTER */}
      <footer id="kontakt" className="relative">
        <div className="px-6 md:px-12 py-12 grid md:grid-cols-2 items-end">
          <div>
            <div style={{ width: 112, height: 32, border: "1px solid #000", marginBottom: 16 }} />
            <p className="text-neutral-700 text-sm">© 2025 Stiftungsvielfalt Saar</p>
          </div>
          <div className="md:text-right text-neutral-700 text-sm">
            Musterstraße 1, 66119 Saarbrücken · info@stiftungsvielfaltsaar.de
          </div>
        </div>
      </footer>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
