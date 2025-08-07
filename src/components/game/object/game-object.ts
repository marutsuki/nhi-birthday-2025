import { CANVAS_DIMENSIONS } from "../../config";

export class GameObject {
  private static idCounter = 0;
  public id: number;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public image: HTMLImageElement
  ) {
    this.id = GameObject.idCounter++;
    this.image.onload = () => {
      console.log(`GameObject ${this.id} image loaded`);
    };
    this.image.onerror = () => {
      console.error(`Failed to load image for GameObject ${this.id}`);
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    // Update logic for the game object can be added here
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
    image: HTMLImageElement
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
}

export class Enemy extends GameObject {
  private hit: boolean = false;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    super(x, y, width, height, image);
  }

  collidesWith(other: GameObject): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  onHit() {
    this.hit = true;
    console.log(`Enemy ${this.id} hit!`);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.hit) {
      ctx.fillStyle = "red"; // Change color to indicate hit
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      super.draw(ctx);
    }
  }
}
export class HorizontalMovingEnemy extends Enemy {
  private velocity: number = 2;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement
  ) {
    super(x, y, width, height, image);
  }

  update() {
    this.x += this.velocity;
    if (this.x > CANVAS_DIMENSIONS.width - this.width || this.x < 0) {
      this.velocity = -this.velocity;
      this.y += 20;
    }
  }
}
