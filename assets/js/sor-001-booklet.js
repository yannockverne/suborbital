(() => {
  const lightbox = document.querySelector('[data-booklet-lightbox]');
  if (!lightbox) return;

  const triggers = Array.from(document.querySelectorAll('[data-booklet-open]'));
  const image = lightbox.querySelector('[data-booklet-image]');
  const closeButton = lightbox.querySelector('[data-booklet-close]');
  const prevButton = lightbox.querySelector('[data-booklet-prev]');
  const nextButton = lightbox.querySelector('[data-booklet-next]');
  const currentLabel = lightbox.querySelector('[data-booklet-current]');
  const pageLabel = lightbox.querySelector('[data-booklet-page-label]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pages = [
    ['01', '/assets/img/releases/sor-001/across-the-clouds-v2_01.webp'],
    ['02–03', '/assets/img/releases/sor-001/across-the-clouds-v2_02-03.webp'],
    ['04–05', '/assets/img/releases/sor-001/across-the-clouds-v2_04-05.webp'],
    ['06–07', '/assets/img/releases/sor-001/across-the-clouds-v2_06-07.webp'],
    ['08–09', '/assets/img/releases/sor-001/across-the-clouds-v2_08-09.webp'],
    ['10–11', '/assets/img/releases/sor-001/across-the-clouds-v2_10-11.webp'],
    ['12–13', '/assets/img/releases/sor-001/across-the-clouds-v2_12-13.webp'],
    ['14–15', '/assets/img/releases/sor-001/across-the-clouds-v2_14-15.webp'],
    ['16–17', '/assets/img/releases/sor-001/across-the-clouds-v2_16-17.webp'],
    ['18–19', '/assets/img/releases/sor-001/across-the-clouds-v2_18-19.webp'],
    ['20–21', '/assets/img/releases/sor-001/across-the-clouds-v2_20-21.webp'],
    ['22–23', '/assets/img/releases/sor-001/across-the-clouds-v2_22-23.webp'],
    ['24', '/assets/img/releases/sor-001/across-the-clouds-v2_24.webp']
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
      image.alt = `Across the Clouds booklet, page ${label}`;
      currentLabel.textContent = String(index + 1).padStart(2, '0');
      pageLabel.textContent = `Pages ${label}`;
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
    document.body.classList.add('is-booklet-open');
    render(startIndex);
    closeButton.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.classList.remove('is-booklet-open');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  };

  triggers.forEach(trigger => trigger.addEventListener('click', () => open(Number(trigger.dataset.bookletIndex || 0))));
  closeButton.addEventListener('click', close);
  prevButton.addEventListener('click', () => render(index - 1));
  nextButton.addEventListener('click', () => render(index + 1));

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target.classList.contains('booklet-lightbox-stage')) close();
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
