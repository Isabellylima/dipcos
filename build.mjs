// Gera o site estático em /public a partir de src/content.mjs
// Uso: node build.mjs
import { mkdirSync, writeFileSync, cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { SITE, IMG, T, POSTS, PRODUCTS, ORDER } from "./src/content.mjs";

const OUT = "public";
const BUILD_DATE = new Date().toISOString().slice(0, 10);
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync("static", OUT, { recursive: true });

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (p) => SITE.url + p;
const fileFor = (p) => (p.endsWith("/") ? p + "index.html" : p + ".html");
const pages = []; // for sitemap
const write = (path, html, meta) => {
  const f = join(OUT, fileFor(path));
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, html);
  if (meta) pages.push({ path, ...meta });
};
const fmtDate = (iso, lang) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
const arrow = `<span class="arr" aria-hidden="true">→</span>`;
const addr = SITE.address;
const addressLine = `${addr.street}, ${addr.postalCode} ${addr.city}, Portugal`;

// ---------- structured data ----------
const ORG_ID = SITE.url + "/#organization";
const orgNode = () => ({
  "@type": ["Organization", "LocalBusiness"],
  "@id": ORG_ID,
  name: SITE.name,
  alternateName: ["DIPCOS", "Dipcos"],
  url: SITE.url + "/",
  logo: { "@type": "ImageObject", url: abs("/assets/img/logo-blue.png") },
  image: abs("/assets/img/og-image.png"),
  description: T.en.home.description,
  slogan: "Reliable energy. Real independence.",
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", streetAddress: addr.street, postalCode: addr.postalCode, addressLocality: addr.city, addressRegion: addr.region, addressCountry: addr.country },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  areaServed: [{ "@type": "Country", name: "Portugal" }, { "@type": "Place", name: "Europe" }],
  founder: { "@type": "Person", name: "JP Ajami" },
  knowsAbout: ["Battery energy storage systems", "LFP batteries", "Hybrid inverters", "Energy management", "Energy independence", "Backup power", "Solar energy storage", "Commercial and industrial energy storage"],
  knowsLanguage: ["en", "pt"],
  ...(SITE.social.length ? { sameAs: SITE.social.map((s) => s.url) } : {}),
});
const websiteNode = () => ({ "@type": "WebSite", "@id": SITE.url + "/#website", url: SITE.url + "/", name: SITE.name, publisher: { "@id": ORG_ID }, inLanguage: ["en", "pt-PT"] });
const crumbsNode = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});
const faqNode = (faq) => ({
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});
const servicesNode = (t) => ({
  "@type": "OfferCatalog",
  name: t.nav.services,
  itemListElement: t.tiers.map((tier) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: `${tier.name} (${tier.range})`, description: tier.body, serviceType: "Energy storage system", provider: { "@id": ORG_ID }, areaServed: "Europe" },
  })),
});

