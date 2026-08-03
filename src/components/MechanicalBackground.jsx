
// "use client"

// import { Wrench, Hammer, Cog, Settings } from 'lucide-react';

// export default function MechanicalBackground() {
//   return (
//     <>
//       {/* Animated Mechanical Background */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
//       {/* Mechanical Elements Animation */}
//       <div className="absolute inset-0 overflow-hidden opacity-40">
//         {/* Settings Gears with Slow Rotation - More Visible */}
//         <div className="absolute top-1/4 left-1/4 animate-settings-spin-1">
//           <div className="w-24 h-24 border-4 border-blue-400/40 rounded-full border-dashed relative">
//             <div className="absolute inset-4 border-2 border-blue-400/30 rounded-full"></div>
//             <Settings className="w-10 h-10 text-blue-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//           </div>
//         </div>
        
//         <div className="absolute top-1/3 right-1/4 animate-settings-spin-2">
//           <div className="w-20 h-20 border-4 border-cyan-400/40 rounded-full border-dashed relative">
//             <div className="absolute inset-3 border-2 border-cyan-400/30 rounded-full"></div>
//             <Cog className="w-8 h-8 text-cyan-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//           </div>
//         </div>
        
//         <div className="absolute bottom-1/4 left-1/3 animate-settings-spin-3">
//           <div className="w-16 h-16 border-4 border-blue-400/35 rounded-full border-dashed relative">
//             <div className="absolute inset-2 border-2 border-blue-400/25 rounded-full"></div>
//             <Settings className="w-6 h-6 text-blue-400/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//           </div>
//         </div>

//         {/* Large Background Settings Circles - More Visible */}
//         <div className="absolute top-1/6 left-1/6 animate-settings-orbital-1">
//           <div className="w-40 h-40 border-3 border-purple-400/25 rounded-full border-dotted">
//             <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
//               <Cog className="w-6 h-6 text-purple-400/40 animate-spin-slow" />
//             </div>
//           </div>
//         </div>
        
//         <div className="absolute bottom-1/6 right-1/6 animate-settings-orbital-2">
//           <div className="w-48 h-48 border-3 border-cyan-400/20 rounded-full border-dotted">
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
//               <Settings className="w-7 h-7 text-cyan-400/35 animate-spin-reverse-slow" />
//             </div>
//           </div>
//         </div>

//         {/* Tools with More Visible Floating */}
//         <div className="absolute top-1/6 right-1/6 animate-settings-float-1">
//           <div className="p-3 bg-blue-500/15 rounded-lg backdrop-blur-sm">
//             <Wrench className="w-7 h-7 text-blue-400/60" />
//           </div>
//         </div>
        
//         <div className="absolute bottom-1/5 left-1/5 animate-settings-float-2">
//           <div className="p-3 bg-cyan-500/15 rounded-lg backdrop-blur-sm">
//             <Hammer className="w-6 h-6 text-cyan-400/60" />
//           </div>
//         </div>

//         {/* More Visible Configuration Dots and Lines */}
//         <div className="absolute top-1/2 left-1/4">
//           <div className="flex space-x-10 animate-pulse-slow">
//             <div className="w-3 h-3 bg-blue-400/40 rounded-full shadow-lg shadow-blue-400/20"></div>
//             <div className="w-3 h-3 bg-cyan-400/40 rounded-full shadow-lg shadow-cyan-400/20"></div>
//             <div className="w-3 h-3 bg-blue-400/40 rounded-full shadow-lg shadow-blue-400/20"></div>
//           </div>
//         </div>

//         {/* More Visible Settings Panel Outline */}
//         <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <div className="w-72 h-52 border-3 border-blue-400/25 rounded-xl border-dashed animate-panel-glow backdrop-blur-sm bg-blue-400/5">
//             <div className="absolute inset-5 border-2 border-cyan-400/15 rounded-lg"></div>
//             {/* Settings Grid */}
//             <div className="absolute inset-8 grid grid-cols-3 gap-6 opacity-50">
//               {[...Array(9)].map((_, i) => (
//                 <div key={i} className="flex items-center justify-center">
//                   <div className="w-4 h-4 border-2 border-blue-400/30 rounded-sm animate-pulse-slow bg-blue-400/10"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* More Visible Rotating Settings Dial */}
//         <div className="absolute bottom-1/3 right-1/4 animate-dial-rotate">
//           <div className="w-20 h-20 border-3 border-cyan-400/25 rounded-full relative backdrop-blur-sm bg-cyan-400/5">
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
//               <div className="w-2 h-4 bg-cyan-400/50 rounded-full shadow shadow-cyan-400/30"></div>
//             </div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-blue-400/20 rounded-full"></div>
//           </div>
//         </div>

