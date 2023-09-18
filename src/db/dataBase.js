export let askPcQuestions = [
  {
    question: "¿Tu pokemon es de tipo :REPLACE:?",
    possibleAnswersFk: 0,
  },
  {
    question: "¿Tu pokemon es color :REPLACE:?",
    possibleAnswersFk: 1,
  },
  {
    question: "¿Tu pokemon es :REPLACE:?",
    possibleAnswersFk: 2,
  },
];

export let possibleAnswers = [
  [
    "fuego",
    "planta",
    // "electrico",
    "agua",
    // "veneno",
    "insecto",
    // "volador",
    // "normal",
    // "fantasma",
    // "dragon",
    // "psiquico",
    // "pelea",
    // "tierra",
    // "roca",
    // "hada",
  ],
  ["rojo", "azul", "naranja", "morado", "amarillo", "verde", "cafe"],
  [],
];

export const getPossibleAnswer = (i, pokemons) => {
  if (askPcQuestions.length == 1) {
    const arrayPossibleAnswers = pokemons
      .filter((pokemon) => pokemon.pcEnabled)
      .map((pokemon) => pokemon.id);
    const pokemonId =
      arrayPossibleAnswers[
        Math.floor(Math.random() * arrayPossibleAnswers.length)
      ];
    return pokemons.find((pokemon) => pokemon.id === pokemonId).name;
  } else {
    const element = possibleAnswers[askPcQuestions[0].possibleAnswersFk];
    const j = Math.floor(Math.random() * element.length);
    const res = element[j];
    element.splice(j, 1);
    return res;
  }
};

export const pokemonsDB = {
  types: {
    fuego: "fire",
    planta: "grass",
    electrico: "electric",
    agua: "water",
    tierra: "ground",
    roca: "rock",
    hada: "fairy",
    veneno: "poison",
    insecto: "bug",
    dragon: "dragon",
    psiquico: "psychic",
    volador: "flying",
    pelea: "fighting",
    normal: "normal",
    fantasma: "ghost",
  },
  qualities: {
    canFly: [6, 12, 15, 16, 17, 18, 21, 22],
    zeroLegs: [11, 14],
    walkInTwoLegs: [4, 5, 7, 8, 9, 20], //For 4 legs just take the ids that are not in the array
    walkInForLegs: [1, 2, 3],
    verde: [1, 2, 3, 10, 11],
    rojo: [5],
    naranja: [4, 6],
    cafe: [16, 17, 18, 20, 21, 22, 13],
    azul: [7, 8, 9],
    amarillo: [16, 17, 18, 20, 14, 4, 6, 15],
    morado: [23, 24, 12, 19],
  },
  synonymous: {
    color: 1,
    rojo: 10,
    naranja: 10,
    amarillo: 10,
    rojo: 10,
    cafe: 10,
    azul: 10,
    morado: 10,
    verde: 10,

    volar: 2,

    tipo: 3,
    fuego: 30,
    planta: 30,
    electrico: 30,
    agua: 30,
    tierra: 30,
    roca: 30,
    hada: 30,
    veneno: 30,
    insecto: 30,
    dragon: 30,
    psiquico: 30,
    volador: 30,
    pelea: 30,
    normal: 30,
    fantasma: 30,

    pies: 4,
    patas: 4,

    es: 5,
    bulbasaur: 101,
    ivysaur: 102,
    venusaur: 103,
    charmander: 104,
    charmeleon: 105,
    charizard: 106,
    squirtle: 107,
    wartortle: 108,
    blastoise: 109,
    caterpie: 110,
    metapod: 111,
    butterfree: 112,
    weedle: 113,
    kakuna: 114,
    beedrill: 115,
    pidgey: 116,
    pidgeotto: 117,
    pidgeot: 118,
    rattata: 119,
    raticate: 120,
    spearow: 121,
    fearow: 122,
    ekans: 123,
    arbok: 124,
  },
};

export const think = (text, pokemons, setPokemons, turn, player) => {
  var tokens = text.split(/[\W||\s]+/);
  return filterPokemons(tokens, pokemons, setPokemons, turn, player);
};

const filterPokemons = (tokens, pokemons, setPokemons, turn, player) => {
  let correctAnswer = false,
    isThePokemon = false;
  tokens.forEach((token) => {
    token = token.toLowerCase();
    const lookUp = pokemonsDB.synonymous[token];

    if (!lookUp) return;

    if (lookUp == 10)
      correctAnswer = filterPokemonByColor(
        pokemons,
        setPokemons,
        token,
        turn,
        player
      );
    else if (lookUp == 30) {
      const type = pokemonsDB["types"][token];
      correctAnswer = filterPokemonByType(
        pokemons,
        setPokemons,
        type,
        turn,
        player
      );
    } else if (lookUp > 100) {
      let pokemonId = lookUp - 100;
      isThePokemon = player.id === pokemonId;

      if (!isThePokemon)
        setPokemons(
          pokemons.map((pokemon) => {
            if (player.id == pokemonId) filterPokemon(turn, pokemon);
            return pokemon;
          })
        );
    }
  });
  return { isThePokemon, correctAnswer };
};

const filterPokemon = (turn, pokemon) => {
  if (turn) pokemon.yourEnabled = false;
  else pokemon.pcEnabled = false;
};

export const filterPokemonByType = (
  pokemons,
  setPokemons,
  _type,
  turn,
  player
) => {
  const isThePokemon = player.types.find(({ type }) => type.name === _type);
  if (isThePokemon)
    setPokemons(
      pokemons.map((pokemon) => {
        if (!pokemon.types.find((type) => type.type.name === _type))
          filterPokemon(turn, pokemon);
        return pokemon;
      })
    );
  else
    setPokemons(
      pokemons.map((pokemon) => {
        if (pokemon.types.find((type) => type.type.name === _type))
          filterPokemon(turn, pokemon);
        return pokemon;
      })
    );
  return isThePokemon;
};

export const filterPokemonByColor = (
  pokemons,
  setPokemons,
  color,
  turn,
  player
) => {
  const idPokemons = pokemonsDB["qualities"][color];
  if (typeof idPokemons === "undefined") return { status: 500 };
  const isThePokemon = idPokemons.includes(player.id);
  if (isThePokemon)
    setPokemons(
      pokemons.map((pokemon) => {
        if (!idPokemons.includes(pokemon.id)) filterPokemon(turn, pokemon);
        return pokemon;
      })
    );
  else
    setPokemons(
      pokemons.map((pokemon) => {
        if (idPokemons.includes(pokemon.id)) filterPokemon(turn, pokemon);
        return pokemon;
      })
    );
  return isThePokemon;
};
