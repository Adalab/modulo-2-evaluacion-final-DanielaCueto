"use strict";

/*Elementos que me he traido del DOM: 
  - Botón 
  - Lista donde se pintan todos los shows
  - Input que recoge el valor escrito por la usuaria 
  - Lista donde se pintan las películas favoritas

*/
const button = document.querySelector(".js-button");
const showList = document.querySelector(".js-list");
const userValue = document.querySelector(".js-input");
const favList = document.querySelector(".js-favlist");
//Arrays creados vacíos para ir rellenando con los shows
let shows = []; //array para resultados
let favShow = []; //array para los favoritos

//Fetch. Aquí hago petición al servidor para que me dé todos los shows
function queryResults() {
  let userSearch = userValue.value;
  fetch(`//api.tvmaze.com/search/shows?q=${userSearch}`) // petición a la api y en el q= pongo user search que es el value obtenido del input escrito por la usuaria
    .then((response) => response.json())
    .then((results) => {
      shows = [];
      for (let result of results) {
        const show = result.show;
        shows.push(show);
      }
      paintCards(shows, showList);
    });
}

//Funciones
function handleButton(ev) {
  ev.preventDefault();
  queryResults();
}

// para cargar los favoritos que estan en el localStorage
function loadFavoriteShows() {
  const savedFavShow = localStorage.getItem("favShow");
  if (savedFavShow) {
    favShow = JSON.parse(savedFavShow);
    paintCards(favShow, favList);
  }
}

//Función para pintar cada result obtenido y para pintar los favoritos pasandolos como parámetros.
function paintCards(showArray, showListHtml) {
  let html = "";
  for (let show of showArray) {
    html += getShowHtml(show);
  }
  showListHtml.innerHTML = html;
  addHandlerForCardsInList(showArray, showListHtml); //añade clickhandler
}
// Devuelve un html que me permite dibujar show el un <li>
function getShowHtml(show) {
  const name = show.name;
  const image = show.image;
  const id = show.id;

  let imageUrl = "";
  if (image) {
    imageUrl = image.medium;
  } else {
    imageUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  }

  let liClass = "card list__item";
  const favoriteShowFound = favShow.findIndex((favorite) => {
    return favorite.id === id;
  }); //El  show que estamos dibujando es favorito?

  if (favoriteShowFound !== -1) {
    liClass += " selectedCard";
  }

  return `<li class="${liClass}" id="${id}">
    <h4 class="list__title">${name}</h4>
     <img  src="${imageUrl}">
     </li>`;
}
// Añade un evento para escuchar cada carta dibujada en la pantalla

function addHandlerForCardsInList(showArray, showListHtml) {
  const allShowsHtml = showListHtml.querySelectorAll(".card");
  for (let card of allShowsHtml) {
    card.addEventListener("click", (ev) => {
      handleClickedShow(ev, showArray);
    });
  }
}
//ev: porque necesito llegar al currentTarget para saber cual es el li clickcado.
// ShowArray: Por qué he pasado este argumento? Porque cuando quería quitar de favoritos no estaba en el shows y tenía que mirar en favshow.
//Función del evento click para cada uno de los shows clickados.
function handleClickedShow(ev, showArray) {
  const clickedShowLi = ev.currentTarget;
  const clickedShowId = parseInt(clickedShowLi.id);
  // Antes: const clickedShowObject = shows.find((show) => {
  const clickedShowObject = showArray.find((show) => {
    return show.id === clickedShowId; //true or false
  });
  //Para meter en el array el show clickado
  updateFavoriteList(clickedShowObject);

  //console.log(favShow);
  paintCards(favShow, favList);
  paintCards(shows, showList);

  localStorage.setItem("favShow", JSON.stringify(favShow));
}
//Función que añade o quita el favorito comprobando antes si esta
function updateFavoriteList(clickedShowObject) {
  const favoriteShowFound = favShow.findIndex((favorite) => {
    return favorite.id === clickedShowObject.id;
  });

  if (favoriteShowFound === -1) {
    favShow.push(clickedShowObject);
  } else {
    favShow.splice(favoriteShowFound, 1);
  }
}

//Eventos
loadFavoriteShows();
button.addEventListener("click", handleButton);
