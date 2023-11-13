// Inicializa las constantes y llena con los datos del body y del header de los menus
const tabBodies = document.querySelectorAll(".tab-body-single");
const tabHeads = document.querySelectorAll(".tab-head-single");

// Indica cuál menú está activo en la aplicacion
let activeTab = 1;

// Inicializa la aplicación
const init = () => {
  showActiveTabBody();
  showActiveTabHead();
};

// Muestra el menú activo
const showActiveTabHead = () => {
  hideAllTabHead();
  tabHeads[activeTab - 1].classList.add("active-tab");
};

// Muestra la información activa
const showActiveTabBody = () => {
  hideAllTabBody();
  tabBodies[activeTab - 1].classList.add("show-tab");
};

// Oculta todos los contenidos de las pestañas
const hideAllTabBody = () => {
  tabBodies.forEach((singleTabBody) =>
    singleTabBody.classList.remove("show-tab")
  );
};

// Oculta todos los menús
const hideAllTabHead = () => {
  tabHeads.forEach((singleTabHead) =>
    singleTabHead.classList.remove("active-tab")
  );
};

// Cambia el menú y el contenido activos cuando se hace clic en un menú
const switchTab = (newTab) => {
  hideAllTabHead();
  activeTab = newTab;
  showActiveTabHead();
  showActiveTabBody();
};

// Evento de escucha de clic en los menús
tabHeads.forEach((singleTabHead) => {
  singleTabHead.addEventListener("click", () => {
    const newTab = parseInt(singleTabHead.dataset.id);
    switchTab(newTab);
  });
});

// Búsqueda

// Elemento de formulario de búsqueda
const searchForm = document.querySelector(".app-header-search");

// Obtiene el valor de búsqueda y realiza la solicitud a la API
const handleSearch = async (event) => {
  event.preventDefault();
  const searchText = searchForm.search.value;
  fetchMovies(searchText);
};

// Evento de escucha del formulario de búsqueda
searchForm.addEventListener("submit", handleSearch);

// Realiza la solicitud a la API
const fetchMovies = async (searchText) => {
  const apiKey = "8284dc57";
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchText}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    showMovieDetails(data);
  } catch (error) {
    console.log(error);
  }
};

// Rellena de información a cada sección de la película
const showMovieDetails = (info) => {

  console.log(info);

  document.querySelector(
    ".app-body-content-thumbnail"
  ).innerHTML = `<img src="${info.Poster}" alt="${info.Title}"/>`;

  document.querySelector(".detalles").innerHTML = `
  
  <li> 
      <div>
          <span>Género</span>
      </div>
      <span>${info.Genre}</span>
  </li>
  <li>
      <div>
          <span>Clasificación</span>
      </div>
      <span>${info.Rated}</span>
  </li>  
  <li>
      <div>
          <span>Año</span>
      </div>
      <span>${info.Year}</span>
  </li>
  <li>
      <div>
          <span>Lenguaje</span>
      </div>
      <span>${info.Language}</span>
  </li>
  <li>
      <div>
          <span>Duración</span>
      </div>
      <span>${info.Runtime}</span>
  </li>
  
  <li>
      <div>
          <span>Director</span>
      </div>
      <span>${info.Director}</span>
  </li>
  <li>
      <div>
          <span>Reparto</span>
      </div>
      <span>${info.Actors}</span>
  </li>  
  `;
  document.querySelector(".resenia").innerHTML =`
  <li>      
      <span>${info.Plot}</span>
  </li>
  `;
  let listado="";
  info.Ratings.forEach((rating) => {
    listado = listado + `
    <li>
    <div>
      <span>${rating.Source}</span>
    </div>      
    <span>${rating.Value}</span>
  </li>`;
  });

  document.querySelector(".calificacion").innerHTML =`
  <li>
    <div>
      <span>Galardones</span>
    </div>      
    <span>${info.Awards}</span>
  </li>${listado}
  `;
  

};

// Inicializa la aplicación cuando se carga la página
window.addEventListener("DOMContentLoaded", init);
