"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
}

export default function TypeWriter({
  text,
  speed = 60,
  delay = 500,
  className = "",
  cursor = true,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          // Blink cursor a few times then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayed}
      {cursor && showCursor && (
        <span className="animate-pulse text-cta">|</span>
      )}
    </span>
  );
}
