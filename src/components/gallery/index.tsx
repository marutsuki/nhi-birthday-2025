import { useEffect, useRef, useState } from "react";
import type { MemoryBubbleProps } from "./MemoryBubble";
import MemoryBubble from "./MemoryBubble";

const images: MemoryBubbleProps[] = [
  {
    x: 400,
    y: 200,
    size: "lg",
    imageSrc: "/public/gallery/image0.jfif",
    text: "My very first photo of u 🥺. Also the night we started this journey together !!! I can't believe we've made it to ur bday now!",
    date: "24th March 2025",
  },
  {
    x: 50,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image1.jfif",
    text: "One of our very first dates at westfield :0. honestly i loved this photo so much, we look so cute tgt :3",
    date: "29th March 2025",
  },
  {
    x: 400,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image2.jfif",
    text: "i swear this photo was supposed to look really cute but it ended up superzooming on ur face wtf. still my baby tho heh",
    date: "20th April 2025",
  },
  {
    x: 800,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image3.jfif",
    text: "This photo was good but my belly OUGH 😫 MY BEER BELLY HELP",
    date: "20th April 2025",
  },
  {
    x: 1300,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image4.jfif",
    text: "You have so many incriminating photos of me, atp the only thing i can do is to accept it :< this was our first time trying okami at mornington !!! boi, we ate sm 😫",
    date: "26th April 2025",
  },
  {
    x: 1500,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image5.jfif",
    text: "hehe this was a selfie u took and its one of my favs actually :3 ur so adorable ",
    date: "27th April 2025",
  },
  {
    x: 1900,
    y: 400,
    size: "lg",
    imageSrc: "/public/gallery/image6.jfif",
    text: "Part of our Mornington trip! damn wtf did u do the statue of liberty D:",
    date: "27th April 2025",
  },
  {
    x: 2300,
    y: 200,
    size: "md",
    imageSrc: "/public/gallery/image7.jfif",
    text: "one of my fav couple shots of us :3, for once we both look good in a photo LMAO",
    date: "27th April 2025",
  },
  {
    x: 2500,
    y: 500,
    size: "sm",
    imageSrc: "/public/gallery/image8.jfif",
    text: "U LOOK LIKE A LIL BABY HERE OMF 🥺🥺🥺 my baby hehe :>",
    date: "4th May 2025",
  },
  {
    x: 2800,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image9.jfif",
    text: "I can't believe I actually tried to wear this outfit holy, thanks for putting up with my shenanigans all the time :< ohhh and we should get back to guessing Jellycat prices HAHAHA",
    date: "8th May 2025",
  },
  {
    x: 3400,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image10.jfif",
    text: "oml u know so many good places in melb, honestly ur the local and im the foreigner 😒 lets go to footscray more !!!",
    date: "10th May 2025",
  },
  {
    x: 3700,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image11.jfif",
    text: "One of our most iconic accessories hehe. Honestly this bracelet is the cutest thing I've ever worn in my life and reminds me of how emotionally attached to each other we are :3",
    date: "10th May 2025",
  },
  {
    x: 4200,
    y: 100,
    size: "sm",
    imageSrc: "/public/gallery/image12.jfif",
    text: "OOOP out of order again...! This was quite the memory, drenched blanket, mixed and chips lost glasses...",
    date: "29th March 2025",
  },
  {
    x: 4300,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image13.jfif",
    text: "Ur first time at Bao Mi !!! I can't believe u dissed my pho like that 😡 really wanna try ur mums cooking one day....",
    date: "16th May 2025",
  },
  {
    x: 4600,
    y: 400,
    size: "lg",
    imageSrc: "/public/gallery/image14.jfif",
    text: "Our 2 month anniv !!! Honestly one of the most breathtaking night experiences in my life, despite the setbacks afterwards, I felt we really established our trust in each other in this moment <3",
    date: "24th May 2025",
  },
  {
    x: 5000,
    y: 200,
    size: "md",
    imageSrc: "/public/gallery/image15.jfif",
    text: "OMG U DONT KNOW HOW MUCH I LOVE THIS PHOTO THIS IS MY FAV PHOTO OF U 🥺🥺🥺 I LOVE THIS PHOTO TO AN OBSESSED DEGREE 💜❤️💜",
    date: "28th May 2025",
  },
  {
    x: 5200,
    y: 500,
    size: "sm",
    imageSrc: "/public/gallery/image16.jfif",
    text: "hehe im going to continue to stalk u... be on ur guard :3",
    date: "12nd June 2025",
  },
  {
    x: 5500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image17.jfif",
    text: "awwwww ...! this is also another fav of mine, u look so pretty in this photo !",
    date: "22nd June 2025",
  },
  {
    x: 6000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image18.jfif",
    text: "Feat Grandma !!! Honestly my Grandma loves u so much, not as much as me tho ofc",
    date: "22nd June 2025",
  },
  {
    x: 6200,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image19.jfif",
    text: "Ichi Katsu date ! u look really pretty here heh :3 also i hope u put up with my fast eating habits :c",
    date: "24th June 2025",
  },
  {
    x: 6500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image20.jfif",
    text: "The Light Show night :DD Honestly I had so much fun, and it would be not even half the amount of fun if it wasn't for u being there with me c:",
    date: "28th June 2025",
  },
  {
    x: 7000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image21.jfif",
    text: "The amount of attempts we tried to get this one taken LOL still tho this one turned out good hehe!",
    date: "28th June 2025",
  },
  {
    x: 7200,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image22.jfif",
    text: "Little Africa !!! We really should go back here, the food was soooo tasty 🤤 Also, this was all one night?!? wtf",
    date: "28th June 2025",
  },
  {
    x: 7400,
    y: 500,
    size: "lg",
    imageSrc: "/public/gallery/image23.jfif",
    text: "OUT OF ORDER AGAIN...! One of our earlier dates at the Soba place (i forgor the name) ! Honestly this place was so yummy HOW DO U KNOW SO MANY GOOD PLACES AHHHH",
    date: "31st March 2025",
  },
  {
    x: 8000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image24.jfif",
    text: "ur departure for ur bali trip :< honestly was so excited to see u again on the day of ur return 🥺",
    date: "4th July 2025",
  },
  {
    x: 8200,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image25.jfif",
    text: "😏",
    date: "11st July 2025",
  },
  {
    x: 8500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image26.jfif",
    text: "thanks for being so patient with me, and always being there to goof around with me :3 i honestly feel so appreciated and loved by u. just lmk if it gets too much ofc !",
    date: "12nd July 2025",
  },
  {
    x: 9000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image27.jfif",
    text: "👎 bad joke 👎",
    date: "13rd July 2025",
  },
  {
    x: 9200,
    y: 600,
    size: "sm",
    imageSrc: "/public/gallery/image28.jfif",
    text: "hehehe our second time at Sebastian ! honestly the earl grey was kinda... idk BAHAHAHA",
    date: "15th July 2025",
  },
  {
    x: 9500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image29.jfif",
    text: "see !!! i told u there was a written contract for us :3",
    date: "17th July 2025",
  },
  {
    x: 10000,
    y: 100,
    size: "md",
    imageSrc: "/public/gallery/image30.jfif",
    text: "Our 4 month anniv !!! i hope u enjoyed one of my fav japanese places in Melb :3",
    date: "24th July 2025",
  },
  {
    x: 10200,
    y: 700,
    size: "sm",
    imageSrc: "/public/gallery/image40.jfif",
    text: "my 2 lil boibies 🥺🥺🥺 this photo of u2 is sooooo precious...",
    date: "30th July August 2025",
  },
  {
    x: 10500,
    y: 300,
    size: "lg",
    imageSrc: "/public/gallery/image41.jfif",
    text: "My bday !!!! :DD Here's the cute photo of u and that massive piece of bread i got u :3",
    date: "2nd August 2025",
  },
  {
    x: 10800,
    y: 100,
    size: "sm",
    imageSrc: "/public/gallery/image44.jfif",
    text: "Our brunch date at Fitzroy !!! this photo of u was sooooo cuteeeee ❤️❤️❤️",
    date: "9th August 2025",
  },
  {
    x: 11100,
    y: 600,
    size: "md",
    imageSrc: "/public/gallery/image42.jfif",
    text: "The day we went to Fitzroy to go thrift shopping !!! Didn't end up finding much there tho HAHAHAH",
    date: "9th August 2025",
  },
  {
    x: 11100,
    y: 600,
    size: "md",
    imageSrc: "/public/gallery/image43.jfif",
    text: "After we got back, this was when we were cutting up everything... and i honestly sucked....... 😩 u were good at it tho !",
    date: "9th August 2025",
  },
  {
    x: 11400,
    y: 200,
    size: "md",
    imageSrc: "/public/gallery/image45.jfif",
    text: "DONT TRY TO HIDE 😠 still not giving up taking stalker photos of u hehe :3 ur gonna put up with me forever MWAHAHA",
    date: "14th August 2025",
  },
  {
    x: 11800,
    y: 500,
    size: "sm",
    imageSrc: "/public/gallery/image46.jfif",
    text: "I hope you had a great bday party !!! I know some friends didn't turn up but I still had a great time with you :3",
    date: "23rd August 2025",
  },
  {
    x: 12000,
    y: 150,
    size: "lg",
    imageSrc: "/public/gallery/image47.jfif",
    text: "Feat. Giant Cinnamoroll !!! Now you have something to cuddle at night when I'm not around hehe :>",
    date: "23rd August 2025",
  },
  {
    x: 12500,
    y: 400,
    size: "md",
    imageSrc: "/public/gallery/image48.jfif",
    text: "Hehehe ur bday cake was really cool :0 I hope u made a wish !!!",
    date: "23rd August 2025",
  },
  {
    x: 12700,
    y: 200,
    size: "sm",
    imageSrc: "/public/gallery/image49.jfif",
    text: "Honestly you looked soooooooo ADORABLE in a skirt. Please wear skirts more 😭😭😭",
    date: "23rd August 2025",
  },
  {
    x: 12800,
    y: 500,
    size: "lg",
    imageSrc: "/public/gallery/image50.jfif",
    text: "The Conservatory !!! We ate so much I was about to explode 😩",
    date: "23rd August 2025",
  },
  {
    x: 13200,
    y: 300,
    size: "md",
    imageSrc: "/public/gallery/image51.jfif",
    text: "HAPPY 5 MONTHS ANNIV BABE !!! ILYSM ❤️❤️❤️",
    date: "23rd August 2025",
  },
  {
    x: 14000,
    y: 150,
    size: "xl",
    imageSrc: "/public/gallery/image52.jfif",
    text: "Happy 23rd Birthday Nhi !!!",
    date: "I hope it's been as special as you are to me ❤️❤️❤️",
  },
  {
    x: 15200,
    y: 300,
    size: "empty",
    imageSrc: "",
    text: "",
  },
];

