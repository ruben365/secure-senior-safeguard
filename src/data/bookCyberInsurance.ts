import type { BookChapter } from "@/config/bookCatalog";

/**
 * Cyber Insurance Buyer's Guide
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 10 chapters (0–9), ~115 pages, Ohio small business focus, ROI-driven
 */
export const CYBER_INSURANCE_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Cyber Insurance Buyer's Guide</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">What Ohio Small Business Owners Need to Know Before They Buy</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio &middot; 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright &copy; 2026 InVision Network. All rights reserved.</p><p>InVision Network Press &middot; Kettering, Ohio 45440</p><p><em>For educational purposes only.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — Cyber Insurance Is No Longer Optional for Ohio Small Businesses",
    page_start: 4,
    page_end: 17,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — Cyber Insurance Is No Longer Optional for Ohio Small Businesses</h2>

<p>There was a time when cyber insurance was a product that only large corporations purchased — Fortune 500 companies with complex IT environments, hospitals with thousands of patient records, financial institutions managing billions in assets. That time is gone. Cyber insurance has become table stakes for any business that operates digitally, which in 2026 means virtually every business in Ohio, regardless of size.</p>

<p>The shift happened because the threat landscape changed. Cybercriminals who once focused exclusively on large enterprises discovered that small businesses were far easier to breach and almost as profitable. Ransomware gangs developed automated attack toolkits that allowed them to target thousands of small businesses simultaneously at minimal cost. Business email compromise (BEC) fraud — in which attackers impersonate executives or vendors to trick employees into wiring money — became industrialized. The result is a threat environment in which a twelve-person accounting firm in Columbus faces essentially the same categories of attack as a company with a thousand employees, but with a fraction of the defenses.</p>

<p>The financial consequences have followed. The median cost of a small business cyber incident in the United States now falls between $120,000 and $200,000 when you account for all the elements: forensic investigation to understand what happened and close the vulnerability, notification costs for affected customers and regulators, credit monitoring services for affected individuals, business interruption losses during the recovery period, legal fees, and potential regulatory fines. For a business with annual revenue under $2 million, a number in that range is often an existential event.</p>

<h3>Ohio-Specific Legal Exposure</h3>

<p>Ohio's breach notification law — Ohio Revised Code Section 1349.19 — requires businesses that experience a breach of personal information to notify affected Ohio residents within a reasonable time, and to notify the Ohio Attorney General if the breach affects 500 or more Ohio residents. The practical cost of breach notification is substantial even before any regulatory action: envelope stuffing, postage, call center setup, credit monitoring enrollment, and public relations management all add up quickly. A breach affecting 2,000 customers can cost $50,000 in notification costs alone.</p>

<p>Beyond notification, Ohio businesses face civil liability from customers and business partners whose data was exposed. Class action lawsuits arising from data breaches are increasingly common even against small businesses. Defense costs — regardless of the ultimate outcome — can easily reach six figures.</p>

<h3>What Cyber Insurance Actually Pays For</h3>

<p>Understanding what cyber insurance covers — and what it does not — is the core of this book, and we will spend several chapters on it. But at the highest level, cyber insurance pays for two categories of costs: first-party costs (your own losses) and third-party costs (claims made against you by others).</p>

<p>First-party costs include the forensic investigation, breach notification, credit monitoring for affected individuals, business interruption losses, ransomware payments (subject to policy limits and conditions), and system restoration costs. Third-party costs include legal defense against customer lawsuits, regulatory fines and penalties, and media liability claims.</p>

<p>The combination of these coverages is what makes cyber insurance different from the general liability policies most small businesses already carry. Your general liability policy almost certainly excludes cyber incidents. If it does not explicitly include cyber coverage, assume you are not covered.</p>

<h3>Two Questions Every Ohio Business Owner Should Ask Their Agent</h3>

<p>Before this book dives into the technical details of cyber insurance, there are two questions that cut to the heart of your current situation. Ask your insurance agent these questions at your next conversation.</p>

<p>First: "Does my current commercial general liability policy cover cyber incidents, and if so, what are the specific coverage limits and exclusions?" Many small business owners assume that their existing insurance covers cyber events. Most of the time, it does not, or the coverage is so limited as to be practically meaningless. Getting a clear, written answer to this question establishes your starting point.</p>

