
// "use client";
// import { useState } from 'react';
// import { Power, Gauge, Thermometer, Play, Square } from 'lucide-react';

// // Mock store for demo - replace with your actual store
// const useMotorStore = () => {
//   const [rpm, setRpm] = useState(1500);
//   const [temperature, setTemperature] = useState(65);
//   const [running, setRunning] = useState(false);
  
//   return {
//     rpm,
//     setRpm,
//     temperature,
//     setTemperature,
//     running,
//     toggleRunning: () => setRunning(!running)
//   };
// };

// export default function ControlPanel() {
//   const { rpm, setRpm, temperature, setTemperature, running, toggleRunning } = useMotorStore();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">Motor Control Panel</h1>
//           <p className="text-slate-400">Real-time motor control and monitoring</p>
//         </div>

//         {/* Status Card */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6 border border-slate-700/50">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className={`p-3 rounded-xl ${running ? 'bg-green-500/20 ring-2 ring-green-500/50' : 'bg-red-500/20 ring-2 ring-red-500/50'}`}>
//                 <Power className={`w-6 h-6 ${running ? 'text-green-400' : 'text-red-400'}`} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">Motor Status</h2>
//                 <p className="text-slate-400">System control interface</p>
//               </div>
//             </div>
//             <div className={`px-6 py-3 rounded-full font-semibold text-sm ${
//               running 
//                 ? 'bg-green-500/20 text-green-400 ring-2 ring-green-500/50' 
//                 : 'bg-red-500/20 text-red-400 ring-2 ring-red-500/50'
//             }`}>
//               {running ? '● Running' : '● Stopped'}
//             </div>
//           </div>

//           {/* Control Button */}
//           <button
//             onClick={toggleRunning}
//             className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
//               running 
//                 ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl shadow-red-900/50' 
//                 : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-xl shadow-green-900/50'
//             }`}
//           >
//             {running ? (
//               <>
//                 <Square className="w-5 h-5" />
//                 Stop Motor
//               </>
//             ) : (
//               <>
//                 <Play className="w-5 h-5 fill-white" />
//                 Start Motor
//               </>
//             )}
//           </button>
//         </div>

//         {/* Control Cards Grid */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* RPM Control */}
//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-3 bg-blue-500/20 rounded-xl ring-2 ring-blue-500/50">
//                 <Gauge className="w-6 h-6 text-blue-400" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-white">Speed Control</h3>
//                 <p className="text-slate-400 text-sm">Adjust motor RPM</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-500/30">
//                 <div className="text-center">
//                   <div className="text-5xl font-bold text-blue-400 mb-1">{rpm}</div>
//                   <div className="text-slate-300 font-medium">RPM</div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <input
//                   type="range"
//                   min="0"
//                   max="3000"
//                   step="50"
//                   value={rpm}
//                   onChange={(e) => setRpm(Number(e.target.value))}
//                   className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
//                   style={{
//                     background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${(rpm / 3000) * 100}%, rgb(51, 65, 85) ${(rpm / 3000) * 100}%, rgb(51, 65, 85) 100%)`
//                   }}
//                 />
//                 <div className="flex justify-between text-xs text-slate-400 font-medium">
//                   <span>0</span>
//                   <span>1500</span>
//                   <span>3000</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-2 mt-4">
//                 <button
//                   onClick={() => setRpm(500)}
//                   className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm font-medium text-slate-300 transition-colors border border-slate-600/50"
//                 >
//                   Low
//                 </button>
//                 <button
//                   onClick={() => setRpm(1500)}
//                   className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm font-medium text-slate-300 transition-colors border border-slate-600/50"
//                 >
//                   Medium
//                 </button>
//                 <button
//                   onClick={() => setRpm(2500)}
//                   className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm font-medium text-slate-300 transition-colors border border-slate-600/50"
//                 >
//                   High
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Temperature Simulation */}
//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="p-3 bg-orange-500/20 rounded-xl ring-2 ring-orange-500/50">
//                 <Thermometer className="w-6 h-6 text-orange-400" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-white">Temperature</h3>
//                 <p className="text-slate-400 text-sm">Thermal simulation</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className={`rounded-xl p-6 border ${
//                 temperature > 80 
//                   ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30' 
//                   : 'bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/30'
//               }`}>
//                 <div className="text-center">
//                   <div className={`text-5xl font-bold mb-1 ${
//                     temperature > 80 ? 'text-red-400' : 'text-orange-400'
//                   }`}>
//                     {temperature}°C
//                   </div>
//                   <div className="text-slate-300 font-medium">Current Temperature</div>
//                 </div>
//               </div>

