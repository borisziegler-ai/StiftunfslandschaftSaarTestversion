"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/** ---------- Typen ---------- */
type Thema =
  | "Stiftung & Recht"
  | "Gemeinnützige Stiftungen"
  | "Stiftung & Steuern"
  | "Stiftungsverwaltung"
  | "Gestaltungshinweis"
  | "Stiftungsvermögen";

type Kategorie =
  | "Musterformulierungen"
  | "Checklisten"
  | "Sonderausgaben"
  | "Musterverträge und -schreiben";

type UpdateItem = {
  id: string;
  date: string; // ISO „YYYY-MM-DD“
  thema: Thema;
  kategorie: Kategorie; // (vorher „Art“) – wording geändert
  title: string;
  excerpt: string;
  href: string;
};

type NewsItem = {
  id: string;
  date: string; // ISO
  title: string;
  content: string;
};

/** ---------- Daten (Beispiel) ---------- */

// Aktuelles (NEU): aufklappbar
const NEWS: NewsItem[] = [
  {
    id: "n1",
    date: "2025-10-01",
    title: "Stiftungsregister wird wohl auf 2028 verschoben",
    content:
      "Nach jüngsten Abstimmungen auf Bundesebene zeichnet sich ab, dass die flächendeckende produktive Einführung des Stiftungsregisters nicht vor 2028 erfolgen wird. "
      + "Für Stiftungen bedeutet das: mehr Zeit für Vorbereitungen (Satzungs-Check, Organangaben, Vertretungsregelungen). "
      + "Bis dahin gelten die bisherigen Melde- und Nachweispflichten fort; parallel sollen Pilotprozesse ausgeweitet werden.",
  },
  {
    id: "n2",
    date: "2025-07-15",
    title: "Hinweis: Muster-Satzungsbausteine aktualisiert",
    content:
      "Die Musterformulierungen für Zweck, Vermögensbindung und Organregelungen wurden sprachlich präzisiert und an aktuelle Verwaltungspraxis angepasst.",
  },
];

const UPDATES: UpdateItem[] = [
  {
    id: "u1",
    date: "2025-03-05",
    thema: "Stiftungsverwaltung",
    kategorie: "Musterformulierungen",
    title: "Satzungsbausteine: Zweck, Vermögensbindung & Organregelungen",
    excerpt:
      "Erprobte Formulierungen für Kernparagrafen der Stiftungssatzung – modular und praxistauglich.",
    href: "#",
  },
  {
    id: "u2",
    date: "2025-02-10",
    thema: "Stiftung & Steuern",
    kategorie: "Checklisten",
    title: "Gemeinnützigkeit prüfen: Jahrescheck 2025",
    excerpt:
      "Checkliste: Satzungszwecke, tatsächliche Geschäftsführung, Mittelverwendung – das muss dokumentiert werden.",
    href: "#",
  },
  {
    id: "u3",
    date: "2025-01-16",
    thema: "Stiftung & Recht",
    kategorie: "Sonderausgaben",
    title: "Sonderausgabe: Stiftungsholding als Alternative zur GmbH-Holding",
    excerpt:
      "Wann die Stiftungsholding vorteilhaft sein kann und welche 10 Punkte Sie prüfen sollten.",
    href: "#",
  },
  {
    id: "u4",
    date: "2024-12-16",
    thema: "Stiftung & Recht",
    kategorie: "Musterverträge und -schreiben",
    title:
      "Arbeitsvertrag für eine geringfügige Beschäftigung bis 556 € monatlich",
    excerpt:
      "Aktualisiertes Muster nach Anhebung von Mindestlohn und Geringfügigkeitsgrenze – sofort einsetzbar.",
    href: "#",
  },
  {
    id: "u5",
    date: "2024-10-26",
    thema: "Stiftung & Recht",
    kategorie: "Sonderausgaben",
    title: "Sonderausgabe: Die Familienstiftung",
    excerpt:
      "Begriff, Rechtsnatur, Gestaltungsmöglichkeiten und typische Fallstricke kompakt erläutert.",
    href: "#",
  },
];

const THEMEN: Thema[] = [
  "Stiftung & Recht",
  "Gemeinnützige Stiftungen",
  "Stiftung & Steuern",
  "Stiftungsverwaltung",
  "Gestaltungshinweis",
  "Stiftungsvermögen",
];

const KATEGORIEN: Kategorie[] = [
  "Musterformulierungen",
  "Checklisten",
  "Sonderausgaben",
  "Musterverträge und -schreiben",
];

