"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  magnetic = true,
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reducedMotion = useReducedMotion();

  const enableMagnetic = magnetic && !isMobile && !reducedMotion;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableMagnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 active:scale-[0.97]";

  const variantClasses =
    variant === "primary"
      ? "bg-cta hover:bg-cta-dark text-background font-semibold shadow-lg shadow-cta/25 hover:shadow-cta/50"
      : "border border-border hover:border-accent/50 text-gray-300 hover:text-white";

  const sizeClasses =
    size === "lg" ? "px-8 py-3.5 text-base" : "px-6 py-2.5 text-sm";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const style = enableMagnetic
    ? {
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
      }
    : undefined;

  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={allClasses}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
