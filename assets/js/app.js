//Variables
const listaTweets = document.getElementById("lista-tweets");

//Eventos
eventListener();

function eventListener() {
  //Cuando se envia el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  //Borrar tweets
  listaTweets.addEventListener("click", borrarTweet);

  // Contenido cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

//Funciones

//Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  //Leer el valor de textarea
  const tweet = document.getElementById("tweet").value;
  //Boton de eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerHTML = "x";

  //Creo elemento y le agrego el contenido a la lista
  const li = document.createElement("li");
  li.innerText = tweet;
  //Agrega el boton de borrar al tweet
  li.appendChild(botonBorrar);
  //Agrega el tweet a la lista
  listaTweets.appendChild(li);
  //Añadir a localStorage
  agregarTweetLocalStorage(tweet);
}
//Elmina el Tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

//Agrega tweet al local storage

function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  //Aladir el nuevo Tweet
  tweets.push(tweet);
  //Convertir de arreglo a string
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Comprobar que haya elementos en Local Storage, retorna un array
function obtenerTweetsLocalStorage() {
  let tweets;
  //Revisamos los valores de local strorage
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}
// Mostar datos de Local Storage em la lista

function localStorageListo() {
  let tweets;

  tweets = obtenerTweetsLocalStorage();
  
  tweets.forEach((tweet) => {
    //Boton de eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerHTML = "x";
    const li = document.createElement("li");
    li.innerText = tweet;
    //Agrega el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //Agrega el tweet a la lista
    listaTweets.appendChild(li);
  });
}
//Eliminar Tweet de LocalStorage

function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;
  //Elimina la x del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, i) {
    if (tweetBorrar === tweet) {
      tweets.splice(i, 1);
    }
  });
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
