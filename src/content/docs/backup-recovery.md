# Backup & Recovery Policy

**Organization:** InVision Network  
**Contact:** security@invisionnetwork.org  
**Version:** 1.0 | Last Updated: 2026-04-14

---

## Overview

InVision Network uses Supabase-managed PostgreSQL for all user and application data. This document describes our backup strategy, retention policy, and recovery procedures.

---

## Backup Strategy

### Automated Backups

- **Provider:** Supabase (SOC 2 Type II certified)
- **Frequency:** Daily automated snapshots
- **Type:** Full database snapshots + write-ahead log (WAL) streaming
- **Retention:** 30 days

### Point-in-Time Recovery (PITR)

Supabase Pro plan includes continuous WAL archiving, enabling point-in-time recovery to any moment within the retention window. This allows recovery to a specific second before an incident occurred.

---

## Recovery Targets

| Metric | Target      | Description                                              |
|--------|-------------|----------------------------------------------------------|
| RTO    | 4 hours     | Recovery Time Objective — time to restore service        |
| RPO    | 1 hour      | Recovery Point Objective — maximum acceptable data loss  |

---

## Recovery Procedure

1. **Identify** the target restore point (timestamp or snapshot ID)
2. **Notify** internal team and stakeholders of planned recovery window
3. **Initiate** restore via Supabase dashboard or CLI:
   - For PITR: specify exact timestamp
   - For snapshot restore: select daily backup from retention list
4. **Validate** data integrity post-restore:
   - Run database health checks
   - Verify critical records (users, profiles, orders)
   - Confirm application connects and functions correctly
5. **Resume** service and notify affected users
6. **Document** recovery in incident log

---

## Storage & Security

- Backups are encrypted at rest using AES-256
- Backup storage is geographically redundant within the US
- Backup access is restricted to authorized administrators only
- Backup integrity is verified automatically by Supabase

---

## Testing

Backup recovery procedures are tested:
- When onboarding a new database tier
- After major schema migrations
- At least annually as part of our security review

---

## Contact

For questions about data recovery:  
**security@invisionnetwork.org**
