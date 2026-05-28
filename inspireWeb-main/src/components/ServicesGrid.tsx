import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  { id: '01/', name: 'STRATEGY', path: '/services' },
  { id: '02/', name: 'CONTENT', path: '/services' },
  { id: '03/', name: 'SOCIAL', path: '/services' },
  { id: '04/', name: 'DESIGN', path: '/services' },
  { id: '05/', name: 'VIDEO', path: '/services' },
  { id: '06/', name: 'WEB', path: '/services' },
  { id: '07/', name: 'EVENTS', path: '/services' },
  { id: '08/', name: 'TRAINING', path: '/services' },
];

export default function ServicesGrid() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="border-t border-slate/20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services.map((svc, i) => (
          <Link
            key={svc.name}
            to={svc.path}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="relative border border-dashed border-slate/20 aspect-square flex flex-col items-center justify-center overflow-hidden group"
          >
            {/* Inactive state */}
            <motion.div
              animate={{ opacity: hoveredIdx === i ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col"
            >
              <span className="text-accent text-xs font-mono self-end p-4">{svc.id}</span>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-wide text-slate">
                  {svc.name}
                </span>
              </div>
            </motion.div>

            {/* Active/hover state: big red circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: hoveredIdx === i ? 1 : 0,
                opacity: hoveredIdx === i ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[85%] aspect-square rounded-full bg-accent flex flex-col items-center justify-center z-10"
            >
              <span className="text-white text-2xl md:text-3xl font-serif tracking-wide font-semibold">
                {svc.name}
              </span>
              <span className="text-white/80 text-xs tracking-widest mt-2 font-sans font-medium">
                SEE SERVICE
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
