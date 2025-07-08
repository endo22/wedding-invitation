export const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
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
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-5px); }
      60% { transform: translateY(-3px); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
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
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-18px) rotate(3deg); }
      50% { transform: translateY(-8px) rotate(0deg); }
      75% { transform: translateY(-20px) rotate(-3deg); }
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
      50% { opacity: 1; }
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
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
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

    /* Animation Classes */
    .animate-fade-in { animation: fadeIn 1s ease-in-out; }
    .animate-fade-in-slow { animation: fadeIn 2s ease-in-out; }
    .animate-slide-up-delay-1 { animation: slideUp 0.8s ease-out 0.2s both; }
    .animate-slide-up-delay-2 { animation: slideUp 0.8s ease-out 0.4s both; }
    .animate-slide-up-delay-3 { animation: slideUp 0.8s ease-out 0.6s both; }
    .animate-slide-up-delay-4 { animation: slideUp 0.8s ease-out 0.8s both; }
    .animate-slide-up-delay-5 { animation: slideUp 0.8s ease-out 1.0s both; }
    .animate-slide-up-delay-6 { animation: slideUp 0.8s ease-out 1.2s both; }
    .animate-slide-up-delay-7 { animation: slideUp 0.8s ease-out 1.4s both; }
    .animate-bounce-gentle { animation: bounceGentle 2s infinite, slideUp 0.8s ease-out 0.8s both; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    
    /* Hover Effects */
    .hover-lift:hover {
      transform: translateY(-5px);
      transition: transform 0.3s ease;
    }
    
    /* Scroll Reveal Effect */
    .scroll-reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
    }
    
    .scroll-reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>
);
