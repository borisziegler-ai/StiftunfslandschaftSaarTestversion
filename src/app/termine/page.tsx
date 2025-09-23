"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Termin = {
  date: string;
  title: string;
  description: string;
};

const termine: Termin[] = [
  {
    date: "15. Oktober 2025",
    title: "Bildung im Wandel",
    description: "Vortrag und Diskussion zur Zukunft von Bildungsinitiativen im Saarland."
  },
  {
    date: "28. Oktober 2025",
    title: "Kultur verbindet",
    description: "Netzwerktreffen saarländischer Kulturstiftungen mit Fokus auf Kooperationen."
  },
  {
    date: "12. November 2025",
    title: "Umwelt & Nachhaltigkeit",
    description: "Workshop zu nachhaltigen Projekten und Fördermöglichkeiten."
  },
  {
    date: "25. November 2025",
    title: "Jugend im Fokus",
    description: "Ideenschmiede für Akteure und zukünftige Projektträger."
  },
  // 🔹 Weitere Termine für die Kurzliste
  {
    date: "10. Dezember 2025",
    title: "Digitale Zukunft",
    description: "Strategien für die Digitalisierung von Stiftungen."
  },
  {
    date: "22. Januar 2026",
    title: "Kunst & Begegnung",
    description: "Vernissage und Diskussionsabend."
  },
];

export default function TerminePage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="bg-white text-black px-6 md:px-12 py-16 min-h-screen">
      {/* Zurück-Link */}
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zum Hauptmenü
        </Link>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold mb-10">Termine</h1>
      <p className="text-neutral-700 max-w-2xl mb-12 text-lg">
        Hier finden Sie eine Übersicht über die nächsten Veranstaltungen und Termine
        der Stiftungen im Saarland.
      </p>

      {/* Erste 4 Termine in Karten */}
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {termine.slice(0, 4).map((t, i) => (
          <Card key={i} className="border-2 border-black rounded-none shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm text-neutral-500">{t.date}</div>
              <h2 className="text-2xl font-semibold mt-2">{t.title}</h2>
              <p className="text-neutral-700 mt-4">{t.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Button Weitere Termine */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowMore(!showMore)}
          className="px-6 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition"
        >
          {showMore ? "Weniger anzeigen" : "Weitere Termine"}
        </button>
      </div>

      {/* Kurzliste mit Animation */}
      <AnimatePresence initial={false}>
        {showMore && (
          <motion.div
            key="more-terms"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="max-w-2xl mx-auto">
              <ul className="divide-y divide-neutral-300 border-t border-b border-neutral-300">
                {termine.slice(4).map((t, i) => (
                  <li
                    key={i}
                    className="py-4 flex justify-between text-sm md:text-base"
                  >
                    <span className="font-medium">{t.title}</span>
                    <span className="text-neutral-600">{t.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
