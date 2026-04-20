import type { BookChapter } from "@/config/bookCatalog";

/**
 * Cryptocurrency Safety: Avoiding Digital Currency Scams
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 12 chapters (0–11), ~140 pages, general-public tone, skeptical but curious audience
 */
export const CRYPTOCURRENCY_SAFETY_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Cryptocurrency Safety: Avoiding Digital Currency Scams</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">A Plain-Language Guide to Protecting Yourself in the Age of Digital Money</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>InVision Network Press · Kettering, Ohio 45440</p><p><em>For educational purposes only. Cryptocurrency investments carry significant risk. This is not financial advice.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — Digital Money's Fraud Problem",
    page_start: 4,
    page_end: 17,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — Digital Money's Fraud Problem</h2>

<p>In 2023, Americans reported losing $5.6 billion to cryptocurrency fraud. That figure comes from the FBI's Internet Crime Complaint Center — the IC3 — and it represents only the losses that were actually reported. Fraud researchers consistently estimate that for every complaint filed, three to five incidents go unreported because victims feel embarrassed, believe nothing can be done, or simply do not know where to turn. The real number may be two or three times higher.</p>

<p>That is not a typo. Billions. In a single year. From a technology that many people still associate mainly with tech-savvy speculators and online enthusiasts. If that surprises you, you are not alone — and you are exactly the kind of reader this book was written for.</p>

<p>Cryptocurrency has a fraud problem unlike almost any other financial technology in history. The reasons are structural, and understanding them is the first step toward protecting yourself. This chapter explains why crypto has become the preferred tool of scammers worldwide, who is actually being targeted, and what Ohio's particular relationship with cryptocurrency means for residents of this state.</p>

<h3>Why Cryptocurrency Is the Perfect Fraud Vehicle</h3>

<p>Every financial technology that has ever existed has attracted fraud. Credit cards attracted card-not-present fraud. Wire transfers attracted business email compromise scams. Online banking attracted phishing attacks. But cryptocurrency has characteristics that make it uniquely attractive to fraudsters in ways that previous technologies did not.</p>

<p>The most important characteristic is irreversibility. When you send a bank wire transfer and realize it was fraudulent, you have a window — sometimes a matter of hours — in which the bank may be able to recall the funds. When you pay with a credit card and discover fraud, you can dispute the charge and in most cases recover your money. These are not perfect systems, but they provide a buffer between a mistake and a permanent loss.</p>

<p>Cryptocurrency transactions have no such buffer. When you send Bitcoin or any other cryptocurrency to an address, that transaction is recorded on the blockchain — the permanent, public ledger that underlies crypto — and it cannot be reversed by anyone. Not by you. Not by the exchange you used. Not by the government. Not by law enforcement. There is no dispute mechanism, no chargeback, no recall. The funds are gone the moment the transaction confirms, which typically happens within minutes.</p>

<p>The second characteristic is pseudonymity. Every cryptocurrency transaction is publicly visible on the blockchain — anyone can see that address A sent 1.5 Bitcoin to address B at a specific time. But those addresses are just strings of letters and numbers. Connecting them to real human identities requires significant investigative work, specialized blockchain analytics tools, and often international legal cooperation. A skilled fraudster operating through multiple addresses in multiple jurisdictions can make their trail extremely difficult to follow.</p>

<p>The third characteristic is global reach without borders. A scammer based in Southeast Asia can receive cryptocurrency from a victim in Columbus, Ohio, in seconds. There are no international wire transfer delays, no bank compliance checks, no currency conversion hurdles that might slow the transaction or trigger a review. The money moves as fast as the internet.</p>

<p>Put these three characteristics together — irreversibility, pseudonymity, and borderless speed — and you understand why the FBI and FTC have both identified cryptocurrency as the payment method of choice for modern fraud. It is not that crypto is inherently bad. It is that its structural properties make it far better than any alternative for permanently extracting money from victims with minimal accountability.</p>

<h3>Who Gets Targeted — Not Who You Think</h3>

<p>There is a common assumption that cryptocurrency fraud primarily victimizes young, technically sophisticated investors who got in over their heads speculating on volatile assets. The data tells a very different story.</p>

<p>The FBI's IC3 reports show that adults over 60 file more cryptocurrency fraud complaints by total dollar amount than any other age group. In 2023, older Americans reported losing more than $1.65 billion to crypto fraud alone — a figure that increased from previous years and that researchers believe significantly undercounts the actual losses. The target is not the reckless young speculator. It is increasingly the retirement saver, the widow or widower who recently received a life insurance payout, the retiree managing decades of accumulated savings.</p>

<p>But it is not only seniors. People of every age and education level are victimized. College professors. Medical doctors. Financial professionals who know better. Engineers who work in technology. The scams that are most effective today are specifically designed to work on intelligent, skeptical people. They are built on trust established over weeks or months. They use professional-looking fake websites, genuine-seeming customer service, and plausible-sounding explanations. They do not target the naive. They target the trusting.</p>

