// handles input + gameboard
import Food from "./Food.js";
import Snake from "./Snake.js";
import { isSnakeFoodIntersecting } from "./functions.js";

let gameBoard = document.getElementById("gameBoard");
let cellSize = Math.sqrt(gameBoard.offsetWidth);
let gameSpeed = 150;

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
  food.draw(gameBoard);
  if (isSnakeFoodIntersecting(snake, food)) {
    food.randomPosition();
    food.draw(gameBoard);
    snake.length++;
    // snake.snakeParts.push({ x: snake.position.x, y: snake.position.y });
  }
  window.onkeydown = (e) => {
    snake.move(e.keyCode);
  };
  if (
    snake.position.y >= 0 &&
    snake.position.y < cellSize &&
    snake.position.x >= 0 &&
    snake.position.x < cellSize
  ) {
    snake.draw(gameBoard);
  } else {
    if (alert("Game over! Your score: " + snake.length)) {
    } else window.location.reload();
  }
}, gameSpeed);
