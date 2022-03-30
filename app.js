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
    } = pokemon;

    const pokemonImg = other["official-artwork"].front_default;

    div = document.createElement("div");
    div.innerHTML = `
     <img src="${pokemonImg}" alt="${pokemon.name}" loading="lazy"/>
      <h2>${pokemon.name}</h2>
      <p>${pokemon.id}</p>
      <p>${pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <p>${pokemon.height}</p>
      <p>${pokemon.weight}</p>
    `;

    document.body.appendChild(div);
  });
};

fetchData();
