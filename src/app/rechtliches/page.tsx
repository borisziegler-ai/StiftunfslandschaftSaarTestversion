"use client";

import { useState } from "react";
import Link from "next/link";

// Simulierte FAQ-Daten
const faqRecht = [
  {
    frage: "Wie gründet man eine Stiftung im Saarland?",
    antwort:
      "Eine Stiftung kann sowohl zu Lebzeiten als auch von Todes wegen gegründet werden. Sie benötigt eine Satzung, einen Stiftungszweck und ein Stiftungskapital. Die Anerkennung erfolgt über die Stiftungsaufsicht des Saarlandes.",
  },
  {
    frage: "Welche gesetzlichen Anforderungen gelten?",
    antwort:
      "Das saarländische Stiftungsgesetz orientiert sich am Bürgerlichen Gesetzbuch (§§ 80–88 BGB). Wichtig ist insbesondere die dauerhafte und nachhaltige Erfüllung des gemeinnützigen Zwecks.",
  },
];

const faqSteuer = [
  {
    frage: "Wann gilt eine Stiftung als gemeinnützig?",
    antwort:
      "Wenn ihr Zweck der Allgemeinheit dient – z. B. Bildung, Kultur oder Soziales – und die Satzung entsprechend nach der Abgabenordnung formuliert ist.",
  },
  {
    frage: "Welche steuerlichen Vorteile bestehen?",
    antwort:
      "Gemeinnützige Stiftungen sind in der Regel von der Körperschaft- und Gewerbesteuer befreit. Spenden an sie sind steuerlich abzugsfähig.",
  },
];

const kategorien = [
  "Alle",
  "Recht",
  "Steuer",
  "Gründung",
  "Pflichten",
  "Förderung",
];

export default function RechtlichesPage() {
  const [filter, setFilter] = useState("Alle");

  return (
    <main className="bg-white text-black min-h-screen px-6 md:px-12 py-16">
      {/* Zurück-Link */}
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zur Hauptseite
        </Link>
      </div>

      {/* Titel */}
      <h1 className="text-5xl md:text-6xl font-bold mb-10">
        Rechtliches & Stiftungsgründung
      </h1>

      {/* Einleitung */}
      <section className="max-w-3xl mx-auto mb-16">
        <p className="text-neutral-700 leading-relaxed mb-6">
          Hier finden Sie zentrale Informationen, häufige Fragen und praktische
          Hinweise rund um die Themen <strong>Stiftungsrecht</strong>,{" "}
          <strong>Steuer</strong> und <strong>Gründung</strong>.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          Unsere Sammlung wird laufend ergänzt und spiegelt aktuelle
          Entwicklungen und Gesetzesänderungen im Stiftungswesen wider.
        </p>
      </section>

      {/* Filter */}
      <section className="max-w-4xl mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="font-semibold text-sm uppercase tracking-wide mb-2 text-neutral-600">
            Filtern nach Kategorie:
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {kategorien.map((kat) => (
            <button
              key={kat}
              onClick={() => setFilter(kat)}
              className={`px-4 py-2 border-2 ${
                filter === kat
                  ? "bg-black text-white border-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Recht */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Häufige Fragen zum Thema Recht
        </h2>
        <div className="space-y-4">
          {faqRecht.map((item, i) => (
            <details
              key={i}
              className="border-2 border-black p-4 group open:bg-neutral-50"
            >
              <summary className="cursor-pointer font-semibold text-lg group-open:mb-2">
                {item.frage}
              </summary>
              <p className="text-neutral-700">{item.antwort}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FAQ Steuer */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Häufige Fragen zur Steuer
        </h2>
        <div className="space-y-4">
          {faqSteuer.map((item, i) => (
            <details
              key={i}
              className="border-2 border-black p-4 group open:bg-neutral-50"
            >
              <summary className="cursor-pointer font-semibold text-lg group-open:mb-2">
                {item.frage}
              </summary>
              <p className="text-neutral-700">{item.antwort}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Praxis-Tipps / Platzhalter */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">Praxis-Tipps & Downloads</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-black p-6 text-center">
            <p className="font-semibold mb-2">Mustersatzung</p>
            <p className="text-sm text-neutral-600 mb-4">
              Vorlage für die Gründung einer gemeinnützigen Stiftung.
            </p>
            <a
              href="#"
              className="inline-block px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black"
            >
              Download
            </a>
          </div>
          <div className="border-2 border-black p-6 text-center">
            <p className="font-semibold mb-2">Checkliste Gründung</p>
            <p className="text-sm text-neutral-600 mb-4">
              Von der Satzung bis zur Anerkennung – alle Schritte im Überblick.
            </p>
            <a
              href="#"
              className="inline-block px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black"
            >
              Download
            </a>
          </div>
        </div>
      </section>

      {/* Kontaktbereich */}
      <section className="px-6 md:px-12 py-10">
        <div className="text-center text-neutral-700">
          <span className="font-medium">Sie haben Fragen?</span> Wir sind
          jederzeit für Sie da.
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
