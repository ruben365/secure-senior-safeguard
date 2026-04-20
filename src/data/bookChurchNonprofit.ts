import type { BookChapter } from "@/config/bookCatalog";

/**
 * Church & Nonprofit Cybersecurity Guide
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 10 chapters (0–9), ~115 pages, budget-conscious, mission-focused tone
 */
export const CHURCH_NONPROFIT_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Church & Nonprofit Cybersecurity Guide</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">Protecting Your Mission, Your Donors, and Your Community Online</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>InVision Network Press · Kettering, Ohio 45440</p><p><em>For educational purposes only. This is not legal advice. Consult qualified legal and cybersecurity professionals for advice specific to your organization.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — Nonprofits and Churches Are Under Attack",
    page_start: 4,
    page_end: 17,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — Nonprofits and Churches Are Under Attack</h2>

<p>In a recent survey of nonprofit organizations, 60% reported having experienced at least one cybersecurity incident. That number is not a worst-case projection — it is the current reality of operating a mission-driven organization in a digital world. And it is rising. Cybercriminals and fraudsters have identified nonprofits, faith communities, and charitable organizations as high-value, low-resistance targets, and the evidence shows that they are correct.</p>

<p>Ohio has more than 50,000 registered nonprofit organizations. They range from major healthcare systems and universities to neighborhood mutual aid groups, food pantries, neighborhood associations, and faith communities of every size and tradition. Together, they employ hundreds of thousands of Ohioans, serve millions more, and steward enormous amounts of charitable funding. They also, in many cases, operate with minimal technology infrastructure, volunteer staff managing sensitive systems, and a culture of trust that, when exploited, can cause devastating financial and reputational harm.</p>

<p>This guide is written for the people running those organizations. It is written for the executive director who is also the de facto IT person. For the church treasurer who manages QuickBooks and the donor database and the online giving platform. For the volunteer coordinator who cannot remember which email address is associated with the organization's Facebook page. For the board member who has been meaning to ask whether the organization has cyber insurance. This guide is for you, and it was written with your resource constraints in mind.</p>

<h3>Why Faith Communities and Nonprofits Are Targeted</h3>

<p>Trust is the most valuable asset a faith community or nonprofit organization holds. Donors give because they trust you. Community members come to you in crisis because they trust you. Volunteers give their time and skills because they trust that the mission is real and the organization is good. That trust, which took years to build, is also what makes your organization attractive to criminals who want to exploit it.</p>

<p>Cybercriminals targeting nonprofits are not necessarily ideologically motivated. They are operationally motivated: they have identified a category of organizations that tend to have several characteristics that make them easier to exploit than commercial businesses. Those characteristics include:</p>

<ul>
  <li>Accessible leadership contact information, often publicly listed for community accountability</li>
  <li>Volunteer staff who may not have IT security training and who change frequently</li>
  <li>Outdated software and hardware due to budget constraints</li>
  <li>Culture of trust that makes people less likely to question urgent requests from leadership</li>
  <li>Donor databases containing financial information that has value on criminal markets</li>
  <li>Online payment infrastructure that may not meet current security standards</li>
</ul>

<p>None of these characteristics are failures of your organization. They are the natural result of prioritizing mission delivery over administrative infrastructure, which is exactly what funders and community members expect from a nonprofit. But they create vulnerabilities that require specific attention, and awareness of the vulnerabilities is the beginning of addressing them.</p>

<h3>The Financial Stakes</h3>

<p>A cybersecurity incident at a nonprofit can cause financial harm in multiple ways. Direct theft through fraudulent wire transfers is the most obvious, and it happens regularly — the FBI's Internet Crime Complaint Center has documented millions of dollars in losses from business email compromise fraud targeting nonprofit organizations. But the financial impact of a breach extends beyond direct theft.</p>

<p>Donor trust is the foundation of your revenue model. A high-profile data breach that exposes donor information damages the confidence that donors have in your stewardship of their gifts. Even a single incident, handled poorly, can affect giving for years. A 2022 study found that nonprofits that experienced a publicized data breach saw a measurable decline in donor retention in the years that followed.</p>

