const API_KEY = 'SYtDMCazXLeVcZW2Tma6UfXuaLeAfLxX76AWR2oz';

const fechaInput = document.getElementById('fecha');
const buscarBtn = document.getElementById('buscar');
const hoyBtn = document.getElementById('hoy');
const favoritoBtn = document.getElementById('favorito');

const contenidoApod = document.getElementById('contenido-apod');
const tituloApod = document.getElementById('titulo-apod');
const fechaApod = document.getElementById('fecha-apod');
const medioApod = document.getElementById('medio-apod');
const explicacionApod = document.getElementById('explicacion-apod');
const errorMensaje = document.getElementById('error');

const listaFavoritos = document.getElementById('lista-favoritos');

let apodActual = null;

// --------------------- FECHA ---------------------
function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('max', today);
}

// --------------------- API NASA ---------------------
async function obtenerImagenDeLaNasa(fecha) {
    try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();

        if (respuesta.ok) {
            apodActual = data;
            mostrarAPOD(data);
        } else {
            mostrarError(data.msg || 'No se pudo obtener la imagen.');
        }
    } catch (error) {
        mostrarError('Error de conexión con la API.');
        console.error(error);
    }
}

// --------------------- MOSTRAR ---------------------
function mostrarAPOD(data) {
    errorMensaje.classList.add('oculto');
    contenidoApod.classList.remove('oculto');

    tituloApod.textContent = data.title;
    fechaApod.textContent = data.date;
    explicacionApod.textContent = data.explanation;

    medioApod.innerHTML = ''; // Limpiar

    if (data.media_type === 'image') {
        const img = document.createElement('img');
        img.src = data.url;
        img.alt = data.title;
        img.classList.add('imagen-apod');
        medioApod.appendChild(img);
    } else if (data.media_type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.src = data.url;
        iframe.width = '100%';
        iframe.height = '400';
        iframe.frameBorder = '0';
        medioApod.appendChild(iframe);
    }
}

function mostrarError(mensaje) {
    errorMensaje.textContent = mensaje;
    errorMensaje.classList.remove('oculto');
    contenidoApod.classList.add('oculto');
}

// --------------------- FAVORITOS ---------------------
function guardarEnFavoritos() {
    if (!apodActual) return;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Validar duplicados por URL
    if (!favoritos.some(fav => fav.url === apodActual.url)) {
        favoritos.push(apodActual);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        mostrarFavoritos();
    } else {
        alert("Ya está en favoritos.");
    }
}

function mostrarFavoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    listaFavoritos.innerHTML = '';

    if (favoritos.length === 0) {
        listaFavoritos.innerHTML = '<p>No hay favoritos guardados.</p>';
        return;
    }

    favoritos.forEach((fav, index) => {
        const card = document.createElement("div");
        card.classList.add("favorito-card");
        card.innerHTML = `
            <h4>${fav.title}</h4>
            <img src="${fav.url}" alt="${fav.title}" width="200">
            <p>${fav.explanation}</p>
            <p>${fav.date}</p>
            <button data-index="${index}" class="eliminar-fav">Eliminar</button>
            <hr>
        `;
        listaFavoritos.appendChild(card);
    });

    // Añadir listeners a botones de eliminar
    document.querySelectorAll(".eliminar-fav").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            eliminarFavorito(index);
        });
    });
}

function eliminarFavorito(index) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
}

// --------------------- EVENTOS ---------------------
buscarBtn.addEventListener('click', () => {
    const fecha = fechaInput.value;
    if (fecha) obtenerImagenDeLaNasa(fecha);
});

hoyBtn.addEventListener('click', () => {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.value = today;
    obtenerImagenDeLaNasa(today);
});

favoritoBtn.addEventListener('click', guardarEnFavoritos);

// --------------------- INICIALIZAR ---------------------
document.addEventListener('DOMContentLoaded', () => {
    setMaxDate();
    hoyBtn.click(); // Carga la imagen del día
    mostrarFavoritos(); // Carga favoritos almacenados
});