<p>Second: "If my business experienced a ransomware attack tomorrow and was down for a week, what would my insurance pay, and what would I have to pay out of pocket?" This question forces a concrete conversation about business interruption coverage, waiting periods, and coverage limits in the context of your actual business. The answer will either confirm that you are adequately covered or make very clear the gap you need to fill.</p>

<p>Everything else in this book is about helping you get better answers to these two questions and make more informed decisions about your coverage. Cyber insurance is not cheap, and it is not simple. But for an Ohio small business operating in 2026, it is no longer optional.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "What Cyber Insurance Actually Covers",
    page_start: 18,
    page_end: 31,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: What Cyber Insurance Actually Covers</h2>

<p>Cyber insurance policies are not uniform. Coverage varies significantly between insurers, between policy tiers, and between endorsements that can be added or subtracted from a base policy. Understanding the categories of coverage — and reading your specific policy carefully — is essential before you assume a loss will be covered. This chapter describes the standard coverage categories in detail.</p>

<h3>First-Party Coverage: Your Own Losses</h3>

<p><strong>Breach response costs</strong> are typically the first coverage activated after an incident. This includes the cost of hiring a forensic investigation firm to determine how the breach occurred, what data was accessed, and what systems were affected. Quality forensic investigation is not optional — without it, you cannot close the vulnerability, you cannot accurately notify affected individuals, and you cannot defend against regulatory inquiries. Forensic costs for a small business breach typically run $15,000 to $50,000 depending on complexity.</p>

<p><strong>Notification costs</strong> cover the expense of notifying affected individuals as required by Ohio law and federal regulations. This includes direct mail, call center services, and any required regulatory filings. For a breach affecting hundreds or thousands of customers, this cost can be substantial.</p>

<p><strong>Credit monitoring services</strong> are typically required to be offered to affected individuals after a breach involving certain categories of sensitive data. Providing twelve to twenty-four months of credit monitoring for thousands of affected individuals is a meaningful expense that cyber insurance covers.</p>

<p><strong>Business interruption</strong> coverage pays for lost revenue and extra expenses incurred when your systems are unavailable due to a cyber incident. This is often one of the most valuable components of a cyber policy — and one of the most subject to policy limitations. Pay close attention to the waiting period (typically eight to forty-eight hours before coverage kicks in), the coverage period (how long after the incident begins), and the revenue calculation method (actual loss vs. projected loss).</p>

<p><strong>Ransomware payment</strong> coverage will pay the ransom demanded by attackers — subject to the insurer's approval process. Not all insurers will approve ransom payments in all circumstances. Understanding your insurer's ransomware payment process before an incident occurs is critical.</p>

<h3>Third-Party Coverage: Claims Made Against You</h3>

<p><strong>Customer lawsuits</strong> arising from a data breach are covered under the liability component of a cyber policy. Defense costs are typically covered regardless of whether you win or lose. Settlement costs are covered up to policy limits.</p>

<p><strong>Regulatory fines and penalties</strong> from state attorneys general, the FTC, HHS (for HIPAA violations), or other regulatory bodies may be covered, subject to policy language. Some policies explicitly exclude regulatory fines — read yours carefully.</p>

<p><strong>Media liability</strong> covers claims arising from alleged defamation, copyright infringement, or privacy violations in your online content. This is a coverage category that surprises many small business owners — it applies to content on your website, social media, and marketing materials.</p>

<h3>The Coverage That Surprises Business Owners: Social Engineering and Funds Transfer Fraud</h3>

<p>Social engineering fraud — in which employees are manipulated into transferring money or revealing credentials — is one of the most costly categories of cybercrime affecting Ohio small businesses. Business email compromise (BEC) attacks, in which attackers impersonate executives or vendors via spoofed email, have resulted in average losses exceeding $125,000 per incident. This coverage is not included in all cyber policies, and where it is included, it may be subject to low sublimits. Ask specifically about social engineering and funds transfer fraud coverage when evaluating any policy.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "The Exclusions — What Most Policies Won't Pay For",
    page_start: 32,
    page_end: 44,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: The Exclusions — What Most Policies Won't Pay For</h2>

<p>Every insurance policy has exclusions — circumstances under which the insurer will not pay. In cyber insurance, exclusions can be particularly surprising because they often seem to exclude the exact circumstances that real incidents involve. Understanding exclusions before you buy is as important as understanding what is covered.</p>

<h3>Acts of War and Nation-State Attacks</h3>

