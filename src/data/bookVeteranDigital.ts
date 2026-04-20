import type { BookChapter } from "@/config/bookCatalog";

/**
 * Ohio Veteran's Guide to Digital Safety
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 8 chapters (0–7), ~95 pages, respectful and straightforward tone for Ohio veterans
 */
export const VETERAN_DIGITAL_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Ohio Veteran's Guide to Digital Safety</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">Protecting Your Benefits, Identity, and Financial Security Online</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>InVision Network Press · Kettering, Ohio 45440</p><p><em>For educational purposes only. This is not legal or financial advice. For official VA information, visit VA.gov or call 1-800-827-1000.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — Veterans Are High-Value Targets",
    page_start: 4,
    page_end: 17,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — Veterans Are High-Value Targets</h2>

<p>Ohio is home to more than 700,000 veterans — one of the largest veteran populations in the country. That is 700,000 people who served, sacrificed, and earned benefits that represent real financial security: VA disability compensation, pensions, education benefits, home loan guarantees, and healthcare entitlements that took years of service and sometimes significant sacrifice to earn. Those benefits make Ohio veterans financially attractive to a specific kind of predator: the fraud operator who has learned to target veterans deliberately and systematically.</p>

<p>Veterans lose more than $2 billion annually to fraud, according to Federal Trade Commission data. That figure has grown year over year, and it does not capture the full scope of losses because many veterans do not report fraud — a pattern we will address directly in this chapter. The scams targeting veterans are not random opportunism. They are engineered specifically to exploit characteristics of the veteran experience: known income sources, structured community networks, a culture of trust among fellow service members, and a sense of honor that can make it painful to admit having been deceived.</p>

<p>This book is written for Ohio veterans. It is direct, practical, and does not talk down to you. You have operated in environments requiring situational awareness, good judgment under pressure, and the ability to assess threats quickly. Those same skills apply to the digital world, and this guide is designed to translate them. By the time you finish reading, you will recognize the specific fraud patterns targeting veterans, know how to verify the legitimacy of any VA contact or financial offer, and understand the Ohio-specific resources available to you if something goes wrong.</p>

<h3>Why Veterans Are Specifically Targeted</h3>

<p>Fraud operators choose their targets strategically. Veterans are attractive for several concrete reasons that go beyond the general targeting of older Americans or people with stable incomes.</p>

<p>First, veteran income sources are predictable and publicized. VA disability compensation, military pensions, and other veteran benefits are paid on a known schedule to identifiable populations. Fraudsters who access veteran community databases, scrape military-affiliated social media, or purchase data from unscrupulous data brokers can identify likely benefit recipients and target them with specific claims about those benefits.</p>

<p>Second, the veteran community has strong internal trust networks. A fellow veteran's endorsement carries enormous weight. Scammers exploit this by posing as veterans, infiltrating veteran online groups and forums, and using military terminology and cultural touchstones to establish credibility rapidly. "Battle buddy" is not just a term of endearment — it is a phrase that signals community membership and lowers defensive barriers. Fraudsters know this.</p>

<p>Third, the bureaucratic complexity of the VA system creates genuine uncertainty that scammers exploit. The VA is a large, complex organization. Claims processes can take months or years. Communication from the VA can be inconsistent. This creates an environment where veterans may be genuinely unsure whether a call or letter about their benefits is legitimate or not — and scammers step into that uncertainty with confident, official-sounding claims.</p>

<p>Fourth, and most importantly: many veterans do not report fraud because they are ashamed. There is a cultural pressure in military communities to project strength and competence. Being victimized by a fraudster can feel like a failure of judgment — something a trained service member should have caught. This is false. These frauds are run by professionals with sophisticated social engineering techniques. The shame that prevents reporting is itself a tool that fraudsters count on.</p>

<h3>The Scale of the Problem</h3>

<p>The FTC's Consumer Sentinel Network, which tracks fraud reports, has identified military veterans as a population with disproportionately high rates of certain fraud categories: impersonation fraud, investment fraud, and romance scams in particular. Veterans report median fraud losses that are higher than the general population for most fraud categories.</p>

