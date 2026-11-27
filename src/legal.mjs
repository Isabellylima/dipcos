// Páginas legais: Informação Legal (EN/PT) e Política de Privacidade (EN/PT)
// Os dados da empresa vêm de SITE.legal (src/content.mjs).

export const LIVRO_URL = "https://www.livroreclamacoes.pt/Inicio/";

export const RAL = [
  {
    name: "CIMAAL — Centro de Informação, Mediação e Arbitragem de Conflitos de Consumo do Algarve",
    scope: { en: "Contracts entered into in the District of Faro", pt: "Contratos celebrados no Distrito de Faro" },
    address: "Av. 5 de Outubro, n.º 55, R/C Dto., 8000-075 Faro",
    phone: "+351 289 823 135",
    email: "info@consumoalgarve.pt",
    web: "https://www.consumoalgarve.pt",
  },
  {
    name: "CNIACC — Centro Nacional de Informação e Arbitragem de Conflitos de Consumo",
    scope: { en: "Nationwide, where no regional centre is competent", pt: "Todo o território nacional, nas zonas não abrangidas por outro centro regional" },
    address: "Rua D. Afonso Henriques, n.º 1, 4700-030 Braga",
    phone: "+351 253 619 107",
    email: "geral@cniacc.pt",
    web: "https://www.cniacc.pt",
  },
];

const office = (L) => `${L.office.street}, ${L.office.postalCode} ${L.office.city}, ${L.office.country}`;

export const LEGAL_UPDATED = "27/11/2026";

export const legalCopy = {
  en: {
    noticeTitle: "Legal Notice | Dipcos Energy",
    noticeDesc: "Company identification, commercial registry, complaints book and alternative dispute resolution for Dipcos Energy (DIPCOS Distributed Inteligent Power Control Systems, Unipessoal Lda, NIPC 518224570).",
    noticeH1: "Legal Notice",
    privacyTitle: "Privacy Policy | Dipcos Energy",
    privacyDesc: "How Dipcos Energy collects, uses and protects personal data under the GDPR, and how to exercise your rights.",
    privacyH1: "Privacy Policy",
    footer: { notice: "Legal notice", privacy: "Privacy", terms: "Terms & Conditions", complaints: "Complaints Book", nipc: "NIPC", office: "Registered office" },
  },
  pt: {
    noticeTitle: "Informação Legal | Dipcos Energy",
    noticeDesc: "Identificação da empresa, registo comercial, Livro de Reclamações e resolução alternativa de litígios da Dipcos Energy (DIPCOS Distributed Inteligent Power Control Systems, Unipessoal Lda, NIPC 518224570).",
    noticeH1: "Informação Legal",
    privacyTitle: "Política de Privacidade | Dipcos Energy",
    privacyDesc: "Como a Dipcos Energy recolhe, utiliza e protege dados pessoais ao abrigo do RGPD, e como exercer os seus direitos.",
    privacyH1: "Política de Privacidade",
    footer: { notice: "Informação legal", privacy: "Privacidade", terms: "Termos e Condições (EN)", complaints: "Livro de Reclamações", nipc: "NIPC", office: "Sede" },
  },
};

const ralList = (lang) =>
  RAL.map(
    (r) => `<li><strong>${r.name}</strong><br>${r.scope[lang]}<br>${r.address}<br>${lang === "pt" ? "Tel." : "Phone"}: ${r.phone} · Email: <a href="mailto:${r.email}">${r.email}</a> · <a href="${r.web}" target="_blank" rel="noopener">${r.web.replace("https://", "")}</a></li>`
  ).join("");

