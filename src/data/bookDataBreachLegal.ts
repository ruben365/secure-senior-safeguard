import type { BookChapter } from "@/config/bookCatalog";

/**
 * Small Business Owner's Legal Guide to Data Breaches in Ohio
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 10 chapters (0–9), ~115 pages, small business owners (not lawyers), plain English tone
 */
export const DATA_BREACH_LEGAL_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Small Business Owner's Legal Guide to Data Breaches in Ohio</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">Plain English on Ohio's Data Protection Act, Notification Requirements, and Liability Defense</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio &middot; 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright &copy; 2026 InVision Network. All rights reserved.</p><p>InVision Network Press &middot; Kettering, Ohio 45440</p><p><em>For educational purposes only. Consult a licensed attorney for legal advice specific to your situation.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — Ohio's Data Breach Notification Law and Why Every Business Owner Needs to Understand It",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — Ohio's Data Breach Notification Law and Why Every Business Owner Needs to Understand It</h2>

<p>Picture this: it is a Tuesday morning in October, and your accountant calls with a question you have never heard before. Someone tried to open a credit card in the name of one of your clients — a regular customer who has been buying from you for six years. The address on the application was not his. The email on file was not his. But the Social Security Number was correct, and your business is one of a handful of places that had it. By Wednesday, two more clients have been notified by their banks. By Thursday, you have received a letter from an attorney.</p>

<p>You never got hacked. You never noticed anything wrong. Your computers still work. Your files still open. But somewhere in the past six months, someone accessed information your business was storing — maybe through a phishing email, maybe through an unsecured database, maybe through a vendor who had access to your systems — and that information has been making its way through the criminal economy ever since. And now, under Ohio law, you had obligations that began the moment that breach occurred, whether you knew about it or not.</p>

<p>This scenario plays out for Ohio small businesses every week. Most owners who find themselves in it had no idea the Ohio Data Protection Act existed. They had never heard of ORC 1347.12. They did not know that Ohio has a 45-day notification clock, or that notifying the AG is required when 500 or more Ohio residents are affected, or that there is a legal Safe Harbor available to businesses that implemented a recognized cybersecurity framework before the breach happened. By the time their attorney explains all of this, they are already behind.</p>

<h3>The Ohio Data Protection Act: The Big Picture</h3>

<p>Ohio enacted the Data Protection Act (ODA) in 2018, making it one of the first states to create an affirmative Safe Harbor for businesses that implement recognized cybersecurity programs. The core law governing data breach notification is Ohio Revised Code § 1347.12. Together, these provisions do two things: they impose notification obligations on businesses that experience a breach of personal information belonging to Ohio residents, and they reduce civil liability for businesses that can demonstrate they had an adequate cybersecurity program in place before the breach occurred.</p>

<p>The practical implication is significant. Two Ohio businesses can experience identical breaches — same type of attack, same information compromised, same number of customers affected — and face entirely different legal situations depending on whether they had implemented a qualifying cybersecurity framework. The business with a documented, compliant program has a meaningful defense. The business without one faces the full exposure of civil litigation, regulatory investigation, and reputational damage with no Safe Harbor to retreat to.</p>

<h3>The Three Types of Ohio Business Owners</h3>

<p>After years of watching how Ohio small businesses respond to breach law, a clear pattern emerges. There are three types of business owners, and the type you are determines your experience if a breach occurs.</p>

<p>The first type has prepared. They have a written information security policy. They conduct annual risk assessments. They have implemented a recognized framework — NIST CSF, ISO 27001, or one of the others the ODA recognizes. They have a basic incident response plan. When a breach happens, they are not starting from zero. They engage counsel promptly, begin their notification timeline with confidence, and have a credible Safe Harbor argument. Their experience is still stressful and expensive, but it is manageable.</p>

<p>The second type has not prepared. They store personal information — customer SSNs, employee records, payment card data, health information — without a formal security program, without documented policies, and without an incident response plan. When a breach occurs, they discover their obligations simultaneously with discovering the breach, often under the pressure of customer complaints, attorney letters, or regulatory inquiries. They face maximum legal exposure and minimum credibility with regulators.</p>