/** ---------- Seite ---------- */
export default function RechtlichesPage() {
  const [selectedThema, setSelectedThema] = useState<"Alle" | Thema>("Alle");
  const [selectedKat, setSelectedKat] =
    useState<"Alle" | Kategorie>("Alle");
  const [sort, setSort] = useState<"date" | "az">("date");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let out = [...UPDATES];

    if (selectedThema !== "Alle") out = out.filter((x) => x.thema === selectedThema);
    if (selectedKat !== "Alle") out = out.filter((x) => x.kategorie === selectedKat);

    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.excerpt.toLowerCase().includes(q)
      );
    }

    if (sort === "date") out.sort((a, b) => b.date.localeCompare(a.date));
    else out.sort((a, b) => a.title.localeCompare(b.title));

    return out;
  }, [selectedThema, selectedKat, query, sort]);

  const visible = showAll ? filtered : filtered.slice(0, 6);

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

      {/* Titel */}
      <section className="px-6 md:px-12 py-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Rechtliches & Stiftungsgründung
        </h1>
        <p className="mt-4 text-neutral-700 max-w-3xl">
          Tipps, Muster und aktuelle Hinweise zur Gründung und Führung einer Stiftung.
          Hier finden Sie praxisnahe Downloads sowie Updates zu Gesetzesänderungen.
        </p>
      </section>

      {/* AKTUELLES (NEU) */}
      <section className="px-6 md:px-12 pb-4">
        <h2 className="text-2xl font-semibold mb-4">Aktuelles</h2>
        <div className="space-y-3">
          {NEWS.sort((a, b) => b.date.localeCompare(a.date)).map((n) => (
            <details key={n.id} className="border-2 border-black p-4 group open:bg-neutral-50">
              <summary className="cursor-pointer font-semibold flex items-center justify-between">
                <span>{n.title}</span>
                <span className="text-xl leading-none select-none group-open:rotate-45 transition">+</span>
              </summary>
              <div className="text-sm text-neutral-700 mt-3">
                <div className="mb-1 text-neutral-500">{fDate(n.date)}</div>
                {n.content}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Filterleiste (Suche/Sortierung) */}
      <section className="px-6 md:px-12 pt-6">
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
              A–Z
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

      {/* Inhalt: Sidebar + Liste */}
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

            <h3 className="text-lg font-semibold mb-4">Filtern nach Kategorie</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="kat"
                  checked={selectedKat === "Alle"}
                  onChange={() => setSelectedKat("Alle")}
                />
                <span>Alle</span>
              </label>
              {KATEGORIEN.map((a) => (
                <label key={a} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="kat"
                    checked={selectedKat === a}
                    onChange={() => setSelectedKat(a)}
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
                  {fDate(item.date)} · {item.kategorie} ·{" "}
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

      {/* FAQ – Recht */}
      <section className="px-6 md:px-12 pb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Häufige Fragen zum Thema Recht
        </h2>
        <div className="max-w-4xl">
          {[
            "Welche Rechtsform ist für meine Stiftung am besten geeignet?",
            "Wie erstelle ich die Satzung meiner Stiftung?",
            "Welche Anforderungen gibt es bei der Anerkennung?",
            "Kann ich als Stifter weiterhin Einfluss nehmen?",
            "Welche Haftungsrisiken bestehen für Vorstand/Stifter:innen?",
          ].map((q, i) => (
            <details key={i} className="border-2 border-black p-4 group open:bg-neutral-50 mb-3">
              <summary className="cursor-pointer font-medium text-lg">
                {q}
              </summary>
              <div className="text-neutral-700 mt-2">
                Kompakte Orientierung: rechtlicher Rahmen, typische Stolpersteine und
                praktische Hinweise. (Hier deine Inhalte/Links einfügen.)
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* FAQ – Steuer */}
      <section className="px-6 md:px-12 pb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Häufige Fragen zur Steuer
        </h2>
        <div className="max-w-4xl">
          {[
            "Welche steuerlichen Vorteile habe ich bei einer Stiftung?",
            "Wie wirkt sich Vermögensübertragung auf die Stiftung steuerlich aus?",
            "Buchführung & Berichte: Was ist zu beachten?",
            "Welche Rolle spielt die Stiftungsaufsicht?",
          ].map((q, i) => (
            <details key={`tax-${i}`} className="border-2 border-black p-4 group open:bg-neutral-50 mb-3">
              <summary className="cursor-pointer font-medium text-lg">
                {q}
              </summary>
              <div className="text-neutral-700 mt-2">
                Kurz erklärt: steuerliche Rahmenbedingungen, Nachweispflichten und
                Best Practices. (Hier deine Inhalte/Downloads verlinken.)
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Kontakt-CTA */}
      <section className="px-6 md:px-12 pb-16">
        <div className="text-center text-neutral-700">
          <span className="font-medium">Sie haben Fragen?</span> Wir sind jederzeit für Sie da.
        </div>
        <div className="mt-6 max-w-3xl mx-auto border-[3px] border-black p-6 text-center">
          <div className="text-lg">Kontakt</div>
          <div className="mt-2 text-neutral-700">
            Musterstraße 1, 66119 Saarbrücken ·{" "}
            <a href="mailto:info@stiftungsforumsaar.de" className="underline">
              info@stiftungsforumsaar.de
            </a>{" "}
            · 0681 / 123 45 67
          </div>
          <div className="mt-4">
            <Link
              href="/termine"
              className="inline-block px-5 py-3 border-2 border-black hover:bg-black hover:text-white"
            >
              Zu den Terminen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
