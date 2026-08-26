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

const releaseTabs = document.querySelector('[data-release-tabs]');

if (releaseTabs) {
  const tabList = releaseTabs.querySelector('[data-release-tab-list]');
  const tabs = [...releaseTabs.querySelectorAll('[data-release-tab]')];
  const panels = [...releaseTabs.querySelectorAll('[data-release-panel]')];
  const validHashes = new Set(tabs.map((tab) => tab.dataset.releaseTab));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeId;
  let transitionTimer;

  tabList.setAttribute('role', 'tablist');
  releaseTabs.classList.add('catalogue-tabs-ready');

  tabs.forEach((tab) => {
    const panelId = tab.dataset.releaseTab;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', `${panelId}-tab`);
    tab.setAttribute('aria-controls', panelId);
  });

  panels.forEach((panel) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `${panel.dataset.releasePanel}-tab`);
    panel.setAttribute('tabindex', '-1');
  });

  const finishTransition = (nextId, updateHistory, focusPanel) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.releaseTab === nextId;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const active = panel.dataset.releasePanel === nextId;
      panel.hidden = !active;
      panel.classList.remove('is-active', 'is-leaving');
      if (active) requestAnimationFrame(() => panel.classList.add('is-active'));
    });

    activeId = nextId;
    if (updateHistory && window.location.hash !== `#${nextId}`) history.pushState(null, '', `#${nextId}`);
    if (focusPanel) document.getElementById(nextId)?.focus({ preventScroll: true });
  };

  const activateTab = (nextId, { updateHistory = false, focusPanel = false } = {}) => {
    if (!validHashes.has(nextId)) return;
    if (nextId === activeId) {
      if (updateHistory && window.location.hash !== `#${nextId}`) history.pushState(null, '', `#${nextId}`);
      return;
    }
    window.clearTimeout(transitionTimer);
    const currentPanel = panels.find((panel) => panel.dataset.releasePanel === activeId);

    if (currentPanel && !reducedMotion.matches) {
      currentPanel.classList.remove('is-active');
      currentPanel.classList.add('is-leaving');
      transitionTimer = window.setTimeout(() => finishTransition(nextId, updateHistory, focusPanel), 180);
    } else {
      finishTransition(nextId, updateHistory, focusPanel);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      activateTab(tab.dataset.releaseTab, { updateHistory: true });
    });

    tab.addEventListener('keydown', (event) => {
      let nextIndex;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.releaseTab, { updateHistory: true });
    });
  });

  window.addEventListener('hashchange', () => {
    const hashId = decodeURIComponent(window.location.hash.slice(1));
    activateTab(validHashes.has(hashId) ? hashId : 'singles');
  });

  const initialHash = decodeURIComponent(window.location.hash.slice(1));
  finishTransition(validHashes.has(initialHash) ? initialHash : 'singles', false, false);
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

const revealTargets = [
  '.home-hero .hero-inner',
  '.record-section .record-grid',
  '.tpr-section .tpr-copy',
  '.truth-section .truth-grid',
  '.artists-index-intro .section-heading',
  '.artist-file',
  '.releases-archive-header .release-shell',
  '.catalogue-release',
  '.session-section .session-copy',
  '.artist-v2-hero-copy',
  '.artist-v2-intro .artist-v2-prose',
  '.artist-v2-portrait-grid',
  '.artist-v2-story .artist-v2-editorial-grid',
  '.artist-v2-feature .artist-v2-shell',
  '.artist-v2-facts dl',
  '.artist-v2-ending img',
  '.artist-v2-appearances .artist-v2-editorial-grid',
  '.session-v2-hero-copy',
  '.session-v2-chapter-grid',
  '.session-v2-final-grid',
  '.session-v2-after-grid',
  '.tpr-hero-inner',
  '.tpr-introduction-grid',
  '.tpr-broadcast-grid',
  '.credits-hero-inner',
  '.credits-portrait-grid',
  '.credits-identity-grid',
  '.credits-nok-grid',
  '.credits-process-grid',
  '.credits-roll .shell',
  '.credits-note-grid'
];

revealTargets.forEach((selector) => {
  document.querySelectorAll(selector).forEach((item) => item.classList.add('reveal'));
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
