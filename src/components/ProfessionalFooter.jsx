// "use client"

// import { Factory, Shield, TrendingUp, Users, Cog, Database } from 'lucide-react';

// export default function ProfessionalFooter({ isVisible }) {
//   return (
//     <footer className={`w-full max-w-6xl mt-12 sm:mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1300`}>
//       <div className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-500">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
//           {/* Company Info */}
//           <div className="animate-slide-up delay-1400">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-blue-500/20 rounded-lg">
//                 <Factory className="w-6 h-6 text-blue-400" />
//               </div>
//               <h3 className="text-lg font-bold text-white">MotorTech Digital</h3>
//             </div>
//             <p className="text-blue-200 text-sm leading-relaxed mb-4">
//               Leading provider of industrial digital twin solutions for motor optimization and predictive maintenance.
//             </p>
//             <div className="flex gap-3">
//               {[Shield, TrendingUp, Users].map((Icon, index) => (
//                 <div key={index} className="p-2 bg-white/5 rounded-lg hover:bg-blue-500/20 transition-colors duration-300 cursor-pointer">
//                   <Icon className="w-4 h-4 text-blue-300" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="animate-slide-up delay-1500">
//             <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
//             <ul className="space-y-2">
//               {['Dashboard', 'Simulations', 'Analytics', 'Documentation'].map((link, index) => (
//                 <li key={index}>
//                   <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2">
//                     <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Features */}
//           <div className="animate-slide-up delay-1600">
//             <h4 className="text-white font-semibold mb-4 text-lg">Features</h4>
//             <ul className="space-y-2">
//               {['Real-time Monitoring', '3D Visualization', 'Predictive Analytics', 'Performance Reports'].map((feature, index) => (
//                 <li key={index}>
//                   <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2">
//                     <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
//                     {feature}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="animate-slide-up delay-1700">
//             <h4 className="text-white font-semibold mb-4 text-lg">Contact</h4>
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-green-500/20 rounded-lg">
//                   <Cog className="w-4 h-4 text-green-400" />
//                 </div>
//                 <div>
//                   <p className="text-white text-sm font-medium">Support</p>
//                   <p className="text-blue-200 text-xs">support@motortech.com</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-purple-500/20 rounded-lg">
//                   <Database className="w-4 h-4 text-purple-400" />
//                 </div>
//                 <div>
//                   <p className="text-white text-sm font-medium">Sales</p>
//                   <p className="text-blue-200 text-xs">sales@motortech.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }








"use client"

import { Heart, Stethoscope, Shield, TrendingUp, Users, Hospital, Phone, Mail } from 'lucide-react';

