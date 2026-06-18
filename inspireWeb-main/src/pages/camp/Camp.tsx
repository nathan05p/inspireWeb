import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import {
  MapPin, Mail, Phone, CheckCircle,
  Map, ChevronLeft, ChevronRight, Home
} from 'lucide-react';
import CampNavbar from './CampNavbar';
import Marquee from '../../components/Marquee';
import RegistrationForm from '../../components/RegistrationForm';
import CampAteliere from './CampAteliere';
import CampWhatToExpect from './CampWhatToExpect';
import InteractiveBackground from '../../components/InteractiveBackground';


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay }
  })
};





const faqs = [
  {
    user: "Andrei M.", time: "acum 2 ore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrei",
    q: "Ce este inclus în prețul taberei?",
    a: "Prețul de 290 lei include doar înscrierea și participarea în tabără, precum și toate activitățile desfășurate. Nu sunt incluse mâncarea și transportul până în tabără."
  },
  {
    user: "Elena", time: "acum 5 ore", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    q: "Ce echipamente ar trebui să aduc cu mine?",
    a: "Pentru a te pregăti pentru tabăra The Cross, nu uita să aduci cu tine cort, sac de dormit și izopren, iar pentru nopțile friguoase, asigură-te că ai haine mai groase. Aceste echipamente te vor ajuta să te simți confortabil și protejat în timpul șederii tale."
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
          <text className="text-[8px] font-bold tracking-[0.2em] uppercase" fill="#FFFFFF">
            <textPath href="#textPathCamp" startOffset="0%">
              • THE CROSS • INSPIRE+ • THE CROSS • INSPIRE+ 
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

import photo1 from "../../assets/gallery/photo_1.jpg";
import photo2 from "../../assets/gallery/photo_2.jpg";
import photo3 from "../../assets/gallery/photo_3.jpg";
import photo4 from "../../assets/gallery/photo_4.jpg";
import photo5 from "../../assets/gallery/photo_5.jpg";
import photo7 from "../../assets/gallery/photo_7.jpg";
import photo8 from "../../assets/gallery/photo_8.jpg";
import photo9 from "../../assets/gallery/photo_9.jpg";
import photo10 from "../../assets/gallery/photo_10.jpg";
import photo11 from "../../assets/gallery/photo_11.jpg";
import photo12 from "../../assets/gallery/photo_12.jpg";
import photo13 from "../../assets/gallery/photo_13.jpg";
import photo14 from "../../assets/gallery/photo_14.jpg";
import photo15 from "../../assets/gallery/photo_15.jpg";
import photo16 from "../../assets/gallery/photo_16.jpg";
import photo17 from "../../assets/gallery/photo_17.jpg";
import photo18 from "../../assets/gallery/photo_18.jpg";
import photo19 from "../../assets/gallery/photo_19.jpg";
import photo20 from "../../assets/gallery/photo_20.jpg";
import photo21 from "../../assets/gallery/photo_21.jpg";

function PhotoGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Refs for drag-to-scroll functionality
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const images = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo7,
    photo8,
    photo9,
    photo10,
    photo11,
    photo12,
    photo13,
    photo14,
    photo15,
    photo16,
    photo17,
    photo18,
    photo19,
    photo20,
    photo21,
  ];

  // Duplicate the array multiple times to simulate infinite scroll
  const galleryItems = [...images, ...images, ...images, ...images, ...images, ...images];

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      // Pause auto-scroll when hovered or actively dragging
      if (scrollRef.current && !isHovered && !isDraggingRef.current) {
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

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
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
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-4 sm:gap-8 overflow-x-auto px-4 sm:px-12 py-12 md:py-20 items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing select-none"
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
              <img src={src} alt={`Camp memory ${i}`} className="w-full h-full object-cover scale-100 group-hover/image:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" loading="lazy" decoding="async" />
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
      <section ref={heroRef} className="relative z-10 h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#1A0B05]">

        {/* INTERACTIVE BACKGROUND */}
        <InteractiveBackground />

        {/* MAIN TITLE BLOCK */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' as const }}
        >
          {/* Text Container */}
          <div className="max-w-5xl mx-auto flex flex-col items-center justify-center drop-shadow-2xl px-4 text-center -mt-16 sm:-mt-24">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' as const }}
              style={{
                fontFamily: '"BDSans", sans-serif',
                fontSize: 'clamp(0.95rem, 3vw, 1.8rem)',
                lineHeight: 1.4,
                textShadow: '0 4px 40px rgba(0,0,0,0.85), 0 2px 12px rgba(0,0,0,0.6)',
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              MAI APROAPE DE CER,<br/>
              MAI APROAPE DE <br/>
              OAMENI <br/>
              ȘI MAI DE FOLOS <br/>
              <span className="text-[#FA9339]">ÎMPĂRĂȚIEI</span>
            </motion.h1>
          </div>
        </motion.div>
        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full bg-black py-3 sm:py-4 border-t border-t-[#1A0B05] border-b border-b-[#0A0A0A] z-20">
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

      {/* THE CROSS / ABOUT */}
      <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[#FA9339]/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex justify-center lg:justify-start">
            <h3 className="font-outfit tracking-tight leading-none w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
              <img src="/logoCamp.png" alt="The Cross" className="w-full h-auto object-contain drop-shadow-2xl" />
            </h3>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2} className="text-[#D4D4D4] leading-relaxed text-base md:text-lg space-y-5">
            <p>
              Titlul taberei <strong className="text-white">inspire+</strong> din acest an este <strong className="text-[#FA9339]">The Cross</strong> și este dedicată celebrării modului în care Dumnezeu a ales să-și exprime dragostea nemărginită pentru noi. 
              Vrem să redescoperim frumusețea, valoarea și profunzimea momentului care a adus cerul mai aproape de noi și ne-a deschis calea înapoi spre Dumnezeu.
            </p>
            <p>
              Vino să cunoști tineri faini, să îți faci prieteni noi și să trăiești o experiență care îți va întări relațiile și credința.
            </p>
            <p className="text-white font-semibold">
              Nu veni singur, adu-ți și un prieten și hai să trăim împreună o tabără de neuitat!
            </p>
          </motion.div>
        </div>
      </section>

      <CampAteliere />

      {/* PHOTO GALLERY */}
      <section className="py-16 sm:py-24 md:py-32 relative z-10 bg-transparent overflow-hidden border-b border-[#FA9339]/10">
        <div className="mb-12 sm:mb-16 text-center px-4 relative z-10">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-outfit tracking-tight text-white mb-4">Amintiri din <span className="italic text-[#FA9339]">anii trecuți</span></motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1} className="text-[#A3A3A3] text-xs tracking-[0.3em] uppercase font-bold">GALERIE FOTO INSPIRE+ CAMP</motion.p>
        </div>

        <PhotoGallery />
      </section>



      {/* FAQ COMMUNITY STYLE */}
      <section id="faq" className="py-16 sm:py-24 md:py-32 overflow-hidden border-b border-[#FA9339]/10 relative z-10 bg-transparent">
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-4xl font-outfit tracking-tight mb-4 text-white">Întrebări frecvente</h2>
            <p className="text-[#A3A3A3]">Răspunsuri direct din comunitate.</p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 w-full relative z-10">
          {/* FAQ VERTICAL WHEEL STYLE */}
          <div className="relative w-full max-w-3xl mx-auto h-[380px] sm:h-[600px] px-4 sm:px-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
            {/* Scrollable Container */}
            <div 
              ref={faqScrollRef}
              onMouseEnter={() => setIsFaqHovered(true)}
              onMouseLeave={() => setIsFaqHovered(false)}
              onTouchStart={() => setIsFaqHovered(true)}
              onTouchEnd={() => setIsFaqHovered(false)}
              data-lenis-prevent="true"
              className="absolute inset-0 overflow-y-auto flex flex-col gap-4 sm:gap-6 px-2 sm:px-4 py-8 sm:py-16 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {Array(6).fill(faqs).flat().map((faq, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 bg-gradient-to-b from-[#2A211D]/80 to-[#171717]/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-[#FA9339]/8 shadow-2xl flex flex-col gap-4 sm:gap-6 mx-auto max-w-2xl relative overflow-hidden group hover:border-[#FA9339]/20 transition-colors"
                >
                  {/* Subtle Top Glow */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FA9339]/20 to-transparent" />

                  {/* User Question */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
                      <div className="absolute inset-0 bg-[#FA9339]/10 rounded-full blur-md" />
                      <div className="relative w-full h-full rounded-full border border-[#FA9339]/20 bg-gradient-to-br from-[#171717] to-[#0A0A0A] flex items-center justify-center overflow-hidden shadow-inner">
                        <span 
                          className="text-[#D4D4D4] text-xl sm:text-2xl md:text-3xl leading-none pt-1" 
                          style={{ fontFamily: '"TheLetterEditorial", "Playfair Display", serif', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                        >
                          {faq.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1 w-full">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="font-medium text-[#D4D4D4] text-xs sm:text-sm md:text-base tracking-wide">{faq.user}</span>
                      </div>
                      <p className="text-white text-base sm:text-lg md:text-xl font-outfit font-light leading-snug">{faq.q}</p>
                    </div>
                  </div>

                  {/* Connecting Line & Staff Reply */}
                  <div className="relative ml-5 sm:ml-6 md:ml-7 pl-6 sm:pl-8 md:pl-10 mt-1 sm:mt-2">
                    {/* Glowing Vertical Line */}
                    <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-[#FA9339]/30 via-[#FA9339]/20 to-transparent" />
                    
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="relative shrink-0 mt-1">
                        <div className="absolute inset-0 bg-[#FA9339]/20 rounded-full blur-md" />
                        <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#171717] to-[#0A0A0A] border border-[#FA9339]/30 flex items-center justify-center shadow-lg">
                          <span className="text-[#FA9339] font-outfit tracking-tighter text-[9px] sm:text-[10px] md:text-xs italic font-bold">i+</span>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                          <span className="font-semibold text-[10px] sm:text-xs md:text-sm text-[#FA9339] tracking-wide">inspire+ staff</span>
                          <CheckCircle size={12} className="text-[#FA9339] shrink-0 sm:w-[14px] sm:h-[14px]" />
                          <div className="ml-auto px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FA9339]/5 border border-[#FA9339]/20 text-[#FA9339]/80 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest hidden xs:block backdrop-blur-sm">
                            Răspuns Oficial
                          </div>
                        </div>
                        <p className="text-[#A3A3A3] text-xs sm:text-sm md:text-base leading-relaxed font-light">{faq.a}</p>
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
      <section id="give" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
          {/* Registration Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="sm:col-span-12">
            <RegistrationForm />
          </motion.div>

          {/* Cabin Accommodation Info - Small Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="sm:col-span-12 bg-[#121212] border border-[#FA9339]/20 shadow-sm p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mt-4 mb-2 hover:bg-[#221508] transition-colors">
            <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 bg-[#1A1A1A] rounded-2xl flex items-center justify-center shrink-0 border border-[#262626]">
                <Home className="text-[#FA9339]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-outfit tracking-tight mb-1 text-white">Cazarea la Cabană</h3>
                <p className="text-[#D4D4D4] text-sm md:text-base leading-relaxed">
                  Dacă dorești informații despre posibilitatea cazării la cabane, te rugăm să ne contactezi la numărul de telefon alăturat.
                </p>
              </div>
            </div>
            <a href="tel:+40726606501" className="shrink-0 flex items-center justify-center gap-2 bg-[#FA9339]/10 text-[#FA9339] px-6 py-4 rounded-xl font-bold hover:bg-[#FA9339]/20 transition-colors border border-[#FA9339]/20 w-full md:w-auto">
              <Phone size={18} /> +40 726 606 501
            </a>
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
            <h3 className="text-2xl font-outfit tracking-tight mb-8 text-white">Contact</h3>
            <div className="space-y-5">
              <a href="mailto:office@inspiretm.org" className="flex items-center gap-4 text-[#D4D4D4] hover:text-[#FA9339] transition-colors font-medium">
                <Mail size={20} className="text-[#FA9339]" /> office@inspiretm.org
              </a>
              <a href="tel:0767031518" className="flex items-center gap-4 text-[#D4D4D4] hover:text-[#FA9339] transition-colors font-medium">
                <Phone size={20} className="text-[#FA9339]" /> 0767 031 518
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

        {/* Gradient transition from the section above */}
        <div className="absolute top-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-transparent to-[#0A0A0A] pointer-events-none z-0" />

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

        {/* Gradient transition to footer */}
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-b from-transparent to-[#141414] pointer-events-none z-10" />
      </section>

      {/* FOOTER */}
      <footer id="contact" className="relative z-10 w-full bg-[#141414] py-8 sm:py-16 px-4 sm:px-12 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2 sm:gap-4 md:gap-0">
          
          {/* LEFT: INSTAGRAM */}
          <div className="flex-1 flex justify-start">
            <a href="https://www.instagram.com/inspiretm.community/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 text-white hover:text-[#FA9339] transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:scale-110 transition-transform sm:w-[32px] sm:h-[32px]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span className="hidden xs:block text-[10px] sm:text-[15px] font-outfit font-light tracking-[0.1em] sm:tracking-[0.2em] uppercase">INSTAGRAM</span>
            </a>
          </div>

          {/* CENTER: LOGO & COPYRIGHT */}
          <div className="flex-1 flex flex-col items-center justify-center gap-1 sm:gap-3">
            <h2 className="text-white flex items-baseline justify-center gap-0.5 transition-colors">
              <span style={{ fontFamily: '"League Spartan", sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontStyle: 'normal', letterSpacing: '0.02em' }}>
                inspire
              </span>
              <span style={{ fontFamily: '"League Spartan", sans-serif', fontWeight: 'normal', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
                +
              </span>
            </h2>
            <p className="text-[#666666] text-[9px] sm:text-xs md:text-sm font-outfit tracking-wider text-center">
              © 2026 inspire+
            </p>
          </div>

          {/* RIGHT: FACEBOOK */}
          <div className="flex-1 flex justify-end">
            <a href="https://www.facebook.com/asociatia.inspire" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 text-white hover:text-[#FA9339] transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 group-hover:scale-110 transition-transform text-white group-hover:text-[#FA9339] sm:w-[32px] sm:h-[32px]">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="hidden xs:block text-[10px] sm:text-[15px] font-outfit font-light tracking-[0.1em] sm:tracking-[0.2em] uppercase">FACEBOOK</span>
            </a>
          </div>

        </div>
      </footer>

      {/* Side gradients stretching full height of the page, acting as subtle background touches */}
      <motion.div className="absolute top-0 bottom-0 left-0 w-[10vw] sm:w-24 md:w-32 lg:w-48 pointer-events-none z-0"
           animate={{
             filter: ['hue-rotate(0deg)', 'hue-rotate(20deg)', 'hue-rotate(-10deg)', 'hue-rotate(0deg)'],
             opacity: [0.8, 1.3, 0.8]
           }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           style={{
             background: 'linear-gradient(to right, rgba(104, 65, 32, 0.25) 0%, transparent 100%)',
             mixBlendMode: 'screen'
           }} />
      <motion.div className="absolute top-0 bottom-0 right-0 w-[10vw] sm:w-24 md:w-32 lg:w-48 pointer-events-none z-0"
           animate={{
             filter: ['hue-rotate(0deg)', 'hue-rotate(-20deg)', 'hue-rotate(10deg)', 'hue-rotate(0deg)'],
             opacity: [1.3, 0.8, 1.3]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           style={{
             background: 'linear-gradient(to left, rgba(42, 33, 54, 0.25) 0%, transparent 100%)',
             mixBlendMode: 'screen'
           }} />
    </motion.div>
  );
}
