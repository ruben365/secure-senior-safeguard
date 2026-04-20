import type { BookChapter } from "@/config/bookCatalog";

/**
 * Remote Work Security Handbook
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 10 chapters (0–9), ~120 pages, Ohio small business focus
 */
export const REMOTE_WORK_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Remote Work Security Handbook</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">Protecting Your Business When Your Team Works From Anywhere</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio &middot; 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright &copy; 2026 InVision Network. All rights reserved.</p><p>InVision Network Press &middot; Kettering, Ohio 45440</p><p><em>For educational purposes only.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — The Expanded Attack Surface of Remote Work",
    page_start: 4,
    page_end: 17,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — The Expanded Attack Surface of Remote Work</h2>

<p>Not long ago, cybersecurity for a small business was mostly a matter of securing one place: the office. You had a router, maybe a server in a back room, a handful of computers on a local network, and perhaps a firewall that your IT person or managed service provider configured and largely forgot about. The perimeter was physical. The walls of your building were, in a very real sense, part of your security architecture. You locked the doors at night. You hired employees you trusted. You kept the server room locked. That was most of it.</p>

<p>Remote work ended that model permanently. Not temporarily, not for the duration of a crisis — permanently. Even businesses that call themselves "back to normal" typically have employees checking email from home, accessing cloud systems from coffee shops, connecting to company resources over home Wi-Fi networks, and joining video calls from spare bedrooms. The office perimeter is gone. What replaced it is a sprawling, distributed, largely uncontrolled environment that spans every home, every mobile device, and every public network your employees touch.</p>

<p>For Ohio small businesses with one to ten remote employees, this shift created a security problem that most owners have not fully reckoned with. The tools and habits that worked in a centralized office — shared antivirus, the IT person who walked the floor, the network that your MSP monitored — do not automatically extend to a workforce spread across Franklin County, Hamilton County, Montgomery County, and beyond. Each remote worker is now, in effect, a remote office. And most of those remote offices were never designed with security in mind.</p>

<h3>The Statistics That Should Concern You</h3>

<p>The numbers are stark. According to research from IBM's Security Division and the Ponemon Institute, approximately 60% of data breaches now involve remote access vectors of some kind. That means the majority of successful attacks are not coming through your office firewall — they are coming through the remote connections your employees use to do their jobs. Home routers. Personal laptops used for work. VPN connections that were set up quickly and never audited. Cloud applications accessed without multi-factor authentication.</p>

<p>The average cost of a data breach for a small business in the United States now exceeds $120,000 when you account for incident response, notification costs, regulatory exposure, lost productivity, and reputational damage. For a fifteen-person manufacturing company in Dayton or a ten-person law firm in Columbus, that figure can be existential. The Small Business Administration reports that 60% of small businesses that experience a significant cyberattack close within six months.</p>

<p>Remote work did not create cybercrime, but it dramatically expanded the attack surface available to criminals. More endpoints, more networks, more cloud services, more human decision points — each one a potential vulnerability.</p>

<h3>Three Categories of Remote Work Risk</h3>

<p>To understand remote work security, it helps to think about risk in three distinct categories. Every threat your remote employees face falls into one of these buckets, and every control measure in this book addresses one or more of them.</p>

<p>The first category is <strong>network risk</strong>. This is the risk that comes from the networks your employees use to connect to company systems. Home Wi-Fi networks are almost never configured to business standards. Public networks in coffee shops, airports, and hotels are almost never secure at all. When an employee connects their work laptop to an unsecured home network that also has a smart TV, three phones, a gaming console, and a doorbell camera on it, every one of those devices represents a potential path for an attacker to reach company data. Network risk is where we focus in the early chapters of this book.</p>

<p>The second category is <strong>device risk</strong>. This is the risk that comes from the computers, phones, and tablets your employees use. A work laptop that is not encrypted, not patched, and not protected by endpoint security is vulnerable in ways that are hard to overstate. A personal phone used to access company email — with no mobile device management, no screen lock policy, and dozens of unvetted apps installed — is essentially an open door to company systems. Device risk includes both company-owned devices that are not properly managed and personal devices that employees use for work purposes.</p>

