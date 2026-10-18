# Anand Dairy Farms website

A responsive, mobile-first dairy catalogue and enquiry website built with semantic HTML, CSS and vanilla JavaScript. It includes product search and filters, a persistent sample cart, order enquiry composition, configurable WhatsApp hand-off, local map-search link, FAQs and SEO metadata.

## Important business-data status

The public lookup performed for this build did **not** verify an exact Google Business Profile for “Anand Dairy Farms” at Oragadam, Ambattur. A nearby result named “ANAND.G.K” is a different business and has deliberately not been used. No phone, WhatsApp number, street address, business hours, rating, reviews, product prices or delivery zones have been invented. The catalogue is clearly labelled as demonstration content.

## Stack

- HTML5, CSS3 and vanilla JavaScript (no runtime framework or package dependencies)
- Google Fonts: Playfair Display and Inter (network required; system fallbacks included)
- Unsplash-hosted illustrative photography (network required)
- Browser localStorage for cart persistence
- WhatsApp Click-to-Chat URL for order/enquiry hand-off, after configuration

## Run locally

No build step is required. Open `index.html` in a browser, or run a local static server:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## Main files

- `index.html` – page structure, metadata and structured data
- `styles.css` – responsive design system and motion
- `app.js` – product catalogue, filters, cart, forms and WhatsApp message generation
- `config.js` – business configuration; update after owner confirmation
- `assets/logo.svg` – editable vector brand mark
- `privacy.html`, `terms.html` – starter policy pages

## Test checklist

- [x] Product categories and text search
- [x] Add items to cart and cart badge
- [x] Increase/decrease/remove cart quantities
- [x] Subtotal calculation and localStorage persistence
- [x] Checkout form validation and order message generation
- [x] Contact enquiry validation and message generation
- [x] WhatsApp deep-link when a valid number is configured; clipboard fallback when not configured
- [x] Responsive mobile navigation and cart drawer
- [x] FAQ accordion (native details/summary)
- [x] Reduced-motion preference support
- [x] SEO title, description, Open Graph, JSON-LD, sitemap and robots.txt
- [ ] Browser automation, real-device testing, live WhatsApp send, and production PageSpeed audit (not run in this environment)

## Production limitations

This is a static enquiry-first storefront, not a payment-enabled e-commerce backend. It does not create server-side orders, process payments, authenticate customers, track deliveries, or store customer submissions. Do not describe a WhatsApp message as a confirmed order. Add a secure backend and database if order persistence, admin management, payment or order status is required.
