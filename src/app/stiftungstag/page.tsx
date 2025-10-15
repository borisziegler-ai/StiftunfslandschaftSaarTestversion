"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PanelItem = {
  name: string;
  beschreibung: string;
  link: string;
};

type ArchivItem = {
  jahr: string;
  thema: string;
  referent: string;
  stiftung?: string;
  link?: string;
};

type KontaktPerson = {
  name: string;
  rolle?: string;
  stiftung?: string;
  email?: string;
};

export default function StiftungstagPage() {
  // === Daten ===
  const panel: PanelItem[] = [
    {
      name: "Hans und Ruth Giessen-Stiftung",
      beschreibung:
        "Vorgestellt durch Wilhelm Burgemeister. Die Stiftung fördert besonders begabte junge Menschen in Naturwissenschaften, Medizin und klassischer Musik.",
      link: "https://www.hr-giessen-stiftung.de/stiftung",
    },
    {
      name: "Kinderkrebs Stiftung Saarpfalz",
      beschreibung:
        "Gegründet aus der Elterninitiative krebskranker Kinder im Saarland e. V. (2001). Aufgabe: Forschungsförderung im Bereich kindlicher & jugendlicher Krebserkrankungen.",
      link: "https://www.kinderkrebshilfe-saar.de/wir-ueber-uns/kinderkrebsstiftung-saar-pfalz/#:~:text=Die%20Elterninitiative%20krebskranker%20Kinder%20im,durch%20finanzielle%20Unterst%C3%BCtzung%20zu%20sichern.",
    },
    {
      name: "RuBI Stiftung – Hilfe für Kinder und Tiere in Not",
      beschreibung:
        "Stifter Claudia und Ulrich Bies. Regelmäßige Sachspenden und Unterstützung. GF Andrea Schaffner ist seit vielen Jahren schulnah aktiv.",
      link: "https://www.rubi-stiftung.de/",
    },
  ];

  const mehrStiftung = {
    name: "Stiftung ME Saar",
    beschreibung:
      "Stifter: Verband der Metall- und Elektroindustrie des Saarlandes (ME Saar). Seit 2001 Förderungen in Bildung, Wissenschaft & Forschung, Kunst und Kultur.",
    link: "https://stiftung-mesaar.de/stiftung-me-saar",
    kontakt: "Dr. Franz Folz (Mitglied des Kuratoriums)",
  };

  const archiv: ArchivItem[] = [
    {
      jahr: "2024",
      thema: "Erfolgreiches Fundraising für Stiftungen",
      referent: "Jörg Ultsch (Frankfurter Bankgesellschaft)",
    },
    {
      jahr: "2022",
      thema: "Wirkungsmessung in Stiftungen – von der Idee zum Indikator",
      referent: "Panel mit Praxisbeispielen",
    },
    {
      jahr: "2020",
      thema: "Kooperation statt Konkurrenz – regionale Allianzen",
      referent: "Impulse & Best Practices",
    },
  ];

  const ansprechpartner: KontaktPerson[] = [
    {
      name: "Wilhelm Burgemeister",
      rolle: "Ansprechpartner der Hans und Ruth Giessen-Stiftung",
    },
    { name: "Michael Schneider", rolle: "Vorsitzender, Kinderkrebs Stiftung Saarpfalz" },
    { name: "Andrea Schaffner", rolle: "GF, RuBI Stiftung (Kinder & Tiere in Not)" },
    { name: "Dr. Franz Folz", rolle: "Mitglied des Kuratoriums, Stiftung ME Saar" },
  ];

  const [q, setQ] = useState("");
  const filteredArchiv = useMemo(() => {
    if (!q.trim()) return archiv;
    const t = q.toLowerCase();
    return archiv.filter(
      (a) =>
        a.jahr.toLowerCase().includes(t) ||
        a.thema.toLowerCase().includes(t) ||
        a.referent.toLowerCase().includes(t)
    );
  }, [q]);

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

      {/* Rückblick 2024 */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">7. Stiftungstag Saar 2024</h2>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Der 7. Stiftungstag Saar im Jahr 2024 brachte zahlreiche Akteure aus Bildung, Kultur,
          Nachhaltigkeit und sozialem Engagement zusammen. Im Mittelpunkt standen Vorträge,
          Diskussionen und Austauschformate, die neue Kooperationen angestoßen haben.
        </p>

        {/* Download / Vortrag */}
        <div className="border-2 border-black p-5 mb-8">
          <h3 className="text-xl font-semibold">
            Vortrag: „Erfolgreiches Fundraising für Stiftungen“
          </h3>
          <p className="text-neutral-700 mt-2">
            Referent: <span className="font-medium">Jörg Ultsch</span> (Frankfurter Bankgesellschaft).
          </p>
          <div className="mt-4">
            {/* Ersetze # durch Download-/Video-Link */}
            <Link
              href="#"
              className="inline-block px-5 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black"
            >
              Vortrag öffnen / herunterladen
            </Link>
          </div>
        </div>

        {/* Panelstiftungen */}
        <h3 className="text-xl font-semibold mb-4">Panel: Vorgestellte Stiftungen</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {panel.map((p) => (
            <article key={p.name} className="border-2 border-black p-4">
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-neutral-700 text-sm mt-2">{p.beschreibung}</p>
              <div className="mt-3">
                <Link href={p.link} target="_blank" className="font-semibold hover:underline">
                  Mehr erfahren →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Weitere Stiftung */}
        <div className="border-2 border-black p-5 mt-6">
          <h3 className="text-xl font-semibold">{mehrStiftung.name}</h3>
          <p className="text-neutral-700 mt-2">{mehrStiftung.beschreibung}</p>
          <p className="text-neutral-700 mt-1">
            Kontakt: <span className="font-medium">{mehrStiftung.kontakt}</span>
          </p>
          <div className="mt-3">
            <Link href={mehrStiftung.link} target="_blank" className="font-semibold hover:underline">
              Zur Stiftungsseite →
            </Link>
          </div>
        </div>
      </section>

      {/* Archiv & Ansprechpersonen */}
      <section className="max-w-6xl mx-auto mb-16 grid lg:grid-cols-12 gap-8">
        {/* Archiv */}
        <div className="lg:col-span-7">
          <div className="flex items-end justify-between gap-4 mb-3">
            <h2 className="text-2xl font-semibold">Archiv: Themen & Vorträge</h2>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Suchen (Jahr, Thema, Referent:in)…"
              className="border-2 border-black px-3 py-2 w-64"
            />
          </div>

          <div className="space-y-3">
            {filteredArchiv.map((a, idx) => (
              <div key={`${a.jahr}-${idx}`} className="border-2 border-black p-4">
                <div className="text-sm text-neutral-600">{a.jahr}</div>
                <div className="font-semibold">{a.thema}</div>
                <div className="text-neutral-700">{a.referent}</div>
                {a.link && (
                  <div className="mt-2">
                    <Link href={a.link} className="font-semibold hover:underline">
                      Material / Details →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ansprechpersonen */}
        <div className="lg:col-span-5">
          <div className="border-2 border-black p-5">
            <h2 className="text-2xl font-semibold">Ansprechpersonen</h2>
            <ul className="mt-4 space-y-3">
              {ansprechpartner.map((k) => (
                <li key={k.name} className="border border-black/20 p-3">
                  <div className="font-medium">{k.name}</div>
                  {k.rolle && <div className="text-sm text-neutral-700">{k.rolle}</div>}
                  {k.email && (
                    <div className="text-sm">
                      <a href={`mailto:${k.email}`} className="underline">
                        {k.email}
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Link href="/verzeichnis" className="font-semibold hover:underline">
                Weitere Stiftungen im Verzeichnis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ausblick 2025 */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">Ausblick: 8. Stiftungstag Saar 2025</h2>
        <p className="text-neutral-700 leading-relaxed mb-4">
          Der 8. Stiftungstag Saar ist bereits in Planung. Auch 2025 wird der Tag wieder
          spannende Vorträge, Workshops und Austauschformate bieten. Weitere Informationen
          zum Programm folgen in Kürze.
        </p>
        <Link
          href="/termine"
          className="inline-block px-5 py-3 border-2 border-black hover:bg-black hover:text-white"
        >
          Nächste Termine ansehen
        </Link>
      </section>

      {/* Bilder – Masonry-Grid (Platzhalter) */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-4">Bildergalerie</h2>
        <p className="text-neutral-700 mb-6">
          Eindrücke vom Stiftungstag – hier folgt eine kuratierte Auswahl. (Platzhalter)
        </p>
        <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <div className="w-full h-48 border-2 border-black bg-neutral-50 flex items-center justify-center text-neutral-500">
                Foto-Platzhalter {i + 1}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/stiftungstag/bilder"
            className="inline-block px-6 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black"
          >
            Alle Bilder ansehen
          </Link>
        </div>
      </section>

      {/* Kontakt-CTA */}
      <section className="px-6 md:px-12 py-10">
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
              Termine & Programm
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
