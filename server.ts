const express = require("express");
const cors = require("cors");
const { WebSocketServer, WebSocket: WsWebSocket } = require("ws");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const wss = new WebSocketServer({ port: 8080 });
const clients: any[] = [];

interface HeartData {
  heartRate: number;
  temperature: number;
  systolic: number;
  diastolic: number;
  cardiacOutput: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  ecg: number | null;
}

type UpdateStatus = "normal" | "warning" | "critical";

let heartData: HeartData = {
  heartRate: 75,
  temperature: 98.2,
  systolic: 120,
  diastolic: 80,
  cardiacOutput: 5.0,
  oxygenSaturation: 98,
  respiratoryRate: 16,
  ecg: null,
};

let updateHistory: Array<{
  timestamp: Date;
  method: string;
  data: HeartData;
  source: string;
  status: UpdateStatus;
}> = [];

function broadcastHeartData() {
  const message = JSON.stringify({
    type: "heartUpdate",
    data: heartData,
    timestamp: new Date().toISOString(),
  });

  clients.forEach((client: any) => {
    if (client.readyState === WsWebSocket.OPEN) {
      client.send(message);
    }
  });
}

function getStatus(data: HeartData): UpdateStatus {
  if (
    data.heartRate > 140 ||
    data.heartRate < 40 ||
    data.oxygenSaturation < 90 ||
    data.systolic > 180 ||
    data.diastolic > 120
  ) {
    return "critical";
  }

  if (
    data.heartRate > 100 ||
    data.heartRate < 50 ||
    data.oxygenSaturation < 95 ||
    data.systolic > 140 ||
    data.diastolic > 90
  ) {
    return "warning";
  }

  return "normal";
}

wss.on("connection", (ws: any) => {
  clients.push(ws);
  console.log("WebSocket client connected for heart monitoring");

  ws.send(
    JSON.stringify({
      type: "heartUpdate",
      data: heartData,
      timestamp: new Date().toISOString(),
    })
  );

  ws.on("close", () => {
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
    console.log("WebSocket client disconnected");
  });

  ws.on("error", (error: any) => {
    console.error("WebSocket error:", error);
  });
});

app.get("/api/heartdata", (req: any, res: any) => {
  try {
    const { field1, field2, field3, field4, field5, field6, field7 } = req.query;

    let wasUpdated = false;
    const previousData = { ...heartData };

    if (field1 !== undefined && field1 !== "") {
      heartData.heartRate = Number(field1);
      wasUpdated = true;
      console.log(`Field1 (Heart Rate) updated to: ${field1} BPM`);
    }
    if (field2 !== undefined && field2 !== "") {
      heartData.temperature = Number(field2);
      wasUpdated = true;
      console.log(`Field2 (Temperature) updated to: ${field2} deg F`);
    }
    if (field3 !== undefined && field3 !== "") {
      heartData.systolic = Number(field3);
      wasUpdated = true;
      console.log(`Field3 (Systolic BP) updated to: ${field3} mmHg`);
    }
    if (field4 !== undefined && field4 !== "") {
      heartData.diastolic = Number(field4);
      wasUpdated = true;
      console.log(`Field4 (Diastolic BP) updated to: ${field4} mmHg`);
    }
    if (field5 !== undefined && field5 !== "") {
      heartData.cardiacOutput = Number(field5);
      wasUpdated = true;
      console.log(`Field5 (Cardiac Output) updated to: ${field5} L/min`);
    }
    if (field6 !== undefined && field6 !== "") {
      heartData.oxygenSaturation = Number(field6);
      wasUpdated = true;
      console.log(`Field6 (Oxygen Saturation) updated to: ${field6}%`);
    }
    if (field7 !== undefined && field7 !== "") {
      heartData.ecg = Number(field7);
      wasUpdated = true;
      console.log(`Field7 (ECG) updated to: ${field7}`);
    }

    const status = getStatus(heartData);

    if (wasUpdated) {
      updateHistory.push({
        timestamp: new Date(),
        method: "GET",
        data: { ...heartData },
        source: "External Device API",
        status,
      });

      if (updateHistory.length > 50) {
        updateHistory = updateHistory.slice(-50);
      }

      broadcastHeartData();

      console.log("Heart data updated", {
        from: previousData,
        to: heartData,
        status,
        clients: clients.length,
      });
    }

    res.json({
      patient: {
        id: "PT-001",
        name: "Digital Twin Patient",
        age: 45,
        gender: "Male",
        condition: "Healthy",
      },
      vitals: {
        timestamp: new Date().toISOString(),
        heartRate: heartData.heartRate,
        temperature: heartData.temperature,
        bloodPressure: `${heartData.systolic}/${heartData.diastolic}`,
        cardiacOutput: heartData.cardiacOutput,
        oxygenSaturation: heartData.oxygenSaturation,
        respiratoryRate: heartData.respiratoryRate,
        ecg: heartData.ecg,
      },
      status,
      wasUpdated,
      connectedClients: clients.length,
      normalRanges: {
        heartRate: "60-100 BPM",
        temperature: "97-99 deg F",
        systolic: "90-120 mmHg",
        diastolic: "60-80 mmHg",
        cardiacOutput: "4-8 L/min",
        oxygenSaturation: "95-100%",
        respiratoryRate: "12-20 breaths/min",
        ecg: "Live ECG sample value",
      },
    });
  } catch (error: any) {
    console.error("Error processing heart data request:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong. Please try again.",
    });
  }
});

