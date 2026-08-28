(() => {
  const lightbox = document.querySelector('[data-press-lightbox]');
  if (!lightbox) return;

  const triggers = Array.from(document.querySelectorAll('[data-press-open]'));
  const image = lightbox.querySelector('[data-press-image]');
  const closeButton = lightbox.querySelector('[data-press-close]');
  const prevButton = lightbox.querySelector('[data-press-prev]');
  const nextButton = lightbox.querySelector('[data-press-next]');
  const currentLabel = lightbox.querySelector('[data-press-current]');
  const pageLabel = lightbox.querySelector('[data-press-page-label]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pages = [
    ['01', '/assets/img/press/sor-001/kit-press-v2_01.webp'],
    ['02–03', '/assets/img/press/sor-001/kit-press-v2_02-03.webp'],
    ['04–05', '/assets/img/press/sor-001/kit-press-v2_04-05.webp'],
    ['06–07', '/assets/img/press/sor-001/kit-press-v2_06-07.webp'],
    ['08', '/assets/img/press/sor-001/kit-press-v2_08.webp']
  ];

  let index = 0;
  let previousFocus = null;
  let touchStartX = null;

  const resolved = src => {
    const base = document.documentElement.dataset.baseurl || '';
    return `${base}${src}`;
  };

  const preloadAround = () => {
    [index - 1, index + 1].forEach(i => {
      const wrapped = (i + pages.length) % pages.length;
      const preload = new Image();
      preload.src = resolved(pages[wrapped][1]);
    });
  };

  const render = nextIndex => {
    index = (nextIndex + pages.length) % pages.length;
    const [label, src] = pages[index];
    const update = () => {
      image.src = resolved(src);
      image.alt = `Across the Clouds press kit, page ${label}`;
      currentLabel.textContent = String(index + 1).padStart(2, '0');
      pageLabel.textContent = label.includes('–') ? `Pages ${label}` : `Page ${label}`;
      if (!reduceMotion) requestAnimationFrame(() => image.classList.remove('is-changing'));
      preloadAround();
    };

    if (reduceMotion) update();
    else {
      image.classList.add('is-changing');
      window.setTimeout(update, 150);
    }
  };

  const open = startIndex => {
    previousFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add('is-press-open');
    render(startIndex);
    closeButton.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove('is-press-open');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  };

  triggers.forEach(trigger => trigger.addEventListener('click', () => open(Number(trigger.dataset.pressIndex || 0))));
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
