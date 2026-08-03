// "use client"

// import { Cog, Rocket, Brain, Settings, Wrench, Cctv, TrendingUp } from 'lucide-react';

// const mainBenefits = [
//   {
//     icon: Cog,
//     title: "Predictive Maintenance",
//     description: "Identify potential failures before they occur with AI-powered anomaly detection",
//     stats: "99.8% Accuracy",
//     color: "blue",
//     delay: "delay-1000"
//   },
//   {
//     icon: Rocket,
//     title: "Performance Optimization",
//     description: "Maximize motor efficiency and reduce energy consumption by up to 25%",
//     stats: "25% Energy Saved",
//     color: "green",
//     delay: "delay-1100"
//   },
//   {
//     icon: Brain,
//     title: "AI-Powered Insights",
//     description: "Get intelligent recommendations based on machine learning algorithms",
//     stats: "Smart Analytics",
//     color: "purple",
//     delay: "delay-1200"
//   }
// ];

// const additionalBenefits = [
//   { icon: Settings, label: "Real-time Monitoring", value: "24/7", color: "cyan" },
//   { icon: Wrench, label: "Maintenance Cost", value: "-40%", color: "green" },
//   { icon: Cctv, label: "Uptime", value: "99.9%", color: "blue" },
//   { icon: TrendingUp, label: "Efficiency", value: "+18%", color: "purple" }
// ];

// export default function KeyBenefits({ isVisible }) {
//   return (
//     <div className={`w-full max-w-6xl mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} delay-900`}>
//       <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8 animate-fade-in-up">
//         Key Benefits of Digital Twin Technology
//       </h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//         {/* Left Column - Main Benefits */}
//         <div className="space-y-6">
//           {mainBenefits.map((benefit, index) => (
//             <div
//               key={index}
//               className={`bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-${benefit.color}-400/50 hover:scale-105 transition-all duration-500 group animate-slide-up ${benefit.delay}`}
//             >
//               <div className="flex items-start gap-4">
//                 <div className={`p-3 bg-${benefit.color}-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
//                   <benefit.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${benefit.color}-400`} />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-lg sm:text-xl font-bold text-white">{benefit.title}</h3>
//                     <span className={`text-xs font-semibold text-${benefit.color}-400 bg-${benefit.color}-500/20 px-2 py-1 rounded-full`}>
//                       {benefit.stats}
//                     </span>
//                   </div>
//                   <p className="text-blue-200 text-sm leading-relaxed">
//                     {benefit.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Right Column - Additional Benefits with Icons */}
//         <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-blue-400/30 h-full">
//           <h3 className="text-xl font-bold text-white text-center mb-6">Operational Excellence</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {additionalBenefits.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white/5 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300 animate-bounce-in"
//                 style={{ animationDelay: `${1300 + index * 100}ms` }}
//               >
//                 <div className={`inline-flex p-2 bg-${item.color}-500/20 rounded-lg mb-2`}>
//                   <item.icon className={`w-5 h-5 text-${item.color}-400`} />
//                 </div>
//                 <div className={`text-2xl font-bold text-${item.color}-400 mb-1`}>{item.value}</div>
//                 <div className="text-xs text-blue-200">{item.label}</div>
//               </div>
//             ))}
//           </div>
          
//           {/* Progress Bars */}
//           <div className="mt-6 space-y-4">
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-blue-200">System Reliability</span>
//                 <span className="text-green-400 font-semibold">98%</span>
//               </div>
//               <div className="w-full bg-white/10 rounded-full h-2">
//                 <div className="bg-green-500 h-2 rounded-full animate-progress-width" style={{ width: '98%' }}></div>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-blue-200">Data Accuracy</span>
//                 <span className="text-cyan-400 font-semibold">99.7%</span>
//               </div>
//               <div className="w-full bg-white/10 rounded-full h-2">
//                 <div className="bg-cyan-500 h-2 rounded-full animate-progress-width-delayed" style={{ width: '99.7%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client"

import { Heart, Activity, Brain, Stethoscope, Shield, TrendingUp, Clock, Zap } from 'lucide-react';

