# Sangati Foundation — Website Documentation & Editing Guide

Welcome to the **Sangati Foundation** official website repository. This website is built for persons with disability, prioritizing WCAG 2.2 AA accessibility, fast page loads, keyboard navigation, and clear typed content editing.

---

## 🚀 Quickstart for Developers

To run the site locally for development:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

To create a static production build:

```bash
npm run build
```

The output will be placed in the `out/` folder, ready to deploy to any web host (GitHub Pages, Netlify, Vercel, or traditional cPanel hosting) with zero server configuration required.

---

## 📝 How to Edit Text & Content (For Non-Technical Editors)

All copy across the entire website is stored inside the `/content` folder. **You do NOT need to edit code components or React files to change text, dates, numbers, or addresses.**

Simply open any of the `.ts` files listed below in any text editor (like Notepad, VS Code, or TextEdit):

| File to Edit | What Content It Controls |
|---|---|
| `content/organization.ts` | Helpline number, official address, mission line, founder names, social media handles. |
| `content/home.ts` | Homepage hero headline, subtitle, 4 stat counter numbers, "Who We Are" intro, gallery images. |
| `content/about.ts` | Founding story, "संGati — Nomads on Wheels" poem, founder's epigraph, leadership team bios. |
| `content/programs.ts` | Exact descriptions, stats, quotes, and partner lists for all 6 programmes. |
| `content/yatra.ts` | Sangati Yatra 2024–25 6,000 km ride story, flag-off details, and station stops on the route map. |
| `content/impact.ts` | Impact numbers and year-by-year milestone timeline from 2019 to 2025. |
| `content/stories.ts` | Inspirational stories (e.g. Nehal's Autism book, Nizamuddin station transformation, Half-Marathon team). |
| `content/news.ts` | Posters archive titles, dates, categories, and flyer image filenames. |
| `content/getInvolved.ts` | Volunteer roles, corporate partnership benefits, and needed donated equipment. |
| `content/donate.ts` | Donation tiers (₹500, ₹1,000, ₹2,500, ₹5,000), impact descriptions, 80G tax receipt info, and bank details. |
| `content/contact.ts` | Toll-free helpline, operational hours, branch office addresses (Gurgaon, Jodhpur, Bathri). |
| `content/accessibility.ts` | Official Accessibility Statement, compliance standards, and feedback contacts. |

### How to Edit Text in Content Files
1. Open the file (e.g., `content/organization.ts`).
2. Change the text inside the quotation marks:
   ```ts
   // Example:
   helpline: '1800 102 1622',
   ```
3. Save the file. The website updates automatically!

---

## ♿ Built-In Accessibility Features

- **WCAG 2.2 AA / AAA Contrast**: High-contrast near-black green (`#10231C`) on warm off-white (`#F7F4EC`) with deep teal (`#1F6F5C`), marigold (`#E8A33D`), and terracotta (`#C25436`).
- **Accessibility Toolbar**: Fixed bottom-left widget for instant text scaling (A / A+ / A++), High Contrast mode, and Reduced Motion override (persisted in `localStorage`).
- **Keyboard Operability**: Visible 2px focus ring with 2px offset on every interactive element. Skip-to-content link as first focusable element.
- **Accessible Forms**: Form fields bound to `<label>` tags with dynamic screen reader error announcements (`aria-live="polite"`).

---

## 🎨 Color Palette Reference

- `--ink`: `#10231C` (Primary Text & Borders)
- `--field`: `#F7F4EC` (Page Background)
- `--road`: `#1F6F5C` (Primary Brand & Buttons)
- `--marigold`: `#E8A33D` (Accents, Station Dots & Stat Numbers)
- `--clay`: `#C25436` (Donate CTAs Only)
- `--mist`: `#DCE5E0` (Card Backgrounds & Dividers)

---

## 🏢 Contact & Support

For website updates or technical support, contact **Sangati Foundation** at `contact@sangati.org` or call national toll-free helpline **1800 102 1622**.
