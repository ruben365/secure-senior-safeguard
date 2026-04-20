import type { BookChapter } from "@/config/bookCatalog";

/**
 * Real Estate Transaction Security in Ohio
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 10 chapters (0–9), ~120 pages, homebuyers/agents/investors audience, practical tone
 */
export const REAL_ESTATE_SECURITY_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Real Estate Transaction Security in Ohio</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">Protecting Your Home Purchase from Wire Fraud, Rental Scams, and Closing Day Threats</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio &middot; 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright &copy; 2026 InVision Network. All rights reserved.</p><p>InVision Network Press &middot; Kettering, Ohio 45440</p><p><em>For educational purposes only. Consult a licensed attorney for legal advice specific to your situation.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — Ohio's Wire Fraud Epidemic in Real Estate",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — Ohio's Wire Fraud Epidemic in Real Estate</h2>

<p>On a Tuesday morning in March, a couple in Columbus sat in the driveway of the house they were about to own. They had spent eight months searching, two months negotiating, and the past week packing. The wire transfer had gone out the previous afternoon — $287,000, their entire down payment plus closing costs, sent precisely as the instructions in the email had directed. The keys were supposed to be waiting at the title company's office. Instead, they found a confused agent who had never sent those wiring instructions. The email had come from a criminal who had been silently reading their inbox for eleven weeks.</p>

<p>By the time they realized what had happened, the money had passed through three bank accounts in two countries. It was gone. Not temporarily misplaced, not delayed in processing — gone. The house closed without them. They lost their earnest money, their savings, and several months of their lives to lawsuits that ultimately recovered nothing.</p>

<p>This story is not unusual. According to the FBI's Internet Crime Complaint Center, real estate wire fraud cost American buyers, sellers, and agents more than $446 million in 2022 alone. That number represents only the reported losses — financial crimes experts estimate that between 50 and 85 percent of wire fraud victims never report to federal authorities. The real number is likely well above a billion dollars every year. Ohio consistently ranks in the top ten states for reported real estate fraud losses. The Columbus, Cleveland, and Cincinnati metro areas each see dozens of confirmed cases annually.</p>

<h3>Who Gets Targeted</h3>

<p>The popular image of a fraud victim is someone naive or careless — an elderly person who should have known better, or a first-time buyer who failed to do basic research. That image is wrong, and it is dangerous because it creates false confidence in people who consider themselves sophisticated. Real estate wire fraud victims include real estate attorneys. They include experienced investors who have closed dozens of transactions. They include title company employees who were tricked by emails spoofing their own colleagues. The attack works not because victims are foolish, but because the attack is designed by professionals who study human psychology and real estate processes in detail.</p>

<p>That said, certain groups face elevated risk. First-time homebuyers are particularly vulnerable because every step of a real estate transaction is new to them. They have no baseline sense of what legitimate wiring instructions look like, how title companies communicate, or what an unusual request should feel like. They are also under enormous emotional pressure — buying a first home is stressful, exciting, and time-compressed, all of which impair judgment.</p>

<p>Seniors who are downsizing represent a second high-risk group in Ohio. The state has a large and growing retirement population, and many older homeowners are selling paid-off properties and buying smaller ones — transactions that often involve substantial cash positions. A retiree selling a $350,000 paid-off home and buying a $180,000 condo may find themselves directing a wire transfer of $170,000 in cash. That is a life-changing sum, and criminals know it.</p>

<p>Residential investors — people buying rental properties, flipping houses, or building small portfolios — represent a third category. Investors often move quickly, communicate heavily by email, and work with multiple title companies, agents, and lenders simultaneously. Speed and high email volume are exactly the conditions that wire fraud criminals exploit.</p>

<h3>The Speed of Catastrophe</h3>

<p>What distinguishes real estate wire fraud from most other financial crimes is the speed with which funds become unrecoverable. When you wire money to a fraudulent account, the criminal's automated systems begin moving it immediately — often within minutes. It passes through one account, then another, then a cryptocurrency exchange or a foreign bank. Within two to four hours of a successful fraud, the money is typically beyond practical recovery.</p>

<p>This timeline is not accidental. It is engineered. The criminals who run these schemes understand banking recovery procedures, and they structure their operations specifically to outrun them. The FBI and bank fraud departments can sometimes recover funds that haven't yet been withdrawn or forwarded, but the window is measured in hours, and it requires immediate action from the victim.</p>