<p>The war exclusion is the most contentious exclusion in cyber insurance. Most policies exclude losses arising from acts of war, and insurers have argued that nation-state cyberattacks — attacks conducted by or on behalf of foreign governments — constitute acts of war. The debate crystallized after the NotPetya attack of 2017, which destroyed computer systems at companies around the world. Lloyd's of London and other major insurers denied claims on war exclusion grounds. Courts in multiple countries have been divided on the question.</p>

<p>The practical implication for Ohio small businesses is modest — you are unlikely to be directly targeted by a sophisticated nation-state attack. But understand that if a major cyber weapon deployed by a nation-state causes collateral damage to systems you rely on (a software vendor, a cloud provider, a payment processor), you may face a war exclusion argument. Look for policies that include explicit "hostile or warlike action" definitions and that narrow the exclusion to direct acts of war rather than all nation-state-attributed activity.</p>

<h3>Prior Known Incidents</h3>

<p>Cyber policies cover incidents that occur after the policy inception date and were not known (or should not have been known) before that date. If you are already aware of a breach, a ransomware infection, or a vulnerability that has been exploited at the time you purchase the policy, those events are not covered. Attempting to purchase insurance to cover a known incident constitutes fraud. More practically: if you have had a security incident in the past and did not thoroughly investigate it, you may have a prior known incident problem that affects coverage for related or subsequent events.</p>

<h3>Unencrypted Data</h3>

<p>Many policies exclude or limit coverage for breaches involving data that was not encrypted at the time of the breach. If a laptop without disk encryption is stolen and customer records are exposed, the policy may not cover the resulting notification and liability costs. Disk encryption is a straightforward control that most policies now require as a condition of coverage, not just an exclusion trigger. Verify that your encryption practices meet your policy's requirements.</p>

<h3>Failure to Maintain Reasonable Security</h3>

<p>This exclusion — sometimes called the "failure to maintain" or "reasonable security" exclusion — allows insurers to deny claims if the insured failed to implement security controls that were reasonable given the nature of the data and the risk. Policies increasingly specify required controls — multi-factor authentication, backup testing, endpoint detection and response — and treat failure to maintain these controls as a basis for coverage denial. The security questionnaire you complete during the application process is your representation that you maintain these controls. If you misrepresent your security posture or allow it to deteriorate after the policy is issued, coverage is at risk.</p>

<h3>How to Close Common Exclusion Gaps</h3>

<ul>
  <li>Request manuscript endorsements that narrow broad exclusions where possible</li>
  <li>Verify that the social engineering and funds transfer fraud coverage has adequate sublimits (not just $25,000 when your transactions run into six figures)</li>
  <li>Confirm that business interruption coverage includes dependent business interruption — losses caused by failures at vendors, cloud providers, or other third parties your business relies on</li>
  <li>Review the retroactive date of the policy — claims arising from incidents that started before this date may not be covered even if discovered later</li>
  <li>Work with a cyber-specialist broker who knows where the gaps in standard policy forms tend to appear</li>
</ul>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Calculating Your Coverage Needs",
    page_start: 45,
    page_end: 55,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Calculating Your Coverage Needs</h2>

<p>Buying too little cyber insurance is a common and expensive mistake. The instinct to minimize premium costs can lead Ohio small business owners to purchase policies with coverage limits far below their actual exposure. When a real incident occurs, the gap between coverage and loss falls entirely on the business. This chapter gives you a framework for calculating what coverage you actually need.</p>

<h3>The Coverage Calculation Formula</h3>

<p>The starting point for any coverage calculation is the product of two factors: potential breach costs multiplied by probability. A business with $500,000 in potential breach costs and a 10% annual probability of a significant incident has an expected annual loss of $50,000. Insurance makes financial sense when the premium is less than the expected loss adjusted for risk tolerance — most business owners are willing to pay a modest premium to eliminate the risk of a catastrophic loss, even if the expected value calculation is roughly neutral.</p>

<p>Practical coverage calculation does not require precise probability estimates. Focus on the maximum realistic loss scenario and ensure that your coverage limit is sufficient to address it without the business having to absorb a crippling out-of-pocket expense.</p>

<h3>Data Inventory: How Many Records Do You Hold?</h3>

