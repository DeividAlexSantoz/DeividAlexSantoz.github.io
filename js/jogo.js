// Variáveis
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

// Função para alternar o jogador atual
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para verificar se há um vencedor
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (!gameBoard.includes('')) {
    return 'tie';
  }

  return null;
}

// Função para executar uma jogada
function makeMove(index) {
  if (gameEnded || gameBoard[index]) {
    return;
  }

  gameBoard[index] = currentPlayer;

  const cell = document.getElementById(`cell-${index}`);
  cell.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    gameEnded = true;
    if (winner === 'tie') {
      alert('Empate!');
    } else {
      alert(`O jogador ${winner} venceu!`);
    }
  } else {
    changePlayer();
  }
}

// Função para criar o tabuleiro do jogo da velha
function createBoard() {
  const ticTacToeBoard = document.querySelector('.tic-tac-toe-board');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    cell.dataset.index = i;
    cell.addEventListener('click', function() {
      makeMove(i);
    });

    ticTacToeBoard.appendChild(cell);
  }
}

// Função para reiniciar o jogo
function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameEnded = false;

  const cells = document.getElementsByClassName('cell');
  for (let cell of cells) {
    cell.textContent = '';
  }
}

// Executar o jogo da velha ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
  createBoard();
});