export function noticeBody(lang, SITE) {
  const L = SITE.legal;
  const capital = L.capital ? (lang === "pt" ? `<dt>Capital social</dt><dd>${L.capital}</dd>` : `<dt>Share capital</dt><dd>${L.capital}</dd>`) : "";
  if (lang === "pt") {
    return `
<h2>1. Identificação da empresa</h2>
<p>O site <a href="${SITE.url}">www.dipcos.pt</a> é propriedade e gerido por:</p>
<dl class="legal-id">
  <dt>Firma</dt><dd>${L.name}</dd>
  <dt>Nome comercial</dt><dd>Dipcos Energy</dd>
  <dt>Tipo de sociedade</dt><dd>${L.type.pt}</dd>
  <dt>NIPC / N.º de matrícula</dt><dd>${L.nipc}</dd>
  <dt>N.º de IVA (UE)</dt><dd>${L.vat}</dd>
  <dt>Registo</dt><dd>Matriculada na ${L.registry.pt}</dd>
  ${capital}
  <dt>Sede</dt><dd>${office(L)}</dd>
  <dt>Morada de contacto</dt><dd>${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, Portugal</dd>
  <dt>Telefone</dt><dd><a href="tel:${SITE.phoneHref}">${SITE.phone}</a> (chamada para a rede fixa nacional)</dd>
  <dt>Email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
  <dt>CAE</dt><dd>${L.cae}</dd>
</dl>
<h2>2. Livro de Reclamações</h2>
<p>Nos termos do Decreto-Lei n.º 156/2005, de 15 de setembro, na sua redação atual, a Dipcos Energy disponibiliza o Livro de Reclamações em formato eletrónico. Pode apresentar uma reclamação em <a href="${LIVRO_URL}" target="_blank" rel="noopener">www.livroreclamacoes.pt</a>.</p>
<p><a class="btn btn-primary" href="${LIVRO_URL}" target="_blank" rel="noopener">Livro de Reclamações Eletrónico</a></p>
<h2>3. Resolução alternativa de litígios de consumo</h2>
<p>Em caso de litígio de consumo, o consumidor pode recorrer a uma das seguintes entidades de Resolução Alternativa de Litígios (RAL), nos termos da Lei n.º 144/2015, de 8 de setembro:</p>
<ul class="ral">${ralList("pt")}</ul>
<p>Mais informações no Portal do Consumidor: <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener">www.consumidor.gov.pt</a>.</p>
<h2>4. Propriedade intelectual</h2>
<p>Os textos, imagens, logótipos e restantes conteúdos deste site pertencem à Dipcos Energy ou são utilizados com autorização, e não podem ser reproduzidos sem consentimento prévio por escrito.</p>
<h2>5. Documentos relacionados</h2>
<p><a href="/pt/privacidade">Política de Privacidade</a> · <a href="/terms">Termos e Condições (EN)</a></p>
<p class="sign">Última atualização: ${LEGAL_UPDATED}</p>`;
  }
  return `
<h2>1. Company identification</h2>
<p>The website <a href="${SITE.url}">www.dipcos.pt</a> is owned and operated by:</p>
<dl class="legal-id">
  <dt>Legal name</dt><dd>${L.name}</dd>
  <dt>Trading name</dt><dd>Dipcos Energy</dd>
  <dt>Company type</dt><dd>${L.type.en}</dd>
  <dt>NIPC / Registration no.</dt><dd>${L.nipc}</dd>
  <dt>EU VAT number</dt><dd>${L.vat}</dd>
  <dt>Registry</dt><dd>Registered with the ${L.registry.en}</dd>
  ${capital}
  <dt>Registered office</dt><dd>${office(L)}</dd>
  <dt>Contact address</dt><dd>${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, Portugal</dd>
  <dt>Phone</dt><dd><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></dd>
  <dt>Email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd>
  <dt>Activity code (CAE)</dt><dd>${L.cae}</dd>
</dl>
<h2>2. Complaints Book</h2>
<p>In accordance with Portuguese Decree-Law no. 156/2005, Dipcos Energy provides the electronic Complaints Book (Livro de Reclamações). You can submit a complaint at <a href="${LIVRO_URL}" target="_blank" rel="noopener">www.livroreclamacoes.pt</a>.</p>
<p><a class="btn btn-primary" href="${LIVRO_URL}" target="_blank" rel="noopener">Electronic Complaints Book</a></p>
<h2>3. Alternative dispute resolution</h2>
<p>In the event of a consumer dispute, consumers may refer it to one of the following Alternative Dispute Resolution (ADR/RAL) entities, under Portuguese Law no. 144/2015:</p>
<ul class="ral">${ralList("en")}</ul>
<p>More information at the Portuguese Consumer Portal: <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener">www.consumidor.gov.pt</a>.</p>
<h2>4. Intellectual property</h2>
<p>Texts, images, logos and other content on this website belong to Dipcos Energy or are used with permission, and may not be reproduced without prior written consent.</p>
<h2>5. Related documents</h2>
<p><a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms &amp; Conditions</a></p>
<p class="sign">Last updated: ${LEGAL_UPDATED}</p>`;
}

