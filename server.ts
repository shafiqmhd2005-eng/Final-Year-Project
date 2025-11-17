// // server.ts
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Interface for motor data
// interface MotorData {
//   speed: number;
//   temperature: number;
//   pressure: number;
//   vibration: number;
//   load: number;
// }

// // Default motor data
// let motorData: MotorData = {
//   speed: 1500,
//   temperature: 35.5,
//   pressure: 1.8,
//   vibration: 0.5,
//   load: 75
// };

// // GET endpoint to fetch current motor data
// app.get('/api/motor-data', (req: any, res: any) => {
//   console.log('📥 GET Request received - Current motor data:', motorData);
//   res.json(motorData);
// });

// // POST endpoint to update motor data (for Postman)
// app.post('/api/motor-data', (req: any, res: any) => {
//   try {
//     const { speed, temperature, pressure, vibration, load } = req.body;
    
//     // Update only provided fields, keep others unchanged
//     if (speed !== undefined) motorData.speed = Number(speed);
//     if (temperature !== undefined) motorData.temperature = Number(temperature);
//     if (pressure !== undefined) motorData.pressure = Number(pressure);
//     if (vibration !== undefined) motorData.vibration = Number(vibration);
//     if (load !== undefined) motorData.load = Number(load);
    
//     console.log('📤 POST Request - Motor data updated:', motorData);
    
//     res.json({
//       message: 'Motor data updated successfully',
//       data: motorData
//     });
//   } catch (error) {
//     console.error('❌ Error updating motor data:', error);
//     res.status(500).json({ error: 'Failed to update motor data' });
//   }
// });

// // PUT endpoint as alternative to POST
// app.put('/api/motor-data', (req: any, res: any) => {
//   try {
//     motorData = { ...motorData, ...req.body };
//     console.log('🔄 PUT Request - Motor data updated:', motorData);
    
//     res.json({
//       message: 'Motor data updated successfully via PUT',
//       data: motorData
//     });
//   } catch (error) {
//     console.error('❌ Error updating motor data:', error);
//     res.status(500).json({ error: 'Failed to update motor data' });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req: any, res: any) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Motor API server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Motor API server running on http://localhost:${PORT}`);
//   console.log(`📊 Motor Data API: http://localhost:${PORT}/api/motor-data`);
//   console.log(`❤️ Health Check: http://localhost:${PORT}/api/health`);
// });






// // server.ts
// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Interface for motor data
// interface MotorData {
//   speed: number;
//   temperature: number;
//   pressure: number;
//   vibration: number;
//   load: number;
// }

// // Default motor data
// let motorData: MotorData = {
//   speed: 1500,
//   temperature: 35.5,
//   pressure: 1.8,
//   vibration: 0.5,
//   load: 75
// };

// // Store update history for debugging
// let updateHistory: Array<{timestamp: Date, method: string, data: MotorData}> = [];

// // 📊 GET endpoint that ACTS LIKE POST - Updates AND returns data
// app.get('/api/motor-data', (req: any, res: any) => {
//   try {
//     const { speed, temperature, pressure, vibration, load } = req.query;
    
//     // Track if any updates were made
//     let wasUpdated = false;
//     const previousData = { ...motorData };
    
//     // Update motor data if query parameters are provided
//     if (speed !== undefined) {
//       motorData.speed = Number(speed);
//       wasUpdated = true;
//     }
//     if (temperature !== undefined) {
//       motorData.temperature = Number(temperature);
//       wasUpdated = true;
//     }
//     if (pressure !== undefined) {
//       motorData.pressure = Number(pressure);
//       wasUpdated = true;
//     }
//     if (vibration !== undefined) {
//       motorData.vibration = Number(vibration);
//       wasUpdated = true;
//     }
//     if (load !== undefined) {
//       motorData.load = Number(load);
//       wasUpdated = true;
//     }
    
//     // Log the update
//     if (wasUpdated) {
//       updateHistory.push({
//         timestamp: new Date(),
//         method: 'GET',
//         data: { ...motorData }
//       });
      
//       // Keep only last 10 updates
//       if (updateHistory.length > 10) {
//         updateHistory = updateHistory.slice(-10);
//       }
      
//       console.log('🔄 GET Request UPDATED motor data:', {
//         from: previousData,
//         to: motorData,
//         query: req.query
//       });
//     } else {
//       console.log('📥 GET Request fetched current data:', motorData);
//     }
    
//     // Return the current motor data with update info
//     res.json({
//       ...motorData,
//       wasUpdated,
//       updateMethod: 'GET',
//       timestamp: new Date().toISOString(),
//       message: wasUpdated ? 'Motor data updated successfully via GET' : 'Current motor data retrieved'
//     });
    
//   } catch (error) {
//     console.error('❌ Error processing GET request:', error);
//     res.status(500).json({ 
//       error: 'Failed to process GET request',
//       details: error instanceof Error ? error.message : String(error)
//     });
//   }
// });

// // 📤 POST endpoint (traditional way)
// app.post('/api/motor-data', (req: any, res: any) => {
//   try {
//     const { speed, temperature, pressure, vibration, load } = req.body;
//     const previousData = { ...motorData };
    
//     // Update only provided fields
//     if (speed !== undefined) motorData.speed = Number(speed);
//     if (temperature !== undefined) motorData.temperature = Number(temperature);
//     if (pressure !== undefined) motorData.pressure = Number(pressure);
//     if (vibration !== undefined) motorData.vibration = Number(vibration);
//     if (load !== undefined) motorData.load = Number(load);
    
//     // Log the update
//     updateHistory.push({
//       timestamp: new Date(),
//       method: 'POST',
//       data: { ...motorData }
//     });
    
//     // Keep only last 10 updates
//     if (updateHistory.length > 10) {
//       updateHistory = updateHistory.slice(-10);
//     }
    
//     console.log('📤 POST Request - Motor data updated:', {
//       from: previousData,
//       to: motorData,
//       body: req.body
//     });
    
//     res.json({
//       message: 'Motor data updated successfully via POST',
//       data: motorData,
//       updateMethod: 'POST',
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('❌ Error updating motor data:', error);
//     res.status(500).json({ error: 'Failed to update motor data' });
//   }
// });

// // 🔄 PUT endpoint
// app.put('/api/motor-data', (req: any, res: any) => {
//   try {
//     const previousData = { ...motorData };
//     motorData = { ...motorData, ...req.body };
    
//     // Log the update
//     updateHistory.push({
//       timestamp: new Date(),
//       method: 'PUT',
//       data: { ...motorData }
//     });
    
//     console.log('🔄 PUT Request - Motor data updated:', {
//       from: previousData,
//       to: motorData,
//       body: req.body
//     });
    
//     res.json({
//       message: 'Motor data updated successfully via PUT',
//       data: motorData,
//       updateMethod: 'PUT',
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('❌ Error updating motor data:', error);
//     res.status(500).json({ error: 'Failed to update motor data' });
//   }
// });

