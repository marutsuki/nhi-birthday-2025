import { CANVAS_DIMENSIONS } from "../../config";
import { GameObject } from "./game-object";

export abstract class Projectile extends GameObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public speed: number,
    public direction: { x: number; y: number },
    public dmg: number = 100,
    image: HTMLImageElement = new Image()
  ) {
    super(x, y, width, height, image);
  }

  abstract update(): void;

  abstract render(ctx: CanvasRenderingContext2D): void;

  isOffScreen(canvasWidth: number, canvasHeight: number): boolean {
    return (
      this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight
    );
  }
}

export class HeroProjectile extends Projectile {
  constructor(x: number, y: number) {
    const width = 10;
    const height = 10;
    const speed = 5;
    super(x, y, width, height, speed, { x: 0, y: -1 }, 40);
  }

  update() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Hero extends GameObject {
  private velocity: number = 5;
  private keysPressed: Set<string> = new Set();
  private direction: { x: number; y: number } = { x: 0, y: 0 };

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement,
    private projectiles: Map<number, GameObject>,
    private hp: number = 100
  ) {
    super(x, y, width, height, image);

    addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.direction = { x: 0, y: -this.velocity };
          break;
        case "ArrowDown":
          this.direction = { x: 0, y: this.velocity };
          break;
        case "ArrowLeft":
          this.direction = { x: -this.velocity, y: 0 };
          break;
        case "ArrowRight":
          this.direction = { x: this.velocity, y: 0 };
          break;
      }
      this.keysPressed.add(event.key);

      if (event.key === " ") {
        this.shoot();
        new Audio("/sounds/hero-shoot.flac").play().catch((error) => {
          console.error("Error playing shoot sound:", error);
        });
      }
    });

    addEventListener("keyup", (event) => {
      this.keysPressed.delete(event.key);
      if (this.keysPressed.size === 0) {
        this.direction = { x: 0, y: 0 };
      }
    });
  }

  override update() {
    this.move(this.direction.x, this.direction.y);
  }

  shoot() {
    const proj = new HeroProjectile(this.x + this.width / 2, this.y);
    this.projectiles.set(proj.id, proj);
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;

    // Ensure the hero stays within canvas bounds
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > CANVAS_DIMENSIONS.width) {
      this.x = CANVAS_DIMENSIONS.width - this.width;
    }
    if (this.y + this.height > CANVAS_DIMENSIONS.height) {
      this.y = CANVAS_DIMENSIONS.height - this.height;
    }
  }

  onHit(dmg: number): void {
    this.hp -= dmg;
    new Audio("/sounds/hit.wav").play();
    if (this.hp <= 0) {
      console.log("Hero is dead!");
    }
  }

  collidesWith(other: GameObject): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
