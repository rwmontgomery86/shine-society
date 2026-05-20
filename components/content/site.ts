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
    d: "Call or text 706-938-8694, or send the booking form. We'll reply within an hour during business hours.",
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
    a: "Yes — custom quote. Use the booking form below or call directly.",
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

export const serviceOptions = [
  "Exterior",
  "Interior",
  "Inside & Out",
  "Membership",
  "Ceramic / Correction",
] as const;

export const dayOptions = ["This week", "Next week", "Flexible"] as const;

export const contactMethodOptions = ["Text", "Call", "Email"] as const;

export const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export const bookingCopy = {
  leadParagraph:
    "Tell us a little about your ride. We’ll text you back with a slot — usually within an hour during business hours.",
  finePrint:
    "By submitting, you agree to receive a text reply at the number above. 24-hour notice for reschedules; same-day cancellations may forfeit the 10% deposit on ceramic / paint correction work.",
  submitIdle: "Request a slot →",
  submitSending: "Sending…",
  submitSent: "✓ Request received",
  successHeadline: "Got it — talk soon.",
  successBody:
    "We’ll text you shortly to confirm details and availability. If you don’t hear back within an hour during business hours, call or text 706-938-8694.",
  errorHeadline: "Something went wrong.",
  errorBody:
    "Your request didn’t go through. Please try again, or text/call 706-938-8694 directly.",
  tierChipPrefix: "Tier:",
} as const;

// Copy shown only when a membership tier is preselected (booking form arrived
// via #book?tier=…). Payment is not collected on the site — Urable handles
// the quote → card-on-file → recurring billing flow after the first detail.
// `{tier}` is replaced with the tier display name (e.g., "Premium").
// (The in-form notice is now the receipt-style MembershipBanner component;
// these strings drive the post-submit success state copy.)
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
      "Pets? Pet hair? Tar? Headlights cloudy? Tell us what we’re walking into.",
  },
} as const;

export const bookingErrorMessages = {
  nameRequired: "Please enter your name.",
  phoneRequired: "We need a phone number to text you back.",
  phoneInvalid: "That phone number doesn’t look right.",
  emailInvalid: "That email doesn’t look right.",
  emailRequiredForContact: "Add an email if you’d prefer email contact.",
  vehicleSizeRequired: "Pick a vehicle size.",
  serviceRequired: "Pick a service.",
  dayRequired: "Pick a timing window.",
  contactMethodRequired: "Pick a contact method.",
  vehicleYearInvalid: "Use a 4-digit year.",
  generic: "Please check the highlighted fields.",
} as const;
