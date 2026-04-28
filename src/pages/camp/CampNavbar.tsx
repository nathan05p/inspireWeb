import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'COMUNITATE', href: '/home' },
  { label: 'CAMP', href: '#' },
];

const menuSections = {
  Despre: [
    { label: 'Tema Anului', href: '#about' },
    { label: 'Motive să vii', href: '#reasons' }
  ],
  Detalii: [
    { label: 'Ce te așteaptă', href: '#conference' },
    { label: 'Ce să iei cu tine', href: '#packing' }
  ],
  Logistică: [
    { label: 'Informații Importante', href: '#give' },
    { label: 'Întrebări Frecvente', href: '#faq' }
  ],
  Contact: [
    { label: 'Contact Oficial', href: '#contact' },
    { label: 'Înscriere', href: '#give' }
  ],
};

export default function CampNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-5">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/home" className="group">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-stone-900 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-stone-900">
                <span className="text-current font-serif text-xs sm:text-sm leading-none flex items-center">
                  <span className="italic tracking-tight">inspire</span>
                  <span className="font-sans font-bold text-[9px] sm:text-[10px] ml-0.5 mt-1">+</span>
                </span>
              </div>
            </Link>
            <Link to="/home" className="text-stone-500 text-[10px] font-bold tracking-[0.2em] hover:text-stone-900 transition-colors hidden md:block uppercase">
              ← Pagina Oficială
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-stone-600 hover:text-stone-900 text-[11px] font-bold tracking-[0.2em] transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-stone-600 hover:text-stone-900 text-[11px] font-bold tracking-[0.2em] transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-stone-900 text-[11px] font-bold tracking-[0.2em] border-b-2 border-stone-900 hover:border-amber-500 hover:text-amber-500 transition-all flex items-center gap-2 pb-0.5"
            >
              MENU
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-stone-900 p-2 -mr-2"
            aria-label="Deschide meniu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#faf8f5] flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Menu header */}
            <div className="flex justify-between items-center px-5 sm:px-8 md:px-16 py-5 border-b border-stone-200 shrink-0">
              <span className="text-stone-400 text-xs tracking-widest">NAVIGATION</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-stone-900 hover:text-amber-500 transition-colors p-1"
                aria-label="Închide meniu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Menu sections — 1 col on mobile, 2 on sm, 4 on md+ */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 overflow-y-auto">
              {Object.entries(menuSections).map(([section, links], si) => (
                <motion.div
                  key={section}
                  className="border-b sm:border-b-0 sm:border-r border-stone-200 last:border-0 px-5 sm:px-8 md:px-12 py-8 md:py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-stone-400 text-[10px] tracking-[0.25em] font-bold mb-6 md:mb-8">{section.toUpperCase()}</p>
                  <ul className="flex flex-col gap-4 sm:gap-5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-stone-900 text-xl md:text-2xl font-serif hover:text-amber-500 transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Menu footer */}
            <div className="px-5 sm:px-8 md:px-16 py-5 border-t border-stone-200 flex items-center justify-between shrink-0">
              <p className="text-stone-400 text-xs tracking-widest">INSPIRE+ TIMIȘOARA</p>
              <Link
                to="/home"
                className="text-amber-500 text-xs tracking-widest font-bold hover:text-amber-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                CĂTRE COMUNITATE →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
