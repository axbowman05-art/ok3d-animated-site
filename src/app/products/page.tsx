import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/content";
import ProductCard from "@/components/ui/ProductCard";

export const metadata: Metadata = {
  title: "Shop | OK3D Prints",
  description:
    "Every product starts as a custom project. Once it's built and ready for retail, it lands here.",
  robots: { index: false, follow: false },
};

function EmptyState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,116,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,116,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Blue glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,116,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* Glow-bordered card */}
        <div
          className="rounded-2xl px-10 py-12"
          style={{
            background: "rgba(0,116,255,0.04)",
            border: "1px solid rgba(0,116,255,0.18)",
            boxShadow: "0 0 40px rgba(0,116,255,0.08), inset 0 0 40px rgba(0,116,255,0.03)",
          }}
        >
          {/* Label */}
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6">
            Shop
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Built to Order{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #0074FF, #FFDD00)" }}
            >
              Listed Here
            </span>
          </h1>

          <p className="text-gray-400 leading-relaxed mb-3">
            Every product starts as a custom project. Once it&apos;s built and
            ready for retail, it lands here.
          </p>

          <p className="text-sm text-gray-600 mb-10">
            Nothing here yet — but check back soon.
          </p>

          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-7 py-3 rounded-lg font-semibold text-sm transition-all active:scale-[0.97]"
            style={{
              backgroundColor: "#FFDD00",
              color: "#0A0A0A",
              boxShadow: "0 4px 24px rgba(255,221,0,0.25)",
            }}
          >
            Request a Custom Build
          </Link>
        </div>
      </div>
    </div>
  );
}


export default function ProductsPage() {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="min-h-screen px-6 pt-28 pb-20" style={{ backgroundColor: "#0A0A0A" }}>
      {/* Blueprint grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,116,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,116,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
            Shop
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Built to Order{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #0074FF, #FFDD00)" }}
            >
              Listed Here
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl">
            Every product starts as a custom project. Once it&apos;s built and
            ready for retail, it lands here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Don&apos;t see what you need?
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-7 py-3 rounded-lg font-semibold text-sm transition-all active:scale-[0.97]"
            style={{
              backgroundColor: "#FFDD00",
              color: "#0A0A0A",
              boxShadow: "0 4px 24px rgba(255,221,0,0.25)",
            }}
          >
            Request a Custom Build
          </Link>
        </div>
      </div>
    </div>
  );
}
