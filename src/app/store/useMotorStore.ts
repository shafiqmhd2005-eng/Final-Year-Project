
// // app/store/useMotorStore.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface Telemetry {
//   speed: number;
//   temperature: number;
//   pressure: number;
//   vibration: number;
//   load: number;
// }

// interface SensorFault {
//   level: string;
//   sensor: string;
//   message: string;
// }

// interface MotorHistoryRecord {
//   id: string;
//   timestamp: number;
//   action: 'start' | 'stop';
//   duration?: number;
//   telemetry?: Telemetry;
// }

// interface MotorState {
//   // Motor state
//   isMotorRunning: boolean;
//   telemetry: Telemetry;
//   sensorFaults: SensorFault[];
//   motorHistory: MotorHistoryRecord[];
  
//   // Actions
//   setIsMotorRunning: (running: boolean) => void;
//   updateTelemetry: (newTelemetry: Partial<Telemetry>) => void;
//   setSensorFaults: (faults: SensorFault[]) => void;
//   clearSensorFaults: () => void;
//   addMotorHistory: (record: Omit<MotorHistoryRecord, 'id'>) => void;
//   clearHistory: () => void;
//   fetchMotorData: () => Promise<void>;
// }

// export const useMotorStore = create<MotorState>()(
//   persist(
//     (set, get) => ({
//       // Initial state
//       isMotorRunning: false,
//       telemetry: {
//         speed: 1500,
//         temperature: 35.5,
//         pressure: 1.8,
//         vibration: 0.5,
//         load: 75
//       },
//       sensorFaults: [],
//       motorHistory: [],

//       // Actions
//       setIsMotorRunning: (running: boolean) => {
//         const state = get();
//         const timestamp = Date.now();
        
//         if (running && !state.isMotorRunning) {
//           // Motor starting
//           state.addMotorHistory({
//             timestamp,
//             action: 'start',
//             telemetry: { ...state.telemetry }
//           });
//         } else if (!running && state.isMotorRunning) {
//           // Motor stopping - calculate duration for the last start record
//           const lastStart = state.motorHistory
//             .slice()
//             .reverse()
//             .find(record => record.action === 'start');
          
//           if (lastStart) {
//             const duration = timestamp - lastStart.timestamp;
//             state.addMotorHistory({
//               timestamp,
//               action: 'stop',
//               duration: Math.floor(duration / 1000), // Convert to seconds
//               telemetry: { ...state.telemetry }
//             });
//           }
//         }
        
//         set({ isMotorRunning: running });
//       },

//       updateTelemetry: (newTelemetry) => {
//         set((state) => ({
//           telemetry: {
//             ...state.telemetry,
//             ...newTelemetry
//           }
//         }));

//         // Auto-detect faults based on new telemetry values
//         const state = get();
//         const faults: SensorFault[] = [];
        
//         // Speed faults
//         if (state.telemetry.speed > 4000) {
//           faults.push({
//             level: "error",
//             sensor: "speed",
//             message: `Speed critically high: ${state.telemetry.speed} RPM`
//           });
//         } else if (state.telemetry.speed > 3000) {
//           faults.push({
//             level: "warning",
//             sensor: "speed",
//             message: `Speed high: ${state.telemetry.speed} RPM`
//           });
//         }
        
//         // Temperature faults
//         if (state.telemetry.temperature > 80) {
//           faults.push({
//             level: "error",
//             sensor: "temperature",
//             message: `Temperature critically high: ${state.telemetry.temperature}°C`
//           });
//         } else if (state.telemetry.temperature > 60) {
//           faults.push({
//             level: "warning",
//             sensor: "temperature",
//             message: `Temperature high: ${state.telemetry.temperature}°C`
//           });
//         }
        
//         // Vibration faults
//         if (state.telemetry.vibration > 8) {
//           faults.push({
//             level: "error",
//             sensor: "vibration",
//             message: `Vibration critically high: ${state.telemetry.vibration} mm/s`
//           });
//         } else if (state.telemetry.vibration > 5) {
//           faults.push({
//             level: "warning",
//             sensor: "vibration",
//             message: `Vibration high: ${state.telemetry.vibration} mm/s`
//           });
//         }
        
//         // Load faults
//         if (state.telemetry.load > 95) {
//           faults.push({
//             level: "error",
//             sensor: "load",
//             message: `Load critically high: ${state.telemetry.load}%`
//           });
//         } else if (state.telemetry.load > 85) {
//           faults.push({
//             level: "warning",
//             sensor: "load",
//             message: `Load high: ${state.telemetry.load}%`
//           });
//         }
        
