import { removeFavorite, getFavorites } from './storage.js';

/**
 * Renderiza la lista de favoritos en el DOM
 * @param {Array} favs Lista de favoritos
 * @param {Function} onSelect Callback que recibe la fecha del favorito clickeado
 */
export function renderFavorites(favs, onSelect) {
  const favList = document.getElementById('lista-favoritos');
  favList.innerHTML = '';

  if (favs.length === 0) {
    favList.innerHTML = '<li>No hay favoritos guardados.</li>';
    return;
  }

  favs.forEach(fav => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="cursor:pointer; color:lightblue" data-date="${fav.date}">
        📅 ${fav.date} - ${fav.title}
      </span>
      <button data-remove="${fav.date}">❌</button>
    `;
    favList.appendChild(li);
  });

  // Click para seleccionar un favorito
  favList.querySelectorAll('span[data-date]').forEach(el => {
    el.addEventListener('click', () => onSelect(el.dataset.date));
  });

  // Click para eliminar un favorito
  favList.querySelectorAll('button[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFavorite(btn.dataset.remove);
      renderFavorites(getFavorites(), onSelect);
    });
  });
}