<p>The third type got lucky. They had no security program and experienced a breach that was never discovered, or that was discovered but not traced back to them. The data was used for fraud. Customers were harmed. But no one made the connection to their business, so they received no attorney letters and no regulatory inquiries. They believe they are safe because they have not been found out. They are not safe — they are simply uninformed about an unreported harm they caused.</p>

<h3>What This Book Provides</h3>

<p>This book is written for Ohio small business owners, not for lawyers. It will not turn you into a data privacy attorney. What it will do is give you a clear understanding of what the law requires, what the Safe Harbor demands, what your obligations look like when a breach occurs, and how to work effectively with the attorneys and security professionals you will need to engage when something goes wrong. It covers Ohio law specifically, notes where federal law creates additional obligations, and gives you practical steps you can take starting this week to improve your legal position. No prior legal or technical knowledge is assumed.</p>

<p>The Ohio Small Business Development Center (SBDC) network, available through ohiosbdc.org, provides free consulting to Ohio small businesses on cybersecurity planning. The resources exist. The protections exist. The question is whether you engage them before or after a breach forces your hand.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "Defining a Data Breach Under Ohio Law",
    page_start: 17,
    page_end: 28,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: Defining a Data Breach Under Ohio Law</h2>

<p>Before you can understand your obligations after a data breach, you need to understand exactly what counts as a data breach under Ohio law. The definitions are specific, and getting them right matters — both because notification obligations depend on them and because understanding what counts as "personal information" under Ohio law tells you exactly what kinds of data your business needs to protect most carefully.</p>

<h3>The Statutory Definition of a Breach</h3>

<p>Under Ohio Revised Code § 1347.12, a "breach of the security of the system" means unauthorized access to and acquisition of computerized data that compromises the security or confidentiality of personal information maintained by a person and that causes, or the person reasonably believes has caused or will cause, a material risk of identity theft or other fraud to the resident.</p>

<p>Three elements of this definition deserve attention. First, it requires both unauthorized access and acquisition — a criminal who breaks into your network but does not actually take any data may not technically constitute a breach requiring notification under this standard. Second, the breach must involve "computerized data" — paper records, while covered by other laws, are not covered by this specific notification requirement. Third, the breach triggers notification obligations only when it "causes, or the person reasonably believes has caused or will cause" a material risk of identity theft or other fraud. This is the risk-of-harm threshold, and we will explore it more fully below.</p>

<h3>What Counts as Personal Information</h3>

<p>Ohio's data breach law covers "personal information," which is defined as an Ohio resident's first name or first initial and last name combined with any one or more of the following data elements:</p>

<ul>
  <li>Social Security Number</li>
  <li>Driver's license number or state identification card number</li>
  <li>Account number, credit or debit card number, in combination with any required security code, access code, or password that would permit access to an individual's financial account</li>
  <li>Medical information or health insurance information</li>
  <li>Username or email address in combination with a password or security question and answer that would permit access to an online account</li>
</ul>

<p>The combination requirement is important. A list of names alone is not personal information under this definition. A list of Social Security Numbers alone is also not personal information under this definition — the law requires the SSN to be paired with a name. This does not mean a list of SSNs without names is harmless or unworthy of protection; it means that losing such a list does not trigger Ohio's breach notification statute. It may trigger other obligations, including common law negligence claims if the data can be used to harm identifiable individuals.</p>

<h3>What Is NOT Covered</h3>

<p>Business contact information alone — a contact's name, business phone number, business email address, and business address — is not personal information under Ohio's data breach statute. If your business experiences a breach limited to business card-level contact information for business clients, the Ohio notification statute does not apply. This does not mean the breach has no legal implications, but it means the specific 45-day notification clock and AG reporting requirements do not activate.</p>

<p>Publicly available information — data that is lawfully available to the general public, such as published phone directories or government records — is also excluded from the personal information definition.</p>