// // 📈 Get update history (for debugging)
// app.get('/api/update-history', (req: any, res: any) => {
//   res.json({
//     history: updateHistory,
//     currentData: motorData,
//     totalUpdates: updateHistory.length
//   });
// });

// // 🏥 Health check with current state
// app.get('/api/health', (req: any, res: any) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Motor API server is running',
//     timestamp: new Date().toISOString(),
//     currentMotorData: motorData,
//     totalUpdates: updateHistory.length,
//     lastUpdate: updateHistory.length > 0 ? updateHistory[updateHistory.length - 1] : null
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Motor API server running on http://localhost:${PORT}`);
//   console.log(`🌐 Accessible on your network: http://192.168.1.32:${PORT}`);
//   console.log(`📊 Motor Data API (GET acts like POST): http://localhost:${PORT}/api/motor-data`);
//   console.log(`📈 Update History: http://localhost:${PORT}/api/update-history`);
//   console.log(`❤️ Health Check: http://localhost:${PORT}/api/health`);
//   console.log('');
//   console.log('🎯 HOW TO USE:');
//   console.log('GET  http://localhost:3001/api/motor-data?speed=2000&temperature=40 → Updates values');
//   console.log('GET  http://localhost:3001/api/motor-data → Gets current values');
//   console.log('POST http://localhost:3001/api/motor-data → Updates via POST body');
// });





// server.ts
// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Key configuration (you can store this in environment variables)
// const VALID_API_KEYS = {
//   readApiKey: 'c7c5f97722146181ed7132ed32bceba1',
//   writeApiKey: 'your_write_api_key_here' // Optional: for separate write permissions
// };

// // Interface for motor data
// interface MotorData {
//   speed: number;
//   temperature: number;
//   pressure: number;
//   vibration: number;
//   load: number;
// }

// // Default motor data
// let motorData: MotorData = {
//   speed: 1500,
//   temperature: 35.5,
//   pressure: 1.8,
//   vibration: 0.5,
//   load: 75
// };

// // Store update history
// let updateHistory: Array<{
//   timestamp: Date, 
//   method: string, 
//   data: MotorData,
//   source: string,
//   apiKeyUsed: boolean
// }> = [];

// // 🔑 API Key Middleware
// const validateApiKey = (req: any, res: any, next: any) => {
//   const { readApiKey } = req.query;
  
//   if (!readApiKey) {
//     return res.status(401).json({
//       error: 'Unauthorized',
//       message: 'API key is required. Use readApiKey parameter.'
//     });
//   }
  
//   if (readApiKey !== VALID_API_KEYS.readApiKey) {
//     return res.status(403).json({
//       error: 'Forbidden',
//       message: 'Invalid API key'
//     });
//   }
  
//   next();
// };

// // 🌐 ThingSpeak-like GET endpoint for sensor data
// app.get('/api/sensordata', validateApiKey, (req: any, res: any) => {
//   try {
//     const { field1, field2, field3, field4, field5, field6, field7, field8 } = req.query;
    
//     // Track if any updates were made
//     let wasUpdated = false;
//     const previousData = { ...motorData };
    
//     // Map field parameters to motor data (ThingSpeak style)
//     // field1 = speed, field2 = temperature, field3 = pressure, field4 = vibration, field5 = load
//     if (field1 !== undefined) {
//       motorData.speed = Number(field1);
//       wasUpdated = true;
//     }
//     if (field2 !== undefined) {
//       motorData.temperature = Number(field2);
//       wasUpdated = true;
//     }
//     if (field3 !== undefined) {
//       motorData.pressure = Number(field3);
//       wasUpdated = true;
//     }
//     if (field4 !== undefined) {
//       motorData.vibration = Number(field4);
//       wasUpdated = true;
//     }
//     if (field5 !== undefined) {
//       motorData.load = Number(field5);
//       wasUpdated = true;
//     }
    
//     // Log the update
//     if (wasUpdated) {
//       updateHistory.push({
//         timestamp: new Date(),
//         method: 'GET',
//         data: { ...motorData },
//         source: 'sensordata API',
//         apiKeyUsed: true
//       });
      
//       // Keep only last 20 updates
//       if (updateHistory.length > 20) {
//         updateHistory = updateHistory.slice(-20);
//       }
      
//       console.log('🔄 SensorData API UPDATED motor data:', {
//         from: previousData,
//         to: motorData,
//         fields: req.query,
//         source: 'External Device'
//       });
//     }
    
//     // ThingSpeak-like response format
//     const response = {
//       channel: {
//         id: 1,
//         name: "Motor Digital Twin",
//         description: "Industrial Motor Monitoring System",
//         latitude: "0.0",
//         longitude: "0.0",
//         field1: "Speed (RPM)",
//         field2: "Temperature (°C)",
//         field3: "Pressure (bar)",
//         field4: "Vibration (mm/s)",
//         field5: "Load (%)",
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: new Date().toISOString(),
//         last_entry_id: updateHistory.length
//       },
//       feeds: [
//         {
//           created_at: new Date().toISOString(),
//           entry_id: updateHistory.length,
//           field1: motorData.speed.toString(),
//           field2: motorData.temperature.toString(),
//           field3: motorData.pressure.toString(),
//           field4: motorData.vibration.toString(),
//           field5: motorData.load.toString()
//         }
//       ],
//       status: wasUpdated ? "Data updated successfully" : "Data retrieved successfully",
//       updateMethod: "GET",
//       wasUpdated: wasUpdated
//     };
    
//     res.json(response);
    
//   } catch (error) {
//     console.error('❌ Error processing sensordata request:', error);
//     res.status(500).json({ 
//       error: 'Failed to process sensor data request',
//       details: error instanceof Error ? error.message : String(error)
//     });
//   }
// });

// // 📊 Original GET endpoint (for your frontend - no API key required)
// app.get('/api/motor-data', (req: any, res: any) => {
//   try {
//     const { speed, temperature, pressure, vibration, load } = req.query;
    
//     let wasUpdated = false;
//     const previousData = { ...motorData };
    
//     // Update motor data if query parameters are provided
//     if (speed !== undefined) {
//       motorData.speed = Number(speed);
//       wasUpdated = true;
//     }
//     if (temperature !== undefined) {
//       motorData.temperature = Number(temperature);
//       wasUpdated = true;
//     }
//     if (pressure !== undefined) {
//       motorData.pressure = Number(pressure);
//       wasUpdated = true;
//     }
//     if (vibration !== undefined) {
//       motorData.vibration = Number(vibration);
//       wasUpdated = true;
//     }
//     if (load !== undefined) {
//       motorData.load = Number(load);
//       wasUpdated = true;
//     }
    
//     if (wasUpdated) {
//       updateHistory.push({
//         timestamp: new Date(),
//         method: 'GET',
//         data: { ...motorData },
//         source: 'motor-data API',
//         apiKeyUsed: false
//       });
      
