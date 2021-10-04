function createBoard(difficulty = 4) {
  var board = [];
  for (var i = 0; i < difficulty; i++) {
    board[i] = [];
    for (var j = 0; j < difficulty; j++) {
      board[i][j] = createCell();
    }
  }
  return board;
}
function createMines() {
  var times = 0;
  if (gDifficulty === 4) times = 2;
  if (gDifficulty === 6) times = 3;
  if (gDifficulty === 8) times = 4;
  for (var i = 0; i < times; i++) {
    var randomIdx = getRandomInt(1, gBoard.length);
    var secondRandomIdx = getRandomInt(0, gBoard.length);
    createMine(randomIdx, secondRandomIdx);
  }

  renderBoard(4);
}

function createMine(i, j) {
  gBoard[i][j].isMine = true;
  gBoard[i][j].isShown = false;
}

function createCell() {
  var cell = {
    minesAround: 0,
    isShown: false,
    isMarked: false,
    isMine: false,
  };
  return cell;
}
