var moveCount=0;

function swapSlice(block1, block2) {
    var tempClass = document.getElementById(block1).className;
    var tempHTML = document.getElementById(block1).innerHTML;
  
    document.getElementById(block1).className = document.getElementById(block2).className;
    document.getElementById(block1).innerHTML = document.getElementById(block2).innerHTML;
  
    document.getElementById(block2).className = tempClass;
    document.getElementById(block2).innerHTML = tempHTML;
    moveCount++;
    updateMoveCount();
  }
  function shuffle() {
     
    
    for (var i = 0; i < 100; i++) {
      var emptySlice = document.getElementsByClassName("slice16")[0];
      var emptyRow = parseInt(emptySlice.id.charAt(5));
      var emptyColumn = parseInt(emptySlice.id.charAt(6));
  
      var possibleMoves = [];
      if (emptyColumn < 4) possibleMoves.push("left");
      if (emptyRow < 4) possibleMoves.push("up");
      if (emptyColumn > 1) possibleMoves.push("right");
      if (emptyRow > 1) possibleMoves.push("down");
  
      var randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      moveSlice(randomMove);
      moveCount = 0;

    
    }
  
    console.log(moveCount + " random moves performed.");
  }
  
         function handleMouseEvents() {
    var slices = document.getElementsByClassName("slice");
  
    for (var i = 0; i < slices.length; i++) {
      slices[i].addEventListener("click", function () {
        var sliceId = this.id;
        var sliceRow = parseInt(sliceId.charAt(5));
        var sliceColumn = parseInt(sliceId.charAt(6));
  
        clickSlice(sliceRow, sliceColumn);
        
    document.addEventListener("keydown", handleKeyDown);
      });
    }
  }
  function clickSlice(row, column) {
    var block = document.getElementById("block" + row + column);
    var slice = block.className;
  
    if (slice !== "slice slice16") {
      // Checking if white slice is on the right
      if (column < 4) {
        if (document.getElementById("block" + row + (column + 1)).className === "slice slice16") {
          swapSlice("block" + row + column, "block" + row + (column + 1));
          return;
        }
      }
      // Checking if white slice is on the left
      if (column > 1) {
        if (document.getElementById("block" + row + (column - 1)).className === "slice slice16") {
          swapSlice("block" + row + column, "block" + row + (column - 1));
          return;
        }
      }
      // Checking if white slice is below
      if (row < 4) {
        if (document.getElementById("block" + (row + 1) + column).className === "slice slice16") {
          swapSlice("block" + row + column, "block" + (row + 1) + column);
          return;
        }
      }
      // Checking if white slice is above
      if (row > 1) {
        if (document.getElementById("block" + (row - 1) + column).className === "slice slice16") {
          swapSlice("block" + row + column, "block" + (row - 1) + column);
          return;
        }
      }
    }
  }
  
  
  handleMouseEvents();
  document.addEventListener("keydown", handleKeyDown);
  
  function handleKeyDown(event) {
    var key = event.keyCode;
  
    // Arrow keys
    if (key === 37) {
      // Left arrow key
      moveSlice("left");
    } else if (key === 38) {
      // Up arrow key
      moveSlice("up");
    } else if (key === 39) {
      // Right arrow key
      moveSlice("right");
    } else if (key === 40) {
      // Down arrow key
      moveSlice("down");
    }
 
  }
  
  function moveSlice(direction) {
    var emptySlice = document.getElementsByClassName("slice16")[0];
    var emptyRow = parseInt(emptySlice.id.charAt(5));
    var emptyColumn = parseInt(emptySlice.id.charAt(6));
    var targetRow, targetColumn;
  
    switch (direction) {
      case "left":
        targetRow = emptyRow;
        targetColumn = emptyColumn + 1;
        break;
      case "up":
        targetRow = emptyRow + 1;
        targetColumn = emptyColumn;
        break;
      case "right":
        targetRow = emptyRow;
        targetColumn = emptyColumn - 1;
        break;
      case "down":
        targetRow = emptyRow - 1;
        targetColumn = emptyColumn;
        break;
      default:
        return;
    }
  
    if (targetRow >= 1 && targetRow <= 4 && targetColumn >= 1 && targetColumn <= 4) {
      var targetSlice = document.getElementById("block" + targetRow + targetColumn);
      swapSlice(emptySlice.id, targetSlice.id);
    }
   
  }
  
  function updateMoveCount(){
     var moveCountElement = document.getElementById("moveCount");
     moveCountElement.textContent = "Moves: " + moveCount;
  }
  