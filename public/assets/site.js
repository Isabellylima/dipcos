// Mobile menu
(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();

// Shared: validate, collect labelled fields, send to the Worker; fall back to the visitor's email app
function dipcosForm(form, opts) {
  var lang = document.documentElement.lang.indexOf("pt") === 0 ? "pt" : "en";
  var submitBtn = form.querySelector("[type=submit]");
  var btnHtml = submitBtn.innerHTML;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (el) {
      var bad = !el.checkValidity();
      el.classList.toggle("err", bad);
      if (bad && ok) { el.focus(); ok = false; }
    });
    if (!ok) return;

    var payload = { lang: lang }, lines = [];
    form.querySelectorAll("[name]").forEach(function (el) {
      var v = el.tagName === "SELECT" ? el.options[el.selectedIndex].text : el.value.trim();
      if (el.name === "product" && el.tagName === "SELECT") v = el.options[el.selectedIndex].text;
      payload[el.name] = v;
      if (el.dataset.label) lines.push(el.dataset.label + ": " + (v || "-"));
    });
    var text = lines.join("\n");

    submitBtn.disabled = true;
    submitBtn.textContent = form.dataset.sending || "…";

    fetch(opts.endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (res) {
        if (res && res.ok) opts.onSent(text);
        else fallback();
      })
      .catch(fallback)
      .finally(function () { submitBtn.disabled = false; submitBtn.innerHTML = btnHtml; });

    function fallback() {
      var href = "mailto:" + form.dataset.to +
        "?subject=" + encodeURIComponent(opts.subject(payload)) +
        "&body=" + encodeURIComponent(text);
      opts.onFallback(text);
      window.location.href = href;
    }
  });
}

// Contact form
(function () {
  var form = document.querySelector("form.contact");
  if (!form) return;
  var status = form.querySelector(".form-status");
  dipcosForm(form, {
    endpoint: "/api/contact",
    subject: function (p) { return form.dataset.subject + " — " + p.name; },
    onSent: function () { form.reset(); status.textContent = form.dataset.sent; status.hidden = false; status.className = "form-status ok"; },
    onFallback: function () { status.textContent = form.dataset.fallback; status.hidden = false; status.className = "form-status"; },
  });
})();

// Order request dialog
(function () {
  var dlg = document.getElementById("order");
  if (!dlg) return;
  var form = dlg.querySelector("form");
  var stepForm = form.querySelector(".step-form");
  var stepSent = form.querySelector(".step-sent");
  var stepDone = form.querySelector(".step-done");
  var summaryEl = form.querySelector(".summary");
  var lastText = "";

  function open(id) {
    stepForm.hidden = false; stepDone.hidden = true; stepSent.hidden = true;
    if (id) form.elements.product.value = id;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    form.elements.quantity.focus();
  }
  function close() { dlg.close ? dlg.close() : dlg.removeAttribute("open"); }

  document.querySelectorAll("[data-order]").forEach(function (b) {
    b.addEventListener("click", function () { open(b.getAttribute("data-order")); });
  });
  form.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", close); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });

  dipcosForm(form, {
    endpoint: "/api/order",
    subject: function (p) { return form.dataset.subject + " — " + p.product.split(" – ")[0] + " — " + (p.name || p.email); },
    onSent: function () { form.reset(); stepForm.hidden = true; stepSent.hidden = false; },
    onFallback: function (text) { lastText = text; summaryEl.textContent = text; stepForm.hidden = true; stepDone.hidden = false; },
  });

  var copyBtn = form.querySelector("[data-copy]");
  copyBtn.addEventListener("click", function () {
    if (navigator.clipboard) navigator.clipboard.writeText(form.dataset.to + "\n\n" + lastText).then(function () { copyBtn.textContent = form.dataset.copied; }, function () {});
  });

  var m = location.hash.match(/^#order-(\w+)/);
  if (m) open(m[1]);
})();
