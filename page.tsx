import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Konpo-like Layout: Fullscreen Sections, Giant Type, High Contrast, Minimal UI
 * - Full-bleed sections
 * - Split screens mit Bild/Fläche
 * - Scroll-basierte Motion
 * - Schwarz/Weiß + Rot als Akzent
 */

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <main className="bg-black text-white selection:bg-red-600 selection:text-white">
      {/* Header (ultra-minimal) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference">
        <div className="w-28 h-8 bg-white" />
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <a className="hover:text-red-500" href="#about">Über uns</a>
          <a className="hover:text-red-500" href="#verzeichnis">Verzeichnis</a>
          <a className="hover:text-red-500" href="#stiftungstag">Stiftungstag</a>
          <a className="hover:text-red-500" href="#austausch">Austausch</a>
          <a className="hover:text-red-500" href="#kontakt">Kontakt</a>
        </nav>
      </header>

      {/* HERO: Giant, editorial, konpo-like */}
      <section ref={heroRef} className="relative h-screen flex items-end md:items-center">
        {/* Background block */}
        <motion.div style={{ scale: scaleHero }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-black" />
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(180deg,rgba(255,0,0,0.25),transparent)]" />
        </motion.div>
        <div className="relative w-full px-6 md:px-12">
          <motion.h1 style={{ y: yHero }} className="leading-[0.95] font-extrabold text-[12vw] md:text-[9vw] tracking-tight">
            Stiftungs<br/>Forum<br/>Saar
          </motion.h1>
          <div className="mt-6 md:mt-10 max-w-2xl text-neutral-300 text-base md:text-lg">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen. Zugang für die Bürger. Entlastung für die Politik.
          </div>
          <div className="mt-8 flex gap-4">
            <Button className="bg-white text-black hover:bg-red-600 hover:text-white rounded-full px-6">Mehr erfahren</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-full px-6">Kontakt</Button>
          </div>
        </div>
      </section>

      {/* Split Section: Statement (Über uns) */}
      <section id="about" className="relative min-h-[80vh] grid md:grid-cols-2">
        {/* Left: big statement */}
        <div className="flex items-center px-6 md:px-12 py-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold leading-[1.05]">
              Wir machen <span className="text-red-500">Engagement</span> sichtbar.
            </h2>
            <p className="mt-6 text-neutral-300 max-w-xl text-lg">
              Seit 2011 vernetzt das StiftungsForumSaar die saarländische Stiftungslandschaft, bündelt Wissen und öffnet Türen: für Projekte, Kooperationen und junge Menschen, die mitgestalten wollen.
            </p>
          </div>
        </div>
        {/* Right: visual block (image placeholder) */}
        <div className="relative">
          <div className="absolute inset-0 bg-neutral-900" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_20%,rgba(255,0,0,0.25),transparent)]" />
          <div className="absolute bottom-10 left-10 text-neutral-500 text-xs uppercase tracking-widest">Visual Placeholder</div>
        </div>
      </section>

      {/* Full-bleed marquee / impact numbers */}
      <section className="border-y border-neutral-800 bg-black">
        <div className="overflow-hidden whitespace-nowrap py-6 text-neutral-400">
          <div className="animate-[marquee_24s_linear_infinite] will-change-transform">
            <span className="mx-10">Bildung</span>
            <span className="mx-10">Kultur</span>
            <span className="mx-10">Umwelt</span>
            <span className="mx-10">Soziales</span>
            <span className="mx-10">Jugend</span>
            <span className="mx-10">Sport</span>
            <span className="mx-10">Forschung</span>
            <span className="mx-10">Familie</span>
            <span className="mx-10">Politik</span>
            <span className="mx-10">— Saarland</span>
          </div>
        </div>
      </section>

      {/* Verzeichnis Intro (no cards here; editorial link to directory) */}
      <section id="verzeichnis" className="min-h-[70vh] grid md:grid-cols-12">
        <div className="md:col-span-7 flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">Alle Stiftungen auf einen Blick.</h3>
            <p className="mt-6 text-neutral-300 max-w-xl text-lg">
              Alphabetisch und thematisch filterbar – schnell auffindbar nach Bereichen wie Bildung, Kultur, Soziales, Umwelt und mehr. Klein oder groß: jede Stiftung ist sichtbar.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#directory" className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700">Zum Verzeichnis</a>
              <a href="#stiftungstag" className="px-6 py-3 rounded-full border border-white hover:bg-white hover:text-black">Stiftungstag</a>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_70%_40%,rgba(255,0,0,0.15),transparent)]" />
          <div className="absolute right-8 top-8 h-24 w-24 border border-neutral-700" />
          <div className="absolute right-24 top-40 h-12 w-64 border border-neutral-700" />
          <div className="absolute right-14 top-60 h-40 w-40 border border-neutral-700" />
        </div>
      </section>

      {/* Stiftungstag: Fullscreen text block */}
      <section id="stiftungstag" className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
        <div className="relative px-6 md:px-12">
          <h3 className="text-6xl md:text-7xl font-extrabold leading-[0.95]">
            Stiftungstag <span className="text-red-500">Saar</span>
          </h3>
          <p className="mt-6 max-w-2xl text-neutral-300 text-lg">
            Termine, Inhalte, Archiv. Konzentriert auf einer Seite. Klar strukturiert, barrierefrei, mobil erstklassig. Die Bühne für Austausch und Impulse.
          </p>
          <div className="mt-8">
            <Button className="rounded-full bg-white text-black hover:bg-red-600 hover:text-white">Programm ansehen</Button>
          </div>
        </div>
      </section>

      {/* Austausch: stark reduziert, mit CTA */}
      <section id="austausch" className="relative min-h-[70vh] grid md:grid-cols-2 border-t border-neutral-900">
        <div className="flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">Austausch & Vernetzung</h3>
            <p className="mt-6 text-neutral-300 max-w-xl text-lg">
              Ein moderierter, datenschutzkonformer Raum für Bottom-up-Themen. Alternativ: dedizierte LinkedIn-Gruppen – sichtbar integriert und leicht zugänglich.
            </p>
            <div className="mt-8 flex gap-4">
              <Button className="bg-red-600 hover:bg-red-700 rounded-full">Zur Plattform</Button>
              <Button variant="outline" className="rounded-full border-white hover:bg-white hover:text-black">LinkedIn-Gruppen</Button>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-neutral-900" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_60%_60%,rgba(255,0,0,0.18),transparent)]" />
        </div>
      </section>

      {/* Footer minimal */}
      <footer id="kontakt" className="border-t border-neutral-900">
        <div className="px-6 md:px-12 py-12 grid md:grid-cols-2 items-end">
          <div>
            <div className="w-28 h-8 bg-white mb-4" />
            <p className="text-neutral-400 text-sm">© 2025 StiftungsForumSaar</p>
          </div>
          <div className="md:text-right text-neutral-400 text-sm">
            Musterstraße 1, 66111 Saarbrücken · info@stiftungsforumsaar.de
          </div>
        </div>
      </footer>

      {/* Keyframes for marquee */}
      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </main>
  );
}

/** Directory Page (separate) – weiterhin minimalistisch, aber eigenständige Seite */
export function DirectoryPage() {
  return (
    <section className="bg-black text-white min-h-screen">
      <div className="px-6 md:px-12 pt-36 pb-16">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-[0.95]">Verzeichnis</h1>
        <p className="mt-6 text-neutral-300 max-w-2xl">Alphabetisch und nach Themen filterbar. Schnell und barrierefrei zugänglich – damit alle Stiftungen gefunden werden.</p>
      </div>
      <div className="px-6 md:px-12 pb-24 grid md:grid-cols-3 gap-12">
        {[...Array(9)].map((_, i) => (
          <Card key={i} className="bg-neutral-900 border border-neutral-800 hover:border-red-600 transition-colors">
            <CardContent className="p-8">
              <div className="text-sm text-neutral-500 mb-2">Stiftung</div>
              <h3 className="text-2xl font-semibold">Beispiel {i + 1}</h3>
              <p className="mt-3 text-neutral-400 text-sm">Kurzbeschreibung. Zweck, Wirkung, Kontakt.</p>
              <a href="#" className="mt-4 inline-block text-red-500 hover:underline">Details</a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
