"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaShieldAlt,
  FaInfoCircle,
  FaDatabase,
  FaCogs,
  FaGavel,
  FaShareAlt,
  FaLock,
  FaArchive,
  FaUserShield,
  FaCookieBite,
  FaExternalLinkAlt,
  FaChild,
  FaEnvelope,
  FaSyncAlt,
  FaCheckDouble,
  FaChevronDown,
  FaCheckCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaArrowLeft,
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Policy content                                                     */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    icon: FaInfoCircle,
    paragraphs: [
      `Welcome to Rang Manch Exhibition ("we," "us," "our," or the "Company"). We are committed to protecting your privacy and ensuring you have a positive experience on our Website. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit rangmanchexhibition.com and participate in our exhibitions and services.`,
      `Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Website or services.`,
    ],
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information We Collect",
    icon: FaDatabase,
    groups: [
      {
        heading: "Information You Provide Directly",
        items: [
          "Name, email address, and phone number",
          "Business/vendor information (shop name, product category, GST details)",
          "Mailing address and location details",
          "Payment information for stall bookings and registrations",
          "Inquiries, feedback, and messages sent through contact forms",
          "Event preferences and attendance information",
        ],
      },
      {
        heading: "Information Collected Automatically",
        items: [
          "IP address and browser type",
          "Device information and operating system",
          "Pages visited and time spent on the Website",
          "Referring website URLs",
          "Cookie data and tracking information",
          "Location data (if you enable it)",
        ],
      },
      {
        heading: "Third-Party Information",
        items: [
          "Information from payment gateways (for transaction processing)",
          "Social media data (if you connect your accounts)",
          "Information from vendor references and related parties",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    number: "03",
    title: "How We Use Your Information",
    icon: FaCogs,
    groups: [
      {
        items: [
          ["Event Management", "Processing vendor registrations, managing stall allocations, and coordinating exhibitions"],
          ["Communication", "Sending event updates, confirmations, reminders, and customer support responses"],
          ["Payment Processing", "Facilitating secure transactions and managing booking payments"],
          ["Vendor Coordination", "Organizing vendor participation, Lucky Draw entries, and promotional activities"],
          ["Improvements", "Analyzing Website usage to improve our services and user experience"],
          ["Marketing", "Sending promotional emails, newsletters, and event announcements (with your consent)"],
          ["Legal Compliance", "Fulfilling legal obligations and resolving disputes"],
          ["Analytics", "Understanding visitor behavior and Website performance"],
        ],
      },
    ],
  },
  {
    id: "legal-basis",
    number: "04",
    title: "Legal Basis for Processing",
    icon: FaGavel,
    paragraphs: ["We process your personal information based on:"],
    groups: [
      {
        items: [
          "Your explicit consent",
          "Performance of contracts with you (vendor agreements, booking terms)",
          "Legal compliance requirements",
          "Legitimate business interests",
        ],
      },
    ],
  },
  {
    id: "information-sharing",
    number: "05",
    title: "Information Sharing and Disclosure",
    icon: FaShareAlt,
    paragraphs: ["We may share your information in the following circumstances:"],
    groups: [
      {
        heading: "With Service Providers",
        items: [
          "Payment processors and financial institutions",
          "Website hosting providers",
          "Email service providers",
          "Event management and logistics partners",
        ],
      },
      {
        heading: "Legal Requirements",
        items: [
          "When required by law, court order, or government request",
          "To protect our legal rights and prevent fraud",
          "To enforce our Terms & Conditions and other agreements",
        ],
      },
      {
        heading: "Business Transfers",
        items: ["In the event of merger, acquisition, or sale of assets (you will be notified)"],
      },
      {
        heading: "With Your Consent",
        items: [
          "We do not sell personal data to third parties",
          "Vendor information may be shared with other vendors for event coordination purposes with prior notification",
        ],
      },
    ],
  },
  {
    id: "data-security",
    number: "06",
    title: "Data Security",
    icon: FaLock,
    paragraphs: ["We implement industry-standard security measures to protect your information:"],
    groups: [
      {
        items: [
          "SSL/TLS encryption for data transmission",
          "Secure payment gateway integration",
          "Restricted access to personal information",
          "Regular security assessments",
          "Data backup procedures",
        ],
      },
    ],
    footnote:
      "However, no method of internet transmission is 100% secure. We cannot guarantee absolute security but are committed to protecting your data to the best of our ability.",
  },
  {
    id: "data-retention",
    number: "07",
    title: "Data Retention",
    icon: FaArchive,
    paragraphs: ["We retain your personal information for:"],
    groups: [
      {
        items: [
          ["Active Vendors", "Duration of participation and 1 year after the last event"],
          ["Customer Inquiries", "2 years, or as per legal requirement"],
          ["Payment Records", "As per GST and financial regulations (6–7 years)"],
          ["Marketing Communications", "Until you opt out"],
        ],
      },
    ],
    footnote: "You can request deletion of your data (subject to legal requirements) by contacting us.",
  },
  {
    id: "your-rights",
    number: "08",
    title: "Your Rights and Choices",
    icon: FaUserShield,
    groups: [
      {
        heading: "Access and Correction",
        items: ["Request access to your personal information", "Correct inaccurate or incomplete data"],
      },
      {
        heading: "Opt-Out",
        items: [
          "Unsubscribe from promotional emails by clicking the link in messages",
          "Disable cookies in your browser settings",
          "Request not to receive certain communications",
        ],
      },
      {
        heading: "Data Deletion",
        items: ["Request deletion of your data (subject to legal retention requirements)", "Exercise the right to be forgotten"],
      },
      {
        heading: "Data Portability",
        items: ["Request your data in a structured, commonly used format"],
      },
    ],
    footnote: "To exercise any of these rights, contact us using the details in the Contact Us section below.",
  },
  {
    id: "cookies",
    number: "09",
    title: "Cookies and Tracking",
    icon: FaCookieBite,
    paragraphs: ["Our Website uses cookies to:"],
    groups: [
      {
        items: ["Remember user preferences", "Track Website analytics", "Improve user experience", "Serve relevant advertisements"],
      },
      {
        heading: "Types of Cookies",
        items: [
          "Essential cookies (required for Website functionality)",
          "Performance cookies (analytics and usage tracking)",
          "Preference cookies (remembering your settings)",
          "Marketing cookies (targeted content)",
        ],
      },
    ],
    footnote: "You can control cookies through your browser settings. Disabling cookies may affect Website functionality.",
  },
  {
    id: "third-party-links",
    number: "10",
    title: "Third-Party Links and Services",
    icon: FaExternalLinkAlt,
    paragraphs: [
      "Our Website may contain links to third-party websites and services. We are not responsible for the privacy practices of external websites. Please review their privacy policies before providing personal information.",
    ],
  },
  {
    id: "childrens-privacy",
    number: "11",
    title: "Children's Privacy",
    icon: FaChild,
    paragraphs: [
      "Our Website is not directed to children under 13 years old. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete this information promptly.",
    ],
  },
  {
    id: "contact-us",
    number: "12",
    title: "Contact Us",
    icon: FaEnvelope,
    isContact: true,
    paragraphs: ["For privacy-related inquiries, concerns, or to exercise your rights, please contact us:"],
    footnote: "We will respond to your inquiry within 30 days.",
  },
  {
    id: "policy-changes",
    number: "13",
    title: "Policy Changes",
    icon: FaSyncAlt,
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of significant changes by:",
    ],
    groups: [
      {
        items: [
          "Posting the updated policy on our Website",
          'Updating the "Last Updated" date',
          "Sending you a notification email (for major changes)",
        ],
      },
    ],
    footnote: "Your continued use of the Website after changes constitutes your acceptance of the updated Privacy Policy.",
  },
  {
    id: "compliance",
    number: "14",
    title: "Compliance",
    icon: FaCheckDouble,
    paragraphs: ["This Privacy Policy complies with:"],
    groups: [
      {
        items: [
          "Information Technology Act, 2000",
          "Information Technology Rules, 2011 (particularly Rule 4)",
          "Digital Personal Data Protection Act, 2023 (DPDP Act)",
          "General Data Protection Regulation (GDPR) principles (where applicable)",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Small renderers                                                     */
/* ------------------------------------------------------------------ */

function BulletList({ items }) {
  return (
    <ul className="space-y-3 mt-3">
      {items.map((item, i) => {
        const isTuple = Array.isArray(item);
        return (
          <li key={i} className="flex gap-3">
            <FaCheckCircle className="text-pink-500 mt-1 flex-shrink-0" size={14} />
            <p className="text-gray-600 leading-relaxed">
              {isTuple ? (
                <>
                  <span className="font-semibold text-[#1e2a55]">{item[0]}: </span>
                  {item[1]}
                </>
              ) : (
                item
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function ContactBlock() {
  return (
    <div className="mt-4 bg-pink-50 rounded-2xl p-5 space-y-3">
      <p className="font-semibold text-[#1e2a55]">Rang Manch Exhibition</p>

      <div className="flex items-start gap-3 text-gray-700">
        <span className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0">
          <FaMapMarkerAlt className="text-pink-500 text-sm" />
        </span>
        Jaipur, Rajasthan, India
      </div>

      <a
        href="mailto:rangmanchexhibition@gmail.com"
        className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition break-all"
      >
        <span className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0">
          <FaEnvelope className="text-pink-500 text-sm" />
        </span>
        rangmanchexhibition@gmail.com
      </a>

      <a
        href="tel:+918078681321"
        className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition"
      >
        <span className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0">
          <FaPhone className="text-pink-500 text-sm" />
        </span>
        +91 8078681321
      </a>

      <a
        href="https://rangmanchexhibition.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition"
      >
        <span className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0">
          <FaExternalLinkAlt className="text-pink-500 text-sm" />
        </span>
        rangmanchexhibition.com
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                           */
/* ------------------------------------------------------------------ */

export default function ReadMore() {
  const router = useRouter();
  const [openIds, setOpenIds] = useState(() => new Set([SECTIONS[0].id]));
  const refs = useRef({});

  const isOpen = (id) => openIds.has(id);

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const goTo = (id) => {
    setOpenIds((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => {
      refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const expandAll = () => setOpenIds(new Set(SECTIONS.map((s) => s.id)));
  const collapseAll = () => setOpenIds(new Set());

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fdf9f7] via-pink-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-5">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1e2a55] font-medium mb-8 hover:text-pink-600 transition"
        >
          <FaArrowLeft size={14} />
          Back
        </button>

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-600 font-medium mb-6">
            <FaShieldAlt />
            Privacy Policy
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#1e2a55]">
            Your Privacy, <span className="text-pink-500">Our Promise</span>
          </h1>

          <p className="max-w-3xl mx-auto mt-5 text-gray-600 text-lg leading-relaxed">
            Rang Manch Exhibition — how we collect, use, and protect your
            information when you visit our Website or take part in our
            exhibitions.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 text-sm text-gray-500">
            <FaClock className="text-pink-500" />
            Last Updated: June 2026
          </div>

          <div className="w-28 h-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-[#1e2a55] mb-6">On This Page</h3>

              <nav className="space-y-1 max-h-[50vh] overflow-y-auto pr-1">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(s.id)}
                    className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-xl transition ${
                      isOpen(s.id)
                        ? "bg-pink-50 text-pink-600"
                        : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                    }`}
                  >
                    <span className="text-xs font-bold text-pink-400 w-6 flex-shrink-0">
                      {s.number}
                    </span>
                    <span className="text-sm font-medium">{s.title}</span>
                  </button>
                ))}
              </nav>

              <div className="flex gap-2 mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={expandAll}
                  className="flex-1 text-sm font-semibold text-pink-600 border border-pink-200 rounded-xl py-2 hover:bg-pink-50 transition"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="flex-1 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl py-2 hover:bg-gray-50 transition"
                >
                  Collapse All
                </button>
              </div>

              <div className="mt-6 bg-pink-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-[#1e2a55] mb-2">Need help?</p>
                <a
                  href="mailto:rangmanchexhibition@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition break-all"
                >
                  <FaEnvelope className="text-pink-500 flex-shrink-0" />
                  rangmanchexhibition@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-5">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const open = isOpen(s.id);

              return (
                <div
                  key={s.id}
                  id={s.id}
                  ref={(el) => (refs.current[s.id] = el)}
                  className="bg-white rounded-[28px] shadow-lg border border-pink-100 overflow-hidden scroll-mt-24"
                >
                  <button
                    onClick={() => toggle(s.id)}
                    className="w-full flex items-center gap-4 p-6 md:p-7 text-left"
                  >
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                      <Icon size={18} />
                    </span>

                    <div className="flex-1">
                      <span className="text-xs font-bold text-pink-400">{s.number}</span>
                      <h2 className="text-xl md:text-2xl font-bold text-[#1e2a55] leading-snug">
                        {s.title}
                      </h2>
                    </div>

                    <FaChevronDown
                      className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                        open ? "rotate-180 text-pink-500" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                    style={{ display: "grid" }}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-7 pb-7 -mt-1">
                        {s.paragraphs?.map((p, i) => (
                          <p key={i} className="text-gray-600 leading-relaxed mb-3">
                            {p}
                          </p>
                        ))}

                        {s.groups?.map((g, i) => (
                          <div key={i} className={i > 0 ? "mt-6" : ""}>
                            {g.heading && (
                              <p className="font-semibold text-[#1e2a55] text-sm uppercase tracking-wide">
                                {g.heading}
                              </p>
                            )}
                            <BulletList items={g.items} />
                          </div>
                        ))}

                        {s.isContact && <ContactBlock />}

                        {s.footnote && (
                          <p className="text-gray-500 text-sm leading-relaxed mt-5 italic border-l-2 border-pink-200 pl-4">
                            {s.footnote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Closing note */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-[28px] p-8 text-center text-white shadow-xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-pink-50 mb-5">
                Our team is happy to walk you through anything in this policy.
              </p>
              <a
                href="mailto:rangmanchexhibition@gmail.com"
                className="inline-flex items-center gap-2 bg-white text-pink-600 font-semibold px-6 py-3 rounded-2xl hover:scale-[1.02] transition"
              >
                <FaEnvelope />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}