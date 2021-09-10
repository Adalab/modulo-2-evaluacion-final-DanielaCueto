"use strict";

//Const
const button = document.querySelector(".js-button");
const showList = document.querySelector(".js-list");
const userValue = document.querySelector(".js-input");
const favlist = document.querySelector(".js-favlist");

//arrays (vacíos o no)
let favShow = []; //array para los favoritos

let shows = []; //array para resultados

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
    html += `<li class="card list__item" id="${id}">
    <h4 class="list__title">${name}</h4>
     <img  src="${imageUrl}">
     </li>`;
  }
  showList.innerHTML = html;

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
  const favoriteShowFound = favShow.findIndex((favorite) => {
    return favorite.show.id === clickedShowId;
  });
  //console.log(favoriteShowFound); crear una función?
  if (favoriteShowFound === -1) {
    favShow.push(clickedShowObject);
  } else {
    favShow.splice(favoriteShowFound, 1);
  }
  //console.log(favShow);
  paintFavorites();
  clickedShowLi.classList.toggle("selectedCard");
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

//# sourceMappingURL=main.js.map
