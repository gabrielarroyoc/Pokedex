let totalPokemons = 1;

const GetPokemonURL = (value) => `https://pokeapi.co/api/v2/pokemon/${value}/`;
const PokemonRender = (pokemon, isLast = true) => {
  const {
    sprites: { other },
    types,
  } = pokemon;

  const type = types[0].type.name;

  const pokemonImg = other["official-artwork"].front_default;

  div = document.createElement("div");
  div.setAttribute("class", `pokemon ${type}`);
  div.innerHTML = `
  <div class="container">
  <div class="card">
  <div class="content">
  <p>#${pokemon.id}</p>
  <p>${pokemon.name}</p>
  <div class="types">
  <p>${pokemon.types.map((type) => type.type.name).join(", ")}</p>
  <div class="size">
  </div>
  <a href="#">Ver Mais</a>
  <img class="imgPokemon" src="${pokemonImg}" alt="${
    pokemon.name
  }" loading="lazy"/>
    </div>
    </div>
    </div>
  `;

  if (isLast) {
    document.getElementById("pokedex").appendChild(div);
  } else {
    document.getElementById("pokedex").prepend(div);
  }
};

const getPokemons = async (offset, limit) => {
  const pokemonsPromises = [];
  for (let i = offset; i <= limit; i++) {
    const pokemon = fetch(GetPokemonURL(i)).then((res) => res.json());

    pokemonsPromises.push(pokemon);
  }

  const pokemons = await Promise.all(pokemonsPromises);

  return pokemons;
};

const fetchInitialPokemon = async () => {
  const pokemons = await getPokemons(1, 20);
  pokemons.forEach(PokemonRender);
  total = pokemons.length;
  console.log(pokemons);
};

const loadMore = async () => {
  const pokemons = await getPokemons(totalPokemons, totalPokemons + 20);
  console.log(pokemons);

  pokemons.forEach(PokemonRender);
  totalPokemons += 20;
};

const searchPokemonByName = async () => {
  const value = document.querySelector("input").value.toLowerCase();
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${value}`
    ).then((res) => res.json());
    PokemonRender(response, false);
    console.log(response);
  } catch (error) {
    alert("Pokemon não encontrado!");
  }
};

fetchInitialPokemon();
