// ============================================================
// monitor.js — Tactical Server Monitor v1.0
// ============================================================

import os from "os";
import { exec } from "child_process";

function checkSystem() {
  console.log("=== Tactical Monitor v1.0 ===");

  console.log("[*] CPU Load :", os.loadavg());
  console.log("[*] RAM Free :", os.freemem());
  console.log("[*] RAM Total :", os.totalmem());

  exec("ps aux | grep node", (err, stdout) => {
    if (stdout.includes("xmrig")) console.log("[!] Miner détecté");
    if (stdout.includes("frpc")) console.log("[!] Tunnel FRP détecté");
    if (stdout.includes("sliver")) console.log("[!] Sliver C2 détecté");

    console.log("[*] Processus Node.js détectés :\n", stdout);
  });
}

checkSystem();
