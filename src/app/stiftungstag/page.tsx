import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

// Hilfsfunktionen (Server-seitig)
const IMG_ROOT = path.join(process.cwd(), "public", "images");
const IMG_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;

function listFolders(prefix = "stiftungstag") {
  if (!fs.existsSync(IMG_ROOT)) return [];
  return fs
    .readdirSync(IMG_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith(prefix))
    .sort((a, b) => {
      // Nach Jahr im Namen sortieren (neueste zuerst), sonst alphabetisch
      const ya = parseInt(a.name.match(/\d{4}/)?.[0] || "0", 10);
      const yb = parseInt(b.name.match(/\d{4}/)?.[0] || "0", 10);
      if (ya !== yb) return yb - ya;
      return a.name.localeCompare(b.name);
    })
    .map((d) => d.name);
}

function listImagesIn(folder: string) {
  const dir = path.join(IMG_ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMG_EXT.test(f))
    .sort((a, b) => {
      // Erst nach Zahlen im Dateinamen, sonst alphabetisch
      const na = parseInt(a.match(/\d+/)?.[0] || "0", 10);
      const nb = parseInt(b.match(/\d+/)?.[0] || "0", 10);
      if (na && nb && na !== nb) return na - nb;
      return a.localeCompare(b, undefined, { numeric: true });
    })
    .map((f) => `/images/${folder}/${f}`);
}

export default function StiftungstagPage() {
  const folders = listFolders("stiftungstag"); // z.B. stiftungstag2024, stiftungstag2025 …

  return (
    <main className="bg-white text-black px-6 md:px-12 py-16 min-h-screen">
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold hover:underline">
          ← Zurück zum Hauptmenü
        </Link>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold mb-10">Stiftungstag Saar</h1>

      {folders.map((folder) => {
        const year = folder.match(/\d{4}/)?.[0] ?? "";
        const images = listImagesIn(folder);

        return (
          <section key={folder} className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-4">
              {year ? `Stiftungstag ${year}` : folder}
            </h2>

            {images.length === 0 ? (
              <div className="border border-dashed border-black p-8 text-neutral-500">
                Keine Bilder in <code>/public/images/{folder}</code> gefunden.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, i) => (
                  <div key={src} className="border">
                    <Image
                      src={src}
                      alt={`${folder} Bild ${i + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