<p>Ransomware incidents can take an organization's systems offline entirely, disrupting service delivery, preventing staff from accessing donor records, and potentially exposing sensitive client data. Restoring from a ransomware attack without a proper backup can cost tens of thousands of dollars in professional services — money that most nonprofits do not have in reserve.</p>

<h3>What This Guide Costs to Implement</h3>

<p>Here is the most important practical point of this entire introduction: most of what this guide recommends costs nothing or very little to implement. Cybersecurity for nonprofits is not primarily a technology budget problem. It is a knowledge and practice problem. The most impactful changes you can make in your organization — enabling two-factor authentication, training your team to recognize phishing, establishing a backup routine, reviewing who has access to your systems — require time and attention, not budget.</p>

<p>Where this guide recommends tools or services that have costs, we will note free alternatives, nonprofit discount programs, and prioritization guidance so you can address the highest-risk areas first within whatever resources you have. Ohio nonprofits also have access to specific resources — including the Ohio Cyber Reserve — that are not available in all states.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "Email Security for Faith Communities and Nonprofits",
    page_start: 18,
    page_end: 30,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: Email Security for Faith Communities and Nonprofits</h2>

<p>Email is the most common vector for cyberattacks against nonprofits. It is where business email compromise begins, where phishing attacks are delivered, and where fraudulent wire transfer requests originate. Getting email security right is the single highest-impact investment of time and attention your organization can make.</p>

<h3>Business Email Compromise: The Most Costly Fraud</h3>

<p>Business email compromise (BEC) is exactly what it sounds like: criminals compromise or impersonate a business or organizational email account to initiate fraudulent financial transactions. For nonprofits, the most common pattern involves an attacker who has either gained access to a leadership email account or who creates a convincing impersonation of one, then sends a message to the finance staff or treasurer requesting an urgent wire transfer.</p>

<p>The message typically comes from — or appears to come from — the executive director, the pastor, the board chair, or another authority figure. It is marked urgent. It requests a transfer or purchase that needs to happen before the sender is available to discuss it by phone. It provides wire transfer instructions or asks for gift card codes. It warns against contacting the sender through normal channels due to an emergency or travel situation.</p>

<p>These attacks have succeeded against organizations of every size. An Ohio faith community in the Dayton area lost more than $80,000 in a single BEC incident where a volunteer bookkeeper received a convincing email appearing to come from the senior pastor. The email arrived on a Friday afternoon with a request that seemed to fit a situation the pastor had mentioned earlier that week. By Monday, when the fraud was discovered, the funds were unrecoverable.</p>

<h3>Email Authentication: SPF, DKIM, and DMARC</h3>

<p>The technical foundation of email impersonation protection is three standards that work together: SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC (Domain-based Message Authentication, Reporting, and Conformance). Configuring all three for your organization's email domain significantly reduces the ability of criminals to send emails that appear to come from your domain.</p>

<p>Setting up these records requires access to your domain's DNS settings and some technical knowledge. If your organization has an IT volunteer or consultant, this should be the first task on their list. If you use Microsoft 365 or Google Workspace, both platforms provide guidance for configuring these records and make the process relatively straightforward. The CISA free resource at cisa.gov provides nonprofit-specific guidance on email authentication.</p>

<h3>Free Email Security for Nonprofits</h3>

<p>Two major providers offer significantly discounted or free email platforms for qualifying nonprofits:</p>
<ul>
  <li><strong>Microsoft 365 Nonprofit:</strong> Qualifying nonprofits can receive Microsoft 365 Business Basic (including Exchange email) free for up to 10 users, and significantly discounted rates for additional users and higher tiers. Apply at microsoft.com/en-us/nonprofits.</li>
  <li><strong>Google Workspace for Nonprofits:</strong> Qualifying organizations receive Google Workspace for Nonprofits (including Gmail and the full Google suite) free through the Google for Nonprofits program. Apply at google.com/nonprofits.</li>
