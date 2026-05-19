(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Header shadow on scroll
  const header = $(".site-header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  const menuBtn = $(".menu-toggle");
  const drawer = $(".nav-drawer");
  if (menuBtn && drawer) {
    const toggle = (open) => {
      const next = open ?? !drawer.classList.contains("is-open");
      drawer.classList.toggle("is-open", next);
      menuBtn.setAttribute("aria-expanded", String(next));
      document.body.style.overflow = next ? "hidden" : "";
    };
    menuBtn.addEventListener("click", () => toggle());
    drawer.addEventListener("click", (e) => {
      if (e.target.tagName === "A") toggle(false);
    });
  }

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  // Year stamp
  $$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

  // Contact form → GAS endpoint
  const form = $("#contact-form");
  if (form) {
    const status = $("#contact-status");
    const submit = form.querySelector("button[type=submit]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const data = {
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        message: fd.get("message"),
      };
      submit.disabled = true;
      const origLabel = submit.querySelector(".submit-label")?.textContent;
      if (submit.querySelector(".submit-label")) submit.querySelector(".submit-label").textContent = "送信中…";
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbyBsnb7tvEMmIoUuHfc-qTOl1CzZfBqzuvoCP0T5xlUHepp5TAyPb-bW3b9u-L99X7fMA/exec",
          { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(data) }
        );
        if (status) status.textContent = "お問い合わせありがとうございます。担当よりご連絡いたします。";
        form.reset();
      } catch (err) {
        if (status) status.textContent = "送信中にエラーが発生しました。お手数ですがメールでご連絡ください。";
      } finally {
        submit.disabled = false;
        if (submit.querySelector(".submit-label") && origLabel) submit.querySelector(".submit-label").textContent = origLabel;
      }
    });
  }
})();
