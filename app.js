(() => {
  const progress = document.getElementById('progress');
  const updateProgress = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
  };
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const input = document.getElementById('search');
  const results = document.getElementById('results');
  if (!input || !results) return;
  fetch((location.pathname.includes('/docs/') ? '../' : '') + 'search-index.json')
    .then((response) => response.json())
    .then((items) => {
      const render = (query = '') => {
        const q = query.trim().toLowerCase();
        const matched = q ? items.filter((item) => `${item.title} ${item.text}`.toLowerCase().includes(q)) : items;
        results.innerHTML = matched.slice(0, 30).map((item) => `<li><a href="${location.pathname.includes('/docs/') ? '../' : ''}${item.url}">${item.title}</a></li>`).join('');
      };
      input.addEventListener('input', () => render(input.value));
      render();
    })
    .catch(() => {});
})();
