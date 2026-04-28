import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="px-6 md:px-12 py-24 max-w-screen-2xl mx-auto min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-serif mb-24"
      >
        Contact Us
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-2xl md:text-4xl text-slate/80 leading-relaxed mb-12 text-balance">
            Interested in working together? Contact us to discover how our team of communication experts can help amplify your impact.
          </p>

          <div className="space-y-8 text-xl font-serif">
            <div>
              <p className="text-sm font-sans font-semibold tracking-wider text-slate/60 mb-2">EMAIL</p>
              <a href="mailto:hello@example.com" className="hover:text-accent transition-colors">hello@example.com</a>
            </div>
            <div>
              <p className="text-sm font-sans font-semibold tracking-wider text-slate/60 mb-2">PHONE</p>
              <a href="tel:+61000000000" className="hover:text-accent transition-colors">+61 000 000 000</a>
            </div>
            <div>
              <p className="text-sm font-sans font-semibold tracking-wider text-slate/60 mb-2">OFFICE</p>
              <p>7 William Street<br/>Coolum Beach, QLD<br/>Australia 4573</p>
            </div>
          </div>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="block text-sm font-semibold tracking-wider mb-2">NAME</label>
            <input type="text" className="w-full bg-transparent border-b border-slate/20 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-semibold tracking-wider mb-2">EMAIL</label>
            <input type="email" className="w-full bg-transparent border-b border-slate/20 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="Your email address" />
          </div>
          <div>
            <label className="block text-sm font-semibold tracking-wider mb-2">MESSAGE</label>
            <textarea className="w-full bg-transparent border-b border-slate/20 py-4 focus:outline-none focus:border-accent transition-colors resize-none" rows={4} placeholder="How can we help you?"></textarea>
          </div>
          <button className="bg-slate text-primary px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-accent hover:text-white transition-colors self-start mt-4">
            SEND MESSAGE
          </button>
        </motion.form>
      </div>
    </div>
  );
}