app.get("/api/heart-data", (req: any, res: any) => {
  try {
    const {
      heartRate,
      temperature,
      systolic,
      diastolic,
      cardiacOutput,
      oxygenSaturation,
      respiratoryRate,
      ecg,
    } = req.query;

    let wasUpdated = false;

    if (heartRate !== undefined) {
      heartData.heartRate = Number(heartRate);
      wasUpdated = true;
    }
    if (temperature !== undefined) {
      heartData.temperature = Number(temperature);
      wasUpdated = true;
    }
    if (systolic !== undefined) {
      heartData.systolic = Number(systolic);
      wasUpdated = true;
    }
    if (diastolic !== undefined) {
      heartData.diastolic = Number(diastolic);
      wasUpdated = true;
    }
    if (cardiacOutput !== undefined) {
      heartData.cardiacOutput = Number(cardiacOutput);
      wasUpdated = true;
    }
    if (oxygenSaturation !== undefined) {
      heartData.oxygenSaturation = Number(oxygenSaturation);
      wasUpdated = true;
    }
    if (respiratoryRate !== undefined) {
      heartData.respiratoryRate = Number(respiratoryRate);
      wasUpdated = true;
    }
    if (ecg !== undefined) {
      heartData.ecg = Number(ecg);
      wasUpdated = true;
    }

    if (wasUpdated) {
      updateHistory.push({
        timestamp: new Date(),
        method: "GET",
        data: { ...heartData },
        source: "Frontend API",
        status: getStatus(heartData),
      });

      broadcastHeartData();
    }

    res.json({
      ...heartData,
      wasUpdated,
      updateMethod: "GET",
      timestamp: new Date().toISOString(),
      message: wasUpdated ? "Heart data updated successfully" : "Current heart data retrieved",
      connectedClients: clients.length,
    });
  } catch (error: any) {
    console.error("Error processing GET request:", error);
    res.status(500).json({ error: "Failed to process GET request" });
  }
});

app.get("/api/health", (_req: any, res: any) => {
  res.json({
    status: "OK",
    message: "Heart Digital Twin API server is running",
    timestamp: new Date().toISOString(),
    currentHeartData: heartData,
    totalUpdates: updateHistory.length,
    connectedWebSocketClients: clients.length,
    apiEndpoints: {
      heartdata: "/api/heartdata?field1=75&field2=98.2&field3=120&field4=80&field5=5.0&field6=98&field7=0.85",
      heartData: "/api/heart-data?heartRate=75&temperature=98.2&ecg=0.85",
      health: "/api/health",
    },
    fieldMapping: {
      field1: "Heart Rate (BPM)",
      field2: "Temperature (deg F)",
      field3: "Systolic BP (mmHg)",
      field4: "Diastolic BP (mmHg)",
      field5: "Cardiac Output (L/min)",
      field6: "Oxygen Saturation (%)",
      field7: "ECG sample value",
    },
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Heart Digital Twin API server running on port ${PORT}`);
  console.log("WebSocket server running on port 8080");
  console.log("");
  console.log("HEART MONITORING ENDPOINTS:");
  console.log(`   Local: http://localhost:${PORT}/api/heartdata`);
  console.log("");
  console.log("FIELD MAPPING FOR HEART DATA:");
  console.log("   field1 = Heart Rate (BPM)");
  console.log("   field2 = Temperature (deg F)");
  console.log("   field3 = Systolic Blood Pressure (mmHg)");
  console.log("   field4 = Diastolic Blood Pressure (mmHg)");
  console.log("   field5 = Cardiac Output (L/min)");
  console.log("   field6 = Oxygen Saturation (%)");
  console.log("   field7 = ECG sample value");
  console.log("");
  console.log("CURRENT HEART STATUS:");
  console.log(`   Heart Rate: ${heartData.heartRate} BPM`);
  console.log(`   BP: ${heartData.systolic}/${heartData.diastolic} mmHg`);
  console.log(`   Oxygen: ${heartData.oxygenSaturation}% SpO2`);
  console.log(`   Temperature: ${heartData.temperature} deg F`);
  console.log(`   Cardiac Output: ${heartData.cardiacOutput} L/min`);
  console.log(`   Respiration: ${heartData.respiratoryRate} breaths/min`);
  console.log(`   ECG: ${heartData.ecg ?? "not set"}`);
});