<h3>The Risk-of-Harm Threshold</h3>

<p>Not every unauthorized access to personal information requires notification. Ohio law requires notification only when the breach "causes, or the person reasonably believes has caused or will cause, a material risk of identity theft or other fraud." This means that if your business experiences an unauthorized access event and can demonstrate with reasonable certainty that the accessed data was encrypted and unreadable to the attacker, notification may not be required.</p>

<p>This is a judgment call that should always involve legal counsel. The consequences of incorrectly concluding that notification is not required — while the affected individuals suffer identity theft — are severe. When in doubt, notify. The cost of notification is real but bounded. The cost of failing to notify when you should have is potentially unlimited.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "The Notification Obligation — Who, When, and How",
    page_start: 29,
    page_end: 40,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: The Notification Obligation — Who, When, and How</h2>

<p>When a data breach triggers notification obligations under Ohio law, you face a specific set of requirements: a time window within which notice must be given, a list of people and agencies who must be notified, and specific content requirements for what the notice must contain. Getting these details right matters legally — both for demonstrating good faith compliance and for limiting your exposure in civil litigation.</p>

<h3>The 45-Day Clock</h3>

<p>Ohio Revised Code § 1347.12 requires that notification be provided "in the most expedient time possible, but not later than 45 days following the discovery of the breach." The clock starts when you discover the breach — not when it occurred. In many cases, a breach that happened months ago is discovered in a single moment, and the 45-day clock starts from that discovery moment.</p>

<p>The 45-day window assumes that you have completed a reasonable investigation to determine what data was accessed, whose data was affected, and whether notification is required. This is a tight timeline. The practical implication is that your incident response plan — which we cover in Chapter 4 — needs to be designed to complete its investigation phase well within 30 days, leaving 15 days of buffer for the notification process itself.</p>

<h3>Who Must Be Notified</h3>

<p>Ohio residents whose personal information was included in the breach must receive direct notice. If your business serves customers across multiple states, Ohio's law covers the Ohio residents; other states have their own breach notification laws with different timelines and requirements. A multi-state breach requires navigating multiple notification frameworks simultaneously, which is a strong argument for retaining breach counsel with multi-state experience.</p>

<p>When a breach affects 500 or more Ohio residents, you must also notify the Ohio Attorney General. This notification should go to the AG's Consumer Protection Section and include the nature of the breach, the type of personal information involved, the number of Ohio residents affected, and the steps you have taken or plan to take in response. The AG notification is not merely a formality — it can trigger an investigation, and the quality of your notification and response documentation will influence how that investigation proceeds.</p>

<h3>Substitute Notice</h3>

<p>If direct notice is not possible because you do not have sufficient contact information for affected individuals, or if the cost of direct notification exceeds $250,000, or if the number of affected Ohio residents exceeds 500,000, Ohio law allows for "substitute notice." Substitute notice consists of three elements: email notice where you have email addresses, conspicuous posting of the notice on your website, and notification to major statewide media. Substitute notice is a last resort, not a convenience — direct written notice is always preferable and more defensible.</p>

<h3>What the Notice Must Contain</h3>

<p>A valid Ohio breach notification must include at minimum:</p>

<ul>
  <li>A description of the breach incident</li>
  <li>The type of personal information involved</li>
  <li>Contact information for the business, including a toll-free number to call with questions</li>
  <li>Steps the recipient can take to protect themselves, including placing a fraud alert or security freeze on their credit report</li>
  <li>Steps the business is taking to investigate and remedy the breach</li>
</ul>

<h3>Federal Sector Overlaps</h3>

<p>If your Ohio business is subject to federal sector-specific regulations, those regulations may create additional notification obligations with different timelines and requirements. HIPAA requires covered entities and business associates to notify affected individuals within 60 days of discovery, the HHS Secretary, and local media for breaches affecting more than 500 residents in a state. The FTC Safeguards Rule, which applies to non-bank financial institutions, requires notification to the FTC within 30 days of discovering a breach affecting 500 or more customers. The Gramm-Leach-Bliley Act applies additional requirements to financial services providers. These federal requirements exist in parallel with Ohio's statute — compliance with one does not satisfy the other.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Building Your Incident Response Plan",
    page_start: 41,
    page_end: 52,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Building Your Incident Response Plan</h2>

