import React, { useRef, useEffect } from 'react';
import gradientVideo from '../assets/Gradient.mp4';

const InteractiveBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on mount — some browsers block autoplay even with muted
    const tryPlay = () => {
      video.play().catch(() => {
        // If autoplay fails, try again after a user interaction
        const handler = () => {
          video.play().catch(() => {});
          document.removeEventListener('click', handler);
          document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('click', handler);
        document.addEventListener('touchstart', handler);
      });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#1A0B05]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Primary source: Vite-bundled asset */}
        <source src={gradientVideo} type="video/mp4" />
        {/* Fallback: served directly from public folder */}
        <source src="/Gradient.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default InteractiveBackground;
