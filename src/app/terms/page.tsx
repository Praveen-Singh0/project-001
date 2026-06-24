import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const dynamic = "force-static";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <p>
        By accessing the DTECHEX website, you agree to these Terms of Service. If you do not agree,
        please do not use our site.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>Use of website.</strong> You may use this website for
        lawful purposes only. You agree not to misuse the site or attempt to disrupt its operation.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>Intellectual property.</strong> All content, branding,
        logos, and materials on this site are owned by DTECHEX or its licensors and are protected by
        applicable intellectual property laws.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>Services.</strong> Information on this website is for
        general purposes. Formal engagements are governed by separate written agreements.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>Limitation of liability.</strong> DTECHEX is not liable
        for indirect, incidental, or consequential damages arising from your use of this website.
      </p>
      <p className="text-xs opacity-70">
        [TODO: Legal review — replace with counsel-approved terms before production launch.]
      </p>
      <p className="text-xs">Last updated: June 2024</p>
    </LegalPageLayout>
  );
}
