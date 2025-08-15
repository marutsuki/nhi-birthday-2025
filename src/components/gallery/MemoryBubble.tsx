import clsx from "clsx";

export type MemoryBubbleProps = {
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  imageSrc: string;
  type?: number;
};

export default function MemoryBubble({
  x,
  y,
  size = "md",
  imageSrc,
  type = 0,
}: MemoryBubbleProps) {
  return (
    <div
      className={clsx("absolute rounded-full")}
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
      <img
        src={imageSrc}
        alt="Memory"
        className="w-full h-full rounded-full object-cover absolute z-10"
      />
    </div>
  );
}
