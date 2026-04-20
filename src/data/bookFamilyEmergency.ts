import type { BookChapter } from "@/config/bookCatalog";

/** Full content for Family Emergency Communication Playbook (~95 pages) */
export const FAMILY_EMERGENCY_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Family Emergency Communication Playbook</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">A Step-by-Step Plan for When Normal Stops Working</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>Published by InVision Network Press, Kettering, Ohio 45440</p><p><em>For educational purposes only.</em></p></div></article>`,
  },
  {
    chapter_number: 1,
    chapter_title: "When Normal Stops Working",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
    <h2>Chapter 1: When Normal Stops Working</h2>

    <p>It is 2:17 in the afternoon on a Wednesday in April when the tornado siren goes off in Xenia. You are at work. Your spouse is picking up your youngest from school. Your older daughter is at soccer practice across town. Your mother lives alone three miles away. Your cell phone is in your pocket — but so is everyone else's cell phone in the Miami Valley, and the network is overwhelmed within ninety seconds of the warning. Calls won't connect. Texts queue and fail. Your family is scattered across four locations and you have no way to reach any of them.</p>

    <p>This is not a hypothetical scenario engineered for dramatic effect. Some version of it has happened to Ohio families in every major weather event of the past decade. The March 2024 tornado outbreak that moved through Licking County. The December 2022 ice storm that knocked out power to 230,000 Ohio households. The flash flooding that struck the Scioto River communities in 2023. Each of these events separated families, overwhelmed communication networks, and exposed the gap between what families assumed their emergency plan was and what their emergency plan actually was.</p>

    <p>In most cases, the answer is that they had no plan. They had assumptions. They assumed they could call each other. They assumed the kids' school would know what to do. They assumed they would figure it out when it happened. These assumptions are understandable — they reflect the experience of daily life, in which communication technology works reliably and emergencies are other people's problems. But the nature of emergencies is that they happen precisely when reliability fails.</p>

    <h3>Why Family Communication Plans Fail</h3>

    <p>Family communication plans fail for predictable reasons. The most common is that they are never actually made — families intend to create a plan and do not. The second most common is that a plan exists in one person's head but has not been shared with or practiced by every family member. The third is that the plan depends entirely on technology that may not work during the emergency itself. A plan that consists of "we'll call each other" is not a plan. It is an assumption.</p>

    <p>Cell networks are designed for normal load, not emergency load. When a significant event occurs — a tornado warning, a large-scale power outage, a school lockdown — everyone in the affected area attempts to make calls and send messages simultaneously. The network cannot handle the volume, and it prioritizes emergency services over consumer traffic. This is by design. It is also the reason that text messages frequently get through when calls cannot: texts require less bandwidth and are queued for delivery when capacity is available. But during major events, even texts fail.</p>

    <p>Landlines are more reliable than cell networks during most emergencies — they do not depend on the same infrastructure. But most Ohio households no longer have a landline. Internet-based communication (apps like WhatsApp, Facebook Messenger, Signal) continues to work as long as internet infrastructure is functioning, which it often is even when cell voice calls are not. This is why communication plans should not rely on a single channel.</p>

    <h3>Ohio's Specific Risk Profile</h3>

    <p>Ohio's geography and climate create a specific set of emergency risks that make family communication planning urgent rather than optional. The state lies in what meteorologists call "Tornado Alley's northern extension" — the Miami Valley and central Ohio communities see an average of nineteen tornadoes per year, with the most severe seasons producing events comparable to the 1974 Super Outbreak that devastated Xenia. The Ohio River and its tributaries create flooding risk in southern communities including Cincinnati, Portsmouth, and Gallipolis. Lake Erie's proximity produces severe winter weather in northeastern Ohio, with snow squalls that can reduce visibility to near zero in minutes on interstate highways. The state's aging infrastructure — particularly electrical distribution networks — is vulnerable to ice storms and high winds.</p>

    <p>Ohio also has specific industrial and chemical infrastructure risks. The state has more than two hundred facilities classified as "Extremely Hazardous Substances" sites under federal law. In 2023, the East Palestine train derailment underscored that chemical emergencies can occur in residential areas with very little warning, requiring immediate shelter-in-place or evacuation decisions from families who may have no information about the nature of the hazard.</p>

    <h3>What This Book Builds</h3>

    <p>This book will help your family build a communication plan that actually works — one that does not depend on any single technology, that every family member can execute without adult supervision, and that accounts for the real scenarios Ohio families face. It covers the construction of your family communication tree, protocols for specific emergency types, how to handle medical emergencies and account compromises, and how to protect your family when someone calls claiming to be a family member in trouble. It also includes guidance on keeping your plan current so that it reflects your family's actual circumstances rather than who you were three years ago.</p>

    <p>Building this plan takes about two hours. Updating it takes thirty minutes per year. The protection it provides is without limit — because a family that knows what to do when normal stops working is a family that can find each other, support each other, and get through whatever comes.</p>

    <h3>The One Thing to Do Before Turning the Page</h3>

    <p>Before you read further, write down the phone numbers of every person in your immediate family from memory. Not from your phone — from memory. If you cannot do it, you have already identified the first gap in your emergency plan. Phone numbers stored only in a device are inaccessible when the device is lost, dead, or stolen — which happens with notable frequency during exactly the kind of emergency in which you most need them.</p>
    </article>`,
  },
  {
    chapter_number: 2,
    chapter_title: "Building Your Family Communication Tree",
    page_start: 17,
    page_end: 28,
    content_html: `<article class="chapter-content">
    <h2>Chapter 2: Building Your Family Communication Tree</h2>

    <p>A family communication tree is a pre-agreed structure that defines who contacts whom, through which channels, in which order, when normal communication fails. It is the difference between a family that self-organizes during a crisis and a family that each tries to reach every other member simultaneously, clogging whatever channels are working with duplicate calls that prevent the information from actually moving.</p>

    <h3>Primary and Backup Contacts</h3>

    <p>Each family member should have a designated primary contact (the first person to reach during an emergency) and a backup contact (the person to reach if the primary is unavailable or unreachable). For most families, the primary contact is the parent or guardian who is most likely to have information and decision-making authority. The backup contact should be someone outside the immediate household — because if your household is affected by the emergency, both you and your spouse may be unavailable simultaneously.</p>

    <p>Children should know both contacts by heart. Practice this. Ask your child periodically to recite both phone numbers without looking them up. A seven-year-old can memorize two phone numbers. A twelve-year-old can memorize four. This is not optional — it is the foundational skill that makes everything else in this book work.</p>

    <h3>The Out-of-State Contact Rule</h3>

    <p>One of the most consistently recommended elements of family emergency communication planning — from FEMA, from the American Red Cross, from Ohio's Emergency Management Agency — is designating an out-of-state contact as your family's communication hub. The reason is counterintuitive but important: during a regional disaster, local cell networks are overloaded while long-distance calls to out-of-state numbers can sometimes connect more reliably. More importantly, an out-of-state contact who is not affected by the emergency can serve as a central information point, receiving updates from different family members and relaying them to others.</p>

    <p>This contact should be a family member or trusted friend outside Ohio who agrees to serve this role, has all family members' contact information, and knows what to do when they receive an emergency message. Rotate a call to this person into your quarterly plan review so they remain engaged with the responsibility.</p>

    <h3>Group Text vs. App-Based Communication</h3>

    <p>Standard SMS text messages work when cell data is unavailable, because they use a different channel (the SS7 signaling network) than data-dependent apps. Group SMS threads are slower and less feature-rich than apps like WhatsApp or Signal, but they work in more conditions. App-based messaging requires data connectivity. For emergency communication, know which channel you are using and why: SMS for reliability, data-dependent apps for richer communication when infrastructure is working.</p>

    <p>Establish a family group text specifically for emergencies. Give it a distinct name that signals its purpose. Test it quarterly by sending a "plan check" message that everyone is expected to respond to. This tests both that the thread is still active and that every family member knows it exists.</p>

    <h3>The Printed Backup Card</h3>

    <p>Every family member old enough to carry a wallet or school bag should carry a laminated printed card with: every family member's phone number, the out-of-state contact's number, the family's designated meeting locations (primary and backup), and the address and phone number of a trusted local contact such as a neighbor or nearby family member. This card works when every device is dead, lost, or confiscated. Update it whenever any information changes. Print extras and keep one in each car, in each child's school bag, and in each adult's desk at work.</p>

    <h3>What Every Family Member Needs to Know</h3>

    <ul>
      <li>Full home address (children often know their street but not the full address including city and ZIP)</li>
      <li>Primary parent's cell number by heart</li>
      <li>Backup contact's number by heart</li>
      <li>Out-of-state contact's number (can be on the card)</li>
      <li>Family rally point — the place everyone goes if the home is inaccessible</li>
      <li>Backup rally point — a second location if the primary is also inaccessible</li>
      <li>School's emergency dismissal procedure and designated pickup location</li>
    </ul>
    </article>`,
  },
  {
    chapter_number: 3,
    chapter_title: "Natural Disaster Protocols — Ohio Weather Events",
    page_start: 29,
    page_end: 39,
    content_html: `<article class="chapter-content">
    <h2>Chapter 3: Natural Disaster Protocols — Ohio Weather Events</h2>

    <p>Ohio's weather is genuinely dangerous, and the danger is unevenly distributed. Families in the Miami Valley face different primary risks than families along the Ohio River, who face different risks than families in the Lake Erie snowbelt. Your family's natural disaster protocols should be calibrated to your specific geography. This chapter covers the three most common natural disaster scenarios for Ohio families and the decision-making framework for each.</p>

    <h3>Tornado Protocol</h3>

    <p>Ohio averages nineteen tornadoes per year. Tornado season peaks in April through June, but significant events have occurred in every month. The tornado protocol decision tree has two branches: shelter-in-place and evacuation. For most Ohio families, a tornado warning means shelter-in-place. Evacuating during a tornado warning is almost always the wrong decision — it puts family members on roads where they are more vulnerable than in a sturdy building.</p>

    <p>Shelter-in-place for a tornado: move to the lowest floor of your building, interior room without windows (a basement is ideal; an interior bathroom or closet on the ground floor is the next best option), cover yourself with mattresses, blankets, or heavy coats to protect against debris. Know this location before the warning sounds. If family members are in different buildings during a warning, each person shelters in place at their location rather than attempting to travel to reunite.</p>

    <p>Wireless Emergency Alerts (WEA) push tornado warnings directly to cell phones in the warning area — these are the loud alert sounds that cannot be turned off. Ohio's Integrated Public Alert and Warning System (IPAWS) also activates sirens. Both signal the same response: go to your shelter location immediately. Do not wait for "confirmation" of a visible funnel cloud. Warning systems are issued before tornadoes are visible.</p>

    <h3>Winter Storm Protocol</h3>

    <p>Ohio winter storms range from manageable snow accumulations to the kind of ice storms that down power lines and close highways for days. The winter storm protocol centers on two decisions: whether to shelter in place or leave before conditions deteriorate, and how to communicate if power and cellular infrastructure fail.</p>

    <p>Key winter storm preparation: keep vehicles with at least half a tank of gas during winter months (fuel is unavailable during extended power outages), have at least three days of food and water that does not require cooking, know the location of your county's designated warming center (Ohio EMA maintains a searchable database), and have a battery-powered or hand-crank NOAA weather radio. Cell phones die; battery-powered radios do not.</p>

    <h3>Flash Flooding Protocol</h3>

    <p>Ohio river communities — Cincinnati, Portsmouth, Gallipolis, Marietta, and communities along the Muskingum, Scioto, and Great Miami rivers — face flash flooding risk that can develop with very little warning. The Ohio River's flood stage is monitored by the National Weather Service at Louisville and Cincinnati offices; sign up for river stage alerts through weather.gov. Flash flood watches and warnings are also pushed through WEA.</p>

    <p>The cardinal rule of flooding: do not drive through water of unknown depth. In Ohio, approximately half of all flood fatalities involve vehicles. Six inches of moving water can sweep a person off their feet. Twelve inches of moving water can sweep away most vehicles. Identify your county's highest-ground public buildings before flood season — these are your shelter options if roads are impassable. The Ohio EMA (ema.ohio.gov) maintains county-level emergency contact information and shelter registries.</p>

    <h3>Family Rally Points for Natural Disasters</h3>

    <p>Designate a primary and backup rally point for each disaster type. These may be different locations: a tornado rally point might be your basement; a flooding rally point should be a high-ground location. Update these points whenever you move, whenever a designated location closes or changes, and annually as part of your plan review. Ensure every family member knows all rally points by location description, not just by address — addresses are not useful when roads are unmarked or destroyed.</p>
    </article>`,
  },
  {
    chapter_number: 4,
    chapter_title: "Medical Emergencies — Hospital Communication and Health Information",
    page_start: 40,
    page_end: 50,
    content_html: `<article class="chapter-content">
    <h2>Chapter 4: Medical Emergencies — Hospital Communication and Health Information</h2>

    <p>A medical emergency involving a family member is one of the most disorienting events a family can face, and the disorientation is not just emotional — it is logistical. Who makes decisions if the patient cannot? Who has the authority to receive medical information? What medications is the patient taking? What are their allergies? These questions have answers, but those answers need to exist before the emergency, not during it.</p>

    <h3>Designated Medical Decision-Maker</h3>

    <p>Ohio law designates a hierarchy of medical decision-makers for patients who are incapacitated: spouse, then adult children, then parents, then adult siblings, then other family members. If you want someone other than your legal spouse to make decisions — or if you want a specific spouse rather than leaving it to the legal hierarchy — you need a Healthcare Power of Attorney (HCPOA) document. Ohio's standard HCPOA form is available through the Ohio State Bar Association and most hospitals. It designates a specific person as your healthcare agent and can specify what decisions they can and cannot make.</p>

    <p>Every adult in your family should have a signed, witnessed HCPOA. Copies should be held by the agent, by each adult family member, by your primary care physician, and in a known location at home. Electronic copies on your phone are useful but not sufficient — hospitals prefer original or certified paper documents, especially in time-sensitive situations.</p>

    <h3>What to Bring to the ER</h3>

    <p>Emergency rooms function better when they have accurate information from the start. Prepare a one-page medical summary for each family member containing: full name and date of birth, insurance information (carrier, member ID, group number), current medications with dosages, known allergies and reactions, current diagnoses, primary care physician's name and number, and emergency contacts. Keep a printed copy in each vehicle's glove box and a digital copy accessible on your phone. Update this document every six months or whenever medications or conditions change.</p>

    <h3>Communicating With Out-of-Area Family</h3>

    <p>When a family member is hospitalized, designating a single point of contact for information — one person who receives updates from the medical team and relays them to extended family — prevents the fragmented, contradictory information flow that worsens family distress during medical crises. This person should be designated in advance, should have the authority to receive HIPAA-protected information (which requires either being legally designated as a healthcare agent or being provided authorization by the patient), and should be someone capable of fielding multiple emotional calls without becoming overwhelmed.</p>

    <h3>OhioHealth and Cleveland Clinic Family Portals</h3>

    <p>Both OhioHealth (the Columbus-based system) and Cleveland Clinic provide patient portal access that can be shared with designated family members. MyChart, used by both systems and most Ohio hospital networks, allows a patient to grant "proxy access" to another person, who can then view medical records, test results, and appointment information. Set up proxy access before an emergency — during an emergency, the patient may not be available to authorize it. The proxy access request process takes only a few minutes and is available through each system's patient portal.</p>

    <h3>HIPAA and Who Can Receive Information</h3>

    <p>HIPAA prevents healthcare providers from sharing patient information with family members who are not legally authorized to receive it — even spouses in some circumstances. The practical implication: if a family member is hospitalized and you call the hospital, they may not be able to confirm the patient is there or provide any information about their condition. Resolve this in advance by having each adult family member complete a HIPAA Release of Information authorization naming specific people who may receive medical information. Ask your primary care physician or the hospital's patient relations office for the appropriate form.</p>
    </article>`,
  },
  {
    chapter_number: 5,
    chapter_title: "Cyber Incidents — Account Compromise and Identity Theft as Family Emergencies",
    page_start: 51,
    page_end: 61,
    content_html: `<article class="chapter-content">
    <h2>Chapter 5: Cyber Incidents — Account Compromise and Identity Theft as Family Emergencies</h2>

    <p>A compromised email account or a stolen bank login is not merely an inconvenience. It is an emergency — one that can cascade rapidly if not addressed systematically. When a family's primary email account is compromised, the attacker typically uses it to reset passwords on every other account that uses that email address for recovery. Within hours, a family can lose access to banking, social media, shopping accounts, and cloud storage. Treating account compromise as an emergency — with the same urgency and systematic response as a medical or weather emergency — is the correct frame.</p>

    <h3>Shared Accounts and Single Points of Failure</h3>

    <p>Many families share accounts: a single Netflix login, a shared family Apple ID, one email address for household bills. Each shared account is a single point of failure. If that account is compromised, all family members are affected simultaneously. Shared accounts are also harder to secure because multiple people need to know the credentials, which increases the likelihood of phishing success or password reuse across insecure sites.</p>

    <p>The secure approach: each adult family member has a distinct, secure email address for financial and account recovery purposes. Subscription services can be shared, but financial and identity-linked accounts should not be. Children should not be listed as account holders on financial accounts they do not need access to.</p>

    <h3>The Family Cyber Emergency Checklist</h3>

    <p>When an account is compromised, work through this checklist in order:</p>
    <ul>
      <li><strong>Secure your email first.</strong> The email account used for password recovery is the master key. Change its password immediately from a device you trust, enable two-factor authentication if it is not already on, and review recent login activity and forwarding rules — attackers often set up forwarding rules to continue receiving your email after you change the password.</li>
      <li><strong>Change passwords on financial accounts.</strong> Banking, investment, and payment accounts (PayPal, Venmo, Zelle) are highest priority.</li>
      <li><strong>Contact your bank.</strong> Report the compromise and ask for a fraud alert on the account. Ohio banks are required to provide a dedicated fraud response line.</li>
      <li><strong>File an FTC report.</strong> IdentityTheft.gov (the FTC's identity theft resource) generates a personalized recovery plan and creates a report that some financial institutions require before reversing fraudulent transactions.</li>
      <li><strong>Place fraud alerts or credit freezes.</strong> A fraud alert requires creditors to verify your identity before opening new accounts in your name. A credit freeze is stronger — it prevents new credit accounts from being opened at all until you lift the freeze. Both are free.</li>
    </ul>

    <h3>Credit Freeze for All Family Members Including Children</h3>

    <p>Children are targets for identity theft specifically because their credit files are empty — there are no existing accounts to raise red flags. A child's Social Security number can be used to open fraudulent accounts that go undetected for years, sometimes until the child applies for their first student loan or credit card at eighteen. Placing a credit freeze on a child's file at all three major bureaus (Equifax, Experian, TransUnion) prevents this. The process for freezing a minor child's credit requires submitting documentation including the child's birth certificate and Social Security card — it takes about thirty minutes per bureau and provides lasting protection.</p>
    </article>`,
  },
  {
    chapter_number: 6,
    chapter_title: "Impersonation Emergencies — When Someone Claims to Be a Family Member",
    page_start: 62,
    page_end: 72,
    content_html: `<article class="chapter-content">
    <h2>Chapter 6: Impersonation Emergencies — When Someone Claims to Be a Family Member</h2>

    <p>Ohio families receive tens of thousands of impersonation scam calls every year. The most common is the "grandparent scam" — a caller who claims to be a grandchild in crisis, typically arrested or injured, needing immediate financial help. These calls are effective because they exploit exactly the instinct this book is about: the urgency of family emergency communication. A grandparent who has been told to prepare for emergencies is primed to respond quickly when an emergency call arrives. Scammers know this.</p>

    <h3>The Grandparent Scam Protocol</h3>

    <p>The scam unfolds in a predictable sequence. The caller says: "Grandma/Grandpa, it's me — I'm in trouble." The target, not hearing a name, asks "Is that you, [grandchild's name]?" — and the scammer confirms the name the target just provided. The call then involves a claimed emergency (car accident, arrest, medical situation) requiring immediate cash, wire transfer, or gift cards. A second caller may pose as a lawyer, police officer, or bail bondsman to add legitimacy.</p>

    <p>The defense is a verification protocol that all family members practice. When you receive an unexpected emergency call from someone claiming to be a family member:</p>
    <ul>
      <li>Do not confirm the name. Say "Who is this?" and wait for the caller to provide a name without prompting.</li>
      <li>Hang up and call the family member back on their known number from your contact list.</li>
      <li>Use the family code word (see below).</li>
      <li>Never send money — in any form — based on an unverified phone call.</li>
    </ul>

    <h3>Family Code Words</h3>

    <p>A family code word is a word or short phrase that any family member can use to verify their identity during a suspected scam call. The code word should be: something not derivable from public information about your family, known to every family member including children, never written in a text message or email (where it could be intercepted), and changed immediately if it is ever used in a real emergency. Practice the code word during family plan reviews so every member remembers it. If a caller claiming to be a family member cannot provide the code word when asked, end the call.</p>

    <h3>Call-Back Verification</h3>

    <p>The most reliable verification tool is the simplest: hang up and call back. Use the number stored in your phone — not a number provided by the caller. This one step defeats virtually every impersonation scam. Scammers create urgency specifically to prevent this step, insisting that hanging up will cause harm. That urgency is the tell. A real family member in a real emergency can be called back. An impersonator cannot answer a call to your family member's actual number.</p>

    <h3>Ohio Adult Protective Services</h3>

    <p>If an older adult family member has been victimized by an impersonation scam, contact Ohio Adult Protective Services through the county Department of Job and Family Services. APS has authority to investigate financial exploitation of vulnerable adults and can connect victims with legal and financial recovery resources. The Ohio Attorney General's Consumer Protection Section (800-282-0515) also accepts reports of elder fraud and can refer cases to law enforcement.</p>
    </article>`,
  },
  {
    chapter_number: 7,
    chapter_title: "Keeping Your Plan Current and Tested",
    page_start: 73,
    page_end: 82,
    content_html: `<article class="chapter-content">
    <h2>Chapter 7: Keeping Your Plan Current and Tested</h2>

    <p>An emergency communication plan that was accurate two years ago may be dangerously wrong today. People move. Phone numbers change. Children age out of some protocols and into others. Trusted contacts relocate. Insurance changes. A plan that reflects where your family was rather than where your family is creates false confidence — you believe you have a plan while the plan itself has become a liability.</p>

    <h3>Quarterly Plan Review</h3>

    <p>Set a quarterly calendar reminder to review your family emergency communication plan. The review takes approximately thirty minutes and covers: confirming that all contact numbers are current, verifying that every family member still knows the code word and primary contacts by heart, checking that emergency contact cards are up to date and distributed, confirming that your out-of-state contact is still reachable and engaged, reviewing whether any family circumstances have changed that would affect the plan, and sending the quarterly test message through the family emergency group text.</p>

    <h3>Events That Trigger an Immediate Update</h3>

    <p>In addition to quarterly reviews, certain life events should trigger an immediate plan update: any family member changes their phone number, any family member moves or changes their work location significantly, a child changes schools or after-school locations, a trusted contact becomes unavailable or less reliable, any financial account changes (new bank, new credit card), a new person joins the family (new partner, new baby, new dependent), or any family member's medical information changes significantly.</p>

    <h3>Tabletop Drills for Families</h3>

    <p>A tabletop drill is a conversation-based exercise in which you walk through an emergency scenario without physically executing it. "Imagine it's 3pm on a school day and a tornado warning is issued. Where is each person? What does each person do? How do you communicate?" Walk through the scenario, identify gaps, and update the plan to address them. Tabletop drills reveal assumptions that everyone holds but no one has verbalized — the moments when two family members describe completely different plans for the same scenario. One tabletop drill per year, combined with quarterly reviews, keeps a family plan genuinely current.</p>

    <h3>Digital vs. Printed Backup</h3>

    <p>Store your plan in both formats. Digital storage (a shared cloud document, a note in your family's shared account, a PDF in cloud storage) makes the plan accessible from any device and easily updated. Printed storage (laminated cards, a folder in a known home location, copies in each vehicle) works when devices are dead, lost, or inaccessible. Neither alone is sufficient. The printed backup is the insurance for the digital primary — not the other way around. Treat the printed copies as the authoritative version and update them every time the digital version changes.</p>
    </article>`,
  },
];