// ---------- layout ----------
function layout({ lang, path, title, description, alt, body, ld = [], image, type = "website", bodyClass = "", current, noindex = false }) {
  const t = T[lang];
  const other = lang === "en" ? "pt" : "en";
  const altPath = alt ?? null; // path in other language (null => none)
  const canonical = abs(path);
  const og = image || abs("/assets/img/og-image.png");
  const graph = { "@context": "https://schema.org", "@graph": [orgNode(), websiteNode(), { "@type": type === "article" ? "WebPage" : "WebPage", "@id": canonical + "#webpage", url: canonical, name: title, description, inLanguage: t.htmlLang, isPartOf: { "@id": SITE.url + "/#website" }, about: { "@id": ORG_ID } }, ...ld] };
  const hreflang = altPath
    ? [
        `<link rel="alternate" hreflang="${t.htmlLang}" href="${canonical}">`,
        `<link rel="alternate" hreflang="${T[other].htmlLang}" href="${abs(altPath)}">`,
        `<link rel="alternate" hreflang="x-default" href="${abs(lang === "en" ? path : altPath)}">`,
      ].join("\n")
    : "";
  const navItem = (key) => `<a href="${t.paths[key]}"${current === key ? ' aria-current="page"' : ""}>${t.nav[key]}</a>`;
  const langHref = altPath || T[other].paths.home;
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${canonical}">
${hreflang}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${og}">
<meta property="og:locale" content="${t.ogLocale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#0C0F11">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.squarespace-cdn.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css?v=${BUILD_DATE}">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${t.nav.skip}</a>
<header class="site-header">
  <div class="wrap">
    <a class="logo" href="${t.paths.home}" aria-label="Dipcos Energy"><img src="/assets/img/logo-white.png" alt="Dipcos Energy" width="160" height="69"></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav">${t.nav.menu}</button>
    <nav class="nav" id="nav" aria-label="Main">
      ${navItem("services")}${navItem("about")}${navItem("blog")}${navItem("shop")}${navItem("contact")}
      <a class="lang" href="${langHref}" hreflang="${T[other].htmlLang}" lang="${T[other].htmlLang}">${t.langLabel}</a>
      <a class="btn btn-primary" href="${t.paths.contact}">${t.nav.cta}</a>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="foot">
      <div>
        <img src="/assets/img/logo-white.png" alt="Dipcos Energy" width="160" height="69" loading="lazy">
        <p>${t.footer.tagline}</p>
        <p class="slogan">Reliable energy. Real independence.</p>
      </div>
      <div>
        <h2>${t.footer.explore}</h2>
        <ul>
          <li><a href="${t.paths.services}">${t.nav.services}</a></li>
          <li><a href="${t.paths.about}">${t.nav.about}</a></li>
          <li><a href="${t.paths.blog}">${t.nav.blog}</a></li>
          <li><a href="${t.paths.shop}">${t.nav.shop}</a></li>
          <li><a href="${t.paths.contact}">${t.nav.contact}</a></li>
        </ul>
      </div>
      <div>
        <h2>${t.footer.contact}</h2>
        <address>
          <a href="tel:${SITE.phoneHref}">${SITE.phone}</a><br>
          <a href="mailto:${SITE.email}">${SITE.email}</a><br><br>
          ${addr.street}<br>${addr.postalCode} ${addr.city}, Portugal
        </address>
        ${SITE.social.length ? `<ul style="margin-top:18px">${SITE.social.map((s) => `<li><a href="${s.url}" rel="me noopener" target="_blank">${s.name}</a></li>`).join("")}</ul>` : ""}
      </div>
    </div>
    <div class="sub-foot">
      <span>© ${new Date().getFullYear()} Dipcos Energy. ${t.footer.rights}</span>
      <a href="/terms">${t.footer.legal}</a>
    </div>
  </div>
</footer>
<script src="/assets/site.js?v=${BUILD_DATE}" defer></script>
</body>
</html>`;
}

// ---------- partials ----------
const tierCards = (t, linkBase) => `
<div class="scale-bar" aria-hidden="true"><div></div><div></div><div></div></div>
<div class="scale-axis" aria-hidden="true"><span>0 kW</span><span>50 kW</span><span>500 kW +</span></div>
<div class="tiers">
${t.tiers.map((tier) => `  <article class="tier">
    <div class="range">${tier.range}</div>
    <h3>${tier.name}</h3>
    <p>${tier.lead}</p>
    <a class="link" href="${linkBase}#${tier.id}">${t.tierLabels.more}</a>
  </article>`).join("\n")}
</div>`;

const faqBlock = (t, h) => `
<section class="section bg-white" aria-labelledby="faq-h">
  <div class="wrap faq-grid">
    <div><p class="eyebrow">${h.faqEyebrow}</p><h2 id="faq-h">${h.faqTitle}</h2></div>
    <div class="faq">
${t.faq.map(([q, a], i) => `      <details${i === 0 ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`).join("\n")}
    </div>
  </div>
</section>`;

const ctaBand = (t) => `
<section class="cta-band" aria-labelledby="cta-h">
  <img class="bg" src="${IMG.cta}" alt="" loading="lazy">
  <div class="wrap">
    <div><p class="eyebrow" style="color:var(--blue-light)">${t.nav.cta}</p><h2 id="cta-h">${t.home.ctaTitle}</h2><p class="lead" style="color:#C9D2D7">${t.home.ctaBody}</p></div>
    <div class="actions">
      <a class="btn btn-primary" href="${t.paths.contact}">${t.home.heroCta} ${arrow}</a>
      <a class="tel" href="tel:${SITE.phoneHref}"><small>${t.contact.phoneL}</small>${SITE.phone}</a>
    </div>
  </div>
</section>`;

const postCard = (p, lang, t) => `
<a class="card" href="/blog/${p.slug}" ${lang === "pt" ? 'hreflang="en"' : ""}>
  <img src="${p.image.replace("1500w", "750w")}" alt="" loading="lazy">
  <div class="body">
    <time datetime="${p.date}">${fmtDate(p.date, lang)}</time>
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <span class="link">${t.blog.read}</span>
  </div>
</a>`;

const pageHero = (t, { eyebrow, h1, lead, crumbs, img }) => `
<section class="page-hero${img ? " has-img" : ""} on-dark">
  ${img ? `<img class="bg" src="${img}" alt="" fetchpriority="high">` : ""}
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${t.paths.home}">Dipcos Energy</a> / ${crumbs}</nav>
    <p class="eyebrow">${eyebrow}</p>
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ""}
  </div>
