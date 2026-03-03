export interface Capability {
  title: string;
  stat: string;
  statNumber: number;
  statSuffix: string;
  description: string;
  icon: "cube" | "precision" | "clock";
}

export interface Material {
  name: string;
  color: string;
  colorClass: string;
  properties: string[];
  useCases: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: "upload" | "review" | "print" | "deliver";
}

export interface GalleryItem {
  title: string;
  material: string;
  industry: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  role: string;
}

export interface QuoteFormData {
  // Step 1: Contact
  name: string;
  email: string;
  company: string;
  phone: string;
  // Step 2: Project
  material: string;
  quantity: string;
  description: string;
  deadline: string;
  // Step 3: File
  files: FileList | null;
  notes: string;
}
