window.addEventListener("contextmenu", (e) => e.preventDefault());
//data model
const MINE = "💥";
const EMPTY = "";
const FLAG = "🚩";
//images
const LIFE = '<img class="live-img" src="img/heart.png"/>';
const WINNING_IMG = '<img class="winning-smiley" src="img/happy.png"/>';
const SAD_IMG = '<img class="winning-smiley" src="img/sad.png"/>';
const PLAYING_IMG = '<img class="winning-smiley" src="img/playing.png"/>';
const HINT_IMG = '<img class="hint-img" src="img/light-bulb.png"/>';
const FLAG_IMG = '<img class="flag-img" src="img/flags.png"/>';

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
  lifeLeft: 2,
  flagCount: 2,
  flagsOnBoard: 0,
  safeClicks: 3,
  hints: 3,
  isClickedHint: false,
};

//init game
function init() {
  updateLives();
  gBoard = createBoard(gDifficulty);
  createMines(gLevel.MINES);
  console.log(gBoard);
  reset();
  renderBoard(gDifficulty);
  updateFlags();
  showHints();
}
function restartGame() {
  gGame.shownCount = 0;
  gGame.lifeLeft = 2;
  if (gDifficulty > 4) gGame.lifeLeft = 3;
  if (gDifficulty > 4) gGame.flagCount = 3;
  init();
}

//actions
function showSafeClick() {
  if (gGame.safeClicks === 0) return;
  var randomIdx = getRandomInt(0, gBoard.length);
  var secondRandomIdx = getRandomInt(0, gBoard.length);
  if (
    !gBoard[randomIdx][secondRandomIdx].isMine &&
    !gBoard[randomIdx][secondRandomIdx].isMarked
  ) {
    elCell = document.querySelector(`.cell${randomIdx}-${secondRandomIdx}`);
    elCell.classList.add("marked");
    gBoard[randomIdx][secondRandomIdx].isMarked = true;
    setTimeout(function () {
      hideSafeClick(randomIdx, secondRandomIdx);
    }, 1000);
  }
  gGame.safeClicks--;
  var elBtn = document.querySelector(".safe-click-btn span");
  elBtn.innerText = `${gGame.safeClicks} clicks remain`;
}
function hideSafeClick(i, j) {
  elCell = document.querySelector(`.cell${i}-${j}`);
  elCell.classList.remove("marked");
  gBoard[i][j].isMarked = false;
}

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
  var elSmiley = document.querySelector(".smiley span");
  if (gBoard[i][j].isMine && gGame.shownCount === 0) return;

  if (!gGame.isOn) {
    start();
    gGame.isOn = true;
  }
  if (!gGame.isOn && gGame.shownCount > 0) {
    return;
  }
  // gGame.isOn = true;
  var cell = gBoard[i][j];
  elCell.classList.add("marked");
  gBoard[i][j].isMarked = true;

  if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
    gBoard[i][j].isShown = true;
    gGame.shownCount++;
    elSmiley.innerHTML = PLAYING_IMG;
    console.log("SHOWCOUNT", gGame.shownCount);

    checkGameOver(i, j);
  }
  //if its a mine
  if (gBoard[i][j].isMine) {
    elSmiley.innerHTML = SAD_IMG;
    cell.isShown = true;
    gGame.lifeLeft--;
    updateLives();

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
      ShowEmptyNegs(gBoard, i, j);
      gGame.isClickedHint = false;
    }
    checkGameOver(i, j);
  }
  if (countMinesAround(gBoard, i, j) === 0) {
    elCell.innerText = "";
  }
}

function putFlag(eventKeyboard, i, j) {
  // if (!gGame.isOn) return;
  if (gGame.flagCount === 0) return;
  if (eventKeyboard.button === 2) {
    renderCell({ i, j }, FLAG);
    gBoard[i][j].isFlagged = true;
    gGame.flagsOnBoard++;
    checkGameOver(i, j);
    updateFlags();
  }
}

function checkGameOver(i, j) {
  if (gGame.lifeLeft === 0) gameOver();

  if (
    gGame.shownCount === gBoard[i].length * gBoard[j].length - gLevel.MINES &&
    gGame.flagsOnBoard === gLevel.MINES
  ) {
    victory();
  }
}

function gameOver() {
  // gBoard.isShown = true
  gGame.isOn = false;
  pause();
  console.log("LOOSE");
}

function victory() {
  gGame.isOn = false;
  var elSmiley = document.querySelector(".smiley span");
  elSmiley.innerHTML = WINNING_IMG;
  pause();
  console.log("victory");
}

function ShowEmptyNegs(mat, rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > mat[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      if (!gBoard[i][j].isMarked) {
        if (gGame.isClickedHint && !gBoard[i][j].isMine) {
          gBoard[i][j].isMarked = true;
          gGame.shownCount++;
          elCell = document.querySelector(`.cell${i}-${j}`);
          elCell.classList.add("marked");
        }
      }
    }
  }
}

function getHint() {
  if (gGame.hints === 0) return;
  gGame.isClickedHint = true;
  gGame.hints--;
  showHints();
}