<p>The third category is <strong>human risk</strong>. This is the most important and the hardest to fix with technology alone. Remote workers are more isolated, more likely to make quick decisions without checking with colleagues, more susceptible to phishing attacks that exploit the ambiguity of remote communication, and less likely to have someone look over their shoulder when they are about to do something risky. The phishing email, the fake video call link, the fraudulent wire transfer request — these attacks work because they exploit human judgment under conditions of uncertainty, and remote work creates exactly those conditions.</p>

<h3>Why Ohio Small Businesses Are Particularly Exposed</h3>

<p>Ohio's small business ecosystem spans manufacturing, healthcare, professional services, agriculture, and retail. Many of these businesses made the shift to remote work quickly, without a security plan, and have not revisited their security posture since. The Ohio Small Business Development Center network regularly encounters businesses that adopted cloud tools rapidly, set up VPN access reactively, and now have no clear picture of who has access to what.</p>

<p>This book is designed to fix that. Working through it will give you a clear framework for understanding your remote work attack surface, actionable steps to reduce your exposure in each risk category, and the vocabulary to have productive conversations with your IT provider, your insurance broker, and your employees. You do not need to become a cybersecurity expert. You need to become an informed decision-maker — someone who knows what questions to ask, what controls to require, and what risks are acceptable.</p>

<p>Each chapter that follows addresses one piece of the remote work security puzzle. You can read this book straight through or jump to the chapters most relevant to your situation. The chapters on home network security, VPN, and endpoint security are the foundation — read those first if you read nothing else. The later chapters on policy, physical security, and Ohio-specific context will help you build a sustainable security program rather than just patching the most obvious holes.</p>

<p>Remote work is not going away. The attack surface it created is not shrinking. But the risks are manageable, the controls are not prohibitively expensive, and businesses just like yours have successfully secured remote workforces without turning their IT budget inside out. That is what this book will show you how to do.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "Home Network Security — The First Line of Defense",
    page_start: 18,
    page_end: 31,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: Home Network Security — The First Line of Defense</h2>

<p>When your employee sits down at their home desk and opens their work laptop, the first piece of infrastructure their connection travels through is their home router. That router is now, functionally, a piece of your business's network infrastructure. It sits between your employee's work computer and the internet. It handles every packet of data that flows between your company systems and that remote worker's location. And in the overwhelming majority of cases, it has never been configured with security in mind.</p>

<p>Home routers are purchased for convenience, not security. They ship with default passwords that are published on the internet. They run firmware that may not have been updated in years. They sit on networks shared with smart TVs, children's tablets, IoT devices with known vulnerabilities, and guests who connect without any vetting. Treating the home router as a trusted piece of business infrastructure — which is what remote work implicitly does — is one of the most common and consequential security mistakes Ohio small businesses make.</p>

<h3>Why the Home Router Is Now a Business Asset</h3>

<p>A router that your employee installed three years ago for $80 from a big box store is filtering, routing, and in some cases storing metadata about every connection your company data makes. If that router is compromised — and compromising a poorly configured home router is not technically difficult — an attacker has a persistent position on the same network as your employee's work computer. They can intercept traffic, launch attacks against the work device, and in some cases access resources that the work computer connects to remotely.</p>

<p>This is not a theoretical risk. Router-based attacks are a consistent feature of threat intelligence reports, and home routers are disproportionately targeted because they are so reliably under-maintained. Requiring employees to treat their home routers as business assets — with specific configuration standards — is one of the highest-value security investments a remote-first small business can make.</p>

<h3>Firmware Updates</h3>

<p>Router firmware is the software that runs on the router itself. Manufacturers release firmware updates to patch security vulnerabilities, and many of the most serious router compromises in recent years have exploited vulnerabilities for which patches existed but were never applied. Most home users have never updated their router's firmware. Many do not know it is possible.</p>

