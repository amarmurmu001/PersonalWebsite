import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <main id="main">
        <Hero />
        <Work />
        <About />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
