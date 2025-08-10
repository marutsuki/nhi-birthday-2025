import { useCallback, useEffect, useState, type FC } from "react";
import { CANVAS_DIMENSIONS } from "../config";
import type { FinishHimEvent } from "./object/event";

// List of all final laser images
const FINAL_LASER_IMAGES = [
  "2b8dde4b-db06-4681-b28f-619d0509a862.jfif",
  "2b337e74-9c81-4b01-bcae-6dcebb2a3cee.jfif",
  "5bf3625d-5158-434a-aa2b-e303103786d0.jfif",
  "6deba66e-9980-46b7-95e0-eb3d57b9b032.jfif",
  "6e1ff8ca-9aec-415a-b9c0-0c5c19ba92af.jfif",
  "7d6e661e-8792-4d23-a242-56cb06b8fc93.jfif",
  "08b4280f-6443-4096-81b0-20f81242ec4d.jfif",
  "9abdb872-e590-413b-897b-9e0e9c5f43ab.jfif",
  "39c10cf2-6f8f-4fc5-92b9-55fdcb43a38c.jfif",
  "54d55fbb-c033-4101-954e-1cd9bc42d8f1.jfif",
  "57c85c2a-00b7-4983-abf6-532d157e10e7.jfif",
  "96f2c581-6152-4e80-a733-acf4cda0993f.jfif",
  "705d2175-7d1e-4c18-be1d-5a232e17258c.jfif",
  "899d6169-a666-4c44-a673-38dfa8554c06.jfif",
  "906cef72-6dd2-4be6-9120-ae84cd8aae08.jfif",
  "2544c471-e637-4deb-a84a-d1b79a740bd6.jfif",
  "3968dc17-0298-44ab-9a49-6f298fb59137.jfif",
  "13501583-7931-4647-a097-30b4cd5c01dd.jfif",
  "a6f4c566-e418-408c-981e-8ca0d42b4226.jfif",
  "abb138cc-356f-4d60-a55a-fba1acbb871f.jfif",
  "ad067fc7-3eef-446a-82e5-229271a943bc.jfif",
  "b1a175b6-d325-4eea-a1f4-905c5bca2467.jfif",
  "b7864be5-9eaf-4e25-a8dc-f885af92047a.jfif",
  "be727a39-c2fb-4a0a-8c5b-ca6f9f7c1dc5.jfif",
  "c5ef569b-3647-41ea-b8a3-da62e8b519e0.jfif",
  "c7035850-ee15-47a1-844b-0385799585bb.jfif",
  "ccd7ef87-dd52-486c-a2dd-61fb2116c599.jfif",
  "ce56c327-54ad-47db-9b45-72077aee1e96.jfif",
  "d228ddaa-4aeb-4dd2-91d3-76341940a432.jfif",
  "db13cb53-a45b-46bc-930c-81cabfcf0993.jfif",
  "e31f5c61-51d6-43a5-acc5-6694d0998eb7.jfif",
  "e9616f4a-4cfa-46b8-bf8f-bc81b12c1da5.jfif",
  "ea4aad6a-15bf-4a71-b02f-cb3ada12b60f.jfif",
  "f221a15a-723f-49ec-92ba-a6b1dcb198db.jfif",
  "fec2e5a5-0ec7-42be-8d35-2e9f5d07cb91.jfif",
];

interface LaserParticle {
  id: number;
  image: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
}

