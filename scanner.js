import fetch from "node-fetch";

const target = "https://example.com";

async function scan() {
  console.log("[*] Scan React2Shell en cours...");

  try {
    const res = await fetch(target + "/_flight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ probe: true })
    });

    if (res.status === 500 || res.status === 418) {
      console.log("[!] Comportement suspect détecté (React2Shell possible)");
    } else {
      console.log("[+] Aucun signe évident de React2Shell");
    }
  } catch (e) {
    console.log("[!] Erreur réseau :", e.message);
  }
}

scan();
