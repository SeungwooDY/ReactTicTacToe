import React from "react";
import { useState } from "react";
import { getAIMove } from "./api";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xNext, setXNext] = useState(true);

  const to2D = (squares: (string | null)[][] | any) => [
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]],
  ];

  const to1D = (board: (string | null)[][]) =>
    board.flat();

  async function handleClick(i) {
    if (squares[i]) {
      return;
    }
    /* const [player, setPlayer] = useState(xNext); */
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
    // if (xNext) {
    //   nextSquares[i] = "X";
    // } else {
    //   nextSquares[i] = "O";
    // }
    // setXNext(!xNext);

    const board2D = to2D(nextSquares)

    const aiMove = await getAIMove(board2D);

    if (aiMove) {
      const { row, col } = aiMove;
      const aiIndex = row * 3 + col; // (0, 2) in a 2d array is the same as the third index (2) in a 1d array
      const updatedSquares = nextSquares.slice();
      updatedSquares[aiIndex] = "O";
      setSquares(updatedSquares);
    }
  }

  

  return (
    <>
      <div className="row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
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
