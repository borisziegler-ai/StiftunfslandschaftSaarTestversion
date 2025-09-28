import Link from "next/link";

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

      {/* Infos zum 7. Stiftungstag */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">7. Stiftungstag Saar 2024</h2>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Der 7. Stiftungstag Saar im Jahr 2024 brachte zahlreiche Akteure aus
          Bildung, Kultur, Nachhaltigkeit und sozialem Engagement zusammen.
          Im Mittelpunkt standen Vorträge, Diskussionen und Austauschmöglichkeiten
          zwischen Bürger:innen und Stiftungen.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          Neben den Vorträgen stand der Austausch zwischen Bürger:innen und
          Stiftungen im Mittelpunkt. Zahlreiche Initiativen konnten ihre Arbeit
          vorstellen und neue Kooperationen anstoßen.
        </p>
      </section>

      {/* Ausblick auf den 8. Stiftungstag */}
      <section className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">Ausblick: 8. Stiftungstag Saar 2025</h2>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Der 8. Stiftungstag Saar ist bereits in Planung. Auch 2025 wird der Tag
          wieder zahlreiche spannende Vorträge, Workshops und Austauschformate bieten.
          Weitere Informationen zum Programm folgen in Kürze.
        </p>
      </section>
    </main>
  );
}
