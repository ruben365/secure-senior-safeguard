import type { BookChapter } from "@/config/bookCatalog";

/** Protecting Your Retirement Savings from Fraud — InVision Network Press 2026 */
export const RETIREMENT_FRAUD_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter">
<div style="text-align:center; padding: 3em 0;">
  <p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p>
  <h1 style="font-size:2.2em; margin: 0.5em 0;">Protecting Your Retirement Savings from Fraud</h1>
  <p style="font-size:1.2em; color:#555; margin-bottom:2em;">A Practical Guide for Pre-Retirees and Retirees Who Want to Keep What They've Earned</p>
  <p>By the InVision Network Education Team</p>
  <p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p>
</div>

<hr style="margin: 3em 0;" />

<div style="font-size:0.85em; color:#555; line-height:1.9;">
  <p>Copyright © 2026 InVision Network. All rights reserved.</p>
  <p>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.</p>
  <p>ISBN: 978-0-000000-04-8 (Digital Edition)</p>
  <p>Published by InVision Network Press<br/>Kettering, Ohio 45440<br/>www.invisionnetwork.org</p>
  <p>First digital edition, 2026.</p>
  <p><em>This content is for educational purposes only and does not constitute investment, legal, or financial advice. Always consult a licensed, registered financial professional before making investment decisions. To verify a financial advisor's credentials, visit FINRA BrokerCheck at brokercheck.finra.org or call the Ohio Division of Securities at (800) 788-1194.</em></p>
</div>
</article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction: Your Savings Are Their Target",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
<h2>Introduction: Your Savings Are Their Target</h2>

<p>AARP estimates that investment fraud costs older Americans more than three billion dollars every year. The Securities and Exchange Commission, the Financial Industry Regulatory Authority, and the North American Securities Administrators Association — which includes Ohio's Division of Securities — all identify adults between 55 and 75 as the demographic most frequently victimized by investment fraud. This is not a coincidence, and it is not because older adults are careless or unsophisticated. It is because they have something that younger adults typically do not: accumulated retirement savings that represent a lifetime of work.</p>

<p>A person who has spent thirty or forty years contributing to a 401(k), building equity in a home, and setting aside funds in an IRA has a financial profile that is attractive to criminals in a way that a 30-year-old's does not. The timing matters too. People in their late fifties and sixties are often actively thinking about how to manage their money in retirement — what to invest in, how to generate income, how to make their savings last. That active engagement with financial decisions is precisely the window that investment fraudsters target.</p>

<h3>Why Retirement Assets Are Specifically Targeted</h3>

<p>Retirement accounts have several features that make them especially attractive to fraudsters. First, they are large. The median 401(k) balance for households near retirement age in the United States is well over $200,000, and many savers have accumulated significantly more. Second, they are often managed with relatively low engagement — a saver who contributed to a 401(k) for decades through payroll deductions may have had little occasion to think carefully about investment management. Approaching retirement, many people become suddenly, urgently interested in making their money work better. That urgency is exploitable.</p>

<p>Third, retirement account distributions — particularly rollovers — create moments of vulnerability that criminals monitor. When a person retires and rolls a 401(k) into an IRA, they receive or initiate a transfer of a large lump sum. In some cases, this is the largest single sum of money they have ever managed directly. Fraudsters obtain information about retirements from data brokers, from public records of pension eligibility, and sometimes from inside contacts at financial institutions. A call placed shortly after a rollover, by someone who seems to know your approximate financial situation, is not a coincidence.</p>

<h3>Ohio-Specific Context</h3>

<p>Ohio has a large population of retirees from manufacturing, public service, and the healthcare sector — many of them with defined-benefit pensions supplemented by significant savings. The Dayton area, in particular, has a substantial base of retired aerospace and automotive workers from companies including General Motors, Standard Register, and various defense contractors. These retirees often have both pension income and significant investment accounts — a combination that makes them attractive targets for the kind of investment fraud discussed in this book.</p>

<p>The Ohio Division of Securities, which regulates investment advisors and broker-dealers in the state, has documented hundreds of investment fraud complaints from Ohio residents in recent years. The division has pursued enforcement actions against fraudulent operators in Columbus, Cincinnati, Cleveland, and the Dayton suburbs. Understanding what these frauds look like — in their construction, their sales pitch, and their mechanics — is the most effective protection available.</p>

<h3>What This Book Will Do</h3>

<p>This book walks through every major category of investment fraud that targets pre-retirees and retirees: Ponzi schemes, affinity fraud, fake financial advisors, IRA rollover fraud, unsuitable annuities, and the newest frontier — cryptocurrency-based retirement fraud. For each category, it explains how the fraud is constructed, how to recognize it, and what to do if you encounter it. The final chapters cover how to vet a legitimate financial advisor and how to recover — financially, legally, and emotionally — if you have already been victimized.</p>