<p>Require employees to log into their router's administration interface and check for firmware updates. Many modern routers from brands like ASUS, Netgear, and TP-Link have automatic update settings — require that these be enabled. If an employee has a router that is more than five years old and no longer receives firmware updates from the manufacturer, it should be considered a security liability and replaced.</p>

<h3>Default Passwords and Admin Access</h3>

<p>Every router ships with a default administrator password. These passwords are published in user manuals, on manufacturer websites, and in databases that attackers actively use. Any router still using its default admin password is accessible to anyone on the local network — and sometimes to anyone on the internet — who knows the default. Require employees to change their router's admin password to a strong, unique password stored in a password manager.</p>

<h3>WPA3 vs. WPA2</h3>

<p>Wi-Fi Protected Access (WPA) is the encryption protocol that protects wireless traffic on your home network. WPA2, the previous standard, has known vulnerabilities — most notably the KRACK attack, which allows attackers in range of your network to decrypt traffic. WPA3, the current standard, addresses these vulnerabilities with stronger encryption and better protection against brute-force attacks. Require employees to configure their Wi-Fi networks to use WPA3 if their router supports it, or WPA2-AES as a minimum if WPA3 is not available. WPA2-TKIP and WEP should never be used.</p>

<h3>Network Segmentation — Separating Work from Everything Else</h3>

<p>One of the most effective home network security controls is network segmentation: creating separate Wi-Fi networks for work devices versus personal devices and IoT devices. Most modern routers support a "guest network" feature that creates an isolated network segment. Configure the work laptop to connect to a dedicated network, and put the smart TV, gaming console, phones, and other personal devices on a separate network. This limits the blast radius if any personal or IoT device is compromised — it cannot reach the work device across a different network segment.</p>

<h3>The Home Network Security Audit Checklist</h3>

<ul>
  <li>Router firmware is current and automatic updates are enabled</li>
  <li>Default admin password has been changed to a strong, unique password</li>
  <li>Wi-Fi uses WPA3 or WPA2-AES encryption</li>
  <li>Wi-Fi password is strong and not shared broadly</li>
  <li>Work device is on a separate network segment from personal and IoT devices</li>
  <li>Remote management is disabled (this is an admin setting that should be turned off)</li>
  <li>UPnP is disabled (a setting that can expose the network to attack)</li>
  <li>Router is less than five years old and still receiving manufacturer updates</li>
</ul>

<p>Providing employees with this checklist and giving them thirty minutes to complete it costs almost nothing. The security value it delivers is substantial. Consider making completion of this checklist a condition of remote work authorization, and revisit it annually.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "VPN — Why You Need One and How to Choose It",
    page_start: 32,
    page_end: 44,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: VPN — Why You Need One and How to Choose It</h2>

<p>A Virtual Private Network — VPN — is one of the most commonly recommended remote work security tools, and one of the most commonly misunderstood. Many business owners have heard they need a VPN and have even purchased one, without fully understanding what it does, what it does not do, or whether they have the right kind for their situation. This chapter clears up the confusion.</p>

<h3>What a VPN Does — and Does Not Do</h3>

<p>A VPN creates an encrypted tunnel between your employee's device and a VPN server. All internet traffic from the employee's device is routed through that tunnel, encrypted in transit, and decrypted at the VPN server before continuing to its destination. This accomplishes two things: it hides the content of the traffic from anyone who might intercept it on the local network (like a coffee shop Wi-Fi operator, or an attacker on the same network), and it masks the employee's real IP address from the sites and services they connect to.</p>

<p>What a VPN does not do: it does not make the device secure. A malware-infected laptop behind a VPN is still a malware-infected laptop. It does not protect against phishing — clicking a malicious link is equally dangerous with or without a VPN. It does not encrypt traffic end-to-end to the final destination — if the destination site does not use HTTPS, the VPN server can see the unencrypted traffic. And it does not prevent data loss if an attacker already has credentials to your cloud systems.</p>

<p>A VPN is a network-layer protection tool. It protects the connection, not the endpoint, and not the user's judgment.</p>

<h3>Business VPN vs. Consumer VPN</h3>

