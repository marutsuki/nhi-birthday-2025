import clsx from "clsx";
import { useState } from "react";

export type MemoryBubbleProps = {
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  imageSrc: string;
  type?: number;
  text: string;
};

export default function MemoryBubble({
  x,
  y,
  size = "md",
  imageSrc,
  type = 0,
  text,
}: MemoryBubbleProps) {
  const [active, setActive] = useState(false);
  return (
    <div
      onClick={() => setActive(!active)}
      className={clsx("absolute rounded-full cursor-pointer", {
        "w-54 h-54": size === "sm",
        "w-72 h-72": size === "md",
        "w-96 h-96": size === "lg",
      })}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div
        className={clsx("absolute rounded-full", {
          "bg-[rgba(106,90,205,0.3)]": type === 0,
          "bg-[rgba(106,90,205,0.4)]": type === 1,
          "bg-[rgba(106,90,205,0.5)]": type === 2,
          "w-54 h-54": size === "sm",
          "w-72 h-72": size === "md",
          "w-96 h-96": size === "lg",
        })}
      />
      <div
        className={clsx(
          "absolute duration-200 flex items-center justify-center inset-0 z-50 bg-[rgba(0,0,0,0.5)] p-2 rounded-full",
          {
            "opacity-100": active,
            "opacity-0": !active,
          }
        )}
      >
        <p className={clsx("relative text-white text-center")}>{text}</p>
      </div>
      <div>
        <img
          src={imageSrc}
          alt="Memory"
          className="w-[90%] h-[90%] top-[5%] left-[5%] rounded-full object-cover absolute z-10"
        />
        <div
          className={clsx(
            "absolute w-[90%] h-[90%] top-[5%] left-[5%] rounded-full z-20",
            {
              "shadow-[inset_0_0_8px_8px_rgba(106,90,205,0.3))]": type === 0,
              "shadow-[inset_0_0_8px_8px_rgba(106,90,205,0.4))]": type === 1,
              "shadow-[inset_0_0_8px_8px_rgba(106,90,205,0.5))]": type === 2,
            }
          )}
        />
      </div>
    </div>
  );
}