<p>Nothing in this book will make you afraid to invest. Well-managed investments are how most people build and maintain retirement security. The goal is not to make you distrust all financial professionals — most are legitimate — but to give you the specific tools to tell the difference between someone who is genuinely qualified to help you and someone who is there to take what you have spent a lifetime building.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "Investment Scam Anatomy",
    page_start: 17,
    page_end: 29,
    content_html: `<article class="chapter-content">
<h2>Investment Scam Anatomy</h2>

<p>Investment fraud follows a consistent four-phase structure, regardless of the specific product being offered. Understanding these phases makes it possible to recognize a fraud in progress — before the money is gone.</p>

<h3>Phase 1: Contact</h3>

<p>The initial contact in an investment scam can come through many channels. A cold call from someone who seems to know something about your financial situation. A mailer advertising a free lunch seminar at a hotel in a suburb near you. A social media ad promising exceptional returns. A referral from a friend or fellow church member who has already been enrolled. An email that looks like it comes from a financial institution you already use.</p>

<p>In Ohio, the free lunch seminar has been a particularly persistent vehicle for investment fraud. These events — held at restaurants and hotels in communities including Beavercreek, Westerville, Worthington, and Fairlawn — offer a free meal in exchange for attendance at a presentation. The presentations are often slickly produced and use legitimate-sounding terminology. The presenters may be licensed insurance agents or broker-dealers; many are not. The food is real; the financial advice rarely is.</p>

<p>The Ohio Division of Securities has issued multiple investor alerts specifically about free lunch seminars and has conducted undercover investigations at such events. In documented cases, attendees were pitched unsuitable variable annuities, non-traded real estate investment trusts, and outright fraudulent investment schemes — all in the context of a pleasant meal and a professional presentation.</p>

<h3>Phase 2: Credibility</h3>

<p>After contact, the scammer's primary task is establishing credibility. This involves creating the impression of legitimacy through a combination of materials, credentials, associations, and social proof. The materials may include professional-looking brochures, printed track records with impressive returns, registration documents that appear official, and testimonial letters from supposed satisfied clients. The credentials may be real (a legitimate securities license) used in support of a fraudulent scheme, or they may be entirely fabricated.</p>

<p>Credibility is also established through social proof — the phenomenon by which people trust something more if others like them have endorsed it. A salesperson who can name your neighbor, your pastor, or a respected member of your professional community as an existing client has dramatically increased their perceived legitimacy. This is the mechanism that makes affinity fraud (discussed in Chapter 4) so particularly dangerous.</p>

<h3>Phase 3: Commitment</h3>

<p>Once credibility is established, the fraudster moves to generate commitment. This phase involves the first investment, often a smaller amount than will ultimately be requested, chosen to be just large enough to feel meaningful but small enough not to trigger careful scrutiny. In Ponzi schemes, the initial investment is followed by a statement showing strong returns — which encourages the investor to contribute more, refer family members, and reduce their skepticism about the operation.</p>

<p>The commitment phase also involves psychological techniques: exclusivity ("this is for select clients only"), urgency ("the opportunity closes at the end of the month"), and reciprocity ("we've given you a lot of information and a free meal — we're looking for serious investors"). Each technique is designed to compress the decision-making timeline and reduce the likelihood that you will seek independent advice before writing a check.</p>

<h3>Phase 4: Extraction</h3>

<p>The extraction phase is when the fraud becomes fully operational. Successive investments are solicited, often with the early returns as justification. In Ponzi schemes, requests to withdraw funds are honored for a time — funded by money from new investors — until either the operator decides to disappear or the scheme collapses. In other frauds, access to funds is blocked by invented complications: regulatory holds, reinvestment lock-ups, processing delays. By the time victims realize what has happened, their money has often been moved through layers of transactions that make recovery extremely difficult.</p>

<p>Understanding this four-phase structure does not require financial sophistication. It requires the ability to ask one question at any point in the process: why am I being asked to decide quickly, without consulting someone else? Legitimate investments can withstand scrutiny. Legitimate advisors will encourage you to take time, review documents, and consult an independent advisor. The moment you feel pressure to decide without thinking, you are likely in Phase 3.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Ponzi Schemes and Pyramid Operations",
    page_start: 30,
    page_end: 41,
    content_html: `<article class="chapter-content">
<h2>Ponzi Schemes and Pyramid Operations</h2>

