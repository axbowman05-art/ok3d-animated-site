import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote — OK3D Prints",
  description:
    "Request a quote for your 3D printing project. No minimum orders, no setup fees.",
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