<p>In Ohio specifically, the Ohio Attorney General's office and the Ohio Department of Veterans Services have both documented recurring fraud patterns targeting the state's veteran community. Ohio's concentration of veterans in specific geographic areas — the Dayton region, Cleveland, Columbus, and smaller towns with large National Guard presences — means that local fraud operations can target veteran-dense communities with geographic precision.</p>

<h3>What This Guide Covers</h3>

<p>We begin with VA benefit scams and government impersonation — the most common fraud vector targeting veterans today. We move through veteran-specific financial fraud, the particular risks of online veteran communities, the connection between isolation and vulnerability, and the Ohio resources that exist specifically to serve veterans who have been targeted.</p>

<p>We close with a practical chapter on building a secure digital life that protects your records, your benefits access, and your financial accounts for the long term. Throughout, we emphasize action over alarm — you are not helpless against these threats, and most of the protective steps are straightforward once you know what they are.</p>

<p>One more thing before we begin: if you have already been victimized by fraud, there is no shame in that, and there are people in Ohio who want to help you. Reporting fraud is not admitting weakness. It is the action that makes it harder for the same fraudsters to victimize the next veteran.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "VA Benefit Scams and Government Impersonation",
    page_start: 18,
    page_end: 30,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: VA Benefit Scams and Government Impersonation</h2>

<p>Government impersonation fraud is one of the most reported fraud categories in the United States, and veterans are a preferred target because they have a known, ongoing relationship with a specific government agency — the VA. Scammers exploit that relationship with calls, letters, emails, and websites designed to look and sound official. This chapter gives you the information you need to tell the real VA from an impersonator, every time.</p>

<h3>The Benefits "Upgrade" Scam</h3>

<p>One of the most common VA-related scams involves a caller or letter claiming that the veteran is entitled to increased benefits — a higher disability rating, additional pension payments, or a retroactive payment — that can only be unlocked if the veteran pays a fee, provides their banking information, or completes a process through a third-party organization. The claim is always urgent. The offer is always time-limited.</p>

<p>The VA does not contact veterans unsolicited to tell them about benefit increases that require immediate action or payment. Legitimate VA benefit changes are communicated through formal written notices to your address of record. They do not require upfront fees. They do not expire in 24 hours. Any contact claiming otherwise is fraudulent.</p>

<h3>Fake VA.gov Websites</h3>

<p>Fraudulent websites designed to mimic VA.gov capture veterans' login credentials, Social Security numbers, and personal information. These sites appear in search results when veterans search for VA forms, benefit information, or login pages. The legitimate VA website is VA.gov — only VA.gov. Any site with a slightly different URL, such as veteransva.com, va-benefits.org, or anything other than VA.gov, is not an official VA resource.</p>

<p>When accessing VA.gov, type the address directly into your browser rather than clicking links from search results or emails. Bookmark the legitimate site for future use.</p>

<h3>Pension Reduction Threats</h3>

<p>Some fraudulent callers claim that a veteran's pension or disability payments are being reduced or terminated due to an audit, a missed form, or an administrative error, and that immediate action is required to prevent the reduction. These calls create panic — a deliberate tactic to make you act before you think. The VA does not reduce or terminate benefits without formal written notice and a full appeals process. A phone call alone cannot change your benefit status.</p>

<h3>How the Real VA Contacts You</h3>

<p>Understanding how the VA actually communicates helps you recognize what is not legitimate. The VA will:</p>
<ul>
  <li>Send formal written correspondence to your address of record for benefit changes.</li>
  <li>Communicate through your VA.gov account for secure messages from your care team.</li>
  <li>Call you from known VA facility or regional office numbers if you have an appointment or open claim.</li>
</ul>

<p>The VA will not:</p>
<ul>
  <li>Call you unsolicited and ask for your Social Security number, banking information, or credit card number.</li>
  <li>Tell you that your benefits will be cut unless you pay a fee immediately.</li>
  <li>Ask you to verify your identity by providing information you did not initiate a process for.</li>
</ul>

<p>If you receive a call claiming to be from the VA that feels suspicious, hang up and call the VA directly at 1-800-827-1000. Do not call back a number provided by the caller.</p>

