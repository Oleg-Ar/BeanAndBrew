document.addEventListener('DOMContentLoaded', async function () {
  const buttons = document.querySelectorAll('.c-btn--art');

  const response = await fetch('./data/menu.json');
  const menuData = await response.json();

  function renderTab(tabId) {
    const wrapper = document.querySelector('.menu-grid-wrapper');

    if (wrapper && menuData[tabId]) {
      const html = menuData[tabId]
        .map(
          (item) => `
                <div class="menu-item">
                    <div class="item-header">
                        <span class="name">${item.name}</span>
                        <span class="dots"></span>
                        <span class="price">${item.price}</span>
                    </div>
                    ${item.desc ? `<p class="description">${item.desc}</p>` : ''}      
                </div>
            `
        )
        .join('');
      wrapper.innerHTML = html;
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove('active'));

      // Activate clicked button
      this.classList.add('active');

      // Show corresponding content
      const tabId = this.getAttribute('data-tab');
      renderTab(tabId);
    });
  });
  renderTab('drinks');
});
