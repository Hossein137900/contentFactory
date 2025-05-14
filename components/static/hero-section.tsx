"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";

const slides = [
  {
    id: 1,
    image: "/assets/images/cam1.jpg",
    title: "به کارخانه محتوا خوش آمدید",
    subtitle: "جایی که خلاقیت با نوآوری همراه می‌شود",
    color: "#8B5CF6", // Violet
  },
  {
    id: 2,
    image: "/assets/images/cam2.jpg",
    title: "محتوای شگفت‌انگیز بسازید",
    subtitle: "حضور دیجیتال خود را ارتقا دهید",
    color: "#EC4899", // Pink
  },
  {
    id: 3,
    image: "/assets/images/cam3.jpg",
    title: "کسب و کار خود را رشد دهید",
    subtitle: "با اطمینان توسعه پیدا کنید",
    color: "#3B82F6", // Blue
  },
  {
    id: 4,
    image: "/assets/images/cam1.jpg",
    title: "تأثیر خود را گسترش دهید",
    subtitle: "به مخاطبان جدید دست پیدا کنید",
    color: "#10B981", // Emerald
  },
  {
    id: 5,
    image: "/assets/images/cam2.jpg",
    title: "برند خود را متحول کنید",
    subtitle: "در دنیای دیجیتال متمایز باشید",
    color: "#F59E0B", // Amber
  },
];

// Pre-generate fixed stars and cosmic elements
const preGeneratedStars = Array.from({ length: 160 }, (_, i) => {
  // Use index-based "randomness" instead of Math.random()
  const layerIndex = i < 80 ? 0 : i < 130 ? 1 : 2;
  const layers = [
    { size: [0.5, 1.5], opacity: [0.3, 0.6], factor: 10, speed: [3, 6] },
    { size: [1, 2.5], opacity: [0.5, 0.8], factor: 20, speed: [4, 8] },
    { size: [1.5, 3], opacity: [0.6, 0.9], factor: 30, speed: [5, 10] },
  ];

  const layer = layers[layerIndex];
  const indexInLayer = i - (layerIndex === 0 ? 0 : layerIndex === 1 ? 80 : 130);

  // Use deterministic values based on index
  const x = (indexInLayer * 17) % 100;
  const y = (indexInLayer * 23) % 100;
  const sizeRange = layer.size[1] - layer.size[0];
  const size = layer.size[0] + ((indexInLayer % 10) / 10) * sizeRange;
  const opacityRange = layer.opacity[1] - layer.opacity[0];
  const opacity = layer.opacity[0] + ((indexInLayer % 10) / 10) * opacityRange;
  const speedRange = layer.speed[1] - layer.speed[0];
  const animationDuration =
    layer.speed[0] + ((indexInLayer % 10) / 10) * speedRange;

  return {
    x,
    y,
    size,
    opacity,
    animationDuration,
    animationDelay: indexInLayer % 5,
    parallaxFactor: layer.factor,
    layer: layerIndex,
  };
});

// Pre-generate cosmic elements
const preGeneratedCosmicElements = Array.from({ length: 5 }, (_, i) => {
  // Deterministic values based on index
  const hue = (i * 72) % 360; // Evenly spaced hues
  const size = 50 + i * 15;

  return {
    x: 20 + ((i * 15) % 80),
    y: 15 + ((i * 17) % 70),
    size,
    color: `hsla(${hue}, 70%, 60%, 0.15)`,
    animationDuration: 15 + i * 2,
    animationDelay: i * 2,
    parallaxFactor: 10 + i * 7,
    rotation: i * 72,
  };
});