</ul>

<p>Both platforms provide substantially better security infrastructure than free consumer email services like Gmail personal accounts or Yahoo Mail. If your organization is using personal email addresses for organizational business, migrating to one of these platforms is a priority change.</p>

<h3>The Verification Protocol</h3>

<p>The simplest and most effective protection against wire transfer fraud is a verification protocol: a policy that any wire transfer or large financial transaction requested by email must be confirmed by phone before processing — using a phone number from your organization's own records, not from the email itself. This policy alone would have prevented the vast majority of documented BEC losses in nonprofit organizations. Write it down. Train your finance staff. Enforce it consistently, even when the email seems obviously legitimate.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Protecting Donor Data and Financial Records",
    page_start: 31,
    page_end: 43,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Protecting Donor Data and Financial Records</h2>

<p>Your donor database is not just an operational asset — it is a trust relationship rendered in data. Donors provide their names, addresses, email addresses, phone numbers, and giving histories with the expectation that your organization will treat that information with care. A breach that exposes donor data is not just a legal liability. It is a betrayal of the relationship that makes your work possible. This chapter covers what data you hold, why it matters, and how to protect it appropriately.</p>

<h3>What Donor Data You Hold and Why It Has Value</h3>

<p>Most nonprofit CRMs (Constituent Relationship Management systems) and donor databases hold more information than organizations realize: names, home addresses, email addresses, phone numbers, giving history, wealth screening data, relationship notes, and in some cases financial account information if donors set up automatic recurring gifts. On criminal markets, this kind of profile data has value. It enables targeted phishing attacks, identity theft, and social engineering against the donors themselves.</p>

<p>Review what your database actually contains. If you hold credit card numbers or bank account information, those require the highest level of security and are subject to Payment Card Industry (PCI) Data Security Standards. If you hold only names and email addresses, your security requirements are different. Knowing what you have is the first step toward protecting it appropriately.</p>

<h3>PCI DSS for Online Donations</h3>

<p>Any organization that accepts credit card payments — including through an online giving platform — must comply with PCI DSS, the Payment Card Industry Data Security Standard. The good news for small nonprofits is that using a reputable third-party giving platform (Pushpay, Tithe.ly, Planning Center Giving, or others) significantly reduces your PCI compliance burden because the platform handles card processing. You are still responsible for the security of your website and the connection to your giving page, but you do not need to store card numbers yourself.</p>

<p>Never accept credit card information via email. Never store card numbers in a spreadsheet. If a donor offers to provide card information by phone, use your giving platform's virtual terminal rather than writing it down.</p>

<h3>Encryption for Donor Databases</h3>

<p>Donor databases stored on local computers should be on devices with full-disk encryption enabled. On Windows, BitLocker provides this. On Mac, FileVault provides it. Both are built into the operating system and free. This ensures that if a device is lost or stolen, the database it contains is not readable without the encryption key. Cloud-based CRM platforms like Salesforce Nonprofit, Little Green Light, or Bloomerang provide encryption as part of their service.</p>

<h3>Access Controls and Volunteer Offboarding</h3>

<p>Who has access to your donor database right now? Many nonprofits, when asked this question, discover that the answer is more people than they realized — including former volunteers and staff members whose access was never revoked. Conduct an access audit: list every person with a login to your donor database, your email platform, your giving platform, your social media accounts, and your financial software. Remove access for anyone who is no longer actively serving in a role that requires it.</p>

<p>Establish an offboarding checklist for volunteers and staff that includes revoking access to all organizational systems. This does not require distrust of the person leaving. It is a standard practice that protects both the organization and the individual.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Secure Donation Processing and Website Safety",
    page_start: 44,
    page_end: 54,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Secure Donation Processing and Website Safety</h2>

