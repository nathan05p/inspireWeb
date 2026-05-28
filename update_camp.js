const fs = require('fs');
const path = 'e:\\inspireWeb-main\\inspireWeb-main\\src\\pages\\camp\\Camp.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Replace all unsplash images with /poza.png
code = code.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(\?[a-zA-Z0-9\=\&]*)?/g, '/poza.png');

// 2. Replace activities array texts
code = code.replace(/title: "[^"]+", desc: "[^"]+", icon: (<[a-zA-Z]+ size=\{28\} \/>), img: "\/poza\.png", details: "[^"]+"/g, 'title: "Titlu Secțiune", desc: "Aici avem un text de probă pentru a exemplifica descrierea.", icon: $1, img: "/poza.png", details: "Aici avem un text mai detaliat despre această secțiune, care va fi înlocuit curând cu informațiile reale."');

// 3. Replace packingList array texts
code = code.replace(/title: "[^"]+", icon: (<[a-zA-Z]+ size=\{32\} \/>), items: \["[^"]+", "[^"]+", "[^"]+", "[^"]+"\]/g, 'title: "Titlu Secțiune", icon: $1, items: ["Aici avem un text", "Aici avem un text", "Aici avem un text", "Aici avem un text"]');

// 4. Replace Ateliere categories
code = code.replace(/<p className="text-amber-500 text-xs font-bold tracking-widest mb-2 uppercase">[^<]+<\/p>/g, '<p className="text-amber-500 text-xs font-bold tracking-widest mb-2 uppercase">CATEGORIE</p>');

// 5. Replace Ateliere titles and descriptions
code = code.replace(/<h3 className="text-2xl sm:text-3xl font-pavot mb-3 text-stone-50">[^<]+<\/h3>\s*<p className="text-stone-300 leading-relaxed text-sm flex-1">[^<]+<\/p>/g, '<h3 className="text-2xl sm:text-3xl font-pavot mb-3 text-stone-50">Titlu Secțiune</h3>\n              <p className="text-stone-300 leading-relaxed text-sm flex-1">Aici avem un text care reprezintă descrierea, acesta fiind un text de probă care va fi înlocuit ulterior.</p>');

// 6. Replace "Motive pentru care să vii" items
code = code.replace(/\{ title: '[^']+', desc: '[^']+' \}/g, "{ title: 'Titlu Secțiune', desc: 'Aici avem un text de probă care descrie acest punct, urmând să fie înlocuit cu textul final.' }");

// 7. Info/Logistics - Pricing
code = code.replace(/<p className="text-xs text-stone-400 font-bold tracking-widest mb-2">INTEGRAL<\/p>/g, '<p className="text-xs text-stone-400 font-bold tracking-widest mb-2">TITLU BILET</p>');
code = code.replace(/<p className="text-xs text-stone-400 font-bold tracking-widest mb-2">DOAR SEARA<\/p>/g, '<p className="text-xs text-stone-400 font-bold tracking-widest mb-2">TITLU BILET</p>');
code = code.replace(/<p className="text-xs text-amber-600 font-bold tracking-widest mb-2">AVANS \(Rezervare\)<\/p>/g, '<p className="text-xs text-amber-600 font-bold tracking-widest mb-2">TITLU BILET</p>');

// 8. Info/Logistics - Descriptions
code = code.replace(/Nu asigurăm transport organizat cu autobuzul, însă ne grupăm mereu pe grupul comunității pentru a găsi locuri în mașinile celor care conduc spre locație\. Nu te îngrijora, găsim un loc!/g, 'Aici avem un text cu detalii despre transport. Acest paragraf va fi completat de tine cu informațiile oficiale când vor fi gata.');
code = code.replace(/Metoda de plată \(transfer bancar sau cont Revolut\) este detaliată la finalul formularului de înscriere\. Avansul este nereturnabil\./g, 'Aici avem un text cu detaliile despre metoda de plată. Text de probă ce urmează a fi modificat.');

// 9. Info/Logistics - Location
code = code.replace(/<p className="text-stone-300">Valea Drăganului, Jud\. Cluj \(Camping\)<\/p>/g, '<p className="text-stone-300">Aici avem un text locația taberei</p>');

fs.writeFileSync(path, code);
console.log("Updated");
