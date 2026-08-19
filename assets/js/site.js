const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  nav.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  });
}

if (document.body.classList.contains('home')) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const hash = link.getAttribute('href');
    let target;

    try {
      target = hash.length > 1 && document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return;
    }

    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== hash) history.pushState(null, '', hash);
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  });
}
