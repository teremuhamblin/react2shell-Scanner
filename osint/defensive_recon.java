// defensive_recon.java
// OSINT Defensive Recon All-in-One (Java)

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

public class OsintDefensiveRecon {

    static class DefensiveReport {
        String target;
        List<String> ips = new ArrayList<>();
        Map<String, String> reputation = new HashMap<>();
        Map<String, String> securityHints = new HashMap<>();
    }

    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.out.println("Usage: java OsintDefensiveRecon <domain>");
            System.exit(1);
        }
        String target = args[0];

        System.out.println("=== OSINT Defensive Recon (Java) ===");
        System.out.println("[*] Target: " + target);

        DefensiveReport report = new DefensiveReport();
        report.target = target;

        // Résolution IP
        try {
            InetAddress[] addrs = InetAddress.getAllByName(target);
            for (InetAddress addr : addrs) {
                report.ips.add(addr.getHostAddress());
            }
            System.out.println("[+] IPs: " + report.ips);
        } catch (Exception e) {
            System.out.println("[!] DNS resolution failed: " + e.getMessage());
        }

        // Exemple de réputation (à adapter avec ton API réelle)
        if (!report.ips.isEmpty()) {
            String ip = report.ips.get(0);
            String vt = httpGet("https://ip-api.com/json/" + ip);
            report.reputation.put("geoip", vt);
        }

        // Hints défensifs basés sur simple logique
        if (report.ips.size() > 1) {
            report.securityHints.put("load_balancing", "Multiple IPs detected (possible CDN / load balancer)");
        }
        if (target.startsWith("www.")) {
            report.securityHints.put("www_prefix", "Classic web prefix, check HTTPS and HSTS");
        }

        System.out.println("[+] Defensive report:");
        System.out.println("Target: " + report.target);
        System.out.println("IPs: " + report.ips);
        System.out.println("Reputation: " + report.reputation.keySet());
        System.out.println("Security hints: " + report.securityHints);
    }

    private static String httpGet(String urlStr) {
        StringBuilder sb = new StringBuilder();
        try {
            URL url = new URL(urlStr);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setConnectTimeout(5000);
            con.setReadTimeout(5000);
            con.setRequestMethod("GET");

            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream()))) {
                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line);
                }
            }
        } catch (Exception e) {
            return "{}";
        }
        return sb.toString();
    }
}