//       console.log('🔄 MotorData API UPDATED:', {
//         from: previousData,
//         to: motorData,
//         query: req.query
//       });
//     }
    
//     res.json({
//       ...motorData,
//       wasUpdated,
//       updateMethod: 'GET',
//       timestamp: new Date().toISOString(),
//       message: wasUpdated ? 'Motor data updated successfully' : 'Current motor data retrieved'
//     });
    
//   } catch (error) {
//     console.error('❌ Error processing GET request:', error);
//     res.status(500).json({ error: 'Failed to process GET request' });
//   }
// });

// // 📈 Get update history (for debugging)
// app.get('/api/update-history', (req: any, res: any) => {
//   res.json({
//     history: updateHistory,
//     currentData: motorData,
//     totalUpdates: updateHistory.length,
//     validApiKey: VALID_API_KEYS.readApiKey
//   });
// });

// // 🏥 Health check
// app.get('/api/health', (req: any, res: any) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Motor Digital Twin API server is running',
//     timestamp: new Date().toISOString(),
//     currentMotorData: motorData,
//     totalUpdates: updateHistory.length,
//     apiEndpoints: {
//       sensordata: '/api/sensordata?readApiKey=YOUR_KEY&field1=value1',
//       motorData: '/api/motor-data?speed=value&temperature=value',
//       updateHistory: '/api/update-history',
//       health: '/api/health'
//     }
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Motor Digital Twin API server running on http://localhost:${PORT}`);
//   console.log(`🌐 Accessible on your network: http://192.168.29.131:${PORT}`);
//   console.log('');
//   console.log('🎯 EXTERNAL DEVICE API (ThingSpeak-like):');
//   console.log(`GET http://192.168.29.131:${PORT}/api/sensordata?readApiKey=c7c5f97722146181ed7132ed32bceba1&field1=2000`);
//   console.log('');
//   console.log('🎯 FRONTEND API:');
//   console.log(`GET http://192.168.29.131:${PORT}/api/motor-data?speed=2000&temperature=40`);
//   console.log('');
//   console.log('🔑 VALID API KEY: c7c5f97722146181ed7132ed32bceba1');
//   console.log('📍 Field Mapping: field1=Speed, field2=Temperature, field3=Pressure, field4=Vibration, field5=Load');
// });










// // server.ts
// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // API Key configuration (like ThingSpeak)
// interface ApiKeyInfo {
//   name: string;
//   permissions: string[];
//   createdAt: Date;
// }

// const API_KEYS: { [key: string]: ApiKeyInfo } = {
//   // Read API Key (for reading/writing data)
//   'c7c5f97722146181ed7132ed32bceba1': {
//     name: 'Motor Digital Twin API Key',
//     permissions: ['read', 'write'],
//     createdAt: new Date('2024-01-01')
//   },
//   // You can add more API keys
//   'another_api_key_here': {
//     name: 'Test Device Key',
//     permissions: ['read', 'write'],
//     createdAt: new Date('2024-01-01')
//   }
// };

// // Interface for motor data
// interface MotorData {
//   speed: number;
//   temperature: number;
//   pressure: number;
//   vibration: number;
//   load: number;
// }

// // Default motor data
// let motorData: MotorData = {
//   speed: 1500,
//   temperature: 35.5,
//   pressure: 1.8,
//   vibration: 0.5,
//   load: 75
// };

// // Store update history
// let updateHistory: Array<{
//   timestamp: Date, 
//   method: string, 
//   data: MotorData,
//   source: string,
//   apiKeyUsed: string
// }> = [];

// // 🔑 API Key Middleware
// const validateApiKey = (req: any, res: any, next: any) => {
//   const { readApiKey } = req.query;
  
//   if (!readApiKey) {
//     return res.status(401).json({
//       error: 'Unauthorized',
//       message: 'API key is required. Use readApiKey parameter.',
//       example: 'http://your-server:3001/api/sensordata?readApiKey=YOUR_API_KEY&field1=100'
//     });
//   }
  
//   if (!API_KEYS[readApiKey as string]) {
//     return res.status(403).json({
//       error: 'Forbidden',
//       message: 'Invalid API key',
//       valid_keys: Object.keys(API_KEYS)
//     });
//   }
  
//   next();
// };

// // 🌐 ThingSpeak-like GET endpoint for external devices
// app.get('/api/sensordata', validateApiKey, (req: any, res: any) => {
//   try {
//     const { readApiKey, field1, field2, field3, field4, field5, field6, field7, field8 } = req.query;
    
//     // Track if any updates were made
//     let wasUpdated = false;
//     const previousData = { ...motorData };
    
//     // Map ThingSpeak field parameters to motor data
//     // field1 = speed, field2 = temperature, field3 = pressure, field4 = vibration, field5 = load
//     if (field1 !== undefined && field1 !== '') {
//       motorData.speed = Number(field1);
//       wasUpdated = true;
//       console.log(`📊 Field1 (Speed) updated to: ${field1}`);
//     }
//     if (field2 !== undefined && field2 !== '') {
//       motorData.temperature = Number(field2);
//       wasUpdated = true;
//       console.log(`🌡️ Field2 (Temperature) updated to: ${field2}`);
//     }
//     if (field3 !== undefined && field3 !== '') {
//       motorData.pressure = Number(field3);
//       wasUpdated = true;
//       console.log(`💨 Field3 (Pressure) updated to: ${field3}`);
//     }
//     if (field4 !== undefined && field4 !== '') {
//       motorData.vibration = Number(field4);
//       wasUpdated = true;
//       console.log(`📳 Field4 (Vibration) updated to: ${field4}`);
//     }
//     if (field5 !== undefined && field5 !== '') {
//       motorData.load = Number(field5);
//       wasUpdated = true;
//       console.log(`⚡ Field5 (Load) updated to: ${field5}`);
//     }
    
//     // Log the update
//     if (wasUpdated) {
//       updateHistory.push({
//         timestamp: new Date(),
//         method: 'GET',
//         data: { ...motorData },
//         source: 'External Device API',
//         apiKeyUsed: readApiKey
//       });
      
//       // Keep only last 50 updates
//       if (updateHistory.length > 50) {
//         updateHistory = updateHistory.slice(-50);
//       }
      
//       console.log('🔄 External Device UPDATED motor data:', {
//         from: previousData,
//         to: motorData,
//         fields: { field1, field2, field3, field4, field5 },
//         apiKey: readApiKey.substring(0, 8) + '...' // Log partial key for security
//       });
//     }
    