<h3>eBenefits vs. VA.gov</h3>

<p>The VA has been transitioning from eBenefits to VA.gov for online benefits management. Both are legitimate government portals, but many veterans were directed to eBenefits for years and may not be familiar with the ongoing transition. Fraudsters create fake "eBenefits transition" pages to capture credentials during this period of change. Verify any transition-related instructions directly through VA.gov or by calling the VA directly.</p>

<h3>Veterans Crisis Line Impersonation</h3>

<p>The Veterans Crisis Line (988, then press 1) is a genuine, critical resource. Fraudsters have attempted to create fake crisis line numbers to capture veterans' personal information or route calls to scammers posing as counselors. If you are reaching out for crisis support, use only 988 press 1, or text 838255. Save these contacts in your phone now so you always have them when needed.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Veteran-Specific Financial Fraud and Pension Scams",
    page_start: 31,
    page_end: 43,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Veteran-Specific Financial Fraud and Pension Scams</h2>

<p>Beyond government impersonation, veterans face a range of financial fraud schemes specifically tailored to their benefits and financial situations. These schemes are often more sophisticated than a cold call, involving licensed-seeming professionals, polished marketing materials, and complex financial products designed to obscure what is actually happening to the veteran's money.</p>

<h3>Pension Poaching</h3>

<p>Pension poaching — sometimes called pension stripping — involves financial advisors or planners who convince veterans to restructure their financial assets in ways that qualify them for VA pension benefits they might not otherwise receive, while charging excessive fees for the service. The advisor transfers the veteran's assets to trusts or annuities in ways that reduce their countable assets for VA means-testing purposes. The veteran may qualify for a small increase in benefits but lose far more in fees, reduced asset flexibility, and products that are inappropriate for their situation.</p>

<p>These arrangements are not always illegal, but they are consistently identified by the VA Office of Inspector General and the Government Accountability Office as harmful to veterans. A legitimate veterans service organization (VSO) accredited VA claims agent can help you maximize your benefits for free. You should never pay an upfront fee to someone who claims to help you qualify for VA pension benefits.</p>

<h3>The Accredited VA Claims Agent Fraud</h3>

<p>VA claims agents and veterans service representatives must be accredited by the VA. This accreditation is free and does not allow them to charge fees for representing veterans in claims. Fraudsters pose as accredited agents and charge fees for claims assistance that any legitimate VSO would provide at no cost. Verify any representative's accreditation at the VA's Office of General Counsel accreditation search at va.gov/ogc.</p>

<h3>Predatory Lending Targeting Veterans</h3>

<p>Veterans with VA home loan benefits are frequently targeted by predatory lenders offering mortgage products that appear to save money but carry hidden costs, prepayment penalties, or interest rate structures that ultimately cost more than conventional alternatives. The VA Loan Churning phenomenon — where lenders encourage veterans to repeatedly refinance their VA loans through cash-out refinances — has stripped equity from veterans while generating repeated origination fees for lenders.</p>

<p>The VA has implemented protections against serial refinancing, including net tangible benefit requirements. If a lender is pushing you toward a refinance and the savings seem unclear, get an independent review before proceeding.</p>

<h3>Ohio Veterans Service Commission Resources</h3>

<p>Every Ohio county has a Veterans Service Commission that provides free financial assistance, transportation assistance, and referrals to veterans and their families. These are county-funded, locally staffed organizations with deep knowledge of both VA benefits and local resources. The Ohio Department of Veterans Services maintains a directory of all county commissions at dvs.ohio.gov. If you are facing financial pressure that makes you vulnerable to a predatory offer, contact your county VSC first — they may be able to provide direct assistance.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Online Veteran Communities — Real vs. Infiltrated",
    page_start: 44,
    page_end: 56,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Online Veteran Communities — Real vs. Infiltrated</h2>

<p>Online communities for veterans serve real purposes: peer support, information sharing, advocacy, and maintaining the bonds of service. Facebook groups, Reddit communities, Discord servers, and veteran-specific platforms host millions of veterans and their family members. They are also infiltrated by scammers who understand that the trust norms of military communities can be weaponized.</p>

<h3>Scammers Posing as Fellow Veterans</h3>

