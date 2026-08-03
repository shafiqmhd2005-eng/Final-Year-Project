// "use client"

// import { Cpu, Wrench, Hammer, Cog } from 'lucide-react';

// export default function HeroSection({ isVisible, heroLoaded }) {
//   return (
//     <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
//       {/* Animated CPU Icon with Mechanical Elements */}
//       <div className="relative inline-block mb-4 sm:mb-6">
//         <div className={`inline-flex items-center justify-center p-2 sm:p-3 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30 animate-pulse-glow ${heroLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'} transition-all duration-1000`}>
//           <Cpu className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-400" />
//         </div>
//         {/* Floating Tools around CPU */}
//         {/* <div className={`absolute -top-3 -right-3 transition-all duration-700 ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
//           <div className="p-1 bg-yellow-500/20 rounded-lg animate-tool-spin">
//             <Wrench className="w-4 h-4 text-yellow-400" />
//           </div>
//         </div>
//         <div className={`absolute -bottom-3 -left-3 transition-all duration-700 delay-300 ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
//           <div className="p-1 bg-orange-500/20 rounded-lg animate-tool-spin-reverse">
//             <Hammer className="w-3 h-3 text-orange-400" />
//           </div>
//         </div> */}
//         {/* <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-500 ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
//           <div className="p-1 bg-green-500/20 rounded-lg animate-tool-bounce">
//             <Cog className="w-3 h-3 text-green-400" />
//           </div>
//         </div> */}
//       </div>
      
//       {/* Main Title with Mechanical Typography */}
//       <div className={`relative ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-700 delay-200`}>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight px-2 relative">
//           <span className="relative inline-block">
//             Digital Twin
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 animate-title-underline"></span>
//           </span>
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 sm:mt-2 animate-gradient mechanical-text">
//             Induction Motor
//           </span>
//         </h1>
//       </div>
      
//       <p className={`text-base sm:text-lg lg:text-xl text-blue-200 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-700 delay-400 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//         Experience real-time visualization and monitoring of industrial induction motors through advanced digital twin technology
//       </p>
      
//       <p className={`text-sm sm:text-base text-blue-300/80 max-w-2xl mx-auto px-4 transition-all duration-700 delay-600 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//         Simulate, analyze, and optimize motor performance with comprehensive data insights and predictive maintenance capabilities
//       </p>
//     </div>
//   );
// }






// "use client"

// import { Heart, Activity, Stethoscope, Brain, HeartPulse, Thermometer } from 'lucide-react';

// export default function HeroSection({ isVisible, heroLoaded }) {
//   return (
//     <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
//       {/* Animated Heart Icon with Medical Elements */}
//       <div className="relative inline-block mb-4 sm:mb-6">
//         <div className={`inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-br from-red-500/30 to-pink-500/20 rounded-full backdrop-blur-sm border border-red-400/30 animate-pulse-heartbeat ${heroLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'} transition-all duration-1000`}>
//           <Heart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-400 animate-heartbeat" fill="rgba(239, 68, 68, 0.3)" />
//         </div>
        
//         {/* Floating Medical Icons around Heart */}
//         <div className={`absolute -top-3 -right-3 transition-all duration-700 ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
//           <div className="p-1.5 bg-blue-500/20 rounded-lg animate-pulse-medical">
//             <Activity className="w-4 h-4 text-blue-400" />
//           </div>
//         </div>
//         <div className={`absolute -bottom-3 -left-3 transition-all duration-700 delay-300 ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
//           <div className="p-1.5 bg-green-500/20 rounded-lg animate-pulse-medical">
//             <Stethoscope className="w-4 h-4 text-green-400" />
//           </div>
//         </div>
//         <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-500 ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
//           <div className="p-1.5 bg-purple-500/20 rounded-lg animate-pulse-medical">
//             <Brain className="w-4 h-4 text-purple-400" />
//           </div>
//         </div>
//         <div className={`absolute top-1/2 -right-3 transform -translate-y-1/2 transition-all duration-700 delay-700 ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
//           <div className="p-1.5 bg-orange-500/20 rounded-lg animate-pulse-medical">
//             <Thermometer className="w-4 h-4 text-orange-400" />
//           </div>
//         </div>
//       </div>
      
