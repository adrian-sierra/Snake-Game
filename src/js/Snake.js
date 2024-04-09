import transformIntoPixels, { randomDirection } from "./functions.js";

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
    this.snakeHash = {};
    this.direction = randomDirection();
  }
  fillSnakeParts() {
    let snakeList = document.querySelectorAll("#snake");
    // implemeting a dict to help with checking if snake has ran into itself
    // will reset the hash every time we are filling the snakeParts array so
    // they are equal
    this.snakeHash = {};
    snakeList.forEach((snakeElement, index) => {
      this.snakeParts[index] = {
        x: snakeElement.offsetLeft / this.size,
        y: snakeElement.offsetTop / this.size,
      };
      // since the check is if the head of the snake (index 0 of snakeParts) is
      // intersecting with rest of positions in dict, we can skip this index
      if (index !== 0) {
        this.snakeHash[JSON.stringify(this.snakeParts[index])] = 1;
      }
    });
  }
  draw(gameBoard) {
    // using snake elements under gameBoard parent to determine the posisions of the snakeParts
    this.fillSnakeParts();
    // this handles removing snake elements from gameBoard in accordance to the
    // length of the snake. Essentially "limiting" the snake elements to match the length
    // of the current snake. If we didn't have this, the logic below is to add a snake
    // cell to the gameBoard, so we would just continue to draw snakes without "clearing"
    // the ones we are not concerned with, which would be the ones up to snake length
    let previousSnakes = document.querySelectorAll("#snake");
    for (let i = 0; i < previousSnakes.length - (this.length - 1); i++) {
      gameBoard.removeChild(previousSnakes[i]);
    }
    let snakeElement = document.createElement("div");
    snakeElement.setAttribute("id", "snake");
    snakeElement.style.height = snakeElement.style.width = transformIntoPixels(
      this.size
    );
    // want to update the position according to the current direction of the snake every
    // time we are drawing the snake (effect of continuous movement)
    // switch statement to handle appropriate cases
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
    // TODO - make much faster

    // simple implementation where we return whether the head position
    // of the snake is already in the dict
    let snakeHead = this.snakeParts[0];
    // console.log(this.snakeHash[JSON.stringify(snakeHead)]);
    return !this.snakeHash[JSON.stringify(snakeHead)];
  }
}
export default Snake;
