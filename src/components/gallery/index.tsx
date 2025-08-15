import type { MemoryBubbleProps } from "./MemoryBubble";
import MemoryBubble from "./MemoryBubble";

const images: MemoryBubbleProps[] = [
  {
    x: 50,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image0.jfif",
  },
  {
    x: 50,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image1.jfif",
  },
  {
    x: 400,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image2.jfif",
  },
  {
    x: 800,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image3.jfif",
  },
  {
    x: 1300,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image4.jfif",
  },
  {
    x: 1500,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image5.jfif",
  },
  {
    x: 1900,
    y: 400,
    size: "lg",
    imageSrc: "/public/gallery/image6.jfif",
  },
  {
    x: 2300,
    y: 200,
    size: "md",
    imageSrc: "/public/gallery/image7.jfif",
  },
  {
    x: 2500,
    y: 500,
    size: "sm",
    imageSrc: "/public/gallery/image8.jfif",
  },
  {
    x: 2800,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image9.jfif",
  },
  {
    x: 3300,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image3.jfif",
  },
  {
    x: 3400,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image10.jfif",
  },
  {
    x: 3700,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image11.jfif",
  },
  {
    x: 4200,
    y: 100,
    size: "sm",
    imageSrc: "/public/gallery/image12.jfif",
  },
  {
    x: 4300,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image13.jfif",
  },
  {
    x: 4600,
    y: 400,
    size: "lg",
    imageSrc: "/public/gallery/image14.jfif",
  },
  {
    x: 5000,
    y: 200,
    size: "md",
    imageSrc: "/public/gallery/image15.jfif",
  },
  {
    x: 5200,
    y: 500,
    size: "sm",
    imageSrc: "/public/gallery/image16.jfif",
  },
  {
    x: 5500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image17.jfif",
  },
  {
    x: 6000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image18.jfif",
  },
  {
    x: 6200,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image19.jfif",
  },
  {
    x: 6500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image20.jfif",
  },
  {
    x: 7000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image21.jfif",
  },
  {
    x: 7200,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image22.jfif",
  },
  {
    x: 7400,
    y: 500,
    size: "lg",
    imageSrc: "/public/gallery/image23.jfif",
  },
  {
    x: 8000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image24.jfif",
  },
  {
    x: 8200,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image25.jfif",
  },
  {
    x: 8500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image26.jfif",
  },
  {
    x: 9000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image27.jfif",
  },
  {
    x: 9200,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image28.jfif",
  },
  {
    x: 9500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image29.jfif",
  },
];

console.log(images.length);
export default function Gallery() {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-x-auto overflow-y-hidden">
      {images.map((image, index) => (
        <MemoryBubble
          key={index}
          x={image.x}
          y={image.y}
          size={image.size}
          imageSrc={image.imageSrc}
        />
      ))}
    </div>
  );
}