<p>Compare this to credit card fraud, where charges can be disputed for 60 to 120 days, or check fraud, where a stop payment can sometimes be effective even days later. Wire fraud has no equivalent protection mechanism. When it's gone, it's almost certainly gone.</p>

<h3>The Emotional Devastation</h3>

<p>The financial loss is the part that makes news headlines. The emotional aftermath is harder to quantify but often more lasting. Couples who lose their home purchase savings frequently experience what psychologists describe as complex grief — the simultaneous loss of money, of a home, of a future they had planned, and of their sense of safety in a world they thought they understood. Many report symptoms similar to post-traumatic stress: hypervigilance about financial communications, difficulty trusting professional service providers, and recurring intrusive thoughts about the moment they realized what had happened.</p>

<p>There is also the secondary wound of self-blame. Most victims eventually understand that the attack succeeded because it was sophisticated, not because they were careless. But reaching that understanding takes time, and in the interim, many carry crushing guilt about decisions they made that seemed completely reasonable at the time.</p>

<h3>What This Book Provides</h3>

<p>This book walks you through every phase of an Ohio real estate transaction from a security perspective. We cover how wire fraud attacks are constructed, what verification steps you should take at each stage of a purchase, how to confirm the legitimacy of every professional involved in your transaction, and what to do in the critical hours if something goes wrong.</p>

<p>We also cover adjacent threats that Ohio buyers and renters face: fake rental listings, mortgage fraud, deed theft, and the post-closing scams that target new homeowners. Ohio law provides specific protections and reporting channels that most buyers are never told about. This book tells you what they are and how to use them.</p>

<p>The goal is not to make you afraid of buying a home. Millions of Ohio residents complete real estate transactions safely every year. The goal is to make you the kind of buyer who knows exactly what to look for, who to call when something feels wrong, and how to verify every instruction before money moves. That knowledge costs you very little time and could save you everything.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "How Real Estate Wire Fraud Works",
    page_start: 17,
    page_end: 28,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: How Real Estate Wire Fraud Works</h2>

<p>Understanding the mechanics of real estate wire fraud is not a morbid exercise. It is the single most effective thing you can do to protect yourself. When you understand exactly how the attack is constructed, you stop seeing legitimate communications as automatically trustworthy and start applying the right amount of healthy skepticism at the right moments. The criminals count on you not knowing how they operate. This chapter takes that advantage away from them.</p>

<h3>The Long Patience: Email Monitoring</h3>

<p>Real estate wire fraud does not begin the day before closing. It begins weeks or months before, when a criminal gains access to the email account of someone in your transaction chain — most commonly a real estate agent, a title company employee, or an attorney. The attacker does not announce themselves. They do not steal anything visible. They read.</p>

<p>For weeks, sometimes months, the attacker silently monitors the email account. They learn the names of everyone involved in each transaction. They learn the timeline: when inspections are scheduled, when the appraisal is expected, when closing is set. They learn the communication style of the person whose account they control — how formal their emails are, what greeting they use, whether they tend to include legal disclaimers. They learn the dollar amounts. And they wait for the right moment.</p>

<p>The right moment is always close to closing, when time pressure is highest and everyone is focused on getting to the finish line. A buyer who has been planning for this day for eight months, who has already given notice to their landlord, who has movers scheduled for the weekend — that buyer is not going to pump the brakes when they receive an email about wiring instructions. That is exactly what the attacker is counting on.</p>

<h3>The Fake Wiring Instructions</h3>

<p>One to three days before closing, the attacker sends an email that appears to come from the title company, the closing attorney, or your real estate agent. The email announces that wiring instructions have been updated — perhaps the title company changed banks, or there was a security concern with the previous account, or the instructions are being re-sent for confirmation. The email looks authentic. It uses the same email signature as previous communications. It includes the correct transaction details. The grammar is professional. The email address looks right — often differing from the genuine address by only a single character, or using a spoofed display name that hides the actual sending address.</p>

<p>The wiring instructions themselves look exactly like legitimate wiring instructions. They include a bank name, a routing number, and an account number. Some fraudulent sets of instructions even include the real title company's address and phone number — though that phone number will connect you to the attacker, not the real title company.</p>

<p>The Columbus couple we described in the introduction received wiring instructions that were pixel-perfect copies of their title company's format, with all correct transaction details — except for the account number, which belonged to a criminal. Everything else matched. The letterhead, the reference number, the agent's name, the property address. Only the account number was wrong, and they had no way to detect that without making an independent verification call.</p>