export function privacyBody(lang, SITE) {
  const L = SITE.legal;
  if (lang === "pt") {
    return `
<h2>1. Responsável pelo tratamento</h2>
<p>${L.name} (Dipcos Energy), NIPC ${L.nipc}, com sede em ${office(L)}. Para qualquer questão sobre dados pessoais: <a href="mailto:${SITE.email}">${SITE.email}</a> ou ${SITE.phone}.</p>
<h2>2. Que dados recolhemos</h2>
<ul>
<li><strong>Formulário de contacto:</strong> nome, email, telefone (opcional), tipo de projeto e mensagem.</li>
<li><strong>Pedido de encomenda:</strong> produto e quantidade, nome, email, telefone, morada de entrega, necessidade de técnico, NIF e morada de faturação (opcionais) e mensagem.</li>
<li><strong>Navegação:</strong> estatísticas de visitas agregadas (páginas vistas, origem do tráfego, tipo de dispositivo) e dados técnicos necessários ao funcionamento e segurança do site, como o endereço IP.</li>
</ul>
<h2>3. Para que usamos os dados e com que fundamento</h2>
<ul>
<li>Responder a pedidos de contacto e preparar propostas — diligências pré-contratuais a seu pedido (art. 6.º, n.º 1, al. b) do RGPD).</li>
<li>Tratar pedidos de encomenda, orçamentar portes, faturar e entregar — execução de contrato e cumprimento de obrigações legais, incluindo fiscais (art. 6.º, n.º 1, als. b) e c)).</li>
<li>Medir e melhorar o desempenho do site e manter a sua segurança — interesse legítimo (art. 6.º, n.º 1, al. f)).</li>
</ul>
<p>Não vendemos dados pessoais nem os usamos para publicidade personalizada.</p>
<h2>4. Durante quanto tempo</h2>
<p>Os pedidos de contacto que não deem origem a um contrato são conservados até 2 anos. Os dados de clientes e de faturação são conservados pelo prazo exigido por lei (em regra, 10 anos para documentos contabilísticos e fiscais).</p>
<h2>5. Com quem partilhamos</h2>
<p>Recorremos a prestadores de serviços que tratam dados por nossa conta, apenas na medida do necessário:</p>
<ul>
<li><strong>Cloudflare</strong> — alojamento do site e envio dos formulários por email.</li>
<li><strong>Metricool</strong> — estatísticas de visitas ao site.</li>
<li><strong>Google</strong> — tipos de letra (Google Fonts) e mapa na página de contacto (Google Maps).</li>
<li><strong>Squarespace</strong> — alojamento de algumas imagens do site.</li>
<li>Transportadoras e instaladores, quando necessário para a entrega ou instalação de uma encomenda.</li>
</ul>
<p>Alguns destes prestadores podem tratar dados fora do Espaço Económico Europeu; nesses casos, as transferências assentam em garantias adequadas previstas no RGPD, como as cláusulas contratuais-tipo da Comissão Europeia.</p>
<h2>6. Cookies</h2>
<p>Este site não instala cookies próprios nem cookies de publicidade. Serviços de terceiros integrados no site, como o mapa do Google na página de contacto, podem utilizar cookies de acordo com as suas próprias políticas. Pode bloquear ou apagar cookies nas definições do seu navegador.</p>
<h2>7. Os seus direitos</h2>
<p>Pode pedir o acesso, retificação, apagamento, limitação ou portabilidade dos seus dados e opor-se ao seu tratamento, escrevendo para <a href="mailto:${SITE.email}">${SITE.email}</a>. Tem também o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD) — <a href="https://www.cnpd.pt" target="_blank" rel="noopener">www.cnpd.pt</a>.</p>
<h2>8. Alterações</h2>
<p>Esta política pode ser atualizada. A versão em vigor está sempre disponível nesta página.</p>
<p class="sign">Última atualização: ${LEGAL_UPDATED}</p>`;
  }
  return `
<h2>1. Data controller</h2>
<p>${L.name} (Dipcos Energy), NIPC ${L.nipc}, registered office at ${office(L)}. For any question about personal data: <a href="mailto:${SITE.email}">${SITE.email}</a> or ${SITE.phone}.</p>
<h2>2. What data we collect</h2>
<ul>
<li><strong>Contact form:</strong> name, email, phone (optional), project type and message.</li>
<li><strong>Order request:</strong> product and quantity, name, email, phone, shipping address, installer requirement, VAT number and billing address (optional) and message.</li>
<li><strong>Browsing:</strong> aggregated visit statistics (pages viewed, traffic source, device type) and technical data needed to run and secure the website, such as the IP address.</li>
</ul>
<h2>3. Why we use it and on what legal basis</h2>
<ul>
<li>To answer enquiries and prepare proposals — steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR).</li>
<li>To process order requests, quote delivery, invoice and deliver — performance of a contract and compliance with legal obligations, including tax law (Art. 6(1)(b) and (c)).</li>
<li>To measure and improve website performance and keep it secure — legitimate interest (Art. 6(1)(f)).</li>
</ul>
<p>We do not sell personal data or use it for personalised advertising.</p>
<h2>4. How long we keep it</h2>
<p>Enquiries that do not lead to a contract are kept for up to 2 years. Customer and invoicing data are kept for the period required by law (as a rule, 10 years for accounting and tax records).</p>
<h2>5. Who we share it with</h2>
<p>We use service providers that process data on our behalf, only as far as necessary:</p>
<ul>
<li><strong>Cloudflare</strong> — website hosting and delivery of form submissions by email.</li>
<li><strong>Metricool</strong> — website visit statistics.</li>
<li><strong>Google</strong> — fonts (Google Fonts) and the map on the contact page (Google Maps).</li>
<li><strong>Squarespace</strong> — hosting of some website images.</li>
<li>Carriers and installers, where needed to deliver or install an order.</li>
</ul>
<p>Some of these providers may process data outside the European Economic Area; such transfers rely on appropriate safeguards under the GDPR, such as the European Commission's standard contractual clauses.</p>
<h2>6. Cookies</h2>
<p>This website does not set its own cookies or advertising cookies. Third-party services embedded in the site, such as the Google map on the contact page, may use cookies under their own policies. You can block or delete cookies in your browser settings.</p>
<h2>7. Your rights</h2>
<p>You may request access, rectification, erasure, restriction or portability of your data and object to its processing by writing to <a href="mailto:${SITE.email}">${SITE.email}</a>. You also have the right to lodge a complaint with the Portuguese data protection authority (CNPD) — <a href="https://www.cnpd.pt" target="_blank" rel="noopener">www.cnpd.pt</a>.</p>
<h2>8. Changes</h2>
<p>This policy may be updated. The current version is always available on this page.</p>
<p class="sign">Last updated: ${LEGAL_UPDATED}</p>`;
}
