import transformIntoPixels from "./functions.js";

class Snake {
  constructor(size) {
    let sizeOfBoard = Math.pow(size, 2);
    this.size = size;
    this.position = {
      x: sizeOfBoard / 2 / this.size,
      y: sizeOfBoard / 2 / this.size,
    };
    this.length = 1;
    // this.snakeParts = [{ x: this.position.x, y: this.position.y }];
    this.direction = "up";
  }
  draw(gameBoard) {
    // console.log(this.position);
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
}
export default Snake;