</section>`;


// ---------- shop ----------
const money = (n, lang) => new Intl.NumberFormat(lang === "pt" ? "pt-PT" : "en-IE", { style: "currency", currency: "EUR" }).format(n);
const productNode = (p, lang, url) => ({
  "@type": "Product", "@id": url + "#" + p.id, name: `${p[lang].name} — ${p[lang].sub}`, sku: p.sku, mpn: p.sku,
  description: p[lang].desc.join(" "), image: abs("/assets/img/og-image.png"), brand: { "@type": "Brand", name: "Dipcos" },
  offers: { "@type": "Offer", url: url + "#" + p.id, price: p.price.toFixed(2), priceCurrency: "EUR", seller: { "@id": ORG_ID },
    priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.toFixed(2), priceCurrency: "EUR", valueAddedTaxIncluded: false } },
});
function productCard(p, lang) {
  const c = p[lang], o = ORDER[lang];
  const isBundle = p.id === "bundle";
  const specTitle = isBundle ? (lang === "pt" ? "O que inclui" : "What’s included") : (lang === "pt" ? "Especificações principais" : "Key specifications");
  const specs = isBundle
    ? `<ul class="checks">${c.specs.map(([, v]) => `<li>${v}</li>`).join("")}</ul>`
    : `<dl class="specs">${c.specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
  const more = `${c.dims.length ? `<h4>${o.dims}</h4><dl class="specs">${c.dims.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>` : ""}
    ${c.sections.map(([h, list, txt]) => `<h4>${h}</h4>${list ? `<ul>${list.map((li) => `<li>${li}</li>`).join("")}</ul>` : ""}${txt ? `<p>${txt}</p>` : ""}`).join("")}`;
  return `
<article class="product${p.featured ? " featured" : ""}" id="${p.id}">
  <header class="p-head">${p.featured ? `<span class="badge">${o.featured}</span>` : ""}<h2>${c.name}</h2><p>${c.sub}</p></header>
  <div class="p-body">
    <p class="p-tag">${c.tagline}</p>
    ${c.desc.map((d) => `<p>${d}</p>`).join("")}
    <h3>${specTitle}</h3>
    ${specs}
    <details class="p-more"><summary>${o.specs}</summary>${more}</details>
  </div>
  <footer class="p-foot">
    <div class="price">${money(p.price, lang)} <small>${o.vat}</small></div>
    <button class="btn btn-primary" type="button" data-order="${p.id}">${o.order} ${arrow}</button>
  </footer>
</article>`;
}
function orderDialog(lang) {
  const o = ORDER[lang];
  const opt = (p) => `${p[lang].option} – ${money(p.price, lang)} ${o.vat}`;
  return `
<dialog class="order" id="order" aria-labelledby="order-h">
  <form method="dialog" class="order-form" data-to="${SITE.email}" data-subject="${esc(o.subject)}" data-copied="${esc(o.copied)}" novalidate>
    <button class="x" type="button" data-close aria-label="${o.close}">×</button>
    <div class="step-form">
      <h2 id="order-h">${o.title}</h2>
      <p class="o-note">${o.note}</p>
      <label>${o.product} *<select name="product" data-label="${esc(o.product)}" required>${PRODUCTS.map((p) => `<option value="${p.id}">${esc(opt(p))}</option>`).join("")}</select></label>
      <div class="two">
        <label>${o.quantity}<input name="quantity" type="number" min="1" value="1" inputmode="numeric" data-label="${esc(o.quantity)}"></label>
        <label>${o.name}<input name="name" autocomplete="name" data-label="${esc(o.name)}"></label>
      </div>
      <div class="two">
        <label>${o.email} *<input name="email" type="email" autocomplete="email" required data-label="${esc(o.email)}"></label>
        <label>${o.phone}<input name="phone" type="tel" autocomplete="tel" data-label="${esc(o.phone)}"></label>
      </div>
      <label>${o.shipping} *<textarea name="shipping" required autocomplete="shipping street-address" data-label="${esc(o.shipping)}"></textarea></label>
      <div class="two">
        <label>${o.technician} *<select name="technician" required data-label="${esc(o.technician)}"><option value="">${o.choose}</option><option>${o.yes}</option><option>${o.no}</option></select></label>
        <label>${o.nif}<input name="nif" data-label="${esc(o.nif)}"></label>
      </div>
      <label>${o.billing}<textarea name="billing" autocomplete="billing street-address" data-label="${esc(o.billing)}"></textarea></label>
      <label>${o.message}<textarea name="message" data-label="${esc(o.message)}"></textarea></label>
      <button class="btn btn-primary submit" type="submit">${o.submit} ${arrow}</button>
    </div>
    <div class="step-done" hidden>
      <h2>${o.doneTitle}</h2>
      <p>${o.done} <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
      <pre class="summary"></pre>
      <div class="hero-ctas"><button class="btn btn-primary" type="button" data-copy>${o.copy}</button><button class="btn btn-ghost" type="button" data-close style="color:var(--ink)">${o.close}</button></div>
    </div>
  </form>
</dialog>`;
}

// ---------- pages ----------
for (const lang of ["en", "pt"]) {
  const t = T[lang];
  const h = t.home;
  const altOf = (key) => T[lang === "en" ? "pt" : "en"].paths[key];

  // HOME
  write(t.paths.home, layout({
    lang, path: t.paths.home, alt: altOf("home"), title: h.title, description: h.description,
    ld: [faqNode(t.faq), { ...servicesNode(t), "@id": abs(t.paths.home) + "#catalog", offeredBy: { "@id": ORG_ID } }],
    body: `
<section class="hero">
  <img class="hero-bg" src="${IMG.hero}" alt="" fetchpriority="high">
  <div class="wrap">
    <p class="eyebrow" style="color:var(--blue-light)">${h.heroEyebrow}</p>
    <h1><span>${h.heroTitle[0]}</span> <span class="hl">${h.heroTitle[1]}</span> <span>${h.heroTitle[2]}</span></h1>
    <p class="lead" style="color:#D3DBDF">${h.heroLead}</p>
    <div class="hero-ctas">
      <a class="btn btn-primary" href="${t.paths.contact}">${h.heroCta} ${arrow}</a>
      <a class="btn btn-ghost" href="${t.paths.services}">${h.heroCta2}</a>
    </div>
    <ul class="claims">${h.claims.map((c) => `<li>${c}</li>`).join("")}</ul>
  </div>
</section>

<section class="section" aria-labelledby="intro-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">${h.introEyebrow}</p>
      <h2 id="intro-h">${h.introTitle}</h2>
      <p class="lead">${h.introBody}</p>
    </div>
    <div class="media"><img src="${IMG.services}" alt="${lang === "en" ? "Dipcos modular energy storage system" : "Sistema modular de armazenamento de energia Dipcos"}" loading="lazy" width="750" height="795"></div>
  </div>
</section>

<section class="section bg-white" aria-labelledby="scale-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${h.scaleEyebrow}</p><h2 id="scale-h">${h.scaleTitle}</h2></div>
    ${tierCards(t, t.paths.services)}
  </div>
</section>

<section class="section on-dark" aria-labelledby="why-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${h.problemEyebrow}</p><h2 id="why-h">${h.problemTitle}</h2></div>
    <div class="pillars">
${h.problems.map(([tt, d], i) => `      <div><span class="n">0${i + 1}</span><h3>${tt}</h3><p>${d}</p></div>`).join("\n")}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="proc-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${h.processEyebrow}</p><h2 id="proc-h">${h.processTitle}</h2></div>
    <ol class="steps">
${h.process.map(([tt, d]) => `      <li><h3>${tt}</h3><p>${d}</p></li>`).join("\n")}
    </ol>
  </div>
</section>

<section class="section bg-white" aria-labelledby="about-h">
  <div class="wrap split rev">
    <div class="media"><img src="${IMG.about1}" alt="${lang === "en" ? "Dipcos Energy engineering" : "Engenharia Dipcos Energy"}" loading="lazy"></div>
    <div>
      <p class="eyebrow">${h.aboutEyebrow}</p>
      <h2 id="about-h">${h.aboutTitle}</h2>
      <p class="lead">${h.aboutBody}</p>
      <a class="link" href="${t.paths.about}">${h.aboutCta}</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="blog-h">
  <div class="wrap">
    <div class="row-head"><div><p class="eyebrow">${h.blogEyebrow}</p><h2 id="blog-h">${h.blogTitle}</h2></div><a class="link" href="${t.paths.blog}">${h.blogAll}</a></div>
    <div class="cards">${POSTS.slice(0, 3).map((p) => postCard(p, lang, t)).join("")}</div>
  </div>
</section>
${faqBlock(t, h)}
${ctaBand(t)}`,
  }), { lang, alt: altOf("home"), priority: "1.0" });

  // SERVICES
  const s = t.services;
  write(t.paths.services, layout({
    lang, path: t.paths.services, alt: altOf("services"), title: s.title, description: s.description, current: "services",
    ld: [crumbsNode([["Dipcos Energy", t.paths.home], [t.nav.services, t.paths.services]]), { ...servicesNode(t), "@id": abs(t.paths.services) + "#catalog", offeredBy: { "@id": ORG_ID } }],
    body: `
${pageHero(t, { eyebrow: s.eyebrow, h1: s.h1, lead: s.lead, crumbs: t.nav.services, img: IMG.install })}
<section class="section tight">
  <div class="wrap">
${t.tiers.map((tier) => `    <article class="tier-detail" id="${tier.id}">
      <div>
        <div class="range">${tier.range}</div>
        <h2>${tier.name}</h2>
        <div class="imgbox"><img src="${IMG[tier.image]}" alt="${esc(tier.name)} — Dipcos" loading="lazy"></div>
      </div>
      <div>
        <p class="sub">${tier.lead}</p>
        <p class="lead" style="margin-bottom:32px">${tier.body}</p>
        <p class="label">${t.tierLabels.benefits}</p>
        <ul class="checks">${tier.benefits.map((b) => `<li>${b}</li>`).join("")}</ul>
        <p class="label">${t.tierLabels.apps}</p>
        <p>${tier.apps}</p>
        <a class="btn btn-primary" href="${t.paths.contact}" style="margin-top:12px">${t.nav.cta} ${arrow}</a>
      </div>
    </article>`).join("\n")}
  </div>
</section>
<section class="section on-dark">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">${h.processEyebrow}</p><h2>${s.servicesTitle}</h2></div>
    <div class="svc">${s.servicesList.map(([a, b]) => `<div><h3>${a}</h3><p>${b}</p></div>`).join("")}</div>
  </div>
</section>
${faqBlock(t, h)}
${ctaBand(t)}`,
  }), { lang, alt: altOf("services"), priority: "0.9" });

  // ABOUT
  const a = t.about;
  write(t.paths.about, layout({
    lang, path: t.paths.about, alt: altOf("about"), title: a.title, description: a.description, current: "about",
    ld: [crumbsNode([["Dipcos Energy", t.paths.home], [t.nav.about, t.paths.about]]), { "@type": "AboutPage", "@id": abs(t.paths.about) + "#about", mainEntity: { "@id": ORG_ID } }],
    body: `
${pageHero(t, { eyebrow: a.eyebrow, h1: a.h1, crumbs: t.nav.about })}
<section class="section">
  <div class="wrap split">
    <div class="prose"><p class="lead">${a.p1}</p><p>${a.p2}</p></div>
    <div class="media"><img src="${IMG.about2}" alt="Dipcos Energy" loading="lazy"></div>
  </div>
</section>
<section class="section bg-white">
  <div class="wrap split">
    <div><p class="eyebrow">${a.timelineTitle}</p><h2>${a.h2}</h2><div class="prose"><p>${a.p3}</p><p><strong>${a.p4}</strong></p></div></div>
    <ol class="timeline">${a.timeline.map(([y, d]) => `<li><strong>${y}</strong><p>${d}</p></li>`).join("")}</ol>
  </div>
</section>
<section class="section">
  <div class="wrap mvv">
    <div><h3>${a.missionTitle}</h3><p>${a.mission}</p></div>
    <div><h3>${a.visionTitle}</h3><p>${a.vision}</p></div>
    <div><h3>${a.valuesTitle}</h3><ul>${a.values.map((v) => `<li>${v}</li>`).join("")}</ul></div>
  </div>
</section>
${ctaBand(t)}`,
  }), { lang, alt: altOf("about"), priority: "0.8" });

  // CONTACT
  const c = t.contact;
  const f = c.form;
  write(t.paths.contact, layout({
    lang, path: t.paths.contact, alt: altOf("contact"), title: c.title, description: c.description, current: "contact",
    ld: [crumbsNode([["Dipcos Energy", t.paths.home], [t.nav.contact, t.paths.contact]]), { "@type": "ContactPage", "@id": abs(t.paths.contact) + "#contact", mainEntity: { "@id": ORG_ID } }],
    body: `
${pageHero(t, { eyebrow: c.eyebrow, h1: c.h1, lead: c.lead, crumbs: t.nav.contact })}
<section class="section">
  <div class="wrap contact-grid">
    <div class="info">
      <dl>
        <dt>${c.phoneL}</dt><dd><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></dd>
        <dt>${c.emailL}</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
        <dt>${c.addressL}</dt><dd>${addr.street}<br>${addr.postalCode} ${addr.city}, Portugal</dd>
      </dl>
      <div class="map"><iframe title="${esc(addressLine)}" src="https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </div>
    <form class="contact" data-to="${SITE.email}" data-subject="${esc(f.subject)}" data-l-name="${esc(f.name)}" data-l-phone="${esc(f.phone)}" data-l-type="${esc(f.type)}">
      <div class="two">
        <label>${f.name}<input name="name" autocomplete="name" required></label>
        <label>${f.email}<input name="email" type="email" autocomplete="email" required></label>
      </div>
      <div class="two">
        <label>${f.phone}<input name="phone" type="tel" autocomplete="tel"></label>
        <label>${f.type}<select name="type">${f.types.map((o) => `<option>${o}</option>`).join("")}</select></label>
      </div>
      <label>${f.message}<textarea name="message" required></textarea></label>
      <div><button class="btn btn-primary" type="submit">${f.send} ${arrow}</button></div>
      <p class="note">${f.note}</p>
    </form>
  </div>
</section>`,
  }), { lang, alt: altOf("contact"), priority: "0.8" });

  // SHOP
  const sh = t.shop;
  write(t.paths.shop, layout({
    lang, path: t.paths.shop, alt: altOf("shop"), title: sh.title, description: sh.description, current: "shop",
    ld: [crumbsNode([["Dipcos Energy", t.paths.home], [t.nav.shop, t.paths.shop]]), ...PRODUCTS.map((p) => productNode(p, lang, abs(t.paths.shop)))],
    body: `
${pageHero(t, { eyebrow: sh.eyebrow, h1: sh.h1, lead: sh.lead, crumbs: t.nav.shop, img: IMG.install })}
<section class="section tight">
  <div class="wrap">
    <div class="shop-help"><div><h2 style="font-size:1.3rem">${sh.helpTitle}</h2><p style="margin:0;color:var(--graphite)">${sh.help}</p></div><div><a class="btn btn-primary" href="${t.paths.contact}">${t.nav.contact} ${arrow}</a></div></div>
    <div class="products">${PRODUCTS.map((p) => productCard(p, lang)).join("")}</div>
    <p class="notice" style="margin-top:28px">${ORDER[lang].note}</p>
  </div>
</section>
${orderDialog(lang)}`,
  }), { lang, alt: altOf("shop"), priority: "0.7" });

  // BLOG INDEX
  const b = t.blog;
  const blogPath = lang === "en" ? "/blog/" : t.paths.blog;
  write(blogPath, layout({
    lang, path: blogPath, alt: lang === "en" ? T.pt.paths.blog : "/blog/", title: b.title, description: b.description, current: "blog",
    ld: [crumbsNode([["Dipcos Energy", t.paths.home], [t.nav.blog, blogPath]]), { "@type": "Blog", "@id": abs("/blog/") + "#blog", name: "Dipcos Energy Insights", publisher: { "@id": ORG_ID }, inLanguage: "en", blogPost: POSTS.map((p) => ({ "@id": abs("/blog/" + p.slug) + "#article" })) }],
    body: `
${pageHero(t, { eyebrow: b.eyebrow, h1: b.h1, lead: b.lead, crumbs: t.nav.blog })}
<section class="section">
  <div class="wrap">
    ${b.notice ? `<p class="notice">${b.notice}</p>` : ""}
    <div class="cards">${POSTS.map((p) => postCard(p, lang, t)).join("")}</div>
  </div>
</section>
${ctaBand(t)}`,
  }), { lang, alt: lang === "en" ? T.pt.paths.blog : "/blog/", priority: "0.7", pathOverride: blogPath });

  // 404 (EN only, served for every unknown path)
  if (lang === "en") {
    const nf = t.notFound;
    write("/404", layout({
      lang, path: "/404", title: nf.title, description: nf.body, noindex: true,
      body: `<section class="page-hero on-dark" style="min-height:60vh"><div class="wrap"><p class="eyebrow">404</p><h1>${nf.h1}</h1><p class="lead">${nf.body}</p><a class="btn btn-primary" href="/">${nf.cta} ${arrow}</a> &nbsp; <a class="btn btn-ghost" href="/pt/">${T.pt.notFound.cta}</a></div></section>`,
    }));
  }
}

// BLOG POSTS
for (const p of POSTS) {
  const t = T.en;
  const path = "/blog/" + p.slug;
  const words = p.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 220));
  const article = {
    "@type": "BlogPosting", "@id": abs(path) + "#article", headline: p.title, description: p.description, image: p.image,
    datePublished: p.date, dateModified: p.date, inLanguage: "en", mainEntityOfPage: abs(path),
    author: { "@id": ORG_ID }, publisher: { "@id": ORG_ID }, wordCount: words,
  };
  write(path, layout({
    lang: "en", path, title: `${p.title} | Dipcos Energy`, description: p.description, image: p.image, type: "article", current: "blog",
    ld: [article, crumbsNode([["Dipcos Energy", "/"], ["Insights", "/blog/"], [p.title, path]])],
    body: `
<article>
  <header class="article-hero on-dark">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Dipcos Energy</a> / <a href="/blog/">${t.nav.blog}</a></nav>
      <h1>${p.title}</h1>
      <p class="meta"><time datetime="${p.date}">${fmtDate(p.date, "en")}</time> · ${mins} ${t.blog.min}</p>
      <figure><img src="${p.image}" alt="${esc(p.title)}" fetchpriority="high"></figure>
    </div>
  </header>
  <div class="article">
    <div class="wrap">
      <div class="prose">${p.body}
        <p class="sign">Reliable energy. Real independence.</p>
        <p><a class="link" href="/blog/">← ${t.blog.back}</a></p>
      </div>
      ${p.gallery ? `<div class="gallery">${p.gallery.map((g) => `<img src="${g}" alt="Dipcos Energy at The Solar and Storage Live Africa" loading="lazy">`).join("")}</div>` : ""}
    </div>
  </div>
</article>
${ctaBand(t)}`,
  }), { lang: "en", lastmod: p.date, priority: "0.6" });
}