<h3>Ohio and Cryptocurrency — Familiarity That Fraudsters Exploit</h3>

<p>Ohio has a distinctive history with cryptocurrency that creates both opportunity and risk for its residents. In 2018, Ohio became the first U.S. state to allow businesses to pay their state taxes using Bitcoin — a move widely covered in national news as a sign of forward-thinking governance. Although that program was later suspended and reworked, it left a lasting impression: Ohio was officially cryptocurrency-friendly. That reputation, combined with the state's large and economically diverse population, makes Ohioans attractive targets for fraud schemes that want to find people who are familiar with cryptocurrency without being experts in it.</p>

<p>The sweet spot for scammers is exactly that population: people who have heard of Bitcoin, who maybe bought a small amount out of curiosity, who are not so unfamiliar that they would immediately hang up, but who do not know enough to recognize a fake trading platform or understand why sharing a seed phrase is catastrophic. Ohio has millions of people who fit that description, and scammers know it.</p>

<p>Throughout this book, we will return to Ohio-specific examples, resources, and reporting channels. We will talk about the cryptocurrency ATM scams that Ohio law enforcement has been warning about for years. We will reference the Ohio Attorney General's office and the Ohio Department of Commerce, both of which have active fraud-prevention resources for state residents. And we will make sure that by the time you finish reading, you know exactly what to do and who to call if you or someone you care about has been targeted.</p>

<h3>What This Book Is — and Is Not</h3>

<p>This book is not an investment guide. It does not tell you whether to buy cryptocurrency, how much to buy, or which coins to choose. That is a topic for financial advisors, and any book claiming to give you investment advice on cryptocurrency without knowing your specific financial situation should be treated with deep suspicion.</p>

<p>What this book is: a fraud-prevention guide written for people who want to understand how the cryptocurrency world works well enough to recognize when something is wrong. We will cover how cryptocurrency actually works, how legitimate platforms and wallets operate, and in detail, how every major category of crypto fraud works — so you can spot them before they cost you anything.</p>

<p>We have written this for people who are skeptical of cryptocurrency, who are curious about it, and for people who already hold some and want to make sure they are protecting it properly. If you fall into any of those categories, this book has something for you. And if someone you care about has recently expressed interest in cryptocurrency or has been approached by someone offering a crypto investment opportunity, the information in these pages may be the most important thing you can share with them.</p>

<p>One final note before we begin: throughout this book, when we describe scam tactics in detail, we are doing so deliberately. The most effective protection against fraud is understanding exactly how fraud works. Knowing the script a scammer uses makes it much harder for that script to work on you. You may feel, reading some chapters, that we are giving a how-to guide for criminals. We are not. These tactics are already in use. The only people who benefit from you not understanding them are the scammers using them.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "How Cryptocurrency Actually Works — Plain English",
    page_start: 18,
    page_end: 30,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: How Cryptocurrency Actually Works — Plain English</h2>

<p>You do not need to understand every technical detail of cryptocurrency to protect yourself from fraud. But you do need to understand a few core concepts, because the most dangerous scams exploit misunderstandings of how crypto actually works. This chapter covers exactly what you need to know — and nothing more than that.</p>

<h3>The Blockchain: A Public Ledger That No One Controls</h3>

<p>Cryptocurrency runs on technology called a blockchain. The simplest way to understand a blockchain is as a shared accounting ledger — a record of every transaction that has ever happened in that cryptocurrency's history. The ledger is not stored in one place by one company. It is copied across thousands of computers around the world, all of which are constantly checking each other's work.</p>

<p>When you send cryptocurrency, the transaction is broadcast to this network. Thousands of computers verify that the transaction is valid — that you actually have the funds you are trying to send, and that you have the authority to send them. Once verified, the transaction is added to the ledger permanently. Because the ledger exists on thousands of computers simultaneously, no single person, company, or government can alter it. This is why cryptocurrency transactions cannot be reversed: the record is permanent and distributed.</p>

<p>Bitcoin was the first blockchain-based cryptocurrency, created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto. Ethereum came later and added the ability to run small programs called "smart contracts" on the blockchain. There are now thousands of cryptocurrencies, most of which are worth very little and many of which were created for fraudulent purposes. When someone approaches you with an investment opportunity in a cryptocurrency you have never heard of, that obscurity is a warning sign, not an opportunity.</p>

<h3>Private Keys — "Not Your Keys, Not Your Coins"</h3>

<p>Here is the concept that matters most for your security: in cryptocurrency, ownership is proven through something called a private key. A private key is a long string of letters and numbers — essentially an extremely long password — that proves you have the right to spend the cryptocurrency at a given address. If you have the private key, you control the funds. If someone else has the private key, they control the funds.</p>

