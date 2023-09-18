import React, { useState } from "react";
import Modal from "react-modal";
import { Button, Grid, TextField } from "@material-ui/core";
import Zoom from "react-reveal/Zoom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#modal");

export const Question = ({
  show,
  setShow,
  setTurn,
  turn,
  setPokemons,
  pokemons,
  players,
  think,
  getPossibleAnswer,
  askPcQuestions,
}) => {
  const [text, setText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(true);
  const handleOpen = () => {
    setShow(!show);
    setTurn(true);
    setText("");
  };

  const handleGame = () => {
    const questionPlayer = think(text, pokemons, setPokemons, true, players[0]);

    setCorrectAnswer(questionPlayer.isThePokemon);
    if (questionPlayer.isThePokemon) {
      alert("Has ganado!");
      return;
    }

    let question = askPcQuestions[0].question.replace(
      ":REPLACE:",
      getPossibleAnswer(0, pokemons)
    );
    setText(question);
    const questionPc = think(
      question,
      pokemons,
      setPokemons,
      false,
      players[1]
    );
    if (questionPc.correctAnswer) askPcQuestions.shift();
    if (questionPc.isThePokemon) alert("La computadora ah ganado!");
    setTurn(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Pregunta
      </Button>
      <Modal
        isOpen={show}
        onAfterOpen={() => setShow(true)}
        onRequestClose={handleOpen}
        style={customStyles}
        contentLabel="Pregunta"
      >
        <Grid container spacing={3}>
          {turn ? (
            <>
              <Grid item xs={12}>
                <h2>Preguntame :)</h2>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tu Pregunta"
                  variant="filled"
                  fullWidth={true}
                  value={text}
                  onChange={(evt) => setText(evt.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth={true}
                  onClick={handleGame}
                >
                  ¡Preguntar!
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <h2>
                  <Zoom opposite cascade collapse>
                    Tu respuesta es:
                    {correctAnswer ? "Correcta" : "Incorrecta"}
                  </Zoom>
                </h2>
              </Grid>
              <Grid item xs={12}>
                <h2>
                  <Zoom opposite cascade collapse>
                    Mi Pregunta
                  </Zoom>
                </h2>
              </Grid>
              <Grid item xs={12}>
                <h2>
                  <Zoom wait={1000} opposite cascade collapse>
                    {text}
                  </Zoom>
                </h2>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleOpen}
                  fullWidth={true}
                >
                  ¡Entendido!
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Modal>
    </div>
  );
};