//         {/* More Visible Slow Moving Waves */}
//         <div className="absolute bottom-0 left-0 w-full">
//           <div className="h-2 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-wave-slow"></div>
//           <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-wave-slow mt-2" style={{animationDelay: '2s'}}></div>
//         </div>

//         {/* More Visible Pulsing Control Points */}
//         <div className="absolute top-3/4 left-1/4">
//           <div className="flex space-x-6 animate-pulse-sequential">
//             <div className="w-4 h-4 border-2 border-blue-400/40 rounded-full bg-blue-400/10 shadow shadow-blue-400/20"></div>
//             <div className="w-4 h-4 border-2 border-cyan-400/40 rounded-full bg-cyan-400/10 shadow shadow-cyan-400/20"></div>
//             <div className="w-4 h-4 border-2 border-blue-400/40 rounded-full bg-blue-400/10 shadow shadow-blue-400/20"></div>
//           </div>
//         </div>

//         {/* More Visible Configuration Lines */}
//         <div className="absolute top-1/4 right-1/3">
//           <div className="w-24 h-1.5 bg-gradient-to-l from-blue-400/25 to-transparent animate-line-pulse shadow shadow-blue-400/10"></div>
//           <div className="w-1.5 h-16 bg-gradient-to-b from-cyan-400/25 to-transparent animate-line-pulse-delayed ml-6 shadow shadow-cyan-400/10"></div>
//         </div>

//         {/* Additional Visible Elements */}
//         <div className="absolute top-2/3 right-1/3 animate-settings-float-3">
//           <div className="p-3 bg-purple-500/15 rounded-lg backdrop-blur-sm">
//             <Cog className="w-6 h-6 text-purple-400/60" />
//           </div>
//         </div>

//         {/* Connection Lines */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           <div className="w-64 h-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-connection-pulse rotate-45"></div>
//           <div className="w-64 h-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 animate-connection-pulse -rotate-45 mt-4"></div>
//         </div>
//       </div>

//       {/* Add this to your CSS */}
//       <style jsx>{`
//         @keyframes settings-spin-1 {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes settings-spin-2 {
//           from { transform: rotate(360deg); }
//           to { transform: rotate(0deg); }
//         }
        
//         @keyframes settings-spin-3 {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(-360deg); }
//         }
        
//         @keyframes settings-orbital-1 {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(180deg); }
//         }
        
//         @keyframes settings-orbital-2 {
//           from { transform: rotate(180deg); }
//           to { transform: rotate(0deg); }
//         }
        
//         @keyframes settings-float-1 {
//           0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
//           50% { transform: translateY(-15px) translateX(8px) scale(1.1); }
//         }
        
//         @keyframes settings-float-2 {
//           0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
//           50% { transform: translateY(12px) translateX(-8px) scale(1.1); }
//         }
        
//         @keyframes settings-float-3 {
//           0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
//           50% { transform: translateY(-10px) translateX(-10px) scale(1.05); }
//         }
        
//         @keyframes dial-rotate {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes panel-glow {
//           0%, 100% { 
//             box-shadow: 0 0 30px rgba(59, 130, 246, 0.15);
//             border-color: rgba(59, 130, 246, 0.3);
//           }
//           50% { 
//             box-shadow: 0 0 50px rgba(34, 211, 238, 0.2);
//             border-color: rgba(34, 211, 238, 0.4);
//           }
//         }
        
//         @keyframes wave-slow {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
        
//         @keyframes pulse-sequential {
//           0% { opacity: 0.4; transform: scale(1); }
//           33% { opacity: 0.8; transform: scale(1.2); }
//           66% { opacity: 0.4; transform: scale(1); }
//           100% { opacity: 0.4; transform: scale(1); }
//         }
        
