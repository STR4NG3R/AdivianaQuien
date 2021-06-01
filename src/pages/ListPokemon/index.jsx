import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { CardPokemon } from "../../components/CardPokemon";
import { URL } from "../../config";
import axios from "axios";
import { Board } from "../../components/Board";
import { Question } from "../../components/Question";
import Zoom from "react-reveal/Zoom";

export const ListPokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yourPokemon, setYourPokemon] = useState({});
  const [pcPokemon, setPcPokemon] = useState({});
  const [open, setOpen] = useState(false);
  const [turn, setTurn] = useState(true);

  useEffect(async () => {
    const size = 24;
    let _pokemons = [];
    for (let i = 1; i <= size; i++) {
      await axios
        .get(`${URL}pokemon/${i}`)
        .then((data) => _pokemons.push(data.data))
        .catch((error) => console.log(error));
    }
    console.log("fetched");
    let i = 0,
      j = 0;
    while (i == j) {
      i = Math.ceil(Math.random() * size);
      j = Math.ceil(Math.random() * size);
    }
    setYourPokemon(_pokemons[i]);
    setPcPokemon(_pokemons[j]);
    setLoading(false);
    setPokemons(
      _pokemons.map((pokemon) => {
        pokemon.pcEnabled = true;
        pokemon.yourEnabled = true;
        return pokemon;
      })
    );
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        <Zoom opposite cascade collapse>
          Adivina Quien
        </Zoom>
      </h2>
      {!loading &&
      pokemons.length > 0 &&
      typeof yourPokemon !== "undefined" &&
      typeof pcPokemon !== "undefined" ? (
        <div id="id_container" className="poke-container">
          <div>
            <h2>
              <Zoom opposite cascade collapse>
                Tu Pokemon
              </Zoom>
            </h2>
            <CardPokemon
              key={yourPokemon.id}
              name={yourPokemon.name}
              type={yourPokemon.types[0].type.name}
              image={yourPokemon.sprites.front_default}
              enabled={true}
              idx={yourPokemon.id}
            />
          </div>

          <div>
            <h2>
              <Zoom opposite cascade collapse>
                Pc Pokemon
              </Zoom>
            </h2>
            <CardPokemon
              key={pcPokemon.id}
              enabled={true}
              name="???"
              type="???"
              image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png"
              idx="???"
            />
          </div>
        </div>
      ) : null}

      <div id="id_container" className="poke-container">
        {!loading && pokemons.length > 0 ? (
          <>
            <Question
              show={open}
              setShow={setOpen}
              setTurn={setTurn}
              turn={turn}
              setPokemons={setPokemons}
              pokemons={pokemons}
              players={[pcPokemon, yourPokemon]}
            />
            <Carousel
              autoPlay={false}
              emulateTouch={true}
              interval={100000}
              statusFormatter={(_currentItem, _total) => ""}
            >
              <>
                <h2>Tu Tablero</h2>
                <Board pokemons={pokemons} isYours={true} />
              </>
              <>
                <h2>Tablero Pc</h2>
                <Board pokemons={pokemons} isYours={false} />
              </>
            </Carousel>
          </>
        ) : null}
      </div>
    </>
  );
};
