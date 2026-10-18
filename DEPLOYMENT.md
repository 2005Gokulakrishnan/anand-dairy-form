# Deployment

## Static hosting

Upload the contents of this folder to the document root of a static host (for example, a VPS web root, Netlify, Cloudflare Pages or another static hosting provider). Configure the domain and HTTPS at the host. Keep `index.html` at the site root.

## VPS with Nginx (example)

1. Copy the project contents to `/var/www/anand-dairy-farms`.
2. Configure an Nginx server block with `root /var/www/anand-dairy-farms;` and `index index.html;`.
3. Set `try_files $uri $uri/ =404;` for static file serving.
4. Enable HTTPS using your hosting provider's certificate workflow.
5. Add the production domain to canonical metadata and JSON-LD before launch.

## Before launch

- Configure verified phone and WhatsApp details.
- Replace the Maps search link with the exact listing URL.
- Confirm the full postal address, business hours, products, prices, payment methods and delivery areas.
- Replace demo photography with licensed/owner-provided assets.
- Add a backend if you need durable enquiry/order storage, payment processing, admin tools or customer accounts.
- Submit `sitemap.xml` in Google Search Console after domain launch.
