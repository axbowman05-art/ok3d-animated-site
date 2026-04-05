"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { Product } from "@/lib/content";

const STLViewer = dynamic(() => import("@/components/ui/STLViewer"), {
  ssr: false,
});

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(0,116,255,0.04)",
        border: "1px solid rgba(0,116,255,0.15)",
        boxShadow: "0 0 24px rgba(0,116,255,0.06)",
      }}
    >
      {/* 3D viewer */}
      <div
        className="h-48 w-full relative overflow-hidden"
        style={{ background: "rgba(0,42,94,0.4)" }}
      >
        {product.modelUrl ? (
          <STLViewer modelUrl={product.modelUrl} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
              {product.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white">{product.name}</h3>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full shrink-0"
            style={{
              background: "rgba(0,116,255,0.12)",
              color: "#0074FF",
              border: "1px solid rgba(0,116,255,0.2)",
            }}
          >
            {product.material}
          </span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-white">
            {product.price === 0 ? "Quote required" : `$${product.price.toFixed(2)}`}
          </span>
          <Link
            href={`/quote?part=${encodeURIComponent(product.name)}`}
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all active:scale-[0.97]"
            style={{
              backgroundColor: "#FFDD00",
              color: "#0A0A0A",
            }}
          >
            Get This Part
          </Link>
        </div>

        {!product.available && (
          <p className="text-xs text-gray-600 mt-3 font-mono">
            Currently unavailable — request a custom build
          </p>
        )}
      </div>
    </div>
  );
}
