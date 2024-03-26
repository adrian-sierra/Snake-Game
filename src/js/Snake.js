import transformIntoPixels from "./functions.js";

class Snake {
  constructor(size) {
    // console.log("size of board = " + Math.pow(size, 2));
    let sizeOfBoard = Math.pow(size, 2);
    this.size = size;
    this.position = {
      x: sizeOfBoard / 2 / this.size,
      y: sizeOfBoard / 2 / this.size,
    };
  }
  draw(gameBoard) {
    let snakeElement = document.createElement("div");
    snakeElement.setAttribute("id", "snake");
    snakeElement.style.height = snakeElement.style.width = transformIntoPixels(
      this.size
    );
    snakeElement.style.left = transformIntoPixels(this.position.x * this.size);
    snakeElement.style.top = transformIntoPixels(this.position.y * this.size);
    gameBoard.appendChild(snakeElement);
    // console.log(this.position.x * this.size);
  }
  move() {
    this.position.x += 1;
  }
}
export default Snake;
