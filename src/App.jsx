import React from "react";
import "./style.css";
import { ListPokemon } from "./pages/ListPokemon";
import { askPcQuestions, getPossibleAnswer, think } from "./db/dataBase";
/*import useSound from "use-sound"
import soundtrack from "../02.mp3"*/

function App() {
  return <ListPokemon 
    askPcQuestions={askPcQuestions}
    getPossibleAnswer={getPossibleAnswer}
    think={think}
  />
}
export default App;
