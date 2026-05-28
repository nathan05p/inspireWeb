const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'inspireWeb-main', 'src', 'pages', 'camp', 'Camp.tsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes("import Lenis from 'lenis';")) {
    content = content.replace(
        "import { Link } from 'react-router-dom';",
        "import { Link } from 'react-router-dom';\nimport Lenis from 'lenis';"
    );
    
    // Add useEffect for Lenis
    const lenisEffect = `
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
`;
    content = content.replace("export default function Camp() {", "export default function Camp() {" + lenisEffect);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Added Lenis to Camp.tsx");
} else {
    console.log("Lenis already present in Camp.tsx");
}