<p>Consumer VPN services like NordVPN, ExpressVPN, and Surfshark are designed for individuals who want to protect their personal browsing and bypass geographic content restrictions. They route traffic through the VPN provider's servers and are priced for individual consumers. They are not appropriate for business use in most cases: they do not provide centralized management, they do not allow you to control which resources employees can access, and they route all company traffic through a third party's infrastructure.</p>

<p>Business VPN solutions are designed for organizational use. They typically include centralized management consoles, per-user access controls, logging, and integration with identity providers. For Ohio small businesses with remote employees, business VPN is the appropriate category. You need to be able to see who is connecting, control what they can access, and revoke access when someone leaves the company.</p>

<h3>VPN Options for Small Businesses</h3>

<p>Three platforms consistently appear at the top of small business VPN evaluations:</p>

<p><strong>NordLayer</strong> (formerly NordVPN Teams) is designed specifically for small and medium businesses. It offers a straightforward management console, per-user licensing, and integration with common identity providers. Pricing is accessible for businesses with five to twenty-five users, and setup does not require dedicated IT infrastructure.</p>

<p><strong>Perimeter 81</strong> (now merged into Check Point Harmony SASE) offers a zero-trust network access model in addition to traditional VPN. For businesses that use multiple cloud services, it provides more granular access controls than a traditional VPN.</p>

<p><strong>Cisco Meraki</strong> is the enterprise-grade option that many Ohio managed service providers deploy. It is more expensive and more complex to configure than the other options, but it integrates tightly with Cisco's broader security ecosystem and is a good fit for businesses that already have a Meraki network infrastructure or a full-service MSP relationship.</p>

<h3>Always-On VPN Policy</h3>

<p>One of the most important VPN policy decisions you will make is whether the VPN should be always on or on-demand. An always-on VPN means the VPN connects automatically when the device is online and cannot be disabled by the user without administrator credentials. This eliminates the risk of an employee forgetting to connect the VPN or choosing not to because it slows their connection. For businesses handling sensitive data — healthcare information, legal documents, financial records — always-on VPN is the appropriate policy.</p>

<h3>Split Tunneling Risks</h3>

<p>Split tunneling is a VPN configuration that routes some traffic through the VPN and other traffic directly to the internet. It is often used to improve performance — video streaming goes directly to Netflix, while company application traffic goes through the VPN. The risk is that the traffic going outside the VPN is unprotected and unmonitored. For most small businesses handling sensitive data, split tunneling should be disabled.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Endpoint Security for Remote Workers",
    page_start: 45,
    page_end: 55,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Endpoint Security for Remote Workers</h2>

<p>Every device your employees use to access company systems — laptops, desktops, phones, tablets — is an endpoint. In a traditional office, endpoints were managed centrally and audited regularly. In a remote work environment, they are scattered across Ohio and beyond, often in homes where IT support is unavailable. Endpoint security is the discipline of ensuring that each of these devices meets a minimum security standard, regardless of where it is located.</p>

<h3>Disk Encryption</h3>

<p>Disk encryption protects the data on a device if the device is lost or stolen. Without encryption, anyone who finds or steals a laptop can remove the hard drive, connect it to another computer, and read all of its contents — company documents, cached credentials, email archives, customer data — without needing the device's login password. With encryption, the drive is unreadable without the encryption key, which is typically derived from the user's login credentials.</p>

<p>Windows includes BitLocker for full-disk encryption. Mac includes FileVault. Both should be enabled on every company-owned device. Verify that the recovery key is stored securely — either in your organization's IT management system or in a secure password manager — so that data can be recovered if a device is lost but you need its contents.</p>

<h3>Antivirus and EDR</h3>

<p>Traditional antivirus software works by comparing files against a database of known malicious signatures. It is better than nothing, but it misses novel threats. Endpoint Detection and Response (EDR) software takes a behavioral approach — it monitors what programs are doing, not just what they look like, and can detect malicious behavior even from previously unknown malware. For business endpoints, EDR is the current standard. Microsoft Defender for Business, CrowdStrike Falcon Go, and Malwarebytes Endpoint Protection are accessible options for small businesses.</p>