<p>Notification costs and liability exposure scale with the number of individuals whose data was exposed. The first step in calculating your coverage needs is understanding how many people's personal information your business holds. Count customers with active accounts, former customers whose data you retain, employees and former employees, and any other individuals whose data is in your systems. Multiply that count by a notification cost estimate of $125 to $200 per person (covering direct mail, credit monitoring, and call center costs) to get a baseline notification exposure.</p>

<h3>Business Interruption: What Does a Week of Downtime Cost?</h3>

<p>Business interruption coverage replaces lost revenue and covers extra expenses during a period when your systems are unavailable. To calculate the right coverage limit, estimate your average daily or weekly revenue and the realistic duration of recovery from a significant ransomware attack. Recovery from a ransomware attack that encrypts company systems typically takes one to three weeks even with good backups. Multiply your weekly revenue by a three-week recovery period to get a business interruption coverage target. Add extra expenses — temporary staff, expedited hardware, hotsite costs — to that figure.</p>

<h3>The Ohio Small Business Benchmark</h3>

<p>Based on data from cyber insurance underwriters and broker surveys, Ohio small businesses with five to fifty employees typically purchase coverage limits between $500,000 and $2 million. Businesses with higher data volumes, higher regulatory exposure (healthcare, financial services), or higher revenue targets tend toward the upper end of that range. Businesses with limited customer data and modest revenue may be adequately covered at the lower end. The benchmark is a starting point, not a substitute for the specific calculation described above.</p>

<h3>Sublimits and Aggregate Limits</h3>

<p>Pay close attention to sublimits — coverage limits within the overall policy that apply to specific categories of loss. A policy with a $1 million overall limit may have a $100,000 sublimit on ransomware payments, a $50,000 sublimit on social engineering fraud, and a $250,000 sublimit on business interruption. If ransomware is your primary concern, the $1 million headline number is misleading. Evaluate each sublimit against your realistic exposure in that category.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Evaluating Cyber Insurance Providers",
    page_start: 56,
    page_end: 66,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Evaluating Cyber Insurance Providers</h2>

<p>Not all cyber insurers are the same. The differences between carriers — in claims handling speed, incident response services, financial strength, and specialization in cyber risk — are more consequential than in many other insurance lines. Choosing the right carrier is nearly as important as choosing the right coverage.</p>

<h3>What Makes a Cyber Insurer Different</h3>

<p>Traditional insurers who have added cyber coverage to their product portfolio often lack the specialized claims infrastructure that cyber incidents require. A cyber incident is a time-sensitive event — a ransomware attack that takes your business offline demands immediate response, not a claims adjustment process designed for property damage claims that can wait weeks. Cyber-specialist insurers have dedicated incident response teams, established forensic vendor relationships, and 24/7 claims contact lines. This operational capability is not always visible in the policy document but is enormously consequential when you actually need to file a claim.</p>

<h3>Incident Response Services Included</h3>

<p>Many leading cyber insurers bundle incident response services with the policy — access to a breach coach (typically a law firm with cyber specialization), a forensic investigation firm, a public relations firm, and notification services. These bundled services are typically provided at no additional cost beyond the deductible and are pre-negotiated at favorable rates. For a small business that does not have these vendor relationships in place, the bundled services can be worth more than the premium paid. Evaluate what is included and verify that the named vendors have a strong reputation for small business incident response.</p>

<h3>The Claim Process Speed</h3>

<p>Ask prospective insurers and their brokers: what is the typical time from claim filing to initial response for a ransomware incident? What is the approval process for engaging forensic vendors? What is the typical time to approve a ransom payment if payment is warranted? Slow approval processes have caused real harm to businesses that were waiting for insurer approval while systems remained offline. Look for insurers with documented commitment to rapid response — 24-hour claim acknowledgment and 48-hour forensic vendor authorization should be the minimum standard.</p>

<h3>Financial Strength Ratings</h3>

<p>Cyber insurance is only as good as the insurer's ability to pay claims. Verify that any prospective insurer carries an AM Best financial strength rating of A- or better. The cyber insurance market has seen several smaller players exit or reduce capacity, leaving policyholders scrambling for coverage at renewal. Carriers with strong financial backing and deep cyber underwriting expertise are less likely to exit the market or dramatically reduce capacity.</p>

<h3>Carriers Serving Ohio Small Businesses</h3>

