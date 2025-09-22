import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from tictactoe import end, minimax, EMPTY

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
        return {"row": None, "col": None}
    move = minimax(board)
    return {"row": move[0], "col": move[1]}


# @app.get("/frontend", response_model=TicTacToe)
# def get_fruits():
#     return TicTacToe(fruits=["apple", "banana", "cherry"])
