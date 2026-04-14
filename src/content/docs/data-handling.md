# Data Handling Policy

**Organization:** InVision Network  
**Contact:** security@invisionnetwork.org  
**Version:** 1.0 | Last Updated: 2026-04-14

---

## What Data We Collect

### Account Data
- Name, email address, and password (hashed — never stored in plain text)
- Account creation date and last login timestamp
- User role and account status

### Profile Data
- First name, last name
- Optional: phone number, organization name
- Profile preferences and settings

### Usage Data
- Pages visited, features used (anonymous analytics via PostHog)
- Support tickets and communications
- Purchase and billing history (via Stripe — we do not store raw card numbers)

### Technical Data
- IP address (logged for security auditing, not profiling)
- Browser type and device type (for compatibility)
- Session tokens (encrypted, expire automatically)

---

## How Data Is Stored

All data is stored in Supabase-managed PostgreSQL databases hosted in the United States.

- **Encryption at rest:** AES-256
- **Encryption in transit:** TLS 1.3
- **Access control:** Row-Level Security (RLS) policies ensure users can only access their own data
- **Admin access:** Restricted to authorized InVision Network staff only

---

## Encryption Standards

| Layer          | Standard    |
|----------------|-------------|
| Data at rest   | AES-256     |
| Data in transit| TLS 1.3     |
| Passwords      | bcrypt      |
| Sessions       | Signed JWT  |

---

## Data Retention

| Data Type        | Retention Period        |
|------------------|------------------------|
| Account data     | Until account deletion |
| Usage/analytics  | 24 months              |
| Support tickets  | 36 months              |
| Billing records  | 7 years (legal/tax)    |
| Server logs      | 90 days                |
| Backups          | 30 days                |

---

## Who Has Access

- **You:** Full access to your own data via the member portal
- **InVision Network staff:** Limited access for support purposes, logged and audited
- **Supabase:** Infrastructure provider — bound by DPA and SOC 2 Type II certification
- **Stripe:** Payment processing only — does not have access to non-payment data
- **No one else:** We never sell, rent, or share your personal data with third parties for marketing

---

## Your Rights (GDPR / CCPA)

You have the right to:
- **Access** — Request a copy of all data we hold about you
- **Correction** — Request corrections to inaccurate data
- **Deletion** — Request deletion of your account and associated data
- **Portability** — Request your data in a machine-readable format
- **Opt-out** — Opt out of analytics tracking at any time

### How to Request Data Deletion

1. Email **hello@invisionnetwork.org** with subject: "Data Deletion Request"
2. Include your account email address
3. We will confirm deletion within 30 days
4. Note: billing records may be retained for up to 7 years as required by law

---

## Contact

Data privacy inquiries:  
**hello@invisionnetwork.org**

Security or breach reports:  
**security@invisionnetwork.org**
