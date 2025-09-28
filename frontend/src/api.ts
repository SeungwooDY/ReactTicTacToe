// src/api.ts
export async function getAIMove(board: (string | null)[][]) {
    const response = await fetch("http://localhost:8000/ai-move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board }),
    });

    const data = await response.json();
    return data; // { row: 1, col: 2 }
  }

export async function setBoard(int: number) {
  const res: Response = await fetch("http://localhost:8000/set-board")
  const data: number = await res.json();
  return data
}