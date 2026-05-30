import { motion } from 'framer-motion';

const expectData = [
  { 
    id: 'plenar', 
    title: 'Program Plenar', 
    img: '/6.png', 
    desc: 'Bucură-te de sesiuni puternice cu închinare profundă și mesaje relevante. Vom explora împreună chemarea noastră și cum putem reflecta lumina în lumea de azi, printr-o perspectivă biblică.' 
  },
  { 
    id: 'activitati', 
    title: 'Activitati', 
    img: '/7.png', 
    desc: 'De la competiții sportive, la momente artistice și provocări de echipă, activitățile noastre sunt create să aducă zâmbete, unitate și să te scoată din zona de confort într-un mod distractiv.' 
  },
  { 
    id: 'ateliere', 
    title: 'Ateliere', 
    img: '/8.png', 
    desc: 'Participă la ateliere practice unde poți aprofunda domenii precum apologetica, muzica, media sau dezvoltarea personală, alături de mentori pregătiți să te ajute să crești.' 
  },
  { 
    id: 'comunitate', 
    title: 'Comunitate', 
    img: '/9.png', 
    desc: 'Tabăra este despre oameni. Aici vei avea ocazia să cunoști tineri din toată țara, să legi prietenii autentice și să te simți parte dintr-o familie extinsă, unită de aceleași valori.' 
  },
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
        <div className="md:hidden relative flex flex-col gap-8 py-10">
          {/* Main vertical dashed line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-stone-700/50 -translate-x-1/2 -z-10" />

          {expectData.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                className="relative grid grid-cols-2 w-full min-h-[200px] items-center"
              >
                {/* Center Image */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-center w-40 h-40">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain drop-shadow-lg" />
                </div>

                {/* Left Side (Text when index is odd) */}
                <div className="px-4 text-right pr-20">
                  {!isEven && (
                    <p className="text-stone-300 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  )}
                </div>

                {/* Right Side (Text when index is even) */}
                <div className="px-4 text-left pl-20">
                  {isEven && (
                    <p className="text-stone-300 text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  )}
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
                {/* PNG Image */}
                <div className="relative w-64 h-64 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 cursor-default">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain relative z-10" />
                </div>
                
                {/* Desktop Text */}
                <p className="text-stone-300 text-sm text-center leading-relaxed mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300 px-4">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
