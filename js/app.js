// js/app.js

// if (import.meta.env?.DEV) {
//     // Эти строки нужны ТОЛЬКО для Vite, чтобы он следил за файлами
//     import('../partials/header.html?raw');
//     import('../partials/footer.html?raw');
// }
window.addEventListener('load', function () {
  const loader = document.getElementById('page-loader');

  if (loader) {
    // Проверяем, видели ли мы лоадер в этой сессии
    if (sessionStorage.getItem('viewedLoader')) {
      // Если уже видели — убираем мгновенно без анимации
      loader.style.display = 'none';
    } else {
      // Если первый раз — ждем и плавно скрываем
      setTimeout(() => {
        loader.classList.add('hide');
        sessionStorage.setItem('viewedLoader', 'true');
      }, 1500);
    }
  }
});
async function loadHTML(id, url) {
  const el = document.getElementById(id);
  if (!el) return; // 👈 key line

  const resp = await fetch(url);
  const text = await resp.text();
  el.innerHTML = text;

  // If we just loaded the footer, update the year
  if (id === 'footer') {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
}

// loads everywhere
loadHTML('header', 'partials/header.html');
loadHTML('footer', 'partials/footer.html');
