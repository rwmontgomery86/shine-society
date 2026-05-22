// Single source of truth for site copy.

export const contact = {
  phone: "706-938-8694",
  phoneTel: "tel:7069388694",
  hoursLong: "Mon–Fri · 8am–7pm  ·  Sat · 8am–4pm",
  hoursShort: "Mon–Fri 8a–7p · Sat 8a–4p",
  city: "Senoia, GA",
  serviceArea: "Senoia · Newnan · Peachtree City · Fayetteville · Griffin",
  // TODO confirm with owner: site says "EST. 2025" (first year in business as of 2026-05).
  established: "2025",
  travelFee: "Senoia + 40-mile radius. $0.60/mile beyond.",
  leadTime: "24–48 hours typical",
};

export const heroCopy = {
  rail: ["EST. 2025", "SENOIA · GA"],
  eyebrow: "Mobile detailing — we come to you",
  headline: "Detail. Like it's our own.",
  sub: "Restored, protected, elevated — without leaving your driveway. Ceramic coating, paint correction, and full-service interior & exterior detailing across Senoia, Newnan, Peachtree City, Griffin & Fayetteville.",
  stats: [
    { strong: "5★", label: "Mobile service" },
    { strong: "6 mo.", label: "Paint protection" },
    { strong: "40 mi", label: "Free service area" },
  ],
};

export const marqueeItems = [
  "Foam Bath",
  "Hand Wash",
  "Clay Bar",
  "Paint Correction",
  "Ceramic Coating",
  "Pet Hair Removal",
  "Interior Deep Clean",
  "Wheel & Rim Detail",
  "Tire Dressing",
  "Bug Removal",
  "Streak-Free Glass",
  "Door Jamb Detail",
];

export type Service = {
  n: string;
  title: string;
  // TODO owner: tiered prices per vehicle size + time estimates.
  // "from $X" anchors are placeholders until real numbers arrive.
  price: string;
  lead: string;
  featured?: boolean;
  bullets: string[];
  note?: string;
  image: string;
};

export const services: Service[] = [
  {
    n: "01",
    title: "Exterior Detail",
    price: "from $120",
    image: "/exterior-detail.jpg",
    lead: "Foam bath, hand wash, clay bar, and a six-month paint sealant — finished with a streak-free glass cleanup.",
    bullets: [
      "Foam bath + hand wash",
      "Bug removal",
      "Wheel + rim deep clean",
      "Tire dressing",
      "Clay bar treatment",
      "Paint sealant — 6 mo. protection",
      "Exterior glass — streak-free shine",
    ],
  },
  {
    n: "02",
    title: "Interior Detail",
    price: "from $140",
    image: "/interior-detail.jpg",
    lead: "Floors, carpets and trunk vacuumed deep. Plastics dressed, cracks detailed, mats cleaned.",
    bullets: [
      "Deep vacuum (floor, carpet, trunk)",
      "Full surface wipe-down",
      "Plastics cleaned + dressed (dash, door panels, etc.)",
      "Cracks + crevices detailed",
      "Floor mats cleaned",
      "Interior glass — streak-free shine",
      "Door jamb + trunk cleaned",
    ],
  },
  {
    n: "03",
    title: "Inside & Out",
    price: "from $220",
    image: "/inside-and-out.jpg",
    lead: "The full reset. Everything in interior and exterior plus a six-month spray sealant.",
    featured: true,
    bullets: [
      "Everything in Interior Detail",
      "Everything in Exterior Detail",
      "Spray sealant — 6 mo. protection",
      "Interior + exterior glass — streak-free",
      "Door jamb + trunk cleaned",
    ],
  },
  {
    n: "04",
    title: "Add-ons",
    price: "à la carte",
    image: "/add-ons.jpg",
    lead: "Targeted upgrades for stubborn problems. Quoted on inspection.",
    note: "Ceramic coating + paint correction require a 10% deposit to book.",
    bullets: [
      "Pet hair removal",
      "Paint correction (1- or 2-stage)",
      "Ceramic coating",
      "Headlight restoration",
      "Engine bay clean",
      "Spot stain treatment",
      "Leather conditioning",
    ],
  },
];

export type Tier = {
  id: string;
  name: string;
  kicker: string;
  featured?: boolean;
  sedan: number;
  suv: number;
  bullets: string[];
};

