
//data model
const MINE = '💥'
const EMPTY = ''
const FLAG = '🚩'
var gElSelectedCell = null

var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    lifeLeft: 3

}

//init game
function init(){
    gGame.isOn = true
   gBoard = createBoard(difficulty = 4)
   createMine(0,0)
   createMine(0,1)
   console.log(gBoard)
   renderBoard(4)

}

//actions
function countMinesAround(mat, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            if (gBoard[i][j].isMine) count++
        }
    }
    return count
}

function cellClicked(elCell, i, j){
    start()
    var cell = gBoard[i][j]
    elCell.classList.add('marked')
    gBoard[i][j].isMarked = true


    if(gBoard[i][j].isMine){
        cell.isShown = true
        gGame.lifeLeft--
        console.log('LIFE', gGame.lifeLeft)
        checkGameOver()
        renderBoard(4)
        
    }
    if(cell){
        gBoard[i][j].isShown = true
        gBoard[i][j].isMarked = true
     gBoard[i][j].minesAround = countMinesAround(gBoard, i, j)
     if(!cell.isMine){
      elCell.innerText = countMinesAround(gBoard, i, j)
     }
    }
    if(countMinesAround(gBoard, i, j) === 0){
        elCell.innerText = ''
    }
}
   
    function putFlag(eventKeyboard,i,j) {
        if(eventKeyboard.button === 2){
            renderCell({i,j}, FLAG)
        }
    }
    
function cellMarked(elCell){

}

function checkGameOver(){
if(gGame.lifeLeft === 0) gameOver()

}


function gameOver(){
console.log('LOOSE')
}

function victory(){
    if(!gBoard[i][j].isMine && gBoard[i][j].isMarked){
        console.log('hello')
    }
}