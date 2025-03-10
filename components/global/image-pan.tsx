"use client";
import { useState } from "react";
import Image from "next/image";

import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

interface CardProps {
  frontCard: boolean;
  drag?: "x" | false;
  index?: number;
  setIndex?: (index: number) => void;
  imageUrl: string;
}

interface DragEndInfo {
  offset: {
    x: number;
    y: number;
  };
}

function Card(props: CardProps) {
  const [exitX, setExitX] = useState<number>(0);

  const x = useMotionValue(0);

  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  });

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom: number) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 },
    }),
  };
  const variantsBackCard = {
    initial: { scale: 0, y: 105, opacity: 0 },
    animate: { scale: 0.95, y: 30, opacity: 0.5 },
  };

  function handleDragEnd(_: MouseEvent | TouchEvent, info: DragEndInfo) {
    if (info.offset.x < -100) {
      setExitX(-250);
      props.setIndex?.(props.index! + 1);
    }
    if (info.offset.x > 100) {
      setExitX(250);
      props.setIndex?.(props.index! + 1);
    }
  }

  return (
    <motion.div
      className="w-[300px] h-[200px] md:w-[600px] md:h-[400px] lg:w-[800px] lg:h-[500px]
    absolute top-0 cursor-grab"
      style={{
        x,
        rotate,
      }}
      whileTap={{ cursor: "grabbing" }}
      // Dragging
      drag={props.drag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      // Animation
      variants={props.frontCard ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={exitX}
      transition={
        props.frontCard
          ? { type: "spring", stiffness: 150, damping: 30 }
          : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
      }
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 30,
          overflow: "hidden",
          scale,
        }}
      >
        <Image
          src={props.imageUrl}
          alt="Card image"
          fill
          className="object-cover rounded-2xl pointer-events-none"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

const ImagePan = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/assets/images/cam3.jpg",
    "/assets/images/cam2.jpg",
    "/assets/images/cam1.jpg",
  ];
  return (
    <motion.div
      className="flex justify-center min-h-screen mt-12 items-center mx-auto"
      style={{ width: 150, height: 150, position: "relative" }}
    >
      <AnimatePresence initial={false}>
        <Card
          key={index + 1}
          frontCard={false}
          imageUrl={images[(index + 1) % images.length]}
        />{" "}
        <Card
          key={index}
          frontCard={true}
          index={index}
          setIndex={setIndex}
          drag="x"
          imageUrl={images[index % images.length]}
        />
      </AnimatePresence>
    </motion.div>
  );
};
export default ImagePan;