<h3>Why Title Company Emails Are Specifically Targeted</h3>

<p>Title companies are the most common target for email compromise in real estate transactions, and the reason is structural. Title companies sit at the center of the transaction web — they communicate with buyers, sellers, agents, lenders, attorneys, and surveyors. An attacker who gains access to a title company's email system can monitor dozens or hundreds of transactions simultaneously. The ratio of effort to potential reward is extraordinarily favorable for the criminal.</p>

<p>Title company employees also handle the final disbursement of funds, which means their emails have inherent authority when it comes to wiring instructions. A buyer who receives an email appearing to come from their lender's mortgage servicer about wiring instructions might be skeptical. A buyer who receives the same email appearing to come from the title company closing their transaction feels no such skepticism — of course the title company would be sending wiring instructions.</p>

<p>Ohio has seen several cases where a single compromised title company email account was used to defraud multiple buyers in simultaneous transactions. In one reported case in the Cleveland area, a title company employee's email account was accessed for six weeks before detection. During that period, five separate buyers wired a combined $1.1 million to fraudulent accounts before any single victim's complaint triggered an investigation.</p>

<h3>The Day-Before Call</h3>

<p>Some attackers add a layer of social engineering: a phone call the day before closing, appearing to come from the title company or closing attorney, that verbally confirms the wiring instructions and mentions that a follow-up email with the official instructions will be arriving shortly. This phone call accomplishes several things. It establishes legitimacy in the buyer's mind before the fraudulent email arrives. It gets the buyer to verbally acknowledge the account number. And it provides the criminal with information about the buyer's schedule and any concerns they might have.</p>

<p>The phone number used in this call may appear legitimate because criminals can spoof caller ID — making a call appear to come from a number that actually belongs to the title company. If you receive a call like this, be aware that caller ID alone cannot verify identity. The only safe response is to hang up and call the title company back on a number you obtained independently — from their website, from a previous verified communication, or from the number listed in your contract documents.</p>

<h3>The Difference Between a Mistake and Fraud</h3>

<p>It is worth clarifying a distinction that matters for legal purposes: the difference between wiring money to the wrong account by mistake and being defrauded. If a buyer simply types an account number incorrectly, that is a wire error, and the bank may be able to initiate a recall. If a buyer wires money to a fraudulent account because they were deceived by a criminal, that is wire fraud — a federal crime — and the legal and recovery landscape is entirely different.</p>

<p>This distinction matters because it affects what you should do immediately after discovering the problem. Wire errors: call your bank immediately and request a recall. Wire fraud: call your bank, call the FBI (ic3.gov), call the Ohio Attorney General's consumer protection line, and — if you sent money in the last 24 hours — call the Financial Crimes Enforcement Network's emergency line. Every minute matters, and the channels you use will be different depending on what actually happened.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Verifying Your Title Company, Agent, and Attorney in Ohio",
    page_start: 29,
    page_end: 40,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Verifying Your Title Company, Agent, and Attorney in Ohio</h2>

<p>The most effective defense against real estate wire fraud is independent verification of everyone involved in your transaction before money moves. Ohio provides specific tools and databases for this purpose that most buyers are never told about. This chapter tells you exactly what to check, where to check it, and how to establish a secure communication protocol with your transaction team from day one.</p>

<h3>Verifying Your Title Company</h3>

<p>Title companies in Ohio must be licensed by the Ohio Department of Insurance. Before you allow a title company to handle your transaction, verify their license at the ODI's online license lookup: insurance.ohio.gov. Search for the company by name. Confirm that the license is active and that the address matches what you were given. An unlicensed operation or a company operating from a different address than their license shows is a serious warning sign.</p>

<p>Beyond the license check, look up the title company's physical office on Google Maps and confirm it is a real, operating business. Search for reviews on multiple platforms. Call the main phone number listed on the ODI website — not the number in any email you received — and ask to speak with the escrow officer handling your file. If they cannot locate your file or confirm the details of your transaction, stop and investigate before proceeding.</p>

<p>Ohio title companies are also members of professional associations, most notably the Ohio Land Title Association (OLTA). Membership in OLTA indicates a company that operates within industry standards and participates in continuing education and compliance requirements. You can check membership at ohiolta.org.</p>

<h3>Verifying Your Real Estate Attorney</h3>

<p>If your transaction involves a real estate attorney — which is required for some transaction types and common for complex purchases — verify their license through the Ohio State Bar Association's attorney lookup: ohiobar.org/for-the-public/find-a-lawyer. Every licensed Ohio attorney has a profile that shows their bar number, admission date, current standing, and any public disciplinary actions.</p>

