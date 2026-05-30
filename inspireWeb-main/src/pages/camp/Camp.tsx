import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import {
  MapPin, Mail, Phone, AtSign, CheckCircle,
  Tent, Backpack,
  Plus, BookOpen, Map, ChevronLeft, ChevronRight
} from 'lucide-react';
import CampNavbar from './CampNavbar';
import Marquee from '../../components/Marquee';
import RegistrationForm from '../../components/RegistrationForm';
import CampAteliere from './CampAteliere';
import CampWhatToExpect from './CampWhatToExpect';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay }
  })
};



const packingList = [
  { title: "Titlu Secțiune", icon: <Tent size={32} />, items: ["Aici avem un text", "Aici avem un text", "Aici avem un text", "Aici avem un text"] },
  { title: "Titlu Secțiune", icon: <Backpack size={32} />, items: ["Aici avem un text", "Aici avem un text", "Aici avem un text", "Aici avem un text"] },
  { title: "Titlu Secțiune", icon: <Plus size={32} />, items: ["Aici avem un text", "Aici avem un text", "Aici avem un text", "Aici avem un text"] },
  { title: "Titlu Secțiune", icon: <BookOpen size={32} />, items: ["Aici avem un text", "Aici avem un text", "Aici avem un text", "Aici avem un text"] },
];

