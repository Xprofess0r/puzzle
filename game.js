var moveCount=0;
var timeInterval;
var seconds=0;

var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startStopwatch() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval); // stop the interval
  elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
  stopwatchInterval = null; // reset the interval variable
}

function resetStopwatch() {
  stopStopwatch(); // stop the interval
  elapsedPausedTime = 0; // reset the elapsed paused time variable
  document.getElementById("stopwatch").innerHTML = "00:00"; // reset the display
}

function updateStopwatch() {
  var currentTime = new Date().getTime(); // get current time in milliseconds
  var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
  
  var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
  var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
 // var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
  var displayTime = pad(minutes) + ":" + pad(seconds); // format display time
  document.getElementById("stopwatch").innerHTML = displayTime; // update the display
}

function pad(number) {
  // add a leading zero if the number is less than 10
  return (number < 10 ? "0" : "") + number;
}
function swapSlice(block1, block2) {
    var tempClass = document.getElementById(block1).className;
    var tempHTML = document.getElementById(block1).innerHTML;
  
    document.getElementById(block1).className = document.getElementById(block2).className;
    document.getElementById(block1).innerHTML = document.getElementById(block2).innerHTML;
  
    document.getElementById(block2).className = tempClass;
    document.getElementById(block2).innerHTML = tempHTML;
    moveCount++;
    updateMoveCount();
    startStopwatch();
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
      updateMoveCount();
    }
  
    console.log(moveCount + " random moves performed.");
    resetStopwatch();
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
  