<p>This is why the phrase "not your keys, not your coins" has become a mantra in the cryptocurrency world. If your cryptocurrency is held on an exchange — a company that buys and sells crypto on your behalf — the exchange holds the private keys, not you. You have an account with a balance, similar to a bank account, but the actual cryptocurrency is controlled by the exchange. If the exchange is hacked, goes bankrupt, or turns out to be fraudulent, your funds may be gone.</p>

<p>If you hold your own private keys — by using a personal wallet — you are fully in control of your funds. But that means full responsibility too. Lose your private key, and no one can help you recover your funds. There is no customer service number for the Bitcoin blockchain.</p>

<h3>Hot Wallets vs. Cold Storage</h3>

<p>Cryptocurrency wallets come in two main categories. A hot wallet is connected to the internet — software on your phone or computer that lets you easily send and receive cryptocurrency. Hot wallets are convenient but more vulnerable to hacking.</p>

<p>Cold storage means keeping your private key offline. Hardware wallets — physical devices that look like USB drives — are the most common form of cold storage. They store your private key on the device itself, which never connects directly to the internet. To approve a transaction, you physically press a button on the device. This makes it much harder for a remote hacker to steal your funds.</p>

<p>For any significant amount of cryptocurrency, security experts universally recommend cold storage. We will discuss this in much more detail in Chapter 3.</p>

<h3>Why There Is No 1-800 Number for Crypto Fraud</h3>

<p>One of the hardest things for new cryptocurrency users to accept is that there is genuinely no central authority to appeal to when something goes wrong. There is no Federal Deposit Insurance Corporation (FDIC) insuring your crypto holdings. There is no credit card company that can reverse the charge. There is no bank fraud department to call.</p>

<p>You can report crypto fraud to the FBI's IC3 at ic3.gov, the FTC at reportfraud.ftc.gov, and the Ohio Attorney General's office. These agencies investigate fraud and work to shut down criminal operations. But recovering your specific funds is rarely possible. This is not a failure of law enforcement. It is a structural reality of how cryptocurrency works, and it is exactly why prevention is so much more important than response when it comes to crypto fraud.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Wallet Security — Hot Wallets, Cold Storage, and Hardware Keys",
    page_start: 31,
    page_end: 43,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Wallet Security — Hot Wallets, Cold Storage, and Hardware Keys</h2>

<p>If you hold cryptocurrency directly — meaning you control your own private keys rather than leaving funds on an exchange — then your wallet security is the single most important thing standing between your holdings and a thief. This chapter explains how to set up and maintain wallet security correctly, and covers the most common ways wallet security fails.</p>

<h3>Software Wallets: Convenient but Vulnerable</h3>

<p>Software wallets like Coinbase Wallet (different from the Coinbase exchange app), MetaMask, and Trust Wallet are applications you install on your phone or computer. They generate and store your private keys on the device. They are convenient because they are always with you, easy to use, and free. They are also the primary target for hackers and scammers.</p>

<p>The risks with software wallets include: malware that can read your private key from the device; phishing websites that trick you into entering your key or seed phrase; and physical theft of your device combined with weak device security. MetaMask in particular has been widely imitated by fraudulent browser extensions that steal user funds when installed. If you use MetaMask, download it only from the official MetaMask website and verify the extension publisher in your browser.</p>

<h3>Hardware Wallets: The Gold Standard</h3>

<p>Hardware wallets from companies like Ledger and Trezor are the gold standard for personal cryptocurrency security. These physical devices store your private key in a secure chip that never exposes the key to an internet-connected computer. To approve a transaction, you physically confirm it on the device. Even if your computer is completely infected with malware, a hardware wallet transaction cannot be approved without physical access to the device.</p>

<p>Hardware wallets cost between $50 and $200. For anyone holding more than a few hundred dollars in cryptocurrency, that is a worthwhile investment. Purchase hardware wallets only from the manufacturer's official website — never from third-party resellers on Amazon or eBay, where tampered devices have been sold that are pre-configured to steal funds.</p>

<h3>The Seed Phrase: Your Most Critical Secret</h3>

<p>When you set up any cryptocurrency wallet, you will be given a seed phrase — also called a recovery phrase or mnemonic phrase. This is typically 12 or 24 ordinary English words in a specific order. The seed phrase is a human-readable encoding of your private key. Anyone who has your seed phrase has complete control of all funds associated with that wallet, across every blockchain, forever.</p>

<p>How to store your seed phrase safely:</p>
<ul>
  <li>Write it on paper immediately. Do not store it digitally — not in a notes app, not in email, not in a cloud service, not in a text message.</li>
  <li>Store the paper somewhere secure, like a fireproof safe or a safety deposit box.</li>
  <li>Consider making a second copy stored separately, in case of fire or flood.</li>
  <li>Never photograph your seed phrase.</li>
  <li>Never type it into any website, app, or form — ever, for any reason.</li>