<p>The Ponzi scheme is named after Charles Ponzi, who defrauded investors in Boston in the 1920s by claiming to arbitrage international postal reply coupons. The mechanics have not changed in a century: money from new investors is used to pay "returns" to earlier investors, creating the illusion of a profitable enterprise when in fact nothing is being earned. The operator takes a substantial cut at every stage, and the scheme collapses when the inflow of new money is insufficient to pay the promised returns.</p>

<h3>How Ponzi Schemes Work</h3>

<p>The first payment to an early investor is the engine of the entire fraud. When you invest $50,000 and receive a check for $4,000 at the end of the first quarter — a return of 8 percent, or 32 percent annualized — two things happen. You believe the investment is real and performing as promised. And you tell people. Your neighbor, your brother-in-law, the people in your golf league. Each new investor funds the next round of payments, and the scheme grows until it cannot sustain its own weight.</p>

<p>The Bernie Madoff fraud — the largest Ponzi scheme in history, involving more than $65 billion in fictitious returns — operated for decades partly because Madoff's early investors received consistent, impressive returns and enthusiastically referred others. Many of his investors were themselves sophisticated financial professionals. The credibility created by early success was, paradoxically, what made the fraud sustainable for so long.</p>

<p>In Ohio, smaller-scale Ponzi schemes have been prosecuted by the Ohio Division of Securities and the Ohio Attorney General's office on a regular basis. These operations often target specific communities — church congregations, professional associations, ethnic communities — and grow through the referral networks of early investors who genuinely believe in the product they are recommending.</p>

<h3>Identifying a Ponzi Scheme Before You Are In</h3>

<p>Several characteristics appear consistently in Ponzi schemes:</p>

<ul>
  <li><strong>Consistently above-market returns.</strong> Any investment claiming consistent returns above 7 to 8 percent per year, in any market environment, deserves intensive scrutiny. Real markets fluctuate; legitimate investments go down as well as up. An investment that never has a bad quarter is a statistical impossibility — or a fraud.</li>
  <li><strong>Vague or overly complex investment strategies.</strong> When you ask how the fund earns its returns and receive an explanation that is either too vague to understand or too complex to follow, that is a warning sign. Legitimate fund managers can explain their strategy clearly.</li>
  <li><strong>Difficulty withdrawing funds.</strong> If your first request to withdraw money is met with delays, complications, or pressure to reinvest, stop immediately. Legitimate investments allow you to access your money.</li>
  <li><strong>Unregistered investments or advisors.</strong> Check registration before investing. An investment that is not registered with the SEC or the Ohio Division of Securities, or an advisor who is not registered, is a serious red flag regardless of how impressive everything else looks.</li>
</ul>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Affinity Fraud — When the Scammer Looks Like You",
    page_start: 42,
    page_end: 53,
    content_html: `<article class="chapter-content">
<h2>Affinity Fraud — When the Scammer Looks Like You</h2>

<p>Affinity fraud is investment fraud that targets members of an identifiable community — a religious congregation, a professional association, an ethnic community, a military veterans' group — by exploiting the trust that exists among members of that group. It is among the most emotionally destructive forms of financial fraud because it turns the bonds of community into a weapon.</p>

<h3>Why Shared Identity Reduces Skepticism</h3>

<p>Human beings are wired to trust members of their own group. This tendency — called in-group favoritism — evolved for good reasons: shared identity often does correlate with shared values and aligned interests. In a financial context, however, it creates a vulnerability. When someone who goes to your church, who served in the same branch of the military, or who belongs to the same ethnic or professional community recommends an investment, your instinct to evaluate it critically is suppressed by your sense that this person is like you and therefore trustworthy.</p>

<p>Affinity fraudsters exploit this instinct deliberately. They join communities not out of genuine membership but as a targeting strategy. They attend services, join committees, build relationships, and establish themselves as valued community members before the investment pitch ever begins. By the time they introduce the financial product, they have a network of real friends and colleagues who vouch for them — people who are themselves victims, though they do not yet know it.</p>

<h3>Church Congregation Fraud in Ohio</h3>

<p>Ohio has documented multiple cases of affinity fraud targeting faith communities. In the Columbus area, a fraudster who was an active member of a megachurch raised over $2 million from fellow congregants for a real estate investment that existed only on paper. In the Cleveland area, a man who presented himself as a Christian investment counselor specialized in "biblically responsible investing" — a real category of investment that excludes companies involved in industries some Christians consider unethical — and used that framing to collect more than $1.5 million from church members who trusted that their shared faith meant shared values.</p>

<p>Faith-based fraud is particularly cruel because it attacks not only the financial security of victims but their trust in their community, their congregation, and sometimes their faith itself. Recovery from this kind of fraud has emotional dimensions that go far beyond the financial loss.</p>

<h3>Veteran Community Fraud</h3>

<p>Veterans are disproportionately targeted by affinity fraud. Fraudsters who target this community emphasize their own military service — sometimes real, sometimes fabricated — and frame their investment products in terms of discipline, loyalty, and patriotism. They may speak at veterans' events, participate in veteran service organizations, and use military language and values in their pitch. The Ohio Department of Veterans Services has issued multiple warnings about investment fraud specifically targeting Ohio veterans, and the SEC maintains a dedicated resource for veteran investors at investor.gov/additional-resources/information/veterans.</p>

<h3>Protecting Yourself in Community Contexts</h3>

<p>The strongest protection against affinity fraud is a simple rule: apply the same verification standards to every investment opportunity, regardless of who is offering it. A friend from church who recommends an investment is not a substitute for verifying that the advisor is registered, reviewing the offering documents, and consulting an independent financial professional. Loving your community does not require you to abandon the financial common sense that protects it.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Fake Financial Advisors and Credential Fraud",
    page_start: 54,
    page_end: 68,
    content_html: `<article class="chapter-content">
