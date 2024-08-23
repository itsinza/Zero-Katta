const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const endScreen = document.getElementById('end-screen');
const resultMessage = document.getElementById('result');
const playAgainButton = document.getElementById('play-again');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        renderBoard();
        const winner = checkWinner();
        if (winner) {
            showEndScreen(`${winner} wins!`);
        } else if (isBoardFull()) {
            showEndScreen("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function isBoardFull() {
    return boardState.every(cell => cell !== '');
}

function renderBoard() {
    board.innerHTML = '';
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function showEndScreen(message) {
    resultMessage.textContent = message;
    endScreen.style.display = 'block';
    gameActive = false;
}

resetButton.addEventListener('click', () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    endScreen.style.display = 'none';
    status.textContent = "Player X's turn";
    renderBoard();
});

playAgainButton.addEventListener('click', () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    endScreen.style.display = 'none';
    status.textContent = "Player X's turn";
    renderBoard();
});

renderBoard();
