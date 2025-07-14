export const OverlayStyles = () => (
  <style jsx global>{`
    .overlay-entrance {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.2));
      backdrop-filter: blur(2px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10;
      cursor: pointer;
      transition: all 0.5s ease;
      animation: fadeInUp 1s ease-out both, backgroundPulse 4s ease-in-out infinite;
    }

    .overlay-entrance:hover {
      background: linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.5));
      backdrop-filter: blur(4px);
      transform: scale(1.02);
    }

    .triangle-icon {
      width: 0;
      height: 0;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 40px solid rgba(255,255,255,0.9);
      margin-bottom: 20px;
      animation: bounceUpDown 3s ease-in-out infinite, pulseGlow 2s ease-in-out infinite;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4));
      transition: all 0.3s ease;
    }

    .triangle-icon:hover {
      border-bottom-color: rgba(255,255,255,1);
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.6));
      transform: scale(1.2);
    }

    .overlay-text {
      color: white;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      animation: fadeInUp 1s ease-out 0.5s both;
      text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
      letter-spacing: 1.5px;
      line-height: 1.5;
      background: linear-gradient(90deg, 
        rgba(255,255,255,0.7) 0%, 
        rgba(255,255,255,1) 50%, 
        rgba(255,255,255,0.7) 100%);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeInUp 1s ease-out 0.5s both, shimmer 3s ease-in-out infinite;
      transition: all 0.3s ease;
    }

    .overlay-text:hover {
      transform: scale(1.05) translateY(-2px);
      text-shadow: 4px 4px 8px rgba(0,0,0,0.9);
    }

    .pulse-glow {
      animation: pulseGlow 2s infinite;
    }

    .text-shadow-elegant {
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    /* Efek tambahan untuk interaktivitas */
    .overlay-entrance::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: left 0.5s ease;
    }

    .overlay-entrance:hover::before {
      left: 100%;
    }
  `}</style>
);
