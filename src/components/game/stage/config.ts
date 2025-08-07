import { enemyBasic } from "../object/config";
import { GameStage } from "./stage";

export const GAME_STAGES: GameStage[] = [
  new GameStage([
    {
      wait: 1000,
      objects: [enemyBasic()],
    },
  ]),
];