<p>Confirm that the attorney is in good standing — not suspended, not under suspension, not showing disciplinary actions related to client funds. A real estate attorney who handles escrow has access to client money, and disciplinary history involving financial matters is a disqualifying red flag.</p>

<h3>Verifying Your Real Estate Agent</h3>

<p>Ohio real estate agents must be licensed through the Ohio Division of Real Estate and Professional Licensing (ODRE), which is part of the Ohio Department of Commerce. You can search agent licenses at com.ohio.gov. Search by name or license number. Confirm the license is active and note the sponsoring brokerage — the licensed real estate company the agent works under.</p>

<p>If the agent is a member of the National Association of Realtors and uses the "Realtor" designation, you can also verify that membership through nar.realtor. Realtor members are bound by a code of ethics and have access to dispute resolution processes that non-member licensees do not.</p>

<h3>The Direct-Dial Verification Rule</h3>

<p>Ohio real estate professionals who handle closings will tell you the same thing: never use the phone number or email address provided in any email to verify wiring instructions. This seems obvious when stated directly, but it is violated constantly — usually because the fraudulent email arrives when the buyer is busy, stressed, and trusting of people they have been working with for months.</p>

<p>The direct-dial verification rule works like this: before you wire any money, call the person who sent the wiring instructions using a phone number you obtained from a source that has nothing to do with that email. That means the number on their company's official website, the number in your signed contract documents, or a number you wrote down from a previous face-to-face meeting. Confirm the account number, the routing number, and the exact dollar amount. Ask for the name of the account holder at the receiving bank. Get the first and last name of the person you spoke with. Write it all down.</p>

<p>If you receive any resistance to this verification call — if someone tells you there is no time, that this is standard procedure and you should just send the wire, that you are being difficult — stop. Legitimate title companies and closing attorneys welcome verification calls. They have dealt with wire fraud attempts before. They understand why buyers want to confirm. Resistance to verification is itself a warning sign.</p>

<h3>The Call-Back Protocol for Any Change</h3>

<p>Establish the call-back protocol with your title company at the very start of the transaction: if wiring instructions ever change for any reason — account change, bank change, corrected numbers — you will hang up, call back using the verified number, and confirm the change before acting on it. Put this in writing in an early email to your title company. Most reputable Ohio title companies will respond by confirming that this is exactly the right approach and that they would never ask you to skip this step.</p>

<p>This protocol is important precisely because it needs to be established before you are under the time pressure of closing day. An instruction change three days before closing, combined with a tight timeline and an eager buyer, is the exact scenario criminals engineer. Having a standing protocol gives you something to fall back on automatically, without having to make a judgment call in the heat of the moment.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Secure Communication Throughout the Transaction",
    page_start: 41,
    page_end: 50,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Secure Communication Throughout the Transaction</h2>

<p>Real estate transactions generate an enormous volume of email — inspection reports, addenda, disclosure forms, loan documents, title commitments, and eventually wiring instructions. All of this sensitive information flowing through standard email creates multiple attack surfaces. This chapter covers what should never travel by email, what alternatives exist, and how to establish secure habits from the first day of your transaction.</p>

<h3>Why Email Is Vulnerable</h3>

<p>Standard email — whether you use Gmail, Outlook, Yahoo, or a corporate account — was designed for convenience, not security. Messages are stored in multiple places, transmitted across multiple servers, and retained in both sender and recipient inboxes indefinitely. When a criminal gains access to a real estate agent's email account, they can read months of historical correspondence, download attachments, and set up forwarding rules that send copies of future emails to themselves. All of this happens silently, without visible signs of intrusion.</p>

<p>Email accounts are compromised through phishing attacks targeting real estate professionals — a convincing fake login page captures an agent's credentials. They are also compromised through credential stuffing attacks that use username-and-password combinations leaked from unrelated data breaches. An agent who used the same password on a fitness app that was breached may find that password gives attackers access to their real estate email years later.</p>

<h3>Information That Must Never Travel by Standard Email</h3>

<ul>
  <li><strong>Bank account numbers and routing numbers</strong> — any wiring instructions should be confirmed by phone, not sent by email</li>
  <li><strong>Social Security Numbers</strong> — for loan applications, use the lender's secure portal, not email</li>
  <li><strong>Wire transfer confirmations</strong> — never email a screenshot of a completed wire</li>
  <li><strong>Copies of government-issued ID</strong> — if required, use the title company's encrypted upload system</li>
  <li><strong>Passwords or account credentials</strong> — never, under any circumstances</li>
