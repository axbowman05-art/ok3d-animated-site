# OK3D Prints — Tonight's Session Guide
> Last updated: 2026-03-31

---

## Your Tasks (need your accounts/decisions)

### 1. Calendly Setup
- Create free account at calendly.com
- Set up a "30-min Free Consultation" event
- Copy your booking URL
- In the project, find all `https://calendly.com/ok3dinc` (there are 3 occurrences) and replace with your real link:
  - `src/components/sections/Hero.tsx`
  - `src/components/sections/CTA.tsx`
  - `src/app/quote/page.tsx`

### 2. Buy a Domain
Check availability in this order at Namecheap or Cloudflare Registrar (Cloudflare charges at-cost, best for renewals):
1. **ok3dprints.com** (~$12/yr) — top pick, perfect brand match
2. **ok3dprint.com** (~$12/yr) — solid backup
3. **ok3d.io** (~$40/yr) — only if .com is taken

### 3. Finalize All Section Text
Review each section in `src/lib/content.ts` — the copy has been rewritten for the new model but you may want to adjust tone/specifics:
- **Hero** — headline is now "You bring the idea. We handle the rest." Adjust if needed.
- **Process** — Step 1 is now "Describe" (tell us what you need, no file required)
- **Gallery** — now labeled "RECENT BUILDS" / "OUR WORK"
- **Testimonials** — REPLACE with real testimonials from your actual customer/supervisor. 3 is ideal.
- **CTA** — secondary text "or schedule a consultation" is there, wired to Calendly

### 4. Social Media
Add Instagram and/or LinkedIn links to the footer (`src/components/layout/Footer.tsx`). Even brand-new accounts build trust over no presence. Great for showing prints.

### 5. Deploy to Vercel
1. Go to vercel.com → New Project → Import from GitHub
2. Select `axbowman05-art/ok3d-animated-site`
3. Add environment variables:
   - `HUB_API_URL` = your Hub server URL
   - `RESEND_API_KEY` = from resend.com dashboard
   - `NOTIFY_EMAIL` = email you want quote notifications sent to
4. Deploy. Connect your domain after purchase.
5. After domain is live: verify Resend sender domain (add DNS records)

---

## Audit Checklist

### Customer POV
- [ ] Hero — clear within 3 seconds? "No file needed" obvious?
- [ ] Mobile: hero → quote form → success screen (full flow)
- [ ] Quote form friction — any confusing fields?
- [ ] Calendly CTA visible and contextually makes sense
- [ ] Testimonials feel real and relevant
- [ ] Contact info easy to find (phone, email, footer)
- [ ] `/products` empty state makes sense to a first-time visitor
- [ ] Test a bad URL — does 404 page look good?

### Owner POV
- [ ] Submit a real test quote → check Hub + both emails arrive
- [ ] Owner notification email has everything you need to respond
- [ ] Customer confirmation email looks professional (note: shows `onboarding@resend.dev` until domain verified)
- [ ] GA4 firing — check Google Analytics real-time view
- [ ] Rate limit — submit 6 quotes quickly, confirm 429 block on 6th
- [ ] Add a test product to `content.ts` products array → confirm it shows on `/products`

### Security Audit
- [ ] Confirm `.env.local` is NOT in GitHub repo (check github.com/axbowman05-art/ok3d-animated-site)
- [ ] Test form with 2001+ char description — should reject
- [ ] Test form with `<script>alert(1)</script>` in fields — should be escaped in emails
- [ ] Check Network tab: no env vars or Hub API keys visible to browser
- [ ] Security headers now in `next.config.mjs` (added this session: X-Frame-Options, CSP, HSTS, etc.)

### Structural / Technical
- [ ] `npm run build` — zero TypeScript errors (run now before reviewing)
- [ ] Browser console — zero errors on load
- [ ] New content.ts exports wired in components (done this session):
  - `processMobileFallback` in Process.tsx ✅
  - `galleryContent.sectionLabel` in Gallery.tsx ✅
  - `ctaContent.ctaSecondaryText` rendered below CTA button ✅
  - `quoteFormContent` placeholder in quote form Step 2 ✅
- [ ] Lighthouse (Chrome DevTools → Lighthouse tab) — aim for 90+ performance, 100 accessibility
- [ ] All 6 STL models load in gallery viewer
- [ ] Animations work on mobile (or gracefully degrade)
- [ ] Sitemap: visit `/sitemap.xml` — returns valid XML
- [ ] Robots: visit `/robots.txt` — looks correct

### Things You're Missing (fix before launch)
- [ ] **Privacy Policy page** — you're collecting name, email, phone. Add `/privacy` with a basic policy.
- [ ] **Cookie/analytics consent** — GA4 tracking without consent banner. Add a minimal banner.
- [ ] **Favicon** — no favicon in `/public`. Add one (even a simple "OK" or gear icon as a PNG).
- [ ] **Phone/email as tappable links** — verify `tel:` and `mailto:` links work on mobile
- [ ] **Resend sender domain** — fix after domain purchase. Update `FROM_EMAIL` env var.

---

## Outreach (ok3d-outreach/)

5 prospects have real contact emails now. When ready:
1. Open `drafts/` folder — review each email, personalize as needed
2. Set `"status": "approved"` in `targets.json` for ones you want to send
3. Wire `scripts/send.js` — uncomment Gmail App Password block (fastest setup)
4. Send in batches of 3-5, not all at once

Top targets to prioritize:
1. **FIRST Mid-Atlantic Robotics** (frc@midatlanticrobotics.com) — highest reach
2. **Gazzam Machine** (hpgazzam@verizon.net) — perfect fit, Pittsburgh
3. **Creative Rod & Kustom** (Mark@creativerodandkustom.com) — local PA, automotive

---

## GitHub
Repo: `github.com/axbowman05-art/ok3d-animated-site` (private)
Branch: `main`
Status: all today's work is committed and pushed
