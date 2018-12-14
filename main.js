let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]

const container = document.getElementById("container")
let currentPlayer = "blackDisk"
let nextPlayer = "redDisk"
let msg = ""

const edgeX = board[0].length - 3;
const edgeY = board.length - 3;
let relBtn = document.getElementById('reloadButton')
relBtn.style.display = 'none'

let placedPieceCount = 0

for (let i = 0; i < 7; i++) {
  let columnDiv = document.createElement("div")
  columnDiv.id = i
  columnDiv.className = "column"
  columnDiv.addEventListener("click", createDisk)
  container.appendChild(columnDiv)

}

function createDisk(event) {
  let disk = document.createElement("div")
  let column = event.currentTarget
  let columnIndex = column.id
  let diskCount = column.childElementCount

  // console.log(board)
  disk.className = currentPlayer
  if (diskCount <= 5) {
    let cellIndex = 5 - diskCount
    board[cellIndex][columnIndex] = currentPlayer
    column.appendChild(disk)
    switchDisk()
    placedPieceCount++
    // console.log(column.childElementCount)
    // currentTarget.appendChild(disk)
    //console.log(event.currentTarget)
  }
}
function switchDisk() {
  let temp = currentPlayer
  checkWins()
  currentPlayer = nextPlayer
  nextPlayer = temp
}
const checkWins = () => {
  checkHorizontalWin()
  checkVerticalWin()
  checkDiagonalDownRight()
  checkDiagonalDownLeft()
  if (placedPieceCount === 41) {
    msg = "Tie"
    appendWinMsg()
    container.className = "disableDiv";
  }
}

const checkHorizontalWin = () => {
  for (let y = 0; y < board.length; y++) {

    // iterate each cell in the row
    for (let x = 0; x < edgeX; x++) {
      cell = board[y][x];
      // Only check if cell is filled
      if (cell !== 0) {
        // Check the next two cells for the same value
        if (cell === board[y][x + 1] && cell === board[y][x + 2] && cell === board[y][x + 3]) {
          appendWinMsg()
          //console.log("4 in a row horizontal found at " + (x + 1) + ":" + (y + 1))
        }
      }
    }
  }
}

const checkVerticalWin = () => {

  for (let y = 0; y < edgeY; y++) {

    // iterate each cell in the row
    for (let x = 0; x < board[0].length; x++) {
      cell = board[y][x];

      // Only check if cell is filled
      if (cell !== 0) {

        // Check the next two cells for the same value
        if (cell === board[y + 1][x] && cell === board[y + 2][x] && cell === board[y + 3][x]) {
          console.log("4 in a row vertical")
          appendWinMsg()
        }
      }
    }
  }
}

const checkDiagonalDownRight = () => {

  // DIAGONAL (DOWN RIGHT)
  // iterate each row   
  for (let y = 0; y < edgeY; y++) {
    // iterate each cell in the row
    for (let x = 0; x < edgeX; x++) {
      cell = board[y][x];
      // Only check if cell is filled
      if (cell !== 0) {
        // Check the next two cells for the same value
        if (cell === board[y + 1][x + 1] && cell === board[y + 2][x + 2] && cell === board[y + 3][x + 3]) {
          console.log("4 in a row down-right")
          appendWinMsg()
        }
      }
    }
  }
}

const checkDiagonalDownLeft = () => {

  // DIAGONAL (DOWN LEFT)
  // iterate each row   
  for (let y = 3; y < board.length; y++) {
    // iterate each cell in the row
    for (let x = 0; x < edgeX; x++) {
      cell = board[y][x];
      // Only check if cell is filled
      if (cell !== 0) {
        // Check the next two cells for the same value
        if (cell === board[y - 1][x + 1] && cell === board[y - 2][x + 2] && cell === board[y - 3][x + 3]) {
          console.log("3 in a row down-left")
          appendWinMsg()
        }
      }
    }
  }
}

function appendWinMsg() {
  let endResult = document.getElementById("msg")
  endResult.className = "bar";
  if (msg !== 'Tie') {
    if (currentPlayer == "blackDisk") {
      msg = "Black Wins"
    } else {
      msg = "Red Win"
    }
  }
    
  relBtn.style.display = 'block'
  // if (cellIndex==true){
  //   msg = "Tie"
  // }


  endResultText = document.createTextNode(msg);
  endResult.appendChild(endResultText);
  container.className = "disableDiv";

  document.getElementById("reloadButton").onclick = function () {
    window.location.reload(true)
  }
}

     /*function appendTie() {
      let endResult = document.createElement("div")
      endResult.className = "bar";
      endResultText = document.createTextNode("It's a tie");
      endResult.appendChild(endResultText);
      container.appendChild(endResult)
    }

   function whoWins(){
      if (currentPlayer == checkHorizontalWin()){
        appendBlackWin()
      }else if (nextPlayer == checkHorizontalWin()){
        appendRedWin()
      }else if (currentPlayer == checkHorizontalWin() && nextPlayer == checkHorizontalWin()){
        appendTie()
      }
    }*/