<p>Your organization's website and donation processing infrastructure are public-facing systems that require specific security attention. Donors make trust judgments based on what they see when they visit your site. A site that appears insecure or unprofessional affects giving. A site that actually is insecure can expose donors and your organization to real harm.</p>

<h3>HTTPS and What It Actually Means</h3>

<p>Every nonprofit website should use HTTPS — the secure version of HTTP. You can tell whether a site uses HTTPS by the padlock icon in the browser address bar and the "https://" prefix in the URL. HTTPS encrypts data transmitted between the visitor's browser and your website, protecting form submissions, login credentials, and donation information from interception. Most web hosting platforms now provide free SSL certificates (the technology behind HTTPS) through Let's Encrypt. If your website still shows "http://" without the "s," contact your web host immediately — this is a solvable problem that should be addressed urgently.</p>

<h3>Online Giving Platforms: What to Look For</h3>

<p>Dedicated online giving platforms for faith communities and nonprofits include Pushpay, Tithe.ly, Planning Center Giving, Donorbox, and PayPal Giving Fund, among others. When evaluating a platform, look for:</p>
<ul>
  <li>PCI DSS Level 1 compliance — the highest standard for payment security</li>
  <li>Clear fee structures with no hidden charges</li>
  <li>Data portability — you should be able to export your donor data at any time</li>
  <li>Two-factor authentication for administrator access</li>
  <li>A transparent privacy policy regarding how donor data is used</li>
</ul>

<h3>The Fake Donation Page</h3>

<p>Fraudsters have created fake donation pages impersonating real nonprofits and faith communities, particularly following high-profile events or disasters when charitable giving surges. These pages collect donations that never reach the intended organization. Monitor for impersonators by periodically searching your organization's name combined with "donate" to see what appears in search results. Report fake pages to the platform hosting them and to the FTC at reportfraud.ftc.gov. The Ohio Attorney General's Charitable Law Section also handles complaints about fraudulent charitable solicitations.</p>

<h3>PayPal Giving Fund vs. PayPal for Business</h3>

<p>Many small nonprofits use PayPal. There are two very different PayPal options: PayPal Giving Fund is a registered 501(c)(3) that distributes donations to enrolled nonprofits. Donations through PayPal Giving Fund are tax-deductible and carry no processing fees. PayPal for Business is a standard business payment account that is not set up for charitable donations and does not generate the same donor tax receipts. Make sure your organization is using the right option, and that donors understand what they are receiving as a receipt.</p>

<h3>Cryptocurrency Donations: Risks and Considerations</h3>

<p>Some donors wish to contribute cryptocurrency. Organizations that accept crypto donations should use a reputable crypto donation platform like The Giving Block, which handles the tax documentation and conversion to dollars. Accepting cryptocurrency directly into an organizational wallet introduces significant complexity and security requirements that most small nonprofits are not equipped to manage safely. If you accept crypto donations, have a clear policy for how quickly they will be converted to fiat currency, and document all transactions carefully for IRS reporting purposes.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Staff and Volunteer Training on a Nonprofit Budget",
    page_start: 55,
    page_end: 64,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Staff and Volunteer Training on a Nonprofit Budget</h2>

<p>Cybersecurity is fundamentally a human problem. The most sophisticated technical security controls can be defeated by a single person clicking a phishing link or sharing a password. Training your team — paid staff and volunteers alike — is not an optional add-on to your security program. It is the program's most important component. And it does not have to cost anything.</p>

<h3>Free Training Resources</h3>

<p>Several high-quality cybersecurity training resources are available at no cost:</p>
<ul>
  <li><strong>CISA (Cybersecurity and Infrastructure Security Agency):</strong> cisa.gov offers free resources specifically developed for small organizations, including a Cyber Essentials Toolkit designed for nonprofits and small businesses. Their phishing guidance and training materials are clear, practical, and free to use.</li>
  <li><strong>Google's Phishing Quiz:</strong> phishingquiz.withgoogle.com provides an interactive exercise that helps participants recognize phishing emails. It takes about ten minutes and is appropriate for any skill level.</li>
  <li><strong>KnowBe4 Free Tools:</strong> KnowBe4, a cybersecurity training company, offers free phishing simulation tools and training modules that nonprofits can use without cost. Their Kevin Mitnick Security Awareness Training modules are available in a free tier.</li>
  <li><strong>SANS Institute Ouch! Newsletter:</strong> A free monthly newsletter on security topics written for non-technical users. Subscribing your staff provides regular, low-effort security education.</li>
