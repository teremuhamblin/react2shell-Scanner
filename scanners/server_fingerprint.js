// ============================================================
// server_fingerprint.js — Server Fingerprint Module v1.0
// ============================================================

export function fingerprint(headers) {
  const fp = [];

  const server = headers.get("server");
  const powered = headers.get("x-powered-by");

  if (server) fp.push(`Server: ${server}`);
  if (powered) fp.push(`Powered-By: ${powered}`);

  if (server?.includes("Next.js") || powered?.includes("Next.js"))
    fp.push("Next.js détecté → RSC potentiellement actif");

  if (server?.includes("Node")) fp.push("Serveur Node.js détecté");

  return fp;
}
