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

const trackButtons = document.querySelectorAll('[data-track-url]');
const player = document.querySelector('[data-soundcloud-player]');

if (trackButtons.length && player) {
  const playerFrame = player?.querySelector('[data-player-frame]');
  const playerTitle = player?.querySelector('[data-player-title]');
  const playerFallback = player?.querySelector('[data-player-fallback]');

  trackButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const trackUrl = button.dataset.trackUrl;
      const trackTitle = button.dataset.trackTitle;
      trackButtons.forEach((item) => {
        const active = item === button;
        item.setAttribute('aria-pressed', String(active));
        item.closest('[data-track-row]')?.classList.toggle('is-active', active);
        item.querySelector('span').textContent = active ? 'Playing' : 'Listen';
      });
      player.hidden = false;
      playerTitle.textContent = trackTitle;
      playerFallback.href = trackUrl;
      playerFrame.title = `SoundCloud player: ${trackTitle}`;
      playerFrame.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23c75b2a&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`;
      player.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    });
  });

}

if (document.body.classList.contains('release-page')) {
  document.body.classList.add('reveal-ready');
  const reveals = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach((item) => observer.observe(item));
  }
}