<h3>Auto-Lock and Screen Lock Policies</h3>

<p>A device that is left unattended and unlocked is an open door. Require all company devices to lock automatically after five minutes of inactivity. Screen lock should require a strong password or biometric authentication. This is a basic control that prevents physical access attacks — the employee who steps away from their desk at a coffee shop or coworking space and leaves their laptop open.</p>

<h3>Patch Management for Remote Devices</h3>

<p>Security patches address known vulnerabilities in operating systems and applications. In an office environment, patches can be pushed automatically by IT staff. With remote devices, you need a system that ensures patches are applied even when devices are not on the corporate network. Windows Update for Business, Microsoft Intune, and Jamf (for Mac) all support remote patch management. Require that operating systems and critical applications — particularly browsers and Office suites — be updated within two weeks of a security patch release.</p>

<h3>MDM for Remote Device Management</h3>

<p>Mobile Device Management (MDM) or Unified Endpoint Management (UEM) software allows you to enforce security policies on remote devices, remotely wipe lost devices, and maintain an inventory of all endpoints accessing company systems. Microsoft Intune is included with many Microsoft 365 Business plans and is the most accessible option for Ohio small businesses already in the Microsoft ecosystem. Jamf serves Mac-heavy environments. Without some form of MDM, you have no reliable way to enforce endpoint policies or respond to a lost or compromised device.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "BYOD Policies That Actually Work",
    page_start: 56,
    page_end: 66,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: BYOD Policies That Actually Work</h2>

<p>Bring Your Own Device — BYOD — is the practice of allowing employees to use their personal phones, laptops, or tablets for work purposes. It is enormously common in small businesses, where providing company-owned devices to every employee is not economically practical. It is also one of the most complex security challenges in the remote work environment, because it puts company data on hardware the company does not own and cannot fully control.</p>

<h3>The Core BYOD Risk</h3>

<p>The fundamental risk of BYOD is data commingling: personal applications, personal files, personal browsing history, and personal contacts all live on the same device as company email, company documents, and sometimes company system credentials. A personal phone with thirty apps installed — many of which request broad data access permissions — is a very different security environment from a managed company device.</p>

<p>The risk is bidirectional. Company data can be exposed through a personal device that is compromised by malware, stolen, or simply not properly secured. And the company's security measures can inadvertently expose personal data if the company installs monitoring software on personal devices without clear boundaries.</p>

<h3>The MDM Container Approach</h3>

<p>The most effective technical approach to BYOD is the MDM container model. Software like Microsoft Intune, VMware Workspace ONE, or Jamf can install a secure, encrypted container on a personal device. Company email, files, and apps live inside this container and are separated from personal apps and data by a cryptographic boundary. The company can enforce security policies — PIN requirements, encryption, remote wipe — on the container only, without accessing personal data. If an employee leaves the company, the container and all its contents can be wiped remotely without touching personal photos, messages, or apps.</p>

<h3>Acceptable Use Policy for BYOD</h3>

<p>A BYOD acceptable use policy should define which personal devices are permitted, what security requirements they must meet (screen lock, current OS version, no jailbreaking), what company data and systems they may access, what monitoring the company may perform, and what happens to company data when an employee leaves. Employees should sign this policy before accessing company systems on personal devices.</p>

<h3>What the Company Can — and Cannot — Access</h3>

<p>Be explicit with employees about the limits of company visibility. With a container-based MDM approach, the company can see that the device is enrolled, whether security policies are compliant, and the contents of the work container. It cannot and should not access personal messages, personal photos, personal app data, or call history. Employees are understandably reluctant to enroll personal devices if they believe their employer can read their personal communications. Clarity on this point drives BYOD adoption.</p>

<h3>The Employee Departure Procedure</h3>

