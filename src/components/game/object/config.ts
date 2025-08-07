import { GameObject, HorizontalMovingEnemy } from "./game-object";
import { Hero, Projectile } from "./projectiles";
import { SpitterEnemy } from "./spitter";

export const heroNhi = (
  x: number,
  y: number,
  projectiles: Map<number, GameObject>
): GameObject => {
  const image = new Image();
  image.src = "/nhi.jfif";
  return new Hero(x, y, 50, 50, image, projectiles);
};

export const enemyBasic = (
  x: number,
  y: number,
  velocity?: number
): GameObject => {
  const image = new Image();
  image.src = "/enemy-basic.jfif";
  return new HorizontalMovingEnemy(x, y, 50, 50, image, velocity);
};

export const enemySpitter = (
  x: number,
  y: number,
  width: number,
  height: number,
  projectiles: Map<number, Projectile>,
  velocity: number = 2
): GameObject => {
  return new SpitterEnemy(x, y, width, height, projectiles, velocity);
};
