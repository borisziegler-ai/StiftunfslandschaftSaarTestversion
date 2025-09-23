"use client";

import Link from "next/link";

export default function StiftungstagPage() {
  const bilder = Array.from({ length: 8 }, (_, i) => `/images/stiftungstag${i + 1}.jpg`);

  const vortraege = [
    {
      speaker: "Tina Raubenheimer",
      stiftung: "Stiftung Bildung",
      thema: "Zukunft der Schulen im Saarland",
      link: "/stiftungstag/vortraege/tina-raubenheimer",
    },
    {
      speaker: "Prof. Markus Schneider",
      stiftung: "Kulturstiftung Saar",
      thema: "Kunst als Brücke zwischen Generationen",
      link: "/stiftungstag/vortraege/markus-schneider",
    },
    {
      speaker: "Sabine Weber",
      stiftung: "Umweltstiftung",
      thema: "Nachhaltige Projekte für eine grüne Zukunft",
      link: "/stiftungstag/vortraege/sabine-weber",
    },
  ];

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

      {/* YouTube Video */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full border-2 border-black"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="Stiftungstag Saar Rückblick"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Rückblick & Vorträge */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">Rückblick Stiftungstag 2025</h2>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Der Stiftungstag Saar 2025 brachte zahlreiche Akteure zusammen.
          In spannenden Vorträgen und Diskussionen wurden Themen rund um Bildung,
          Nachhaltigkeit, Kultur und soziales Engagement beleuchtet.
        </p>

        <h3 className="text-xl font-semibold mb-4">Vorträge</h3>
        <ul className="space-y-4 mb-6">
          {vortraege.map((v, i) => (
            <li key={i} className="border-b border-neutral-300 pb-4">
              <p className="text-neutral-800">
                <span className="font-medium">{v.speaker}</span>, {v.stiftung} – „{v.thema}“
              </p>
              <Link
                href={v.link}
                className="text-sm text-black font-semibold hover:underline"
              >
                Mehr Details →
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-neutral-700 leading-relaxed">
          Neben den Vorträgen stand der Austausch zwischen Bürger:innen und Stiftungen im Mittelpunkt.
          Zahlreiche Initiativen konnten ihre Arbeit vorstellen und neue Kooperationen anstoßen.
        </p>
      </section>

      {/* Endlos-Slider mit Kästen */}
      <section className="relative overflow-hidden border-y-2 border-black py-6 mb-6">
        <div className="marquee__track">
          {/* Set A */}
          {bilder.map((src, i) => (
            <div
              key={`a-${i}`}
              className="flex-none mx-6 h-48 w-32 border-2 border-black bg-neutral-100 flex items-center justify-center text-xs text-neutral-500"
            >
              Bild {i + 1}
              <img src={src} alt={`Stiftungstag Bild ${i + 1}`} className="hidden" />
            </div>
          ))}
          {/* Set B */}
          {bilder.map((src, i) => (
            <div
              key={`b-${i}`}
              className="flex-none mx-6 h-48 w-32 border-2 border-black bg-neutral-100 flex items-center justify-center text-xs text-neutral-500"
            >
              Bild {i + 1}
              <img src={src} alt="" className="hidden" />
            </div>
          ))}
        </div>
      </section>

      {/* Button unter den Bildern */}
      <div className="text-center mb-16">
        <Link
          href="/stiftungstag/bilder"
          className="px-6 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black inline-block"
        >
          Alle Bilder ansehen
        </Link>
      </div>

      {/* Styles */}
      <style jsx global>{`
        .marquee__track {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}
