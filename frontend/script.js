document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');
  const themeSwitch = document.querySelector('.theme-switch');
  const collapseToggle = document.getElementById('collapseToggle');
  const subpageToggle = document.getElementById('subpageToggle');

  if (themeSwitch) {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const buttons = [...themeSwitch.querySelectorAll('button')];
    buttons.forEach(b => b.classList.toggle('is-active', b.dataset.mode === current));

    themeSwitch.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const mode = btn.dataset.mode;
      document.documentElement.setAttribute('data-theme', mode);
      try { localStorage.setItem('theme', mode); } catch (err) {}
      buttons.forEach(b => b.classList.toggle('is-active', b === btn));
    });
  }

  if (collapseToggle && page) {
    collapseToggle.addEventListener('click', () => {
      page.classList.toggle('menu-collapsed');
    });
  }

  if (subpageToggle && page) {
    subpageToggle.addEventListener('click', () => {
      page.classList.toggle('subpages-collapsed');
    });
  }
});
