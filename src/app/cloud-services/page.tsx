import { CloudServicesPage } from "@/components/pages/CloudServicesPage";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const dynamic = "force-static";

export default function Page() {
  return (
    <>
      <Navbar />
      <CloudServicesPage />
      <Footer />
    </>
  );
}