<h2>Fake Financial Advisors and Credential Fraud</h2>

<p>The financial services industry uses a bewildering array of titles, designations, and certifications — and the difference between a legitimate credential and a meaningless one is invisible to most consumers. Fraudsters exploit this confusion systematically, inventing credentials, misrepresenting their registration status, and using titles designed to sound authoritative without carrying any actual regulatory meaning.</p>

<h3>How to Check Registrations</h3>

<p>Before giving any money to any financial professional, you should complete three verification steps. These steps take about twenty minutes total, are entirely free, and can be done online or by phone. No legitimate financial professional will object to your doing this — in fact, a genuine professional will encourage it.</p>

<p><strong>Step 1: FINRA BrokerCheck.</strong> FINRA (the Financial Industry Regulatory Authority) maintains BrokerCheck at brokercheck.finra.org. This free database allows you to search any broker or brokerage firm by name, CRD number, or firm name. A BrokerCheck report shows whether the person is currently registered, what licenses they hold, what states they are licensed to do business in, and — critically — any regulatory actions, customer complaints, arbitration awards, or criminal disclosures in their history. A broker who has multiple customer complaints or regulatory sanctions is a serious concern. A broker who does not appear in BrokerCheck at all is not licensed and cannot legally sell you securities.</p>

<p><strong>Step 2: Ohio Division of Securities.</strong> The Ohio Division of Securities registers investment advisers and investment adviser representatives who do business in Ohio. If someone is advising you on investments — creating a financial plan, managing a portfolio, recommending specific securities — they should be registered either with the Ohio Division of Securities or with the SEC (if they manage more than $110 million). You can verify Ohio registration by calling the division directly at (800) 788-1194, or by using the online search tool at securities.ohio.gov. The division's staff are available to answer questions about specific individuals and firms.</p>

<p><strong>Step 3: SEC EDGAR and Investment Adviser Public Disclosure.</strong> The SEC's Investment Adviser Public Disclosure database (adviserinfo.sec.gov) allows you to search for SEC-registered investment advisers and their representatives. This database includes Form ADV, the disclosure document that registered advisers must file with the SEC. Form ADV Part 2 is particularly valuable: it is written in plain English and describes the adviser's services, fees, investment strategies, potential conflicts of interest, and disciplinary history. Any registered adviser must provide you with their ADV Part 2 before or at the time you become a client. If they resist or refuse, walk away.</p>

<h3>Fake and Misleading Designations</h3>

<p>The titles "Senior Financial Advisor," "Certified Retirement Planner," "Senior Investment Specialist," and dozens of variations have been created specifically to sound authoritative to older investors without requiring any meaningful qualification. Some of these designations can be obtained online for a few hundred dollars and a basic exam. They are not regulated by any government agency and carry no enforceable ethical obligations.</p>

<p>The designations that actually mean something in the investment world are those awarded by independent credentialing bodies with rigorous requirements, ongoing education mandates, and disciplinary processes. The most relevant for consumers working with financial advisors are:</p>

<ul>
  <li><strong>CFP (Certified Financial Planner):</strong> Awarded by the Certified Financial Planner Board of Standards. Requires education, a comprehensive exam, three years of experience, and adherence to a fiduciary standard when providing financial planning.</li>
  <li><strong>CFA (Chartered Financial Analyst):</strong> Awarded by the CFA Institute. Requires passing three levels of rigorous exams over multiple years and is focused on investment management. Primarily held by portfolio managers and analysts.</li>
  <li><strong>ChFC (Chartered Financial Consultant):</strong> Awarded by The American College of Financial Services. Similar educational requirements to CFP.</li>