//     // ThingSpeak-like response format
//     const response = {
//       channel: {
//         id: 1842670, // Example channel ID like ThingSpeak
//         name: "Motor Digital Twin",
//         description: "Industrial Motor Monitoring System - Digital Twin",
//         latitude: "0.0",
//         longitude: "0.0",
//         field1: "Speed (RPM)",
//         field2: "Temperature (°C)",
//         field3: "Pressure (bar)",
//         field4: "Vibration (mm/s)",
//         field5: "Load (%)",
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: new Date().toISOString(),
//         last_entry_id: updateHistory.length
//       },
//       feeds: [
//         {
//           created_at: new Date().toISOString(),
//           entry_id: updateHistory.length,
//           field1: motorData.speed.toString(),
//           field2: motorData.temperature.toString(),
//           field3: motorData.pressure.toString(),
//           field4: motorData.vibration.toString(),
//           field5: motorData.load.toString()
//         }
//       ],
//       status: wasUpdated ? "Data updated successfully" : "Data retrieved successfully",
//       wasUpdated: wasUpdated,
//       entries: 1
//     };
    
//     res.json(response);
    
//   // } catch (error) {
//   //   console.error('❌ Error processing sensordata request:', error);
//   //   res.status(500).json({ 
//   //     error: 'Failed to process sensor data request',
//   //     details: error.message 
//   //   });
//   // }
//   } catch (error) {
//   console.error('❌ Error:', error);
  
//   // Simple approach - don't include error details
//   res.status(500).json({ 
//     error: 'Internal server error',
//     message: 'Something went wrong. Please try again.'
//   });
// }
// });

// // 📊 Original GET endpoint (for your frontend - no API key required)
// app.get('/api/motor-data', (req: any, res: any) => {
//   try {
//     const { speed, temperature, pressure, vibration, load } = req.query;
    
//     let wasUpdated = false;
//     const previousData = { ...motorData };
    
//     // Update motor data if query parameters are provided
//     if (speed !== undefined) {
//       motorData.speed = Number(speed);
//       wasUpdated = true;
//     }
//     if (temperature !== undefined) {
//       motorData.temperature = Number(temperature);
//       wasUpdated = true;
//     }
//     if (pressure !== undefined) {
//       motorData.pressure = Number(pressure);
//       wasUpdated = true;
//     }
//     if (vibration !== undefined) {
//       motorData.vibration = Number(vibration);
//       wasUpdated = true;
//     }
//     if (load !== undefined) {
//       motorData.load = Number(load);
//       wasUpdated = true;
//     }
    
//     if (wasUpdated) {
//       updateHistory.push({
//         timestamp: new Date(),
//         method: 'GET',
//         data: { ...motorData },
//         source: 'Frontend API',
//         apiKeyUsed: 'none'
//       });
//     }
    
//     res.json({
//       ...motorData,
//       wasUpdated,
//       updateMethod: 'GET',
//       timestamp: new Date().toISOString(),
//       message: wasUpdated ? 'Motor data updated successfully' : 'Current motor data retrieved'
//     });
    
//   } catch (error) {
//     console.error('❌ Error processing GET request:', error);
//     res.status(500).json({ error: 'Failed to process GET request' });
//   }
// });

// // 🔑 Generate new API key endpoint
// app.get('/api/generate-key', (req: any, res: any) => {
//   const generateApiKey = () => {
//     return Math.random().toString(36).substring(2, 15) + 
//            Math.random().toString(36).substring(2, 15);
//   };
  
//   const newApiKey = generateApiKey();
  
//   // Add to API keys (in production, store in database)
//   API_KEYS[newApiKey] = {
//     name: `Generated Key ${new Date().toISOString()}`,
//     permissions: ['read', 'write'],
//     createdAt: new Date()
//   };
  
//   res.json({
//     success: true,
//     apiKey: newApiKey,
//     message: 'New API key generated successfully',
//     usage: `Use with: http://your-server:3001/api/sensordata?readApiKey=${newApiKey}&field1=100`,
//     total_keys: Object.keys(API_KEYS).length
//   });
// });

// // 📋 List all API keys (for admin purposes)
// app.get('/api/keys', (req: any, res: any) => {
//   const keysInfo = Object.keys(API_KEYS).map(key => ({
//     key: key.substring(0, 8) + '...' + key.substring(key.length - 4), // Partial for security
//     name: API_KEYS[key].name,
//     permissions: API_KEYS[key].permissions,
//     createdAt: API_KEYS[key].createdAt
//   }));
  
//   res.json({
//     total_keys: keysInfo.length,
//     keys: keysInfo
//   });
// });

// // 📈 Get update history
// app.get('/api/update-history', (req: any, res: any) => {
//   res.json({
//     history: updateHistory.slice(-10), // Last 10 updates
//     currentData: motorData,
//     totalUpdates: updateHistory.length,
//     apiInfo: {
//       example_url: 'http://your-server:3001/api/sensordata?readApiKey=YOUR_KEY&field1=100',
//       field_mapping: {
//         field1: 'Speed (RPM)',
//         field2: 'Temperature (°C)',
//         field3: 'Pressure (bar)',
//         field4: 'Vibration (mm/s)',
//         field5: 'Load (%)'
//       }
//     }
//   });
// });

// // 🏥 Health check with API info
// app.get('/api/health', (req: any, res: any) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Motor Digital Twin API server is running',
//     timestamp: new Date().toISOString(),
//     currentMotorData: motorData,
//     totalUpdates: updateHistory.length,
//     apiEndpoints: {
//       sensordata: '/api/sensordata?readApiKey=YOUR_KEY&field1=value1',
//       motorData: '/api/motor-data?speed=value&temperature=value',
//       generateKey: '/api/generate-key',
//       updateHistory: '/api/update-history',
//       health: '/api/health'
//     },
//     fieldMapping: {
//       field1: 'Speed (RPM)',
//       field2: 'Temperature (°C)',
//       field3: 'Pressure (bar)',
//       field4: 'Vibration (mm/s)',
//       field5: 'Load (%)'
//     }
//   });
// });

// // Start server
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Motor Digital Twin API server running on http://0.0.0.0:${PORT}`);
//   console.log(`🌐 Accessible on your network: http://192.168.1.9:${PORT}`);
//   console.log(`🌐 Also accessible at: http://192.168.29.131:${PORT}`);
//   console.log('');
//   console.log('🎯 EXTERNAL DEVICE API (ThingSpeak-like):');
//   console.log(`GET http://192.168.1.9:${PORT}/api/sensordata?readApiKey=c7c5f97722146181ed7132ed32bceba1&field1=100`);
//   console.log('');
//   console.log('🎯 FRONTEND API:');
//   console.log(`GET http://192.168.1.9:${PORT}/api/motor-data?speed=2000&temperature=40`);
//   console.log('');
//   console.log('🔑 API KEY MANAGEMENT:');
//   console.log(`GET http://192.168.1.9:${PORT}/api/generate-key  (Generate new key)`);
//   console.log(`GET http://192.168.1.9:${PORT}/api/keys  (List keys)`);
//   console.log('');
//   console.log('📍 FIELD MAPPING:');
//   console.log('field1 = Speed (RPM), field2 = Temperature (°C), field3 = Pressure (bar)');
//   console.log('field4 = Vibration (mm/s), field5 = Load (%)');
//   console.log('');
//   console.log('🔑 VALID API KEY: c7c5f97722146181ed7132ed32bceba1');
// });









