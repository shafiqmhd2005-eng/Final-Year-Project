// "use client";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Html } from "@react-three/drei";
// import { useRef, useEffect, useState, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
// import * as THREE from "three";
// import { GLTF } from "three-stdlib";
// import { useMotorStore } from "../app/store/useMotorStore";

// // Define proper type for GLTF result
// type GLTFResult = GLTF & {
//   nodes: Record<string, THREE.Mesh>;
//   materials: Record<string, THREE.Material>;
// };

// export default function MotorViewer() {
//   // Selectors avoid assuming a specific MotorState shape; use `any` as a safe fallback
//   const isMotorRunning = useMotorStore((state: any) => state.isMotorRunning ?? state.isRunning ?? state.running ?? false);
//   const telemetry = useMotorStore((state: any) => state.telemetry);
//   const sensorFaults = useMotorStore((state: any) => state.sensorFaults);
//   const setIsMotorRunning = useMotorStore((state: any) => state.setIsMotorRunning ?? state.setRunning ?? (() => {}));
//   const fetchMotorData = useMotorStore((state: any) => state.fetchMotorData ?? (() => {}));
//   const clearSensorFaults = useMotorStore((state: any) => state.clearSensorFaults ?? (() => {}));

//   // 📈 Fetch data periodically when motor is running
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (isMotorRunning) {
//       fetchMotorData();
//       interval = setInterval(() => {
//         fetchMotorData();
//       }, 1000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isMotorRunning, fetchMotorData]);

//   const handleToggleMotor = () => {
//     setIsMotorRunning(!isMotorRunning);
//   };

//   const handleClearFaults = () => {
//     clearSensorFaults();
//   };

//   return (
//     <div className="w-full h-screen relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Animated background grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

//       {/* 🎥 3D Scene */}
//       <div className="absolute inset-0">
//         <Canvas camera={{ position: [5, 3, 5], fov: 7 }}>
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[4, 1, 4]} intensity={1.2} />
//           <OrbitControls />
//           <MotorModel 
//             isSpinning={isMotorRunning} 
//             currentSpeed={telemetry.speed}
//             currentTemperature={telemetry.temperature}
//             telemetry={telemetry}
//             sensorFaults={sensorFaults}
//           />
//         </Canvas>
//       </div>

//       {/* Top Control Bar - Responsive */}
//       <div className="absolute top-4 left-4 right-4 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//           {/* Control Panel Card */}
//           <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-5 flex-shrink-0">
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//               {/* Start/Stop Button */}
//               <button
//                 onClick={handleToggleMotor}
//                 className={`
//                   relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-sm
//                   transition-all duration-300 transform hover:scale-105 active:scale-95
//                   shadow-lg flex items-center justify-center gap-2 min-w-[140px]
//                   ${isMotorRunning 
//                     ? 'bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-red-400 text-white shadow-red-500/50' 
//                     : 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white shadow-green-500/50'
//                   }
//                 `}
//               >
//                 <span className={`w-2 h-2 rounded-full ${isMotorRunning ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
//                 {isMotorRunning ? "Stop Motor" : "Start Motor"}
//               </button>

//               {/* Status Indicator */}
//               <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg">
//                 <div className={`w-3 h-3 rounded-full ${isMotorRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
//                 <span className="text-xs text-slate-300 font-medium">
//                   {isMotorRunning ? 'Running' : 'Stopped'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side Panels - Telemetry above Faults */}
//       <div className="absolute right-4 top-4 bottom-4 z-10 flex flex-col gap-4">
//         {/* Telemetry Panel */}
//         <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-3">
//           <div className="space-y-2">
//             {/* Speed */}
//             <TelemetryCard
//               label="Speed"
//               value={`${telemetry.speed} RPM`}
//               color="blue"
//               hasFault={sensorFaults.some((f: { sensor: string; }) => f.sensor === 'speed')}
//             />

//             {/* Temperature */}
//             <TelemetryCard
//               label="Temperature"
//               value={`${telemetry.temperature}°C`}
//               color="orange"
//               hasFault={sensorFaults.some((f: { sensor: string; }) => f.sensor === 'temperature')}
//             />

//             {/* Pressure */}
//             <TelemetryCard
//               label="Pressure"
//               value={`${telemetry.pressure} bar`}
//               color="purple"
//               hasFault={sensorFaults.some((f: { sensor: string; }) => f.sensor === 'pressure')}
//             />

//             {/* Vibration */}
//             <TelemetryCard
//               label="Vibration"
//               value={`${telemetry.vibration} mm/s`}
//               color="pink"
//               hasFault={sensorFaults.some((f: { sensor: string; }) => f.sensor === 'vibration')}
//             />

//             {/* Load */}
//             <TelemetryCard
//               label="Load"
//               value={`${telemetry.load}%`}
//               color="green"
//               hasFault={sensorFaults.some((f: { sensor: string; }) => f.sensor === 'load')}
//             />
//           </div>
//         </div>

//         {/* Fault Detection Panel - Below Telemetry */}
//         {sensorFaults.length > 0 && (
//           <div className="backdrop-blur-xl bg-slate-900/95 border-2 border-red-500/50 rounded-xl shadow-2xl p-4 flex-1 overflow-y-auto">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between gap-3 mb-4">
//                 <h3 className="text-red-400 font-bold text-base flex items-center gap-2">
//                   <span className="animate-pulse">🚨</span>
//                   SENSOR FAULTS
//                 </h3>
//                 <span className="text-xs text-red-300 bg-red-500/20 px-3 py-1 rounded-full">
//                   {sensorFaults.length} issue{sensorFaults.length > 1 ? 's' : ''}
//                 </span>
//               </div>
              
