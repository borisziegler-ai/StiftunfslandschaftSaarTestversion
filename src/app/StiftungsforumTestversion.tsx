"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

// Trennlinie
function Divider({ thick = 3 }: { thick?: number }) {
  return <div aria-hidden style={{ height: thick, background: "#000", width: "100%" }} />;
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const categories = [
    "BILDUNG",
    "KULTUR",
    "UMWELT",
    "SOZIALES",
    "JUGEND",
    "SPORT",
    "FORSCHUNG",
    "FAMILIE",
    "POLITIK",
    "SAARLAND",
  ];

  return (
    <main className="bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white border-b-[3px] border-black">
        <div className="w-[112px] h-[32px] border border-black" />

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <Link href="/verzeichnis" className="hover:text-neutral-500">Verzeichnis</Link>
          <Link href="/termine" className="hover:text-neutral-500">Termine</Link>
          <Link href="/stiftungstag" className="hover:text-neutral-500">Stiftungstag</Link>
          <Link href="#austausch" className="hover:text-neutral-500">Austausch</Link>

          {/* Stiftungsrecht mit Untermenü */}
          <div className="relative group">
            <Link
              href="/rechtliches"
              className="hover:text-neutral-500 inline-block"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Stiftungsrecht
            </Link>

            {/* Dropdown */}
            <div
              className="absolute left-0 mt-2 hidden group-hover:block group-focus-within:block bg-white border border-black"
              role="menu"
              aria-label="Untermenü Stiftungsrecht"
            >
              <Link
                href="/rechtliches"
                className="block px-4 py-2 hover:bg-black hover:text-white whitespace-nowrap"
                role="menuitem"
              >
                Stiftungsrecht (Übersicht)
              </Link>
              {/* Entfernt: Stiftung gründen */}
            </div>
          </div>

          {/* Entfernt: <Link href="/stiftung-gruenden">Stiftung gründen</Link> */}
          <Link href="#kontakt" className="hover:text-neutral-500">Kontakt</Link>
        </nav>
      </header>

      {/* SPACER */}
      <div className="h-20" />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-end md:items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="95 85 3000 3000"
            className="w-[1800px] h-[1800px] md:w-[2600px] md:h-[2600px]"
            fill="white"
            stroke="black"
            strokeWidth="30"
          />
        </div>

        <motion.div style={{ scale: scaleHero }} className="absolute inset-0" />
        <div className="relative w-full px-6 md:px-12">
          <motion.h1
            style={{ y: yHero }}
            className="leading-[0.95] font-extrabold text-[12vw] md:text-[9vw] tracking-tight text-left"
          >
            Saarländische<br />Stiftungen
          </motion.h1>
          <div className="mt-6 md:mt-10 max-w-2xl text-neutral-700 text-base md:text-lg">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen.
            Zugang für die Bürger. Gemeinsam geht mehr.
          </div>
          <div className="mt-8 flex gap-4">
            <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-6">
              Mehr erfahren
            </Button>
            <Button variant="outline" className="border border-black text-black hover:bg-black hover:text-white rounded-none px-6">
              Kontakt
            </Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* ÜBER UNS KURZ */}
      <section id="about" className="grid md:grid-cols-2 min-h-[80vh]">
        <div className="flex items-center px-6 md:px-12 py-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold leading-[1.05]">
              Wir machen <span className="underline">Engagement</span> sichtbar.
            </h2>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Seit 2011 vernetzt das StiftungsForumSaar die saarländische Stiftungslandschaft,
              bündelt Wissen und öffnet Türen: für Projekte, Kooperationen und Akteure, die mitgestalten wollen.
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center border-l-[3px] border-black">
          <div className="flex items-center justify-center text-neutral-500 w-3/4 h-3/4 border-[3px] border-black">
            Visual Placeholder
          </div>
        </div>
      </section>

      <Divider />

      {/* MARQUEE */}
      <section className="relative bg-white overflow-hidden">
        <div className="whitespace-nowrap py-6 text-neutral-800">
          <div className="animate-[marquee_24s_linear_infinite] flex">
            {[...categories, ...categories].map((cat, i) => (
              <span key={i} className="mx-10">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* VERZEICHNIS */}
      <section id="verzeichnis" className="grid md:grid-cols-12 min-h-[70vh]">
        <div className="md:col-span-7 flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">
              Alle Stiftungen auf einen Blick.
            </h3>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Alphabetisch und thematisch filterbar – schnell auffindbar nach Bereichen wie Bildung,
              Kultur, Soziales, Umwelt und mehr. Klein oder groß: jede Stiftung ist sichtbar.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/verzeichnis" className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black">
                Zum Verzeichnis
              </Link>
              <Link href="#stiftungstag" className="px-6 py-3 border border-black hover:bg-black hover:text-white">
                Stiftungstag
              </Link>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative flex items-center justify-center border-l-[3px] border-black">
          <div className="w-3/4 h-3/4 border-[3px] border-black" />
        </div>
      </section>

      <Divider />

      {/* STIFTUNGSTAG */}
      <section id="stiftungstag" className="relative h-[90vh] flex items-center">
        <div className="relative px-6 md:px-12">
          <h3 className="text-6xl md:text-7xl font-extrabold leading-[0.95]">
            Stiftungstag <span className="underline">Saar</span>
          </h3>
          <p className="mt-6 max-w-2xl text-neutral-700 text-lg">
            Termine, Inhalte, Archiv. Klar strukturiert, barrierefrei, mobil erstklassig.
            Die Bühne für Austausch und Impulse.
          </p>
          <div className="mt-8">
            <Link
              href="/stiftungstag"
              className="inline-block rounded-none border border-black bg-black text-white hover:bg-white hover:text-black px-6 py-3"
            >
              Programm ansehen
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* STIFTUNGSRECHT */}
      <section className="grid md:grid-cols-2 min-h-[70vh]">
        <div className="flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">Stiftungsrecht</h3>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Tipps, Muster & Updates: von der Satzung bis zu Gesetzesänderungen – kompakt für die Praxis.
            </p>
            <div className="mt-8">
              <Link
                href="/rechtliches"
                className="inline-block px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black"
              >
                Mehr erfahren
              </Link>
              {/* Entfernt: separater Link „Stiftung gründen“ */}
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center border-l-[3px] border-black">
          <div className="w-3/4 h-3/4 border-[3px] border-black" />
        </div>
      </section>

      <Divider />

      {/* AUSTAUSCH + STIFTUNGSFORUM */}
      <section id="austausch" className="px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Austausch & Vernetzung */}
          <div className="border-[3px] border-black p-6">
            <h4 className="text-2xl md:text-3xl font-semibold">Austausch & Vernetzung</h4>
            <p className="mt-3 text-neutral-700">
              Ein moderierter, datenschutzkonformer Raum für Bottom-up-Themen.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="bg-black hover:bg-neutral-800 rounded-none text-white border border-black">
                Zur Plattform
              </Button>
              <Link
                href="/termine"
                className="inline-block px-5 py-3 border-2 border-black hover:bg-black hover:text-white"
              >
                Termine
              </Link>
            </div>
          </div>

          {/* StiftungsForum */}
          <div className="border-[3px] border-black p-6">
            <h4 className="text-2xl md:text-3xl font-semibold">StiftungsForum</h4>
            <p className="mt-3 text-neutral-700">
              Wer wir sind, wofür wir stehen und wie wir vernetzen.
            </p>
            <div className="mt-6">
              <Link
                href="/ueber-uns"
                className="inline-block px-5 py-3 border-2 border-black hover:bg-black hover:text-white"
              >
                Team & Geschichte
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Entfernt: kompletter Block „Stiftung gründen“ */}

      {/* KONTAKT */}
      <section className="px-6 md:px-12 py-10">
        <p className="text-center text-neutral-700">
          <span className="font-medium">Sie haben Fragen?</span> Wir sind jederzeit für Sie da.
        </p>
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
              href="#kontakt"
              className="inline-block px-5 py-3 border-2 border-black hover:bg-black hover:text-white"
            >
              Nachricht schreiben
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* FOOTER */}
      <footer id="kontakt" className="relative border-t-[3px] border-black">
        <div className="px-6 md:px-12 py-12 grid md:grid-cols-2 gap-6 items-end">
          <div>
            <div className="w-[112px] h-[32px] border border-black mb-4" />
            <p className="text-neutral-700 text-sm">© 2011 StiftungsForumSaar</p>
          </div>
          <div className="md:text-right text-neutral-700 text-sm space-x-4">
            <Link href="/rechtliches#impressum" className="underline">Impressum</Link>
            <Link href="/rechtliches#datenschutz" className="underline">Datenschutzerklärung</Link>
            <Link href="/rechtliches#nutzungsbedingungen" className="underline">Nutzungsbedingungen</Link>
            <Link href="/rechtliches#cookies" className="underline">Cookie-Einstellungen</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
