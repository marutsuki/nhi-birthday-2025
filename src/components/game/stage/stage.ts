import type { GameObject } from "../object/game-object";

type StageLayer = {
  wait: number;
  objects: GameObject[];
};

export class GameStage {
  private currentLayerIndex: number = 0;

  constructor(private layers: StageLayer[]) {}

  addLayer(wait: number, objects: GameObject[]) {
    this.layers.push({ wait, objects });
  }

  nextLayer() {
    if (this.currentLayerIndex < this.layers.length - 1) {
      this.currentLayerIndex++;
    }
  }

  getCurrentLayer(): StageLayer | null {
    return this.layers[this.currentLayerIndex] || null;
  }

  reset() {
    this.currentLayerIndex = 0;
  }
}
