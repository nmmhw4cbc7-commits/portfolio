import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Trail } from "@/components/portfolio/Trail";
import { Kit } from "@/components/portfolio/Kit";
import { Tours } from "@/components/portfolio/Tours";
import { Contact, Footer } from "@/components/portfolio/Contact";

const title = "Philipp Dachtler — Fullstack Developer & System Integrator";
const description =
  "Portfolio of Philipp Dachtler: fullstack web apps, Flutter mobile software and IT system integration from Mannheim & Schifferstadt, Germany.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <Trail />
      <Kit />
      <Tours />
      <Contact />
      <Footer />
    </main>
  );
}
