import transformIntoPixels, { isSnakeFoodIntersecting } from "./functions.js";

class Snake {
  constructor(size) {
    let sizeOfBoard = Math.pow(size, 2);
    this.size = size;
    this.position = {
      x: sizeOfBoard / 2 / this.size,
      y: sizeOfBoard / 2 / this.size,
    };
    this.length = 1;
    this.snakeParts = [{}];
    this.direction = "up";
  }
  draw(gameBoard) {
    // using snake elements under gameBoard parent to determine the posisions of the snakeParts
    let snakeList = document.querySelectorAll("#snake");
    snakeList.forEach((snakeElement, index) => {
      this.snakeParts[index] = {
        x: snakeElement.offsetLeft / this.size,
        y: snakeElement.offsetTop / this.size,
      };
    });

    let previousSnakes = document.querySelectorAll("#snake");
    for (let i = 0; i < previousSnakes.length - (this.length - 1); i++) {
      gameBoard.removeChild(previousSnakes[i]);
    }
    let snakeElement = document.createElement("div");
    snakeElement.setAttribute("id", "snake");
    snakeElement.style.height = snakeElement.style.width = transformIntoPixels(
      this.size
    );
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
    snakeElement.style.left = transformIntoPixels(this.position.x * this.size);
    snakeElement.style.top = transformIntoPixels(this.position.y * this.size);
    gameBoard.appendChild(snakeElement);
  }
  move(key) {
    // simply change direction to match the arrow that was pressed
    switch (key) {
      case 37:
        this.direction = "left";
        break;
      case 39:
        this.direction = "right";
        break;
      case 38:
        this.direction = "up";
        break;
      case 40:
        this.direction = "down";
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
  isNotIntersectingSelf() {
    // time complexity of O(n)
    for (let i = 1; i < this.snakeParts.length; i++) {
      //   console.log("i: " + i);
      //   console.log(this.snakeParts[i].x, this.snakeParts[i].y);
      if (
        this.snakeParts[0].x === this.snakeParts[i].x &&
        this.snakeParts[0].y === this.snakeParts[i].y
      ) {
        return false;
      }
    }
    return true;
  }
}
export default Snake;
