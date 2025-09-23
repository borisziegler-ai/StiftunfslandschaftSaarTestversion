"use client";

import { useState } from "react";
import Link from "next/link";
import { stiftungen } from "../../data/stiftungen";

// Hilfsfunktion: Name → Slug (Standard)
function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Sichtbare Trennlinie
function Divider({ thick = 3 }: { thick?: number }) {
  return (
    <div
      aria-hidden
      style={{ height: thick, background: "#000", width: "100%" }}
    />
  );
}

const kategorien = [
  "Alle",
  "Bildung",
  "Kultur",
  "Soziales",
  "Umwelt",
  "Sport",
  "Jugend",
  "Forschung",
  "Familie",
  "Politik",
];

export default function DirectoryPage() {
  const [suche, setSuche] = useState("");
  const [kategorie, setKategorie] = useState("Alle");

  const filtered = stiftungen.filter((s) => {
    const passtKategorie = kategorie === "Alle" || s.kategorie === kategorie;
    const passtSuche = s.name.toLowerCase().includes(suche.toLowerCase());
    return passtKategorie && passtSuche;
  });

  // alphabetisch gruppieren
  const grouped = filtered.reduce((acc: Record<string, typeof filtered>, s) => {
    const letter = s.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(s);
    return acc;
  }, {});

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <main className="bg-white text-black min-h-screen">
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-5 bg-white"
        style={{ borderBottom: "3px solid #000" }}
      >
        <Link href="/" aria-label="Zur Startseite">
          <div
            style={{
              width: 112,
              height: 32,
              border: "1px solid #000",
              cursor: "pointer",
            }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <Link className="hover:text-neutral-500" href="/">
            Home
          </Link>
          <a className="hover:text-neutral-500" href="#kontakt">
            Kontakt
          </a>
        </nav>
      </header>

      {/* 🔹 Zurück-Link */}
      <div className="px-6 md:px-12 mt-6">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zum Hauptmenü
        </Link>
      </div>

      {/* Titel */}
      <section className="px-6 md:px-12 py-16 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-[0.95] uppercase">
          Verzeichnis
        </h1>
      </section>

      <Divider />

      {/* Suchleiste + Kategorien */}
      <section className="relative px-6 md:px-12 py-16">
        {/* Mittige Linie */}
        <div
          className="absolute left-0 right-0 top-1/2"
          style={{
            height: "3px",
            background: "#000",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        />

        {/* Suchleiste */}
        <div className="flex justify-center mb-12 relative z-10">
          <input
            type="text"
            placeholder="STIFTUNGEN FINDEN..."
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            style={{
              padding: "18px 24px",
              width: "100%",
              maxWidth: "600px",
              background: "#fff",
              color: "#000",
              fontSize: "20px",
              fontWeight: "600",
              textTransform: "uppercase",
              border: "3px solid #000",
              outline: "none",
            }}
          />
        </div>

        {/* Kategorien */}
        <div className="flex flex-wrap justify-center gap-4 relative z-10 bg-white px-4 py-2">
          {kategorien.map((kat) => (
            <button
              key={kat}
              onClick={() => setKategorie(kat)}
              style={{
                padding: "8px 16px",
                textTransform: "uppercase",
                fontSize: "14px",
                border: kategorie === kat ? "3px solid #000" : "1px solid #000",
                background: kategorie === kat ? "#000" : "#fff",
                color: kategorie === kat ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {kat}
            </button>
          ))}
        </div>
      </section>

      <Divider />

      {/* Liste der Stiftungen */}
      <section className="px-6 md:px-12 py-12">
        <div
          className="max-w-3xl mx-auto max-h-[70vh] overflow-y-auto overscroll-contain pr-2"
          style={{ textAlign: "center" }}
        >
          {sortedLetters.map((letter) => (
            <div key={letter} style={{ marginBottom: "40px" }}>
              {/* Buchstaben-Header */}
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: "#000",
                  color: "#fff",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                {letter}
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {grouped[letter]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((s) => {
                    // Standard-Slug
                    let link = `/stiftungen/${toSlug(s.name)}`;

                    // Sonderfall: ADFC → immer nur /stiftungen/adfc
                    if (s.name.toLowerCase().includes("adfc")) {
                      link = "/stiftungen/adfc";
                    }

                    return (
                      <li key={s.name} style={{ padding: "12px 0" }}>
                        <Link href={link}>
                          <span
                            style={{
                              display: "inline-block",
                              borderBottom: "2px solid #000",
                              padding: "0 8px",
                              fontSize: "18px",
                              cursor: "pointer",
                            }}
                          >
                            {s.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer id="kontakt" className="px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-2 items-end">
          <div>
            <div
              style={{
                width: 112,
                height: 32,
                border: "1px solid #000",
                marginBottom: 16,
              }}
            />
            <p className="text-neutral-700 text-sm">© 2025 Stiftungsvielfalt Saar</p>
          </div>
          <div className="md:text-right text-neutral-700 text-sm">
            Musterstraße 1, 66111 Saarbrücken · info@stiftungsvielfaltsaar.de
          </div>
        </div>
      </footer>
    </main>
  );
}
