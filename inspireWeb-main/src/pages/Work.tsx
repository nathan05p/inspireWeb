import { motion } from 'framer-motion';

export default function Work() {
  return (
    <div className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-serif mb-24"
      >
        Selected Work
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
        {[1, 2, 3, 4, 5, 6].map((item, i) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i % 2 * 0.2 }}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden rounded-xl mb-6 aspect-[4/3]">
              <img 
                src={`https://picsum.photos/seed/work${item}/800/600`} 
                alt="Work placeholder" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl md:text-3xl font-serif group-hover:text-accent transition-colors">
                Project Title Placeholder {item}
              </h3>
            </div>
            <p className="text-sm font-medium text-slate/60">
              Client Name • Category, Category
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
