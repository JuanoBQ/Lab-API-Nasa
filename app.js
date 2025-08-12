import { saveFavorite, getFavorites } from './storage.js';
import { renderFavorites } from './ui.js';
import { fetchAPOD } from './apodApi.js';

// Botones y elementos
const favBtn = document.getElementById('favorito');

// APOD actual mostrado (lo guarda la UI cuando muestra una imagen)
let currentAPOD = null;

// Función para renderizar la APOD en pantalla
function renderAPOD(data) {
  const resultado = document.getElementsByClassName("imagen-apod");
  currentAPOD = data; // guardo el APOD actual para favoritos

  let mediaHTML = '';
  if (data.media_type === 'image') {
    mediaHTML = `<img src="${data.url}" alt="${data.title}" style="max-width:100%;">`;
  } else if (data.media_type === 'video') {
    mediaHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width:100%;height:400px;"></iframe>`;
  }

  resultado.innerHTML = `
    <h2>${data.title} (${data.date})</h2>
    ${mediaHTML}
    <p>${data.explanation}</p>
  `;
}

// Cargar favorito desde lista
function loadAPODFromFav(date) {
  fetchAPOD(date).then(renderAPOD);
}

// Guardar favorito actual
favBtn.addEventListener('click', () => {
  if (currentAPOD) {
    saveFavorite(currentAPOD);
    renderFavorites(getFavorites(), loadAPODFromFav);
  }
});

// Al iniciar, mostrar favoritos
document.addEventListener('DOMContentLoaded', () => {
  renderFavorites(getFavorites(), loadAPODFromFav);
});
