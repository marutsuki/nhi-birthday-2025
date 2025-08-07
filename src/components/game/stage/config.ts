import { CANVAS_DIMENSIONS } from "../../config";
import { enemyBasic, heroNhi } from "../object/config";
import { GameStage } from "./stage";

export const GAME_STAGES: GameStage[] = [
  new GameStage([
    {
      wait: 0,
      objects: [
        heroNhi(
          CANVAS_DIMENSIONS.width / 2 - 25,
          CANVAS_DIMENSIONS.height - 50
        ),
      ],
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
];
