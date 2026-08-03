"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useHeartStore } from "../app/store/useMotorStore";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material | THREE.Material[]>;
};

type AlertLevel = "normal" | "warning" | "critical";

type AlertDefinition = {
  parameter: string;
  label: string;
  getNormalMessage: (telemetry: any) => string;
};

type PanelAlert = {
  key: string;
  parameter: string;
  level: AlertLevel;
  message: string;
};

const HIDDEN_PANEL_PARAMETERS = new Set(["bloodPressure", "cardiacOutput", "respiratory"]);

const TELEMETRY_ALERT_DEFINITIONS: AlertDefinition[] = [
  {
    parameter: "heartRate",
    label: "Heart Rate",
    getNormalMessage: (telemetry) => `Heart rate normal: ${telemetry.heartRate} BPM`,
  },
  {
    parameter: "oxygen",
    label: "Oxygen",
    getNormalMessage: (telemetry) => `Oxygen saturation normal: ${telemetry.oxygenSaturation}% SpO2`,
  },
  {
    parameter: "temperature",
    label: "Temperature",
    getNormalMessage: (telemetry) => `Temperature normal: ${telemetry.temperature} deg F`,
  },
];

const PART_NODE_BY_PARAMETER: Record<string, string> = {
  heartRate: "cardiac_muscle_jnt",
  bloodPressure: "aortic_valve_01_jnt",
  oxygen: "left_atrium_jnt",
  temperature: "cardiac_muscle_jnt",
  cardiacOutput: "left_atrium_storage_jnt",
  respiratory: "right_atrium_jnt",
};

const HEART_HIGHLIGHT_PARAMETERS = new Set(["heartRate", "oxygen", "temperature"]);

function formatAlertLabel(parameter: string) {
  switch (parameter) {
    case "heartRate":
      return "Heart Rate";
    case "bloodPressure":
      return "Blood Pressure";
    case "oxygen":
      return "Oxygen";
    case "temperature":
      return "Temperature";
    case "cardiacOutput":
      return "Cardiac Output";
    case "respiratory":
      return "Respiratory";
    default:
      return parameter.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
  }
}

function getAlertStyles(level: AlertLevel) {
  if (level === "critical") {
    return {
      card: "bg-red-500/10 border-red-500",
      badge: "bg-red-500 text-white",
      text: "text-red-100",
      status: "CRITICAL",
    };
  }

  if (level === "warning") {
    return {
      card: "bg-yellow-500/10 border-yellow-500",
      badge: "bg-yellow-500 text-white",
      text: "text-yellow-100",
      status: "WARNING",
    };
  }

  return {
    card: "bg-emerald-500/10 border-emerald-500",
    badge: "bg-emerald-500 text-white",
    text: "text-emerald-100",
    status: "NORMAL",
  };
}

function getHeartHighlightColor(activeFault: any, telemetry: any) {
  if (!activeFault) {
    return "#fb7185";
  }

  if (activeFault.parameter === "oxygen") {
    return activeFault.level === "critical" ? "#0ea5e9" : "#38bdf8";
  }

  if (activeFault.parameter === "temperature") {
    if (telemetry.temperature < 97) {
      return "#facc15";
    }

    if (telemetry.temperature >= 100 && telemetry.temperature <= 102) {
      return "#22c55e";
    }

    return activeFault.level === "critical" ? "#ef4444" : "#fb923c";
  }

  return activeFault.level === "critical" ? "#ef4444" : "#fb7185";
}

