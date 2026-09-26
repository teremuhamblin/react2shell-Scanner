# React2Shell
### detection.md

Détection, IoCs, logs, signatures et méthodes d’analyse

---

1. Objectif du document
Ce document fournit toutes les méthodes de détection de la vulnérabilité React2Shell (CVE‑2025‑55182), incluant :
- Indicateurs de compromission (IoCs)
- Signatures réseau
- Logs à surveiller
- Outils recommandés
- Checklists opérationnelles
- Schémas tactiques de détection

---

2. Indicateurs de compromission (IoCs)

2.1 IoCs réseau
| Élément | Indicateur |
|--------|------------|
| Méthode HTTP | POST suspect vers endpoints RSC/Next.js |
| Header | Content-Type: text/x-component |
| Payload | Chunks Flight volumineux, malformés ou non conformes |
| Fréquence | Multiples requêtes similaires en peu de temps |
| Origine | IP inconnues, botnets, cloud anonymisé |

2.2 IoCs système
| Élément | Indicateur |
|--------|------------|
| Processus | node consommant CPU anormalement |
| Fichiers | Présence de xmrig, frpc, nezha, sliver |
| Secrets | Accès ou lecture de .env, tokens, clés |
| Réseau | Tunnels sortants vers ports non standards |

---

3. Logs à surveiller

3.1 Logs applicatifs (Next.js / RSC)
- Erreurs de désérialisation Flight  
- Boucles de référence détectées  
- Prototypes modifiés  
- Exceptions internes du Blob Handler  
- Messages indiquant des chunks Flight invalides  

3.2 Logs système
- Exécution de commandes encodées Base64  
- Création de fichiers temporaires suspects  
- Processus Node.js lancés hors du workflow normal  

3.3 Logs réseau
- Requêtes répétées vers /api/* ou endpoints RSC  
- Payloads Flight dépassant la taille habituelle  
- Communications sortantes vers serveurs inconnus  

---

4. Signatures réseau (WAF / IDS / IPS)

4.1 Patterns à détecter
`
Content-Type: text/x-component
Flight chunk malformed
Unexpected RSC serialization structure
Prototype pollution indicators
`

4.2 Schéma ASCII — flux de détection

`
+------------------+
|  Internet        |
+------------------+
          |
          v
+------------------+
|  WAF / IDS       |
|  (Filtrage RSC)  |
+------------------+
          |
          v
+---------------------------+
| Serveur Next.js / RSC     |
| (Logs + EDR/XDR)          |
+---------------------------+
          |
          v
+------------------+
| SIEM / SOAR      |
+------------------+
`

---

5. Outils recommandés

5.1 Solutions de détection
| Outil | Capacité |
|-------|----------|
| Microsoft Defender XDR | Détection RCE Node.js, IoCs React2Shell |
| Rapid7 InsightIDR | Règles spécifiques React2Shell |
| Trend Micro Vision One | Analyse Flight payloads |
| JFrog Xray | Détection dépendances vulnérables |

5.2 Scripts internes
- Analyse des logs RSC  
- Détection de prototypes modifiés  
- Scan des processus Node.js  
- Vérification de présence de miners/backdoors  

---

6. Méthodes de détection avancées

6.1 Analyse comportementale Node.js
- Surveiller les appels système inhabituels  
- Détecter les modules chargés dynamiquement  
- Identifier les exécutions de code arbitraire  

6.2 Détection Flight payloads
- Vérifier la structure JSON/Flight  
- Détecter les boucles de référence  
- Identifier les types inattendus dans les chunks  

6.3 Détection de persistance
- Services ajoutés  
- Cron jobs suspects  
- Binaires inconnus dans /usr/bin/, /tmp/, /var/tmp/  

---

7. Checklist de détection

7.1 Réseau
- [x] Règles WAF pour text/x-component  
- [x] Détection payload Flight anormal  
- [x] Analyse des IP suspectes  

7.2 Système
- [x] Scan des processus Node.js  
- [x] Recherche de miners/backdoors  
- [x] Vérification des fichiers .env  

7.3 Application
- [x] Logs RSC activés  
- [x] Logs Next.js activés  
- [x] Détection exceptions Flight  

7.4 SIEM
- [x] Corrélation IoCs  
- [x] Alertes sur prototypes modifiés  
- [x] Détection de commandes encodées  

---

8. Résumé tactique

`
Détecter → Isoler → Analyser → Corriger → Surveiller
`

- Détecter les payloads Flight suspects  
- Isoler les serveurs compromis  
- Analyser les processus et fichiers  
- Corriger via patchs et durcissement  
- Surveiller via SIEM/EDR  

---

9. Conclusion

La détection de React2Shell repose sur :
- L’analyse des payloads Flight  
- La surveillance des logs RSC/Next.js  
- La détection comportementale Node.js  
- La corrélation SIEM des IoCs connus  

Ce document constitue la base opérationnelle pour identifier toute tentative ou exploitation active de CVE‑2025‑55182.

---
`

---
