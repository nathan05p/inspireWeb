import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-serif mb-24 max-w-5xl text-balance"
      >
        We are a communications agency for organisations shaping a better future for people and the planet.
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <img src="https://picsum.photos/seed/about/1200/800" alt="Team" className="w-full h-full object-cover rounded-xl aspect-square" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Our Approach</h2>
          <p className="text-xl text-slate/80 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-xl text-slate/80 leading-relaxed">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </motion.div>
      </div>

      <h2 className="text-4xl md:text-6xl font-serif mb-16">Our Team</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4">
              <img src={`https://picsum.photos/seed/team${item}/600/800`} alt="Team member" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <h3 className="text-xl font-serif">Name Placeholder</h3>
            <p className="text-sm text-slate/60 font-medium">Role Placeholder</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