</ul>

<h3>Secure Alternatives for Sensitive Documents</h3>

<p>Most Ohio title companies and lenders now offer secure document portals specifically for this reason. Ask at the start of your transaction whether your title company has an encrypted document portal and commit to using it for any documents containing personal financial information. Similarly, your mortgage lender almost certainly has a secure online application system — use it rather than emailing loan documents as attachments.</p>

<p>For communications that genuinely need to be secure and confirmed, consider encrypted messaging apps like Signal for discussions with your agent about offer strategy or personal financial situations. Signal provides end-to-end encryption that standard email does not. This is not necessary for routine scheduling communications, but it provides meaningful protection for sensitive discussions.</p>

<h3>Establishing a Secure Channel Early</h3>

<p>At the very first meeting with your title company and agent, agree on a communication protocol in writing. Ask how they will send wiring instructions — ideally, the answer is that instructions will be delivered in person or confirmed by a verified phone call, not emailed without backup verification. Ask what secure portal they use for document exchange. Ask how they verify the identity of people requesting changes to closing information.</p>

<p>Title companies that have strong security practices will be glad you asked these questions. Those that seem puzzled or dismissive warrant further investigation before you proceed with them handling your closing funds.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Closing Day Security Protocols",
    page_start: 51,
    page_end: 60,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Closing Day Security Protocols</h2>

<p>Closing day is the moment of highest financial risk in any real estate transaction. It is also, unfortunately, the moment when buyers are most distracted by excitement, paperwork, and time pressure. This chapter gives you a step-by-step security checklist for closing day that takes less than an hour to execute and could save you everything.</p>

<h3>The Day Before Closing</h3>

<p>Call your title company using the verified phone number — not a number from any email received in the past week — and verbally confirm the wiring instructions one final time. Confirm the exact dollar amount. Confirm the receiving bank name. Confirm the account number and routing number digit by digit. Ask for the name of the representative who confirmed this information and write it down with the date and time of the call.</p>

<p>Print this verified information and bring the paper copy to closing. Keep it separate from any emails. If the wiring instructions you receive verbally on this call differ in any way from instructions received by email, stop and investigate immediately — do not send the wire until you have spoken with a senior official at the title company on the verified number and received a written explanation.</p>

<h3>The $0 Test Wire</h3>

<p>Many financial institutions now support a $0 or small-dollar verification wire. Ask your bank whether they offer this service. The concept is simple: before sending your full wire, you send a $0.01 or $1.00 test wire to the receiving account and request confirmation from the title company that they received it. This adds a few hours to the process but provides definitive confirmation that the account is real and controlled by who you expect.</p>

<p>Not all title companies are set up for this, and not all closing timelines accommodate it, but it is worth asking about early in the transaction planning process. A title company that actively resists test wires — as opposed to simply not having the process established — is exhibiting a warning sign.</p>

<h3>What Legitimate Title Companies Always Do</h3>

<ul>
  <li>Welcome verification calls at any point in the transaction</li>
  <li>Provide wiring instructions in multiple formats (secure portal and verbal confirmation)</li>
  <li>Never express urgency that overrides your security verification steps</li>
  <li>Have a named escrow officer who can confirm your transaction details</li>
  <li>Provide a written confirmation of wire receipt promptly after funds arrive</li>
</ul>

<h3>What Legitimate Title Companies Never Do</h3>

<ul>
  <li>Ask you to wire money before the scheduled closing date without explanation</li>
  <li>Request payment to a personal bank account rather than a business account</li>
  <li>Discourage you from verifying instructions by phone</li>
  <li>Change wiring instructions at the last minute without a thorough explanation confirmed through independent channels</li>
  <li>Contact you from a personal email address rather than their company domain</li>
</ul>

<h3>If You Wire to the Wrong Account: The First 72 Hours</h3>

<p>If you discover you have wired money to a fraudulent account, every minute matters. Call your bank immediately and ask to speak with the fraud department — not general customer service. Tell them you believe you are a victim of wire fraud and need an emergency wire recall. Simultaneously, call 1-800-CALL-FBI or file at ic3.gov. Contact the Ohio Attorney General's office at 1-800-282-0515. File a report with your local police department, which creates a record needed for insurance and legal proceedings. The combination of bank recall attempts and law enforcement notification gives you the best possible chance of recovery in an otherwise nearly unrecoverable situation.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "Rental Fraud — Fake Listings and Landlord Scams in Ohio",
    page_start: 61,
    page_end: 70,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Rental Fraud — Fake Listings and Landlord Scams in Ohio</h2>

