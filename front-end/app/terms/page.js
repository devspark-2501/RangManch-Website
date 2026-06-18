"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaFileContract,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaThLarge,
  FaBan,
  FaBoxOpen,
  FaStoreAlt,
  FaExclamationTriangle,
  FaUserFriends,
  FaBroom,
  FaHandshake,
  FaCameraRetro,
  FaCopyright,
  FaUtensils,
  FaUmbrella,
  FaFirstAid,
  FaChild,
  FaCheckSquare,
  FaBalanceScale,
  FaCommentSlash,
  FaGavel,
  FaMapMarkedAlt,
  FaSignature,
  FaChevronDown,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaArrowLeft,
  FaExternalLinkAlt,
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Terms content                                                      */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  {
    id: "registration-booking",
    number: "01",
    title: "Registration & Booking",
    icon: FaClipboardList,
    groups: [
      {
        items: [
          "Stall booking will be confirmed only after receipt of full payment",
          "Stall allocation is subject to availability and will be decided solely by Rang Manch Exhibition",
          "The organizer reserves the right to accept, reject, or cancel any booking at its sole discretion",
        ],
      },
    ],
  },
  {
    id: "payment-policy",
    number: "02",
    title: "Payment Policy",
    icon: FaMoneyCheckAlt,
    groups: [
      {
        items: [
          "All stall booking payments are non-refundable and non-transferable",
          "Stall bookings cannot be transferred to another individual or business without prior written approval",
          "Failure to complete payment before the due date may result in cancellation of the booking",
        ],
      },
    ],
  },
  {
    id: "event-changes",
    number: "03",
    title: "Event Changes",
    icon: FaCalendarAlt,
    paragraphs: [
      "Rang Manch Exhibition reserves the right to postpone, reschedule, relocate, modify, or cancel the event due to unforeseen circumstances including natural disasters, government restrictions, force majeure, pandemics, venue-related issues, or any event beyond the organizer's control.",
    ],
  },
  {
    id: "stall-allocation",
    number: "04",
    title: "Stall Allocation",
    icon: FaThLarge,
    groups: [
      {
        items: [
          "Stall allocation shall be solely at the discretion of the organizer",
          "Vendors must occupy only their allotted stall",
          "Stall sharing, exchanging, or subletting is not permitted without prior written approval",
        ],
      },
    ],
  },
  {
    id: "no-exclusivity",
    number: "05",
    title: "No Category Exclusivity",
    icon: FaBan,
    groups: [
      {
        items: [
          "Unless specifically agreed in writing, Rang Manch Exhibition does not provide category exclusivity",
          "Multiple vendors selling similar or identical products may participate in the exhibition",
        ],
      },
    ],
  },
  {
    id: "product-restriction",
    number: "06",
    title: "Product Category Restriction",
    icon: FaBoxOpen,
    groups: [
      {
        items: [
          "Vendors may display and sell only the products or product categories declared during registration and stall booking",
          "Displaying, selling, or promoting any additional or different products without prior written approval from Rang Manch Exhibition is strictly prohibited",
          "Any unauthorized products may be removed from display, and the organizer reserves the right to cancel the vendor's participation without refund for any violation",
        ],
      },
    ],
  },
  {
    id: "products-services",
    number: "07",
    title: "Products & Services",
    icon: FaStoreAlt,
    groups: [
      {
        items: [
          "Vendors may display and sell only genuine, legal, and approved products or services",
          "Counterfeit, illegal, hazardous, offensive, or prohibited products are strictly prohibited",
          "The organizer reserves the right to remove any product that violates these Terms & Conditions",
        ],
      },
    ],
  },
  {
    id: "stall-setup-closing",
    number: "08",
    title: "Stall Setup & Closing",
    icon: FaClipboardList,
    groups: [
      {
        items: [
          "Vendors must complete stall setup before the exhibition opens",
          "Vendors shall not dismantle or vacate their stall before the official closing time without prior approval",
          "Vendors must leave the stall clean and in good condition after the event",
        ],
      },
    ],
  },
  {
    id: "sales-footfall",
    number: "09",
    title: "Sales & Footfall Disclaimer",
    icon: FaExclamationTriangle,
    groups: [
      {
        items: [
          "Rang Manch Exhibition provides only a platform for vendors to showcase and sell their products",
          "Rang Manch Exhibition does not guarantee any sales, profits, revenue, customer inquiries, business opportunities, or visitor footfall",
          "Business performance depends on several factors including product quality, pricing, customer demand, competition, marketing efforts, and vendor participation",
          "No refund, compensation, or claim shall be entertained due to lower-than-expected sales or visitor turnout",
        ],
      },
    ],
  },
  {
    id: "vendor-responsibility",
    number: "10",
    title: "Vendor Responsibility",
    icon: FaUserFriends,
    groups: [
      {
        items: [
          "Vendors are solely responsible for their products, stock, cash, valuables, equipment, staff, and personal belongings",
          "Rang Manch Exhibition and the venue management shall not be responsible for any loss, theft, damage, accident, or injury involving the vendor or their property",
        ],
      },
    ],
  },
  {
    id: "damage-property",
    number: "11",
    title: "Damage to Property",
    icon: FaExclamationTriangle,
    groups: [
      {
        items: [
          "Vendors shall be fully responsible for any damage caused by themselves, their staff, representatives, equipment, or displays to the venue, furniture, fixtures, electrical fittings, or any property belonging to the organizer or venue",
          "The vendor agrees to bear the full cost of repair or replacement of such damage",
        ],
      },
    ],
  },
  {
    id: "electricity-equipment",
    number: "12",
    title: "Electricity & Equipment",
    icon: FaBoxOpen,
    groups: [
      {
        items: [
          "Vendors must use electricity responsibly",
          "Additional electrical requirements must be approved in advance by the organizer",
          "Unsafe electrical equipment or unauthorized electrical connections are strictly prohibited",
        ],
      },
    ],
  },
  {
    id: "vendor-attendance",
    number: "13",
    title: "Vendor Attendance",
    icon: FaUserFriends,
    groups: [
      {
        items: [
          "Vendors or their authorized representatives must remain present at their allotted stall throughout the exhibition hours",
          "Vendors shall not leave their stall unattended to visit, socialize, or spend time at other vendors' stalls during exhibition hours",
          "If a vendor needs to leave temporarily, an authorized representative must remain at the stall",
        ],
      },
    ],
  },
  {
    id: "stall-occupancy",
    number: "14",
    title: "Stall Occupancy",
    icon: FaThLarge,
    groups: [
      {
        items: [
          "A maximum of two (2) representatives are permitted per stall during the exhibition",
          "Only the registered vendor and one authorized representative may manage the stall unless prior written approval has been obtained from Rang Manch Exhibition",
          "Additional persons accompanying the vendor may be denied entry or asked to leave the exhibition area",
          "Rang Manch Exhibition reserves the right to enforce this policy to ensure smooth event management, visitor comfort, security, and fair utilization of exhibition space",
        ],
      },
    ],
  },
  {
    id: "stall-cleanliness",
    number: "15",
    title: "Stall Cleanliness",
    icon: FaBroom,
    groups: [
      {
        items: [
          "Vendors are responsible for maintaining cleanliness in and around their stall throughout the exhibition",
          "Waste must be disposed of only in designated bins or areas",
        ],
      },
    ],
  },
  {
    id: "code-of-conduct",
    number: "16",
    title: "Code of Conduct",
    icon: FaHandshake,
    groups: [
      {
        items: [
          "Vendors, their staff, and representatives must behave professionally and respectfully at all times",
          "Any abusive language, harassment, threats, discrimination, physical altercation, intoxication, or misconduct is strictly prohibited",
          "Any act that disrupts the event, inconveniences visitors or other vendors, or harms the reputation of Rang Manch Exhibition will not be tolerated",
          "Rang Manch Exhibition reserves the right to issue warnings, remove the vendor without refund, permanently restrict future participation, and report serious incidents to the appropriate authorities",
        ],
      },
    ],
  },
  {
    id: "photography-promotion",
    number: "17",
    title: "Photography & Promotion",
    icon: FaCameraRetro,
    groups: [
      {
        items: [
          "The organizer may photograph or record the event",
          "Vendors grant Rang Manch Exhibition permission to use photographs and videos of their stall, products, brand, logo, and representatives for promotional, advertising, website, and social media purposes without additional compensation",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    number: "18",
    title: "Intellectual Property",
    icon: FaCopyright,
    groups: [
      {
        items: [
          "Vendors confirm that they own or have legal permission to use all products, trademarks, logos, photographs, and promotional materials displayed during the exhibition",
          "Any legal dispute relating to intellectual property shall be the sole responsibility of the vendor",
        ],
      },
    ],
  },
  {
    id: "food-vendors",
    number: "19",
    title: "Food Vendors (If Applicable)",
    icon: FaUtensils,
    groups: [
      {
        items: [
          "Food vendors must comply with all applicable food safety and hygiene regulations",
          "Vendors shall be solely responsible for the quality and safety of the food served",
        ],
      },
    ],
  },
  {
    id: "insurance",
    number: "20",
    title: "Insurance",
    icon: FaUmbrella,
    paragraphs: [
      "Vendors are responsible for arranging any insurance they consider necessary for their products, equipment, staff, or public liability.",
    ],
  },
  {
    id: "emergency-procedures",
    number: "21",
    title: "Emergency Procedures",
    icon: FaFirstAid,
    paragraphs: [
      "Vendors must immediately follow all instructions issued by the organizer or venue management during emergencies, including evacuation procedures.",
    ],
  },
  {
    id: "children-guests",
    number: "22",
    title: "Children & Personal Guests",
    icon: FaChild,
    paragraphs: [
      "Vendors bringing children, family members, or personal guests are solely responsible for their supervision, safety, and conduct.",
    ],
  },
  {
    id: "compliance",
    number: "23",
    title: "Compliance",
    icon: FaCheckSquare,
    groups: [
      {
        items: [
          "Vendors must comply with all venue rules, fire safety regulations, and instructions issued by the organizer",
          "Failure to comply may result in immediate removal from the exhibition without refund",
        ],
      },
    ],
  },
  {
    id: "limitation-liability",
    number: "24",
    title: "Limitation of Liability",
    icon: FaBalanceScale,
    paragraphs: [
      "Rang Manch Exhibition and the venue management shall not be liable for any direct, indirect, incidental, consequential, financial, or business loss, theft, injury, or damage suffered by any vendor before, during, or after the exhibition.",
    ],
  },
  {
    id: "no-defamation",
    number: "25",
    title: "No Defamation",
    icon: FaCommentSlash,
    paragraphs: [
      "Vendors shall not make false, misleading, defamatory, or harmful statements about Rang Manch Exhibition, its organizers, sponsors, venue, visitors, or fellow vendors.",
    ],
  },
  {
    id: "final-decision",
    number: "26",
    title: "Organizer's Final Decision",
    icon: FaGavel,
    paragraphs: [
      "All decisions made by Rang Manch Exhibition regarding stall allocation, participation, event management, disputes, interpretation of these Terms & Conditions, and any matter relating to the exhibition shall be final and binding on all vendors.",
    ],
  },
  {
    id: "governing-law",
    number: "27",
    title: "Governing Law",
    icon: FaMapMarkedAlt,
    groups: [
      {
        items: [
          "These Terms & Conditions shall be governed by the laws of India",
          "Any dispute arising from participation in Rang Manch Exhibition shall be subject to the exclusive jurisdiction of the courts at Jaipur, Rajasthan",
        ],
      },
    ],
  },
  {
    id: "acceptance",
    number: "28",
    title: "Acceptance",
    icon: FaSignature,
    isDeclaration: true,
    paragraphs: [
      "By registering, booking a stall, making payment, or participating in the exhibition, the vendor confirms that they have read, understood, and agreed to abide by all the above Terms & Conditions.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Small renderers                                                     */
/* ------------------------------------------------------------------ */

function BulletList({ items }) {
  return (
    <ul className="space-y-3 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <FaCheckCircle className="text-pink-500 mt-1 flex-shrink-0" size={14} />
          <p className="text-gray-600 leading-relaxed">{item}</p>
        </li>
      ))}
    </ul>
  );
}

function DeclarationBlock() {
  return (
    <div className="mt-4 bg-pink-50 rounded-2xl p-5 space-y-3">
      <p className="font-semibold text-[#1e2a55]">Vendor Declaration</p>
      <p className="text-gray-600 leading-relaxed">
        I hereby declare that I have carefully read and understood the Vendor
        Agreement & Terms & Conditions of Rang Manch Exhibition. I voluntarily
        agree to comply with all rules and regulations. I understand that
        failure to comply may result in cancellation of my participation
        without refund and may affect my eligibility for future exhibitions.
      </p>
    </div>
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

export default function Terms() {
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
            <FaFileContract />
            Terms & Conditions
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#1e2a55]">
            Vendor Agreement, <span className="text-pink-500">Clearly Stated</span>
          </h1>

          <p className="max-w-3xl mx-auto mt-5 text-gray-600 text-lg leading-relaxed">
            Rang Manch Exhibition — the rules, responsibilities, and
            agreements that apply when you register, book a stall, or
            participate in our exhibitions.
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
            {/* Intro card */}
            <div className="bg-white rounded-[28px] shadow-lg border border-pink-100 p-6 md:p-7">
              <p className="text-gray-600 leading-relaxed">
                By registering, booking a stall, making payment, or
                participating in Rang Manch Exhibition, the vendor confirms
                that they have read, understood, and agreed to the following
                Terms & Conditions.
              </p>
            </div>

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

                        {s.isDeclaration && <DeclarationBlock />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact / Closing note */}
            <div className="bg-white rounded-[28px] shadow-lg border border-pink-100 p-6 md:p-7">
              <div className="flex items-center gap-4 mb-1">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <FaEnvelope size={18} />
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-[#1e2a55] leading-snug">
                  Questions About These Terms?
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                Reach out to us for any clarification regarding vendor
                registration, stall bookings, or these Terms & Conditions.
              </p>
              <ContactBlock />
            </div>

            
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-[28px] p-8 text-center text-white shadow-xl">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to book your stall?</h3>
                <p className="text-pink-50 mb-5">
                    Our team is happy to walk you through registration and answer
                    any questions about these terms.
                </p>
                <Link href="/contact">
                    <div
                        href="mailto:rangmanchexhibition@gmail.com"
                        className="inline-flex items-center gap-2 bg-white text-pink-600 font-semibold px-6 py-3 rounded-2xl hover:scale-[1.02] transition"
                    >
                        <FaEnvelope />
                        Contact Us
                    </div>
                </Link>
                </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}