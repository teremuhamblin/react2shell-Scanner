// ============================================================
// React2Shell Advanced Military Scanner v4.0
// ============================================================

import fetch from "node-fetch";
import crypto from "crypto";

// ===================== CONFIG MODULE ========================

const Config = {
  target: "https://example.com",
  timeoutMs: 5000,
  endpoints: [
    "/_flight",
    "/_rsc",
    "/_react",
    "/_server",
    "/api/rsc",
    "/api/_flight"
  ],
  userAgent: "React2Shell-Military-Scanner/4.0",
  suspiciousStatus: [418, 500, 503, 520],
  slowThresholdMs: 800
};

// ===================== LOGGER MODULE ========================

const Logger = {
  banner() {
    console.log("==================================================");
    console.log("[*] React2Shell Military Scanner v4.0");
    console.log("[*] Target :", Config.target);
    console.log("==================================================\n");
  },

  info(msg) {
    console.log(`[+] INFO  :: ${msg}`);
  },

  warn(msg) {
    console.log(`[!] WARN  :: ${msg}`);
  },

  error(msg) {
    console.log(`[X] ERROR :: ${msg}`);
  },

  section(title) {
    console.log("\n--------------------------------------------------");
    console.log(`[SECTION] ${title}`);
    console.log("--------------------------------------------------");
  },

  footer() {
    console.log("\n==================================================");
    console.log("[*] Scan completed.");
    console.log("==================================================");
  }
};

// ===================== PROBE MODULE =========================

const Probes = {
  buildPayloads() {
    return [
      { probe: true },
      { probe: "flight-test", ts: Date.now() },
      { malformed: "{[[{broken:true}}", id: crypto.randomUUID() },
      { deep: { loop: { a: {}, b: {} } } },
      { pollution: "__proto__", value: "React2Shell" }
    ];
  },

  buildHeaders(payload) {
    return {
      "Content-Type": "text/x-component",
      "X-Probe-ID": crypto.randomUUID(),
      "X-Probe-Type": typeof payload,
      "User-Agent": Config.userAgent
    };
  }
};

// ===================== ANALYZER MODULE =======================

const Analyzer = {
  analyzeStatus(status) {
    if (Config.suspiciousStatus.includes(status)) {
      Logger.warn(`Suspicious HTTP status detected: ${status} (possible React2Shell)`);
    } else {
      Logger.info(`HTTP status: ${status}`);
    }
  },

  analyzeHeaders(headers) {
    const server = headers.get("server");
    const powered = headers.get("x-powered-by");

    if (server?.includes("Next.js") || powered?.includes("Next.js")) {
      Logger.info("Fingerprint: Next.js detected (RSC likely present)");
    }
  },

  analyzeBody(text) {
    if (text.includes("Flight") || text.includes("RSC")) {
      Logger.info("Flight/RSC response detected.");
    }

    if (text.includes("__proto__")) {
      Logger.warn("Prototype pollution indicator found in response.");
    }

    if (text.includes("ReferenceError") || text.includes("TypeError")) {
      Logger.warn("Internal RSC error detected (typical React2Shell behavior).");
    }
  },

  analyzeTiming(ms) {
    if (ms > Config.slowThresholdMs) {
      Logger.warn(`Slow response (${ms.toFixed(2)} ms) → possible heavy deserialization.`);
    } else {
      Logger.info(`Response time: ${ms.toFixed(2)} ms`);
    }
  }
};

// ===================== CORE SCAN MODULE ======================

async function scanEndpoint(endpoint) {
  Logger.section(`Endpoint: ${endpoint}`);

  const payloads = Probes.buildPayloads();

  for (const payload of payloads) {
    const start = performance.now();

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), Config.timeoutMs);

      const res = await fetch(Config.target + endpoint, {
        method: "POST",
        headers: Probes.buildHeaders(payload),
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);

      const elapsed = performance.now() - start;

      Analyzer.analyzeStatus(res.status);
      Analyzer.analyzeHeaders(res.headers);

      const text = await res.text();
      Analyzer.analyzeBody(text);
      Analyzer.analyzeTiming(elapsed);

    } catch (err) {
      Logger.error(`Network/scan error on ${endpoint}: ${err.message}`);
    }
  }
}

// ===================== MAIN RUNNER MODULE ====================

async function runScanner() {
  Logger.banner();

  for (const ep of Config.endpoints) {
    await scanEndpoint(ep);
  }

  Logger.footer();
}

// ===================== EXECUTION =============================

runScanner();
