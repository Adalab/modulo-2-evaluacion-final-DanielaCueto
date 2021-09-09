"use strict";

//Variables
const button = document.querySelector(".js-button");
//console.log(button);
const showList = document.querySelector(".js-list");
//console.log(showList);

//arrays (vacíos o no)

//Funciones
function handleButton(ev) {}
//Eventos
button.addEventListener("click", handleButton);

//Fetch

fetch("http://api.tvmaze.com/search/shows?q=furious")
  .then((response) => {
    return response.json();
  })
  .then((results) => {
    let html = "";
    for (let result of results) {
      const show = result.show;
      console.log(show);
      const name = show.name;
      //console.log(name);
      const image = show.image;
      let imageUrl = "";
      if (image) {
        imageUrl = image.medium;
      } else {
        imageUrl = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
      }

      //console.log(`${name} - ${image}`);
      html += `<li>${name} <img src="${imageUrl}">- </li>`;
    }

    showList.innerHTML = html;
  });
