// js/storage.js
const KEY = 'apod_favorites';

/**
 * Obtiene la lista de favoritos desde localStorage
 * @returns {Array} lista de objetos APOD
 */
export function getFavorites() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

/**
 * Guarda un APOD en favoritos si no existe ya
 * @param {Object} apod Objeto APOD con {date, title, url, media_type, explanation}
 */
export function saveFavorite(apod) {
  const favs = getFavorites();
  if (!favs.some(f => f.date === apod.date)) {
    favs.unshift(apod); // poner al inicio
    localStorage.setItem(KEY, JSON.stringify(favs));
  }
}

/**
 * Elimina un favorito por fecha
 * @param {string} date Fecha en formato YYYY-MM-DD
 */
export function removeFavorite(date) {
  const favs = getFavorites().filter(f => f.date !== date);
  localStorage.setItem(KEY, JSON.stringify(favs));
}
