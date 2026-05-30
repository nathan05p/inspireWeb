import { motion } from 'framer-motion';

const expectData = [
  { 
    id: 'plenar', 
    title: 'Program Plenar', 
    svg: '/6.svg', 
    glow: 'bg-rose-500/40 shadow-[0_0_80px_rgba(244,63,94,0.4)]', 
    glowColor: 'rgba(244,63,94,0.6)',
    desc: 'Bucură-te de sesiuni puternice cu închinare profundă și mesaje relevante. Vom explora împreună chemarea noastră și cum putem reflecta lumina în lumea de azi, printr-o perspectivă biblică.' 
  },
  { 
    id: 'activitati', 
    title: 'Activitati', 
    svg: '/7.svg', 
    glow: 'bg-amber-500/40 shadow-[0_0_80px_rgba(245,158,11,0.4)]',
    glowColor: 'rgba(245,158,11,0.6)', 
    desc: 'De la competiții sportive, la momente artistice și provocări de echipă, activitățile noastre sunt create să aducă zâmbete, unitate și să te scoată din zona de confort într-un mod distractiv.' 
  },
  { 
    id: 'ateliere', 
    title: 'Ateliere', 
    svg: '/8.svg', 
    glow: 'bg-indigo-500/40 shadow-[0_0_80px_rgba(99,102,241,0.4)]',
    glowColor: 'rgba(99,102,241,0.6)', 
    desc: 'Participă la ateliere practice unde poți aprofunda domenii precum apologetica, muzica, media sau dezvoltarea personală, alături de mentori pregătiți să te ajute să crești.' 
  },
  { 
    id: 'comunitate', 
    title: 'Comunitate', 
    svg: '/9.svg', 
    glow: 'bg-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.4)]',
    glowColor: 'rgba(6,182,212,0.6)', 
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
        <div className="md:hidden relative flex flex-col gap-24">
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
                className={`relative flex w-full items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                
                {/* Node (Center) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className={`relative w-28 h-28 flex items-center justify-center rounded-full ${item.glow} transition-transform duration-500 hover:scale-110`}>
                    <div className="absolute inset-0 rounded-full blur-xl bg-current opacity-20" style={{ color: item.glowColor }} />
                    <img src={item.svg} alt={item.title} className="w-16 h-16 object-contain relative z-10 drop-shadow-md" />
                  </div>
                  <h3 className="font-outfit font-bold text-2xl text-stone-50 mt-4 text-center whitespace-nowrap drop-shadow-md">
                    {item.title}
                  </h3>
                </div>

                {/* Text (Side) */}
                <div className="w-1/2 px-4 pt-32 pb-4">
                  <p className={`text-stone-300 text-sm leading-relaxed ${isEven ? 'text-right pr-4' : 'text-left pl-4'}`}>
                    {item.desc}
                  </p>
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
                className="relative flex flex-col items-center w-64 group"
              >
                {/* Glow & Icon */}
                <div className={`relative w-40 h-40 flex items-center justify-center rounded-full ${item.glow} transition-transform duration-500 group-hover:scale-110 cursor-default`}>
                  <div className="absolute inset-0 rounded-full blur-2xl bg-current opacity-30" style={{ color: item.glowColor }} />
                  <img src={item.svg} alt={item.title} className="w-20 h-20 object-contain relative z-10 drop-shadow-lg transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                {/* Title */}
                <h3 className="font-outfit font-bold text-3xl text-stone-50 mt-6 text-center drop-shadow-md">
                  {item.title}
                </h3>
                
                {/* Desktop Text (Hidden or subtle by default, can be shown here or on hover) */}
                <p className="text-stone-300 text-sm text-center leading-relaxed mt-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
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