</ul>

<h3>Training Volunteers Who Aren't Tech-Savvy</h3>

<p>Volunteer-heavy organizations face a particular challenge: frequent turnover, varying technical backgrounds, and limited time to dedicate to training. The solution is to focus training on a small number of high-impact behaviors rather than comprehensive security education. Every volunteer who has access to organizational systems should be able to answer yes to three questions: Do I know what a phishing email looks like? Do I use a strong, unique password for this account? Do I know who to contact if something seems wrong?</p>

<p>Create a one-page security guide for your organization that covers these basics specifically for your systems. Laminate it. Keep a copy at the check-in desk, in the office, wherever volunteers work. Update it annually.</p>

<h3>The 30-Minute Annual Training Minimum</h3>

<p>Many liability insurance policies and best practice frameworks for nonprofits recommend annual cybersecurity training for all staff and volunteers with system access. Thirty minutes per year is not a high bar, and the Google Phishing Quiz plus a brief organizational overview can meet it. Document that training happened — keep a sign-in sheet or training completion record. This documentation matters if you ever need to demonstrate reasonable care in a legal or insurance context.</p>

<h3>Making Training Part of Onboarding</h3>

<p>The moment a new volunteer or staff member receives access to your organizational systems is the best moment to walk them through your security expectations. Create a five-minute onboarding security briefing: here is how we handle suspicious emails, here is our password policy, here is who to call if something goes wrong. Add it to your onboarding checklist alongside the W-9, the parking instructions, and the tour of the coffee maker. Systems access should not be granted before the briefing is complete.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "Ransomware — What Happens When Your Organization Is Hit",
    page_start: 65,
    page_end: 75,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Ransomware — What Happens When Your Organization Is Hit</h2>

<p>Ransomware is a category of malware that encrypts the files on an infected computer and demands payment — typically in cryptocurrency — for the decryption key. Hospitals, school districts, city governments, and nonprofits have all been victims. Understanding how it works and how to prepare for it is no longer optional for any organization that depends on digital systems.</p>

<h3>The Ransomware Lifecycle</h3>

<p>Ransomware typically enters an organization through a phishing email containing a malicious attachment or link, through an unpatched vulnerability in internet-facing software, or through compromised remote access credentials. Once it gains a foothold in the network, it may sit dormant for days or weeks, spreading quietly to additional systems and deleting backup copies it can find. Then it activates: files are encrypted, and a ransom note appears demanding payment in exchange for restoration.</p>

<p>For a nonprofit, this means that the donor database, the financial records, the program files, the emails, the grant applications — everything stored on infected systems — may become inaccessible overnight. If you do not have current, off-network backups, your choice is to pay or to lose the data permanently.</p>

<h3>Why Nonprofits Are Targets</h3>

<p>Ransomware operators are rational actors making targeting decisions based on likelihood of payment and ability to pay. Nonprofits are attractive targets because they often hold sensitive data they cannot afford to lose (donor records, client files, healthcare information for social service agencies), they may have outdated software due to budget constraints, and they may be more likely than commercial businesses to have inadequate backups. The willingness to pay to restore donor records and program data has been documented in multiple nonprofit ransomware cases.</p>

<h3>The 3-2-1 Backup Rule</h3>

<p>The most effective defense against ransomware is a backup you can restore from. The 3-2-1 backup rule provides a simple framework:</p>
<ul>
  <li><strong>3</strong> copies of your data (the original plus two backups)</li>
  <li><strong>2</strong> different storage media (for example, an external hard drive and a cloud service)</li>
  <li><strong>1</strong> copy offsite or in the cloud, isolated from your network</li>
