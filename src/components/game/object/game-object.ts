import { CANVAS_DIMENSIONS } from "../../config";

export abstract class GameObject {
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
