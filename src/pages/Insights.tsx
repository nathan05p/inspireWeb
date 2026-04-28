import { motion } from 'framer-motion';

export default function Insights() {
  return (
    <div className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-serif mb-24"
      >
        Insights
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i % 3 * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden rounded-xl mb-6 aspect-video">
              <img 
                src={`https://picsum.photos/seed/insight${item}/800/600`} 
                alt="Insight placeholder" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
              />
            </div>
            <p className="text-xs font-semibold tracking-widest text-accent mb-4">
              CATEGORY • DATE
            </p>
            <h3 className="text-2xl font-serif group-hover:text-accent transition-colors leading-snug">
              Article Title Placeholder: How to write better insights
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