//               <div className="space-y-3 flex-1 overflow-y-auto">
//                 {sensorFaults.map((fault: { level: string; sensor: string; message: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
//                   <div
//                     key={index}
//                     className={`
//                       p-3 rounded-lg border-l-4
//                       ${fault.level === "error" 
//                         ? 'bg-red-500/10 border-red-500' 
//                         : 'bg-orange-500/10 border-orange-500'
//                       }
//                     `}
//                   >
//                     <div className="flex flex-col gap-2 mb-2">
//                       <span className="text-sm font-bold text-white">
//                         {fault.level === "error" ? "❌ CRITICAL" : "⚠️ WARNING"}
//                       </span>
//                       <span className={`
//                         text-xs font-bold px-2 py-1 rounded-md w-fit
//                         ${fault.level === "error" ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}
//                       `}>
//                         {fault.sensor.toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="text-xs text-slate-300">
//                       {fault.message}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Connection Fault Overlay */}
//       {sensorFaults.some((f: { sensor: string; }) => f.sensor === 'connection') && (
//         <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 sm:p-8 rounded-2xl border-4 border-white shadow-2xl max-w-md w-full text-center">
//             <div className="text-4xl sm:text-5xl mb-4 animate-pulse">🔴</div>
//             <div className="text-xl sm:text-2xl font-bold mb-2">CONNECTION LOST</div>
//             <div className="text-sm sm:text-base mb-4">Cannot connect to motor API server</div>
//             <div className="text-xs sm:text-sm opacity-80 bg-white/20 px-4 py-2 rounded-lg">
//               Check if server is running on port 3001
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Simple Telemetry Card Component
// interface TelemetryCardProps {
//   label: string;
//   value: string;
//   color: 'blue' | 'orange' | 'purple' | 'pink' | 'green';
//   hasFault: boolean;
// }

// function TelemetryCard({ label, value, color, hasFault }: TelemetryCardProps) {
//   const colorClasses = {
//     blue: 'border-blue-500/50',
//     orange: 'border-orange-500/50',
//     purple: 'border-purple-500/50',
//     pink: 'border-pink-500/50',
//     green: 'border-green-500/50',
//   };

//   const textColor = {
//     blue: 'text-blue-300',
//     orange: 'text-orange-300',
//     purple: 'text-purple-300',
//     pink: 'text-pink-300',
//     green: 'text-green-300',
//   };

//   return (
//     <div className={`
//       border-l-2 px-2 py-1 bg-white/5 rounded
//       ${hasFault ? 'border-red-500 animate-pulse' : colorClasses[color]}
//       ${hasFault ? 'text-red-300' : textColor[color]}
//     `}>
//       <div className="flex items-center justify-between gap-2">
//         <span className="text-xs font-medium">{label}</span>
//         <span className="text-xs font-bold">
//           {value}
//           {hasFault && <span className="ml-1">⚠️</span>}
//         </span>
//       </div>
//     </div>
//   );
// }

// interface MotorModelProps {
//   isSpinning: boolean;
//   currentSpeed: number;
//   currentTemperature: number;
//   telemetry: any;
//   sensorFaults: any[];
// }

// function MotorModel({ isSpinning, currentSpeed, currentTemperature, telemetry, sensorFaults }: MotorModelProps) {
//   const { scene } = useGLTF("/models/electric_motor (1).glb") as unknown as GLTFResult;
//   const selectedMeshesRef = useRef<THREE.Mesh[]>([]);
//   const ventMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
//   const shaftMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
//   const groupRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     const targetMeshes = ["Shaft_Mat_0", "Vent_Mat2_0"];
//     const foundMeshes: THREE.Mesh[] = [];

//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh && targetMeshes.includes(child.name)) {
//         foundMeshes.push(child);
//         const mat = Array.isArray(child.material) ? child.material[0] : child.material;

//         if (child.name === "Vent_Mat2_0" && mat) {
//           ventMaterialRef.current = mat as THREE.MeshStandardMaterial;
//         }
        
//         if (child.name === "Shaft_Mat_0" && mat) {
//           shaftMaterialRef.current = mat as THREE.MeshStandardMaterial;
//         }
//       }
//     });

//     selectedMeshesRef.current = foundMeshes;
//   }, [scene]);

//   useEffect(() => {
//     if (ventMaterialRef.current) {
//       let ventColor = new THREE.Color(0.7, 0.8, 1.0);
      
//       if (currentTemperature > 50) {
//         const intensity = Math.min(1, (currentTemperature - 50) / 30);
//         ventColor = new THREE.Color(1.0, 0.5 - intensity * 0.3, 0.0);
//       } else if (currentTemperature > 40) {
//         const intensity = (currentTemperature - 40) / 10;
//         ventColor = new THREE.Color(1.0, 0.8 - intensity * 0.3, 0.3);
//       } else if (currentTemperature > 30) {
//         const intensity = (currentTemperature - 30) / 10;
//         ventColor = new THREE.Color(0.9, 0.9 - intensity * 0.1, 0.6 - intensity * 0.3);
//       }
      
//       ventMaterialRef.current.color = ventColor;
//       ventMaterialRef.current.needsUpdate = true;
//     }
//   }, [currentTemperature]);

//   useEffect(() => {
//     if (shaftMaterialRef.current) {
//       let shaftColor = new THREE.Color(0.7, 0.7, 0.7);
      
//       if (currentSpeed > 4000) {
//         const intensity = Math.min(1, (currentSpeed - 4000) / 2000);
//         shaftColor = new THREE.Color(1.0, 0.3 - intensity * 0.2, 0.0);
//       } else if (currentSpeed > 3000) {
//         const intensity = (currentSpeed - 3000) / 1000;
//         shaftColor = new THREE.Color(0.9 + intensity * 0.1, 0.6 - intensity * 0.3, 0.2);
//       } else if (currentSpeed > 2000) {
//         const intensity = (currentSpeed - 2000) / 1000;
//         shaftColor = new THREE.Color(0.8 + intensity * 0.1, 0.8 - intensity * 0.2, 0.4 - intensity * 0.2);
//       }
      
//       shaftMaterialRef.current.color = shaftColor;
//       shaftMaterialRef.current.needsUpdate = true;
//     }
//   }, [currentSpeed]);

