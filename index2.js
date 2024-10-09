if (!localStorage.getItem("NumPag") == "") {
} else {
  localStorage.setItem("NumPag", "1");
}
fetchMovies();
function fetchMovies() {
  var NumPag =
    "https://api.themoviedb.org/3/movie/popular?api_key=282317602e700d2d1d6cf2d5f6b107ce&language=es-ES&page=" +
    Number(localStorage.getItem("NumPag"));
  var xhr = new XMLHttpRequest();
  xhr.open("GET", NumPag, true);
  xhr.onload = function () {
    if (this.status == 200) {
      var resultados = JSON.parse(this.responseText);
      var output = "";
      for (var i in resultados.results) {
        output +=
          "<div class='Container'><img src='https://image.tmdb.org/t/p/original" +
          resultados.results[i].backdrop_path +
          "'><Div class='Title1'>Titulo Original :" +
          resultados.results[i].original_title +
          "</div><Div class='Title2'>Titulo: " +
          resultados.results[i].title +
          "</div><Div class='Overview'>" +
          resultados.results[i].overview +
          "</div></div>";
      }
      document.getElementById("MoviesDiv").innerHTML = output;
    } else {
      document.getElementById("MoviesDiv").innerHTML =
        "Failed to load results.";
    }
  };
  xhr.onerror = function () {
    console.log("Request error...");
  };
  xhr.send();
}
function NextPage() {
  localStorage.setItem("NumPag", Number(localStorage.getItem("NumPag")) + 1);
  document.getElementById("MoviesDiv").innerHTML = "";
  fetchMovies();
}
function PrevPage() {
  if (localStorage.getItem("NumPag") > 1) {
    localStorage.setItem("NumPag", Number(localStorage.getItem("NumPag")) - 1);
    document.getElementById("MoviesDiv").innerHTML = "";
    fetchMovies();
  } else {
  }
}
function doSearch() {
  var Definicion = document.getElementById("TextoABuscar").value;
  if (Definicion == "") {
    document.getElementById("MoviesSearch").innerHTML =
      "<H1>No hay texto para buscar</H1>";
  } else {
    var URLDeBusqueda =
      "https://api.themoviedb.org/3/search/movie?query=" +
      Definicion +
      "&api_key=282317602e700d2d1d6cf2d5f6b107ce&language=es-ES&page=1";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URLDeBusqueda, true);
    xhr.onload = function () {
      if (this.status == 200) {
        var resultados = JSON.parse(this.responseText);
        var output = "";
        for (var i in resultados.results) {
          output +=
            "<div class='Container'><img src='https://image.tmdb.org/t/p/original" +
            resultados.results[i].backdrop_path +
            "'><Div class='Title1'>Titulo Original :" +
            resultados.results[i].original_title +
            "</div><Div class='Title2'>Titulo: " +
            resultados.results[i].title +
            "</div><Div class='Overview'>" +
            resultados.results[i].overview +
            "</div></div>";
        }
        document.getElementById("MoviesSearch").innerHTML = output;
      } else {
        document.getElementById("MoviesSearch").innerHTML =
          "Failed to load results.";
      }
    };
    xhr.onerror = function () {
      console.log("Request error...");
    };
    xhr.send();
  }
}