//         @keyframes line-pulse {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.6; }
//         }
        
//         @keyframes line-pulse-delayed {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.5; }
//         }
        
//         @keyframes connection-pulse {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.7; }
//         }

//         .animate-settings-spin-1 {
//           animation: settings-spin-1 25s linear infinite;
//         }
        
//         .animate-settings-spin-2 {
//           animation: settings-spin-2 30s linear infinite;
//         }
        
//         .animate-settings-spin-3 {
//           animation: settings-spin-3 20s linear infinite;
//         }
        
//         .animate-settings-orbital-1 {
//           animation: settings-orbital-1 40s linear infinite;
//         }
        
//         .animate-settings-orbital-2 {
//           animation: settings-orbital-2 35s linear infinite;
//         }
        
//         .animate-settings-float-1 {
//           animation: settings-float-1 6s ease-in-out infinite;
//         }
        
//         .animate-settings-float-2 {
//           animation: settings-float-2 7s ease-in-out infinite;
//         }
        
//         .animate-settings-float-3 {
//           animation: settings-float-3 8s ease-in-out infinite;
//         }
        
//         .animate-dial-rotate {
//           animation: dial-rotate 15s linear infinite;
//         }
        
//         .animate-panel-glow {
//           animation: panel-glow 4s ease-in-out infinite;
//         }
        
//         .animate-wave-slow {
//           animation: wave-slow 15s linear infinite;
//         }
        
//         .animate-pulse-sequential > div:nth-child(1) {
//           animation: pulse-sequential 3s ease-in-out infinite;
//         }
        
//         .animate-pulse-sequential > div:nth-child(2) {
//           animation: pulse-sequential 3s ease-in-out infinite 1s;
//         }
        
//         .animate-pulse-sequential > div:nth-child(3) {
//           animation: pulse-sequential 3s ease-in-out infinite 2s;
//         }
        
//         .animate-line-pulse {
//           animation: line-pulse 3s ease-in-out infinite;
//         }
        
//         .animate-line-pulse-delayed {
//           animation: line-pulse-delayed 3s ease-in-out infinite 1.5s;
//         }
        
//         .animate-connection-pulse {
//           animation: connection-pulse 4s ease-in-out infinite;
//         }
        
//         .animate-pulse-slow {
//           animation: pulse 4s ease-in-out infinite;
//         }
        
//         @keyframes pulse {
//           0%, 100% { opacity: 0.4; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.1); }
//         }
//       `}</style>
//     </>
//   );
// }






"use client"

import { Heart, Activity, Stethoscope, Brain, Thermometer, Droplets, AlertCircle } from 'lucide-react';