//   useFrame((_, delta) => {
//     if (isSpinning && currentSpeed > 0) {
//       const rotationSpeed = (currentSpeed / 3000) * 1000;
//       selectedMeshesRef.current.forEach((mesh) => {
//         mesh.rotation.z += delta * rotationSpeed;
//       });
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <primitive object={scene} scale={1.2} />
//     </group>
//   );
// }










// "use client";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Html } from "@react-three/drei";
// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import { GLTF } from "three-stdlib";
// import { useMotorStore } from "../app/store/useMotorStore";

// // Define proper type for GLTF result
// type GLTFResult = GLTF & {
//   nodes: Record<string, THREE.Mesh>;
//   materials: Record<string, THREE.Material>;
// };

// export default function MotorViewer() {
//   const isMotorRunning = useMotorStore((state: any) => state.isMotorRunning);
//   const telemetry = useMotorStore((state: any) => state.telemetry);
//   const sensorFaults = useMotorStore((state: any) => state.sensorFaults);
//   const setIsMotorRunning = useMotorStore((state: any) => state.setIsMotorRunning);
//   const fetchMotorData = useMotorStore((state: any) => state.fetchMotorData);
//   const clearSensorFaults = useMotorStore((state: any) => state.clearSensorFaults);
//   const updateTelemetry = useMotorStore((state: any) => state.updateTelemetry);

//   // WebSocket connection for real-time updates
//   useEffect(() => {
//     const ws = new WebSocket('ws://192.168.29.146:8080');
    
//     ws.onopen = () => {
//       console.log('🔌 Connected to motor data WebSocket');
//     };
    
//     ws.onmessage = (event) => {
//       try {
//         const message = JSON.parse(event.data);
        
//         if (message.type === 'motorUpdate') {
//           console.log('🔄 Received motor update via WebSocket:', message.data);
//           updateTelemetry(message.data);
//         }
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     };
    
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
    
//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };
    
//     return () => {
//       ws.close();
//     };
//   }, [updateTelemetry]);

//   // 📈 Fetch data periodically when motor is running
//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;

//     if (isMotorRunning) {
//       fetchMotorData();
//       interval = setInterval(() => {
//         fetchMotorData();
//       }, 5000); // Poll every 5 seconds as backup
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isMotorRunning, fetchMotorData]);

//   const handleToggleMotor = () => {
//     setIsMotorRunning(!isMotorRunning);
//   };

//   const handleClearFaults = () => {
//     clearSensorFaults();
//   };

//   return (
//     <div className="w-full h-screen relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Animated background grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

//       {/* 🎥 3D Scene */}
//       <div className="absolute inset-0">
//         <Canvas camera={{ position: [5, 3, 5], fov: 7 }}>
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[4, 1, 4]} intensity={1.2} />
//           <OrbitControls />
//           <MotorModel 
//             isSpinning={isMotorRunning} 
//             currentSpeed={telemetry.speed}
//             currentTemperature={telemetry.temperature}
//             telemetry={telemetry}
//             sensorFaults={sensorFaults}
//           />
//         </Canvas>
//       </div>

//       {/* Top Control Bar - Responsive */}
//       <div className="absolute top-4 left-4 right-4 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//           {/* Control Panel Card */}
//           <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-5 flex-shrink-0">
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//               {/* Start/Stop Button */}
//               <button
//                 onClick={handleToggleMotor}
//                 className={`
//                   relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-sm
//                   transition-all duration-300 transform hover:scale-105 active:scale-95
//                   shadow-lg flex items-center justify-center gap-2 min-w-[140px]
//                   ${isMotorRunning 
//                     ? 'bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-red-400 text-white shadow-red-500/50' 
//                     : 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white shadow-green-500/50'
//                   }
//                 `}
//               >
//                 <span className={`w-2 h-2 rounded-full ${isMotorRunning ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
//                 {isMotorRunning ? "Stop Motor" : "Start Motor"}
//               </button>

//               {/* Status Indicator */}
//               <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg">
//                 <div className={`w-3 h-3 rounded-full ${isMotorRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
//                 <span className="text-xs text-slate-300 font-medium">
//                   {isMotorRunning ? 'Running' : 'Stopped'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Real-time Data Indicator */}
//           <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-5">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-xs text-slate-300 font-medium">LIVE</span>
//               </div>
//               <div className="text-xs text-slate-400">
//                 Speed: <span className="text-white font-bold">{telemetry.speed} RPM</span>
//               </div>
//               <div className="text-xs text-slate-400">
//                 Temp: <span className="text-white font-bold">{telemetry.temperature}°C</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side Panels - Telemetry above Faults */}
//       <div className="absolute right-4 top-4 bottom-4 z-10 flex flex-col gap-4">
//         {/* Telemetry Panel */}
//         <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-3">
//           <div className="space-y-2">
//             <TelemetryCard
//               label="Speed"
//               value={`${telemetry.speed} RPM`}
//               color="blue"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'speed')}
//             />
//             <TelemetryCard
//               label="Temperature"
//               value={`${telemetry.temperature}°C`}
//               color="orange"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'temperature')}
//             />
//             <TelemetryCard
//               label="Pressure"
//               value={`${telemetry.pressure} bar`}
//               color="purple"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'pressure')}
//             />
//             <TelemetryCard
//               label="Vibration"
//               value={`${telemetry.vibration} mm/s`}
//               color="pink"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'vibration')}
//             />
//             <TelemetryCard
//               label="Load"
//               value={`${telemetry.load}%`}
//               color="green"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'load')}
//             />
//           </div>
//         </div>

//         {/* Fault Detection Panel - Below Telemetry */}
//         {sensorFaults.length > 0 && (
//           <div className="backdrop-blur-xl bg-slate-900/95 border-2 border-red-500/50 rounded-xl shadow-2xl p-4 flex-1 overflow-y-auto">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between gap-3 mb-4">
//                 <h3 className="text-red-400 font-bold text-base flex items-center gap-2">
//                   <span className="animate-pulse">🚨</span>
//                   SENSOR FAULTS
//                 </h3>
//                 <button
//                   onClick={handleClearFaults}
//                   className="text-xs bg-red-500/20 text-red-300 px-3 py-1 rounded-full hover:bg-red-500/30 transition-colors"
//                 >
//                   Clear
//                 </button>
//               </div>
              
