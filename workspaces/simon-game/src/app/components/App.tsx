import React, { useState } from "react";

import { Box } from "./Box.tsx";
import { playNote } from "../util/playNote.ts";
import { config } from "../constants.ts";

type GameState = "pre-game" | "game-over" | "player-turn" | "cpu-turn";

// TODO: Move this to a new file later
function randNum(upperBound: number): number {
  return Math.floor(Math.random() * upperBound);
}

export function App() {
  const [playerMoves, setPlayerMoves] = useState<readonly number[]>([]);
  const [gameState, setGameState] = useState<GameState>("pre-game");
  const [correctMoves, setCorrectMoves] = useState<readonly number[]>([]);

  if (gameState === "pre-game") {
    return (
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => {
            setGameState("cpu-turn");
            setCorrectMoves((prev) => [...prev, randNum(4)]); // TODO: Add to cpu-turn state instead once created
          }}
        >
          Start Game
        </button>
        Simon Game
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        {config.boxes.map((box, index) => (
          <Box
            key={index}
            color={box.color}
            onClick={() => {
              playNote(box.frequency);
              setPlayerMoves((prev) => [...prev, index]);
            }}
          />
        ))}
      </div>
      <pre>Player Moves: {JSON.stringify(playerMoves, null, 2)}</pre>
      <pre>Correct Moves: {JSON.stringify(correctMoves, null, 2)}</pre>
    </>
  );
}
