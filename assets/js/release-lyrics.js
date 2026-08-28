(() => {
  const dialog = document.querySelector('[data-lyrics-dialog]');
  if (!dialog) return;

  const closeButton = dialog.querySelector('[data-lyrics-close]');
  const title = dialog.querySelector('[data-lyrics-title]');
  const credit = dialog.querySelector('[data-lyrics-credit]');
  const body = dialog.querySelector('[data-lyrics-body]');
  const triggers = [...document.querySelectorAll('[data-lyrics-open]')];
  let lastTrigger = null;

  const closeDialog = () => {
    dialog.hidden = true;
    document.body.classList.remove('lyrics-open');
    body.replaceChildren();
    lastTrigger?.focus();
    lastTrigger = null;
  };

  const openDialog = (trigger) => {
    const sourceId = trigger.dataset.lyricsSource;
    const source = sourceId && document.getElementById(sourceId);
    if (!source) return;

    lastTrigger = trigger;
    title.textContent = trigger.dataset.lyricsTitle || 'Lyrics';
    credit.textContent = trigger.dataset.lyricsCredit || '';
    body.replaceChildren(source.content.cloneNode(true));
    dialog.hidden = false;
    document.body.classList.add('lyrics-open');
    dialog.scrollTop = 0;
    closeButton.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openDialog(trigger));
  });

  closeButton?.addEventListener('click', closeDialog);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  document.addEventListener('keydown', (event) => {
    if (dialog.hidden) return;
    if (event.key === 'Escape') closeDialog();
  });
})();
