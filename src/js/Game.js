// handles input + gameboard
import Food from "./Food.js";
import Snake from "./Snake.js";
import keyPressed from "./Input.js";
import { isSnakeFoodIntersecting } from "./functions.js";

let gameBoard = document.getElementById("gameBoard");
let cellSize = Math.sqrt(gameBoard.offsetWidth);

let snake = new Snake(cellSize);
snake.draw(gameBoard);
// trigger the draw method for the snake whenever we detect a key has been pressed
window.onkeydown = (e) => {
  console.log(e.keyCode);
  snake.move();
  snake.draw(gameBoard);
};
// console.log(key);

let food = new Food(cellSize);
while (isSnakeFoodIntersecting(snake, food)) {
  food.position = {
    x: Math.floor(Math.random() * (cellSize - 0) + 0),
    y: Math.floor(Math.random() * (cellSize - 0) + 0),
  };
}
food.draw(gameBoard);