export const memberships: Tier[] = [
  {
    id: "essential",
    name: "Essential",
    kicker: "Maintenance Plan",
    sedan: 99,
    suv: 119,
    bullets: [
      "Exterior hand wash",
      "Wheel & tire cleaning",
      "Tire dressing",
      "Interior vacuum",
      "Wipe-down of interior surfaces",
      "Interior windows cleaned",
      "Spray protection refresh",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    kicker: "Best Seller",
    featured: true,
    sedan: 149,
    suv: 169,
    bullets: [
      "Everything in Essential",
      "Door jamb cleaning",
      "Air blowout of cracks/crevices",
      "Floor mats cleaned",
      "Premium interior wipe-down",
      "Ceramic topper protection",
      "Priority scheduling",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    kicker: "Protection Plan",
    sedan: 199,
    suv: 229,
    bullets: [
      "Everything in Premium",
      "Quarterly mini interior deep clean",
      "Spot stain treatment",
      "Leather conditioning (if applicable)",
      "Trim conditioning",
      "Express spray sealant every visit",
      "10% off correction & coating upgrades",
    ],
  },
];

export const membershipRules = [
  { sym: "↻", text: "Auto-pay required" },
  { sym: "✓", text: "Full \"Reset\" detail required to start" },
  { sym: "✕", text: "30-day cancellation notice" },
  { sym: "!", text: "Excessive dirt or pet hair may cost extra" },
  { sym: "↺", text: "Missed months may require reset fee" },
];

export const processSteps = [
  {
    n: "01",
    t: "Book online or text",
    d: "Pick a service online, or call/text 706-938-8694. We'll reply within an hour during business hours.",
  },
  {
    n: "02",
    t: "We come to you",
    d: "Mobile setup at home or work — water, power, and supplies all on us. The rig is fully self-contained.",
  },
  {
    n: "03",
    t: "Detail in 2–4 hrs",
    d: "Interior, exterior, or full reset. Walkthrough before we leave so you see the difference up close.",
  },
  {
    n: "04",
    t: "Drive away new",
    d: "Sealed, dressed, and protected. Optional monthly membership keeps it that way.",
  },
];

export type City = {
  name: string;
  d: string;
  drive: string;
  zip: string;
};

export const cities: City[] = [
  { name: "Senoia", d: "Home base · same-day", drive: "0", zip: "30276" },
  { name: "Peachtree City", d: "~7 mi N", drive: "15", zip: "30269" },
  { name: "Fayetteville", d: "~12 mi NE", drive: "20", zip: "30214" },
  { name: "Newnan", d: "~14 mi NW", drive: "20", zip: "30263" },
  { name: "Griffin", d: "~17 mi E", drive: "25", zip: "30223" },
  { name: "McDonough", d: "~25 mi NE", drive: "30", zip: "30253" },
  { name: "LaGrange", d: "~28 mi SW", drive: "35", zip: "30240" },
  { name: "Barnesville", d: "~28 mi SE", drive: "35", zip: "30204" },
  { name: "Manchester", d: "~31 mi S", drive: "40", zip: "31816" },
];

export const aboutCopy = {
  body: [
    "At Shine Society Detailing, we specialize in bringing vehicles back to life with professional mobile detailing services you can trust. Based in Senoia, GA, we proudly serve Senoia and the surrounding Central Georgia areas with convenience, quality, and attention to detail that stands out.",
    "We're not just here to clean your vehicle — we're here to restore, protect, and elevate it.",
    "From deep interior detailing and pet hair removal to exterior detailing, paint correction, and ceramic coating, every service is performed with precision and care. Whether your vehicle needs a quick refresh or a full transformation, we treat every job like it's our own.",
  ],
  differentiators: [
    { t: "We come to you", d: "Home or work — fully mobile rig, water + power onboard." },
    { t: "No shortcuts", d: "Only thorough, high-quality work. Period." },
    { t: "Results that speak for themselves", d: "Every detail backed by a final walkthrough." },
  ],
};

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How far do you travel?",
    a: "Senoia + 40-mile radius covered. Beyond that, we charge $0.60 per mile travel fee.",
  },
  {
    q: "How far in advance should I book?",
    a: "24–48 hours is typical. Call or text 706-938-8694 for last-minute availability.",
  },
  {
    q: "What happens if it rains?",
    a: "We can't detail in active rain — we'll reschedule at no charge. Ceramic coatings also need 50°F+ to apply, so cold snaps may push a coating job a few days.",
  },
  {
    q: "Do you require a deposit?",
    a: "Only for ceramic coating and paint correction (10% to book). Standard details — pay after the job.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes — 24-hour notice for reschedules. Same-day cancellations may forfeit the deposit on ceramic / paint correction work.",
  },
  {
    q: "Do you do fleets or commercial vehicles?",
    a: "Yes — custom quote. Call or text 706-938-8694 to scope the job.",
  },
  {
    q: "What do you need from my driveway?",
    a: "Nothing. The rig is fully self-contained — water, power, and supplies all on us.",
  },
];

// TODO: replace with real Google Reviews. The owner's share link 404'd
// when fetched; ask him to copy/paste 3 reviews verbatim with reviewer
// first name + city.
export type Testimonial = { q: string; n: string; c: string };

export const testimonials: Testimonial[] = [
  {
    q: "Pulled up to my driveway, left it looking better than the day I bought it. Genuinely the best detail I've had.",
    n: "Marcus T.",
    c: "Newnan, GA · Black on black sedan",
  },
  {
    q: "Membership pays for itself. My SUV stays show-ready and I never lift a finger.",
    n: "Jenna R.",
    c: "Peachtree City · Premium member",
  },
  {
    q: "Pet hair gone. Like, gone-gone. Two big shedding dogs and you would never know.",
    n: "Cole H.",
    c: "Senoia · Interior detail",
  },
];

