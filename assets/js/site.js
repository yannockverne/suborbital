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

const sectionRails = document.querySelectorAll('[data-section-rail]');

sectionRails.forEach((sectionRail) => {
  const sectionLinks = [...sectionRail.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const setActiveSection = (section) => {
    // The theme describes the background behind the fixed rail, not the section's content panel.
    sectionRail.dataset.theme = section.dataset.railTheme || 'dark';
    sectionLinks.forEach((link) => {
      if (link.hash === `#${section.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  if (sections.length) setActiveSection(sections[0]);

  sectionLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      setActiveSection(target);
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', link.hash);
    });
  });

  if ('IntersectionObserver' in window) {
    const visibleSections = new Map();
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target, entry.intersectionRatio);
        else visibleSections.delete(entry.target);
      });
      const active = [...visibleSections].sort((a, b) => b[1] - a[1])[0]?.[0];
      if (active) setActiveSection(active);
    }, { threshold: [0.15, 0.35, 0.55], rootMargin: '-15% 0px -25% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));
  }
});

const reveals = document.querySelectorAll('.reveal');

if (reveals.length) {
  document.body.classList.add('reveal-ready');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    reveals.forEach((item) => revealObserver.observe(item));
  }
}
