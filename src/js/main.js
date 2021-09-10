"use strict";

//Const
const button = document.querySelector(".js-button");
const showList = document.querySelector(".js-list");
const userValue = document.querySelector(".js-input");

//arrays (vacíos o no)
let html = [];

//Funciones
function handleButton(ev) {
  ev.preventDefault();
  queryResults();
}

//Fetch
function queryResults() {
  let userSearch = userValue.value;
  fetch(`//api.tvmaze.com/search/shows?q=${userSearch}`)
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      paintResults(results);
    });
}

function paintResults(results) {
  for (let result of results) {
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
    html += `<li>${name} <img id="{id}" src="${imageUrl}"></li>`;
  }

  showList.innerHTML = html;
}

//Eventos
button.addEventListener("click", handleButton);
