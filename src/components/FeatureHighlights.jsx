// "use client"

// import { Eye, Activity, BarChart3 } from 'lucide-react';

// const features = [
//   {
//     icon: Eye,
//     title: "Real-Time Visualization",
//     description: "Monitor motor operations with live 3D models and instant parameter updates for complete operational transparency",
//     color: "blue",
//     delay: "delay-100"
//   },
//   {
//     icon: Activity,
//     title: "Performance Monitoring",
//     description: "Track critical parameters including speed, torque, temperature, and efficiency metrics across all operational states",
//     color: "green",
//     delay: "delay-200"
//   },
//   {
//     icon: BarChart3,
//     title: "Data Analytics",
//     description: "Access comprehensive historical data analysis and predictive insights to optimize motor performance and lifespan",
//     color: "purple",
//     delay: "delay-300"
//   }
// ];

// export default function FeatureHighlights() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 w-full max-w-6xl px-2">
//       {features.map((feature, index) => (
//         <div
//           key={index}
//           className={`bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-${feature.color}-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-${feature.color}-500/20 transition-all duration-500 text-center animate-slide-up ${feature.delay}`}
//         >
//           <div className={`inline-flex p-3 sm:p-4 bg-${feature.color}-500/20 rounded-full mb-3 sm:mb-4 animate-bounce-subtle`}>
//             <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${feature.color}-400`} />
//           </div>
//           <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
//             {feature.title}
//           </h3>
//           <p className="text-blue-200 text-xs sm:text-sm leading-relaxed">
//             {feature.description}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }









"use client"

import { Heart, Activity, BarChart3, Brain, Stethoscope, Cpu } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: "Real-Time Cardiac Monitoring",
    description: "Monitor heart function with live 3D visualization and instant vital sign updates for complete clinical transparency",
    color: "red",
    delay: "delay-100"
  },
  {
    icon: Activity,
    title: "Vital Signs Tracking",
    description: "Track critical parameters including heart rate, blood pressure, oxygen levels, and cardiac output across all physiological states",
    color: "pink",
    delay: "delay-200"
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Access comprehensive ECG analysis and predictive insights to optimize cardiac health and early anomaly detection",
    color: "purple",
    delay: "delay-300"
  },
  {
    icon: Stethoscope,
    title: "Diagnostic Tools",
    description: "Advanced diagnostic capabilities including arrhythmia detection, ST-segment analysis, and hemodynamic monitoring",
    color: "green",
    delay: "delay-400"
  },
  {
    icon: BarChart3,
    title: "Health Analytics",
    description: "Comprehensive historical data analysis and trend prediction for proactive cardiac care and personalized treatment plans",
    color: "blue",
    delay: "delay-500"
  },
  {
    icon: Cpu,
    title: "Smart Simulation",
    description: "Run virtual stress tests, medication simulations, and surgical procedure planning in a risk-free digital environment",
    color: "cyan",
    delay: "delay-600"
  }
];

export default function FeatureHighlights() {
  return (
    <div className="w-full max-w-7xl px-2 sm:px-4">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
          Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Cardiac Features</span>
        </h2>
        <p className="text-red-100/80 text-sm sm:text-base max-w-3xl mx-auto">
          Comprehensive tools for cardiac monitoring, analysis, and simulation in a digital environment
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-white/5 to-${feature.color}-500/5 backdrop-blur-lg rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-${feature.color}-400/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${feature.color}-500/20 transition-all duration-500 group animate-slide-up ${feature.delay}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`relative mb-4 sm:mb-5`}>
                <div className={`absolute inset-0 bg-${feature.color}-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500`}></div>
                <div className={`relative inline-flex p-3 sm:p-4 bg-gradient-to-br from-${feature.color}-500/30 to-${feature.color}-600/20 rounded-full border border-${feature.color}-400/30 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${feature.color}-300`} />
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-red-100/70 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Feature badge */}
              <div className={`mt-4 px-3 py-1 bg-${feature.color}-500/10 border border-${feature.color}-500/30 rounded-full text-xs font-medium text-${feature.color}-300`}>
                Cardiac Feature
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-4 text-center border border-red-500/20">
          <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-1">99.8%</div>
          <div className="text-xs sm:text-sm text-red-300">Diagnostic Accuracy</div>
        </div>
        <div className="bg-pink-500/10 backdrop-blur-sm rounded-xl p-4 text-center border border-pink-500/20">
          <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-1">24/7</div>
          <div className="text-xs sm:text-sm text-pink-300">Real-time Monitoring</div>
        </div>
        <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-500/20">
          <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">50ms</div>
          <div className="text-xs sm:text-sm text-purple-300">Data Update Speed</div>
        </div>
        <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-500/20">
          <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">100+</div>
          <div className="text-xs sm:text-sm text-blue-300">Cardiac Parameters</div>
        </div>
      </div>
    </div>
  );
}