</ul>

<p>That last point cannot be overstated. Legitimate cryptocurrency software will never ask you to enter your seed phrase except when restoring a wallet on a new device that you control. Any request to enter your seed phrase anywhere else is a scam. Full stop. No exceptions.</p>

<h3>Seed Phrase and Wallet Recovery Scams</h3>

<p>The seed phrase scam is one of the most common and most devastating forms of cryptocurrency theft. A scammer contacts a victim — often through a support forum, Discord server, or social media message — and poses as a helpful technical expert. The victim may be having a genuine problem with their wallet. The "helper" offers to assist and eventually asks for the seed phrase, claiming it is needed for technical verification or wallet recovery. The moment the victim shares it, every dollar in that wallet is gone.</p>

<p>There is a variant where scammers post fake support contact information for well-known wallets and exchanges in online searches. A victim searches for "MetaMask customer support" and finds a fake number, calls it, and is walked through a process that culminates in providing their seed phrase. Legitimate wallet software companies do not provide phone support. If you find a phone number claiming to be Ledger, Trezor, or MetaMask support, it is a scam.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "Exchange Security — Choosing and Using Platforms Safely",
    page_start: 44,
    page_end: 55,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: Exchange Security — Choosing and Using Platforms Safely</h2>

<p>Most people who buy cryptocurrency do so through a centralized exchange — a company that acts as a marketplace where buyers and sellers of cryptocurrency are matched. Exchanges are the on-ramp to the crypto world, and choosing the right one and using it securely is essential.</p>

<h3>Regulated vs. Offshore Exchanges</h3>

<p>In the United States, major cryptocurrency exchanges must register with the Financial Crimes Enforcement Network (FinCEN) and comply with anti-money-laundering regulations. Exchanges like Coinbase, Kraken, and Gemini are U.S.-registered, regulated entities that must follow Know Your Customer (KYC) rules, keep customer funds separate from company funds, and submit to regulatory oversight. They are not risk-free — exchange hacks and failures do happen — but they operate within a legal framework.</p>

<p>Offshore exchanges operate in jurisdictions with little or no regulatory oversight. Some are legitimate businesses. Many are not. The collapse of FTX in 2022, which wiped out billions in customer funds, demonstrated that even seemingly legitimate exchanges can fail catastrophically. FTX was not offshore, but it behaved as though rules did not apply to it. The lesson is clear: if an exchange is not registered in the United States and does not follow U.S. regulations, you have very little recourse if something goes wrong.</p>

<p>Rule of thumb: if a trading platform was recommended to you by someone you met online, and you cannot verify it through major cryptocurrency news sources, assume it is fraudulent until proven otherwise.</p>

<h3>Two-Factor Authentication: Use an App, Not SMS</h3>

<p>Every legitimate exchange offers two-factor authentication (2FA), which requires a second verification step beyond your password when logging in. This is essential and you should enable it on every exchange account you use.</p>

<p>However, not all 2FA is equally secure. SMS-based 2FA — where a code is texted to your phone — is vulnerable to SIM-swapping attacks, in which a criminal convinces your mobile carrier to transfer your phone number to a SIM card they control. Once they have your number, they receive your 2FA codes.</p>

<p>Use an authenticator app instead. Google Authenticator, Authy, and Microsoft Authenticator generate time-based codes on your device that cannot be intercepted through SIM swapping. This single change significantly raises the difficulty of compromising your exchange account.</p>

<h3>Withdrawal Address Whitelisting</h3>

<p>Many exchanges offer a feature called withdrawal address whitelisting. When enabled, you can only send cryptocurrency from your exchange account to addresses you have pre-approved. If a hacker gains access to your account, they cannot send your funds to an address you have not previously authorized. Enable this feature on any exchange that offers it — it is one of the best protections against account compromise.</p>

<h3>The FTX Case Study: When Exchanges Collapse</h3>

<p>In November 2022, FTX — at the time one of the world's largest cryptocurrency exchanges — collapsed almost overnight. It emerged that the company had been using customer funds to prop up a sister trading firm, had massive undisclosed liabilities, and was essentially insolvent. Customers who held funds on FTX were unable to withdraw them. Billions in customer deposits were lost.</p>

<p>The FTX collapse is a vivid illustration of why security experts advise against keeping large amounts of cryptocurrency on exchanges for extended periods. Exchanges hold your private keys. If the exchange fails, your funds may not be recoverable. For amounts you are actively trading, an exchange is a practical necessity. For amounts you are holding long-term, consider moving them to a personal hardware wallet where you control the keys.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "The Most Common Crypto Scams",
    page_start: 56,
    page_end: 65,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: The Most Common Crypto Scams</h2>

