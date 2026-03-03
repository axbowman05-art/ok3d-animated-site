interface GridPatternProps {
  className?: string;
}

export default function GridPattern({ className = "" }: GridPatternProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.04 }}
    >
      <defs>
        <pattern
          id="grid-dots"
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-dots)" />
    </svg>
  );
}