// // server.ts
// const express = require('express');
// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
// const { WebSocketServer, WebSocket: WsWebSocket } = require('ws');

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // WebSocket Server
// const wss = new WebSocketServer({ port: 8080 });
// const clients: any[] = [];

// wss.on('connection', (ws: any) => {
//   clients.push(ws);
//   console.log('🚀 WebSocket client connected');
  
//   // Send current motor data to new client
//   ws.send(JSON.stringify({
//     type: 'motorUpdate',
//     data: motorData,
//     timestamp: new Date().toISOString()
//   }));
  
//   ws.on('close', () => {
//     const index = clients.indexOf(ws);
//     if (index > -1) {
//       clients.splice(index, 1);
//     }
//     console.log('🔌 WebSocket client disconnected');
//   });
  
//   ws.on('error', (error: any) => {
//     console.error('WebSocket error:', error);
//   });
// });

// // Broadcast motor data to all WebSocket clients
// function broadcastMotorData() {
//   const message = JSON.stringify({
//     type: 'motorUpdate',
//     data: motorData,
//     timestamp: new Date().toISOString()
//   });
  
//   clients.forEach((client: any) => {
//     if (client.readyState === WsWebSocket.OPEN) {
//       client.send(message);
//     }
//   });
// }

// // API Key configuration
// interface ApiKeyInfo {
//   name: string;
//   permissions: string[];
//   createdAt: Date;
// }

// const API_KEYS: { [key: string]: ApiKeyInfo } = {
//   'c7c5f97722146181ed7132ed32bceba1': {
//     name: 'Motor Digital Twin API Key',
//     permissions: ['read', 'write'],
//     createdAt: new Date('2024-01-01')
//   },
//   'another_api_key_here': {
//     name: 'Test Device Key',
//     permissions: ['read', 'write'],
//     createdAt: new Date('2024-01-01')
//   }
// };

// // Interface for motor data
// interface MotorData {
//   speed: number;
//   temperature: number;
//   pressure: number;
//   vibration: number;
//   load: number;
// }

// // Default motor data
// let motorData: MotorData = {
//   speed: 1500,
//   temperature: 35.5,
//   pressure: 1.8,
//   vibration: 0.5,
//   load: 75
// };

// // Store update history
// let updateHistory: Array<{
//   timestamp: Date, 
//   method: string, 
//   data: MotorData,
//   source: string,
//   apiKeyUsed: string
// }> = [];

// // 🔑 API Key Middleware
// const validateApiKey = (req: any, res: any, next: any) => {
//   const { readApiKey } = req.query;
  
//   if (!readApiKey) {
//     return res.status(401).json({
//       error: 'Unauthorized',
//       message: 'API key is required. Use readApiKey parameter.',
//       example: 'http://your-server:3001/api/sensordata?readApiKey=YOUR_API_KEY&field1=100'
//     });
//   }
  
//   if (!API_KEYS[readApiKey as string]) {
//     return res.status(403).json({
//       error: 'Forbidden',
//       message: 'Invalid API key',
//       valid_keys: Object.keys(API_KEYS)
//     });
//   }
  
//   next();
// };

// // 🌐 ThingSpeak-like GET endpoint for external devices
// app.get('/api/sensordata', validateApiKey, (req: any, res: any) => {
//   try {
//     const { readApiKey, field1, field2, field3, field4, field5 } = req.query;
    
//     // Track if any updates were made
//     let wasUpdated = false;
//     const previousData = { ...motorData };
    
//     // Map ThingSpeak field parameters to motor data
//     if (field1 !== undefined && field1 !== '') {
//       motorData.speed = Number(field1);
//       wasUpdated = true;
//       console.log(`📊 Field1 (Speed) updated to: ${field1}`);
//     }
//     if (field2 !== undefined && field2 !== '') {
//       motorData.temperature = Number(field2);
//       wasUpdated = true;
//       console.log(`🌡️ Field2 (Temperature) updated to: ${field2}`);
//     }
//     if (field3 !== undefined && field3 !== '') {
//       motorData.pressure = Number(field3);
//       wasUpdated = true;
//       console.log(`💨 Field3 (Pressure) updated to: ${field3}`);
//     }
//     if (field4 !== undefined && field4 !== '') {
//       motorData.vibration = Number(field4);
//       wasUpdated = true;
//       console.log(`📳 Field4 (Vibration) updated to: ${field4}`);
//     }
//     if (field5 !== undefined && field5 !== '') {
//       motorData.load = Number(field5);
//       wasUpdated = true;
//       console.log(`⚡ Field5 (Load) updated to: ${field5}`);
//     }
    
//     // Log the update and broadcast to WebSocket clients
//     if (wasUpdated) {
//       updateHistory.push({
//         timestamp: new Date(),
//         method: 'GET',
//         data: { ...motorData },
//         source: 'External Device API',
//         apiKeyUsed: readApiKey
//       });
      
//       // Keep only last 50 updates
//       if (updateHistory.length > 50) {
//         updateHistory = updateHistory.slice(-50);
//       }
      
//       // Broadcast to all WebSocket clients
//       broadcastMotorData();
      
//       console.log('🔄 External Device UPDATED motor data:', {
//         from: previousData,
//         to: motorData,
//         fields: { field1, field2, field3, field4, field5 },
//         apiKey: readApiKey.substring(0, 8) + '...',
//         clients: clients.length
//       });
//     }
    
//     // ThingSpeak-like response format
//     const response = {
//       channel: {
//         id: 1842670,
//         name: "Motor Digital Twin",
//         description: "Industrial Motor Monitoring System - Digital Twin",
//         latitude: "0.0",
//         longitude: "0.0",
//         field1: "Speed (RPM)",
//         field2: "Temperature (°C)",
//         field3: "Pressure (bar)",
//         field4: "Vibration (mm/s)",
//         field5: "Load (%)",
//         created_at: "2024-01-01T00:00:00Z",
//         updated_at: new Date().toISOString(),
//         last_entry_id: updateHistory.length
//       },
//       feeds: [
//         {
//           created_at: new Date().toISOString(),
//           entry_id: updateHistory.length,
//           field1: motorData.speed.toString(),
//           field2: motorData.temperature.toString(),
//           field3: motorData.pressure.toString(),
//           field4: motorData.vibration.toString(),
//           field5: motorData.load.toString()
//         }
//       ],
//       status: wasUpdated ? "Data updated successfully" : "Data retrieved successfully",
//       wasUpdated: wasUpdated,
//       entries: 1,
//       connectedClients: clients.length
//     };
    
//     res.json(response);
    
//   } catch (error: any) {
//     console.error('❌ Error processing sensordata request:', error);
//     res.status(500).json({ 
//       error: 'Internal server error',
//       message: 'Something went wrong. Please try again.'
//     });
//   }
// });