//       {/* Main Title with Medical Typography */}
//       <div className={`relative ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-700 delay-200`}>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight px-2 relative">
//           <span className="relative inline-block">
//             Cardiac Digital Twin
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-400 animate-title-underline"></span>
//           </span>
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 mt-1 sm:mt-2 animate-gradient medical-text">
//             Human Heart Monitoring
//           </span>
//         </h1>
//       </div>
      
//       <p className={`text-base sm:text-lg lg:text-xl text-red-100 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-700 delay-400 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//         Experience real-time visualization and monitoring of human cardiac functions through advanced digital twin technology
//       </p>
      
//       <p className={`text-sm sm:text-base text-pink-200/80 max-w-2xl mx-auto px-4 transition-all duration-700 delay-600 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//         Simulate, analyze, and optimize heart performance with comprehensive vital sign insights and predictive healthcare capabilities
//       </p>

//       {/* Vital Signs Indicators */}
//       <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 transition-all duration-700 delay-800 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
//         <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
//           <HeartPulse className="w-4 h-4 text-red-400" />
//           <span className="text-xs sm:text-sm text-red-300 font-medium">Heart Rate</span>
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
//           <Activity className="w-4 h-4 text-blue-400" />
//           <span className="text-xs sm:text-sm text-blue-300 font-medium">Blood Pressure</span>
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
//           <Stethoscope className="w-4 h-4 text-green-400" />
//           <span className="text-xs sm:text-sm text-green-300 font-medium">Oxygen Levels</span>
//         </div>
//         <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
//           <Brain className="w-4 h-4 text-purple-400" />
//           <span className="text-xs sm:text-sm text-purple-300 font-medium">ECG Analysis</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Add these CSS animations to your global CSS or style tag
// const styles = `
// @keyframes heartbeat {
//   0% {
//     transform: scale(1);
//   }
//   25% {
//     transform: scale(1.1);
//   }
//   50% {
//     transform: scale(1);
//   }
//   75% {
//     transform: scale(1.1);
//   }
//   100% {
//     transform: scale(1);
//   }
// }

// @keyframes pulse-heartbeat {
//   0%, 100% {
//     box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
//   }
//   50% {
//     box-shadow: 0 0 40px rgba(239, 68, 68, 0.6);
//   }
// }

// @keyframes pulse-medical {
//   0%, 100% {
//     transform: translateY(0) scale(1);
//   }
//   50% {
//     transform: translateY(-3px) scale(1.1);
//   }
// }

// @keyframes title-underline {
//   from {
//     width: 0;
//   }
//   to {
//     width: 100%;
//   }
// }

// @keyframes gradient {
//   0%, 100% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
// }

// .animate-heartbeat {
//   animation: heartbeat 1.5s ease-in-out infinite;
// }

// .animate-pulse-heartbeat {
//   animation: pulse-heartbeat 2s ease-in-out infinite;
// }

// .animate-pulse-medical {
//   animation: pulse-medical 3s ease-in-out infinite;
// }

// .animate-title-underline {
//   animation: title-underline 1.5s ease-out forwards;
// }

// .animate-gradient {
//   background-size: 200% auto;
//   animation: gradient 3s ease infinite;
// }

// .medical-text {
//   text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
// }
// `;

// // Add this style tag in your component or global CSS
// <style jsx>{styles}</style>




"use client"

import { Heart } from 'lucide-react';

export default function HeroSection({ isVisible, heroLoaded }) {
  return (
    <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
      {/* Simple Animated Heart Icon */}
      <div className={`inline-flex items-center justify-center p-4 sm:p-5 mb-4 sm:mb-6 bg-gradient-to-br from-red-500/20 to-pink-500/10 rounded-full border border-red-400/30 animate-pulse-heartbeat ${heroLoaded ? 'scale-100' : 'scale-0'} transition-all duration-1000`}>
        <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 animate-heartbeat" fill="rgba(239, 68, 68, 0.2)" />
      </div>
      
      {/* Main Title */}
      <div className={`relative ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-700 delay-200`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
          Cardiac Digital Twin
        </h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Human Heart Monitoring
        </div>
      </div>
      
      <div className={`mt-6 sm:mt-8 max-w-3xl mx-auto space-y-4 transition-all duration-700 delay-400 ${heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <p className="text-lg sm:text-xl text-red-100 leading-relaxed">
          Real-time visualization and monitoring of cardiac functions through advanced digital twin technology
        </p>
        <p className="text-base text-pink-200/80">
          Simulate, analyze, and optimize heart performance with predictive healthcare capabilities
        </p>
      </div>
    </div>
  );
}