//               {temperature > 80 && (
//                 <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
//                   <p className="text-red-400 text-sm font-medium">⚠️ High Temperature Warning</p>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <button
//                   onClick={() => setTemperature(Math.min(temperature + 5, 120))}
//                   className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-semibold transition-all shadow-xl shadow-orange-900/50"
//                 >
//                   Increase Heat (+5°C)
//                 </button>
//                 <button
//                   onClick={() => setTemperature(Math.max(temperature - 5, 20))}
//                   className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all shadow-xl shadow-blue-900/50"
//                 >
//                   Decrease Heat (-5°C)
//                 </button>
//                 <button
//                   onClick={() => setTemperature(65)}
//                   className="w-full py-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-xl font-semibold transition-all border border-slate-600/50"
//                 >
//                   Reset to Normal
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Info Footer */}
//         <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
//           <p className="text-blue-300 text-sm text-center font-medium">
//             💡 Tip: Monitor temperature levels to prevent overheating. Keep RPM within safe operating range.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }








"use client";
import { useState } from 'react';
import { Heart, Thermometer, Droplets, Activity, Plus, Minus, Play, Pause, RotateCcw } from 'lucide-react';
import { useHeartStore } from "../app/store/useMotorStore";

// Heart scenarios for simulation
const heartScenarios = {
  normal: {
    heartRate: 75,
    temperature: 98.2,
    systolic: 120,
    diastolic: 80,
    cardiacOutput: 5.0,
    oxygenSaturation: 98,
    respiratoryRate: 16
  },
  tachycardia: {
    heartRate: 130,
    temperature: 99.0,
    systolic: 140,
    diastolic: 90,
    cardiacOutput: 7.5,
    oxygenSaturation: 96,
    respiratoryRate: 22
  },
  bradycardia: {
    heartRate: 45,
    temperature: 97.7,
    systolic: 110,
    diastolic: 70,
    cardiacOutput: 3.5,
    oxygenSaturation: 95,
    respiratoryRate: 12
  },
  hypertensive: {
    heartRate: 85,
    temperature: 98.6,
    systolic: 160,
    diastolic: 100,
    cardiacOutput: 6.0,
    oxygenSaturation: 97,
    respiratoryRate: 18
  },
  hypoxic: {
    heartRate: 110,
    temperature: 98.4,
    systolic: 130,
    diastolic: 85,
    cardiacOutput: 6.5,
    oxygenSaturation: 88,
    respiratoryRate: 24
  }
};

