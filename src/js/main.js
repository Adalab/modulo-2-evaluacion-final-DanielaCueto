"use strict";

//Variables y constantes
const button = document.querySelector(".js-button");
const showList = document.querySelector(".js-list");
const userValue = document.querySelector(".js-input");
const favList = document.querySelector(".js-favlist");

let shows = []; //array para resultados
let favShow = []; //array para los favoritos

//Fetch
function queryResults() {
  let userSearch = userValue.value;
  fetch(`//api.tvmaze.com/search/shows?q=${userSearch}`)
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

function loadFavoriteShows() {
  const savedFavShow = localStorage.getItem("favShow");
  if (savedFavShow) {
    favShow = JSON.parse(savedFavShow);
    paintFavListCards(favShow);
  }
}

function paintFavListCards(showArray){
  paintCards(showArray, favList)
  if (showArray.length === 0){
    favList.classList.remove('page__favList--line');
  } else{favList.classList.add('page__favList--line')}
}

//Función para pintar cada result obtenido.
function paintCards(showArray, showListHtml) {
  let html = "";
  for (let show of showArray) {
    html += getShowHtml(show);
  }
  showListHtml.innerHTML = html;
  addHandlerForCardsInList(showArray, showListHtml);
}
// Devuelve un html que me permite dibujar un resultado
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
  });

  if (favoriteShowFound !== -1) {
    liClass += " selectedCard";
  }
  return `<li class="${liClass}" id="${id}">
    <h4 class="list__title">${name}</h4>
     <img  src="${imageUrl}">
     </li>`;
}
// Añade un evento a cada carta dibujada en la pantalla
function addHandlerForCardsInList(showArray, showListHtml) {
  const allShowsHtml = showListHtml.querySelectorAll(".card");
  for (let card of allShowsHtml) {
    card.addEventListener("click", (ev) => {
      handleClickedShow(ev, showArray);
    });
  }
}

//Función del evento click para cada uno de los shows.
function handleClickedShow(ev, showArray) {
  const clickedShowLi = ev.currentTarget;
  const clickedShowId = parseInt(clickedShowLi.id);
  const clickedShowObject = showArray.find((show) => {
    return show.id === clickedShowId; //true or false
  });
  //Para meter en el array el show clickado
  updateFavoriteList(clickedShowObject);

  //console.log(favShow);
  paintFavListCards(favShow);
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
