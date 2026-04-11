# Google Search Console — Manual Indexing Checklist

Follow these steps after every deployment to ensure Google can discover and index invisionnetwork.org.

---

## 1. Verify Site Ownership in Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.invisionnetwork.org` (URL-prefix method)
3. Choose **HTML meta tag** verification method
4. Confirm the meta tag in `index.html` matches:
   ```html
   <meta name="google-site-verification" content="7d90b5b18423192a" />
   ```
5. Alternatively, the HTML file at `/google7d90b5b18423192a.html` also satisfies file-based verification
6. Click **Verify**

---

## 2. Submit Sitemap

1. In GSC → **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Confirm status shows **Success** (not errors)
5. Expected URLs: ~50+ (all routes in `public/sitemap.xml`)

---

## 3. Request Indexing for Priority Pages

Use **URL Inspection** tool in GSC for each high-priority page:

| Page | URL |
|------|-----|
| Homepage | `https://www.invisionnetwork.org/` |
| Training/Workshops | `https://www.invisionnetwork.org/training` |
| Business/AI | `https://www.invisionnetwork.org/business` |
| About | `https://www.invisionnetwork.org/about` |
| Contact | `https://www.invisionnetwork.org/contact` |
| FAQ | `https://www.invisionnetwork.org/faq` |
| Digital Library | `https://www.invisionnetwork.org/library` |
| Resources | `https://www.invisionnetwork.org/resources` |
| Articles | `https://www.invisionnetwork.org/articles` |

For each URL:
1. Paste URL into the inspection bar
2. Click **Request Indexing**
3. GSC will crawl within hours to days

---

## 4. Verify Crawlability (No-JS Fallback)

The site is a React SPA — Googlebot may not execute JavaScript fully on first crawl.
A `<noscript>` block in `index.html` provides crawlable content as a safety net.

To verify Google can read the noscript content:
1. GSC → URL Inspection → paste homepage URL
2. Click **View Crawled Page** → **HTML** tab
3. Confirm you see "InVision Network — AI Scam Protection" text in the raw HTML
4. If not visible, the noscript block may not be rendering — check `index.html`

---

## 5. Check for Indexing Errors

In GSC → **Pages** report:
- **Discovered — currently not indexed**: Normal for new site, submit via URL Inspection
- **Crawled — currently not indexed**: Google crawled but chose not to index. Check for thin content.
- **Excluded by noindex tag**: Should only apply to `/admin`, `/portal`, `/auth`, `/login`
- **Redirect error**: Check Vercel rewrites in `vercel.json`

---

## 6. Monitor Rich Results

After indexing begins (1–4 weeks), check:
- GSC → **Search results** → confirm impressions and clicks appear
- GSC → **Enhancements** → check LocalBusiness schema status
- [Rich Results Test](https://search.google.com/test/rich-results): test homepage URL for LocalBusiness and WebSite schema

---

## 7. After Each Deployment

- [ ] Update `<lastmod>` dates in `public/sitemap.xml` for changed pages
- [ ] Re-submit sitemap in GSC
- [ ] Use URL Inspection to request re-indexing of changed pages
- [ ] Verify `dist/robots.txt`, `dist/sitemap.xml`, `dist/llms.txt` exist in build output

---

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Static shell — noscript fallback, meta tags, structured data |
| `src/components/SEO.tsx` | React Helmet — injects per-page title/description/canonical |
| `public/robots.txt` | Crawler access rules |
| `public/sitemap.xml` | All indexable URLs with lastmod dates |
| `public/llms.txt` | AI crawler discovery (Perplexity, ChatGPT, Claude) |
| `public/google7d90b5b18423192a.html` | Google Search Console HTML file verification |
