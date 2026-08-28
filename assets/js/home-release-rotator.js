(() => {
  const rotator = document.querySelector('[data-release-rotator]');
  if (!rotator) return;

  const slides = Array.from(rotator.querySelectorAll('[data-release-slide]'));
  const tabs = Array.from(rotator.querySelectorAll('[data-release-tab]'));
  const progress = rotator.querySelector('.release-rotator-progress-bar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interval = 6500;

  if (slides.length < 2 || tabs.length !== slides.length) return;

  let activeIndex = 0;
  let timer = null;
  let autoplay = !reduceMotion;

  const restartProgress = () => {
    if (!progress || !autoplay) return;
    rotator.classList.remove('is-autoplaying');
    void progress.offsetWidth;
    rotator.classList.add('is-autoplaying');
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (!autoplay) return;
    restartProgress();
    timer = window.setTimeout(() => show((activeIndex + 1) % slides.length, false), interval);
  };

  const stopAutoplay = () => {
    autoplay = false;
    window.clearTimeout(timer);
    rotator.classList.remove('is-autoplaying');
  };

  const show = (nextIndex, userInitiated) => {
    if (nextIndex === activeIndex) {
      if (userInitiated) stopAutoplay();
      return;
    }

    const current = slides[activeIndex];
    const next = slides[nextIndex];

    current.classList.remove('is-active', 'is-entering');
    next.classList.add('is-active');

    if (!reduceMotion) {
      current.classList.add('is-leaving');
      next.classList.add('is-entering');
      window.setTimeout(() => current.classList.remove('is-leaving'), 520);
      window.setTimeout(() => next.classList.remove('is-entering'), 520);
    }

    tabs[activeIndex].setAttribute('aria-selected', 'false');
    tabs[activeIndex].tabIndex = -1;
    tabs[nextIndex].setAttribute('aria-selected', 'true');
    tabs[nextIndex].tabIndex = 0;

    activeIndex = nextIndex;

    if (userInitiated) stopAutoplay();
    else schedule();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => show(index, true));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      stopAutoplay();

      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      show(nextIndex, true);
      tabs[nextIndex].focus();
    });
  });

  rotator.addEventListener('focusin', () => {
    if (!autoplay) return;
    window.clearTimeout(timer);
    rotator.classList.remove('is-autoplaying');
  });

  rotator.addEventListener('focusout', event => {
    if (!autoplay || rotator.contains(event.relatedTarget)) return;
    schedule();
  });

  schedule();
})();