</ul>

<p>You can verify a CFP designation — and any disciplinary history associated with it — at cfp.net/verify. You can verify a CFA at cfainstitute.org/en/ethics-standards/find-a-cfacharterholder.</p>

<h3>What Cold Calls and Seminars Can Legally Say</h3>

<p>Securities laws impose restrictions on what registered brokers and advisers can say in cold calls and seminars. They must identify themselves and their firm. They cannot make false or misleading statements. They cannot guarantee returns. They must disclose material conflicts of interest. In practice, many of these rules are violated routinely in fraudulent operations — but knowing the rules gives you a baseline: any pitch that includes a return guarantee, that pressures you to decide immediately, or that omits the presenter's firm name and registration information is operating outside the law.</p>

<p>If you attend a seminar or receive a call that raises any of these concerns, you can file a complaint with the Ohio Division of Securities at (800) 788-1194 or online at securities.ohio.gov. Complaints from Ohio residents are what enable the division to investigate and take action against fraudulent operators.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "IRA and 401(k) Targeting",
    page_start: 69,
    page_end: 79,
    content_html: `<article class="chapter-content">
<h2>IRA and 401(k) Targeting</h2>

<p>Individual Retirement Accounts and 401(k) plans represent decades of disciplined saving, often the largest single asset a person has outside of their home. They are also, because of their size and the rules governing them, a particularly attractive target for fraudsters.</p>

<h3>Rollover Fraud</h3>

<p>When you leave an employer or retire, you have the option to roll your 401(k) balance into an IRA — a process that preserves the tax-advantaged status of the funds while giving you more flexibility in how they are invested. This rollover process is completely legitimate and is often the right financial decision. It also creates a targeting moment: your employer's HR department may notify a third-party administrator of your separation, and that information can, in some cases, find its way to data brokers and then to fraudulent operations.</p>

<p>Rollover fraud typically works as follows: shortly after you separate from an employer, you receive a call from someone offering to help you manage your rollover "to maximize your retirement income." They may have information that makes them sound credible — your approximate account balance, the name of your previous employer, your general retirement timeline. They recommend rolling your 401(k) into an IRA that they will manage. Once the funds are in an IRA under their control, they invest them in fraudulent products, charge excessive fees, or simply disappear with the money.</p>

<h3>Fake "Self-Directed IRA" Schemes</h3>

<p>Self-directed IRAs are legitimate accounts that allow investors to hold a wider range of assets than traditional IRAs — including real estate, private equity, and certain other alternative investments. They are governed by the same IRS rules as traditional IRAs. Fraudsters have increasingly used the "self-directed IRA" framing to sell investors on schemes that would be immediately recognizable as fraudulent in a conventional investment context.</p>

<p>The pitch is that a self-directed IRA allows you to invest in high-return opportunities not available through traditional brokerages. Those "opportunities" are often completely fabricated — a real estate project that exists only on paper, a private company with no real operations, a commodity investment with no underlying commodity. Because the IRA custodian holds the account without necessarily evaluating the underlying investments, and because investors are less familiar with alternative assets, the fraud can be harder to spot than a conventional Ponzi scheme.</p>

<h3>The Fake Fiduciary</h3>

<p>A fiduciary is a professional who is legally required to act in your best interest — not just to recommend products that are "suitable" for you, but to put your interests ahead of their own. Many legitimate financial advisors are fiduciaries, and working with one is generally in your interest. Fraudsters have learned to claim fiduciary status without actually being subject to it. If an advisor claims to be a fiduciary, ask them to put that claim in writing and to identify the regulatory framework under which they are held to that standard. A registered investment adviser under the Investment Advisers Act of 1940 is a fiduciary. A broker selling commission-based products generally is not. The distinction matters enormously when it comes to retirement account management.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Annuity Fraud and Unsuitable Products",
    page_start: 80,
    page_end: 91,
    content_html: `<article class="chapter-content">
<h2>Annuity Fraud and Unsuitable Products</h2>

<p>Annuities are insurance products designed to provide a guaranteed income stream, either immediately or at some point in the future. Used appropriately, certain annuities can be a legitimate part of a retirement income strategy. Used inappropriately — or sold by an unscrupulous agent — they can lock up your savings, generate enormous commissions for the agent, and leave you worse off than before.</p>

<h3>Variable Annuities and Suitability</h3>

<p>Variable annuities invest your premium in sub-accounts that function like mutual funds, with the promise that at some point in the future you will receive income based on the performance of those sub-accounts. They are complex, expensive products that carry surrender charges — fees you pay if you withdraw money before a specified period, often seven to ten years.</p>