<p>A scammer posing as a veteran in an online community has a significant social advantage. They can use military terminology, claim shared service in a particular branch or unit, and reference experiences that resonate authentically. Verifying military service in an online context is difficult — and veterans generally prefer to extend trust rather than demand proof from someone who might be a genuine brother or sister in service.</p>

<p>The "fellow veteran in need" pattern is particularly well-documented: a community member posts about a financial emergency, often a specific and verifiable-seeming situation involving VA delays, a medical bill, or a family crisis. Requests for direct cash assistance or gift cards follow. These posts sometimes involve real accounts that have been compromised, making them even harder to recognize as fraudulent.</p>

<p>Be extremely cautious about any request for direct financial assistance from someone you know only through an online community, regardless of how convincingly they present as a fellow veteran. If you want to help, direct them to official resources rather than providing personal funds.</p>

<h3>Fake Veteran Charities</h3>

<p>Fraudulent charities exploiting veteran themes are a persistent problem. They use names that sound official, employ veterans in marketing materials, and may even have real-seeming websites with donation infrastructure. Before donating to any veteran charity, verify it through Charity Navigator (charitynavigator.org) or GuideStar. Look for a GuideStar Gold or Platinum seal indicating financial transparency. The IRS Tax Exempt Organization database at apps.irs.gov confirms whether an organization actually has charitable status.</p>

<h3>Online Romance Scams Within Veteran Communities</h3>

<p>Romance scams disproportionately affect veterans, particularly those who are recently divorced, widowed, or retired and experiencing isolation. Scammers posing as military personnel — often claiming to be deployed overseas — build relationships through social media and dating apps over weeks or months before introducing financial requests. The "deployed soldier who needs money for emergency leave" narrative is among the most well-documented romance scam patterns targeting both veterans and civilians.</p>

<p>The FTC has a specific resource page for military romance scams at consumer.ftc.gov. If someone you have connected with online claims to be military and cannot meet you in person, asks for money, or asks for gift cards, treat it as a fraud attempt.</p>

<h3>Verifying Veteran Organizations Online</h3>

<p>Legitimate veteran service organizations — the Disabled American Veterans (DAV), Veterans of Foreign Wars (VFW), American Legion, and others — have verifiable national and local chapter structures. You can find official chapter listings on their national websites. Any online group claiming to be an official chapter but not appearing in the national directory should be approached with caution.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Mental Health, Isolation, and Exploitation",
    page_start: 57,
    page_end: 67,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Mental Health, Isolation, and Exploitation</h2>

<p>This chapter addresses something most fraud-prevention resources avoid: the direct connection between mental health, social isolation, and vulnerability to fraud. For veterans, these factors intersect in specific ways that are worth understanding clearly — not to stigmatize anyone, but because understanding the mechanism is the first step toward addressing it.</p>

<h3>How Isolation Creates Vulnerability</h3>

<p>Social isolation is one of the strongest predictors of fraud victimization across all age groups and populations. Isolated people are more likely to respond to unsolicited contacts, more susceptible to manufactured social bonds, and less likely to have trusted people in their lives who can provide a reality check when something seems off. Veterans face higher rates of social isolation than the general population for documented reasons: transition from the structured social environment of military service, relocation away from base communities, physical injuries limiting mobility, and the psychological distance that PTSD and other service-related mental health conditions can create.</p>

<p>Scammers who target veterans are often aware of these dynamics. They provide connection, structure, and purpose — the same things that military service provided. They take time. They listen. They call consistently. They remember details. The relationship they build meets real needs, which is precisely why it is so effective and so devastating when the fraud is revealed.</p>

<h3>PTSD and Emotional Manipulation</h3>

<p>Veterans with PTSD may experience hypervigilance, difficulty trusting, and emotional regulation challenges that can paradoxically increase vulnerability to carefully calibrated manipulation. A scammer who presents as reliable, patient, and non-threatening may be particularly effective against someone who has been conditioned to be alert to direct threats but may be less prepared for slow-building manipulation disguised as genuine care.</p>

<p>This is not a weakness of character. It is a pattern that researchers who study fraud and trauma have documented carefully. Recognizing it is not self-criticism — it is intelligence about an adversary's tactics.</p>

