"use strict";

//Const
const button = document.querySelector(".js-button");
const showList = document.querySelector(".js-list");
const userValue = document.querySelector(".js-input");
const favlist = document.querySelector(".js-favlist");

let shows = []; //array para resultados
let favShow = []; //array para los favoritos
function loadFavoriteShows() {
  const savedFavShow = localStorage.getItem("favShow");
  if (savedFavShow) {
    favShow = JSON.parse(savedFavShow);
    paintFavorites();
  }
}
loadFavoriteShows();

//Funciones
function handleButton(ev) {
  ev.preventDefault();
  queryResults();
}

//Fetch
function queryResults() {
  let userSearch = userValue.value;
  fetch(`//api.tvmaze.com/search/shows?q=${userSearch}`)
    .then((response) => response.json())
    .then((results) => {
      shows = results;
      paintResults();
    });
}
//Función para pintar cada result obtenido.
function paintResults() {
  let html = "";
  for (let result of shows) {
    html += getShowHtml(result);
  }
  showList.innerHTML = html;
  addHandlerForAllCard();
}
// Devuelve un html que me permite dibujar un resultado
function getShowHtml(result) {
  const show = result.show;
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
    return favorite.show.id === id;
  });
  //console.log(favoriteShowFound); crear una función?
  if (favoriteShowFound !== -1) {
    liClass += " selectedCard";
  }
  return `<li class="${liClass}" id="${id}">
    <h4 class="list__title">${name}</h4>
     <img  src="${imageUrl}">
     </li>`;
}
// Añade un evento a cada carta dibujada en la pantalla
function addHandlerForAllCard() {
  const allShows = document.querySelectorAll(".card");
  for (let card of allShows) {
    card.addEventListener("click", handleClickedShow);
  }
}

//Función del evento click para cada uno de los shows.
function handleClickedShow(ev) {
  const clickedShowLi = ev.currentTarget;
  const clickedShowId = parseInt(clickedShowLi.id);
  //onsole.log(clickedShowId);
  const clickedShowObject = shows.find((serie) => {
    return serie.show.id === clickedShowId;
  });

  //Para meter en el array el show clickado
  updateFavoriteList();

  //console.log(favShow);
  paintFavorites();
  clickedShowLi.classList.toggle("selectedCard");

  localStorage.setItem("favShow", JSON.stringify(favShow));
}
//Función que añade o quita el favorito comprobando antes si esta
function updateFavoriteList(clickedShowId) {
  const favoriteShowFound = favShow.findIndex((favorite) => {
    return favorite.show.id === clickedShowId;
  });

  if (favoriteShowFound === -1) {
    favShow.push(clickedShowObject);
  } else {
    favShow.splice(favoriteShowFound, 1);
  }
}

function paintFavorites() {
  let html = "";
  for (let favOne of favShow) {
    const show = favOne.show;
    const name = show.name;
    const image = show.image;
    const id = show.id;

    let imageUrl = "";
    if (image) {
      imageUrl = image.medium;
    } else {
      imageUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    }
    html += `<li class="card list__item" id="${id}">
    <h4 class="list__title">${name}</h4>
     <img  src="${imageUrl}">
     </li>`;
  }
  favlist.innerHTML = html;

  const allShows = document.querySelectorAll(".card");
  for (let card of allShows) {
    card.addEventListener("click", handleClickedShow);
  }
}

//Eventos

button.addEventListener("click", handleButton);