</ul>

<p>The offsite or cloud copy is critical: ransomware routinely deletes or encrypts backup files it can reach through your network. A backup stored in Google Drive or OneDrive that is connected to an infected computer can be compromised. Use a backup service that maintains versioned history that you can restore from a point before the infection. Backblaze (free for nonprofits through some programs) and Veeam (free for nonprofits) are commonly recommended options.</p>

<h3>Incident Response for Nonprofits With No IT Staff</h3>

<p>If you believe your organization has been hit with ransomware:</p>
<ol>
  <li>Disconnect affected computers from the network immediately — unplug ethernet cables, turn off Wi-Fi.</li>
  <li>Do not pay the ransom without consulting law enforcement and cybersecurity professionals.</li>
  <li>Report the incident to the FBI's IC3 at ic3.gov and CISA at cisa.gov/report.</li>
  <li>Contact the Ohio Cyber Reserve (see Chapter 9) for free incident response assistance available to Ohio nonprofits.</li>
  <li>Contact your cyber insurance provider if you have a policy.</li>
</ol>

<p>The FBI's consistent advice is not to pay ransoms, as payment does not guarantee data recovery, encourages future attacks, and may violate sanctions laws if the attackers are on a sanctions list. However, the FBI also acknowledges that individual organizations sometimes face impossible choices. The most important thing is to report and get professional guidance before paying.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Social Media Safety for Nonprofits and Churches",
    page_start: 76,
    page_end: 86,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Social Media Safety for Nonprofits and Churches</h2>

<p>Social media is essential for nonprofit and faith community communications. It is also a meaningful security liability if managed carelessly. Organizational social accounts that are compromised can be used to defraud your community, damage your reputation, and spread harmful content to your followers. Managing these risks does not require abandoning social media — it requires managing it intentionally.</p>

<h3>Account Compromise: How It Happens</h3>

<p>Organizational social media accounts are compromised through several routes: weak or reused passwords, phishing attacks that capture administrator credentials, access by former volunteers whose credentials were never revoked, and in some cases by vulnerabilities in third-party social media management tools. A compromised account can be used to post fraudulent donation requests, send malicious links to followers, or in extreme cases to permanently destroy the account and its history.</p>

<h3>The Password-Sharing Problem</h3>

<p>Many small nonprofits and faith communities manage social media accounts by sharing a single username and password among multiple volunteers. This approach is understandable given limited resources, but it creates multiple problems: you cannot track which person made a specific post, you cannot selectively revoke access for one person without changing the password for everyone, and a single person's poor security practices compromise the entire account.</p>

<p>Most major social platforms offer ways to grant multiple people administrative access without sharing the main account password. Facebook and Instagram allow Page roles so that multiple individual accounts can manage a page. Use these platform features instead of sharing credentials. When a volunteer leaves, remove their individual access — you do not need to change a shared password that doesn't exist.</p>

<h3>Two-Factor Authentication for Shared Accounts</h3>

<p>Enable two-factor authentication on all organizational social media accounts. Where platforms require a single phone number for 2FA codes, consider using a Google Voice number or similar virtual phone number that can be accessed by multiple authorized administrators, rather than a personal cell number that belongs to one volunteer who might leave.</p>

<h3>What to Post — and What Not to Post</h3>

<p>Organizational social media inadvertently reveals information that can be used against the organization. Photos of events that show building layouts, security features, or expensive equipment can inform burglary targeting. Staff and volunteer schedules posted publicly reveal when the building is occupied or empty. Photos of children require careful privacy consideration and parental consent documentation.</p>

<p>Establish a social media policy — it need not be long — that addresses: who is authorized to post on behalf of the organization, what types of content require approval before posting, how to handle photographs of minors, and what information about facilities and schedules should not be publicly shared.</p>

<h3>Responding to a Hacked Account</h3>