<p>An incident response plan is a written document that describes how your business will detect, contain, investigate, and recover from a data breach or cybersecurity incident. Having one before a breach occurs is not just good practice — it is a requirement for qualifying for Ohio's Safe Harbor under the ODA, and it is the difference between a manageable crisis and a chaotic one.</p>

<h3>The Five Phases of Incident Response</h3>

<p>A standard incident response plan for a small Ohio business covers five phases:</p>

<ol>
  <li><strong>Preparation:</strong> The work done before any incident occurs — defining the team, establishing communication protocols, documenting systems, creating the plan itself</li>
  <li><strong>Detection and Analysis:</strong> Identifying that an incident has occurred, determining its scope and nature, and beginning the documentation that will be needed for legal and insurance purposes</li>
  <li><strong>Containment:</strong> Stopping the active bleeding — isolating affected systems, revoking compromised credentials, blocking attacker access without destroying forensic evidence</li>
  <li><strong>Eradication:</strong> Removing the attacker's presence and the vulnerability they exploited from your systems</li>
  <li><strong>Recovery:</strong> Restoring systems to normal operation, verifying that the threat is eliminated, and resuming business with appropriate monitoring</li>
</ol>

<h3>The Core Incident Response Team</h3>

<p>For a small Ohio business, the incident response team does not need to be large. It needs to be defined. At minimum, designate:</p>

<ul>
  <li><strong>An incident commander:</strong> The person who makes decisions and coordinates the response — typically the business owner or a senior manager</li>
  <li><strong>A technical lead:</strong> Your IT person, IT vendor, or managed security service provider who handles system analysis and containment</li>
  <li><strong>A legal contact:</strong> The outside attorney you will call, ideally one with data breach experience — identified before the breach, not during it</li>
  <li><strong>A communications lead:</strong> The person who handles customer notifications, media inquiries, and internal employee communications</li>
</ul>

<h3>The First Call: Legal Counsel or Insurer?</h3>

<p>One of the most common questions Ohio business owners have when a breach occurs is: who do I call first? The answer depends on whether you have cyber insurance. If you do, your insurance policy almost certainly requires that you notify your insurer before taking certain response actions, and your insurer will have a panel of pre-approved breach attorneys and forensic firms. Call your insurer first, then follow their guidance on legal counsel.</p>

<p>If you do not have cyber insurance, call a data breach attorney first. Why an attorney before an IT person? Because communications made to your attorney in the context of legal advice may be protected by attorney-client privilege. Communications made directly to a forensic firm, without an attorney involved, may not be. The sequencing matters for what evidence you can protect from discovery in subsequent litigation.</p>

<h3>Tabletop Exercises</h3>

<p>A tabletop exercise is a facilitated discussion where your incident response team walks through a simulated breach scenario. No actual systems are touched — it is a conversation that tests whether your plan is realistic, whether everyone knows their role, and where the gaps are. Ohio SBDC advisors can help small businesses conduct basic tabletop exercises at no cost. CISA also provides free tabletop exercise guides at cisa.gov. Running a one-hour tabletop annually is one of the highest-return investments a small Ohio business can make in its security posture.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Legal Liability and Exposure Management",
    page_start: 53,
    page_end: 64,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Legal Liability and Exposure Management</h2>

<p>Data breaches create legal exposure through two primary channels: civil litigation from affected individuals or classes of individuals, and regulatory investigation and enforcement by the Ohio AG, the FTC, or sector-specific regulators. Understanding both channels — and the defenses available under Ohio law — is essential for any business owner who stores personal information.</p>

<h3>Civil Liability: The Class Action Landscape</h3>

