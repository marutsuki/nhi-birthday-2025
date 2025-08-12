import { CANVAS_DIMENSIONS } from "../../config";
import { BossDefeatedEvent } from "./event";
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
  private finishHim: boolean = false;
  private isDead: boolean = false;
  private attackIndex: number = 0;
  private timer: number = 0;
  private attacking: boolean = false;

  private firstDraw: boolean = true;
  private velocity: number = 2;

  private moan1: HTMLAudioElement;
  private moan2: HTMLAudioElement;
  private moan3: HTMLAudioElement;
  private moan4: HTMLAudioElement;
  private moan5: HTMLAudioElement;

  private open: HTMLImageElement;
  private hurt1: HTMLImageElement;
  private hurt2: HTMLImageElement;

  private framesSinceLastHit = 3;

  constructor(
    x: number,
    y: number,
    private projectiles: Map<number, Projectile>
  ) {
    const image = new Image();
    image.src = "/enemies/boss/lucien.png";

    super(x, y, 200, 200, image, 4000);

    this.open = new Image();
    this.open.src = "/enemies/boss/lucien1.png";
    this.hurt1 = new Image();
    this.hurt1.src = "/enemies/boss/hurt1.png";
    this.hurt2 = new Image();
    this.hurt2.src = "/enemies/boss/hurt2.png";

    this.timer = LucienBossEnemy.timeline[0].wait;

    this.moan1 = new Audio("/sounds/moan1.ogg");
    this.moan2 = new Audio("/sounds/moan2.ogg");
    this.moan3 = new Audio("/sounds/moan3.ogg");
    this.moan4 = new Audio("/sounds/moan4.ogg");
    this.moan5 = new Audio("/sounds/moan5.ogg");
    window.addEventListener("boss-hit", () => {
      if (this.isDead) {
        return;
      }
      this.hit = true;
      const rand = Math.random();

      if (rand < 0.2) {
        this.moan1.play();
      } else if (rand < 0.4) {
        this.moan2.play();
      } else if (rand < 0.6) {
        this.moan3.play();
      } else if (rand < 0.8) {
        this.moan4.play();
      } else {
        this.moan5.play();
      }
    });

    window.addEventListener("boss-gone", () => {
      this.isDead = true;
      new Audio("/sounds/explode.mp3").play();
    });
  }

  update() {
    if (this.finishHim) {
      return;
    }
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
      this.attacking = false;
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
      this.attacking = true;
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
      this.attacking = true;
    }
  }

  scorchAttack() {
    if (this.timer <= 0) {
      const proj = new ScorchLaserProjectile(
        this.x + this.width / 2,
        this.y + this.height
      );
      this.projectiles.set(proj.id, proj);
      this.attacking = true;
    }
  }

  override onHit(dmg: number): void {
    this.hp -= dmg;
    this.hit = true;
    if (this.hp <= 0) {
      console.log("Lucien Boss defeated!");
      this.projectiles.clear();
      this.finishHim = true;
      window.dispatchEvent(
        new BossDefeatedEvent({
          x: this.x + this.width / 2,
          y: this.y + this.height / 2,
        })
      );
    }
    const rand = Math.random();

    if (rand < 0.2) {
      this.moan1.play();
    } else if (rand < 0.4) {
      this.moan2.play();
    } else if (rand < 0.6) {
      this.moan3.play();
    } else if (rand < 0.8) {
      this.moan4.play();
    } else {
      this.moan5.play();
    }
  }

  override draw(ctx: CanvasRenderingContext2D) {
    if (this.isDead) {
      return;
    }
    if (this.framesSinceLastHit < 3) {
      const rand = Math.random();
      let img;
      if (rand < 0.5) {
        img = this.hurt1;
      } else {
        img = this.hurt2;
      }
      ctx.drawImage(img, this.x - 15, this.y - 15, this.width + 30, this.height + 30);
      this.hit = false;
    } else {
      if (this.attacking) {
        ctx.drawImage(this.open, this.x, this.y, this.width, this.height);
      } else {
        super.draw(ctx);
      }
    }
    if (this.hit) {
      this.framesSinceLastHit = 0;
    } else {
      this.framesSinceLastHit++;
    }

  }

  override dead(): boolean {
    return this.isDead;
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
    this.image.src = "/projectiles/scorch.png";
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
    this.image.src = "/projectiles/thumbsup.png";
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
    this.image.src = "/projectiles/brs.png";
  }

  update() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
