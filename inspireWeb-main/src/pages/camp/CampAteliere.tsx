import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ateliereData = [
  {
    id: 'living_free',
    title: 'living free',
    desc: 'Unele lucruri încep ca o distracție și ajung să te țină captiv. Dependențele nu se văd mereu pe dinafară — dar se simt: în rușine, în izolare în negare. Un atelier despre libertate îți arată, fără judecată și fără etichete, cum arată pașii spre o viață trăită cu adevărat liber de orice fel de dependențe.',
  },
  {
    id: 'apologetica',
    title: 'apologetică',
    desc: '„Cum știi că Dumnezeu există?" „De ce îngăduie răul?" Întrebările vin — de la colegi, de pe internet, din tine. Și e normal: credința nu înseamnă să nu întrebi, ci să cauți răspunsuri reale. Un atelier de apologetică te ajută să-ți așezi credința pe o bază solidă — explorezi întrebările grele, discuți deschis și pleci cu argumente care au sens.',
  },
  {
    id: 'compozitie',
    title: 'compoziție',
    desc: 'Fiecare cântec începe cu o idee - poate chiar cu a ta. Un atelier de compoziție te ajută să transformi un gând, o emoție sau o rugăciune într-o piesă - de la versuri și melodie până la structură - și să descoperi cum se naște un cântec care-L glorifică pe Creator.',
  },
  {
    id: 'leadership',
    title: 'leadership',
    desc: 'Creat ca să conduci. Într-o lume în care leadershipul se confundă cu controlul, Dumnezeu caută lideri care inspiră. Un atelier de leadership te ajută să descoperi ce înseamnă să conduci după modelul Lui — pornind de la cine ești și de la viziunea pe care El o pune în inima ta.',
  },
  {
    id: 'creative_video',
    title: 'creative video',
    desc: 'Ai mereu la îndemână un instrument cu care poți spune povești care contează. Un atelier de video creativ te învață să filmezi, să montezi și să transformi o idee într-un clip care prinde — și să-ți pui creativitatea în slujba unui mesaj care merită spus.',
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
    <section id="ateliere" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#FA9339]/10 bg-[#0A0A0A]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column - Sticky Title */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-outfit font-bold tracking-tight text-white leading-none"
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
              <p className="text-[#FA9339] text-sm font-bold tracking-[0.2em] uppercase">
                inspire+ 2026 — The Cross
              </p>
              <p className="text-[#D4D4D4] text-base sm:text-lg leading-relaxed line-clamp-2">
                Știm că fiecare adolescent sau tânăr este unic și prețios, având daruri și abilități care trebuie descoperite, iar mai apoi șlefuite.
              </p>
              <p className="text-[#D4D4D4] text-sm sm:text-base leading-relaxed line-clamp-2">
                Ne dorim ca inspire+ să fie un mediu pus la dispoziția celor care-și doresc să fie inspirați și echipați pentru a-și folosi abilitățile în slujba Regelui Cristos.
              </p>
              <p className="text-[#737373] text-sm italic mt-4">
                Apasă pe un titlu pentru detalii.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Interactive List */}
        <div className="lg:col-span-8 relative">
          {/* Main vertical dashed line connecting all items */}
          <div className="absolute left-[27px] sm:left-[35px] top-12 bottom-12 w-px border-l-2 border-dashed border-[#FA9339]/15 hidden sm:block" />

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
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors duration-500 relative bg-[#0A0A0A] mx-auto ${isExpanded ? 'border-[#FA9339] shadow-[0_0_10px_rgba(232,104,26,0.5)]' : 'border-[#262626] group-hover:border-[#FA9339]/50'}`} />
                    {/* Horizontal connection line to the card */}
                    <div className="absolute left-1/2 right-[-1rem] top-[30px] w-full border-t-2 border-dashed border-[#FA9339]/15 -z-10" />
                  </div>

                  {/* Content Container */}
                  <motion.div 
                    layout
                    onClick={() => !isExpanded && toggleItem(atelier.id)}
                    className={`flex-1 overflow-hidden rounded-3xl sm:rounded-[2rem] border transition-all duration-500 ${isExpanded ? 'bg-[#1A1A1A] border-[#2A2A2A] shadow-2xl' : 'bg-transparent border-transparent cursor-pointer hover:bg-[#171717]/60'}`}
                  >
                    {/* Header: Title & Close/Expand Button */}
                    <motion.div layout className={`p-4 sm:p-6 lg:p-8 flex flex-col gap-2 ${isExpanded ? 'pb-4 sm:pb-6' : ''}`}>
                      <div className="flex items-center justify-between gap-4 w-full">
                        <motion.h3 
                          layout="position"
                          className={`font-outfit font-bold tracking-tight lowercase transition-colors duration-500 break-words flex-1 ${isExpanded ? 'text-3xl sm:text-4xl md:text-5xl text-[#FA9339]' : 'text-3xl sm:text-5xl lg:text-6xl text-[#F5E6D3] group-hover:text-white'}`}
                        >
                          {atelier.title}
                        </motion.h3>
                        
                        {!isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#262626]/50 flex items-center justify-center text-[#737373] group-hover:text-[#FA9339] group-hover:border-[#FA9339]/40 transition-all shadow-sm"
                            aria-label="Deschide atelier"
                          >
                            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
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
                            className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A0A0A] border border-[#262626]/50 flex items-center justify-center text-[#737373] hover:text-white hover:bg-[#171717] hover:border-[#FA9339]/30 transition-all shadow-sm"
                            aria-label="Ascunde atelier"
                          >
                            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                          </motion.button>
                        )}
                      </div>
                      
                      <motion.div layout className={`relative overflow-hidden ${isExpanded ? 'mt-4' : 'pr-14'}`}>
                        <motion.p 
                          layout="position"
                          className={isExpanded 
                            ? "text-[#D4D4D4] text-sm sm:text-base md:text-lg leading-relaxed md:leading-loose whitespace-pre-wrap"
                            : "text-[#A3A3A3] text-sm sm:text-base font-light italic line-clamp-2"
                          }
                        >
                          {atelier.desc}
                        </motion.p>
                        
                        {!isExpanded && (
                          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent group-hover:from-[#171717] group-hover:via-[#171717]/80 transition-colors duration-500 pointer-events-none" />
                        )}
                      </motion.div>
                    </motion.div>
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
