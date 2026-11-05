// Dipcos Energy — Worker
// Serve o site estático (public/) e recebe os formulários em /api/order e /api/contact,
// enviando-os por email com o Cloudflare Email Service (binding EMAIL).

const MAX_FIELD = 4000;

const ORDER_FIELDS = [
  ["product", "Product / Produto"],
  ["quantity", "Quantity / Quantidade"],
  ["name", "Name / Nome"],
  ["email", "Email"],
  ["phone", "Phone / Telefone"],
  ["shipping", "Shipping address / Morada de entrega"],
  ["technician", "Installation technician / Técnico de instalação"],
  ["nif", "NIF"],
  ["billing", "Billing address / Morada de faturação"],
  ["message", "Message / Mensagem"],
];
const CONTACT_FIELDS = [
  ["name", "Name / Nome"],
  ["email", "Email"],
  ["phone", "Phone / Telefone"],
  ["type", "Project type / Tipo de projeto"],
  ["message", "Message / Mensagem"],
];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

const clean = (v) => String(v ?? "").replace(/\r/g, "").trim().slice(0, MAX_FIELD);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const escHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function handleForm(request, env, kind) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  // Honeypot anti-spam: campo escondido que pessoas não preenchem
  if (clean(body.website)) return json({ ok: true });

  const fields = kind === "order" ? ORDER_FIELDS : CONTACT_FIELDS;
  const data = Object.fromEntries(fields.map(([k]) => [k, clean(body[k])]));

  const required = kind === "order" ? ["product", "email", "shipping", "technician"] : ["name", "email", "message"];
  const missing = required.filter((k) => !data[k]);
  if (missing.length) return json({ ok: false, error: "missing", fields: missing }, 400);
  if (!isEmail(data.email)) return json({ ok: false, error: "invalid_email" }, 400);

  if (!env.EMAIL) return json({ ok: false, error: "email_not_configured" }, 503);

  const lang = body.lang === "pt" ? "PT" : "EN";
  const who = data.name || data.email;
  const subject =
    kind === "order"
      ? `Order request / Pedido de encomenda — ${data.product.split(" – ")[0]} × ${data.quantity || 1} — ${who}`
      : `Website contact / Contacto do site — ${who}`;

  const rows = fields.map(([k, label]) => [label, data[k] || "-"]);
  const text = `${kind === "order" ? "New order request" : "New contact message"} (www.dipcos.pt, ${lang})\n\n` + rows.map(([l, v]) => `${l}: ${v}`).join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
<h2 style="color:#2F8DBA;margin:0 0 12px">${kind === "order" ? "New order request — Dipcos Energy" : "New contact message — Dipcos Energy"}</h2>
<table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:640px">
${rows.map(([l, v]) => `<tr><td style="border-bottom:1px solid #eee;color:#666;width:42%;vertical-align:top">${escHtml(l)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escHtml(v)}</td></tr>`).join("\n")}
</table>
<p style="color:#888;font-size:12px">Sent from www.dipcos.pt (${lang}). Reply to this email to answer the customer directly.</p></div>`;

  try {
    await env.EMAIL.send({
      from: { email: env.MAIL_FROM, name: "Dipcos Energy Website" },
      to: env.MAIL_TO,
      replyTo: { email: data.email, name: data.name || data.email },
      subject,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    console.error("email send failed", err && err.message);
    return json({ ok: false, error: "send_failed" }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/order" || url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);
      return handleForm(request, env, url.pathname === "/api/order" ? "order" : "contact");
    }
    return env.ASSETS.fetch(request);
  },
};
