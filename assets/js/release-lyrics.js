(() => {
  const dialog = document.querySelector('[data-lyrics-dialog]');
  if (!dialog) return;

  const closeButton = dialog.querySelector('[data-lyrics-close]');
  const title = dialog.querySelector('[data-lyrics-title]');
  const credit = dialog.querySelector('[data-lyrics-credit]');
  const body = dialog.querySelector('[data-lyrics-body]');
  const writers = dialog.querySelector('[data-lyrics-writers]');
  const writersBody = dialog.querySelector('[data-lyrics-writers-body]');
  const triggers = [...document.querySelectorAll('[data-lyrics-open]')];
  let lastTrigger = null;

  const closeDialog = () => {
    dialog.hidden = true;
    document.body.classList.remove('lyrics-open');
    body.replaceChildren();
    writersBody?.replaceChildren();
    if (writers) writers.hidden = true;
    lastTrigger?.focus();
    lastTrigger = null;
  };

  const openDialog = (trigger) => {
    const sourceId = trigger.dataset.lyricsSource;
    const source = sourceId && document.getElementById(sourceId);
    if (!source) return;

    const writersSourceId = trigger.dataset.lyricsWritersSource;
    const writersSource = writersSourceId && document.getElementById(writersSourceId);

    lastTrigger = trigger;
    title.textContent = trigger.dataset.lyricsTitle || 'Lyrics';
    credit.textContent = trigger.dataset.lyricsCredit || '';
    body.replaceChildren(source.content.cloneNode(true));

    if (writers && writersBody) {
      writersBody.replaceChildren();
      if (writersSource) {
        writersBody.append(writersSource.content.cloneNode(true));
      }
      writers.hidden = !writersBody.textContent.trim();
    }

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
