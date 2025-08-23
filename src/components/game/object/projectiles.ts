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