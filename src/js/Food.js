import transformIntoPixels from "./functions.js";

class Food {
  constructor(cellSize) {
    this.cellSize = cellSize;

    this.position = {
      x: Math.floor(Math.random() * (this.cellSize - 0) + 0),
      y: Math.floor(Math.random() * (this.cellSize - 0) + 0),
    };
  }
  draw(gameBoard) {
    let previousFoods = document.querySelectorAll("#food");
    previousFoods.forEach((food) => {
      gameBoard.removeChild(food);
    });
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
  }
  randomPosition() {
    this.position = {
      x: Math.floor(Math.random() * (this.cellSize - 0) + 0),
      y: Math.floor(Math.random() * (this.cellSize - 0) + 0),
    };
  }
}
export default Food;
