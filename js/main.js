window.addEventListener("contextmenu", (e) => e.preventDefault());
//data model
const MINE = "💥";
const EMPTY = "";
const FLAG = "🚩";
const LIFE = '<img class="live-img" src="img/heart.png"/>';

var gDifficulty = 4;
var gBoard;
var gLevel = {
  SIZE: 4,
  MINES: 2,
};
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  lifeLeft: 3,
  flagCount: 0,
};

//init game
function init() {
  updateLives();
  gBoard = createBoard(gDifficulty);
  createMines(gLevel.MINES);
  console.log(gBoard);
  reset();
  renderBoard(gDifficulty);
}
function restartGame() {
  gGame.shownCount = 0;
  gGame.lifeLeft = 2;
  if (gDifficulty > 4) gGame.lifeLeft = 3;
  init();
}

//actions
function countMinesAround(mat, rowIdx, colIdx) {
  var count = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > mat[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      if (gBoard[i][j].isMine) count++;
    }
  }
  return count;
}

function setDiff(size) {
  gDifficulty = size;

  restartGame();
}
//cells click actions
function cellClicked(elCell, i, j) {
  if (gBoard[i][j].isMine && gGame.shownCount === 0) return;

  if (!gGame.isOn) {
    start();
    gGame.isOn = true;
  }
  if (!gGame.isOn && gGame.shownCount > 0) {
    return;
  }
  var elSmiley = document.querySelector(".smiley span");
  gGame.isOn = true;
  var cell = gBoard[i][j];
  elCell.classList.add("marked");
  gBoard[i][j].isMarked = true;

  if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
    gBoard[i][j].isShown = true;
    gGame.shownCount++;
    elSmiley.innerText = "😄";
    console.log("SHOWCOUNT", gGame.shownCount);

    checkGameOver(i, j);
  }
  //if its a mine
  if (gBoard[i][j].isMine) {
    elSmiley.innerText = "😔";
    cell.isShown = true;
    gGame.lifeLeft--;
    console.log("LIFE", gGame.lifeLeft);
    checkGameOver(i, j);
    renderBoard(gDifficulty);
  }
  //if its a normal cell
  if (cell) {
    gBoard[i][j].isMarked = true;
    if (!cell.isMine) {
      var minesCount = countMinesAround(gBoard, i, j);
      gBoard[i][j].minesAround = minesCount;
      elCell.innerText = minesCount;
    }
  }
  if (countMinesAround(gBoard, i, j) === 0) {
    elCell.innerText = "";
  }
}

function putFlag(eventKeyboard, i, j) {
  if (!gGame.isOn) return;

  if (eventKeyboard.button === 2) {
    renderCell({ i, j }, FLAG);
    gBoard[i][j].isFlagged = true;
    gGame.flagCount++;
  }
}

function cellMarked(elCell) {}

function checkGameOver(i, j) {
  if (gGame.lifeLeft === 0) gameOver();
  if (
    gGame.shownCount === gBoard[i].length * gBoard[j].length - gLevel.MINES &&
    gGame.flagCount === gLevel.MINES
  )
    victory();
}

function gameOver() {
  // gBoard.isShown = true
  gGame.isOn = false;
  pause();
  console.log("LOOSE");
}

function victory() {
  var elSmiley = document.querySelector(".smiley span");
  elSmiley.innerHTML = '<img class="winning-smiley" src="img/happy.png"/>';
  pause();

  console.log("victory");
}
