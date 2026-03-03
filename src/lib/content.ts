import { Capability, Material, ProcessStep, GalleryItem, Testimonial } from "./types";

export const siteConfig = {
  name: "OK3D Prints",
  tagline: "Precision Parts. On Demand.",
  description:
    "Functional 3D printing for businesses that need reliable parts, fast turnaround, and engineering-grade quality.",
  email: "hello@ok3dprints.com",
  phone: "(555) 123-4567",
};

export const heroContent = {
  preHeadline: "PRECISION PARTS. ON DEMAND.",
  headline: "We turn your designs into functional parts",
  subheadline:
    "Engineering-grade 3D printing for businesses. From prototype to production — reliable, fast, and built to spec.",
  ctaPrimary: "Get a Quote",
  ctaSecondary: "See Our Work",
  industries: [
    "Aerospace",
    "Automotive",
    "Medical",
    "Robotics",
    "Consumer Products",
    "Industrial",
  ],
};

export const capabilities: Capability[] = [
  {
    title: "Materials",
    stat: "6+",
    statNumber: 6,
    statSuffix: "+",
    description:
      "Engineering-grade materials including PLA, PETG, ABS, Nylon, TPU, and Resin — each selected for specific mechanical properties.",
    icon: "cube",
  },
  {
    title: "Tolerances",
    stat: "±0.2mm",
    statNumber: 0.2,
    statSuffix: "mm",
    description:
      "Precision printing with tolerances as tight as ±0.2mm. Every part is measured and verified before shipping.",
    icon: "precision",
  },
  {
    title: "Turnaround",
    stat: "5-7 days",
    statNumber: 5,
    statSuffix: "-7 days",
    description:
      "Standard turnaround of 5-7 business days from approved design to delivery. Rush options available.",
    icon: "clock",
  },
];

export const materials: Material[] = [
  {
    name: "PLA",
    color: "#22c55e",
    colorClass: "from-green-500/20",
    properties: ["Biodegradable", "High detail", "Low warp"],
    useCases: "Prototypes, display models, low-stress parts",
  },
  {
    name: "PETG",
    color: "#0ea5e9",
    colorClass: "from-sky-500/20",
    properties: ["Chemical resistant", "Flexible", "Food-safe"],
    useCases: "Mechanical parts, outdoor use, containers",
  },
  {
    name: "ABS",
    color: "#f59e0b",
    colorClass: "from-amber-500/20",
    properties: ["Heat resistant", "Impact tough", "Machinable"],
    useCases: "Enclosures, automotive, high-temp applications",
  },
  {
    name: "Nylon",
    color: "#8b5cf6",
    colorClass: "from-violet-500/20",
    properties: ["Wear resistant", "Self-lubricating", "Strong"],
    useCases: "Gears, bearings, structural components",
  },
  {
    name: "Resin",
    color: "#f43f5e",
    colorClass: "from-rose-500/20",
    properties: ["Ultra-fine detail", "Smooth finish", "Rigid"],
    useCases: "Jewelry, dental, miniatures, precision parts",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Upload",
    description:
      "Send us your CAD files — STL, STEP, 3MF, or OBJ. We accept all major formats. No account needed.",
    icon: "upload",
  },
  {
    number: "02",
    title: "Review",
    description:
      "Our engineers review your design for printability, suggest optimizations, and send a detailed quote within 24 hours.",
    icon: "review",
  },
  {
    number: "03",
    title: "Print",
    description:
      "We print your parts with calibrated machines and verified settings. Every part is inspected for dimensional accuracy.",
    icon: "print",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Parts are carefully packaged and shipped with tracking. Standard delivery in 5-7 business days, rush available.",
    icon: "deliver",
  },
];

export const galleryItems: GalleryItem[] = [
  { title: "Custom Enclosure", material: "PETG", industry: "Electronics" },
  { title: "Gear Assembly", material: "Nylon", industry: "Robotics" },
  { title: "Bracket Mount", material: "ABS", industry: "Automotive" },
  { title: "Fluid Connector", material: "PETG", industry: "Medical" },
  { title: "Precision Housing", material: "Resin", industry: "Aerospace" },
  { title: "Cable Guide", material: "PLA", industry: "Industrial" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "OK3D delivered 200 custom brackets in under a week. Quality was spot-on, and they caught a wall thickness issue we missed. Saved us from a costly reprint.",
    author: "Marcus Chen",
    company: "RoboFlow Systems",
    role: "Lead Mechanical Engineer",
  },
  {
    quote:
      "We switched from injection molding for small runs. The cost savings are significant, and the PETG parts hold up in our outdoor installations without any issues.",
    author: "Sarah Mitchell",
    company: "GreenGrid Energy",
    role: "Operations Director",
  },
  {
    quote:
      "The resin prints for our dental aligners are incredibly precise. The surface finish is smooth enough to use directly from the printer. Very impressed with the consistency.",
    author: "Dr. James Park",
    company: "Park Dental Studio",
    role: "Founder",
  },
];

export const ctaContent = {
  headline: "Ready to Build?",
  subheadline:
    "Tell us about your project and get a detailed quote within 24 hours. No minimum orders, no setup fees.",
  ctaText: "Request a Quote",
  fallback: "Or email us directly at",
};

export const materialOptions = [
  "PLA",
  "PETG",
  "ABS",
  "Nylon",
  "TPU",
  "Resin",
  "Not sure — need recommendation",
];

export const quantityOptions = [
  "1-10 parts",
  "11-50 parts",
  "51-200 parts",
  "200+ parts",
];

export const deadlineOptions = [
  "No rush",
  "Within 2 weeks",
  "Within 1 week",
  "ASAP (rush)",
];
