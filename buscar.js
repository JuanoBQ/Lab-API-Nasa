
// AGREGAR FAVORITOSSSSS

const imagenDelDia = document.getElementById("imagen-del-dia");
const botonGuardarFav = document.getElementById("agregar-favorito");
const favoritos = document.getElementById("mostrar-favorito");

let apodActual = null;

//cargar imagen del día desde la API de NASA APOD
async function obtenerAPOD() {
    const respuesta = await fetch("https://api.nasa.gov/planetary/apod?api_key=pCkCvtXD1GBUZr1t5KRmiKJqazGBnyXezfY68IDL");
    const data = await respuesta.json();

    apodActual = data; // Guardar la imagen actual para agregarla después a favoritos

    imagenDelDia.innerHTML = `
        <h3>${data.title}</h3>
        <img src="${data.url}" alt="${data.title}" width="400">
        <p>${data.explanation}</p>
    `;
}

//guardar imagen en favoritos
function guardarEnFavoritos() {
    if (!apodActual) return;

    let listaFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Evitar duplicados
    if (!listaFavoritos.some(item => item.url == apodActual.url)) {
        listaFavoritos.push(apodActual);
        localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));
        mostrarFavoritos();
    }
}

//mostrar
function mostrarFavoritos() {
    let listaFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.innerHTML = "";

    listaFavoritos.forEach((fav, index) => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h4>${fav.title}</h4>
            <img src="${fav.url}" alt="${fav.title}" width="200">
            <p>${fav.explanation}</p>
            <button onclick="eliminarFavorito(${index})">Eliminar</button>
            <hr>
        `;
        favoritos.appendChild(card);
    });
}

//eliminar
function eliminarFavorito(index) {
    let listaFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    listaFavoritos.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));
    mostrarFavoritos();
}


botonGuardarFav.addEventListener("click", guardarEnFavoritos);

//inicializamos
obtenerAPOD();
mostrarFavoritos();
