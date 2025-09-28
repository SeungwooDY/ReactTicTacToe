import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from tictactoe import end, minimax, winner, EMPTY
from difficulty import set_difficulty, set_board

app = FastAPI()


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BoardRequest(BaseModel):
    board: list[list[Optional[str]]]


@app.post("/ai-move")
def ai_move(request: BoardRequest):
    board = request.board
    if end(board):
        game_winner = winner(board)
        return {"row": None, "col": None, "winner": game_winner}
    move = minimax(board, 5)
    return {"row": move[0], "col": move[1], "winner": None}


@app.get("/set-board")
def set_board(size: int):
    return size
