let board = ["", "", "", "", "", "", "", "", ""];

const human = "X";
const ai = "O";

let isGameActive = true;

let playerScore = 0;
let aiScore = 0;
let drawScore = 0;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

window.onload = () => {
    startNewGame();
};

function startNewGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;

    updateUI();

    const firstMove = document.getElementById("firstMove").value;

    if (firstMove === "ai") {
        document.getElementById("status").innerText =
            "🤖 AI Thinking...";

        setTimeout(() => {
            aiTurn();
        }, 500);
    } else {
        document.getElementById("status").innerText =
            "Your Turn (X)";
    }
}

function playerMove(index) {

    if (!isGameActive || board[index] !== "") {
        return;
    }

    board[index] = human;

    updateUI();

    if (checkWin(board, human)) {

        playerScore++;
        updateScores();

        document.getElementById("status").innerText =
            "🎉 You Win!";

        isGameActive = false;
        return;
    }

    if (checkDraw(board)) {

        drawScore++;
        updateScores();

        document.getElementById("status").innerText =
            "🤝 Match Draw!";

        isGameActive = false;
        return;
    }

    isGameActive = false;

    document.getElementById("status").innerText =
        "🤖 AI Thinking...";

    setTimeout(() => {
        aiTurn();
    }, 400);
}

function aiTurn() {

    let bestScore = -Infinity;
    let move = null;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = ai;

            let score = minimax(board, 0, false);

            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== null) {
        board[move] = ai;
    }

    updateUI();

    if (checkWin(board, ai)) {

        aiScore++;
        updateScores();

        document.getElementById("status").innerText =
            "🤖 AI Wins!";

        isGameActive = false;
        return;
    }

    if (checkDraw(board)) {

        drawScore++;
        updateScores();

        document.getElementById("status").innerText =
            "🤝 Match Draw!";

        isGameActive = false;
        return;
    }

    document.getElementById("status").innerText =
        "Your Turn (X)";

    isGameActive = true;
}

function minimax(tempBoard, depth, isMaximizing) {

    if (checkWin(tempBoard, ai)) {
        return 10 - depth;
    }

    if (checkWin(tempBoard, human)) {
        return depth - 10;
    }

    if (checkDraw(tempBoard)) {
        return 0;
    }

    if (isMaximizing) {

        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {

            if (tempBoard[i] === "") {

                tempBoard[i] = ai;

                let score = minimax(
                    tempBoard,
                    depth + 1,
                    false
                );

                tempBoard[i] = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;

    } else {

        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {

            if (tempBoard[i] === "") {

                tempBoard[i] = human;

                let score = minimax(
                    tempBoard,
                    depth + 1,
                    true
                );

                tempBoard[i] = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function checkWin(currentBoard, player) {

    return winConditions.some(condition => {

        return condition.every(index => {
            return currentBoard[index] === player;
        });

    });
}

function checkDraw(currentBoard) {

    return currentBoard.every(cell => {
        return cell !== "";
    });
}

function updateUI() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {

        cell.innerText = board[index];

        cell.className = "cell";

        if (board[index] === "X") {
            cell.classList.add("X");
        }

        if (board[index] === "O") {
            cell.classList.add("O");
        }
    });
}

function updateScores() {

    document.getElementById("playerScore").innerText =
        playerScore;

    document.getElementById("aiScore").innerText =
        aiScore;

    document.getElementById("drawScore").innerText =
        drawScore;
}

function resetBoard() {
    startNewGame();
}

function resetScores() {

    playerScore = 0;
    aiScore = 0;
    drawScore = 0;

    updateScores();

    startNewGame();
}

document
    .getElementById("firstMove")
    .addEventListener("change", () => {

        startNewGame();

    });