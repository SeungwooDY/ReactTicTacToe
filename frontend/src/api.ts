// src/api.ts
export async function getAIMove(board: (string | null)[][]) {
    const response = await fetch("http://localhost:8000/ai-move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board }),
    });

    return await response.json();
  
    const data = await response.json();
    return data; // { row: 1, col: 2 }
  }
  