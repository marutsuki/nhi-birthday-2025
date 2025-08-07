import { CANVAS_DIMENSIONS } from "../../config";
import { Enemy } from "./game-object";
import { Projectile } from "./projectiles";

type AttackTimeline = {
  wait: number;
  type: "bigSlow" | "spread" | "scorch";
}[];

export class LucienBossEnemy extends Enemy {
  private static timeline: AttackTimeline = [
    { wait: 160, type: "spread" },
    { wait: 120, type: "bigSlow" },
    { wait: 120, type: "scorch" },
  ];
  private attackIndex: number = 0;
  private timer: number = 0;

  private firstDraw: boolean = true;
  private velocity: number = 2;
  constructor(
    x: number,
    y: number,
    private projectiles: Map<number, Projectile>
  ) {
    const image = new Image();
    image.src = "/enemies/boss/lucien.jfif";
    super(x, y, 200, 200, image, 5000);
    this.timer = LucienBossEnemy.timeline[0].wait;
  }

  update() {
    if (this.firstDraw) {
      this.firstDraw = false;
      new Audio("/sounds/moan.ogg").play();
    }
    this.x += this.velocity;
    if (this.x > CANVAS_DIMENSIONS.width - this.width || this.x < 0) {
      this.velocity = -this.velocity;
    }

    switch (LucienBossEnemy.timeline[this.attackIndex].type) {
      case "bigSlow":
        this.bigSlowAttack();
        break;
      case "spread":
        this.spreadAttack();
        break;
      case "scorch":
        this.scorchAttack();
        break;
    }

    if (this.timer <= 0) {
      this.attackIndex++;
      if (this.attackIndex >= LucienBossEnemy.timeline.length) {
        this.attackIndex = 0;
      }
      this.timer = LucienBossEnemy.timeline[this.attackIndex].wait;
    }
    this.timer--;
  }

  bigSlowAttack() {
    if (this.timer <= 0) {
      const randAngle = Math.random() * Math.PI;
      const proj = new BigSlowProjectile(
        this.x + this.width / 2,
        this.y + this.height,
        4,
        { x: Math.cos(randAngle), y: Math.sin(randAngle) }
      );
      this.projectiles.set(proj.id, proj);
    }
  }

  spreadAttack() {
    if (this.timer <= 30) {
      const randAngle = Math.random() * Math.PI;
      const proj = new SpreadProjectile(
        this.x + this.width / 2,
        this.y + this.height,
        4,
        { x: Math.cos(randAngle), y: Math.sin(randAngle) }
      );
      this.projectiles.set(proj.id, proj);
    }
  }

  scorchAttack() {
    if (this.timer <= 0) {
      const proj = new ScorchLaserProjectile(
        this.x + this.width / 2,
        this.y + this.height
      );
      this.projectiles.set(proj.id, proj);
    }
  }
}

export class ScorchLaserProjectile extends Projectile {
  constructor(
    x: number,
    y: number,
    public speed: number = 3,
    public direction: { x: number; y: number } = { x: 0, y: 1 },
    public dmg: number = 200,
    image: HTMLImageElement = new Image()
  ) {
    super(x, y, 100, 100, speed, direction, dmg, image);
    this.image.src = "/projectiles/scorch.jpg";
  }

  update() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export class SpreadProjectile extends Projectile {
  constructor(
    x: number,
    y: number,
    public speed: number = 4,
    public direction: { x: number; y: number } = { x: 0, y: 1 },
    public dmg: number = 100
  ) {
    super(x, y, 30, 30, speed, direction, dmg);
    this.image.src = "/projectiles/thumbsup.jpg";
  }
  update() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export class BigSlowProjectile extends Projectile {
  constructor(
    x: number,
    y: number,
    public speed: number = 1,
    public direction: { x: number; y: number } = { x: 0, y: 1 },
    public dmg: number = 200,
    image: HTMLImageElement = new Image()
  ) {
    super(x, y, 150, 150, speed, direction, dmg, image);
    this.image.src = "/projectiles/brs.jpg";
  }

  update() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
