// handles input + gameboard
import Food from "./Food.js";
import Snake from "./Snake.js";
import { isSnakeFoodIntersecting } from "./functions.js";

let gameBoard = document.getElementById("gameBoard");
let cellSize = Math.sqrt(gameBoard.offsetWidth);
let gameSpeed = 1000;

let snake = new Snake(cellSize);
snake.draw(gameBoard);

let food = new Food(cellSize);
while (isSnakeFoodIntersecting(snake, food)) {
  food.position = {
    x: Math.floor(Math.random() * (cellSize - 0) + 0),
    y: Math.floor(Math.random() * (cellSize - 0) + 0),
  };
}
food.draw(gameBoard);

setInterval(() => {
  if (snake.isWithinBounds() && snake.isNotIntersectingSelf()) {
    snake.draw(gameBoard);
  } else {
    if (alert("Game over! Your score: " + snake.length)) {
    } else window.location.reload();
  }
  food.draw(gameBoard);
  if (isSnakeFoodIntersecting(snake, food)) {
    snake.length++;

    food.randomPosition(snake.snakeParts);
    food.draw(gameBoard);
  }
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
