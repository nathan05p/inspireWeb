import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'WORK', href: '/home/work' },
  { label: 'SERVICES', href: '/home/services' },
  { label: 'ABOUT', href: '/home/about' },
  { label: 'INSIGHTS', href: '/home/insights' },
  { label: 'CAMP', href: '/' },
];

const menuSections = {
  Featured: ['Sermons', 'Events', 'Small Groups', 'Kids'],
  Details: ['Schedule', 'Location', 'Worship', 'Team'],
  'Events': ['Sunday Service', 'Youth', 'Camp', 'Global'],
  'The Movement': ['About Us', 'Values', 'Vision', 'Give'],
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <div className="flex items-center gap-6">
            <Link to="/home" className="group">
              <div className="w-14 h-14 rounded-full border border-stone-900 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-stone-900">
                <span className="text-current font-serif text-sm leading-none flex items-center">
                  <span className="italic tracking-tight">inspire</span>
                  <span className="font-sans font-bold text-[10px] ml-0.5 mt-1">+</span>
                </span>
              </div>
            </Link>
            <Link to="/" className="text-stone-500 text-[10px] font-bold tracking-[0.2em] hover:text-stone-900 transition-colors hidden md:block uppercase">
              ← TABĂRA INSPIRE+
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

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-stone-900">
            <Menu size={24} />
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
            <div className="flex justify-between items-center px-8 md:px-16 py-6 border-b border-stone-200">
              <span className="text-stone-400 text-xs tracking-widest">NAVIGATION</span>
              <button onClick={() => setMenuOpen(false)} className="text-stone-900 hover:text-amber-500 transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-0 overflow-y-auto">
              {Object.entries(menuSections).map(([section, links], si) => (
                <motion.div
                  key={section}
                  className="border-r border-stone-200 last:border-r-0 px-8 md:px-12 py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-stone-400 text-[10px] tracking-[0.25em] font-bold mb-8">{section.toUpperCase()}</p>
                  <ul className="flex flex-col gap-5">
                    {links.map((link) => (
                      <li key={link}>
                        <Link
                          to={`/home/${link.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-stone-900 text-xl md:text-2xl font-serif hover:text-amber-500 transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="px-8 md:px-16 py-6 border-t border-stone-200 flex items-center justify-between">
              <p className="text-stone-400 text-xs tracking-widest">INSPIRE+ COMMUNITY</p>
              <Link
                to="/home/about"
                onClick={() => setMenuOpen(false)}
                className="text-amber-500 text-xs tracking-widest font-bold hover:text-amber-600 transition-colors"
              >
                VISIT OFFICIAL SITE →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
