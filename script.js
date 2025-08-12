const API_KEY = 'SYtDMCazXLeVcZW2Tma6UfXuaLeAfLxX76AWR2oz';
const fechaInput = document.getElementById('fecha');
const buscar = document.getElementById('buscar');
const contenidoApod = document.getElementById('contenido-apod');
const tituloApod = document.getElementById('titulo-apod');
const fechaApod = document.getElementById('fecha-apod');
const medioApod = document.getElementById('medio-apod');
const explicacionApod = document.getElementById('explicacion-apod');


// FETCH A LA API
async function obtenerImagenDeLaNasa(fecha) {
    try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fecha}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (respuesta.ok) {
            mostrarAPOD(datos);
        } else {
            console.log(datos.msg || 'No se pudo obtener la imagen.');
        }
    } catch (error) {
        console.error('Error de conexión con la API.', error);
    }     
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
    } 
}

// EVENTO ON-CLICK AL BOTON BUSCAR (FECHA)
buscar.addEventListener('click', () => {
    const fechaSeleccionada = fechaInput.value;
    if (fechaSeleccionada) {
        obtenerImagenDeLaNasa(fechaSeleccionada);
    }
});

// Crear estrellas dinámicas
function crearEstrellas() {
  const contenedor = document.getElementById('estrellas');
  const count = 300;
  
  for (let i = 0; i < count; i++) {
    const estrella = document.createElement('div');
    estrella.classList.add('estrella');
    
    // Tamaño aleatorio entre 1 y 4px
    const size = Math.random() * 4 + 1;
    estrella.style.width = `${size}px`;
    estrella.style.height = `${size}px`;
    
    // Posición aleatoria
    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.top = `${Math.random() * 100}%`;
    
    // Duración de animación aleatoria
    const duracion = `${Math.random() * 5 + 3}s`;
    estrella.style.setProperty('--duracion', duracion);
    
    // Retraso de animación aleatorio
    estrella.style.animationDelay = `${Math.random() * 5}s`;
    
    contenedor.appendChild(estrella);
  }
}

window.addEventListener('load', crearEstrellas);