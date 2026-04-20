import type { BookChapter } from "@/config/bookCatalog";

/** Full content for PCI DSS Made Simple — Credit Card Security for Small Business (~115 pages) */
export const PCI_DSS_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">PCI DSS Made Simple</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">Credit Card Security for Small Business</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>InVision Network Press · Kettering, Ohio 45440</p><p><em>For educational purposes only. Consult qualified legal and security professionals for your specific situation.</em></p></div></article>`,
  },
  {
    chapter_number: 1,
    chapter_title: "Why Payment Security Is Every Business Owner's Problem",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Why Payment Security Is Every Business Owner's Problem</h2>

<p>If your business accepts credit or debit cards — and virtually every business does — you are subject to the Payment Card Industry Data Security Standard, commonly known as PCI DSS. This is not a government regulation. It is a contractual obligation that flows from your merchant agreement with your bank or payment processor. When you signed that agreement, you agreed to comply with PCI DSS as a condition of being permitted to accept card payments. Most small business owners do not recall this provision, because it is buried in dense contract language and never verbally explained. But it is there, it is binding, and the consequences of non-compliance can be severe.</p>

<p>PCI DSS was created in 2004 by the five major card brands — Visa, Mastercard, American Express, Discover, and JCB — as a unified standard for protecting cardholder data across the payment ecosystem. Before PCI DSS, each card brand had its own security program, creating a fragmented and confusing compliance landscape. The unified standard was designed to raise the security floor across all merchants accepting payment cards and to create consistent accountability for the security of cardholder data.</p>

<h3>The Cost of Non-Compliance vs. the Cost of a Breach</h3>

<p>Non-compliance with PCI DSS — specifically, failing to complete the required annual Self-Assessment Questionnaire and quarterly vulnerability scans where applicable — can result in your payment processor or acquiring bank assessing monthly non-compliance fees, typically ranging from $10 to $100 per month for small merchants. If you suffer a breach while non-compliant, those fees become the least of your problems. A post-breach PCI forensic investigation mandated by the card brands can cost $10,000 to $100,000. Card brand fines for breaches while non-compliant can reach $500,000 per incident. Your acquiring bank may terminate your merchant account — meaning you lose the ability to accept card payments, which for most retail and service businesses is a near-existential consequence.</p>

<p>The direct cost of the compromised card data itself is also borne by the merchant in many cases. Fraudulent charges on compromised cards result in chargebacks — returns of the fraudulent transaction amounts — that flow back to the merchant if the breach originated at their location. A merchant whose point-of-sale system is compromised may face chargebacks for every fraudulent transaction made on every card that was processed through that system during the compromise period, potentially totaling hundreds of thousands of dollars.</p>

<p>Ohio small businesses have not been immune to these consequences. A Dayton-area restaurant chain suffered a POS system compromise in 2022 that exposed card data for several thousand customers. The forensic investigation, card brand fines, chargeback liability, and customer notification costs collectively exceeded $400,000 — more than the business's annual net income. The business survived, but only through significant operational disruption and a line of credit that took three years to repay.</p>

<h3>The Myth That "My Payment Processor Handles It"</h3>

<p>The most dangerous misconception in small business PCI compliance is the belief that using a reputable payment processor — Square, Stripe, PayPal, Toast, Heartland, or any other — automatically means you are PCI compliant. Payment processors are responsible for the security of card data within their own systems. They are not responsible for the security of your business environment — your point-of-sale hardware, your network, your employee practices, and your physical security. If a criminal installs a card skimmer on your payment terminal, your processor did not fail — your physical security practices did. If a criminal installs malware on your Windows-based POS computer, your processor did not fail — your patch management practices did. You share responsibility for the cardholder data environment, and PCI DSS defines your specific obligations within that shared responsibility model.</p>

<h3>Merchant Levels Explained — Most Small Businesses Are Level 4</h3>

<p>PCI DSS applies to all merchants that accept payment cards, but the specific compliance requirements vary based on transaction volume. Merchants are classified into four levels:</p>

<ul>
<li><strong>Level 1:</strong> Merchants processing more than 6 million card transactions per year. Subject to annual on-site assessment by a Qualified Security Assessor (QSA) and quarterly network scans. This is the enterprise tier — think large retail chains and major e-commerce platforms.</li>
<li><strong>Level 2:</strong> Merchants processing 1 to 6 million card transactions per year. Annual Self-Assessment Questionnaire (SAQ) and quarterly network scans.</li>
<li><strong>Level 3:</strong> Merchants processing 20,000 to 1 million e-commerce transactions per year. Annual SAQ and quarterly network scans.</li>
<li><strong>Level 4:</strong> Merchants processing fewer than 20,000 e-commerce transactions or up to 1 million total card transactions per year. Annual SAQ; quarterly scans may or may not be required depending on SAQ type and acquiring bank requirements.</li>
</ul>

<p>The overwhelming majority of Ohio small businesses — retail shops, restaurants, service businesses, healthcare practices, professional offices — are Level 4 merchants. The compliance requirements for Level 4 merchants are significantly lighter than those for Level 1 and 2 merchants, but they are not trivial and they are not optional.</p>

<h3>The Annual Self-Assessment Questionnaire</h3>

<p>The Self-Assessment Questionnaire (SAQ) is the primary compliance documentation tool for small merchants. It is a structured questionnaire that asks you to attest to your compliance with PCI DSS requirements relevant to your specific payment processing environment. There are multiple SAQ types — A, B, B-IP, C-VT, C, D, and P2PE — each applicable to a different type of payment processing environment. Most small Ohio businesses will complete either SAQ A (if all payment processing is outsourced and no cardholder data touches your systems) or SAQ C (for merchants using payment application systems connected to the internet). Chapter 2 explains the SAQ types and how to determine which applies to your business.</p>
</article>`,
  },
  {
    chapter_number: 2,
    chapter_title: "PCI DSS Explained — The 12 Requirements in Plain English",
    page_start: 17,
    page_end: 30,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: PCI DSS Explained — The 12 Requirements in Plain English</h2>

<p>PCI DSS version 4.0, the current standard, organizes its requirements around six goals and 12 high-level requirements. The full standard runs to hundreds of pages of detailed sub-requirements and testing procedures. This chapter provides a plain-English summary of what each requirement means for a small Ohio business owner, without the technical jargon that makes the standard inaccessible to non-specialists.</p>

<h3>Goal 1: Build and Maintain a Secure Network and Systems</h3>

<p><strong>Requirement 1: Install and maintain network security controls.</strong> This means having a firewall or equivalent network security device between the internet and the systems that process payment card data. For a small restaurant or retail store, this means your POS system should not be directly exposed to the internet without a firewall in between. It also means your cardholder data environment should be segmented from other parts of your network — a concept explained in detail in Chapter 4.</p>

<p><strong>Requirement 2: Apply secure configurations to all system components.</strong> Default usernames and passwords on routers, switches, POS systems, and payment terminals must be changed before those devices are put into production. Default configurations are published and widely known — leaving them in place is equivalent to leaving the factory key in the lock. All unnecessary services and functions on systems in the cardholder data environment should be disabled.</p>

<h3>Goal 2: Protect Account Data</h3>

<p><strong>Requirement 3: Protect stored account data.</strong> The simplest path to compliance with this requirement is to not store cardholder data at all. If you do not store Primary Account Numbers (PANs — the 16-digit card number), expiration dates, or security codes, you have nothing to protect and nothing to lose if you are breached. If your business processes are designed so that cardholder data never touches your systems — because your payment processor handles all storage and processing — this requirement is largely satisfied by design. Chapter 5 covers the "store nothing you don't need" principle in detail.</p>

<p><strong>Requirement 4: Protect cardholder data with strong cryptography during transmission over open, public networks.</strong> Any transmission of cardholder data over the internet — whether from a customer's browser to your payment page, from your POS terminal to your processor, or from any business system to any other — must be encrypted using current strong cryptography. TLS 1.2 or 1.3 is the current minimum standard. For most small merchants using modern payment terminals and cloud-based payment gateways, this requirement is satisfied by the hardware and software they are already using — but it is worth verifying with your payment processor.</p>

<h3>Goal 3: Maintain a Vulnerability Management Program</h3>

<p><strong>Requirement 5: Protect all systems and networks from malicious software.</strong> Antivirus software must be deployed on all systems commonly affected by malware — primarily Windows-based POS computers and workstations. The antivirus must be kept current and actively running. This requirement also includes broader anti-malware practices: keeping software updated to address known vulnerabilities, and training staff to avoid downloading malicious software.</p>

<p><strong>Requirement 6: Develop and maintain secure systems and software.</strong> For small merchants who use vendor-supplied payment software and hardware (rather than developing their own), this requirement primarily means keeping that software updated. Install security patches for POS software, payment application software, and the operating systems they run on. Use payment applications that appear on the PCI Security Standards Council's list of validated payment applications.</p>

<h3>Goal 4: Implement Strong Access Control Measures</h3>

<p><strong>Requirement 7: Restrict access to system components and cardholder data by business need to know.</strong> Only employees who need to access payment systems to do their jobs should have that access. A bookkeeper who reconciles daily sales does not need to access the live payment processing system. A server who needs to run transactions does not need administrative access to the POS system. Implement role-based access controls that enforce this principle.</p>

<p><strong>Requirement 8: Identify users and authenticate access to system components.</strong> Every person who accesses systems in the cardholder data environment must have a unique identifier — a unique username — so that activity can be traced to a specific individual. Shared logins make accountability impossible. Multi-factor authentication is now required for all access into the cardholder data environment and for all remote access.</p>

<p><strong>Requirement 9: Restrict physical access to cardholder data.</strong> Physical access to payment terminals, servers, and systems that process card data must be controlled and monitored. Payment terminals should be inspected regularly for evidence of tampering — card skimmers, modified hardware, unexpected attached devices. Physical media containing cardholder data must be stored securely and disposed of securely.</p>

<h3>Goal 5: Regularly Monitor and Test Networks</h3>

<p><strong>Requirement 10: Log and monitor all access to system components and cardholder data.</strong> Maintain audit logs of all access to systems in the cardholder data environment, review those logs regularly, and retain them for at least 12 months. For most small merchants, the relevant logs are generated by the POS system and payment application software. Ensure logging is enabled and that logs are reviewed — at minimum weekly, ideally automated.</p>

<p><strong>Requirement 11: Test security of systems and networks regularly.</strong> For Level 4 merchants, this requirement primarily means completing quarterly external vulnerability scans using an Approved Scanning Vendor (ASV) if required by your acquiring bank or SAQ type. Internal vulnerability scans and penetration testing requirements apply more directly to Level 1 and 2 merchants.</p>

<h3>Goal 6: Maintain an Information Security Policy</h3>

<p><strong>Requirement 12: Support information security with organizational policies and programs.</strong> Maintain a written information security policy that addresses all PCI DSS requirements. Conduct an annual risk assessment. Maintain an incident response plan. Document your PCI DSS compliance activities and retain that documentation. Train all employees with access to cardholder data on security policies annually.</p>

<h3>SAQ Types — Which One Applies to You?</h3>

<p><strong>SAQ A</strong> applies to card-not-present merchants (e-commerce, mail/telephone order) that have fully outsourced all payment processing to PCI DSS compliant service providers. Your website redirects customers to a hosted payment page — you never touch the cardholder data. This is the simplest SAQ, with the fewest requirements, and is achievable by most e-commerce small businesses that use a hosted checkout service from Stripe, Square, or similar processors.</p>

<p><strong>SAQ B</strong> applies to merchants using only imprint machines or standalone dial-out terminals that are not connected to any other systems or the internet. This is increasingly uncommon as standalone terminals have been replaced by internet-connected systems.</p>

<p><strong>SAQ C</strong> applies to merchants using payment application systems connected to the internet, where the payment application is not the point of interaction for card data entry but does process cardholder data. Many small retail businesses using a tablet-based POS system connected to a cloud payment gateway fall into this category.</p>

<p><strong>SAQ D</strong> applies to all merchants not covered by another SAQ type, including merchants who store cardholder data electronically. This is the most comprehensive SAQ and carries the most requirements. If you store PANs — even temporarily — in any system you control, you likely need SAQ D. This is a situation to avoid, which is why the "store nothing you don't need" principle in Chapter 5 is so important.</p>

<p><strong>SAQ P2PE</strong> applies to merchants using validated point-to-point encryption (P2PE) solutions from their payment processor. When a hardware-based P2PE solution is used, the cardholder data is encrypted immediately at the point of entry and the merchant's systems never handle the card data in the clear. This dramatically reduces the scope of the cardholder data environment and allows the use of the simpler P2PE SAQ. For many Ohio small businesses, moving to a P2PE-validated terminal is the most practical path to simplified compliance.</p>
</article>`,
  },
  {
    chapter_number: 3,
    chapter_title: "Building a Secure Payment Environment",
    page_start: 31,
    page_end: 42,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Building a Secure Payment Environment</h2>

<p>The physical and technical environment in which you accept card payments is the foundation of your PCI DSS compliance. Choices you make about payment hardware, payment software, and payment processor relationships determine which SAQ applies to your business and how complex your ongoing compliance activities will be. Making good foundational choices dramatically simplifies everything that follows.</p>

<h3>Card-Present vs. Card-Not-Present</h3>

<p>Card-present transactions occur when the physical card — or a mobile wallet representation of it — is presented at a physical terminal. Card-not-present transactions occur when the card details are provided remotely — over the phone, by mail, or through an e-commerce website. These two categories carry different fraud rates, different liability rules, and different PCI DSS compliance implications. Card-present transactions processed through chip readers (EMV) have near-zero liability for counterfeit card fraud — the liability shifts to the card issuer. Card-not-present transactions carry merchant fraud liability even with strong authentication. Understanding your transaction mix helps you understand your fraud exposure and compliance scope.</p>

<h3>Point-to-Point Encryption Hardware</h3>

<p>Point-to-point encryption (P2PE) is a payment security technology that encrypts cardholder data at the exact moment of card swipe, dip, or tap — before the data ever reaches your POS system, network, or any device you control. The data travels through your network in encrypted form and is only decrypted inside the payment processor's secure environment. From a PCI DSS perspective, this is the gold standard for small merchants: because your systems never handle cardholder data in the clear, the scope of your cardholder data environment (and therefore your PCI compliance requirements) is dramatically reduced.</p>

<p>Hardware-based P2PE solutions validated by the PCI Security Standards Council include terminals from major manufacturers like Verifone, Ingenico, and Dejavoo when used with a processor that has implemented the full P2PE solution. Ask your payment processor specifically whether they offer a validated P2PE solution and which hardware it involves. "We encrypt your data" is not the same as a validated P2PE solution — the full solution must be validated by the PCI SSC to qualify for the P2PE SAQ reduction benefit.</p>

<h3>The Payment Terminal: Owned vs. Rental</h3>

<p>Small merchants choose between purchasing payment terminals outright or renting them from their payment processor. From a security standpoint, there are considerations on both sides. Processor-provided rental terminals are typically maintained and updated by the processor, ensuring current firmware without the merchant needing to manage updates. Purchased terminals give the merchant more control but require active firmware management. Either way, verify that the terminal is on the current PCI SSC list of validated payment hardware and that the firmware is current. Terminals running outdated firmware may have known vulnerabilities that criminals exploit.</p>

<h3>Why the EMV Chip Reader Is Table Stakes, Not a Finish Line</h3>

<p>The EMV chip reader — the slot where customers dip their chip card rather than swipe the magnetic stripe — was a significant security advance when widely deployed after 2015. EMV dramatically reduces counterfeit card fraud at the point of sale. However, EMV alone does not make a payment environment PCI compliant. EMV prevents criminals from using stolen card data to create a counterfeit physical card that works at a chip reader — but it does not prevent network-based attacks, software malware on the POS computer, or card-not-present fraud using stolen card numbers. Think of EMV as one necessary component of a secure payment environment, not the complete solution.</p>

<h3>Payment Processor Selection Criteria</h3>

<p>When selecting or evaluating your payment processor, PCI compliance considerations should be part of the analysis. Key questions: Is the processor a PCI DSS Level 1 service provider (the highest validation level, required for processors handling large transaction volumes)? Do they offer a validated P2PE solution? What SAQ type will you qualify for using their hardware and processing environment? What compliance support do they provide — do they help you understand your SAQ requirements, or do they leave you to figure it out alone? Do they provide quarterly vulnerability scanning as part of their service for merchants where scanning is required? What is their breach notification policy — how quickly will they notify you if there is a compromise on their end that affects your merchant data?</p>
</article>`,
  },
  {
    chapter_number: 4,
    chapter_title: "Network Security for Small Business Payment Systems",
    page_start: 43,
    page_end: 53,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Network Security for Small Business Payment Systems</h2>

<p>Network security is where many small business PCI compliance failures originate. The most common scenario: a business owner sets up a simple flat network where all devices — the POS terminal, the office computers, the employee smartphones on WiFi, and the customer WiFi — all share the same network. When any device on that network is compromised, every other device on the same network is potentially reachable. For a POS terminal that handles payment card data, this network architecture is a PCI DSS violation and a serious security risk.</p>

<h3>Cardholder Data Environment Segmentation</h3>

<p>PCI DSS requires that the Cardholder Data Environment (CDE) — the systems and networks that store, process, or transmit cardholder data — be segmented from other parts of the business network. Segmentation is not technically required by the PCI DSS standard (the standard applies to the entire network if no segmentation exists), but it dramatically reduces the scope of the CDE and therefore the scope of the compliance requirements. For a small business, segmentation typically means placing POS terminals and payment systems on a separate network segment (VLAN or separate physical network) that is isolated from general business computing and from guest WiFi.</p>

<p>A firewall with proper rules controls traffic between the CDE segment and other networks. The POS terminal needs to communicate with the payment processor's servers — that specific, limited connectivity should be allowed. Everything else — connections from the general office network, from the guest WiFi, from the internet to the POS directly — should be blocked. A qualified IT professional or managed service provider can implement this segmentation in a typical small business network in a few hours of work. The investment in that professional assistance is worthwhile both for compliance and for the security of the payment environment.</p>

<h3>Why the POS Machine Should Not Be on the Same Network as the Office WiFi</h3>

<p>Consider what happens in a typical small Ohio retail business without network segmentation. The POS computer runs Windows and processes card transactions. The office computers check email, browse the web, and download files. An employee clicks a phishing link in their email, and malware is installed on their computer. From that infected computer, the malware scans the local network and finds the POS computer. Because they are on the same network with no segmentation, the malware can attempt to access the POS computer directly. If it succeeds, it can install card-scraping software that captures card data as transactions are processed — a technique used in numerous retail breaches including the famous Target breach of 2013, which started exactly this way (via a compromised HVAC vendor with network access).</p>

<p>Segmentation does not eliminate every risk, but it eliminates this specific, common, and devastating attack path. A compromise of the general office network cannot easily propagate to a properly segmented POS environment.</p>

<h3>Firewall Basics for Non-Technical Owners</h3>

<p>A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on rules you define. Think of it as a security checkpoint between network segments or between your network and the internet. Modern small business firewalls — from vendors like Fortinet, Cisco Meraki, Ubiquiti, or pfSense — are manageable by a competent IT professional and some technically inclined business owners. The key configuration for PCI compliance: rules that explicitly permit only the specific traffic needed for the POS system to communicate with the payment processor, and rules that deny everything else to and from the CDE segment. Document your firewall rules — PCI DSS requires it, and the documentation helps you maintain the correct configuration when hardware is replaced or IT staff changes.</p>

<h3>The Guest WiFi for Customers Rule</h3>

<p>If your business provides WiFi for customers — a restaurant offering free WiFi, a retail shop with a guest network for shoppers — that guest network must be completely isolated from your business network and your POS systems. Not just on a different SSID (network name) — actually isolated so that traffic from the guest network cannot reach your business network. Most modern business-grade wireless access points support this configuration natively. A customer who connects to your guest WiFi and runs a network scan should see only the internet, not your POS terminal, your inventory system, or any other business resource.</p>
</article>`,
  },
  {
    chapter_number: 5,
    chapter_title: "Cardholder Data — Store Nothing You Don't Need",
    page_start: 54,
    page_end: 63,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Cardholder Data — Store Nothing You Don't Need</h2>

<p>The simplest and most effective PCI DSS compliance strategy for small businesses is to minimize the cardholder data that touches your systems and eliminate storage of that data wherever possible. You cannot suffer a breach of cardholder data you do not have. Every reduction in the scope of cardholder data in your environment reduces your compliance burden and your breach risk simultaneously.</p>

<h3>The "Never Store PANs" Rule</h3>

<p>The Primary Account Number — the 16-digit number embossed on the card — is the crown jewel of cardholder data. PCI DSS prohibits storing PANs after transaction authorization unless you have a documented business justification and have implemented specific protection measures. For most small businesses, there is no legitimate business reason to store PANs at all. Modern payment processing is designed so that your systems receive a token — a randomly generated surrogate value that represents the card without being usable for transactions — rather than the actual PAN. If your payment system is designed so that PANs never land in your database or on your servers, you have eliminated the most dangerous element of cardholder data risk.</p>

<h3>What Can and Cannot Be Stored</h3>

<p>PCI DSS distinguishes between different elements of cardholder data with different storage rules. The cardholder name, service code, and expiration date may be stored under certain conditions with appropriate protections. The full magnetic stripe data (track data), CVV2/CVC2 security code (the three or four digit code on the back of the card), and PIN block data must never be stored after authorization under any circumstances — not in your database, not in log files, not in temporary files on your POS system, not anywhere. The card brands enforce this prohibition strictly, and post-breach forensic investigations routinely find prohibited data stored in unexpected places — application log files, debugging caches, and error logs that developers set up for troubleshooting and never cleaned up.</p>

<h3>Tokenization Explained Simply</h3>

<p>Tokenization replaces a sensitive data element — in this context, a payment card PAN — with a non-sensitive surrogate value called a token. The token looks like a card number (it may have the same format and length) but carries no exploitable value on its own. The mapping between the token and the actual PAN is maintained by the tokenization service — typically your payment processor — in a secure token vault that operates under its own PCI compliance program. When you charge a returning customer using a stored token, your system sends the token to the processor, the processor looks up the associated PAN in the vault, and processes the transaction. Your system never handled the PAN.</p>

<p>For Ohio small businesses that store payment information for recurring billing — subscription services, regular customers who prefer to pay without re-entering card details, automatic payment plans — tokenization is the correct approach. Do not store card numbers yourself. Work with a payment processor that provides a tokenization service, integrate with that service, and store only the tokens. This configuration dramatically reduces your PCI compliance scope and your breach risk.</p>

<h3>Receipt Truncation Requirements</h3>

<p>Paper receipts must display no more than the last four digits of the PAN. The expiration date must not appear on the receipt at all. This requirement applies to both the customer copy and the merchant copy of receipts. If your receipt printer is configured to print the full PAN or expiration date, that is a PCI violation that must be corrected immediately. Most modern POS systems and payment applications handle truncation automatically, but verify the configuration — especially if you are using older or legacy receipt printing software.</p>

<h3>Paper Records and Secure Disposal</h3>

<p>Any paper documents containing cardholder data — old receipt copies, handwritten card numbers, fax orders — must be stored in locked containers when not in use and destroyed securely when no longer needed. "Secure disposal" means cross-cut shredding — a straight-cut shredder that produces strips is insufficient because strips can be reassembled. Do not put receipts, card authorization forms, or any paper with card numbers in a standard trash or recycling bin. Consider a shredding service for high-volume paper destruction. The shredding vendor should provide a certificate of destruction.</p>

<h3>The Filing Cabinet and the Shredder</h3>

<p>A practical physical security principle: think of cardholder data on paper the same way you think of cash. You would not leave cash sitting on an open desk or throw it in an unlocked trash can. Paper containing card numbers deserves the same physical protection. Lock it when not in active use. Shred it when retention is no longer required. Never allow paper with card data to sit in a recycling bin, a communal trash bin, or any location accessible to cleaning staff, customers, or unauthorized employees.</p>
</article>`,
  },
  {
    chapter_number: 6,
    chapter_title: "Vulnerability Management — Patches, Scans, and Antivirus",
    page_start: 64,
    page_end: 74,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Vulnerability Management — Patches, Scans, and Antivirus</h2>

<p>Vulnerability management is the ongoing practice of identifying, evaluating, and addressing security weaknesses in your systems before criminals exploit them. For small businesses operating payment systems, this means keeping software updated, running required vulnerability scans, and maintaining active antivirus protection. These are not aspirational security goals — they are PCI DSS requirements with specific timelines and procedures.</p>

<h3>Keeping POS Software Updated</h3>

<p>Your point-of-sale software, payment application software, and the operating system running beneath them all require regular security updates. Software vendors release patches when they discover security vulnerabilities in their products. The window between when a vulnerability becomes publicly known and when criminals begin actively exploiting it has compressed dramatically in recent years — sometimes to hours. A POS system running unpatched software is a known, documented target waiting to be exploited.</p>

<p>PCI DSS requires that all system components are protected from known vulnerabilities by installing applicable security patches. Critical patches — those addressing high or critical severity vulnerabilities — must be installed within one month of release. Other patches should be installed within three months. For many small businesses, enabling automatic updates on the POS computer's operating system is the most practical approach to meeting this requirement, though automatic updates on a POS system should be tested to verify they do not disrupt payment processing functionality before being deployed in production.</p>

<h3>Quarterly Vulnerability Scans for Level 2 and 3</h3>

<p>Level 2 and Level 3 merchants, and Level 4 merchants whose SAQ type requires it, must conduct quarterly external vulnerability scans using an Approved Scanning Vendor (ASV) — a company approved by the PCI Security Standards Council to conduct external network scans. The scan tests your internet-facing systems for known vulnerabilities that could be exploited by an external attacker. The scan report must show a passing result (no high-severity vulnerabilities) before you can submit an attestation of compliance to your acquiring bank.</p>

<p>ASV scans are automated and typically cost $100 to $300 per quarter for small merchants. Many payment processors and acquiring banks provide ASV scan services as part of their compliance program or at a discounted rate. If your acquiring bank requires quarterly scans, they will typically have a process for ordering them through their compliance portal. Complete the scans, address any findings (your ASV can help interpret them), rescan to verify remediation, and retain the passing scan reports for your compliance documentation.</p>

<h3>Antivirus for Windows POS Systems</h3>

<p>PCI DSS Requirement 5 mandates that antivirus software be deployed on systems commonly affected by malware. Windows-based POS systems are in scope. The antivirus must be actively running, set to generate audit logs, kept current with the latest malware signatures, and configured to perform periodic scans. Windows Defender, included with Windows 10 and 11, is a legitimate and effective antivirus solution for POS systems — there is no PCI requirement to use a third-party product if the built-in solution meets the functional requirements. Ensure Windows Defender is enabled, that real-time protection is active, and that automatic definition updates are configured.</p>

<h3>The Windows 7 POS Legacy Problem</h3>

<p>Windows 7 reached end-of-life in January 2020, meaning Microsoft no longer releases security patches for it. Many small businesses — particularly in the restaurant industry — are still running Windows 7 on POS computers because replacing POS software and hardware is expensive and operationally disruptive. Running Windows 7 on a payment processing system is a PCI DSS violation and an active security risk. Known Windows 7 vulnerabilities that have never been patched are exploited by current malware. If your POS system runs Windows 7, replacing it with a current, supported operating system is not optional — it is a necessary investment in both compliance and security.</p>

<h3>Who Runs Your Scans and What They Look For</h3>

<p>External ASV scans test the network addresses (IP addresses) that your business exposes to the internet — your firewall's external interface, your web server if you have one, and any other internet-facing services. The ASV scanner probes these addresses for known vulnerabilities: open ports that should be closed, outdated software with known vulnerabilities, misconfigured services, and weak encryption settings. When the scan identifies findings, the report classifies them by severity. High and medium severity findings must be remediated before the scan is considered passing. Low severity findings must be addressed in your risk management program. Retain all scan reports — passing and failing — as compliance documentation for at least 12 months.</p>
</article>`,
  },
  {
    chapter_number: 7,
    chapter_title: "Access Control — Who Can See Payment Data?",
    page_start: 75,
    page_end: 84,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Access Control — Who Can See Payment Data?</h2>

<p>Access control — the practice of limiting access to systems and data to only those people who need it to do their jobs — is both a PCI DSS requirement and a fundamental risk management principle. Every person who has access to payment systems or cardholder data is a potential point of compromise, whether through malicious intent, negligence, or credential theft. Minimizing that access surface minimizes your exposure.</p>

<h3>The Principle of Least Privilege</h3>

<p>The principle of least privilege states that each user account should have only the permissions necessary to perform its designated functions, and no more. A cashier needs to be able to process transactions on the POS system — they do not need administrative access to the POS software, access to historical transaction reports, or the ability to modify system configurations. A manager who reviews daily sales reports needs read access to reporting functions — they do not need the ability to process refunds or modify customer payment records unless those are specific job functions. Implement this principle through role-based access controls in your POS software, configuring a specific role for each category of user with precisely the permissions that role requires.</p>

<h3>Unique User IDs for All Employees</h3>

<p>PCI DSS Requirement 8 mandates that every individual who accesses system components in the cardholder data environment has a unique user ID — their own login credentials, not shared with anyone else. Shared logins are a compliance violation and a security failure: if two employees share a login and a fraud event occurs under that login, there is no way to determine which employee was responsible. Accountability requires individual identifiability. Configure individual accounts in your POS system for each employee, even if configuring those accounts is operationally inconvenient. If your POS software does not support individual user accounts, that is a meaningful compliance and security limitation that should factor into your next software selection decision.</p>

<h3>Shared Login Risk</h3>

<p>Shared logins create cascading risk beyond just accountability loss. When a shared login credential is compromised — whether through phishing, shoulder surfing, or a disgruntled employee sharing it externally — every function that credential provides access to is now available to the threat actor. With individual accounts, a compromised credential provides access only to what that specific employee could do. With a shared administrative account, a compromised credential provides full administrative access. The operational convenience of shared logins is not worth this risk exposure.</p>

<h3>What Happens When an Employee Leaves</h3>

<p>When an employee departs — for any reason — their access to all systems in the cardholder data environment must be revoked immediately. On their last day, before they leave the premises. Not "sometime this week" and not "when we get around to updating the system." An employee who retains active POS system credentials after leaving employment is a security liability regardless of whether their departure was amicable. Create a termination checklist that includes POS system access revocation as a required step, and assign a specific person responsible for completing that step for every employee departure.</p>

<h3>Physical Access Controls for POS Terminals</h3>

<p>Physical security of payment terminals is as important as logical security. POS terminals must be physically secured — either anchored to a fixed location, stored in a locked area when not in use, or monitored by camera. Train employees to inspect terminals regularly for signs of tampering: unexpected cables, loose components, overlay keypads placed over the real keypad, or anything that was not there yesterday. Criminals who install physical card skimmers on payment terminals depend on the compromise going unnoticed for as long as possible. Regular visual inspection — a two-minute check at the start of each shift — is an effective countermeasure that costs nothing.</p>
</article>`,
  },
  {
    chapter_number: 8,
    chapter_title: "Monitoring and Testing — How You Know If Something Went Wrong",
    page_start: 85,
    page_end: 95,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Monitoring and Testing — How You Know If Something Went Wrong</h2>

<p>Detection is the capability that most small businesses neglect. A business can have excellent preventive controls — strong firewalls, encrypted card data, trained employees — and still be compromised. The question is not whether a determined criminal can eventually find a way in, but whether your business will detect the intrusion quickly and contain the damage before it becomes catastrophic. Monitoring and testing are the mechanisms that enable detection.</p>

<h3>Logging Requirements</h3>

<p>PCI DSS Requirement 10 mandates that all access to system components is logged, that logs are reviewed regularly, and that logs are retained for at least 12 months with at least three months immediately available for analysis. For a small merchant, the relevant logs include: POS system access logs showing who logged in and when, transaction logs showing all payment processing activity, network device logs showing traffic to and from the CDE, and authentication logs showing successful and failed login attempts. Most of these logs are generated automatically by the systems involved — the compliance requirement is to ensure logging is enabled, that the logs are retained appropriately, and that someone reviews them with sufficient regularity to catch anomalies.</p>

<h3>What to Log</h3>

<p>Each log entry should capture at minimum: user identification, type of event, date and time, success or failure indication, the origin of the event (device or network address), and identity or name of affected data, system component, or resource. In practice, your POS software and operating system generate log entries in defined formats — your job is to ensure logging is enabled, log files are preserved for the required duration, and logs are stored in a location that cannot be modified by the systems generating them (to prevent a criminal from covering their tracks by deleting log entries).</p>

<h3>Who Reviews Logs</h3>

<p>Log review must be performed at least daily for security events relevant to the CDE, according to PCI DSS 4.0. For small merchants, this does not necessarily mean a human reading thousands of log lines every morning — it means having a process, ideally automated, that flags anomalous events for human review. Many payment processors and POS software vendors provide monitoring dashboards that surface unusual transaction patterns — transactions at unusual hours, an unusually high number of declined transactions, or transaction amounts that fall outside normal patterns. These dashboards are a practical monitoring tool accessible to non-technical business owners.</p>

<h3>Penetration Testing for Relevant Merchant Levels</h3>

<p>Annual penetration testing — where a qualified security professional attempts to breach your systems using the same techniques a real criminal would use — is required for Level 1 and Level 2 merchants. For Level 4 merchants, penetration testing is not specifically required by the card brands (though your acquiring bank may require it), but it is a valuable security exercise for businesses with more complex payment environments. If you process a significant volume of card-not-present transactions, operate your own e-commerce payment integration, or have a complex network environment, a periodic penetration test performed by a qualified provider can identify vulnerabilities that automated scans do not catch.</p>

<h3>The Annual Security Review</h3>

<p>Once per year, conduct a structured review of your PCI compliance status. Review all components of your compliance program: Is your SAQ current and accurately completed? Are your vulnerability scans passing? Are your policies current and still accurately reflective of your operations? Has any aspect of your payment processing environment changed — new terminals, new software, new processor, new locations — that affects your CDE scope or your SAQ type? Has your transaction volume crossed a threshold that changes your merchant level? Document the review and its conclusions. This annual review is both a PCI requirement and a practical business risk management activity that ensures your compliance program keeps pace with your business as it evolves.</p>
</article>`,
  },
  {
    chapter_number: 9,
    chapter_title: "Your PCI Compliance Roadmap for Ohio Small Businesses",
    page_start: 96,
    page_end: 115,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Your PCI Compliance Roadmap for Ohio Small Businesses</h2>

<p>This chapter brings together everything covered in the previous chapters into a practical, sequential compliance roadmap designed for Ohio small business owners who need to get their payment security program established or updated. The steps are ordered to build on each other — completing them in sequence produces the most efficient path to compliance.</p>

<h3>Step 1: Assess Your Current State</h3>

<p>Before you can know what to fix, you need to understand where you are. Conduct a self-assessment of your current payment environment by answering these questions: What payment hardware do I use, and is it on the current PCI SSC validated hardware list? What payment software do I use, and is it a validated payment application? What operating system runs on my POS computer, and is it currently supported (i.e., still receiving security patches)? Do I store any cardholder data — PANs, track data, CVV codes — anywhere in my systems? Is my payment network segmented from my general business network? Do I have a firewall between my POS systems and the internet? Do all employees who access payment systems have individual login credentials? Is MFA enabled for any remote access to systems in the cardholder data environment?</p>

<p>Document your answers honestly. The gaps between your current state and the standards described in this guide are your remediation priorities. Most small Ohio businesses will find a handful of significant gaps — typically around network segmentation, patch management, and access control — and a larger number of documentation gaps (written policies, evidence of training, log retention). Both categories require attention, but prioritize the technical gaps first as they carry the highest breach risk.</p>

<h3>Step 2: Choose Your SAQ</h3>

<p>Using the SAQ type descriptions from Chapter 2, determine which SAQ type applies to your payment processing environment. When in doubt, contact your acquiring bank's merchant services team — they can typically advise on the correct SAQ type based on your processing environment. Choosing the wrong SAQ type — particularly using a simpler SAQ when a more comprehensive one applies — is a compliance violation even if you fully complete the SAQ you chose. Get this determination right before investing time in completing the questionnaire.</p>

<h3>Step 3: Complete the Self-Assessment Questionnaire</h3>

<p>Download the current version of the applicable SAQ from the PCI Security Standards Council website at pcisecuritystandards.org. The SAQ is a structured questionnaire where you attest "yes" or "not applicable" to each requirement. Where you cannot honestly attest "yes" — because the control is not in place, is only partially implemented, or you are not certain whether it is implemented — that is a gap requiring remediation before you submit the completed SAQ.</p>

<p>Complete the SAQ honestly. The SAQ is not a pass/fail compliance test — it is a self-assessment that helps you identify what is working and what is not. A completed SAQ with identified gaps and a remediation plan is more defensible than a completed SAQ where gaps were attested as "yes" and are later discovered by a forensic investigator. Post-breach forensic findings of false SAQ attestations significantly increase liability and can result in card brand fines above what the breach alone would have generated.</p>

<h3>Step 4: Remediate Gaps</h3>

<p>Address the gaps identified in your assessment and SAQ completion in priority order. Technical gaps — unsegmented network, unpatched software, missing MFA, outdated hardware — carry the highest breach risk and should be addressed first. Documentation gaps — missing written policies, undocumented procedures, absent training records — should be addressed in parallel where possible. For technical remediation that exceeds your in-house capability, engage a qualified IT professional or managed service provider with PCI DSS experience. In Ohio, the Ohio Small Business Development Center (SBDC) network has centers across the state that can connect small businesses with cybersecurity resources and, in some cases, provide subsidized security assessments.</p>

<h3>Step 5: Submit Attestation to Your Bank</h3>

<p>Once you have completed the SAQ and addressed any identified gaps, submit the Attestation of Compliance (AOC) to your acquiring bank or payment processor through their compliance portal. The AOC is a summary document that attests to your compliance status. Your acquiring bank may also require you to submit passing ASV scan reports if your SAQ type requires quarterly external scanning. Retain copies of your completed SAQ, AOC, and scan reports for at least 12 months. Your next annual compliance cycle begins one year from your submission date.</p>

<h3>Ohio Resources: SBDC Cybersecurity Assistance</h3>

<p>Ohio small businesses have access to several resources that can assist with payment security compliance at low or no cost. The Ohio Small Business Development Center network operates centers in Dayton, Columbus, Cleveland, Cincinnati, Toledo, and dozens of other locations across the state. SBDC advisors provide free or low-cost business counseling and can connect businesses with cybersecurity resources through the Ohio Cyber Reserve and other state programs. The Ohio Attorney General's Consumer Protection section publishes small business data security resources at ohioattorneygeneral.gov. The Ohio Chamber of Commerce's small business resources occasionally include cybersecurity programming for member businesses.</p>

<p>The U.S. Small Business Administration's cybersecurity resources at sba.gov/cybersecurity provide federal-level guidance, including PCI DSS-specific resources and connections to Small Business Development Center cybersecurity consultants in your region.</p>

<h3>Maintaining Compliance Over Time</h3>

<p>PCI compliance is an annual cycle, not a one-time project. Once you have established your compliance program, maintain it through these ongoing activities: annual SAQ completion and AOC submission to your acquiring bank; quarterly ASV external vulnerability scans if required by your SAQ type; annual employee security training with documentation; ongoing patch management for all systems in the cardholder data environment; regular log review per the frequency specified in your SAQ; and immediate compliance review whenever your payment processing environment changes — new hardware, new software, new processor, new physical locations, or any change that might affect the scope of your cardholder data environment.</p>

<p>Ohio small businesses that treat PCI compliance as an operational discipline — not an annual checkbox exercise — find that the ongoing effort required after the initial setup is modest. The policies, procedures, and technical controls established in the first compliance cycle create a foundation that subsequent annual reviews simply maintain and update. The businesses that struggle are those that neglect the program between annual submissions and then scramble to reconstruct documentation and address accumulated gaps each year. Build the compliance habit into your operational calendar, and payment security becomes a manageable part of running a responsible Ohio business.</p>
</article>`,
  },
];