<h3>Crisis Resources</h3>

<p>If you are struggling with isolation, depression, PTSD, or other mental health challenges, please reach out to these resources:</p>
<ul>
  <li><strong>Veterans Crisis Line:</strong> Call 988, then press 1. Text 838255. Chat at veteranscrisisline.net.</li>
  <li><strong>VA Dayton Medical Center:</strong> 4100 W. Third St., Dayton, Ohio — (937) 268-6511</li>
  <li><strong>VA Northeast Ohio Healthcare System (Cleveland):</strong> (216) 791-3800</li>
  <li><strong>OhioMHAS Veterans Services:</strong> The Ohio Mental Health and Addiction Services maintains veteran-specific programming. mha.ohio.gov</li>
</ul>

<h3>Why Reporting Fraud Is Not Weakness</h3>

<p>The military values of self-reliance and not showing vulnerability to adversaries are assets in combat. They become a liability when they prevent reporting fraud to the people who can help. Law enforcement, victim services organizations, and veteran advocates uniformly want to hear from fraud victims. They do not judge. Reporting protects you — by creating a record that may support recovery and by connecting you with services — and it protects the next veteran by contributing to investigations that can shut down fraud operations.</p>

<p>If you have been victimized and told no one, consider starting with your county Veterans Service Commission, where staff are trained to receive exactly this kind of disclosure without judgment and to connect you with next steps.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "Ohio Veteran Resources — DAV, VFW, ODVA, VSOs",
    page_start: 68,
    page_end: 79,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Ohio Veteran Resources — DAV, VFW, ODVA, VSOs</h2>

<p>Ohio has one of the most comprehensive veteran services infrastructures in the country. This chapter maps that infrastructure so you know exactly who to call and where to go for help with fraud, benefits, legal issues, and financial concerns. Every resource listed here is free to Ohio veterans.</p>

<h3>Ohio Department of Veterans Services (ODVA)</h3>

<p>The Ohio Department of Veterans Services is the state agency responsible for advocating for Ohio veterans, coordinating state benefits, and connecting veterans with federal and local resources. Their statewide helpline is 888-DVS-OHIO (888-387-6446). Their website at dvs.ohio.gov provides benefit information, county commission directories, and news about fraud targeting Ohio veterans. ODVA accredits the county Veterans Service Commissions and sets service standards for veterans assistance across the state.</p>

<h3>County Veterans Service Commissions</h3>

<p>Ohio has 88 counties, and each has a Veterans Service Commission. These commissions are staffed by people whose job is specifically to help veterans in their county. They can provide emergency financial assistance, transportation to VA appointments, referrals to legal aid, and help navigating VA claims. To find your county's commission, visit dvs.ohio.gov or search "[your county name] Veterans Service Commission." Services are free. You do not need to prove financial need to ask for information and referrals.</p>

<h3>Disabled American Veterans (DAV) — Ohio Chapters</h3>

<p>The DAV has chapters throughout Ohio and provides free assistance with VA claims, benefit information, and transportation to VA appointments through the DAV Transportation Network. National service officers accredited by the VA can represent you in VA claims at no cost. Find Ohio chapters at dav.org or call the national DAV helpline at 1-800-827-1000.</p>

<h3>Veterans of Foreign Wars (VFW)</h3>

<p>The VFW maintains posts across Ohio that provide community, advocacy, and service officer support. VFW national service officers are VA-accredited and can assist with claims free of charge. The VFW also operates the Veterans Service Center at 1-800-VFW-1899 for phone assistance. Find your nearest Ohio VFW post at vfw.org.</p>

<h3>Legal Aid for Ohio Veterans</h3>

<p>Ohio Legal Help (ohiolegalhelp.org) is a statewide resource that helps Ohioans, including veterans, understand their legal rights and connect with legal aid organizations. Legal Aid organizations in Ohio provide free legal assistance to income-qualifying veterans for issues including benefits appeals, consumer fraud, housing, and family law. The Legal Aid Society of Southwest Ohio (lascwo.org) serves the Dayton and Cincinnati areas. The Legal Aid Society of Cleveland (lasclev.org) serves Northeast Ohio.</p>

