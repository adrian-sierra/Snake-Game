// handles input + gameboard
import Food from "./Food.js";
import Snake from "./Snake.js";
import { isSnakeFoodIntersecting } from "./functions.js";

const gameMenu = document.querySelector(".menu");
const startButton = document.getElementById("start-button");
const controlButtons = document.querySelectorAll(".controls__button");

function startGame() {
  let gameBoard = document.getElementById("gameBoard");
  let cellSize = Math.sqrt(gameBoard.offsetWidth);
  let gameSpeed = 100;
  let growingRate = 5;

  const snake = new Snake(cellSize);
  const food = new Food(cellSize);

  function gameLoop() {
    food.removePreviousFoodElements();
    food.draw(gameBoard);
    if (snake.isWithinBounds() && snake.isNotIntersectingSelf()) {
      snake.removePreviousSnakeElements();
      snake.draw(gameBoard);
      snake.fillSnakeParts();
    } else {
      endGame();
    }
    if (isSnakeFoodIntersecting(snake, food)) {
      snake.length += growingRate;

      food.removePreviousFoodlements();
      food.randomPosition(snake);
      food.draw(gameBoard);
    }
  }

  function handleControlButtonClick(e) {
    snake.move(e.target.value);
  }

  function handleKeyPress(e) {
    switch (e.keyCode) {
      case 37:
        snake.move(e.keyCode);
        break;
      case 39:
        snake.move(e.keyCode);
        break;
      case 38:
        snake.move(e.keyCode);
        break;
      case 40:
        snake.move(e.keyCode);
        break;
      default:
        break;
    }
  }

  function endGame() {
    // send alert if snake is outside of bounds or it is intersecting itself
    if (alert("Game over! Your score: " + snake.length)) {
    } else window.location.reload();
  }

  controlButtons.forEach((button) =>
    button.addEventListener("click", handleControlButtonClick)
  );
  document.addEventListener("keydown", handleKeyPress);
  setInterval(gameLoop, gameSpeed);
}

startButton.addEventListener("click", () => {
  gameMenu.classList.add("hide");
  startGame();
});