// TERMS (EN — legal text)
{
  const t = T.en;
  const S = SITE;
  write("/terms", layout({
    lang: "en", path: "/terms", title: t.terms.title, description: t.terms.description,
    ld: [crumbsNode([["Dipcos Energy", "/"], ["Terms & Conditions", "/terms"]])],
    body: `
${pageHero(t, { eyebrow: "Legal", h1: t.terms.h1, lead: "Last updated: 27/02/2026", crumbs: "Terms" })}
<section class="section"><div class="wrap"><div class="prose legal">
<h2>1. Introduction</h2>
<p>These Terms and Conditions govern the use of this website and the purchase of products offered by Dipcos Energy (“Dipcos”, “we”, “our”, or “us”).</p>
<p>By accessing this website or placing an order, you agree to be bound by these Terms and Conditions. If you do not agree, you must not use this website or proceed with any purchase.</p>
<p>Due to the technical nature of energy systems, we strongly encourage customers to contact our team before completing a purchase to ensure compatibility and suitability. For any questions, please contact <a href="mailto:${S.email}">${S.email}</a> or <a href="tel:${S.phoneHref}">${S.phone}</a>. Our specialists are available to guide you toward the most appropriate solution.</p>
<h2>2. Company Information</h2>
<p>Dipcos Energy<br>${addr.street}<br>${addr.postalCode} ${addr.city}, Portugal<br>Website: <a href="${S.url}">www.dipcos.pt</a><br>Email: ${S.email}</p>
<h2>3. Products</h2>
<p>Dipcos Energy supplies energy storage systems, hybrid inverters, batteries and related components.</p>
<p>All products sold are technical electrical systems designed for integration into energy installations. Customers are responsible for ensuring compatibility with their existing systems and compliance with local regulations.</p>
<p>Product descriptions, technical specifications and images are provided for informational purposes and may be updated without prior notice.</p>
<h2>4. Installation Responsibility</h2>
<p>Dipcos Energy does not directly perform installation services unless explicitly agreed in writing. Products purchased through this website may be:</p>
<ul><li>Installed by the customer, provided they possess adequate technical knowledge and comply with applicable regulations; or</li><li>Installed by a qualified and certified installer chosen by the customer.</li></ul>
<p>Due to the technical complexity of energy systems, installation requires proper electrical knowledge and adherence to safety standards. Dipcos may assist by:</p>
<ul><li>Providing technical guidance</li><li>Supporting system compatibility verification</li><li>Recommending qualified installers</li><li>Coordinating communication where necessary</li></ul>
<p>Final responsibility for installation rests with the customer and/or the chosen installer.</p>
<h2>5. Technical Consultation</h2>
<p>Energy systems must be correctly sized, configured and installed to operate safely and efficiently. Before purchase, customers are encouraged to:</p>
<ul><li>Consult with Dipcos regarding system sizing</li><li>Verify inverter and battery compatibility</li><li>Confirm voltage and capacity requirements</li><li>Ensure compliance with local electrical codes</li></ul>
<p>While products may be purchased directly online, our team remains available to provide consultation to help customers make informed decisions.</p>
<h2>6. Orders and Confirmation</h2>
<p>All orders placed through the website are subject to confirmation. After an order is submitted, Dipcos may contact the customer to:</p>
<ul><li>Confirm technical specifications</li><li>Verify compatibility</li><li>Confirm delivery details</li><li>Clarify installation requirements</li></ul>
<p>Dipcos reserves the right to cancel or suspend orders if technical inconsistencies are identified.</p>
<h2>7. Pricing</h2>
<p>All prices are displayed in Euros (€) and may be subject to VAT and applicable taxes unless stated otherwise. Dipcos reserves the right to modify pricing without prior notice. Shipping costs, when applicable, will be clearly indicated before final order confirmation.</p>
<h2>8. Delivery</h2>
<p>Delivery times depend on product availability and location. After order confirmation, delivery details will be agreed upon, including:</p>
<ul><li>Delivery address</li><li>Access conditions</li><li>Handling requirements</li><li>Coordination with installer (if applicable)</li></ul>
<p>Customers are responsible for ensuring that delivery conditions are suitable for the size and weight of purchased products.</p>
<h2>9. Returns and Refunds</h2>
<p>Returns must be requested in writing prior to shipment. Returned products must:</p>
<ul><li>Be unused</li><li>Be in original packaging</li><li>Show no signs of damage or improper handling</li></ul>
<p>Custom-configured systems may not be eligible for return. For return inquiries, contact ${S.email} before sending any product.</p>
<h2>10. Warranty</h2>
<p>Products are covered by manufacturer warranty according to their specific terms. Warranty does not cover:</p>
<ul><li>Incorrect installation</li><li>Improper configuration</li><li>Non-compliance with regulations</li><li>Unauthorized modifications</li><li>Physical damage caused by misuse</li></ul>
<p>Proof of purchase may be required for warranty claims.</p>
<h2>11. Limitation of Liability</h2>
<p>Dipcos Energy shall not be liable for:</p>
<ul><li>Incorrect installation</li><li>Improper electrical integration</li><li>Business interruption</li><li>Indirect or consequential losses</li><li>Loss of profits</li></ul>
<p>Energy systems require proper professional handling. Dipcos provides guidance and product supply but does not assume responsibility for on-site electrical works unless formally contracted. Total liability, where applicable, shall not exceed the value of the purchased product.</p>
<h2>12. Intelligent System Disclaimer</h2>
<p>Some Dipcos systems may include intelligent monitoring and automated energy optimization features. These features are designed to enhance efficiency but do not replace professional installation, regulatory compliance, or electrical supervision. Customers remain responsible for ensuring correct system configuration.</p>
<h2>13. Data Protection</h2>
<p>Personal data collected through this website is processed in accordance with applicable data protection regulations.</p>
<h2>14. Governing Law</h2>
<p>These Terms and Conditions are governed by Portuguese law. Any disputes shall be subject to the jurisdiction of Portuguese courts.</p>
<h2>15. Contact and Support</h2>
<p>We strongly encourage customers to contact our team before and after purchase. Our specialists can assist with:</p>
<ul><li>Energy consumption analysis</li><li>System sizing recommendations</li><li>Compatibility verification</li><li>Installer coordination</li><li>Long-term support guidance</li></ul>
<p><a href="mailto:${S.email}">${S.email}</a> · <a href="${S.url}">www.dipcos.pt</a></p>
<p class="sign">Reliable energy. Real independence.</p>
</div></div></section>`,
  }), { lang: "en", priority: "0.3" });
}