<h3>Free Financial Counseling Through ODVA</h3>

<p>ODVA and several partnering organizations offer free financial counseling specifically for Ohio veterans. The Ohio Department of Financial Institutions also has consumer protection resources relevant to veteran financial fraud at com.ohio.gov. If you have been targeted by a predatory financial product or believe you have been defrauded, these agencies are starting points for understanding your options.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Building a Secure Post-Service Digital Life",
    page_start: 80,
    page_end: 95,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Building a Secure Post-Service Digital Life</h2>

<p>This final chapter brings everything together into a practical checklist for building digital security as a veteran. These are not aspirational recommendations — they are concrete steps, most of which take less than an hour to complete, that significantly reduce your risk of fraud, identity theft, and unauthorized access to your benefits.</p>

<h3>Protecting Your DD-214 and Military Records</h3>

<p>Your DD-214 — Certificate of Release or Discharge from Active Duty — is one of the most important documents in your life. It proves your military service, eligibility for benefits, and service history. It also contains significant personal information including your Social Security number on older forms. Protect your original DD-214 as you would protect your passport or birth certificate.</p>

<p>Store the original in a fireproof safe or safety deposit box. Keep a certified copy for routine use — the VA and most state agencies accept certified copies. If you need an additional copy, request it through the National Archives at archives.gov/veterans. Do not share your DD-214 unnecessarily online or with organizations that do not have a legitimate need for it.</p>

<h3>VA.gov Account Security</h3>

<p>Your VA.gov account is the gateway to your benefit information, healthcare appointments, and secure messaging with your care team. Secure it with a strong, unique password and two-factor authentication using an authenticator app rather than SMS. The VA offers Login.gov and ID.me as verified identity options for account access — either is more secure than a basic username and password.</p>

<h3>Identity Protection Given Military Records</h3>

<p>Military service records contain extensive personal information. Breaches of military databases — including the well-documented 2015 Office of Personnel Management breach that affected millions of military and government personnel records — have put sensitive information in the hands of adversarial actors. If your information was affected by a known breach, you may be eligible for credit monitoring services. Consider placing a credit freeze with all three major bureaus (Equifax, Experian, TransUnion) — it is free, reversible, and prevents anyone from opening new credit in your name.</p>

<h3>Secure Email for VA Communication</h3>

<p>Use a dedicated email address for all VA and government-related communications. Keep this address separate from your social media accounts and everyday personal email. This limits the ability of data brokers and scammers to connect your government contact information to your online presence.</p>

<h3>Setting Up a Trusted Contact</h3>

<p>A trusted contact is a person you authorize your financial institutions to contact if they have concerns about your account but cannot reach you. Most banks and investment accounts now allow you to designate a trusted contact. This person cannot make transactions on your behalf — they can only receive a notification if the institution has concerns about potential fraud or your wellbeing. This is a simple, powerful protection that takes about five minutes to set up and could prevent a significant loss.</p>

<h3>The Veteran's Digital Security Checklist</h3>

<ol>
  <li>Store DD-214 and military records in a secure, fireproof location.</li>
  <li>Enable two-factor authentication (authenticator app) on VA.gov.</li>
  <li>Create a free account at annualcreditreport.com and check your credit report annually.</li>
  <li>Place a credit freeze at Equifax, Experian, and TransUnion.</li>
  <li>Use a password manager to create unique, strong passwords for every account.</li>
  <li>Designate a trusted contact on your financial accounts.</li>
  <li>Bookmark VA.gov, dvs.ohio.gov, and your county Veterans Service Commission website.</li>
  <li>Save the Veterans Crisis Line in your phone: 988, press 1.</li>
  <li>Know how to report fraud: IC3.gov, reportfraud.ftc.gov, Ohio AG at ohioattorneygeneral.gov.</li>
  <li>Talk to one trusted person in your life about your financial accounts and how to reach them in an emergency.</li>
</ol>

<p>You have handled more difficult things than this. The same discipline that carried you through service can secure your digital life. The difference is that now you know who the adversaries are and how they operate.</p>
</article>`,
  },
];
