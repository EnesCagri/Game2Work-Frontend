"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function HeroAnimSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  const [hadoukenPosition, setHadoukenPosition] = useState(0);
  const [canShoot, setCanShoot] = useState(true);
  const [isCardHit, setIsCardHit] = useState(false);
  const [showHitEffect, setShowHitEffect] = useState(false);
  const [hitBounce, setHitBounce] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  // Shooting cooldown
  useEffect(() => {
    if (!canShoot) {
      const timer = setTimeout(() => {
        setCanShoot(true);
        setIsCardHit(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [canShoot]);

  // Hit bounce animation
  useEffect(() => {
    if (isCardHit) {
      const interval = setInterval(() => {
        setHitBounce((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            setShowCTA(true); // Show CTA after animation completes
            return 1;
          }
          return prev + 0.05;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setHitBounce(0);
      setShowCTA(false);
    }
  }, [isCardHit]);

  // Hadouken animation and card hit detection
  useEffect(() => {
    if (isFiring && canShoot) {
      setHadoukenPosition(0);
      const interval = setInterval(() => {
        setHadoukenPosition((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            setIsFiring(false);
            setCanShoot(false);
            return 1;
          }
          if (prev >= 0.7 && !isCardHit) {
            setIsCardHit(true);
            setShowHitEffect(true);
            setTimeout(() => setShowHitEffect(false), 300);
          }
          return prev + 0.1;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setHadoukenPosition(0);
    }
  }, [isFiring, canShoot, isCardHit]);

  const handleClick = () => {
    if (canShoot) {
      setIsFiring(true);
      setIsCardHit(false);
      setShowHitEffect(false);
      setHitBounce(0);
      setShowCTA(false);
    }
  };

  // Calculate the uppercut trajectory
  const getUppercutPosition = (progress: number) => {
    const height = -200 * Math.sin(progress * Math.PI);
    const forward = 50 * progress;
    const rotation = 90 * progress;
    return {
      y: height,
      x: forward,
      rotate: rotation,
    };
  };

  const scrollToJobs = (e: React.MouseEvent) => {
    e.preventDefault();
    const jobsSection = document.getElementById("jobs-catalog");
    if (jobsSection) {
      const offset = 100; // Add some offset to account for the header
      const elementPosition = jobsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Stage Background */}
      <div className="absolute inset-0 bg-[url('https://i.imgur.com/b0m2bx0.jpg')] bg-contain bg-bottom bg-no-repeat" />

      {/* Fighter Section */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[600px]">
        {/* Ryu */}
        <div
          className="relative w-[205px] h-[198px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <Image
            src={
              isFiring
                ? "https://i.imgur.com/Rfj0a80.png"
                : "https://i.imgur.com/nTj3Fxx.gif"
            }
            alt="Ryu"
            width={205}
            height={198}
            className="object-contain"
          />
        </div>

        {/* Hadouken */}
        <div
          className={`absolute w-[62px] h-[100px] transition-all duration-100 ${
            isFiring ? "visible" : "invisible"
          }`}
          style={{
            left: `${205 + hadoukenPosition * 300}px`,
            top: "50px",
            transform: `scale(${1 + hadoukenPosition * 0.5})`,
            opacity: 1 - hadoukenPosition * 0.3,
          }}
        >
          <Image
            src="https://i.imgur.com/oTyQRvX.gif"
            alt="Hadouken"
            width={62}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Card */}
        <motion.div
          className="absolute w-[100px] h-[150px] right-20 bottom-0"
          initial={{ rotate: 0 }}
          animate={
            isCardHit
              ? {
                  ...getUppercutPosition(hitBounce),
                  scale: 1 + Math.sin(hitBounce * Math.PI) * 0.2,
                }
              : {
                  rotate: 0,
                  y: 0,
                  x: 0,
                  scale: 1,
                }
          }
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        >
          <div
            className={`w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center border-4 border-black relative overflow-hidden pixel-border
            ${showHitEffect ? "animate-[hit-flash_0.3s_ease-in-out]" : ""}`}
          >
            {showHitEffect && (
              <>
                <div className="absolute inset-0 bg-red-500 opacity-70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
              </>
            )}
            <div className="text-4xl mb-2">🎮</div>
            <div className="text-sm font-bold text-center text-red-700">
              İşsizlik
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <AnimatePresence>
        {showCTA ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-40 left-1/2 -translate-x-1/2 w-full max-w-md text-center"
          >
            <motion.h2
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-5xl mb-8 font-[Press_Start_2P] text-[#FFD700] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            >
              SEN KAZANDIN!
            </motion.h2>
            <div className="flex gap-6 justify-center">
              <button
                onClick={scrollToJobs}
                className="group relative px-8 py-4 bg-[#FF0000] text-white font-[Press_Start_2P] text-sm hover:bg-[#FF3333] transition-all duration-200 cursor-pointer pixel-border"
                style={{
                  boxShadow: "4px 4px 0 #000",
                  clipPath: "polygon(0 0, 100% 0, 100% 75%, 90% 100%, 0 100%)",
                }}
              >
                <span className="relative z-10">İLANLARI İNCELE</span>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:to-black/30" />
              </button>
              <Link
                href="jobs/post-job"
                className="group relative px-8 py-4 bg-[#0000FF] text-white font-[Press_Start_2P] text-sm hover:bg-[#3333FF] transition-all duration-200 pixel-border"
                style={{
                  boxShadow: "4px 4px 0 #000",
                  clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 75%, 0 0)",
                }}
              >
                <span className="relative z-10">İLAN AÇ</span>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:to-black/30" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center font-[Press_Start_2P] text-lg"
          >
            Ryu'ya tıkla!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add font import and pixel border styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        .pixel-border {
          border: 4px solid #000;
          image-rendering: pixelated;
          box-shadow: 4px 4px 0 #000;
        }

        .pixel-border:hover {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #000 !important;
        }
      `}</style>
    </div>
  );
}
