import React from "react";
import { useState } from "react";
import { getAIMove, setBoard } from "./api";

export default function Board() {

  const [squares, setSquares] = useState(Array(25).fill(null));
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const to2D = (squares: (string | null)[][] | any) => [
    [squares[0], squares[1], squares[2], squares[3], squares[4]],
    [squares[5], squares[6], squares[7], squares[8], squares[9]],
    [squares[10], squares[11], squares[12], squares[13], squares[14]],
    [squares[15], squares[16], squares[17], squares[18], squares[19]],
    [squares[20], squares[21], squares[22], squares[23], squares[24]]
  ];

  const to1D = (board: (string | null)[][]) =>
    board.flat();

  async function handleClick(i) {
    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);

    const board2D = to2D(nextSquares)

    const aiMove = await getAIMove(board2D);

    
    if (aiMove) {
      const { row, col } = aiMove;
      const aiIndex = row * 5 + col; // (0, 2) in a 2d array is the same as the third index (2) in a 1d array
      const updatedSquares = nextSquares.slice();
      updatedSquares[aiIndex] = "O";
      setSquares(updatedSquares);
    }

    function updateScore(winner: string) {
      if (winner == "X") setScoreX(scoreX + 1);
      if (winner == "O") setScoreO(scoreO + 1);
    }
  }

  

  return (
    <>
    <div className="scoreboard">
      <ScoreX score={scoreX}/>
      <ScoreO score={scoreO}/>
    </div>
      <div className="row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      </div>
      <div className="row">
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
      </div>
      <div className="row">
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} />
      </div>
      <div className="row">
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} onSquareClick={() => handleClick(17)} />
        <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} onSquareClick={() => handleClick(19)} />
      </div>
      <div className="row">
        <Square value={squares[20]} onSquareClick={() => handleClick(20)} />
        <Square value={squares[21]} onSquareClick={() => handleClick(21)} />
        <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
        <Square value={squares[24]} onSquareClick={() => handleClick(24)} />
      </div>
      <div>
        <Restart onRestart={() => setSquares(Array(25).fill(null))}/>
      </div>
    </>
  );
}

function Square({ value, onSquareClick }) {
  // creating a Square component that takes Props to pass the value to each square

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Restart({ onRestart} ) {
  return (
    <button className="restart" onClick={onRestart}> Play Again </button>
  )
}

function ScoreX({ score }) {
  return (
    <div>X: {score}</div>
  )
}

function ScoreO({ score }) {
  return (
    <div>O: {score}</div>
  )
}