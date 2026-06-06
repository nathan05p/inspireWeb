import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Plus } from 'lucide-react';

const ateliereData = [
  {
    id: 'apologetica',
    title: 'apologetica',
    desc: '🧠💬 „Cum știi că Dumnezeu există?”\n„De ce îngăduie răul?”\n„Cum poți crede într-o carte scrisă acum mii de ani?”\nÎntrebările vin. De la colegi, de pe internet, sau chiar din noi.\nȘi e ok — credința nu înseamnă să nu întrebi. Înseamnă să cauți răspunsuri reale.\n📚 În tabăra The Creator (15–20 iulie), vom avea un atelier special de apologetică — unde explorăm, discutăm și întărim credința pe o bază solidă.\n🎙 Gândire clară. Răspunsuri argumentate. Credință matură.\nDacă vrei să știi nu doar ce crezi, ci și de ce, atelierul ăsta e pentru tine.',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'leaders',
    title: 'leaders',
    desc: '🎯 Creat pentru a conduce.\nÎntr-o lume în care leadershipul înseamnă control, Dumnezeu caută lideri care slujesc.\n\nDacă simți că ai fost creat pentru mai mult, vino la atelierul de leadership din tabăra Inspire – The Creator.\n🔍 Identitate. 🔥 Influență. 🤝 Impact.',
    img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'compozitie',
    title: 'compoziție',
    desc: 'Explorează lumea sunetelor și a creației muzicale. Vei descoperi cum să transformi o idee într-o piesă completă, cum funcționează armoniile și ce înseamnă să compui cu inima.',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'living_free',
    title: 'living free',
    desc: '🧠 Unele lucruri încep ca o distracție… și ajung să te țină captiv.\nDependențele nu se văd mereu la exterior. Dar se simt. În suflet. În rușine. În izolare.\nÎn tabăra The Creator, avem un atelier special despre lupta împotriva dependențelor.\nNu judecăm. Nu etichetăm. Doar vorbim sincer și vedem cum arată pașii spre o viață trăită cu adevărat liber.\n\nPentru că El este aproape de cei cu inima zdrobită și mântuiește pe cei cu duhul frânt. (Psalmul 34:18)',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'creative_video',
    title: 'creative video',
    desc: '🎥 Imaginile vorbesc mai tare decât cuvintele. În atelierul de creative video vei învăța să captezi momente cu impact, să le editezi cu viziune și să spui povești care contează.\nDe la telefon la ecran mare — oricine poate deveni un povestitor vizual. Hai să descoperim împreună cum.',
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
  },
];

export default function CampAteliere() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="ateliere" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-slate-800/50 bg-[#121C26]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column - Sticky Title */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-outfit font-bold tracking-tight text-slate-50 leading-none"
            >
              Ateliere
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 space-y-4 max-w-sm"
            >
              <p className="text-deepsea-300 text-sm font-bold tracking-[0.2em] uppercase">
                inspire+ 2026 — the Creator
              </p>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                🤩 Știm că fiecare adolescent sau tânăr este unic și prețios, având daruri și abilități care trebuie descoperite, iar mai apoi șlefuite.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Ne dorim ca inspire+ să fie un mediu pus la dispoziția celor care-și doresc să fie inspirați și echipați pentru a-și folosi abilitățile în slujba Regelui Cristos.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                🌄 Am pregătit pentru tine câteva ateliere, care te pot ajuta să-ți descoperi potențialul și să începi să-ți cultivi viziunea.
              </p>
              <p className="text-slate-500 text-sm italic">
                Apasă pe un titlu pentru detalii.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Interactive List */}
        <div className="lg:col-span-8 relative">
          {/* Main vertical dashed line connecting all items */}
          <div className="absolute left-[27px] sm:left-[35px] top-12 bottom-12 w-px border-l-2 border-dashed border-slate-700/50 hidden sm:block" />

          <div className="flex flex-col gap-6 sm:gap-8">
            {ateliereData.map((atelier, i) => {
              const isExpanded = expandedItems.includes(atelier.id);

              return (
                <motion.div 
                  key={atelier.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: 'spring', bounce: 0.2 }}
                  className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 group"
                >
                  {/* Connection Node and Horizontal Line */}
                  <div className="hidden sm:flex items-start shrink-0 w-16 pt-6 relative z-10">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-500 relative bg-[#121C26] mx-auto ${isExpanded ? 'border-deepsea-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'border-slate-600 group-hover:border-slate-400'}`} />
                    {/* Horizontal connection line to the card */}
                    <div className="absolute left-1/2 right-[-1rem] top-[30px] w-full border-t-2 border-dashed border-slate-700/50 -z-10" />
                  </div>

                  {/* Content Container */}
                  <motion.div 
                    layout
                    onClick={() => !isExpanded && toggleItem(atelier.id)}
                    className={`flex-1 overflow-hidden rounded-3xl sm:rounded-[2rem] border transition-all duration-500 ${isExpanded ? 'bg-[#202D3B] border-deepsea-300/40 shadow-2xl' : 'bg-transparent border-transparent cursor-pointer hover:bg-[#202D3B]/40'}`}
                  >
                    {/* Header: Title & Close/Expand Button */}
                    <motion.div layout className={`p-4 sm:p-6 lg:p-8 flex items-center justify-between gap-4 ${isExpanded ? 'pb-4 sm:pb-6' : ''}`}>
                      <motion.h3 
                        layout="position"
                        className={`font-outfit font-bold tracking-tight lowercase transition-colors duration-500 break-words flex-1 ${isExpanded ? 'text-3xl sm:text-4xl md:text-5xl text-deepsea-300' : 'text-3xl sm:text-5xl lg:text-6xl text-slate-300 group-hover:text-slate-50'}`}
                      >
                        {atelier.title}
                      </motion.h3>
                      
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-slate-800/50 flex items-center justify-center text-slate-500 group-hover:text-deepsea-300 group-hover:border-deepsea-300/50 transition-all shadow-sm"
                          aria-label="Deschide atelier"
                        >
                          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.div>
                      )}

                      {isExpanded && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8, rotate: 180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.8, rotate: -180 }}
                          transition={{ duration: 0.4 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(atelier.id);
                          }}
                          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#121C26] border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-slate-50 hover:bg-slate-800 hover:border-slate-600 transition-all shadow-sm"
                          aria-label="Ascunde atelier"
                        >
                          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.button>
                      )}
                    </motion.div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start"
                        >
                          {/* Image */}
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="w-full md:w-5/12 shrink-0 overflow-hidden rounded-2xl h-48 sm:h-56 md:h-64 border border-slate-800/80 shadow-md relative"
                          >
                            <div className="absolute inset-0 bg-slate-900/10 z-10 pointer-events-none" />
                            <img src={atelier.img} alt={atelier.title} className="w-full h-full object-cover" />
                          </motion.div>
                          
                          {/* Description */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex-1 flex flex-col pt-0 md:pt-2"
                          >
                            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose whitespace-pre-wrap">
                              {atelier.desc}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
