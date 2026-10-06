const themeButton = document.querySelector('.theme-toggle');
function setTheme(light) {
  document.body.classList.toggle('light', light);
  themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  document.querySelector('meta[name="theme-color"]').content = light ? '#f7f9f4' : '#101312';
}
try { setTheme(localStorage.getItem('kk-theme') === 'light'); } catch {}
themeButton.addEventListener('click', () => {
  const light = !document.body.classList.contains('light');
  setTheme(light);
  try { localStorage.setItem('kk-theme', light ? 'light' : 'dark'); } catch {}
});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(project => {
      const show = button.dataset.filter === 'all' || project.dataset.category.split(' ').includes(button.dataset.filter);
      project.hidden = !show;
      if (show) count++;
    });
    document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
  });
});
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('kirankumar.r.be@email.com'); status.textContent = 'Email copied'; }
  catch { status.textContent = 'Select the email address to copy it, or click it to open your email app.'; }
});
