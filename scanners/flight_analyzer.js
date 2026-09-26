// ============================================================
// flight_analyzer.js — Deep Flight Payload Analyzer v1.0
// ============================================================

export function analyzeFlightPayload(text) {
  const issues = [];

  if (text.includes("Flight")) issues.push("Flight signature détectée");
  if (text.includes("RSC")) issues.push("RSC chunk détecté");
  if (text.includes("$$typeof")) issues.push("Structure interne React détectée");
  if (text.includes("[object Object]")) issues.push("Objet sérialisé suspect");
  if (text.length > 50000) issues.push("Payload volumineux anormal");

  return issues;
}
