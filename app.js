const pokemonList = document.querySelector("#pokemonList");
const defaultPokemon = "https://pokeapi.co/api/v2/pokemon/1/";
const pokemonCard = document.querySelector("#pokemonCard");

window.addEventListener("load", (e) => {
  getPokemonList().then(() => {
    showPokemonCard(defaultPokemon);
  });
  pokemonList.addEventListener("change", (e) => {
    showPokemonCard(e.target.value);
  });
  registerServiceWorker();
});

async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const json = await response.json();

  pokemonList.innerHTML = json.results.map(
    (result) => `<option value="${result.url}">${result.name}</option>`
  );
}
async function showPokemonCard(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();

    pokemonCard.innerHTML = createCard(json);
  } catch (error) {
    console.log("Network is unavailable");
    pokemonCard.innerHTML = offlineCard();
  }
}
function offlineCard() {
  return `
  <div class = "card-header">
  <p>NEtwork is unavailable</p>
  </div>
  `;
}
function createCard(pokemon) {
  return `
  <div class="card-header"><h2>#${pokemon.id}</h2></div>
            <img
              src="${pokemon.sprites.other.dream_world.front_default}"
              class="card-img-top mt-3"
              width="150"
              height="150"
              alt="Pokemon ${pokemon.name} Sprite"
            />
            <div class="card-body">
              <h3 class="card-title" style="text-transform: capitalize">
                ${pokemon.name}
              </h3>
              <div class="badge badge-warning">Height: ${pokemon.height}</div>
              <div class="badge badge-danger">Weight: ${pokemon.weight}</div>
            </div>
  `;
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
      console.log("SW registered");
    } catch (error) {
      console.log("Register failed: ", error);
    }
  }
}