<p>After a significant data breach, affected individuals can sue the business that was breached. When many individuals are affected, plaintiffs' attorneys often organize those claims into a class action lawsuit, which aggregates small individual claims into a single large proceeding. Class actions after data breaches have resulted in settlements ranging from small credit monitoring offers to nine-figure payouts at the largest corporations.</p>

<p>For plaintiffs to succeed in a data breach class action, they typically must prove that the business failed to maintain reasonable security measures, that a breach occurred, that the plaintiffs' data was included in the breach, and that the plaintiffs suffered actual harm or face a substantial risk of harm. The "actual harm" element has historically been a significant hurdle — courts have disagreed about whether the risk of future identity theft, without demonstrated financial loss, constitutes sufficient harm to maintain a lawsuit. Ohio courts have generally followed a relatively strict approach to standing, which provides some protection against frivolous suits, but this landscape continues to evolve.</p>

<h3>The Ohio Safe Harbor Defense</h3>

<p>Ohio's Data Protection Act provides a meaningful affirmative defense in civil breach litigation. Under ODA, a business that creates, maintains, and complies with a written cybersecurity program that contains administrative, technical, and physical safeguards for the protection of personal information — and that conforms to a recognized industry standard — is not liable in tort for claims arising from a data breach. This is the Safe Harbor, and it is only available to businesses that implemented the program before the breach occurred.</p>

<p>The recognized frameworks that qualify for Safe Harbor protection include: NIST Cybersecurity Framework (CSF), ISO 27001, CIS Controls, PCI DSS (for payment card data), HIPAA Security Rule (for health information), and the FTC Act Section 5 standards for unfair or deceptive trade practices. The business does not need to perfectly implement the entire framework — it must have a program that "reasonably conforms" to one of these standards. What "reasonably conforms" means in litigation is a fact-intensive question that will be decided based on documentation, policies, and evidence of actual implementation.</p>

<h3>Regulatory Investigation: AG and FTC</h3>

<p>The Ohio Attorney General has broad authority to investigate data breach incidents and to bring enforcement actions against businesses that fail to comply with Ohio's notification requirements or that engage in deceptive data practices. AG investigations can result in consent decrees, civil penalties, and restitution orders. The FTC has parallel federal authority under Section 5 of the FTC Act and has pursued enforcement actions against businesses of all sizes for unfair data security practices.</p>

<h3>California Residents and CCPA Exposure</h3>

<p>If your Ohio business has customers in California, the California Consumer Privacy Act (CCPA) may apply to your operations. CCPA provides California residents with private right of action for data breaches involving certain categories of personal information if the business failed to implement reasonable security measures. Even businesses with only a handful of California customers can find themselves subject to CCPA claims if they exceed the law's thresholds. If you have any California customer relationships, have your attorney assess your CCPA exposure as part of your overall data protection review.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "Working with Breach Counsel and IT Forensics",
    page_start: 65,
    page_end: 76,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Working with Breach Counsel and IT Forensics</h2>

<p>When a data breach occurs, you will need two types of outside help that you probably do not use in normal business operations: a data breach attorney and a digital forensics firm. Understanding what each does, how to engage them, and how their work relates to your legal position will help you make better decisions during a stressful and time-compressed situation.</p>

<h3>When to Engage Outside Counsel</h3>

<p>The ideal time to identify your breach attorney is before any breach occurs. Many Ohio small businesses have general business counsel but have never discussed data breach response. Have that conversation now. Ask whether your attorney has handled data breach notifications and investigations. If the answer is no, ask for a referral to someone who has. A data breach attorney who has handled Ohio notification procedures, worked with the AG's office, and managed breach litigation will navigate the situation far more efficiently than a generalist who is learning the field during your crisis.</p>

<p>At the moment of breach discovery, engage your attorney on the first day, even before you are certain whether notification is required. Attorney-client privilege can protect the investigation from discovery in subsequent litigation, but only if the attorney is engaged from the beginning and the investigation is conducted under their direction. Forensic work initiated independently and then handed to an attorney later does not receive the same privilege protection.</p>

