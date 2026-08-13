(function () {
  "use strict";

  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  if (!form || !status) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "Nothing was sent. This contact form is not connected yet.";
  });
})();