<p><strong>Chubb</strong> is one of the largest and most experienced cyber insurers in the world. Their Forefront Portfolio policy is well-regarded for coverage breadth and claims handling. They work through broker channels and are a common choice for Ohio businesses with revenues above $5 million.</p>

<p><strong>Coalition</strong> is a cyber-native insurer that combines insurance with active security monitoring. They scan enrolled businesses for known vulnerabilities and alert policyholders to risks before incidents occur. Their pricing and coverage structure is designed for small and medium businesses.</p>

<p><strong>Cowbell Cyber</strong> is another cyber-native insurer using continuous risk assessment to price and manage policies. They are often competitive for smaller Ohio businesses and offer a streamlined application process.</p>

<p><strong>At-Bay</strong> provides active security risk management alongside insurance, similar to Coalition. They have grown rapidly and are a competitive option for Ohio businesses in the $1M to $25M revenue range.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "The Application and Underwriting Process",
    page_start: 67,
    page_end: 77,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: The Application and Underwriting Process</h2>

<p>Applying for cyber insurance is not like applying for property or auto insurance. The security questionnaire is detailed, the underwriting process is substantive, and the answers you provide have significant consequences — both for your premium and for your coverage in the event of a claim.</p>

<h3>What Underwriters Are Asking and Why It Matters</h3>

<p>The cyber insurance security questionnaire is designed to assess your actual security posture. Underwriters want to know whether you have the controls in place that prevent the most common and costly cyber incidents. The questions are not random — they map directly to the attack vectors that generate the most claims.</p>

<p>Multi-factor authentication (MFA) questions appear on virtually every cyber insurance application because MFA is the single most effective control against credential-based attacks, which are involved in the majority of breaches. Questions about email filtering, backup practices, endpoint protection, and incident response planning similarly map to high-frequency claim scenarios.</p>

<h3>The Impact of Your Answers on Premium</h3>

<p>Underwriters score your application and price the policy based on the risk profile it reveals. Businesses with MFA deployed across all systems, tested backups, EDR software, and a documented incident response plan will typically pay 20% to 40% less than businesses without these controls for equivalent coverage limits. The premium difference over a three-year period often exceeds the cost of implementing the missing controls — meaning that improving security before you apply can pay for itself through premium savings.</p>

<h3>What to Fix Before You Apply</h3>

<p>If you are preparing to apply for cyber insurance and your security posture has gaps, consider addressing the highest-impact items before you submit the application. Multi-factor authentication on email and remote access is the single most important control from an underwriting perspective. Verified, tested backups stored offline or in immutable cloud storage are a close second. These two controls address the most common catastrophic loss scenarios and have an outsized impact on your insurance premium and coverage terms.</p>

<h3>The Material Misrepresentation Risk</h3>

<p>The answers you provide on the cyber insurance application are representations of fact. If you misrepresent your security posture — whether intentionally or because you are not sure of the actual state of your systems — and a claim arises that is connected to the misrepresented control, the insurer may deny the claim on the basis of material misrepresentation. Before submitting your application, verify the actual state of your security controls. Do not answer "yes" to MFA questions based on a vague recollection that someone set it up at some point. Confirm it is actually deployed and functioning. The cost of a denied claim dwarfs the cost of the premium you might have saved by overstating your security posture.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Making a Claim — What Happens After an Incident",
    page_start: 78,
    page_end: 88,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Making a Claim — What Happens After an Incident</h2>

<p>Knowing that you have cyber insurance is different from knowing how to use it effectively when an incident occurs. The actions you take — and do not take — in the first hours after discovering a cyber incident can significantly affect your coverage and your recovery. This chapter walks through the claims process step by step.</p>

<h3>Who to Call First: Insurer or Attorney?</h3>

<p>Call your insurer first, using the dedicated cyber incident hotline that should be in your policy documents. Most leading cyber insurers provide 24/7 incident response hotlines. The insurer will connect you with a breach coach — typically a law firm with cyber specialization — who will guide your response. The breach coach's communications with you are typically protected by attorney-client privilege. Calling the insurer first also ensures that your response actions are coordinated with your coverage requirements; taking actions without insurer authorization — particularly paying a ransom — can jeopardize coverage.</p>

<h3>Preserving Evidence</h3>