<p>Cryptocurrency fraud takes many forms, but most schemes fall into a handful of recognizable categories. Understanding the patterns makes them much easier to spot in the wild.</p>

<h3>Rug Pulls and Fake Tokens</h3>

<p>A rug pull occurs when developers create a new cryptocurrency token, generate hype around it, attract investor funds, and then drain the liquidity pool and disappear — "pulling the rug" out from under investors. Thousands of rug pulls happen every year. They are especially common on decentralized exchanges where new tokens can be listed without regulatory review. The warning signs include: anonymous developers, no audited smart contract, promises of extraordinary returns, and artificial urgency around a "limited window" to invest.</p>

<h3>Phishing for Wallet Access</h3>

<p>Phishing attacks in cryptocurrency target your private key or seed phrase through fake websites, fake apps, and fake customer support contacts. These are nearly identical to traditional phishing attacks, but the stakes are higher because there is no dispute process. Common tactics include fake exchange login pages designed to steal credentials, fake wallet restoration tools, and social media impersonation of well-known crypto projects.</p>

<h3>Giveaway Scams</h3>

<p>Giveaway scams claim that a celebrity, company, or well-known figure is doubling or otherwise multiplying cryptocurrency sent to a specific address. They use fake accounts impersonating Elon Musk, Coinbase, or crypto influencers. The mechanics are simple: you send crypto to participate in the "giveaway" and receive nothing in return. Elon Musk has never promised to double your Bitcoin. No legitimate entity ever will. Any "send crypto to receive more crypto" offer is a scam, every time, without exception.</p>

<h3>Fake Crypto Apps</h3>

<p>Fraudulent cryptocurrency apps appear in both the Apple App Store and Google Play Store. They mimic legitimate wallets and exchanges. After a user deposits funds, the app either disappears, freezes withdrawals, or simply keeps the funds. Before downloading any cryptocurrency app, verify the developer name carefully and cross-reference with the official project website.</p>

<h3>Cryptocurrency ATM Scams Targeting Ohio Seniors</h3>

<p>Ohio has seen a significant and growing problem with cryptocurrency ATM fraud targeting older residents. In this scam, a victim receives a call from someone impersonating the government, law enforcement, or a utility company, claiming the victim owes money immediately or faces arrest or service cutoff. They are directed to a cryptocurrency ATM — which exist in many Ohio gas stations and convenience stores — to pay. They purchase cryptocurrency and send it to an address the scammer provides. The Ohio Attorney General's office and the Ohio Department of Commerce have both issued repeated warnings about this scam. Law enforcement and government agencies will never ask you to pay with cryptocurrency at an ATM.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "Pig Butchering — The Long Con That Ruins Lives",
    page_start: 66,
    page_end: 76,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Pig Butchering — The Long Con That Ruins Lives</h2>

<p>Of all the cryptocurrency scams documented in recent years, pig butchering is the one that has caused the most total damage. The FBI has identified it as one of the most financially devastating fraud schemes in history. In 2023, pig butchering accounted for a significant share of the $5.6 billion in reported crypto fraud losses. And unlike many scams, it is specifically designed to work on intelligent, educated, financially successful people.</p>

<h3>How It Works</h3>

<p>The name comes from a Chinese phrase for the practice of fattening a pig before slaughter. The scam begins with unsolicited contact — a text message to the wrong number, a connection request on LinkedIn, a match on a dating app. The initial contact is always friendly, low-pressure, and seemingly accidental. "Oh, I think I texted the wrong person, I'm so sorry!" is a common opener.</p>

<p>What follows is weeks or months of relationship building. The scammer — who is often a real person working in a criminal operation overseas, sometimes themselves a trafficking victim — develops genuine-seeming rapport with the target. They may share personal stories, express interest in the victim's life and work, offer emotional support. They present as a sophisticated international professional with expertise in cryptocurrency investing. They never ask for money. They invest time.</p>

<p>At some point, casually, the conversation turns to cryptocurrency investment. The scammer mentions impressive returns from a trading platform. They offer to show the victim how it works. They walk them through creating an account on what appears to be a sophisticated, professional trading platform with real-looking graphs, customer service chat, and a portfolio dashboard. The victim makes a small investment and sees it "grow" dramatically. They withdraw a small amount successfully, which builds trust completely.</p>

<p>Then the amounts get larger. The victim may invest their savings, take out loans, ask family for money. The fake platform shows extraordinary profits. And then — either when the scammer judges the victim is fully committed, or when the victim tries to withdraw a large amount — the platform freezes withdrawals, demands taxes or fees that must be paid before release, and eventually disappears entirely. Every dollar the victim put in is gone.</p>

<h3>Why Victims Are Not Naive</h3>