// ---------- sitemap.xml ----------
const urlEntry = (pg) => {
  const loc = abs(pg.pathOverride || pg.path);
  const alts = pg.alt
    ? [
        `<xhtml:link rel="alternate" hreflang="${T[pg.lang].htmlLang}" href="${loc}"/>`,
        `<xhtml:link rel="alternate" hreflang="${T[pg.lang === "en" ? "pt" : "en"].htmlLang}" href="${abs(pg.alt)}"/>`,
      ].join("")
    : "";
  return `<url><loc>${loc}</loc><lastmod>${pg.lastmod || BUILD_DATE}</lastmod><priority>${pg.priority || "0.5"}</priority>${alts}</url>`;
};
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(urlEntry).join("\n")}
</urlset>
`);

// ---------- robots.txt (aberto a motores de busca e assistentes de IA) ----------
writeFileSync(join(OUT, "robots.txt"), `# Dipcos Energy — search engines and AI assistants are welcome
User-agent: *
Allow: /
Disallow: /404

# AI crawlers explicitly allowed
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`);

// ---------- llms.txt (resumo para assistentes de IA) ----------
const en = T.en;
writeFileSync(join(OUT, "llms.txt"), `# Dipcos Energy

> Dipcos Energy is a technology-driven company based in Olhão (Algarve), Portugal, that designs and supplies modular, scalable and intelligent energy storage systems — LFP batteries, hybrid inverters and intelligent energy management — for homes, businesses, industry and critical infrastructure in Portugal and across Europe. Slogan: "Reliable energy. Real independence."

