import { HorizontalMovingEnemy } from "./game-object";
import { Projectile } from "./projectiles";

export class LaserEnemy extends HorizontalMovingEnemy {
  private ready = false;
  private fireCooldown: number = 0;
  private fireDuration: number = 30;
  private readyImage: HTMLImageElement;
  private activeImage: HTMLImageElement = new Image(100, 80);
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    private projectiles: Map<number, Projectile>,
    velocity: number = 1
  ) {
    const image = new Image(80, 80);
    super(x, y, width, height, image, velocity, 200);
    this.readyImage = image;
    this.readyImage.src = "/enemies/laser/laser-ready.jfif";
    this.activeImage.src = "/enemies/laser/laser-active.jfif";
  }

  update() {
    super.update();
    if (this.fireCooldown > 0) {
      this.fireCooldown--;
    } else {
      this.spit();
    }
  }

  spit() {
    if (!this.ready && this.fireCooldown > 0 && this.fireCooldown < 60) {
      this.ready = true;
      new Audio("/sounds/laser-ready.ogg").play();
      return;
    }
    if (this.fireCooldown <= 0) {
      const randAngle = Math.random() * Math.PI;
      const proj = new LaserProjectile(
        this.x + this.width / 2,
        this.y + this.height,
        { x: Math.cos(randAngle), y: Math.sin(randAngle) }
      );
      this.projectiles.set(proj.id, proj);
      if (this.ready) {
        new Audio("/sounds/laser-active.ogg").play();
      }
      this.ready = false;
      if (this.fireDuration <= 0) {
        this.fireCooldown = 120;
        this.fireDuration = 30;
      }
      this.fireDuration--;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.hit) {
      ctx.fillStyle = "red"; // Change color to indicate hit
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.hit = false; // Reset hit state after drawing
      return;
    }
    if (this.fireCooldown < 1) {
      ctx.drawImage(
        this.readyImage,
        this.x - 10,
        this.y - 10,
        this.width + 20,
        this.height + 20
      );
    } else {
      ctx.drawImage(this.activeImage, this.x, this.y, this.width, this.height);
    }
  }
}

export class LaserProjectile extends Projectile {
  private image1: HTMLImageElement = new Image(20, 20);
  private image2: HTMLImageElement = new Image(20, 20);
  private image3: HTMLImageElement = new Image(20, 20);

  constructor(
    x: number,
    y: number,
    direction: { x: number; y: number } = { x: 0, y: 1 }
  ) {
    let rand = Math.random();
    let width, height;
    if (rand < 0.33) {
      width = 10;
      height = 10;
    } else if (rand < 0.66) {
      width = 15;
      height = 15;
    } else {
      width = 20;
      height = 20;
    }

    const speed = 3;
    super(x, y, width, height, speed, direction, 5);
    this.image1.src = "/projectiles/bahnmi1.jfif";
    this.image2.src = "/projectiles/bahnmi2.jfif";
    this.image3.src = "/projectiles/bahnmi3.jfif";

    rand = Math.random();
    if (rand < 0.33) {
      this.image = this.image1;
    } else if (rand < 0.66) {
      this.image = this.image2;
    } else {
      this.image = this.image3;
    }
  }

  update() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
