import { CANVAS_DIMENSIONS } from "../../config";
import { enemyBasic, heroNhi } from "../object/config";
import type { GameObject } from "../object/game-object";
import { GameStage } from "./stage";

export const GAME_STAGES = (
  projectiles: Map<number, GameObject>
): { hero: GameObject; stage: GameStage[] } => {
  const hero = heroNhi(
    CANVAS_DIMENSIONS.width / 2 - 25,
    CANVAS_DIMENSIONS.height - 50,
    projectiles
  );
  return {
    hero,
    stage: [
      new GameStage([
        {
          wait: 0,
          objects: [hero],
        },
        {
          wait: 60,
          objects: [enemyBasic(0, 0), enemyBasic(100, 0), enemyBasic(200, 0)],
        },
        {
          wait: 240,
          objects: [enemyBasic(0, 0), enemyBasic(100, 0), enemyBasic(200, 0)],
        },
      ]),
    ],
  };
};
