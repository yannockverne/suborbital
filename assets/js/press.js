(() => {
  const lightbox = document.querySelector('[data-press-lightbox]');
  if (!lightbox) return;

  const image = lightbox.querySelector('[data-press-image]');
  const closeButton = lightbox.querySelector('[data-press-close]');
  const prevButton = lightbox.querySelector('[data-press-prev]');
  const nextButton = lightbox.querySelector('[data-press-next]');
  const currentLabel = lightbox.querySelector('[data-press-current]');
  const totalLabel = lightbox.querySelector('[data-press-total]');
  const pageLabel = lightbox.querySelector('[data-press-page-label]');
  const titleLabel = lightbox.querySelector('[data-press-lightbox-title]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let pages = [];
  let title = '';
  let catalogue = '';
  let index = 0;
  let previousFocus = null;
  let touchStartX = null;

  const preloadAround = () => {
    if (!pages.length) return;
    [index - 1, index + 1].forEach(i => {
      const wrapped = (i + pages.length) % pages.length;
      const preload = new Image();
      preload.src = pages[wrapped].src;
    });
  };

  const render = nextIndex => {
    if (!pages.length) return;
    index = (nextIndex + pages.length) % pages.length;
    const page = pages[index];
    const update = () => {
      image.src = page.src;
      image.alt = `${title} press kit, page ${page.label}`;
      currentLabel.textContent = String(index + 1).padStart(2, '0');
      totalLabel.textContent = String(pages.length).padStart(2, '0');
      pageLabel.textContent = page.label.includes('–') ? `Pages ${page.label}` : `Page ${page.label}`;
      if (!reduceMotion) requestAnimationFrame(() => image.classList.remove('is-changing'));
      preloadAround();
    };

    if (reduceMotion) update();
    else {
      image.classList.add('is-changing');
      window.setTimeout(update, 150);
    }
  };

  const open = (trigger, startIndex) => {
    const entry = trigger.closest('[data-press-entry]');
    const pageStore = entry?.querySelector('[data-press-pages]');
    if (!pageStore) return;

    pages = Array.from(pageStore.querySelectorAll('[data-press-page]')).map(node => ({
      label: node.dataset.label || '',
      src: node.dataset.src || ''
    })).filter(page => page.src);
    if (!pages.length) return;

    title = pageStore.dataset.pressTitle || 'Press kit';
    catalogue = pageStore.dataset.pressCatalogue || '';
    titleLabel.textContent = `${title.toUpperCase()} // ${catalogue} // PRESS KIT`;
    lightbox.setAttribute('aria-label', `${title} press kit`);

    previousFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add('is-press-open');
    render(startIndex);
    closeButton.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove('is-press-open');
    image.removeAttribute('src');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  };

  document.querySelectorAll('[data-press-open]').forEach(trigger => {
    trigger.addEventListener('click', () => open(trigger, Number(trigger.dataset.pressIndex || 0)));
  });
  closeButton.addEventListener('click', close);
  prevButton.addEventListener('click', () => render(index - 1));
  nextButton.addEventListener('click', () => render(index + 1));

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target.classList.contains('press-lightbox-stage')) close();
  });

  lightbox.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') render(index - 1);
    if (event.key === 'ArrowRight') render(index + 1);
  });

  lightbox.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', event => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 48) return;
    render(index + (delta < 0 ? 1 : -1));
  }, { passive: true });
})();
