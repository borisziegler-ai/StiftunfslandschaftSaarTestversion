"use client";

import Link from "next/link";

export default function AustauschPage() {
  return (
    <main className="bg-white text-black px-6 md:px-12 py-16 min-h-screen">
      {/* Zurück-Link */}
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zum Hauptmenü
        </Link>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold mb-10">Austausch & Vernetzung</h1>
      <p className="text-neutral-700 max-w-2xl mb-12 text-lg">
        Ein moderierter, datenschutzkonformer Raum für Bottom-up-Themen. 
        Alternativ: dedizierte LinkedIn-Gruppen – sichtbar integriert und leicht zugänglich.
      </p>

      <div className="flex gap-6">
        <a
          href="#"
          className="px-6 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black"
        >
          Zur Plattform
        </a>
        <a
          href="#"
          className="px-6 py-3 border-2 border-black hover:bg-black hover:text-white"
        >
          LinkedIn-Gruppen
        </a>
      </div>
    </main>
  );
}