<p>Before you do anything to remediate the incident, preserve evidence. Do not wipe and reinstall systems before forensic investigators have had the opportunity to collect logs, memory images, and other evidence. If systems need to be taken offline for containment reasons, take them offline rather than wiping them. Forensic investigators need the evidence to determine the scope of the breach, identify affected data, and close the attack vector. Without forensic evidence, you cannot accurately notify affected individuals, and you may face regulatory challenges in demonstrating good-faith incident response.</p>

<h3>The 72-Hour Notification Rule</h3>

<p>Under GDPR (applicable if you process data of EU residents), breach notification to regulators is required within 72 hours of becoming aware of a breach. Ohio's breach notification law does not specify 72 hours, but requires notification "in the most expedient time possible." Many cyber policies include breach coach services specifically to ensure notification obligations are met correctly and promptly. Do not delay notification decisions while waiting to fully understand the scope of the breach — work with your breach coach to make notification decisions with available information.</p>

<h3>What Not to Do Before Calling Your Insurer</h3>

<ul>
  <li>Do not pay a ransom without insurer authorization — payment without authorization may not be reimbursed</li>
  <li>Do not wipe and rebuild systems before forensics — you may destroy evidence needed for the claim</li>
  <li>Do not communicate with attackers directly — route all attacker communications through your breach coach</li>
  <li>Do not post on social media about the incident until you have public relations guidance</li>
  <li>Do not notify customers or the media before your breach coach has reviewed the notification plan</li>
</ul>

<h3>Ransomware Payment Approval Process</h3>

<p>If ransomware has encrypted your systems and you are considering payment, the process involves multiple parties and takes time. Your insurer will typically engage a ransomware negotiation firm, verify the attacker's decryption capability, assess whether a decryptor is available through public sources (many ransomware strains have public decryptors available through the No More Ransom project), and then make a coverage determination. OFAC (the U.S. Treasury's Office of Foreign Assets Control) prohibits ransom payments to sanctioned entities, and your insurer will verify that the payment recipient is not on a sanctions list. Budget at least twenty-four to seventy-two hours for this process even in the best case.</p>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "Ohio Small Business Considerations",
    page_start: 89,
    page_end: 100,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Ohio Small Business Considerations</h2>

<p>While cyber insurance is a national market, several factors specific to Ohio businesses affect coverage decisions, premium pricing, and regulatory compliance. Understanding the Ohio-specific context helps you make better coverage decisions and take advantage of risk reduction tools that are specific to your state.</p>

<h3>Ohio Data Protection Act Safe Harbor</h3>

<p>Ohio's Data Protection Act (ORC 1354), enacted in 2018, provides an affirmative defense against tort claims arising from data breaches for businesses that maintain a cybersecurity program conforming to a recognized industry standard. The qualifying standards include NIST SP 800-171, the NIST Cybersecurity Framework, CIS Controls, ISO 27001, HIPAA Security Rule (for covered entities), and PCI DSS (for payment card handlers).</p>

<p>The safe harbor is not a guarantee against liability, and it applies only to tort claims, not to regulatory penalties. But it does reduce the liability exposure that cyber insurance's third-party coverage addresses. Businesses that implement a qualifying cybersecurity program and document that implementation may see reduced cyber insurance premiums, because the documented security program reduces the underwriter's assessment of risk. Consult with an Ohio attorney to understand how the safe harbor applies to your business and what documentation is required to assert it.</p>

<h3>Ohio Breach Notification Law</h3>

<p>Ohio Revised Code Section 1349.19 requires businesses to notify Ohio residents whose personal information was compromised in a breach in the most expedient time possible. For breaches affecting 500 or more Ohio residents, the Ohio Attorney General must also be notified. The law defines personal information to include Social Security numbers, financial account numbers with access credentials, driver's license numbers, and medical and health insurance information. The notification obligation extends to third parties who process data on your behalf — a vendor breach may trigger your notification obligation even if your systems were not directly compromised.</p>

<h3>Sector-Specific Requirements</h3>

<p><strong>Healthcare:</strong> Ohio medical practices, dental offices, home health agencies, and other HIPAA-covered entities face additional regulatory requirements beyond Ohio breach notification law. HIPAA's Breach Notification Rule requires notification within 60 days of discovery for breaches affecting 500 or more individuals, and annual reporting for smaller breaches. OCR (HHS Office for Civil Rights) investigations and penalties can be substantial. Cyber insurance for Ohio healthcare practices should include HIPAA-specific coverage and OCR defense costs.</p>

