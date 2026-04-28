import { motion } from 'framer-motion';

export default function Services() {
  return (
    <div className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-serif mb-24"
      >
        Our Services
      </motion.h1>

      <div className="max-w-4xl">
        {['Strategy', 'Content', 'Social', 'Design', 'Video', 'Web', 'Events', 'Training'].map((service, i) => (
          <motion.div 
            key={service}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="flex gap-8 items-baseline mb-8">
              <span className="text-xl font-mono text-accent">0{i+1}/</span>
              <h2 className="text-4xl md:text-6xl font-serif">{service}</h2>
            </div>
            <div className="pl-0 md:pl-16">
              <p className="text-xl md:text-2xl leading-relaxed text-slate/80 mb-8 text-balance">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-medium text-slate/90">
                <li className="border-b border-slate/20 pb-2">Sub-service 1</li>
                <li className="border-b border-slate/20 pb-2">Sub-service 2</li>
                <li className="border-b border-slate/20 pb-2">Sub-service 3</li>
                <li className="border-b border-slate/20 pb-2">Sub-service 4</li>
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
