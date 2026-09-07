# 🙏 Ganesh Utsav 2026 — Sheth Parivar

A digital Ganpati invitation for **Sarju Sheth, Komal Sheth & Family**.
Bappa's Darshan on **14th, 15th & 16th September**, Bhayandar West.

Built as a plain static site — no framework, no build step, no dependencies.
Open `index.html` and it runs.

---

## The flow

| # | Section | What happens |
|---|---------|--------------|
| 1 | **Curtain** | Two gold mandap panels with a wax seal in the middle (`गणपती बाप्पा मोरया`). Tap it and the curtains part. |
| 2 | **Hero** | A shrine — arch, pillars, swinging bells, lit diyas and a brass Ganesha under a rotating halo, with a marigold toran strung across the top. Text fades in line by line. |
| 3 | **Invitation** | Page 1 of the invite, next to the portrait of Sarju & Komal in an arched gold frame. |
| 4 | **Darshan** | The three days as a timeline. Tap any day for a detail card. |
| 5 | **Family** | The family portrait, framed in purple and gold. |
| 6 | **Venue** | Address, timings, and a Google Maps button. |
| 7 | **Footer** | Closing blessings and a share button. |

Floating controls: a **music toggle** (top-right) and a **पुष्पांजली** button (bottom-right) that showers petals and keeps a count in `localStorage`.

---

## Running it

```bash
# any static server works
python -m http.server 8000
# then open http://localhost:8000
```

Append `?skip` to the URL to land past the curtain — handy when previewing or re-sharing.

## Deploying

It's static, so drop the folder on any host:

- **Vercel** — `vercel --prod` (or import the repo; no build command, output dir `.`)
- **GitHub Pages** — Settings → Pages → deploy from `main` / root
- **Netlify** — drag the folder in

---

## Files

```
index.html          markup + the inline SVG symbol library (Ganesha, bell, diya,
                    lotus, kalash, marigold, pin, clock, calendar)
css/styles.css      all styling; design tokens live in :root at the top
js/app.js           curtain, scroll reveals, generated ornaments (mandala, rays,
                    toran), petals, audio, day modal, share
assets/
  family-elders.webp   Sarju & Komal (background removed, cropped)
  family-young.webp    the family (background removed, cropped)
  og-cover.jpg         WhatsApp / social share preview
  og-card.html         source for og-cover.jpg — screenshot at exactly 1200×630
  favicon.svg
```

## Editing the content

Everything is plain text in `index.html`:

- **Dates and days** — the `<ol class="timeline">` block, plus the `DAYS` object in `js/app.js` for the tap-through detail cards.
- **Address** — the `.venue-address` block, and the `href` on `#mapsBtn`.
- **Names** — `.footer-family`, `.portrait-cap`, and the `<meta property="og:*">` tags.

Colours are CSS custom properties in `:root` (`css/styles.css`), so retheming is a
handful of hex values.

## Sound

The music toggle looks for `assets/aarti.mp3` first. If that file isn't there — it
isn't, by default — it falls back to a **synthesised temple ambience**: a soft
tanpura-style drone with a temple bell struck every few seconds, generated live
with the Web Audio API. Drop an `aarti.mp3` into `assets/` to use a real recording
instead; no code change needed.

## Notes

- Devanagari is set in *Tiro Devanagari Marathi*; display type is *Yatra One*.
- Mandala, sun rays and the marigold toran are generated in JS, not shipped as
  images. The toran is redrawn on resize at true pixel scale so the marigolds stay
  round.
- Respects `prefers-reduced-motion` — petals, dust and parallax switch off.
- Photos are the family's own caricature stickers, matted to transparency.

---

🙏 **मंगलमूर्ती मोरया** 🙏
