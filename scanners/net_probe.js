// ============================================================
// net_probe.js — Military Network Probe Module v1.0
// ============================================================

import net from "net";

const target = "example.com";
const ports = [80, 443, 3000, 4000, 8080, 9000];

function scanPort(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const start = Date.now();

    socket.setTimeout(3000);

    socket.on("connect", () => {
      const latency = Date.now() - start;
      console.log(`[+] Port ${port} ouvert (${latency} ms)`);
      socket.destroy();
      resolve();
    });

    socket.on("timeout", () => {
      console.log(`[!] Timeout sur le port ${port}`);
      socket.destroy();
      resolve();
    });

    socket.on("error", () => {
      console.log(`[-] Port ${port} fermé`);
      resolve();
    });

    socket.connect(port, target);
  });
}

async function run() {
  console.log("=== Network Probe Military v1.0 ===");
  for (const port of ports) await scanPort(port);
}

run();
