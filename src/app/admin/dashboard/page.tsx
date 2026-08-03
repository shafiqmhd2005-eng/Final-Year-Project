



"use client"

import { useState, useEffect } from 'react';

import MedicalBackground from '../../../components/MechanicalBackground'; // Renamed component
import HeroSection from '../../../components/HeroSection';
import FeatureHighlights from '../../../components/FeatureHighlights';
import OperationsSection from '../../../components/OperationsSection';
import KeyBenefits from '../../../components/KeyBenefits';
import ProfessionalFooter from '../../../components/ProfessionalFooter';

export default function Home() {

  const [isVisible, setIsVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);


  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setHeroLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-purple-900 to-blue-950 overflow-hidden">
      <MedicalBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection isVisible={isVisible} heroLoaded={heroLoaded} />
        <FeatureHighlights />
        <OperationsSection isVisible={isVisible} />
        <KeyBenefits isVisible={isVisible} />
        <ProfessionalFooter isVisible={isVisible} />
      </div>

      <style jsx>{`
        /* Medical/Heart themed animations */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heartbeat-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.6);
          }
        }

        @keyframes ecg-wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(20px);
          }
        }

        @keyframes medical-gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out backwards;
        }

        .animate-heartbeat-pulse {
          animation: heartbeat-pulse 2s ease-in-out infinite;
        }

        .animate-ecg-wave {
          animation: ecg-wave 3s ease-in-out infinite alternate;
        }

        .animate-medical-gradient {
          background-size: 200% auto;
          animation: medical-gradient 3s ease infinite;
        }

        /* Medical background pattern */
        .bg-medical-pattern {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.1) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.05) 1px, transparent 0);
          background-size: 50px 50px, 100px 100px;
          background-position: 0 0, 25px 25px;
          animation: pattern-move 30s linear infinite;
        }

        @keyframes pattern-move {
          0% {
            background-position: 0 0, 25px 25px;
          }
          100% {
            background-position: 50px 50px, 75px 75px;
          }
        }

        .medical-text {
          text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
        }

        /* ECG line animation for additional visual effect */
        .ecg-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(239, 68, 68, 0.3) 20%, 
            rgba(239, 68, 68, 0.6) 50%, 
            rgba(239, 68, 68, 0.3) 80%, 
            transparent
          );
          animation: ecg-scan 4s linear infinite;
        }

        @keyframes ecg-scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* Pulse dots animation */
        .pulse-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: rgba(239, 68, 68, 0.4);
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }

        @media (max-width: 640px) {
          .bg-medical-pattern {
            background-size: 30px 30px, 60px 60px;
          }
        }
      `}</style>

      {/* Additional medical visual effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Random pulse dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="pulse-dot"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + Math.sin(i) * 60}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}

        {/* ECG scan line */}
        <div className="ecg-line"></div>

        {/* Subtle medical gradient overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>
    </div >
  );
}