<p>Real estate fraud is not limited to purchase transactions. Ohio renters face a thriving ecosystem of scams built around fake listings, fraudulent landlords, and advance fee traps. Columbus, Cleveland, and Cincinnati consistently rank among the cities with the highest rates of rental fraud complaints, driven in part by tight housing markets where renters act quickly out of fear of losing a desirable unit.</p>

<h3>How Fake Listings Are Created</h3>

<p>The mechanics of a fake rental listing are straightforward. A criminal finds a real rental property — usually one that is legitimately for sale or recently sold — and copies the photographs, address, and description from Zillow, Realtor.com, or a real estate agent's website. They re-post this listing on Zillow Rental Manager, Facebook Marketplace, Craigslist, or Apartments.com at a price that is noticeably below market — attractive enough to generate immediate interest, not so low as to trigger instant skepticism.</p>

<p>When prospective renters respond, the scammer explains that they are out of the country for work or a family emergency — the overseas landlord is a near-universal feature of these scams — and cannot show the property in person. They will "mail the key" or make "digital access arrangements" once the first month's rent and security deposit are wired or sent by Zelle. There is no landlord, no property for rent, and no key. There is only the criminal's account waiting for the transfer.</p>

<h3>Verifying Property Ownership in Ohio</h3>

<p>Ohio makes property ownership records publicly accessible through each county's auditor office. Before paying any deposit on a rental, go to the auditor's website for the county where the property is located and search by address. You will find the name of the current property owner, the property's tax mailing address, and often recent sales history. Compare the owner's name to the name of the person communicating with you about the rental. If they don't match, ask for an explanation before proceeding. Most Ohio county auditor sites are free and publicly accessible:</p>

<ul>
  <li><strong>Franklin County (Columbus):</strong> franklincountyauditor.com</li>
  <li><strong>Cuyahoga County (Cleveland):</strong> cuyahogacounty.gov/fiscal</li>
  <li><strong>Hamilton County (Cincinnati):</strong> hamiltoncountyauditor.org</li>
  <li><strong>Montgomery County (Dayton):</strong> mcauditor.org</li>
  <li><strong>Summit County (Akron):</strong> summitoh.net/auditor</li>
</ul>

<h3>Reporting Rental Fraud in Ohio</h3>

<p>Ohio rental fraud can be reported to the Ohio Attorney General's Consumer Protection Section at ohioattorneygeneral.gov or by calling 1-800-282-0515. File a complaint with the FTC at reportfraud.ftc.gov. If you sent money by wire, file an IC3 complaint at ic3.gov. If payment was made through a payment app like Zelle or Venmo, contact that platform's fraud department immediately and file reports with both the FTC and your state AG.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Mortgage and Refinancing Fraud",
    page_start: 71,
    page_end: 80,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Mortgage and Refinancing Fraud</h2>

<p>Mortgage fraud encompasses a range of schemes that target Ohio homebuyers and homeowners at different stages of the property journey. Some schemes target buyers during the purchase process. Others target existing homeowners — particularly seniors with significant equity — through fake refinancing offers and equity theft. Understanding the landscape protects you whether you are buying your first home or have owned your home for decades.</p>

<h3>Loan Origination Fraud</h3>

<p>Loan origination fraud involves misrepresentation in a mortgage application — either by the borrower (inflated income, undisclosed debts) or by predatory lenders who pressure applicants to misstate information to qualify for loans they cannot actually afford. Ohio has historically seen elevated rates of this type of fraud in urban markets experiencing rapid price appreciation, where buyers and brokers face pressure to make deals work at any cost.</p>

<p>If a mortgage broker or loan officer ever suggests that you "estimate" your income higher than it actually is, or that certain assets "don't need to be disclosed," stop working with them immediately. You can report predatory mortgage origination practices to the CFPB at consumerfinance.gov/complaint or by calling 1-855-411-CFPB (2372).</p>

<h3>The Fake Refinancing Offer</h3>

