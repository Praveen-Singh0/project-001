import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>
        DTECHEX — Doon Technology Expert (&quot;DTECHEX,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) respects your privacy. This policy describes how we collect, use, and
        protect information when you visit our website.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>Information we collect.</strong> We may collect
        information you provide through contact forms, including your name, email address, company
        name, and message content.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>How we use information.</strong> We use submitted
        information to respond to inquiries, provide services, and improve our website experience.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>Cookies &amp; analytics.</strong> We may use cookies
        and similar technologies to remember preferences (such as theme settings) and understand site
        usage.
      </p>
      <p>
        <strong style={{ color: "inherit" }}>Data security.</strong> We implement reasonable
        technical and organizational measures to protect your information.
      </p>
      <p className="text-xs opacity-70">
        [TODO: Legal review — replace with counsel-approved privacy policy before production launch.]
      </p>
      <p className="text-xs">Last updated: June 2024</p>
    </LegalPageLayout>
  );
}
