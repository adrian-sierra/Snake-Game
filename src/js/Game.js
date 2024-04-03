// handles input + gameboard
import Food from "./Food.js";
import Snake from "./Snake.js";
import { isSnakeFoodIntersecting } from "./functions.js";

let gameBoard = document.getElementById("gameBoard");
let cellSize = Math.sqrt(gameBoard.offsetWidth);
let gameSpeed = 200;
let growingRate = 5;

let snake = new Snake(cellSize);
snake.draw(gameBoard);

let food = new Food(cellSize);
// initial check to ensure we are not drawing food object in
// same position as snake object
while (isSnakeFoodIntersecting(snake, food)) {
  food.position = {
    x: Math.floor(Math.random() * (cellSize - 0) + 0),
    y: Math.floor(Math.random() * (cellSize - 0) + 0),
  };
}
food.draw(gameBoard);

// setInterval serves as the game loop for this app
setInterval(() => {
  // check that snake object is still within bounds of the gameBoard
  // and it is not intersecting itself
  if (snake.isWithinBounds() && snake.isNotIntersectingSelf()) {
    snake.draw(gameBoard);
  } else {
    // send alert if snake is outside of bounds or it is intersecting itself
    if (alert("Game over! Your score: " + snake.length)) {
    } else window.location.reload();
  }
  // if the snake object "eats" the food object, we will increase its length
  // based on the growing rate and redraw food to random position
  if (isSnakeFoodIntersecting(snake, food)) {
    snake.length += growingRate;

    food.randomPosition(snake);
    food.draw(gameBoard);
  }
  // properly account for keyboard input from user
  window.onkeydown = (e) => {
    switch (e.keyCode) {
      // valid input check based on what the current direction of the snake is
      case 37:
        if (snake.direction != "right") {
          snake.move(e.keyCode);
        }
        break;
      case 39:
        if (snake.direction != "left") {
          snake.move(e.keyCode);
        }
        break;
      case 38:
        if (snake.direction != "down") {
          snake.move(e.keyCode);
        }
        break;
      case 40:
        if (snake.direction != "up") {
          snake.move(e.keyCode);
        }
        break;
      default:
        break;
    }
  };
}, gameSpeed);