//         // Pressure faults
//         if (state.telemetry.pressure > 3.5) {
//           faults.push({
//             level: "error",
//             sensor: "pressure",
//             message: `Pressure critically high: ${state.telemetry.pressure} bar`
//           });
//         } else if (state.telemetry.pressure > 2.5) {
//           faults.push({
//             level: "warning",
//             sensor: "pressure",
//             message: `Pressure high: ${state.telemetry.pressure} bar`
//           });
//         }

//         set({ sensorFaults: faults });
//       },

//       setSensorFaults: (faults) => {
//         set({ sensorFaults: faults });
//       },

//       clearSensorFaults: () => {
//         set({ sensorFaults: [] });
//       },

//       addMotorHistory: (record) => {
//         const newRecord = {
//           ...record,
//           id: Math.random().toString(36).substr(2, 9)
//         };
        
//         set((state) => ({
//           motorHistory: [...state.motorHistory, newRecord]
//         }));
//       },

//       clearHistory: () => {
//         set({ motorHistory: [] });
//       },

//       fetchMotorData: async () => {
//         try {
//           const response = await fetch('http://192.168.29.146:3001/api/motor-data');
//           const data = await response.json();
          
//           if (data && typeof data === 'object') {
//             get().updateTelemetry({
//               speed: data.speed || 1500,
//               temperature: data.temperature || 35.5,
//               pressure: data.pressure || 1.8,
//               vibration: data.vibration || 0.5,
//               load: data.load || 75
//             });
//           }
//         } catch (error) {
//           console.error('Failed to fetch motor data:', error);
//           // Add connection fault
//           set((state) => ({
//             sensorFaults: [
//               ...state.sensorFaults,
//               {
//                 level: "error",
//                 sensor: "connection",
//                 message: "Cannot connect to motor API server"
//               }
//             ]
//           }));
//         }
//       }
//     }),
//     {
//       name: 'motor-storage',
//       partialize: (state) => ({ 
//         motorHistory: state.motorHistory,
//         telemetry: state.telemetry 
//       })
//     }
//   )
// );





// app/store/useHeartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HeartTelemetry {
  heartRate: number;
  temperature: number;
  systolic: number;
  diastolic: number;
  cardiacOutput: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  ecg: number | null;
}

interface HeartFault {
  level: string;
  parameter: string;
  message: string;
}

interface HeartHistoryRecord {
  id: string;
  timestamp: number;
  event: 'normal' | 'warning' | 'critical';
  telemetry?: HeartTelemetry;
}

interface HeartState {
  // Heart state
  isMonitoringActive: boolean;
  telemetry: HeartTelemetry;
  faults: HeartFault[];
  history: HeartHistoryRecord[];
  
  // Actions
  setIsMonitoringActive: (active: boolean) => void;
  updateTelemetry: (newTelemetry: Partial<HeartTelemetry>) => void;
  setFaults: (faults: HeartFault[]) => void;
  clearFaults: () => void;
  addHistory: (record: Omit<HeartHistoryRecord, 'id'>) => void;
  clearHistory: () => void;
  fetchHeartData: () => Promise<void>;
}

