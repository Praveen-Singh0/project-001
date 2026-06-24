import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export const dynamic = "force-static";

export default function Page() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="pt-24">
        <About />
      </main>
      <Footer />
    </div>
  );
}
