import type { BookChapter } from "@/config/bookCatalog";

/** Full content for the Small Business Cybersecurity Playbook (~170 pages) */
export const BUSINESS_PLAYBOOK_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content">
    <h2>Small Business Cybersecurity Playbook</h2>

    <p><em>A Practical Guide to Protecting Your Business, Your Customers, and Your Bottom Line</em></p>

    <p><strong>By the InVision Network Education Team</strong></p>

    <p>InVision Network Press<br />
    Dayton / Kettering, Ohio<br />
    2026</p>

    <hr />

    <h3>Copyright Notice</h3>

    <p>Copyright &copy; 2026 InVision Network Press. All rights reserved. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.</p>

    <p>For permission requests, write to the publisher at:</p>
    <p>InVision Network Press<br />
    Attn: Permissions Department<br />
    Kettering, Ohio 45429</p>

    <p>First Edition, 2026<br />
    ISBN: 978-0-000000-00-0 (print)<br />
    ISBN: 978-0-000000-01-7 (digital)</p>

    <p>Printed in the United States of America.</p>

    <p><strong>Disclaimer:</strong> The information in this book is provided for educational purposes only. While every effort has been made to ensure the accuracy of the content, cybersecurity threats and regulations evolve continuously. Readers should consult qualified cybersecurity professionals and legal counsel for advice specific to their business. The authors and publisher disclaim any liability arising directly or indirectly from the use of information contained in this book.</p>

    <p><strong>Note to Readers:</strong> This book was written specifically for Ohio businesses with five to fifty employees — the owners, managers, and operators who run the backbone of the state's economy. The examples, references, and resources are tailored for your context. If you run a business in Dayton, Columbus, Akron, Cleveland, Cincinnati, Toledo, or any of the cities and towns in between, this book was written with you in mind.</p>
    </article>`,
  },
  {
    chapter_number: 1,
    chapter_title: "Why Small Businesses Are Now Primary Targets",
    page_start: 4,
    page_end: 14,
    content_html: `<article class="chapter-content">
    <h2>Chapter 1: Why Small Businesses Are Now Primary Targets</h2>

    <p>If you have ever told yourself that your business is too small for hackers to care about, you are not alone. That belief is the single most dangerous misconception in small business security — and it has cost Ohio businesses tens of millions of dollars over the past decade. The truth is harsher and more actionable: small businesses are not accidentally caught in the crossfire of cyberattacks aimed at bigger targets. They are the target.</p>

    <h3>The Data That Should Change Your Mind</h3>

    <p>According to the Verizon Data Breach Investigations Report, 43% of all cyberattacks are directed at small businesses. That figure has been remarkably consistent for years, and it reflects a deliberate strategic choice by criminal organizations. Large enterprises — Fortune 500 companies, major government agencies, big hospital systems — have invested heavily in security infrastructure. They have dedicated security operations centers, teams of analysts watching network traffic around the clock, and incident response protocols refined through years of experience. Attacking them is like trying to rob a bank with armed guards in every corner.</p>

    <p>Your business, on the other hand, may have a part-time IT person, a managed service provider you call when things break, or no dedicated security staff at all. You have the same valuable assets — customer payment data, banking credentials, employee personal information, vendor relationships that touch larger supply chains — but a fraction of the defenses. From a criminal's perspective, you are the unlocked car in a parking lot full of cars with steering wheel locks and alarms.</p>

    <p>The economics of cybercrime make this even clearer. Ransomware gangs and business email compromise (BEC) fraudsters do not choose targets based on prestige. They choose targets based on return on investment. A single successful phishing attack against a small business owner with QuickBooks access, a business checking account, and a list of customer credit cards can net a criminal $50,000 to $200,000 with a few days of work. Scale that across hundreds of simultaneous attacks against small businesses across the country, and you start to understand why criminal groups have industrialized this process.</p>

    <h3>Ohio's Economic Backbone Is the Attack Surface</h3>

    <p>Ohio has approximately 950,000 small businesses employing roughly half of the state's private workforce. These businesses span manufacturing in the Mahoning Valley, professional services firms in Columbus and Cleveland, healthcare practices across Dayton and Cincinnati, retail corridors in Toledo and Youngstown, and agricultural operations throughout the rural counties. They are the reason Ohio's economy works.</p>

    <p>Each sector carries its own specific risks. Manufacturing companies in Ohio often operate as Tier 2 or Tier 3 suppliers for larger automotive, aerospace, and defense manufacturers. That means they have electronic data interchange (EDI) connections, vendor portal access, and sometimes remote access into their customers' systems. A breach of a small Stark County machining shop could provide a foothold into a much larger supply chain — and sophisticated attackers know this. Some of the largest corporate breaches in history started with a smaller vendor.</p>

    <p>Healthcare-adjacent businesses — dental practices, chiropractic offices, home health agencies, medical billing companies — hold some of the most valuable data on the dark web. A complete electronic health record sells for roughly $250 per record, compared to about $5 for a credit card number. A small practice with 1,500 patients is sitting on roughly $375,000 worth of data at criminal market prices. HIPAA compliance requirements add another layer of financial exposure: fines for a breach involving 500 or more records can reach $1.9 million per violation category.</p>

    <p>Professional services firms — law offices, accounting practices, financial advisors — hold client financial data, legal strategies, tax returns, and estate information. A Dayton-area CPA firm that gets ransomed in early April, during tax season, faces not just a financial loss but potential liability to hundreds of clients whose data was exposed or whose filings were delayed.</p>

    <p>Retail businesses, restaurants, and service contractors may think they are lower value targets, but any business that processes payment cards, stores customer contact information, or runs payroll is holding assets that criminals want.</p>

    <h3>The Anatomy of a Real Attack: Mitchell's HVAC</h3>

    <p>To make this concrete, consider what happened to Mitchell's HVAC, a twenty-three-person heating and cooling company based in the Dayton area. (This is a fictionalized composite based on real incident patterns, with identifying details changed.) Mitchell's had been in business for seventeen years, had a solid reputation in Montgomery County, and ran a tight operation. Like most HVAC contractors, they had invested in field service management software, an office accounting system running QuickBooks, and a fleet of company trucks with GPS tracking. They also had a relationship with a national parts supplier that required remote portal access.</p>

    <p>On a Tuesday morning in October, a technician named Dave received an email that appeared to come from the parts supplier. It said his portal password needed to be reset due to a security upgrade and included a link. The email looked right — the logo, the formatting, the sign-off all matched what he was used to seeing. He clicked the link, entered his credentials on what appeared to be the supplier's login page, and went back to his route. He never mentioned it to anyone.</p>

    <p>What Dave did not know was that the email was a phishing attempt, the link went to a spoofed webpage controlled by attackers, and his credentials were captured the moment he typed them. The attackers used those credentials to log into the actual supplier portal — which happened to have a VPN connection back to Mitchell's internal network as part of a legacy integration. From there, over the following two weeks, they moved laterally through the network, identified the file server where customer records and financial data were stored, and positioned ransomware on every connected device.</p>

    <p>They deployed the ransomware on a Friday night at 11:30 PM.</p>

    <p>When Mitchell's office manager arrived Monday morning and could not open a single file — not a customer record, not an invoice, not a work order — the damage was already complete. The ransom note demanded $45,000 in Bitcoin, payable within 72 hours or the price would double.</p>

    <h3>The True Cost: Beyond the Ransom</h3>

    <p>The decision about whether to pay a ransom is complicated, and we address it in Chapter 4. What matters here is the total financial picture of what Mitchell's faced. The $45,000 ransom was just the beginning.</p>

    <ul>
      <li><strong>Ransom payment:</strong> $45,000</li>
      <li><strong>Emergency cybersecurity incident response firm:</strong> $22,000 (to investigate, clean, and rebuild systems)</li>
      <li><strong>Two weeks of near-total downtime:</strong> approximately $35,000 in lost revenue and productivity</li>
      <li><strong>New hardware (workstations and server):</strong> $18,000</li>
      <li><strong>Overtime for office staff during recovery:</strong> $4,500</li>
      <li><strong>Lost customers who went to competitors during the outage:</strong> estimated $40,000 in recurring annual revenue</li>
      <li><strong>Cyber insurance deductible (they had a policy, fortunately):</strong> $10,000</li>
    </ul>

    <p>Total damage: approximately $174,500 — nearly a full year of net profit for a business of that size. And that does not count the owner's time, the stress on the team, or the reputational damage that is nearly impossible to quantify.</p>

    <p>Here is the comparison that should motivate you: a basic cybersecurity posture for a twenty-person business — an endpoint detection and response product, a password manager, multi-factor authentication on all accounts, email security tools, and a solid backup solution — costs roughly $10,000 to $15,000 per year. The ROI calculation is not even close. You are insuring against a $175,000 loss for about $12,500 per year. That is the kind of math your insurance agent, your accountant, and your business partner should all agree on.</p>

    <h3>The "We're Too Small to Matter" Myth — Fully Dismantled</h3>

    <p>The persistence of the "too small to matter" belief comes from how we picture hackers. The cultural image is a lone genius in a dark room, carefully selecting a high-value target. That picture is twenty years out of date. Modern cybercrime is industrialized. Criminal organizations run like businesses, with dedicated teams for phishing email production, credential harvesting, ransomware deployment, and ransom negotiation. They use automated scanning tools that probe millions of IP addresses daily, looking for exposed remote desktop protocol ports, unpatched software, and misconfigured email servers. Your business is not too small to appear in those scans. Every device connected to the internet is visible.</p>

    <p>Criminal groups also purchase lists of business email addresses, known software subscriptions, and company sizes. A list of Ohio businesses with five to fifty employees who use QuickBooks and have active business bank accounts can be purchased on dark web marketplaces for a few hundred dollars. You are on that list. The question is not whether you will be targeted. The question is whether, when you are targeted, you have the defenses in place to make the attack fail.</p>

    <p>You have customer data. You have banking access. You have vendor relationships. You have payroll credentials. You have the assets criminals want. The chapters that follow are about building the defenses to protect them — not because it is technically interesting, but because the alternative is Mitchell's HVAC's story playing out in your business.</p>

    <h3>What This Book Will Do for You</h3>

    <p>Each chapter in this playbook addresses one specific area of your business security. We have written it for owners and managers who are not IT professionals — people running HVAC companies, law offices, restaurants, medical practices, and distribution businesses across Ohio. You will not need a computer science degree to implement what we recommend. You will need a willingness to invest a modest amount of time and money in defenses that pay for themselves the first time they stop an attack.</p>

    <p>The goal is not perfection. No security posture is perfect. The goal is to make your business resilient — harder to breach than the next target, capable of recovering quickly if something does go wrong, and prepared to meet your legal obligations when incidents occur. Let's get started.</p>
    </article>`,
  },
  {
    chapter_number: 2,
    chapter_title: "Taking Stock: Your Current Risk Profile",
    page_start: 15,
    page_end: 26,
    content_html: `<article class="chapter-content">
    <h2>Chapter 2: Taking Stock: Your Current Risk Profile</h2>

    <p>Before you can fix your security, you need to understand what you are actually defending and where your vulnerabilities are. This chapter walks you through a self-assessment framework designed specifically for small Ohio businesses. By the end, you will have a practical picture of your current risk level and a foundation for the specific improvements in the chapters ahead.</p>

    <p>Think of this as the business equivalent of a physical exam. You might feel fine, but the doctor runs tests anyway because problems often exist before symptoms appear. Your business might be running smoothly right now, but the exposure that will cause you a serious problem in six months may already exist today.</p>

    <h3>Inventory: What Are You Actually Defending?</h3>

    <p>Most small business owners are surprised when they sit down and list everything that connects to their business network or holds business data. Start with these questions:</p>

    <ul>
      <li>How many computers, laptops, and tablets are used for business purposes — including personal devices that employees use to check work email?</li>
      <li>How many smartphones have the business email, QuickBooks mobile, or a customer management app installed?</li>
      <li>Do you have a point-of-sale system, and is it connected to the internet?</li>
      <li>Do you have any network-connected cameras, printers, or smart devices?</li>
      <li>Do you use cloud services like Google Workspace, Microsoft 365, Dropbox, or industry-specific software?</li>
      <li>How many vendors or contractors have been given any form of access to your systems or accounts?</li>
    </ul>

    <p>The sum of all these devices, accounts, and connections is what security professionals call your attack surface. Every point of entry is a potential vulnerability. A business with twelve employees might have twenty-five or thirty devices and accounts that all represent possible entry points for an attacker. That is not unusual — but it is important to know.</p>

    <h3>The BYOD Question</h3>

    <p>Bring Your Own Device — the practice of employees using personal smartphones, tablets, or laptops for work — has become the norm in small businesses. It saves money on hardware and feels natural in an era when everyone carries a powerful computer in their pocket. It also creates significant security risk that most business owners have never formally addressed.</p>

    <p>When an employee checks your business email on their personal phone, that phone becomes part of your attack surface. If that employee's phone has no screen lock PIN, runs a two-year-old operating system with unpatched vulnerabilities, and connects to unsecured Wi-Fi networks regularly, your business email and any attachments it contains are exposed. When that employee leaves your company, the business email history, customer contacts, and any shared files remain on their personal device unless you have a formal process to remove them.</p>

    <p>Ask yourself honestly: do you have a written BYOD policy? Do employees know what they are allowed to do with business data on personal devices? Do you have any way to remotely wipe business data from a personal device if it is lost or if an employee leaves on bad terms? If the answer to any of these is no, you have work to do in Chapter 6.</p>

    <h3>How Is Your Financial Data Handled?</h3>

    <p>Small Ohio businesses commonly run payroll through ADP, Paychex, or Gusto. Accounting typically runs through QuickBooks Desktop, QuickBooks Online, or similar platforms. Business banking happens through online portals at institutions like Fifth Third, Huntington, PNC, or local credit unions. Each of these represents a critical account that, if compromised, could drain your operating funds, redirect payroll, or allow attackers to file fraudulent tax returns in your business's name.</p>

    <p>Answer these questions about each financial account:</p>
    <ul>
      <li>Is multi-factor authentication (MFA) enabled? If not, a stolen password is all an attacker needs to log in.</li>
      <li>Who has admin access? Is it only the people who genuinely need it?</li>
      <li>When was the password last changed? (If you cannot remember, that is your answer.)</li>
      <li>Are there transaction alerts enabled that would notify you of large or unusual activity?</li>
      <li>Is there any dual-approval requirement for wire transfers or large ACH payments?</li>
    </ul>

    <h3>Customer Data: What Do You Hold and Where Is It?</h3>

    <p>Many small business owners are uncertain about exactly what customer data they are storing. This uncertainty is itself a risk. If you cannot inventory your data, you cannot protect it, and you cannot accurately notify customers in the event of a breach.</p>

    <p>Consider every place customer information might live:</p>
    <ul>
      <li>Your point-of-sale system (names, email addresses, purchase history, sometimes payment card data)</li>
      <li>Your customer relationship management (CRM) software or spreadsheet</li>
      <li>Email correspondence (quotes, invoices, service records)</li>
      <li>Paper files that may include signatures, payment information, or identification</li>
      <li>Your accounting software (billing addresses, tax information)</li>
      <li>Any industry-specific software (medical records, legal case management, service history)</li>
    </ul>

    <p>Ohio's Data Protection Act, which we cover in Chapter 8, creates both safe harbor protections for businesses that implement reasonable security controls and notification obligations when breaches occur. Knowing exactly what data you hold and where it lives is the prerequisite for both compliance and protection.</p>

    <h3>Access Control: Who Has the Keys?</h3>

    <p>In many small businesses, access controls have grown organically over years without any systematic review. An employee who joined three years ago to handle billing might still have access to the HR system because it was convenient at the time. A former employee's account might still be active because nobody got around to disabling it. A vendor who needed temporary access to your network might still have those credentials.</p>

    <p>Run through this mental exercise: if a disgruntled former employee wanted to access your business systems right now, could they? If a vendor whose contract ended six months ago still had their login, what could they see? In most small businesses, the honest answer is unsettling.</p>

    <h3>Backup Status: The Most Honest Test</h3>

    <p>Ask yourself this question: if every computer and server in your business were encrypted by ransomware tonight, how much data would you lose, and how long would it take to be operational again? The answer to this question tells you almost everything about your backup posture.</p>

    <p>A business with good backups answers: "We'd lose maybe a few hours of data and could be running again within 24-48 hours." A business with no systematic backup answers: "We'd lose everything and probably never fully recover." Most small businesses land somewhere between these extremes — they have some form of backup, but it has not been tested, it is not verified to actually work, or it is stored in the same location that would be compromised in a ransomware attack.</p>

    <h3>Risk Tier Assessment</h3>

    <p>Based on your answers to these questions, you can roughly categorize your current risk level:</p>

    <p><strong>Higher Risk</strong> — your business likely falls into this tier if:</p>
    <ul>
      <li>You have no MFA on financial accounts, email, or key business software</li>
      <li>Employees use personal devices for business without any formal policy</li>
      <li>Former employees or vendors may still have active access</li>
      <li>You have no tested backup that is stored separately from your primary systems</li>
      <li>You do not know where all your customer data lives</li>
      <li>You have not trained employees on how to recognize phishing emails in the past year</li>
    </ul>

    <p><strong>Moderate Risk</strong> — your business likely falls here if:</p>
    <ul>
      <li>You have MFA on some but not all critical accounts</li>
      <li>You have backups but have not verified they work in the past six months</li>
      <li>You have a general sense of your data but no formal inventory</li>
      <li>You have done some informal security training but nothing systematic</li>
    </ul>

    <p><strong>Lower Risk</strong> — your business is here if:</p>
    <ul>
      <li>MFA is enabled on all financial accounts, email, and business software</li>
      <li>You have a written and tested BYOD policy</li>
      <li>Access reviews happen at least quarterly</li>
      <li>Backups are tested monthly and stored in a separate location</li>
      <li>Staff training on phishing and social engineering happens at least quarterly</li>
    </ul>

    <p>Most small Ohio businesses reading this chapter honestly will land in the higher or moderate risk tier. That is not a failure — it is a starting point. The chapters that follow are a structured path from where you are to where you need to be. The investment is modest. The alternative is what happened to Mitchell's HVAC. Use the remainder of this chapter's worksheet to document your specific gaps, and carry that list into the action chapters ahead.</p>

    <h3>Your Risk Worksheet</h3>

    <p>Before moving to Chapter 3, write down your answers to these five questions. They will shape your priorities for the rest of the book:</p>

    <ol>
      <li>What are the three accounts (email, banking, payroll, QuickBooks, etc.) that would do the most damage if compromised? Do all three have MFA enabled?</li>
      <li>How many people — current employees, former employees, and vendors — have access to your business systems? When was that list last reviewed?</li>
      <li>Where is your customer data? List every place it lives, including email folders, spreadsheets, and paper files.</li>
      <li>If your systems were ransomed tonight, what is your recovery plan? Who would you call, and how long would recovery take?</li>
      <li>When did your last employee receive any training about phishing or cybersecurity? What did it cover?</li>
    </ol>

    <p>These answers are your baseline. Everything in this playbook builds from here.</p>
    </article>`,
  },
  {
    chapter_number: 3,
    chapter_title: "Email Defense: Your Biggest Vulnerability",
    page_start: 27,
    page_end: 40,
    content_html: `<article class="chapter-content">
    <h2>Chapter 3: Email Defense: Your Biggest Vulnerability</h2>

    <p>If you read only one chapter of this playbook, read this one. Business email compromise — the category of fraud that exploits email to steal money or data — is the number one source of financial losses from cybercrime for small businesses in the United States. The FBI's Internet Crime Complaint Center (IC3) consistently reports that BEC causes more total financial damage than ransomware, data breaches, and all other cybercrime categories combined. In 2024, reported losses exceeded $2.9 billion, and those are only the reported cases.</p>

    <p>The reason email is so dangerous is not technical — it is human. Email is how we conduct business. We make decisions, authorize payments, change vendor information, and respond to urgent requests by email every day. Attackers exploit the trust and urgency embedded in business email culture with devastating effectiveness.</p>

    <h3>How Business Email Compromise Actually Works</h3>

    <p>Business email compromise is not a quick, blunt attack. It is often a patient, sophisticated operation. Here is a typical pattern used against small and mid-sized businesses.</p>

    <p>The attacker begins by compromising someone's email account — usually through a phishing email that captures their credentials, or by taking advantage of a leaked password from an unrelated data breach. Once inside the account, they do not immediately do anything visible. Instead, they spend days or weeks reading emails, learning the communication patterns, understanding who reports to whom, which vendors are active, what payment amounts are typical, and how the target business writes internal messages.</p>

    <p>With that intelligence in hand, they craft a targeted attack. The most common version: the attacker spoofs or impersonates the business owner or CEO and sends an email to the controller, bookkeeper, or office manager asking them to initiate a wire transfer urgently. The request is framed in language that sounds like the owner — casual but authoritative, with a plausible business reason and a request to handle it quickly and discreetly.</p>

    <h3>The Akron Logistics Case</h3>

    <p>Consider what happened to a mid-sized logistics company based in the Akron area. (This is a fictionalized composite of real incident patterns.) The company had about thirty-five employees and used Microsoft 365 for email. Their controller, Sandra, had worked for the company for nine years and was trusted completely.</p>

    <p>On a Thursday afternoon, Sandra received an email from what appeared to be the CEO's address. The CEO, who traveled frequently, said he was closing a deal and needed a wire transfer of $87,000 to an escrow account before end of business. He said the acquisition lawyers had sent the wiring instructions in a separate email. He asked Sandra to keep it confidential until the deal was announced. He said he was in back-to-back meetings and could not talk on the phone but to text him if there were any problems.</p>

    <p>Sandra sent the wire. The CEO's email account had been compromised three weeks earlier. The "CEO" she was emailing was the attacker. The $87,000 went to a bank account controlled by the criminal organization and was gone within hours. Recovery was possible for less than $12,000 of the total.</p>

    <p>What would have stopped this? One phone call. If Sandra had called the CEO on a number she already had in her contacts — not a number from the email — the fraud would have failed immediately. That thirty-second verification call is the most powerful anti-fraud tool in your arsenal. We will return to it.</p>

    <h3>Email Authentication: SPF, DKIM, and DMARC in Plain English</h3>

    <p>Most small businesses have not configured the email authentication protocols that prevent attackers from sending emails that appear to come from your domain. Here is what each one does, in plain language.</p>

    <p><strong>SPF (Sender Policy Framework)</strong> is a DNS record that tells the internet which mail servers are authorized to send email on behalf of your domain. If a criminal tries to send an email that appears to come from yourcompany.com from an unauthorized server, a receiving mail server can check your SPF record and see that the message did not come from a legitimate source. Setting up SPF is free and takes about fifteen minutes with access to your domain's DNS settings.</p>

    <p><strong>DKIM (DomainKeys Identified Mail)</strong> adds a digital signature to outgoing emails that proves the message was sent by an authorized sender and was not modified in transit. Like SPF, this is a DNS record. Your email provider (Microsoft 365, Google Workspace) can generate the required keys and walk you through adding the record to your domain's DNS. This takes about thirty minutes the first time and never needs to be repeated.</p>

    <p><strong>DMARC (Domain-based Message Authentication, Reporting and Conformance)</strong> is the policy that tells receiving mail servers what to do when an email fails SPF or DKIM checks. It also provides a reporting mechanism that sends you data about emails being sent that claim to be from your domain. Setting DMARC to "reject" mode means that spoofed emails claiming to be from your domain will simply not be delivered. This is the most powerful of the three and the one that directly prevents the impersonation attacks used in BEC fraud.</p>

    <p>If your business email is hosted on Microsoft 365 or Google Workspace, all three of these can be configured without external help. CISA (the Cybersecurity and Infrastructure Security Agency) maintains free guides for setting up all three. Your managed service provider, if you have one, should be able to handle this in under an hour. If you have none of these configured right now, this is your highest-priority action item from this chapter.</p>

    <h3>Recognizing Phishing in a Business Context</h3>

    <p>General phishing awareness training often focuses on obvious red flags: misspelled words, generic greetings, suspicious links. In a business context, the attacks are more targeted and more convincing. Train yourself and your team to watch for these specific patterns:</p>

    <ul>
      <li><strong>Vendor impersonation:</strong> An email that appears to come from a vendor you work with regularly, asking you to update their payment information or click a link to review an invoice. Call the vendor on a number from your existing records — not the number in the email — to verify.</li>
      <li><strong>Payroll redirect requests:</strong> An email that appears to come from an employee asking to change their direct deposit information before the next payroll run. Verify all payroll changes by calling the employee directly.</li>
      <li><strong>Urgency combined with confidentiality:</strong> Any request that is "urgent" AND asks you to keep it quiet is a red flag. Legitimate business transactions are rarely both.</li>
      <li><strong>Requests that bypass normal processes:</strong> "I need you to handle this directly without going through the normal approval process." Normal processes exist for a reason. A request to bypass them should be treated with maximum suspicion.</li>
      <li><strong>Lookalike domains:</strong> mitchellshvac.com vs. mitchells-hvac.com. Attackers register domains that look nearly identical to real vendor domains and send email from them. Check the actual sending domain carefully, not just the display name.</li>
    </ul>

    <h3>The Multi-Person Approval Rule</h3>

    <p>For any wire transfer, ACH payment, or change to vendor banking information above a threshold you determine (many businesses use $5,000 to $10,000 as the trigger), establish a firm policy: the request must be authorized by at least two people, and at least one authorization must happen via a channel other than email — a phone call, an in-person conversation, or a text message to a known number.</p>

    <p>This policy should be written down, communicated to all employees who handle payments, and enforced consistently. The most common objection is "that will slow us down." The answer is: yes, by about three minutes. Three minutes to prevent an $87,000 wire fraud is a reasonable trade.</p>

    <h3>Running a Phishing Simulation</h3>

    <p>Telling employees about phishing is less effective than showing them what it looks like in practice. Phishing simulations — controlled, safe exercises where you send employees a fake phishing email and see who clicks — are one of the most valuable training tools available. Several platforms offer this for small businesses, including KnowBe4, Proofpoint Security Awareness Training, and Microsoft Attack Simulator (included with Microsoft 365 Business Premium).</p>

    <p>The goal is not to embarrass employees who click. The goal is to generate data about your organization's vulnerability and provide targeted training to employees who need it. A well-run simulation program — typically one simulated phishing email per month — can reduce click rates on phishing emails by 70% to 80% within six months. That is not a theoretical improvement. That is a measurable reduction in your exposure to the attack vector that causes more small business financial losses than any other.</p>

    <h3>The Thirty-Second Verification Call</h3>

    <p>We end this chapter where we started: with the simplest and most powerful tool in your email fraud defense. When anyone in your organization receives an email requesting a financial transaction, a change to payment information, or access to sensitive systems, the policy should be: verify by phone before acting.</p>

    <p>Call the person who sent the request on a number you already have in your phone or your records. Not a number from the email. Not a number from a different email thread that arrived around the same time. A number you had before the request arrived.</p>

    <p>This call costs thirty seconds. It defeats the most sophisticated BEC attack in existence. It does not require any technology, any vendor, or any budget. It requires only that your team understand the rule and apply it consistently. Make it a non-negotiable part of your payment and access-change workflow, and write that rule down today.</p>
    </article>`,
  },
  {
    chapter_number: 4,
    chapter_title: "Ransomware: What It Is, How It Spreads, How to Survive It",
    page_start: 41,
    page_end: 54,
    content_html: `<article class="chapter-content">
    <h2>Chapter 4: Ransomware: What It Is, How It Spreads, How to Survive It</h2>

    <p>Ransomware is the cyberattack that business owners fear most, and with good reason. When it works, it is devastating. When you are prepared, it is survivable. This chapter gives you the honest picture of how ransomware works, how it gets into businesses, and — most importantly — the specific steps that will let you recover without paying a criminal a dollar.</p>

    <h3>What Ransomware Actually Does</h3>

    <p>Ransomware is malicious software that encrypts the files on your computer and any connected storage. Encryption scrambles the data using a mathematical key — a key that only the attacker holds. Your files are still there, in a technical sense, but they are completely unreadable. Every document, spreadsheet, customer record, database, and photo becomes a jumbled collection of characters. The attacker then presents a ransom note demanding payment in cryptocurrency in exchange for the decryption key.</p>

    <p>Modern ransomware attacks often include a second stage: before encrypting your files, the attacker copies them to their own servers. The ransom note then threatens to publish your customer data, financial records, or confidential business information publicly if you do not pay. This is called "double extortion," and it means that having good backups — while still your best recovery tool — does not fully eliminate the leverage attackers have over you.</p>

    <h3>How Ransomware Gets In</h3>

    <p>Ransomware does not appear on your systems by magic. It gets in through specific, identifiable vulnerabilities that you can address:</p>

    <p><strong>Phishing emails:</strong> The most common entry point. An employee clicks a malicious link or opens an infected attachment. The malware installs silently and begins its work. This is exactly how Mitchell's HVAC was compromised in Chapter 1.</p>

    <p><strong>Exposed Remote Desktop Protocol (RDP):</strong> Remote Desktop allows employees or IT staff to connect to a business computer remotely. When RDP is enabled and exposed directly to the internet — which it should never be — attackers scan for it continuously and attempt to break in through brute-force password attacks. Once they have RDP access, they have full control of the target machine. Thousands of small business computers in Ohio have RDP exposed to the internet right now. Ask your IT contact to check yours.</p>

    <p><strong>Unpatched software:</strong> Software vulnerabilities are discovered regularly, and software companies release patches to fix them. When businesses delay installing those patches, they leave known vulnerabilities open for attackers to exploit. Ransomware groups maintain active lists of unpatched vulnerabilities and scan the internet for systems that have not been updated.</p>

    <p><strong>Compromised credentials:</strong> If an attacker has obtained a username and password for your VPN, your remote access software, or your cloud services, they can log in as a legitimate user and deploy ransomware from within. This is why MFA (Chapter 5) is essential — a stolen password alone is not enough to log in when MFA is required.</p>

    <h3>The Timeline of a Small Business Ransomware Attack</h3>

    <p>Ransomware attacks rarely happen immediately after initial access. Modern ransomware operators typically follow a patient, methodical process:</p>

    <ol>
      <li><strong>Initial access (Day 1):</strong> The attacker gains entry through phishing, exposed RDP, or compromised credentials.</li>
      <li><strong>Reconnaissance (Days 2-14):</strong> The attacker moves quietly through the network, mapping what exists, identifying backup systems, locating valuable data, and escalating privileges.</li>
      <li><strong>Backup destruction (Day 14-20):</strong> The attacker identifies and deletes or encrypts your backups before triggering the visible attack. This is why backups stored on network-connected drives are often useless — the attacker destroys them first.</li>
      <li><strong>Data exfiltration (Days 14-20):</strong> The attacker copies your most valuable data to their servers for double extortion leverage.</li>
      <li><strong>Deployment (typically a Friday night or holiday):</strong> The ransomware is deployed when it will have the most impact and the least immediate response — over a weekend or holiday, when your IT resources are minimal.</li>
    </ol>

    <p>This timeline has critical implications. By the time you see the ransom note, the attacker has likely been in your network for two to three weeks. The moment you see the note is not the beginning of the attack — it is the end of the preparation phase.</p>

    <h3>The Backup Strategy That Defeats Ransomware: The 3-2-1 Rule</h3>

    <p>The single most important technical defense against ransomware is a backup strategy that the attacker cannot reach and destroy. The security industry standard is called the 3-2-1 rule:</p>

    <ul>
      <li><strong>3 copies of your data:</strong> your primary data plus two backups</li>
      <li><strong>2 different storage media:</strong> for example, an external hard drive plus a cloud backup service</li>
      <li><strong>1 copy offsite:</strong> stored somewhere that a fire, flood, or network compromise at your primary location cannot reach</li>
    </ul>

    <p>For a small Ohio business, implementing the 3-2-1 rule typically means:</p>
    <ul>
      <li>Your primary data lives on your server or workstations (copy 1)</li>
      <li>A backup runs nightly to a local NAS device or external hard drive — ideally one that is not continuously connected to your network (copy 2)</li>
      <li>A cloud backup service (Backblaze B2, Acronis, Veeam Cloud, or similar) replicates your data to offsite storage that requires separate authentication to access — meaning a ransomware attacker who compromises your network cannot reach it (copy 3, offsite)</li>
    </ul>

    <p>The cloud backup is your ransomware insurance policy. Even if an attacker destroys everything on your local network, you can restore from cloud backup. This turns a potentially fatal attack into a serious but survivable disruption.</p>

    <p>There is one critical requirement that many businesses miss: <strong>test your backups</strong>. A backup that has never been tested is a backup that may not work when you need it. Once per month, restore a sample of files from your backup and verify they are intact. Once per quarter, attempt a full system restore in a test environment. This is the only way to know your backup actually works.</p>

    <h3>Should You Pay the Ransom?</h3>

    <p>This is the question every business owner asks, and the honest answer is: it depends on your situation, but you should not decide alone and you should never pay without professional guidance.</p>

    <p>Arguments against paying: paying does not guarantee file recovery (roughly 20% of businesses that pay never receive working decryption keys or receive keys that only partially work), paying funds criminal organizations that will attack other businesses, and in some jurisdictions, paying ransom groups that are under government sanctions can create legal liability for your business.</p>

    <p>Arguments for considering payment: if you have no viable backup, if the encrypted data is essential to your business survival, and if a qualified cybersecurity firm has evaluated your options and determined payment is your only realistic path to recovery, the business calculation may favor payment.</p>

    <p>What you should never do: pay the ransom yourself, without engaging a cybersecurity incident response firm. The negotiation process matters enormously — experienced negotiators often reduce ransom demands by 40% to 60%. A reputable firm will also assess whether decryptors are publicly available (which happens when law enforcement takes down ransomware groups and releases the keys), whether the attackers' decryption actually works, and what your legal obligations are in your jurisdiction.</p>

    <h3>The First 24 Hours After Discovering Ransomware</h3>

    <p>If you arrive at work and cannot open files, see a ransom note, or observe any other signs of active ransomware, your immediate actions matter enormously. Do these things in order:</p>

    <ol>
      <li><strong>Disconnect affected devices from the network immediately.</strong> Unplug ethernet cables. Disable Wi-Fi. The goal is to contain the spread. Every minute a ransomware-infected device remains connected to your network is another opportunity for the malware to reach more systems.</li>
      <li><strong>Do not turn off devices.</strong> This feels counterintuitive, but forensic investigators may be able to recover encryption keys from memory on a running machine. Turning devices off destroys that possibility.</li>
      <li><strong>Call your cybersecurity incident response firm.</strong> If you do not have one on retainer, call your cyber insurance company immediately — they maintain approved IR firm lists. CISA's 24/7 hotline (1-888-282-0870) can also provide guidance for Ohio small businesses.</li>
      <li><strong>Call your cyber insurance company.</strong> Your policy may require notification within a specific timeframe. Early notification also starts the claims process that may cover your recovery costs.</li>
      <li><strong>Call law enforcement.</strong> Report to the FBI's IC3 (ic3.gov) and, for Ohio businesses, to the Ohio Attorney General's cybercrime unit. This is not just civic duty — law enforcement data on active ransomware campaigns sometimes yields decryption keys or other assistance.</li>
      <li><strong>Document everything.</strong> Photograph ransom notes, preserve any emails that may have been the entry point, and keep records of every action you take during the response. This documentation will be essential for your insurance claim and any legal proceedings.</li>
    </ol>

    <p>Ohio businesses that have done the work of implementing the 3-2-1 backup rule, patching their systems, and enabling MFA on all accounts turn ransomware incidents from potential business-ending events into painful but manageable disruptions. The investment to get there is real but modest. The alternative is the choice between paying a criminal and potentially losing your business. That calculus makes every chapter of this playbook worth your time.</p>
    </article>`,
  },
  {
    chapter_number: 5,
    chapter_title: "Passwords and Access Control: Simple Rules That Save You",
    page_start: 55,
    page_end: 65,
    content_html: `<article class="chapter-content">
    <h2>Chapter 5: Passwords and Access Control: Simple Rules That Save You</h2>

    <p>The conversation about passwords sounds boring. It is also one of the highest-ROI conversations in business security. Weak passwords and poor access controls are responsible for an enormous proportion of small business breaches — and the fixes are inexpensive, effective, and available right now. This chapter gives you the tools to close these gaps permanently.</p>

    <h3>How Credential Attacks Work</h3>

    <p>Attackers do not always try to guess your password one attempt at a time. The dominant attack method today is credential stuffing: criminals take the billions of username and password combinations leaked from past data breaches (LinkedIn, Adobe, Dropbox, and hundreds of others) and automatically test those credentials against banking sites, email providers, payroll systems, and business software. If your employee is using the same password for their personal Netflix account as they are for your QuickBooks login, and that Netflix password was in a breach, attackers can log directly into QuickBooks without ever trying to "hack" you in any traditional sense.</p>

    <p>The scale of this problem is hard to overstate. The largest known credential databases contain tens of billions of email/password combinations. For $50 on a dark web marketplace, an attacker can purchase an automated credential stuffing tool and run it against any target they choose. This is not the work of sophisticated nation-state hackers. It is routine criminal activity performed by people with minimal technical skill.</p>

    <h3>The Password Manager ROI Calculation</h3>

    <p>A business-grade password manager costs approximately $5 to $8 per user per month. For a fifteen-person business, that is $900 to $1,440 per year. That cost buys you:</p>

    <ul>
      <li>Unique, randomly generated 20-character passwords for every account every employee uses</li>
      <li>Automatic filling of credentials so employees never need to type or remember passwords</li>
      <li>Central visibility into which accounts exist and who has access to them</li>
      <li>The ability to immediately revoke an employee's access to all business accounts when they leave</li>
      <li>Breach monitoring that alerts you when a stored credential appears in a public data breach</li>
    </ul>

    <p>Compare that $1,440 annual cost to the average cost of a credential-based breach at a small business: conservatively $80,000 to $180,000. The ROI is not close. A password manager is the single highest-return security investment available to most small Ohio businesses.</p>

    <p>For small business use, three platforms stand out: <strong>1Password Business</strong> offers excellent centralized management and guest account features useful for clients and contractors; <strong>Bitwarden Teams</strong> is open-source, well-audited, and more affordable; <strong>LastPass Business</strong> has strong enterprise features but has had its own high-profile security incidents that some owners find disqualifying. Any of the three is vastly better than the current state of most small businesses, which is employees reusing passwords or storing them in a spreadsheet.</p>

    <h3>Multi-Factor Authentication: The Lock That Stops 99% of Attacks</h3>

    <p>Multi-factor authentication requires a second proof of identity beyond the password — typically a six-digit code from an authenticator app on your smartphone, a push notification approval, or a hardware security key. When MFA is enabled, a stolen password alone is not enough to access the account. The attacker also needs physical access to your phone or hardware key.</p>

    <p>Microsoft's internal security data suggests that MFA blocks 99.9% of automated account takeover attacks. That is not a theoretical estimate. It is based on analysis of millions of real attacks against Microsoft's customer base. For most of the credential stuffing attacks and phishing campaigns targeting small businesses, MFA is an impenetrable barrier. The attacker simply moves to the next target who does not have it.</p>

    <p>Enable MFA immediately on these accounts, in this priority order:</p>
    <ol>
      <li>Business banking and financial accounts</li>
      <li>Business email (Microsoft 365 or Google Workspace)</li>
      <li>Payroll platforms (ADP, Paychex, Gusto)</li>
      <li>Accounting software (QuickBooks Online, Xero)</li>
      <li>Any cloud storage that contains customer or financial data</li>
      <li>Your domain registrar and DNS provider</li>
      <li>Any remote access tools (VPN, Remote Desktop, TeamViewer)</li>
    </ol>

    <p>Use an authenticator app — Google Authenticator, Microsoft Authenticator, or Authy — rather than SMS text message codes where possible. SMS-based MFA can be defeated by SIM-swap attacks, where criminals convince your mobile carrier to transfer your phone number to their control. Authenticator apps are not vulnerable to SIM swaps.</p>

    <h3>Principle of Least Privilege</h3>

    <p>Every employee should have access to exactly the systems and data they need to do their job — and nothing more. This principle sounds obvious but is almost universally violated in small businesses, where access tends to accumulate over time and rarely gets reviewed.</p>

    <p>In practice, this means: your receptionist should not have admin access to your accounting software. Your field technicians should not have access to HR records. Your warehouse staff should not have admin rights on their computers. Admin rights, in particular, should be reserved for IT staff and business owners. An employee who is running as a standard (non-admin) user on their computer cannot install software — which means that even if they click a phishing link, the malware often cannot fully install itself without elevated privileges. This one change, applied across your workforce, meaningfully reduces the impact of successful phishing attacks.</p>

    <h3>The Offboarding Checklist</h3>

    <p>Employee departures — whether voluntary or involuntary — create one of the most commonly overlooked access risks in small business. A former employee who still has active credentials to your email system, your QuickBooks, your Google Drive, or your point-of-sale system is a security liability. Disgruntled former employees are responsible for a significant proportion of insider threat incidents at small businesses.</p>

    <p>When any employee leaves, execute this checklist within the first hour after their departure, not within the first week:</p>

    <ul>
      <li>Disable their email account or forward it to a manager</li>
      <li>Revoke their access to all business software (QuickBooks, payroll, CRM, project management tools)</li>
      <li>Change any shared passwords they had access to (Wi-Fi, alarm codes, shared vendor portals)</li>
      <li>Revoke their physical access (key fob, alarm codes, keys to the building)</li>
      <li>Remove them from your password manager (this instantly revokes all the credentials stored there that were shared with them)</li>
      <li>If they had admin access to any system, audit the logs for that system for the previous 30 days</li>
    </ul>

    <p>A password manager makes this process dramatically easier. Instead of trying to remember which twenty-three accounts an employee had access to, you simply remove them from the business vault. Their access ends immediately and completely.</p>

    <h3>A Success Story Worth Noting</h3>

    <p>A small Columbus-area financial planning firm — eight employees, serving about 200 clients — implemented MFA and a password manager across all staff after a narrow escape: an employee had received a phishing email that captured their email credentials, but the attacker was unable to access the email account because MFA blocked the login attempt. The firm's IT advisor called to notify them of the failed login attempt, which is how they discovered the compromised password.</p>

    <p>In the three years since implementing those controls, the firm has received multiple phishing simulations from their IT security program, seen credential alerts from their password manager, and had two additional phishing attempts against employee email accounts. None have resulted in a breach. The MFA holds every time. Total annual investment: $1,200 for password manager licenses and $600 for the security awareness training program. Total incidents resulting in a breach: zero. That is a meaningful outcome, earned with a $1,800 annual investment.</p>
    </article>`,
  },
  {
    chapter_number: 6,
    chapter_title: "Securing Your Network and Devices",
    page_start: 66,
    page_end: 77,
    content_html: `<article class="chapter-content">
    <h2>Chapter 6: Securing Your Network and Devices</h2>

    <p>Your network is the highway that connects every device in your business. If it is not properly secured, an attacker who reaches one device can reach them all. This chapter covers the network and device security practices that form the infrastructure layer of your defenses — the foundation that everything else rests on.</p>

    <h3>Your Router: The Front Door to Your Network</h3>

    <p>Every business network starts with a router, and most small business routers are configured with default settings that create unnecessary risk. The first thing to do with any business router is change the default administrator password. Default passwords for popular router models are publicly published online — any attacker who can reach your router's admin interface can log in with those defaults. Change the admin password to something unique, at least sixteen characters, and store it in your password manager.</p>

    <p>Second, disable WPS (Wi-Fi Protected Setup). WPS was designed to make it easy to connect new devices to your Wi-Fi network, but it has a known vulnerability that allows attackers to recover your Wi-Fi password in a matter of hours. There is no reason to have WPS enabled on a business network.</p>

    <p>Third, enable WPA3 encryption if your router supports it. WPA3 is the current Wi-Fi security standard, replacing the older WPA2. If your router does not support WPA3, it is worth considering an upgrade — routers more than five years old often lack WPA3 support and may also lack other security patches.</p>

    <p>Fourth, and critically: create a separate guest Wi-Fi network for customers, visitors, and personal devices. Guest Wi-Fi should be completely isolated from your business network — devices on the guest network should have no ability to communicate with devices on your main network. This means a customer who sits in your waiting room and connects to your guest Wi-Fi cannot see or access your business computers, even if their device is compromised. Most modern business-grade routers support network isolation for guest networks as a standard feature.</p>

    <h3>BYOD Policy Basics</h3>

    <p>If your employees use personal devices to access business email, business apps, or business data — and in most small Ohio businesses they do — you need a written BYOD policy that establishes minimum security requirements for those devices. At minimum, that policy should require:</p>

    <ul>
      <li>A PIN or biometric lock on the device</li>
      <li>The most recent operating system update (or within one major version)</li>
      <li>A business email configuration that allows remote wipe of business data</li>
      <li>Agreement not to store business data in personal apps or personal cloud storage</li>
      <li>Agreement to report a lost or stolen device immediately so remote wipe can be executed</li>
    </ul>

    <p>The remote wipe capability is particularly important. Mobile device management (MDM) tools like Microsoft Intune, Jamf, or Mosyle allow you to remotely erase business data from an employee's personal device without wiping their personal photos and apps. When an employee leaves the company, you can remove all business data from their personal phone without touching their personal data. This is a legal and operational requirement for any business that takes customer data seriously.</p>

    <h3>Endpoint Detection and Response</h3>

    <p>Traditional antivirus software, which looks for known malware signatures, is no longer sufficient for small business protection. Modern attacks use malware that has never been seen before (called zero-day malware) or techniques that do not use traditional malware at all (called fileless attacks). Endpoint Detection and Response (EDR) tools use behavioral analysis — monitoring what programs are doing, not just what they look like — to detect and respond to attacks even when the specific malware is unknown.</p>

    <p>For small businesses, practical EDR options include CrowdStrike Falcon Go, Microsoft Defender for Business (included with Microsoft 365 Business Premium), and SentinelOne Singularity. These tools run in the background on each device, monitor for suspicious behavior, and alert you (or your IT provider) when something anomalous is detected. The cost difference between traditional antivirus and EDR has narrowed significantly — most small businesses can implement EDR for $5 to $10 per device per month.</p>

    <h3>Windows Update Policy: Why Patches Matter</h3>

    <p>The most common reason ransomware successfully deploys through unpatched vulnerabilities is simple: the patch was available, it was just not installed. Windows releases security patches monthly (Patch Tuesday), and most of these patches fix vulnerabilities that are actively being exploited by attackers. A business that runs automatic updates on all computers is largely protected from these attack vectors. A business that delays updates — because they are inconvenient, because they occasionally break things, because nobody has set up a policy — is exposed to known attacks with available fixes.</p>

    <p>The solution is straightforward: enable automatic updates on all company computers. If your IT provider manages your systems remotely, confirm with them that automatic update deployment is part of their service. Ask for monthly confirmation that updates are being applied. This is a basic expectation that any managed service provider should meet without hesitation.</p>

    <h3>Laptop Encryption: If It Gets Stolen, Make It Useless</h3>

    <p>Laptops get stolen. They fall out of trucks, they disappear from coffee shops, they get grabbed from cars. In many Ohio businesses — HVAC contractors, construction companies, home health agencies, field service businesses — employees routinely take laptops to job sites and customers' homes.</p>

    <p>Full disk encryption means that if a laptop is stolen, the data on it is completely unreadable without the password. On Windows computers, full disk encryption is provided by BitLocker, which is included in Windows 10 and 11 Pro. Enabling BitLocker takes about five minutes and requires saving a recovery key (which you should do, and store in your password manager). On Mac computers, full disk encryption is provided by FileVault and is similarly simple to enable.</p>

    <p>A stolen unencrypted laptop is a data breach. A stolen encrypted laptop is just a hardware loss. The cost of a stolen laptop changes from thousands of dollars in breach notification costs and regulatory exposure to the cost of replacing a $1,200 computer. Enable encryption on every company laptop today.</p>

    <h3>Specific Guidance for Mobile Ohio Businesses</h3>

    <p>Many small Ohio businesses have employees who work primarily in the field — plumbers, electricians, HVAC technicians, home health aides, construction crews. These employees face specific security challenges that office-centric security guidance often misses:</p>

    <ul>
      <li><strong>Working from customer premises:</strong> Employees should never connect company devices to customer Wi-Fi networks. A customer's network may be compromised or simply misconfigured. Use cellular data or a mobile hotspot for business functions when on-site.</li>
      <li><strong>Vehicles as offices:</strong> Laptops left in vehicles are theft targets. If employees regularly work from their vehicles, establish a policy: no devices left in unattended vehicles, or at minimum, devices must be out of sight and in the trunk.</li>
      <li><strong>Lost or stolen device protocol:</strong> Every field employee should know exactly what to do if a company device is lost or stolen — call the office or IT contact immediately so the device can be remotely wiped. Post this number in the company vehicle and on the company mobile device lock screen.</li>
      <li><strong>Working from home:</strong> Home networks are generally less secure than office networks. Employees who work from home should be required to use the company VPN if they are accessing sensitive systems, and their home router should meet minimum security requirements outlined in your BYOD or remote work policy.</li>
    </ul>

    <p>The network and device layer is your foundation. Get the router secured, deploy EDR, enable encryption, and establish clear policies for mobile and BYOD use. These are not glamorous changes, but they close the gaps that attackers routinely exploit to enter small business networks every day across Ohio.</p>
    </article>`,
  },
  {
    chapter_number: 7,
    chapter_title: "Payment Card and Banking Security",
    page_start: 78,
    page_end: 89,
    content_html: `<article class="chapter-content">
    <h2>Chapter 7: Payment Card and Banking Security</h2>

    <p>Your business banking and payment processing represent the most direct path from your customers' and vendors' money to a criminal's wallet. The attacks described in this chapter are not exotic — they happen to Ohio businesses every week, and the defenses are practical and affordable. This chapter gives you the specific controls that financial security requires.</p>

    <h3>PCI DSS: What Small Businesses Actually Need to Know</h3>

    <p>If your business accepts credit or debit cards — and virtually every Ohio small business does — you are subject to the Payment Card Industry Data Security Standard (PCI DSS). The full PCI DSS framework is extensive, but for small businesses, the practical requirements focus on a few core areas.</p>

    <p>First, and most important: do not store card data you do not need to store. The vast majority of small businesses have no legitimate reason to store full card numbers, expiration dates, or security codes after a transaction is processed. Your payment processor holds that data. You should hold nothing. If your point-of-sale system or invoicing software stores card numbers, consult with your payment processor about disabling that feature immediately.</p>

    <p>Second, use a PCI-compliant payment processor and let them handle the complexity. Stripe, Square, PayPal, and other modern processors are designed so that card data never touches your servers — it goes directly to their secure infrastructure. When you use these tools correctly, your PCI scope (the systems you need to secure for compliance) shrinks dramatically.</p>

    <p>Third, complete your annual PCI Self-Assessment Questionnaire (SAQ). Your merchant services bank is required to have you complete one, though many small businesses have never been asked. The SAQ identifies specific vulnerabilities in how you handle card data. It takes thirty to sixty minutes and is available for free at pcisecuritystandards.org.</p>

    <h3>Point-of-Sale Skimming: Physical and Digital</h3>

    <p>Physical skimming involves criminals attaching a device to your payment terminal that captures card data as customers swipe or tap. It is most common in gas stations, ATMs, and restaurants where card readers are accessible to the public, but it happens across retail. Train employees to inspect payment terminals at opening each day — tug on the card slot, look for anything that does not fit flush, check for extra components that should not be there. Many modern payment processors provide tamper-evident seals for their terminals.</p>

    <p>Digital skimming — also called "formjacking" — targets businesses that process payments through websites. Attackers inject malicious JavaScript code into checkout pages that silently copies card data as customers type it. If you run an e-commerce site, work with your web developer to ensure your payment processing is handled by your processor's hosted fields (not custom-built forms), and perform regular security scans of your website code. If you use WooCommerce, Shopify, or similar platforms, keep plugins and themes updated to prevent injection vulnerabilities.</p>

    <h3>Business Banking Security: The Controls That Matter</h3>

    <p>Your business checking account is more vulnerable than most owners realize. ACH fraud — where criminals either steal your banking credentials and initiate transfers or intercept and modify vendor payments — is a significant and growing problem. Here are the specific controls that Ohio banks recommend for small business customers:</p>

    <ul>
      <li><strong>Dual control for wire transfers:</strong> Any wire transfer should require approval from two separate people. Both Fifth Third and Huntington offer dual-control functionality for business online banking. This one control would have prevented many of the wire fraud cases described in Chapter 3.</li>
      <li><strong>ACH debit blocks or filters:</strong> Ask your bank to enable ACH debit blocks that prevent unauthorized parties from pulling funds from your account. You create a list of approved ACH originators (payroll company, known vendors), and any attempt to debit your account from an unapproved source is rejected automatically.</li>
      <li><strong>Daily transaction limits:</strong> Set maximum daily transaction amounts for your online banking, particularly for wire transfers and ACH payments. An alert triggers if a transaction would exceed the limit, giving you an opportunity to confirm it is legitimate before it processes.</li>
      <li><strong>Real-time fraud alerts:</strong> Enable every available alert your bank offers — large transactions, international activity, login from new device, password changes. These alerts cost nothing and give you early warning of compromise.</li>
    </ul>

    <h3>The Dedicated Banking Device</h3>

    <p>One control used by larger organizations that makes enormous sense for small businesses is the concept of a dedicated device for online banking. This means one computer — ideally a basic, inexpensive laptop — that is used exclusively for banking and nothing else. No email, no web browsing, no opening attachments. No software installed beyond the operating system and a browser. This machine never visits websites except your banking portals.</p>

    <p>The reason this matters: most malware that targets banking credentials gets onto computers through email attachments, compromised websites, and software downloads. If your banking computer never visits websites except banking sites, never opens email, and never runs other software, the attack surface for credential theft is nearly zero. For a business doing significant ACH transactions, this $400 to $600 investment in a dedicated machine can prevent hundreds of thousands of dollars in fraud.</p>

    <h3>Vendor Payment Fraud</h3>

    <p>One of the fastest-growing fraud patterns against small businesses is vendor payment fraud, also called mandate fraud. Here is how it works: an attacker either compromises your email or your vendor's email (or simply sends a spoofed message), and then notifies you that the vendor's banking information has changed and provides new payment details. Your next payment to that vendor goes to the criminal's account. By the time the vendor contacts you about the missed payment, the money is gone.</p>

    <p>The defense is simple and must be absolute: before changing any vendor's payment information in your accounting system, call that vendor on a phone number you already have in your records — not a number provided in the email requesting the change. Confirm the change verbally with a person you recognize. Document the call. This verification step costs two minutes and prevents a fraud that averages $130,000 per incident at small businesses.</p>

    <p>This verification call policy should be written into your accounts payable procedures, communicated to every person who handles vendor payments, and enforced without exception. No email request to change vendor banking information should ever be acted upon without a verbal confirmation call.</p>

    <h3>Ohio Banking Partners</h3>

    <p>Fifth Third Bank and Huntington Bank, both headquartered in Ohio, have strong small business security programs and dedicated fraud teams. Both banks offer free consultations with business bankers who can walk you through enabling the specific controls described in this chapter. If your current banking relationship does not offer these conversations proactively, ask for them — your banker should be a partner in protecting your business funds, not just a repository for them.</p>

    <p>Payment security and banking fraud protection are areas where relatively small procedural changes — the verification call, the dual control, the ACH block — provide enormous protection. These controls do not require technology investment. They require policy discipline. That discipline, applied consistently, is your strongest defense against the financial fraud that targets Ohio small businesses every day.</p>
    </article>`,
  },
  {
    chapter_number: 8,
    chapter_title: "Customer Data Protection and Privacy Law",
    page_start: 90,
    page_end: 100,
    content_html: `<article class="chapter-content">
    <h2>Chapter 8: Customer Data Protection and Privacy Law</h2>

    <p>When a customer gives your business their name, address, phone number, email, or payment information, they are placing trust in you to handle that data responsibly. That trust has always had a moral dimension. It increasingly has a legal one as well. This chapter covers what you are actually holding, what Ohio and federal law require of you, and what to do when something goes wrong.</p>

    <h3>What Data You Are Probably Holding</h3>

    <p>Most small business owners underestimate the scope of personally identifiable information (PII) they hold. A data inventory — a complete catalog of what customer data you have, where it lives, and who can access it — is the foundation of every other privacy practice. If you have never done one, start here.</p>

    <p>Typical small business data holdings include:</p>
    <ul>
      <li><strong>Contact information:</strong> Names, addresses, phone numbers, email addresses. Present in your CRM, email system, invoicing software, and likely a half-dozen other places.</li>
      <li><strong>Financial information:</strong> Payment card data (hopefully held by your processor, not you), bank account information for ACH customers, invoiced amounts and payment history.</li>
      <li><strong>Identification data:</strong> Driver's license numbers, Social Security numbers (common in healthcare, financial services, and businesses that extend credit), and date of birth.</li>
      <li><strong>Health information:</strong> Any business in a healthcare-adjacent field — medical offices, dental practices, home health agencies, wellness businesses — holds protected health information (PHI) subject to HIPAA.</li>
      <li><strong>Employee data:</strong> Social Security numbers, payroll information, HR records, and potentially medical information (for insurance purposes). Your employees are your customers in this context.</li>
    </ul>

    <p>Once you have inventoried your data, apply the principle of data minimization: collect only what you need, retain it only as long as you need it, and securely delete it when it is no longer necessary. Every record you do not hold is a record that cannot be exposed in a breach.</p>

    <h3>The Ohio Data Protection Act</h3>

    <p>Ohio passed the Ohio Data Protection Act (Ohio Revised Code §§ 1354.01 et seq.) to incentivize small and mid-sized businesses to implement reasonable cybersecurity practices. The act creates an affirmative defense against tort claims arising from data breaches — if a business can demonstrate that it had implemented and was following a cybersecurity program that reasonably conforms to a recognized industry standard at the time of the breach, it has a meaningful legal defense against negligence claims.</p>

    <p>Recognized frameworks under the Ohio Data Protection Act include: NIST Cybersecurity Framework, CIS Controls, ISO 27001, HIPAA Security Rule (for healthcare), and the PCI DSS (for businesses that process payment cards). For most Ohio small businesses without specific regulatory requirements, the CIS Controls provide the most practical roadmap — eighteen prioritized security controls that align closely with what this playbook recommends.</p>

    <p>The practical message: implementing the controls in this playbook is not just good security practice. It is also the foundation of the legal defense available to Ohio businesses under state law if a breach occurs. Document your security program. Keep records of your training, your backup procedures, your access controls. That documentation is your evidence if you ever need to demonstrate reasonable practices.</p>

    <h3>HIPAA Basics for Healthcare-Adjacent Businesses</h3>

    <p>If your business provides healthcare services, handles medical records, processes healthcare billing, or provides services to healthcare providers, you may be subject to HIPAA even if you are not a medical practice yourself. Business associates — defined broadly as companies that handle protected health information on behalf of covered entities — have the same HIPAA obligations as the providers themselves.</p>

    <p>HIPAA's Security Rule requires: risk analysis of your PHI handling, written security policies, workforce training, access controls for PHI systems, audit logs, and breach notification procedures. Failure to comply can result in fines of $100 to $50,000 per violation, with annual maximums that can reach $1.9 million per violation category. The Ohio Department of Health and the Office for Civil Rights at the U.S. Department of Health and Human Services both investigate HIPAA complaints against Ohio businesses.</p>

    <h3>Breach Notification: What You Are Required to Do</h3>

    <p>Ohio's data breach notification law (Ohio Revised Code § 1349.19) requires that businesses notify affected Ohio residents when a breach exposes certain categories of personal information. Notification must be made in the most expedient time possible and without unreasonable delay. For breaches affecting more than 1,000 Ohio residents, you must also notify the Ohio Attorney General.</p>

    <p>Federal requirements add additional layers for certain industries: HIPAA requires notification to affected individuals within 60 days of discovering a breach, and breaches affecting more than 500 individuals require notification to HHS and prominent media outlets. The FTC Safeguards Rule requires financial services businesses to notify affected individuals promptly and notify the FTC for breaches affecting 500 or more customers.</p>

    <p>The notification letter itself matters. An effective breach notification tells customers: what happened, what data was involved, what you have done to contain the breach and prevent recurrence, and what steps the customer should take to protect themselves. Provide a free credit monitoring offer if financial data was involved. Engage legal counsel before sending breach notification letters — the timing and content have legal implications that require professional guidance.</p>

    <h3>Practical Data Protection Steps</h3>

    <p>Beyond legal compliance, these practical steps significantly reduce your exposure:</p>

    <ul>
      <li><strong>Encrypt customer data at rest.</strong> Customer records stored in databases or files should be encrypted. Most modern business software handles this automatically, but verify with your vendor that encryption is enabled and what standard they use.</li>
      <li><strong>Encrypt data in transit.</strong> Any web application that transmits customer data should use HTTPS. Verify that your website, customer portal, and any customer-facing applications use TLS encryption.</li>
      <li><strong>Limit access to customer data.</strong> Only employees who need customer data for their specific job function should have access to it. This is the least-privilege principle from Chapter 5 applied to customer data.</li>
      <li><strong>Conduct an annual data inventory review.</strong> Schedule a quarterly or annual review of what data you are holding, where it lives, and whether you still need it. Data that you no longer need should be securely deleted.</li>
    </ul>

    <p>The customers and clients of Ohio small businesses trust those businesses with their personal information. That trust is a business asset — customers who believe their data is handled responsibly are more loyal and more likely to refer. A breach destroys that trust in a way that is difficult to rebuild. The investment in data protection is simultaneously a legal compliance cost, a risk management investment, and a customer relationship investment. In that framing, it is one of the most valuable investments your business can make.</p>
    </article>`,
  },
  {
    chapter_number: 9,
    chapter_title: "Remote Work Security for Small Teams",
    page_start: 101,
    page_end: 111,
    content_html: `<article class="chapter-content">
    <h2>Chapter 9: Remote Work Security for Small Teams</h2>

    <p>The COVID-19 pandemic forced thousands of Ohio small businesses to implement remote work in a matter of days. Most of them improvised. Employees connected from home networks with whatever security happened to exist there, used personal computers that were never enrolled in company management systems, and shared files through whatever cloud storage happened to be convenient. Four years later, many of those improvised arrangements have become permanent — without ever being formalized or secured.</p>

    <p>This chapter provides the framework for remote work security that the pandemic transition never allowed time for. The good news: the gaps can be closed methodically and without significant cost.</p>

    <h3>The Expanded Attack Surface of Remote Work</h3>

    <p>When your team works from a single office, your security perimeter is relatively well-defined. Your network, your devices, your physical space. Remote work explodes that perimeter. Each employee's home becomes a branch office, complete with its own network (usually unsecured), its own devices (usually personal and unmanaged), and its own physical environment (usually with other people around who are not subject to your security policies).</p>

    <p>Home networks present specific risks. The router a Spectrum or AT&T technician installs by default is configured for consumer convenience, not business security. It likely uses a shared password that has never been changed, runs firmware that has not been updated in years, and may have no firewall beyond the basic NAT protection all routers provide. An employee who connects to your company systems from a home network with a compromised router is effectively connecting through an attacker-controlled access point.</p>

    <h3>Home Wi-Fi Requirements for Remote Workers</h3>

    <p>If employees work from home regularly, establish and communicate minimum home network security requirements:</p>

    <ul>
      <li>Router admin password must be changed from the default</li>
      <li>Wi-Fi password must be strong (at least twelve characters, not a common word)</li>
      <li>WPA2 or WPA3 encryption required (not WEP, which is broken)</li>
      <li>Router firmware must be kept updated (most modern routers have automatic update options)</li>
      <li>A separate guest network for other household members and smart home devices, isolated from the network used for work</li>
    </ul>

    <p>For employees in roles with access to highly sensitive data, consider providing a company-managed travel router that creates a secure network segment even within a home network. These devices cost $60 to $150 and create a consistent, managed security boundary regardless of the employee's home network configuration.</p>

    <h3>VPN: When You Need It and When You Do Not</h3>

    <p>A Virtual Private Network (VPN) creates an encrypted tunnel between an employee's device and your company network (or a VPN server). VPN is essential in specific scenarios and less necessary in others. Here is a practical guide:</p>

    <p><strong>You need VPN if:</strong></p>
    <ul>
      <li>Employees remotely access servers, file shares, or legacy applications that live on your internal network</li>
      <li>Employees frequently work from public Wi-Fi (coffee shops, airports, client sites)</li>
      <li>Your industry regulations require encrypted transmission of sensitive data</li>
    </ul>

    <p><strong>VPN is less critical if:</strong></p>
    <ul>
      <li>All your business applications are cloud-based (Microsoft 365, Google Workspace, Salesforce, QuickBooks Online) with MFA enabled — these applications encrypt their own traffic, and MFA provides the access control</li>
      <li>Employees work exclusively from home on a network you have configured to meet minimum standards</li>
    </ul>

    <p>For businesses that need VPN, business-grade solutions like Cisco Meraki, Palo Alto GlobalProtect, and even Windows Server's built-in VPN functionality are appropriate. Consumer VPN services are not appropriate for business use — they are designed for personal privacy, not business network access control.</p>

    <h3>Video Conferencing Security</h3>

    <p>Video conferencing — Zoom, Teams, Google Meet — became the nervous system of remote business operations. It is also a surface for attack and inadvertent data exposure. Practical controls:</p>

    <ul>
      <li><strong>Require passwords on all Zoom meetings.</strong> "Zoom bombing" — uninvited attendees joining open meetings — exposed confidential business discussions at thousands of organizations. A meeting password prevents this.</li>
      <li><strong>Use waiting rooms</strong> for any meeting where confidential information will be discussed. Review attendees before admitting them.</li>
      <li><strong>Be conscious of what is visible on your screen</strong> before sharing. A quick glance at what you are about to share before hitting "share screen" prevents accidental exposure of open documents, browser tabs with sensitive information, and notification pop-ups containing confidential messages.</li>
      <li><strong>Lock meetings</strong> once all expected participants have joined. A locked meeting cannot be entered by latecomers or uninvited guests, even with the password.</li>
    </ul>

    <h3>Cloud Storage Security</h3>

    <p>Google Drive, Dropbox, OneDrive, and Box have become the shared file systems of small business remote work. They are generally secure platforms, but they are routinely misconfigured in ways that expose sensitive data:</p>

    <ul>
      <li>Files and folders shared with "anyone with the link" rather than specific people can be inadvertently exposed if the link is forwarded or discovered.</li>
      <li>Shared folders created for a project may remain accessible to people who left the project or the company years ago.</li>
      <li>Overly broad folder sharing — giving an outside vendor access to an entire department folder rather than the specific subfolder they need — violates least-privilege principles.</li>
    </ul>

    <p>Conduct a quarterly review of external sharing settings in your cloud storage. Most platforms provide a sharing report that shows every file and folder shared with external parties. Review that report, revoke any shares that are no longer needed, and change any "anyone with the link" shares to specific-person shares where possible.</p>

    <h3>The "Work Laptop Stays Work Laptop" Rule</h3>

    <p>One of the most common remote work security problems is scope creep on company devices. The company laptop that went home for remote work became the family computer. Kids use it for school. Spouses check personal email on it. Gaming software and browser extensions accumulate. Each of these activities expands the attack surface of a device that has access to your business systems.</p>

    <p>Establish and enforce a clear policy: company devices are for company use only. Personal browsing, personal email, games, and non-work applications are prohibited on company devices. If an employee genuinely needs a computer for personal use, that conversation should happen explicitly, and the solution is typically a personal computer — not the company machine.</p>

    <p>Many Ohio small businesses normalized the hybrid personal/work device during the pandemic out of necessity. Now is the time to formalize the boundary. The cost of a laptop for a family that needs one is far less than the cost of a breach that enters through a game downloaded on a company computer.</p>
    </article>`,
  },
  {
    chapter_number: 10,
    chapter_title: "Vendor and Supply Chain Risk",
    page_start: 112,
    page_end: 122,
    content_html: `<article class="chapter-content">
    <h2>Chapter 10: Vendor and Supply Chain Risk</h2>

    <p>In 2013, the Target Corporation suffered a data breach that exposed credit card and personal data for 40 million customers. The breach did not start at Target. It started with a small HVAC contractor in Sharpsburg, Pennsylvania, that had a remote access connection into Target's network for energy management purposes. Attackers compromised the contractor and used that access as a stepping stone into Target's systems.</p>

    <p>That breach became the canonical example of supply chain risk. A decade later, the lesson has not been fully absorbed by the small business community — in part because small businesses are more likely to be the contractor in this story than the Target. But the lesson runs both ways: your vendors represent risk to you, and your relationships with larger customers represent risk to them that those customers will increasingly hold you accountable for.</p>

    <h3>How Vendor Access Creates Risk</h3>

    <p>Think about every vendor or contractor who has some form of access to your business systems:</p>
    <ul>
      <li>Your managed service provider (IT company) has broad access to your systems, often including admin-level credentials</li>
      <li>Your bookkeeper or accountant may have access to QuickBooks or your payroll platform</li>
      <li>Your security camera vendor may have a remote access connection to your network</li>
      <li>Your point-of-sale vendor may have remote support access to your payment terminals</li>
      <li>Any SaaS software vendor has access to the data you store in their platform</li>
      <li>Contractors who bring their own devices and connect them to your network</li>
    </ul>

    <p>Each of these access relationships is a potential attack vector. If your IT managed service provider is compromised — a scenario that has played out many times in the past decade, with attackers targeting MSPs precisely because they hold the keys to hundreds of small business networks simultaneously — the attacker can reach every business that MSP manages. Evaluating your vendors' security practices is not just due diligence. It is a core part of your own security posture.</p>

    <h3>Vetting Vendors Who Need System Access</h3>

    <p>Before granting any vendor access to your systems, conduct a basic security evaluation. For most small business relationships, this does not require a formal audit — it requires asking a few key questions and evaluating the answers honestly:</p>

    <ol>
      <li><strong>Do you have a written cybersecurity policy?</strong> Any vendor with access to your systems should be able to produce a written security policy. Its absence is a significant red flag.</li>
      <li><strong>Do your employees receive cybersecurity training?</strong> The most common way vendor relationships become attack vectors is through phishing attacks on vendor employees. Ask about their training program.</li>
      <li><strong>Do you carry cyber insurance?</strong> A vendor with access to your systems who suffers a breach that impacts you may bear liability. Vendors who carry cyber insurance are signaling a level of security maturity worth noting.</li>
      <li><strong>What are your backup and incident response procedures?</strong> A vendor who processes your data should be able to tell you what happens to your data if they are breached and how quickly they would notify you.</li>
      <li><strong>Who specifically will have access to our systems, and how is that access controlled?</strong> Vendors should be able to describe specific access controls rather than providing a generic assurance.</li>
    </ol>

    <h3>Vendor Contract Language</h3>

    <p>When you engage any vendor who will have access to your systems or will handle your customer data, the contract should include explicit cybersecurity provisions. At minimum:</p>

    <ul>
      <li>A requirement that the vendor maintain reasonable security controls (reference a specific standard like CIS Controls or NIST CSF)</li>
      <li>A breach notification requirement: the vendor must notify you within 24 to 48 hours of discovering any incident that may have exposed your data</li>
      <li>A data handling clause specifying how your data will be used, stored, and deleted</li>
      <li>A right to audit clause allowing you to request security documentation or assessments</li>
      <li>Liability provisions that allocate responsibility if a vendor breach causes harm to your customers</li>
    </ul>

    <p>For smaller vendor relationships, these provisions need not be lengthy or legalistic. A simple addendum to your service agreement is sufficient. For larger vendors with access to critical systems, consider working with legal counsel to ensure the provisions are enforceable.</p>

    <h3>Software Supply Chain Risk</h3>

    <p>The SolarWinds attack of 2020 demonstrated a category of risk that previously seemed to belong only to large enterprises: software supply chain compromise. In that incident, attackers inserted malicious code into a legitimate software update distributed by SolarWinds, a widely used IT management platform. When thousands of organizations installed what appeared to be a routine software update, they were actually installing malware that gave attackers persistent access to their networks.</p>

    <p>Small Ohio businesses are not immune to software supply chain attacks. Any software you install from any vendor could theoretically contain malicious code. Practical defenses:</p>

    <ul>
      <li>Download software only from official vendor websites or established application stores — not from third-party download sites</li>
      <li>Verify checksums or code signatures when vendors provide them</li>
      <li>Monitor vendor security advisories for the software you use and act quickly when vulnerabilities are announced</li>
      <li>Maintain an inventory of all software installed on company systems — you cannot monitor what you do not know you have</li>
      <li>Be cautious about browser extensions and plugins, which can be compromised independently of the main software product</li>
    </ul>

    <h3>Ohio Manufacturing and ERP Supply Chain Specifics</h3>

    <p>For Ohio manufacturing businesses operating as suppliers in automotive, aerospace, or other industrial supply chains, vendor risk flows in both directions. Your major customers — the Tier 1 manufacturers and OEMs — are increasingly auditing their suppliers' cybersecurity practices. IATF 16949 automotive quality standards now explicitly include cybersecurity expectations. CMMC (Cybersecurity Maturity Model Certification) is a requirement for any business in the defense supply chain, and those requirements are percolating through the broader manufacturing sector.</p>

    <p>If your ERP system connects electronically to a customer's systems through EDI or supplier portals, treat that connection with the same seriousness as any other high-risk access point. Monitor it, log it, and restrict it to the minimum access necessary. A breach that enters through your ERP's customer portal connection can damage both your relationship with that customer and your entire business.</p>

    <p>Vendor and supply chain security is one of the more complex areas of small business security because it requires evaluating entities outside your control. But the principles are straightforward: know who has access to your systems, ask the right questions before granting that access, and establish contract language that holds vendors accountable. These are business practices that good vendors welcome — and that should make you suspicious of vendors who resist them.</p>
    </article>`,
  },
  {
    chapter_number: 11,
    chapter_title: "Cyber Insurance: What You Need to Know",
    page_start: 123,
    page_end: 132,
    content_html: `<article class="chapter-content">
    <h2>Chapter 11: Cyber Insurance: What You Need to Know</h2>

    <p>The cyber insurance market has undergone a dramatic transformation in the past five years. Following a wave of catastrophic ransomware losses in 2020 and 2021, insurers tightened underwriting standards significantly, raised premiums sharply, and added requirements that small businesses had rarely faced before. Today, getting good cyber insurance coverage requires demonstrating real security controls — and understanding what your policy actually covers before you need to file a claim.</p>

    <h3>What Cyber Insurance Covers</h3>

    <p>A well-structured cyber insurance policy covers two broad categories of loss:</p>

    <p><strong>First-party coverage</strong> pays for your direct costs when you suffer a cyber incident:</p>
    <ul>
      <li>Business interruption losses during the time your systems are down</li>
      <li>Data recovery and restoration costs</li>
      <li>Ransomware payments (with insurer approval)</li>
      <li>Cyber extortion expenses (including negotiation by professional negotiators)</li>
      <li>Incident response costs (forensics, legal counsel, notification letters)</li>
      <li>Crisis communications and public relations expenses</li>
    </ul>

    <p><strong>Third-party coverage</strong> pays for claims made against you by customers, vendors, or business partners:</p>
    <ul>
      <li>Regulatory fines and penalties resulting from a breach (within the limits of what is insurable — not all fines are insurable in all jurisdictions)</li>
      <li>Legal defense costs if customers sue you for failing to protect their data</li>
      <li>Liability for damages claimed by affected third parties</li>
    </ul>

    <h3>What Insurers Require Now</h3>

    <p>The application for cyber insurance has become substantially more detailed. Insurers now ask specific technical questions and require specific controls as a condition of coverage. If you answer these questions inaccurately on your application and then file a claim, the insurer may deny the claim on grounds of misrepresentation. Answer honestly, and if you do not yet have certain controls, note that in your application and discuss a timeline for implementation with your broker.</p>

    <p>Controls that virtually all cyber insurers now require or strongly incentivize:</p>
    <ul>
      <li><strong>Multi-factor authentication on email and remote access:</strong> This is now a near-universal requirement. Many insurers will decline coverage entirely if MFA is not enabled on email and VPN/remote access systems.</li>
      <li><strong>Endpoint detection and response (EDR):</strong> Basic antivirus is no longer sufficient for most insurers. They want behavioral detection tools as described in Chapter 6.</li>
      <li><strong>Offline, tested backups:</strong> Insurers increasingly require evidence that backups exist, are stored separately from primary systems, and have been tested. The 3-2-1 backup rule from Chapter 4 aligns directly with insurer requirements.</li>
      <li><strong>Privileged access management:</strong> Controls around who has admin access to what systems, as described in Chapter 5.</li>
      <li><strong>Security awareness training:</strong> Documented training for employees on phishing and social engineering.</li>
      <li><strong>Patch management:</strong> Evidence that critical patches are applied within a defined timeframe (usually 30 days for critical vulnerabilities).</li>
    </ul>

    <h3>How to Get the Best Rate</h3>

    <p>Cyber insurance premiums are based on risk, and risk is a function of your security controls and your industry. Businesses in higher-risk industries (healthcare, financial services, law) will pay more than lower-risk industries. But within your industry, the premium difference between a business with strong controls and one with weak controls can be 30% to 50%.</p>

    <p>Before applying for or renewing cyber insurance, implement the controls described in Chapters 3 through 6. Document them. Then work with an insurance agent who specializes in commercial coverage for small businesses — not a generalist who handles your auto and property insurance on the side. Several Ohio-based insurance agencies specialize in cyber coverage for small and mid-sized businesses, and they can help you present your security program in the most favorable light to underwriters.</p>

    <h3>Critical Policy Exclusions</h3>

    <p>Read your policy carefully for exclusions, particularly these common ones:</p>

    <ul>
      <li><strong>Unencrypted data:</strong> Many policies exclude or reduce coverage for breaches involving data that was not encrypted at rest. Enabling encryption as described in Chapter 6 is both a security control and a policy compliance requirement.</li>
      <li><strong>War exclusions:</strong> Some policies exclude attacks attributed to nation-state actors. In the aftermath of Russia's invasion of Ukraine, several high-profile coverage disputes arose over whether ransomware attacks linked to Russian criminal groups qualified as "war" under policy language. This is an evolving area — ask your broker specifically about how nation-state attribution is handled in your policy.</li>
      <li><strong>Prior breach:</strong> If you had a known (or should-have-known) security incident before the policy period, coverage for related claims may be excluded.</li>
      <li><strong>Failure to maintain controls:</strong> If you represented to the insurer that you had certain controls in place, and a subsequent investigation shows those controls were not actually implemented, the insurer may deny your claim on misrepresentation grounds.</li>
    </ul>

    <h3>The Cost vs. Coverage Calculation</h3>

    <p>A typical small Ohio business with ten to fifty employees, good security controls, and no prior incidents can expect to pay $1,500 to $5,000 per year for a cyber insurance policy with $1 million to $2 million in coverage. That coverage can pay for ransomware response, business interruption losses, legal defense, and regulatory penalties that might otherwise total $100,000 to $500,000 or more in a single incident.</p>

    <p>The ROI is clear. Cyber insurance, combined with the security controls described in this playbook, creates a two-layer defense: the controls prevent most attacks, and the insurance provides financial recovery when an attack does succeed. Neither layer is optional — controls without insurance leaves you exposed to financial ruin from successful attacks, and insurance without controls means you will pay high premiums for a policy your behavior is constantly putting at risk of denial.</p>
    </article>`,
  },
  {
    chapter_number: 12,
    chapter_title: "Employee Training: Your Human Firewall",
    page_start: 133,
    page_end: 142,
    content_html: `<article class="chapter-content">
    <h2>Chapter 12: Employee Training: Your Human Firewall</h2>

    <p>Your technology can be perfect — EDR deployed on every device, MFA on every account, backups tested monthly — and one employee who clicks the wrong link can undo it all. Humans are simultaneously the most important security asset and the most critical vulnerability in any small business. This chapter is about turning your team from a liability into a genuine first line of defense.</p>

    <h3>Why Traditional Security Training Fails</h3>

    <p>Most small businesses that do any security training at all do something like this: once a year, a manager sends employees a link to a forty-minute video about cybersecurity awareness. Employees watch it (or run it in another tab while they do something else), click through a completion quiz, and check the box. The manager files the certificate, and security training is "done" for the year.</p>

    <p>This approach produces almost no behavior change. The research is unambiguous: knowledge alone does not drive security behavior. Employees who could pass a quiz about phishing immediately after watching the training video click phishing emails at nearly the same rate as those who received no training. What changes behavior is practice — regular, realistic simulation that creates muscle memory for recognizing and responding to threats.</p>

    <h3>Monthly Phishing Simulations: The Core Practice</h3>

    <p>The foundation of effective small business security training is monthly phishing simulations. This means sending employees a realistic fake phishing email — carefully crafted to look like the kinds of emails attackers actually send — and measuring who clicks. Employees who click receive immediate, non-punitive feedback: a brief message that explains they fell for a simulated phishing attempt and provides a two-minute refresher on what to look for.</p>

    <p>The data from a well-run phishing simulation program is striking. Organizations that run regular simulations typically see click rates drop from 25% to 30% in the first month to under 5% within six months. That improvement is not theoretical — it represents a measurable reduction in the probability that a real phishing attack succeeds against your team.</p>

    <p>Platforms appropriate for small Ohio businesses include: <strong>KnowBe4</strong> (the market leader, strong template library), <strong>Proofpoint Security Awareness Training</strong>, and <strong>Microsoft Attack Simulator</strong> (included with Microsoft 365 Business Premium at no additional cost). All three offer simulation plus microlearning modules that deploy automatically when an employee clicks a simulated phish.</p>

    <h3>The Security Champion Model</h3>

    <p>In small businesses, you cannot afford a dedicated security team. But you can designate one employee per team or department as a security champion — a person who receives a bit of extra training, serves as the point of contact for security questions from their coworkers, and reports potential security issues to you or your IT contact.</p>

    <p>Security champions do not need to be IT experts. They need to be curious, respected by their coworkers, and willing to take security questions seriously. The security champion role works because it distributes security awareness through the organization in a way that feels organic and peer-driven rather than top-down and compliance-oriented. Employees are more likely to ask a trusted coworker "does this email look weird to you?" than to call the IT helpdesk.</p>

    <h3>Security Culture vs. Security Fear Culture</h3>

    <p>One of the most common mistakes in small business security training is creating a fear culture around security mistakes. When employees are afraid that clicking a phishing simulation will get them in trouble, they stop reporting real suspicious activity for fear of punishment. The phishing simulation becomes a punitive event rather than a learning opportunity, and the security culture degrades.</p>

    <p>Effective security culture is built on a simple principle: mistakes happen, and reporting them quickly is the most valuable thing an employee can do. An employee who clicks a malicious link and reports it immediately gives you hours to contain the breach. An employee who clicks the same link and says nothing because they are embarrassed gives the attacker days of undetected access.</p>

    <p>Communicate explicitly: there is no blame for honest mistakes, only recognition for fast reporting. Celebrate employees who catch phishing attempts and report them. Make the reporting process simple — a dedicated email address or a one-click button in your email client. The businesses with the strongest security cultures are the ones where employees treat security awareness as something they do for each other and for their customers, not something they do because compliance requires it.</p>

    <h3>Tabletop Exercises for Small Teams</h3>

    <p>A tabletop exercise is a structured discussion of a hypothetical security scenario. No systems are actually compromised — the team simply talks through what they would do if a specific event occurred. For a small business, a ninety-minute tabletop exercise once per quarter builds the decision-making muscles that matter when a real incident happens.</p>

    <p>Sample scenarios for Ohio small businesses:</p>
    <ul>
      <li>"It is Monday morning and every computer in the office shows a ransom note. What do we do first? Who do we call? In what order?"</li>
      <li>"Our bookkeeper just realized she may have fallen for a phishing email and given her QuickBooks credentials to an attacker. What do we do in the next hour?"</li>
      <li>"We received a call from our bank that there are suspicious wire transfer attempts on our business account. What are our immediate steps?"</li>
      <li>"An employee's laptop was stolen from their car last night. What do we do?"</li>
    </ul>

    <p>Running these scenarios before they happen ensures that when they do happen, your team has a framework to act on rather than having to think from scratch under pressure. Contact your local SCORE chapter — there are active chapters in Columbus, Cleveland, Cincinnati, and Dayton — as several SCORE mentors specialize in small business security planning and can facilitate tabletop exercises at no cost.</p>

    <h3>Measuring Improvement</h3>

    <p>Security training without measurement is theater. Track these metrics over time:</p>
    <ul>
      <li>Phishing simulation click rate (monthly, by team)</li>
      <li>Number of suspicious emails reported by employees (positive indicator — employees who report are engaged)</li>
      <li>Time to report a potential incident after discovery</li>
      <li>Training completion rates on required modules</li>
    </ul>

    <p>When you see phishing click rates falling, when you see employees proactively forwarding suspicious emails to you for evaluation, when tabletop exercises generate confident discussion rather than blank stares — that is what a security culture looks like. It is achievable in a small Ohio business in six to twelve months with consistent, properly designed training.</p>
    </article>`,
  },
  {
    chapter_number: 13,
    chapter_title: "Incident Response: When Something Goes Wrong",
    page_start: 143,
    page_end: 153,
    content_html: `<article class="chapter-content">
    <h2>Chapter 13: Incident Response: When Something Goes Wrong</h2>

    <p>Every business, regardless of how well-defended, should plan for the possibility that something goes wrong. That is not pessimism — it is the same logic that drives you to carry fire insurance even though you run a tight ship. An incident response plan does not mean you expect to fail. It means you have decided that if something bad happens, you will respond quickly and effectively rather than improvising under pressure.</p>

    <p>This chapter provides a simplified but complete incident response framework designed specifically for small businesses. It does not require an IT department. It requires a document, a contact list, and a team that has thought through the scenarios at least once before they happen.</p>

    <h3>The Five Phases of Incident Response</h3>

    <h3>Phase 1: Identification</h3>

    <p><strong>What it means:</strong> Recognizing that a security incident is occurring or may have occurred. This is often the hardest phase because symptoms are sometimes subtle — slightly slower system performance, an unusual login notification, an employee who mentions that "something weird happened" with their email.</p>

    <p><strong>Responsible party:</strong> Any employee who notices something unusual. The culture around reporting (Chapter 12) matters enormously here.</p>

    <p><strong>Key actions:</strong> Document what was observed, when it was observed, and on which systems. Do not try to investigate or fix before reporting. Call your designated incident contact (IT provider, business owner, security champion) immediately.</p>

    <p><strong>What NOT to do:</strong> Do not try to clean up the problem yourself before telling anyone. Do not reboot or shut down affected systems (may destroy forensic evidence). Do not share information about the incident on social media or with customers before you understand what happened.</p>

    <h3>Phase 2: Containment</h3>

    <p><strong>What it means:</strong> Stopping the incident from spreading or causing additional damage. Speed matters here — every minute an active threat remains in your network is another minute it can move laterally to other systems, exfiltrate additional data, or complete its destructive work.</p>

    <p><strong>Responsible party:</strong> Business owner plus IT provider (in-house or managed service provider).</p>

    <p><strong>Key actions:</strong></p>
    <ul>
      <li>Isolate affected systems from the network (unplug ethernet, disable Wi-Fi) without powering them off</li>
      <li>Revoke credentials that may be compromised (email passwords, VPN access)</li>
      <li>Preserve evidence — take photographs of ransom notes, log files, and any anomalous system behavior</li>
      <li>Activate your cyber insurance by calling the hotline number on your policy</li>
    </ul>

    <h3>Phase 3: Eradication</h3>

    <p><strong>What it means:</strong> Finding and removing the source of the incident from your environment. This requires understanding how the attacker got in and ensuring they no longer have access.</p>

    <p><strong>Responsible party:</strong> Cybersecurity incident response firm (this is not DIY work unless you have significant security expertise on staff).</p>

    <p><strong>Key actions:</strong> Let the professionals lead. Provide them with access and cooperation. Key questions they will answer: how did the attacker get in, what did they access, what did they change, and what additional access do they still have?</p>

    <h3>Phase 4: Recovery</h3>

    <p><strong>What it means:</strong> Restoring your systems to normal operation from a known-good state.</p>

    <p><strong>Key actions:</strong> Restore from clean backups (this is why backup integrity matters so much — you are betting on these in your worst moment), rebuild compromised systems from scratch rather than trying to clean them, and verify that every restored system is patched and configured correctly before bringing it back online. Do not bring systems online until the eradication phase is confirmed complete — restoring to a still-compromised environment simply reinfects your clean systems.</p>

    <h3>Phase 5: Lessons Learned</h3>

    <p><strong>What it means:</strong> A structured review of what happened, how your response worked, and what needs to change to prevent recurrence.</p>

    <p><strong>Key actions:</strong> Schedule a lessons-learned meeting within thirty days of recovery. Document the timeline of the incident, what worked in your response, what failed, and what specific control changes will prevent a recurrence. Update your incident response plan based on what you learned.</p>

    <h3>Your Critical Contacts List</h3>

    <p>Print this list, laminate it, and put it in the office where any employee can find it. Also store it somewhere offsite (in personal email or a personal phone) so you can access it if your office systems are down:</p>

    <ul>
      <li><strong>IT Provider / MSP:</strong> [Your provider's name and 24/7 emergency number]</li>
      <li><strong>Cyber Insurance Hotline:</strong> [From your policy declarations page]</li>
      <li><strong>Legal Counsel:</strong> [Your business attorney, specifically one familiar with cyber incident response]</li>
      <li><strong>FBI Cleveland Field Office (Cybercrime):</strong> (216) 522-1400</li>
      <li><strong>Ohio Attorney General Cybercrime Unit:</strong> (800) 282-0515</li>
      <li><strong>CISA 24/7 Hotline:</strong> 1-888-282-0870</li>
      <li><strong>Business Bank Fraud Line:</strong> [From the back of your business debit card]</li>
      <li><strong>Payroll Provider Emergency Line:</strong> [ADP, Paychex, or your provider]</li>
    </ul>

    <h3>Security Incident vs. Reportable Breach</h3>

    <p>Not every security incident is a reportable data breach. A security incident is any event that compromises the confidentiality, integrity, or availability of your systems or data. A reportable breach is a subset of incidents that triggers legal notification obligations.</p>

    <p>An incident becomes a reportable breach when it involves the unauthorized access to, or acquisition of, personal information as defined under applicable law. Ohio's breach notification statute, HIPAA, and other regulations each have specific definitions of what constitutes personal information for notification purposes. This determination — whether an incident is a reportable breach and who must be notified — requires legal counsel. Engage your attorney in the eradication phase as soon as possible after discovery, before making any public statements or sending any customer notifications.</p>

    <p>The single most important thing you can do today to prepare for incident response: write down the critical contacts list above, print it, and tell your key employees where to find it. Businesses that survive security incidents well are not necessarily the ones with the most sophisticated defenses — they are the ones who knew exactly what to do and who to call in the first hour.</p>
    </article>`,
  },
  {
    chapter_number: 14,
    chapter_title: "The 90-Day Cybersecurity Roadmap",
    page_start: 154,
    page_end: 163,
    content_html: `<article class="chapter-content">
    <h2>Chapter 14: The 90-Day Cybersecurity Roadmap</h2>

    <p>You have read thirteen chapters of context, case studies, and specific recommendations. Now it is time to build the actual plan. This chapter gives you a concrete, prioritized 90-day roadmap that moves your business from wherever you are today to a meaningfully more secure posture. It is designed to be realistic for a business where the owner wears ten hats and does not have unlimited budget or time.</p>

    <h3>Month 1: Quick Wins That Block Most Attacks</h3>

    <p>Month 1 focuses on the controls that provide the highest return on the least investment. These are the changes that would have prevented the majority of successful attacks against small Ohio businesses over the past five years.</p>

    <p><strong>Week 1-2: Multi-Factor Authentication</strong></p>
    <ul>
      <li>Enable MFA on all business email accounts (Microsoft 365 or Google Workspace) — this is free and takes fifteen minutes per user</li>
      <li>Enable MFA on online banking and payroll platforms</li>
      <li>Enable MFA on QuickBooks Online or other accounting software</li>
      <li>Download Microsoft Authenticator or Google Authenticator on your smartphone before starting</li>
    </ul>

    <p><strong>Week 2-3: Password Manager</strong></p>
    <ul>
      <li>Select a platform (1Password Business, Bitwarden Teams, or LastPass Business)</li>
      <li>Create the organization account and invite all employees</li>
      <li>Spend one week migrating all business passwords into the vault</li>
      <li>Train employees on basic usage (thirty-minute session covers everything they need)</li>
    </ul>

    <p><strong>Week 3-4: Email Authentication (SPF, DKIM, DMARC)</strong></p>
    <ul>
      <li>Ask your IT provider or email provider to configure SPF and DKIM for your domain</li>
      <li>Set DMARC to "quarantine" mode initially, moving to "reject" after two weeks of monitoring</li>
      <li>Verify your configuration using the free MXToolbox DMARC analyzer (mxtoolbox.com)</li>
    </ul>

    <p><strong>Expected outcome after Month 1:</strong> The vast majority of credential-based attacks (credential stuffing, stolen password exploitation, email account compromise) are now blocked by MFA. The spoofing attacks described in Chapter 3 are now defeated by DMARC. Your password hygiene is transformed. These three changes alone address the most common attack vectors against small businesses.</p>

    <h3>Month 2: Infrastructure Fixes</h3>

    <p><strong>Backup Implementation</strong></p>
    <ul>
      <li>Set up cloud backup for all critical systems (Backblaze B2, Acronis, or equivalent)</li>
      <li>Verify your local backup system is functioning and that backups are running daily</li>
      <li>Test a restore of representative files from both local and cloud backup</li>
      <li>Document your backup schedule and test results</li>
    </ul>

    <p><strong>Network Security</strong></p>
    <ul>
      <li>Change default router admin password</li>
      <li>Create a separate guest Wi-Fi network isolated from your business network</li>
      <li>Disable WPS on your router</li>
      <li>Enable automatic updates on all company computers</li>
    </ul>

    <p><strong>Device Encryption</strong></p>
    <ul>
      <li>Enable BitLocker on all Windows laptops and computers</li>
      <li>Enable FileVault on all Mac laptops</li>
      <li>Verify encryption is enabled on all mobile devices</li>
    </ul>

    <p><strong>Endpoint Protection</strong></p>
    <ul>
      <li>If using Microsoft 365 Business Premium, activate Microsoft Defender for Business</li>
      <li>If not, select and deploy an EDR product appropriate for your environment</li>
      <li>Verify all devices are enrolled and reporting</li>
    </ul>

    <p><strong>Expected outcome after Month 2:</strong> Ransomware is now survivable — your backup infrastructure allows recovery without paying ransom. Device theft becomes a manageable hardware loss rather than a data breach. Your network perimeter is tightened.</p>

    <h3>Month 3: People and Process</h3>

    <p><strong>Security Awareness Training Launch</strong></p>
    <ul>
      <li>Select and set up a phishing simulation platform</li>
      <li>Send your first phishing simulation and document baseline click rate</li>
      <li>Designate security champions for each team or department</li>
      <li>Schedule quarterly tabletop exercises</li>
    </ul>

    <p><strong>Incident Response Plan</strong></p>
    <ul>
      <li>Create your critical contacts list (see Chapter 13 template)</li>
      <li>Define and communicate who is responsible for what in an incident</li>
      <li>Run your first tabletop exercise (use the ransomware scenario from Chapter 12)</li>
      <li>Post the contacts list in a visible location and in your password manager</li>
    </ul>

    <p><strong>Vendor and Access Review</strong></p>
    <ul>
      <li>Inventory all vendors with system access and document what access they have</li>
      <li>Revoke access for any vendor whose relationship has ended</li>
      <li>Review all employee system access and revoke anything that does not meet least-privilege criteria</li>
      <li>Add cybersecurity provisions to vendor contract templates for future engagements</li>
    </ul>

    <p><strong>Cyber Insurance Review</strong></p>
    <ul>
      <li>Request a cyber insurance quote if you do not have coverage</li>
      <li>Review your existing policy for the exclusions described in Chapter 11</li>
      <li>Verify that the controls you implemented in Months 1 and 2 are accurately represented in your application</li>
    </ul>

    <h3>The Security Budget Framework</h3>

    <p>How much should a small Ohio business invest in cybersecurity? A commonly cited target is 5% to 10% of your IT budget. For small businesses that do not have a formal IT budget, a practical approach is to budget based on employee count:</p>

    <ul>
      <li><strong>5-15 employees:</strong> $5,000 to $15,000 per year covers password manager, MFA setup, EDR, backup services, email security, and basic training</li>
      <li><strong>15-50 employees:</strong> $15,000 to $40,000 per year adds a more robust managed security service, formal phishing training platform, and cyber insurance</li>
    </ul>

    <h3>Free and Low-Cost Resources</h3>

    <ul>
      <li><strong>CISA Small and Medium Business Resources:</strong> cisa.gov/small-and-medium-businesses — free guides, assessment tools, and training materials</li>
      <li><strong>Ohio Small Business Development Centers (SBDC):</strong> The Ohio SBDC network has advisors who can assist with cybersecurity planning. ohiosbdc.ohio.gov</li>
      <li><strong>SBA Cybersecurity Resources:</strong> sba.gov/business-guide/manage-your-business/stay-safe-cyberthreats</li>
      <li><strong>SCORE Ohio:</strong> Free mentoring from experienced business advisors, including several with cybersecurity specializations. score.org</li>
    </ul>

    <p>The 90-day roadmap is designed to be achievable alongside running your business. You do not need to do everything in month 1. You need to start. The businesses that get breached after reading a book like this are the ones that found the information interesting but never quite got around to implementing it. The ones that implement even the Month 1 basics are vastly better positioned than they were before. Start with MFA. Start today.</p>
    </article>`,
  },
  {
    chapter_number: 15,
    chapter_title: "Field Guide: Quick Reference for Small Business Owners",
    page_start: 164,
    page_end: 170,
    content_html: `<article class="chapter-content">
    <h2>Chapter 15: Field Guide: Quick Reference for Small Business Owners</h2>

    <p>This chapter is designed to be torn out, printed, laminated, and posted. It is the take-home reference that distills the actionable content of this entire playbook into checklists, templates, and emergency contacts. Return to it regularly. Update it as your business changes.</p>

    <h3>Daily Security Habits</h3>
    <ul>
      <li>Review banking transaction alerts for anything unusual</li>
      <li>Before acting on any email requesting money or access changes — make a verbal verification call</li>
      <li>Report any suspicious email to your security contact before clicking anything</li>
    </ul>

    <h3>Weekly Security Checks</h3>
    <ul>
      <li>Verify that backups completed successfully (check the backup console or receive an automated confirmation)</li>
      <li>Review new user accounts or access changes in your business software</li>
      <li>Check for any unusual login alerts or MFA push notifications you did not initiate</li>
    </ul>

    <h3>Monthly Security Reviews</h3>
    <ul>
      <li>Test-restore a sample of files from backup to verify integrity</li>
      <li>Review phishing simulation results and training completion rates</li>
      <li>Check software and system update status — confirm critical patches are applied</li>
      <li>Review vendor access — remove any vendors whose engagement has ended</li>
    </ul>

    <h3>Quarterly Security Audits</h3>
    <ul>
      <li>Review all employee system access and apply least-privilege corrections</li>
      <li>Run a tabletop incident response exercise with your team</li>
      <li>Review cloud storage external sharing settings</li>
      <li>Update your critical contacts list if any vendor or provider relationships have changed</li>
      <li>Review and update BYOD and remote work policy compliance</li>
    </ul>

    <h3>Emergency Contacts</h3>
    <ul>
      <li><strong>CISA 24/7 Hotline:</strong> 1-888-282-0870</li>
      <li><strong>FBI Cleveland (Cybercrime):</strong> (216) 522-1400</li>
      <li><strong>FBI IC3 Online Reporting:</strong> ic3.gov</li>
      <li><strong>Ohio Attorney General Consumer Protection / Cybercrime:</strong> (800) 282-0515</li>
      <li><strong>Your Cyber Insurance Hotline:</strong> ___________________________</li>
      <li><strong>Your IT Provider / MSP Emergency Line:</strong> ___________________________</li>
      <li><strong>Your Business Attorney:</strong> ___________________________</li>
      <li><strong>Your Business Bank Fraud Line:</strong> ___________________________</li>
    </ul>

    <h3>Employee Onboarding Security Checklist</h3>
    <ol>
      <li>Create unique business email account (do not share credentials)</li>
      <li>Enable MFA on email account</li>
      <li>Add employee to password manager vault with appropriate shared credentials only</li>
      <li>Grant system access only to applications required for their role (least privilege)</li>
      <li>Enroll company device in MDM / endpoint management if applicable</li>
      <li>Enable BitLocker or FileVault on issued laptop</li>
      <li>Complete security awareness training module (required before accessing customer data)</li>
      <li>Review and sign BYOD policy and acceptable use policy</li>
      <li>Add to phishing simulation program</li>
      <li>Introduce to designated security champion for their team</li>
    </ol>

    <h3>Employee Offboarding Checklist</h3>
    <ol>
      <li>Disable email account immediately upon departure (within 1 hour)</li>
      <li>Remove employee from password manager vault (revokes all shared credentials)</li>
      <li>Revoke access to all business software: QuickBooks, payroll, CRM, project management</li>
      <li>Change any shared passwords the employee had access to (Wi-Fi, alarm codes, shared vendor logins)</li>
      <li>Revoke physical access (key fob, alarm codes, door keys)</li>
      <li>Remote wipe company data from personal devices if applicable</li>
      <li>Collect company devices (laptop, phone, tokens)</li>
      <li>If employee had admin access: review audit logs for that employee for the prior 30 days</li>
      <li>Notify bank if employee had authorized access to business banking</li>
      <li>Update emergency contact list if employee was a security point of contact</li>
    </ol>

    <h3>Vendor Security Questionnaire (Key Questions)</h3>
    <ol>
      <li>Do you maintain a written cybersecurity policy, and can you provide documentation of your security controls?</li>
      <li>Do you carry cyber liability insurance, and what is your coverage limit? Will you provide a certificate of insurance?</li>
      <li>In the event of a security incident involving our data, how quickly will you notify us, and what is your incident response process?</li>
    </ol>

    <h3>Incident Report One-Pager</h3>
    <p>When something happens, document the following immediately and preserve the document:</p>
    <ul>
      <li><strong>Date and time of discovery:</strong></li>
      <li><strong>Discovered by:</strong></li>
      <li><strong>Systems or accounts affected:</strong></li>
      <li><strong>What was observed (describe exactly what was seen):</strong></li>
      <li><strong>Actions already taken (e.g., disconnected device, changed password):</strong></li>
      <li><strong>Contacts notified and time of notification:</strong></li>
      <li><strong>Current status:</strong></li>
    </ul>

    <h3>Where to Get Help in Ohio</h3>
    <ul>
      <li><strong>Ohio SBDC:</strong> ohiosbdc.ohio.gov — free business advisory services including cybersecurity planning</li>
      <li><strong>SCORE Ohio Chapters:</strong> score.org/find-mentor — Columbus, Cleveland, Cincinnati, Dayton, and more</li>
      <li><strong>Ohio Chamber of Commerce:</strong> ohiochamber.com — member resources including cybersecurity guidance for Ohio businesses</li>
      <li><strong>CISA Resources for Small Business:</strong> cisa.gov/resources-tools/resources/small-and-medium-businesses</li>
      <li><strong>Ohio Department of Commerce — Data Breach Reporting:</strong> ohioattorneygeneral.gov/Business/Services-for-Business/Data-Protection</li>
    </ul>

    <h3>The Single Most Important Thing to Remember</h3>

    <p>If you take only one practice from this entire playbook, take this one:</p>

    <p><strong>The verification call.</strong></p>

    <p>Whenever anyone asks you — by email, by text, by any written communication — to move money, change banking information, authorize a wire transfer, update vendor payment details, grant system access, or take any other high-stakes financial or security action: stop. Pick up the phone. Call the person who made the request on a number you already have in your contacts — not a number from the email, not a number from a message that arrived alongside the request. A number you had before the request came in.</p>

    <p>Talk to them. Confirm the request verbally. Take thirty seconds.</p>

    <p>This single habit, applied consistently by everyone in your organization who handles money or system access, prevents the majority of financial fraud targeting small Ohio businesses. It costs nothing. It requires no technology. It works against the most sophisticated social engineering attacks in existence because those attacks are defeated by any out-of-band verification that reaches the real person.</p>

    <p>The businesses we have seen survive close calls — the ones where an attacker almost got through but did not — almost always have one thing in common: someone in the organization paused and made that call. The businesses we have seen sustain serious losses almost always have one thing in common: someone did not.</p>

    <p>Make the call. Every time. No exceptions.</p>

    <p><em>— The InVision Network Education Team, Kettering, Ohio, 2026</em></p>
    </article>`,
  },
];