<p>If your organizational account is compromised, report it immediately to the platform through their official help center. Change all administrator passwords. Review and revoke access for all accounts connected to the page. Report the incident to your followers through alternative channels (email, website) so they know to disregard posts from the compromised account. Document everything you observe the attacker posting or doing — this documentation may be needed for a law enforcement report.</p>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "Legal Compliance and Reporting Obligations",
    page_start: 87,
    page_end: 98,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Legal Compliance and Reporting Obligations</h2>

<p>Cybersecurity for nonprofits is not only a best practice — it is in several cases a legal obligation. Ohio nonprofit organizations that experience certain types of data breaches have specific reporting requirements. Faith communities with youth programs have additional privacy obligations. And any organization that holds donor or client data has ethical and, increasingly, legal duties of care. This chapter provides an overview of the key legal considerations — not a substitute for legal advice, but a map of the landscape.</p>

<h3>Ohio Data Breach Notification Requirements</h3>

<p>Ohio Revised Code Section 1347 requires organizations that maintain personal information about Ohio residents to notify those residents if their information is compromised in a security breach. Personal information under Ohio law includes names combined with Social Security numbers, financial account numbers combined with access credentials, or medical information. The notification must be made in the "most expedient time possible" after discovery of the breach.</p>

<p>Ohio also provides a Safe Harbor provision: organizations that implement and maintain a written cybersecurity program that meets certain baseline standards may have reduced liability in the event of a breach. This is a meaningful incentive to formalize your security practices, even at a basic level. Consult the Ohio AG's office or an attorney familiar with Ohio data privacy law for specifics relevant to your organization.</p>

<h3>Donor Privacy Obligations</h3>

<p>While the United States does not have a comprehensive federal donor privacy law equivalent to Europe's GDPR, many state laws and sector-specific regulations create donor privacy obligations. Your organization's own privacy policy — which you should have and should honor — creates contractual obligations to donors. The Association of Fundraising Professionals publishes a Donor Bill of Rights that represents the ethical standard for donor privacy in the sector.</p>

<h3>COPPA for Faith-Based Youth Programs</h3>

<p>If your faith community or nonprofit operates programs for children under 13 and collects information from those children online — including through apps, websites, or online registration forms — you may be subject to the Children's Online Privacy Protection Act (COPPA). COPPA requires verifiable parental consent before collecting information from children under 13. Violations carry significant FTC penalties. If you operate youth programs with any online component, review your COPPA obligations carefully.</p>

<h3>Cyber Insurance for Nonprofits</h3>

<p>Cyber insurance is increasingly available and affordable for nonprofits, and it has become a meaningful tool for managing the financial risk of a cybersecurity incident. Policies typically cover incident response costs, notification expenses, business interruption losses, and sometimes ransom payments. Many general liability policies for nonprofits do not cover cybersecurity incidents — review your existing coverage carefully and speak with an insurance broker who has nonprofit experience. Some nonprofit umbrella organizations negotiate group cyber insurance rates for their members.</p>

<h3>Ohio Attorney General Charitable Law Section</h3>

<p>The Ohio Attorney General's Charitable Law Section has oversight of charitable organizations in Ohio. They investigate charity fraud, maintain records of registered charities, and provide resources for donors checking whether a charity is legitimate. If your organization has been impersonated by a fraudulent charity, or if you have concerns about the practices of another charitable organization, the Charitable Law Section at ohioattorneygeneral.gov is the appropriate reporting channel.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Building Cyber Resilience on a Nonprofit Budget",
    page_start: 99,
    page_end: 115,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Building Cyber Resilience on a Nonprofit Budget</h2>

<p>This final chapter is a practical consolidation: a resource map and implementation guide for Ohio nonprofits and faith communities that are ready to act but are working within tight budget constraints. The good news is real — the most important improvements you can make are free, and an extensive ecosystem of nonprofit technology support exists to help organizations like yours.</p>

<h3>The $0 Security Plan</h3>

