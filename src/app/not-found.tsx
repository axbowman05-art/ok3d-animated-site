import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0074FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">
          Error 404
        </p>
        <h1 className="text-7xl sm:text-9xl font-bold text-foreground mb-2">
          4
          <span className="text-accent">0</span>
          4
        </h1>
        <p className="text-muted text-lg sm:text-xl max-w-md mx-auto mb-10">
          This page didn&apos;t make it off the print bed. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center font-semibold rounded-lg px-8 py-3.5 text-base bg-cta hover:bg-cta-dark text-background shadow-lg shadow-cta/25 hover:shadow-cta/50 transition-all duration-300 active:scale-[0.97]"
          >
            Back to Home
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center font-medium rounded-lg px-8 py-3.5 text-base border border-border hover:border-accent/50 text-gray-300 hover:text-white transition-all duration-300 active:scale-[0.97]"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
