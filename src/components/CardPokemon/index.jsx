import React from "react";
import Zoom from "react-reveal/Bounce";

let colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ghost: "#AC6ACD",
};

export const CardPokemon = ({ name, type, idx, image, enabled }) => {
  var name = name[0].toUpperCase() + name.slice(1);
  var className = "pokemon";
  if (!enabled) className += " disabled";
  return (
    <Zoom>
      <div
        className={className}
        key={idx}
        style={{ backgroundColor: colors[type] }}
      >
        <div className="img-container">
          <img src={image} alt={name} />
        </div>
        <div className="info">
          <div className="number">#{idx.toString().padStart(3, "0")}</div>
          <div className="name">{name}</div>
          <div className="type">{type}</div>
        </div>
      </div>
    </Zoom>
  );
};
