// for Snake and Food objects
export default function transformIntoPixels(dimension) {
  return dimension + "px";
}

// for Game file
export function isSnakeFoodIntersecting(snake, food) {
  return (
    snake.position.x === food.position.x && snake.position.y === food.position.y
  );
}
// export function isObjectIntersecting(objOne, objTwo) {
//   //   console.log("object one: " + objOne.x + " " + objOne.y);
//   //   console.log("object two: " + objTwo.x + " " + objTwo.y);
//   return objOne.x === objTwo.x && objOne.y === objTwo.y;
// }

export function randomDirection() {
  switch (Math.floor(Math.random() * (5 - 1) + 1)) {
    case 4:
      return "up";
    case 3:
      return "right";
    case 2:
      return "down";
    case 1:
      return "left";
  }
}
