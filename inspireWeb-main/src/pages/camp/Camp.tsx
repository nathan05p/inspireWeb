import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
          <text className="text-[10.5px] font-bold tracking-[0.2em] uppercase" fill="#FFFFFF">
            <textPath href="#textPathCamp" startOffset="0%">
              • INSPIRE+ THE CROSS • INSPIRE+ THE CROSS •
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center">
        <img src="/logo.png" alt="i+" className="w-8 h-8 object-contain opacity-90" style={{ filter: 'brightness(0) invert(1)' }} />
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
    <div className="flex items-center justify-center gap-2 xs:gap-4 sm:gap-10 md:gap-16 lg:gap-24 mt-10 sm:mt-16 mb-6 sm:mb-8 relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <span 
              className="text-[2.5rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] tracking-tight font-bold tabular-nums leading-none"
              style={{ 
                fontFamily: '"Unbounded", sans-serif',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.9)', 
                color: 'transparent' 
              }}
            >
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs md:text-sm tracking-[0.4em] font-bold uppercase text-[#D6B598] opacity-80">
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
          className="w-12 h-12 rounded-full bg-[#0A111F]/90 backdrop-blur border border-slate-700 text-white flex items-center justify-center hover:bg-accent hover:text-slate-900 transition-colors shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={scrollRight}
          className="w-12 h-12 rounded-full bg-[#0A111F]/90 backdrop-blur border border-slate-700 text-white flex items-center justify-center hover:bg-accent hover:text-slate-900 transition-colors shadow-xl"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-8 overflow-x-auto px-4 sm:px-12 py-12 md:py-20 items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {galleryItems.map((src, i) => {
          const isLarge = i % 3 === 0;
          const isLandscape = i % 3 === 1;

          return (
            <div 
              key={i} 
              className={`shrink-0 rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_50px_-15px_rgba(245,158,11,0.2)] group/image relative ${
                isLarge 
                  ? "w-[300px] sm:w-[420px] h-[400px] sm:h-[550px] z-10" 
                  : isLandscape 
                    ? "w-[350px] sm:w-[480px] h-[250px] sm:h-[320px] translate-y-8 sm:translate-y-16 z-0" 
                    : "w-[260px] sm:w-[320px] h-[280px] sm:h-[360px] -translate-y-8 sm:-translate-y-12 z-0"
              }`}
            >
              <div className="absolute inset-0 bg-[#0A111F]/10 group-hover/image:bg-transparent transition-colors duration-500 z-10" />
              <img src={src} alt={`Camp memory ${i}`} className="w-full h-full object-cover scale-100 group-hover/image:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>
          );
        })}
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
      className="relative z-10 bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden"
      style={{ fontFamily: '"Inter", sans-serif' }}
    >
      <CampNavbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#0A0A0A]">

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
        <div className="absolute inset-0 bg-[#0A111F]/40 z-0 pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A111F]/30 via-transparent to-[#0A111F] z-0 pointer-events-none" />

        {/* MAIN TITLE BLOCK */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Text Container */}
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center drop-shadow-2xl px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: '"BDSans", sans-serif',
                fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                lineHeight: 1.4,
                textShadow: '0 4px 40px rgba(0,0,0,0.85), 0 2px 12px rgba(0,0,0,0.6)',
                color: 'white',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              O generație mai aproape de cer,{' '}
              <br className="hidden sm:block" />
              mai aproape de oameni{' '}
              <br className="hidden sm:block" />
              și{' '}
              <span style={{ color: '#FA9339' }}>
                mai de folos Împărăției.
              </span>
            </motion.h1>
          </div>
        </motion.div>
        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full bg-black py-3 sm:py-4 border-y border-[#FA9339]/50 z-20">
          <Marquee
            items={Array(10).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="italic font-light">INSPIRE+ CAMP 2026</span>
                <span className="text-[#FA9339]/40">•</span>
                <span className="font-semibold tracking-wider">THE CROSS</span>
              </span>
            ))}
            speed={40}
            separator="•"
            className="py-1"
            itemClassName="text-xs md:text-sm tracking-[0.3em] text-white mr-8"
          />
        </div>
      </section>


      {/* WHAT TO EXPECT (inspire camp) */}
      <CampWhatToExpect />

      <CampAteliere />

      {/* VIZIUNE & ABOUT */}
      <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#FA9339]/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-sm md:text-base tracking-[0.3em] font-bold text-[#FA9339] mb-6">VIZIUNE</h2>
            <h3 className="font-outfit tracking-tight leading-none">
              <span className="block text-3xl sm:text-4xl md:text-5xl text-[#A3A3A3] font-light tracking-[0.15em] uppercase mb-2">The</span>
              <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold italic text-white leading-none" style={{ textShadow: '0 0 60px rgba(232,104,26,0.25)' }}>Cross</span>
            </h3>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="text-[#D4D4D4] leading-relaxed text-base md:text-lg space-y-5">
            <p>
              👑 Titlul taberei <strong className="text-white">inspire+</strong> din acest an este <strong className="text-[#FA9339]">The Cross</strong> și este dedicată celebrării modului în care Dumnezeu a ales să-și exprime dragostea nemărginită pentru noi. Vrem să redescoperim frumusețea, valoarea și profunzimea momentului care a adus cerul mai aproape.
            </p>
            <p>
              🌱 <em>Evenimentele inspire+</em> sunt dedicate tinerilor și adolescenților creștini, care vor să cultive Cultura Împărăției și doresc glorificarea lui Dumnezeu, prin mijloace relevante și creative, depășind barierele confesionale.
            </p>
            <p>
              🎉 În acest scop, pregătim pentru tine ateliere, momente de închinare și devoționale, seminare, activități sportive și recreative. Prin toate, ne dorim să înțelegem tot mai clar care ne este chemarea și cum putem, fiecare dintre noi, să fim mai de folos Împărăției.
            </p>
            <p>
              Vino să cunoști tineri faini, să îți faci prieteni noi și să trăiești o experiență care îți va întări relațiile și credința.
            </p>
            <p className="text-white font-semibold">
              Nu veni singur, adu-ți și un prieten și hai să trăim împreună o tabără de neuitat! 🤩
            </p>
          </motion.div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#0A0A0A] overflow-hidden border-b border-[#FA9339]/10">
        <div className="mb-12 sm:mb-16 text-center px-4 relative z-10">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-outfit tracking-tight text-white mb-4">Amintiri din <span className="italic text-[#FA9339]">anii trecuți</span></motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1} className="text-[#A3A3A3] text-xs tracking-[0.3em] uppercase font-bold">GALERIE FOTO INSPIRE+ CAMP</motion.p>
        </div>

        <PhotoGallery />
      </section>

      {/* PACKING LIST */}
      <section id="packing" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#FA9339]/10 bg-[#0A0A0A]">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl tracking-widest font-serif font-bold text-white mb-16 text-center">
          CE SĂ IEI CU TINE
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {packingList.map((category, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1} className="p-8 rounded-3xl bg-[#121212] hover:bg-[#221508] transition-colors group shadow-sm">
              <div className="text-[#FA9339] mb-8 transform group-hover:scale-110 transition-transform origin-left">{category.icon}</div>
              <h3 className="text-lg font-bold mb-6 pb-4 border-b border-[#FA9339]/15 text-white">{category.title}</h3>
              <ul className="space-y-3">
                {category.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#E0F0F8]">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ COMMUNITY STYLE */}
      <section id="faq" className="py-16 sm:py-24 md:py-32 overflow-hidden border-b border-[#FA9339]/10 bg-[#0A0A0A]">
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-4xl font-outfit tracking-tight mb-4 text-white">Întrebări frecvente</h2>
            <p className="text-[#A3A3A3]">Răspunsuri direct din comunitate.</p>
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
                  className="w-full shrink-0 bg-gradient-to-b from-[#171717]/60 to-[#0A0A0A]/80 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-[#FA9339]/8 shadow-2xl flex flex-col gap-6 mx-auto max-w-2xl relative overflow-hidden group hover:border-[#FA9339]/20 transition-colors"
                >
                  {/* Subtle Top Glow */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FA9339]/20 to-transparent" />

                  {/* User Question */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0 w-12 h-12 md:w-14 md:h-14">
                      <div className="absolute inset-0 bg-[#FA9339]/10 rounded-full blur-md" />
                      <div className="relative w-full h-full rounded-full border border-[#FA9339]/20 bg-gradient-to-br from-[#171717] to-[#0A0A0A] flex items-center justify-center overflow-hidden shadow-inner">
                        <span 
                          className="text-[#D4D4D4] text-2xl md:text-3xl leading-none pt-1" 
                          style={{ fontFamily: '"TheLetterEditorial", "Playfair Display", serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                        >
                          {faq.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-[#D4D4D4] text-sm md:text-base tracking-wide">{faq.user}</span>
                        <span className="text-[#5A3820] text-xs tracking-wider">{faq.time}</span>
                      </div>
                      <p className="text-white text-lg md:text-xl font-outfit font-light leading-snug">{faq.q}</p>
                    </div>
                  </div>

                  {/* Connecting Line & Staff Reply */}
                  <div className="relative ml-6 md:ml-7 pl-8 md:pl-10 mt-2">
                    {/* Glowing Vertical Line */}
                    <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-[#FA9339]/30 via-[#FA9339]/20 to-transparent" />
                    
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0 mt-1">
                        <div className="absolute inset-0 bg-[#FA9339]/20 rounded-full blur-md" />
                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#171717] to-[#0A0A0A] border border-[#FA9339]/30 flex items-center justify-center shadow-lg">
                          <span className="text-[#FA9339] font-outfit tracking-tighter text-[10px] md:text-xs italic font-bold">i+</span>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-xs md:text-sm text-[#FA9339] tracking-wide">inspire+ staff</span>
                          <CheckCircle size={14} className="text-[#FA9339] shrink-0" />
                          <div className="ml-auto px-2.5 py-1 rounded-full bg-[#FA9339]/5 border border-[#FA9339]/20 text-[#FA9339]/80 text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden sm:block backdrop-blur-sm">
                            Răspuns Oficial
                          </div>
                        </div>
                        <p className="text-[#A3A3A3] text-sm md:text-base leading-relaxed font-light">{faq.a}</p>
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
      <section id="give" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#E0873C]/10">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-outfit font-bold tracking-tight text-white mb-12 sm:mb-16 text-center uppercase">
          INFORMAȚII <span className="italic text-[#E0873C]">IMPORTANTE</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
          {/* Registration Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="sm:col-span-12">
            <RegistrationForm />
          </motion.div>

          {/* Location */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="sm:col-span-6 bg-[#121212] shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 hover:bg-[#221508] transition-colors">
            <div>
              <MapPin className="text-[#FA9339] mb-6" size={40} />
              <h3 className="text-2xl font-outfit tracking-tight mb-2 text-white">Locație Tabără</h3>
              <p className="text-[#D4D4D4]">Aici avem un text locația taberei</p>
            </div>
            <a href="https://maps.app.goo.gl/mU8jparFzLbJEbLW8" target="_blank" rel="noopener noreferrer" className="shrink-0 w-16 h-16 rounded-full border border-[#FA9339]/30 flex items-center justify-center hover:border-[#FA9339] hover:text-[#FA9339] transition-colors text-white">
              <Map size={24} />
            </a>
          </motion.div>

          {/* Contact */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3} className="sm:col-span-6 bg-[#121212] shadow-sm p-6 sm:p-8 md:p-12 rounded-3xl hover:bg-[#221508] transition-colors">
            <h3 className="text-2xl font-outfit tracking-tight mb-8 text-white">Contact Oficial</h3>
            <div className="space-y-5">
              <a href="mailto:hello@inspireplus.ro" className="flex items-center gap-4 text-[#D4D4D4] hover:text-[#FA9339] transition-colors font-medium">
                <Mail size={20} className="text-[#FA9339]" /> hello@inspireplus.ro
              </a>
              <a href="tel:+40700000000" className="flex items-center gap-4 text-[#D4D4D4] hover:text-[#FA9339] transition-colors font-medium">
                <Phone size={20} className="text-[#FA9339]" /> +40 700 000 000
              </a>
              <a href="#" className="flex items-center gap-4 text-[#D4D4D4] hover:text-[#FA9339] transition-colors font-medium">
                <AtSign size={20} className="text-[#FA9339]" /> @inspireplus.tm
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA & COUNTDOWN */}
      <section className="relative py-16 sm:py-24 md:py-28 overflow-hidden flex flex-col items-center justify-center text-center bg-[#1A1A1A]">
        {/* Animated Gradient Background matching the darker, moodier image */}
        <div className="absolute inset-0 bg-[#2A1D1A] animate-gradient-move opacity-90" 
             style={{ 
               backgroundImage: `
                 radial-gradient(circle at 0% 50%, #684120 0%, transparent 60%),
                 radial-gradient(circle at 100% 50%, #2A2136 0%, transparent 60%),
                 radial-gradient(circle at 50% 0%, #4A331E 0%, transparent 50%),
                 radial-gradient(circle at 50% 100%, #1D141C 0%, transparent 50%)
               `,
               backgroundSize: '150% 150%' 
             }} />
        
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-5xl">
          <CampRotatingCircle />

          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-outfit tracking-tight mt-8 sm:mt-12 mb-2 leading-none text-white">
            Ne vedem in <br />
            <span className="italic text-[#FA9339]">Tabara!</span>
          </h2>
          <p className="text-xl sm:text-2xl text-[#D4D4D4] mb-8 font-outfit font-light tracking-wide">22-26 iulie</p>

          {/* THE LIVE COUNTDOWN */}
          <CountdownTimer targetDate="2026-07-22T00:00:00" />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#0A0A0A] border-t border-[#FA9339]/15 px-5 sm:px-8 md:px-16 py-10 sm:py-16 flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12">
        <div className="max-w-xs">
          <div className="w-16 h-16 rounded-full border border-[#FA9339]/40 flex items-center justify-center mb-8 hover:border-[#FA9339] hover:text-[#FA9339] transition-colors cursor-pointer text-white">
            <span className="text-current font-outfit tracking-tight text-base leading-none flex items-center">
              <span className="italic tracking-tight">inspire</span>
              <span className="font-sans font-bold text-xs ml-0.5 mt-1">+</span>
            </span>
          </div>
          <p className="text-[#A3A3A3] text-[10px] tracking-[0.3em] font-bold uppercase mb-2">inspire+</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 md:text-right">
          <a href="https://www.instagram.com/inspiretm.community/" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-[#FA9339] text-xs font-bold tracking-widest transition-colors">INSTAGRAM</a>
          <a href="https://www.facebook.com/asociatia.inspire" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-[#FA9339] text-xs font-bold tracking-widest transition-colors">FACEBOOK</a>
          <p className="text-[#A3A3A3] text-xs mt-4">© {new Date().getFullYear()} inspire+</p>
        </div>
      </footer>
    </motion.div>
  );
}
