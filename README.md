# Dipcos Energy — website

Site estático bilingue (EN + PT) da Dipcos Energy, servido por **Cloudflare Workers** (Worker `dipcos`, Static Assets).

## Estrutura
- `src/content.mjs` — **todos os textos**, contactos, redes sociais e imagens. Edite aqui.
- `build.mjs` — gera o site em `public/` (páginas, sitemap, robots.txt, llms.txt, dados estruturados).
- `static/` — CSS, JS, logótipos e ícones (copiados para `public/`).
- `wrangler.jsonc` — configuração do Worker `dipcos`.

Depois de editar: `node build.mjs` e faça commit de `public/` também.

## Publicar no Cloudflare Workers (uma vez)
1. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → `Isabellylima/dipcos`.
2. Nome do projeto: `dipcos` · Build command: `node build.mjs` · Deploy command: `npx wrangler deploy`.
3. A partir daí, cada push para `main` publica automaticamente.
4. Domínio: Worker `dipcos` → **Settings → Domains & Routes** → adicionar `www.dipcos.pt` (e `dipcos.pt`).

## SEO e pesquisa por IA
- Títulos/descrições por página, canonical, `hreflang` EN/PT, Open Graph.
- Dados estruturados schema.org: Organization/LocalBusiness, Service, FAQPage, BlogPosting, Breadcrumbs.
- `sitemap.xml`, `robots.txt` (aberto a Google, Bing, GPTBot, ClaudeBot, PerplexityBot…) e `llms.txt`.
- URLs antigos do Squarespace mantidos (`/services`, `/about`, `/contact`, `/shop`, `/terms`, `/blog/...`).

## Pendentes
- Adicionar URLs do LinkedIn/Instagram em `SITE.social` (`src/content.mjs`).
- As fotografias ainda vêm do CDN do Squarespace — guardar cópias em `static/assets/img/` antes de cancelar o Squarespace.
- Submeter `https://www.dipcos.pt/sitemap.xml` no Google Search Console e Bing Webmaster Tools.
