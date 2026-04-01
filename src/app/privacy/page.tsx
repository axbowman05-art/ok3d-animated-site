import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy — OK3D Prints",
  description: "How OK3D Prints collects, uses, and protects your information.",
};

const LAST_UPDATED = "March 31, 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-[#0074FF] tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
            <p>
              OK3D Prints (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
              operates the website ok3dprints.com. This policy explains what
              information we collect, how we use it, and your choices. We keep it
              simple because we&apos;re a small business — not a data company.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              What We Collect
            </h2>
            <h3 className="text-base font-medium text-gray-200 mb-2">
              Quote form submissions
            </h3>
            <p>
              When you submit a quote request, we collect your name, email
              address, phone number, and the details you provide about your
              project. This information is used solely to respond to your inquiry
              and fulfill your order.
            </p>
            <h3 className="text-base font-medium text-gray-200 mb-2 mt-4">
              Analytics (with consent)
            </h3>
            <p>
              If you accept cookies, we use Google Analytics 4 to collect
              anonymized data about how visitors use our site — pages visited,
              time on site, and general geographic region. No personally
              identifiable information is included. You can decline analytics
              cookies and the site will work exactly the same.
            </p>
            <h3 className="text-base font-medium text-gray-200 mb-2 mt-4">
              What we do NOT collect
            </h3>
            <p>
              We do not collect payment information (quotes are followed up via
              email/phone), we do not build advertising profiles, and we do not
              sell or share your data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to your quote request and follow up on your project</li>
              <li>To send you an order confirmation email</li>
              <li>To notify us (the owner) of new quote submissions</li>
              <li>
                To understand aggregate site usage so we can improve the
                experience (analytics only, with consent)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Third-Party Services
            </h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong className="text-gray-200">Resend</strong> — used to
                deliver transactional emails (quote confirmations). Your email
                address is passed to Resend for delivery only.
              </li>
              <li>
                <strong className="text-gray-200">Google Analytics 4</strong> —
                used for anonymized site analytics, only if you accept cookies.
                Governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0074FF] hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong className="text-gray-200">Calendly</strong> — if you
                book a consultation via our Calendly link, Calendly&apos;s own
                privacy policy applies to that interaction.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Data Retention
            </h2>
            <p>
              Quote submissions are stored in our internal system for as long as
              necessary to fulfill your order and for reasonable business record
              keeping. If you&apos;d like your data deleted, contact us and
              we&apos;ll remove it within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Cookies
            </h2>
            <p>
              We use one first-party cookie to remember your cookie consent
              preference. If you accept analytics cookies, Google Analytics sets
              its own cookies to track anonymized session data. You can clear
              your preference at any time by clearing your browser&apos;s local
              storage for this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Your Rights
            </h2>
            <p>
              You can request access to, correction of, or deletion of your
              personal information at any time. Email us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#0074FF] hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              and we&apos;ll handle it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Children&apos;s Privacy
            </h2>
            <p>
              Our services are not directed at children under 13. We do not
              knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Changes to This Policy
            </h2>
            <p>
              If we make material changes we&apos;ll update the date at the top
              of this page. Continued use of the site after changes constitutes
              acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#0074FF] hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              or{" "}
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-[#0074FF] hover:underline"
              >
                {siteConfig.phone}
              </a>
              .
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            &larr; Back to OK3D Prints
          </Link>
        </div>
      </div>
    </main>
  );
}
