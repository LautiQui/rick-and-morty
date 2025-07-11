//  ELEMENTOS del DOM
const btnAll = document.getElementById('btn-all'); // obtener todos los personajes
const resultsDiv = document.getElementById('results'); // contenedor donde mostramos resultados
const form = document.getElementById('filter-form'); // formulario de filtros

// Función para mostrar personajes en pantalla
function mostrarPersonajes(personajes) {
  if (!personajes.length) {
    resultsDiv.innerHTML = '<p>No se encontraron personajes.</p>';
    return;
  }

let html = '';
personajes.forEach(p => {
  html += `<div class="personajes">
    <strong>${p.name}</strong><br />
    ${p.status} - ${p.species}<br />
    <img src="${p.image}" alt="${p.name}" width="100" />
  </div>`;
});


  resultsDiv.innerHTML = html;
}

// Evento para OBTENER todos los personajes
btnAll.addEventListener('click', () => {
  // Mostrar mensaje mientras cargan los personajes
  resultsDiv.innerHTML = '<p>Cargando personajes...</p>';

  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
      return response.json();
    })
    .then(data => {
      mostrarPersonajes(data.results);
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});

// Evento para buscar personajes con filtros
form.addEventListener('submit', e => {
  e.preventDefault(); // Evitar que se recargue la página al enviar el formulario

  // Mostrar mensaje mientras cargan los personajes filtrados
  resultsDiv.innerHTML = '<p>Cargando personajes filtrados...</p>';

  // Obtener valores de los inputs del formulario
  const formData = new FormData(form);
  const params = new URLSearchParams();

  // Agregar solo los campos que no estén vacíos a los parámetros
  for (const [key, value] of formData.entries()) {
    if (value.trim() !== '') {
      params.append(key, value.trim());
    }
  }

  // Construir la URL con los parámetros de filtro
  const url = `https://rickandmortyapi.com/api/character/?${params.toString()}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se encontraron personajes con esos filtros');
      }
      return response.json();
    })
    .then(data => {
      mostrarPersonajes(data.results);
    })
    .catch(error => {
      resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
