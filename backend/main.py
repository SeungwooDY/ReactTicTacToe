import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


app = FastAPI()


class TicTacToe(BaseModel):
    board: List[List[str]]  # 3x3 board with 'X', 'O', or ''


origins = [
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/frontend", response_model=TicTacToe)
def get_fruits():
    return TicTacToe(fruits=["apple", "banana", "cherry"])
