const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const checkWinner = () => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        status.textContent = `Player ${winner} wins!`;
    } else if (!board.includes(null)) {
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game status
status.textContent = `Player ${currentPlayer}'s turn`;
