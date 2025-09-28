import math
import copy

X = "X"
O = "O"
EMPTY = None


# returns starting state of board
def initial_state():
    return [
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    ]


# returns player with next turn
def player(board):
    x_count = sum(row.count(X) for row in board)
    o_count = sum(row.count(O) for row in board)
    return X if x_count == o_count else O


# returns set of all possible actions (i, j)
# available on the board
def actions(board):
    possible_actions = set()

    for i in range(5):
        for j in range(5):
            if board[i][j] is EMPTY:
                possible_actions.add((i, j))
    return possible_actions


# returns the board that results from
# making move (i, j) on the board
def result(board, action):

    if action not in actions(board):
        raise Exception("Invalid action")

    new_board = copy.deepcopy(board)
    new_board[action[0]][action[1]] = player(board)
    return new_board


# returns the winner of the game (if one exists)
def winner(board):  # checking columns
    for i in range(5):
        if (
            board[0][i]
            == board[1][i]
            == board[2][i]
            == board[3][i]
            == board[4][i]
            != EMPTY
        ):
            return board[0][i]
        elif (  # checking rows
            board[i][0]
            == board[i][1]
            == board[i][2]
            == board[i][3]
            == board[i][4]
            != EMPTY
        ):
            return board[i][0]

    if (
        board[0][0] == board[1][1] == board[2][2] == board[3][3] == board[4][4] != EMPTY
    ) or board[0][4] == board[1][3] == board[2][2] == board[3][1] == board[4][
        0
    ] != EMPTY:
        return board[2][2]


# returns true if game is over, false otherwise
def end(board):
    if winner(board) is not None:
        return True

    for i in range(5):
        for j in range(5):
            if board[i][j] is EMPTY:
                return False
    return True


# returns 1 if X wins, -1 if O wins, 0 if tie
def utility(board):
    if winner(board) == X:
        return 1
    elif winner(board) == O:
        return -1
    else:
        return 0


# returns optimal action for current player
def minimax(board, depth_limit):
    if end(board):
        return None

    current = player(board)

    print("Current player {current} with depth {depth_limit}")

    def max_value(board, depth_limit):
        print("Max value depth: {depth_limit}")  # best move for X
        if end(board) or depth_limit == 0:
            return utility(board), None  # no moves left, return utility
        v = -math.inf
        best_action = None
        for action in actions(board):
            min_v, _ = min_value(result(board, action), depth_limit - 1)
            if min_v > v:
                v = min_v
                best_action = action
        return v, best_action

    def min_value(board, depth_limit):
        print("Min value depth: {depth_limit}")  # best move for X
        if end(board) or depth_limit == 0:
            return utility(board), None
        v = math.inf  # type float
        best_action = None
        for action in actions(board):
            max_v, _ = max_value(result(board, action), depth_limit - 1)
            if max_v < v:
                v = max_v
                best_action = action
        return v, best_action

    if current == X:
        _, move = max_value(board, depth_limit)
    else:
        _, move = min_value(board, depth_limit)

    print(f"Chosen move: {move}")
    return move
