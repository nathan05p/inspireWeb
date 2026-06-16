import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    // After entrance settles, hold briefly then exit
    const holdTimer = setTimeout(() => setPhase('out'), 200);
    return () => clearTimeout(holdTimer);
  }, []);

  useEffect(() => {
    if (phase === 'out') {
      const exitTimer = setTimeout(onComplete, 500); // Wait for exit animations to finish
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== 'out' && (
        <>
          {/* Main overlay — slides UP to reveal page */}
          <motion.div
            key="loader-panel"
            className="fixed inset-0 z-[200] bg-gradient-to-br from-[#FA9339]/20 to-[#0A0A0A] bg-[#0A0A0A] flex items-center justify-center"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Center text */}
            <div className="relative flex flex-col items-center gap-6 select-none">

              {/* inspire+ text */}
              {/* logo image i+ */}
              <motion.img
                src="/logo.png"
                alt="inspire+"
                className="w-24 h-24 md:w-32 md:h-32 object-contain select-none pointer-events-none"
                style={{ filter: 'brightness(0) invert(1)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 },
                }}
                exit={{ opacity: 0 }}
              />

              {/* Thin progress line */}
              <motion.div
                className="h-[1px] bg-[#FA9339]/20 rounded-full overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: 120,
                  opacity: 1,
                  transition: { duration: 0.3, ease: 'easeOut' as const, delay: 0.15 },
                }}
              >
                <motion.div
                  className="h-full bg-[#FA9339]/60 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 },
                  }}
                />
              </motion.div>
            </div>

            {/* Small red dot — bottom left decorative */}
            <motion.div
              className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-[#FA9339]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.2, delay: 0.2 },
              }}
            />
          </motion.div>

          {/* Secondary panel — slides up with slight delay for layered effect */}
          <motion.div
            key="loader-panel-2"
            className="fixed inset-0 z-[190] bg-[#FA9339]"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.05 },
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
