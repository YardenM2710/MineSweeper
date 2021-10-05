function renderBoard(size) {
  var strHtml = '<tbody class="board">';
  for (var i = 0; i < size; i++) {
    strHtml += "<tr>";
    for (var j = 0; j < size; j++) {
      var cell = gBoard[i][j];

      strHtml += `<td class="cell cell${i}-${j} ${
        cell.isMarked ? "marked" : ""
      }" 
            onclick="cellClicked(this,${i},${j})" onmouseup="putFlag(event,${i},${j})"
            >${getHtmlFromCell(cell)}</td>`;
    }
    strHtml += "</tr>";
  }
  strHtml += "</tbody>";
  var elBoard = document.querySelector(".table");
  elBoard.innerHTML = strHtml;
}

function getHtmlFromCell(cell) {
  let img = EMPTY;
  if (cell.isMine && cell.isShown) img = MINE;
  if (cell.isShown && !cell.isMine) img = cell.minesAround;
  if (img === 0) img = EMPTY;
  return img;
}

function renderCell(location, value) {
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
//stopper functions
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

let startTime;
let elapsedTime = 0;
let timerInterval;

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
}

function pause() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
}
//update functions
function updateLives() {
  var elLives = document.querySelector(".lives-container");
  elLives.innerHTML = EMPTY;
  for (var i = 0; i < gGame.lifeLeft; i++) {
    elLives.innerHTML += LIFE;
  }
}

function updateFlags() {
  var elLives = document.querySelector(".flags-container");
  elLives.innerHTML = EMPTY;
  for (var i = 0; i < gGame.flagCount; i++) {
    elLives.innerHTML += FLAG_IMG;
  }
}

function showHints() {
  var elHint = document.querySelector(".hints");
  elHint.innerHTML = EMPTY;
  for (var i = 0; i < gGame.hints; i++) {
    elHint.innerHTML += HINT_IMG;
  }
}
//display winner/looser
function showWinner() {
  var elWinner = document.querySelector(".winner-modal");
  elWinner.innerHTML = '<h1 class="roll-in-blurred-left">Winner!</h1>';
}

function hideWinner() {
  var elWinner = document.querySelector(".winner-modal");
  elWinner.innerHTML = "";
}
function showLooser() {
  var elLooser = document.querySelector(".looser-modal");
  elLooser.innerHTML = '<h1 class="roll-in-blurred-left">You Lost!</h1>';
}

function hideLooser() {
  var elLooser = document.querySelector(".looser-modal");
  elLooser.innerHTML = "";
}

//general update data
function updateData() {
  gGame.shownCount = 0;
  gGame.lifeLeft = 2;
  gGame.safeClicks = 3;
  gGame.flagCount = 2;
  gGame.hints = 3;
}

//general update dom
function updateDom() {
  updateLives();
  updateFlags();
  showHints();
  updateSaveClickButton();
}
