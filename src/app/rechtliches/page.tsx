"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

// --- Datentypen
type Thema = "Stiftung & Recht" | "Gemeinnützige Stiftungen" | "Stiftung & Steuern" | "Stiftungsverwaltung" | "Gestaltungshinweis" | "Stiftungsvermögen";
type Art   = "Musterformulierungen" | "Checklisten" | "Sonderausgaben" | "Musterverträge und -schreiben";

type UpdateItem = {
  id: string;
  date: string; // ISO, z. B. "2025-01-16"
  thema: Thema;
  art: Art;
  title: string;
  excerpt: string;
  href: string;
};

// --- Beispielinhalte (später aus CMS/Sheets ersetzbar)
const UPDATES: UpdateItem[] = [
  {
    id: "u1",
    date: "2025-01-16",
    thema: "Stiftung & Recht",
    art: "Sonderausgaben",
    title: "Sonderausgabe: Stiftungsholding als Alternative zur GmbH-Holding – Update 2025",
    excerpt:
      "Die Stiftungsholding bietet sich als Alternative zur GmbH-Holding an. Zehn Vorteile nennt die folgende Sonderausgabe.",
    href: "#",
  },
  {
    id: "u2",
    date: "2024-12-16",
    thema: "Stiftung & Recht",
    art: "Musterverträge und -schreiben",
    title: "Arbeitsvertrag für eine geringfügige Beschäftigung bis 556 Euro monatlich",
    excerpt:
      "Muster-Arbeitsvertrag für geringfügig Beschäftigte nach Anhebung des Mindestlohns und der Geringfügigkeitsgrenze.",
    href: "#",
  },
  {
    id: "u3",
    date: "2024-10-26",
    thema: "Stiftung & Recht",
    art: "Sonderausgaben",
    title: "Sonderausgabe: Die Familienstiftung",
    excerpt:
      "Begriff, Rechtsnatur, Gestaltungsmöglichkeiten und Fallstricke bei Familienstiftungen – kompakt erläutert.",
    href: "#",
  },
  {
    id: "u4",
    date: "2025-02-10",
    thema: "Stiftung & Steuern",
    art: "Checklisten",
    title: "Gemeinnützigkeit prüfen: Jahrescheck 2025",
    excerpt:
      "Praktische Checkliste: Satzungszwecke, tatsächliche Geschäftsführung, Mittelverwendung – das müssen Stiftungen dokumentieren.",
    href: "#",
  },
  {
    id: "u5",
    date: "2025-03-05",
    thema: "Stiftungsverwaltung",
    art: "Musterformulierungen",
    title: "Satzungsbausteine: Zweck, Vermögensbindung & Organregelungen",
    excerpt:
      "Erprobte Formulierungen für Kernparagrafen der Stiftungssatzung – modular und praxistauglich.",
    href: "#",
  },
];

// Filteroptionen
const THEMEN: Thema[] = [
  "Stiftung & Recht",
  "Gemeinnützige Stiftungen",
  "Stiftung & Steuern",
  "Stiftungsverwaltung",
  "Gestaltungshinweis",
  "Stiftungsvermögen",
];

const ARTEN: Art[] = [
  "Musterformulierungen",
  "Checklisten",
  "Sonderausgaben",
  "Musterverträge und -schreiben",
];

