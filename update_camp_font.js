const fs = require('fs');
const path = 'e:\\inspireWeb-main\\inspireWeb-main\\src\\pages\\camp\\Camp.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Replace font-pavot with font-outfit
code = code.replace(/font-pavot/g, 'font-outfit tracking-tight'); // Added tracking-tight for a more modern look

// 2. Add SplashScreen component before Camp component
const splashScreenCode = `
function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling while splash is visible
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 2000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1E22]"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-stone-200 tracking-wider">
              <span className="italic">inspire</span><span className="text-[#E54B4B] font-normal">+</span>
            </h1>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "4rem", opacity: 0.5 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
              className="h-[1px] bg-stone-500 mt-5"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

`;

code = code.replace('export default function Camp() {', splashScreenCode + 'export default function Camp() {');

// 3. Add <SplashScreen /> inside the return of Camp
code = code.replace(/<CampNavbar \/>/g, '<SplashScreen />\n      <CampNavbar />');

fs.writeFileSync(path, code);
console.log("Updated font and added splash screen");
