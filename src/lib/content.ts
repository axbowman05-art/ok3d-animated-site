import { Capability, Material, ProcessStep, GalleryItem, Testimonial } from "./types";

export const siteConfig = {
  name: "OK3D Prints",
  tagline: "Have an Idea? We'll Build It.",
  description:
    "Custom 3D printing for businesses and individuals. Describe what you need — we handle the design, engineering, and production.",
  email: "ok3dinc@gmail.com",
  phone: "(562) 273-6603",
};

export const heroContent = {
  preHeadline: "CUSTOM PARTS. NO FILE NEEDED.",
  headline: "You bring the idea.",
  headlineAccent: "We handle the rest.",
  subheadline:
    "Engineering-grade 3D printing on demand. Describe what you need in plain English — we'll design, quote, and build it.",
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
    title: "Describe",
    description:
      "Tell us what you need in plain English — dimensions, function, material preferences, or just a rough idea. No CAD file required. If you have one, great. If not, we'll figure it out together.",
    icon: "upload",
  },
  {
    number: "02",
    title: "Review & Quote",
    description:
      "Our engineers review your request, work through the design details with you, and send a detailed quote within 24 hours. We'll flag any questions before we start.",
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

export const processMobileFallback = "From idea to finished part";

export const galleryContent = {
  sectionLabel: "RECENT BUILDS",
  sectionHeading: "OUR WORK",
};

export const galleryItems: GalleryItem[] = [
  {
    title: "Press Beater Redesign",
    material: "PLA",
    industry: "Manufacturing",
    modelUrl: "/models/Press Beater (redesigned).stl",
  },
  {
    title: "Press Beater Base",
    material: "PLA",
    industry: "Manufacturing",
    modelUrl: "/models/Press Beater- Bottom.stl",
  },
  {
    title: "Large Spiral (CW)",
    material: "Nylon",
    industry: "Industrial",
    modelUrl: "/models/Spiral- large (clockwise).stl",
  },
  {
    title: "Large Spiral (CCW)",
    material: "Nylon",
    industry: "Industrial",
    modelUrl: "/models/Spiral- large (counterclockwise).stl",
  },
  {
    title: "Small Spiral (CW)",
    material: "PETG",
    industry: "Industrial",
    modelUrl: "/models/Spiral- small (clockwise).stl",
  },
  {
    title: "Small Spiral (CCW)",
    material: "PETG",
    industry: "Industrial",
    modelUrl: "/models/Spiral- small (counterclockwise).stl",
  },
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
    "Describe your part and get a detailed quote within 24 hours. No minimum orders, no setup fees — and no file needed to get started.",
  ctaText: "Request a Quote",
  ctaSecondaryText: "or schedule a consultation",
  fallback: "Or email us directly at",
};

export const quoteFormContent = {
  step2DescriptionLabel: "Tell us what you need",
  step2DescriptionPlaceholder:
    "e.g. 'I need a mounting bracket about 3 inches wide, needs to hold 2 lbs, outdoor use' — plain English is fine, no file needed",
  successMessage:
    "We'll review your project and reach out within 24 hours with questions or a quote.",
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

export interface Product {
  id: string;
  name: string;
  material: string;
  price: number;
  description: string;
  image: string;
  category: string;
  available: boolean;
}

export const products: Product[] = [
  // Products are added here as custom orders are completed and listed for retail
  // Example shape:
  // {
  //   id: "press-beater-redesign",
  //   name: "Press Beater Redesign",
  //   material: "PLA",
  //   price: 0,
  //   description: "...",
  //   image: "/products/press-beater.jpg",
  //   category: "Industrial",
  //   available: false
  // }
];
