// osint_offensive.go
// OSINT Offensive Recon All-in-One (Go)

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"os"
	"time"
)

type ReconResult struct {
	Target       string            `json:"target"`
	IPs          []string          `json:"ips"`
	DNSRecords   map[string][]string `json:"dns_records"`
	HTTPHeaders  map[string]string `json:"http_headers"`
	WhoisSummary map[string]any    `json:"whois_summary"`
	GeoIP        map[string]any    `json:"geoip"`
}

func resolveDNS(target string) (map[string][]string, []string, error) {
	res := make(map[string][]string)
	var ips []string

	addrs, err := net.LookupHost(target)
	if err == nil {
		ips = addrs
		res["A"] = addrs
	}

	ns, _ := net.LookupNS(target)
	for _, n := range ns {
		res["NS"] = append(res["NS"], n.Host)
	}

	mx, _ := net.LookupMX(target)
	for _, m := range mx {
		res["MX"] = append(res["MX"], m.Host)
	}

	txt, _ := net.LookupTXT(target)
	res["TXT"] = txt

	return res, ips, nil
}

func fetchHTTPHeaders(target string) (map[string]string, error) {
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get("https://" + target)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	headers := make(map[string]string)
	for k, v := range resp.Header {
		if len(v) > 0 {
			headers[k] = v[0]
		}
	}
	return headers, nil
}

func fetchJSON(url string) (map[string]any, error) {
	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequestWithContext(context.Background(), http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}
	return data, nil
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: osint_offensive <domain>")
		os.Exit(1)
	}
	target := os.Args[1]

	fmt.Println("=== OSINT Offensive Recon (Go) ===")
	fmt.Println("[*] Target:", target)

	dns, ips, _ := resolveDNS(target)
	fmt.Println("[+] DNS records collected")

	headers, _ := fetchHTTPHeaders(target)
	fmt.Println("[+] HTTP headers collected")

	// Exemple d’API publique (à adapter avec ta clé/API réelle)
	whois, _ := fetchJSON("https://whoisjson.com/api/v1/whois?domain=" + target)
	geo := map[string]any{}
	if len(ips) > 0 {
		geo, _ = fetchJSON("http://ip-api.com/json/" + ips[0])
	}

	result := ReconResult{
		Target:       target,
		IPs:          ips,
		DNSRecords:   dns,
		HTTPHeaders:  headers,
		WhoisSummary: whois,
		GeoIP:        geo,
	}

	out, _ := json.MarshalIndent(result, "", "  ")
	fmt.Println(string(out))
}
