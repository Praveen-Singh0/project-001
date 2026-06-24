import { CareersPage } from "@/components/pages/CareersPage";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const dynamic = "force-static";

export default function Page() {
  return (
    <>
      <Navbar />
      <CareersPage />
      <Footer />
    </>
  );
}
