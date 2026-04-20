import type { BookChapter } from "@/config/bookCatalog";

/**
 * The Complete Ohio Cybersecurity Resource Directory
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 6 chapters (0–5), ~75 pages, comprehensive reference format with real resources
 */
export const OHIO_DIRECTORY_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">The Complete Ohio Cybersecurity Resource Directory</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">Federal Agencies, Ohio Programs, Free Tools, Hotlines, and Reporting Channels for Fraud and Cyber Victims</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio &middot; 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright &copy; 2026 InVision Network. All rights reserved.</p><p>InVision Network Press &middot; Kettering, Ohio 45440</p><p><em>For educational purposes only. Consult a licensed attorney for legal advice specific to your situation.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — Ohio's Safety Net for Cyber Victims",
    page_start: 4,
    page_end: 10,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — Ohio's Safety Net for Cyber Victims</h2>

<p>Ohio has one of the most comprehensive support networks for fraud and cybercrime victims in the United States. It includes federal agencies with nationwide reach, state agencies with Ohio-specific authority and programs, and nonprofit organizations providing free services to individuals and small businesses. The problem is not that the resources don't exist — it is that most victims do not know what is available or where to start.</p>

<p>This directory exists to solve that problem. It lists every major federal and Ohio resource relevant to cybersecurity incidents and fraud, including phone numbers, website addresses, and specific program names. It tells you which agency handles which type of incident, so you are not spending valuable time in the wrong place. And it provides a decision tree in the final chapter that tells you exactly where to call first depending on what happened to you.</p>

<h3>How to Use This Directory</h3>

<p>This directory is organized in three layers. Chapter 2 covers federal agencies — resources with national jurisdiction that are relevant no matter where in Ohio you live. Chapter 3 covers Ohio-specific state agencies and programs — resources that are either Ohio-only or that have specific Ohio contact information and programs that differ from national operations. Chapter 4 covers free services, training programs, and community resources — nonprofit and educational organizations that provide assistance at no cost. Chapter 5 is the quick reference: a scannable list of every resource with the most important contact details on a single set of pages.</p>

<h3>Prevention Resources vs. Incident Response Resources</h3>

<p>The resources in this directory serve two different purposes, and it is worth understanding the distinction. Prevention resources are organizations, tools, and programs that help you reduce the likelihood of becoming a victim: training programs, phishing simulators, security checklists, and educational workshops. Incident response resources are agencies and organizations that help you after something has already happened: reporting portals, victim assistance programs, legal aid services, and law enforcement contacts.</p>

<p>Many organizations serve both functions. CISA, for example, provides extensive free educational resources for prevention and also provides operational assistance during active cyber incidents. The Ohio AG's office runs consumer education programs and also investigates fraud complaints. Understanding which role an organization is playing in your situation helps you engage them most effectively.</p>

<h3>The Key Principle: Report Everything</h3>

<p>One of the most important principles in cybercrime and fraud response is straightforward: report everything, even if you got the money back. Even if you think the amount is too small to matter. Even if you are embarrassed about what happened. Even if you are not sure a crime was committed. Reports to the FBI, FTC, and Ohio AG contribute to databases that law enforcement uses to identify patterns, investigate criminal organizations, and build prosecutable cases. A $500 romance scam complaint that seems trivial in isolation may be the hundredth complaint against the same criminal organization — and the one that provides investigators with the link they needed. Your report matters. File it.</p>

<p>Estimated time to review this directory: approximately 30 minutes for a first read-through. Keep a printed or bookmarked copy accessible — the most valuable time to consult it is in the first hours after an incident, when having the right phone number immediately can make the difference between recovery and permanent loss.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "Federal Agencies and Reporting Resources",
    page_start: 11,
    page_end: 30,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: Federal Agencies and Reporting Resources</h2>

<p>Federal agencies provide the backbone of fraud and cybercrime reporting in the United States. Their jurisdiction is national, which makes them essential for crimes that cross state lines — as most cybercrime does. Here is a comprehensive reference to each major federal resource relevant to Ohio residents and businesses.</p>

<h3>Federal Trade Commission (FTC)</h3>
<p><strong>Mission:</strong> Protects consumers from unfair, deceptive, and fraudulent business practices. The FTC is the primary federal consumer fraud agency and operates the national fraud reporting database used by law enforcement agencies nationwide.</p>
<ul>
  <li><strong>Report fraud:</strong> reportfraud.ftc.gov</li>
  <li><strong>Identity theft assistance:</strong> identitytheft.gov — step-by-step recovery plans for identity theft victims</li>
  <li><strong>Phone:</strong> 1-877-FTC-HELP (1-877-382-4357)</li>
  <li><strong>TTY:</strong> 1-866-653-4261</li>
  <li><strong>Who to contact:</strong> Anyone who has been defrauded, including victims of imposter scams, online shopping fraud, investment fraud, and identity theft</li>
  <li><strong>Note:</strong> The FTC does not resolve individual complaints but feeds reports into law enforcement databases. File a report even if you do not expect individual resolution.</li>
</ul>

