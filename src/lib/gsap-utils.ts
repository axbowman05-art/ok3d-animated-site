"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Always register — this module is only imported client-side
gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (
  element: gsap.TweenTarget,
  trigger?: Element | string,
  delay = 0
) => {
  return gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: "power3.out",
      scrollTrigger: trigger
        ? {
            trigger: trigger as gsap.DOMTarget,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        : undefined,
    }
  );
};

export const staggerFadeInUp = (
  elements: gsap.TweenTarget,
  trigger: Element | string,
  stagger = 0.15
) => {
  return gsap.fromTo(
    elements,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

export const scaleIn = (
  element: gsap.TweenTarget,
  trigger: Element | string,
  delay = 0
) => {
  return gsap.fromTo(
    element,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: trigger as gsap.DOMTarget,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

export { gsap, ScrollTrigger };