<p>Before spending a single dollar on security tools, complete these steps — all free:</p>
<ol>
  <li>Enable two-factor authentication on every organizational account: email, social media, banking, donor database, cloud storage.</li>
  <li>Conduct an access audit: list every person with access to organizational systems and remove anyone whose role no longer requires it.</li>
  <li>Create a simple written policy for wire transfers: all transfers over a set threshold require phone verification.</li>
  <li>Run a 30-minute training session using free CISA materials and the Google Phishing Quiz.</li>
  <li>Set up the 3-2-1 backup using free cloud storage (within size limits) for your offsite copy.</li>
  <li>Verify your website uses HTTPS — if not, contact your web host today.</li>
  <li>Create an incident response contact list: IT support, cyber insurance, FBI IC3, Ohio Cyber Reserve.</li>
</ol>

<h3>CISA Free Resources for Nonprofits</h3>

<p>The Cybersecurity and Infrastructure Security Agency at cisa.gov offers free tools specifically designed for small and under-resourced organizations:</p>
<ul>
  <li>Cyber Essentials Toolkit: a step-by-step guide for small organizations building a basic security program</li>
  <li>Ransomware readiness assessment</li>
  <li>Phishing guidance and email security resources</li>
  <li>Free cybersecurity assessments for critical infrastructure sectors, including healthcare and education nonprofits</li>
</ul>

<h3>TechSoup: Discounted Technology for Nonprofits</h3>

<p>TechSoup (techsoup.org) is a nonprofit technology marketplace that provides donated and heavily discounted software and hardware to qualifying organizations. Through TechSoup, nonprofits can access Microsoft 365, antivirus software, project management tools, and security products at fractions of commercial cost. Ohio nonprofits with 501(c)(3) status qualify for most TechSoup programs. Register once and you gain access to ongoing offers from technology companies that partner with TechSoup to serve the nonprofit sector.</p>

<h3>Google Workspace for Nonprofits and Microsoft 365 Nonprofit</h3>

<p>As noted in Chapter 2, both Google and Microsoft offer free or deeply discounted productivity and communication platforms for qualifying nonprofits. These platforms include enterprise-grade security features — email authentication, advanced threat protection, data loss prevention — that would cost tens of thousands of dollars annually at commercial rates. If your organization is not already using one of these platforms, applying is one of the highest-return investments of 30 minutes you can make.</p>

<h3>The Volunteer CISO Concept</h3>

<p>Many technology professionals are looking for meaningful volunteer opportunities where their skills make a real difference. A volunteer Chief Information Security Officer — a technology professional who serves your organization in an advisory capacity — can provide guidance, conduct informal assessments, review vendor choices, and serve as your on-call technical resource for security questions. Organizations like Catchafire (catchafire.org) and VolunteerMatch (volunteermatch.org) can help connect your organization with skilled technology volunteers.</p>

<h3>Ohio Cyber Reserve</h3>

<p>Ohio is one of a small number of states with a formal Cyber Reserve — a volunteer corps of cybersecurity professionals who can be deployed to assist Ohio organizations experiencing cybersecurity incidents. The Ohio Cyber Reserve, established in 2019 and housed within the Ohio National Guard, provides incident response assistance to Ohio public sector entities and, through specific programs, to critical nonprofits. If your organization experiences a ransomware attack or significant breach and you have no IT staff, the Ohio Cyber Reserve is a resource you should know about. Contact information is available through the Ohio Department of Administrative Services at das.ohio.gov.</p>

<h3>A Final Word on Mission and Security</h3>

<p>Security is not the opposite of mission. A nonprofit or faith community that loses donor trust because of a preventable breach, or that cannot deliver services because its systems are locked by ransomware, has had its mission interrupted — not protected — by neglecting security. The organizations that serve Ohio communities most effectively are the ones that protect their operations with the same seriousness they bring to their programs. The resources in this chapter make that possible at every budget level. Start with the $0 plan today.</p>
</article>`,
  },
];
