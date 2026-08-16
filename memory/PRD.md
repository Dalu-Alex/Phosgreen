# Phosgreen — PRD

## Original Problem Statement
Premium single-page marketing website for Phosgreen, a solar panel servicing & maintenance company in Kerala, India. React + Tailwind, dark luxury aesthetic with exact brand tokens (black/emerald/silver), smooth-scroll anchor nav, hero, why-maintenance, company overview with animated counters, 5-step process timeline, 7 services, 5 case studies, contact section with validated "Request a Service Audit" form + dark map, footer, floating WhatsApp, mobile sticky call bar, full SEO (title/meta/OG/LocalBusiness JSON-LD), uploaded logo in navbar/footer/favicon.

## Architecture
- Frontend: React 19 + Tailwind (craco), single-page anchor layout, components in `src/components/site/`, content data in `src/data/site.js`, theme tokens as CSS vars in `index.css` + Tailwind config.
- Backend: FastAPI (`server.py`) — `POST /api/service-requests` (validated, consent required, stores in MongoDB), `GET /api/service-requests`.
- Database: MongoDB via MONGO_URL/DB_NAME, `service_requests` collection.
- Assets: logo at `/public/logo.jpeg`, favicon + apple-touch-icon generated from it.

## User Personas
- Kerala homeowners with rooftop solar seeing output drops.
- Commercial/industrial/institutional facility managers needing AMC and diagnostics.

## Implemented (2026-08-16)
- Full single-page site: Hero, Why Maintenance (6 cards), Overview (animated counters 14/30%/100%/6), 5-step Process timeline, 7 Services, 5 Case Studies, Contact (info card + dark map + validated form), Footer (4 cols, 14 districts, legal links, socials).
- Sticky frosted navbar with scroll-spy active highlighting; full-screen mobile menu; floating WhatsApp FAB; mobile sticky Call + WhatsApp bar.
- Exact brand tokens, metallic gradient headings, emerald gradient accents, noise overlay, emerald radial glows, reveal-on-scroll animations with stagger.
- SEO: title, meta description, keywords, OG/Twitter tags (logo as image), LocalBusiness JSON-LD with address/phone/hours.
- Backend service-request API with validation + consent enforcement; form success/error states end-to-end.

## Verified
- Backend: valid POST returns 201 + id; missing consent → 422; bad email → 422; GET list returns stored requests.
- Frontend: hero/sections render, form validation on empty submit, full form submission shows "Request Received", mobile menu + sticky bar work.

## Backlog
- P1: Email notification (e.g. Resend) to info@phosgreen.com on each new service request.
- P1: Admin view for service requests (currently GET endpoint only).
- P2: Legal pages content (Terms/Privacy/Cookie currently placeholder links).
- P2: Real photography/gallery in case studies.
