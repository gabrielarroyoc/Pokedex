const fetchData = async () => {
  const GetPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}/`;

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
     <img src="${pokemonImg}" alt="${pokemon.name}" loading="lazy"/>
      <button>${pokemon.name}</button>
      <button>${pokemon.id}</button>
      <button>${pokemon.types.map((type) => type.type.name).join(", ")}</button>
      <button>${pokemon.height}</button>
      <button>${pokemon.weight}</button>
    `;

    document.getElementById("pokedex").appendChild(div);
  });
};

fetchData();
