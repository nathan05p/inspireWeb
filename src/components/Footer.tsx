import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate text-primary relative overflow-hidden">
      {/* Decorative concentric circles - top right */}
      <div className="absolute top-0 right-0 w-[40%] h-full pointer-events-none opacity-20">
        <svg viewBox="0 0 400 500" className="absolute top-0 right-0 h-full w-full">
          <circle cx="320" cy="120" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
          <circle cx="320" cy="120" r="65" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,7" />
          <circle cx="320" cy="120" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,6" />
          <circle cx="180" cy="280" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,8" />
          <circle cx="180" cy="280" r="50" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,7" />
        </svg>
      </div>

      <div className="relative z-10 px-8 md:px-12 pt-12 pb-10 max-w-screen-2xl mx-auto">
        {/* Top row: Logo */}
        <div className="mb-10">
          <Link to="/" className="inline-block group hover:opacity-70 transition-opacity">
            <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center">
              <span className="text-primary font-serif text-sm leading-none flex items-center">
                <span className="italic tracking-tight">inspire</span>
                <span className="font-sans font-bold text-[10px] ml-0.5 mt-1">+</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Middle row: Subscribe + Red dot + Contact + Social */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Subscribe */}
          <div className="md:col-span-4">
            <h2 className="text-2xl md:text-3xl font-serif text-primary leading-snug mb-8">
              Subscribe for industry insights and latest news.
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-primary/40 pb-2 mb-8 gap-4">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent text-primary text-sm placeholder-primary/50 focus:outline-none"
              />
              <button
                type="submit"
                className="border border-primary/60 rounded-full px-5 py-2 text-xs tracking-widest font-semibold text-primary hover:bg-primary hover:text-slate transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="text-xs text-primary/50 leading-relaxed max-w-sm">
              We acknowledge the Traditional Owners of the land on which our office stands, the Kabi Kabi and Jinibara people, and recognise their continuing connection to land, waters and culture. We pay our respects to their Elders past, present and emerging.
            </p>
          </div>

          {/* Spacer with red dot */}
          <div className="hidden md:flex md:col-span-2 items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-xs tracking-widest font-semibold text-primary/50 mb-5">CONTACT US</p>
            <address className="not-italic text-sm text-primary leading-relaxed mb-5">
              7 William Street<br />
              Coolum Beach, QLD<br />
              Australia 4573
            </address>
            <a href="mailto:hello@example.com" className="block text-sm text-primary underline hover:text-accent transition-colors mb-2">
              hello@example.com
            </a>
            <a href="tel:+61000000000" className="block text-sm text-primary hover:text-accent transition-colors">
              +61 000 000 000
            </a>
          </div>

          {/* Follow */}
          <div className="md:col-span-3">
            <p className="text-xs tracking-widest font-semibold text-primary/50 mb-5">FOLLOW US</p>
            <div className="flex gap-3 mb-8">
              <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center hover:border-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-primary">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center hover:border-primary transition-colors">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-primary">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <Link to="#" className="block text-sm text-primary underline hover:text-accent transition-colors">
              Vacancies
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-primary/40 gap-2">
          <p>© {new Date().getFullYear()} inspire+ Timișoara · Created for the community.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
