import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const navLinks = [
  { label: 'CAMP', href: '#' },
];

const menuSections = {
  Despre: [
    { label: 'Viziune', href: '#about' },
    { label: 'Motive să vii', href: '#reasons' }
  ],
  Detalii: [
    { label: 'Ce te așteaptă', href: '#what-to-expect' },
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
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#353535]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-5">

          {/* Spacer so center element stays truly centered */}
          <div className="w-10 md:w-14" />

          {/* Center: inspire+ text - only when NOT scrolled */}
          <AnimatePresence>
            {!scrolled && (
              <motion.a
                key="center-logo"
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-baseline gap-0.5 text-[#FFFFFF] hover:text-theme-accent transition-colors"
              >
                <span
                  style={{ fontFamily: '"Outfit", sans-serif', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontStyle: 'italic', letterSpacing: '0.02em' }}
                >
                  inspire
                </span>
                <span
                  style={{ fontFamily: '"Inter", sans-serif', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
                >
                  +
                </span>
              </motion.a>
            )}
          </AnimatePresence>

          {/* Right: nav links + hamburger */}
          <div className="flex items-center gap-4 ml-auto">
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-[#D9D9D9] hover:text-[#FFFFFF] text-[11px] font-bold tracking-[0.2em] transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[#D9D9D9] hover:text-[#FFFFFF] text-[11px] font-bold tracking-[0.2em] transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <button
                onClick={() => setMenuOpen(true)}
                className="text-[#FFFFFF] text-[11px] font-bold tracking-[0.2em] border-b-2 border-[#284B63] hover:border-theme-accent hover:text-theme-accent transition-all flex items-center gap-2 pb-0.5"
              >
                MENU
              </button>
            </nav>

            <button
              onClick={() => setMenuOpen(true)}
              className="flex md:hidden text-[#FFFFFF] p-2 -mr-2"
              aria-label="Deschide meniu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#353535] flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Menu header */}
            <div className="flex justify-between items-center px-5 sm:px-8 md:px-16 py-5 border-b border-[#284B63] shrink-0">
              <span className="text-[#D9D9D9] text-xs tracking-widest">NAVIGATION</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[#FFFFFF] hover:text-theme-accent transition-colors p-1"
                aria-label="Închide meniu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Menu sections */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 overflow-y-auto">
              {Object.entries(menuSections).map(([section, links], si) => (
                <motion.div
                  key={section}
                  className="border-b sm:border-b-0 sm:border-r border-[#284B63] last:border-0 px-5 sm:px-8 md:px-12 py-8 md:py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-[#D9D9D9] text-[10px] tracking-[0.25em] font-bold mb-6 md:mb-8">{section.toUpperCase()}</p>
                  <ul className="flex flex-col gap-4 sm:gap-5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[#FFFFFF] text-xl md:text-2xl font-serif hover:text-theme-accent transition-colors"
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
            <div className="px-5 sm:px-8 md:px-16 py-5 border-t border-[#284B63] flex items-center justify-center shrink-0">
              <p className="text-[#D9D9D9] text-xs tracking-widest text-center">INSPIRE+ TIMIȘOARA</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
