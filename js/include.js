async function loadPartial(id, url) {
  const res = await fetch(url);
  if (!res.ok) return;
  document.getElementById(id).innerHTML = await res.text();
}

loadPartial("site-nav", "/partials/nav.html");