//               <div className="space-y-3 flex-1 overflow-y-auto">
//                 {sensorFaults.map((fault: any, index: number) => (
//                   <div
//                     key={index}
//                     className={`
//                       p-3 rounded-lg border-l-4
//                       ${fault.level === "error" 
//                         ? 'bg-red-500/10 border-red-500' 
//                         : 'bg-orange-500/10 border-orange-500'
//                       }
//                     `}
//                   >
//                     <div className="flex flex-col gap-2 mb-2">
//                       <span className="text-sm font-bold text-white">
//                         {fault.level === "error" ? "❌ CRITICAL" : "⚠️ WARNING"}
//                       </span>
//                       <span className={`
//                         text-xs font-bold px-2 py-1 rounded-md w-fit
//                         ${fault.level === "error" ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}
//                       `}>
//                         {fault.sensor.toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="text-xs text-slate-300">
//                       {fault.message}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Connection Status */}
//       <div className="absolute bottom-4 left-4 z-10">
//         <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-3">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-xs text-slate-300">WebSocket Connected</span>
//           </div>
//         </div>
//       </div>

//       {/* Connection Fault Overlay */}
//       {sensorFaults.some((f: any) => f.sensor === 'connection') && (
//         <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 sm:p-8 rounded-2xl border-4 border-white shadow-2xl max-w-md w-full text-center">
//             <div className="text-4xl sm:text-5xl mb-4 animate-pulse">🔴</div>
//             <div className="text-xl sm:text-2xl font-bold mb-2">CONNECTION LOST</div>
//             <div className="text-sm sm:text-base mb-4">Cannot connect to motor API server</div>
//             <div className="text-xs sm:text-sm opacity-80 bg-white/20 px-4 py-2 rounded-lg">
//               Check if server is running on port 3001
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Simple Telemetry Card Component
// interface TelemetryCardProps {
//   label: string;
//   value: string;
//   color: 'blue' | 'orange' | 'purple' | 'pink' | 'green';
//   hasFault: boolean;
// }

// function TelemetryCard({ label, value, color, hasFault }: TelemetryCardProps) {
//   const colorClasses = {
//     blue: 'border-blue-500/50',
//     orange: 'border-orange-500/50',
//     purple: 'border-purple-500/50',
//     pink: 'border-pink-500/50',
//     green: 'border-green-500/50',
//   };

//   const textColor = {
//     blue: 'text-blue-300',
//     orange: 'text-orange-300',
//     purple: 'text-purple-300',
//     pink: 'text-pink-300',
//     green: 'text-green-300',
//   };

//   return (
//     <div className={`
//       border-l-2 px-2 py-1 bg-white/5 rounded
//       ${hasFault ? 'border-red-500 animate-pulse' : colorClasses[color]}
//       ${hasFault ? 'text-red-300' : textColor[color]}
//     `}>
//       <div className="flex items-center justify-between gap-2">
//         <span className="text-xs font-medium">{label}</span>
//         <span className="text-xs font-bold">
//           {value}
//           {hasFault && <span className="ml-1">⚠️</span>}
//         </span>
//       </div>
//     </div>
//   );
// }

// interface MotorModelProps {
//   isSpinning: boolean;
//   currentSpeed: number;
//   currentTemperature: number;
//   telemetry: any;
//   sensorFaults: any[];
// }

// function MotorModel({ isSpinning, currentSpeed, currentTemperature, telemetry, sensorFaults }: MotorModelProps) {
//   const { scene } = useGLTF("/models/electric_motor (1).glb") as unknown as GLTFResult;
//   const selectedMeshesRef = useRef<THREE.Mesh[]>([]);
//   const ventMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
//   const shaftMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
//   const groupRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     const targetMeshes = ["Shaft_Mat_0", "Vent_Mat2_0"];
//     const foundMeshes: THREE.Mesh[] = [];

//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh && targetMeshes.includes(child.name)) {
//         foundMeshes.push(child);
//         const mat = Array.isArray(child.material) ? child.material[0] : child.material;

//         if (child.name === "Vent_Mat2_0" && mat) {
//           ventMaterialRef.current = mat as THREE.MeshStandardMaterial;
//         }
        
//         if (child.name === "Shaft_Mat_0" && mat) {
//           shaftMaterialRef.current = mat as THREE.MeshStandardMaterial;
//         }
//       }
//     });

//     selectedMeshesRef.current = foundMeshes;
//   }, [scene]);

//   useEffect(() => {
//     if (ventMaterialRef.current) {
//       let ventColor = new THREE.Color(0.7, 0.8, 1.0);
      
//       if (currentTemperature > 50) {
//         const intensity = Math.min(1, (currentTemperature - 50) / 30);
//         ventColor = new THREE.Color(1.0, 0.5 - intensity * 0.3, 0.0);
//       } else if (currentTemperature > 40) {
//         const intensity = (currentTemperature - 40) / 10;
//         ventColor = new THREE.Color(1.0, 0.8 - intensity * 0.3, 0.3);
//       } else if (currentTemperature > 30) {
//         const intensity = (currentTemperature - 30) / 10;
//         ventColor = new THREE.Color(0.9, 0.9 - intensity * 0.1, 0.6 - intensity * 0.3);
//       }
      
//       ventMaterialRef.current.color = ventColor;
//       ventMaterialRef.current.needsUpdate = true;
//     }
//   }, [currentTemperature]);

//   useEffect(() => {
//     if (shaftMaterialRef.current) {
//       let shaftColor = new THREE.Color(0.7, 0.7, 0.7);
      
