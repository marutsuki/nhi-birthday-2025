import { useState } from "react";
import Game from "./components/game";
import Gallery from "./components/gallery";

function App() {
  const [tab, setTab] = useState<"gallery" | "game">("gallery");
  return (
    <>
      <header className="fixed top-0 right-0 px-16 py-4 flex gap-2 font-unicase z-[1000]">
        <button className="cursor-pointer" onClick={() => setTab("gallery")}>
          Gallery
        </button>
        <button className="cursor-pointer" onClick={() => setTab("game")}>
          Game
        </button>
      </header>
      <div className="h-screen overflow-hidden ">
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
