import type { BookChapter } from "@/config/bookCatalog";

/** Full content for Smart Home Security: A Family Guide (~120 pages) */
export const SMART_HOME_SECURITY_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Smart Home Security</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">A Family Guide to Protecting Your Connected Home</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>Published by InVision Network Press, Kettering, Ohio 45440</p><p><em>For educational purposes only.</em></p></div></article>`,
  },
  {
    chapter_number: 1,
    chapter_title: "The Connected Home's Hidden Attack Surface",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
    <h2>Chapter 1: The Connected Home's Hidden Attack Surface</h2>

    <p>The average American home in 2026 contains more than fifteen internet-connected devices. For families in Ohio's suburban communities — in the subdivisions of Dublin, Westerville, Mason, and Fairlawn — the number is often higher. There are the obvious ones: smartphones, laptops, tablets. And then there are the devices most people do not think of as computers: the thermostat, the doorbell camera, the baby monitor, the smart television, the wireless speaker, the robot vacuum, the connected refrigerator, the gaming console, the smart lock. Each of these devices has a processor, software, a network connection, and often a camera or microphone. Each is, in the language of cybersecurity, an attack surface — a point through which a malicious actor can potentially gain entry to your network or your home.</p>

    <p>This is not a hypothetical. In 2022, a family in Houston discovered that a stranger had accessed their Ring indoor camera and was speaking to their child through it. In 2023, researchers demonstrated that a compromised Nest thermostat could be used to map the interior of a home and establish occupancy patterns. In Ohio, the Attorney General's office has received reports of baby monitor intrusions, doorbell camera data breaches, and smart lock vulnerabilities exploited in residential burglaries. The connected home is more convenient than any previous generation of home technology. It is also a more complex security challenge than any family has historically had to manage.</p>

    <h3>Why Smart Homes Are Smarter Targets</h3>

    <p>A traditional home has one primary security consideration: the physical lock on the door. A smart home has that consideration plus dozens of digital ones. The digital attack surfaces are often more accessible than the physical one: a determined burglar must approach your property, risk being seen, and overcome a physical barrier. A remote attacker can probe your network from anywhere in the world, at any hour, without physical risk. And while deadbolts have been hardened by decades of improvement, many smart home devices are relatively new products built with inadequate security by manufacturers whose primary competition is on features and price, not security architecture.</p>

    <p>The market incentives are unfavorable. A consumer smart speaker that sells for $49 was not engineered with the same security budget as enterprise networking equipment. Its firmware may not be updated after launch. Its default password may be "admin." Its communication to the manufacturer's cloud servers may not be encrypted. The consumer who buys it for its voice control capability is not thinking about its attack surface — and frequently, neither is the manufacturer.</p>

    <h3>Ohio Home Security Context</h3>

    <p>Ohio's residential burglary rate has declined significantly over the past decade, partly because of improvements in home security technology — including smart locks, doorbell cameras, and alarm systems. But the same technology that deters traditional burglary creates new vulnerabilities. A burglar who can determine from your social media that you are on vacation, confirm via a compromised camera that the home is unoccupied, and disable a smart lock using a previously obtained access code represents a threat model that did not exist fifteen years ago. Ohio law enforcement agencies in Columbus, Cleveland, and Cincinnati have documented cases where smart home technology played a role in residential crimes — sometimes as a deterrent, and sometimes as a factor that enabled the crime.</p>

    <h3>What This Book Covers</h3>

    <p>This book does not argue that smart home technology is not worth using. It is worth using — the convenience, safety, and energy efficiency benefits are real. The goal is to use it with the same deliberateness you would apply to any tool that enters your home and your family's life. Each chapter covers a specific category of smart home technology: how it works, what the specific security risks are, and what concrete steps you can take to reduce those risks without eliminating the benefits. The final chapter provides a complete setup checklist for new smart home deployments and a remediation checklist for existing ones.</p>

    <p>The level of security effort this book recommends is appropriate for a family home, not a government facility. The steps are not technically complex — they require attention and follow-through, not specialized knowledge. A family that completes the steps in this book will have a meaningfully more secure connected home than the large majority of Ohio households, and will have done so without significant expense or inconvenience.</p>
    </article>`,
  },
  {
    chapter_number: 2,
    chapter_title: "Router Security — The Gateway to Everything",
    page_start: 17,
    page_end: 28,
    content_html: `<article class="chapter-content">
    <h2>Chapter 2: Router Security — The Gateway to Everything</h2>

    <p>Your home router is the device that connects every other device in your home to the internet. It is also the device that most Ohio families installed years ago, have never updated, and are running with factory default settings — including, in many cases, a factory default password that is publicly documented in the router's manual and searchable online. An attacker who gains access to your router can see all network traffic, redirect web requests, block devices, and access every other device on the network. The router is the highest-leverage security improvement available to most families.</p>

    <h3>Default Passwords</h3>

    <p>Every router ships with a default administrator username and password — typically printed on a sticker on the device. These defaults are also published in the manufacturer's documentation and searchable online. Any attacker who can reach your router's login page — which, for routers with remote management enabled, can be from anywhere on the internet — can log in with the default credentials if you have not changed them. Change your router's admin password immediately. It should be unique (not reused from any other account), at least sixteen characters, and stored in a password manager. The admin password is different from your WiFi password.</p>

    <h3>Firmware Updates</h3>

    <p>Router firmware is the software that runs the device. Manufacturers release firmware updates to patch security vulnerabilities — and unpatched vulnerabilities are one of the most common ways routers are compromised. Log into your router's administration interface (typically by visiting 192.168.1.1 or 192.168.0.1 in your browser) and check whether automatic firmware updates are available and enabled. For most consumer routers, they are not enabled by default. Enable them if available; if not, set a calendar reminder to check for firmware updates quarterly.</p>

    <h3>WPA3 vs. WPA2 and Network Configuration</h3>

    <p>WPA3 is the current standard for WiFi security. If your router supports it (most routers purchased after 2019 do), enable WPA3 for your network. If your router only supports WPA2, that is acceptable but plan to upgrade when the router reaches end-of-life. Never use WEP — it is broken and provides no real security. Your WiFi password should be at least twelve characters and unique to your home network. Consider hiding your SSID (network name) — this does not provide strong security but reduces your network's visibility to casual scanners. The SSID visibility setting is in your router's wireless configuration section.</p>

    <h3>Guest Network Setup</h3>

    <p>Set up a separate guest network for visitors and for IoT devices. Most modern routers support this in their administration interface. The guest network should have a different password from your main network, and IoT devices (smart speakers, cameras, thermostats, appliances) should be connected to the guest network rather than your main network. This means that if an IoT device is compromised, the attacker is on an isolated network that cannot see your computers, phones, and other sensitive devices. This step — isolating IoT devices on a separate network — is one of the highest-impact security measures available to a home user and requires no specialized knowledge to implement.</p>

    <h3>Checking for Unauthorized Devices</h3>

    <p>Your router's administration interface shows all connected devices. Review this list periodically — ideally monthly, and immediately if you suspect a network intrusion. Look for unfamiliar device names or manufacturers. If you find a device you do not recognize, change your WiFi password (which will disconnect all devices and require them to reconnect). Recommended consumer routers with good security track records include Eero (Amazon's mesh system with automatic updates) and Netgear Orbi, both of which offer mobile apps that simplify network management and device review.</p>
    </article>`,
  },
  {
    chapter_number: 3,
    chapter_title: "Smart Speakers and Privacy — Alexa, Google Home, Siri",
    page_start: 29,
    page_end: 39,
    content_html: `<article class="chapter-content">
    <h2>Chapter 3: Smart Speakers and Privacy — Alexa, Google Home, Siri</h2>

    <p>Smart speakers are the most privacy-invasive common household device most families own, and they are typically treated as the least concerning. They sit in kitchens and bedrooms listening continuously — that is their core function. The question is not whether they are listening (they are) but what they do with what they hear, and how to configure them to minimize the privacy exposure.</p>

    <h3>What Is and Isn't Recorded</h3>

    <p>All major smart speakers use a "wake word" system — the device processes audio locally to listen for its wake word (Alexa, Hey Google, Hey Siri), and only begins recording and transmitting to cloud servers when the wake word is detected. In theory, only post-wake-word audio is transmitted and stored. In practice, false-positive activations are common — the device mishears conversation as a wake word and begins recording. Amazon, Google, and Apple have all acknowledged that human reviewers listen to some portion of smart speaker audio to improve voice recognition. This review process has been the subject of multiple news investigations and regulatory inquiries.</p>

    <p>Amazon allows users to review and delete their Alexa voice history (Alexa app > More > Activity). Google provides similar controls in My Activity (myactivity.google.com). Apple's Siri privacy controls are in Settings > Siri & Search. Review and delete stored audio regularly, and enable automatic deletion of recordings older than three months on each platform that offers this option.</p>

    <h3>Voice Purchase Controls</h3>

    <p>Both Amazon Alexa and Google Home can be used to make purchases — which creates the obvious risk of unauthorized purchases by children or accidental purchases by adults. Amazon allows you to require a four-digit voice purchase code through the Alexa app (Settings > Account Settings > Voice Purchasing). Enable this. Google Home purchase authorization can be configured through the Google Home app. Without these controls, a child who knows they want something can simply ask Alexa to order it.</p>

    <h3>The Mute Button</h3>

    <p>Every smart speaker has a physical mute button that disables the microphone at the hardware level — this is a stronger protection than software settings, which can theoretically be overridden by a compromised device. Use the mute button when having sensitive conversations in rooms where smart speakers are present. Consider whether a smart speaker in a bedroom is appropriate given the sensitivity of conversations that occur in bedrooms. The Amazon Ring privacy controversy — which involved concerns about Ring devices sharing data with law enforcement and third parties beyond what users expected — is a useful reminder that smart home privacy policies can change, and that company-level trust decisions should be made and revisited deliberately.</p>
    </article>`,
  },
  {
    chapter_number: 4,
    chapter_title: "Security Cameras — Smart Setup vs. Risky Defaults",
    page_start: 40,
    page_end: 49,
    content_html: `<article class="chapter-content">
    <h2>Chapter 4: Security Cameras — Smart Setup vs. Risky Defaults</h2>

    <p>Security cameras provide genuine value for home security and family safety. They also, when improperly configured, provide an unauthorized person with a live view of your home, your family's routines, and your private spaces. The gap between "security camera that makes you safer" and "security camera that makes you less safe" is largely a configuration gap that most users do not close because they set up the camera as quickly as possible and never return to the settings.</p>

    <h3>Indoor vs. Outdoor Camera Considerations</h3>

    <p>Indoor cameras and outdoor cameras present different risk profiles. An outdoor camera that is compromised reveals your home's exterior, your driveway, your comings and goings — useful information for a burglar, but not directly invasive of private space. An indoor camera that is compromised provides a live view of the interior of your home — bedrooms, living spaces, and anywhere the camera points. Apply a higher security standard to indoor cameras. Consider whether indoor cameras are necessary at all, and if so, place them only in common areas and ensure they cannot be positioned to capture bedrooms or bathrooms.</p>

    <h3>Arlo, Ring, and Nest Secure Configuration</h3>

    <p>All three major platforms — Arlo, Ring (Amazon), and Nest (Google) — require account-level security, not just device-level security. Your camera is as secure as your account. Enable two-factor authentication on your Ring, Arlo, or Google account immediately if it is not already enabled. Use a strong, unique password for the account. Review which devices are authorized to access the account and revoke any you do not recognize. For Ring specifically: disable the option to share your camera footage with Ring's Neighbors app if you have not actively chosen to participate in that network, and review Ring's law enforcement data sharing settings in the Control Center within the Ring app.</p>

    <h3>End-to-End Encryption</h3>

    <p>End-to-end encryption means that camera footage is encrypted from the device to your viewing app, and cannot be accessed by the camera manufacturer's servers in a readable form. Ring offers end-to-end encryption as an optional feature that must be enabled manually (Ring app > Account > Video Encryption). Nest cameras with end-to-end encryption require a Google account with Advanced Protection enabled. Arlo offers end-to-end encryption on select camera models through the Arlo Secure plan. Enable end-to-end encryption wherever available — it substantially reduces the risk that a breach of the manufacturer's servers would expose your footage.</p>
    </article>`,
  },
  {
    chapter_number: 5,
    chapter_title: "Smart Locks and Doorbells — Convenience vs. Vulnerability",
    page_start: 50,
    page_end: 59,
    content_html: `<article class="chapter-content">
    <h2>Chapter 5: Smart Locks and Doorbells — Convenience vs. Vulnerability</h2>

    <p>Smart locks replace or augment the physical key with app-based access, PIN codes, fingerprint recognition, or proximity detection. They offer genuine convenience — no lost keys, temporary access codes for guests, remote locking and unlocking, and audit logs that show who entered when. They also introduce digital attack surfaces to what was previously a purely physical security problem. The question is whether the convenience is worth the risk and, if so, how to configure the device to minimize that risk.</p>

    <h3>Common Vulnerabilities</h3>

    <p>Yale, Schlage, and August are the dominant smart lock brands in Ohio's consumer market. Security researchers have identified vulnerabilities in products from all three manufacturers over the past several years. Common vulnerability classes include: weak Bluetooth implementations that allow close-range unauthorized access, cloud account compromise (if your account is compromised, an attacker can unlock your door remotely), insecure firmware that has not been updated since installation, and access code enumeration (trying all possible codes until one works, which is possible on locks that do not limit failed attempts).</p>

    <h3>Access Code Audits</h3>

    <p>Smart locks allow multiple access codes for different people — family members, housecleaners, dog walkers, delivery services. These codes accumulate over time, and codes granted to people who no longer need access are often never revoked. Conduct an access code audit: review every active code on your lock, identify who it belongs to, and delete any codes for people who no longer need access. Change your primary access code if you have had it for more than a year. Use time-limited codes for temporary visitors — most smart lock apps allow you to create codes that expire after a set period.</p>

    <h3>When the Internet Goes Down</h3>

    <p>Smart locks that depend on cloud connectivity can create a lockout scenario if the internet is unavailable. Review your lock's offline behavior: most smart locks retain the ability to use stored PIN codes offline, but some features (remote access, temporary codes) require connectivity. Ensure that your household has at least one access method that works without internet — a physical key backup or a locally stored PIN that all family members know. This is not just a security consideration; it is a practical resilience consideration given Ohio's periodic power and internet outages.</p>
    </article>`,
  },
  {
    chapter_number: 6,
    chapter_title: "IoT Appliances and Baby Monitors — The Forgotten Attack Surfaces",
    page_start: 60,
    page_end: 69,
    content_html: `<article class="chapter-content">
    <h2>Chapter 6: IoT Appliances and Baby Monitors — The Forgotten Attack Surfaces</h2>

    <p>The security conversation about smart homes tends to focus on the devices that are obviously security-relevant: cameras, locks, alarms. The devices that receive the least security attention are often the ones with the weakest security: smart televisions, baby monitors, connected appliances. These devices are purchased for their consumer features, set up quickly, and rarely revisited. They are often running unpatched firmware, using default or no passwords, and connected to the main home network rather than an isolated IoT network.</p>

    <h3>Smart Televisions and Data Collection</h3>

    <p>Smart televisions collect viewing data through automatic content recognition (ACR) — a technology that samples what is displayed on screen and matches it against a database to identify what you are watching. This data is sold to advertisers and, in some cases, shared with third parties. ACR is enabled by default on most smart TVs and must be manually disabled. On Samsung TVs: Settings > Support > Terms & Privacy > Viewing Information Services. On LG TVs: Settings > All Settings > General > About This TV > User Agreements. On Vizio TVs: Settings > System > Reset & Admin > Viewing Data. Disable ACR on every smart TV in your home.</p>

    <h3>Baby Monitor Security</h3>

    <p>Baby monitor hacking incidents are well-documented and deeply disturbing — strangers speaking to children through their monitors, parents discovering their feeds have been accessed remotely. The incidents follow a consistent pattern: a monitor using a weak or default password, accessible over the internet through a poorly secured remote viewing feature, compromised by someone scanning the internet for vulnerable devices. The defense is straightforward: use a baby monitor with strong authentication, change the default password before first use, disable remote viewing if you do not actively use it, and connect the monitor to the isolated IoT guest network rather than your main network.</p>

    <h3>The Universal Rule for IoT Devices</h3>

    <p>Every device that connects to the internet is a computer. Every computer needs a password. Every password needs to be unique and not the factory default. Every device needs firmware updates. This applies to your smart refrigerator, your connected washer, your robot vacuum, your smart doorbell, your networked printer. If a device connects to the internet and you have not changed its default password and checked for firmware updates, it is a potential entry point to your network. The effort required to secure each device is five to fifteen minutes — far less than the effort required to recover from a network intrusion.</p>
    </article>`,
  },
  {
    chapter_number: 7,
    chapter_title: "Guest Networks, Visitors, and Contractors",
    page_start: 70,
    page_end: 79,
    content_html: `<article class="chapter-content">
    <h2>Chapter 7: Guest Networks, Visitors, and Contractors</h2>

    <p>Every person you give your main WiFi password to becomes a node in your network's trust structure. A guest who connects their personal device to your main network — a device that may be infected with malware, may be running outdated software, or may belong to someone whose interests are not aligned with yours — has connected that device to the same network as your home computers, your smart cameras, and your financial data. The guest network is not a courtesy feature. It is a security boundary.</p>

    <h3>Separate Guest WiFi Is Not Optional</h3>

    <p>Give all visitors — friends, family, housecleaners, contractors, delivery services — the guest network password, not your main network password. The guest network should provide internet access but not access to devices on your main network. Your main network password should be known only to household members. If you have shared your main network password with guests in the past, change it and rotate who has the new password to household members only. Your guest network password can be rotated more frequently — quarterly is reasonable — because changing it does not require reconfiguring your household's devices.</p>

    <h3>Contractor Access Policies</h3>

    <p>Contractors who need internet access for their work — HVAC technicians, IT contractors, appliance repair services — should receive the guest network password for the duration of their work and have it rotated afterward. Contractors who bring their own smart devices to install — a new thermostat, a security system, a home theater component — should connect those devices to the IoT guest network, not your main network, during the installation. If the contractor needs to access your router's administration interface, be present during that process and change the admin password after they leave.</p>

    <h3>IoT Device Isolation on Separate VLAN</h3>

    <p>For families with more advanced networking equipment, creating a separate VLAN (Virtual Local Area Network) for IoT devices provides stronger isolation than a standard guest network. A VLAN is a logically separate network that uses the same physical infrastructure but cannot communicate with devices on other VLANs. Most consumer mesh routers (including Eero Pro and Netgear Orbi Pro) support this feature. If your current router does not support VLANs and you have a significant number of IoT devices, consider this a factor in your next router purchase decision.</p>
    </article>`,
  },
  {
    chapter_number: 8,
    chapter_title: "When Your Smart Home Gets Hacked",
    page_start: 80,
    page_end: 89,
    content_html: `<article class="chapter-content">
    <h2>Chapter 8: When Your Smart Home Gets Hacked</h2>

    <p>Network intrusions in home environments are underreported and often undetected. Most families would not know if a device on their network had been compromised — there is no alarm, no obvious symptom, and no monitoring system watching for suspicious activity. Recognizing the signs of compromise and knowing how to respond is the last line of defense when prevention has failed.</p>

    <h3>Signs of Compromise</h3>

    <p>Warning signs that a smart home device or network may have been compromised include: devices behaving unexpectedly (cameras moving without input, speakers playing unprompted, smart locks activating at unusual times), unfamiliar devices appearing on your network device list, a noticeable slowdown in internet speeds (which may indicate a compromised device is using bandwidth for malicious purposes), unexplained data usage spikes on your internet bill, and accounts associated with smart home devices showing login activity from unfamiliar locations or devices.</p>

    <h3>Resetting Devices and Changing All Credentials</h3>

    <p>If you suspect a device has been compromised, factory reset it before reconnecting it to the network. A factory reset wipes the device's configuration and software to its original state, removing any malicious modifications. After resetting, update the firmware before reconnecting. Then change every account credential associated with the device — the platform account password, the WiFi password if the compromised device had it, and any access codes that may have been exposed. If the compromise appears to involve your main network rather than a single device, change your router's admin password and your main WiFi password, and review the full device list for unfamiliar entries.</p>

    <h3>What to Report and to Whom</h3>

    <p>Report smart home security incidents to: the device manufacturer (they need to know about vulnerabilities; most have a security disclosure email address), the FBI's Internet Crime Complaint Center (IC3.gov) if the incident involves a clear criminal act (unauthorized camera access, theft of data), and the Ohio Attorney General's Cybercrime unit if you believe the incident is part of a broader criminal pattern. If a camera intrusion involves any viewing of minors, contact local law enforcement and NCMEC in addition to other reporting channels. Document everything before beginning any reset process — logs, screenshots, unusual activity records — as this documentation supports any subsequent investigation.</p>
    </article>`,
  },
  {
    chapter_number: 9,
    chapter_title: "Setting Up a New Smart Home Securely",
    page_start: 90,
    page_end: 99,
    content_html: `<article class="chapter-content">
    <h2>Chapter 9: Setting Up a New Smart Home Securely</h2>

    <p>The easiest time to build security into a smart home is at setup. Habits established during initial configuration persist — a home set up securely from the start is far more likely to remain secure than one that was set up quickly and then hardened later. This chapter provides a complete setup checklist for families establishing or overhauling their smart home security posture.</p>

    <h3>Before Connecting Any Device</h3>

    <ul>
      <li>Set up your router first. Change the admin password, enable automatic firmware updates, configure your main network (WPA3 if available), and create your guest/IoT network before connecting any smart home devices.</li>
      <li>Create a dedicated email address for smart home account registrations. Using a separate email limits the blast radius if one of your smart home accounts is compromised — the attacker cannot use that account to access your primary email for password resets on other accounts.</li>
      <li>Set up a password manager if you do not already have one. You will be creating multiple unique passwords during this process; a password manager (Bitwarden, 1Password, Apple Keychain) stores them securely.</li>
    </ul>

    <h3>Device Registration and Firmware Updates</h3>

    <ul>
      <li>Register every device with the manufacturer before first use. Registration ensures you receive security update notifications and warranty support.</li>
      <li>Check for and install firmware updates before putting the device into active use. New devices often ship with firmware that is months old; updates may contain critical security patches.</li>
      <li>Change the default password on every device that has one, before connecting it to your network.</li>
      <li>Connect IoT devices (cameras, speakers, thermostats, appliances) to your guest/IoT network, not your main network.</li>
    </ul>

    <h3>Account Security for Every Platform</h3>

    <ul>
      <li>Enable two-factor authentication on every smart home platform account: Ring, Nest, Arlo, Amazon, Google, Apple, SmartThings, Wyze, or whatever platforms your devices use.</li>
      <li>Use a unique, strong password for each account. A password manager makes this achievable.</li>
      <li>Review and restrict account sharing — only the people who live in your home should have accounts that can control your home's devices.</li>
    </ul>

    <h3>Documentation of All Devices and Credentials</h3>

    <p>Create a home network inventory: a list of every connected device, its location, the network it is connected to, and the account or platform it uses. Store this document securely (your password manager or an encrypted document). This inventory serves two purposes: it helps you maintain your security posture by knowing what exists, and it helps you respond efficiently if you need to reset your network or a device is compromised. Update the inventory whenever you add, remove, or reconfigure a device. Review it annually as part of your home security review.</p>
    </article>`,
  },
];
