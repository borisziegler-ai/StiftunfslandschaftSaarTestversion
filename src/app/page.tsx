"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Sichtbare, von Tailwind unabhängige Trennlinie
function Divider({ thick = 3 }: { thick?: number }) {
  return (
    <div
      aria-hidden
      style={{ height: thick, background: "#000", width: "100%" }}
    />
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <main className="bg-white text-black selection:bg-black selection:text-white">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white"
        style={{ borderBottom: "3px solid #000" }}
      >
        <div style={{ width: 112, height: 32, border: "1px solid #000" }} />
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
          <a className="hover:text-neutral-500" href="#about">Über uns</a>
          <a className="hover:text-neutral-500" href="#verzeichnis">Verzeichnis</a>
          <a className="hover:text-neutral-500" href="#stiftungstag">Stiftungstag</a>
          <a className="hover:text-neutral-500" href="#austausch">Austausch</a>
          <a className="hover:text-neutral-500" href="#kontakt">Kontakt</a>
        </nav>
      </header>

      {/* Spacer unter Header */}
      <div style={{ height: 80 }} />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-end md:items-center">
        {/* Hintergrund-Wappen */}
        <div className="absolute top-0 left-0 opacity-10 pointer-events-none select-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="95 85 3000 3000"
            width="10000"
            height="10000"
            fill="white"
            stroke="black"
            strokeWidth="30"
          >
            {<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="300.000000pt" height="300.000000pt" viewBox="0 0 300.000000 300.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.10, written by Peter Selinger 2001-2011
</metadata>
<g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M1626 2329 c-21 -16 -36 -20 -63 -16 -67 11 -96 -25 -63 -78 23 -37
25 -36 -47 -50 -18 -4 -40 -16 -48 -28 -13 -19 -18 -20 -48 -9 -18 7 -44 12
-58 12 -82 0 -95 -99 -17 -130 18 -7 42 -21 53 -31 11 -10 46 -25 78 -33 96
-25 123 -86 38 -86 -48 1 -146 43 -276 121 -124 74 -140 95 -132 176 4 41 2
57 -11 72 -19 22 -48 28 -75 16 -12 -5 -25 -1 -41 14 -30 28 -57 26 -88 -6
-33 -36 -47 -65 -44 -89 2 -12 -4 -21 -17 -24 -11 -3 -29 -17 -40 -32 -26 -34
-13 -75 33 -106 19 -12 40 -36 46 -52 14 -33 74 -56 104 -40 15 8 25 0 56 -38
74 -90 156 -170 189 -186 19 -9 37 -21 41 -27 8 -14 -79 -104 -133 -135 -61
-36 -112 -34 -162 6 -46 35 -71 34 -97 -6 -16 -23 -15 -48 1 -86 5 -13 0 -20
-19 -28 -15 -5 -31 -22 -37 -36 -8 -22 -6 -31 12 -50 11 -12 32 -25 45 -28 19
-5 23 -11 19 -29 -7 -28 19 -54 61 -63 24 -4 37 0 63 22 24 20 43 27 66 26 31
-2 52 10 72 41 7 11 270 147 283 147 3 0 24 -17 47 -39 23 -21 62 -48 87 -60
25 -11 46 -23 46 -26 0 -6 -96 1 -158 11 -60 9 -138 -14 -177 -53 -19 -19 -36
-38 -36 -42 -8 -40 -2 -53 47 -101 70 -68 71 -93 8 -149 -47 -41 -118 -81
-145 -81 -9 0 -28 13 -44 30 -49 52 -137 30 -137 -33 -1 -26 -2 -27 -41 -20
-48 7 -67 -11 -67 -65 0 -28 8 -43 41 -73 24 -22 36 -40 30 -44 -18 -11 -12
-40 12 -62 35 -33 78 -37 119 -14 29 18 39 19 66 9 41 -16 77 3 94 47 11 31
14 33 73 38 142 11 345 152 345 239 0 14 -13 37 -30 53 -16 16 -30 35 -30 42
0 28 48 45 137 46 l87 2 8 -44 c11 -66 46 -96 123 -107 83 -12 94 -25 75 -94
-14 -50 -31 -58 -66 -31 -30 24 -76 28 -93 8 -6 -8 -12 -29 -14 -47 -3 -23
-11 -37 -26 -44 -43 -19 -37 -89 11 -120 19 -12 31 -13 64 -4 37 10 44 9 69
-10 37 -29 68 -28 102 6 15 15 41 35 56 45 16 10 35 33 42 50 7 18 27 45 44
62 17 16 36 47 42 70 17 62 14 186 -5 223 -15 30 -20 32 -69 32 -58 0 -69 5
-86 37 -33 63 -2 114 88 147 118 42 171 163 127 291 -8 22 -17 53 -21 69 -3
17 -16 43 -27 59 l-20 28 25 27 c32 35 40 63 40 141 -1 67 -12 88 -50 94 -36
5 -38 15 -8 44 25 25 27 32 21 78 -4 27 -8 64 -10 80 -3 40 -23 75 -42 75 -8
0 -36 -11 -62 -24 -26 -13 -58 -27 -72 -31 -14 -4 -39 -21 -57 -38 l-32 -30
-35 29 c-26 21 -34 35 -30 49 17 60 -9 90 -68 80 -29 -5 -44 -2 -67 14 -37 27
-61 26 -95 0z m66 -28 c-2 -15 0 -21 8 -16 6 4 18 4 27 1 14 -6 14 -8 -1 -25
-14 -15 -15 -19 -3 -24 17 -6 37 11 37 31 0 9 7 13 20 9 11 -3 23 -1 26 4 8
13 34 11 34 -3 0 -7 -16 -26 -35 -41 -19 -15 -35 -32 -35 -36 0 -5 20 -12 44
-15 24 -4 50 -13 56 -21 17 -21 8 -50 -17 -53 -21 -3 -42 -32 -23 -32 19 0 50
-40 50 -65 0 -22 -3 -25 -24 -19 -33 8 -41 -11 -21 -53 22 -45 16 -162 -11
-219 -18 -37 -18 -37 -32 -16 -20 30 -46 29 -38 -1 3 -13 0 -32 -8 -42 -13
-18 -14 -18 -41 4 -25 19 -31 20 -43 8 -12 -13 -12 -19 2 -44 22 -43 122 -133
217 -194 52 -34 86 -64 94 -81 l11 -28 34 22 c72 49 62 133 -28 238 -62 73
-87 123 -97 192 -8 52 13 138 44 177 15 20 17 30 9 60 -12 43 -5 104 16 136 9
14 40 33 75 45 33 12 69 31 81 42 18 17 24 18 31 7 13 -20 11 -35 -6 -49 -13
-11 -12 -15 5 -37 21 -27 27 -87 9 -98 -18 -12 -63 14 -87 50 -25 39 -37 43
-64 18 -13 -12 -18 -31 -18 -71 0 -48 2 -53 18 -47 49 22 71 18 108 -19 36
-36 58 -44 69 -26 11 17 25 11 25 -10 0 -11 -7 -23 -15 -26 -11 -5 -12 -11 -5
-24 21 -40 -4 -151 -30 -135 -21 13 -44 73 -49 130 -5 50 -10 61 -30 71 -31
16 -65 3 -69 -25 -3 -16 3 -24 17 -28 15 -4 21 -13 21 -35 0 -49 77 -182 111
-193 13 -5 19 -16 19 -38 1 -18 9 -50 20 -72 37 -77 15 -189 -46 -232 -16 -11
-51 -28 -78 -37 -26 -9 -56 -21 -66 -26 -46 -25 -48 -153 -3 -198 20 -20 31
-24 66 -19 23 2 50 8 59 12 14 5 18 -3 23 -50 19 -149 -20 -262 -85 -248 -34
6 -42 -15 -15 -37 19 -16 19 -25 -1 -44 -25 -26 -44 -20 -44 14 0 20 -5 30
-15 30 -8 0 -15 -6 -16 -12 0 -7 -1 -33 -2 -58 -2 -45 -2 -45 -41 -48 -34 -3
-38 -1 -32 15 14 34 19 73 10 73 -5 0 -29 -14 -54 -30 -60 -40 -96 -40 -105 0
-4 16 -5 33 -3 36 2 4 25 7 52 8 59 1 70 18 27 41 -39 20 -41 50 -5 59 15 4
27 6 28 4 29 -67 54 -82 88 -51 46 40 61 128 33 183 -15 29 -19 30 -81 30 -57
0 -68 3 -91 26 -24 24 -25 30 -19 86 l6 60 -28 -6 c-15 -3 -72 -10 -127 -16
-122 -13 -150 -29 -150 -85 0 -32 5 -40 33 -56 47 -24 46 -23 16 -68 -45 -69
-181 -154 -288 -180 -43 -11 -50 -10 -62 6 -7 10 -14 21 -14 26 0 4 -11 7 -24
7 -31 0 -41 -26 -21 -56 8 -13 15 -28 15 -33 0 -17 -31 -41 -53 -41 -19 0 -22
6 -22 37 0 50 -20 52 -44 4 -33 -64 -74 -74 -129 -33 l-23 18 50 13 c59 15 80
34 61 56 -9 11 -25 13 -64 9 -41 -5 -55 -3 -65 10 -14 16 -33 96 -23 96 3 0
28 -11 56 -25 28 -13 65 -25 81 -27 25 -2 31 1 33 19 3 18 -5 27 -32 40 -58
27 -44 63 24 63 24 0 30 -6 40 -35 20 -59 51 -56 164 15 78 50 126 101 126
137 0 37 -33 84 -79 113 -47 29 -49 37 -20 74 44 56 117 68 274 46 38 -6 88
-8 111 -4 39 6 105 46 94 58 -3 3 -39 10 -80 16 -136 21 -210 70 -210 141 0
16 -3 19 -12 11 -13 -10 -289 -162 -295 -162 -2 0 -3 11 -3 25 0 18 -5 25 -20
25 -17 0 -20 -7 -20 -50 0 -45 -3 -52 -26 -60 -35 -14 -34 -14 -32 22 5 54
-23 46 -52 -14 -27 -57 -41 -65 -84 -48 l-27 10 42 40 c33 31 40 43 31 52 -9
9 -23 8 -61 -4 -53 -17 -62 -15 -79 18 -11 21 -9 22 43 29 30 3 58 11 61 17 3
5 -8 24 -25 42 -37 38 -39 61 -9 77 18 9 23 9 26 -1 3 -8 15 -24 28 -37 18
-18 34 -23 78 -23 46 0 62 6 109 38 48 32 207 177 207 188 0 2 -16 4 -36 4
-70 0 -120 37 -237 174 -51 60 -64 82 -56 92 12 15 4 34 -15 34 -7 0 -22 -13
-34 -30 -25 -34 -47 -38 -74 -13 -23 20 -23 33 0 33 25 0 62 28 62 47 0 12 -6
14 -32 8 -68 -17 -102 -12 -115 15 -7 15 -10 36 -7 48 6 20 8 20 33 8 37 -19
97 -30 105 -18 3 5 -13 24 -35 41 -45 37 -45 56 -1 104 37 39 48 34 55 -23 7
-56 26 -101 45 -108 9 -3 11 9 6 52 -7 58 -5 61 41 68 19 3 20 -2 17 -83 -4
-86 -4 -86 28 -112 69 -58 272 -166 363 -192 69 -20 99 -14 138 25 40 40 38
60 -7 60 -28 0 -35 3 -32 18 3 13 14 17 53 17 49 0 75 8 75 24 0 4 -56 6 -124
3 l-124 -5 -27 32 c-16 17 -38 31 -50 31 -31 0 -58 23 -54 46 3 14 14 20 42
22 34 3 42 -2 88 -49 l50 -52 96 7 c54 4 99 9 101 11 3 3 -1 12 -9 21 -11 14
-26 16 -87 11 -63 -5 -74 -3 -79 11 -3 9 -13 25 -20 34 -22 25 -6 39 40 37 23
-1 51 3 62 9 11 6 29 13 40 17 18 6 16 10 -22 45 -24 21 -43 43 -43 49 0 13
26 15 34 2 3 -5 15 -7 26 -4 13 4 20 0 20 -9 0 -20 20 -37 37 -31 12 5 11 8
-2 23 -18 20 -5 36 21 26 10 -4 15 0 13 12 -3 29 0 34 19 30 11 -2 16 -11 14
-27z m199 -625 c11 -24 44 -72 74 -106 42 -48 56 -73 61 -107 5 -34 3 -49 -9
-61 -15 -14 -20 -12 -56 21 -21 19 -50 41 -63 48 -51 27 -168 126 -168 142 0
13 40 45 75 61 17 7 36 20 44 29 7 10 15 17 17 17 2 0 13 -20 25 -44z"/>
<path d="M1960 1866 c-16 -43 -12 -136 9 -181 10 -22 43 -69 74 -106 63 -74
77 -102 77 -162 l0 -42 19 25 c45 57 36 101 -45 238 -32 52 -71 130 -87 171
-16 42 -31 78 -33 80 -2 2 -8 -8 -14 -23z"/>
</g>
</svg>

}
          </svg>
        </div>

        <motion.div style={{ scale: scaleHero }} className="absolute inset-0" />
        <div className="relative w-full px-6 md:px-12">
          <motion.h1
            style={{ y: yHero }}
            className="leading-[0.95] font-extrabold text-[12vw] md:text-[9vw] tracking-tight text-left"
          >
            Stiftungs<br />Forum<br />Saar
          </motion.h1>
          <div className="mt-6 md:mt-10 max-w-2xl text-neutral-700 text-base md:text-lg">
            Ein gemeinsamer digitaler Auftritt – klar, schnell, wirksam. Sichtbarkeit für alle Stiftungen. Zugang für die Bürger. Gemeinsam geht mehr.
          </div>
          <div className="mt-8 flex gap-4">
            <Button className="bg-black text-white hover:bg-neutral-800 rounded-none px-6">Mehr erfahren</Button>
            <Button variant="outline" className="border border-black text-black hover:bg-black hover:text-white rounded-none px-6">Kontakt</Button>
          </div>
        </div>
      </section>

      {/* FETTE LINIE */}
      <Divider />

      {/* ÜBER UNS */}
      <section id="about" className="relative min-h-[80vh] grid md:grid-cols-2">
        <div className="flex items-center px-6 md:px-12 py-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold leading-[1.05]">
              Wir machen <span className="underline">Engagement</span> sichtbar.
            </h2>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Seit 2011 vernetzt das StiftungsForumSaar die saarländische Stiftungslandschaft, bündelt Wissen und öffnet Türen: für Projekte, Kooperationen und junge Menschen, die mitgestalten wollen.
            </p>
          </div>
        </div>
        <div className="relative flex items-center justify-center" style={{ borderLeft: "3px solid #000" }}>
          <div
            className="flex items-center justify-center text-neutral-500"
            style={{ width: "75%", height: "75%", border: "3px solid #000" }}
          >
            Visual Placeholder
          </div>
        </div>
      </section>

      <Divider />

      {/* MARQUEE */}
      <section className="relative bg-white">
        <div className="overflow-hidden whitespace-nowrap py-6 text-neutral-800">
          <div className="animate-[marquee_24s_linear_infinite] will-change-transform flex">
            <span className="mx-10">BILDUNG</span>
            <span className="mx-10">KULTUR</span>
            <span className="mx-10">UMWELT</span>
            <span className="mx-10">SOZIALES</span>
            <span className="mx-10">JUGEND</span>
            <span className="mx-10">SPORT</span>
            <span className="mx-10">FORSCHUNG</span>
            <span className="mx-10">FAMILIE</span>
            <span className="mx-10">POLITIK</span>
            <span className="mx-10">SAARLAND</span>
          </div>
        </div>
      </section>

      <Divider />

      {/* VERZEICHNIS */}
      <section id="verzeichnis" className="relative min-h-[70vh] grid md:grid-cols-12">
        <div className="md:col-span-7 flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">Alle Stiftungen auf einen Blick.</h3>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Alphabetisch und thematisch filterbar – schnell auffindbar nach Bereichen wie Bildung, Kultur, Soziales, Umwelt und mehr. Klein oder groß: jede Stiftung ist sichtbar.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/verzeichnis" className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black">Zum Verzeichnis</a>
              <a href="#stiftungstag" className="px-6 py-3 border border-black hover:bg-black hover:text-white">Stiftungstag</a>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative flex items-center justify-center" style={{ borderLeft: "3px solid #000" }}>
          <div style={{ width: "75%", height: "75%", border: "3px solid #000" }} />
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
            Termine, Inhalte, Archiv. Konzentriert auf einer Seite. Klar strukturiert, barrierefrei, mobil erstklassig. Die Bühne für Austausch und Impulse.
          </p>
          <div className="mt-8">
            <Button className="rounded-none border border-black bg-black text-white hover:bg-white hover:text-black">Programm ansehen</Button>
          </div>
        </div>
      </section>

      <Divider />

      {/* AUSTAUSCH */}
      <section id="austausch" className="relative min-h-[70vh] grid md:grid-cols-2">
        <div className="flex items-center px-6 md:px-12 py-24">
          <div>
            <h3 className="text-5xl md:text-6xl font-semibold leading-[1.05]">Austausch & Vernetzung</h3>
            <p className="mt-6 text-neutral-700 max-w-xl text-lg">
              Ein moderierter, datenschutzkonformer Raum für Bottom-up-Themen. Alternativ: dedizierte LinkedIn-Gruppen – sichtbar integriert und leicht zugänglich.
            </p>
            <div className="mt-8 flex gap-4">
              <Button className="bg-black hover:bg-neutral-800 rounded-none text-white border border-black">Zur Plattform</Button>
              <Button variant="outline" className="rounded-none border border-black hover:bg-black hover:text-white">LinkedIn-Gruppen</Button>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center" style={{ borderLeft: "3px solid #000" }}>
          <div style={{ width: "75%", height: "75%", border: "3px solid #000" }} />
        </div>
      </section>

      <Divider />

      {/* FOOTER */}
      <footer id="kontakt" className="relative">
        <div className="px-6 md:px-12 py-12 grid md:grid-cols-2 items-end">
          <div>
            <div style={{ width: 112, height: 32, border: "1px solid #000", marginBottom: 16 }} />
            <p className="text-neutral-700 text-sm">© 2025 StiftungsForumSaar</p>
          </div>
          <div className="md:text-right text-neutral-700 text-sm">
            Musterstraße 1, 66119 Saarbrücken · info@stiftungsforumsaar.de
          </div>
        </div>
      </footer>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