const mainBenefits = [
  {
    icon: Heart,
    title: "Early Disease Detection",
    description: "Identify potential cardiac issues before symptoms appear with AI-powered predictive analytics",
    stats: "95% Early Detection",
    color: "red",
    delay: "delay-1000"
  },
  {
    icon: Activity,
    title: "Personalized Treatment",
    description: "Optimize medication plans and interventions based on individual patient physiology and response patterns",
    stats: "30% Better Outcomes",
    color: "pink",
    delay: "delay-1100"
  },
  {
    icon: Brain,
    title: "AI Clinical Insights",
    description: "Receive intelligent diagnostic recommendations based on deep learning analysis of cardiac patterns",
    stats: "Smart Diagnostics",
    color: "purple",
    delay: "delay-1200"
  }
];

const additionalBenefits = [
  { icon: Clock, label: "24/7 Monitoring", value: "Continuous", color: "cyan" },
  { icon: Shield, label: "Patient Safety", value: "99.9%", color: "green" },
  { icon: Stethoscope, label: "Diagnostic Accuracy", value: "98.5%", color: "red" },
  { icon: TrendingUp, label: "Treatment Efficacy", value: "+35%", color: "purple" }
];

export default function KeyBenefits({ isVisible }) {
  return (
    <div className={`w-full max-w-7xl mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} delay-900`}>
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 animate-fade-in-up">
          Clinical Benefits of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Cardiac Digital Twin</span>
        </h2>
        <p className="text-red-100/80 text-sm sm:text-base max-w-3xl mx-auto">
          Transforming cardiac care through advanced digital simulation and predictive analytics
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Column - Clinical Benefits */}
        <div className="space-y-6">
          {mainBenefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-red-900/30 via-purple-900/20 to-blue-900/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-${benefit.color}-400/50 hover:scale-[1.02] transition-all duration-500 group animate-slide-up ${benefit.delay}`}
            >
              <div className="flex items-start gap-4">
                <div className={`relative flex-shrink-0`}>
                  <div className={`absolute inset-0 bg-${benefit.color}-500/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500`}></div>
                  <div className={`relative p-3 bg-gradient-to-br from-${benefit.color}-500/40 to-${benefit.color}-600/30 rounded-xl border border-${benefit.color}-400/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <benefit.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${benefit.color}-300`} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
                      {benefit.title}
                    </h3>
                    <span className={`text-xs font-bold text-${benefit.color}-300 bg-${benefit.color}-500/20 px-3 py-1.5 rounded-full border border-${benefit.color}-500/30`}>
                      {benefit.stats}
                    </span>
                  </div>
                  <p className="text-red-100/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Clinical Metrics */}
        <div className="bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 h-full">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Clinical Excellence Metrics</h3>
            <p className="text-red-100/70 text-sm">Real-world impact of cardiac digital twin technology</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {additionalBenefits.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-${item.color}-500/5 to-${item.color}-600/5 backdrop-blur-sm rounded-xl p-4 text-center border border-${item.color}-400/20 hover:border-${item.color}-400/40 hover:scale-105 transition-all duration-300 animate-bounce-in`}
                style={{ animationDelay: `${1300 + index * 100}ms` }}
              >
                <div className={`inline-flex p-2.5 bg-gradient-to-br from-${item.color}-500/30 to-${item.color}-600/20 rounded-lg mb-3 border border-${item.color}-400/30`}>
                  <item.icon className={`w-5 h-5 text-${item.color}-300`} />
                </div>
                <div className={`text-2xl sm:text-3xl font-bold text-${item.color}-300 mb-1`}>{item.value}</div>
                <div className="text-xs text-red-100/80 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
          
          {/* Clinical Progress Indicators */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-red-100 font-medium">Early Intervention Success</span>
                <span className="text-green-400 font-bold">92%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full animate-progress-width" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-red-100 font-medium">Hospital Readmission Reduction</span>
                <span className="text-blue-400 font-bold">45%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full animate-progress-width-delayed" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-red-100 font-medium">Patient Satisfaction</span>
                <span className="text-pink-400 font-bold">96%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-rose-400 h-2 rounded-full animate-progress-width" style={{ animationDelay: '0.5s', width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Healthcare Impact Summary */}
      <div className="mt-8 sm:mt-10 bg-gradient-to-r from-red-500/15 via-purple-500/15 to-blue-500/15 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">50%</div>
            <div className="text-sm text-red-100/80">Reduction in diagnostic time</div>
          </div>
          <div className="p-4">
            <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-2">40%</div>
            <div className="text-sm text-red-100/80">Lower treatment costs</div>
          </div>
          <div className="p-4">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">1000+</div>
            <div className="text-sm text-red-100/80">Lives positively impacted</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these CSS styles to your global CSS or component
const styles = `
@keyframes fade-in-up {
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

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes progress-width {
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
}

@keyframes progress-width-delayed {
  0% {
    width: 0%;
  }
  50% {
    width: 0%;
  }
  100% {
    width: var(--target-width);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out backwards;
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out backwards;
}

.animate-progress-width {
  animation: progress-width 1.5s ease-out forwards;
}

.animate-progress-width-delayed {
  animation: progress-width-delayed 2s ease-out forwards;
}

.delay-1000 {
  animation-delay: 1s;
}
.delay-1100 {
  animation-delay: 1.1s;
}
.delay-1200 {
  animation-delay: 1.2s;
}

/* Color classes for dynamic Tailwind colors */
.bg-red-500\/5 { background-color: rgba(239, 68, 68, 0.05); }
.bg-red-600\/5 { background-color: rgba(220, 38, 38, 0.05); }
.bg-pink-500\/5 { background-color: rgba(236, 72, 153, 0.05); }
.bg-pink-600\/5 { background-color: rgba(219, 39, 119, 0.05); }
.bg-purple-500\/5 { background-color: rgba(168, 85, 247, 0.05); }
.bg-purple-600\/5 { background-color: rgba(147, 51, 234, 0.05); }
.bg-green-500\/5 { background-color: rgba(34, 197, 94, 0.05); }
.bg-green-600\/5 { background-color: rgba(22, 163, 74, 0.05); }
.bg-cyan-500\/5 { background-color: rgba(6, 182, 212, 0.05); }
.bg-cyan-600\/5 { background-color: rgba(8, 145, 178, 0.05); }

.bg-red-500\/10 { background-color: rgba(239, 68, 68, 0.1); }
.bg-pink-500\/10 { background-color: rgba(236, 72, 153, 0.1); }
.bg-purple-500\/10 { background-color: rgba(168, 85, 247, 0.1); }
.bg-blue-500\/10 { background-color: rgba(59, 130, 246, 0.1); }

.bg-red-500\/30 { background-color: rgba(239, 68, 68, 0.3); }
.bg-pink-500\/30 { background-color: rgba(236, 72, 153, 0.3); }
.bg-purple-500\/30 { background-color: rgba(168, 85, 247, 0.3); }
.bg-green-500\/30 { background-color: rgba(34, 197, 94, 0.3); }
.bg-cyan-500\/30 { background-color: rgba(6, 182, 212, 0.3); }

.bg-red-500\/40 { background-color: rgba(239, 68, 68, 0.4); }
.bg-pink-500\/40 { background-color: rgba(236, 72, 153, 0.4); }
.bg-purple-500\/40 { background-color: rgba(168, 85, 247, 0.4); }

.bg-red-600\/20 { background-color: rgba(220, 38, 38, 0.2); }
.bg-pink-600\/20 { background-color: rgba(219, 39, 119, 0.2); }
.bg-purple-600\/20 { background-color: rgba(147, 51, 234, 0.2); }

.border-red-400\/50 { border-color: rgba(248, 113, 113, 0.5); }
.border-pink-400\/50 { border-color: rgba(244, 114, 182, 0.5); }
.border-purple-400\/50 { border-color: rgba(192, 132, 252, 0.5); }
.border-green-400\/50 { border-color: rgba(74, 222, 128, 0.5); }
.border-cyan-400\/50 { border-color: rgba(34, 211, 238, 0.5); }

.border-red-500\/30 { border-color: rgba(239, 68, 68, 0.3); }
.border-pink-500\/30 { border-color: rgba(236, 72, 153, 0.3); }
.border-purple-500\/30 { border-color: rgba(168, 85, 247, 0.3); }
.border-green-500\/30 { border-color: rgba(34, 197, 94, 0.3); }
.border-cyan-500\/30 { border-color: rgba(6, 182, 212, 0.3); }

.text-red-300 { color: #fca5a5; }
.text-pink-300 { color: #f9a8d4; }
.text-purple-300 { color: #d8b4fe; }
.text-green-300 { color: #86efac; }
.text-cyan-300 { color: #67e8f9; }
.text-blue-300 { color: #93c5fd; }
`;

// Add this style tag in your component or global CSS
<style jsx>{styles}</style>