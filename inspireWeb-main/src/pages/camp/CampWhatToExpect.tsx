import { motion } from 'framer-motion';

const expectData = [
  { id: 'plenar', title: 'Program Plenar', svg: '/6.svg' },
  { id: 'activitati', title: 'Activitati', svg: '/7.svg' },
  { id: 'ateliere', title: 'Ateliere', svg: '/8.svg' },
  { id: 'comunitate', title: 'Comunitate', svg: '/9.svg' },
];

export default function CampWhatToExpect() {
  return (
    <section id="what-to-expect" className="py-20 sm:py-32 px-4 sm:px-6 relative bg-[#1A1E22] overflow-hidden border-b border-stone-800/50">
      
      {/* Title */}
      <div className="max-w-screen-xl mx-auto text-center mb-16 sm:mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-outfit font-bold tracking-tight text-stone-50"
        >
          Ce te asteapta
        </motion.h2>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* ======================= */}
        {/* MOBILE LAYOUT (Vertical) */}
        {/* ======================= */}
        <div className="md:hidden relative flex flex-col gap-24">
          {/* Main vertical dashed line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-stone-700/50 -translate-x-1/2 -z-10" />

          {expectData.map((item) => {
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                className="relative flex w-full justify-center"
              >
                {/* Node (Center) */}
                <div className="relative flex flex-col items-center">
                  <div className="relative flex items-center justify-center transition-transform duration-500 hover:scale-105">
                    <img src={item.svg} alt={item.title} className="w-full max-w-[280px] h-auto object-contain relative z-10" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>


        {/* ========================= */}
        {/* DESKTOP LAYOUT (Horizontal) */}
        {/* ========================= */}
        <div className="hidden md:flex relative w-full h-[600px] items-center justify-between px-8 lg:px-16">
          
          {/* SVG Wavy Dashed Line Background */}
          <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex items-center justify-center overflow-visible">
            <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none" className="opacity-50">
              <path 
                d="M 50,150 Q 250,50 500,150 T 950,150" 
                fill="none" 
                stroke="#44403C" 
                strokeWidth="2" 
                strokeDasharray="8 8" 
              />
            </svg>
          </div>

          {expectData.map((item, index) => {
            // Alternating up and down positions
            const isUp = index % 2 === 0;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: isUp ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, y: isUp ? -80 : 80 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
                className="relative flex flex-col items-center w-72 group"
              >
                {/* SVG Image Directly */}
                <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105 cursor-default">
                  <img src={item.svg} alt={item.title} className="w-full h-auto object-contain relative z-10" />
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
