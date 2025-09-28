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
    <main style={{ background: "#fff", color: "#000" }}>
      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          background: "#fff",
          borderBottom: "3px solid #000",
        }}
      >
        <div style={{ width: 112, height: 32, border: "1px solid #000" }} />
        <nav
          style={{
            display: "flex",
            gap: 32,
            fontSize: 14,
            textTransform: "uppercase",
          }}
        >
          <a href="/ueber-uns">Über uns</a>
          <a href="/verzeichnis">Verzeichnis</a>
          <a href="/stiftungstag">Stiftungstag</a>
          <a href="/austausch">Austausch</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </header>

      {/* Spacer unter Header */}
      <div style={{ height: 80 }} />

      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Hintergrund-Wappen */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="95 85 3000 3000"
            width="10000"
            height="10000"
            fill="white"
            stroke="black"
            strokeWidth="30"
          >
            {/* svg code */}
          </svg>
        </div>

        <motion.div style={{ scale: scaleHero }} className="absolute inset-0" />
        <div style={{ position: "relative", width: "100%", padding: "0 24px" }}>
          <motion.h1
            style={{
              y: yHero,
              lineHeight: 0.95,
              fontWeight: 800,
              fontSize: "12vw",
              margin: 0,
            }}
          >
            Stiftungs<br />Forum<br />Saar
          </motion.h1>
          <div
            style={{
              marginTop: 24,
              maxWidth: 640,
              color: "#555",
              fontSize: 18,
            }}
          >
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam.
            Sichtbarkeit für alle Stiftungen. Zugang für die Bürger. Gemeinsam
            geht mehr.
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
            <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-6">
              Mehr erfahren
            </Button>
            <Button
              variant="outline"
              className="border border-black text-black hover:bg-black hover:text-white rounded-none px-6"
            >
              Kontakt
            </Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* ... Rest deiner Seite bleibt unverändert ... */}

      {/* FOOTER */}
      <footer id="kontakt" style={{ position: "relative" }}>
        <div
          style={{
            padding: "48px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                width: 112,
                height: 32,
                border: "1px solid #000",
                marginBottom: 16,
              }}
            />
            <p style={{ color: "#555", fontSize: 14 }}>
              © 2025 StiftungsForumSaar
            </p>
          </div>
          <div style={{ textAlign: "right", color: "#555", fontSize: 14 }}>
            Musterstraße 1, 66119 Saarbrücken · info@stiftungsforumsaar.de
          </div>
        </div>
      </footer>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}
