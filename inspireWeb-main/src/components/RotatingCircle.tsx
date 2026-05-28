import { useEffect, useRef } from 'react';

export default function RotatingCircle() {
  const textRef = useRef<SVGTextPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let angle = 0;
    let raf: number;
    const animate = () => {
      angle += 0.2;
      if (groupRef.current) {
        groupRef.current.setAttribute('transform', `rotate(${angle}, 200, 200)`);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const text = "GOOD COMMUNICATION CAN INSPIRE, CONNECT AND TRANSFORM  •  ";
  const repeated = text + text;

  return (
    <div className="flex items-center justify-center py-24 relative">
      <svg width="400" height="400" viewBox="0 0 400 400" className="overflow-visible">
        <defs>
          <path
            id="circle-path"
            d="M 200,200 m -145,0 a 145,145 0 1,1 290,0 a 145,145 0 1,1 -290,0"
          />
        </defs>

        {/* Rotating text group */}
        <g ref={groupRef}>
          <text
            fill="#2D3E40"
            fontSize="13"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            letterSpacing="1.5"
          >
            <textPath ref={textRef} href="#circle-path">
              {repeated}
            </textPath>
          </text>
        </g>

        {/* Static concentric dotted circles */}
        <circle cx="200" cy="200" r="90" fill="none" stroke="#2D3E40" strokeWidth="0.8" strokeDasharray="3,6" />
        <circle cx="200" cy="200" r="55" fill="none" stroke="#2D3E40" strokeWidth="0.8" strokeDasharray="3,6" />

        {/* Red dot at ~9 o'clock position (left side) */}
        <circle cx="55" cy="200" r="5" fill="#E54B4B" />
      </svg>
    </div>
  );
}