<h3>What a Forensics Firm Does</h3>

<p>A digital forensics firm investigates what happened. They examine server logs, network traffic records, endpoint devices, and cloud system activity to determine how the attacker got in, what they accessed, what they took, and how long they were in your systems. This information is essential for determining whether notification is required (what data was accessed), for remediating the vulnerability (how the attacker got in), and for defending against civil litigation (what security measures you had in place).</p>

<p>Forensics investigations for small businesses typically cost between $5,000 and $50,000 depending on the complexity of the incident and the size of the environment. Cyber insurance can cover these costs, which is one of the most compelling arguments for purchasing a cyber insurance policy even before you have assessed whether you need it for other reasons.</p>

<h3>Chain of Custody and Log Preservation</h3>

<p>Digital evidence is fragile. System logs are often overwritten automatically after a certain period. Forensic investigators need to preserve this evidence quickly, and they need to do so in a way that maintains chain of custody — a documented record of who handled the evidence, when, and how — so that the evidence is usable in litigation. This is why your first response to a breach should never include actions that could alter the affected systems, such as wiping and reinstalling software. Call your attorney and forensics firm first. Let the experts tell you how to preserve what needs to be preserved before you do anything that might destroy it.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Regulatory Reporting — Ohio AG, FTC, and Sector Regulators",
    page_start: 77,
    page_end: 88,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Regulatory Reporting — Ohio AG, FTC, and Sector Regulators</h2>

<p>Data breach notification obligations extend beyond the individuals whose data was compromised. Depending on the size of the breach, the type of data involved, and the industry your business operates in, you may have mandatory reporting obligations to state and federal regulatory agencies. Understanding these obligations and fulfilling them correctly is as important as notifying the affected individuals.</p>

<h3>Ohio Attorney General</h3>

<p>When a breach affects 500 or more Ohio residents, you must notify the Ohio Attorney General's Consumer Protection Section. The notification should be submitted to: Ohio Attorney General, Consumer Protection Section, 30 E. Broad Street, 14th Floor, Columbus, OH 43215. You can also submit through the AG's online portal at ohioattorneygeneral.gov. The AG notification should include the nature of the breach, the type of personal information compromised, the number of Ohio residents affected, and a description of the steps you have taken or plan to take in response. Submit this notification before or concurrent with the notification to affected individuals — do not wait to see how individuals respond before notifying the AG.</p>

<h3>Federal Trade Commission</h3>

<p>The FTC does not have a specific breach notification requirement for most businesses outside the financial sector, but filing a complaint at reportfraud.ftc.gov creates an official record of the incident that may be useful in downstream enforcement discussions. More importantly, the FTC's investigation authority under Section 5 of the FTC Act (unfair or deceptive trade practices) means that the FTC may investigate any business that experiences a significant breach, particularly if there is evidence of inadequate security practices. Proactive notification to the FTC, while not legally required in most cases, can signal cooperation and good faith.</p>

<h3>Sector-Specific Regulators</h3>

<p>If your business operates in a regulated industry, you have additional notification obligations beyond Ohio's general statute:</p>

<ul>
  <li><strong>Healthcare (HIPAA):</strong> Notify HHS at hhs.gov/hipaa within 60 days of discovery. Notify local media if 500 or more residents of a state are affected. The HHS breach notification portal is at hhs.gov/ocr/privacy/hipaa/administrative/breachnotificationrule.</li>
  <li><strong>Financial Services (GLBA/FTC Safeguards Rule):</strong> Notify the FTC within 30 days if 500 or more customers are affected. The specific notification form is at ftc.gov/legal-library/browse/rules/standards-safeguarding-customer-information.</li>
  <li><strong>Investment Advisers (SEC):</strong> Registered investment advisers must notify the SEC and clients under Regulation S-P. The timeline depends on the circumstances.</li>
  <li><strong>Education (FERPA):</strong> Educational institutions maintaining student education records have notification obligations under FERPA and may need to notify the Ohio Department of Education.</li>
