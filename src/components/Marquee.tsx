import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export default function Marquee({ items, speed = 40, separator = '•', className = '', itemClassName = '' }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const moveBy = -speed * (delta / 1000);
    if (innerRef.current) {
      const innerWidth = innerRef.current.scrollWidth / 2;
      let newX = baseX.get() + moveBy;
      if (Math.abs(newX) >= innerWidth) {
        newX = 0;
      }
      baseX.set(newX);
    }
  });

  const allItems = [...items, ...items];

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        ref={innerRef}
        style={{ x: baseX }}
        className="inline-flex"
      >
        {allItems.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-4 ${itemClassName}`}>
            <span>{item}</span>
            <span className="text-accent">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
