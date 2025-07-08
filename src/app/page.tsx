"use client";

import MainContent from "./components/MainContent";
import RightPanel from "./components/RightPanel";

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceGentle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        
        .animate-fade-in-slow {
          animation: fadeIn 2s ease-in-out;
        }
        
        .animate-slide-up-delay-1 {
          animation: slideUp 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up-delay-2 {
          animation: slideUp 0.8s ease-out 0.4s both;
        }
        
        .animate-slide-up-delay-3 {
          animation: slideUp 0.8s ease-out 0.6s both;
        }
        
        .animate-slide-up-delay-4 {
          animation: slideUp 0.8s ease-out 0.8s both;
        }
        
        .animate-slide-up-delay-5 {
          animation: slideUp 0.8s ease-out 1.0s both;
        }
        
        .animate-slide-up-delay-6 {
          animation: slideUp 0.8s ease-out 1.2s both;
        }
        
        .animate-slide-up-delay-7 {
          animation: slideUp 0.8s ease-out 1.4s both;
        }
        
        .animate-bounce-gentle {
          animation: bounceGentle 2s infinite, slideUp 0.8s ease-out 0.8s both;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Hover effects */
        .hover-lift:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        
        /* Scroll reveal effect */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* Overlay animasi pembuka */
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1) translateY(0px);
          }
          25% {
            opacity: 0.9;
            transform: scale(1.1) translateY(-5px);
          }
          50% {
            opacity: 1;
            transform: scale(1.15) translateY(-12px);
          }
          75% {
            opacity: 0.9;
            transform: scale(1.1) translateY(-5px);
          }
        }

        @keyframes bounceUpDown {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-18px) rotate(3deg);
          }
          50% {
            transform: translateY(-8px) rotate(0deg);
          }
          75% {
            transform: translateY(-20px) rotate(-3deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            background-position: 200% 0;
            opacity: 0.6;
          }
        }

        @keyframes backgroundPulse {
          0%, 100% {
            background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.2));
          }
          50% {
            background: linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.4));
          }
        }

        @keyframes floatGently {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

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

        /* Overlay animasi pembuka */
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .text-shadow-elegant {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3);
        }

        /* Slideshow Animation for Profile Photo */}
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
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
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

        /* Unique Photo Frame Styles */
        .unique-photo-frame {
          position: relative;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #f3f4f6, #e5e7eb);
          border-radius: 50% 30% 50% 30%;
          box-shadow: 
            0 8px 25px rgba(0,0,0,0.15),
            inset 2px 2px 8px rgba(255,255,255,0.8),
            inset -2px -2px 8px rgba(0,0,0,0.2),
            0 0 0 3px rgba(255,255,255,0.9),
            0 0 0 6px rgba(229,231,235,0.8);
          animation: frameRotate 10s linear infinite, framePulse 3s ease-in-out infinite;
          overflow: hidden;
        }

        .unique-photo-frame::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: conic-gradient(from 0deg, 
            rgba(59,130,246,0.3), 
            rgba(16,185,129,0.3), 
            rgba(245,101,101,0.3), 
            rgba(168,85,247,0.3), 
            rgba(59,130,246,0.3));
          border-radius: inherit;
          z-index: -1;
          animation: frameGlow 4s linear infinite;
        }

        .unique-photo-frame::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: sparkleMove 3s ease-in-out infinite;
        }

        @keyframes frameRotate {
          0% {
            border-radius: 50% 30% 50% 30%;
            transform: rotate(0deg);
          }
          25% {
            border-radius: 30% 50% 30% 50%;
            transform: rotate(90deg);
          }
          50% {
            border-radius: 50% 30% 50% 30%;
            transform: rotate(180deg);
          }
          75% {
            border-radius: 30% 50% 30% 50%;
            transform: rotate(270deg);
          }
          100% {
            border-radius: 50% 30% 50% 30%;
            transform: rotate(360deg);
          }
        }

        @keyframes framePulse {
          0%, 100% {
            box-shadow: 
              0 8px 25px rgba(0,0,0,0.15),
              inset 2px 2px 8px rgba(255,255,255,0.8),
              inset -2px -2px 8px rgba(0,0,0,0.2),
              0 0 0 3px rgba(255,255,255,0.9),
              0 0 0 6px rgba(229,231,235,0.8);
          }
          50% {
            box-shadow: 
              0 12px 35px rgba(0,0,0,0.25),
              inset 3px 3px 12px rgba(255,255,255,0.9),
              inset -3px -3px 12px rgba(0,0,0,0.3),
              0 0 0 4px rgba(255,255,255,1),
              0 0 0 8px rgba(59,130,246,0.3);
          }
        }

        @keyframes frameGlow {
          0% {
            filter: blur(2px) brightness(1);
            opacity: 0.3;
          }
          50% {
            filter: blur(3px) brightness(1.2);
            opacity: 0.6;
          }
          100% {
            filter: blur(2px) brightness(1);
            opacity: 0.3;
          }
        }

        @keyframes sparkleMove {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.3;
          }
          25% {
            transform: translate(-30%, -70%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-70%, -30%) scale(0.8);
            opacity: 0.8;
          }
          75% {
            transform: translate(-30%, -30%) scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex">
        <MainContent />
        <RightPanel />
      </div>
    </>
  );
}