export default function HeartControlPanel() {
  const { telemetry, updateTelemetry } = useHeartStore();
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('normal');

  const handleParameterChange = (parameter: string, value: number) => {
    updateTelemetry({ [parameter]: value });
  };

  const applyScenario = (scenarioKey: string) => {
    setSelectedScenario(scenarioKey);
    updateTelemetry(heartScenarios[scenarioKey as keyof typeof heartScenarios]);
  };

  const startSimulation = () => {
    setIsSimulating(true);
    // In a real implementation, this would start a simulation loop
    console.log('Starting heart simulation...');
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    console.log('Stopping heart simulation...');
  };

  const resetToNormal = () => {
    applyScenario('normal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Heart Simulation Control</h1>
              <p className="text-gray-600">Adjust cardiac parameters and simulate different conditions</p>
            </div>
          </div>
        </div>

        {/* Control Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Heart Rate Control */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Heart Rate Control</h3>
                <p className="text-gray-500 text-sm">Adjust beats per minute</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
                <div className="text-center">
                  <div className={`text-5xl font-bold mb-1 ${
                    telemetry.heartRate > 100 || telemetry.heartRate < 60 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {telemetry.heartRate}
                  </div>
                  <div className="text-gray-700 font-medium">Beats Per Minute</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Bradycardia</span>
                  <span>Tachycardia</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="1"
                  value={telemetry.heartRate}
                  onChange={(e) => handleParameterChange('heartRate', Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  style={{
                    background: `linear-gradient(to right, rgb(239, 68, 68) 0%, rgb(239, 68, 68) ${((telemetry.heartRate - 40) / 120) * 100}%, rgb(209, 213, 219) ${((telemetry.heartRate - 40) / 120) * 100}%, rgb(209, 213, 219) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>40</span>
                  <span>60</span>
                  <span>100</span>
                  <span>120</span>
                  <span>160</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleParameterChange('heartRate', telemetry.heartRate - 5)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                  Decrease 5 BPM
                </button>
                <button
                  onClick={() => handleParameterChange('heartRate', telemetry.heartRate + 5)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Increase 5 BPM
                </button>
              </div>
            </div>
          </div>

          {/* Blood Pressure Control */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Blood Pressure Control</h3>
                <p className="text-gray-500 text-sm">Adjust systolic/diastolic pressure</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Systolic</div>
                    <div className={`text-3xl font-bold ${
                      telemetry.systolic > 140 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {telemetry.systolic}
                    </div>
                    <div className="text-sm text-gray-700">mmHg</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">Diastolic</div>
                    <div className={`text-3xl font-bold ${
                      telemetry.diastolic > 90 ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {telemetry.diastolic}
                    </div>
                    <div className="text-sm text-gray-700">mmHg</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Systolic: {telemetry.systolic} mmHg
                  </label>
                  <input
                    type="range"
                    min="70"
                    max="200"
                    step="1"
                    value={telemetry.systolic}
                    onChange={(e) => handleParameterChange('systolic', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diastolic: {telemetry.diastolic} mmHg
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="130"
                    step="1"
                    value={telemetry.diastolic}
                    onChange={(e) => handleParameterChange('diastolic', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Oxygen & Temperature Control */}
          {/* <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Oxygen & Temperature</h3>
                <p className="text-gray-500 text-sm">Adjust oxygenation and body temperature</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Oxygen Saturation</span>
                  <span className={`text-sm font-bold ${
                    telemetry.oxygenSaturation < 95 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {telemetry.oxygenSaturation}%
                  </span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  step="1"
                  value={telemetry.oxygenSaturation}
                  onChange={(e) => handleParameterChange('oxygenSaturation', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Body Temperature</span>
                  <span className={`text-sm font-bold ${
                    telemetry.temperature >= 103 ? 'text-red-600'
                    : telemetry.temperature > 99 ? 'text-green-600'
                    : telemetry.temperature < 97 ? 'text-yellow-600'
                    : 'text-green-600'
                  }`}>
                    {telemetry.temperature}°F
                  </span>
                </div>
                <input
                  type="range"
                  min="95"
                  max="104"
                  step="0.1"
                  value={telemetry.temperature}
                  onChange={(e) => handleParameterChange('temperature', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>
            </div>
          </div> */}

          {/* Simulation Scenarios */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Play className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Simulation Scenarios</h3>
                <p className="text-gray-500 text-sm">Simulate different cardiac conditions</p>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(heartScenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => applyScenario(key)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    selectedScenario === key
                      ? 'bg-red-50 border-2 border-red-200'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-gray-900 capitalize">{key}</span>
                      <div className="text-sm text-gray-600 mt-1">
                        HR: {scenario.heartRate} BPM | BP: {scenario.systolic}/{scenario.diastolic} | O₂: {scenario.oxygenSaturation}%
                      </div>
                    </div>
                    {selectedScenario === key && (
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={isSimulating ? stopSimulation : startSimulation}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isSimulating
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop Simulation
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Simulation
                  </>
                )}
              </button>
              <button
                onClick={resetToNormal}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Reset to Normal
              </button>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl shadow-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Current Cardiac Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Heart Rhythm</div>
              <div className={`text-lg font-bold ${
                telemetry.heartRate > 100 || telemetry.heartRate < 60 ? 'text-red-600' : 'text-green-600'
              }`}>
                {telemetry.heartRate > 100 ? 'Tachycardic' : 
                 telemetry.heartRate < 60 ? 'Bradycardic' : 'Normal'}
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Blood Pressure</div>
              <div className={`text-lg font-bold ${
                telemetry.systolic > 140 || telemetry.diastolic > 90 ? 'text-red-600' : 'text-green-600'
              }`}>
                {telemetry.systolic > 140 ? 'Hypertensive' : 'Normotensive'}
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Oxygen Status</div>
              <div className={`text-lg font-bold ${
                telemetry.oxygenSaturation < 95 ? 'text-red-600' : 'text-green-600'
              }`}>
                {telemetry.oxygenSaturation < 95 ? 'Hypoxic' : 'Normoxic'}
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Cardiac Output</div>
              <div className={`text-lg font-bold ${
                telemetry.cardiacOutput > 8 || telemetry.cardiacOutput < 4 ? 'text-red-600' : 'text-green-600'
              }`}>
                {telemetry.cardiacOutput > 8 ? 'High' : 
                 telemetry.cardiacOutput < 4 ? 'Low' : 'Normal'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