// // 📊 Original GET endpoint (for your frontend - no API key required)
// app.get('/api/motor-data', (req: any, res: any) => {
//   try {
//     const { speed, temperature, pressure, vibration, load } = req.query;
    
//     let wasUpdated = false;
//     const previousData = { ...motorData };
    
//     // Update motor data if query parameters are provided
//     if (speed !== undefined) {
//       motorData.speed = Number(speed);
//       wasUpdated = true;
//     }
//     if (temperature !== undefined) {
//       motorData.temperature = Number(temperature);
//       wasUpdated = true;
//     }
//     if (pressure !== undefined) {
//       motorData.pressure = Number(pressure);
//       wasUpdated = true;
//     }
//     if (vibration !== undefined) {
//       motorData.vibration = Number(vibration);
//       wasUpdated = true;
//     }
//     if (load !== undefined) {
//       motorData.load = Number(load);
//       wasUpdated = true;
//     }
    
//     if (wasUpdated) {
//       updateHistory.push({
//         timestamp: new Date(),
//         method: 'GET',
//         data: { ...motorData },
//         source: 'Frontend API',
//         apiKeyUsed: 'none'
//       });
      
//       // Broadcast to WebSocket clients
//       broadcastMotorData();
//     }
    
//     res.json({
//       ...motorData,
//       wasUpdated,
//       updateMethod: 'GET',
//       timestamp: new Date().toISOString(),
//       message: wasUpdated ? 'Motor data updated successfully' : 'Current motor data retrieved',
//       connectedClients: clients.length
//     });
    
//   } catch (error: any) {
//     console.error('❌ Error processing GET request:', error);
//     res.status(500).json({ error: 'Failed to process GET request' });
//   }
// });

// // 🔑 Generate new API key endpoint
// app.get('/api/generate-key', (req: any, res: any) => {
//   const generateApiKey = () => {
//     return Math.random().toString(36).substring(2, 15) + 
//            Math.random().toString(36).substring(2, 15);
//   };
  
//   const newApiKey = generateApiKey();
  
//   // Add to API keys (in production, store in database)
//   API_KEYS[newApiKey] = {
//     name: `Generated Key ${new Date().toISOString()}`,
//     permissions: ['read', 'write'],
//     createdAt: new Date()
//   };
  
//   res.json({
//     success: true,
//     apiKey: newApiKey,
//     message: 'New API key generated successfully',
//     usage: `Use with: http://your-server:3001/api/sensordata?readApiKey=${newApiKey}&field1=100`,
//     total_keys: Object.keys(API_KEYS).length
//   });
// });

// // 📋 List all API keys (for admin purposes)
// app.get('/api/keys', (req: any, res: any) => {
//   const keysInfo = Object.keys(API_KEYS).map(key => ({
//     key: key.substring(0, 8) + '...' + key.substring(key.length - 4),
//     name: API_KEYS[key].name,
//     permissions: API_KEYS[key].permissions,
//     createdAt: API_KEYS[key].createdAt
//   }));
  
//   res.json({
//     total_keys: keysInfo.length,
//     keys: keysInfo
//   });
// });

// // 📈 Get update history
// app.get('/api/update-history', (req: any, res: any) => {
//   res.json({
//     history: updateHistory.slice(-10),
//     currentData: motorData,
//     totalUpdates: updateHistory.length,
//     apiInfo: {
//       example_url: 'http://your-server:3001/api/sensordata?readApiKey=YOUR_KEY&field1=100',
//       field_mapping: {
//         field1: 'Speed (RPM)',
//         field2: 'Temperature (°C)',
//         field3: 'Pressure (bar)',
//         field4: 'Vibration (mm/s)',
//         field5: 'Load (%)'
//       }
//     }
//   });
// });

// // 🏥 Health check with API info
// app.get('/api/health', (req: any, res: any) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Motor Digital Twin API server is running',
//     timestamp: new Date().toISOString(),
//     currentMotorData: motorData,
//     totalUpdates: updateHistory.length,
//     connectedWebSocketClients: clients.length,
//     apiEndpoints: {
//       sensordata: '/api/sensordata?readApiKey=YOUR_KEY&field1=value1',
//       motorData: '/api/motor-data?speed=value&temperature=value',
//       generateKey: '/api/generate-key',
//       updateHistory: '/api/update-history',
//       health: '/api/health'
//     },
//     fieldMapping: {
//       field1: 'Speed (RPM)',
//       field2: 'Temperature (°C)',
//       field3: 'Pressure (bar)',
//       field4: 'Vibration (mm/s)',
//       field5: 'Load (%)'
//     }
//   });
// });

// // Start servers
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`🚀 Motor Digital Twin API server running on http://0.0.0.0:${PORT}`);
//   console.log(`🔌 WebSocket server running on ws://0.0.0.0:8080`);
//   console.log(`🌐 Accessible on your network: http://192.168.29.146:${PORT}`);
//   console.log('');
//   console.log('🎯 EXTERNAL DEVICE API (ThingSpeak-like):');
//   console.log(`GET http://192.168.29.146:${PORT}/api/sensordata?readApiKey=c7c5f97722146181ed7132ed32bceba1&field1=100`);
//   console.log('');
//   console.log('🎯 FRONTEND API:');
//   console.log(`GET http://192.168.29.146:${PORT}/api/motor-data?speed=2000&temperature=40`);
//   console.log('');
//   console.log('🔌 WEB SOCKET:');
//   console.log(`ws://192.168.29.146:8080`);
//   console.log('');
//   console.log('🔑 API KEY MANAGEMENT:');
//   console.log(`GET http://192.168.29.146:${PORT}/api/generate-key  (Generate new key)`);
//   console.log(`GET http://192.168.29.146:${PORT}/api/keys  (List keys)`);
//   console.log('');
//   console.log('📍 FIELD MAPPING:');
//   console.log('field1 = Speed (RPM), field2 = Temperature (°C), field3 = Pressure (bar)');
//   console.log('field4 = Vibration (mm/s), field5 = Load (%)');
//   console.log('');
//   console.log('🔑 VALID API KEY: c7c5f97722146181ed7132ed32bceba1');
// });








const express = require('express');
const cors = require('cors');
const { WebSocketServer, WebSocket: WsWebSocket } = require('ws');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// WebSocket Server
const wss = new WebSocketServer({ port: 8080 });
const clients: any[] = [];

wss.on('connection', (ws: any) => {
  clients.push(ws);
  console.log('🚀 WebSocket client connected');
  
  // Send current motor data to new client
  ws.send(JSON.stringify({
    type: 'motorUpdate',
    data: motorData,
    timestamp: new Date().toISOString()
  }));
  
  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
    console.log('🔌 WebSocket client disconnected');
  });
  
  ws.on('error', (error: any) => {
    console.error('WebSocket error:', error);
  });
});

