"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { Activity, AlertTriangle, Droplets, Heart, Shield, Thermometer } from "lucide-react";
import { useHeartStore } from "../app/store/useMotorStore";

type ChartType =
  | "ecg"
  | "heartRate"
  | "bloodPressure"
  | "oxygen"
  | "temperature"
  | "cardiac"
  | "respiratory"
  | "all";

type VitalColor = "red" | "blue" | "orange" | "green";

type TrendPoint = {
  time: string;
  timestamp: number;
  heartRate: number;
  temperature: number;
  systolic: number;
  diastolic: number;
  cardiacOutput: number;
  oxygenSaturation: number;
  respiratoryRate: number;
};

type ECGPoint = {
  sample: number;
  ecg: number;
  timestamp: number;
};

const ECG_SAMPLE_INTERVAL_MS = 40;
const ECG_POINT_LIMIT = 220;
const TREND_POINT_LIMIT = 200;
const TREND_WINDOW = 30;

const chartOptions: { key: ChartType; label: string }[] = [
  { key: "ecg", label: "ECG" },
  { key: "heartRate", label: "HR" },
  { key: "bloodPressure", label: "BP" },
  { key: "oxygen", label: "O2" },
  { key: "all", label: "All" },
];

const vitalColorClasses: Record<VitalColor, { bg: string; text: string }> = {
  red: { bg: "bg-red-100", text: "text-red-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
};

function gaussianPulse(phase: number, center: number, width: number, amplitude: number) {
  return amplitude * Math.exp(-((phase - center) ** 2) / (2 * width * width));
}

function createField7EcgSample(elapsedMs: number, heartRate: number, ecgAmplitude: number) {
  const amplitude = Math.max(Math.min(ecgAmplitude, 2), -2);

  if (Math.abs(amplitude) < 0.001) {
    return 0;
  }

  const safeHeartRate = Math.min(Math.max(heartRate || 75, 35), 180);
  const beatDuration = 60000 / safeHeartRate;
  const phase = (elapsedMs % beatDuration) / beatDuration;

  const pWave = gaussianPulse(phase, 0.18, 0.03, 0.12 * amplitude);
  const qWave = gaussianPulse(phase, 0.37, 0.012, -0.14 * amplitude);
  const rWave = gaussianPulse(phase, 0.4, 0.01, 1.25 * amplitude);
  const sWave = gaussianPulse(phase, 0.43, 0.015, -0.22 * amplitude);
  const tWave = gaussianPulse(phase, 0.68, 0.06, 0.34 * amplitude);

  return Number((pWave + qWave + rWave + sWave + tWave).toFixed(3));
}

function buildField7WaveformData(
  heartRate: number,
  ecgAmplitude: number,
  startSample = 0,
  phaseOffsetMs = 0
): ECGPoint[] {
  const now = Date.now();

  return Array.from({ length: ECG_POINT_LIMIT }, (_, index) => ({
    sample: startSample + index,
    ecg: createField7EcgSample(phaseOffsetMs + index * ECG_SAMPLE_INTERVAL_MS, heartRate, ecgAmplitude),
    timestamp: now - (ECG_POINT_LIMIT - index) * ECG_SAMPLE_INTERVAL_MS,
  }));
}

export default function HeartDashboard() {
  const { telemetry, faults, updateTelemetry } = useHeartStore();
  const hiddenDashboardAlertParameters = new Set(["bloodPressure", "cardiacOutput", "respiratory"]);
  const visibleDashboardAlerts = faults.filter((fault) => !hiddenDashboardAlertParameters.has(fault.parameter));

  const criticalAlerts = visibleDashboardAlerts.filter((fault) => fault.level === "critical").length;
  const warningAlerts = visibleDashboardAlerts.filter((fault) => fault.level === "warning").length;
  const rhythmLabel =
    telemetry.heartRate > 100 ? "Tachycardia" : telemetry.heartRate < 60 ? "Bradycardia" : "Normal sinus";
  const hasDirectEcgValue = typeof telemetry.ecg === "number" && Number.isFinite(telemetry.ecg);
  const hasLegacyField7Value =
    !hasDirectEcgValue &&
    Number.isFinite(telemetry.respiratoryRate) &&
    Math.abs(telemetry.respiratoryRate) <= 2;
  const ecgDisplayValue = hasDirectEcgValue ? telemetry.ecg : hasLegacyField7Value ? telemetry.respiratoryRate : 0;

  const [chartData, setChartData] = useState<TrendPoint[]>([]);
  const [liveEcgData, setLiveEcgData] = useState<ECGPoint[]>(() =>
    buildField7WaveformData(telemetry.heartRate, ecgDisplayValue)
  );
  const [selectedChart, setSelectedChart] = useState<ChartType>("ecg");
  const liveEcgSampleRef = useRef(0);
  const ecgPhaseRef = useRef(0);

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const hostname = window.location.hostname || "localhost";
    const wsHost = `${hostname}:8080`;

    const ws = new WebSocket(`${protocol}//${wsHost}`);

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "heartUpdate" && message.data) {
          updateTelemetry(message.data);
        }
      } catch (error) {
        console.error("Error parsing heart dashboard WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Heart dashboard WebSocket error:", error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(1000, "HeartDashboard unmounting");
      }
    };
  }, [updateTelemetry]);

  useEffect(() => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname || "localhost";
    const apiUrl = `${protocol}//${hostname}:3001/api/heart-data`;

    let isMounted = true;

    const syncTelemetry = async () => {
      try {
        const response = await fetch(apiUrl, { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (isMounted && data && typeof data === "object") {
          updateTelemetry(data);
        }
      } catch (error) {
        console.error("Heart dashboard HTTP sync error:", error);
      }
    };

    void syncTelemetry();
    const interval = window.setInterval(syncTelemetry, 1000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, [updateTelemetry]);

  useEffect(() => {
    if (telemetry.heartRate <= 0) {
      return;
    }

    const newDataPoint: TrendPoint = {
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: Date.now(),
      heartRate: telemetry.heartRate,
      temperature: telemetry.temperature,
      systolic: telemetry.systolic,
      diastolic: telemetry.diastolic,
      cardiacOutput: telemetry.cardiacOutput,
      oxygenSaturation: telemetry.oxygenSaturation,
      respiratoryRate: telemetry.respiratoryRate,
    };

    setChartData((prev) => [...prev.slice(-(TREND_POINT_LIMIT - 1)), newDataPoint]);
  }, [telemetry]);

  useEffect(() => {
    setLiveEcgData(buildField7WaveformData(telemetry.heartRate, ecgDisplayValue, 0, ecgPhaseRef.current));
    liveEcgSampleRef.current = ECG_POINT_LIMIT;

    const interval = window.setInterval(() => {
      ecgPhaseRef.current += ECG_SAMPLE_INTERVAL_MS;

      const nextPoint: ECGPoint = {
        sample: liveEcgSampleRef.current,
        ecg: createField7EcgSample(ecgPhaseRef.current, telemetry.heartRate, ecgDisplayValue),
        timestamp: Date.now(),
      };

      setLiveEcgData((prev) => [...prev.slice(-(ECG_POINT_LIMIT - 1)), nextPoint]);
      liveEcgSampleRef.current += 1;
    }, ECG_SAMPLE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [telemetry.heartRate, ecgDisplayValue]);

  const vitalSigns: {
    title: string;
    value: number | string;
    unit: string;
    icon: typeof Heart;
    color: VitalColor;
    normalRange: string;
    isNormal: boolean;
  }[] = [
    {
      title: "Heart Rate",
      value: telemetry.heartRate,
      unit: "BPM",
      icon: Heart,
      color: "red",
      normalRange: "60-100",
      isNormal: telemetry.heartRate >= 60 && telemetry.heartRate <= 100,
    },
    {
      title: "Oxygen Saturation",
      value: telemetry.oxygenSaturation,
      unit: "% SpO2",
      icon: Droplets,
      color: "blue",
      normalRange: "95-100",
      isNormal: telemetry.oxygenSaturation >= 95,
    },
    {
      title: "Temperature",
      value: telemetry.temperature,
      unit: "deg F",
      icon: Thermometer,
      color: "orange",
      normalRange: "97-99",
      isNormal: telemetry.temperature >= 97 && telemetry.temperature <= 99,
    },
    {
      title: "Cardiac Output",
      value: telemetry.cardiacOutput,
      unit: "L/min",
      icon: Activity,
      color: "green",
      normalRange: "4-8",
      isNormal: telemetry.cardiacOutput >= 4 && telemetry.cardiacOutput <= 8,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-xl bg-red-100 p-3">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Heart Digital Twin</h1>
              <p className="text-gray-600">Real-time cardiac monitoring and simulation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Patient Status</p>
                  <p className="text-xl font-bold text-gray-900">
                    {criticalAlerts > 0 ? "Critical" : warningAlerts > 0 ? "Stable" : "Healthy"}
                  </p>
                </div>
                <div
                  className={`rounded-lg p-2 ${
                    criticalAlerts > 0 ? "bg-red-100" : warningAlerts > 0 ? "bg-yellow-100" : "bg-green-100"
                  }`}
                >
                  <Shield
                    className={`h-6 w-6 ${
                      criticalAlerts > 0
                        ? "text-red-600"
                        : warningAlerts > 0
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Alerts</p>
                  <p className="text-xl font-bold text-red-600">{criticalAlerts}</p>
                </div>
                <div className="rounded-lg bg-red-100 p-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Captured Samples</p>
                  <p className="text-xl font-bold text-gray-900">{chartData.length}</p>
                </div>
                <div className="rounded-lg bg-blue-100 p-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {vitalSigns.map((vital) => {
            const colorClasses = vitalColorClasses[vital.color];

            return (
              <div
                key={vital.title}
                className={`rounded-xl border-2 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 ${
                  vital.isNormal ? "border-green-200" : "border-red-200"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${colorClasses.bg}`}>
                      <vital.icon className={`h-5 w-5 ${colorClasses.text}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{vital.title}</h3>
                      <p className="text-sm text-gray-500">
                        Normal: {vital.normalRange} {vital.unit}
                      </p>
                    </div>
                  </div>
                  {!vital.isNormal ? (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">ALERT</span>
                  ) : null}
                </div>
                <div className="text-center">
                  <p className={`text-3xl font-bold ${vital.isNormal ? "text-gray-900" : "text-red-600"}`}>
                    {vital.value}
                    <span className="ml-1 text-lg text-gray-500">{vital.unit}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {selectedChart === "ecg" ? "Live ECG Monitor" : "Vital Trends"}
              </h3>
              <p className="text-gray-600">
                {selectedChart === "ecg"
                  ? "Field7 controls ECG waveform amplitude and field1 controls beat speed"
                  : "Real-time monitoring of cardiac parameters"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {chartOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setSelectedChart(option.key)}
                  className={`rounded-lg px-3 py-1 text-sm font-medium ${
                    selectedChart === option.key
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-red-700">
              Heart Rate: {telemetry.heartRate} BPM
            </span>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-blue-700">
              Rhythm: {rhythmLabel}
            </span>
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700">
              SpO2: {telemetry.oxygenSaturation}%
            </span>
            <span className="rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-purple-700">
              ECG Source: {hasDirectEcgValue ? "field7 waveform mode" : hasLegacyField7Value ? "field7 legacy mode" : "no ECG input"}
            </span>
            <span className="rounded-full border border-pink-100 bg-pink-50 px-3 py-1 text-pink-700">
              ECG Input: {ecgDisplayValue.toFixed(3)}
            </span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedChart === "ecg" ? (
                <LineChart data={liveEcgData}>
                  <CartesianGrid stroke="#fee2e2" strokeDasharray="3 3" />
                  <XAxis axisLine={false} dataKey="sample" tick={false} />
                  <YAxis axisLine={false} domain={[-2, 2]} tick={false} />
                  <Tooltip
                    labelFormatter={() => "Field7 ECG waveform"}
                    formatter={(value: number | string) => [`${Number(value).toFixed(3)} mV`, "field7 ECG"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #fecaca",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    dataKey="ecg"
                    dot={false}
                    isAnimationActive={false}
                    name="field7 ECG"
                    stroke="#dc2626"
                    strokeWidth={2.5}
                    type="linear"
                  />
                </LineChart>
              ) : (
                <LineChart data={chartData.slice(-TREND_WINDOW)}>
                  <CartesianGrid stroke="#f0f0f0" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value: string) => {
                      const [hours, minutes] = value.split(":");
                      return `${hours}:${minutes}`;
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend />

                  {selectedChart === "all" || selectedChart === "heartRate" ? (
                    <Line
                      dataKey="heartRate"
                      dot={false}
                      name="Heart Rate (BPM)"
                      stroke="#ef4444"
                      strokeWidth={2}
                      type="monotone"
                    />
                  ) : null}

                  {selectedChart === "all" || selectedChart === "oxygen" ? (
                    <Line
                      dataKey="oxygenSaturation"
                      dot={false}
                      name="Oxygen Saturation (%)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      type="monotone"
                    />
                  ) : null}

                  {selectedChart === "all" || selectedChart === "bloodPressure" ? (
                    <>
                      <Line
                        dataKey="systolic"
                        dot={false}
                        name="Systolic BP (mmHg)"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        type="monotone"
                      />
                      <Line
                        dataKey="diastolic"
                        dot={false}
                        name="Diastolic BP (mmHg)"
                        stroke="#a78bfa"
                        strokeWidth={2}
                        type="monotone"
                      />
                    </>
                  ) : null}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {visibleDashboardAlerts.length > 0 ? (
          <div className="mb-8 rounded-xl border border-red-200 bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Active Alerts</h3>
                <p className="text-gray-600">Requires immediate attention</p>
              </div>
            </div>

            <div className="space-y-3">
              {visibleDashboardAlerts.map((fault, index) => (
                <div
                  key={`${fault.parameter}-${index}`}
                  className={`rounded-lg border-l-4 p-4 ${
                    fault.level === "critical" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${
                            fault.level === "critical" ? "text-red-600" : "text-yellow-600"
                          }`}
                        >
                          {fault.level === "critical" ? "CRITICAL" : "WARNING"}
                        </span>
                        <span
                          className={`rounded px-2 py-1 text-xs font-bold ${
                            fault.level === "critical"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {fault.parameter.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700">{fault.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-red-50 to-blue-50 p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-bold text-gray-900">Cardiac Health Summary</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-gray-700">Current Status</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Heart Rhythm</span>
                  <span
                    className={`font-medium ${
                      telemetry.heartRate > 100 || telemetry.heartRate < 60 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {rhythmLabel}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Blood Pressure</span>
                  <span className={`font-medium ${telemetry.systolic > 140 ? "text-red-600" : "text-green-600"}`}>
                    {telemetry.systolic > 140 ? "Hypertensive" : "Normotensive"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Oxygen Status</span>
                  <span
                    className={`font-medium ${
                      telemetry.oxygenSaturation < 95 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {telemetry.oxygenSaturation < 95 ? "Hypoxic" : "Normoxic"}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-700">Recommendations</h4>
              <ul className="space-y-2">
                {telemetry.heartRate > 100 ? (
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">*</span>
                    <span className="text-gray-700">Consider beta-blocker therapy for tachycardia</span>
                  </li>
                ) : null}
                {telemetry.oxygenSaturation < 95 ? (
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">*</span>
                    <span className="text-gray-700">Administer supplemental oxygen</span>
                  </li>
                ) : null}
                {visibleDashboardAlerts.length === 0 ? (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">*</span>
                    <span className="text-gray-700">
                      All vital signs are within normal limits. Continue routine monitoring.
                    </span>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