export const vehicleSizes = [
  "Sedan",
  "Midsize SUV",
  "Large SUV",
  "Truck",
  "3-row",
] as const;

export const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

// One-time detailing, ceramic, and paint correction bookings happen on
// Urable's hosted virtual-shop pages — one URL per category. These are
// public URLs (shown to anyone clicking the "Book" CTA) so we hardcode
// them here rather than treat them as secrets.
export type BookingOption = {
  id: "detailing" | "ceramic" | "paint-correction";
  n: string;
  title: string;
  blurb: string;
  priceFrom: string;
  included: string[];
  urableUrl: string;
};

export const bookingOptions: BookingOption[] = [
  {
    id: "detailing",
    n: "01",
    title: "Detailing Services",
    blurb:
      "Exterior, interior, or the full inside & out. Pricing by vehicle size — pick your slot in a few clicks.",
    priceFrom: "from $150",
    included: [
      "Exterior · Interior · Inside & Out",
      "Live pricing per vehicle size",
      "Pick a date + time at checkout",
    ],
    urableUrl:
      "https://app.urable.com/virtual-shop/SSf5ARzQCjpDT2k96hYK/ltc85r0H6FrAMWP5J9Lu",
  },
  {
    id: "ceramic",
    n: "02",
    title: "Ceramic Coating",
    blurb:
      "1, 3, or 5-year protection — prep, paint correction, and curing all included. 10% deposit at booking.",
    priceFrom: "from $429",
    included: [
      "1, 3, and 5-year options",
      "Full prep + decontamination",
      "Hydrophobic, UV-stable finish",
    ],
    urableUrl:
      "https://app.urable.com/virtual-shop/SSf5ARzQCjpDT2k96hYK/j1dnu8cjhqVC3L5PN7eR",
  },
  {
    id: "paint-correction",
    n: "03",
    title: "Paint Correction",
    blurb:
      "Single-stage enhancement up to multi-stage correction — restore the gloss before a coating.",
    priceFrom: "from $299",
    included: [
      "Level 1 · 2 · 3 options",
      "Swirl + scratch removal",
      "Pairs with ceramic for a full reset",
    ],
    urableUrl:
      "https://app.urable.com/virtual-shop/SSf5ARzQCjpDT2k96hYK/aoVYIXXU8uWfK3psgwwi",
  },
];

export const bookingPickerCopy = {
  kicker: "— Pick a service",
  leadParagraph:
    "Choose a category to see live pricing and pick a slot — booking opens in our scheduling tool. Fleet or commercial? Call or text directly.",
  ctaLabel: "Book online →",
  fine: "Bookings open in a new tab. Need help choosing? Call or text 706-938-8694.",
} as const;

export const membershipFormCopy = {
  kicker: "— Start your membership",
  leadParagraph:
    "Tell us about your ride. We’ll text to confirm your first “Reset” detail — after that visit, we’ll send a quote in Urable to set up your card on file and start monthly auto-pay.",
  finePrint:
    "By submitting, you agree to receive a text reply at the number above. Full “Reset” detail required to start; 30-day cancellation notice; auto-pay activates after your first detail.",
  submitIdle: "Start membership →",
  submitSending: "Sending…",
  submitSent: "✓ Request received",
  errorHeadline: "Something went wrong.",
  errorBody:
    "Your request didn’t go through. Please try again, or text/call 706-938-8694.",
  backLinkLabel: "Booking a one-time detail instead?",
} as const;

// Copy shown after a successful membership submission. `{tier}` is replaced
// with the tier display name (e.g., "Premium"). Payment is not collected on
// the site — Urable handles the quote → card-on-file → recurring billing flow
// after the first detail.
export const membershipBookingCopy = {
  successHeadline: "Got it — welcome to the {tier} plan.",
  successBody:
    "We’ll text you shortly to confirm your first detail. After that visit, we’ll send a quick quote in Urable to set up your card on file — auto-pay kicks in from there. Questions? Call or text 706-938-8694.",
} as const;

export const bookingFieldLabels = {
  name: { label: "Your name", placeholder: "First & last" },
  phone: { label: "Phone", placeholder: "(404) 555-0188" },
  email: { label: "Email (optional)", placeholder: "you@example.com" },
  city: { label: "City or ZIP", placeholder: "Senoia, 30276" },
  vehicleYear: { label: "Year", placeholder: "2022" },
  vehicleMake: { label: "Make", placeholder: "Ford" },
  vehicleModel: { label: "Model", placeholder: "F-150" },
  notes: {
    label: "Anything else?",
    placeholder:
      "Pets? Pet hair? Coatings already on the paint? Anything we should know.",
  },
} as const;

export const bookingErrorMessages = {
  nameRequired: "Please enter your name.",
  phoneRequired: "We need a phone number to text you back.",
  phoneInvalid: "That phone number doesn’t look right.",
  emailInvalid: "That email doesn’t look right.",
  vehicleSizeRequired: "Pick a vehicle size.",
  vehicleYearInvalid: "Use a 4-digit year.",
  tierRequired: "Pick a membership tier.",
  generic: "Please check the highlighted fields.",
} as const;
