import { useCallback, type FC } from "react";
import { CANVAS_DIMENSIONS } from "../config";

const Game: FC = () => {
  const callback = useCallback((canvas: HTMLCanvasElement) => {
    import("./game").then(({ initGame }) => {
      initGame(canvas);
    });
  }, []);
  return (
    <canvas
      ref={callback}
      id="game-canvas"
      width={CANVAS_DIMENSIONS.width}
      height={CANVAS_DIMENSIONS.height}
      style={{ background: "/bg.png" }}
    >
      Game canvas is not supported in your browser.
    </canvas>
  );
};

export default Game;
