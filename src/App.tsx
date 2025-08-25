import { useRef, useState } from "react";
import Game from "./components/game";
import Gallery from "./components/gallery";

const perfect = new Audio("/perfect.m4a");
const call = new Audio("/call.m4a");
const tapdance = new Audio("/tapdance.mp3");
const oogabooga = new Audio("/ooga_booga.ogg");
const turnoff = new Audio("/turn_off_the_recording.ogg");
const happybday = new Audio("/happy_bday.m4a");
const hangmun = new Audio("/hangmun.ogg");
const daddy = new Audio("/daddy.ogg");
const deaddy = new Audio("/deaddy.ogg");
const celibating = new Audio("/celibating.ogg");
const bgm = new Audio("/fallen_star.mp3");

function App() {
  const timeouts = useRef<NodeJS.Timeout[]>([]);
  const [tab, setTab] = useState<"gallery" | "game">("gallery");

  const playGalleryBgm = () => {
    perfect.currentTime = 0;
    perfect.play();
    timeouts.current = [
      setTimeout(() => {
        call.play().catch((error) => {
          console.error("Error playing call sound:", error);
        });
      }, 10000),

      setTimeout(() => {
        tapdance.play().catch((error) => {
          console.error("Error playing tapdance sound:", error);
        });
      }, 40000),

      setTimeout(() => {
        daddy.play().catch((error) => {
          console.error("Error playing daddy sound:", error);
        });
      }, 60000),

      setTimeout(() => {
        oogabooga.play().catch((error) => {
          console.error("Error playing oogabooga sound:", error);
        });
      }, 80000),

      setTimeout(() => {
        turnoff.play().catch((error) => {
          console.error("Error playing turnoff sound:", error);
        });
      }, 100000),

      setTimeout(() => {
        deaddy.play().catch((error) => {
          console.error("Error playing deaddy sound:", error);
        });
      }, 140000),

      setTimeout(() => {
        hangmun.play().catch((error) => {
          console.error("Error playing hangmun sound:", error);
        });
      }, 180000),

      setTimeout(() => {
        celibating.play().catch((error) => {
          console.error("Error playing celibating sound:", error);
        });
      }, 200000),

      setTimeout(() => {
        happybday.play().catch((error) => {
          console.error("Error playing happybday sound:", error);
        });
      }, 270000),
    ];
  };

  const clearTimeouts = () => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current = [];
  };

  return (
    <>
      <header className="fixed top-0 right-0 px-16 py-4 flex gap-2 font-unicase z-[1000]">
        <button
          className="cursor-pointer hover:text-white"
          onClick={() => {
            setTab("gallery");
            playGalleryBgm();
            clearTimeouts();
            bgm.pause();
          }}
        >
          Gallery
        </button>
        <button
          className="cursor-pointer hover:text-white"
          onClick={() => {
            setTab("game");
            perfect.pause();
            clearTimeouts();

            bgm.loop = true;
            bgm.currentTime = 0;
            bgm.volume = 0.3;
            bgm.play();
          }}
        >
          Game
        </button>
      </header>
      <div className="h-screen overflow-y-hidden">
        <div className="fixed inset-0 bg-[linear-gradient(319deg,#6a5acd_0%,#c54b8c_37%,#b284be_100%)] opacity-40" />
        <div className="fixed rounded-full h-96 w-96 top-[20vh] left-[20vw] bg-[rgba(106,90,205,0.1)] opacity-40 shadow-[rgba(106,90,205,0.1)] shadow-lg animate-better-pulse-1" />
        <div className="fixed rounded-full h-64 w-64 top-[40vh] left-[25vw] bg-[rgba(106,90,205,0.2)] opacity-40 shadow-[rgba(106,90,205,0.2)] shadow-lg animate-better-pulse" />
        <div className="fixed rounded-full h-56 w-56 top-[80vh] left-[80vw] bg-[rgba(106,90,205,0.2)] opacity-40 shadow-[rgba(106,90,205,0.2)] shadow-lg animate-better-pulse-2" />
        <div className="fixed rounded-full h-84 w-84 top-[30vh] left-[90vw] bg-[rgba(106,90,205,0.2)] opacity-40 shadow-[rgba(106,90,205,0.2)] shadow-lg animate-better-pulse-3" />

        {tab === "gallery" && <Gallery />}
        {tab === "game" && <Game />}
      </div>
    </>
  );
}

export default App;