export const useHeartStore = create<HeartState>()(
  persist(
    (set, get) => ({
      // Initial state - Normal healthy heart
      isMonitoringActive: true,
      telemetry: {
        heartRate: 75,
        temperature: 98.2,
        systolic: 120,
        diastolic: 80,
        cardiacOutput: 5.0,
        oxygenSaturation: 98,
        respiratoryRate: 16,
        ecg: null
      },
      faults: [],
      history: [],

      // Actions
      setIsMonitoringActive: (active: boolean) => {
        set({ isMonitoringActive: active });
      },

      updateTelemetry: (newTelemetry) => {
        set((state) => ({
          telemetry: {
            ...state.telemetry,
            ...newTelemetry
          }
        }));

        // Auto-detect abnormalities based on new telemetry values
        const state = get();
        const faults: HeartFault[] = [];
        
        // Heart Rate abnormalities
        if (state.telemetry.heartRate > 120) {
          faults.push({
            level: "critical",
            parameter: "heartRate",
            message: `Tachycardia detected: ${state.telemetry.heartRate} BPM`
          });
        } else if (state.telemetry.heartRate > 100) {
          faults.push({
            level: "warning",
            parameter: "heartRate",
            message: `Elevated heart rate: ${state.telemetry.heartRate} BPM`
          });
        } else if (state.telemetry.heartRate < 50) {
          faults.push({
            level: "critical",
            parameter: "heartRate",
            message: `Bradycardia detected: ${state.telemetry.heartRate} BPM`
          });
        } else if (state.telemetry.heartRate < 60) {
          faults.push({
            level: "warning",
            parameter: "heartRate",
            message: `Low heart rate: ${state.telemetry.heartRate} BPM`
          });
        }
        
        // Blood Pressure abnormalities
        if (state.telemetry.systolic > 180 || state.telemetry.diastolic > 120) {
          faults.push({
            level: "critical",
            parameter: "bloodPressure",
            message: `Hypertensive crisis: ${state.telemetry.systolic}/${state.telemetry.diastolic} mmHg`
          });
        } else if (state.telemetry.systolic > 140 || state.telemetry.diastolic > 90) {
          faults.push({
            level: "warning",
            parameter: "bloodPressure",
            message: `Hypertension: ${state.telemetry.systolic}/${state.telemetry.diastolic} mmHg`
          });
        } else if (state.telemetry.systolic < 90 || state.telemetry.diastolic < 60) {
          faults.push({
            level: "warning",
            parameter: "bloodPressure",
            message: `Hypotension: ${state.telemetry.systolic}/${state.telemetry.diastolic} mmHg`
          });
        }
        
        // Oxygen saturation abnormalities
        if (state.telemetry.oxygenSaturation < 90) {
          faults.push({
            level: "critical",
            parameter: "oxygen",
            message: `Hypoxia detected: ${state.telemetry.oxygenSaturation}% SpO2`
          });
        } else if (state.telemetry.oxygenSaturation < 95) {
          faults.push({
            level: "warning",
            parameter: "oxygen",
            message: `Low oxygen saturation: ${state.telemetry.oxygenSaturation}%`
          });
        }
        
        // Temperature abnormalities
        if (state.telemetry.temperature >= 103) {
          faults.push({
            level: "critical",
            parameter: "temperature",
            message: `Critical high temperature: ${state.telemetry.temperature}°F`
          });
        } else if (state.telemetry.temperature >= 100.4) {
          faults.push({
            level: "warning",
            parameter: "temperature",
            message: `Fever: ${state.telemetry.temperature}°F`
          });
        } else if (state.telemetry.temperature < 95) {
          faults.push({
            level: "critical",
            parameter: "temperature",
            message: `Critical low temperature: ${state.telemetry.temperature}°F`
          });
        } else if (state.telemetry.temperature < 97) {
          faults.push({
            level: "warning",
            parameter: "temperature",
            message: `Below normal temperature: ${state.telemetry.temperature}°F`
          });
        } else if (state.telemetry.temperature > 99) {
          faults.push({
            level: "warning",
            parameter: "temperature",
            message: `Above normal temperature: ${state.telemetry.temperature}°F`
          });
        }
        
        // Cardiac output abnormalities
        if (state.telemetry.cardiacOutput > 10) {
          faults.push({
            level: "warning",
            parameter: "cardiacOutput",
            message: `High cardiac output: ${state.telemetry.cardiacOutput} L/min`
          });
        } else if (state.telemetry.cardiacOutput < 3) {
          faults.push({
            level: "critical",
            parameter: "cardiacOutput",
            message: `Low cardiac output: ${state.telemetry.cardiacOutput} L/min`
          });
        }
        
        // Respiratory rate abnormalities
        if (state.telemetry.respiratoryRate > 24) {
          faults.push({
            level: "warning",
            parameter: "respiratory",
            message: `Tachypnea: ${state.telemetry.respiratoryRate} breaths/min`
          });
        } else if (state.telemetry.respiratoryRate < 10) {
          faults.push({
            level: "critical",
            parameter: "respiratory",
            message: `Bradypnea: ${state.telemetry.respiratoryRate} breaths/min`
          });
        }

        set({ faults: faults });
      },

      setFaults: (faults) => {
        set({ faults: faults });
      },

      clearFaults: () => {
        set({ faults: [] });
      },

      addHistory: (record) => {
        const newRecord = {
          ...record,
          id: Math.random().toString(36).substr(2, 9)
        };
        
        set((state) => ({
          history: [...state.history, newRecord]
        }));
      },

      clearHistory: () => {
        set({ history: [] });
      },

      fetchHeartData: async () => {
        try {
          const response = await fetch('http://localhost:3001/api/heart-data');
          const data = await response.json();
          
          if (data && typeof data === 'object') {
            get().updateTelemetry({
              heartRate: data.heartRate || 75,
              temperature: data.temperature || 98.2,
              systolic: data.systolic || 120,
              diastolic: data.diastolic || 80,
              cardiacOutput: data.cardiacOutput || 5.0,
              oxygenSaturation: data.oxygenSaturation || 98,
              respiratoryRate: data.respiratoryRate || 16,
              ecg: typeof data.ecg === 'number' ? data.ecg : null
            });
          }
        } catch (error) {
          console.error('Failed to fetch heart data:', error);
          // Add connection fault
          set((state) => ({
            faults: [
              ...state.faults,
              {
                level: "warning",
                parameter: "connection",
                message: "Cannot connect to heart data server"
              }
            ]
          }));
        }
      }
    }),
    {
      name: 'heart-storage-v2',
      partialize: (state) => ({ 
        history: state.history
      })
    }
  )
);