// Broadcast motor data to all WebSocket clients
function broadcastMotorData() {
  const message = JSON.stringify({
    type: 'motorUpdate',
    data: motorData,
    timestamp: new Date().toISOString()
  });
  
  clients.forEach((client: any) => {
    if (client.readyState === WsWebSocket.OPEN) {
      client.send(message);
    }
  });
}

// API Key configuration
interface ApiKeyInfo {
  name: string;
  permissions: string[];
  createdAt: Date;
}

const API_KEYS: { [key: string]: ApiKeyInfo } = {
  'c7c5f97722146181ed7132ed32bceba1': {
    name: 'Motor Digital Twin API Key',
    permissions: ['read', 'write'],
    createdAt: new Date('2024-01-01')
  },
  'another_api_key_here': {
    name: 'Test Device Key',
    permissions: ['read', 'write'],
    createdAt: new Date('2024-01-01')
  }
};

// Interface for motor data - UPDATED with new fields
interface MotorData {
  speed: number;
  temperature: number;
  voltage: number;
  current: number;
  vibration: number;
  motorState: number;
}

// Default motor data - UPDATED with new fields
let motorData: MotorData = {
  speed: 1500,
  temperature: 35.5,
  voltage: 220,
  current: 8.5,
  vibration: 0, // 0 = Normal, 1 = Warning
  motorState: 0 // 0 = Stopped, 1 = Running
};

// Store update history
let updateHistory: Array<{
  timestamp: Date, 
  method: string, 
  data: MotorData,
  source: string,
  apiKeyUsed: string
}> = [];

// 🔑 API Key Middleware
const validateApiKey = (req: any, res: any, next: any) => {
  const { readApiKey } = req.query;
  
  if (!readApiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'API key is required. Use readApiKey parameter.',
      example: 'http://your-server:3001/api/sensordata?readApiKey=YOUR_API_KEY&field1=100'
    });
  }
  
  if (!API_KEYS[readApiKey as string]) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Invalid API key',
      valid_keys: Object.keys(API_KEYS)
    });
  }
  
  next();
};

// 🌐 ThingSpeak-like GET endpoint for external devices - UPDATED for new fields
app.get('/api/sensordata', validateApiKey, (req: any, res: any) => {
  try {
    const { readApiKey, field1, field2, field3, field4, field5, field6 } = req.query;
    
    // Track if any updates were made
    let wasUpdated = false;
    const previousData = { ...motorData };
    
    // Map ThingSpeak field parameters to motor data - UPDATED mapping
    if (field1 !== undefined && field1 !== '') {
      motorData.speed = Number(field1);
      wasUpdated = true;
      console.log(`📊 Field1 (Speed) updated to: ${field1}`);
    }
    if (field2 !== undefined && field2 !== '') {
      motorData.temperature = Number(field2);
      wasUpdated = true;
      console.log(`🌡️ Field2 (Temperature) updated to: ${field2}`);
    }
    if (field3 !== undefined && field3 !== '') {
      motorData.voltage = Number(field3);
      wasUpdated = true;
      console.log(`⚡ Field3 (Voltage) updated to: ${field3}`);
    }
    if (field4 !== undefined && field4 !== '') {
      motorData.current = Number(field4);
      wasUpdated = true;
      console.log(`🔋 Field4 (Current) updated to: ${field4}`);
    }
    if (field5 !== undefined && field5 !== '') {
      motorData.vibration = Number(field5);
      wasUpdated = true;
      console.log(`📳 Field5 (Vibration) updated to: ${field5} (${motorData.vibration === 1 ? 'WARNING' : 'NORMAL'})`);
    }
    if (field6 !== undefined && field6 !== '') {
      motorData.motorState = Number(field6);
      wasUpdated = true;
      console.log(`🔧 Field6 (Motor State) updated to: ${field6} (${motorData.motorState === 1 ? 'RUNNING' : 'STOPPED'})`);
    }
    
    // Log the update and broadcast to WebSocket clients
    if (wasUpdated) {
      updateHistory.push({
        timestamp: new Date(),
        method: 'GET',
        data: { ...motorData },
        source: 'External Device API',
        apiKeyUsed: readApiKey
      });
      
      // Keep only last 50 updates
      if (updateHistory.length > 50) {
        updateHistory = updateHistory.slice(-50);
      }
      
      // Broadcast to all WebSocket clients
      broadcastMotorData();
      
      console.log('🔄 External Device UPDATED motor data:', {
        from: previousData,
        to: motorData,
        fields: { field1, field2, field3, field4, field5, field6 },
        apiKey: readApiKey.substring(0, 8) + '...',
        clients: clients.length
      });
    }
    
    // ThingSpeak-like response format - UPDATED for new fields
    const response = {
      channel: {
        id: 1842670,
        name: "Motor Digital Twin",
        description: "Industrial Motor Monitoring System - Digital Twin",
        latitude: "0.0",
        longitude: "0.0",
        field1: "Speed (RPM)",
        field2: "Temperature (°C)",
        field3: "Voltage (V)",
        field4: "Current (A)",
        field5: "Vibration Status",
        field6: "Motor State",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: new Date().toISOString(),
        last_entry_id: updateHistory.length
      },
      feeds: [
        {
          created_at: new Date().toISOString(),
          entry_id: updateHistory.length,
          field1: motorData.speed.toString(),
          field2: motorData.temperature.toString(),
          field3: motorData.voltage.toString(),
          field4: motorData.current.toString(),
          field5: motorData.vibration.toString(),
          field6: motorData.motorState.toString()
        }
      ],
      status: wasUpdated ? "Data updated successfully" : "Data retrieved successfully",
      wasUpdated: wasUpdated,
      entries: 1,
      connectedClients: clients.length,
      fieldInterpretation: {
        field5: motorData.vibration === 1 ? "WARNING" : "NORMAL",
        field6: motorData.motorState === 1 ? "RUNNING" : "STOPPED"
      }
    };
    
    res.json(response);
    
  } catch (error: any) {
    console.error('❌ Error processing sensordata request:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.'
    });
  }
});