<p><strong>Financial services:</strong> Ohio-licensed financial advisors, mortgage brokers, and other financial services firms are subject to regulations from the SEC, FINRA, and Ohio Division of Financial Institutions that have specific cybersecurity requirements. The FTC Safeguards Rule (applicable to non-bank financial institutions) requires a written information security program. Cyber insurance for these businesses should align with the Safeguards Rule requirements.</p>

<h3>Ohio SBDC Cyber Resources</h3>

<p>The Ohio Small Business Development Center (SBDC) network, administered through the Ohio Development Services Agency, provides free and low-cost cybersecurity consulting to Ohio small businesses. SBDC advisors can help you assess your security posture, prepare for cyber insurance applications, and identify available resources including the Ohio Cyber Reserve program, which provides volunteer cybersecurity expertise to Ohio businesses recovering from incidents.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Building Insurability — What Makes You a Good Risk",
    page_start: 101,
    page_end: 115,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Building Insurability — What Makes You a Good Risk</h2>

<p>The cyber insurance market has tightened significantly since 2020. Underwriters have become more selective, minimum security requirements have increased, and businesses without basic controls in place are finding it difficult to obtain coverage at reasonable rates — or to obtain it at all. Building and maintaining a security posture that makes your business an attractive risk is both a security imperative and a financial strategy.</p>

<h3>The Top Five Security Controls That Reduce Premiums</h3>

<p><strong>1. Multi-factor authentication (MFA)</strong> on all remote access and email is the single most influential factor in cyber insurance underwriting. MFA prevents credential-based attacks, which are involved in the majority of ransomware deployments and business email compromise incidents. Underwriters ask about MFA specifically and prominently. Businesses without MFA on email and remote access face higher premiums, lower coverage limits, and sometimes coverage denials. Implementing MFA costs almost nothing for businesses using Microsoft 365 or Google Workspace — it is a settings change, not a product purchase.</p>

<p><strong>2. Endpoint Detection and Response (EDR)</strong> software provides behavioral monitoring of endpoints that catches attacks that traditional antivirus misses. Underwriters increasingly require EDR on all company devices as a condition of coverage. Microsoft Defender for Business (included in Microsoft 365 Business Premium) satisfies this requirement for most underwriters.</p>

<p><strong>3. Verified, tested backups</strong> are the most important recovery control and one of the most important underwriting factors. Backups that have been tested — meaning someone actually restored from them recently and confirmed that the restoration worked — are what you need. Backups that exist but have never been tested may fail when you actually need them. Backups stored offline or in immutable cloud storage (where they cannot be encrypted by ransomware that infects your systems) are preferred by underwriters and are practically more valuable.</p>

<p><strong>4. Email filtering and anti-phishing controls</strong> — spam filtering, link scanning, attachment sandboxing, and impersonation protection — reduce the volume of malicious content that reaches employees. Microsoft Defender for Office 365 and Google Workspace's built-in protections, properly configured, satisfy most underwriter requirements.</p>

<p><strong>5. A documented incident response plan</strong> demonstrates that your business has thought through how it will respond to a cyber incident before one occurs. The plan does not need to be lengthy — a two-page document describing who calls whom, what systems are isolated, who has authority to make decisions, and how you will communicate with customers is sufficient for underwriting purposes and operationally valuable.</p>

<h3>Documenting Your Security Posture</h3>

<p>Cyber insurers are increasingly asking for evidence of security controls, not just attestations. Maintain documentation of your MFA deployment, backup testing results, EDR deployment, and patch management activity. A simple spreadsheet documenting what controls are in place, who is responsible for each, and when they were last verified gives you a foundation for insurance applications and regulatory inquiries alike.</p>

<h3>Working with a Broker vs. Buying Direct</h3>

<p>Cyber-specialist brokers add value that direct purchasing cannot replicate. A good broker who focuses on small and medium business cyber insurance knows which carriers have the most favorable coverage terms for your industry, which underwriters are most receptive to businesses with your security profile, where the coverage gaps are in standard policy forms, and how to negotiate sublimit increases and exclusion modifications. The broker's commission does not add to your premium — it is paid by the insurer. For Ohio small businesses navigating a complex and rapidly evolving insurance market, a cyber-specialist broker is worth engaging. Ask your current agent whether they have a cyber specialist on staff or a specialty broker relationship, and if not, seek out a firm that does.</p>
</article>`,
  },
];
