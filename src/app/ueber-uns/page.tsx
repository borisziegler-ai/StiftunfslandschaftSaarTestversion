"use client";

import Link from "next/link";

export default function UeberUnsPage() {
  return (
    <main className="bg-white text-black min-h-screen px-6 md:px-12 py-16">
      {/* Zurück-Link */}
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zur Hauptseite
        </Link>
      </div>

      {/* Titel */}
      <h1 className="text-5xl md:text-6xl font-bold mb-10">Über uns</h1>

      {/* Einleitung */}
      <section className="max-w-3xl mx-auto mb-16">
        <p className="text-neutral-700 leading-relaxed mb-6">
          Das <span className="font-semibold">StiftungsForumSaar</span> hat sich
          im Jahr 2011 gegründet, um die saarländische Stiftungslandschaft zu
          beleben und die Vernetzung der Stiftungen in der Region zu fördern.
        </p>
        <p className="text-neutral-700 leading-relaxed mb-6">
          Seither ist viel Engagement sichtbar geworden – und nun ist es
          gelungen: mit diesem gemeinsamen digitalen Auftritt wurde die Vielfalt
          der saarländischen Stiftungen endlich gebündelt und für alle
          zugänglich gemacht.
        </p>
      </section>

      {/* Initiativen */}
      <section className="max-w-3xl mx-auto mb-16">
        <p className="text-neutral-700 leading-relaxed mb-6">
          Die <span className="font-semibold">Stiftung ME Saar</span>, die{" "}
          <span className="font-semibold">SHS Foundation</span>, die{" "}
          <span className="font-semibold">ASKO EUROPA STIFTUNG</span> und die{" "}
          <span className="font-semibold">Stiftung Bürgerengagement Saar</span>{" "}
          haben gemeinsam mit drei regionalen Kreditinstituten (bis 2023 SaarLB,
          seither Frankfurter Bankgesellschaft, Sparkasse Saarbrücken und
          Bank1Saar) vielfältige Initiativen entwickelt.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          Seit 2011 hat das Stiftungsforum alle zwei Jahre den{" "}
          <span className="font-semibold">saarländischen Stiftungstag</span>{" "}
          veranstaltet.
        </p>
      </section>

      {/* Foto-Platzhalter */}
      <section className="max-w-4xl mx-auto mb-20">
        <div className="relative border-2 border-dashed border-neutral-400 bg-neutral-50 h-64 flex items-center justify-center text-neutral-500">
          Foto-Platzhalter
        </div>
      </section>

      {/* Kooperation */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">In Kooperation</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="h-20 border border-neutral-300 flex items-center justify-center text-sm text-neutral-500">
            Logo Stiftung
          </div>
          <div className="h-20 border border-neutral-300 flex items-center justify-center text-sm text-neutral-500">
            Logo Stiftung
          </div>
          <div className="h-20 border border-neutral-300 flex items-center justify-center text-sm text-neutral-500">
            Logo Bank
          </div>
          <div className="h-20 border border-neutral-300 flex items-center justify-center text-sm text-neutral-500">
            Logo Ministerium
          </div>
        </div>
      </section>
    </main>
  );
}