<p>For a 70-year-old with significant health issues and immediate income needs, a variable annuity with a ten-year surrender period is almost certainly unsuitable — it ties up their money for a decade and charges them substantially if they need to access it earlier. For a 55-year-old with a long time horizon, stable income from other sources, and a genuine need for tax-deferred growth, the same product might be appropriate.</p>

<p>Annuity fraud most often involves selling a product to someone for whom it is clearly unsuitable — a practice called churning when it involves replacing one annuity with another to generate a new commission. An agent who convinces you to surrender an existing annuity (paying surrender charges) and purchase a new one (restarting the surrender period) while taking a new commission has almost certainly acted against your interest, and potentially violated Ohio insurance regulations.</p>

<h3>Ohio Insurance Department Resources</h3>

<p>Insurance products including annuities are regulated in Ohio by the Ohio Department of Insurance. If you believe an insurance agent sold you a product through misrepresentation, charged you inappropriate fees, or acted in a way that was not in your interest, you can file a complaint with the Ohio Department of Insurance at insurance.ohio.gov or by calling 1-800-686-1526. The department investigates agent misconduct and has the authority to revoke licenses and impose financial penalties.</p>

<p>Before purchasing any annuity, ask the agent to provide the complete product disclosure document. Review the surrender charge schedule in detail. Ask what their commission is on this product. And consider consulting an independent, fee-only financial advisor — one who does not earn commissions on product sales — before signing anything.</p>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "Cryptocurrency and the New Retirement Fraud Frontier",
    page_start: 92,
    page_end: 102,
    content_html: `<article class="chapter-content">
<h2>Cryptocurrency and the New Retirement Fraud Frontier</h2>

<p>Cryptocurrency has become one of the fastest-growing vehicles for retirement fraud. Its appeal to fraudsters is structural: cryptocurrency transactions are largely irreversible, difficult to trace, and happen outside the traditional banking system's fraud monitoring infrastructure. Once your money has been converted to cryptocurrency and sent, recovering it is extremely difficult — and in many cases impossible.</p>

<h3>Crypto IRA Scams</h3>

<p>The self-directed IRA fraud discussed in Chapter 6 has merged with cryptocurrency in a particularly dangerous combination. Promoters offer "Bitcoin IRAs" or "cryptocurrency IRAs" with claims of extraordinary tax advantages and investment returns. Some of these are legitimate — there are registered custodians who legally hold cryptocurrency within self-directed IRAs. But many are not. In fraudulent crypto IRA schemes, your rollover funds are sent to a custodian that does not actually hold the cryptocurrency, or to a platform that disappears with your money after a period of building your confidence with fabricated account statements showing impressive gains.</p>

<h3>Fake Trading Platforms</h3>

<p>Fraudulent cryptocurrency trading platforms are one of the most common forms of investment fraud currently operating. These platforms look professional: they have polished websites, customer service staff, and account dashboards that show your balance growing. Everything is fabricated. When you attempt to withdraw funds, you are asked to pay a "tax" or "release fee" before the withdrawal can be processed. No legitimate platform charges you a fee before allowing a withdrawal. Once you have paid the fee, the platform typically goes silent — the website disappears, the customer service stops responding, and your money is gone.</p>

<h3>Pig Butchering and Retirees</h3>

<p>One of the most elaborate cryptocurrency frauds is called "pig butchering" — a scheme that originated in Southeast Asia and combines romance fraud with investment fraud. The scammer builds a relationship with the victim over weeks or months, then introduces a "trading opportunity" that the victim can access through a specific platform (controlled by the scammers). Early trades show spectacular gains. The victim is encouraged to invest more. Family members are sometimes recruited. When the scammer decides the victim has been sufficiently "fattened," they liquidate the account and disappear.</p>

<p>For retirees who are simultaneously open to both companionship (the romance element) and investment opportunities (the trading element), pig butchering is a devastating combination. The Ohio Attorney General's office has received reports of pig butchering losses from Ohio residents ranging from tens of thousands to several hundred thousand dollars.</p>

<p>The single most important rule regarding cryptocurrency and retirement savings: never move retirement funds into cryptocurrency based on the recommendation of someone you have met online, regardless of how well you feel you know them.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Red Flags for Bad Financial Products",
    page_start: 103,
    page_end: 112,
    content_html: `<article class="chapter-content">
<h2>Red Flags for Bad Financial Products</h2>

<p>After reviewing the landscape of investment fraud in the preceding chapters, certain warning signs appear consistently across almost every category of fraud. This chapter consolidates the most important ones into a single, usable reference.</p>

<h3>Guaranteed Returns Above 7–8%</h3>

