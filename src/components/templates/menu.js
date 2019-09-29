export const getMenu = (menuItems) => `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${Array.from(menuItems.keys())
    .map((item) =>
      `<a class="trip-tabs__btn  ${menuItems.get(item).active ? `trip-tabs__btn--active` : ``}" data-item="${item.toLowerCase()}" href="#">${item}</a>`)
    .join(``)}
  </nav>`;
