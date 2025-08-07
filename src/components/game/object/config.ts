import { GameObject, Hero, HorizontalMovingEnemy } from "./game-object";

export const heroNhi = (x: number, y: number): GameObject => {
  const image = new Image();
  image.src = "/nhi.jfif";
  return new Hero(x, y, 50, 50, image);
};

export const enemyBasic = (x: number, y: number): GameObject => {
  const image = new Image();
  image.src = "/enemy-basic.jfif";
  return new HorizontalMovingEnemy(x, y, 50, 50, image);
};