Key facts:
- Focus: energy storage and intelligent energy management (not a solar panel company; systems integrate with solar, grid and EV charging).
- Experience: over 30 years in energy efficiency and intelligent power solutions; Dipcos originated in the early 1990s as a distributed power control system for boats and caravans. Founder: JP Ajami.
- Solutions by scale: ${en.tiers.map((x) => `${x.name} (${x.range})`).join("; ")}.
- Services: consumption analysis, technical sizing, AI integration, monitoring and support. Installation is done by the customer or certified installers; Dipcos guides, verifies compatibility and coordinates.
- Contact: ${SITE.phone} · ${SITE.email} · ${addressLine}
- Languages: English and Portuguese.

## Main pages
- [Home](${abs("/")}): overview of Dipcos Energy storage solutions
- [Solutions](${abs("/services")}): residential, commercial/hospitality and industrial energy storage
- [About](${abs("/about")}): company history, mission, vision and values
- [Contact](${abs("/contact")}): free consultation, phone, email and address
- [Shop](${abs("/shop")}): batteries and hybrid inverters
- [Português](${abs("/pt/")}): versão em português

## Articles
${POSTS.map((p) => `- [${p.title}](${abs("/blog/" + p.slug)}): ${p.description}`).join("\n")}

## FAQ
${en.faq.map(([q, a]) => `- **${q}** ${a}`).join("\n")}
`);

// ---------- manifest ----------
writeFileSync(join(OUT, "site.webmanifest"), JSON.stringify({
  name: "Dipcos Energy", short_name: "Dipcos", start_url: "/", display: "browser", background_color: "#0C0F11", theme_color: "#0C0F11",
  icons: [{ src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png" }, { src: "/assets/img/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
}, null, 2));

// ---------- redirects (URLs antigos do Squarespace) ----------
writeFileSync(join(OUT, "_redirects"), `/home / 301
/index / 301
/pt /pt/ 301
/servicos /pt/solucoes 301
/sobre /pt/sobre 301
/contacto /pt/contacto 301
`);

// ---------- headers ----------
writeFileSync(join(OUT, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=604800

/llms.txt
  Content-Type: text/plain; charset=utf-8
`);

console.log(`Built ${pages.length} indexable pages + 404 → ${OUT}/`);
