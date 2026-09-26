// ============================================================
// proto_detector.js — Prototype Pollution Detector v1.0
// ============================================================

export function detectPrototypePollution(body) {
  const alerts = [];

  if (body.includes("__proto__")) alerts.push("Prototype pollution détectée");
  if (body.includes("constructor")) alerts.push("Constructor override suspect");
  if (body.includes("toString")) alerts.push("Override de toString détecté");

  return alerts;
}
