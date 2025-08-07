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

export class HorizontalMovingEnemy extends GameObject {
  private velocity: number = 1;
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
    if (this.x > CANVAS_DIMENSIONS.width || this.x < 0) {
      this.velocity = -this.velocity;
    }
    console.log(`Enemy ${this.id} position: (${this.x}, ${this.y})`);
  }
}
