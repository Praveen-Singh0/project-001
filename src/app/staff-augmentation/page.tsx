import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StaffAugmentationPage } from "@/components/pages/StaffAugmentationPage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Staff Augmentation — DTECHEX",
  description:
    "Access pre-vetted experts to scale your team on-demand. Flexible engagement models for your project needs.",
};

export default function Page() {
  return (
    <div className="font-sans">
      <Navbar />
      <StaffAugmentationPage />
      <Footer />
    </div>
  );
}
