import { motion } from 'framer-motion';

const expectData = [
  { 
    id: 'plenar', 
    title: 'Program Plenar', 
    img: '/new_icons/7.png',
    side: 'left' as const,
    desc: 'Bucură-te de sesiuni puternice cu închinare profundă și mesaje relevante. Vom explora împreună chemarea noastră și cum putem reflecta lumina în lumea de azi, printr-o perspectivă biblică.' 
  },
  { 
    id: 'activitati', 
    title: 'Activitati', 
    img: '/new_icons/8.png',
    side: 'right' as const,
    desc: 'De la competiții sportive, la momente artistice și provocări de echipă, activitățile noastre sunt create să aducă zâmbete, unitate și să te scoată din zona de confort într-un mod distractiv.' 
  },
  { 
    id: 'ateliere', 
    title: 'Ateliere', 
    img: '/new_icons/9.png',
    side: 'left' as const,
    desc: 'Participă la ateliere practice unde poți aprofunda domenii precum apologetica, muzica, media sau dezvoltarea personală, alături de mentori pregătiți să te ajute să crești.' 
  },
  { 
    id: 'comunitate', 
    title: 'Comunitate', 
    img: '/new_icons/10.png',
    side: 'right' as const,
    desc: 'Tabăra este despre oameni. Aici vei avea ocazia să cunoști tineri din toată țara, să legi prietenii autentice și să te simți parte dintr-o familie extinsă, unită de aceleași valori.' 
  },
  { 
    id: 'timp_liber', 
    title: 'Timp Liber', 
    img: '/new_icons/11.png',
    side: 'left' as const,
    desc: 'Momente speciale de relaxare în care poți lega prietenii de-o viață, te poți bucura de natură și poți împărtăși experiențe alături de ceilalți participanți.' 
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
          inspire<span className="font-bold text-amber-500 not-italic">+</span> camp
        </motion.h2>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* ======================= */}
        {/* UNIVERSAL LAYOUT        */}
        {/* ======================= */}
        <div className="relative px-2 max-w-4xl mx-auto">

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
          <div className="flex flex-col gap-10 py-8 relative">
            {expectData.map((item) => {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                  className="relative flex items-center w-full px-4"
                >
                  {/* Image - Left */}
                  <div className="z-10 w-24 h-24 md:w-32 md:h-32 shrink-0 mr-5 md:mr-8">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Text - Right */}
                  <div className="z-20 flex-1 text-left">
                    <h3 className="text-amber-500 font-bold text-lg md:text-2xl mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-stone-300 text-[14px] md:text-base leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
