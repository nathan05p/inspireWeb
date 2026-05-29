import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (status === 'success') {
      setIsSuccess(true);
      setPaymentStatus('success');
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'cancel') {
      setPaymentStatus('cancel');
      setStep(2); // Keep them on the payment step to try again
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const [formData, setFormData] = useState({
    nume: '',
    varsta: '',
    telefon: '',
    email: '',
    transport: 'Masina personala',
    cazareCabana: false,
    plata: 'integral',
    zile: 'toate',
    zileAlese: [] as string[],
    acordRegulament: false,
    cardNumber: '',
    expDate: '',
    cvc: '',
    country: 'Romania'
  });

  const resetForm = () => {
    setFormData({
      nume: '',
      varsta: '',
      telefon: '',
      email: '',
      transport: 'Masina personala',
      cazareCabana: false,
      plata: 'integral',
      zile: 'toate',
      zileAlese: [],
      acordRegulament: false,
      cardNumber: '',
      expDate: '',
      cvc: '',
      country: 'Romania'
    });
    setStep(1);
    setIsSuccess(false);
    setPaymentStatus(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDayToggle = (zi: string) => {
    setFormData(prev => ({
      ...prev,
      zileAlese: prev.zileAlese.includes(zi)
        ? prev.zileAlese.filter(z => z !== zi)
        : [...prev.zileAlese, zi]
    }));
  };

  const calculateTotal = () => {
    // Prețuri de bază, vor putea fi modificate ulterior
    const PRET_INTEGRAL = 450;
    const PRET_ZI = 0; // Pretul inca ramane de vazut
    const AVANS = 150;

    if (formData.plata === 'avans') return AVANS;
    if (formData.zile === 'toate') return PRET_INTEGRAL;
    if (formData.zile === 'mai_putine') return formData.zileAlese.length * PRET_ZI;

    return 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acordRegulament) {
      alert("Te rugăm să fii de acord cu regulamentul.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'A apărut o eroare la crearea sesiunii de plată.');
      }

      const { url } = await response.json();
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err: any) {
      alert(err.message || 'Eroare la procesarea plății. Te rugăm să încerci din nou.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#22272B] border border-stone-800/50 p-8 md:p-12 rounded-3xl text-center shadow-xl flex flex-col items-center">
        <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mb-6">
          <Check size={40} className="text-[#1A1E22]" />
        </div>
        <h3 className="text-3xl font-outfit tracking-tight text-stone-50 mb-4">Înscriere Finalizată!</h3>
        <p className="text-stone-400 mb-8">Te-ai înscris cu succes. Tranzacția a fost procesată securizat și vei primi un email de confirmare în curând.</p>
        
        <button 
          onClick={resetForm}
          className="bg-[#1A1E22] hover:bg-stone-800 text-stone-300 px-6 py-3 rounded-xl font-bold transition-colors border border-stone-700"
        >
          Înregistrează altă persoană
        </button>

        <p className="text-stone-500 text-xs mt-8">Securizat prin Stripe. Îți mulțumim!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#22272B] border border-stone-800/50 p-6 sm:p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl">
      <h3 className="text-3xl font-outfit tracking-tight mb-8 text-stone-50">Înscrieri</h3>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-[#1A1E22]'}`} />
        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-[#1A1E22]'}`} />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            onSubmit={handleNext}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-400">Numele tău</label>
                <input required type="text" name="nume" value={formData.nume} onChange={handleChange} className="w-full bg-[#1A1E22] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-400">Vârsta ta</label>
                <input required type="number" name="varsta" value={formData.varsta} onChange={handleChange} className="w-full bg-[#1A1E22] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-400">Numărul de telefon</label>
                <input required type="tel" name="telefon" value={formData.telefon} onChange={handleChange} className="w-full bg-[#1A1E22] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-400">Adresa de Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#1A1E22] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-400">Modalitate de Transport</label>
              <select name="transport" value={formData.transport} onChange={handleChange} className="w-full bg-[#1A1E22] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                <option value="Masina personala">Mașină personală</option>
                <option value="Caut loc">Caut un loc în mașină</option>
                <option value="Descurcaret">Ma descurc</option>
              </select>
            </div>

            <div className="pt-4 pb-2 border-t border-stone-800/50">
              <label className="flex items-start gap-3 cursor-pointer group w-fit">
                <div className="relative flex items-center justify-center w-6 h-6 mt-0.5 rounded border border-stone-700 bg-[#1A1E22] group-hover:border-amber-500 transition-colors shrink-0">
                  <input type="checkbox" name="cazareCabana" checked={formData.cazareCabana} onChange={handleChange} className="peer sr-only" />
                  <Check size={14} className={`text-amber-500 transition-opacity ${formData.cazareCabana ? 'opacity-100' : 'opacity-0'}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-stone-300">Cazare la cabane (opțional)</p>
                  <p className="text-xs text-stone-500">Doresc informații despre posibilitatea cazării la cabane.</p>
                </div>
              </label>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="flex items-center gap-2 bg-amber-500 text-stone-900 px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition-colors">
                Mergi mai departe <ChevronRight size={18} />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-400">Metodă de plată</label>
              <select name="plata" value={formData.plata} onChange={handleChange} className="w-full bg-[#1A1E22] border border-stone-800 rounded-xl px-4 py-3 text-stone-200 focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                <option value="integral">Vreau să plătesc integral (450 RON)</option>
                <option value="avans">Vreau să plătesc avans (150 RON)</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-stone-400">Participarea în Tabără *</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 cursor-pointer w-fit">
                  <input type="radio" name="zile" value="toate" checked={formData.zile === 'toate'} onChange={handleChange} className="accent-amber-500 w-4 h-4" />
                  <span className="text-stone-300 text-sm font-medium">Particip toată tabăra (6 zile)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer w-fit">
                  <input type="radio" name="zile" value="mai_putine" checked={formData.zile === 'mai_putine'} onChange={handleChange} className="accent-amber-500 w-4 h-4" />
                  <span className="text-stone-300 text-sm font-medium">Vin mai puține zile</span>
                </label>
              </div>

              <AnimatePresence>
                {formData.zile === 'mai_putine' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 overflow-hidden"
                  >
                    <label className="text-sm font-bold text-stone-400 block mb-3">Alege zilele în care vei fi în tabără *</label>
                    <div className="flex flex-wrap gap-4">
                      {['Marți', 'Mie.', 'Joi', 'Vin.', 'Sâm', 'Dum.'].map(zi => (
                        <label key={zi} className="flex items-center gap-2 cursor-pointer">
                          <div className="relative flex items-center justify-center w-5 h-5 rounded border border-stone-700 bg-[#1A1E22] hover:border-amber-500 transition-colors shrink-0">
                            <input
                              type="checkbox"
                              checked={formData.zileAlese.includes(zi)}
                              onChange={() => handleDayToggle(zi)}
                              className="peer sr-only"
                            />
                            <Check size={12} className={`text-amber-500 transition-opacity ${formData.zileAlese.includes(zi) ? 'opacity-100' : 'opacity-0'}`} />
                          </div>
                          <span className="text-stone-300 text-sm font-medium">{zi}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="py-6 border-y border-stone-800/50 flex justify-between items-center">
              <span className="text-3xl font-bold text-amber-500">{calculateTotal()}.00</span>
              <span className="text-stone-400 font-bold">RON</span>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group w-fit">
              <div className="relative flex items-center justify-center w-6 h-6 mt-0.5 rounded border border-stone-700 bg-[#1A1E22] group-hover:border-amber-500 transition-colors shrink-0">
                <input type="checkbox" required name="acordRegulament" checked={formData.acordRegulament} onChange={handleChange} className="peer sr-only" />
                <Check size={14} className={`text-amber-500 transition-opacity ${formData.acordRegulament ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <span className="text-sm text-stone-300 pt-0.5">Am citit și sunt de acord cu <button type="button" onClick={() => setIsModalOpen(true)} className="text-amber-500 font-bold hover:underline">REGULAMENTUL</button> taberei.</span>
            </label>

            {/* Alert for Cancelled Payment */}
            {paymentStatus === 'cancel' && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3 text-red-200 text-sm">
                <AlertTriangle className="shrink-0 text-red-500 mt-0.5" size={18} />
                <div>
                  <p className="font-bold">Plata a fost anulată</p>
                  <p className="text-red-300/80 text-xs">Tranzacția nu a fost finalizată și nu s-au retras bani de pe card. Te poți înregistra din nou folosind formularul de mai jos.</p>
                </div>
              </div>
            )}

            {/* Secure Stripe Checkout Info Summary */}
            <div className="bg-[#1A1E22] border border-stone-800 p-6 rounded-xl space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Sumar Înscriere</span>
                <span className="text-xs text-amber-500 font-bold flex items-center gap-1.5"><CreditCard size={14} /> Securizat prin Stripe</span>
              </div>
              
              <div className="space-y-2 text-sm text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-500">Nume Participant:</span>
                  <span className="font-semibold text-stone-200">{formData.nume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Email:</span>
                  <span className="font-semibold text-stone-200">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Telefon:</span>
                  <span className="font-semibold text-stone-200">{formData.telefon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Cazare cabană:</span>
                  <span className="font-semibold text-stone-200">{formData.cazareCabana ? 'Da' : 'Nu'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Zile Participare:</span>
                  <span className="font-semibold text-stone-200">
                    {formData.zile === 'toate' ? 'Toată tabăra (6 zile)' : `Zile specifice (${formData.zileAlese.join(', ')})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Tip Plată:</span>
                  <span className="font-semibold text-amber-500">
                    {formData.plata === 'avans' ? 'Avans (Se achită acum 150 RON)' : 'Integral (Se achită acum 450 RON)'}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-stone-500 pt-2 leading-relaxed">
                Prin apăsarea butonului de înscriere de mai jos, vei fi redirecționat securizat către pagina de plată **Stripe** pentru a introduce datele cardului. După finalizarea plății, vei fi trimis înapoi pe acest site și înscrierea ta va fi salvată automat.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between pt-4 gap-4">
              <button type="button" onClick={handlePrev} className="flex items-center justify-center gap-2 text-stone-400 hover:text-stone-200 px-4 py-4 font-bold transition-colors">
                <ChevronLeft size={18} /> Pasul Anterior
              </button>
              <button disabled={isSubmitting} type="submit" className="flex items-center justify-center gap-2 bg-amber-500 text-stone-900 px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
                {isSubmitting ? 'Se procesează...' : 'Înscrie-te în tabără!'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Modal Regulament */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#22272B] border border-stone-800/50 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-outfit font-bold text-amber-500 mb-2">Avem standarde, nu reguli!</h3>
              <p className="text-stone-400 text-sm mb-6">
                Fiecare participant al taberei Inspire+ 2026 își asumă faptul că va respecta următoarele standarde:
              </p>
              <div className="space-y-4 text-stone-300 text-sm leading-relaxed">
                <ul className="space-y-4">
                  {[
                    "Toţi participanţii sunt aşteptaţi să fie prezenţi la programele plenare.",
                    "Părăsirea locaţiei nu se poate face fără înştiinţarea liderilor şi doar în scopuri legitime şi convenite în prealabil.",
                    "Consumul de alcool, droguri şi tigări este interzis!",
                    "Folosirea echipamentelor și a instrumentelor este interzisă fără acordul liderilor.",
                    "Decenţa este cuvântul cheie: în îmbrăcăminte, în vorbire, în comportament.",
                    "Exprimarea afecţiunii între tinerii necăsătoriţi este interzisă.",
                    "Se aşteaptă ca programul taberei să fie respectat. Orele de linişte anunţate zilnic sunt obligatorii!",
                    "Toţi participanţii își asumă faptul că vor urma toate regulile de bună desfaşurare a taberei anunţate în cadrul acesteia.",
                    "Pentru buna desfăşurare a taberei nu vom ezita excluderea celor care încalcă regulamentul!",
                    "Participarea se face în urma acceptării tuturor termenilor și condițiilor prezentate mai sus."
                  ].map((rule, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-amber-500 font-bold shrink-0 mt-0.5">{String(idx + 1).padStart(2, '0')}.</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-[#1A1E22] rounded-xl border-l-4 border-amber-500 text-stone-400 text-xs leading-relaxed">
                  <span className="font-bold text-stone-200">NOTĂ ADIŢIONALĂ: </span>
                  Nerespectarea regulilor şi îndrumărilor liderilor, urmată de un eventual accident, nu va atrage responsabilitatea organizatorilor.
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#1A1E22] text-stone-300 px-6 py-3 rounded-xl font-bold hover:bg-stone-800 hover:text-white transition-colors border border-stone-700"
                >
                  Am înțeles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