const faqs = [
  {
    user: "Andrei M.", time: "acum 2 ore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrei",
    q: "Ce este inclus în prețul taberei?",
    a: "Prețul de 280 lei include doar înscrierea și participarea în tabără, precum și toate activitățile desfășurate. Nu sunt incluse mâncarea și transportul până în tabără."
  },
  {
    user: "Elena", time: "acum 5 ore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    q: "Ce echipamente ar trebui să aduc cu mine?",
    a: "Pentru a te pregăti pentru tabăra Fearless, nu uita să aduci cu tine cort, sac de dormit și izopren, iar pentru nopțile friguoase, asigură-te că ai haine mai groase. Aceste echipamente te vor ajuta să te simți confortabil și protejat în timpul șederii tale."
  },
  {
    user: "David C.", time: "ieri", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    q: "Ce trebuie să fac dacă nu am cort?",
    a: "Dacă nu ai un cort propriu, te rugăm să ne contactezi. Noi vom încerca să te cazăm împreună cu taberiști care au locuri disponibile. Totuși, asigură-te că ai un sac de dormit și izopren pentru a te simți confortabil în timpul nopților petrecute în tabără."
  },
  {
    user: "Sara", time: "ieri", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    q: "Ce opțiuni de transport sunt disponibile?",
    a: "Transportul nu este inclus în prețul taberei, dar echipa noastră se va asigura că găsim soluții pentru transportul tău*\n*în limita locurilor disponibile."
  },
  {
    user: "Mihai", time: "acum 2 zile", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mihai",
    q: "Cum va fi gestionată mâncarea?",
    a: "Fiecare participant va trebui să se aprovizioneze cu mâncare pentru întreaga perioadă a taberei. Cu toate acestea, vom oferi posibilitatea de a achiziționa mâncare caldă, zilnic, de la o firmă de catering."
  },
  {
    user: "Ana", time: "acum 3 zile", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    q: "Dacă mă răzgândesc, pot să primesc banii înapoi?",
    a: "Avansul pentru tabără NU se poate returna.Te rugăm să ne anunți în timp util în cazul în care dorești să renunți la participare, astfel încât să putem gestiona în mod corespunzător rezervările."
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
      <div className="w-16 h-16 rounded-full bg-[#1A1E22]mber-400 flex items-center justify-center text-stone-50">
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
          <div className="bg-[#1A1E22] border border-stone-800/50 shadow-sm rounded-3xl w-full aspect-square max-w-[72px] sm:max-w-[100px] md:max-w-[120px] flex items-center justify-center mb-2 sm:mb-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-outfit tracking-tight text-amber-500 font-bold tabular-nums">
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

function PhotoGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    "/poza.png",
    "/poza.png",
    "/poza.png",
    "/poza.png",
    "/poza.png",
    "/poza.png",
    "/poza.png",
  ];

  // Duplicate the array multiple times to simulate infinite scroll
  const galleryItems = [...images, ...images, ...images, ...images, ...images, ...images];

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      if (scrollRef.current && !isHovered) {
        const delta = time - lastTime;
        if (delta > 16) {
          scrollRef.current.scrollLeft += 0.5;
          lastTime = time;
        }
      } else {
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={scrollLeft}
          className="w-12 h-12 rounded-full bg-[#1A1E22]/90 backdrop-blur border border-stone-700 text-stone-50 flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-colors shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={scrollRight}
          className="w-12 h-12 rounded-full bg-[#1A1E22]/90 backdrop-blur border border-stone-700 text-stone-50 flex items-center justify-center hover:bg-amber-500 hover:text-stone-900 transition-colors shadow-xl"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-12 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {galleryItems.map((src, i) => (
          <div key={i} className="w-[280px] sm:w-[400px] h-[300px] sm:h-[450px] shrink-0 rounded-3xl overflow-hidden border border-stone-800/50 shadow-md">
            <img src={src} alt={`Camp memory ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Camp() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const faqScrollRef = useRef<HTMLDivElement>(null);
  const [isFaqHovered, setIsFaqHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      if (faqScrollRef.current && !isFaqHovered) {
        const delta = time - lastTime;
        if (delta > 16) {
          faqScrollRef.current.scrollTop += 0.5;
          lastTime = time;

          const { scrollTop, scrollHeight, clientHeight } = faqScrollRef.current;
          // Jump to top seamlessly when reaching the bottom
          if (scrollTop + clientHeight >= scrollHeight - 20) {
            faqScrollRef.current.scrollTop = 0;
          }
        }
      } else {
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFaqHovered]);

  useEffect(() => {
    setTimeout(() => setIsVideoLoaded(true), 500);
  }, []);



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 bg-[#1A1E22] text-stone-50 min-h-screen overflow-x-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <CampNavbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-stone-900">

        {/* DESKTOP & MOBILE: Vimeo iframe */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <motion.div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100svh',
              minWidth: '177.77svh',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 1.15, filter: 'blur(10px)', x: '-50%', y: '-50%' }}
            animate={{
              scale: isVideoLoaded ? 1 : 1.15,
              filter: isVideoLoaded ? 'blur(0px)' : 'blur(10px)',
              x: '-50%',
              y: '-50%'
            }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src="https://player.vimeo.com/video/368732047?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&playsinline=1"
              allow="autoplay; fullscreen; picture-in-picture"
              className="w-full h-full object-cover opacity-80"
              style={{ border: 'none' }}
              title="Camp Background"
            />
          </motion.div>
        </div>

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-[#1A1E22]/40 z-0 pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1E22]/30 via-transparent to-[#1A1E22] z-0 pointer-events-none" />

        {/* MAIN TITLE BLOCK */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Text Container */}
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center drop-shadow-2xl px-4 text-center">
            <motion.p
              className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] tracking-tight leading-[1.1] sm:leading-[1.1]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: '"TheLetterEditorial", "Playfair Display", serif', 
                fontWeight: 'normal',
                textShadow: '0 4px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)' 
              }}
            >
              O generatie mai aproape de cer,
              <br className="hidden sm:block" />
              mai aproape de oameni si mai de folos Imparatiei.
            </motion.p>
          </div>
        </motion.div>
        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full bg-[#1A1E22] py-3 sm:py-4 border-y border-amber-500/20 z-20">
          <Marquee
            items={Array(10).fill('INSPIRE+ CAMP 2026 • THE CREATOR')}
            speed={40}
            separator=""
            className="py-1"
            itemClassName="text-xs md:text-sm font-bold tracking-[0.3em] text-stone-50 mr-8"
          />
        </div>
      </section>


      {/* WHAT TO EXPECT (inspire camp) */}
      <CampWhatToExpect />

      <CampAteliere />

      {/* VIZIUNE & ABOUT */}
      <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-sm md:text-base tracking-[0.3em] font-bold text-amber-600 mb-6">VIZIUNE</h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-outfit tracking-tight leading-tight">
              The <br /><span className="italic text-stone-400">Creator</span>
            </h3>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="text-stone-300 leading-relaxed text-base md:text-lg space-y-5">
            <p>
              👑 Titlul taberei <strong className="text-stone-50">inspire+</strong> din acest an este <strong className="text-stone-50">the Creator</strong> și este dedicată glorificării Celui care a creat atât întregul univers, cât și inimile noastre.
            </p>
            <p>
              Vrem să-L descoperim pe Dumnezeu așa cum ni Se descoperă în Biblie și în tot ce ne înconjoară — un Dumnezeu real, atotputernic, infinit și totuși aproape de noi — și să înțelegem că El nu este doar Creatorul lumii, ci și un Tată care ne cheamă la o relație sinceră, vie și personală cu El.
            </p>
            <p>🌱 Vino să cunoști tineri faini, să îți faci prieteni noi și să trăiești o experiență care îți va întări relațiile și credința.</p>
            <p>🎉 Am pregătit pentru tine ateliere interactive, momente de închinare și devoționale, seminare, activități sportive și recreative.</p>
            <p className="text-stone-50 font-semibold">
              Te așteaptăm cu brațele deschise! 🤗<br />
              <span className="font-normal text-stone-300">Nu veni singur, adu-ți și un prieten și hai să trăim împreună o tabără de neuitat! 🤩</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#1A1E22] overflow-hidden border-b border-stone-800/50">
        <div className="mb-12 sm:mb-16 text-center px-4 relative z-10">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-outfit tracking-tight text-stone-50 mb-4">Amintiri din <span className="italic text-amber-500">anii trecuți</span></motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1} className="text-stone-400 text-xs tracking-[0.3em] uppercase font-bold">GALERIE FOTO INSPIRE+ CAMP</motion.p>
        </div>

        <PhotoGallery />
      </section>

      {/* PACKING LIST */}
      <section id="packing" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-800/50 bg-[#1A1E22]">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm md:text-base tracking-[0.3em] font-bold text-stone-400 mb-16 text-center">
          CE SĂ IEI CU TINE
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {packingList.map((category, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1} className="p-8 rounded-3xl bg-[#22272B] border border-stone-800/50 hover:border-amber-300 transition-colors group shadow-sm">
              <div className="text-amber-500 mb-8 transform group-hover:scale-110 transition-transform origin-left">{category.icon}</div>
              <h3 className="text-lg font-bold mb-6 pb-4 border-b border-stone-800/50 text-stone-50">{category.title}</h3>
              <ul className="space-y-3">
                {category.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-stone-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ COMMUNITY STYLE */}
      <section id="faq" className="py-16 sm:py-24 md:py-32 overflow-hidden border-b border-stone-800/50 bg-[#1A1E22]">
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-4xl font-outfit tracking-tight mb-4 text-stone-50">Întrebări frecvente</h2>
            <p className="text-stone-400">Răspunsuri direct din comunitate.</p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 w-full relative z-10">
          {/* FAQ VERTICAL WHEEL STYLE */}
          <div className="relative w-full max-w-3xl mx-auto h-[500px] sm:h-[600px]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
            {/* Scrollable Container */}
            <div 
              ref={faqScrollRef}
              onMouseEnter={() => setIsFaqHovered(true)}
              onMouseLeave={() => setIsFaqHovered(false)}
              onTouchStart={() => setIsFaqHovered(true)}
              onTouchEnd={() => setIsFaqHovered(false)}
              data-lenis-prevent="true"
              className="absolute inset-0 overflow-y-auto flex flex-col gap-6 px-2 sm:px-4 py-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {Array(6).fill(faqs).flat().map((faq, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 bg-gradient-to-b from-stone-800/30 to-stone-900/40 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col gap-6 mx-auto max-w-2xl relative overflow-hidden group hover:border-white/10 transition-colors"
                >
                  {/* Subtle Top Glow */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-stone-500/20 to-transparent" />

                  {/* User Question */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-stone-500/20 rounded-full blur-md" />
                      <img src={faq.avatar} alt={faq.user} className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-700/50 object-cover" />
                    </div>
                    <div className="pt-1 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-stone-300 text-sm md:text-base tracking-wide">{faq.user}</span>
                        <span className="text-stone-600 text-xs tracking-wider">{faq.time}</span>
                      </div>
                      <p className="text-stone-100 text-lg md:text-xl font-outfit font-light leading-snug">{faq.q}</p>
                    </div>
                  </div>

                  {/* Connecting Line & Staff Reply */}
                  <div className="relative ml-6 md:ml-7 pl-8 md:pl-10 mt-2">
                    {/* Glowing Vertical Line */}
                    <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-stone-700/50 via-amber-500/50 to-transparent" />
                    
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0 mt-1">
                        <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-md" />
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#1A1E22] to-stone-900 border border-amber-500/40 flex items-center justify-center shadow-lg">
                          <span className="text-amber-500 font-outfit tracking-tighter text-[10px] md:text-xs italic font-bold">i+</span>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-xs md:text-sm text-amber-500 tracking-wide">inspire+ staff</span>
                          <CheckCircle size={14} className="text-amber-500 shrink-0" />
                          <div className="ml-auto px-2.5 py-1 rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-500/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:block backdrop-blur-sm">
                            Răspuns Oficial
                          </div>
                        </div>
                        <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOGISTICS & INFO */}
      <section id="give" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-800/50">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-sm md:text-base tracking-[0.3em] font-bold text-stone-400 mb-16 text-center">
          INFORMAȚII IMPORTANTE
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
          {/* Registration Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="sm:col-span-12">
            <RegistrationForm />
          </motion.div>

          {/* Location */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="sm:col-span-6 bg-[#22272B] border border-stone-800/50 shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 hover:border-amber-300 transition-colors">
            <div>
              <MapPin className="text-amber-500 mb-6" size={40} />
              <h3 className="text-2xl font-outfit tracking-tight mb-2 text-stone-50">Locație Tabără</h3>
              <p className="text-stone-300">Aici avem un text locația taberei</p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="shrink-0 w-16 h-16 rounded-full border border-stone-800/50 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-stone-50">
              <Map size={24} />
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3} className="sm:col-span-6 bg-[#22272B] border border-stone-800/50 shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl font-outfit tracking-tight mb-8 text-stone-50">Contact Oficial</h3>
            <div className="space-y-5">
              <a href="mailto:hello@inspireplus.ro" className="flex items-center gap-4 text-stone-300 hover:text-amber-600 transition-colors font-medium">
                <Mail size={20} className="text-stone-400" /> hello@inspireplus.ro
              </a>
              <a href="tel:+40700000000" className="flex items-center gap-4 text-stone-300 hover:text-amber-600 transition-colors font-medium">
                <Phone size={20} className="text-stone-400" /> +40 700 000 000
              </a>
              <a href="#" className="flex items-center gap-4 text-stone-300 hover:text-amber-600 transition-colors font-medium">
                <AtSign size={20} className="text-stone-400" /> @inspireplus.tm
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA & COUNTDOWN */}
      <section className="relative py-24 sm:py-36 md:py-48 overflow-hidden flex flex-col items-center justify-center text-center bg-[#1A1E22] border-t border-stone-800/50">
        <motion.div
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          style={{ y }}
        >
          <img src="/poza.png" alt="Background" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </motion.div>

        {/* Slow moving text background */}
        <div className="absolute top-[40%] left-0 w-[200vw] -translate-y-1/2 pointer-events-none opacity-[0.03] flex">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            <h1 className="text-[15vw] font-outfit tracking-tight leading-none mr-12 text-stone-50">INSPIRAȚIE • NATURĂ • COMUNITATE •</h1>
            <h1 className="text-[15vw] font-outfit tracking-tight leading-none mr-12 text-stone-50">INSPIRAȚIE • NATURĂ • COMUNITATE •</h1>
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-5xl">
          <CampRotatingCircle />

          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-outfit tracking-tight mt-8 sm:mt-12 mb-4 sm:mb-6 leading-none text-stone-50">
            Ne vedem în <br />
            <span className="italic text-amber-500">Valea Drăganului.</span>
          </h2>

          {/* THE LIVE COUNTDOWN */}
          <CountdownTimer targetDate="2026-06-26T18:00:00" />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#1A1E22] border-t border-stone-800/50 px-5 sm:px-8 md:px-16 py-10 sm:py-16 flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12">
        <div className="max-w-xs">
          <div className="w-16 h-16 rounded-full border border-stone-300 flex items-center justify-center mb-8 hover:border-amber-500 hover:text-amber-500 transition-colors cursor-pointer text-stone-50">
            <span className="text-current font-outfit tracking-tight text-base leading-none flex items-center">
              <span className="italic tracking-tight">inspire</span>
              <span className="font-sans font-bold text-xs ml-0.5 mt-1">+</span>
            </span>
          </div>
          <p className="text-stone-400 text-[10px] tracking-[0.3em] font-bold uppercase mb-2">inspire+ Timișoara</p>
          <p className="text-stone-400 text-xs leading-relaxed">Creat pentru comunitate. O biserică relevantă pentru generația noastră.</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 md:text-right">
          <a href="#" className="text-stone-400 hover:text-stone-50 text-xs font-bold tracking-widest transition-colors">INSTAGRAM</a>
          <a href="#" className="text-stone-400 hover:text-stone-50 text-xs font-bold tracking-widest transition-colors">FACEBOOK</a>
          <a href="#" className="text-stone-400 hover:text-stone-50 text-xs font-bold tracking-widest transition-colors">YOUTUBE</a>
          <p className="text-stone-400 text-xs mt-4">© {new Date().getFullYear()} inspire+ Timișoara</p>
        </div>
      </footer>
    </motion.div>
  );
}
