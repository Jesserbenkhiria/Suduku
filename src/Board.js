class Board extends EventEmitter {
  constructor(board) {
    super();

    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  getRow(index) {
    return this.board[index];
  }

  updateBoard(newBoard) {
    this.board = newBoard;
  }


  getCol(index) {
    const result = [];
    for (let i = 0; i < this.board.length; i++) {
      result.push(this.board[i][index]);
    }
    return result;
  }


  generateBoard() {
    const hardPuzzle = [
      ["", "",2, "", "","", "", "", ""],
      ["", "", 9, "", "", "", "", "", ""],
      ["", 4, "", "", "", "", "", 6, ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", 5, 9, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", "", "", "", 4, "", 2],
      ["", 8, "", "", "", "", "", "", ""],
    ]

    this.board = hardPuzzle;
    this.emit("boardGenerated", hardPuzzle);
  }

  clearBoard() {
    const emptyPuzzle = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
    this.board = emptyPuzzle;
    this.emit("boardcleared", emptyPuzzle);
  }

  getBox(rowIndex, colIndex) {
    const result = [];
    const boxRowStart = rowIndex - (rowIndex % 3);
    const boxColStart = colIndex - (colIndex % 3);

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let d = boxColStart; d < boxColStart + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  getBoxByIndex(index){
    const result=[]
    const startingRow = Math.floor(index / 3) * 3;
    const startingCol = Math.floor(index % 3) * 3;
    for (let r = startingRow; r < startingRow + 3; r++) {
      for (let d = startingCol; d < startingCol + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;

  }
/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */

/*=========================================================================
=                 TODO: fill in these Checker Functions                    =
=========================================================================*/

  rowSafe(row, num) {
    //check if the row contains num
    let target = this.getRow(row)
    return !target.includes(num)
  }

  colSafe(col, num) {
    //check if the column contains num
    let target = this.getCol(col)
    return !target.includes(num)
  }

  boxSafe(row, col, num) {
    //check if the box contains num
    let target = this.getBox(row,col)
    console.log(target)
    return !target.includes(num)
  }

  rowValidAt(rowIndex) {
    //check if a row is valid at a given index
    let row = this.getRow(rowIndex)
    for(let i=0 ; i<row.length;i++){
     if(row.indexOf(row[i])!== row.lastIndexOf(row[i]) && row[i]!== "" && row[i]!==0){
       return false 
     }
    }
    return true 
  }

  colValidAt(colIndex) {
    //check if a column is valid at a given index
    let col = this.getCol(colIndex)
    for(let i=0 ; i<col.length;i++){
     if(col[i]!== 0 &&col[i]!=="" && col.indexOf(col[i])!== col.lastIndexOf(col[i])){
       return false 
     }
    }
    return true 
    
  }

  boxValidAt(boxIndex) {
    //check if a box is valid at a given index
    let row = this.getBoxByIndex(boxIndex)
    for(let i=0 ; i<row.length;i++){
     if(row[i]!== 0 &&row[i]!=="" && row.indexOf(row[i])!== row.lastIndexOf(row[i])){
       return false 
     }
    }
    return true 
   
  }

  allRowsValid() {
    //check if all the rows in the board are valid
    for(let i=0 ; i< this.board.length;i++){
      console.log(this.board[i])
      if(this.rowValidAt(i)===false){
        return false
      }
    }
    return true 
  }
  allColsValid() {
    //check if all the columns in the board are valid
    for(let i=0 ; i< this.board.length;i++){
      console.log(this.board[i])
      if(this.colValidAt(i)===false){
        return false
      }
    }
    return true 
    
  }
  allBoxesValid() {
    for(let i=0 ; i< this.board.length;i++){
      console.log(this.board[i])
      if(this.boxValidAt(i)===false){
        return false
      }
    }
    return true 
  }

  validBoard() {
    return this.allBoxesValid() && this.allColsValid() && this.allRowsValid();
  }

  isSafe(row, col, num) {
    return  this.rowSafe(row, num) && this.colSafe(col, num) && this.boxSafe(row, col, num);
  }

/*=========================================================================
=                 TODO: fill in these Solver Functions                    =
=========================================================================*/

solve(row=0,col=0) {
  
if(row === 8 && col===9){
  return true 
}

if(col === 9){
  col = 0 
  row++
}
// case not empty
  if(this.board[row][col]!==0 && this.board[row][col]!==""){
    return  this.solve(row,col+1)
  }
// case empty
for(let i=1;i<10;i++){
   if(this.isSafe(row,col,i)){
    this.board[row][col]= i
    if(this.solve(row,col+1)) return true 
   }
   this.board[row][col]= 0
}

return false 
}

  
  solveBoard() {
    while (this.validBoard()) {
      if (this.solve()) {
        this.emit("validBoard", this.board);
        return true
      }
    }
    this.emit("invalidBoard");
    return false
    // dont forget to add a small change here ;) 
  }
}