<p>The FBI and consumer protection researchers have repeatedly emphasized that pig butchering victims are not financially unsophisticated. They include doctors, lawyers, engineers, financial professionals, and small business owners. The scam works not by exploiting ignorance but by exploiting trust — and the trust-building phase is conducted by professionals who do this full time, often for criminal organizations.</p>

<p>Ohio victims have been documented across the state, in cities and rural areas alike. The shame of having lost large sums, sometimes life savings, to what in retrospect seems like an obvious fraud, keeps many victims from reporting. But reporting matters: the FBI's IC3 data drives investigation priorities and policy responses.</p>

<h3>What To Do</h3>

<p>If you are contacted by someone you have never met who eventually introduces you to a cryptocurrency trading opportunity, treat it as a pig butchering attempt until proven otherwise. The proof it is legitimate is not that the platform looks professional — fake platforms are designed by professional fraudsters. The proof is verifying the platform through independent sources completely disconnected from the person who introduced it to you. Report suspected pig butchering contacts to the FBI's IC3 at ic3.gov and the FTC at reportfraud.ftc.gov.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Fake ICOs, Pump-and-Dump, and Influencer Fraud",
    page_start: 77,
    page_end: 85,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Fake ICOs, Pump-and-Dump, and Influencer Fraud</h2>

<p>Not all cryptocurrency fraud involves a personal relationship. Some of the most damaging schemes operate at scale, using marketing, social proof, and sometimes celebrity to attract victims who would never fall for a personal approach.</p>

<h3>Initial Coin Offerings and Fake Projects</h3>

<p>An Initial Coin Offering (ICO) is a fundraising mechanism where a new cryptocurrency project sells tokens to early investors in exchange for funding. Legitimate ICOs have funded real technology projects. They have also been the vehicle for some of the most audacious fraud in crypto history. Fake ICOs publish professional-looking whitepapers, build impressive websites, claim partnerships with major companies, and collect investor funds before disappearing. Red flags include anonymous or unverifiable founding teams, whitepapers with no technical substance, no verifiable GitHub code repository, and claims of revolutionary technology with no working prototype.</p>

<h3>Pump-and-Dump Schemes</h3>

<p>Pump-and-dump schemes involve coordinated buying of a low-value token to drive up its price, combined with aggressive marketing to attract outside buyers, followed by the original organizers selling their holdings at the inflated price. The price collapses, and late investors lose most or all of what they put in. These schemes are illegal under U.S. securities law, but they are difficult to prosecute in the cryptocurrency context because the legal status of many tokens is contested. They operate primarily through Telegram groups, Discord servers, and social media accounts that create artificial excitement around a specific token.</p>

<h3>Celebrity Endorsement Fraud</h3>

<p>The line between legitimate celebrity cryptocurrency endorsements and fraud has been blurred, sometimes by celebrities themselves. In 2022, Kim Kardashian paid $1.26 million to settle SEC charges that she promoted a crypto token without disclosing that she was paid to do so. Her promotion contributed to a pump-and-dump that cost investors millions. Floyd Mayweather, DJ Khaled, and numerous other celebrities have faced similar charges.</p>

<p>The lesson is simple: celebrity association with a cryptocurrency project is not validation. In the crypto space, it may actually be a warning sign. Many legitimate projects do not rely on celebrity promotions. Many fraudulent ones do.</p>

<h3>How to Verify a Crypto Project</h3>

<p>Before putting any money into a cryptocurrency project, regardless of who recommended it:</p>
<ul>
  <li>Find the founding team and verify their identities independently through LinkedIn and other sources.</li>
  <li>Read the whitepaper critically. Does it describe a real technical problem being solved, or does it use jargon to obscure a lack of substance?</li>
  <li>Check for a public GitHub repository. Legitimate blockchain projects publish their code openly.</li>
  <li>Look for a professional smart contract audit from a recognized security firm.</li>
  <li>Search the project name combined with "scam," "fraud," and "review" on independent platforms.</li>
</ul>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "NFT Scams and Digital Asset Fraud",
    page_start: 86,
    page_end: 94,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: NFT Scams and Digital Asset Fraud</h2>

<p>NFTs — Non-Fungible Tokens — had one of the most dramatic boom-and-bust cycles in recent financial history. In 2021 and early 2022, NFT sales reached tens of billions of dollars. By 2023, the market had collapsed by more than 95% from its peak. That collapse left behind a landscape littered with fraud, and the tactics developed in the NFT space continue to be used to target new victims.</p>

<h3>What NFTs Actually Are</h3>

<p>An NFT is a record on a blockchain that certifies ownership of a specific digital asset — typically an image, video, or piece of music. Buying an NFT does not give you a copyright to the underlying work. It does not prevent others from copying and viewing the digital file. What you receive is a blockchain record stating that a specific wallet address owns that specific token. The value of that record depends entirely on what other people are willing to pay for it — and in most cases, after the 2022 crash, that value approached zero.</p>

