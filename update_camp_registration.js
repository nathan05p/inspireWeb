const fs = require('fs');
const path = 'e:\\inspireWeb-main\\inspireWeb-main\\src\\pages\\camp\\Camp.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Add import
const importStatement = `import RegistrationForm from '../../components/RegistrationForm';\n`;
if (!code.includes('import RegistrationForm')) {
  code = code.replace("import Marquee from '../../components/Marquee';", "import Marquee from '../../components/Marquee';\n" + importStatement);
}

// 2. Replace Pricing block
const regex = /\{\/\* Pricing \*\/\}.*?\{\/\* Background flourish \*\/\}\s*<div className="absolute[^>]+>\s*<Tent size=\{350\} \/>\s*<\/div>\s*<\/motion\.div>/s;

const replacement = `{/* Registration Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="sm:col-span-12 md:col-span-8">
            <RegistrationForm />
          </motion.div>`;

code = code.replace(regex, replacement);

fs.writeFileSync(path, code);
console.log("Updated Camp.tsx with RegistrationForm");
