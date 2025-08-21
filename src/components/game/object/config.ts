import { LucienBossEnemy } from "./boss";
import { GameObject, HorizontalMovingEnemy } from "./game-object";
import { LaserEnemy } from "./laser";
import { Hero, Projectile } from "./projectiles";
import { SpitterEnemy } from "./spitter";

export const heroNhi = (
  x: number,
  y: number,
  projectiles: Map<number, GameObject>
): Hero => {
  const image = new Image();
  image.src = "/nhi.jfif";
  return new Hero(x, y, 70, 80, image, projectiles);
};

export const enemyBasic = (
  x: number,
  y: number,
  velocity?: number
): GameObject => {
  return new HorizontalMovingEnemy(x, y, 50, 50, velocity);
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

export const enemyLaser = (
  x: number,
  y: number,
  width: number,
  height: number,
  projectiles: Map<number, Projectile>,
  velocity: number = 2
): GameObject => {
  return new LaserEnemy(x, y, width, height, projectiles, velocity);
};

export const enemyBoss = (
  x: number,
  y: number,
  projectiles: Map<number, Projectile>
): GameObject => {
  const image = new Image();
  image.src = "/enemies/boss/lucien.jfif";
  return new LucienBossEnemy(x, y, projectiles);
};