</ul>

<h3>Multi-State Breach Complexity</h3>

<p>If your Ohio business has customers in multiple states, a single breach may trigger notification obligations in every state where affected customers reside. Each state has different notification timelines (ranging from 30 days in some states to 90 days in others), different definitions of personal information, different content requirements for notices, and different AG notification thresholds. A breach affecting customers in 20 states requires compliance with 20 different legal frameworks simultaneously. This is not a task for a business owner to manage alone — it requires experienced breach counsel with multi-state experience.</p>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "Class Action Defense and Insurance Coordination",
    page_start: 89,
    page_end: 100,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Class Action Defense and Insurance Coordination</h2>

<p>For an Ohio small business that experiences a significant data breach affecting hundreds or thousands of customers, the threat of class action litigation is real. Understanding how class actions form after data breaches, what defenses are available, and how your cyber insurance coverage interacts with breach response will help you make better decisions in the aftermath of an incident.</p>

<h3>How Class Actions Form After a Breach</h3>

<p>Class action lawsuits after data breaches typically begin with a single plaintiff — one affected customer whose attorney files a complaint that explicitly seeks to represent a class of all similarly situated individuals. The complaint is filed quickly, often within days of public announcement of the breach, because plaintiffs' attorneys monitor breach announcements specifically to find early-mover opportunities. The named plaintiff must demonstrate standing — actual harm or imminent substantial risk of harm — which is why early class action complaints often focus on plaintiffs who can document out-of-pocket costs: credit monitoring they purchased, time spent dealing with fraud, or actual fraudulent charges they experienced.</p>

<p>Class certification is a separate and significant hurdle. The court must certify that the case is appropriate for class treatment — that there are common questions of law and fact that predominate over individual issues, and that the class is sufficiently numerous. Data breach class actions have faced significant certification challenges in recent years, particularly when individual class members have varying levels of harm. Ohio courts have generally followed the federal trend of requiring meaningful harm showing for data breach class certification.</p>

<h3>Credit Monitoring Offers and Their Implications</h3>

<p>Many businesses respond to data breaches by offering affected individuals free credit monitoring services for one to two years. This is standard practice and is generally viewed positively by regulators and courts as evidence of good faith. However, be aware that some plaintiff attorneys argue that a credit monitoring offer constitutes an implicit admission that the breach created a material risk of identity theft — the same threshold required for notification under Ohio law. Have your breach counsel review any offer of credit monitoring before announcing it, and ensure the announcement language is carefully drafted.</p>

<h3>Cyber Insurance Coordination</h3>

<p>Cyber insurance policies typically cover first-party costs (forensic investigation, notification costs, credit monitoring, business interruption) and third-party costs (defense costs, settlements, and judgments in civil litigation). The coverage is valuable, but the conditions are strict. Most cyber policies require you to notify the insurer before retaining outside counsel or forensic firms — using vendors not on the insurer's approved panel may result in denied coverage for those costs.</p>

<p>Your insurer will also want to control significant aspects of the breach response, including media communications and settlement negotiations. This is not always aligned with your preferences as a business owner. Understand your policy terms before a breach occurs, and have a conversation with your insurance broker about how coverage decisions are made and who has authority over response decisions. The time to negotiate these expectations is at policy renewal, not during an active breach response.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Breach Prevention as Legal Risk Management",
    page_start: 101,
    page_end: 115,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Breach Prevention as Legal Risk Management</h2>

<p>Everything covered in the previous eight chapters addresses what happens after a breach occurs. This chapter addresses what you can do before a breach to reduce the likelihood of one happening and to dramatically improve your legal position if one happens anyway. For an Ohio small business owner, cybersecurity investment is not merely an IT expense — it is a legal risk management strategy with measurable returns.</p>

<h3>The ODA Safe Harbor Requirements</h3>

<p>To qualify for Ohio's Safe Harbor under the Data Protection Act, your business must create, maintain, and comply with a written cybersecurity program that reasonably conforms to at least one of the following recognized frameworks:</p>

