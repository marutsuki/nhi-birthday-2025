import { useState } from "react";
import Game from "./components/game";

function App() {
  const [tab, setTab] = useState<"gallery" | "game">("gallery")
  return (
    <>
      <header className="fixed top-0 right-0 px-16 py-4">
        <button onClick={() => setTab("gallery")}>
          Gallery
        </button>
        <button onClick={() => setTab("game")}>
          Game
        </button>
      </header>
      {
        tab === "gallery" && <div>
          
        </div>
      }
      {
        tab === "game" && <div className="h-screen overflow-hidden">
        <Game />
      </div>
      }
    </>
  );
}

export default App;
