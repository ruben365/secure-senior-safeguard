import type { BookChapter } from "@/config/bookCatalog";

/** Full content for the Employee Cybersecurity Training Manual (~175 pages) */
export const EMPLOYEE_TRAINING_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Employee Cybersecurity Training Manual</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">A Complete Program for Building a Security-Aware Workforce</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>InVision Network Press · Kettering, Ohio 45440</p><p><em>For educational purposes only. Consult qualified legal and security professionals for your specific situation.</em></p></div></article>`,
  },
  {
    chapter_number: 1,
    chapter_title: "Your Employees Are Target #1",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Your Employees Are Target #1</h2>

<p>Every firewall you purchase, every antivirus subscription you renew, every IT consultant you pay — none of it matters as much as the decisions your employees make every day at their keyboards. According to IBM's annual Cost of a Data Breach Report, 88% of all security incidents involve some form of human error. That is not a technology failure. It is a training failure. And for Ohio small business owners, it is a failure with a very specific price tag.</p>

<p>The average cost of a data breach for a small or mid-sized business in the United States now exceeds $150,000. Many businesses never recover. A 2023 National Cybersecurity Alliance study found that 60% of small businesses that suffered a significant cyberattack closed within six months. Those are not abstract statistics — they represent restaurants in Columbus that could not make payroll after a ransomware attack locked their point-of-sale systems, accounting firms in Dayton that lost client trust after customer tax records were exposed, and medical offices in Akron that faced both patient lawsuits and state regulatory fines after a single employee clicked the wrong email link.</p>

<h3>Why Employees Are the Primary Attack Surface</h3>

<p>Criminals do not break through your firewall by writing sophisticated code. They call your receptionist pretending to be IT support. They send your bookkeeper an email that looks exactly like it came from your bank. They craft a fake invoice that looks almost identical to the one your regular supply vendor sends every month. They exploit trust, urgency, and familiarity — not technical vulnerabilities.</p>

<p>This approach is called social engineering, and it is the dominant tactic in modern cybercrime because it works. A criminal who spends three hours sending phishing emails to 500 small businesses can expect a 3–5% click rate. That means 15 to 25 businesses have just handed over credentials, downloaded malware, or initiated a fraudulent wire transfer — all because an employee made a decision in a moment of inattention. The criminal's cost was three hours of work. The businesses' cost could be their entire operating capital.</p>

<p>Ohio businesses face the same threat landscape as businesses everywhere, but there are state-specific factors worth noting. Ohio is home to a large number of manufacturing firms, healthcare practices, legal offices, and financial services companies — all of which handle data that criminals actively target. The Ohio Attorney General's office recorded over 1,400 data breach notifications from Ohio businesses in 2024 alone. The majority of those breaches started with employee error: a clicked link, a weak password, an email sent to the wrong address, or a USB drive picked up in a parking lot.</p>

<h3>The ROI of Employee Security Training</h3>

<p>Training is not a cost. It is a risk reduction investment with a calculable return. Consider the math: a comprehensive employee training program for a 20-person business might cost $3,000 to $5,000 per year when you account for the training platform, time spent in sessions, and occasional phishing simulation services. The average cost of a breach — including forensic investigation, customer notification, regulatory compliance, lost business, and reputation damage — is more than $150,000. If training reduces your breach probability by even 30%, you are generating tens of thousands of dollars in risk-adjusted value every year.</p>

<p>Insurance carriers increasingly recognize this. Many cyber liability insurance underwriters now offer reduced premiums or require documented training programs as a condition of coverage. When you can show an underwriter that your employees complete annual security training, that you run quarterly phishing simulations, and that you have written security policies, you become a measurably lower risk — and your premiums reflect that.</p>

<p>Beyond the financial calculation, there is a cultural argument. Businesses that treat security as a shared responsibility — not just an IT problem — create environments where employees feel empowered to ask questions, report suspicious activity, and push back on unusual requests. That culture is worth more than any technical control you can buy.</p>

<h3>How to Use This Manual as a Training Program</h3>

<p>This manual is designed as a complete, self-contained training program that any business owner or office manager can implement without dedicated IT staff. Each chapter covers a specific security topic and includes practical exercises, policy templates, and assessment tools.</p>

<p>The recommended implementation schedule is as follows. In the first month, assign Chapters 1 through 4 — the foundational topics of phishing recognition, password security, safe browsing, and device security. These chapters address the highest-volume attack vectors and give employees the most immediate risk reduction. In the second month, cover Chapters 5 through 8, which address social engineering, data handling, remote work, and vendor risk. By month three, complete the remaining chapters, covering incident reporting, social media, and policy implementation.</p>

<p>After the initial training cycle, the program becomes a maintenance system. Use the quiz module in Chapter 12 for quarterly knowledge checks. Use the policy templates in Chapter 13 to formalize your security rules in writing. Use Chapter 14 to build security into your ongoing culture through monthly security moments, simulated phishing tests, and annual reviews.</p>

<p>You do not need to run this training all at once. Research on adult learning consistently shows that short, frequent sessions outperform marathon training days. A 30-minute session every two weeks will produce better retention and behavior change than a single all-day security seminar once a year. Structure the program around your operational reality — busy seasons, shift schedules, and team size all affect how you deliver it, but none of them change the underlying need.</p>

<h3>Setting Expectations with Your Team</h3>

<p>Before you start, have an honest conversation with your employees about why this training exists. Do not frame it as punishment or surveillance. Frame it accurately: criminals specifically target businesses like yours, and they do it primarily through your employees. Every person on your team has the ability to either stop an attack or inadvertently enable one. This training gives them the knowledge to be the former.</p>

<p>Acknowledge that mistakes happen. The goal is not a zero-mistake workforce — it is a workforce that recognizes mistakes quickly, reports them without fear, and helps contain damage before it becomes catastrophic. The chapter on incident reporting will cover this no-blame philosophy in detail. For now, establish from day one that the person who clicks a phishing link and immediately reports it is an asset. The person who clicks a link, realizes what happened, and says nothing out of embarrassment is a liability — not because they are a bad employee, but because delayed reporting turns a recoverable incident into a crisis.</p>

<p>Security training that works treats employees as intelligent adults who, when given accurate information about real threats, will make better decisions. That is what this manual is designed to produce: informed employees who understand why the rules exist, not employees who follow rules robotically until the day they encounter a situation the rules did not anticipate.</p>
</article>`,
  },
  {
    chapter_number: 2,
    chapter_title: "Phishing Recognition and Email Security",
    page_start: 17,
    page_end: 29,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: Phishing Recognition and Email Security</h2>

<p>Email is the single most dangerous application on your employees' computers — not because of anything inherent to the technology, but because criminals have spent years perfecting the art of making malicious emails look legitimate. Phishing attacks account for over 90% of all data breaches, according to the Verizon Data Breach Investigations Report. If you fix one vulnerability in your business, fix your employees' ability to recognize a bad email.</p>

<h3>The Anatomy of a Phishing Email</h3>

<p>Every phishing email is designed to accomplish one of three things: get you to click a link that takes you to a fake login page, get you to open an attachment that installs malware, or get you to take some action — wire money, send credentials, approve an invoice — based on a false premise. Understanding this helps employees shift their thinking: the question is not "does this email look normal?" but "what is this email trying to get me to do, and does that request make sense given what I know about the sender?"</p>

<p>Phishing emails share common structural characteristics. They almost always create urgency: your account will be suspended, your package cannot be delivered, your invoice is overdue, your password has expired. They frequently impersonate trusted entities: your bank, your Microsoft 365 account, your payroll processor, your CEO. They contain a call to action — a link to click, a file to open, a number to call — that is the mechanism of the attack.</p>

<p>The visual sophistication of phishing emails has increased dramatically. Modern phishing kits pull the actual logos, color schemes, and email footer text from legitimate company websites. An email claiming to be from Chase Bank may look indistinguishable from a real Chase email when viewed casually. The tells are subtle: a sender address that does not match the company's domain, a link URL that goes somewhere unexpected, slight grammatical oddities, or a request that sits outside normal business process.</p>

<h3>Business Email Compromise</h3>

<p>Business Email Compromise (BEC) is a more targeted and sophisticated form of phishing that has become the highest-loss cybercrime category in America, costing businesses over $2.9 billion annually according to the FBI's Internet Crime Complaint Center. In a BEC attack, criminals either compromise a real executive's email account or spoof their address convincingly, then use that position of authority to instruct employees to take actions — usually financial ones — that benefit the criminal.</p>

<p>The most common BEC scenario: an employee in accounts payable receives an email appearing to come from the company's CEO or CFO, directing them to wire funds urgently to a new vendor account. The email explains that the matter is confidential — do not discuss it with others — and must be done immediately. Both of those elements — secrecy and urgency — are red flags. Legitimate executives do not typically ask employees to bypass normal approval processes or keep financial transactions secret from colleagues.</p>

<p>Establish a verification protocol for any financial transaction request that comes via email, regardless of who appears to be sending it. A phone call to the sender — using a phone number already on file, not one provided in the suspicious email — takes 90 seconds and can prevent a $50,000 wire fraud. Many Ohio businesses have implemented a simple rule: any wire transfer or change to vendor payment information requires verbal confirmation from a manager. That rule has stopped numerous BEC attacks.</p>

<h3>Spear Phishing vs. Mass Phishing</h3>

<p>Mass phishing is the volume play: millions of identical emails sent to as many addresses as possible, hoping a small percentage will click. These attacks are less sophisticated and more easily caught by spam filters. Spear phishing is the precision play: highly personalized emails crafted specifically for one target or a small group, using researched details to increase credibility. Criminals executing spear phishing attacks will study your company's LinkedIn page, your website's staff directory, your press releases, and your social media accounts before sending a single email.</p>

<p>When your sales manager receives an email that references a specific client they worked with last month, mentions a real colleague by name, and uses the correct terminology for your industry, the psychological defenses against phishing drop significantly. That is exactly what spear phishing is designed to accomplish. Training your team to be skeptical of highly personalized unexpected requests is harder than training them to spot obvious mass phishing, but it is critically important for businesses whose employees are publicly visible on LinkedIn or your website.</p>

<h3>How to Hover-Check Links</h3>

<p>Before clicking any link in an email, hover your mouse cursor over the link text without clicking. The actual destination URL will appear either in a tooltip or in your browser's status bar at the bottom of the screen. Compare that URL to what you would expect. If an email claims to be from your bank and the link goes to a URL that does not include your bank's actual domain — or goes to something like "secure-login-chase.com.ru" — do not click it.</p>

<p>On mobile devices, press and hold the link to see the URL before tapping. Many mobile email clients will display the destination URL in a preview popup. Train employees to make this a reflex on mobile as well, where the smaller screen and abbreviated display make phishing links harder to spot.</p>

<h3>Reporting Suspicious Email</h3>

<p>Every business needs a simple, frictionless process for employees to report suspicious emails. If reporting requires employees to fill out a complex form, send a detailed written explanation, or fear judgment for flagging something that turns out to be legitimate, they will not report. They will delete it, ignore it, or — most dangerously — just click it to see if it is real.</p>

<p>The simplest reporting mechanism: a dedicated email address (such as security@yourcompany.com) that goes to the owner or IT contact, where employees can forward suspicious messages with a one-line subject like "Is this legit?" Make it explicit that no suspicious email report is ever wrong. Erring on the side of reporting is always correct behavior.</p>

<h3>What to Do If You Clicked</h3>

<p>When an employee realizes they have clicked a suspicious link or opened a malicious attachment, the most important thing they can do is immediately report it — before they convince themselves it was probably nothing. Incident response for a phishing click in the first 15 minutes is dramatically different from incident response 15 hours later when malware has had time to spread across the network.</p>

<p>Immediate steps after a suspected phishing click: disconnect the device from the network (unplug the ethernet cable or disable WiFi), call the IT contact or business owner directly, do not restart the computer (which can destroy forensic evidence), and do not log into any other accounts on that device. Document what happened: what the email said, what link or file was clicked, and approximately when.</p>

<p>If credentials were entered on a fake login page — a very common phishing outcome — immediately change the compromised password from a different, clean device. If the compromised account is tied to any financial systems, notify your bank. Speed is the primary variable that determines how bad the outcome is.</p>
</article>`,
  },
  {
    chapter_number: 3,
    chapter_title: "Password Security and Credential Management",
    page_start: 30,
    page_end: 41,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Password Security and Credential Management</h2>

<p>Weak passwords are the unlocked back door of your business. They are simple to exploit, simple to fix, and yet they remain one of the leading causes of business account compromise year after year. The reason is not employee laziness — it is a structural problem with how most businesses manage credentials. Fix the system, and the behavior follows.</p>

<h3>The Real Cost of Weak Passwords</h3>

<p>The annual Verizon Data Breach Investigations Report consistently shows that over 80% of hacking-related breaches involve weak, stolen, or reused passwords. In practical terms: a criminal who has a list of your employees' email addresses — easily obtained from your website or LinkedIn — can attempt to log into your business systems using password combinations that appear in publicly available breach databases. This automated attack, called credential stuffing, works because people reuse passwords across personal and work accounts. When a major consumer service suffers a breach and 10 million usernames and passwords are published on the dark web, criminals test those same credentials against business email accounts, accounting platforms, payroll systems, and banking portals.</p>

<p>For an Ohio manufacturing company or professional services firm, a single compromised employee account can expose customer records, business financials, intellectual property, and internal communications. The Ponemon Institute estimates that the average credential compromise costs a business $4.5 million when you account for all downstream consequences. That cost dwarfs what even the most comprehensive password management program costs.</p>

<h3>Password Manager ROI</h3>

<p>A business-grade password manager — tools like 1Password Teams, Bitwarden Business, or LastPass Teams — costs between $3 and $8 per user per month. For a 15-person company, that is $45 to $120 per month, or $540 to $1,440 per year. In exchange, you get a system that generates unique, complex passwords for every account, stores them securely with end-to-end encryption, shares credentials securely between team members without anyone needing to know the actual password, and immediately revokes access when an employee leaves.</p>

<p>That last feature — the ability to instantly revoke an employee's access to all shared credentials when they depart — alone justifies the cost. Businesses that use password managers also dramatically reduce the risk of password reuse, since employees no longer need to memorize passwords and therefore no longer have reason to use simple, repeated ones.</p>

<p>When deploying a password manager, provide a 20-minute demonstration to all employees showing how to install the browser extension, save new passwords, and retrieve existing ones. Adoption is the only failure mode. Password managers only protect accounts whose credentials are stored in them.</p>

<h3>Passphrases</h3>

<p>For accounts where a password manager cannot be used — such as the master password for the password manager itself, or the PIN to unlock a work laptop — teach employees to use passphrases instead of passwords. A passphrase is a string of four or more random, unrelated words: "correct-horse-battery-staple" or "purple-mountain-journal-fork." This approach, recommended by the National Institute of Standards and Technology (NIST), produces passwords that are both more memorable and more difficult to crack than traditional complex passwords like "P@ssw0rd123."</p>

<p>A 16-character passphrase made of four common words provides more security than a complex 10-character password made of letters, numbers, and symbols. The reason is mathematical: randomness and length both increase the time required to crack a password by brute force, and four random words generate more randomness than most humans manage when trying to construct a "complex" password.</p>

<h3>Multi-Factor Authentication Setup for Employees</h3>

<p>Multi-factor authentication (MFA) is the single most effective technical control for preventing account compromise. When MFA is enabled, a stolen or guessed password alone is not enough to access an account — the attacker also needs the second factor, which is typically a time-sensitive code sent to the user's phone or generated by an authenticator app.</p>

<p>Require MFA on all business-critical accounts: email, accounting software, payroll systems, banking portals, cloud storage, and any remote access tools. Start with your email platform. If criminals compromise a business email account, they can use password reset links to take over every other account associated with that email address. Protecting the email account with MFA closes that cascade attack path.</p>

<p>The most secure MFA method is an authenticator app such as Google Authenticator, Microsoft Authenticator, or Authy. SMS-based MFA (where the code is texted to a phone number) is better than no MFA but is vulnerable to SIM-swapping attacks, where criminals convince a mobile carrier to transfer a victim's phone number to a criminal-controlled SIM card. For most small business employees, authenticator app MFA is both secure and practical.</p>

<h3>Shared Account Risks</h3>

<p>Many small businesses use shared accounts — one login for QuickBooks used by three different employees, one social media account password known by everyone in marketing, one email address for customer service staffed by multiple people. Shared accounts are a security and accountability problem. When a shared account is compromised, there is no way to determine which employee's device or behavior led to the compromise. When an employee who knew the shared password leaves the company, that credential needs to be changed for all remaining users — a step that is easy to forget and often skipped.</p>

<p>Where software licensing allows, create individual accounts for each employee. Most business software platforms support role-based access, allowing you to give each employee an individual login with appropriate permissions. Where shared accounts are unavoidable, use the password manager's shared vault feature to distribute the password without employees ever knowing the actual credential — they access it through the manager, and you can revoke that access instantly without changing the password.</p>

<h3>When Employees Leave</h3>

<p>Departing employees — whether they leave voluntarily, are terminated, or are laid off — must have all system access revoked on or before their last day. This is not an accusation of bad intent. It is standard operating procedure, and it protects the departing employee as much as the business. If a former employee's still-active account is used to access or exfiltrate data after they leave, they may face legal liability even if they had nothing to do with it.</p>

<p>Create a termination checklist that includes: revoking access to all business email, accounting software, CRM, cloud storage, VPN, and any third-party tools the employee used. Change any shared passwords the employee knew. Recover company devices. Transfer ownership of any accounts the employee created in their role. This process should take less than an hour when you have a password manager and documented system access, and it should happen the same day employment ends.</p>
</article>`,
  },
  {
    chapter_number: 4,
    chapter_title: "Safe Browsing and Internet Use Policies",
    page_start: 42,
    page_end: 53,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Safe Browsing and Internet Use Policies</h2>

<p>The web browser is both an essential business tool and one of the most common vectors for malware infections, data theft, and credential compromise. Every time an employee visits a website, downloads a file, or uses a browser extension, there is a potential security interaction happening in the background. Most of the time, nothing bad occurs. But the times when something does go wrong — a malicious download, a compromised ad serving malware, a fake browser extension stealing passwords — can be catastrophic for a small business.</p>

<h3>Browser Security Settings</h3>

<p>Every major browser — Chrome, Edge, Firefox, and Safari — has built-in security settings that significantly reduce browsing risk when properly configured. Ensure employees have these settings active. In Chrome and Edge, enable Enhanced Safe Browsing (found in Settings under Privacy and Security). This setting cross-references visited URLs against Google's constantly updated list of known malicious sites and provides a warning before the page loads. Enable automatic browser updates — most browsers update automatically when closed and reopened, but employees who never close their browsers may be running outdated versions with known vulnerabilities.</p>

<p>Disable saving passwords in the browser itself. Browsers store saved passwords in a location that is relatively easy to extract with widely available malware tools. If your business uses a dedicated password manager, there is no need to also save passwords in the browser. In Chrome, go to Settings, then Autofill, then Passwords, and toggle off "Offer to save passwords." This setting should be deployed centrally if your business uses a mobile device management (MDM) solution.</p>

<h3>Avoiding Malicious Downloads</h3>

<p>The majority of malware infections on business computers arrive through downloads — either a file that was explicitly clicked and downloaded, or a "drive-by download" triggered by visiting a compromised website. Employee training should establish clear rules around downloads.</p>

<p>Software should only be downloaded from the vendor's official website or a known, reputable software distribution platform. If an employee needs new software installed on a work computer, that request should go through a defined approval process — even if that process is simply emailing the owner or IT contact. Employees should never install software because a website told them to, a pop-up claimed their computer needed an update, or a stranger sent them a file.</p>

<p>Teach employees to verify file extensions before opening anything received by email or downloaded from the web. A file named "Invoice.pdf.exe" is not a PDF — it is an executable that will try to run code when opened. Windows often hides file extensions by default, which is itself a security vulnerability. Consider configuring company computers to display all file extensions.</p>

<h3>Public WiFi Risks</h3>

<p>Public WiFi — the network at the coffee shop, the airport, the hotel lobby, the client's waiting room — is fundamentally untrusted network infrastructure. Anyone on the same public WiFi network can potentially intercept unencrypted network traffic. This risk has been partially mitigated by the widespread adoption of HTTPS, which encrypts web traffic between the browser and the server. But not all business applications use HTTPS exclusively, and attackers on public WiFi can still conduct attacks such as creating a fake access point with a convincing name — "Starbucks_Guest" — and routing all traffic through a device they control.</p>

<p>The policy for employees: when using public WiFi for any work-related task, always connect through the company VPN first. VPN (Virtual Private Network) encrypts all network traffic from the employee's device through an exit point controlled by the business, preventing anyone on the local network from intercepting business data. Chapter 8, which covers remote and hybrid work security, addresses VPN configuration in more detail. The short version: if there is no VPN available and the work involves sensitive data, use a mobile hotspot from a personal or company phone instead of public WiFi.</p>

<h3>Work vs. Personal Device Boundaries</h3>

<p>Every business needs a clear policy on what constitutes a work device, what personal use is permitted on work devices, and whether personal devices are ever permitted to access business systems. This is commonly called a BYOD (Bring Your Own Device) policy, and the absence of one is itself a security decision — usually a poor one.</p>

<p>Work devices should have consistent security configurations: full-disk encryption, a managed antivirus solution, automatic operating system updates, and ideally mobile device management (MDM) enrollment that allows the business to remotely wipe the device if it is lost or stolen. Personal devices that are also used for work — particularly email and document access — introduce security variables that are difficult to manage. An employee's personal phone that accesses business email may also have games installed by their children, outdated software the employee never updates, or no lock screen PIN.</p>

<p>At minimum, if personal devices access business systems, require those devices to have a screen lock PIN or biometric lock, a current operating system version, and the company's MDM profile installed. The MDM profile should be configured to only manage the business data container on the device, not the employee's personal data — a distinction that matters both for security and employee privacy.</p>

<h3>What Belongs on a Company Laptop</h3>

<p>Establish a clear policy on personal use of company computers. The goal is not to monitor employees or restrict their humanity — it is to maintain a controlled environment on devices that access business systems. Personal browsing on the company laptop introduces unpredictable risk. Sites the employee visits in personal time may serve ads from compromised ad networks, may deliver malicious downloads, or may expose work credentials if the employee is using the same browser session for work and personal browsing.</p>

<p>A reasonable policy: company laptops are for work use. Personal browsing, personal email, personal social media, and personal software installation should happen on personal devices. When employees need to use the internet for a personal task during work hours, they use their personal phone. This boundary protects the business network without requiring invasive monitoring of employee behavior.</p>
</article>`,
  },
  {
    chapter_number: 5,
    chapter_title: "Device Security — Laptops, Phones, and Tablets",
    page_start: 54,
    page_end: 63,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Device Security — Laptops, Phones, and Tablets</h2>

<p>Physical devices are the endpoints where your business data actually lives and moves. A stolen laptop, an unprotected phone, or a forgotten USB drive can expose months of sensitive business data in minutes. Device security is about ensuring that physical access to a device does not automatically mean access to the data it contains.</p>

<h3>Encryption</h3>

<p>Full-disk encryption ensures that if a device is stolen, the data on it cannot be read without the correct decryption key — typically the user's login password. Windows 10 and 11 Pro include BitLocker, which provides full-disk encryption. macOS includes FileVault. Both should be enabled on all company computers as a baseline requirement. Verify that encryption is actually active — it is not always on by default, particularly on older machines or consumer-grade Windows Home editions.</p>

<p>For mobile devices, encryption is enabled automatically when a PIN or biometric lock is set on both Android and iOS devices. Requiring a lock screen is therefore a prerequisite to mobile encryption.</p>

<h3>Auto-Lock and Screen Lock Requirements</h3>

<p>Every work device should automatically lock after a short period of inactivity — five minutes maximum for laptops, two minutes for mobile devices. Require a PIN, password, or biometric (fingerprint or face recognition) to unlock. An unlocked laptop left on a desk is a liability, particularly in environments with client or customer traffic, shared office spaces, or co-working arrangements common among Ohio small businesses.</p>

<h3>Remote Wipe</h3>

<p>When a device is lost or stolen, the ability to remotely erase its contents is the last line of defense between the thief and your business data. Both iOS and Android include built-in remote wipe capability through Find My iPhone and Find My Device respectively. Windows and macOS devices enrolled in an MDM solution can be wiped remotely. Establish a clear protocol: if a work device goes missing, report it immediately so the remote wipe can be initiated before the battery dies.</p>

<h3>MDM Overview</h3>

<p>Mobile Device Management (MDM) software allows a business to centrally configure, monitor, and manage all enrolled devices. Common MDM platforms used by small businesses include Microsoft Intune, Jamf, and Mosyle. MDM enables you to enforce security policies across all devices — requiring encryption, mandating screen lock, blocking certain apps, and enabling remote wipe — from a single management console. For businesses with more than five devices, the operational and security benefit of MDM typically justifies its cost.</p>

<h3>Lost Device Procedure</h3>

<p>Post a simple lost device procedure where employees can reference it quickly. Steps: (1) Report the loss immediately to the business owner or IT contact. (2) Initiate remote wipe through the MDM console or the device's native tracking service. (3) Change any passwords that were saved on the device or accessible through apps on the device. (4) Notify the business's cyber liability insurance carrier if the device contained sensitive business or customer data. (5) Document the incident for compliance purposes.</p>

<h3>Printer Security — The Forgotten Endpoint</h3>

<p>Office printers are network-connected computers that are frequently overlooked in security planning. Modern multifunction printers store copies of recently printed, scanned, and faxed documents in internal memory. They run embedded operating systems that require firmware updates. They have network ports that can be accessed by anyone on the same network.</p>

<p>Basic printer security steps: change the default administrator password on the printer's web interface, enable firmware auto-updates if available, configure the printer to require a PIN to release print jobs (preventing sensitive documents from sitting in the output tray), and ensure the printer is on a network segment that limits its access to only devices that need to print. When disposing of or replacing a printer, perform a factory reset to clear the stored document memory before the device leaves your premises.</p>
</article>`,
  },
  {
    chapter_number: 6,
    chapter_title: "Social Engineering — Phone and In-Person Attacks",
    page_start: 64,
    page_end: 73,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Social Engineering — Phone and In-Person Attacks</h2>

<p>Not every attack comes through a computer screen. Some of the most effective social engineering attacks are conducted over the phone or in person, exploiting employees' instinct to be helpful, avoid conflict, and trust apparent authority figures. Training employees to recognize these attack patterns protects your business in dimensions that no technical security tool can address.</p>

<h3>Vishing — Voice Phishing</h3>

<p>Vishing (voice phishing) involves criminals calling employees and impersonating a trusted party — IT support, the IRS, a bank representative, a software vendor, or even the business owner. The goal is to extract sensitive information or manipulate the employee into taking an action that benefits the criminal. Common vishing scenarios include a caller claiming to be Microsoft support saying the employee's computer has been flagged for malware and they need to provide remote access, or a caller claiming to be from the business's bank saying there is suspicious activity on the account and they need to verify account details.</p>

<p>The cardinal rule: your IT department, your bank, your software vendors, and the IRS will never call you out of the blue and ask for passwords, account numbers, or remote access to your computer. If you receive such a call, hang up and call the organization back using the phone number on their official website — not the number the caller provides.</p>

<h3>Pretexting</h3>

<p>Pretexting involves creating a fabricated scenario (the pretext) to manipulate an employee into providing information or access. A criminal who has researched your business may call your receptionist claiming to be a new vendor trying to confirm payment details, a job applicant who accidentally sent their application to the wrong address, or a client who needs to verify a recent invoice. Each scenario is designed to elicit specific information that the criminal can use directly or as a stepping stone to deeper access.</p>

<h3>Tailgating</h3>

<p>Tailgating (also called piggybacking) is the physical act of following an authorized person through a secured door before it closes. In businesses with key card access, an attacker who does not have a card can wait near the entrance and follow an employee in while holding a box, a coffee tray, or any prop that makes the situation feel awkward to challenge. Train employees that it is acceptable — required, in fact — to ask an unfamiliar person entering a secured area to badge in themselves. The brief discomfort of that interaction is far preferable to the alternative.</p>

<h3>The Fake Vendor Visit</h3>

<p>Criminals sometimes appear in person, claiming to be from an IT vendor, a copier maintenance company, or a building services contractor. Once inside, they may attempt to access computers, plant hardware keyloggers, or photograph documents. Establish a policy: any vendor visit must be scheduled in advance, confirmed with the vendor directly using a known contact number, and supervised by an employee at all times. Unannounced vendor visits should be turned away at the front desk and the visit verified before allowing entry.</p>

<h3>What the IT Department Will Never Ask You to Do</h3>

<p>Legitimate IT support — whether internal or an external managed service provider — will never ask an employee to provide their password over the phone or via email, install remote access software based on an unsolicited call, disable their antivirus software, bypass security warnings to complete a task, or wire money for any reason. Post this list prominently in your office. When an employee receives a request that violates any of these rules, they should immediately contact the business owner or IT contact through a separate, known communication channel to verify before taking any action.</p>
</article>`,
  },
  {
    chapter_number: 7,
    chapter_title: "Data Classification and Handling Rules",
    page_start: 74,
    page_end: 83,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Data Classification and Handling Rules</h2>

<p>Not all business data carries the same risk when it is exposed. A public press release and a customer's social security number are both data — but their breach consequences are incomparable. Data classification is the practice of categorizing information based on its sensitivity and applying consistent handling rules to each category. Businesses that classify their data handle it more carefully, store it more securely, and contain breaches more effectively when they occur.</p>

<h3>What Is Sensitive Data?</h3>

<p>For most Ohio small businesses, sensitive data falls into three broad categories. Personal information includes customer names, addresses, email addresses, phone numbers, dates of birth, social security numbers, driver's license numbers, and any other information that can identify a specific individual. Financial data includes customer payment card numbers, bank account information, transaction records, payroll data, and business financial records. Health information includes any records related to a patient's physical or mental health condition, medical history, prescriptions, or treatment — a category that carries both ethical weight and significant legal obligation under HIPAA for healthcare businesses.</p>

<h3>A Simple Classification System</h3>

<p>Implement a three-tier classification system that employees can apply without extensive training. Public data requires no special handling — marketing materials, the company website, press releases. Internal data is not for public distribution but does not require special protection beyond normal access controls — internal memos, meeting notes, operational procedures. Confidential data requires active protection — customer records, financial data, health information, contracts, and anything subject to a legal confidentiality obligation.</p>

<h3>Email Encryption</h3>

<p>Standard email is not a secure transmission channel for confidential data. Email travels across the internet through multiple servers before reaching its destination, and while most modern email providers encrypt email in transit, the message itself may sit unencrypted on servers the business does not control. For transmitting confidential data — a customer's personal information, a financial record, a sensitive contract — use encrypted email or a secure file transfer service. Many email platforms offer built-in message encryption (Microsoft Purview Message Encryption in Outlook, for example). Alternatively, use a secure file sharing service such as SharePoint, Dropbox Business, or a client portal to transmit sensitive documents rather than attaching them to email.</p>

<h3>File Storage Policies</h3>

<p>Confidential data should be stored in designated, access-controlled locations rather than scattered across individual employees' desktops, personal drives, or personal cloud accounts. Establish a business-controlled cloud storage account (Microsoft OneDrive for Business, Google Workspace, or Dropbox Business) as the official repository for company files. Configure folder permissions so that employees can only access files relevant to their role. An employee in accounts receivable should not have access to HR records, and vice versa.</p>

<h3>The Clean Desk Rule</h3>

<p>The clean desk rule requires employees to clear their desk of all sensitive documents and materials at the end of each workday. Papers containing customer information, financial records, or passwords should never be left visible overnight. Lock sensitive documents in a drawer or filing cabinet. Lock the computer before stepping away. This is particularly important in offices with cleaning crews, shared spaces, or areas accessible to clients or the public. The clean desk rule is simple, costs nothing, and eliminates an entire category of physical document exposure risk.</p>
</article>`,
  },
  {
    chapter_number: 8,
    chapter_title: "Remote and Hybrid Work Security",
    page_start: 84,
    page_end: 93,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Remote and Hybrid Work Security</h2>

<p>Remote and hybrid work has become standard for many Ohio businesses since 2020. The security implications are significant: employees working from home are operating outside the protected perimeter of the office network, on home networks you do not control, using devices that may be shared with family members. These factors do not make remote work unsafe — but they require explicit policies and employee training to manage effectively.</p>

<h3>Home Network Requirements</h3>

<p>Employees working from home should meet minimum home network security standards. Their home WiFi router should use WPA3 or WPA2 encryption (check the router settings), have a unique password that is not the factory default, and run current firmware. Home routers are frequently left on default factory passwords — a vulnerability that any neighbor or passerby can exploit. Additionally, employees should ensure that their home network's administrator interface is not accessible from the internet, a setting that is configurable in most home router administration panels.</p>

<h3>VPN Policy</h3>

<p>A VPN (Virtual Private Network) encrypts the employee's internet connection and routes their work traffic through a company-controlled exit point. For businesses handling sensitive customer data — healthcare records, payment information, legal documents — requiring VPN use for any remote work session is appropriate. For businesses with lower data sensitivity, VPN may be required only when accessing certain internal systems. Document the VPN policy clearly: when it is required, how to connect, and what to do when it is not working. An employee who cannot connect to VPN should have a process for getting help rather than proceeding without it.</p>

<h3>Video Call Security</h3>

<p>Video conferencing introduces several security considerations that are easily overlooked. Before joining a call, check what is visible in the camera frame — a whiteboard in the background with confidential information, financial documents on the desk, or a second monitor displaying sensitive data can all expose information unintentionally. Use a virtual background or a physical privacy screen when working in spaces where the background cannot be controlled. Verify the meeting link before joining, particularly for calls with external parties — phishing attacks that send fake meeting invitations are common.</p>

<h3>Shoulder Surfing</h3>

<p>Shoulder surfing — someone physically looking at your screen — is a real risk in coffee shops, libraries, co-working spaces, and anywhere else employees work in public. A physical privacy screen that attaches to the laptop and limits the viewing angle to directly in front of the screen is an inexpensive but effective countermeasure. Employees should also be conscious of phone calls in public spaces — dictating sensitive information or discussing confidential business matters in a café is an information security exposure even if there is no screen involved.</p>

<h3>The Split Tunnel Risk</h3>

<p>VPN configurations come in two types: full-tunnel (all internet traffic routes through the VPN) and split-tunnel (only company-specific traffic routes through the VPN, while general web browsing goes directly to the internet). Split tunneling is common because it reduces the bandwidth load on the company VPN — employees can stream video or browse social media without that traffic going through the corporate VPN gateway. But split tunneling also means that if an employee's device is compromised via a malicious website they visit while not on the VPN tunnel, the malware has direct access to the company traffic that is tunneled. Understand your VPN configuration and the tradeoffs involved.</p>

<h3>Children, Pets, and Sensitive Information in Video Calls</h3>

<p>When employees work from home, family members — including children — may enter the workspace during calls. Establish a simple protocol: confidential calls should be conducted from a private room with the door closed when possible. If a child or family member enters unexpectedly during a sensitive call, it is appropriate to mute the audio and pause the discussion briefly. This is not an onerous requirement — it is common courtesy extended to both the sensitivity of the information and the privacy of the call participants.</p>
</article>`,
  },
  {
    chapter_number: 9,
    chapter_title: "Third-Party and Vendor Risk",
    page_start: 94,
    page_end: 103,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Third-Party and Vendor Risk</h2>

<p>Your business's security is only as strong as the weakest security posture in your vendor ecosystem. Every software vendor, cloud service provider, payroll processor, IT support company, and cleaning service that has physical or digital access to your business represents a potential attack vector. Supply chain attacks — where criminals compromise a widely-used vendor to gain access to the vendor's many clients — have become one of the most consequential attack patterns in cybersecurity.</p>

<h3>Vendor Access Controls</h3>

<p>When vendors need access to your systems — IT support needs remote access to fix a server, a bookkeeper needs access to QuickBooks, a marketing agency needs access to your social media accounts — that access should be scoped precisely and time-limited when possible. Create separate accounts for vendor access rather than sharing employee credentials. Revoke vendor access immediately when the engagement ends. Log vendor access activities where your systems allow it. These controls ensure that if a vendor's own systems are compromised, the damage to your business is limited to the specific access you granted.</p>

<h3>Supply Chain Attack Awareness</h3>

<p>Supply chain attacks target the upstream software or services that your business relies on. When a criminal compromises a software vendor that serves thousands of small businesses, they can push malicious updates or access client data across all of those businesses simultaneously. The 2020 SolarWinds attack — where Russian state actors compromised a network monitoring software company and used that access to infiltrate thousands of government agencies and private companies — is the most famous example, but it is far from the only one.</p>

<p>For Ohio small businesses, the practical lesson from supply chain attacks is this: the security of your vendors matters. A bookkeeping software company that handles your financial data, a payroll processor that stores employee social security numbers, or an IT managed service provider that has administrative access to your entire network — all of these are potential supply chain attack vectors. You cannot audit them as rigorously as a Fortune 500 company can, but you can ask the right questions.</p>

<h3>How to Vet a Vendor's Security</h3>

<p>When evaluating a new vendor that will have access to your business data or systems, ask these questions: Do they have SOC 2 Type II certification or equivalent third-party security audit? Do they carry cyber liability insurance? What is their data breach notification policy — how quickly will they tell you if your data is compromised? Where is your data stored, and is it encrypted at rest and in transit? What access controls do their own employees have to client data? Reputable vendors will answer these questions readily. Vendors who are evasive or dismissive are telling you something important.</p>

<h3>The SolarWinds Lesson for Small Businesses</h3>

<p>The SolarWinds attack did not require any of the affected organizations to make a mistake. They trusted a vendor that had been trusted for years, applied software updates as recommended practice dictates, and were compromised through no fault of their own security practices. The lesson is not to stop using software — it is to understand that third-party risk is real, to limit the access each vendor has to only what they need, and to maintain enough internal visibility that you would notice unusual vendor activity. Reviewing access logs, monitoring for unexpected login attempts, and maintaining an up-to-date inventory of which vendors have access to which systems are the small business equivalents of the enterprise-grade supply chain controls that the SolarWinds affected organizations now wished they had had.</p>
</article>`,
  },
  {
    chapter_number: 10,
    chapter_title: "Incident Recognition and Reporting Procedures",
    page_start: 104,
    page_end: 113,
    content_html: `<article class="chapter-content">
<h2>Chapter 10: Incident Recognition and Reporting Procedures</h2>

<p>How an organization responds in the first hours after a security incident determines whether that incident becomes a minor disruption or a catastrophic breach. The most important factor in effective incident response is speed of detection — and speed of detection depends entirely on employees recognizing and reporting suspicious events without hesitation or fear.</p>

<h3>What Employees Should Report and How</h3>

<p>Employees should report any of the following: clicking a link or opening an attachment in a suspicious email, entering credentials on a website that may have been fake, receiving an unusual request to transfer money or change payment information, noticing unexpected behavior on their computer (unusual slowness, programs they did not open, files they did not create), receiving calls from people claiming to be IT support or authority figures asking for access or information, losing or having a work device stolen, or noticing that a colleague's account appears to be sending unusual messages.</p>

<p>Reporting should be simple. A designated email address, a direct phone number to the IT contact, or a posted procedure on the wall — whatever mechanism is easiest for your team to use in a stressful moment. Do not require employees to fill out a form or write a detailed description before reporting. Report first, document afterward.</p>

<h3>No-Blame Reporting Culture</h3>

<p>The no-blame principle is not just morally correct — it is operationally essential. When employees fear punishment for reporting security mistakes, they conceal those mistakes. Concealed incidents fester: malware spreads across the network, criminals drain accounts over days rather than hours, and what could have been a contained incident becomes a business-threatening breach. The IBM Security research is unambiguous on this point: organizations with cultures that penalize security mistakes have significantly longer breach containment times and significantly higher breach costs than organizations where employees feel safe reporting immediately.</p>

<p>Communicate clearly and repeatedly: the person who clicks a phishing link and immediately reports it is helping the business. The investigation that follows is not about finding fault — it is about stopping the attack and understanding what happened so it does not recur. This framing changes employee behavior more effectively than any threat of punishment could.</p>

<h3>The Cost of Delayed Reporting</h3>

<p>In ransomware attacks, the malware typically spreads across a network for days or weeks before activating and encrypting files. In business email compromise, criminals monitor a compromised email account for weeks before using it to initiate fraud. In both cases, an employee who notices something unusual and reports it immediately could trigger an investigation that catches the attack before it detonates. An employee who dismisses the same warning sign as "probably nothing" may unknowingly allow an attack to progress to the point of no recovery.</p>

<h3>Internal Escalation Path</h3>

<p>Define a clear escalation chain so employees know exactly who to contact when an incident occurs. For most small Ohio businesses, this is: (1) the employee's direct manager or the business owner, and (2) the IT contact or managed service provider. Post this information in at least two locations — near workstations and in a digital location accessible from personal phones, since company computers may be inaccessible during an active incident.</p>

<h3>What Constitutes a Notifiable Incident in Ohio</h3>

<p>Ohio Revised Code Section 1349.19 requires businesses to notify affected individuals when certain categories of personal information are compromised. The categories include Social Security numbers, driver's license numbers, financial account numbers, payment card numbers, medical information, and certain digital credentials. Notification must be made "in the most expedient time possible," with a 45-day deadline established for most scenarios. Businesses that process credit cards are also subject to PCI DSS notification requirements. If your business suffers a breach involving any of these data types, consult legal counsel immediately. The clock on your notification obligation starts from when you discover the breach, not when the breach occurred.</p>
</article>`,
  },
  {
    chapter_number: 11,
    chapter_title: "Social Media and Business Reputation",
    page_start: 114,
    page_end: 122,
    content_html: `<article class="chapter-content">
<h2>Chapter 11: Social Media and Business Reputation</h2>

<p>Social media is a legitimate and valuable business tool — and a significant security risk when used carelessly by employees. The information employees post publicly about their work lives provides raw material for social engineering attacks, competitive intelligence gathering, and reputational damage that can be difficult or impossible to reverse.</p>

<h3>What Not to Post About Work</h3>

<p>Employees should not post: photos that reveal proprietary processes, equipment, or workspaces; information about upcoming business decisions, contracts, or transactions; details about client relationships, projects, or identities (without explicit consent); information about internal business systems, software, or procedures; or complaints about specific clients, colleagues, or business partners. None of these prohibitions require employees to be secretive about where they work or what their profession is — they simply require awareness that every public post is potentially visible to criminals, competitors, and clients.</p>

<h3>Competitor and Client Confidentiality</h3>

<p>Information about clients is confidential by default, even when no non-disclosure agreement exists. Employees who post photos from a client's facility, mention a client's name in the context of a business challenge, or share details about a client's operations are exposing that client's information without consent. This has both reputational and potential legal consequences for your business.</p>

<h3>Location Tagging Risks</h3>

<p>Employees who tag their work location on social media posts provide a real-time map of when the office is staffed, when employees are traveling, and where key personnel are at any given time. This information is useful to criminals planning a physical break-in and to social engineers who want to impersonate a traveling executive. Discourage routine workplace location tagging, particularly for employees in sensitive roles.</p>

<h3>LinkedIn Oversharing</h3>

<p>LinkedIn is a legitimate professional networking tool, but it is also one of the primary research sources for spear phishing and social engineering campaigns. Attackers use LinkedIn to identify specific employees, understand their roles and responsibilities, identify who their manager is, and find mutual connections that can be exploited for pretext. Employees should review their LinkedIn profiles for information that could enable targeted attacks: highly specific role descriptions that reveal what systems they manage, posts about recent business changes, and connection lists that map the organization's internal structure.</p>

<h3>Social Engineering Through Social Media</h3>

<p>Criminals create fake LinkedIn profiles that appear to be IT vendors, recruiters, or industry peers, then use connection requests to establish a relationship before escalating to a social engineering attack. Train employees to verify the authenticity of unexpected connection requests from people claiming to be vendors or service providers, particularly if those connections are followed by requests for information, demonstrations of software, or introductions to other employees.</p>
</article>`,
  },
  {
    chapter_number: 12,
    chapter_title: "Module Assessments — Knowledge Check Quizzes",
    page_start: 123,
    page_end: 134,
    content_html: `<article class="chapter-content">
<h2>Chapter 12: Module Assessments — Knowledge Check Quizzes</h2>

<p>Regular knowledge checks reinforce learning, identify gaps, and create a documentation record of employee training completion. The following quizzes cover the three highest-priority modules: phishing recognition, password security, and data handling. Each quiz is designed to be completed in under ten minutes and can be administered on paper or verbally in a group setting.</p>

<h3>Quiz A: Phishing Recognition (10 Questions)</h3>
<ol>
<li>An email from "support@micros0ft.com" asks you to verify your Microsoft account. What is the first thing you should check? <em>(Answer: The sender's actual email address — "micros0ft" with a zero is not Microsoft's domain.)</em></li>
<li>You receive an email from your CEO asking you to wire $8,500 to a new vendor immediately, marked urgent and confidential. What should you do? <em>(Answer: Call the CEO directly at a known phone number to verify before taking any action.)</em></li>
<li>How do you check where a link in an email actually goes before clicking it? <em>(Answer: Hover over the link and check the URL displayed in the status bar or tooltip.)</em></li>
<li>An email says your package cannot be delivered and you need to click a link to reschedule. You are not expecting a package. What do you do? <em>(Answer: Delete the email. If concerned, go directly to the carrier's website to check.)</em></li>
<li>What are two signs that an email might be a phishing attempt? <em>(Answer: Any two of: urgency, generic greeting, suspicious sender address, unexpected attachment, requests for credentials or money.)</em></li>
<li>You clicked a link in an email and the page asked for your Microsoft 365 password. You entered it. What do you do immediately? <em>(Answer: Report it immediately, change the password from a different device, notify IT.)</em></li>
<li>What is Business Email Compromise? <em>(Answer: An attack where criminals impersonate an executive via email to manipulate employees into financial actions.)</em></li>
<li>Is an email safe if it came from someone you know? <em>(Answer: Not necessarily — the sender's account may be compromised, or the address may be spoofed.)</em></li>
<li>You receive an email that looks exactly like it came from your bank. It uses the bank's logo and colors. How can you verify if it is real? <em>(Answer: Do not click any links. Go directly to the bank's website by typing the address, or call the bank's published phone number.)</em></li>
<li>What should you do with a suspicious email rather than deleting it? <em>(Answer: Forward it to the designated security reporting address or show it to the IT contact.)</em></li>
</ol>

<h3>Quiz B: Password Security (10 Questions)</h3>
<ol>
<li>Why is it a problem to use the same password for your work email and a personal shopping site? <em>(Answer: If the shopping site is breached, criminals can use the same password to access your work email.)</em></li>
<li>What is a password manager and why should businesses use one? <em>(Answer: Software that generates and stores unique passwords; it eliminates password reuse and simplifies secure credential sharing.)</em></li>
<li>Which is stronger: "P@ssw0rd1!" or "purple-mountain-journal-fork"? Why? <em>(Answer: The passphrase — it is longer and more random despite seeming simpler.)</em></li>
<li>What is multi-factor authentication? <em>(Answer: A login process that requires both a password and a second verification step, such as a code from an authenticator app.)</em></li>
<li>Your company uses a shared login for the accounting software. What is a security risk of this arrangement? <em>(Answer: If the account is compromised, there is no way to identify which user's credentials were stolen.)</em></li>
<li>An employee leaves the company. What should happen to their accounts? <em>(Answer: All accounts should be disabled or deleted on their last day.)</em></li>
<li>Is it safe to use SMS text message codes for multi-factor authentication? <em>(Answer: Better than nothing, but less secure than an authenticator app due to SIM-swapping risks.)</em></li>
<li>Where should employees save their work passwords? <em>(Answer: In the company's designated password manager, not in their browser.)</em></li>
<li>What should an employee do if they forget their password? <em>(Answer: Use the password manager to retrieve it, or follow the account's official password reset process.)</em></li>
<li>How often should passwords be changed? <em>(Answer: NIST now recommends changing passwords when there is reason to believe they are compromised, rather than on a fixed schedule — but always change immediately after a suspected breach.)</em></li>
</ol>

<h3>Quiz C: Data Handling (10 Questions)</h3>
<ol>
<li>Name three types of data your business considers confidential. <em>(Answer: Customer personal information, payment data, employee records, financial records, health information — any three.)</em></li>
<li>Is it acceptable to send a customer's social security number in a regular email? <em>(Answer: No — use an encrypted email or secure file transfer service.)</em></li>
<li>What is the clean desk rule? <em>(Answer: All sensitive documents must be cleared from the desk at the end of each workday.)</em></li>
<li>An employee is done with a printed document containing customer names and addresses. What should they do with it? <em>(Answer: Shred it — do not put it in a regular trash or recycling bin.)</em></li>
<li>A colleague asks you to share the customer database so they can work on it at home on their personal computer. What should you do? <em>(Answer: Share through the company's approved cloud storage, not by emailing the file, and verify the home computer meets minimum security standards.)</em></li>
<li>What does "minimum necessary" mean in the context of data access? <em>(Answer: Employees should only access the data they specifically need to do their job.)</em></li>
<li>You accidentally send an email containing customer personal information to the wrong recipient. What do you do? <em>(Answer: Report it immediately to your manager or IT contact — this may be a notifiable incident under Ohio law.)</em></li>
<li>Where should work files be stored? <em>(Answer: In the company's designated cloud storage or server, not on personal devices or personal cloud accounts.)</em></li>
<li>What should you do before disposing of an old work computer? <em>(Answer: Have IT perform a data wipe — deleting files is not sufficient.)</em></li>
<li>A client calls asking you to email them their account records. Before you do, what should you verify? <em>(Answer: That the caller is who they claim to be, and that you are sending to a correct, secure email address.)</em></li>
</ol>

<h3>Retest Procedures and Documentation</h3>

<p>Employees who score below 70% on any quiz should complete a focused review session on the failed module and retake the quiz within two weeks. Document all quiz scores, dates, and retakes in an employee training log. This documentation serves multiple purposes: it demonstrates due diligence in the event of a breach investigation, satisfies the training documentation requirements of various regulatory frameworks, and provides data on which topics require additional reinforcement across your workforce.</p>
</article>`,
  },
  {
    chapter_number: 13,
    chapter_title: "Small Business Policy Templates",
    page_start: 135,
    page_end: 152,
    content_html: `<article class="chapter-content">
<h2>Chapter 13: Small Business Policy Templates</h2>

<p>Written security policies serve two purposes: they set clear behavioral expectations for employees, and they demonstrate organizational diligence to regulators, insurance carriers, and clients. The following templates are designed to be copied, customized with your business name and specific details, reviewed by legal counsel if warranted, and signed by employees as part of onboarding. Each template is intentionally concise — a policy that employees read and understand is more valuable than a comprehensive document no one reads.</p>

<h3>Acceptable Use Policy Template</h3>

<p><strong>[Business Name] Acceptable Use Policy</strong></p>
<p>This policy governs the use of [Business Name] information technology resources, including computers, mobile devices, network access, email, and software. All employees, contractors, and temporary workers are subject to this policy.</p>
<ul>
<li>IT resources are for legitimate business purposes. Limited personal use is acceptable when it does not interfere with work performance or violate any other provision of this policy.</li>
<li>Employees must not use company IT resources to access, transmit, or store material that is illegal, discriminatory, harassing, or unrelated to business operations.</li>
<li>Employees must not install software on company devices without prior approval from [designated approver].</li>
<li>Employees must not share their credentials with anyone, including colleagues or IT support staff.</li>
<li>Employees must report lost or stolen devices immediately to [contact name/method].</li>
<li>Company data must be stored in designated systems and must not be stored on personal devices or personal cloud accounts without authorization.</li>
<li>Employees acknowledge that company IT resources and activity conducted on them may be monitored for security purposes.</li>
</ul>
<p>Violations of this policy may result in disciplinary action up to and including termination. Signed: _________________________ Date: _____________</p>

<h3>Remote Work Security Policy Template</h3>

<p><strong>[Business Name] Remote Work Security Policy</strong></p>
<ul>
<li>Employees working remotely must use a secure, password-protected home or office network. Public WiFi requires VPN connection before accessing company systems.</li>
<li>Company devices used for remote work must have full-disk encryption enabled, automatic screen lock after [X] minutes, and current operating system and antivirus updates.</li>
<li>Remote employees must connect via [VPN service name] before accessing [specific internal systems].</li>
<li>Video calls involving confidential information must be conducted from a private location where the screen and audio cannot be observed by unauthorized individuals.</li>
<li>Family members and household guests must not use company devices.</li>
<li>Remote employees must report any suspected security incident to [contact] immediately, regardless of location.</li>
</ul>

<h3>Incident Reporting Policy Template</h3>

<p><strong>[Business Name] Security Incident Reporting Policy</strong></p>
<p>A security incident is any event that may compromise the confidentiality, integrity, or availability of company or customer data. Employees are required to report security incidents immediately. There is no penalty for reporting in good faith.</p>
<p>Report incidents to: [Name] at [phone] or [email]. If unavailable, contact [backup contact]. After hours: [emergency contact procedure].</p>
<p>Examples of reportable incidents: clicked a suspicious link; entered credentials on a potentially fake site; received an unusual request to transfer money or change payment details; lost or had a device stolen; noticed unexpected computer behavior; received an unusual request claiming to be from IT or management.</p>

<h3>BYOD Policy Template</h3>

<p><strong>[Business Name] Bring Your Own Device (BYOD) Policy</strong></p>
<ul>
<li>Personal devices that access company email, documents, or systems must have a PIN or biometric lock enabled.</li>
<li>Personal devices must run a current, supported operating system version.</li>
<li>Employees who use personal devices for work must install the company's MDM profile. This profile manages only the business data container and does not access personal data.</li>
<li>The company reserves the right to remotely wipe company data from enrolled personal devices if the device is reported lost or stolen, or if employment ends.</li>
<li>Employees accept that the BYOD enrollment grants the company no access to personal photos, messages, or applications.</li>
<li>The company assumes no responsibility for damage to personal devices or personal data loss resulting from the MDM profile or its removal.</li>
</ul>
</article>`,
  },
  {
    chapter_number: 14,
    chapter_title: "Building a Security Culture That Lasts",
    page_start: 153,
    page_end: 175,
    content_html: `<article class="chapter-content">
<h2>Chapter 14: Building a Security Culture That Lasts</h2>

<p>A one-time training event does not create a security culture. Employees who complete a training program in January and hear nothing about security for the remaining eleven months will retain little of what they learned. Security culture is built through consistent, low-friction, regular reinforcement — moments that keep awareness sharp without creating fatigue.</p>

<h3>Monthly Security Moments</h3>

<p>A security moment is a brief — five to ten minute — discussion of one specific security topic at the start of a regular team meeting. It does not require outside speakers, elaborate presentations, or dedicated sessions. It requires someone to select a topic and lead a short conversation. Topics can rotate through the content in this manual, through recent news stories about cybersecurity incidents in Ohio or nationally, or through specific scenarios relevant to your business. The regularity matters more than the depth of any individual session.</p>

<h3>Phishing Simulation Vendors</h3>

<p>Simulated phishing programs send employees realistic-looking test phishing emails and measure who clicks, who reports, and who provides credentials. When an employee clicks a simulated phishing link, they are redirected to a brief training module rather than penalized. This approach reinforces learning at the moment of maximum teachability — right when the employee has just demonstrated a vulnerability. Vendors offering small-business-accessible phishing simulation programs include KnowBe4, Proofpoint Security Awareness, and Cofense. Many start at under $15 per user per year. Some managed service providers offer phishing simulations as part of a security package.</p>

<h3>Rewarding Good Security Behavior</h3>

<p>Recognition shapes culture. When an employee correctly identifies and reports a phishing simulation, acknowledge it publicly — at a team meeting, in a group message, or through whatever recognition channel your business uses. When an employee catches a suspicious email before anyone clicks it and reports it to management, that is a business outcome worth celebrating. The goal is to make security awareness feel like a professional skill that earns respect, not a bureaucratic requirement that earns nothing.</p>

<p>Some businesses use small incentives — a gift card, a recognition award, a Friday afternoon off — for employees who demonstrate strong security awareness over a quarter. These do not need to be large to be effective. The act of recognition itself is the primary driver of behavior change.</p>

<h3>Security as Part of Onboarding</h3>

<p>New employees are at the highest risk in their first 90 days. They do not yet know the company's communication patterns well enough to recognize a BEC attack impersonating the CEO. They are eager to be helpful and may be more susceptible to requests that seem to come with authority. They have not yet internalized the specific security policies of your business.</p>

<p>Make security training a mandatory part of onboarding — completed before the new employee has access to sensitive systems. The training does not need to be exhaustive on day one, but it should cover the top phishing indicators, the password management system, the incident reporting process, and the acceptable use policy. Have new employees sign the policy templates in Chapter 13 as part of their onboarding paperwork. This establishes security as a core expectation from the first day, not an afterthought.</p>

<h3>The Annual Security Review</h3>

<p>Once per year, conduct a structured review of your security program. Assess: What incidents occurred in the past year, and what did they reveal? Which employees completed training and which did not? What phishing simulation results showed, and whether repeat clickers received additional training? Have any new systems, vendors, or business processes introduced new risks? Are your written policies still accurate and current? Is your cyber liability insurance coverage still appropriate for the size and data handling of your business?</p>

<p>The annual review does not need to be conducted by an outside consultant, though consulting a managed security service provider for a periodic assessment adds value. It can be a two-hour internal session where the business owner and any relevant managers work through these questions systematically and document the answers. That documentation becomes the evidence of due diligence if you ever face a regulatory inquiry or insurance claim.</p>

<p>Security culture in a small Ohio business is not about achieving perfection. It is about creating an environment where the probability of a damaging incident is meaningfully lower than it would be in the absence of any program, where incidents that do occur are caught early, and where the business can demonstrate — to itself, to clients, to regulators, and to insurers — that it takes its security responsibilities seriously. That is an achievable standard for any business willing to invest the time this manual describes.</p>
</article>`,
  },
];