const call = new Audio("/call.m4a");
const tapdance = new Audio("/tapdance.mp3");

const particlesData = [
  { content: "❤️" },
  { content: "🎉" },
  { content: "🥺" },
  { content: "💜" },
  { content: "✨" },
];

function getRandomParticle() {
  const p = particlesData[Math.floor(Math.random() * particlesData.length)];
  return {
    ...p,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 3,
    id: Math.random().toString(36).slice(2),
  };
}

export default function Gallery() {
  const [particles, setParticles] = useState<
    Array<ReturnType<typeof getRandomParticle>>
  >([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeout(() => {
      call.play().catch((error) => {
        console.error("Error playing call sound:", error);
      });
    }, 10000);

    setTimeout(() => {
      tapdance.play().catch((error) => {
        console.error("Error playing tapdance sound:", error);
      });
    }, 40000);

    intervalRef.current = setInterval(() => {
      setParticles((prev) => [...prev, getRandomParticle()]);
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Remove particles after animation
  useEffect(() => {
    if (!particles.length) return;
    const timeout = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 4000);
    return () => clearTimeout(timeout);
  }, [particles]);

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-x-auto overflow-y-hidden">
      {/* Falling particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: "-50px",
              fontSize: "2rem",
              animation: `fall ${p.duration}s linear ${p.delay}s forwards`,
              whiteSpace: "nowrap",
              textShadow: "0 2px 8px #0002",
              userSelect: "none",
            }}
          >
            {p.content}
          </span>
        ))}
      </div>
      {/* Gallery */}
      {images.map((image, index) => (
        <MemoryBubble
          key={index}
          x={image.x}
          y={image.y}
          size={image.size}
          imageSrc={image.imageSrc}
          text={image.text}
          date={image.date}
        />
      ))}
    </div>
  );
}
