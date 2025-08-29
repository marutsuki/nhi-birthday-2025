import { CANVAS_DIMENSIONS } from "../../config";
import { FinishHimEvent, type BossDefeatedEvent } from "./event";
import { GameObject } from "./game-object";
import { Projectile } from "./projectiles";

const osamu1 = new Image();
osamu1.src = "/projectiles/osamu1.png";
const osamu2 = new Image();
osamu2.src = "/projectiles/osamu2.png";
const osamu3 = new Image();
osamu3.src = "/projectiles/osamu3.png";

export class HeroProjectile extends Projectile {
  constructor(x: number, y: number) {
    const width = 25;
    const height = 25;
    const speed = 5;

    const images = [osamu1, osamu2, osamu3];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    super(x, y, width, height, speed, { x: 0, y: -1 }, 40, randomImage);
  }

  update() {
    this.x += this.speed * this.direction.x;
    this.y += this.speed * this.direction.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}

export class Hero extends GameObject {
  private freeze = false;
  private velocity: number = 5;
  private keysPressed: Set<string> = new Set();
  private direction: { x: number; y: number } = { x: 0, y: 0 };
  private hit = false;

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
      if (this.freeze) return;
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

      event.preventDefault();
      event.stopPropagation();
    });

    addEventListener("keyup", (event) => {
      this.keysPressed.delete(event.key);
      if (this.keysPressed.size === 0) {
        this.direction = { x: 0, y: 0 };
      }
    });

    window.addEventListener("boss-defeated", (e: Event) => {
      const event = e as BossDefeatedEvent;
      this.projectiles.clear();
      this.freeze = true;
      window.dispatchEvent(
        new FinishHimEvent(event.bossLocation, {
          x: this.x + this.width / 2,
          y: this.y + this.height / 2,
        })
      );
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
    this.hit = true;
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

  override draw(ctx: CanvasRenderingContext2D) {
    if (this.hit) {
      ctx.fillStyle = "red"; // Change color to indicate hit
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.hit = false;
    } else {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}
