###### README.md >> markdown

![OSINT](https://img.shields.io/badge/Folder-osint-e67e22?style=for-the-badge)
![Recon](https://img.shields.io/badge/Recon-Offensive_&_Defensive-e67e22?style=for-the-badge)
![Go](https://img.shields.io/badge/Script-Go_Offensive-e67e22?style=for-the-badge&logo=go)
![Java](https://img.shields.io/badge/Script-Java_Defensive-e67e22?style=for-the-badge&logo=java)

### Dossier osint/
Outils OSINT offensifs et défensifs pour reconnaissance, analyse et collecte d’informations sur des cibles ou infrastructures.  
Ce dossier contient deux scripts principaux : un en Go (offensif) et un en Java (défensif).

Contenu

- osint_offensive.go — Reconnaissance offensive tout‑en‑un (Go)
- OsintDefensiveRecon.java — Reconnaissance défensive tout‑en‑un (Java)

---

1. OSINT Offensive (Go)
Script : osint_offensive.go

Fonctionnalités
- [x] Résolution DNS (A, NS, MX, TXT)
- [x] Récupération des IPs
- [x] Analyse des headers HTTP
- [x] WHOIS (via API JSON)
- [x] GeoIP automatique
- [x] Rapport JSON complet

Utilisation

1. Installer Go
`
sudo apt install golang
`

2. Exécuter le script
`
go run osint_offensive.go <domaine>
`

Exemple
`
go run osint_offensive.go example.com
`

Résultat
- Rapport JSON affiché dans le terminal
- Informations DNS, HTTP, WHOIS, GeoIP

---

2. OSINT Défensif (Java)
Script : OsintDefensiveRecon.java

Fonctionnalités
- [x] Résolution IP
- [x] Vérification réputation IP (API publique)
- [x] Indicateurs défensifs (CDN, load balancing, préfixes)
- [x] Analyse simple de surface d’exposition
- [x] Rapport textuel clair

Utilisation

1. Compiler
`
javac OsintDefensiveRecon.java
`

2. Exécuter
`
java OsintDefensiveRecon <domaine>
`

Exemple
`
java OsintDefensiveRecon example.com
`

Résultat
- Liste des IPs
- Informations de réputation
- Conseils défensifs automatiques

---

Checklist globale OSINT

- [x] Scripts offensifs et défensifs opérationnels  
- [x] Résolution DNS fonctionnelle  
- [x] WHOIS / GeoIP intégrés  
- [x] Analyse défensive automatisée  
- [x] Structure militaire stable  

---

Documentation maintenue pour assurer la reconnaissance OSINT offensive et défensive du projet.
`

---