<h3>FBI Internet Crime Complaint Center (IC3)</h3>
<p><strong>Mission:</strong> Receives complaints about internet-facilitated criminal activity and refers them to appropriate law enforcement agencies. IC3 is the primary federal reporting portal for wire fraud, ransomware, business email compromise, and romance scams.</p>
<ul>
  <li><strong>Report online crime:</strong> ic3.gov</li>
  <li><strong>Who to contact:</strong> Victims of wire fraud (including real estate wire fraud), ransomware, business email compromise, romance scams, online auction fraud, and extortion</li>
  <li><strong>Note:</strong> IC3 complaints are reviewed by FBI analysts. High-dollar losses or cases with identified targets are prioritized for active investigation. File immediately after a wire fraud incident — time matters for fund recovery.</li>
</ul>

<h3>Cybersecurity and Infrastructure Security Agency (CISA)</h3>
<p><strong>Mission:</strong> Leads the national effort to understand, manage, and reduce risk to the cyber and physical infrastructure of the United States. CISA is both a prevention resource (free tools, guides, training) and an incident response resource (operational assistance for significant cyber incidents).</p>
<ul>
  <li><strong>Main site:</strong> cisa.gov</li>
  <li><strong>Report a cyber incident:</strong> cisa.gov/report</li>
  <li><strong>Free resources hub:</strong> cisa.gov/resources-tools</li>
  <li><strong>Ransomware resources:</strong> cisa.gov/stopransomware (#StopRansomware campaign)</li>
  <li><strong>Phone:</strong> 1-888-282-0870</li>
  <li><strong>Who to contact:</strong> Businesses and government entities experiencing active cyber incidents, particularly ransomware; anyone seeking free prevention resources</li>
</ul>

<h3>Social Security Administration Office of Inspector General (SSA OIG)</h3>
<p><strong>Mission:</strong> Investigates fraud, waste, and abuse in SSA programs, including Social Security number misuse and SSA impersonation scams.</p>
<ul>
  <li><strong>Report Social Security fraud:</strong> oig.ssa.gov</li>
  <li><strong>Phone:</strong> 1-800-269-0271</li>
  <li><strong>Who to contact:</strong> Victims of SSA impersonation scams ("Social Security number suspended" calls), SSN misuse, and disability insurance fraud</li>
</ul>

<h3>IRS Criminal Investigation</h3>
<p><strong>Mission:</strong> Investigates financial crimes involving tax violations, including tax identity theft, fraudulent tax returns filed in another person's name, and IRS impersonation scams.</p>
<ul>
  <li><strong>Report phishing and IRS impersonation:</strong> IRS.gov/uac/Report-Phishing — forward suspicious emails to phishing@irs.gov</li>
  <li><strong>Report tax identity theft:</strong> IRS.gov/identity-theft — file IRS Form 14039 (Identity Theft Affidavit)</li>
  <li><strong>Who to contact:</strong> Anyone who received a fraudulent tax return filed in their name, victims of IRS impersonation calls demanding immediate payment</li>
</ul>

<h3>Consumer Financial Protection Bureau (CFPB)</h3>
<p><strong>Mission:</strong> Protects consumers in the financial marketplace, including complaints against banks, lenders, credit bureaus, and debt collectors.</p>
<ul>
  <li><strong>File a complaint:</strong> consumerfinance.gov/complaint</li>
  <li><strong>Phone:</strong> 1-855-411-CFPB (1-855-411-2372)</li>
  <li><strong>Who to contact:</strong> Victims of predatory lending, mortgage fraud, unfair bank practices, credit reporting errors, and debt collection abuse</li>
</ul>

<h3>FCC Consumer Complaints</h3>
<p><strong>Mission:</strong> Handles complaints about telephone, internet, and broadcast services, including robocall violations and phone number spoofing.</p>
<ul>
  <li><strong>File a complaint:</strong> consumercomplaints.fcc.gov</li>
  <li><strong>Phone:</strong> 1-888-225-5322</li>
  <li><strong>Who to contact:</strong> Victims of robocalls, caller ID spoofing, unwanted text messages, and phone carrier issues</li>
</ul>

<h3>HHS Office for Civil Rights (OCR) — HIPAA</h3>
<p><strong>Mission:</strong> Enforces federal civil rights laws and HIPAA privacy and security rules in health and human services programs. Handles complaints about unauthorized disclosure of health information.</p>
<ul>
  <li><strong>File a HIPAA complaint:</strong> hhs.gov/ocr</li>
  <li><strong>Online complaint portal:</strong> ocrportal.hhs.gov/ocr/smartscreen/main.jsf</li>
  <li><strong>Phone:</strong> 1-800-368-1019</li>
  <li><strong>TDD:</strong> 1-800-537-7697</li>
  <li><strong>Who to contact:</strong> Anyone whose protected health information was improperly disclosed by a healthcare provider, health plan, or healthcare clearinghouse</li>
</ul>

<h3>SEC Office of Investor Education and Advocacy</h3>
<p><strong>Mission:</strong> Helps investors identify and avoid investment fraud and provides a complaint process for securities violations.</p>
<ul>
  <li><strong>Investor education and fraud tips:</strong> investor.gov</li>
  <li><strong>File a complaint or tip:</strong> sec.gov/tcr</li>
  <li><strong>EDGAR company search (verify investments):</strong> sec.gov/cgi-bin/browse-edgar</li>
  <li><strong>Phone:</strong> 1-800-732-2999</li>
  <li><strong>Who to contact:</strong> Victims of investment fraud, Ponzi schemes, unregistered securities offerings, and broker misconduct</li>
</ul>

<h3>FINRA BrokerCheck</h3>
<p><strong>Mission:</strong> Provides free public access to professional backgrounds, disciplinary history, and registration information for FINRA-registered brokers and brokerage firms.</p>
<ul>
  <li><strong>Search brokers:</strong> brokercheck.finra.org</li>
  <li><strong>File a complaint:</strong> finra.org/investors/have-problem/file-complaint</li>
  <li><strong>Phone:</strong> 1-301-590-6500</li>
  <li><strong>Who to contact:</strong> Anyone who wants to verify a broker's credentials before investing, or who has a complaint about a broker's conduct</li>
</ul>

<h3>National Credit Union Administration (NCUA)</h3>
<p><strong>Mission:</strong> Regulates and insures federal credit unions, including investigating complaints against federally insured credit unions.</p>
<ul>
  <li><strong>File a complaint:</strong> ncua.gov/consumers/consumer-assistance-resources</li>
  <li><strong>Phone:</strong> 1-800-755-1030</li>
  <li><strong>Who to contact:</strong> Members of federally insured credit unions with complaints about unfair practices, fraud involving their credit union account</li>
</ul>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Ohio State Agencies and Programs",
    page_start: 31,
    page_end: 50,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Ohio State Agencies and Programs</h2>

<p>Ohio operates a comprehensive network of state agencies with specific authority over cybersecurity, fraud, consumer protection, elder abuse, and financial regulation. These agencies have Ohio-specific jurisdiction and often provide more direct assistance to Ohio residents than federal counterparts. Here is a complete reference to each major Ohio resource.</p>

<h3>Ohio Attorney General — Consumer Protection Section</h3>
<p><strong>Mission:</strong> Ohio's primary consumer protection authority, with power to investigate fraud, file lawsuits against deceptive businesses, and refer criminal matters for prosecution. The AG's Consumer Protection Section handles a broad range of fraud types affecting Ohio residents.</p>
<ul>
  <li><strong>Website:</strong> ohioattorneygeneral.gov</li>
  <li><strong>File a consumer complaint:</strong> ohioattorneygeneral.gov/Individuals-and-Families/Consumers/File-A-Complaint</li>
  <li><strong>Phone:</strong> 1-800-282-0515</li>
  <li><strong>Home Foreclosure Assistance:</strong> 1-888-995-HOPE (4673)</li>
  <li><strong>Elder Fraud complaints:</strong> handled through the main consumer protection line</li>
  <li><strong>Who to contact:</strong> Victims of any consumer fraud in Ohio, including scams, identity theft, predatory lending, contractor fraud, and rental fraud</li>
</ul>

<h3>Ohio Department of Public Safety (ODPS) — Cybercrime</h3>
<p><strong>Mission:</strong> Ohio's public safety umbrella agency, which includes the Ohio State Highway Patrol. The OSHP Computer Crimes Unit investigates cybercrime with a law enforcement focus, including cyberstalking, computer intrusion, and child exploitation online.</p>
<ul>
  <li><strong>Website:</strong> publicsafety.ohio.gov</li>
  <li><strong>Ohio State Highway Patrol Computer Crimes Unit:</strong> statepatrol.ohio.gov</li>
  <li><strong>OSHP Tip Line:</strong> 1-877-7-PATROL (1-877-772-8765)</li>
  <li><strong>Who to contact:</strong> Cybercrime victims, particularly cyberstalking, computer intrusion, and internet crimes against children; also coordinate with local law enforcement</li>
</ul>

<h3>Ohio Division of Securities</h3>
<p><strong>Mission:</strong> Regulates the securities industry in Ohio, licenses brokers and investment advisers, and investigates investment fraud targeting Ohio residents.</p>
<ul>
  <li><strong>Website:</strong> securities.ohio.gov</li>
  <li><strong>File a complaint:</strong> securities.ohio.gov/complaint</li>
  <li><strong>Investor education:</strong> securities.ohio.gov/investor-education</li>
  <li><strong>Phone:</strong> 1-877-683-7841</li>
  <li><strong>Who to contact:</strong> Victims of investment fraud in Ohio, anyone wanting to verify a securities professional's Ohio license, and those seeking investor education resources</li>
</ul>

<h3>Ohio Department of Insurance</h3>
<p><strong>Mission:</strong> Regulates the insurance industry in Ohio and investigates insurance fraud, including fraudulent claims and agent misconduct. Also the licensing authority for Ohio title companies.</p>
<ul>
  <li><strong>Website:</strong> insurance.ohio.gov</li>
  <li><strong>Report insurance fraud:</strong> insurance.ohio.gov/wps/portal/gov/odi/consumers/report-fraud</li>
  <li><strong>Title company license lookup:</strong> insurance.ohio.gov (search "title insurance agent lookup")</li>
  <li><strong>Phone:</strong> 1-800-686-1526</li>
  <li><strong>Who to contact:</strong> Victims of insurance fraud, anyone verifying a title company or insurance agent license, complaints about insurance claim handling</li>
</ul>

<h3>Ohio Cyber Reserve</h3>
<p><strong>Mission:</strong> A volunteer team of cybersecurity professionals who provide technical assistance to local governments and small organizations in Ohio experiencing cyber incidents. Modeled on the National Guard concept for cybersecurity.</p>
<ul>
  <li><strong>Website:</strong> cyber.ohio.gov/reserve</li>
  <li><strong>Who to contact:</strong> Ohio local governments and qualifying small organizations experiencing active cyber incidents who need technical assistance beyond their internal capacity</li>
  <li><strong>Note:</strong> The Cyber Reserve is not a consumer hotline — it is a technical response team for organizational incidents. Individual consumers should contact the AG or local law enforcement.</li>
</ul>

<h3>Ohio Department of Aging — Adult Protective Services (Elder Abuse Hotline)</h3>
<p><strong>Mission:</strong> Protects vulnerable Ohio adults from abuse, neglect, and exploitation, including financial exploitation and fraud targeting seniors.</p>
<ul>
  <li><strong>Website:</strong> aging.ohio.gov</li>
  <li><strong>Adult Protective Services Hotline:</strong> 1-800-OHIO-APS (1-800-644-6277)</li>
  <li><strong>Who to contact:</strong> Anyone reporting suspected financial exploitation of an older Ohio adult, including romance scams, caregiver theft, and predatory financial products targeting seniors</li>
</ul>

<h3>Ohio Senior Medicare Patrol (SMP)</h3>
<p><strong>Mission:</strong> A federally funded program operated through Ohio's Area Agencies on Aging that helps Medicare and Medicaid beneficiaries detect, prevent, and report healthcare fraud and abuse.</p>
<ul>
  <li><strong>Phone:</strong> 1-800-488-6070</li>
  <li><strong>Website:</strong> smpresource.org (national) — contact the Ohio number for local assistance</li>
  <li><strong>Who to contact:</strong> Medicare and Medicaid beneficiaries who received a bill for services not received, suspect Medicare fraud by a provider, or want to learn how to read their Medicare Summary Notice</li>
</ul>

<h3>Ohio OSHIIP — Senior Health Insurance Information Program</h3>
<p><strong>Mission:</strong> Provides free, unbiased health insurance counseling to Ohio seniors, helping them understand Medicare, Medicaid, supplemental insurance options, and how to identify insurance-related fraud.</p>
<ul>
  <li><strong>Phone:</strong> 1-800-686-1578</li>
  <li><strong>Website:</strong> insurance.ohio.gov/wps/portal/gov/odi/consumers/health/oshiip</li>
  <li><strong>Who to contact:</strong> Ohio seniors with questions about Medicare coverage, supplemental insurance, Part D prescription plans, and insurance billing questions</li>
</ul>

<h3>Ohio Department of Veterans Services (ODVA)</h3>
<p><strong>Mission:</strong> Provides services and support to Ohio veterans, including assistance identifying and reporting scams that specifically target veterans and their benefits.</p>
<ul>
  <li><strong>Website:</strong> dvs.ohio.gov</li>
  <li><strong>Phone:</strong> 1-888-DVS-OHIO (1-888-387-6446)</li>
  <li><strong>Who to contact:</strong> Ohio veterans who believe they are victims of benefit scams, pension poaching, or other fraud targeting military service members and veterans</li>
</ul>

<h3>Ohio Legal Help</h3>
<p><strong>Mission:</strong> A statewide online resource connecting Ohioans with free and low-cost legal help, including resources specifically for fraud and identity theft victims.</p>
<ul>
  <li><strong>Website:</strong> ohiolegalhelp.org</li>
  <li><strong>Who to contact:</strong> Any Ohio resident seeking free legal information or referrals to legal aid services, particularly those who cannot afford private legal representation</li>
</ul>

<h3>Ohio Small Business Development Center (SBDC)</h3>
<p><strong>Mission:</strong> Provides free and low-cost business consulting to Ohio small businesses, including cybersecurity planning assistance.</p>
<ul>
  <li><strong>Website:</strong> ohiosbdc.org</li>
  <li><strong>Phone:</strong> 1-614-466-2711 (state office; local centers vary)</li>
  <li><strong>Who to contact:</strong> Ohio small business owners seeking help with cybersecurity planning, written security programs, incident response planning, and ODA Safe Harbor compliance</li>
</ul>

<h3>Ohio Division of Real Estate and Professional Licensing</h3>
<p><strong>Mission:</strong> Licenses and regulates Ohio real estate agents, brokers, and appraisers. Investigates complaints about agent conduct and maintains the public license lookup.</p>
<ul>
  <li><strong>License lookup:</strong> com.ohio.gov/divisions/real-estate — search agents by name or license number</li>
  <li><strong>File a complaint:</strong> com.ohio.gov/divisions/real-estate</li>
  <li><strong>Phone:</strong> 1-614-466-4100</li>
  <li><strong>Who to contact:</strong> Anyone verifying an Ohio real estate agent's license, or filing a complaint about agent misconduct</li>
</ul>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Free Services, Training Programs, and Community Resources",
    page_start: 51,
    page_end: 63,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Free Services, Training Programs, and Community Resources</h2>

<p>Beyond government agencies, a robust network of nonprofit organizations, educational programs, and free online tools is available to Ohio residents and businesses at no cost. These resources range from national fraud hotlines to free phishing training to credit freeze assistance. This chapter catalogs the most valuable free resources available.</p>

<h3>AARP Fraud Watch Network</h3>
<p><strong>Mission:</strong> Provides fraud prevention education and victim support to people of all ages, with particular expertise in scams targeting older adults.</p>
<ul>
  <li><strong>Website:</strong> aarp.org/money/scams-fraud/fraud-watch-network</li>
  <li><strong>Fraud helpline (free):</strong> 1-877-908-3360 — speak with a trained volunteer who has experience with fraud victim support</li>
  <li><strong>Scam Tracking Map:</strong> aarp.org/fraudwatchnetwork — see what scams are active in your area</li>
  <li><strong>Who to contact:</strong> Anyone who has been scammed or wants to learn how to protect themselves, available to all ages (not just AARP members)</li>
</ul>

<h3>National Elder Fraud Hotline</h3>
<p><strong>Mission:</strong> Operated by the U.S. Department of Justice, this hotline provides case management services to elder fraud victims and referrals to local resources.</p>
<ul>
  <li><strong>Phone:</strong> 1-833-FRAUD-11 (1-833-372-8311)</li>
  <li><strong>Hours:</strong> Monday–Friday, 10 a.m. to 6 p.m. ET</li>
  <li><strong>Who to contact:</strong> Adults 60 and older (or those calling on their behalf) who have experienced financial fraud</li>
</ul>

<h3>Identity Theft Resource Center (ITRC)</h3>
<p><strong>Mission:</strong> Provides free, expert, and confidential support for identity theft victims, including individualized case assistance and self-help resources.</p>
<ul>
  <li><strong>Website:</strong> idtheftcenter.org</li>
  <li><strong>Victim assistance (free):</strong> 1-888-400-5530</li>
  <li><strong>Live chat:</strong> available at idtheftcenter.org during business hours</li>
  <li><strong>Who to contact:</strong> Anyone experiencing any form of identity theft, including tax identity theft, medical identity theft, and synthetic identity fraud</li>
</ul>

<h3>National Center for Missing &amp; Exploited Children (NCMEC)</h3>
<p><strong>Mission:</strong> Provides resources for child online safety, operates the CyberTipline for reporting online child sexual exploitation, and coordinates with law enforcement on internet crimes against children.</p>
<ul>
  <li><strong>Website:</strong> missingkids.org</li>
  <li><strong>CyberTipline (report online child exploitation):</strong> cybertipline.org</li>
  <li><strong>Phone:</strong> 1-800-THE-LOST (1-800-843-5678)</li>
  <li><strong>Who to contact:</strong> Anyone who discovers online child sexual exploitation material, parents concerned about their child's online safety, and victims of online sextortion</li>
</ul>

<h3>InVision Network Cybersecurity Workshops</h3>
<p><strong>Mission:</strong> InVision Network provides cybersecurity education workshops specifically designed for Ohio families, seniors, and small business owners through in-person, virtual, and on-demand formats.</p>
<ul>
  <li><strong>Website:</strong> invisionnetwork.org/training</li>
  <li><strong>Dayton area office:</strong> serving Montgomery, Greene, Warren, and surrounding Ohio counties</li>
  <li><strong>Workshop topics:</strong> scam awareness, phishing defense, identity protection, small business security, real estate fraud prevention</li>
  <li><strong>Who to contact:</strong> Ohio residents and businesses seeking educational workshops; community organizations wanting to host a workshop for their members</li>
</ul>

<h3>CISA Free Cybersecurity Resources</h3>
<ul>
  <li><strong>Resources hub:</strong> cisa.gov/resources-tools</li>
  <li><strong>Free vulnerability scanning for organizations:</strong> cisa.gov/cyber-hygiene-services</li>
  <li><strong>Known exploited vulnerabilities catalog:</strong> cisa.gov/known-exploited-vulnerabilities-catalog</li>
  <li><strong>Free phishing simulations and training:</strong> cisa.gov/PhishingAwareness</li>
</ul>

<h3>Free Online Security Training and Tools</h3>
<ul>
  <li><strong>KnowBe4 Free Phishing Security Test:</strong> knowbe4.com/phishing-security-test — test your organization's susceptibility to phishing</li>
  <li><strong>Google Phishing Quiz:</strong> phishingquiz.withgoogle.com — free interactive quiz to learn how to identify phishing emails</li>
  <li><strong>Have I Been Pwned (breach checker):</strong> haveibeenpwned.com — check whether your email address has appeared in a known data breach</li>
  <li><strong>Google Password Checkup:</strong> passwords.google.com/checkup — check whether saved passwords have been compromised</li>
</ul>

<h3>Free Credit Tools</h3>
<ul>
  <li><strong>Annual Credit Report (free, federally mandated):</strong> annualcreditreport.com — free credit reports from all three bureaus weekly through December 2026</li>
  <li><strong>Credit freeze — Equifax:</strong> equifax.com/personal/credit-report-services/credit-freeze — free, can be placed and lifted online</li>
  <li><strong>Credit freeze — Experian:</strong> experian.com/freeze/center.html — free, can be placed and lifted online or by phone at 1-888-397-3742</li>
  <li><strong>Credit freeze — TransUnion:</strong> transunion.com/credit-freeze — free, can be placed and lifted online or by phone at 1-888-909-8872</li>
  <li><strong>Note:</strong> Placing a credit freeze at all three bureaus is the single most effective action you can take after identity theft. It is free and does not affect your credit score.</li>
</ul>

<h3>Legal Aid Resources in Ohio</h3>
<ul>
  <li><strong>Legal Aid Society of Columbus:</strong> columbuslegalaid.org, 614-224-8374 — serves Franklin County and surrounding areas</li>
  <li><strong>Legal Aid Society of Cleveland:</strong> lasclev.org, 216-687-1900 — serves Cuyahoga, Lake, Geauga, and Ashtabula counties</li>
  <li><strong>Legal Aid of Western Ohio:</strong> lawolaw.org, 1-888-534-1432 — serves northwest and west-central Ohio including Dayton and Toledo</li>
  <li><strong>Community Legal Aid (Akron/Canton):</strong> communitylegalaid.org, 330-535-4191 — serves Summit, Stark, Portage, and Medina counties</li>
  <li><strong>Ohio Bar Association Lawyer Referral Service:</strong> ohiobar.org, 1-800-282-6556 — connects individuals with private attorneys for a reduced-rate initial consultation</li>
  <li><strong>Ohio Legal Help:</strong> ohiolegalhelp.org — statewide free legal information and referrals</li>
</ul>

<h3>Credit Counseling</h3>
<ul>
  <li><strong>National Foundation for Credit Counseling (NFCC):</strong> nfcc.org, 1-800-388-2227 — find NFCC-certified credit counselors in Ohio</li>
  <li><strong>Note:</strong> NFCC members are nonprofit agencies; be cautious of for-profit "debt settlement" companies that charge large upfront fees</li>
</ul>

<h3>Ohio Cybersecurity Education</h3>
<ul>
  <li><strong>Ohio Technical College (OTC) Cybersecurity Program:</strong> ohiotechnicalcollege.edu — professional cybersecurity certification and degree programs in Ohio</li>
  <li><strong>Columbus State Community College Cybersecurity:</strong> cscc.edu — affordable cybersecurity degrees and certificates serving central Ohio</li>
  <li><strong>Ohio Cyber Range Institute:</strong> ohiocyberrange.org — statewide cybersecurity education and training platform used by Ohio educational institutions</li>
</ul>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Quick Reference Directory — Hotlines and Contacts",
    page_start: 64,
    page_end: 75,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Quick Reference Directory — Hotlines and Contacts</h2>

<p>This chapter is designed for quick reference. Keep it accessible — posted on your refrigerator, saved on your phone, or bookmarked in your browser. In the critical first minutes after discovering fraud or a cybersecurity incident, having the right number immediately can make the difference between recovery and permanent loss.</p>

<h3>Complete Quick Reference: All Major Resources</h3>

<table style="width:100%; border-collapse:collapse; font-size:0.9em;">
  <thead>
    <tr style="background:#f0f0f0; text-align:left;">
      <th style="padding:8px; border:1px solid #ccc;">Organization</th>
      <th style="padding:8px; border:1px solid #ccc;">What It Handles</th>
      <th style="padding:8px; border:1px solid #ccc;">Phone</th>
      <th style="padding:8px; border:1px solid #ccc;">Website</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:8px; border:1px solid #ccc;">FTC — Fraud Reporting</td><td style="padding:8px; border:1px solid #ccc;">All consumer fraud</td><td style="padding:8px; border:1px solid #ccc;">1-877-382-4357</td><td style="padding:8px; border:1px solid #ccc;">reportfraud.ftc.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">FTC — Identity Theft</td><td style="padding:8px; border:1px solid #ccc;">Identity theft recovery</td><td style="padding:8px; border:1px solid #ccc;">1-877-382-4357</td><td style="padding:8px; border:1px solid #ccc;">identitytheft.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">FBI IC3</td><td style="padding:8px; border:1px solid #ccc;">Internet/wire fraud, ransomware</td><td style="padding:8px; border:1px solid #ccc;">—</td><td style="padding:8px; border:1px solid #ccc;">ic3.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">CISA</td><td style="padding:8px; border:1px solid #ccc;">Cyber incidents, ransomware</td><td style="padding:8px; border:1px solid #ccc;">1-888-282-0870</td><td style="padding:8px; border:1px solid #ccc;">cisa.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">SSA Office of Inspector General</td><td style="padding:8px; border:1px solid #ccc;">Social Security fraud</td><td style="padding:8px; border:1px solid #ccc;">1-800-269-0271</td><td style="padding:8px; border:1px solid #ccc;">oig.ssa.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">CFPB</td><td style="padding:8px; border:1px solid #ccc;">Financial product complaints</td><td style="padding:8px; border:1px solid #ccc;">1-855-411-2372</td><td style="padding:8px; border:1px solid #ccc;">consumerfinance.gov/complaint</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">SEC</td><td style="padding:8px; border:1px solid #ccc;">Investment fraud</td><td style="padding:8px; border:1px solid #ccc;">1-800-732-2999</td><td style="padding:8px; border:1px solid #ccc;">investor.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">FINRA BrokerCheck</td><td style="padding:8px; border:1px solid #ccc;">Broker verification &amp; complaints</td><td style="padding:8px; border:1px solid #ccc;">1-301-590-6500</td><td style="padding:8px; border:1px solid #ccc;">brokercheck.finra.org</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">HHS Office for Civil Rights</td><td style="padding:8px; border:1px solid #ccc;">HIPAA / health information</td><td style="padding:8px; border:1px solid #ccc;">1-800-368-1019</td><td style="padding:8px; border:1px solid #ccc;">hhs.gov/ocr</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">FCC Consumer Complaints</td><td style="padding:8px; border:1px solid #ccc;">Robocalls, phone spoofing</td><td style="padding:8px; border:1px solid #ccc;">1-888-225-5322</td><td style="padding:8px; border:1px solid #ccc;">consumercomplaints.fcc.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">NCUA (credit unions)</td><td style="padding:8px; border:1px solid #ccc;">Credit union complaints</td><td style="padding:8px; border:1px solid #ccc;">1-800-755-1030</td><td style="padding:8px; border:1px solid #ccc;">ncua.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;"><strong>Ohio Attorney General</strong></td><td style="padding:8px; border:1px solid #ccc;"><strong>All Ohio consumer fraud</strong></td><td style="padding:8px; border:1px solid #ccc;"><strong>1-800-282-0515</strong></td><td style="padding:8px; border:1px solid #ccc;">ohioattorneygeneral.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio Division of Securities</td><td style="padding:8px; border:1px solid #ccc;">Ohio investment fraud</td><td style="padding:8px; border:1px solid #ccc;">1-877-683-7841</td><td style="padding:8px; border:1px solid #ccc;">securities.ohio.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio Department of Insurance</td><td style="padding:8px; border:1px solid #ccc;">Insurance fraud, title companies</td><td style="padding:8px; border:1px solid #ccc;">1-800-686-1526</td><td style="padding:8px; border:1px solid #ccc;">insurance.ohio.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio Adult Protective Services</td><td style="padding:8px; border:1px solid #ccc;">Elder financial exploitation</td><td style="padding:8px; border:1px solid #ccc;">1-800-644-6277</td><td style="padding:8px; border:1px solid #ccc;">aging.ohio.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio Senior Medicare Patrol</td><td style="padding:8px; border:1px solid #ccc;">Medicare fraud</td><td style="padding:8px; border:1px solid #ccc;">1-800-488-6070</td><td style="padding:8px; border:1px solid #ccc;">smpresource.org</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio OSHIIP</td><td style="padding:8px; border:1px solid #ccc;">Medicare insurance counseling</td><td style="padding:8px; border:1px solid #ccc;">1-800-686-1578</td><td style="padding:8px; border:1px solid #ccc;">insurance.ohio.gov/oshiip</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio DVS (Veterans)</td><td style="padding:8px; border:1px solid #ccc;">Veteran fraud and benefits</td><td style="padding:8px; border:1px solid #ccc;">1-888-387-6446</td><td style="padding:8px; border:1px solid #ccc;">dvs.ohio.gov</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">AARP Fraud Helpline</td><td style="padding:8px; border:1px solid #ccc;">Fraud victim support (all ages)</td><td style="padding:8px; border:1px solid #ccc;">1-877-908-3360</td><td style="padding:8px; border:1px solid #ccc;">aarp.org/fraudwatchnetwork</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">National Elder Fraud Hotline</td><td style="padding:8px; border:1px solid #ccc;">Elder fraud case management</td><td style="padding:8px; border:1px solid #ccc;">1-833-372-8311</td><td style="padding:8px; border:1px solid #ccc;">—</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Identity Theft Resource Center</td><td style="padding:8px; border:1px solid #ccc;">Identity theft victim support</td><td style="padding:8px; border:1px solid #ccc;">1-888-400-5530</td><td style="padding:8px; border:1px solid #ccc;">idtheftcenter.org</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">NCMEC CyberTipline</td><td style="padding:8px; border:1px solid #ccc;">Online child exploitation</td><td style="padding:8px; border:1px solid #ccc;">1-800-843-5678</td><td style="padding:8px; border:1px solid #ccc;">cybertipline.org</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio Bar Lawyer Referral</td><td style="padding:8px; border:1px solid #ccc;">Find an attorney in Ohio</td><td style="padding:8px; border:1px solid #ccc;">1-800-282-6556</td><td style="padding:8px; border:1px solid #ccc;">ohiobar.org</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio Legal Help</td><td style="padding:8px; border:1px solid #ccc;">Free legal information</td><td style="padding:8px; border:1px solid #ccc;">—</td><td style="padding:8px; border:1px solid #ccc;">ohiolegalhelp.org</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Ohio SBDC</td><td style="padding:8px; border:1px solid #ccc;">Small business cybersecurity help</td><td style="padding:8px; border:1px solid #ccc;">1-614-466-2711</td><td style="padding:8px; border:1px solid #ccc;">ohiosbdc.org</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Credit Freeze — Equifax</td><td style="padding:8px; border:1px solid #ccc;">Freeze credit (free)</td><td style="padding:8px; border:1px solid #ccc;">1-800-349-9960</td><td style="padding:8px; border:1px solid #ccc;">equifax.com/personal/credit-report-services/credit-freeze</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Credit Freeze — Experian</td><td style="padding:8px; border:1px solid #ccc;">Freeze credit (free)</td><td style="padding:8px; border:1px solid #ccc;">1-888-397-3742</td><td style="padding:8px; border:1px solid #ccc;">experian.com/freeze/center.html</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Credit Freeze — TransUnion</td><td style="padding:8px; border:1px solid #ccc;">Freeze credit (free)</td><td style="padding:8px; border:1px solid #ccc;">1-888-909-8872</td><td style="padding:8px; border:1px solid #ccc;">transunion.com/credit-freeze</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Have I Been Pwned</td><td style="padding:8px; border:1px solid #ccc;">Check if email was in a breach</td><td style="padding:8px; border:1px solid #ccc;">—</td><td style="padding:8px; border:1px solid #ccc;">haveibeenpwned.com</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">Annual Credit Report</td><td style="padding:8px; border:1px solid #ccc;">Free credit reports</td><td style="padding:8px; border:1px solid #ccc;">1-877-322-8228</td><td style="padding:8px; border:1px solid #ccc;">annualcreditreport.com</td></tr>
    <tr><td style="padding:8px; border:1px solid #ccc;">InVision Network</td><td style="padding:8px; border:1px solid #ccc;">Ohio cybersecurity education</td><td style="padding:8px; border:1px solid #ccc;">—</td><td style="padding:8px; border:1px solid #ccc;">invisionnetwork.org/training</td></tr>
  </tbody>
</table>

<hr style="margin: 2em 0;" />

<h3>What to Do First — Decision Tree</h3>

<p>Use this decision tree to identify your first calls in the first hour after discovering a problem. Additional reporting should follow, but these are your immediate priorities.</p>

<ul>
  <li>
    <strong>Lost money to a scam</strong>
    <ol>
      <li>Call your bank immediately — request wire recall or dispute</li>
      <li>File at ic3.gov (FBI Internet Crime Complaint Center)</li>
      <li>File at reportfraud.ftc.gov</li>
      <li>Call Ohio AG: 1-800-282-0515</li>
    </ol>
  </li>
  <li>
    <strong>Identity stolen</strong>
    <ol>
      <li>Go to identitytheft.gov — create your personalized recovery plan</li>
      <li>Freeze credit at all three bureaus (Equifax, Experian, TransUnion)</li>
      <li>Call SSA OIG if SSN was misused: 1-800-269-0271</li>
      <li>Call ITRC for case support: 1-888-400-5530</li>
    </ol>
  </li>
  <li>
    <strong>Medicare fraud</strong>
    <ol>
      <li>Call 1-800-MEDICARE (1-800-633-4227)</li>
      <li>Call Ohio SMP: 1-800-488-6070</li>
      <li>Call Ohio AG: 1-800-282-0515</li>
    </ol>
  </li>
  <li>
    <strong>Romance scam</strong>
    <ol>
      <li>File at ic3.gov</li>
      <li>Call local police — get a report number</li>
      <li>Call Ohio AG: 1-800-282-0515</li>
      <li>Call AARP Fraud Helpline for support: 1-877-908-3360</li>
    </ol>
  </li>
  <li>
    <strong>Data breach (business)</strong>
    <ol>
      <li>Call your attorney — engage breach counsel immediately</li>
      <li>Call your cyber insurer — before retaining outside vendors</li>
      <li>Notify Ohio AG (if 500+ Ohio residents): ohioattorneygeneral.gov</li>
      <li>Contact Ohio SBDC for post-incident support: ohiosbdc.org</li>
    </ol>
  </li>
  <li>
    <strong>Ransomware (business)</strong>
    <ol>
      <li>Do not pay the ransom — contact FBI IC3 first: ic3.gov</li>
      <li>Call CISA: 1-888-282-0870</li>
      <li>Call your cyber insurer</li>
      <li>Contact Ohio Cyber Reserve if you are a local government or qualifying organization: cyber.ohio.gov/reserve</li>
    </ol>
  </li>
  <li>
    <strong>Investment fraud</strong>
    <ol>
      <li>Call Ohio Division of Securities: 1-877-683-7841</li>
      <li>File an SEC tip: sec.gov/tcr</li>
      <li>File with FINRA if a broker is involved: finra.org/investors/have-problem/file-complaint</li>
    </ol>
  </li>
  <li>
    <strong>Real estate wire fraud</strong>
    <ol>
      <li>Call your bank immediately — every minute counts</li>
      <li>File at ic3.gov — reference "real estate wire fraud"</li>
      <li>Call Ohio AG: 1-800-282-0515</li>
      <li>File a police report with your local department</li>
    </ol>
  </li>
  <li>
    <strong>Child online safety / exploitation</strong>
    <ol>
      <li>Call NCMEC: 1-800-843-5678</li>
      <li>Report to CyberTipline: cybertipline.org</li>
      <li>Call local police</li>
      <li>Contact the platform (Facebook, Instagram, Snapchat, etc.) to report and preserve evidence</li>
    </ol>
  </li>
  <li>
    <strong>Veteran fraud</strong>
    <ol>
      <li>Call Ohio DVS: 1-888-387-6446</li>
      <li>File at reportfraud.ftc.gov</li>
      <li>Contact your local Veterans Service Officer (VSO)</li>
    </ol>
  </li>
</ul>

<hr style="margin: 2em 0;" />

<p style="font-size:0.9em; color:#555;"><em>This directory was current as of April 2026. Phone numbers and website addresses occasionally change. If you encounter a disconnected number or broken link, go to the organization's main website or search for their current contact information. InVision Network maintains updated resource links at invisionnetwork.org/resources.</em></p>
</article>`,
  },
];