<p>BYOD creates a specific off-boarding challenge: when an employee leaves, you must remove company data from their personal device. The container approach makes this straightforward — the work container is wiped remotely. Without a container approach, you may need to ask the employee to manually delete company data, which is difficult to verify. Establish the departure procedure in the BYOD policy before employees enroll, not after a termination creates urgency.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "Video Conferencing Security",
    page_start: 67,
    page_end: 76,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Video Conferencing Security</h2>

<p>Video conferencing has become a primary channel for business communication, and like any communication channel, it carries security risks that are worth understanding and managing. The risks fall into two categories: platform configuration risks and physical privacy risks.</p>

<h3>Platform Security Settings</h3>

<p><strong>Zoom</strong> should be configured with waiting rooms enabled for all meetings — this allows the host to review and admit participants rather than having anyone with the link join automatically. Require passwords on all meetings, disable "join before host," and limit screen sharing to the host only unless collaboration requires otherwise. Review your organization's Zoom settings in the admin console, where many of these defaults can be set organization-wide.</p>

<p><strong>Microsoft Teams</strong> has similar controls. External participants should be placed in a lobby by default. Meeting recordings should be stored in SharePoint or OneDrive with appropriate access controls, not shared broadly. Anonymous join should be disabled for internal meetings.</p>

<p><strong>Google Meet</strong> within a Google Workspace organization applies your domain's access controls automatically. External guests should require explicit approval to join. Quick admission settings should be configured at the admin level.</p>

<h3>Screen Sharing Risks</h3>

<p>Screen sharing is one of the most common sources of accidental data exposure in video meetings. An employee who shares their entire screen rather than a specific window may inadvertently show email notifications, open documents, browser history, or other sensitive content. Establish a practice of sharing specific windows or applications rather than entire desktops, and brief employees on the risk of notification pop-ups that appear during screen shares.</p>

<h3>Physical Privacy and Background Blur</h3>

<p>What is visible in the background of a video call can reveal more than intended: whiteboards with sensitive information, physical mail, family members, home address details, or security alarm panels. Background blur or virtual backgrounds reduce this risk significantly. Enable background blur by default in your organization's conferencing platform, and remind employees to review their physical environment before joining sensitive calls.</p>

<h3>Ohio Recording Consent Law</h3>

<p>Ohio is a one-party consent state for recording communications, meaning that only one party to a conversation needs to consent to the recording for it to be legal under Ohio law. In practice, this means an Ohio employee can legally record a video call they are participating in without telling other participants. However, if the other participants are in states with two-party or all-party consent requirements — California, Florida, Illinois, and others — you must notify all participants that the call is being recorded. For any call that includes participants from outside Ohio, include a recording disclosure at the start of the meeting as standard practice.</p>

<h3>Fake Meeting Link Phishing</h3>

<p>One of the most effective phishing attacks targeting remote workers is the fake meeting invitation. The attacker sends an email that appears to come from Zoom, Teams, or another platform, claiming that a meeting is starting or that the user needs to update their credentials. The link leads to a convincing fake login page that captures the user's credentials. Train employees to access video meetings only through links from known, verified sources — never from unsolicited emails — and to verify the URL of any login page before entering credentials.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Cloud Storage and File Sharing — Secure Practices",
    page_start: 77,
    page_end: 87,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Cloud Storage and File Sharing — Secure Practices</h2>

<p>Cloud storage platforms have become the de facto file system for remote teams, and they bring both enormous convenience and meaningful security risks. Whether your team uses SharePoint, Google Drive, or Dropbox for Business, the risks are similar: overly permissive sharing settings, inadequate access controls, and a lack of data classification that puts sensitive files at the same risk level as irrelevant ones.</p>

<h3>Platform-Specific Controls</h3>

<p><strong>SharePoint and OneDrive</strong> within Microsoft 365 offer the most granular permissions controls of the major platforms. Administrators can set default sharing levels at the tenant level, preventing users from sharing files more broadly than policy allows. Set the default sharing permission to "Specific people" rather than "Anyone" or "People in your organization," and require approval for external sharing of sensitive document libraries.</p>

<p><strong>Google Drive</strong> within Google Workspace similarly allows administrators to restrict external sharing by default. Configure sharing settings to require explicit administrator approval for sharing outside the organization's domain, particularly for shared drives containing sensitive data.</p>

