# SPEC — Knowledge Sidekick business site standard

Canonical style guide for knowledgesidekick.com.
Read this file before creating or editing any page, and use the QA checklist at the end to test that a page follows it.

## 1. Purpose and use

This is the single source of truth for how the .com site looks, is structured, and is written. The .com site is the business side of Knowledge Sidekick. It covers applications, use cases, case studies, company news, and services for organizations adopting knowledge-first systems.

The site is practical and commercial, but it is not a marketing site. It should stay plain, specific, and evidence-led.

## 2. Site variants

Two published sites share one system: knowledgesidekick.org (the educational and reference site) and knowledgesidekick.com (the business site). The layout, component rules, typography, and QA checklist are shared. The content scope differs.

| Token | .org | .com (business) |
|---|---|---|
| purpose | education and reference | applications, use cases, case studies, company news, services |
| --accent, --ks-color | #1e6f5c green | #2563eb blue |
| --accent-ink / --accent-soft | #145247 / #e6f2ef | #1a4fbd / #eaf1fb |
| --bg | #faf9f6 | #fbfaf7 |
| header chip | .org | .com |
| everything else | shared | shared |

The only visual colour difference is the accent family and the subtle background tint. All spacing, layout, and editorial rules below apply to the business site too.

## 3. Stack and build

- Static HTML. No framework. Served on GitHub Pages; the stylesheet is referenced as an absolute path (/style.css), so local preview must run over HTTP (python -m http.server), not file://.
- Shared chrome lives in the same repo: nav.js, style.css, and the HTML pages themselves. Keep shared chrome byte-stable unless a deliberate change is needed.
- Site-wide styles live in root style.css only. CSS-level changes propagate to every page; do not hand-edit inline styles on pages unless a page already uses a small inline exception and you are replacing it with a shared rule.
- Navigation is built by nav.js from a single object at the top of the file. Add a new page there (one line) and keep items under their section labels.

## 4. Page anatomy (the canonical skeleton)

Use the current .com pages as the reference answer sheet. Order:

1. doctype, html lang="en", head with charset + viewport
2. <title>Title — Knowledge Sidekick</title>
3. meta description (one or two plain sentences, no marketing)
4. link rel=canonical (absolute .com URL)
5. og: / twitter: meta (title, description, article vs website, url, image favicon or logo)
6. JSON-LD: WebPage (or FAQPage with mainEntity for the FAQ) in type application/ld+json
7. <body class="page-...">, skip link, site-header with .chip
8. optional .tagband > .wk headline
9. <main id="main"> > hero section with kicker, h1, lede, meta
10. content wrapper with sections in a stable order
11. closing provenance line, footer, and nav script

## 5. Chromatic system

Colours come from CSS custom properties on :root only. Never hardcode hex in a page. The blue accent is the .com business-site variant.

## 6. Typography and spacing (compact model — do not regress)

Base: body 15px, line-height 1.6; headings line-height 1.25, weight 650.

| Element | Size | Margin |
|---|---|---|
| h1 | clamp(22px, 3vw, 30px) | 0 0 14px |
| h2 | clamp(18px, 2.4vw, 23px) | 18px 0 12px |
| h3 | 17px | 14px 0 8px |
| p | 15px | 0 0 14px |
| pre | — | 0 0 16px |
| li | — | 0 0 6px |

Container rules: .wrap max-width 1140px, padding 0 24px. .page padding 14px 0 24px. section scroll-margin-top 84px. .hero padding 50px 0 16px, its .wrap grid gap 16px, h1 max-width 30ch, .meta font-size 13.5px with flex gap 18px. The first section after the hero gets a 12px top margin on its h2. .faq h2 20px. The FAQ block is compact: .faq-section margin-top 18px, its h2 margin-bottom 10px, .faq .q padding 12px 18px, and .faq .a padding 4px 18px 6px with line-height 1.55. Answer paragraphs inside .faq .a have margin 0 so there is no extra blank space after the text. .foot-note max-width 100ch 12.5px/1.55. .src-line 12.5px. .sources 12.5px, its h2 13px uppercase with letterspacing.

