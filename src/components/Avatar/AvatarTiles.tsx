"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useState } from "react";
import styles from "./AvatarTiles.module.scss";

const GRID = 5;

type TileData = {
  startX: number;
  startY: number;
  rotate: number;
  hoverX: number;
  hoverY: number;
};

function createTiles(): TileData[] {
  return Array.from({ length: GRID * GRID }, () => {
    const side = Math.floor(Math.random() * 4);

    let startX = 0;
    let startY = 0;

    switch (side) {
      case 0:
        startX = -800;
        startY = Math.random() * 800 - 400;
        break;

      case 1:
        startX = 800;
        startY = Math.random() * 800 - 400;
        break;

      case 2:
        startX = Math.random() * 800 - 400;
        startY = -800;
        break;

      default:
        startX = Math.random() * 800 - 400;
        startY = 800;
    }

    return {
      startX,
      startY,
      rotate: Math.random() * 80 - 40,
      hoverX: Math.random() * 20 - 10,
      hoverY: Math.random() * 20 - 10,
    };
  });
}

export default function AvatarTiles() {
  const [hovered, setHovered] = useState(false);

  const tiles = useMemo(() => createTiles(), []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const avatarX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
  });

  const avatarY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 12);
    mouseY.set(y * 12);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className={styles.glow}
        style={{
          x: avatarX,
          y: avatarY,
        }}
      />

      <motion.div
        className={styles.grid}
        style={{
          x: avatarX,
          y: avatarY,
        }}
      >
        {tiles.map((tile, i) => {
          const row = Math.floor(i / GRID);
          const col = i % GRID;

          // Координаты нужного фрагмента изображения
          const x = (col / (GRID - 1)) * 100;
          const y = (row / (GRID - 1)) * 100;

          return (
            <motion.div
              key={i}
              className={styles.tile}
              initial={{
                x: tile.startX,
                y: tile.startY,
                opacity: 0,
                scale: 0.3,
                rotate: tile.rotate,
                filter: "blur(8px)",
              }}
              animate={{
                x: hovered ? tile.hoverX : 0,
                y: hovered ? tile.hoverY : 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: "blur(0px)",
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                delay: i * 0.025,
              }}
              style={{
                backgroundPosition: `${x}% ${y}%`,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { useMemo, useState } from "react";
// import styles from "./AvatarTiles.module.scss";

// const GRID = 5;
// const IMAGE_W = 450;
// const IMAGE_H = 633;

// type TileData = {
//   startX: number;
//   startY: number;
//   rotate: number;
//   hoverX: number;
//   hoverY: number;
// };

// function createTiles(): TileData[] {
//   return Array.from({ length: GRID * GRID }, () => {
//     const side = Math.floor(Math.random() * 4);

//     let startX = 0;
//     let startY = 0;

//     switch (side) {
//       case 0:
//         startX = -800;
//         startY = Math.random() * 800 - 400;
//         break;

//       case 1:
//         startX = 800;
//         startY = Math.random() * 800 - 400;
//         break;

//       case 2:
//         startX = Math.random() * 800 - 400;
//         startY = -800;
//         break;

//       default:
//         startX = Math.random() * 800 - 400;
//         startY = 800;
//     }

//     return {
//       startX,
//       startY,
//       rotate: Math.random() * 80 - 40,

//       hoverX: Math.random() * 20 - 10,
//       hoverY: Math.random() * 20 - 10,
//     };
//   });
// }

// export default function AvatarTiles() {
//   const [hovered, setHovered] = useState(false);

//   const tileData = useMemo(() => createTiles(), []);

//   const tileW = IMAGE_W / GRID;
//   const tileH = IMAGE_H / GRID;

//   return (
//     <div
//       className={styles.wrapper}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className={styles.glow} />

//       <div className={styles.grid}>
//         {tileData.map((tile, i) => {
//           const row = Math.floor(i / GRID);
//           const col = i % GRID;

//           return (
//             <motion.div
//               key={i}
//               className={styles.tile}
//               initial={{
//                 x: tile.startX,
//                 y: tile.startY,
//                 opacity: 0,
//                 scale: 0.3,
//                 rotate: tile.rotate,
//                 filter: "blur(8px)",
//               }}
//               animate={{
//                 x: hovered ? tile.hoverX : 0,
//                 y: hovered ? tile.hoverY : 0,
//                 opacity: 1,
//                 scale: 1,
//                 rotate: 0,
//                 filter: "blur(0px)",
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 70,
//                 damping: 18,
//                 delay: i * 0.025,
//               }}
//               style={{
//                 backgroundPosition: `${-col * tileW}px ${
//                   -row * tileH
//                 }px`,
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { motion, useMotionValue, useSpring } from "framer-motion";
// import { useEffect, useMemo, useRef, useState } from "react";
// import styles from "./AvatarTiles.module.scss";

// const GRID = 5;

// export default function AvatarTiles() {
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const [size, setSize] = useState({ w: 0, h: 0 });

//   // 📦 ResizeObserver (stable)
//   useEffect(() => {
//     if (!wrapperRef.current) return;

//     const el = wrapperRef.current;

//     const update = () => {
//       const rect = el.getBoundingClientRect();

//       // 🔥 FIX: округляем чтобы убрать hairlines
//       setSize({
//         w: Math.round(rect.width),
//         h: Math.round(rect.height),
//       });
//     };

//     update();

//     const ro = new ResizeObserver(update);
//     ro.observe(el);

//     return () => ro.disconnect();
//   }, []);

//   const tiles = useMemo(() => Array.from({ length: GRID * GRID }), []);

//   // 🧠 Mouse parallax (ONLY container, NOT tiles)
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
//   const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

//   const onMove = (e: React.MouseEvent) => {
//     const rect = wrapperRef.current?.getBoundingClientRect();
//     if (!rect) return;

//     const x = (e.clientX - rect.left) / rect.width - 0.5;
//     const y = (e.clientY - rect.top) / rect.height - 0.5;

//     mouseX.set(x * 10); // 🔥 мягкий offset (НЕ full translate)
//     mouseY.set(y * 10);
//   };

//   const tileW = size.w / GRID;
//   const tileH = size.h / GRID;

//   return (
//     <div
//       ref={wrapperRef}
//       className={styles.wrapper}
//       onMouseMove={onMove}
//     >
//       <div className={styles.glow} />

//       <div className={styles.grid}>
//         {tiles.map((_, i) => {
//           const row = Math.floor(i / GRID);
//           const col = i % GRID;

//           return (
//             <motion.div
//               key={i}
//               className={styles.tile}
//               style={{
//                 backgroundSize: `${size.w}px ${size.h}px`,

//                 // 🔥 FIX: hard clamp (no fractional drift)
//                 backgroundPosition: `
//                   ${-Math.round(col * tileW)}px
//                   ${-Math.round(row * tileH)}px
//                 `,

//                 // 🧠 Apple-style subtle parallax (NOT per tile chaos)
//                 x: springX,
//                 y: springY,
//               }}
//               initial={{
//                 opacity: 0,
//                 scale: 0.7,
//                 rotateX: 10,
//                 rotateY: -10,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 rotateX: 0,
//                 rotateY: 0,
//               }}
//               transition={{
//                 delay: i * 0.015,
//                 duration: 0.6,
//                 ease: [0.25, 0.8, 0.25, 1],
//               }}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { motion } from "framer-motion";
// import { useMemo } from "react";
// import styles from "./AvatarTiles.module.scss";

// const GRID = 5;
// const SIZE = 300;
// const TILE_SIZE = SIZE / GRID;

// const tiles = Array.from({ length: GRID * GRID });

// type TileRandom = {
//   x: number;
//   y: number;
//   rotate: number;
// };

// function generateRandom(): TileRandom[] {
//   return Array.from({ length: GRID * GRID }).map(() => ({
//     x: Math.random() * 800 - 400,
//     y: Math.random() * 800 - 400,
//     rotate: Math.random() * 40 - 20,
//   }));
// }

// export default function AvatarTiles() {
//   // ✅ ВАЖНО: фиксируем значения один раз при mount
//   const random = useMemo<TileRandom[]>(() => generateRandom(), []);

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.grid}>
//         {tiles.map((_, i) => {
//           const row = Math.floor(i / GRID);
//           const col = i % GRID;

//           const r = random[i]; // ✅ обычная переменная, не ref

//           return (
//             <motion.div
//               key={i}
//               className={styles.tile}
//               initial={{
//                 x: r.x,
//                 y: r.y,
//                 opacity: 0,
//                 scale: 0.6,
//                 rotate: r.rotate,
//               }}
//               animate={{
//                 x: 0,
//                 y: 0,
//                 opacity: 1,
//                 scale: 1,
//                 rotate: 0,
//               }}
//               transition={{
//                 delay: i * 0.03,
//                 duration: 0.8,
//                 ease: "easeOut",
//               }}
//               style={{
//                 backgroundPosition: `
//                   ${-col * TILE_SIZE}px ${-row * TILE_SIZE}px
//                 `,
//               }}
//             />
//           );
//         })}
//       </div>

//       <div className={styles.glow} />
//     </div>
//   );
// }