<h3>Rug Pulls in NFT Projects</h3>

<p>NFT rug pulls follow the same pattern as cryptocurrency rug pulls: developers build hype around a new collection, collect funds from buyers, then abandon the project. Thousands of NFT rug pulls occurred during the boom years. Warning signs are identical to other crypto rug pulls: anonymous teams, no verifiable roadmap delivery history, and extreme urgency around purchase timing.</p>

<h3>Discord Compromises and Wallet Drains</h3>

<p>Many NFT communities organize on Discord, a chat platform popular in gaming and online communities. When a Discord server's administrative account is compromised, fraudsters can post malicious links to the community. Members who click the links and connect their cryptocurrency wallets to the malicious site can have their entire wallet contents drained in seconds through a fraudulent transaction approval. This attack pattern — sometimes called a "wallet drainer" — has stolen hundreds of millions of dollars from NFT holders. The OpenSea NFT marketplace has been impersonated repeatedly in phishing attacks using this vector.</p>

<h3>Protecting Yourself in the Digital Asset Space</h3>

<p>If you interact with NFTs or digital asset communities, never click links posted in Discord servers without verifying them directly on the official project website. Consider using a separate "burner" wallet — an empty wallet with no significant holdings — when interacting with new or unverified NFT projects. Never approve unknown smart contract interactions without understanding exactly what permissions you are granting.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Recovering From Crypto Fraud — and Why It's Hard",
    page_start: 95,
    page_end: 103,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Recovering From Crypto Fraud — and Why It's Hard</h2>

<p>If you have been the victim of cryptocurrency fraud, the first thing to understand is that recovery is legally and technically difficult in ways that are different from most other financial fraud. This is not meant to discourage you from reporting — reporting matters enormously, both for your own case and for the broader effort to shut down criminal operations. But you need to understand the realistic landscape so you can make informed decisions about next steps.</p>

<h3>Why Recovery Is So Difficult</h3>

<p>As established in Chapter 2, blockchain transactions are irreversible. Once cryptocurrency leaves your wallet or exchange account, reversing the transaction is not possible. Law enforcement agencies including the FBI have specialized units that use blockchain analytics to trace cryptocurrency flows, and they have successfully seized assets from criminal operations. But returning those assets to individual victims is a complex legal process that can take years, and not every case results in recovery.</p>

<h3>Where to Report</h3>

<ul>
  <li><strong>FBI Internet Crime Complaint Center (IC3):</strong> ic3.gov — the primary federal reporting channel for cryptocurrency fraud.</li>
  <li><strong>Federal Trade Commission (FTC):</strong> reportfraud.ftc.gov — generates data used to pursue scammers and provides victim resources.</li>
  <li><strong>Ohio Attorney General's Office:</strong> ohioattorneygeneral.gov — handles consumer fraud cases in Ohio and can pursue civil remedies against Ohio-based fraudsters.</li>
  <li><strong>Ohio Department of Commerce Division of Securities:</strong> for investment fraud involving cryptocurrency.</li>
  <li><strong>Your local police department:</strong> File a report even if local police have limited crypto expertise. The report creates a record and may contribute to larger investigations.</li>
</ul>

<h3>Blockchain Analytics Firms</h3>

<p>Private blockchain analytics firms like Chainalysis, Elliptic, and CipherTrace specialize in tracing cryptocurrency flows. Law enforcement agencies regularly work with these firms. Some offer victim services, though these typically involve costs and no guarantees. Do not pay any company claiming to be able to recover your specific funds without very careful due diligence.</p>

<h3>The Recovery Scam — A Second Victimization</h3>

<p>One of the most cruel patterns in cryptocurrency fraud is the "recovery scam." After losing money to a crypto scheme, victims are approached by people claiming to be cryptocurrency recovery specialists, private investigators, or law enforcement officials who can recover the funds for a fee. These are almost always additional scams. There is no class of professionals who can reliably recover cryptocurrency from sophisticated international fraud operations for an upfront fee. If someone contacts you offering to recover your lost crypto funds, they are almost certainly running a follow-on scam targeting an already-victimized person.</p>
</article>`,
  },

  {
    chapter_number: 10,
    chapter_title: "Tax and Legal Considerations in Ohio",
    page_start: 104,
    page_end: 112,
    content_html: `<article class="chapter-content">
<h2>Chapter 10: Tax and Legal Considerations in Ohio</h2>

<p>Cryptocurrency has significant tax and legal implications that many users do not fully appreciate until they face an unexpected IRS bill or discover that their crypto activity has legal consequences they did not anticipate. Ohio residents have some additional considerations given the state's history with cryptocurrency regulation.</p>

<h3>The IRS Treats Crypto as Property</h3>

