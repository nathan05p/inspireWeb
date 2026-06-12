import React, { useRef, useEffect } from 'react';

const InteractiveBackground: React.FC = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const PLAYBACK_RATE = 1.0;
    const CROSSFADE_DURATION = 2.0; // seconds

    // Set playback speed on both
    v1.playbackRate = PLAYBACK_RATE;
    v2.playbackRate = PLAYBACK_RATE;

    // Start v1 playing, v2 hidden and paused
    v1.style.opacity = '1';
    v2.style.opacity = '0';
    v2.pause();
    v2.currentTime = 0;

    const tryPlay = (video: HTMLVideoElement) => {
      video.play().catch(() => {
        const handler = () => {
          video.play().catch(() => {});
          document.removeEventListener('click', handler);
          document.removeEventListener('touchstart', handler);
        };
        document.addEventListener('click', handler);
        document.addEventListener('touchstart', handler);
      });
    };

    // Start the first video
    if (v1.readyState >= 3) {
      tryPlay(v1);
    } else {
      v1.addEventListener('canplay', () => tryPlay(v1), { once: true });
    }

    let activeVideo = 1;
    let crossfading = false;
    let animationFrameId: number;

    const loop = () => {
      const active = activeVideo === 1 ? v1 : v2;
      const inactive = activeVideo === 1 ? v2 : v1;

      if (active.duration && active.duration > 0) {
        const timeLeft = active.duration - active.currentTime;
        // Adjust for slowed playback: the visual time left is timeLeft,
        // but the video plays at PLAYBACK_RATE, so actual seconds = timeLeft
        const visualTimeLeft = timeLeft;

        if (visualTimeLeft <= CROSSFADE_DURATION && !crossfading) {
          // Start crossfade
          crossfading = true;
          inactive.currentTime = 0;
          inactive.playbackRate = PLAYBACK_RATE;
          tryPlay(inactive);
        }

        if (crossfading) {
          const progress = Math.max(0, Math.min(1, 1 - (visualTimeLeft / CROSSFADE_DURATION)));
          // Smooth easing (ease-in-out)
          const eased = progress * progress * (3 - 2 * progress);
          active.style.opacity = String(1 - eased);
          inactive.style.opacity = String(eased);

          if (visualTimeLeft <= 0.05) {
            // Swap
            active.pause();
            active.currentTime = 0;
            active.style.opacity = '0';
            inactive.style.opacity = '1';
            activeVideo = activeVideo === 1 ? 2 : 1;
            crossfading = false;
          }
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    zIndex: 1,
    transition: 'opacity 0.1s linear',
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#1A0B05]">
      <video
        ref={video1Ref}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={videoStyle}
      >
        <source src="/ClipFundalWide.mp4" type="video/mp4" />
      </video>
      <video
        ref={video2Ref}
        muted
        playsInline
        preload="auto"
        style={{ ...videoStyle, opacity: 0 }}
      >
        <source src="/ClipFundalWide.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay to maintain text contrast */}
      <div className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-[20px] pointer-events-none z-[2]" />
    </div>
  );
};

export default InteractiveBackground;
