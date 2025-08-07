import { HorizontalMovingEnemy } from "./game-object";
import { Projectile } from "./projectiles";

export class SpitterEnemy extends HorizontalMovingEnemy {
  private spitCooldown: number = 0;
  private readyImage: HTMLImageElement;
  private activeImage: HTMLImageElement = new Image(100, 80);
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    private projectiles: Map<number, Projectile>,
    velocity: number = 2
  ) {
    const image = new Image(80, 80);
    super(x, y, width, height, image, velocity, 200);
    this.readyImage = image;
    this.readyImage.src = "/enemies/spitter/spit-ready.jfif";
    this.activeImage.src = "/enemies/spitter/spit-active.jfif";
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
        this.y + this.height
      );
      this.projectiles.set(proj.id, proj);
      new Audio("/sounds/spit.ogg").play();
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

export class SpitProjectile extends Projectile {
  constructor(x: number, y: number) {
    const width = 10;
    const height = 10;
    const speed = 3;
    super(x, y, width, height, speed, "down", 10);
  }

  update() {
    this.y += this.speed; // Move downwards
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "green"; // Color for spit projectile
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
