import { motion } from 'framer-motion';

const expectData = [
  { 
    id: 'plenar', 
    title: 'Program Plenar', 
    img: '/6.png',
    side: 'left' as const,
    desc: 'Bucură-te de sesiuni puternice cu închinare profundă și mesaje relevante. Vom explora împreună chemarea noastră și cum putem reflecta lumina în lumea de azi, printr-o perspectivă biblică.' 
  },
  { 
    id: 'activitati', 
    title: 'Activitati', 
    img: '/7.png',
    side: 'right' as const,
    desc: 'De la competiții sportive, la momente artistice și provocări de echipă, activitățile noastre sunt create să aducă zâmbete, unitate și să te scoată din zona de confort într-un mod distractiv.' 
  },
  { 
    id: 'ateliere', 
    title: 'Ateliere', 
    img: '/8.png',
    side: 'left' as const,
    desc: 'Participă la ateliere practice unde poți aprofunda domenii precum apologetica, muzica, media sau dezvoltarea personală, alături de mentori pregătiți să te ajute să crești.' 
  },
  { 
    id: 'comunitate', 
    title: 'Comunitate', 
    img: '/9.png',
    side: 'right' as const,
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
        {/* MOBILE LAYOUT           */}
        {/* ======================= */}
        <div className="md:hidden relative px-2">

          {/* SVG snake path — drawn behind everything */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none -z-10"
            viewBox="0 0 320 1000"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 80,80 Q 280,200 240,350 Q 80,480 80,600 Q 80,720 240,800 Q 320,870 240,960"
              fill="none"
              stroke="#44403C"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeLinecap="round"
            />
          </svg>

          {/* Items */}
          <div className="flex flex-col gap-0">
            {expectData.map((item) => {
              const imgLeft = item.side === 'left';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                  className="relative flex items-center w-full min-h-[240px]"
                >
                  {/* Image — left or right */}
                  <div
                    className={`absolute z-10 w-44 h-44 ${
                      imgLeft ? 'left-0' : 'right-0'
                    } top-1/2 -translate-y-1/2`}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Text — opposite side */}
                  <div
                    className={`z-20 w-1/2 ${
                      imgLeft
                        ? 'ml-auto pl-2 pr-1 text-left'
                        : 'mr-auto pr-2 pl-1 text-right'
                    }`}
                  >
                    <p className="text-stone-300 text-[12px] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>


        {/* ========================= */}
        {/* DESKTOP LAYOUT (Horizontal) */}
        {/* ========================= */}
        <div className="hidden md:flex relative w-full h-[700px] items-center justify-between px-8 lg:px-16">
          
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
            const isUp = index % 2 === 0;
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: isUp ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, y: isUp ? -80 : 80 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
                className="relative flex flex-col items-center w-[300px] group"
              >
                {/* PNG Image */}
                <div className="relative w-80 h-80 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 cursor-default">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
                </div>
                
                {/* Desktop Text */}
                <div className="px-2 w-full">
                  <p className="text-stone-200 text-[15px] text-center leading-relaxed mt-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
