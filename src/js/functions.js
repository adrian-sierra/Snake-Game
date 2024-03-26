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