<p>No legitimate investment can guarantee consistent returns above 7 to 8 percent per year. The stock market has returned roughly 10 percent per year on average over the long term — but with enormous year-to-year variability. Bonds return far less. Any investment promising consistent double-digit returns, or any returns that are "guaranteed" regardless of market conditions, is either lying about the guarantee or lying about the returns — and either is sufficient reason to decline.</p>

<h3>Urgency and Artificial Deadlines</h3>

<p>Urgency is the single most reliable indicator of a fraudulent pitch. Legitimate investments do not expire at midnight. Legitimate advisors do not threaten that the opportunity will be gone if you take time to consult a family member or a second advisor. The pressure to decide immediately is designed specifically to prevent you from thinking carefully and seeking independent verification — because careful thought and independent verification are exactly what will reveal the fraud.</p>

<h3>"Only for Select Clients" and Exclusivity Claims</h3>

<p>The appeal to exclusivity is designed to make you feel privileged and to suppress the question of why this remarkable opportunity is being offered to you specifically. If an investment is available only to a select group, why are you in that group? What qualifies you? How did this person find you? The answers to these questions, examined honestly, are rarely flattering to the pitch.</p>

<h3>Pressure to Move IRA Funds Quickly</h3>

<p>IRA rollovers are irreversible once completed. Any advisor who pressures you to complete a rollover on a specific timeline — particularly a short one — is working against your interests. You have sixty days after receiving a distribution from a retirement account to complete a rollover without tax consequences. Legitimate advisors do not pressure you to use fewer of those days than you need.</p>

<h3>No Written Materials</h3>

<p>Every legitimate investment product has disclosure documents — a prospectus, an offering memorandum, a Form ADV, or a product disclosure statement. Every legitimate advisor will provide you with written materials describing the investment, its risks, its costs, and their compensation. If an investment is presented only verbally, with no documents to review, or if you are discouraged from taking the materials home to review at your leisure, treat that as a disqualifying red flag.</p>
</article>`,
  },

  {
    chapter_number: 10,
    chapter_title: "How to Vet Advisors and Verify Credentials",
    page_start: 113,
    page_end: 124,
    content_html: `<article class="chapter-content">
<h2>How to Vet Advisors and Verify Credentials</h2>

<p>Choosing a financial advisor is one of the most important decisions you will make in retirement. The right advisor can help you manage income, control taxes, protect against inflation, and plan for healthcare costs. The wrong one — whether incompetent or outright fraudulent — can cost you everything. This chapter gives you a concrete, step-by-step process for evaluating anyone who asks for the opportunity to manage your money.</p>

<h3>The Three Verification Steps</h3>

<p><strong>FINRA BrokerCheck (brokercheck.finra.org):</strong> Search the advisor's full legal name and, if possible, their CRD (Central Registration Depository) number. Review every section of the report, paying particular attention to the "Disclosure" section. Any customer disputes, regulatory sanctions, or criminal disclosures should be discussed directly with the advisor before you proceed. A single old complaint with a favorable resolution may not be disqualifying; multiple complaints or a regulatory sanction is a serious concern.</p>

<p><strong>Ohio Division of Securities ((800) 788-1194 or securities.ohio.gov):</strong> Verify that the advisor is registered as an investment adviser representative in Ohio if they are providing investment advice. Ask the division staff directly: "Is [name] registered to provide investment advice in Ohio?" This call takes five minutes and is one of the most powerful protective steps available to you.</p>

<p><strong>SEC EDGAR — Investment Adviser Public Disclosure (adviserinfo.sec.gov):</strong> For advisors managing larger portfolios who are registered with the SEC rather than the state, search this database and request the adviser's Form ADV Part 2. Read it. It will tell you how they are compensated, what conflicts of interest they have, and what their investment philosophy is. If the ADV is not available or the advisor declines to provide it, do not proceed.</p>

<h3>Questions to Ask Before Signing Anything</h3>

<ul>
  <li>Are you registered with the Ohio Division of Securities or the SEC? What is your CRD number?</li>
  <li>Are you a fiduciary? Will you confirm that in writing?</li>
  <li>How are you compensated — fee-only, commissions, or a combination?</li>
  <li>What is your investment philosophy for someone in my situation?</li>
  <li>Can you provide three references from current clients in a similar situation to mine?</li>
  <li>What is the total cost — fees and any embedded product costs — of the accounts you are recommending?</li>
</ul>

<h3>What a Legitimate Fee-Only Fiduciary Looks Like</h3>