// Add these CSS styles to your global CSS or component
const styles = `
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

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out backwards;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}
.delay-400 {
  animation-delay: 0.4s;
}
.delay-500 {
  animation-delay: 0.5s;
}
.delay-600 {
  animation-delay: 0.6s;
}

/* Color classes for dynamic Tailwind colors */
.bg-red-500\/5 { background-color: rgba(239, 68, 68, 0.05); }
.bg-pink-500\/5 { background-color: rgba(236, 72, 153, 0.05); }
.bg-purple-500\/5 { background-color: rgba(168, 85, 247, 0.05); }
.bg-green-500\/5 { background-color: rgba(34, 197, 94, 0.05); }
.bg-blue-500\/5 { background-color: rgba(59, 130, 246, 0.05); }
.bg-cyan-500\/5 { background-color: rgba(6, 182, 212, 0.05); }

.hover\\:shadow-red-500\\/20:hover { box-shadow: 0 10px 30px rgba(239, 68, 68, 0.2); }
.hover\\:shadow-pink-500\\/20:hover { box-shadow: 0 10px 30px rgba(236, 72, 153, 0.2); }
.hover\\:shadow-purple-500\\/20:hover { box-shadow: 0 10px 30px rgba(168, 85, 247, 0.2); }
.hover\\:shadow-green-500\\/20:hover { box-shadow: 0 10px 30px rgba(34, 197, 94, 0.2); }
.hover\\:shadow-blue-500\\/20:hover { box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2); }
.hover\\:shadow-cyan-500\\/20:hover { box-shadow: 0 10px 30px rgba(6, 182, 212, 0.2); }

.border-red-400\\/50 { border-color: rgba(248, 113, 113, 0.5); }
.border-pink-400\\/50 { border-color: rgba(244, 114, 182, 0.5); }
.border-purple-400\\/50 { border-color: rgba(192, 132, 252, 0.5); }
.border-green-400\\/50 { border-color: rgba(74, 222, 128, 0.5); }
.border-blue-400\\/50 { border-color: rgba(96, 165, 250, 0.5); }
.border-cyan-400\\/50 { border-color: rgba(34, 211, 238, 0.5); }

.text-red-300 { color: #fca5a5; }
.text-pink-300 { color: #f9a8d4; }
.text-purple-300 { color: #d8b4fe; }
.text-green-300 { color: #86efac; }
.text-blue-300 { color: #93c5fd; }
.text-cyan-300 { color: #67e8f9; }

.bg-red-500\\/30 { background-color: rgba(239, 68, 68, 0.3); }
.bg-pink-500\\/30 { background-color: rgba(236, 72, 153, 0.3); }
.bg-purple-500\\/30 { background-color: rgba(168, 85, 247, 0.3); }
.bg-green-500\\/30 { background-color: rgba(34, 197, 94, 0.3); }
.bg-blue-500\\/30 { background-color: rgba(59, 130, 246, 0.3); }
.bg-cyan-500\\/30 { background-color: rgba(6, 182, 212, 0.3); }

.bg-red-600\\/20 { background-color: rgba(220, 38, 38, 0.2); }
.bg-pink-600\\/20 { background-color: rgba(219, 39, 119, 0.2); }
.bg-purple-600\\/20 { background-color: rgba(147, 51, 234, 0.2); }
.bg-green-600\\/20 { background-color: rgba(22, 163, 74, 0.2); }
.bg-blue-600\\/20 { background-color: rgba(37, 99, 235, 0.2); }
.bg-cyan-600\\/20 { background-color: rgba(8, 145, 178, 0.2); }

.bg-red-500\\/10 { background-color: rgba(239, 68, 68, 0.1); }
.bg-pink-500\\/10 { background-color: rgba(236, 72, 153, 0.1); }
.bg-purple-500\\/10 { background-color: rgba(168, 85, 247, 0.1); }
.bg-blue-500\\/10 { background-color: rgba(59, 130, 246, 0.1); }

.border-red-500\\/20 { border-color: rgba(239, 68, 68, 0.2); }
.border-pink-500\\/20 { border-color: rgba(236, 72, 153, 0.2); }
.border-purple-500\\/20 { border-color: rgba(168, 85, 247, 0.2); }
.border-blue-500\\/20 { border-color: rgba(59, 130, 246, 0.2); }
`;

// Add this style tag in your component or global CSS
<style jsx>{styles}</style>