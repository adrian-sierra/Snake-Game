// handles input + gameboard
import Food from "./Food.js";
import Snake from "./Snake.js";
import { isSnakeFoodIntersecting } from "./functions.js";
import settings from "./Settings.js";

const settingsButton = document.getElementById("settings-button");
const gameMenu = document.querySelector(".menu");
const startButton = document.getElementById("start-button");
const controlsDiv = document.querySelector(".controls");

let gameSettings = {
  gameSpeed: 250,
  growingRate: 1,
  foodColor: "rgb(255, 38, 0)",
  snakeColor: "rgb(0, 249, 0)",
};

function startGame() {
  const controlButtons = document.querySelectorAll(".controls__button");

  let gameBoard = document.getElementById("gameBoard");
  let cellSize = Math.sqrt(gameBoard.offsetWidth);
  let gameSpeed = gameSettings.gameSpeed;
  let growingRate = gameSettings.growingRate;

  const snake = new Snake(cellSize, gameSettings.snakeColor);
  const food = new Food(cellSize, gameSettings.foodColor);

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

      food.removePreviousFoodElements();
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
  controlsDiv.classList.remove("hide");
  startGame();
});

settingsButton.addEventListener("click", () => {
  gameMenu.classList.add("hide");
  settings(gameSettings);
});
