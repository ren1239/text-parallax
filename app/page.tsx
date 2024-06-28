"use client";
import Image, { StaticImageData } from "next/image";
import Picture1 from "../public/Web1.jpg";
import Picture2 from "../public/Web2.jpg";
import Picture3 from "../public/Web3.jpg";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { MotionValue, useScroll, useTransform, motion } from "framer-motion";

type PictureProps = {
  src: StaticImageData;
  left: string;
  progress: MotionValue;
  direction: string;
};

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className=" overflow-hidden bg-gray-300">
      <div className="h-[100vh] " />
      <div>
        <Slide
          src={Picture1}
          left={"-40%"}
          progress={scrollYProgress}
          direction={"left"}
        />
        <Slide
          src={Picture2}
          left={"-25%"}
          progress={scrollYProgress}
          direction={"right"}
        />
        <Slide
          src={Picture3}
          left={"-75%"}
          progress={scrollYProgress}
          direction={"left"}
        />
      </div>
      <div className="h-[100vh] bg-gray-300" />
    </main>
  );
}

const Slide = ({ src, left, progress, direction }: PictureProps) => {
  const dir = direction === "left" ? -1 : 1;
  const x = useTransform(progress, [0, 1], [-250 * dir, 250 * dir]);

  return (
    <motion.div
      style={{ left: left, x }}
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={src} />
      <Phrase src={src} />
      <Phrase src={src} />
    </motion.div>
  );
};

const Phrase = ({ src }: { src: StaticImageData }) => {
  return (
    <div className={"px-5 flex gap-5 items-center"}>
      <p className=" text-[7.5vw]"> Front End Developer</p>
      <span className="relative  h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image src={src} style={{ objectFit: "cover" }} alt="image" fill />
      </span>
    </div>
  );
};
