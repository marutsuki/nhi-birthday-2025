import { CANVAS_DIMENSIONS } from "../../config";
import {
  enemyBasic,
  enemyBoss,
  enemyLaser,
  enemySpitter,
  heroNhi,
} from "../object/config";
import type { Hero, Projectile } from "../object/projectiles";
import { GameStage } from "./stage";

export const GAME_STAGES = (
  projectiles: Map<number, Projectile>,
  heroProjectiles: Map<number, Projectile>
): { hero: Hero; stage: GameStage[] } => {
  const hero = heroNhi(
    CANVAS_DIMENSIONS.width / 2 - 25,
    CANVAS_DIMENSIONS.height - 50,
    heroProjectiles
  );
  return {
    hero,
    stage: [
      new GameStage([
        {
          wait: 0,
          objects: [
            hero,
            enemyBoss(CANVAS_DIMENSIONS.width / 2 - 100, 20, projectiles),
          ],
        },
      ]),
      new GameStage([
        {
          wait: 0,
          objects: [hero],
        },
        {
          wait: 60,
          objects: [enemyBasic(50, 0)],
        },
        {
          wait: 70,
          objects: [enemyBasic(30, 0)],
        },
        {
          wait: 80,
          objects: [enemyBasic(10, 0)],
        },
        {
          wait: 240,
          objects: [enemyBasic(50, 0)],
        },
        {
          wait: 250,
          objects: [enemyBasic(30, 0)],
        },
        {
          wait: 260,
          objects: [enemyBasic(10, 0)],
        },
        {
          wait: 420,
          objects: [
            enemyBasic(50, 0),
            enemyBasic(CANVAS_DIMENSIONS.width - 90, 0, -4),
          ],
        },
        {
          wait: 430,
          objects: [
            enemyBasic(30, 0),
            enemyBasic(CANVAS_DIMENSIONS.width - 70, 0, -4),
          ],
        },
        {
          wait: 440,
          objects: [
            enemyBasic(10, 0),
            enemyBasic(CANVAS_DIMENSIONS.width - 50, 0, -4),
          ],
        },
        {
          wait: 620,
          objects: [
            enemySpitter(0, 0, 80, 80, projectiles),
            enemySpitter(
              CANVAS_DIMENSIONS.width - 120,
              0,
              80,
              80,
              projectiles,
              -2
            ),
          ],
        },
        {
          wait: 860,
          objects: [
            enemySpitter(400, 200, 80, 80, projectiles),
            enemySpitter(
              CANVAS_DIMENSIONS.width - 400,
              200,
              80,
              80,
              projectiles,
              -2
            ),
          ],
        },
        {
          wait: 870,
          objects: [
            enemySpitter(300, 150, 80, 80, projectiles),
            enemySpitter(
              CANVAS_DIMENSIONS.width - 300,
              150,
              80,
              80,
              projectiles,
              -2
            ),
          ],
        },
        {
          wait: 870,
          objects: [
            enemySpitter(200, 100, 80, 80, projectiles),
            enemySpitter(
              CANVAS_DIMENSIONS.width - 200,
              100,
              80,
              80,
              projectiles,
              -2
            ),
          ],
        },
        {
          wait: 880,
          objects: [
            enemySpitter(100, 50, 80, 80, projectiles),
            enemySpitter(
              CANVAS_DIMENSIONS.width - 100,
              50,
              80,
              80,
              projectiles,
              -2
            ),
          ],
        },
        {
          wait: 890,
          objects: [
            enemySpitter(0, 0, 80, 80, projectiles),
            enemySpitter(
              CANVAS_DIMENSIONS.width - 120,
              0,
              80,
              80,
              projectiles,
              -2
            ),
          ],
        },
        {
          wait: 1000,
          objects: [
            enemyBasic(400, 0),
            enemyBasic(CANVAS_DIMENSIONS.width - 400, 0, -2),
          ],
        },
        {
          wait: 1010,
          objects: [
            enemyBasic(350, 0),
            enemyBasic(CANVAS_DIMENSIONS.width - 350, 0, -2),
          ],
        },
        {
          wait: 1020,
          objects: [
            enemyBasic(300, 0),
            enemyBasic(CANVAS_DIMENSIONS.width - 300, 0, -2),
          ],
        },
        {
          wait: 1030,
          objects: [
            enemyBasic(250, 0, 2),
            enemyBasic(CANVAS_DIMENSIONS.width - 250, 0, -2),
          ],
        },
        {
          wait: 1040,
          objects: [
            enemyBasic(200, 0, 2),
            enemyBasic(CANVAS_DIMENSIONS.width - 200, 0, -2),
          ],
        },
        {
          wait: 1050,
          objects: [
            enemyBasic(150, 0, 2),
            enemyBasic(CANVAS_DIMENSIONS.width - 150, 0, -2),
          ],
        },
        {
          wait: 1060,
          objects: [
            enemyBasic(100, 0, 2),
            enemyBasic(CANVAS_DIMENSIONS.width - 100, 0, -2),
          ],
        },
        {
          wait: 1380,
          objects: [
            enemyLaser(0, 0, 80, 80, projectiles),
            enemyLaser(
              CANVAS_DIMENSIONS.width - 120,
              0,
              80,
              80,
              projectiles,
              -2
            ),
          ],
        },
        {
          wait: 2000,
          objects: [
            hero,
            enemyBoss(CANVAS_DIMENSIONS.width / 2 - 100, 20, projectiles),
          ],
        },
      ]),
    ],
  };
};