<p><strong>Dropbox for Business</strong> allows administrators to disable external sharing for specific folders and to require passwords and expiration dates on shared links. Review these settings in the admin console and apply them to any folder containing customer data, financial records, or other sensitive content.</p>

<h3>The "Anyone with the Link" Problem</h3>

<p>The most common cloud storage security mistake is creating shared links that are accessible to anyone who possesses them. These links are intended for temporary convenience — quickly sharing a file with a client or vendor — but they frequently persist indefinitely, get forwarded to unintended recipients, and occasionally get indexed by search engines. Audit your existing shared links across all cloud platforms and revoke any that are set to "anyone with the link" for sensitive content. Establish a policy requiring that shared links include expiration dates and, where the platform supports it, passwords.</p>

<h3>Data Classification</h3>

<p>Not all files carry the same risk if exposed. A marketing brochure has very different sensitivity than a customer contract or an employee health record. Establishing a simple data classification framework helps employees make better decisions about where data lives and how it is shared. Three tiers are sufficient for most small businesses: Public (no restrictions), Internal (share within the organization only), and Confidential (restricted sharing, requires approval). Apply these labels to document libraries and folder structures, and use them as the basis for sharing policy decisions.</p>

<h3>What Belongs in the Cloud — and What Does Not</h3>

<p>Some categories of data carry regulatory or contractual restrictions that affect whether they can be stored in specific cloud environments. HIPAA-regulated health information requires a Business Associate Agreement (BAA) with the cloud provider. Many cloud providers, including Microsoft and Google, offer BAAs for their business plans — but you must sign them explicitly. Data subject to attorney-client privilege may have specific handling requirements. Trade secrets and proprietary business processes may be subject to contractual restrictions from partners or customers. Before moving sensitive data to cloud storage, verify that the storage arrangement is compliant with applicable legal and contractual requirements.</p>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "Physical Security for Remote Workers",
    page_start: 88,
    page_end: 98,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Physical Security for Remote Workers</h2>

<p>Cybersecurity tends to focus on digital threats, but physical security remains a significant risk for remote workers. A stolen laptop, a shoulder-surfed password, or sensitive documents left in a home printer output tray are physical security incidents with digital consequences. Remote workers operating outside the controlled environment of an office are exposed to physical risks that office workers rarely face.</p>

<h3>Shoulder Surfing in Public Spaces</h3>

<p>Working in coffee shops, libraries, airport lounges, or coworking spaces is a routine part of remote work for many employees. Any of these environments creates the risk of shoulder surfing — an observer viewing your screen and noting credentials, sensitive data, or business information. The simple countermeasure is a privacy screen filter, a physical attachment that makes the display unreadable from any angle other than directly in front of the screen. Provide privacy screen filters to employees who regularly work in public locations. They are inexpensive and highly effective.</p>

<h3>Secure Document Handling at Home</h3>

<p>Remote employees who receive physical mail related to work — contracts, invoices, statements, legal documents — need guidance on secure handling. Documents should not be left where household visitors, service workers, or other household members can read them. Sensitive documents should be stored in a locked location when not in active use, and should be destroyed with a cross-cut shredder rather than discarded intact in recycling or trash. Business document destruction is a habit most employees have in an office and most do not maintain at home without explicit guidance.</p>

<h3>Printer Security</h3>

<p>Home printers create two security risks. First, documents printed at home may sit in the output tray unattended, accessible to household members or guests. Second, many modern printers store recently printed documents in internal memory, which can be accessed if the printer is resold or disposed of improperly. Employees who print sensitive documents should collect them from the printer immediately after printing and should never leave sensitive documents in the output tray. When disposing of old printers, the internal memory should be reset to factory defaults.</p>

<h3>What to Do with a Lost Device</h3>