const Game: FC = () => {
  const [state, setState] = useState<"game" | "finish" | "finished">("game");

  const startLaserBeam = useCallback(
    (
      finalBossLocation: { x: number; y: number },
      finalPlayerLocation: { x: number; y: number }
    ) => {
      let delay = 0;
      const getKeyframes = () => {
        return [
          {
            transform: `translate(${
              finalPlayerLocation.x - CANVAS_DIMENSIONS.width / 2
            }px, ${
              finalPlayerLocation.y - CANVAS_DIMENSIONS.height / 2
            }px) rotate(0deg) scale(1)`,
            opacity: 1,
          },
          {
            transform: `translate(${
              finalBossLocation.x - CANVAS_DIMENSIONS.width / 2
            }px, ${
              finalBossLocation.y - CANVAS_DIMENSIONS.height / 2
            }px) rotate(${Math.random() * 1800}deg) scale(${Math.max(
              Math.random() * 2,
              1
            )})`,
            opacity: 1,
            offset: 0.9,
          },
          {
            transform: `translate(${
              finalBossLocation.x - CANVAS_DIMENSIONS.width / 2
            }px, ${
              finalBossLocation.y - CANVAS_DIMENSIONS.height / 2
            }px) rotate(0deg) scale(10)`,
            opacity: 1,
            offset: 0.99,
          },
          {
            transform: `translate(${
              finalBossLocation.x - CANVAS_DIMENSIONS.width / 2
            }px, ${
              finalBossLocation.y - CANVAS_DIMENSIONS.height / 2
            }px) rotate(0deg) scale(10)`,
            opacity: 0,
            offset: 1,
          },
        ];
      };

      const images = [...FINAL_LASER_IMAGES];
      const animateNext = () => {
        if (images.length === 0) return;
        // Pick a random index
        const idx = Math.floor(Math.random() * images.length);
        const image = images[idx];
        images.splice(idx, 1);
        // Animate the image
        const element = document.querySelector(
          `#laser-${FINAL_LASER_IMAGES.indexOf(image)}`
        );
        if (element) {
          const timing = {
            duration: 2500,
            iterations: 1,
            fill: "forwards" as FillMode,
            easing: "ease-in-out",
            delay,
          };
          delay += 200;
          element.animate(getKeyframes(), timing);
        }
        animateNext();
      };
      animateNext();
    },
    []
  );

  useEffect(() => {
    const handleFinishHim = (e: Event) => {
      const event = e as FinishHimEvent;
      console.log("Finish Him event received");
      console.log(event.bossLocation, event.playerLocation);
      setState("finish");
      setTimeout(() => {
        startLaserBeam(event.bossLocation, event.playerLocation);
      }, 5000);
    };

    window.addEventListener("finish-him", handleFinishHim);
    return () => {
      window.removeEventListener("finish-him", handleFinishHim);
    };
  }, [startLaserBeam]);

  const callback = useCallback((canvas: HTMLCanvasElement) => {
    import("./game").then(({ initGame }) => {
      initGame(canvas);
    });
  }, []);
  return (
    <div className="relative grid place-items-center h-full">
      <div className="fixed inset-0 scale-200 blur-lg opacity-0 animate-flash bg-[url('/gradient.png')] z-50">
        Nhi ♡ Lucien
      </div>
      {/* {state === "finish" && (
        <>
          <img
            src="/final1.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-1 transform-[translateY(-50vh)]"
          />
          <img
            src="/final2.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-2 transform-[translateY(-50vh)]"
          />
          <img
            src="/final3.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-3 transform-[translateY(-50vh)]"
          />
          <img
            src="/final4.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-4 transform-[translateY(-50vh)]"
          />
          <img
            src="/final5.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-5 transform-[translateY(-50vh)]"
          />
          <img
            src="/final6.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-6 transform-[translateY(-50vh)]"
          />
          <img
            src="/final7.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-7 transform-[translateY(-50vh)]"
          />
          <img
            src="/final8.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-8 transform-[translateY(-50vh)]"
          />
          <img
            src="/final9.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-9 transform-[translateY(-50vh)]"
          />
          <img
            src="/final10.jfif"
            alt="Final Image"
            className="absolute h-72 animate-spin-10 transform-[translateY(-50vh)]"
          />
        </>
      )} */}
      {FINAL_LASER_IMAGES.map((particle, index) => (
        <img
          id={`laser-${index}`}
          key={particle}
          src={`/final-laser/${particle}`}
          alt="Laser Particle"
          className="absolute pointer-events-none opacity-0"
          style={{
            width: "100px",
            height: "100px",
            zIndex: 100,
          }}
        />
      ))}
      <canvas
        ref={callback}
        id="game-canvas"
        width={CANVAS_DIMENSIONS.width}
        height={CANVAS_DIMENSIONS.height}
        style={{ background: "/bg.png" }}
      >
        Game canvas is not supported in your browser.
      </canvas>
    </div>
  );
};

export default Game;
