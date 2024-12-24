// Initialize the game board with empty cells
let board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

const container = document.getElementById("container");
let currentPlayer = "blackDisk";
let nextPlayer = "redDisk";
let msg = "";

const edgeX = board[0].length - 3;
const edgeY = board.length - 3;
let relBtn = document.getElementById('reloadButton');
relBtn.style.display = 'none';

let placedPieceCount = 0;

// Create columns for the game board
for (let i = 0; i < 7; i++) {
  let columnDiv = document.createElement("div");
  columnDiv.id = i;
  columnDiv.className = "column";
  columnDiv.addEventListener("click", createDisk);
  container.appendChild(columnDiv);
}

// Function to create a disk and place it in the column
function createDisk(event) {
  let disk = document.createElement("div");
  let column = event.currentTarget;
  let columnIndex = column.id;
  let diskCount = column.childElementCount;

  disk.className = currentPlayer;
  if (diskCount <= 5) {
    let cellIndex = 5 - diskCount;
    board[cellIndex][columnIndex] = currentPlayer;
    column.appendChild(disk);
    placedPieceCount++;
    checkWins();
    switchDisk();
  }
}

// Function to switch the current player
function switchDisk() {
  let temp = currentPlayer;
  currentPlayer = nextPlayer;
  nextPlayer = temp;
}

// Function to check for wins
const checkWins = () => {
  if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalDownRight() || checkDiagonalDownLeft()) {
    msg = currentPlayer === "blackDisk" ? "Black Wins" : "Red Wins";
    appendWinMsg();
  } else if (placedPieceCount === 42) {
    msg = "It's a Tie!";
    appendWinMsg();
  }
}

// Function to check for horizontal wins
const checkHorizontalWin = () => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < edgeX; x++) {
      let cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y][x + 1] && cell === board[y][x + 2] && cell === board[y][x + 3]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to check for vertical wins
const checkVerticalWin = () => {
  for (let y = 0; y < edgeY; y++) {
    for (let x = 0; x < board[0].length; x++) {
      let cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y + 1][x] && cell === board[y + 2][x] && cell === board[y + 3][x]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to check for diagonal wins (down-right)
const checkDiagonalDownRight = () => {
  for (let y = 0; y < edgeY; y++) {
    for (let x = 0; x < edgeX; x++) {
      let cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y + 1][x + 1] && cell === board[y + 2][x + 2] && cell === board[y + 3][x + 3]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to check for diagonal wins (down-left)
const checkDiagonalDownLeft = () => {
  for (let y = 3; y < board.length; y++) {
    for (let x = 0; x < edgeX; x++) {
      let cell = board[y][x];
      if (cell !== 0) {
        if (cell === board[y - 1][x + 1] && cell === board[y - 2][x + 2] && cell === board[y - 3][x + 3]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Function to display the win message
function appendWinMsg() {
  let endResult = document.getElementById("msg");
  endResult.className = "bar";
  relBtn.style.display = 'block';
  endResult.textContent = msg;
  container.className = "disableDiv";

  document.getElementById("reloadButton").onclick = function () {
    window.location.reload(true);
  }
}