<p>Every remote worker should know what to do if a company device or a BYOD-enrolled personal device is lost or stolen. The response procedure should be fast: report the loss to the company IT contact or manager immediately, change passwords for all accounts accessible from the device, and initiate a remote wipe through the MDM system. The remote wipe erases company data before an attacker can access it. Time matters — a device that is powered on and connected to a network can be wiped; a device that has been factory reset by an attacker cannot. Provide the loss reporting procedure in writing to every remote employee and include it in the BYOD acceptable use policy.</p>

<h3>The Clean Desk Rule for Home Offices</h3>

<p>The clean desk rule — which requires employees to clear their desks of sensitive documents and materials at the end of the workday — is a standard office security control that rarely gets transferred to home offices. Establish a version of this rule for remote workers: sensitive documents should be filed or shredded at end of day, screens should be locked or closed when stepping away, and no sensitive work materials should be left where they can be photographed or viewed during personal video calls.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Building a Remote Work Security Policy for Ohio Small Businesses",
    page_start: 99,
    page_end: 120,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Building a Remote Work Security Policy for Ohio Small Businesses</h2>

<p>The controls described in the preceding chapters are most effective when they exist within a clear policy framework. A policy tells employees what is required, gives managers the authority to enforce expectations, provides a basis for accountability when things go wrong, and demonstrates to clients, partners, and insurers that your business takes security seriously. Ohio small businesses that carry cyber insurance are increasingly expected to have documented security policies as a condition of coverage.</p>

<h3>Core Policy Elements</h3>

<p>A remote work security policy for a small Ohio business does not need to be lengthy or legalistic. It needs to cover the following elements clearly and in plain language:</p>

<ul>
  <li><strong>Authorized devices:</strong> Which devices are approved for remote work — company-owned only, or also BYOD-enrolled personal devices with specific requirements</li>
  <li><strong>Network requirements:</strong> Home network security standards, VPN requirements, prohibition on using unsecured public Wi-Fi without VPN</li>
  <li><strong>Authentication:</strong> Multi-factor authentication requirements for all company systems, password manager use, prohibition on shared credentials</li>
  <li><strong>Data handling:</strong> What data may be accessed remotely, how it may be stored, cloud storage permissions, prohibition on personal storage services for company data</li>
  <li><strong>Incident reporting:</strong> How and when to report lost devices, security incidents, or suspicious activity</li>
  <li><strong>Physical security:</strong> Screen lock requirements, clean desk expectations, handling of printed documents</li>
  <li><strong>Software installation:</strong> Restrictions on installing unauthorized software on company devices</li>
</ul>

<h3>Communicating the Policy</h3>

<p>A policy that employees have not read and acknowledged is a policy that will not be followed. Distribute the remote work security policy to all remote employees, require signed acknowledgment, and cover the key points in an all-hands meeting or recorded training session. Revisit the policy annually and when significant changes in tools, staffing, or threat landscape occur. The Ohio Small Business Development Center offers resources to help small businesses develop security policies, and several Ohio-based managed service providers include policy templates in their service packages.</p>

<h3>Ohio-Specific Legal Context</h3>

<p>Ohio's Data Protection Act (ORC 1354) provides an affirmative defense against tort claims arising from data breaches if the business maintains a cybersecurity program that conforms to a recognized industry standard. The NIST Cybersecurity Framework, CIS Controls, and ISO 27001 are among the qualifying frameworks. A documented remote work security policy that implements controls from one of these frameworks is a meaningful step toward qualifying for this safe harbor. Consult with an Ohio-licensed attorney to understand how the safe harbor applies to your specific situation.</p>

<p>Ohio's breach notification law (ORC 1349.19) requires notification to affected individuals and the Ohio Attorney General within 45 days of discovering a breach of personal information. Remote work security controls that prevent breaches also prevent the financial and reputational costs of notification.</p>

<h3>Keeping the Policy Current</h3>

<p>Technology changes. Threats change. Your team changes. Designate a specific person — you, your IT provider, or an office manager — to review the remote work security policy at least annually and update it when the tools your team uses change significantly. The best remote work security policy is one that reflects how your team actually works, addresses the threats they actually face, and is maintained as a living document rather than filed and forgotten.</p>
</article>`,
  },
];
