"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Block {
  id: number;
  x: number;
  color: string;
  blocks: { x: number; y: number }[];
  rotation: number;
  delay: number;
}

// Each piece is defined by an array of block coordinates
const SHAPES = {
  I: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
  ],
  O: [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
  T: [
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  S: [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
  ],
  Z: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
  J: [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
  L: [
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
};

const PIECE_COLORS = {
  I: "fill-cyan-500",
  O: "fill-yellow-500",
  T: "fill-purple-500",
  S: "fill-green-500",
  Z: "fill-red-500",
  J: "fill-blue-500",
  L: "fill-orange-500",
};

const BLOCK_SIZE = 20; // Size of each small block
const PIECE_SIZE = BLOCK_SIZE * 4; // Total piece size
const ROTATIONS = [0, 90, 180, 270];

export const FallingBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const initialBlocks: Block[] = [];
    const columns = Math.floor(window.innerWidth / PIECE_SIZE);

    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.8) {
        const shapeKey = Object.keys(SHAPES)[
          Math.floor(Math.random() * Object.keys(SHAPES).length)
        ] as keyof typeof SHAPES;
        initialBlocks.push({
          id: i,
          x: i * PIECE_SIZE,
          color: PIECE_COLORS[shapeKey],
          blocks: SHAPES[shapeKey],
          rotation: ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)],
          delay: Math.random() * 2,
        });
      }
    }
    setBlocks(initialBlocks);

    const interval = setInterval(() => {
      const shapeKey = Object.keys(SHAPES)[
        Math.floor(Math.random() * Object.keys(SHAPES).length)
      ] as keyof typeof SHAPES;
      const newBlock = {
        id: Date.now(),
        x: Math.floor(Math.random() * columns) * PIECE_SIZE,
        color: PIECE_COLORS[shapeKey],
        blocks: SHAPES[shapeKey],
        rotation: ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)],
        delay: 0,
      };
      setBlocks((prev) => [...prev.slice(-30), newBlock]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {blocks.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              y: -PIECE_SIZE,
              x: piece.x,
              opacity: 0,
              rotate: piece.rotation,
            }}
            animate={{
              y: window.innerHeight + PIECE_SIZE,
              opacity: [0, 1, 1, 0],
              rotate: piece.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 10,
              delay: piece.delay,
              ease: "linear",
              opacity: { duration: 10, times: [0, 0.1, 0.9, 1] },
            }}
            className="absolute"
          >
            <svg
              width={PIECE_SIZE}
              height={PIECE_SIZE}
              viewBox={`0 0 ${PIECE_SIZE} ${PIECE_SIZE}`}
              className="overflow-visible"
            >
              {piece.blocks.map((block, index) => (
                <g
                  key={index}
                  className="drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
                >
                  {/* Main block */}
                  <rect
                    x={block.x * BLOCK_SIZE}
                    y={block.y * BLOCK_SIZE}
                    width={BLOCK_SIZE}
                    height={BLOCK_SIZE}
                    className={`${piece.color} opacity-90`}
                    rx="2"
                  />
                  {/* Highlight */}
                  <rect
                    x={block.x * BLOCK_SIZE}
                    y={block.y * BLOCK_SIZE}
                    width={BLOCK_SIZE}
                    height={BLOCK_SIZE / 4}
                    className="fill-white opacity-30"
                    rx="1"
                  />
                  {/* Border */}
                  <rect
                    x={block.x * BLOCK_SIZE}
                    y={block.y * BLOCK_SIZE}
                    width={BLOCK_SIZE}
                    height={BLOCK_SIZE}
                    className="fill-none stroke-white/30 stroke-[0.5]"
                    rx="2"
                  />
                </g>
              ))}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
