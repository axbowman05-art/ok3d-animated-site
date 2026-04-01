"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

const GA_ID = "G-YWEV5YTC78";

export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("ok3d-cookie-consent") === "accepted") {
      setConsented(true);
    }
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") setConsented(true);
    };
    window.addEventListener("cookieConsent", handler);
    return () => window.removeEventListener("cookieConsent", handler);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