<p>A fee-only fiduciary charges you directly for advice — typically a flat fee, an hourly rate, or a percentage of assets under management — and earns no commissions from product sales. This structure aligns their incentives with yours: they are paid to give you good advice, not to sell you a product. The National Association of Personal Financial Advisors (NAPFA) maintains a directory of fee-only advisors at napfa.org, including advisors serving Ohio communities.</p>

<p>A fee-only fiduciary will also be registered with either the Ohio Division of Securities or the SEC, will hold a recognized credential (CFP is most common in the comprehensive planning context), and will be happy to have you verify all of this before you commit to working with them. If any of these characteristics are absent, proceed with caution.</p>
</article>`,
  },

  {
    chapter_number: 11,
    chapter_title: "Recovery After Financial Fraud",
    page_start: 125,
    page_end: 140,
    content_html: `<article class="chapter-content">
<h2>Recovery After Financial Fraud</h2>

<p>If you have been the victim of investment fraud, the path forward involves several parallel tracks: reporting to regulators and law enforcement, pursuing financial recovery through available legal mechanisms, understanding the tax treatment of your losses, and attending to the emotional impact of what happened. None of these tracks is quick or simple, but each one is worth pursuing.</p>

<h3>FINRA Arbitration</h3>

<p>If your losses resulted from the actions of a registered broker or brokerage firm — including unsuitable investment recommendations, unauthorized trading, excessive fees, or misrepresentation — you may have the right to pursue recovery through FINRA arbitration. This is a formal dispute resolution process that is faster and less expensive than litigation, and that is specifically designed for securities-related disputes. Most brokerage account agreements require disputes to be resolved through FINRA arbitration rather than the courts.</p>

<p>FINRA arbitration panels can award compensatory damages — the amount you lost — and in appropriate cases, additional damages. Filing a FINRA arbitration claim typically requires the assistance of a securities attorney. Many securities attorneys take fraud cases on a contingency basis, meaning they are paid only if you recover money.</p>

<h3>SEC Complaint and the Whistleblower Program</h3>

<p>You can file a complaint with the SEC about any investment fraud at sec.gov/tcr. The SEC's enforcement division investigates complaints and, when investigations result in sanctions and disgorgement of funds, may distribute recovered money to victims through a Fair Fund. These distributions can take years to materialize and rarely return the full amount lost, but they are worth pursuing.</p>

<p>The SEC also maintains a Whistleblower Program (sec.gov/whistleblower) that pays awards to individuals who provide original information leading to a successful SEC enforcement action resulting in sanctions over $1 million. If you have inside information about a fraud — because you participated in it briefly, or because you observed it in a professional context — the whistleblower program may be relevant to your situation.</p>

<h3>Ohio AG Restitution Program</h3>

<p>When the Ohio Attorney General's office successfully prosecutes an investment fraud case and obtains a restitution order, victims who filed complaints may be eligible to receive a portion of any funds recovered. Filing a complaint with the Ohio AG's office at ohioattorneygeneral.gov or 1-800-282-0515 is the mechanism by which you establish your status as a documented victim — which is necessary to participate in any future restitution distribution.</p>

<h3>Tax Treatment of Fraud Losses</h3>

<p>The IRS has specific rules governing the tax treatment of losses resulting from fraud. Under Rev. Rul. 2009-9 and the associated revenue procedure, victims of Ponzi schemes and similar frauds may be able to deduct their losses in a specific way that is more favorable than the standard theft loss treatment. This is a complex area of tax law, and you should consult a CPA or tax attorney to understand your specific situation.</p>

<h3>Emotional Recovery</h3>

<p>The emotional impact of financial fraud — particularly fraud that involves a trusted relationship — should not be minimized. Victims commonly experience anger, shame, depression, grief, and a lasting loss of trust in others. These responses are normal and appropriate. They are not a sign of weakness.</p>

<p>The AARP Fraud Watch Network helpline (1-877-908-3360) connects victims with trained volunteers who provide peer support and referrals to professional counseling. The Ohio Victim Assistance Program, through the Ohio Attorney General's office, provides financial assistance for counseling to victims of financial crimes who meet eligibility requirements. Your local Area Agency on Aging can also connect you with mental health resources in your community.</p>

<p>One final thing worth saying plainly: investment fraud is not something that happens only to careless or uninformed people. It happens to lawyers, physicians, engineers, accountants, and financial professionals. It happens to people who did their research, asked questions, and thought they were making good decisions. The sophistication of these operations — their materials, their social proof, their exploitation of real human trust — is designed to defeat ordinary skepticism. What protects you is not being suspicious of everyone, but being specific: verifying registration, reading disclosures, consulting an independent advisor, and never letting urgency replace careful thought. Those habits, maintained consistently, are the most durable protection available.</p>
</article>`,
  },
];
