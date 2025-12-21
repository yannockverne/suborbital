async function loadPartial(id, url) {
  const el = document.getElementById(id);
  if (!el) return false;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);

  el.innerHTML = await res.text();
  return true;
}

function setupNavDropdown() {
  const dd = document.getElementById("navArtists");
  if (!dd) {
    console.warn("[nav] #navArtists not found (nav not injected or ID missing)");
    return;
  }

  const btn = dd.querySelector(".nav-dd-btn");
  const menu = dd.querySelector(".nav-dd-menu");
  if (!btn || !menu) {
    console.warn("[nav] dropdown elements missing", { btn: !!btn, menu: !!menu });
    return;
  }

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
    e.stopPropagation();
    const isOpen = dd.getAttribute("aria-open") === "true";
    isOpen ? close() : open();
  };

  // Click toggle (reliable)
  btn.addEventListener("click", toggle);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!dd.contains(e.target)) close();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Optional: open on hover for mouse users
  dd.addEventListener("mouseenter", open);
  dd.addEventListener("mouseleave", close);

  console.log("[nav] dropdown ready");
}

(async function init() {
  try {
    const ok = await loadPartial("site-nav", "/partials/nav.html");
    if (ok) setupNavDropdown();
  } catch (e) {
    console.error("[nav] init failed", e);
  }
})();