export default function MedicalBackground() {
  return (
    <>
      {/* Animated Medical Background */}
      <div className="absolute inset-0 bg-heartbeat-pattern opacity-15"></div>
      
      {/* Medical Elements Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* ECG Monitor Waves */}
        <div className="absolute top-1/4 left-1/4 animate-ecg-wave-1">
          <div className="w-64 h-32 border-2 border-red-400/30 rounded-xl border-dashed relative backdrop-blur-sm bg-red-400/5">
            <div className="absolute inset-3">
              {/* ECG Waveform */}
              <svg width="100%" height="100%" className="opacity-40">
                <path 
                  d="M0,50 Q 30,10 60,50 T 120,50 T 180,20 T 240,80 T 300,50" 
                  stroke="rgba(239, 68, 68, 0.4)" 
                  fill="none" 
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
            <Heart className="w-8 h-8 text-red-400/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Heart Beat Monitor */}
        <div className="absolute top-1/3 right-1/4 animate-heartbeat-pulse">
          <div className="w-20 h-20 border-3 border-pink-400/40 rounded-full relative">
            <div className="absolute inset-3 border-2 border-pink-400/30 rounded-full animate-pulse-heart"></div>
            <Heart className="w-10 h-10 text-pink-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-heartbeat" fill="rgba(236, 72, 153, 0.2)" />
          </div>
        </div>
        
        {/* Vital Signs Monitor */}
        <div className="absolute bottom-1/4 left-1/3 animate-vitals-float">
          <div className="w-48 h-24 border-2 border-blue-400/35 rounded-xl border-dashed relative backdrop-blur-sm bg-blue-400/5">
            <div className="absolute inset-3 flex items-center justify-between">
              <Activity className="w-6 h-6 text-blue-400/40" /> {/* Changed from Pulse to Activity */}
              <Thermometer className="w-6 h-6 text-orange-400/40" />
              <Droplets className="w-6 h-6 text-cyan-400/40" />
            </div>
          </div>
        </div>

        {/* Brain Activity Monitor */}
        <div className="absolute top-1/6 left-1/6 animate-brain-activity">
          <div className="w-40 h-40 border-3 border-purple-400/25 rounded-full border-dotted">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <Brain className="w-8 h-8 text-purple-400/40 animate-pulse-brain" />
            </div>
            {/* Brain wave lines */}
            <div className="absolute inset-5">
              <svg width="100%" height="100%" className="opacity-30">
                <path d="M10,30 Q 30,10 50,30 T 90,30" stroke="rgba(168, 85, 247, 0.3)" fill="none" strokeWidth="1" />
                <path d="M10,50 Q 30,30 50,50 T 90,50" stroke="rgba(168, 85, 247, 0.3)" fill="none" strokeWidth="1" />
                <path d="M10,70 Q 30,50 50,70 T 90,70" stroke="rgba(168, 85, 247, 0.3)" fill="none" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Medical Equipment Panel */}
        <div className="absolute bottom-1/6 right-1/6 animate-medical-orbital">
          <div className="w-48 h-48 border-3 border-green-400/20 rounded-xl border-dotted backdrop-blur-sm bg-green-400/5">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <Stethoscope className="w-8 h-8 text-green-400/35 animate-stethoscope-float" />
            </div>
            {/* Medical equipment icons */}
            <div className="absolute top-4 left-4">
              <Activity className="w-5 h-5 text-red-400/40" />
            </div>
            <div className="absolute top-4 right-4">
              <AlertCircle className="w-5 h-5 text-yellow-400/40" />
            </div>
          </div>
        </div>

        {/* Floating Medical Icons */}
        <div className="absolute top-1/6 right-1/6 animate-medical-float-1">
          <div className="p-3 bg-red-500/15 rounded-lg backdrop-blur-sm">
            <Heart className="w-7 h-7 text-red-400/60" fill="rgba(239, 68, 68, 0.2)" />
          </div>
        </div>
        
        <div className="absolute bottom-1/5 left-1/5 animate-medical-float-2">
          <div className="p-3 bg-blue-500/15 rounded-lg backdrop-blur-sm">
            <Activity className="w-6 h-6 text-blue-400/60" />
          </div>
        </div>

        {/* Medical Data Points */}
        <div className="absolute top-1/2 left-1/4">
          <div className="flex space-x-10 animate-pulse-slow">
            <div className="w-3 h-3 bg-red-400/40 rounded-full shadow-lg shadow-red-400/20"></div>
            <div className="w-3 h-3 bg-pink-400/40 rounded-full shadow-lg shadow-pink-400/20"></div>
            <div className="w-3 h-3 bg-purple-400/40 rounded-full shadow-lg shadow-purple-400/20"></div>
          </div>
        </div>

        {/* Medical Dashboard Panel */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-72 h-52 border-3 border-red-400/25 rounded-xl border-dashed animate-medical-panel-glow backdrop-blur-sm bg-red-400/5">
            <div className="absolute inset-5 border-2 border-pink-400/15 rounded-lg"></div>
            {/* Medical Data Grid */}
            <div className="absolute inset-8 grid grid-cols-3 gap-6 opacity-50">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-red-400/30 rounded-sm animate-pulse-slow bg-red-400/10"></div>
                </div>
              ))}
            </div>
            {/* Vital signs labels */}
            <div className="absolute top-2 left-4 text-xs text-red-300/50">HR</div>
            <div className="absolute top-2 right-4 text-xs text-blue-300/50">BP</div>
            <div className="absolute bottom-2 left-4 text-xs text-green-300/50">O₂</div>
            <div className="absolute bottom-2 right-4 text-xs text-purple-300/50">TEMP</div>
          </div>
        </div>

        {/* Pulse Monitor */}
        <div className="absolute bottom-1/3 right-1/4 animate-pulse-monitor">
          <div className="w-24 h-24 border-3 border-red-400/25 rounded-full relative backdrop-blur-sm bg-red-400/5">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
              <div className="w-2 h-4 bg-red-400/50 rounded-full shadow shadow-red-400/30"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-pink-400/20 rounded-full"></div>
            {/* Pulse animation */}
            <div className="absolute inset-0">
              <div className="w-full h-full rounded-full border-2 border-red-400/30 animate-pulse-ring"></div>
            </div>
          </div>
        </div>

        {/* Medical Wave Lines */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="h-2 bg-gradient-to-r from-transparent via-red-400/15 to-transparent animate-medical-wave-slow"></div>
          <div className="h-1 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent animate-medical-wave-slow mt-2" style={{animationDelay: '2s'}}></div>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent animate-medical-wave-slow mt-1" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Medical Monitoring Points */}
        <div className="absolute top-3/4 left-1/4">
          <div className="flex space-x-6 animate-medical-pulse-sequential">
            <div className="w-4 h-4 border-2 border-red-400/40 rounded-full bg-red-400/10 shadow shadow-red-400/20"></div>
            <div className="w-4 h-4 border-2 border-blue-400/40 rounded-full bg-blue-400/10 shadow shadow-blue-400/20"></div>
            <div className="w-4 h-4 border-2 border-green-400/40 rounded-full bg-green-400/10 shadow shadow-green-400/20"></div>
            <div className="w-4 h-4 border-2 border-purple-400/40 rounded-full bg-purple-400/10 shadow shadow-purple-400/20"></div>
          </div>
        </div>

        {/* Medical Connection Lines */}
        <div className="absolute top-1/4 right-1/3">
          <div className="w-24 h-1.5 bg-gradient-to-l from-red-400/25 to-transparent animate-medical-line-pulse shadow shadow-red-400/10"></div>
          <div className="w-1.5 h-16 bg-gradient-to-b from-pink-400/25 to-transparent animate-medical-line-pulse-delayed ml-6 shadow shadow-pink-400/10"></div>
        </div>

        {/* Additional Medical Elements */}
        <div className="absolute top-2/3 right-1/3 animate-medical-float-3">
          <div className="p-3 bg-purple-500/15 rounded-lg backdrop-blur-sm">
            <Brain className="w-6 h-6 text-purple-400/60" />
          </div>
        </div>

        {/* Medical Network Connections */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 animate-medical-connection-pulse rotate-45"></div>
          <div className="w-64 h-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-medical-connection-pulse -rotate-45 mt-4"></div>
          <div className="w-64 h-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-medical-connection-pulse rotate-0 mt-8"></div>
        </div>

        {/* EKG Rhythm Lines */}
        <div className="absolute top-1/5 left-1/5 w-32 h-16 opacity-20">
          <svg width="100%" height="100%">
            <path 
              d="M0,8 L 8,8 L 10,4 L 12,12 L 14,2 L 16,10 L 18,6 L 20,8 L 32,8" 
              stroke="rgba(239, 68, 68, 0.3)" 
              fill="none" 
              strokeWidth="1.5"
            />
          </svg>
        </div>
        
        <div className="absolute bottom-1/5 right-1/5 w-32 h-16 opacity-20">
          <svg width="100%" height="100%">
            <path 
              d="M0,8 L 5,8 L 7,3 L 9,13 L 11,1 L 13,9 L 15,5 L 17,8 L 32,8" 
              stroke="rgba(59, 130, 246, 0.3)" 
              fill="none" 
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Heart Rate Variability Dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-red-400/30 rounded-full"
            style={{
              left: `${20 + i * 6}%`,
              top: `${30 + Math.sin(i) * 20}%`,
              animation: `heartbeat-dot ${1 + Math.random() * 2}s infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Medical Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          animation: 'medical-gradient-move 20s ease-in-out infinite alternate'
        }}></div>
      </div>

      {/* Add this to your CSS */}
      <style jsx>{`
        .bg-heartbeat-pattern {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.1) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.05) 1px, transparent 0);
          background-size: 50px 50px, 100px 100px;
          background-position: 0 0, 25px 25px;
        }

        @keyframes ecg-wave-1 {
          0% { transform: translateX(0) rotate(0deg); }
          100% { transform: translateX(20px) rotate(1deg); }
        }
        
        @keyframes heartbeat-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes pulse-heart {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
            border-color: rgba(236, 72, 153, 0.4);
          }
          50% { 
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
            border-color: rgba(236, 72, 153, 0.6);
          }
        }
        
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes vitals-float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-10px) translateX(5px) scale(1.02); }
        }
        
        @keyframes brain-activity {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-brain {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes medical-orbital {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes stethoscope-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
        }
        
        @keyframes medical-float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-15px) translateX(8px) scale(1.1); }
        }
        
        @keyframes medical-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(12px) translateX(-8px) scale(1.1); }
        }
        
        @keyframes medical-float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          50% { transform: translateY(-10px) translateX(-10px) scale(1.05); }
        }
        
        @keyframes pulse-monitor {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes medical-panel-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.15);
            border-color: rgba(239, 68, 68, 0.3);
          }
          50% { 
            box-shadow: 0 0 50px rgba(236, 72, 153, 0.2);
            border-color: rgba(236, 72, 153, 0.4);
          }
        }
        
        @keyframes medical-wave-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes medical-pulse-sequential {
          0% { opacity: 0.3; transform: scale(1); }
          25% { opacity: 0.7; transform: scale(1.1); }
          50% { opacity: 0.3; transform: scale(1); }
          75% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        
        @keyframes medical-line-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        
        @keyframes medical-line-pulse-delayed {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        
        @keyframes medical-connection-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        @keyframes medical-gradient-move {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        @keyframes heartbeat-dot {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.5);
            opacity: 0.7;
          }
        }

        .animate-ecg-wave-1 {
          animation: ecg-wave-1 20s ease-in-out infinite alternate;
        }
        
        .animate-heartbeat-pulse {
          animation: heartbeat-pulse 2s ease-in-out infinite;
        }
        
        .animate-pulse-heart {
          animation: pulse-heart 2s ease-in-out infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animate-vitals-float {
          animation: vitals-float 8s ease-in-out infinite;
        }
        
        .animate-brain-activity {
          animation: brain-activity 60s linear infinite;
        }
        
        .animate-pulse-brain {
          animation: pulse-brain 3s ease-in-out infinite;
        }
        
        .animate-medical-orbital {
          animation: medical-orbital 40s linear infinite;
        }
        
        .animate-stethoscope-float {
          animation: stethoscope-float 3s ease-in-out infinite;
        }
        
        .animate-medical-float-1 {
          animation: medical-float-1 6s ease-in-out infinite;
        }
        
        .animate-medical-float-2 {
          animation: medical-float-2 7s ease-in-out infinite;
        }
        
        .animate-medical-float-3 {
          animation: medical-float-3 8s ease-in-out infinite;
        }
        
        .animate-pulse-monitor {
          animation: pulse-monitor 20s linear infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        
        .animate-medical-panel-glow {
          animation: medical-panel-glow 4s ease-in-out infinite;
        }
        
        .animate-medical-wave-slow {
          animation: medical-wave-slow 20s linear infinite;
        }
        
        .animate-medical-pulse-sequential > div:nth-child(1) {
          animation: medical-pulse-sequential 4s ease-in-out infinite;
        }
        
        .animate-medical-pulse-sequential > div:nth-child(2) {
          animation: medical-pulse-sequential 4s ease-in-out infinite 1s;
        }
        
        .animate-medical-pulse-sequential > div:nth-child(3) {
          animation: medical-pulse-sequential 4s ease-in-out infinite 2s;
        }
        
        .animate-medical-pulse-sequential > div:nth-child(4) {
          animation: medical-pulse-sequential 4s ease-in-out infinite 3s;
        }
        
        .animate-medical-line-pulse {
          animation: medical-line-pulse 3s ease-in-out infinite;
        }
        
        .animate-medical-line-pulse-delayed {
          animation: medical-line-pulse-delayed 3s ease-in-out infinite 1.5s;
        }
        
        .animate-medical-connection-pulse {
          animation: medical-connection-pulse 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}