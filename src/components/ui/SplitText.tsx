"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.02,
  scrollTrigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".split-char");
    if (!chars.length) return;

    const tween = gsap.fromTo(
      chars,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: scrollTrigger
          ? {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          : undefined,
      }
    );

    return () => {
      tween.kill();
    };
  }, [delay, stagger, scrollTrigger, reducedMotion]);

  const words = children.split(" ");

  return (
    <Tag ref={containerRef as React.Ref<never>} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="split-char inline-block"
              style={reducedMotion ? undefined : { opacity: 0 }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
