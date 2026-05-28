const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'inspireWeb-main', 'src', 'pages', 'camp', 'CampNavbar.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Color replacements for Navbar
content = content.replace(/bg-white\/90 dark\:bg-stone-900\/90/g, 'bg-[#1A1E22]/90');
content = content.replace(/bg-\[\#faf8f5\] dark\:bg-stone-950/g, 'bg-[#1A1E22]');
content = content.replace(/bg-transparent/g, 'bg-transparent'); // Keep transparent

// Text colors
content = content.replace(/text-stone-900 dark\:text-stone-100/g, 'text-stone-50');
content = content.replace(/text-stone-500 dark\:text-stone-400/g, 'text-stone-400');
content = content.replace(/text-stone-600 dark\:text-stone-300/g, 'text-stone-300');
content = content.replace(/text-stone-400 dark\:text-stone-500/g, 'text-stone-400');
content = content.replace(/hover\:text-stone-900 dark\:hover\:text-stone-100/g, 'hover:text-stone-50');

// Border colors
content = content.replace(/border-stone-900 dark\:border-stone-100/g, 'border-stone-800');
content = content.replace(/border-stone-200 dark\:border-stone-800/g, 'border-stone-800');

// Hover border colors
content = content.replace(/dark\:hover\:border-amber-500/g, 'hover:border-amber-500');
content = content.replace(/dark\:hover\:text-amber-500/g, 'hover:text-amber-500');

// Remove Moon and Sun toggle
content = content.replace(/import \{ X, Menu, Moon, Sun \} from 'lucide-react';/, "import { X, Menu } from 'lucide-react';");

content = content.replace(/const \[isDark, setIsDark\] = useState\(false\);/, "");
content = content.replace(/useEffect\(\(\) => \{\s+\/\/ Initialize dark mode.*?\}, \[\]\);/s, "");
content = content.replace(/const toggleDark = \(\) => \{.*?setIsDark\(.*?\);\s+\};/s, "");

// Remove toggle buttons
content = content.replace(/<button\s+onClick=\{toggleDark\}.*?<\/button>/gs, "");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Navbar updated');
