import { motion } from 'framer-motion';

const expectData = [
  { 
    id: 'inchinare', 
    title: 'Închinare', 
    img: '/new_icons/12.png',
    side: 'left' as const,
    desc: 'Momente de închinare centrate pe Cristos, care izvorăsc dintr-o inimă plină de pasiune pentru Dumnezeu - seri în care cânți, te rogi și primești Cuvânt împreună cu ceilalți.' 
  },
  { 
    id: 'activitati', 
    title: 'Activități', 
    img: '/new_icons/8.png',
    side: 'right' as const,
    desc: 'Activități interactive, competiții și jocuri în care toți intră în joc - exact ce-ți trebuie ca să uiți de agitația orașului și să te distrezi pe bune.' 
  },
  { 
    id: 'ateliere', 
    title: 'Ateliere', 
    img: '/new_icons/10.png',
    side: 'left' as const,
    desc: 'Ateliere gândite special pentru tine - idei practice care te echipează pentru a-ți împlinii chemarea și te ajută să trăiești cu o perspectivă eternă.' 
  },
  { 
    id: 'relatii', 
    title: 'Relații', 
    img: '/new_icons/9.png',
    side: 'right' as const,
    desc: 'Cunoști tineri faini, îți faci prieteni noi și legi prietenii care nu se termină când se termină tabăra - relații care îți întăresc și credința.' 
  },
  { 
    id: 'natura', 
    title: 'Natură', 
    img: '/new_icons/11.png',
    side: 'left' as const,
    desc: 'Te așteaptă o zonă superbă, la poalele munților Retezat — munte, aer curat și un decor care n-are nevoie de filtre.' 
  },
];

export default function CampWhatToExpect() {
  return (
    <section id="what-to-expect" className="py-20 sm:py-32 px-4 sm:px-6 relative bg-[#0A0A0A] overflow-hidden border-b border-[#FA9339]/10">
      
      {/* Title */}
      <div className="max-w-screen-xl mx-auto text-center mb-16 sm:mb-24 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-outfit font-bold tracking-tight text-white"
        >
          inspire<span className="font-bold text-[#FA9339] italic">+</span><span className="italic">camp</span>
        </motion.h2>
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* ======================= */}
        {/* UNIVERSAL LAYOUT        */}
        {/* ======================= */}
        <div className="relative px-2 max-w-4xl mx-auto">

          {/* SVG snake path — drawn behind everything */}
          <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex justify-center overflow-hidden">
            <svg
              className="w-full h-full max-w-sm opacity-60 md:opacity-100"
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
          </div>

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
                  <div className="z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 mr-4 sm:mr-6 md:mr-10">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Text - Right */}
                  <div className="z-20 flex-1 text-left">
                    <h3 className="text-[#FA9339] font-bold text-lg md:text-2xl mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-[#D4D4D4] text-[14px] md:text-base leading-relaxed font-light">
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