//       if (currentSpeed > 4000) {
//         const intensity = Math.min(1, (currentSpeed - 4000) / 2000);
//         shaftColor = new THREE.Color(1.0, 0.3 - intensity * 0.2, 0.0);
//       } else if (currentSpeed > 3000) {
//         const intensity = (currentSpeed - 3000) / 1000;
//         shaftColor = new THREE.Color(0.9 + intensity * 0.1, 0.6 - intensity * 0.3, 0.2);
//       } else if (currentSpeed > 2000) {
//         const intensity = (currentSpeed - 2000) / 1000;
//         shaftColor = new THREE.Color(0.8 + intensity * 0.1, 0.8 - intensity * 0.2, 0.4 - intensity * 0.2);
//       }
      
//       shaftMaterialRef.current.color = shaftColor;
//       shaftMaterialRef.current.needsUpdate = true;
//     }
//   }, [currentSpeed]);

//   useFrame((_, delta) => {
//     if (isSpinning && currentSpeed > 0) {
//       const rotationSpeed = (currentSpeed / 3000) * 1000;
//       selectedMeshesRef.current.forEach((mesh) => {
//         mesh.rotation.z += delta * rotationSpeed;
//       });
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <primitive object={scene} scale={1.2} />
//     </group>
//   );
// }










// "use client";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, useGLTF, Html } from "@react-three/drei";
// import { useRef, useEffect, useState } from "react";
// import * as THREE from "three";
// import { GLTF } from "three-stdlib";
// import { useMotorStore } from "../app/store/useMotorStore";

// // Define proper type for GLTF result
// type GLTFResult = GLTF & {
//   nodes: Record<string, THREE.Mesh>;
//   materials: Record<string, THREE.Material>;
// };

// export default function MotorViewer() {
//   const telemetry = useMotorStore((state: any) => state.telemetry);
//   const sensorFaults = useMotorStore((state: any) => state.sensorFaults);
//   const updateTelemetry = useMotorStore((state: any) => state.updateTelemetry);

//   // WebSocket connection for real-time updates
//   useEffect(() => {
//     const ws = new WebSocket('ws://192.168.29.146:8080');
    
//     ws.onopen = () => {
//       console.log('🔌 Connected to motor data WebSocket');
//     };
    
//     ws.onmessage = (event) => {
//       try {
//         const message = JSON.parse(event.data);
        
//         if (message.type === 'motorUpdate') {
//           console.log('🔄 Received motor update via WebSocket:', message.data);
//           updateTelemetry(message.data);
//         }
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     };
    
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
    
//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };
    
//     return () => {
//       ws.close();
//     };
//   }, [updateTelemetry]);

//   return (
//     <div className="w-full h-screen relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Animated background grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

//       {/* 🎥 3D Scene */}
//       <div className="absolute inset-0">
//         <Canvas camera={{ position: [5, 3, 5], fov: 7 }}>
//           <ambientLight intensity={0.6} />
//           <directionalLight position={[4, 1, 4]} intensity={1.2} />
//           <OrbitControls />
//           <MotorModel 
//             isSpinning={telemetry.motorState === 1} 
//             currentSpeed={telemetry.speed}
//             currentTemperature={telemetry.temperature}
//             telemetry={telemetry}
//             sensorFaults={sensorFaults}
//           />
//         </Canvas>
//       </div>

//       {/* Top Control Bar - Responsive */}
//       <div className="absolute top-4 left-4 right-4 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//           {/* Motor State Indicator */}
//           <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-5 flex-shrink-0">
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//               {/* Motor State Display */}
//               <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg">
//                 <div className={`w-3 h-3 rounded-full ${telemetry.motorState === 1 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
//                 <span className="text-xs text-slate-300 font-medium">
//                   {telemetry.motorState === 1 ? 'Running' : 'Stopped'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Real-time Data Indicator */}
//           <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-5">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-xs text-slate-300 font-medium">LIVE</span>
//               </div>
//               <div className="text-xs text-slate-400">
//                 State: <span className="text-white font-bold">{telemetry.motorState === 1 ? 'ON' : 'OFF'}</span>
//               </div>
//               <div className="text-xs text-slate-400">
//                 Speed: <span className="text-white font-bold">{telemetry.speed} RPM</span>
//               </div>
//               <div className="text-xs text-slate-400">
//                 Temp: <span className="text-white font-bold">{telemetry.temperature}°C</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side Panels - Telemetry above Faults */}
//       <div className="absolute right-4 top-4 bottom-4 z-10 flex flex-col gap-4">
//         {/* Telemetry Panel */}
//         <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-3">
//           <div className="space-y-2">
//             <TelemetryCard
//               label="Motor State"
//               value={telemetry.motorState === 1 ? "RUNNING" : "STOPPED"}
//               color={telemetry.motorState === 1 ? "green" : "red"}
//               hasFault={false}
//             />
//             <TelemetryCard
//               label="Speed"
//               value={`${telemetry.speed} RPM`}
//               color="blue"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'speed')}
//             />
//             <TelemetryCard
//               label="Temperature"
//               value={`${telemetry.temperature}°C`}
//               color="orange"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'temperature')}
//             />
//             <TelemetryCard
//               label="Voltage"
//               value={`${telemetry.voltage} V`}
//               color="purple"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'voltage')}
//             />
//             <TelemetryCard
//               label="Current"
//               value={`${telemetry.current} A`}
//               color="pink"
//               hasFault={sensorFaults.some((f: any) => f.sensor === 'current')}
//             />
//             <TelemetryCard
//               label="Vibration"
//               value={telemetry.vibration === 1 ? "WARNING" : "NORMAL"}
//               color={telemetry.vibration === 1 ? "red" : "green"}
//               hasFault={telemetry.vibration === 1}
//             />
//           </div>
//         </div>

//         {/* Fault Detection Panel - Below Telemetry */}
//         {sensorFaults.length > 0 && (
//           <div className="backdrop-blur-xl bg-slate-900/95 border-2 border-red-500/50 rounded-xl shadow-2xl p-4 flex-1 overflow-y-auto">
//             <div className="flex flex-col h-full">
//               <div className="flex items-center justify-between gap-3 mb-4">
//                 <h3 className="text-red-400 font-bold text-base flex items-center gap-2">
//                   <span className="animate-pulse">🚨</span>
//                   SENSOR FAULTS
//                 </h3>
//               </div>
              
