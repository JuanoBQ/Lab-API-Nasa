const API_KEY = 'SYtDMCazXLeVcZW2Tma6UfXuaLeAfLxX76AWR2oz';
const fechaInput = document.getElementById('fecha');
const buscar = document.getElementById('buscar');
const hoyBtn = document.getElementById('hoy');
const favoritoBtn = document.getElementById('favorito');
const contenidoApod = document.getElementById('contenido-apod');
const tituloApod = document.getElementById('titulo-apod');
const fechaApod = document.getElementById('fecha-apod');
const medioApod = document.getElementById('medio-apod');
const explicacionApod = document.getElementById('explicacion-apod');
const cargando = document.getElementById('cargando');
const errorMensaje = document.getElementById('error');
const listaFavoritos = document.getElementById('lista-favoritos');
 
// Establecer la fecha máxima como hoy
function setMaxDate() {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('max', today);
}
  
// FETCH A LA API
async function obtenerImagenDeLaNasa(fecha) {
 
    try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
 
        if (respuesta.ok) {
            mostrarAPOD(datos);
        } else {
            mostrarError(datos.msg || 'No se pudo obtener la imagen.');
        }
    } catch (error) {
        mostrarError('Error de conexión con la API.');
        console.error(error);
    } finally {
        mostrarCargando(false);
    }
}
 
// Mostrar mensaje de error
function mostrarError(mensaje) {
    errorMensaje.textContent = mensaje;
    errorMensaje.classList.remove('oculto');
    contenidoApod.classList.add('oculto');
}
 

// RENDERIZACION DEL CONTENIDO CON LOS DATOS TRAIDOS DE LA API
function mostrarAPOD(data) {
    tituloApod.textContent = data.title;
    fechaApod.textContent = data.date;
    explicacionApod.textContent = data.explanation;

    // Limpiar contenido anterior
    medioApod.innerHTML = '';

    if (data.media_type === 'image') {
        const img = document.createElement('img');
        img.src = data.url;
        img.alt = data.title;
        img.classList.add('imagen-apod');
        medioApod.appendChild(img);
    } else {
        const img = document.createElement('img');
        img.src = data.url;
        img.alt = data.title;
        img.classList.add('imagen-apod');
        medioApod.appendChild(img);
    }
}
 
// Obtener la fecha de hoy en formato YYYY-MM-DD
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}
 
// Cargar la imagen del día actual
function cargarImagenDelDia() {
    const today = getTodayDate();
    fechaInput.value = today;
    obtenerImagenDeLaNasa(today);
}
 
// EVENTO ON-CLICK AL BOTON BUSCAR (FECHA)
buscar.addEventListener('click', () => {
    const fechaSeleccionada = fechaInput.value;
    if (fechaSeleccionada) {
        obtenerImagenDeLaNasa(fechaSeleccionada);
    }
});
 
// EVENTO ON-CLICK AL BOTON HOY
hoyBtn.addEventListener('click', cargarImagenDelDia);
 
// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setMaxDate();
    cargarImagenDelDia();
});