export default function RechtlichesPage() {
  // --- UI-Status
  const [selectedThema, setSelectedThema] = useState<"Alle" | Thema>("Alle");
  const [selectedArt, setSelectedArt] = useState<"Alle" | Art>("Alle");
  const [sort, setSort] = useState<"date" | "az">("date");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  // --- Ableitung der Trefferliste
  const filtered = useMemo(() => {
    let out = [...UPDATES];

    if (selectedThema !== "Alle") {
      out = out.filter((x) => x.thema === selectedThema);
    }
    if (selectedArt !== "Alle") {
      out = out.filter((x) => x.art === selectedArt);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.excerpt.toLowerCase().includes(q)
      );
    }

    if (sort === "date") {
      out.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      out.sort((a, b) => a.title.localeCompare(b.title));
    }

    return out;
  }, [selectedThema, selectedArt, sort, query]);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  // Datum formatieren (DE)
  const fDate = (iso: string) =>
    new Date(iso).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <main className="bg-white text-black min-h-screen">
      {/* Kopfzeile + Zurück */}
      <header className="px-6 md:px-12 py-6 border-b-2 border-black flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zum Hauptmenü
        </Link>

        <nav className="hidden md:flex items-center gap-6 uppercase text-sm tracking-wider">
          <Link href="/verzeichnis" className="hover:text-neutral-500">Verzeichnis</Link>
          <Link href="/stiftungstag" className="hover:text-neutral-500">Stiftungstag</Link>
          <Link href="/termine" className="hover:text-neutral-500">Termine</Link>
          <Link href="/ueber-uns" className="hover:text-neutral-500">Über uns</Link>
        </nav>
      </header>

      {/* Titel + Suche/Sortierung */}
      <section className="px-6 md:px-12 py-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Rechtliches & Stiftungsgründung
        </h1>
        <p className="mt-4 text-neutral-700 max-w-3xl">
          Tipps, Muster und aktuelle Hinweise zur Gründung und Führung einer Stiftung.
          Hier finden Sie praxisnahe Downloads sowie Updates zu Gesetzesänderungen.
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center">
          <input
            className="border-2 border-black px-4 py-2 w-full md:w-96 font-semibold uppercase placeholder-neutral-400"
            placeholder="SUCHEN…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600">Sortieren nach:</span>
            <button
              onClick={() => setSort("az")}
              className={`px-3 py-1 border ${sort === "az" ? "border-black bg-black text-white" : "border-black hover:bg-black hover:text-white"}`}
            >
              A-Z
            </button>
            <button
              onClick={() => setSort("date")}
              className={`px-3 py-1 border ${sort === "date" ? "border-black bg-black text-white" : "border-black hover:bg-black hover:text-white"}`}
            >
              Datum
            </button>
          </div>
        </div>
      </section>

      {/* Inhalt: Sidebar Filter + Liste */}
      <section className="px-6 md:px-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="border-2 border-black p-5">
            <h3 className="text-lg font-semibold mb-4">Filtern nach Themen</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="thema"
                  checked={selectedThema === "Alle"}
                  onChange={() => setSelectedThema("Alle")}
                />
                <span>Alle</span>
              </label>
              {THEMEN.map((t) => (
                <label key={t} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="thema"
                    checked={selectedThema === t}
                    onChange={() => setSelectedThema(t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>

            <div className="h-[1px] bg-neutral-300 my-6" />

            <h3 className="text-lg font-semibold mb-4">Filtern nach Art</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="art"
                  checked={selectedArt === "Alle"}
                  onChange={() => setSelectedArt("Alle")}
                />
                <span>Alle</span>
              </label>
              {ARTEN.map((a) => (
                <label key={a} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="art"
                    checked={selectedArt === a}
                    onChange={() => setSelectedArt(a)}
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Liste */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="space-y-6">
            {visible.map((item) => (
              <article key={item.id} className="border-2 border-black p-5 hover:shadow-sm transition">
                <div className="text-sm text-neutral-600">
                  {fDate(item.date)} · {item.art} ·{" "}
                  <span className="text-neutral-700">{item.thema}</span>
                </div>

                <h2 className="text-2xl md:text-[26px] font-bold mt-2 leading-tight">
                  <Link href={item.href} className="hover:underline">
                    {item.title}
                  </Link>
                </h2>

                <p className="mt-2 text-neutral-700">
                  {item.excerpt}
                </p>

                <div className="mt-3">
                  <Link href={item.href} className="font-semibold hover:underline">
                    weiter →
                  </Link>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="text-neutral-600">Keine Einträge gefunden.</div>
            )}
          </div>

          {/* Mehr laden */}
          {filtered.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="px-6 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black"
              >
                {showAll ? "Weniger anzeigen" : "Weitere Beiträge anzeigen"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ / Tipps zur Gründung */}
      <section className="px-6 md:px-12 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Unsere Rechtsexperten antworten</h2>
        <div className="divide-y divide-neutral-300 border-y">
          {[
            "Welche Rechtsform ist für meine Stiftung am besten geeignet?",
            "Wie erstelle ich die Satzung meiner Stiftung?",
            "Welche Anforderungen gibt es bei der Anerkennung einer Stiftung?",
            "Kann ich als Stifter weiterhin Einfluss auf die Stiftung nehmen?",
            "Welche Haftungsrisiken bestehen für Stifter:innen oder den Vorstand?",
          ].map((q, i) => (
            <details key={i} className="group">
              <summary className="list-none cursor-pointer py-4 flex items-center justify-between">
                <span className="font-medium">{q}</span>
                <span className="text-2xl leading-none select-none group-open:rotate-45 transition">+</span>
              </summary>
              <div className="pb-4 text-neutral-700">
                Kompakte Orientierung: rechtlicher Rahmen, typische Stolpersteine und
                praktische Hinweise aus der Beratung. (Hier deinen Text/Links einfügen.)
              </div>
            </details>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-6">Unsere Steuerexperten antworten</h2>
        <div className="divide-y divide-neutral-300 border-y">
          {[
            "Welche steuerlichen Vorteile habe ich durch die Gründung einer Stiftung?",
            "Wie wirkt sich die Übertragung von Vermögen auf die Stiftung steuerlich aus?",
            "Wie organisiere ich Buchführung und Berichterstattung?",
            "Welche Rolle spielt die Stiftungsaufsicht?",
          ].map((q, i) => (
            <details key={`tax-${i}`} className="group">
              <summary className="list-none cursor-pointer py-4 flex items-center justify-between">
                <span className="font-medium">{q}</span>
                <span className="text-2xl leading-none select-none group-open:rotate-45 transition">+</span>
              </summary>
              <div className="pb-4 text-neutral-700">
                Kurz erklärt: steuerliche Rahmenbedingungen, Nachweispflichten und
                Best Practices. (Hier deine Inhalte/Downloads verlinken.)
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer Mini */}
      <footer className="px-6 md:px-12 py-10 border-t">
        <div className="text-sm text-neutral-600">
          Hinweis: Diese Inhalte ersetzen keine Rechts- oder Steuerberatung.
          Für individuelle Fragen wenden Sie sich bitte an fachkundige Berater:innen.
        </div>
      </footer>
    </main>
  );
}