<p>Refinancing fraud frequently targets Ohio homeowners who have significant equity — often seniors who have owned their homes for many years. A fraudulent refinancing offer arrives by mail, phone, or email promising dramatically lower rates than the current market. When the homeowner expresses interest, the "lender" requests financial documents including bank statements, tax returns, and sometimes their current mortgage information. This is an information-harvesting scheme. No refinancing occurs. The criminal now has detailed financial information to use in identity theft or to sell to other fraudsters.</p>

<p>Before providing any financial documents to a lender, verify their license through the Nationwide Multistate Licensing System (NMLS) Consumer Access at nmlsconsumeraccess.org. This free database contains licensing information for every legitimate mortgage company and loan officer operating in Ohio. If the company or individual is not in the NMLS database, do not proceed.</p>

<h3>Predatory Lending in Ohio</h3>

<p>Ohio has strong predatory lending protections under the Ohio Mortgage Broker Act and the Ohio Consumer Sales Practices Act. Practices that are specifically prohibited include excessive fees, prepayment penalties on short-term loans, loan flipping (repeated refinancing that generates fees without benefit to the borrower), and financing of credit insurance without the borrower's clear consent. If you believe you have been subject to predatory lending practices, contact the Ohio Department of Commerce's Division of Financial Institutions at com.ohio.gov or call 1-614-728-8400.</p>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "Ohio Real Estate Law and Fraud Reporting",
    page_start: 81,
    page_end: 93,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Ohio Real Estate Law and Fraud Reporting</h2>

<p>Ohio provides a comprehensive legal framework for protecting real estate buyers and homeowners, along with multiple reporting channels for different types of fraud. Knowing where to report is as important as knowing how to protect yourself in the first place — because prompt reporting can trigger investigations that protect other buyers, and because a formal report creates the paper trail necessary for civil litigation and insurance claims.</p>

<h3>Ohio Revised Code Provisions on Real Estate Fraud</h3>

<p>Real estate fraud in Ohio is addressed primarily through Ohio Revised Code Chapter 1335 (Statute of Frauds, requiring real estate contracts in writing), ORC 4735 (Real Estate Brokers), and ORC 2913 (Theft and Fraud). Wire fraud in connection with real estate transactions is also prosecuted under federal statutes, specifically 18 U.S.C. § 1343, which provides for up to 20 years imprisonment per count. State and federal charges are not mutually exclusive — a single scheme can result in both.</p>

<h3>Ohio Real Estate Commission (OREC)</h3>

<p>Complaints against licensed Ohio real estate agents and brokers go to the Ohio Real Estate Commission. OREC has authority to suspend or revoke licenses, impose fines, and refer matters to the Ohio Attorney General for criminal prosecution. File complaints at com.ohio.gov/divisions/real-estate. OREC does not handle wire fraud against buyers directly — that goes to law enforcement — but complaints about agent misconduct, failure to disclose material facts, and ethical violations are processed through OREC.</p>

<h3>Ohio Attorney General</h3>

<p>The Ohio AG's Consumer Protection Section at ohioattorneygeneral.gov is the primary state-level resource for real estate fraud complaints. The AG has authority over unfair or deceptive business practices, can pursue injunctive relief, and works with federal partners on large-scale fraud operations. The AG also operates the Ohio Home Foreclosure Assistance Hotline at 1-888-995-HOPE (4673) for homeowners facing foreclosure, including those who believe they are victims of foreclosure rescue scams.</p>

<h3>Federal Reporting Channels</h3>

<ul>
  <li><strong>FBI Internet Crime Complaint Center (IC3):</strong> ic3.gov — primary channel for wire fraud complaints</li>
  <li><strong>FTC:</strong> reportfraud.ftc.gov — consumer fraud complaints, also triggers FTC database entries</li>
  <li><strong>HUD Office of Inspector General:</strong> hudoig.gov — mortgage fraud and FHA-related fraud</li>
  <li><strong>FinCEN:</strong> fincen.gov — financial institution reporting for suspicious transactions</li>
</ul>

<h3>Legal Aid Resources for Ohio Homebuyers</h3>

<p>If you cannot afford private legal representation and need help related to real estate fraud, several Ohio legal aid organizations provide free or low-cost assistance:</p>

<ul>
  <li><strong>Ohio Legal Help:</strong> ohiolegalhelp.org — statewide online resource with local referrals</li>
  <li><strong>Legal Aid Society of Columbus:</strong> columbuslegalaid.org, 614-224-8374</li>
  <li><strong>Legal Aid Society of Cleveland:</strong> lasclev.org, 216-687-1900</li>
  <li><strong>Legal Aid of Western Ohio:</strong> lawolaw.org, 1-888-534-1432 (serves Dayton and Toledo areas)</li>
  <li><strong>Community Legal Aid (Akron/Canton):</strong> communitylegalaid.org, 330-535-4191</li>
