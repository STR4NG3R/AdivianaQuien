import React from "react";
import { CardPokemon } from "../CardPokemon";

const customPokeball = {
  0: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
  1: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
  2: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safari-ball.png",
  3: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dive-ball.png",
  4: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/net-ball.png",
};

export const Board = ({ pokemons, isYours }) => {
  return (
    <div id="id_container" className="poke-container">
      {pokemons.map((pokemon) =>
        isYours ? (
          <CardPokemon
            key={pokemon.id}
            name={pokemon.name}
            type={pokemon.types[0].type.name}
            image={pokemon.sprites.front_default}
            enabled={pokemon.yourEnabled}
            idx={pokemon.id}
          />
        ) : (
          <CardPokemon
            key={pokemon.id + "pc"}
            name=" "
            type=""
            image={customPokeball[Math.round(Math.random() * 4)]}
            enabled={pokemon.pcEnabled}
            idx={pokemon.id}
          />
        )
      )}
    </div>
  );
};
