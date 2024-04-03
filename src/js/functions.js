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
