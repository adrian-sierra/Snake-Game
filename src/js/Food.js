import transformIntoPixels, { isSnakeFoodIntersecting } from "./functions.js";

class Food {
  constructor(cellSize) {
    this.cellSize = cellSize;

    this.position = {
      x: Math.floor(Math.random() * (this.cellSize - 0) + 0),
      y: Math.floor(Math.random() * (this.cellSize - 0) + 0),
    };
  }
  draw(gameBoard) {
    // remove any previous food elements in document object
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

  randomPosition(snake) {
    // this random position method will be passed the snake object
    // it will do a check to ensure that the new x,y position is
    // not already a part in snakeHash
    let positionObject = {
      x: Math.floor(Math.random() * (this.cellSize - 0) + 0),
      y: Math.floor(Math.random() * (this.cellSize - 0) + 0),
    };
    // console.log(JSON.stringify(positionObject));
    while (snake.snakeHash[JSON.stringify(positionObject)]) {
      positionObject.x = Math.floor(Math.random() * (this.cellSize - 0) + 0);
      positionObject.y = Math.floor(Math.random() * (this.cellSize - 0) + 0);
    }

    this.position = {
      x: positionObject.x,
      y: positionObject.y,
    };
  }
}
export default Food;
