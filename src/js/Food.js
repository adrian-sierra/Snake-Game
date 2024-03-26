import transformIntoPixels from "./functions.js";

class Food {
  constructor(cellSize) {
    // console.log("size of board = " + Math.pow(size, 2));
    let sizeOfBoard = Math.pow(cellSize, 2);
    this.cellSize = cellSize;

    this.position = {
      x: Math.floor(Math.random() * (this.cellSize - 0) + 0),
      y: Math.floor(Math.random() * (this.cellSize - 0) + 0),
    };
  }
  draw(gameBoard) {
    let foodElement = document.createElement("div");
    foodElement.setAttribute("id", "food");
    foodElement.style.height = foodElement.style.width = transformIntoPixels(
      this.cellSize
    );
    foodElement.style.left = transformIntoPixels(
      this.position.x * this.cellSize
    );
    foodElement.style.top = transformIntoPixels(
      this.position.y * this.cellSize
    );
    gameBoard.appendChild(foodElement);
    // console.log(this.position.x * this.size);
  }
}
export default Food;
