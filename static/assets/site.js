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
