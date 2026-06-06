import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Plus } from 'lucide-react';

const ateliereData = [
  {
    id: 'living_free',
    title: 'living free',
    desc: '🕊 Living Free\nUnele lucruri încep ca o distracție și ajung să te țină captiv. Dependențele nu se văd mereu pe dinafară — dar se simt: în rușine, în izolare în negare. Un atelier despre libertate îți arată, fără judecată și fără etichete, cum arată pașii spre o viață trăită cu adevărat liber de orice fel de dependențe.',
  },
  {
    id: 'apologetica',
    title: 'apologetică',
    desc: '🧠 Apologetică\n„Cum știi că Dumnezeu există?" „De ce îngăduie răul?" Întrebările vin — de la colegi, de pe internet, din tine. Și e normal: credința nu înseamnă să nu întrebi, ci să cauți răspunsuri reale. Un atelier de apologetică te ajută să-ți așezi credința pe o bază solidă — explorezi întrebările grele, discuți deschis și pleci cu argumente care au sens.',
  },
  {
    id: 'compozitie',
    title: 'compoziție',
    desc: '🎵 Compoziție\nFiecare cântec începe cu o idee - poate chiar cu a ta. Un atelier de compoziție te ajută să transformi un gând, o emoție sau o rugăciune într-o piesă - de la versuri și melodie până la structură - și să descoperi cum se naște un cântec care-L glorifică pe Creator.',
  },
  {
    id: 'leadership',
    title: 'leadership',
    desc: '🎯 Leadership\nCreat ca să conduci. Într-o lume în care leadershipul se confundă cu controlu, Dumnezeu caută lideri care inspiră. Un atelier de leadership te ajută să descoperi ce înseamnă să conduci după modelul Lui — pornind de la cine ești și de la viziunea pe care El o pune în inima ta.',
  },
  {
    id: 'creative_video',
    title: 'creative video',
    desc: '🎬 Creative Video\nAi mereu la îndemână un instrument cu care poți spune povești care contează. Un atelier de video creativ te învață să filmezi, să montezi și să transformi o idee într-un clip care prinde — și să-ți pui creativitatea în slujba unui mesaj care merită spus.',
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
    <section id="ateliere" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#284B63]/50 bg-[#353535]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column - Sticky Title */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-outfit font-bold tracking-tight text-[#FFFFFF] leading-none"
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
              <p className="text-theme-accent text-sm font-bold tracking-[0.2em] uppercase">
                inspire+ 2026 — The Cross
              </p>
              <p className="text-[#D9D9D9] text-base sm:text-lg leading-relaxed">
                Știm că fiecare adolescent sau tânăr este unic și prețios, având daruri și abilități care trebuie descoperite, iar mai apoi șlefuite.
              </p>
              <p className="text-[#D9D9D9] text-sm sm:text-base leading-relaxed">
                Ne dorim ca inspire+ să fie un mediu pus la dispoziția celor care-și doresc să fie inspirați și echipați pentru a-și folosi abilitățile în slujba Regelui Cristos.
              </p>
              <p className="text-[#FFFFFF]0 text-sm italic mt-4">
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
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-500 relative bg-[#353535] mx-auto ${isExpanded ? 'border-theme-accent shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'border-[#3C6E71] group-hover:border-[#3C6E71]'}`} />
                    {/* Horizontal connection line to the card */}
                    <div className="absolute left-1/2 right-[-1rem] top-[30px] w-full border-t-2 border-dashed border-slate-700/50 -z-10" />
                  </div>

                  {/* Content Container */}
                  <motion.div 
                    layout
                    onClick={() => !isExpanded && toggleItem(atelier.id)}
                    className={`flex-1 overflow-hidden rounded-3xl sm:rounded-[2rem] border transition-all duration-500 ${isExpanded ? 'bg-[#284B63] border-theme-accent/40 shadow-2xl' : 'bg-transparent border-transparent cursor-pointer hover:bg-[#284B63]/40'}`}
                  >
                    {/* Header: Title & Close/Expand Button */}
                    <motion.div layout className={`p-4 sm:p-6 lg:p-8 flex items-center justify-between gap-4 ${isExpanded ? 'pb-4 sm:pb-6' : ''}`}>
                      <motion.h3 
                        layout="position"
                        className={`font-outfit font-bold tracking-tight lowercase transition-colors duration-500 break-words flex-1 ${isExpanded ? 'text-3xl sm:text-4xl md:text-5xl text-theme-accent' : 'text-3xl sm:text-5xl lg:text-6xl text-[#D9D9D9] group-hover:text-[#FFFFFF]'}`}
                      >
                        {atelier.title}
                      </motion.h3>
                      
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#284B63]/50 flex items-center justify-center text-[#FFFFFF]0 group-hover:text-theme-accent group-hover:border-theme-accent/50 transition-all shadow-sm"
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
                          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#353535] border border-[#284B63]/80 flex items-center justify-center text-[#D9D9D9] hover:text-[#FFFFFF] hover:bg-[#284B63] hover:border-[#3C6E71] transition-all shadow-sm"
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
                          {/* Description */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex-1 flex flex-col pt-0 md:pt-2"
                          >
                            <p className="text-[#D9D9D9] text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose whitespace-pre-wrap">
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
