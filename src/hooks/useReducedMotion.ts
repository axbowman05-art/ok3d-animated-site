"use client";

// Force animations ON — user explicitly wants all animations
// regardless of Windows "reduce animations" setting
export function useReducedMotion(): boolean {
  return false;
}
