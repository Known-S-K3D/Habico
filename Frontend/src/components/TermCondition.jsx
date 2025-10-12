import React from "react";

// TermsAndConditions.jsx
// Drop this file into a Vite + React project (src/components/TermsAndConditions.jsx)
// Uses Tailwind CSS for styling. If you don't have Tailwind, the layout will still work with basic CSS but not the same styling.

const COMPANY = {
  name: "Habi.co",
  contactEmail: "legal@Habico.example",
  contactPage: "/About",
  country: "Philippines",
  website: "https://www.Habico.example",
  lastUpdated: "October 12, 2025",
};

const sections = [
  {
    id: "intro",
    title: "Introduction",
    body: `These Terms and Conditions ("Terms") govern your use of ${COMPANY.name} (the "Company") website and services (the "Service"). By accessing or using the Service you agree to be bound by these Terms. If you do not agree, do not use the Service.`,
  },
  {
    id: "definitions",
    title: "Interpretation & Definitions",
    body:
      "Capitalized words used in these Terms have the meanings set out below.\n\n" +
      [
        "Affiliate — an entity that controls, is controlled by, or is under common control with a party.",
        "Account — a unique account created for You to access the Service.",
        "Content — text, images or other materials you post or upload to the Service.",
        "Service — the Company's website, applications and related services.",
      ].join("\n\n"),
  },
  {
    id: "use",
    title: "User Accounts & Eligibility",
    body:
      "You must be 18 or older to use the Service.\n\nYou are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Inform us immediately of any unauthorized use.",
  },
  {
    id: "content",
    title: "Content: Your Rights & Restrictions",
    body:
      "You retain ownership of any Content you post. By posting Content you grant the Company a worldwide, non-exclusive, royalty-free license to use, reproduce, modify and distribute such Content in connection with the Service.\n\nYou must not post illegal, infringing, defamatory, obscene, or malicious content (including viruses or malware). The Company may remove content that violates these Terms.",
  },
  {
    id: "ip",
    title: "Intellectual Property",
    body:
      `All Service content provided by the Company (excluding user Content) is owned by ${COMPANY.name} or its licensors and is protected by intellectual property laws. You may not use our trademarks or trade dress without prior written permission.`,
  },
  {
    id: "termination",
    title: "Termination",
    body:
      "We may suspend or terminate access to the Service at any time for any reason, including breach of these Terms. Upon termination, your right to use the Service ceases immediately.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body:
      "To the maximum extent permitted by law, the Company's total liability for any claim arising from or related to these Terms is limited to the amount you paid to the Company in the 12 months preceding the claim or 100 USD if no payment was made. We are not liable for indirect, incidental, or consequential damages.",
  },
  {
    id: "warranty",
    title: 'Disclaimer — "AS IS" and "AS AVAILABLE"',
    body:
      "The Service is provided on an 'AS IS' and 'AS AVAILABLE' basis. We disclaim all warranties, express or implied, to the fullest extent permitted by law.",
  },
  {
    id: "governing",
    title: "Governing Law & Dispute Resolution",
    body:
      `These Terms are governed by the laws of ${COMPANY.country}, without regard to conflict-of-law rules. If you have a dispute, contact us first at ${COMPANY.contactEmail} so we can try to resolve it informally.`,
  },
  {
    id: "changes",
    title: "Changes to Terms",
    body:
      "We may modify these Terms. If a change is material, we will provide at least 30 days' notice when reasonable. Continued use after changes means you accept them.",
  },
  {
    id: "contact",
    title: "Contact Information",
    body: `Questions about these Terms? Contact us at ${COMPANY.contactEmail} or visit ${COMPANY.contactPage}.`,
  },
];

export default function TermsAndConditions() {
  const [query, setQuery] = React.useState("");

  const filtered = sections.filter((s) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (s.title + " " + s.body).toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <header className="px-6 py-8 md:flex md:items-start md:justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Terms & Conditions</h1>
            <p className="mt-2 text-sm opacity-90">Last updated: {COMPANY.lastUpdated}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed opacity-95">These Terms govern your use of {COMPANY.name} services and website. Please read them carefully.</p>
          </div>
          <div className="mt-6 md:mt-0 md:text-right">
            <a
              href={COMPANY.website}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium"
            >
              Visit website
            </a>
          </div>
        </header>

        <main className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            <aside className="md:w-80 mb-6 md:mb-0">
              <div className="sticky top-6">
                <div className="mb-4">
                  <input
                    type="search"
                    placeholder="Search terms..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-lg border-gray-200 shadow-sm px-3 py-2"
                  />
                </div>

                <nav className="space-y-2">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-gray-700 hover:text-indigo-600"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>

                <div className="mt-6">
                  <button
                    onClick={() => window.print()}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700"
                  >
                    Print / Save as PDF
                  </button>
                </div>
              </div>
            </aside>

            <section className="flex-1 prose prose-sm md:prose-base max-w-none">
              <article className="mb-6">
                <h2 className="text-lg font-semibold">Acknowledgment</h2>
                <p>
                  These Terms govern the use of the Service. By accessing or using the Service you agree to be bound by these
                  Terms. If you disagree with any part of these Terms, do not use the Service. You must be at least 18 years old.
                </p>
              </article>

              {filtered.map((s) => (
                <article id={s.id} key={s.id} className="mb-8">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  {s.body.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </article>
              ))}

              <article className="mt-8">
                <h3 className="text-lg font-semibold">Acceptance</h3>
                <p>
                  By continuing to use the Service you acknowledge that you have read, understood, and agree to be bound by these
                  Terms and any future amendments.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => alert('Thanks — you accepted the Terms (demo).')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700"
                  >
                    Accept
                  </button>

                  <a href={COMPANY.contactPage} className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
                    Contact us
                  </a>
                </div>
              </article>

              <footer className="mt-12 border-t pt-6 text-sm text-gray-600">
                <p>
                  For questions about these Terms, contact us at <a href={`mailto:${COMPANY.contactEmail}`}>{COMPANY.contactEmail}</a>.
                </p>
              </footer>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
