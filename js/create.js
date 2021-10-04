function createBoard(difficulty = 4) {
    var board = []
    for (var i = 0; i < difficulty; i++) {
        board[i] = []
        for(var j = 0; j< difficulty; j++){
            board[i][j] = createCell()
        }
    }
    return board
}

function createMine(i,j){
     gBoard[i][j].isMine = true
     gBoard[i][j].isShown = false

}

function createCell(){
    var cell = {
        minesAround: 0,
        isShown:false,
        isMarked: false,
        isMine: false
    }
    return cell
}
