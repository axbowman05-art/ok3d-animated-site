import { siteConfig } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-cta flex items-center justify-center text-background font-bold text-xs">
              3D
            </div>
            <span className="font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-white transition-colors"
            >
              {siteConfig.email}
            </a>
            <span className="hidden md:inline">|</span>
            <span>{siteConfig.phone}</span>
          </div>

          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
