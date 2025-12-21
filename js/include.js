async function loadPartial(id, url, afterLoad) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    el.innerHTML = await res.text();
    if (typeof afterLoad === "function") afterLoad();
  } catch (e) {
    console.warn("Partial load failed:", url, e);
  }
}

function setupNavDropdown() {
  const dd = document.getElementById("navArtists");
  if (!dd) return;

  const btn = dd.querySelector(".nav-dd-btn");
  const menu = dd.querySelector(".nav-dd-menu");

  const open = () => {
    dd.setAttribute("aria-open", "true");
    btn.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    dd.removeAttribute("aria-open");
    btn.setAttribute("aria-expanded", "false");
  };

  const toggle = (e) => {
    e.preventDefault();
    const isOpen = dd.getAttribute("aria-open") === "true";
    isOpen ? close() : open();
  };

  // Click toggle (reliable)
  btn.addEventListener("click", toggle);

  // Hover open on desktop (still feels "hover")
  dd.addEventListener("mouseenter", open);
  dd.addEventListener("mouseleave", close);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!dd.contains(e.target)) close();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Prevent menu click from closing immediately before navigation
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

loadPartial("site-nav", "/partials/nav.html", setupNavDropdown);
