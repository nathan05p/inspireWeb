import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');

  useEffect(() => {
    // After entrance settles, hold briefly then exit
    const holdTimer = setTimeout(() => setPhase('out'), 1800);
    return () => clearTimeout(holdTimer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== 'out' && (
        <>
          {/* Main overlay — slides UP to reveal page */}
          <motion.div
            key="loader-panel"
            className="fixed inset-0 z-[200] bg-[#2D3E40] flex items-center justify-center"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Center text */}
            <div className="relative flex flex-col items-center gap-6 select-none">

              {/* inspire+ text */}
              <motion.div
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                }}
                exit={{ opacity: 0 }}
                className="flex items-baseline gap-[2px]"
              >
                <span
                  style={{ fontFamily: '"Playfair Display", serif' }}
                  className="text-[#C4CDC3] text-3xl font-normal tracking-[0.08em] italic"
                >
                  inspire
                </span>
                <span className="text-[#E54B4B] text-3xl font-bold leading-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  +
                </span>
              </motion.div>

              {/* Thin progress line */}
              <motion.div
                className="h-[1px] bg-[#C4CDC3]/20 rounded-full overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: 120,
                  opacity: 1,
                  transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
                }}
              >
                <motion.div
                  className="h-full bg-[#C4CDC3]/60 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.4 },
                  }}
                />
              </motion.div>
            </div>

            {/* Small red dot — bottom left decorative */}
            <motion.div
              className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-[#E54B4B]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4, delay: 0.6 },
              }}
            />
          </motion.div>

          {/* Secondary panel — slides up with slight delay for layered effect */}
          <motion.div
            key="loader-panel-2"
            className="fixed inset-0 z-[190] bg-[#C4CDC3]"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.08 },
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
