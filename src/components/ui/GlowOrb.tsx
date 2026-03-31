interface GlowOrbProps {
  color?: string;
  size?: number;
  className?: string;
}

export default function GlowOrb({
  color = "#0074FF",
  size = 400,
  className = "",
}: GlowOrbProps) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] pointer-events-none animate-float ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
      }}
    />
  );
}
