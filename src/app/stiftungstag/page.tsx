"use client";

import Link from "next/link";
import Image from "next/image";

export default function StiftungstagPage() {
  return (
    <main className="bg-white text-black px-6 md:px-12 py-16 min-h-screen">
      {/* Zurück-Link */}
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zum Hauptmenü
        </Link>
      </div>

      {/* Titel */}
      <h1 className="text-5xl md:text-6xl font-bold mb-10">Stiftungstag Saar</h1>

      {/* Flyer / Bildhalter */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="relative border-2 border-black bg-neutral-100 flex items-center justify-center h-96">
          {/* Bild später ersetzen */}
          <Image
            src="/images/stiftungstag/flyer2024.jpg"
            alt="Flyer Stiftungstag 2024"
            width={800}
            height={600}
            className="object-contain"
          />
        </div>
        <p className="text-center text-sm text-neutral-600 mt-2">
          Flyer & Programm zum 7. Stiftungstag 2024
        </p>
      </div>

      {/* Infos zum 7. Stiftungstag */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">7. Stiftungstag Saar 2024</h2>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Der 7. Stiftungstag Saar im Jahr 2024 brachte zahlreiche Akteure aus
          Bildung, Kultur, Nachhaltigkeit und sozialem Engagement zusammen.
          Im Mittelpunkt standen Vorträge, Diskussionen und Austauschmöglichkeiten
          zwischen Bürger:innen und Stiftungen. 
        </p>
        <Link
          href="/downloads/stiftungstag2024-programm.pdf"
          className="text-sm text-black font-semibold hover:underline"
        >
          → Programmheft herunterladen
        </Link>
      </section>

      {/* Ausblick auf den 8. Stiftungstag */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">Ausblick: 8. Stiftungstag Saar 2025</h2>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Der 8. Stiftungstag Saar ist bereits in Planung. Auch 2025 wird der Tag
          wieder zahlreiche spannende Vorträge, Workshops und Austauschformate bieten.
          Weitere Informationen zum Programm folgen in Kürze.
        </p>
        <div className="relative border-2 border-dashed border-black bg-neutral-50 flex items-center justify-center h-64">
          <span className="text-neutral-500">Platzhalter für Flyer/Infos 2025</span>
        </div>
      </section>
    </main>
  );
}
