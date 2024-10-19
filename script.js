const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const aiBtn = document.getElementById('ai-mode');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let aiMode = false;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start the game
startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartBtn.addEventListener('click', restartGame);
  aiBtn.addEventListener('click', toggleAIMode);
  updateStatus();
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== '' || !isGameActive) return;

  updateCell(index, currentPlayer);
  checkWinner();

  if (aiMode && currentPlayer === 'O' && isGameActive) {
    setTimeout(() => {
      aiMove();
      checkWinner();
    }, 500);
  }
}

function updateCell(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add('clicked');
  currentPlayer = player === 'X' ? 'O' : 'X';
  updateStatus();
}

function updateStatus() {
  if (isGameActive) {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    isGameActive = false;
    statusText.textContent = `Player ${currentPlayer === 'X' ? 'O' : 'X'} Wins!`;
    return;
  }

  if (!board.includes('')) {
    isGameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function aiMove() {
  let availableCells = [];
  board.forEach((cell, index) => {
    if (cell === '') availableCells.push(index);
  });

  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  updateCell(randomIndex, 'O');
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('clicked');
  });
  updateStatus();
}

function toggleAIMode() {
  aiMode = !aiMode;
  aiBtn.textContent = aiMode ? 'Play Against Friend' : 'Play Against Computer';
  restartGame();
}
