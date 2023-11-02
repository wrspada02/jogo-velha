const gameBoard = [['', '' ,''], ['', '', ''], ['', '', '']];
let currentPlayer = 'X';

const gameSquares = document.querySelectorAll('[data-row-column]');

function isThereDraw() {
  const isThereDraw = gameBoard.every(row => {
    return row.every(column => column);
  });

  return isThereDraw;
}

function isThereWinner() {
  const winningCombinations = [
    [gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]],
    [gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]],
    [gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]],

    [gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]],
    [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]],
    [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]],

    [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
    [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]],
  ];

  const isThereAWinner = winningCombinations.some(combination => {
    const [a, b, c] = combination;

    return a && a === b && a === c;
  });

  return isThereAWinner;
}

function handleGameLogic() {
  if (isThereWinner()) {
    alert('We have a winner!');
    location.reload();
  } else if(isThereDraw()) {
    alert('Draw!');
    location.reload();
  }
}

function updateGameBoardMatriz(e) {
  const currentDataRow = e.target.dataset.rowColumn;
  const [row, column] = currentDataRow.split(',');
  gameBoard[row][column] = currentPlayer;
}

function addCurrentPlayerValueOnBoardBox(e) {
  updateGameBoardMatriz(e);

  e.target.innerHTML = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  handleGameLogic();
}

function handleGameBoard(e) {
  if (e.target.innerHTML) return;

  addCurrentPlayerValueOnBoardBox(e);
}

gameSquares.forEach(square => square.addEventListener('click', handleGameBoard));
