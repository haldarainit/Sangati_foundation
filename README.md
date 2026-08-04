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

To create a production build:

```bash
npm run build
```

> **⚠️ The deployment model changed when the admin panel was added.**
> This site used to build with `output: 'export'` into a static `out/` folder
> that was copied to GitHub Pages. It now needs a running Node server, because
> the admin panel and the live content updates cannot work from static HTML.
> Deploy to **Vercel** (free tier is sufficient) — see *Deploying* below.
> The old `out/` folder is still committed and still serving the current live
> site; leave it until the Vercel deploy is live, then remove it.

---

## 🔐 Admin Panel Setup (one-time)

The site has an admin panel at **`/studio`** so the foundation can publish posts,
photos and page content without a developer. It is
[Sanity Studio](https://www.sanity.io/) embedded into this Next.js app — one
deploy, one domain, one login.

**Until this setup is done, nothing breaks**: every page falls back to the
original files in `content/`, and `/studio` shows setup instructions instead of
an error.

### 1. Create the Sanity project

1. Sign up free at [sanity.io](https://www.sanity.io/) → **Create new project**
2. Name it *Sangati Foundation*, dataset **production** (public)
3. Copy the **Project ID** from the dashboard

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.

Then create a write token at **sanity.io/manage → API → Tokens → Add API token**
(permissions: **Editor**) and put it in `SANITY_API_WRITE_TOKEN`.

> `.env.local` is git-ignored. Never commit it. The write token is only used by
> the one-time import below — **do not** add it to Vercel, since the website
> only ever reads from Sanity.

### 3. Import the existing content

```bash
npm run seed
```

This uploads every page, story, programme, poster, team member — and all 47
images from `public/` — into Sanity. Your client opens the panel and finds the
real website already there instead of a blank slate.

Safe to re-run: documents have fixed IDs and are replaced, and Sanity
de-duplicates images by file hash.

### 4. Allow the browser to reach Sanity

In **sanity.io/manage → API → CORS origins**, add:

- `http://localhost:3000` — *with credentials*
- your production URL — *with credentials*

### 5. Check it

```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio) and sign in.

### 6. Invite the client

**sanity.io/manage → Members → Invite**. Give them the **Editor** role, send
them the `/studio` link and [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

---

## 🚢 Deploying

1. Import this repository at [vercel.com/new](https://vercel.com/new)
2. Add the environment variables (**not** the write token):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_REVALIDATE_SECRET` — any long random string
3. Deploy, then point the domain at Vercel

### Instant updates (optional)

Published changes appear within 60 seconds by default. To make them appear
immediately, add a webhook in **sanity.io/manage → API → Webhooks**:

- **URL**: `https://your-domain/api/revalidate`
- **Trigger on**: Create, Update, Delete
- **Secret**: the same value as `SANITY_REVALIDATE_SECRET`

---

## 📝 How to Edit Text & Content

**For the foundation:** use the admin panel at `/studio` — see
[ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

**For developers:** the files below are the *fallback* content, used when Sanity
is unreachable or not yet configured. Once the panel is live, editing them no
longer changes the website — edit in `/studio` instead.

Contact details, organisation info, bank/80G details and the accessibility
statement are **not** in the panel and are still edited here.

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