//               <div className="space-y-3 flex-1 overflow-y-auto">
//                 {sensorFaults.map((fault: any, index: number) => (
//                   <div
//                     key={index}
//                     className={`
//                       p-3 rounded-lg border-l-4
//                       ${fault.level === "error" 
//                         ? 'bg-red-500/10 border-red-500' 
//                         : 'bg-orange-500/10 border-orange-500'
//                       }
//                     `}
//                   >
//                     <div className="flex flex-col gap-2 mb-2">
//                       <span className="text-sm font-bold text-white">
//                         {fault.level === "error" ? "❌ CRITICAL" : "⚠️ WARNING"}
//                       </span>
//                       <span className={`
//                         text-xs font-bold px-2 py-1 rounded-md w-fit
//                         ${fault.level === "error" ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}
//                       `}>
//                         {fault.sensor.toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="text-xs text-slate-300">
//                       {fault.message}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Connection Status */}
//       <div className="absolute bottom-4 left-4 z-10">
//         <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-3">
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-xs text-slate-300">WebSocket Connected</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Simple Telemetry Card Component
// interface TelemetryCardProps {
//   label: string;
//   value: string;
//   color: 'blue' | 'orange' | 'purple' | 'pink' | 'green' | 'red';
//   hasFault: boolean;
// }

// function TelemetryCard({ label, value, color, hasFault }: TelemetryCardProps) {
//   const colorClasses = {
//     blue: 'border-blue-500/50',
//     orange: 'border-orange-500/50',
//     purple: 'border-purple-500/50',
//     pink: 'border-pink-500/50',
//     green: 'border-green-500/50',
//     red: 'border-red-500/50'
//   };

//   const textColor = {
//     blue: 'text-blue-300',
//     orange: 'text-orange-300',
//     purple: 'text-purple-300',
//     pink: 'text-pink-300',
//     green: 'text-green-300',
//     red: 'text-red-300'
//   };

//   return (
//     <div className={`
//       border-l-2 px-2 py-1 bg-white/5 rounded
//       ${hasFault ? 'border-red-500 animate-pulse' : colorClasses[color]}
//       ${hasFault ? 'text-red-300' : textColor[color]}
//     `}>
//       <div className="flex items-center justify-between gap-2">
//         <span className="text-xs font-medium">{label}</span>
//         <span className="text-xs font-bold">
//           {value}
//           {hasFault && <span className="ml-1">⚠️</span>}
//         </span>
//       </div>
//     </div>
//   );
// }

// interface MotorModelProps {
//   isSpinning: boolean;
//   currentSpeed: number;
//   currentTemperature: number;
//   telemetry: any;
//   sensorFaults: any[];
// }

// function MotorModel({ isSpinning, currentSpeed, currentTemperature, telemetry, sensorFaults }: MotorModelProps) {
//   const { scene } = useGLTF("/models/electric_motor (1).glb") as unknown as GLTFResult;
//   const selectedMeshesRef = useRef<THREE.Mesh[]>([]);
//   const ventMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
//   const shaftMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
//   const groupRef = useRef<THREE.Group>(null);

//   useEffect(() => {
//     const targetMeshes = ["Shaft_Mat_0", "Vent_Mat2_0"];
//     const foundMeshes: THREE.Mesh[] = [];

//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh && targetMeshes.includes(child.name)) {
//         foundMeshes.push(child);
//         const mat = Array.isArray(child.material) ? child.material[0] : child.material;

//         if (child.name === "Vent_Mat2_0" && mat) {
//           ventMaterialRef.current = mat as THREE.MeshStandardMaterial;
//         }
        
//         if (child.name === "Shaft_Mat_0" && mat) {
//           shaftMaterialRef.current = mat as THREE.MeshStandardMaterial;
//         }
//       }
//     });

//     selectedMeshesRef.current = foundMeshes;
//   }, [scene]);

//   useEffect(() => {
//     if (ventMaterialRef.current) {
//       let ventColor = new THREE.Color(0.7, 0.8, 1.0);
      
//       if (currentTemperature > 50) {
//         const intensity = Math.min(1, (currentTemperature - 50) / 30);
//         ventColor = new THREE.Color(1.0, 0.5 - intensity * 0.3, 0.0);
//       } else if (currentTemperature > 40) {
//         const intensity = (currentTemperature - 40) / 10;
//         ventColor = new THREE.Color(1.0, 0.8 - intensity * 0.3, 0.3);
//       } else if (currentTemperature > 30) {
//         const intensity = (currentTemperature - 30) / 10;
//         ventColor = new THREE.Color(0.9, 0.9 - intensity * 0.1, 0.6 - intensity * 0.3);
//       }
      
//       ventMaterialRef.current.color = ventColor;
//       ventMaterialRef.current.needsUpdate = true;
//     }
//   }, [currentTemperature]);

//   useEffect(() => {
//     if (shaftMaterialRef.current) {
//       let shaftColor = new THREE.Color(0.7, 0.7, 0.7);
      
//       if (currentSpeed > 4000) {
//         const intensity = Math.min(1, (currentSpeed - 4000) / 2000);
//         shaftColor = new THREE.Color(1.0, 0.3 - intensity * 0.2, 0.0);
//       } else if (currentSpeed > 3000) {
//         const intensity = (currentSpeed - 3000) / 1000;
//         shaftColor = new THREE.Color(0.9 + intensity * 0.1, 0.6 - intensity * 0.3, 0.2);
//       } else if (currentSpeed > 2000) {
//         const intensity = (currentSpeed - 2000) / 1000;
//         shaftColor = new THREE.Color(0.8 + intensity * 0.1, 0.8 - intensity * 0.2, 0.4 - intensity * 0.2);
//       }
      
//       shaftMaterialRef.current.color = shaftColor;
//       shaftMaterialRef.current.needsUpdate = true;
//     }
//   }, [currentSpeed]);

