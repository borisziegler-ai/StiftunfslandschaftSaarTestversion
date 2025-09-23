"use client";

import Link from "next/link";

function SpiegelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 15,
          paddingRight: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          borderBottom: "1px solid black",
          padding: "6px 0",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function StiftungDetailPage() {
  return (
    <main className="bg-white text-black min-h-screen flex justify-center px-6 py-10 relative">
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          borderLeft: "3px solid black",
          borderRight: "3px solid black",
          padding: "0 32px",
          position: "relative",
        }}
      >
        {/* Menü-Button oben links */}
        <div style={{ position: "absolute", top: 16, left: -110 }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "6px 12px",
              border: "2px solid black",
              backgroundColor: "black",
              color: "white",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← Hauptmenü
          </Link>
        </div>

        {/* Titel */}
        <header style={{ textAlign: "center", marginBottom: 40, marginTop: 20 }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            ADFC – Allgemeiner Deutscher Fahrrad-Club
          </h1>

          <div>
            <div
              style={{
                borderTop: "1px solid black",
                width: "100%",
                maxWidth: 400,
                margin: "0 auto 8px auto",
              }}
            />
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
            >
              Freizeit, Jugend, Sport, Umwelt
            </div>
          </div>
        </header>

        {/* Inhalte */}
        <section>
          <SpiegelRow label="Stiftungszweck / Satzungsbezug">
            → Förderung des Radverkehrs
          </SpiegelRow>

          <SpiegelRow label="Adresse">
            Evang.-Kirch-Straße 8<br />
            66111 Saarbrücken
          </SpiegelRow>

          <SpiegelRow label="Telefon">0681/45098</SpiegelRow>

          <SpiegelRow label="Telefax">0681/46769</SpiegelRow>

          <SpiegelRow label="Website">
            <a
              href="http://www.adfc-saar.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              www.adfc-saar.de
            </a>
          </SpiegelRow>

          <SpiegelRow label="E-Mail">
            <a
              href="mailto:info@adfc-saar.de"
              style={{ textDecoration: "underline" }}
            >
              info@adfc-saar.de
            </a>
          </SpiegelRow>
        </section>

        {/* Spendenbereich */}
        <section
          style={{
            backgroundColor: "#f2f2f2",
            textAlign: "center",
            padding: "40px 20px",
            marginTop: 40,
          }}
        >
          {/* Quadrat statt Herz */}
          <div
            style={{
              width: 24,
              height: 24,
              backgroundColor: "black",
              display: "inline-block",
              marginBottom: 12,
            }}
          />

          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 8,
            }}
          >
            Spendenkonto
          </div>

          <div style={{ marginBottom: 16 }}>
            Spenden können an folgende IBAN gerichtet werden:
          </div>

          <div
            style={{
              display: "inline-block",
              padding: "10px 14px",
              border: "2px solid black",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 16,
              backgroundColor: "#fff",
            }}
          >
            DE46 5509 0500 0005 1408 54
          </div>
        </section>
      </div>
    </main>
  );
}
