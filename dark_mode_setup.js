const fs = require('fs');
const path = require('path');

const campPath = path.join(__dirname, 'inspireWeb-main/src/pages/camp/Camp.tsx');
let campCode = fs.readFileSync(campPath, 'utf8');

// Replacements for Camp.tsx
campCode = campCode.replace(/bg-\[#faf8f5\]/g, 'bg-[#faf8f5] dark:bg-stone-950');
campCode = campCode.replace(/bg-white/g, 'bg-white dark:bg-stone-900');
campCode = campCode.replace(/text-stone-900/g, 'text-stone-900 dark:text-stone-50');
campCode = campCode.replace(/text-stone-800/g, 'text-stone-800 dark:text-stone-200');
campCode = campCode.replace(/text-stone-700/g, 'text-stone-700 dark:text-stone-300');
campCode = campCode.replace(/text-stone-600/g, 'text-stone-600 dark:text-stone-300');
campCode = campCode.replace(/text-stone-500/g, 'text-stone-500 dark:text-stone-400');
campCode = campCode.replace(/text-stone-400/g, 'text-stone-400 dark:text-stone-500');
campCode = campCode.replace(/border-stone-200/g, 'border-stone-200 dark:border-stone-800');
campCode = campCode.replace(/border-stone-100/g, 'border-stone-100 dark:border-stone-800/50');
campCode = campCode.replace(/bg-stone-100/g, 'bg-stone-100 dark:bg-stone-800');
campCode = campCode.replace(/bg-amber-50 /g, 'bg-amber-50 dark:bg-amber-900/20 ');
campCode = campCode.replace(/bg-amber-50"/g, 'bg-amber-50 dark:bg-amber-900/20"');

// Fixes
campCode = campCode.replace(/text-white dark:text-stone-50/g, 'text-white');
campCode = campCode.replace(/bg-stone-900 dark:bg-stone-50/g, 'bg-stone-900');

fs.writeFileSync(campPath, campCode);

const tailwindPath = path.join(__dirname, 'inspireWeb-main/tailwind.config.js');
let twCode = fs.readFileSync(tailwindPath, 'utf8');
if(!twCode.includes("darkMode:")) {
    twCode = twCode.replace(/export default \{/, "export default {\n  darkMode: 'class',");
    fs.writeFileSync(tailwindPath, twCode);
}

console.log("Dark mode classes added to Camp.tsx and tailwind config updated.");
