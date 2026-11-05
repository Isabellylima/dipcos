# Dipcos Energy — website

Site estático bilingue (EN + PT) da Dipcos Energy, servido por **Cloudflare Workers** (Worker `dipcos`, Static Assets).

## Estrutura
- `src/content.mjs` — **todos os textos**, contactos, redes sociais e imagens. Edite aqui.
- `build.mjs` — gera o site em `public/` (páginas, sitemap, robots.txt, llms.txt, dados estruturados).
- `static/` — CSS, JS, logótipos e ícones (copiados para `public/`).
- `src/worker.js` — Worker: serve o site e envia os formulários (`/api/order`, `/api/contact`) por email.
- `wrangler.jsonc` — configuração do Worker `dipcos` (email de destino em `vars.MAIL_TO`).

Depois de editar: `node build.mjs` e faça commit de `public/` também.

## Publicar no Cloudflare Workers (uma vez)
1. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → `Isabellylima/dipcos`.
2. Nome do projeto: `dipcos` · Build command: `node build.mjs` · Deploy command: `npx wrangler deploy` (nunca `main` no Build command).
3. A partir daí, cada push para `main` publica automaticamente.
4. Domínio: Worker `dipcos` → **Settings → Domains & Routes** → adicionar `www.dipcos.pt` (e `dipcos.pt`).

## Email dos formulários (Cloudflare Email Service)
Os pedidos de encomenda e contactos chegam a `info@dipcos.pt`, enviados de `website@dipcos.pt`, com "responder" direto ao cliente.
Para funcionar:
1. `dipcos.pt` a usar o DNS da Cloudflare (adicionar o domínio na conta e trocar os nameservers no registo do domínio).
2. **Email Service → Email Sending → Onboard Domain** → `dipcos.pt`.
3. **Email Routing → Destination addresses** → adicionar e verificar `info@dipcos.pt`.
Enquanto isto não estiver feito, os formulários abrem a app de email do visitante com a mensagem preenchida (alternativa automática).

## SEO e pesquisa por IA
- Títulos/descrições por página, canonical, `hreflang` EN/PT, Open Graph.
- Dados estruturados schema.org: Organization/LocalBusiness, Service, FAQPage, BlogPosting, Breadcrumbs.
- `sitemap.xml`, `robots.txt` (aberto a Google, Bing, GPTBot, ClaudeBot, PerplexityBot…) e `llms.txt`.
- URLs antigos do Squarespace mantidos (`/services`, `/about`, `/contact`, `/shop`, `/terms`, `/blog/...`).

## Pendentes
- Adicionar URLs do LinkedIn/Instagram em `SITE.social` (`src/content.mjs`).
- As fotografias ainda vêm do CDN do Squarespace — guardar cópias em `static/assets/img/` antes de cancelar o Squarespace.
- Submeter `https://www.dipcos.pt/sitemap.xml` no Google Search Console e Bing Webmaster Tools.
