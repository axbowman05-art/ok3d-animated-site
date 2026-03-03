import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const WhatWeDo = dynamic(() => import("@/components/sections/WhatWeDo"), {
  ssr: false,
});
const Materials = dynamic(() => import("@/components/sections/Materials"), {
  ssr: false,
});
const Process = dynamic(() => import("@/components/sections/Process"), {
  ssr: false,
});
const Gallery = dynamic(() => import("@/components/sections/Gallery"), {
  ssr: false,
});
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  { ssr: false }
);
const CTA = dynamic(() => import("@/components/sections/CTA"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <Materials />
      <Process />
      <Gallery />
      <Testimonials />
      <CTA />
    </main>
  );
}
