export const ProfileStyles = () => (
  <style jsx global>{`
    /* Slideshow Animation for Profile Photo */
    @keyframes slideshow {
      0%, 20% {
        opacity: 1;
        transform: scale(1);
      }
      25%, 45% {
        opacity: 0;
        transform: scale(0.95);
      }
      50%, 70% {
        opacity: 1;
        transform: scale(1);
      }
      75%, 95% {
        opacity: 0;
        transform: scale(0.95);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes profileGlow {
      0%, 100% {
        box-shadow: 0 4px 12px rgba(0,0,0,0.2), inset 1px 1px 3px rgba(255,255,255,0.3), inset -1px -1px 3px rgba(0,0,0,0.3);
      }
      50% {
        box-shadow: 0 6px 20px rgba(59,130,246,0.3), inset 1px 1px 3px rgba(255,255,255,0.4), inset -1px -1px 3px rgba(0,0,0,0.2);
      }
    }

    .profile-slideshow {
      animation: slideshow 8s infinite ease-in-out, profileGlow 4s infinite ease-in-out;
    }

    .profile-photo-1 {
      background: linear-gradient(135deg, #6B7280, #374151);
      animation-delay: 0s;
    }

    .profile-photo-2 {
      background: linear-gradient(135deg, #3B82F6, #1E40AF);
      animation-delay: 2s;
    }

    .profile-photo-3 {
      background: linear-gradient(135deg, #059669, #047857);
      animation-delay: 4s;
    }

    .profile-photo-4 {
      background: linear-gradient(135deg, #DC2626, #991B1B);
      animation-delay: 6s;
    }

    /* Frame unik dengan efek khusus */
    @keyframes frameRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes framePulse {
      0%, 100% {
        border-radius: 50%;
        border-width: 2px;
      }
      25% {
        border-radius: 45% 55% 40% 60%;
        border-width: 3px;
      }
      50% {
        border-radius: 60% 40% 55% 45%;
        border-width: 4px;
      }
      75% {
        border-radius: 35% 65% 50% 50%;
        border-width: 3px;
      }
    }

    @keyframes frameGlow {
      0%, 100% {
        box-shadow: 
          0 0 10px rgba(59, 130, 246, 0.3),
          0 0 20px rgba(59, 130, 246, 0.2),
          0 0 30px rgba(59, 130, 246, 0.1),
          inset 0 0 10px rgba(255, 255, 255, 0.2);
      }
      25% {
        box-shadow: 
          0 0 15px rgba(16, 185, 129, 0.4),
          0 0 25px rgba(16, 185, 129, 0.3),
          0 0 35px rgba(16, 185, 129, 0.2),
          inset 0 0 15px rgba(255, 255, 255, 0.3);
      }
      50% {
        box-shadow: 
          0 0 20px rgba(239, 68, 68, 0.4),
          0 0 30px rgba(239, 68, 68, 0.3),
          0 0 40px rgba(239, 68, 68, 0.2),
          inset 0 0 20px rgba(255, 255, 255, 0.4);
      }
      75% {
        box-shadow: 
          0 0 15px rgba(168, 85, 247, 0.4),
          0 0 25px rgba(168, 85, 247, 0.3),
          0 0 35px rgba(168, 85, 247, 0.2),
          inset 0 0 15px rgba(255, 255, 255, 0.3);
      }
    }

    @keyframes sparkleMove {
      0%, 100% {
        transform: translateY(0px) scale(1) rotate(0deg);
        opacity: 0.6;
      }
      25% {
        transform: translateY(-4px) scale(1.3) rotate(90deg);
        opacity: 1;
      }
      50% {
        transform: translateY(-8px) scale(0.7) rotate(180deg);
        opacity: 0.8;
      }
      75% {
        transform: translateY(-4px) scale(1.1) rotate(270deg);
        opacity: 0.9;
      }
    }

    /* Hover effects untuk frame */
    .unique-frame:hover {
      animation-duration: 3s, 4s, 10s;
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }

    .unique-frame:hover .frame-sparkle {
      animation-duration: 1.5s;
      transform: scale(1.2);
    }

    .unique-frame {
      position: relative;
      border: 3px solid;
      border-image: conic-gradient(
        from 0deg,
        #3b82f6,
        #10b981,
        #f59e0b,
        #ef4444,
        #8b5cf6,
        #3b82f6
      ) 1;
      animation: 
        framePulse 6s ease-in-out infinite,
        frameGlow 8s ease-in-out infinite,
        frameRotate 20s linear infinite;
      background: conic-gradient(
        from 45deg,
        rgba(59, 130, 246, 0.1),
        rgba(16, 185, 129, 0.1),
        rgba(245, 158, 11, 0.1),
        rgba(239, 68, 68, 0.1),
        rgba(139, 92, 246, 0.1),
        rgba(59, 130, 246, 0.1)
      );
      overflow: hidden;
    }

    .unique-frame::before {
      content: '';
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border-radius: inherit;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(59, 130, 246, 0.6) 45deg,
        transparent 90deg,
        rgba(16, 185, 129, 0.6) 135deg,
        transparent 180deg,
        rgba(239, 68, 68, 0.6) 225deg,
        transparent 270deg,
        rgba(168, 85, 247, 0.6) 315deg,
        transparent 360deg
      );
      animation: frameRotate 15s linear infinite reverse;
      z-index: -1;
      filter: blur(2px);
    }

    .unique-frame::after {
      content: '';
      position: absolute;
      top: -12px;
      left: -12px;
      right: -12px;
      bottom: -12px;
      border-radius: inherit;
      background: conic-gradient(
        from 180deg,
        rgba(255, 255, 255, 0.2) 0deg,
        transparent 60deg,
        rgba(255, 255, 255, 0.4) 120deg,
        transparent 180deg,
        rgba(255, 255, 255, 0.2) 240deg,
        transparent 300deg,
        rgba(255, 255, 255, 0.3) 360deg
      );
      animation: frameRotate 25s linear infinite;
      z-index: -2;
      filter: blur(4px);
    }

    /* Sparkle effects around frame */
    .frame-sparkle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3));
      border-radius: 50%;
      animation: sparkleMove 3s ease-in-out infinite;
      box-shadow: 
        0 0 6px rgba(255, 255, 255, 0.8),
        0 0 12px rgba(59, 130, 246, 0.4);
    }

    .frame-sparkle:nth-child(1) {
      top: -3px;
      left: 20%;
      animation-delay: 0s;
      background: radial-gradient(circle, rgba(59, 130, 246, 1), rgba(59, 130, 246, 0.3));
    }

    .frame-sparkle:nth-child(2) {
      top: 20%;
      right: -3px;
      animation-delay: 0.5s;
      background: radial-gradient(circle, rgba(16, 185, 129, 1), rgba(16, 185, 129, 0.3));
    }

    .frame-sparkle:nth-child(3) {
      bottom: -3px;
      left: 60%;
      animation-delay: 1s;
      background: radial-gradient(circle, rgba(245, 158, 11, 1), rgba(245, 158, 11, 0.3));
    }

    .frame-sparkle:nth-child(4) {
      top: 60%;
      left: -3px;
      animation-delay: 1.5s;
      background: radial-gradient(circle, rgba(239, 68, 68, 1), rgba(239, 68, 68, 0.3));
    }

    .frame-sparkle:nth-child(5) {
      top: 10%;
      left: 70%;
      animation-delay: 2s;
      background: radial-gradient(circle, rgba(168, 85, 247, 1), rgba(168, 85, 247, 0.3));
    }

    .frame-sparkle:nth-child(6) {
      bottom: 20%;
      right: 10%;
      animation-delay: 2.5s;
      background: radial-gradient(circle, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3));
    }
  `}</style>
);
