# Incident Response Plan

**Organization:** InVision Network  
**Contact:** security@invisionnetwork.org  
**Version:** 1.0 | Last Updated: 2026-04-14

---

## Overview

This Incident Response Plan (IRP) defines how InVision Network detects, contains, eradicates, and recovers from cybersecurity incidents, and how we conduct post-incident reviews to prevent recurrence.

---

## Severity Levels

| Level | Name     | Description                                                           | Response Target |
|-------|----------|-----------------------------------------------------------------------|-----------------|
| P0    | Critical | Active breach, data exfiltration, full service outage                | 1 hour          |
| P1    | High     | Partial data exposure, significant service degradation                | 4 hours         |
| P2    | Normal   | Minor vulnerability, limited service impact, suspected intrusion      | 24 hours        |
| P3    | Low      | Informational, no immediate risk, minor policy violation              | 72 hours        |

---

## Response Phases

### 1. Detect

- Automated monitoring via Supabase logs and Vercel alerting
- Staff reports anomalies to security@invisionnetwork.org immediately
- External reports (customers, researchers) triaged within 4 hours
- Incident logged with timestamp, reporter, and initial assessment

### 2. Contain

- Isolate affected systems or accounts as quickly as possible
- Revoke compromised credentials or API keys immediately
- Preserve logs and evidence before making changes
- Notify internal team via secure channel

### 3. Eradicate

- Identify root cause of incident
- Remove malicious code, unauthorized access, or misconfiguration
- Apply patches or configuration fixes
- Verify eradication before proceeding to recovery

### 4. Recover

- Restore services from known-good backups if necessary
- Validate data integrity before bringing systems back online
- Monitor closely for 72 hours post-recovery
- Confirm normal operations with affected users

### 5. Post-Incident Review

- Conduct review within 5 business days of resolution
- Document: what happened, timeline, impact, root cause, remediation
- Update security controls and runbooks to prevent recurrence
- Share summary with affected users where appropriate

---

## Notification Procedure

- **P0/P1 incidents:** Affected users notified within 72 hours via email
- **Regulatory reporting:** GDPR requires notification to relevant supervisory authorities within 72 hours of becoming aware of a personal data breach
- **Public disclosure:** Posted to status page at /status after resolution

---

## Contact

Security reports and vulnerability disclosures:  
**security@invisionnetwork.org**

General inquiries:  
**hello@invisionnetwork.org** | **(937) 301-8749**
