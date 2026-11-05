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

// Contact form -> opens the visitor's email app with a pre-filled message
(function () {
  var form = document.querySelector("form.contact");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var d = new FormData(form);
    var lines = [
      d.get("message"),
      "",
      "—",
      (form.dataset.lName || "Name") + ": " + d.get("name"),
      "Email: " + d.get("email"),
      (form.dataset.lPhone || "Phone") + ": " + (d.get("phone") || "-"),
      (form.dataset.lType || "Project type") + ": " + d.get("type"),
    ];
    var href =
      "mailto:" + form.dataset.to +
      "?subject=" + encodeURIComponent(form.dataset.subject + " — " + d.get("name")) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = href;
  });
})();

// Shop — order request dialog (sends the order by email via the visitor's email app)
(function () {
  var dlg = document.getElementById("order");
  if (!dlg) return;
  var form = dlg.querySelector("form");
  var stepForm = form.querySelector(".step-form");
  var stepDone = form.querySelector(".step-done");
  var summaryEl = form.querySelector(".summary");
  var lastText = "";

  function open(id) {
    stepForm.hidden = false; stepDone.hidden = true;
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

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (el) {
      var bad = !el.checkValidity();
      el.classList.toggle("err", bad);
      if (bad && ok) { el.focus(); ok = false; }
    });
    if (!ok) return;
    var lines = [];
    form.querySelectorAll("[data-label]").forEach(function (el) {
      var v = el.tagName === "SELECT" ? el.options[el.selectedIndex].text : el.value.trim();
      lines.push(el.getAttribute("data-label") + ": " + (v || "-"));
    });
    lastText = lines.join("\n");
    var prod = form.elements.product.options[form.elements.product.selectedIndex].text.split(" – ")[0];
    var who = form.elements.name.value.trim() || form.elements.email.value.trim();
    var href = "mailto:" + form.dataset.to +
      "?subject=" + encodeURIComponent(form.dataset.subject + " — " + prod + " — " + who) +
      "&body=" + encodeURIComponent(lastText);
    summaryEl.textContent = lastText;
    stepForm.hidden = true; stepDone.hidden = false;
    window.location.href = href;
  });

  var copyBtn = form.querySelector("[data-copy]");
  copyBtn.addEventListener("click", function () {
    var done = function () { copyBtn.textContent = form.dataset.copied; };
    if (navigator.clipboard) navigator.clipboard.writeText(form.dataset.to + "\n\n" + lastText).then(done, function () {});
  });

  // open directly from a link like /shop#order-battery
  var m = location.hash.match(/^#order-(\w+)/);
  if (m) open(m[1]);
})();