The vertical rhythm rule: heading spacing is explicit and uniform (h2 top 18px, h3 top 14px), NOT the browser default and NOT ad-hoc per-section values. Do not add per-component top margins that break the 18/14 rhythm. The .faq-section border sits at margin-top 18px; .sources at 32px (its deliberate labelled block).

## 7. Voice and editorial rules

- First-person, direct, plain. No marketing voice and no AI-slop phrasing.
- The site is for business education and reference, not marketing. No hype, no sensational pull messages, no attention-grabbing false claims.
- Claims should be research-backed and data-backed where possible, with primary sources cited.
- Headings never end with a period.
- No em dashes, en dashes, or tildes anywhere (use commas, colons, or spaced hyphens where a range reads naturally).
- Restrained prose; state the finding plainly. Never use filler like "not merely rank it".
- Terminology should stay concrete and business-facing. Use plain company language before abstract language.
- Keep the provenance line as "Page updated <date>." one sentence, no trailing decoration; the date matches the <time> element and JSON-LD dateModified.

## 8. Components

Documented set: hero (.kicker, h1, .lede, .meta breadcrumb); content section (id-ed h2 body); .faq-section > .faq > .q/.a accordion (role=button, aria-expanded, toggle script at page end); .sources (ol of cited links, one line each); figures (.ks-figure > .fig-scroll > svg.kg with <title>+<desc> and a figcaption); .callout; .challenge; .scene; .pattern; .bio-card; .blog-card; .limits list. Use these classes; do not invent new ones without adding them to style.css and this file.

## 9. Page types and routes

Landing: index.html (hero: title, lede, meta with a business-side contact point).
Core business-site pages: applications, use cases, case studies, company news, services, offerings, contact, about, and any supporting pages needed for those topics.
A page should answer one business question clearly. If it is a case study, show the company, the problem, the approach, and the result. If it is a news page, state what changed and why it matters.

## 10. Metadata and a11y

- Every page: canonical, description, og/twitter, JSON-LD, robots follow.
- Skip link to #main; FAQ rows are keyboard-activable (Enter/Space); the toggle updates aria-expanded. Keep colour contrast within the token palette. Figures carry <title> and <desc> for assistive tech.

## 11. Figures

Graphs are inline SVG (class kg) with a <title>, <desc>, letter-role legend (T/I/O/B) and a figcaption. Reuse the existing auto-count sentence pattern; do not paste decorative or unrelated imagery.

## 12. Change workflow

1. Changes are proposed in the chat and diffs shown first.
2. Files are written to the local working tree only after the user says "update local".
3. After a batch, a LOCAL commit is suggested; no push happens on its own.
4. Remind the user to PUSH after 3 to 5 accumulated changes. Nothing reaches the live site until the user pushes.

## 13. QA / conformance checklist

Run this before calling a page done:

- [ ] Starts with the skeleton in §4; body class, skip link, chip present.
- [ ] style.css is the only stylesheet; no inline styles or new hardcoded hex.
- [ ] Heading margins obey the §6 rhythm (h2 18px, h3 14px top); nothing floats.
- [ ] No closing-period headings; no em/en dashes or tildes in text.
- [ ] Voice is first-person, plain, no AI-slop or marketing filler.
- [ ] "concept scheme" spelled correctly and used in its normative sense.
- [ ] The page is clear about the business side of Knowledge Sidekick: applications, use cases, case studies, company news, or services.
- [ ] canonical/description/og/JSON-LD present and matching the page.
- [ ] FAQ rows accessible and toggle script present if a FAQ exists.
- [ ] Provenance line "Page updated <date>." matches <time> and dateModified.
- [ ] Sources are real, cited, reachable links; the figure has title/desc/caption.
- [ ] Renders with a hard refresh (Ctrl+Shift+R); spacing compact at 1140px and on a narrow window. No layout regressions in landscape or on a phone.
