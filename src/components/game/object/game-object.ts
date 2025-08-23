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
  protected hit: boolean = false;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    image: HTMLImageElement,
    protected hp: number = 100
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

  onHit(dmg: number = 100) {
    this.hit = true;
    console.log(`Enemy ${this.id} hit!`);
    this.hp -= dmg;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.hit) {
      ctx.fillStyle = "red"; // Change color to indicate hit
      ctx.fillRect(this.x, this.y, this.width, this.height);
      this.hit = false; // Reset hit state after drawing
    } else {
      super.draw(ctx);
    }
  }

  dead(): boolean {
    return this.hp <= 0;
  }
}

const image = new Image();
image.src = "/enemy-basic.jfif";

const nhi4head = new Image();
nhi4head.src = "/nhi4head.png";

export class HorizontalMovingEnemy extends Enemy {
  private firstDraw: boolean = true;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    private velocity: number = 4,
    hp: number = 100
  ) {
    const rand = Math.random();
    let img;
    if (rand < 0.5) {
      img = image;
    } else {
      img = nhi4head;
    }
    
    super(x, y, width, height, img, hp);
  }

  update() {
    if (this.firstDraw) {
      this.firstDraw = false;
      const rand = Math.random();
      let audio: HTMLAudioElement;
      if (this.image === nhi4head) {
        audio = new Audio("/ooga_booga.ogg");
        audio.volume = 1;
      } else {
        if (rand < 0.33) {
          audio = new Audio("/sounds/dumamay1.ogg")
        } else if (rand < 0.66) {
          audio = new Audio("/sounds/dumamay2.ogg");
        } else {
          audio = new Audio("/sounds/dumamay3.ogg");
        }
        audio.volume = 0.3;
      }

      audio.play();
    }
    this.x += this.velocity;
    if (this.x > CANVAS_DIMENSIONS.width - this.width || this.x < 0) {
      this.velocity = -this.velocity;
      this.y += 50;
    }
  }

  onHit(dmg?: number): void {
    super.onHit(dmg);
    new Audio("/sounds/hit.wav").play();
  }
}
