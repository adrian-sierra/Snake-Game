import transformIntoPixels, { randomDirection } from "./functions.js";

class Snake {
  constructor(size, color) {
    this.color = color;
    let sizeOfBoard = Math.pow(size, 2);
    this.size = size;
    this.position = {
      x: sizeOfBoard / 2 / this.size,
      y: sizeOfBoard / 2 / this.size,
    };
    this.length = 1;
    this.snakeParts = [{}];
    this.snakeHash = {};
    this.direction = randomDirection();
  }
  fillSnakeParts() {
    let snakeList = document.querySelectorAll("#snake");
    this.snakeHash = {};
    snakeList.forEach((snakeElement, index) => {
      this.snakeParts[index] = {
        x: snakeElement.offsetLeft / this.size,
        y: snakeElement.offsetTop / this.size,
      };
      this.snakeHash[JSON.stringify(this.snakeParts[index])] = 1;
    });
  }
  removePreviousSnakeElements(gameBoard) {
    let previousSnakes = document.querySelectorAll("#snake");
    for (let i = 0; i < previousSnakes.length - (this.length - 1); i++) {
      gameBoard.removeChild(previousSnakes[i]);
    }
  }
  updatedSnakePosition() {
    switch (this.direction) {
      case "up":
        this.position.y--;
        break;
      case "down":
        this.position.y++;
        break;
      case "left":
        this.position.x--;
        break;
      case "right":
        this.position.x++;
        break;
      default:
        break;
    }
  }
  draw(gameBoard) {
    this.removePreviousSnakeElements(gameBoard);
    this.fillSnakeParts();
    this.updatedSnakePosition();

    let snakeElement = document.createElement("div");
    snakeElement.setAttribute("id", "snake");
    snakeElement.style.backgroundColor = this.color;
    snakeElement.style.height = snakeElement.style.width = transformIntoPixels(
      this.size
    );
    snakeElement.style.left = transformIntoPixels(this.position.x * this.size);
    snakeElement.style.top = transformIntoPixels(this.position.y * this.size);
    gameBoard.appendChild(snakeElement);
  }
  move(key) {
    switch (key) {
      case 37:
      case "left":
        if (this.direction != "right") {
          this.direction = "left";
        }
        break;

      case 39:
      case "right":
        if (this.direction != "left") {
          this.direction = "right";
        }
        break;
      case 38:
      case "up":
        if (this.direction != "down") {
          this.direction = "up";
        }
        break;
      case 40:
      case "down":
        if (this.direction != "up") {
          this.direction = "down";
        }
        break;
      default:
        break;
    }
  }
  isWithinBounds() {
    return (
      this.position.y >= 0 &&
      this.position.y < this.size &&
      this.position.x >= 0 &&
      this.position.x < this.size
    );
  }
}
export default Snake;