</ul>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "After Closing — Long-Term Security for Ohio Homeowners",
    page_start: 94,
    page_end: 120,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: After Closing — Long-Term Security for Ohio Homeowners</h2>

<p>Closing day is not the end of your vulnerability as a property owner. Ohio homeowners face a distinct set of ongoing threats that begin the moment their deed is recorded. Some of these threats are sophisticated; others are simple opportunistic scams that target new homeowners who are distracted, spending money, and not yet established in their routine. This chapter covers what to watch for after you move in.</p>

<h3>Deed Theft and How to Monitor</h3>

<p>Deed theft — the fraudulent transfer of property ownership without the real owner's knowledge — is a growing problem in Ohio urban markets. The mechanics are straightforward: a criminal obtains a homeowner's personal information, forges a deed transferring the property to themselves or a shell company, and records it with the county. The real owner often does not discover the theft until they try to refinance, sell, or receive a property tax notice at the wrong address.</p>

<p>Most Ohio counties now offer deed recording notification services that alert you by email or text when a document is recorded against your property. Enrollment is typically free:</p>

<ul>
  <li><strong>Franklin County:</strong> recorder.franklincountyohio.gov — Property Fraud Alert</li>
  <li><strong>Cuyahoga County:</strong> cuyahogacounty.gov/fiscal — Deed Fraud Alert</li>
  <li><strong>Hamilton County:</strong> hamiltoncountyrecorder.com — Alert service available</li>
  <li><strong>Montgomery County:</strong> mcrecorder.org — Property Watch program</li>
</ul>

<p>Enroll in your county's alert service within the first week of owning your home. If your county does not yet offer this service, check quarterly at the county recorder's website to confirm your name is still listed as the owner.</p>

<h3>Title Insurance After Closing</h3>

<p>The owner's title insurance policy you purchased at closing continues to protect you against title defects that existed at the time of purchase but were not discovered until later — including deed fraud that predated your purchase, undisclosed liens, and easement disputes. Keep your title insurance policy documents in a secure location and know the name of your title insurer. If you discover a title problem after closing, contact your title insurer before taking any other action.</p>

<h3>The Fake Contractor Solicitation</h3>

<p>New homeowners are deluged with mail and door-to-door solicitations in the weeks after closing. Ohio property records are public, which means anyone can search for recent sales and target new owners. Legitimate businesses advertise in this window. Fraudulent contractors also work it aggressively — offering suspiciously low prices for roofing, HVAC, or foundation work, collecting large deposits, and disappearing before completing any work.</p>

<p>Before hiring any contractor for significant work, verify their license with the Ohio Construction Industry Licensing Board at com.ohio.gov/cilb, get at least three written estimates, and never pay more than 10 percent or $1,000 (whichever is less) as a deposit on home improvement work under Ohio law. The Ohio AG's office actively prosecutes contractor fraud and maintains a consumer complaint database that you can search before hiring.</p>

<h3>Home Equity Scams</h3>

<p>As you build equity in your Ohio home, you become a target for home equity scams. These range from fake refinancing offers (covered in Chapter 7) to equity-stripping schemes that trick homeowners into signing documents they don't fully understand — sometimes resulting in losing their home. If anyone contacts you unsolicited about your home's equity, treat it as a potential scam until thoroughly verified. The Ohio AG's Homeowner Assistance line at 1-888-995-HOPE can help you evaluate any equity-related offer.</p>

<h3>The Continuing Threat: Fake "Missed Closing Documents"</h3>

<p>A persistent post-closing phishing scheme targets new Ohio homeowners with emails claiming that a document from your recent closing requires your immediate attention or signature — often with a link to what appears to be a DocuSign or title company portal. These emails are designed to harvest login credentials or personal information. Legitimate closing documents do not arrive unsolicited after the closing is complete. If you receive such an email, call your title company directly on the verified number to ask whether anything is outstanding before clicking any link or providing any information.</p>

<p>Homeownership in Ohio is a significant achievement that most people work toward for years. Protecting that investment requires only a modest amount of ongoing attention — monitoring your deed records, maintaining your title insurance documents, and applying healthy skepticism to unsolicited communications about your property. The criminals who target homeowners count on complacency. Your awareness is the most powerful defense you have.</p>
</article>`,
  },
];
