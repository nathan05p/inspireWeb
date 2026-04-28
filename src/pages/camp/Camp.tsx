import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Mail, Phone, AtSign, CheckCircle, 
  Tent, Mic, Utensils, Backpack, 
  Car, Flame, Heart, Plus, BookOpen, Sun, ExternalLink, Map
} from 'lucide-react';
import CampNavbar from './CampNavbar';
import Marquee from '../../components/Marquee';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay }
  })
};

const activities = [
  { id: "plenare", title: "Sesiuni Plenare", desc: "Timp de închinare și mesaje relevante pentru generația noastră. Un spațiu unde adevărul transformă.", icon: <Mic size={28} />, img: "https://images.unsplash.com/photo-1470229722913-7c092bce52f3?q=80&w=800", details: "Sesiunile plenare sunt inima taberei. Aici ne adunăm cu toții dimineața și seara pentru închinare prin muzică și pentru a asculta mesaje puternice de la invitații noștri. Vom avea trupe live, momente de mărturie și predici adaptate la provocările tinerilor din ziua de azi." },
  { id: "workshop", title: "Workshop-uri", desc: "Sesiuni practice și interactive unde aprofundăm subiecte specifice și creștem împreună.", icon: <Flame size={28} />, img: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800", details: "Avem o listă lungă de workshop-uri care acoperă domenii variate: dezvoltare personală, relații, apologetică, finanțe, leadership și creativitate. Scopul lor este să ofere răspunsuri practice și un mediu în care participanții pot pune întrebări directe." },
  { id: "jocuri", title: "Activități & Jocuri", desc: "Momente de distracție, drumeții și jocuri de echipă care ne unesc și creează amintiri.", icon: <Heart size={28} />, img: "https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?q=80&w=800", details: "După-amiezile sunt dedicate conectării și mișcării. Vom organiza un mare treasure hunt, campionate de sport (volei, fotbal), drumeții scurte pe munte și desigur tradiționalul foc de tabără unde stăm la povești până seara târziu." },
  { id: "mese", title: "Mese & Părtășie", desc: "Mâncare delicioasă și timpul acela de aur petrecut la povești în jurul mesei.", icon: <Utensils size={28} />, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800", details: "Nimic nu unește o comunitate mai mult decât o masă bună! Mâncarea este pregătită local cu ingrediente de calitate, iar la mese nu se stă cu telefonul, ci ne concentrăm pe a-i asculta pe cei de lângă noi și a ne relaxa cu adevărat." },
];

const packingList = [
  { title: "Cazare & Somn", icon: <Tent size={32} />, items: ["Cort rezistent la ploaie", "Sac de dormit călduros", "Izopren / Saltea", "Pătură extra"] },
  { title: "Haine & Încălțăminte", icon: <Backpack size={32} />, items: ["Haine groase pt seară", "Pelerină de ploaie", "Bocanci impermeabili", "Haine sport și lejere"] },
  { title: "Igienă & Medical", icon: <Plus size={32} />, items: ["Trusă igienă personală", "Medicamente personale", "Spray căpușe / țânțari", "Prosop și șlapi"] },
  { title: "Timp cu Dumnezeu", icon: <BookOpen size={32} />, items: ["Biblia", "Jurnal / Agendă", "Pixuri sau markere", "Inimă deschisă"] },
];

const faqs = [
  { 
    user: "Andrei M.", time: "acum 2 ore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrei",
    q: "Dacă mi se sparge salteaua, aveți voi de rezervă?",
    a: "Da! Avem câteva izoprene și saltele de rezervă pentru situații de urgență. Totuși, te încurajăm să ai echipamentul tău verificat bine de acasă!"
  },
  { 
    user: "Elena", time: "acum 5 ore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    q: "Dacă sunt răcit sau am o alergie, aveți trusă medicală / personal avizat?",
    a: "Avem o trusă de prim-ajutor complet echipată și personal cu pregătire medicală de bază în tabără. Dacă ai alergii severe, te rugăm să specifici în formularul de înscriere și să ai la tine medicamentația necesară."
  },
  { 
    user: "David C.", time: "ieri", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    q: "Avem apă caldă la dușuri? Și pot să îmi aduc mingea de volei?",
    a: "Sunt condiții de camping, dar da, avem dușuri amenajate (apa caldă poate fi limitată în momentele de vârf, so be quick!). Mingea de volei este MUST BRING! 🏐 Avem loc de jucat."
  },
  { 
    user: "Sara", time: "ieri", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    q: "Mâncarea este inclusă în preț? Este reducere pentru elevi?",
    a: "Da, toate cele 3 mese principale + gustări sunt incluse! Pentru elevi/studenți și familii avem opțiuni de preț reduse, detaliate pe larg în secțiunea formularului de înscriere."
  }
];

function CampRotatingCircle() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <path
            id="textPathCamp"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="transparent"
          />
          <text className="text-[10.5px] font-bold tracking-[0.2em] uppercase fill-stone-900">
            <textPath href="#textPathCamp" startOffset="0%">
              • INSPIRE PLUS • TIMISOARA • CAMP 2026
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center text-stone-900">
        <Tent size={24} />
      </div>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 mt-10 sm:mt-16 mb-6 sm:mb-8 relative z-10 w-full max-w-4xl mx-auto px-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center flex-1">
          <div className="bg-white border border-stone-200 shadow-sm rounded-3xl w-full aspect-square max-w-[72px] sm:max-w-[100px] md:max-w-[120px] flex items-center justify-center mb-2 sm:mb-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-amber-500 font-bold tabular-nums">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase text-stone-400">
            {unit === 'days' ? 'Zile' : unit === 'hours' ? 'Ore' : unit === 'minutes' ? 'Min' : 'Sec'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Camp() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVideoLoaded(true), 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedActivity) {
        setSelectedActivity(null);
      }
    };
    if (selectedActivity) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedActivity]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 bg-[#faf8f5] text-stone-900 min-h-screen overflow-x-hidden" 
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <CampNavbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-stone-900">

        {/* MOBILE FALLBACK: static image (shown on sm and below) */}
        <div className="absolute inset-0 z-0 md:hidden">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200"
            alt="Camp background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* DESKTOP: Vimeo iframe (hidden on mobile) */}
        <div className="absolute inset-0 w-full h-full z-0 bg-stone-900 pointer-events-none hidden md:block">
          <motion.div
            className="absolute inset-0 w-[150vw] h-[150vh] -left-[25vw] -top-[25vh]"
            initial={{ scale: 1.15, filter: 'blur(10px)' }}
            animate={{ 
              scale: isVideoLoaded ? 1 : 1.15,
              filter: isVideoLoaded ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src="https://player.vimeo.com/video/368732047?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
              allow="autoplay; fullscreen; picture-in-picture"
              className="w-full h-full object-cover opacity-80"
              style={{ border: 'none' }}
              title="Camp Background"
            />
          </motion.div>
        </div>

        {/* OVERLAYS */}
        {/* Mobile overlay — mai închis ca textul să se citească pe imagine */}
        <div className="absolute inset-0 bg-black/35 z-[1] pointer-events-none md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-[1] pointer-events-none md:hidden" />
        {/* Desktop overlays — mai ușoare */}
        <div className="absolute inset-0 bg-white/40 z-0 pointer-events-none mix-blend-overlay hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#faf8f5] z-0 pointer-events-none hidden md:block" />

        <motion.div
          className="absolute bottom-10 sm:bottom-16 left-4 sm:left-6 md:left-12 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <span className="text-amber-400 md:text-amber-600 text-xs font-bold tracking-[0.3em]">INSPIRE+ CAMP</span>
            <div className="h-[1px] w-8 sm:w-12 bg-white/40 md:bg-stone-900/20" />
            <span className="text-white/80 md:text-stone-500 text-xs font-bold tracking-[0.2em]">AUGUST 2026</span>
          </div>
          <h1 className="text-[2.8rem] xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.85] tracking-tight text-white md:text-stone-900">
            Camp<br/>
            <span className="italic text-white/70 md:text-stone-500">2026</span>
          </h1>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="bg-amber-400 py-4 border-y border-amber-500/20 overflow-hidden relative z-20">
        <Marquee
          items={Array(8).fill('INSPIRE+ CAMP 2026')}
          speed={40}
          separator="•"
          className="py-1"
          itemClassName="text-xs md:text-sm font-bold tracking-[0.3em] text-stone-900 mr-8"
        />
      </section>

      {/* THEME & ABOUT */}
      <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-sm md:text-base tracking-[0.3em] font-bold text-amber-600 mb-6">TEMA ANULUI</h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
              Chemați <br/><span className="italic text-stone-400">să fim Lumină</span>
            </h3>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="text-stone-600 leading-relaxed text-lg md:text-xl space-y-6">
            <p>
              Tabăra inspire+ nu este doar o simplă ieșire la munte. Este locul unde zgomotul orașului se oprește și începe conectarea reală – cu Dumnezeu și cu oamenii din jurul tău.
            </p>
            <p>
              Anul acesta ne concentrăm pe chemarea noastră de a aduce lumină acolo unde este întuneric. Te așteaptă zile pline de mesaje profunde, închinare sinceră, distracție fără limite și prietenii care vor dura o viață.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="conference" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-200 bg-white">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm md:text-base tracking-[0.3em] font-bold text-stone-400 mb-16 text-center">
          CE TE AȘTEAPTĂ
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {activities.map((item, i) => (
            <motion.div 
              key={item.id} 
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedActivity(item.id)}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1} 
              className="bg-[#faf8f5] rounded-3xl overflow-hidden border border-stone-200 group hover:border-amber-400 transition-colors cursor-pointer"
            >
              <motion.div layoutId={`image-${item.id}`} className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
              <motion.div layoutId={`content-${item.id}`} className="p-8">
                <motion.div layoutId={`icon-${item.id}`} className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-500 mb-6">
                  {item.icon}
                </motion.div>
                <motion.h3 layoutId={`title-${item.id}`} className="text-xl font-serif mb-3 text-stone-900">{item.title}</motion.h3>
                <motion.p layoutId={`desc-${item.id}`} className="text-sm text-stone-500 leading-relaxed line-clamp-3">{item.desc}</motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedActivity && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-stone-900/20 backdrop-blur-md"
              onClick={() => setSelectedActivity(null)}
            >
              {activities.filter(a => a.id === selectedActivity).map(item => (
                <motion.div 
                  key={item.id}
                  layoutId={`card-${item.id}`}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200 w-full max-w-2xl shadow-2xl cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div layoutId={`image-${item.id}`} className="h-64 sm:h-80 overflow-hidden relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setSelectedActivity(null)}
                      className="absolute top-6 right-6 w-10 h-10 bg-white/90 hover:bg-amber-400 hover:text-stone-900 rounded-full flex items-center justify-center transition-colors text-stone-600 shadow-sm backdrop-blur-md z-20"
                    >
                      <Plus size={20} className="rotate-45" />
                    </button>
                  </motion.div>
                  <motion.div layoutId={`content-${item.id}`} className="p-8 md:p-12 relative">
                    <motion.div layoutId={`icon-${item.id}`} className="absolute top-8 right-8 w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                      {item.icon}
                    </motion.div>
                    <motion.h3 layoutId={`title-${item.id}`} className="text-3xl md:text-4xl font-serif mb-4 pr-20 text-stone-900">{item.title}</motion.h3>
                    <motion.p layoutId={`desc-${item.id}`} className="text-lg text-stone-600 leading-relaxed mb-6 font-medium">{item.desc}</motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-stone-500 leading-relaxed"
                    >
                      {item.details}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* REASONS TO COME */}
      <section id="reasons" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 relative">
            
            <motion.div 
              animate={{ y: [0, -12, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="overflow-hidden rounded-[2.5rem] shadow-xl border border-stone-200/50"
            >
              <motion.img 
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800" 
                alt="Atmosfera 1" 
                className="w-full h-44 sm:h-56 md:h-80 object-cover cursor-pointer" 
              />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="overflow-hidden rounded-[2.5rem] translate-y-12 shadow-xl border border-stone-200/50"
            >
              <motion.img 
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1510511459019-5efa3facfa5b?auto=format&fit=crop&q=80&w=800" 
                alt="Atmosfera 2" 
                className="w-full h-44 sm:h-56 md:h-80 object-cover cursor-pointer" 
              />
            </motion.div>

            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="overflow-hidden rounded-[2.5rem] col-span-2 mt-12 shadow-xl border border-stone-200/50"
            >
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1516027582531-1e9b2512f718?auto=format&fit=crop&q=80&w=1200" 
                alt="Atmosfera 3" 
                className="w-full h-36 sm:h-48 md:h-64 object-cover cursor-pointer" 
              />
            </motion.div>

          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-8 sm:mb-12 text-stone-900">Motive pentru <br/><span className="italic text-amber-500">care să vii</span></h3>
            <ul className="space-y-8">
              {[
                { title: 'Un reset necesar', desc: 'Ieși din agitația orașului pentru a respira aer curat și a asculta vocea lui Dumnezeu într-un cadru liniștit.' },
                { title: 'Prietenii autentice', desc: 'Conectează-te cu tineri care au aceleași valori și creează amintiri și relații de neuitat.' },
                { title: 'Creștere spirituală', desc: 'Timp dedicat pentru rugăciune, studiu și aprofundarea relației tale cu Hristos alături de comunitate.' }
              ].map((reason, i) => (
                <li key={i} className="flex gap-6">
                  <Sun className="text-amber-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-stone-900">{reason.title}</h4>
                    <p className="text-stone-600 leading-relaxed text-sm">{reason.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* PACKING LIST */}
      <section id="packing" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-200 bg-[#faf8f5]">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm md:text-base tracking-[0.3em] font-bold text-stone-400 mb-16 text-center">
          CE SĂ IEI CU TINE
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {packingList.map((category, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1} className="p-8 rounded-3xl bg-white border border-stone-200 hover:border-amber-300 transition-colors group shadow-sm">
              <div className="text-amber-500 mb-8 transform group-hover:scale-110 transition-transform origin-left">{category.icon}</div>
              <h3 className="text-lg font-bold mb-6 pb-4 border-b border-stone-100 text-stone-900">{category.title}</h3>
              <ul className="space-y-3">
                {category.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-stone-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOGISTICS & INFO */}
      <section id="give" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-200">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm md:text-base tracking-[0.3em] font-bold text-stone-400 mb-16 text-center">
          INFORMAȚII IMPORTANTE
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
          {/* Pricing */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="sm:col-span-12 md:col-span-8 bg-white border border-stone-200 shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-8 text-stone-900">Costuri & Înscriere</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="bg-[#faf8f5] rounded-2xl p-4 sm:p-6 min-w-[130px] sm:min-w-[160px] border border-stone-100">
                  <p className="text-xs text-stone-400 font-bold tracking-widest mb-2">INTEGRAL</p>
                  <p className="text-3xl font-bold text-stone-900">450 <span className="text-base text-stone-400 font-normal">RON</span></p>
                </div>
                <div className="bg-[#faf8f5] rounded-2xl p-4 sm:p-6 min-w-[130px] sm:min-w-[160px] border border-stone-100">
                  <p className="text-xs text-stone-400 font-bold tracking-widest mb-2">DOAR SEARA</p>
                  <p className="text-3xl font-bold text-stone-900">50 <span className="text-base text-stone-400 font-normal">RON/zi</span></p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 sm:p-6 min-w-[130px] sm:min-w-[160px] border border-stone-100 border-l-4 border-l-amber-500">
                  <p className="text-xs text-amber-600 font-bold tracking-widest mb-2">AVANS (Rezervare)</p>
                  <p className="text-3xl font-bold text-stone-900">150 <span className="text-base text-stone-400 font-normal">RON</span></p>
                </div>
              </div>
              <a href="https://docs.google.com/forms" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-amber-400 text-stone-900 px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-stone-900 hover:text-white transition-colors shadow-lg shadow-amber-400/20">
                FORMULAR ÎNSCRIERE <ExternalLink size={16}/>
              </a>
              <p className="text-xs text-stone-500 mt-6 max-w-md leading-relaxed">Metoda de plată (transfer bancar sau cont Revolut) este detaliată la finalul formularului de înscriere. Avansul este nereturnabil.</p>
            </div>
            {/* Background flourish */}
            <div className="absolute -right-20 -bottom-20 opacity-[0.03] text-stone-900 pointer-events-none transform -rotate-12 group-hover:scale-110 transition-transform duration-700">
               <Tent size={350} />
            </div>
          </motion.div>

          {/* Transport */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1} className="sm:col-span-12 md:col-span-4 bg-white border border-stone-200 shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl flex flex-col justify-center">
            <Car className="text-amber-500 mb-6" size={40} />
            <h3 className="text-2xl font-serif mb-4 text-stone-900">Transport</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Nu asigurăm transport organizat cu autobuzul, însă ne grupăm mereu pe grupul comunității pentru a găsi locuri în mașinile celor care conduc spre locație. Nu te îngrijora, găsim un loc!
            </p>
          </motion.div>

          {/* Location */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="sm:col-span-6 bg-white border border-stone-200 shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 hover:border-amber-300 transition-colors">
            <div>
              <MapPin className="text-amber-500 mb-6" size={40} />
              <h3 className="text-2xl font-serif mb-2 text-stone-900">Locație Tabără</h3>
              <p className="text-stone-600">Valea Drăganului, Jud. Cluj (Camping)</p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="shrink-0 w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-stone-900">
              <Map size={24} />
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3} className="sm:col-span-6 bg-white border border-stone-200 shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl font-serif mb-8 text-stone-900">Contact Oficial</h3>
            <div className="space-y-5">
              <a href="mailto:hello@inspireplus.ro" className="flex items-center gap-4 text-stone-700 hover:text-amber-600 transition-colors font-medium">
                <Mail size={20} className="text-stone-400"/> hello@inspireplus.ro
              </a>
              <a href="tel:+40700000000" className="flex items-center gap-4 text-stone-700 hover:text-amber-600 transition-colors font-medium">
                <Phone size={20} className="text-stone-400"/> +40 700 000 000
              </a>
              <a href="#" className="flex items-center gap-4 text-stone-700 hover:text-amber-600 transition-colors font-medium">
                <AtSign size={20} className="text-stone-400"/> @inspireplus.tm
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ COMMUNITY STYLE */}
      <section id="faq" className="py-16 sm:py-24 md:py-32 overflow-hidden border-b border-stone-200 bg-[#faf8f5]">
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-4xl font-serif mb-4 text-stone-900">Întrebări frecvente</h2>
            <p className="text-stone-500">Răspunsuri direct din comunitate.</p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {/* Row 1 - Moves Left */}
          <div className="relative w-full flex">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
              className="flex gap-6 w-max px-3"
            >
              {Array(4).fill(faqs).flat().map((faq, i) => (
                <div key={i} className="w-[280px] sm:w-[340px] md:w-[420px] shrink-0 bg-white p-5 md:p-8 rounded-3xl border border-stone-200 shadow-md hover:border-amber-300 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={faq.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-stone-100" />
                    <div>
                      <p className="font-bold text-sm text-stone-900">{faq.user}</p>
                      <p className="text-xs text-stone-400">{faq.time}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium leading-snug mb-8 text-stone-800">{faq.q}</p>
                  
                  <div className="p-5 bg-[#faf8f5] rounded-2xl border-l-2 border-amber-400 relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center border border-stone-200">
                        <span className="text-stone-900 font-serif text-[10px] italic font-bold">i+</span>
                      </div>
                      <span className="font-bold text-sm text-stone-900">inspire+ staff</span>
                      <CheckCircle size={14} className="text-amber-500 fill-amber-500/20" />
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Moves Right */}
          <div className="relative w-full flex">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
              className="flex gap-6 w-max px-3"
            >
              {Array(4).fill([...faqs].reverse()).flat().map((faq, i) => (
                <div key={i} className="w-[280px] sm:w-[340px] md:w-[420px] shrink-0 bg-white p-5 md:p-8 rounded-3xl border border-stone-200 shadow-md hover:border-amber-300 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={faq.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-stone-100" />
                    <div>
                      <p className="font-bold text-sm text-stone-900">{faq.user}</p>
                      <p className="text-xs text-stone-400">{faq.time}</p>
                    </div>
                  </div>
                  <p className="text-lg font-medium leading-snug mb-8 text-stone-800">{faq.q}</p>
                  
                  <div className="p-5 bg-[#faf8f5] rounded-2xl border-l-2 border-amber-400 relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center border border-stone-200">
                        <span className="text-stone-900 font-serif text-[10px] italic font-bold">i+</span>
                      </div>
                      <span className="font-bold text-sm text-stone-900">inspire+ staff</span>
                      <CheckCircle size={14} className="text-amber-500 fill-amber-500/20" />
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA & COUNTDOWN */}
      <section className="relative py-24 sm:py-36 md:py-48 overflow-hidden flex flex-col items-center justify-center text-center bg-white border-t border-stone-200">
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          style={{ y }}
        >
          <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2000" alt="Background" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </motion.div>

        {/* Slow moving text background */}
        <div className="absolute top-[40%] left-0 w-[200vw] -translate-y-1/2 pointer-events-none opacity-[0.03] flex">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            <h1 className="text-[15vw] font-serif leading-none mr-12 text-stone-900">INSPIRAȚIE • NATURĂ • COMUNITATE •</h1>
            <h1 className="text-[15vw] font-serif leading-none mr-12 text-stone-900">INSPIRAȚIE • NATURĂ • COMUNITATE •</h1>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-5xl">
          <CampRotatingCircle />
          
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mt-8 sm:mt-12 mb-4 sm:mb-6 leading-none text-stone-900">
            Ne vedem în <br/>
            <span className="italic text-amber-500">Valea Drăganului.</span>
          </h2>
          
          {/* THE LIVE COUNTDOWN */}
          <CountdownTimer targetDate="2026-06-26T18:00:00" />
          
          <a href="https://docs.google.com/forms" target="_blank" rel="noopener noreferrer" className="bg-stone-900 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold tracking-widest text-xs sm:text-sm hover:bg-amber-400 hover:text-stone-900 transition-colors duration-300 shadow-[0_0_40px_rgba(0,0,0,0.1)] mt-6 sm:mt-8">
            REZERVARE LOC TABĂRĂ
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#faf8f5] border-t border-stone-200 px-5 sm:px-8 md:px-16 py-10 sm:py-16 flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12">
        <div className="max-w-xs">
          <div className="w-16 h-16 rounded-full border border-stone-300 flex items-center justify-center mb-8 hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer text-stone-900">
            <span className="text-current font-serif text-base leading-none flex items-center">
              <span className="italic tracking-tight">inspire</span>
              <span className="font-sans font-bold text-xs ml-0.5 mt-1">+</span>
            </span>
          </div>
          <p className="text-stone-500 text-[10px] tracking-[0.3em] font-bold uppercase mb-2">inspire+ Timișoara</p>
          <p className="text-stone-400 text-xs leading-relaxed">Creat pentru comunitate. O biserică relevantă pentru generația noastră.</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 md:text-right">
          <a href="#" className="text-stone-500 hover:text-stone-900 text-xs font-bold tracking-widest transition-colors">INSTAGRAM</a>
          <a href="#" className="text-stone-500 hover:text-stone-900 text-xs font-bold tracking-widest transition-colors">FACEBOOK</a>
          <a href="#" className="text-stone-500 hover:text-stone-900 text-xs font-bold tracking-widest transition-colors">YOUTUBE</a>
          <p className="text-stone-400 text-xs mt-4">© {new Date().getFullYear()} inspire+ Timișoara</p>
        </div>
      </footer>
    </motion.div>
  );
}
