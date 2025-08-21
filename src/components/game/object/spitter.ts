import { HorizontalMovingEnemy } from "./game-object";
import { Projectile } from "./projectiles";

export class SpitterEnemy extends HorizontalMovingEnemy {
  private spitCooldown: number = 0;
  private readyImage: HTMLImageElement;
  private activeImage: HTMLImageElement = new Image(100, 80);
  private type: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    private projectiles: Map<number, Projectile>,
    velocity: number = 2
  ) {
    const image = new Image(80, 80);
    super(x, y, width, height, velocity, 200);
    this.readyImage = image;

    const rand = Math.random();
    if (rand < 0.5) {
      this.readyImage.src = "/enemies/spitter/spit-ready.png";
      this.activeImage.src = "/enemies/spitter/spit-active.png";
      this.type = 1;
    } else {
      this.readyImage.src = "/enemies/spitter/spit-ready-2.png";
      this.activeImage.src = "/enemies/spitter/spit-active-2.png";
      this.type = 2;
    }
  }

  update() {
    super.update();
    if (this.spitCooldown > 0) {
      this.spitCooldown--;
    } else {
      this.spit();
    }
  }

  spit() {
    if (this.spitCooldown <= 0) {
      console.log(`SpitterEnemy ${this.id} spits!`);
      this.spitCooldown = 60; // Reset cooldown
      const proj = new SpitProjectile(
        this.x + this.width / 2,
        this.y + this.height,
        this.type === 1 ? cinna : mofu
      );
      this.projectiles.set(proj.id, proj);
      if (this.type === 1) {
        new Audio("/sounds/spit.ogg").play();
      } else {
        new Audio("/sounds/nhimoan.mp3").play();
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.hit) {
      ctx.fillStyle = "red"; // Change color to indicate hit
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.hit = false; // Reset hit state after drawing
      return;
    }
    if (this.spitCooldown > 30) {
      ctx.drawImage(
        this.activeImage,
        this.x - 10,
        this.y - 10,
        this.width + 20,
        this.height + 20
      );
    } else {
      ctx.drawImage(this.readyImage, this.x, this.y, this.width, this.height);
    }
  }
}

const cinna = new Image();
cinna.src = "/projectiles/cinna.png";

const mofu = new Image();
mofu.src = "/projectiles/mofusand.png";

export class SpitProjectile extends Projectile {
  constructor(x: number, y: number, image: HTMLImageElement) {
    const width = image === cinna ? 15 : 10;
    const height = 10;
    const speed = 3;
    super(x, y, width, height, speed, { x: 0, y: 1 }, 10, image);
  }

  update() {
    this.y += this.speed; // Move downwards
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "green"; // Color for spit projectile
    ctx.drawImage(
      this.image,
      this.x - 15,
      this.y - 15,
      this.width + 30,
      this.height + 30
    );
  }
}
