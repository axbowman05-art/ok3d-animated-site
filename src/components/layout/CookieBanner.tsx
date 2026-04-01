"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("ok3d-cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function respond(decision: "accepted" | "declined") {
    localStorage.setItem("ok3d-cookie-consent", decision);
    window.dispatchEvent(new CustomEvent("cookieConsent", { detail: decision }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#0D1117] border border-[#0074FF]/30 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl shadow-black/60 backdrop-blur-sm">
        <p className="text-sm text-gray-400 flex-1 leading-relaxed">
          We use analytics cookies to understand how visitors use our site.{" "}
          <Link
            href="/privacy"
            className="text-[#0074FF] hover:underline underline-offset-2"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => respond("declined")}
            className="text-sm text-gray-500 hover:text-white transition-colors px-2 py-1"
          >
            Decline
          </button>
          <button
            onClick={() => respond("accepted")}
            className="text-sm bg-[#0074FF] hover:bg-[#005FCC] text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
