
function renderBoard(size) {
    var strHtml = '<tbody class="board">'
    for (var i = 0; i < size; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < size; j++) {
            var cell = gBoard[i][j]
            
            // console.log('cell', cell)
            strHtml += `<td class="cell cell${i}-${j}" 
            onclick="cellClicked(this,${i},${j})" onmouseup="putFlag(event,${i},${j})"
            >${getHtmlFromCell(cell)}</td>`
        }
        strHtml += '</tr>'
    }
    strHtml += '</tbody>'
    var elBoard = document.querySelector('.table')
    elBoard.innerHTML = strHtml
}


function getHtmlFromCell(cell) {
    let img
    if (cell.isMine) img = MINE
    if(!cell.isShown) img = EMPTY
    if (!cell.isMine) img = EMPTY
    return img
  }

  function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
  }
  





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