<ul>
  <li><strong>NIST Cybersecurity Framework (CSF):</strong> The most widely used framework for general businesses; free at nist.gov/cyberframework</li>
  <li><strong>ISO/IEC 27001:</strong> The international standard for information security management systems; appropriate for businesses with international operations or customers</li>
  <li><strong>CIS Controls:</strong> The Center for Internet Security Controls; particularly practical for small businesses; free resources at cisecurity.org</li>
  <li><strong>PCI DSS:</strong> Required for any business that accepts payment cards; provides Safe Harbor protection for cardholder data breaches</li>
  <li><strong>HIPAA Security Rule:</strong> Required for healthcare businesses; provides Safe Harbor protection for health information breaches</li>
  <li><strong>FTC Act Section 5:</strong> The FTC's data security standards; applicable to all businesses the FTC has jurisdiction over</li>
</ul>

<h3>The Written Security Program: Your Legal Document</h3>

<p>The written security program is both a technical document and a legal document. It describes the administrative, technical, and physical safeguards your business has implemented to protect personal information. For Safe Harbor purposes, it needs to be comprehensive enough that an outside expert reviewing it would conclude it reasonably conforms to the chosen framework. It needs to be implemented — not just written and filed. And it needs to be maintained — updated when your business changes, when new risks are identified, or when the underlying framework is updated.</p>

<p>For a small Ohio business, creating a written security program does not require hiring a full-time security professional. The Ohio SBDC's cybersecurity advisors can help you develop a program appropriate for your business size and industry at no cost. CISA provides free resources at cisa.gov/small-and-medium-businesses. The CIS Controls provide a prioritized list of security actions specifically designed to be achievable by organizations with limited resources.</p>

<h3>Annual Risk Assessment</h3>

<p>A written security program must include a regular risk assessment process. For most small Ohio businesses, an annual risk assessment is appropriate. The assessment identifies what personal information you collect and store, where it lives, who has access to it, what threats it faces, and what your current controls do and do not address. The written output of this assessment becomes part of your Safe Harbor documentation and demonstrates that your security program is a living process, not a one-time exercise.</p>

<h3>Employee Training Documentation</h3>

<p>The majority of data breaches that affect small businesses begin with a phishing email that an employee clicks. Technical controls can reduce this risk, but they cannot eliminate it. Regular employee security training — phishing simulations, password management training, secure data handling procedures — is required by most cybersecurity frameworks and is documented evidence of your security program's implementation. Keep records of all training: who received it, when, what it covered. These records are directly relevant to your Safe Harbor defense and to your insurer's assessment of your risk profile.</p>

<h3>The Legal Argument for Investing Before a Breach</h3>

<p>Consider two scenarios for a hypothetical Ohio retail business with 2,000 customer records containing names and payment information. In Scenario A, the business invested $8,000 per year in cybersecurity — security software, annual risk assessment, employee training, basic framework implementation. A breach occurs, and the business has a documented, compliant program. The Safe Harbor defense substantially reduces civil litigation exposure. The insurer views the business favorably. The AG investigation is brief and concludes without enforcement action. Total breach-related costs: approximately $75,000 including notification, credit monitoring, and legal fees. In Scenario B, the same business invested nothing in cybersecurity. The same breach occurs. There is no Safe Harbor defense. The class action proceeds to a substantial settlement. The AG investigation results in a consent decree with ongoing monitoring requirements. Total breach-related costs: over $500,000 and still growing. The $8,000 annual investment in Scenario A paid for itself many times over. This is the legal argument for investing in security before a breach occurs, and it is entirely sound.</p>

<p>The Ohio SBDC network at ohiosbdc.org can connect you with free cybersecurity consulting. CISA's free resources at cisa.gov are extensive and specifically designed for small businesses. The InVision Network at invisionnetwork.org offers cybersecurity education workshops specifically for Ohio small business owners. The resources are available. The only question is whether you use them before or after a breach makes the decision for you.</p>
</article>`,
  },
];
