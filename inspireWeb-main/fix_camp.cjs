const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/pages/camp');

// 1. Fix CampNavbar.tsx
let navbar = fs.readFileSync(path.join(srcDir, 'CampNavbar.tsx'), 'utf-8');
navbar = navbar.replace(/bg-\[#0A111F\]\/90/g, 'bg-[#0A0A0A]/90');
navbar = navbar.replace(/bg-\[#0A111F\]/g, 'bg-[#0A0A0A]');
navbar = navbar.replace(/border-\[#082E5C\]/g, 'border-[#FA9339]/10');
navbar = navbar.replace(/border-b-2 border-\[#082E5C\]/g, 'border-b-2 border-[#FA9339]/20');
navbar = navbar.replace(/text-\[#E0F0F8\]/g, 'text-[#D4D4D4]');
navbar = navbar.replace(/text-\[#A0C4D8\]/g, 'text-[#A3A3A3]');
navbar = navbar.replace(/deepsea-300/g, '[#FA9339]');
fs.writeFileSync(path.join(srcDir, 'CampNavbar.tsx'), navbar);


// 2. Fix Camp.tsx footer font
let camp = fs.readFileSync(path.join(srcDir, 'Camp.tsx'), 'utf-8');
camp = camp.replace(
  /className="text-white text-xl sm:text-3xl md:text-4xl font-sans font-bold italic tracking-tight"/g,
  'className="text-white text-xl sm:text-3xl md:text-4xl font-spartan font-bold tracking-tight"'
);
fs.writeFileSync(path.join(srcDir, 'Camp.tsx'), camp);


// 3. Fix CampAteliere.tsx
let ateliere = fs.readFileSync(path.join(srcDir, 'CampAteliere.tsx'), 'utf-8');
ateliere = ateliere.replace(
  /<p className="text-\[#D4D4D4\] text-base sm:text-lg leading-relaxed">/g,
  '<p className="text-[#D4D4D4] text-base sm:text-lg leading-relaxed line-clamp-2">'
);
ateliere = ateliere.replace(
  /<p className="text-\[#D4D4D4\] text-sm sm:text-base leading-relaxed">/g,
  '<p className="text-[#D4D4D4] text-sm sm:text-base leading-relaxed line-clamp-2">'
);
ateliere = ateliere.replace(
  /: "text-\[#A3A3A3\] text-sm sm:text-base font-light italic truncate"/g,
  ': "text-[#A3A3A3] text-sm sm:text-base font-light italic line-clamp-2"'
);
ateliere = ateliere.replace(
  /pr-14 whitespace-nowrap/g,
  'pr-14'
);
fs.writeFileSync(path.join(srcDir, 'CampAteliere.tsx'), ateliere);


// 4. Fix CampWhatToExpect.tsx
let expect = fs.readFileSync(path.join(srcDir, 'CampWhatToExpect.tsx'), 'utf-8');
expect = expect.replace(
  /className="relative flex items-center w-full px-4"[\s\S]*?{item\.title}<\/h3>[\s\S]*?{item\.desc}[\s\S]*?<\/div>[\s\S]*?<\/motion\.div>/g,
  `className="relative flex flex-col w-full px-4"
                >
                  {/* Title */}
                  <div className="z-20 text-left mb-1 md:mb-2 ml-[4rem] sm:ml-[5.5rem] md:ml-[7.5rem]">
                    <h3 className="text-[#FA9339] font-bold text-lg md:text-2xl">{item.title}</h3>
                  </div>
                  
                  {/* Icon and Paragraph centered */}
                  <div className="flex items-center w-full">
                    <div className="z-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 mr-4 sm:mr-6 md:mr-10">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-contain drop-shadow-xl"
                      />
                    </div>
                    <div className="z-20 flex-1 text-left">
                      <p className="text-[#D4D4D4] text-[14px] md:text-base leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>`
);
fs.writeFileSync(path.join(srcDir, 'CampWhatToExpect.tsx'), expect);

console.log('All fixes applied successfully!');
