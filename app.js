let total = 0;
const GetPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`;

const fetchData = async () => {
  const pokemonsPromises = [];

  for (let i = 1; i <= 500; i++) {
    const pokemon = fetch(GetPokemonURL(i)).then((res) => res.json());

    pokemonsPromises.push(pokemon);
  }

  const pokemons = await Promise.all(pokemonsPromises);

  pokemons.forEach((pokemon) => {
    const {
      sprites: { other },
      types,
    } = pokemon;

    const type = types[0].type.name;

    const pokemonImg = other["official-artwork"].front_default;

    div = document.createElement("div");
    div.setAttribute("class", `pokemon ${type}`);
    div.innerHTML = `
       <div class="card-image" ><img src="${pokemonImg}" alt="${
      pokemon.name
    }" loading="lazy"/>
       </div>
       <div class="card-text">
       <span class="date">${pokemon.id}</span>
       <p>${pokemon.name}</p>
       </div>
       <div class="card-stats">
        <p>${pokemon.types.map((type) => type.type.name).join(", ")}</p>
        <p>${pokemon.height}</p>
        <p>${pokemon.weight}</p>
        </div>
      `;

    document.getElementById("pokedex").appendChild(div);
  });
};

fetchData();