export default function HeartViewer() {
  const telemetry = useHeartStore((state: any) => state.telemetry);
  const faults = useHeartStore((state: any) => state.faults);
  const updateTelemetry = useHeartStore((state: any) => state.updateTelemetry);
  const [wsConnected, setWsConnected] = useState(false);
  const [wsError, setWsError] = useState<string | null>(null);

  const telemetryAlerts: PanelAlert[] = TELEMETRY_ALERT_DEFINITIONS.map((definition) => {
    const matchedFault = faults.find((fault: any) => fault.parameter === definition.parameter);

    return {
      key: definition.parameter,
      parameter: definition.label,
      level: (matchedFault?.level ?? "normal") as AlertLevel,
      message: matchedFault?.message ?? definition.getNormalMessage(telemetry),
    };
  });

  const additionalAlerts: PanelAlert[] = faults
    .filter(
      (fault: any) =>
        !HIDDEN_PANEL_PARAMETERS.has(fault.parameter) &&
        !TELEMETRY_ALERT_DEFINITIONS.some((definition) => definition.parameter === fault.parameter)
    )
    .map((fault: any, index: number) => ({
      key: `${fault.parameter}-${index}`,
      parameter: formatAlertLabel(fault.parameter),
      level: (fault.level ?? "warning") as AlertLevel,
      message: fault.message,
    }));

  const panelAlerts = [...telemetryAlerts, ...additionalAlerts];

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const hostname = window.location.hostname || "localhost";
    const wsUrl = `${protocol}//${hostname}:8080`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setWsConnected(true);
      setWsError(null);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "heartUpdate") {
          updateTelemetry(message.data);
        }
      } catch (error) {
        console.error("Error parsing heart WebSocket message:", error);
      }
    };

    ws.onerror = () => {
      setWsError("Failed to connect to heart data server. Make sure the server is running on port 8080.");
      setWsConnected(false);
    };

    ws.onclose = (event) => {
      setWsConnected(false);

      if (event.code !== 1000) {
        setWsError("Reconnecting...");
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(1000, "Component unmounting");
      }
    };
  }, [updateTelemetry]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-red-950 via-purple-900 to-blue-950">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="absolute inset-0">
        <Canvas camera={{ position: [1, 0.8, 1], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={1.2} />
          <OrbitControls minDistance={0.3} maxDistance={5} />
          <group position={[0, -0.1, 0]}>
            <HeartModel heartRate={telemetry.heartRate} telemetry={telemetry} faults={faults} />
          </group>
        </Canvas>
      </div>

      <div className="absolute left-4 right-4 top-4 z-10">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex-shrink-0 rounded-2xl border border-red-700/50 bg-red-900/80 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 rounded-lg bg-red-800/50 px-4 py-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    telemetry.heartRate > 100 || telemetry.heartRate < 60
                      ? "animate-pulse bg-yellow-400"
                      : "animate-pulse bg-green-400"
                  }`}
                ></div>
                <span className="text-xs font-medium text-red-100">
                  {telemetry.heartRate > 100 || telemetry.heartRate < 60 ? "IRREGULAR" : "REGULAR"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-700/50 bg-purple-900/80 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${wsConnected ? "animate-pulse bg-green-400" : "bg-red-400"}`}
                ></div>
                <span className="text-xs font-medium text-purple-300">
                  {wsConnected ? "LIVE MONITORING" : "DISCONNECTED"}
                </span>
              </div>
              <div className="text-xs text-purple-300">
                HR: <span className="font-bold text-white">{telemetry.heartRate} BPM</span>
              </div>
              <div className="text-xs text-purple-300">
                O2: <span className="font-bold text-white">{telemetry.oxygenSaturation}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 top-4 z-10 flex flex-col gap-4">
        <div className="rounded-xl border border-red-700/50 bg-red-900/80 p-3 shadow-2xl backdrop-blur-xl">
          <div className="space-y-2">
            <VitalSignCard
              label="Heart Rate"
              value={`${telemetry.heartRate} BPM`}
              color={getHeartRateColor(telemetry.heartRate)}
              isAbnormal={telemetry.heartRate > 100 || telemetry.heartRate < 60}
            />
            <VitalSignCard
              label="Oxygen Saturation"
              value={`${telemetry.oxygenSaturation}%`}
              color={getOxygenColor(telemetry.oxygenSaturation)}
              isAbnormal={telemetry.oxygenSaturation < 95}
            />
            <VitalSignCard
              label="Temperature"
              value={`${telemetry.temperature} deg F`}
              color={getTemperatureColor(telemetry.temperature)}
              isAbnormal={telemetry.temperature < 97 || telemetry.temperature > 99}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto rounded-xl border-2 border-red-500/50 bg-red-900/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex h-full flex-col">
            <div className="mb-4">
              <h3 className="flex items-center gap-2 text-base font-bold text-red-400">CARDIAC ALERTS</h3>
              <p className="mt-1 text-[11px] text-red-200/80">
                Live status for heart rate, oxygen, temperature, and other allowed cardiac alerts
              </p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
              {panelAlerts.map((alert) => {
                const styles = getAlertStyles(alert.level);

                return (
                  <div key={alert.key} className={`rounded-lg border-l-4 p-3 ${styles.card}`}>
                    <div className="mb-2 flex flex-col gap-2">
                      <span className="text-sm font-bold text-white">{styles.status}</span>
                      <span className={`w-fit rounded-md px-2 py-1 text-xs font-bold ${styles.badge}`}>
                        {alert.parameter.toUpperCase()}
                      </span>
                    </div>
                    <div className={`text-xs ${styles.text}`}>{alert.message}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <div className="rounded-xl border border-purple-700/50 bg-purple-900/80 p-3 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${wsConnected ? "animate-pulse bg-green-400" : "bg-red-400"}`}></div>
            <span className="text-xs text-purple-300">
              {wsConnected ? "Heart Monitor Connected" : "Monitor Disconnected"}
            </span>
          </div>
          {wsError ? <div className="mt-1 max-w-xs text-xs text-red-400">{wsError}</div> : null}
        </div>
      </div>
    </div>
  );
}

function getHeartRateColor(heartRate: number): string {
  if (heartRate > 120 || heartRate < 50) return "red";
  if (heartRate > 100 || heartRate < 60) return "yellow";
  return "green";
}

function getBPColor(systolic: number, diastolic: number): string {
  if (systolic > 180 || diastolic > 120) return "red";
  if (systolic > 140 || diastolic > 90) return "yellow";
  return "green";
}

function getOxygenColor(oxygen: number): string {
  if (oxygen < 90) return "red";
  if (oxygen < 95) return "yellow";
  return "green";
}

function getTemperatureColor(temp: number): string {
  if (temp >= 103) return "red";
  if (temp > 99) return "green";
  if (temp < 97) return "yellow";
  return "green";
}

interface VitalSignCardProps {
  label: string;
  value: string;
  color: string;
  isAbnormal: boolean;
}

function VitalSignCard({ label, value, color, isAbnormal }: VitalSignCardProps) {
  const colorClasses = {
    red: "border-red-500/50",
    yellow: "border-yellow-500/50",
    green: "border-green-500/50",
    blue: "border-blue-500/50",
    lightBlue: "border-sky-400/60",
    orange: "border-orange-500/60",
    cyan: "border-cyan-500/50",
    purple: "border-purple-500/50",
  };

  const textColor = {
    red: "text-red-300",
    yellow: "text-yellow-300",
    green: "text-green-300",
    blue: "text-blue-300",
    lightBlue: "text-sky-300",
    orange: "text-orange-300",
    cyan: "text-cyan-300",
    purple: "text-purple-300",
  };

  return (
    <div
      className={`
        rounded border-l-2 bg-white/5 px-2 py-1
        ${colorClasses[color as keyof typeof colorClasses]}
        ${textColor[color as keyof typeof textColor]}
        ${isAbnormal ? "animate-pulse" : ""}
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium">{label}</span>
        <span className="text-xs font-bold">
          {value}
          {isAbnormal ? <span className="ml-1">!</span> : null}
        </span>
      </div>
    </div>
  );
}

interface HeartModelProps {
  heartRate: number;
  telemetry: any;
  faults: any[];
}

function findNodeByPrefix(root: THREE.Object3D, namePrefix: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  root.traverse((obj) => {
    if (!found && obj.name.startsWith(namePrefix)) {
      found = obj;
    }
  });
  return found;
}

function HeartModel({ heartRate, telemetry, faults }: HeartModelProps) {
  const { scene, animations } = useGLTF("/models/Beating heart.glb") as GLTFResult;
  const heartRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const highlightRef = useRef<THREE.Mesh>(null);
  const [partHighlight, setPartHighlight] = useState<{
    position: THREE.Vector3;
    color: string;
    partName: string;
  } | null>(null);

  useEffect(() => {
    if (scene && animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      const action = mixerRef.current.clipAction(animations[0]);
      action.play();
    }
  }, [scene, animations]);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child: THREE.Object3D) => {
      if (!(child instanceof THREE.Mesh)) return;

      const materials = Array.isArray(child.material) ? child.material : [child.material];

      materials.forEach((material) => {
        if (!material) return;

        if (!material.userData.__heartColorCloned) {
          const clonedMaterial = material.clone();
          clonedMaterial.userData.__heartColorCloned = true;

          if (Array.isArray(child.material)) {
            child.material = child.material.map((entry) => (entry === material ? clonedMaterial : entry));
          } else {
            child.material = clonedMaterial;
          }

          material = clonedMaterial;
        }

        const standardMaterial = material as THREE.MeshStandardMaterial;

        if (!standardMaterial.userData.__originalHeartMaterial) {
          standardMaterial.userData.__originalHeartMaterial = {
            color: "color" in standardMaterial && standardMaterial.color ? standardMaterial.color.clone() : null,
            emissive:
              "emissive" in standardMaterial && standardMaterial.emissive
                ? standardMaterial.emissive.clone()
                : null,
            emissiveIntensity:
              "emissiveIntensity" in standardMaterial ? standardMaterial.emissiveIntensity : null,
            roughness: "roughness" in standardMaterial ? standardMaterial.roughness : null,
            metalness: "metalness" in standardMaterial ? standardMaterial.metalness : null,
          };
        }

        const originalMaterial = standardMaterial.userData.__originalHeartMaterial;

        if (originalMaterial.color && "color" in standardMaterial && standardMaterial.color) {
          standardMaterial.color.copy(originalMaterial.color);
        }
        if (originalMaterial.emissive && "emissive" in standardMaterial && standardMaterial.emissive) {
          standardMaterial.emissive.copy(originalMaterial.emissive);
        }
        if (originalMaterial.emissiveIntensity !== null && "emissiveIntensity" in standardMaterial) {
          standardMaterial.emissiveIntensity = originalMaterial.emissiveIntensity;
        }
        if (originalMaterial.roughness !== null && "roughness" in standardMaterial) {
          standardMaterial.roughness = originalMaterial.roughness;
        }
        if (originalMaterial.metalness !== null && "metalness" in standardMaterial) {
          standardMaterial.metalness = originalMaterial.metalness;
        }

        standardMaterial.needsUpdate = true;
      });
    });
  }, [scene, telemetry.temperature, faults]);

  useEffect(() => {
    if (!scene || !heartRef.current) {
      setPartHighlight(null);
      return;
    }

    const activeFault = [...faults]
      .filter((fault) => HEART_HIGHLIGHT_PARAMETERS.has(fault.parameter))
      .sort((a, b) => (a.level === "critical" ? -1 : b.level === "critical" ? 1 : 0))[0];
    const mappedPartPrefix = activeFault?.parameter ? PART_NODE_BY_PARAMETER[activeFault.parameter] : undefined;

    if (!mappedPartPrefix) {
      setPartHighlight(null);
      return;
    }

    const targetNode = findNodeByPrefix(scene, mappedPartPrefix);
    if (!targetNode) {
      setPartHighlight(null);
      return;
    }

    const worldPos = new THREE.Vector3();
    targetNode.getWorldPosition(worldPos);
    const localPos = heartRef.current.worldToLocal(worldPos.clone());
    const highlightColor = getHeartHighlightColor(activeFault, telemetry);
    const tintColor = new THREE.Color(highlightColor);

    // Apply a soft emissive tint to the affected heart part.
    targetNode.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (!material) return;

        const standardMaterial = material as THREE.MeshStandardMaterial;
        if ("color" in standardMaterial && standardMaterial.color) {
          standardMaterial.color.lerp(tintColor, 0.08);
        }
        if ("emissive" in standardMaterial && standardMaterial.emissive) {
          standardMaterial.emissive.lerp(tintColor, 0.35);
        }
        if ("emissiveIntensity" in standardMaterial) {
          standardMaterial.emissiveIntensity = Math.max(standardMaterial.emissiveIntensity ?? 0, 0.45);
        }
        standardMaterial.needsUpdate = true;
      });
    });

    setPartHighlight({
      position: localPos,
      color: highlightColor,
      partName: targetNode.name,
    });
  }, [scene, faults, telemetry]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      const speed = heartRate / 60;
      mixerRef.current.timeScale = speed;
      mixerRef.current.update(delta);
    }

    if (heartRef.current) {
      const beatScale = 1 + Math.sin(Date.now() * 0.001 * (heartRate / 60) * Math.PI * 2) * 0.02;
      heartRef.current.scale.setScalar(beatScale);
    }

    if (highlightRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.006) * 0.005;
      highlightRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={heartRef}>
      <primitive object={scene} scale={0.7} />
      {partHighlight ? (
        <mesh ref={highlightRef} position={partHighlight.position} renderOrder={10}>
          <sphereGeometry args={[0.005, 10, 10]} />
          <meshStandardMaterial
            color={partHighlight.color}
            emissive={partHighlight.color}
            emissiveIntensity={0.45}
            transparent
            opacity={0.35}
            depthTest={false}
          />
        </mesh>
      ) : null}
    </group>
  );
}
