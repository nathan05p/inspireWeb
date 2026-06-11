import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const SeamlessVideo: React.FC<{ src: string }> = ({ src }) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    let animationFrameId: number;
    const crossfadeDuration = 2.0; // 2 seconds crossfade for super smooth transition
    let activeVideo = 1;

    // We must ensure the videos are ready to play
    v1.play().catch(() => {});
    v2.pause();
    v2.style.opacity = '0';
    v1.style.opacity = '1';

    const loop = () => {
      const active = activeVideo === 1 ? v1 : v2;
      const inactive = activeVideo === 1 ? v2 : v1;

      if (active.duration) {
        const timeLeft = active.duration - active.currentTime;
        
        if (timeLeft <= crossfadeDuration) {
          // Start the other video to crossfade
          if (inactive.paused) {
            inactive.currentTime = 0;
            inactive.play().catch(() => {});
          }
          
          // Calculate opacity (1 down to 0 for active, 0 up to 1 for inactive)
          const opacity = timeLeft / crossfadeDuration;
          active.style.opacity = Math.max(0, opacity).toString();
          inactive.style.opacity = Math.min(1, 1 - opacity).toString();

          if (timeLeft <= 0.05) {
            active.pause();
            active.currentTime = 0;
            active.style.opacity = '0';
            inactive.style.opacity = '1';
            activeVideo = activeVideo === 1 ? 2 : 1;
          }
        } else {
          // Make sure active is fully visible
          active.style.opacity = '1';
          inactive.style.opacity = '0';
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <video
        ref={video1Ref}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={src}
      />
      <video
        ref={video2Ref}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0 }}
        src={src}
      />
    </>
  );
};

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // For the moving blurry blob
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const blobX = useSpring(0, { stiffness: 40, damping: 20 });
  const blobY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    blobX.set(mousePos.x);
    blobY.set(mousePos.y);
  }, [mousePos, blobX, blobY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      size: number;
      density: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 30) + 1;
        
        const colors = ['#FA9339', '#E0873C', '#ffb56b'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 150;
        
        if (distance < maxDistance) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;
          
          this.x -= directionX * 0.1;
          this.y -= directionY * 0.1;
        }
      }
    }

    const particles: Particle[] = [];
    const init = () => {
      particles.length = 0;
      const numberOfParticles = Math.min((w * h) / 12000, 150); 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = dx * dx + dy * dy;

          if (distance < 12000) { 
            const opacity = 1 - (distance / 12000);
            ctx.strokeStyle = `rgba(250, 147, 57, ${opacity * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#1A0B05]">
      {/* 1. Base Video Background */}
      <SeamlessVideo src="/Gradient.mp4" />
      
      {/* 2. Interactive Cursor Blob */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(250, 147, 57, 0.4) 0%, transparent 70%)',
          filter: 'blur(50px)',
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* 3. Dark Overlay to maintain text contrast */}
      <div className="absolute inset-0 bg-[#1A0B05]/40 pointer-events-none" />

      {/* 4. Interactive Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
      
      {/* 5. Additional Overlays for contrast */}
      <div className="absolute inset-0 bg-[#1A0B05]/30 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#1A0B05]/20 via-transparent to-[#1A0B05]" />
    </div>
  );
};

export default InteractiveBackground;