// 📊 Original GET endpoint (for your frontend - no API key required) - UPDATED
app.get('/api/motor-data', (req: any, res: any) => {
  try {
    const { speed, temperature, voltage, current, vibration, motorState } = req.query;
    
    let wasUpdated = false;
    const previousData = { ...motorData };
    
    // Update motor data if query parameters are provided - UPDATED fields
    if (speed !== undefined) {
      motorData.speed = Number(speed);
      wasUpdated = true;
    }
    if (temperature !== undefined) {
      motorData.temperature = Number(temperature);
      wasUpdated = true;
    }
    if (voltage !== undefined) {
      motorData.voltage = Number(voltage);
      wasUpdated = true;
    }
    if (current !== undefined) {
      motorData.current = Number(current);
      wasUpdated = true;
    }
    if (vibration !== undefined) {
      motorData.vibration = Number(vibration);
      wasUpdated = true;
    }
    if (motorState !== undefined) {
      motorData.motorState = Number(motorState);
      wasUpdated = true;
    }
    
    if (wasUpdated) {
      updateHistory.push({
        timestamp: new Date(),
        method: 'GET',
        data: { ...motorData },
        source: 'Frontend API',
        apiKeyUsed: 'none'
      });
      
      // Broadcast to WebSocket clients
      broadcastMotorData();
    }
    
    res.json({
      ...motorData,
      wasUpdated,
      updateMethod: 'GET',
      timestamp: new Date().toISOString(),
      message: wasUpdated ? 'Motor data updated successfully' : 'Current motor data retrieved',
      connectedClients: clients.length,
      fieldInterpretation: {
        vibration: motorData.vibration === 1 ? "WARNING" : "NORMAL",
        motorState: motorData.motorState === 1 ? "RUNNING" : "STOPPED"
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error processing GET request:', error);
    res.status(500).json({ error: 'Failed to process GET request' });
  }
});

// 🔑 Generate new API key endpoint
app.get('/api/generate-key', (req: any, res: any) => {
  const generateApiKey = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };
  
  const newApiKey = generateApiKey();
  
  // Add to API keys (in production, store in database)
  API_KEYS[newApiKey] = {
    name: `Generated Key ${new Date().toISOString()}`,
    permissions: ['read', 'write'],
    createdAt: new Date()
  };
  
  res.json({
    success: true,
    apiKey: newApiKey,
    message: 'New API key generated successfully',
    usage: `Use with: http://localhost:3001/api/sensordata?readApiKey=${newApiKey}&field1=100`,
    total_keys: Object.keys(API_KEYS).length
  });
});

// 📋 List all API keys (for admin purposes)
app.get('/api/keys', (req: any, res: any) => {
  const keysInfo = Object.keys(API_KEYS).map(key => ({
    key: key.substring(0, 8) + '...' + key.substring(key.length - 4),
    name: API_KEYS[key].name,
    permissions: API_KEYS[key].permissions,
    createdAt: API_KEYS[key].createdAt
  }));
  
  res.json({
    total_keys: keysInfo.length,
    keys: keysInfo
  });
});

// 📈 Get update history
app.get('/api/update-history', (req: any, res: any) => {
  res.json({
    history: updateHistory.slice(-10),
    currentData: motorData,
    totalUpdates: updateHistory.length,
    apiInfo: {
      example_url: 'http://localhost:3001/api/sensordata?readApiKey=YOUR_KEY&field1=100',
      field_mapping: {
        field1: 'Speed (RPM)',
        field2: 'Temperature (°C)',
        field3: 'Voltage (V)',
        field4: 'Current (A)',
        field5: 'Vibration Status (0=Normal, 1=Warning)',
        field6: 'Motor State (0=Stopped, 1=Running)'
      }
    }
  });
});

// 🏥 Health check with API info - UPDATED
app.get('/api/health', (req: any, res: any) => {
  res.json({ 
    status: 'OK', 
    message: 'Motor Digital Twin API server is running',
    timestamp: new Date().toISOString(),
    currentMotorData: motorData,
    fieldInterpretation: {
      vibration: motorData.vibration === 1 ? "WARNING" : "NORMAL",
      motorState: motorData.motorState === 1 ? "RUNNING" : "STOPPED"
    },
    totalUpdates: updateHistory.length,
    connectedWebSocketClients: clients.length,
    apiEndpoints: {
      sensordata: '/api/sensordata?readApiKey=YOUR_KEY&field1=value1',
      motorData: '/api/motor-data?speed=value&temperature=value',
      generateKey: '/api/generate-key',
      updateHistory: '/api/update-history',
      health: '/api/health'
    },
    fieldMapping: {
      field1: 'Speed (RPM)',
      field2: 'Temperature (°C)',
      field3: 'Voltage (V)',
      field4: 'Current (A)',
      field5: 'Vibration Status (0=Normal, 1=Warning)',
      field6: 'Motor State (0=Stopped, 1=Running)'
    }
  });
});

// Function to get network IP addresses
function getNetworkIPs() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  const results = [];
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address);
      }
    }
  }
  return results;
}

// Start servers
app.listen(PORT, '0.0.0.0', () => {
  const networkIPs = getNetworkIPs();
  
  console.log(`🚀 Motor Digital Twin API server running on port ${PORT}`);
  console.log(`🔌 WebSocket server running on port 8080`);
  console.log('');
  
  console.log('🌐 ACCESSIBLE ON:');
  console.log(`   Local: http://localhost:${PORT}`);
  networkIPs.forEach(ip => {
    console.log(`   Network: http://${ip}:${PORT}`);
  });
  console.log('');
  
  console.log('🎯 EXTERNAL DEVICE API (ThingSpeak-like):');
  console.log(`   http://localhost:${PORT}/api/sensordata?readApiKey=c7c5f97722146181ed7132ed32bceba1&field1=100`);
  if (networkIPs.length > 0) {
    console.log(`   http://${networkIPs[0]}:${PORT}/api/sensordata?readApiKey=c7c5f97722146181ed7132ed32bceba1&field1=100`);
  }
  console.log('');
  
  console.log('🎯 FRONTEND API:');
  console.log(`   http://localhost:${PORT}/api/motor-data?speed=2000&temperature=40`);
  console.log('');
  
  console.log('🔌 WEB SOCKET:');
  console.log(`   ws://localhost:8080`);
  if (networkIPs.length > 0) {
    console.log(`   ws://${networkIPs[0]}:8080`);
  }
  console.log('');
  
  console.log('🔑 API KEY MANAGEMENT:');
  console.log(`   http://localhost:${PORT}/api/generate-key  (Generate new key)`);
  console.log(`   http://localhost:${PORT}/api/keys  (List keys)`);
  console.log('');
  
  console.log('📍 FIELD MAPPING:');
  console.log('   field1 = Speed (RPM)');
  console.log('   field2 = Temperature (°C)');
  console.log('   field3 = Voltage (V)');
  console.log('   field4 = Current (A)');
  console.log('   field5 = Vibration Status (0=Normal, 1=Warning)');
  console.log('   field6 = Motor State (0=Stopped, 1=Running)');
  console.log('');
  
  console.log('🔑 VALID API KEY: c7c5f97722146181ed7132ed32bceba1');
  console.log('');
  
  console.log('📊 CURRENT MOTOR STATUS:');
  console.log(`   Motor State: ${motorData.motorState === 1 ? 'RUNNING 🟢' : 'STOPPED 🔴'}`);
  console.log(`   Speed: ${motorData.speed} RPM`);
  console.log(`   Temperature: ${motorData.temperature}°C`);
  console.log(`   Voltage: ${motorData.voltage}V`);
  console.log(`   Current: ${motorData.current}A`);
  console.log(`   Vibration: ${motorData.vibration === 1 ? 'WARNING ⚠️' : 'NORMAL ✅'}`);
});