export default function ProfessionalFooter({ isVisible }) {
  return (
    <footer className={`w-full max-w-7xl mt-12 sm:mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-1300`}>
      <div className="bg-gradient-to-r from-red-900/40 via-purple-900/30 to-blue-900/40 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-red-400/40 transition-all duration-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Healthcare Organization Info */}
          <div className="animate-slide-up delay-1400">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500/30 to-pink-500/20 rounded-lg">
                <Heart className="w-6 h-6 text-red-400" fill="rgba(239, 68, 68, 0.2)" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">CardioDigital Health</h3>
                <p className="text-red-100/70 text-xs">Advanced Cardiac Care Solutions</p>
              </div>
            </div>
            <p className="text-red-100/70 text-sm leading-relaxed mb-4">
              Leading provider of digital twin solutions for cardiac healthcare, enabling predictive diagnostics and personalized treatment plans.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Shield, color: "green", label: "HIPAA Compliant" },
                { Icon: Stethoscope, color: "blue", label: "FDA Certified" },
                { Icon: Hospital, color: "purple", label: "Medical Grade" }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 transition-all duration-300 cursor-pointer group"
                  title={item.label}
                >
                  <item.Icon className={`w-4 h-4 text-${item.color}-300 group-hover:scale-110 transition-transform`} />
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Resources */}
          <div className="animate-slide-up delay-1500">
            <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Clinical Resources
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Patient Dashboard', desc: 'Real-time monitoring' },
                { name: 'Treatment Simulator', desc: 'Procedure planning' },
                { name: 'ECG Analytics', desc: 'Diagnostic tools' },
                { name: 'Research Portal', desc: 'Medical studies' }
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-red-100/80 hover:text-white text-sm transition-all duration-300 flex items-start gap-2 group">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 group-hover:scale-150 transition-transform"></div>
                    <div>
                      <div className="font-medium group-hover:text-red-300 transition-colors">{item.name}</div>
                      <div className="text-red-100/50 text-xs">{item.desc}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Features */}
          <div className="animate-slide-up delay-1600">
            <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Healthcare Features
            </h4>
            <ul className="space-y-3">
              {[
                { name: '24/7 Cardiac Monitoring', badge: 'Live' },
                { name: '3D Heart Visualization', badge: 'Interactive' },
                { name: 'Predictive Diagnostics', badge: 'AI-Powered' },
                { name: 'Clinical Reports', badge: 'Export' }
              ].map((feature, index) => (
                <li key={index}>
                  <a href="#" className="text-red-100/80 hover:text-white text-sm transition-all duration-300 flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full group-hover:scale-150 transition-transform"></div>
                      <span className="group-hover:text-pink-300 transition-colors">{feature.name}</span>
                    </div>
                    <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30">
                      {feature.badge}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Contact Info */}
          <div className="animate-slide-up delay-1700">
            <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Medical Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Emergency Support</p>
                  <p className="text-red-100/70 text-xs">24/7 Cardiac Helpline</p>
                  <p className="text-blue-300 text-sm font-semibold mt-1">1-800-CARDIO-CARE</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Medical Inquiries</p>
                  <p className="text-red-100/70 text-xs">Clinical team support</p>
                  <p className="text-green-300 text-sm font-semibold mt-1">medical@cardiodigital.health</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Research Collaboration</p>
                  <p className="text-red-100/70 text-xs">Academic & Clinical Partners</p>
                  <p className="text-purple-300 text-sm font-semibold mt-1">research@cardiodigital.health</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Certification & Compliance */}
        <div className="pt-6 border-t border-white/10 animate-slide-up delay-1800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl">
              <div className="text-sm text-red-100/80 mb-1">Medical Certification</div>
              <div className="text-red-400 font-bold">ISO 13485:2016</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl">
              <div className="text-sm text-red-100/80 mb-1">Data Security</div>
              <div className="text-blue-400 font-bold">HIPAA Compliant</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-xl">
              <div className="text-sm text-red-100/80 mb-1">Clinical Validation</div>
              <div className="text-green-400 font-bold">FDA 510(k) Cleared</div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-6 text-center">
            <p className="text-red-100/60 text-sm">
              © 2024 CardioDigital Health. All medical software is for clinical education and simulation purposes. 
              For emergencies, call 911 or your local emergency number.
            </p>
            <div className="flex justify-center gap-6 mt-3">
              <a href="#" className="text-red-100/70 hover:text-red-300 text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-red-100/70 hover:text-red-300 text-xs transition-colors">Terms of Use</a>
              <a href="#" className="text-red-100/70 hover:text-red-300 text-xs transition-colors">Medical Disclaimer</a>
              <a href="#" className="text-red-100/70 hover:text-red-300 text-xs transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
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

.animate-slide-up {
  animation: slide-up 0.8s ease-out backwards;
}

.delay-1400 {
  animation-delay: 1.4s;
}
.delay-1500 {
  animation-delay: 1.5s;
}
.delay-1600 {
  animation-delay: 1.6s;
}
.delay-1700 {
  animation-delay: 1.7s;
}
.delay-1800 {
  animation-delay: 1.8s;
}

/* Medical color classes */
.bg-red-500\/10 { background-color: rgba(239, 68, 68, 0.1); }
.bg-red-500\/20 { background-color: rgba(239, 68, 68, 0.2); }
.bg-red-500\/30 { background-color: rgba(239, 68, 68, 0.3); }
.bg-pink-500\/20 { background-color: rgba(236, 72, 153, 0.2); }
.bg-blue-500\/10 { background-color: rgba(59, 130, 246, 0.1); }
.bg-blue-500\/20 { background-color: rgba(59, 130, 246, 0.2); }
.bg-green-500\/20 { background-color: rgba(34, 197, 94, 0.2); }
.bg-green-500\/30 { background-color: rgba(34, 197, 94, 0.3); }
.bg-purple-500\/20 { background-color: rgba(168, 85, 247, 0.2); }
.bg-purple-500\/30 { background-color: rgba(168, 85, 247, 0.3); }

.border-red-400\/40 { border-color: rgba(248, 113, 113, 0.4); }

.text-red-100\\/70 { color: rgba(254, 226, 226, 0.7); }
.text-red-100\\/80 { color: rgba(254, 226, 226, 0.8); }
.text-red-100\\/60 { color: rgba(254, 226, 226, 0.6); }
.text-red-100\\/50 { color: rgba(254, 226, 226, 0.5); }

.text-red-300 { color: #fca5a5; }
.text-red-400 { color: #f87171; }
.text-pink-300 { color: #f9a8d4; }
.text-blue-300 { color: #93c5fd; }
.text-green-300 { color: #86efac; }
.text-purple-300 { color: #d8b4fe; }

.bg-red-400 { background-color: #f87171; }
.bg-pink-400 { background-color: #f472b6; }
.bg-blue-400 { background-color: #60a5fa; }

.bg-pink-500\\/20 { background-color: rgba(236, 72, 153, 0.2); }
.border-pink-500\\/30 { border-color: rgba(236, 72, 153, 0.3); }

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-red-500\\/30 {
  --tw-gradient-from: rgba(239, 68, 68, 0.3);
  --tw-gradient-to: rgba(239, 68, 68, 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-pink-500\\/20 {
  --tw-gradient-to: rgba(236, 72, 153, 0.2);
}
`;

// Add this style tag in your component or global CSS
<style jsx>{styles}</style>