// Pre-generate particles
const preGeneratedParticles = Array.from({ length: 20 }, (_, i) => {
  const particleSize = 1 + (i % 3) + 1;
  const baseX = 10 + ((i * 5) % 90);
  const baseY = 5 + ((i * 7) % 90);

  return {
    baseX,
    baseY,
    size: particleSize,
    duration: 10 + (i % 10),
    delay: i % 5,
  };
});

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [progress, setProgress] = useState(0);
  const [progressColor, setProgressColor] = useState(slides[0].color);

  console.log(dimensions, progress, progressColor);

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed mouse values for more natural movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Progress animation
  const progressAnimation = useAnimation();

  // Create all the transform values at the top level
  // For cosmic elements
  const cosmicX0 = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[0].x -
        preGeneratedCosmicElements[0].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[0].x +
        preGeneratedCosmicElements[0].parallaxFactor * 0.05
      }%`,
    ]
  );
  const cosmicY0 = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[0].y -
        preGeneratedCosmicElements[0].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[0].y +
        preGeneratedCosmicElements[0].parallaxFactor * 0.05
      }%`,
    ]
  );

  const cosmicX1 = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[1].x -
        preGeneratedCosmicElements[1].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[1].x +
        preGeneratedCosmicElements[1].parallaxFactor * 0.05
      }%`,
    ]
  );
  const cosmicY1 = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[1].y -
        preGeneratedCosmicElements[1].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[1].y +
        preGeneratedCosmicElements[1].parallaxFactor * 0.05
      }%`,
    ]
  );

  const cosmicX2 = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[2].x -
        preGeneratedCosmicElements[2].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[2].x +
        preGeneratedCosmicElements[2].parallaxFactor * 0.05
      }%`,
    ]
  );
  const cosmicY2 = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[2].y -
        preGeneratedCosmicElements[2].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[2].y +
        preGeneratedCosmicElements[2].parallaxFactor * 0.05
      }%`,
    ]
  );

  const cosmicX3 = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[3].x -
        preGeneratedCosmicElements[3].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[3].x +
        preGeneratedCosmicElements[3].parallaxFactor * 0.05
      }%`,
    ]
  );
  const cosmicY3 = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[3].y -
        preGeneratedCosmicElements[3].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[3].y +
        preGeneratedCosmicElements[3].parallaxFactor * 0.05
      }%`,
    ]
  );

  const cosmicX4 = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[4].x -
        preGeneratedCosmicElements[4].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[4].x +
        preGeneratedCosmicElements[4].parallaxFactor * 0.05
      }%`,
    ]
  );
  const cosmicY4 = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [
      `${
        preGeneratedCosmicElements[4].y -
        preGeneratedCosmicElements[4].parallaxFactor * 0.05
      }%`,
      `${
        preGeneratedCosmicElements[4].y +
        preGeneratedCosmicElements[4].parallaxFactor * 0.05
      }%`,
    ]
  );

  // For light beams
  const lightBeam1Left = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["20%", "30%"]
  );
  const lightBeam2Right = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["30%", "35%"]
  );

  // For orbs
  const orb1Left = useTransform(smoothMouseX, [-0.5, 0.5], ["10%", "15%"]);
  const orb1Top = useTransform(smoothMouseY, [-0.5, 0.5], ["20%", "25%"]);

  const orb2Right = useTransform(smoothMouseX, [-0.5, 0.5], ["15%", "20%"]);
  const orb2Bottom = useTransform(smoothMouseY, [-0.5, 0.5], ["25%", "30%"]);

  // For animated light beams
  const lightBeam3Left = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["70%", "75%"]
  );
  const lightBeam3Top = useTransform(smoothMouseY, [-0.5, 0.5], ["10%", "15%"]);

  const lightBeam4Left = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["25%", "30%"]
  );
  const lightBeam4Bottom = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    ["20%", "25%"]
  );

  // For particles - we'll use a simplified approach with fewer particles
  const particleTransforms = [
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[0].baseX - 10}%`,
          `${preGeneratedParticles[0].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[0].baseY - 5}%`,
          `${preGeneratedParticles[0].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[0].size,
      duration: preGeneratedParticles[0].duration,
      delay: preGeneratedParticles[0].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[1].baseX - 10}%`,
          `${preGeneratedParticles[1].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[1].baseY - 5}%`,
          `${preGeneratedParticles[1].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[1].size,
      duration: preGeneratedParticles[1].duration,
      delay: preGeneratedParticles[1].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[2].baseX - 10}%`,
          `${preGeneratedParticles[2].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[2].baseY - 5}%`,
          `${preGeneratedParticles[2].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[2].size,
      duration: preGeneratedParticles[2].duration,
      delay: preGeneratedParticles[2].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[3].baseX - 10}%`,
          `${preGeneratedParticles[3].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[3].baseY - 5}%`,
          `${preGeneratedParticles[3].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[3].size,
      duration: preGeneratedParticles[3].duration,
      delay: preGeneratedParticles[3].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[4].baseX - 10}%`,
          `${preGeneratedParticles[4].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[4].baseY - 5}%`,
          `${preGeneratedParticles[4].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[4].size,
      duration: preGeneratedParticles[4].duration,
      delay: preGeneratedParticles[4].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[5].baseX - 10}%`,
          `${preGeneratedParticles[5].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[5].baseY - 5}%`,
          `${preGeneratedParticles[5].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[5].size,
      duration: preGeneratedParticles[5].duration,
      delay: preGeneratedParticles[5].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[6].baseX - 10}%`,
          `${preGeneratedParticles[6].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[6].baseY - 5}%`,
          `${preGeneratedParticles[6].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[6].size,
      duration: preGeneratedParticles[6].duration,
      delay: preGeneratedParticles[6].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[7].baseX - 10}%`,
          `${preGeneratedParticles[7].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[7].baseY - 5}%`,
          `${preGeneratedParticles[7].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[7].size,
      duration: preGeneratedParticles[7].duration,
      delay: preGeneratedParticles[7].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[8].baseX - 10}%`,
          `${preGeneratedParticles[8].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[8].baseY - 5}%`,
          `${preGeneratedParticles[8].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[8].size,
      duration: preGeneratedParticles[8].duration,
      delay: preGeneratedParticles[8].delay,
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[9].baseX - 10}%`,
          `${preGeneratedParticles[9].baseX + 10}%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${preGeneratedParticles[9].baseY - 5}%`,
          `${preGeneratedParticles[9].baseY + 5}%`,
        ]
      ),
      size: preGeneratedParticles[9].size,
      duration: preGeneratedParticles[9].duration,
      delay: preGeneratedParticles[9].delay,
    },
  ];

  // For stars - we'll use a simplified approach with fewer stars
  const starTransforms = [
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[0].x - preGeneratedStars[0].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[0].x + preGeneratedStars[0].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[0].y - preGeneratedStars[0].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[0].y + preGeneratedStars[0].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[0],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[10].x -
            preGeneratedStars[10].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[10].x +
            preGeneratedStars[10].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[10].y -
            preGeneratedStars[10].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[10].y +
            preGeneratedStars[10].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[10],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[20].x -
            preGeneratedStars[20].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[20].x +
            preGeneratedStars[20].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[20].y -
            preGeneratedStars[20].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[20].y +
            preGeneratedStars[20].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[20],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[30].x -
            preGeneratedStars[30].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[30].x +
            preGeneratedStars[30].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[30].y -
            preGeneratedStars[30].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[30].y +
            preGeneratedStars[30].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[30],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[40].x -
            preGeneratedStars[40].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[40].x +
            preGeneratedStars[40].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[40].y -
            preGeneratedStars[40].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[40].y +
            preGeneratedStars[40].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[40],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[50].x -
            preGeneratedStars[50].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[50].x +
            preGeneratedStars[50].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[50].y -
            preGeneratedStars[50].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[50].y +
            preGeneratedStars[50].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[50],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[60].x -
            preGeneratedStars[60].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[60].x +
            preGeneratedStars[60].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[60].y -
            preGeneratedStars[60].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[60].y +
            preGeneratedStars[60].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[60],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[70].x -
            preGeneratedStars[70].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[70].x +
            preGeneratedStars[70].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[70].y -
            preGeneratedStars[70].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[70].y +
            preGeneratedStars[70].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[70],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[80].x -
            preGeneratedStars[80].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[80].x +
            preGeneratedStars[80].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[80].y -
            preGeneratedStars[80].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[80].y +
            preGeneratedStars[80].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[80],
    },
    {
      x: useTransform(
        smoothMouseX,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[90].x -
            preGeneratedStars[90].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[90].x +
            preGeneratedStars[90].parallaxFactor * 0.05
          }%`,
        ]
      ),
      y: useTransform(
        smoothMouseY,
        [-0.5, 0.5],
        [
          `${
            preGeneratedStars[90].y -
            preGeneratedStars[90].parallaxFactor * 0.05
          }%`,
          `${
            preGeneratedStars[90].y +
            preGeneratedStars[90].parallaxFactor * 0.05
          }%`,
        ]
      ),
      star: preGeneratedStars[90],
    },
  ];

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle progress bar animation
  useEffect(() => {
    if (isAutoPlaying) {
      setProgress(0);
      setProgressColor(slides[current].color);

      progressAnimation.start({
        scaleX: 1,
        transition: { duration: 6, ease: "linear" },
      });
    } else {
      progressAnimation.stop();
    }

    return () => {
      progressAnimation.stop();
    };
  }, [current, isAutoPlaying, progressAnimation]);

  // Auto-advance slides
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering]);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse position to be between -0.5 and 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    }
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset mouse position when leaving
    mouseX.set(0);
    mouseY.set(0);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
      filter: "blur(0px) brightness(0.8)",
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      rotateY: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }, // Custom spring-like ease
        filter: { duration: 0.8 },
        rotateY: { duration: 0.8 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
      filter: "blur(0px) brightness(0.8)",
      rotateY: direction < 0 ? 10 : -10,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        filter: { duration: 0.5 },
        rotateY: { duration: 0.5 },
      },
    }),
  };

  const titleVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(0px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.3,
        duration: 1,
        ease: [0.19, 1.0, 0.22, 1.0], // Ease out expo
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const subtitleVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(0px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.5,
        duration: 1,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(8px)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(12px)",
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
    },
  };

  const indicatorVariants = {
    inactive: {
      width: "8px",
      height: "8px",
      opacity: 0.5,
      background: "rgba(255, 255, 255, 0.5)",
    },
    active: {
      width: "30px",
      height: "8px",
      opacity: 1,
      background: slides[current].color,
      transition: { duration: 0.3 },
    },
    hover: {
      opacity: 0.8,
      scale: 1.1,
    },
  };

  const navigateSlide = (newIndex: number) => {
    setDirection(newIndex > current ? 1 : -1);
    setCurrent(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    isScrollingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    const deltaY = e.touches[0].clientY - touchStartRef.current.y;

    if (!isScrollingRef.current) {
      isScrollingRef.current = Math.abs(deltaY) > Math.abs(deltaX);
    }

    if (!isScrollingRef.current) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrollingRef.current) return;

    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && current > 0) {
        navigateSlide(current - 1);
      } else if (deltaX < 0 && current < slides.length - 1) {
        navigateSlide(current + 1);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#030014] relative overflow-hidden"
      dir="rtl"
    >
      {/* Deep space background with stars and cosmic elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base background with gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0F0728] via-[#070219] to-[#030014]"></div>

        {/* Cosmic elements - nebulae, gas clouds, etc. */}
        <motion.div
          key="cosmic-0"
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${preGeneratedCosmicElements[0].size}px`,
            height: `${preGeneratedCosmicElements[0].size}px`,
            background: preGeneratedCosmicElements[0].color,
            left: cosmicX0,
            top: cosmicY0,
            transform: `rotate(${preGeneratedCosmicElements[0].rotation}deg)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
            rotate: [
              preGeneratedCosmicElements[0].rotation,
              preGeneratedCosmicElements[0].rotation + 10,
              preGeneratedCosmicElements[0].rotation,
            ],
          }}
          transition={{
            duration: preGeneratedCosmicElements[0].animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          key="cosmic-1"
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${preGeneratedCosmicElements[1].size}px`,
            height: `${preGeneratedCosmicElements[1].size}px`,
            background: preGeneratedCosmicElements[1].color,
            left: cosmicX1,
            top: cosmicY1,
            transform: `rotate(${preGeneratedCosmicElements[1].rotation}deg)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
            rotate: [
              preGeneratedCosmicElements[1].rotation,
              preGeneratedCosmicElements[1].rotation + 10,
              preGeneratedCosmicElements[1].rotation,
            ],
          }}
          transition={{
            duration: preGeneratedCosmicElements[1].animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          key="cosmic-2"
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${preGeneratedCosmicElements[2].size}px`,
            height: `${preGeneratedCosmicElements[2].size}px`,
            background: preGeneratedCosmicElements[2].color,
            left: cosmicX2,
            top: cosmicY2,
            transform: `rotate(${preGeneratedCosmicElements[2].rotation}deg)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
            rotate: [
              preGeneratedCosmicElements[2].rotation,
              preGeneratedCosmicElements[2].rotation + 10,
              preGeneratedCosmicElements[2].rotation,
            ],
          }}
          transition={{
            duration: preGeneratedCosmicElements[2].animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          key="cosmic-3"
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${preGeneratedCosmicElements[3].size}px`,
            height: `${preGeneratedCosmicElements[3].size}px`,
            background: preGeneratedCosmicElements[3].color,
            left: cosmicX3,
            top: cosmicY3,
            transform: `rotate(${preGeneratedCosmicElements[3].rotation}deg)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
            rotate: [
              preGeneratedCosmicElements[3].rotation,
              preGeneratedCosmicElements[3].rotation + 10,
              preGeneratedCosmicElements[3].rotation,
            ],
          }}
          transition={{
            duration: preGeneratedCosmicElements[3].animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          key="cosmic-4"
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${preGeneratedCosmicElements[4].size}px`,
            height: `${preGeneratedCosmicElements[4].size}px`,
            background: preGeneratedCosmicElements[4].color,
            left: cosmicX4,
            top: cosmicY4,
            transform: `rotate(${preGeneratedCosmicElements[4].rotation}deg)`,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
            rotate: [
              preGeneratedCosmicElements[4].rotation,
              preGeneratedCosmicElements[4].rotation + 10,
              preGeneratedCosmicElements[4].rotation,
            ],
          }}
          transition={{
            duration: preGeneratedCosmicElements[4].animationDuration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Stars with parallax effect - using a limited set */}
        {starTransforms.map((transform, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${transform.star.size}px`,
              height: `${transform.star.size}px`,
              backgroundColor: "white",
              boxShadow: `0 0 ${
                transform.star.size * 1.5
              }px rgba(255, 255, 255, ${transform.star.opacity})`,
              left: transform.x,
              top: transform.y,
              opacity: transform.star.opacity,
            }}
            animate={{
              opacity: [
                transform.star.opacity,
                transform.star.opacity * 1.5,
                transform.star.opacity,
              ],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: transform.star.animationDuration,
              delay: transform.star.animationDelay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Subtle light beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
          style={{
            left: lightBeam1Left,
          }}
          animate={{
            height: ["30vh", "40vh", "30vh"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute top-0 right-1/3 w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          style={{
            right: lightBeam2Right,
          }}
          animate={{
            height: ["20vh", "25vh", "20vh"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Main slider container with glass effect */}
      <div
        ref={containerRef}
        className="max-w-6xl w-full h-[650px] rounded-[30px] overflow-hidden relative z-10 perspective-1200"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Glass border effect */}
        <div className="absolute inset-0 rounded-[30px] z-20 pointer-events-none">
          <div className="absolute inset-0 rounded-[30px] border border-white/10 "></div>
          <div className="absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50"></div>
        </div>

        {/* Reactive color overlay based on current slide */}
        <motion.div
          className="absolute inset-0 z-10 mix-blend-soft-light"
          animate={{
            backgroundColor: slides[current].color,
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Main slider with 3D perspective effect */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 transform-style-3d"
          >
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              className="object-cover"
              priority
              draggable="false"
            />

            {/* Content overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center px-8">
              {/* Animated accent line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80px", opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ backgroundColor: slides[current].color }}
                className="h-1 rounded-full mb-8"
              />

              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${current}`}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white text-5xl md:text-6xl font-bold text-center mb-6 tracking-tight"
                >
                  <span className="relative">
                    {slides[current].title}
                    <motion.span
                      className="absolute -bottom-2 left-0 h-[6px] rounded-full"
                      style={{ backgroundColor: slides[current].color }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`subtitle-${current}`}
                  variants={subtitleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-gray-200 text-xl md:text-2xl text-center max-w-2xl mt-2 font-light"
                >
                  {slides[current].subtitle}
                </motion.p>
              </AnimatePresence>

              {/* Call to action button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-10 px-8 py-3 rounded-full text-white font-medium"
                style={{
                  background: `linear-gradient(90deg, ${slides[current].color}, ${slides[current].color}CC)`,
                  boxShadow: `0 10px 25px -5px ${slides[current].color}80`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 15px 30px -5px ${slides[current].color}80`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                اکتشاف کنید
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating particles inside the slider with mouse interaction */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particleTransforms.map((transform, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: transform.size + "px",
                height: transform.size + "px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
                left: transform.x,
                top: transform.y,
              }}
              animate={{
                y: [0, -30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: transform.duration,
                repeat: Infinity,
                delay: transform.delay,
              }}
            />
          ))}
        </div>

        {/* Navigation controls with glass neomorphism */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-6 z-30">
          {/* Previous button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() =>
              navigateSlide(current > 0 ? current - 1 : slides.length - 1)
            }
            className={`flex items-center justify-center w-14 h-14 rounded-full border border-white/20 backdrop-blur-xl ${
              current === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={current === 0}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <IoIosArrowBack size={24} className="text-white" />
          </motion.button>

          {/* Slide indicators */}
          <div className="flex gap-3 mx-4">
            {slides.map((slide, index) => (
              <motion.button
                key={slide.id}
                variants={indicatorVariants}
                initial="inactive"
                animate={current === index ? "active" : "inactive"}
                whileHover="hover"
                className="h-2 rounded-full"
                onClick={() => navigateSlide(index)}
              />
            ))}
          </div>

          {/* Next button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() =>
              navigateSlide(current < slides.length - 1 ? current + 1 : 0)
            }
            className={`flex items-center justify-center w-14 h-14 rounded-full border border-white/20 backdrop-blur-xl ${
              current === slides.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            disabled={current === slides.length - 1}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            <IoIosArrowForward size={24} className="text-white" />
          </motion.button>

          {/* Autoplay toggle button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={toggleAutoplay}
            className="absolute -right-20 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 backdrop-blur-xl"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {isAutoPlaying ? (
              <RiPauseFill size={20} className="text-white" />
            ) : (
              <RiPlayFill size={20} className="text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Slide number indicator */}
      <div className="absolute bottom-12 right-12 text-white/70 font-mono text-sm z-20">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {(current + 1).toString().padStart(2, "0")}
        </motion.span>
        <span className="mx-1">/</span>
        <span>{slides.length.toString().padStart(2, "0")}</span>
      </div>

      {/* Floating orbs with glass effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 70%)",
          boxShadow:
            "inset 0 0 20px rgba(255, 255, 255, 0.2), 0 0 30px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          left: orb1Left,
          top: orb1Top,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute w-24 h-24 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 70%)",
          boxShadow:
            "inset 0 0 15px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          right: orb2Right,
          bottom: orb2Bottom,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      {/* Animated rings */}
      <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute inset-0 w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
      </div>

      {/* Animated rings on the other side */}
      <div className="absolute right-1/4 bottom-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-32 h-32 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
        />
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 2.5,
          }}
        />
      </div>

      {/* Animated light beams */}
      <motion.div
        className="absolute h-[200px] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
        style={{
          left: lightBeam3Left,
          top: lightBeam3Top,
          transform: "rotate(30deg)",
        }}
        animate={{
          opacity: [0, 0.7, 0],
          height: ["150px", "200px", "150px"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute h-[150px] w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent"
        style={{
          left: lightBeam4Left,
          bottom: lightBeam4Bottom,
          transform: "rotate(-20deg)",
        }}
        animate={{
          opacity: [0, 0.5, 0],
          height: ["100px", "150px", "100px"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </div>
  );
};

export default HeroSection;
