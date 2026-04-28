import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RotatingCircle from '../components/RotatingCircle';
import Marquee from '../components/Marquee';
import ServicesGrid from '../components/ServicesGrid';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

const workItems = [
  { client: 'American Heart Association', tags: 'Content, Video', title: 'If Not for Farming: How soil can be the foundation for resilience, food and hope' },
  { client: 'Caribbean Development Bank', tags: 'Design, Video, Social', title: 'Advocacy Campaign for Labour Market Differentials in the Caribbean' },
  { client: 'Global Alliance', tags: 'Content, Video, Social, Strategy', title: 'Beacons of Hope: Stories from the Land-Water Nexus' },
];

const sectors = ['Environment', 'Agriculture', 'Development', 'Health', 'Finance', 'Education'];

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="min-h-[80vh] flex flex-col justify-end px-6 md:px-12 max-w-screen-2xl mx-auto pb-16 md:pb-24">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="text-5xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] font-serif leading-[0.88] tracking-tight mt-12 md:mt-24"
        >
          {['A community', 'growing in', 'faith together.'].map((line, i) => (
            <motion.span
              key={line}
              custom={i * 0.1}
              variants={fadeUp}
              className={`block ${i === 2 ? 'italic text-primary-dark' : ''}`}
            >
              {i === 1 && (
                <span className="inline-block w-14 h-14 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-accent mr-4 align-middle" />
              )}
              {line}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="max-w-2xl text-xl md:text-2xl mt-12 text-slate/70 leading-relaxed font-light"
        >
          We are a vibrant Christian community in Timișoara dedicated to inspiring faith, building deep connections, and equipping people to live with purpose.
        </motion.p>
      </section>

      {/* ─── ROTATING CIRCLE ──────────────────────────────── */}
      <section className="bg-white">
        <RotatingCircle />
      </section>

      {/* ─── MARQUEE BANNER "WE WORK ACROSS" ─────────────── */}
      <section className="bg-white py-4 border-t border-b border-slate/10">
        <Marquee
          items={Array(10).fill('WE WORK ACROSS')}
          speed={60}
          separator="•"
          className="py-2"
          itemClassName="text-[10px] font-semibold tracking-[0.3em] text-slate/60 mr-6"
        />
      </section>

      {/* ─── SCROLLING SECTOR WORDS ───────────────────────── */}
      <section className="bg-white py-8 overflow-hidden">
        <Marquee
          items={sectors}
          speed={45}
          separator="●"
          className="py-2"
          itemClassName="text-5xl md:text-7xl lg:text-8xl font-serif text-slate mr-6 [&>span:last-child]:text-accent [&>span:last-child]:text-2xl [&>span:last-child]:align-middle"
        />

        <div className="flex justify-center mt-12">
          <Link
            to="/about"
            className="border border-slate rounded-full px-10 py-4 text-sm tracking-widest font-semibold hover:bg-slate hover:text-primary transition-all duration-300"
          >
            ABOUT US
          </Link>
        </div>
      </section>

      {/* ─── SELECTED WORK ────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-xs font-semibold tracking-[0.3em] mb-16 text-slate/60"
        >
          SELECTED WORK
        </motion.h2>

        <div className="flex flex-col">
          {workItems.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              custom={i * 0.1}
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="group cursor-pointer border-t border-slate/15 pt-8 pb-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3">
                  <p className="text-sm font-semibold text-slate">{item.client}</p>
                  <p className="text-xs text-slate/50 mt-1">{item.tags}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight group-hover:text-accent transition-colors duration-500">
                    {item.title}
                  </h3>
                  <div className="mt-6 overflow-hidden rounded-xl"
                    style={{ maxHeight: 0, transition: 'max-height 0.7s cubic-bezier(0.16,1,0.3,1)' }}
                  >
                  </div>
                </div>
              </div>
              <div
                className="mt-6 overflow-hidden rounded-xl transition-all duration-700 ease-[0.16,1,0.3,1] max-h-0 group-hover:max-h-[360px]"
              >
                <img
                  src={`https://picsum.photos/seed/work${i}/1200/500`}
                  alt=""
                  className="w-full object-cover rounded-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 border-t border-slate/15 pt-8 flex justify-end">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors">
            See all work <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── SERVICES GRID ────────────────────────────────── */}
      <section className="bg-white">
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto py-16">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-2xl md:text-4xl font-serif max-w-3xl leading-relaxed mb-16"
          >
            As a community, we walk alongside you from exploring faith through to deep discipleship and living a life of impact.
          </motion.p>
        </div>
        <ServicesGrid />
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-primary max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-20">
          {[
            {
              quote: 'It has been an immense pleasure working with the team on this project. Their ability to bring stories to life with warmth and professionalism made them an outstanding partner.',
              name: 'Dharini P.',
              role: 'Global Alliance',
            },
            {
              quote: "I'd like to thank you and your team for a great job on our Annual Report. We love the designs and UX, and the whole process was very smooth and professional.",
              name: 'James P.',
              role: 'Global Foundation',
            },
            {
              quote: 'The team gave us new insights on communications, especially in the power of social media, and how to be more strategic in the way we deliver our message.',
              name: 'Izabella K.',
              role: 'International NGO',
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="max-w-4xl"
            >
              <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed text-slate mb-6">
                "{t.quote}"
              </blockquote>
              <footer className="text-sm font-semibold tracking-wider text-slate/60">
                {t.name} — <span className="font-normal">{t.role}</span>
              </footer>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
