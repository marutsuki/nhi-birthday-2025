import type { GameObject } from "./object/game-object";
import { GAME_STAGES } from "./stage/config";

export const initGame = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas context");
    return;
  }

  new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = "/bg.png";

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(img);
    };
  }).then((img) => gameLoop(canvas, img));
};

const gameLoop = (canvas: HTMLCanvasElement, bg: HTMLImageElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas context");
    return;
  }

  const stage = GAME_STAGES[0];
  const objects = new Map<number, GameObject>();

  const update = (t: number) => {
    const currentLayer = stage.getCurrentLayer();
    if (currentLayer && t > currentLayer.wait) {
      currentLayer?.objects.forEach((obj) => {
        objects.set(obj.id, obj);
      });
      stage.nextLayer();
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    objects.forEach((obj) => {
      obj.update();
      obj.draw(ctx);
    });
  };

  new Animator(
    60,
    (t) => {
      update(t);
      render();
    },
    () => {
      console.log("Game started");
    },
    () => {
      console.log("Game stopped");
    }
  ).start();
};

/** A simple animator that updates the simulation at a fixed frame rate.*/
class Animator {
  private t = 0;

  /** The last frame that was rendered. */
  private lastFrame: number = -1;
  /** The last time the animation frame was updated. */
  private lastUpdate: number = 0;
  /** The frequency to update the simulation. */
  private frequency: number;

  /**
   * Creates a new {@link Animator} instance.
   *
   * @param fps the frames per second
   * @param callback the callback to update the simulation
   */
  public constructor(
    fps: number,
    private callback: (frame: number) => void,
    private onStart: () => void,
    private onStop: () => void
  ) {
    this.frequency = 1000 / fps;
  }

  /**
   * Starts the animation loop.
   */
  public start() {
    this.onStart();
    this.lastUpdate = performance.now();
    this.lastFrame = requestAnimationFrame(this.update.bind(this));
  }

  public stop() {
    cancelAnimationFrame(this.lastFrame);
    this.onStop();
  }
  /**
   * An animation update frame.
   */
  private update() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastUpdate;
    if (deltaTime >= this.frequency) {
      this.lastUpdate = currentTime;
      this.callback(this.t++);
    }

    requestAnimationFrame(this.update.bind(this));
  }
}
