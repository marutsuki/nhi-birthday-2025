import { GameObject } from "./game-object";

export const enemyBasic = (): GameObject => {
  const image = new Image();
  image.src = "/enemy-basic.jfif";
  return new GameObject(0, 0, 50, 50, image);
};