//   useFrame((_, delta) => {
//     if (isSpinning && currentSpeed > 0) {
//       // Convert RPM to radians per second, then apply delta time
//       const rpm = currentSpeed;
//       const radiansPerSecond = (rpm * 2 * Math.PI) / 60;
//       const rotationThisFrame = radiansPerSecond * delta;
      
//       selectedMeshesRef.current.forEach((mesh) => {
//         mesh.rotation.z += rotationThisFrame;
//       });
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <primitive object={scene} scale={1.2} />
//     </group>
//   );
// }











"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useMotorStore } from "../app/store/useMotorStore";

// Define proper type for GLTF result
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

export default function MotorViewer() {
  const telemetry = useMotorStore((state: any) => state.telemetry);
  const sensorFaults = useMotorStore((state: any) => state.sensorFaults);
  const updateTelemetry = useMotorStore((state: any) => state.updateTelemetry);
  const [wsConnected, setWsConnected] = useState(false);
  const [wsError, setWsError] = useState<string | null>(null);

  // WebSocket connection for real-time updates
  useEffect(() => {
    // Use the same host as the current page, just change the port
    const isDevelopment = process.env.NODE_ENV === 'development';
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    
    // For development, use localhost. For production, use current host
    let wsHost;
    if (isDevelopment) {
      wsHost = 'localhost:8080';
    } else {
      wsHost = window.location.hostname === 'localhost' 
        ? 'localhost:8080' 
        : `${window.location.hostname}:8080`;
    }
    
    const wsUrl = `${protocol}//${wsHost}`;
    console.log('🔌 Connecting to WebSocket:', wsUrl);
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('✅ Connected to motor data WebSocket');
      setWsConnected(true);
      setWsError(null);
    };
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'motorUpdate') {
          console.log('🔄 Received motor update via WebSocket:', message.data);
          updateTelemetry(message.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsError('Failed to connect to motor data server. Make sure the server is running on port 8080.');
      setWsConnected(false);
    };
    
    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      setWsConnected(false);
      
      // Attempt reconnection after 5 seconds if not a normal closure
      if (event.code !== 1000) {
        setTimeout(() => {
          console.log('🔄 Attempting to reconnect WebSocket...');
          setWsError('Reconnecting...');
        }, 5000);
      }
    };
    
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(1000, 'Component unmounting');
      }
    };
  }, [updateTelemetry]);

  return (
    <div className="w-full h-screen relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* 🎥 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [5, 3, 5], fov: 7 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 1, 4]} intensity={1.2} />
          <OrbitControls />
          <MotorModel 
            isSpinning={telemetry.motorState === 1} 
            currentSpeed={telemetry.speed}
            currentTemperature={telemetry.temperature}
            telemetry={telemetry}
            sensorFaults={sensorFaults}
          />
        </Canvas>
      </div>

      {/* Top Control Bar - Responsive */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Motor State Indicator */}
          <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-5 flex-shrink-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Motor State Display */}
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${telemetry.motorState === 1 ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-xs text-slate-300 font-medium">
                  {telemetry.motorState === 1 ? 'Running' : 'Stopped'}
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Data Indicator */}
          <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-xs text-slate-300 font-medium">
                  {wsConnected ? 'LIVE' : 'DISCONNECTED'}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                State: <span className="text-white font-bold">{telemetry.motorState === 1 ? 'ON' : 'OFF'}</span>
              </div>
              <div className="text-xs text-slate-400">
                Speed: <span className="text-white font-bold">{telemetry.speed} RPM</span>
              </div>
              <div className="text-xs text-slate-400">
                Temp: <span className="text-white font-bold">{telemetry.temperature}°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Panels - Telemetry above Faults */}
      <div className="absolute right-4 top-4 bottom-4 z-10 flex flex-col gap-4">
        {/* Telemetry Panel */}
        <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-3">
          <div className="space-y-2">
            <TelemetryCard
              label="Motor State"
              value={telemetry.motorState === 1 ? "RUNNING" : "STOPPED"}
              color={telemetry.motorState === 1 ? "green" : "red"}
              hasFault={false}
            />
            <TelemetryCard
              label="Speed"
              value={`${telemetry.speed} RPM`}
              color="blue"
              hasFault={sensorFaults.some((f: any) => f.sensor === 'speed')}
            />
            <TelemetryCard
              label="Temperature"
              value={`${telemetry.temperature}°C`}
              color="orange"
              hasFault={sensorFaults.some((f: any) => f.sensor === 'temperature')}
            />
            <TelemetryCard
              label="Voltage"
              value={`${telemetry.voltage} V`}
              color="purple"
              hasFault={sensorFaults.some((f: any) => f.sensor === 'voltage')}
            />
            <TelemetryCard
              label="Current"
              value={`${telemetry.current} A`}
              color="pink"
              hasFault={sensorFaults.some((f: any) => f.sensor === 'current')}
            />
            <TelemetryCard
              label="Vibration"
              value={telemetry.vibration === 1 ? "WARNING" : "NORMAL"}
              color={telemetry.vibration === 1 ? "red" : "green"}
              hasFault={telemetry.vibration === 1}
            />
          </div>
        </div>

        {/* Fault Detection Panel - Below Telemetry */}
        {sensorFaults.length > 0 && (
          <div className="backdrop-blur-xl bg-slate-900/95 border-2 border-red-500/50 rounded-xl shadow-2xl p-4 flex-1 overflow-y-auto">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-red-400 font-bold text-base flex items-center gap-2">
                  <span className="animate-pulse">🚨</span>
                  SENSOR FAULTS
                </h3>
              </div>
              
              <div className="space-y-3 flex-1 overflow-y-auto">
                {sensorFaults.map((fault: any, index: number) => (
                  <div
                    key={index}
                    className={`
                      p-3 rounded-lg border-l-4
                      ${fault.level === "error" 
                        ? 'bg-red-500/10 border-red-500' 
                        : 'bg-orange-500/10 border-orange-500'
                      }
                    `}
                  >
                    <div className="flex flex-col gap-2 mb-2">
                      <span className="text-sm font-bold text-white">
                        {fault.level === "error" ? "❌ CRITICAL" : "⚠️ WARNING"}
                      </span>
                      <span className={`
                        text-xs font-bold px-2 py-1 rounded-md w-fit
                        ${fault.level === "error" ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}
                      `}>
                        {fault.sensor.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">
                      {fault.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Connection Status */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-xl shadow-2xl p-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-xs text-slate-300">
              {wsConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}
            </span>
          </div>
          {wsError && (
            <div className="text-xs text-red-400 mt-1 max-w-xs">
              {wsError}
            </div>
          )}
        </div>
      </div>

      {/* Help Message when disconnected */}
      {!wsConnected && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="backdrop-blur-xl bg-slate-900/90 border border-slate-700/50 rounded-2xl shadow-2xl p-6 text-center">
            <div className="text-yellow-400 text-4xl mb-4">⚠️</div>
            <h3 className="text-white font-bold text-lg mb-2">Server Connection Required</h3>
            <p className="text-slate-300 text-sm mb-4 max-w-md">
              Please make sure your motor data server is running on port 8080.
            </p>
            <div className="text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg">
              <p>Run this command in your terminal:</p>
              <code className="text-green-400 block mt-1">node server.ts</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Telemetry Card Component
interface TelemetryCardProps {
  label: string;
  value: string;
  color: 'blue' | 'orange' | 'purple' | 'pink' | 'green' | 'red';
  hasFault: boolean;
}

function TelemetryCard({ label, value, color, hasFault }: TelemetryCardProps) {
  const colorClasses = {
    blue: 'border-blue-500/50',
    orange: 'border-orange-500/50',
    purple: 'border-purple-500/50',
    pink: 'border-pink-500/50',
    green: 'border-green-500/50',
    red: 'border-red-500/50'
  };

  const textColor = {
    blue: 'text-blue-300',
    orange: 'text-orange-300',
    purple: 'text-purple-300',
    pink: 'text-pink-300',
    green: 'text-green-300',
    red: 'text-red-300'
  };

  return (
    <div className={`
      border-l-2 px-2 py-1 bg-white/5 rounded
      ${hasFault ? 'border-red-500 animate-pulse' : colorClasses[color]}
      ${hasFault ? 'text-red-300' : textColor[color]}
    `}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium">{label}</span>
        <span className="text-xs font-bold">
          {value}
          {hasFault && <span className="ml-1">⚠️</span>}
        </span>
      </div>
    </div>
  );
}

interface MotorModelProps {
  isSpinning: boolean;
  currentSpeed: number;
  currentTemperature: number;
  telemetry: any;
  sensorFaults: any[];
}

function MotorModel({ isSpinning, currentSpeed, currentTemperature, telemetry, sensorFaults }: MotorModelProps) {
  const { scene } = useGLTF("/models/electric_motor (1).glb") as unknown as GLTFResult;
  const selectedMeshesRef = useRef<THREE.Mesh[]>([]);
  const ventMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const shaftMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const targetMeshes = ["Shaft_Mat_0", "Vent_Mat2_0"];
    const foundMeshes: THREE.Mesh[] = [];

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && targetMeshes.includes(child.name)) {
        foundMeshes.push(child);
        const mat = Array.isArray(child.material) ? child.material[0] : child.material;

        if (child.name === "Vent_Mat2_0" && mat) {
          ventMaterialRef.current = mat as THREE.MeshStandardMaterial;
        }
        
        if (child.name === "Shaft_Mat_0" && mat) {
          shaftMaterialRef.current = mat as THREE.MeshStandardMaterial;
        }
      }
    });

    selectedMeshesRef.current = foundMeshes;
  }, [scene]);

  useEffect(() => {
    if (ventMaterialRef.current) {
      let ventColor = new THREE.Color(0.7, 0.8, 1.0);
      
      if (currentTemperature > 50) {
        const intensity = Math.min(1, (currentTemperature - 50) / 30);
        ventColor = new THREE.Color(1.0, 0.5 - intensity * 0.3, 0.0);
      } else if (currentTemperature > 40) {
        const intensity = (currentTemperature - 40) / 10;
        ventColor = new THREE.Color(1.0, 0.8 - intensity * 0.3, 0.3);
      } else if (currentTemperature > 30) {
        const intensity = (currentTemperature - 30) / 10;
        ventColor = new THREE.Color(0.9, 0.9 - intensity * 0.1, 0.6 - intensity * 0.3);
      }
      
      ventMaterialRef.current.color = ventColor;
      ventMaterialRef.current.needsUpdate = true;
    }
  }, [currentTemperature]);

  useEffect(() => {
    if (shaftMaterialRef.current) {
      let shaftColor = new THREE.Color(0.7, 0.7, 0.7);
      
      if (currentSpeed > 4000) {
        const intensity = Math.min(1, (currentSpeed - 4000) / 2000);
        shaftColor = new THREE.Color(1.0, 0.3 - intensity * 0.2, 0.0);
      } else if (currentSpeed > 3000) {
        const intensity = (currentSpeed - 3000) / 1000;
        shaftColor = new THREE.Color(0.9 + intensity * 0.1, 0.6 - intensity * 0.3, 0.2);
      } else if (currentSpeed > 2000) {
        const intensity = (currentSpeed - 2000) / 1000;
        shaftColor = new THREE.Color(0.8 + intensity * 0.1, 0.8 - intensity * 0.2, 0.4 - intensity * 0.2);
      }
      
      shaftMaterialRef.current.color = shaftColor;
      shaftMaterialRef.current.needsUpdate = true;
    }
  }, [currentSpeed]);

  useFrame((_, delta) => {
    if (isSpinning && currentSpeed > 0) {
      // Convert RPM to radians per second, then apply delta time
      const rpm = currentSpeed;
      const radiansPerSecond = (rpm * 2 * Math.PI) / 60;
      const rotationThisFrame = radiansPerSecond * delta;
      
      selectedMeshesRef.current.forEach((mesh) => {
        mesh.rotation.z += rotationThisFrame;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.2} />
    </group>
  );
}