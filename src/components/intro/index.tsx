import { useEffect, useState } from "react";

export default function Intro({ onDone }: { onDone: () => void }) {
    const [state, setState] = useState<"begin" | "msg0" | "msg1" | "msg2" | "done">("begin");

    useEffect(() => {
        if (state === "done") {
            setTimeout(() => {
                onDone();
            }, 2000);
        }
    }, [state]);

    const transitionToNextState = () => {
        switch (state) {
            case "begin":
                setState("msg0");
                break;
            case "msg0":
                setState("msg1");
                break;
            case "msg1":
                setState("msg2");
                break;
            case "msg2":
                setState("done");
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen inset-0 fixed bg-white z-[1000] cursor-pointer" onClick={transitionToNextState}>
            {
                state === "begin" && (
                    <button
                        className="font-unicase px-6 py-2 bg-purple-600 text-black rounded hover:text-violet-700 duration-300 transition cursor-pointer bg-transparent text-4xl animate-pulse underline"
                    >
                        Click anywhere...
                    </button>
                )
            }
            {
                state === "msg0" && (
                    <div className="text-center animate-to-visible">
                        <h1 className="text-4xl mb-4 font-delius">Today, we're celebrating the 23rd birthday of a lovely girl.</h1>
                    <button
                        className="font-unicase px-6 py-2 bg-purple-600 text-black rounded hover:text-violet-700 duration-300 transition cursor-pointer bg-transparent text-2xl animate-pulse underline"
                    >
                        Click anywhere...
                    </button>
                    </div>
                )
            }
            {
                state === "msg1" && (
                    <div className="text-center animate-to-visible">
                        <h1 className="text-4xl mb-4 font-delius">She has been a precious part of my life and this website is my tribute to her.</h1>
                        <button
                            className="font-unicase px-6 py-2 bg-purple-600 text-black rounded hover:text-violet-700 duration-300 transition cursor-pointer bg-transparent text-2xl animate-pulse underline"
                        >
                            Click anywhere...
                        </button>
                    </div>
                )
            }
            {
                state === "msg2" && (
                    <div className="text-center animate-to-visible">
                        <h2 className="text-9xl mb-4">🫶</h2>
                        <h1 className="text-4xl mb-4 font-delius">Let's go!</h1>
                        <button
                            className="font-unicase px-6 py-2 bg-purple-600 text-black rounded hover:text-violet-700 duration-300 transition cursor-pointer bg-transparent text-2xl animate-pulse underline"
                        >
                            Enter...
                        </button>
                    </div>
                )
            }
            {
                state === "done" && (
                    <div className="h-full w-full bg-white animate-to-visible flex flex-col justify-center items-center">
                        <h1 className="text-6xl mb-4 font-delius">Happy Birthday Nhi !!!</h1>
                        <h2 className="text-2xl font-unicase">from Lucien</h2>
                    </div>
                )
            }
        </div>
    )
}