<p>The Internal Revenue Service treats cryptocurrency as property, not currency. This has a critical implication: every time you sell, trade, or use cryptocurrency to purchase something, you may trigger a capital gains tax event. If you bought Bitcoin at $20,000 and sold it at $40,000, you owe capital gains tax on the $20,000 gain. If you bought Bitcoin at $40,000 and sold it at $20,000, you have a capital loss that may offset other gains.</p>

<p>You must track the cost basis — the original purchase price — of every cryptocurrency purchase in order to correctly calculate gains and losses. Exchanges provide transaction histories, but those records are your responsibility to maintain and report. The IRS now explicitly asks about cryptocurrency on the front page of Form 1040.</p>

<h3>Ohio's Cryptocurrency History</h3>

<p>Ohio was the first U.S. state to allow businesses to pay state taxes using Bitcoin, through a program launched in 2018. That program was suspended by the Ohio State Board of Deposits in 2019 pending legal review, but Ohio has maintained a generally cryptocurrency-friendly regulatory posture. Ohio's legislature has considered several crypto-friendly bills, and the state's political leadership has often spoken positively about blockchain innovation.</p>

<p>Ohio also issued cryptocurrency-backed municipal bonds in a pilot program, making it one of the most crypto-forward states in the Midwest. This history of engagement means that Ohio has a relatively robust regulatory framework for cryptocurrency businesses — Ohio money transmitters that handle cryptocurrency must be licensed by the Ohio Department of Commerce Division of Financial Institutions.</p>

<h3>Reporting Fraud Losses on Your Taxes</h3>

<p>If you have been the victim of cryptocurrency fraud, consult a tax professional about how to report your losses. Fraud losses may be deductible under certain circumstances, though the Tax Cuts and Jobs Act of 2017 significantly limited personal casualty and theft loss deductions. A CPA or tax attorney familiar with cryptocurrency can help you navigate this correctly.</p>
</article>`,
  },

  {
    chapter_number: 11,
    chapter_title: "Building a Cautious Crypto Strategy — If You Choose to Invest",
    page_start: 113,
    page_end: 140,
    content_html: `<article class="chapter-content">
<h2>Chapter 11: Building a Cautious Crypto Strategy — If You Choose to Invest</h2>

<p>This book has focused primarily on protection from fraud. But many readers are genuinely curious about cryptocurrency as an investment, and it would be incomplete not to address how a cautious, informed person might approach it. This is not financial advice — every person's financial situation is different, and you should consult a qualified financial advisor before making investment decisions. What follows is a framework for thinking carefully about cryptocurrency exposure, not a recommendation to buy or sell any particular asset.</p>

<h3>The 5% Rule</h3>

<p>Most financial advisors who are willing to discuss cryptocurrency at all suggest that if you are going to hold any, it should represent no more than 5% of your overall investment portfolio — and for many people, 1-2% is more appropriate. The core question to ask yourself before any cryptocurrency purchase is simple: can I afford to lose every dollar I put into this? Cryptocurrency markets have experienced drops of 70-80% from peak to trough. That is not a theoretical risk. It has happened repeatedly. Any money you cannot afford to lose should not be in cryptocurrency.</p>

<h3>Dollar-Cost Averaging</h3>

<p>Dollar-cost averaging means purchasing a fixed dollar amount of an asset at regular intervals regardless of price, rather than attempting to time the market. For someone who has decided to hold a small amount of Bitcoin or Ethereum as a long-term speculative position, buying $50 per month consistently reduces the risk of buying a large amount right before a major price drop.</p>

<h3>Stick to Regulated Platforms</h3>

<p>If you buy cryptocurrency, use only U.S.-regulated exchanges: Coinbase, Kraken, or Gemini. These platforms are not without risk, but they operate within a legal framework that provides some consumer protections. Enable two-factor authentication using an authenticator app. Use withdrawal address whitelisting. For any holdings you are not actively trading, transfer to a hardware wallet.</p>

<h3>Tell a Trusted Person</h3>

<p>One of the practical risks of cryptocurrency is that private keys and seed phrases can be lost permanently. Tell a trusted family member or financial advisor that you hold cryptocurrency, where it is held, and where they could find access instructions in an emergency. Write instructions that are secure enough to protect against theft but accessible enough to be useful if you are incapacitated.</p>

<h3>Keep Records</h3>

<p>Maintain a spreadsheet or use dedicated crypto tax software like CoinTracker or Koinly to record every purchase, sale, and transfer. Your future self and your tax preparer will thank you. Good records also make it easier to detect unauthorized transactions in your accounts.</p>

<p>Cryptocurrency is neither the guaranteed path to wealth that promoters claim nor the unmitigated disaster that detractors insist. It is a volatile, high-risk asset class that has produced both enormous gains and catastrophic losses for real people. Anyone who approaches it with clear eyes, appropriate caution, and protection from the fraud environment described in this book is in the best possible position to make informed decisions.</p>
</article>`,
  },
];
