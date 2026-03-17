import bookAiFundamentals from "@/assets/book-ai-fundamentals.jpg";
import bookBeingRealAi from "@/assets/book-being-real-ai.jpg";
import bookAuthPersonalities from "@/assets/book-auth-personalities.jpg";
import bookAuthFriendshipV2 from "@/assets/book-auth-friendship-v2.jpg";
import bookScamPrevention from "@/assets/book-scam-prevention.jpg";
import bookFamilySafety from "@/assets/book-family-safety.jpg";
import bookBusinessCyber from "@/assets/book-business-cyber.jpg";
import bookAiManagement from "@/assets/book-ai-management.jpg";
import bookDigitalPrivacy from "@/assets/book-digital-privacy.jpg";
import bookSeniorTechSafety from "@/assets/book-senior-tech-safety.jpg";
import bookDeepfakeDetection from "@/assets/book-deepfake-detection.jpg";
import bookPasswordSecurity from "@/assets/book-password-security.jpg";
import bookSocialMediaSafety from "@/assets/book-social-media-safety.jpg";
import bookOnlineShopping from "@/assets/book-online-shopping.jpg";
import bookIdentityTheft from "@/assets/book-identity-theft.jpg";
import bookCyberKids from "@/assets/book-cyber-kids.jpg";
import bookSmartHome from "@/assets/book-smart-home.jpg";
import bookPhishingDefense from "@/assets/book-phishing-defense.jpg";
import bookBankingSafety from "@/assets/book-banking-safety.jpg";
import bookMobileSecurity from "@/assets/book-mobile-security.jpg";
import bookCryptoDefense from "@/assets/book-crypto-defense.jpg";
import bookRomanceScam from "@/assets/book-romance-scam.jpg";
import bookVoiceClone from "@/assets/book-voice-clone.jpg";
import bookMedicareFraud from "@/assets/book-medicare-fraud.jpg";
import bookEmailSafety from "@/assets/book-email-safety.jpg";
import bookTaxScam from "@/assets/book-tax-scam.jpg";
import bookTechSupport from "@/assets/book-tech-support.jpg";
import bookGrandparentScam from "@/assets/book-grandparent-scam.jpg";
import bookInvestmentFraud from "@/assets/book-investment-fraud.jpg";
import bookCharityScam from "@/assets/book-charity-scam.jpg";

export const BOOK_AUTHOR = "InVision Network • Department of Literature";

export type BookCategory =
  | "ai"
  | "scam"
  | "family"
  | "seniors"
  | "privacy"
  | "social"
  | "finance"
  | "business"
  | "tech";

export interface BookChapter {
  chapter_number: number;
  chapter_title: string;
  content_html: string;
  page_start: number;
  page_end: number;
}

export interface BookItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  bulk_price: number;
  total_pages: number;
  image: string;
  tag: string;
  stripe_price_id: string;
  author: string;
  category: BookCategory;
  ideal_for: string;
  outcomes: string[];
  chapters: BookChapter[];
}

interface BookSeed extends Omit<BookItem, "author" | "bulk_price" | "chapters"> {
  risk_signals: string[];
  controls: string[];
  response_plan: string[];
  practice_plan: string[];
  chapter_titles: [string, string, string, string, string];
}

const CATEGORY_RELATIONS: Record<BookCategory, BookCategory[]> = {
  ai: ["privacy", "tech", "business"],
  scam: ["finance", "family", "seniors"],
  family: ["seniors", "scam", "social"],
  seniors: ["family", "scam", "finance"],
  privacy: ["ai", "tech", "business"],
  social: ["family", "scam", "privacy"],
  finance: ["scam", "business", "privacy"],
  business: ["ai", "finance", "privacy"],
  tech: ["ai", "privacy", "business"],
};

export const CATEGORY_LABELS: Record<BookCategory, string> = {
  ai: "AI Safety",
  scam: "Scam Prevention",
  family: "Family Safety",
  seniors: "Senior Safety",
  privacy: "Privacy",
  social: "Social Trust",
  finance: "Financial Safety",
  business: "Business Security",
  tech: "Technology Safety",
};

const CURRENT_SCENARIOS: Record<string, string> = {
  "book-ai-fundamentals":
    "Right now, AI is showing up inside search, email, customer service, productivity tools, and scam scripts all at once, which makes basic literacy more important than hype.",
  "book-scam-prevention":
    "Current scam campaigns move fluidly between phone, text, email, and fake support pages, so people feel pressured from several directions instead of one obvious message.",
  "book-family-safety":
    "Many households are now balancing children on shared devices, older relatives handling benefits online, and adults approving payments from phones while distracted.",
  "book-senior-tech":
    "Seniors are increasingly hit by benefit scares, fake account alerts, and voice-clone calls that sound personal enough to bypass ordinary caution.",
  "book-digital-privacy":
    "The privacy problem today is less about one dramatic hack and more about constant small disclosures that can be stitched together into a clear picture of your life.",
  "book-deepfake":
    "Synthetic voice and video are now realistic enough to create hesitation in even skeptical viewers, especially when paired with urgency, family emotion, or public controversy.",
  "book-password":
    "Credential theft keeps scaling because breached passwords are tested automatically across email, banking, shopping, payroll, and telecom accounts.",
  "book-social-media":
    "A large share of social-platform fraud starts with something that looks ordinary: a follow, a comment, a DM, a group invite, or a polished profile that feels familiar too quickly.",
  "book-online-shopping":
    "Shoppers are being hit by cloned storefronts, fake tracking texts, and social ads that vanish as soon as the payment clears.",
  "book-identity-theft":
    "Identity theft now often begins quietly through one leaked account, one phone-port event, or one credit trigger that nobody reviews in time.",
  "book-business-cyber":
    "Small organizations are now targeted with the same social engineering logic once aimed mostly at large enterprises, especially around payroll, vendor payments, and email access.",
  "book-ai-management":
    "Teams are adopting AI through side doors like browser tabs and unofficial subscriptions faster than internal policy can catch up.",
  "book-being-real-ai":
    "People are increasingly writing, replying, presenting, and even processing emotions through generated language, which can blur what they actually think or mean.",
  "book-auth-personalities":
    "Profiles now borrow style, authority, and social proof so effectively that polished identity often outruns verified identity.",
  "book-auth-friendship-v2":
    "Long-form online friendships can now be manipulated through private servers, encrypted chats, and emotionally intense messages that feel more real than daily offline contact.",
  "book-cyber-kids":
    "Kids are meeting risk inside games, short-form video platforms, group chats, and app ecosystems that mix play, commerce, and persuasion.",
  "book-smart-home":
    "Homes now run on doorbells, cameras, speakers, lighting, thermostats, and delivery devices that often share one network and one family account.",
  "book-phishing-defense":
    "Phishing messages now look cleaner, shorter, and more believable because attackers are copying real brands and using AI-assisted wording.",
  "book-banking-safety":
    "Financial fraud increasingly arrives as a fake fraud-prevention event, where the criminal pretends to protect the account while actually moving the money.",
  "book-mobile-security":
    "The phone has become the reset button for everything, which makes carrier attacks, malicious apps, and device theft more consequential than most people expect.",
  "book-crypto-defense":
    "Crypto fraud continues to thrive because technical language and fear of missing out can make poor judgment feel sophisticated.",
  "book-romance-scam":
    "Romance scams now blend dating platforms, social media, messaging apps, and sometimes AI-generated voice notes to deepen trust faster.",
  "book-voice-clone":
    "Voice cloning has lowered the cost of impersonation so much that one public video clip can help fuel a fake distress call.",
  "book-medicare-fraud":
    "Fraud tied to benefits, home testing, durable medical equipment, and fake coverage updates still works because it sounds administrative rather than criminal.",
  "book-email-safety":
    "Inbox overload makes people click on autopilot, which is exactly when the wrong attachment or fake reset message slips through.",
  "book-tax-scam":
    "Tax-season fraud now includes refund bait, fake portal notices, preparer impersonation, and identity misuse long before someone notices a return was filed.",
  "book-tech-support":
    "Fake support scams still work because browser pop-ups, loud warnings, and urgent calls make ordinary users feel their device is already lost.",
  "book-grandparent-scam":
    "Family-emergency scams increasingly use personal details pulled from public posts to make the crisis sound intimate and specific.",
  "book-investment-fraud":
    "Investment fraud currently thrives on community trust, private groups, and confident language around exclusive access or safer-than-market returns.",
  "book-charity-scam":
    "Charity fraud spikes around disasters, community emergencies, and emotionally intense stories that reward instant giving over careful verification.",
};

const CATEGORY_REALITIES: Record<BookCategory, string> = {
  ai: "Most readers are not trying to become machine-learning experts. They want enough clarity to make sound decisions before a polished tool or convincing fake gets ahead of their judgment.",
  scam: "Scams succeed because they arrive in the middle of normal life, when people are trying to help, keep up, or avoid embarrassment rather than sit down and do a forensic review.",
  family: "Family systems fail less from lack of love than from inconsistent rules, bad timing, and the assumption that somebody else already checked the details.",
  seniors: "Older adults often need practical language and respectful systems, not another round of fear-based messaging that treats caution like weakness.",
  privacy: "Privacy decisions are usually made in tiny moments of convenience, which is why the biggest exposures rarely feel dramatic while they are happening.",
  social: "Digital relationships can be meaningful and healthy, but the pace of online trust often outruns the amount of reality underneath it.",
  finance: "Money decisions go wrong fastest when urgency, authority, and a polished explanation land before a second set of eyes does.",
  business: "Operational pressure makes weak processes feel efficient right up until the day someone exploits them.",
  tech: "Most people only think about device hygiene when something is already flashing, locked, or broken, which is exactly why calm setup work matters so much.",
};

const CATEGORY_STANDARDS: Record<BookCategory, string> = {
  ai: "The strongest AI standard is simple: keep human approval close to money, identity, reputation, and policy.",
  scam: "The strongest anti-scam standard is also simple: when pressure rises, verification gets slower and more deliberate, not faster.",
  family: "The safest family systems are the ones every generation can explain and repeat without confusion.",
  seniors: "Confidence grows when the rule set is memorable enough to use under pressure and respectful enough to keep using.",
  privacy: "Good privacy work is rarely flashy; it is a steady reduction of unnecessary exposure.",
  social: "Healthy online trust grows in layers, not leaps.",
  finance: "Financial safety comes from controlled approvals, clean records, and refusing to improvise around money.",
  business: "Business security improves when responsibility is visible, shared, and written into the workflow.",
  tech: "Device security works best when it is set up once, checked regularly, and not dependent on remembering a perfect sequence during a crisis.",
};

const CATEGORY_INCIDENT_NOTES: Record<BookCategory, string> = {
  ai: "Synthetic content is especially dangerous after the first emotional reaction, because people then start defending the fake instead of questioning the source.",
  scam: "The most expensive mistakes usually happen after the first suspicious moment, when shame and urgency start competing with clear thinking.",
  family: "Family incidents get harder to unwind when relatives are contacted separately and each person receives a slightly different version of the story.",
  seniors: "The best response is calm, respectful, and immediate. Delay helps the criminal, but panic does not help the victim.",
  privacy: "Exposure often looks small at first, which is why documenting every affected account matters more than intuition.",
  social: "Impersonation and manipulation spread quickly through trust networks, so a quiet response can still be a fast response.",
  finance: "When money is involved, the first priority is usually to interrupt movement, not solve the whole mystery.",
  business: "In a business incident, confusion becomes part of the damage unless people know who is allowed to freeze, approve, and communicate.",
  tech: "With device incidents, containment almost always beats improvisation. Disconnect, document, then decide.",
};

const CATEGORY_MAINTENANCE: Record<BookCategory, string> = {
  ai: "That usually means a short review rhythm, source-check habits, and a willingness to retire tools that create more confusion than value.",
  scam: "That usually means rehearsed scripts, clean contact lists, and the social permission to verify before helping.",
  family: "That usually means short check-ins, visible rules, and shared contact trees that survive stress and travel.",
  seniors: "That usually means one or two trusted helpers, a small number of high-value habits, and less tolerance for confusing requests.",
  privacy: "That usually means periodic permission reviews, account cleanup, and fewer unnecessary links between public and sensitive parts of your life.",
  social: "That usually means slower trust, clearer boundaries, and the habit of asking what is verified instead of only what feels right.",
  finance: "That usually means regular statement review, cleaner approval paths, and a second-person rule for unusual transfers.",
  business: "That usually means recurring access reviews, staff refreshers, and process ownership that does not disappear when one person is out.",
  tech: "That usually means updates, backups, app reviews, and a calm checklist for the devices people rely on every day.",
};

const FIELD_GUIDE_TITLES: Record<BookCategory, string> = {
  ai: "Decision Checklists and Verification Scripts",
  scam: "Pressure-Test Scripts and Recovery Checklists",
  family: "Family Drill Guide and Shared Reference",
  seniors: "Confidence Checklist and Support Circle Guide",
  privacy: "Personal Audit and Lockdown Checklist",
  social: "Trust Signals and Boundary Checklist",
  finance: "Money-Movement Checklist and Response Sheet",
  business: "Leadership Checklist and Team Standards Sheet",
  tech: "Setup Checklist and Device Recovery Guide",
};

const paragraph = (text: string) => `<p>${text}</p>`;
const renderList = (items: string[]) =>
  `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
const renderSteps = (items: string[]) =>
  `<ol>${items.map((item) => `<li>${item}</li>`).join("")}</ol>`;

const toCurrency = (value: number) => Number(value.toFixed(2));
const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);
const toPhrase = (value: string) => value.trim().replace(/[.!?]+$/, "");
const toSentence = (value: string) => {
  const trimmed = value.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

function normalizePageCount(seed: BookSeed) {
  const floor = Math.min(160, 120 + Math.round(Math.max(seed.price - 20, 0)));
  return Math.min(180, Math.max(seed.total_pages, floor));
}

function createPages(totalPages: number, count: number, index: number) {
  const start = Math.floor((index * totalPages) / count) + 1;
  const end = index === count - 1
    ? totalPages
    : Math.floor(((index + 1) * totalPages) / count);

  return { start, end };
}

function createChapters(seed: BookSeed): BookChapter[] {
  const chapterTitles = [...seed.chapter_titles, FIELD_GUIDE_TITLES[seed.category]];
  const count = chapterTitles.length;
  const currentScenario = CURRENT_SCENARIOS[seed.id];
  const readerReality = CATEGORY_REALITIES[seed.category];
  const categoryStandard = CATEGORY_STANDARDS[seed.category];
  const incidentNote = CATEGORY_INCIDENT_NOTES[seed.category];
  const maintenanceNote = CATEGORY_MAINTENANCE[seed.category];

  return chapterTitles.map((title, index) => {
    const pages = createPages(seed.total_pages, count, index);
    const takeaways =
      index === 0
        ? seed.outcomes
        : index === 1
          ? seed.risk_signals
          : index === 2
            ? seed.controls
            : index === 3
              ? seed.response_plan
              : index === 4
                ? seed.practice_plan
                : [
                    seed.outcomes[0],
                    seed.controls[0],
                    seed.response_plan[0],
                    seed.practice_plan[0],
                  ];

    const actions =
      index === 0
        ? [
            `Start with the part of ${seed.name} that touches your highest-risk account, device, or decision flow first.`,
            "Mark the sections that apply to your real life before you try to optimize anything else.",
            "Use this book as a working reference instead of trying to memorize the whole thing in one sitting.",
          ]
        : index === 1
          ? [
              "Pause whenever the message, call, or request demands immediate action.",
              "Verify identity or instructions through a second trusted channel before you click, pay, or reply.",
              "Save examples of suspicious behavior so patterns become easier to recognize next time.",
            ]
          : index === 2
            ? [
                "Implement one control today in the place where a mistake would hurt most.",
                `Explain the rule to the other ${seed.ideal_for.toLowerCase()} who need to follow it so it survives your absence.`,
                "Test the safeguard once before the next stressful moment asks you to trust it.",
              ]
            : index === 3
              ? [
                  "Stop the interaction, freeze the payment, or isolate the device before gathering more information.",
                  "Write down what happened, when it started, and which accounts or people are involved.",
                  "Escalate quickly to the right bank, carrier, caregiver, or service provider instead of troubleshooting alone.",
                ]
              : index === 4
                ? [
                  "Put the most important checks on a calendar so security is not dependent on memory.",
                  "Review this topic with family, coworkers, or trusted contacts on a regular schedule.",
                  "Treat every update as a standards refresh, not proof that you failed before.",
                ]
                : [
                    `Keep one printed or pinned checklist for ${seed.name.toLowerCase()} where you can reach it under stress.`,
                    "Use the scripts in this section before you need them so they sound like your own voice.",
                    "Refresh the checklist whenever a device, account, role, or family routine changes.",
                  ];

    const paragraphs =
      index === 0
        ? [
            `${seed.longDescription} ${currentScenario}`,
            `${readerReality} For ${seed.ideal_for.toLowerCase()}, the goal is not perfection; it is fewer blind spots on ordinary days.`,
            `A lot of readers come to ${seed.name.toLowerCase()} because they need to ${toPhrase(lowerFirst(seed.outcomes[0]))}. They also need to ${toPhrase(lowerFirst(seed.outcomes[1]))}.`,
            `${categoryStandard} That is why this opening chapter is about context before tactics.`,
          ]
        : index === 1
          ? [
              `Trouble around ${seed.name.toLowerCase()} rarely starts with a dramatic movie moment. It usually begins when ${lowerFirst(seed.risk_signals[0])}`,
              `${currentScenario} In that kind of environment, a polished message or familiar voice can buy just enough trust to move you one step too far.`,
              `For ${seed.ideal_for.toLowerCase()}, the second mistake is often rationalizing the discomfort because the situation feels busy, awkward, or emotionally loaded.`,
              "This chapter slows the pattern down so you can recognize it before the pressure converts into action.",
            ]
          : index === 2
            ? [
                `Protection improves when the rules are plain enough to use on a tired Tuesday. ${toSentence(seed.controls[0])} ${toSentence(seed.controls[1])}`,
                `${categoryStandard} If a safeguard only works on your best day, it is not yet a safeguard.`,
                `The controls in this section are written for real homes, real offices, real inboxes, and real attention spans. They are meant to survive distraction, not assume you will never be distracted.`,
                `In practice, the strongest control is the one other people around you can understand and repeat without needing you in the room.`,
              ]
            : index === 3
              ? [
                  `When something already feels wrong, clarity matters more than pride. ${toSentence(seed.response_plan[0])}`,
                  `${incidentNote} The goal of this chapter is to shrink the damage first and sort the full story out second.`,
                  `People usually lose the most ground in the hour after the first mistake, when embarrassment competes with common sense. A written timeline and one decisive call will beat vague recollection every time.`,
                  `That is why the response guidance here is direct: interrupt the harm, document the facts, then escalate to the right human being.`,
                ]
              : index === 4
                ? [
                    `Long-term resilience is built in boring routines. ${toSentence(seed.practice_plan[0])}`,
                    `${maintenanceNote} That rhythm matters more than intensity because most threats arrive during ordinary life, not during the week you were thinking about security.`,
                    `For ${seed.ideal_for.toLowerCase()}, maintenance has to be realistic enough to survive travel, fatigue, family obligations, and work pressure.`,
                    "The habits in this chapter are designed to keep standards high without turning safety into a full-time identity.",
                  ]
                : [
                    `This final section turns ${seed.name.toLowerCase()} into a returnable field guide instead of a one-time read.`,
                    `${currentScenario} The details may keep changing, but the decision rules underneath them remain stable.`,
                    `If stress is high and attention is low, return to three anchors: ${toPhrase(lowerFirst(seed.controls[0]))}, ${toPhrase(lowerFirst(seed.response_plan[0]))}, and ${toPhrase(lowerFirst(seed.practice_plan[0]))}.`,
                    "The point of a checklist is not to make you robotic. The point is to give your future self something solid to hold when the situation gets noisy.",
                  ];

    const sectionTitle =
      index === 0
        ? "What This Book Will Help You Do"
        : index === 1
          ? "Signals to Take Seriously"
          : index === 2
            ? "Working Standards"
            : index === 3
              ? "Response Priorities"
              : index === 4
                ? "Practice That Keeps Working"
                : "Field Guide";

    const actionTitle =
      index === 0
        ? "How to Read This Book Usefully"
        : index === 1
          ? "What to Do in the Moment"
          : index === 2
            ? "Set These Controls"
            : index === 3
              ? "First Moves"
              : index === 4
                ? "Keep It Alive"
                : "Quick Reference Actions";

    return {
      chapter_number: index + 1,
      chapter_title: title,
      page_start: pages.start,
      page_end: pages.end,
      content_html: [
        `<article class="chapter-content">`,
        ...paragraphs.map(paragraph),
        `<h3>${sectionTitle}</h3>`,
        renderList(takeaways),
        `<h3>${actionTitle}</h3>`,
        renderSteps(actions),
        `</article>`,
      ].join(""),
    };
  });
}

function createBook(seed: BookSeed): BookItem {
  const totalPages = normalizePageCount(seed);
  return {
    ...seed,
    author: BOOK_AUTHOR,
    total_pages: totalPages,
    bulk_price: toCurrency(seed.price * 0.8),
    chapters: createChapters({ ...seed, total_pages: totalPages }),
  };
}

const BOOK_SEEDS: BookSeed[] = [
  {
    id: "book-ai-fundamentals",
    slug: "ai-fundamentals",
    name: "AI Fundamentals",
    subtitle: "A practical map of how AI changes trust, risk, and daily decisions",
    description: "Master AI basics, the new threat surface, and the guardrails that keep people in control.",
    longDescription:
      "AI Fundamentals explains the systems now shaping search, writing, customer service, scams, and workplace automation. It gives non-technical readers enough fluency to evaluate new tools without falling for hype, fear, or synthetic manipulation.",
    price: 29.99,
    total_pages: 124,
    image: bookAiFundamentals,
    tag: "Best Seller",
    stripe_price_id: "price_1SjwOGJ8osfwYbX7UnEPLRMz",
    category: "ai",
    ideal_for: "families, professionals, and first-time AI users",
    outcomes: [
      "Explain the basic AI concepts that affect daily life without getting lost in jargon.",
      "Separate useful automation from risky overreach before trusting a tool with sensitive work.",
      "Recognize how AI changes phishing, misinformation, and identity verification.",
      "Build a household or team routine for testing AI safely.",
    ],
    risk_signals: [
      "An AI tool asks for confidential data it does not actually need.",
      "Generated output is presented as certain fact with no source trail.",
      "A message uses polished language or cloned style to manufacture trust.",
      "People assume the system is neutral simply because it looks efficient.",
    ],
    controls: [
      "Keep humans in the approval loop for money, identity, and policy decisions.",
      "Use source checking and side-by-side verification before acting on AI output.",
      "Create data-sharing rules for what can and cannot be pasted into AI tools.",
      "Limit account permissions so experiments do not expose everything at once.",
    ],
    response_plan: [
      "Stop acting on suspicious AI-generated content until the source is independently verified.",
      "Document where the output came from and what sensitive data may have been exposed.",
      "Reset or isolate any account used with an untrusted AI workflow.",
      "Escalate high-risk synthetic media to leadership, family, or platform support quickly.",
    ],
    practice_plan: [
      "Review new AI tools monthly before they become embedded in daily workflow.",
      "Teach one verification habit to the people around you every quarter.",
      "Retire tools that create more confusion than measurable value.",
      "Keep a short record of close calls so future decisions improve.",
    ],
    chapter_titles: [
      "How AI Actually Shows Up in Everyday Life",
      "Where the Real Risk Lives",
      "Guardrails Before Convenience",
      "What to Do When AI Is Used Against You",
      "Building an AI-Safe Routine",
    ],
  },
  {
    id: "book-scam-prevention",
    slug: "scam-prevention-guide",
    name: "Scam Prevention Guide",
    subtitle: "A complete defensive playbook for modern fraud pressure",
    description: "Learn the scam patterns, emotional triggers, and response scripts that stop fraud early.",
    longDescription:
      "Scam Prevention Guide translates the most common fraud tactics into clear warning signs, verification rules, and practical scripts. It is built for readers who want to respond with confidence instead of improvising under pressure.",
    price: 39.99,
    total_pages: 146,
    image: bookScamPrevention,
    tag: "Featured",
    stripe_price_id: "price_1SjwOIJ8osfwYbX74jTfNxcW",
    category: "scam",
    ideal_for: "households, caregivers, and anyone targeted by phone, email, or text scams",
    outcomes: [
      "Spot the predictable structure behind most scams before emotion takes over.",
      "Use verification scripts that work across calls, emails, texts, and pop-ups.",
      "Reduce fraud exposure for older relatives, children, and busy professionals.",
      "Know exactly what to do after a close call or financial mistake.",
    ],
    risk_signals: [
      "The caller or message creates urgency, secrecy, or shame.",
      "Payment is requested through gift cards, wire transfer, or crypto.",
      "The scammer isolates you from family, coworkers, or official channels.",
      "Contact details are supplied by the same person asking for trust.",
    ],
    controls: [
      "Use a call-back rule: hang up and contact the institution from a known number.",
      "Turn on transaction alerts and strong authentication for high-value accounts.",
      "Create family code words and escalation paths for emergency claims.",
      "Train everyone in the household to pause when money and emotion collide.",
    ],
    response_plan: [
      "Freeze the transaction path first by calling the bank, card issuer, or platform.",
      "Save messages, numbers, receipts, and screenshots before deleting anything.",
      "Report the scam to the relevant institution and consumer agencies quickly.",
      "Tell a trusted person what happened so recovery does not happen in isolation.",
    ],
    practice_plan: [
      "Review current scam trends with family or staff once a month.",
      "Keep a visible list of payment methods real institutions will never request.",
      "Rehearse your verification script until it feels normal to use.",
      "Treat suspicious contact as a drill, not a personal failure.",
    ],
    chapter_titles: [
      "The Pattern Behind Almost Every Scam",
      "Pressure Tactics and Red Flags",
      "Habits That Shut Fraud Down",
      "Recovery After a Close Call",
      "Keeping the Whole Household Ready",
    ],
  },
  {
    id: "book-family-safety",
    slug: "family-safety-toolkit",
    name: "Family Safety Toolkit",
    subtitle: "Shared standards for children, parents, grandparents, and caregivers",
    description: "Build a family-wide safety plan that works across ages, devices, and stress levels.",
    longDescription:
      "Family Safety Toolkit helps households move from scattered advice to a real operating system for digital trust. It covers family roles, communication rules, money decisions, device safety, and how to talk about online risk without panic or shame.",
    price: 24.99,
    total_pages: 112,
    image: bookFamilySafety,
    tag: "Family",
    stripe_price_id: "price_1SjwOKJ8osfwYbX7GcmhErnQ",
    category: "family",
    ideal_for: "parents, adult children, guardians, and multigenerational households",
    outcomes: [
      "Create family rules for urgent requests, sensitive information, and financial approval.",
      "Assign clear roles for children, caregivers, and older relatives instead of assuming coverage.",
      "Use shared language that keeps people honest about fear, doubt, and pressure.",
      "Turn digital safety into a repeated family habit rather than a one-time lecture.",
    ],
    risk_signals: [
      "Different family members are following different rules for the same type of request.",
      "Children or seniors are afraid to ask questions because they expect criticism.",
      "One person controls too many passwords, bills, or recovery options.",
      "Emergency claims arrive through a channel the family has never normalized.",
    ],
    controls: [
      "Set approval thresholds for transfers, gift cards, and account changes.",
      "Create a shared contact sheet for banks, carriers, doctors, and trusted relatives.",
      "Use password managers and recovery contacts that survive one person being unavailable.",
      "Schedule short family reviews focused on recent scams and near misses.",
    ],
    response_plan: [
      "Move the conversation to a trusted group call when any urgent claim appears.",
      "Document who received the message, what was requested, and what was shared.",
      "Lock down exposed accounts or cards before debating whether the threat was real.",
      "Debrief the incident together so the whole family improves from one event.",
    ],
    practice_plan: [
      "Keep a family code word and rotate it when trust feels compromised.",
      "Update recovery contacts after any phone number, address, or caregiver change.",
      "Use birthdays, holidays, or school transitions as checkpoints for review.",
      "Celebrate good catches so safety is associated with confidence, not fear.",
    ],
    chapter_titles: [
      "Designing a Family Safety System",
      "Where Families Usually Break Down",
      "Roles, Rules, and Shared Guardrails",
      "Handling the Situation in Real Time",
      "Making Safety Normal at Home",
    ],
  },
  {
    id: "book-senior-tech",
    slug: "senior-tech-handbook",
    name: "Senior Tech Handbook",
    subtitle: "Plain-language digital safety for confident independent living",
    description: "Use technology with more confidence and less fear, without giving scammers an opening.",
    longDescription:
      "Senior Tech Handbook is written for adults who want clear guidance without jargon or condescension. It focuses on the real scams, settings, and routines that matter most to older adults and the people who support them.",
    price: 27.99,
    total_pages: 118,
    image: bookSeniorTechSafety,
    tag: "Seniors",
    stripe_price_id: "price_1SjwOLJ8osfwYbX7mV3J5LtX",
    category: "seniors",
    ideal_for: "older adults, caregivers, senior centers, and adult children helping from a distance",
    outcomes: [
      "Use phones, email, and online accounts with more confidence and fewer dangerous shortcuts.",
      "Recognize scams that specifically target seniors and fixed-income households.",
      "Know when to handle something alone and when to call for a second opinion.",
      "Preserve independence without sacrificing security.",
    ],
    risk_signals: [
      "Someone claims a benefit, refund, or emergency can only be handled immediately.",
      "A support caller wants remote access before proving they are legitimate.",
      "The request depends on secrecy from children, spouses, or trusted contacts.",
      "A confusing screen or pop-up is treated like an emergency instead of a problem to verify.",
    ],
    controls: [
      "Use strong device locks, software updates, and saved official contacts.",
      "Put two trusted people in your digital safety circle before a crisis happens.",
      "Let unknown calls go to voicemail unless you were expecting them.",
      "Keep written notes for key accounts, recovery steps, and fraud hotlines.",
    ],
    response_plan: [
      "Hang up, step away, and call back from a number you already trust.",
      "If money or Medicare information was shared, contact the institution that same day.",
      "Ask a family member or trusted friend to review the event without embarrassment.",
      "Write down what was said while the details are still fresh.",
    ],
    practice_plan: [
      "Review your phone favorites and emergency contacts every month.",
      "Use one routine day each week to check statements, updates, and unusual messages.",
      "Keep asking questions until the answer makes sense in plain language.",
      "Treat caution as a strength rather than a sign you cannot use technology.",
    ],
    chapter_titles: [
      "Using Technology Without Losing Confidence",
      "Scams That Hit Seniors Hardest",
      "Simple Habits That Work",
      "What to Do When Something Feels Off",
      "Protecting Independence Over Time",
    ],
  },
  {
    id: "book-digital-privacy",
    slug: "digital-privacy-mastery",
    name: "Digital Privacy Mastery",
    subtitle: "Reduce your data footprint without disappearing from modern life",
    description: "Protect your identity, devices, and browsing habits with practical privacy controls.",
    longDescription:
      "Digital Privacy Mastery shows how information about you is collected, linked, sold, and used for targeting. It focuses on the highest-value moves for securing accounts, devices, browsers, and daily habits without requiring total digital withdrawal.",
    price: 34.99,
    total_pages: 138,
    image: bookDigitalPrivacy,
    tag: "Popular",
    stripe_price_id: "price_1SjwOMJ8osfwYbX7ExCFG5R9",
    category: "privacy",
    ideal_for: "privacy-conscious individuals, families, and small teams",
    outcomes: [
      "Understand where your personal data leaks first and why that matters.",
      "Reduce tracking, profiling, and oversharing across devices and services.",
      "Harden the accounts that expose the rest of your life when compromised.",
      "Build a privacy routine that is practical enough to keep.",
    ],
    risk_signals: [
      "A free service monetizes data in ways that are hard to explain plainly.",
      "Location, contacts, microphone, or camera access is broader than the app requires.",
      "The same email, phone number, or login is reused everywhere for convenience.",
      "You assume convenience settings are neutral because they are defaults.",
    ],
    controls: [
      "Use unique passwords, MFA, and privacy-focused browser settings.",
      "Minimize account permissions and revoke access for abandoned apps regularly.",
      "Separate public identities from sensitive personal or financial workflows.",
      "Favor services that are clear about data use, retention, and deletion.",
    ],
    response_plan: [
      "Reset exposed credentials and review sessions when data leakage is suspected.",
      "Change privacy settings before deleting evidence of what happened.",
      "Request data removal or account cleanup from platforms where it matters most.",
      "Freeze credit if the exposure could affect identity or lending.",
    ],
    practice_plan: [
      "Do a monthly permission and session review across your main devices.",
      "Check your public footprint after major life events or profile changes.",
      "Retire accounts you no longer need instead of letting them drift.",
      "Treat privacy improvements as layered progress, not all-or-nothing purity.",
    ],
    chapter_titles: [
      "What Privacy Actually Means Today",
      "How Your Data Gets Exposed",
      "Controls Worth the Effort",
      "Damage Containment After Exposure",
      "Keeping a Smaller, Safer Footprint",
    ],
  },
  {
    id: "book-deepfake",
    slug: "deepfake-detection",
    name: "Deepfake Detection",
    subtitle: "Verify video, voice, and synthetic media before trust becomes damage",
    description: "Learn the cues, workflows, and verification habits that expose AI-made media.",
    longDescription:
      "Deepfake Detection focuses on the human side of synthetic media risk: how fake audio and video pressure people into rash decisions. It gives readers a repeatable way to verify what they see and hear before money, reputation, or relationships are put at risk.",
    price: 32.99,
    total_pages: 128,
    image: bookDeepfakeDetection,
    tag: "New",
    stripe_price_id: "price_1SjwOOJ8osfwYbX7HUJrBIas",
    category: "ai",
    ideal_for: "families, journalists, managers, and anyone who acts on digital media quickly",
    outcomes: [
      "Recognize the common cues that synthetic media often leaves behind.",
      "Slow down emotional reactions long enough to verify identity and context.",
      "Use secondary channels to confirm urgent audio or video claims.",
      "Teach others how deepfakes change fraud, reputation, and misinformation.",
    ],
    risk_signals: [
      "The message relies on a shocking clip with no clear origin or timeline.",
      "A video or voice request tries to bypass normal approval channels.",
      "The media quality feels convincing but the context is oddly thin or incomplete.",
      "You are told verification will make the situation worse or too slow.",
    ],
    controls: [
      "Use call-back and code-word procedures for high-stakes family or business requests.",
      "Check source chains, upload history, and corroborating reports before sharing.",
      "Train teams to verify media context, not just visual realism.",
      "Keep escalation paths separate from the channel where the suspicious media appears.",
    ],
    response_plan: [
      "Pause distribution immediately when a clip seems manipulative or unusually urgent.",
      "Preserve the file, link, and account details for review before the post disappears.",
      "Notify affected family members, leadership, or platform trust teams quickly.",
      "Correct the record in the same channels where the synthetic media spread.",
    ],
    practice_plan: [
      "Review one recent synthetic-media example with your household or team each month.",
      "Refresh family verification phrases and callback habits regularly.",
      "Treat sensational clips as unverified until proven otherwise.",
      "Build trust around verification so nobody feels embarrassed for slowing things down.",
    ],
    chapter_titles: [
      "Why Synthetic Media Works on Real People",
      "Signals That a Video or Voice Should Not Be Trusted Yet",
      "Verification Before Amplification",
      "Containing a Deepfake Incident",
      "Keeping Verification Culture Alive",
    ],
  },
  {
    id: "book-password",
    slug: "password-security",
    name: "Password Security",
    subtitle: "Strong access control for real people with real routines",
    description: "Stop reusing passwords and build an access system that survives breaches and stress.",
    longDescription:
      "Password Security explains how credential theft actually works and why convenience shortcuts create long-term exposure. It centers on password managers, multifactor authentication, recovery planning, and the habits that make account protection sustainable.",
    price: 22.99,
    total_pages: 96,
    image: bookPasswordSecurity,
    tag: "Essential",
    stripe_price_id: "price_1SjwOPJ8osfwYbX7meUEbp3H",
    category: "privacy",
    ideal_for: "anyone managing online accounts for themselves, family, or a small business",
    outcomes: [
      "Replace weak and repeated passwords with a system you can actually maintain.",
      "Use password managers and MFA without creating new recovery problems.",
      "Secure the email account that usually unlocks everything else.",
      "Create backup and recovery steps before an account crisis happens.",
    ],
    risk_signals: [
      "The same password or pattern appears across multiple important accounts.",
      "Recovery email, phone, and MFA methods all depend on one device or number.",
      "Shared household or staff accounts blur who actually took an action.",
      "You delay changing credentials because the current system feels inconvenient.",
    ],
    controls: [
      "Use a reputable password manager and unique generated passwords everywhere possible.",
      "Prioritize MFA on email, banking, cloud storage, and telecom accounts first.",
      "Document recovery methods and emergency contacts in a secure offline location.",
      "Remove stale devices and sessions from major accounts on a regular schedule.",
    ],
    response_plan: [
      "Change the email password first if you suspect a wider account compromise.",
      "Review login history, active sessions, and recovery settings before closing the case.",
      "Reset passwords in the order of potential blast radius, not convenience.",
      "Tell family or team members when shared credentials or devices may be affected.",
    ],
    practice_plan: [
      "Run a password manager audit every month for duplicates and weak credentials.",
      "Retire shared logins as soon as a better access pattern is practical.",
      "Update recovery notes after phone, device, or carrier changes.",
      "Treat access hygiene as routine maintenance rather than emergency work.",
    ],
    chapter_titles: [
      "Why Credentials Still Matter Most",
      "How Password Habits Fail",
      "Building a Strong Access Stack",
      "Recovering After Exposure",
      "Keeping Accounts Stable and Secure",
    ],
  },
  {
    id: "book-social-media",
    slug: "social-media-safety",
    name: "Social Media Safety",
    subtitle: "Protect reputation, privacy, and relationships on public platforms",
    description: "Use social platforms without oversharing your life, your location, or your trust.",
    longDescription:
      "Social Media Safety breaks down how platforms reward speed, emotion, and visibility in ways that can work against personal security. It helps readers share more intentionally, recognize impersonation and manipulation, and keep social life from becoming a threat surface.",
    price: 26.99,
    total_pages: 114,
    image: bookSocialMediaSafety,
    tag: "Trending",
    stripe_price_id: "price_1SjwORJ8osfwYbX7e2gUB45e",
    category: "social",
    ideal_for: "teens, adults, creators, caregivers, and anyone with an active online presence",
    outcomes: [
      "Use social media without feeding unnecessary information to scammers or stalkers.",
      "Recognize impersonation, emotional bait, and platform-specific manipulation patterns.",
      "Reduce exposure around family photos, routines, travel, and location signals.",
      "Build safer habits for messaging, posting, and accepting new contacts.",
    ],
    risk_signals: [
      "A new contact mirrors your community or interests too perfectly too quickly.",
      "A post encourages oversharing under the banner of authenticity or virality.",
      "Direct messages shift rapidly from casual trust to money, urgency, or secrecy.",
      "A platform trend normalizes risky behavior because everyone seems to be doing it.",
    ],
    controls: [
      "Limit audience visibility, geotags, and public personal details by default.",
      "Verify new contacts before moving to private apps, payments, or emotional disclosure.",
      "Separate private family content from public-facing social identity when possible.",
      "Review tagged posts, old photos, and third-party app access regularly.",
    ],
    response_plan: [
      "Lock down profile visibility and messaging settings when harassment or impersonation starts.",
      "Capture screenshots and account links before reporting suspicious profiles.",
      "Warn friends or family if someone is using your identity or social circle as leverage.",
      "Escalate severe threats to platforms, schools, employers, or law enforcement as needed.",
    ],
    practice_plan: [
      "Review your public profile as if you were a scammer once a month.",
      "Use posting delays for travel, events, and routines that reveal where you are.",
      "Normalize asking, 'Would I want a stranger to know this?' before posting.",
      "Teach younger users that private groups are not the same as private space.",
    ],
    chapter_titles: [
      "What Social Platforms Reward and Why It Matters",
      "Manipulation Tactics Hidden in Normal Posting",
      "Safer Sharing and Better Boundaries",
      "Responding to Impersonation and Abuse",
      "Keeping Your Social Life from Becoming a Threat Surface",
    ],
  },
  {
    id: "book-online-shopping",
    slug: "online-shopping-guide",
    name: "Online Shopping Guide",
    subtitle: "Safer buying decisions before a fake store or listing costs you money",
    description: "Shop online with fewer surprises by verifying stores, payments, and seller behavior.",
    longDescription:
      "Online Shopping Guide helps readers evaluate digital marketplaces, seller claims, and checkout flows with the same discipline they would use for a major purchase offline. It focuses on fake stores, deceptive listings, payment traps, and delivery fraud.",
    price: 24.99,
    total_pages: 102,
    image: bookOnlineShopping,
    tag: "Practical",
    stripe_price_id: "price_1SjwOTJ8osfwYbX7lPLOGwFE",
    category: "finance",
    ideal_for: "frequent online shoppers, busy parents, and anyone buying through marketplaces or social ads",
    outcomes: [
      "Verify whether an online seller or site deserves your money before checkout.",
      "Choose payment methods and habits that reduce fraud recovery pain.",
      "Recognize fake urgency around shipping, inventory, and discounts.",
      "Handle disputed charges, delivery scams, and account misuse faster.",
    ],
    risk_signals: [
      "The site offers prices that are dramatically lower than every legitimate competitor.",
      "Policies, reviews, or contact details look copied, vague, or absent.",
      "Payment options steer you away from credit protections toward irreversible methods.",
      "The seller pushes you off-platform to save time, fees, or taxes.",
    ],
    controls: [
      "Use credit cards or protected payment rails for unknown merchants.",
      "Verify the domain, reviews, and return policy before buying from a new store.",
      "Avoid logging in through links delivered in shipping or billing texts.",
      "Keep purchase confirmations and screenshots until the item arrives as expected.",
    ],
    response_plan: [
      "Dispute fraudulent or missing transactions through the payment provider quickly.",
      "Change marketplace and email passwords if account access may have been involved.",
      "Report fake stores or listings to the platform before more buyers are trapped.",
      "Track patterns of failed deliveries or account alerts instead of treating them as isolated glitches.",
    ],
    practice_plan: [
      "Use a short merchant checklist before every first-time purchase.",
      "Review subscriptions, saved cards, and stored addresses monthly.",
      "Keep impulse buying separate from urgent need so pressure is easier to spot.",
      "Treat limited-time offers as marketing until proven legitimate.",
    ],
    chapter_titles: [
      "How Shopping Scams Get Past Busy People",
      "Storefront Red Flags and Seller Pressure",
      "Safer Payments and Checkout Habits",
      "When an Order, Card, or Account Goes Wrong",
      "Building a Reliable Buying Routine",
    ],
  },
  {
    id: "book-identity-theft",
    slug: "identity-theft-prevention",
    name: "Identity Theft Prevention",
    subtitle: "Protect your name, credit, and recovery options before fraud multiplies",
    description: "Learn how identity theft starts, how it spreads, and how to shut it down quickly.",
    longDescription:
      "Identity Theft Prevention is built around the real mechanics of account takeover, new-account fraud, and long-tail recovery work. It gives readers a prioritized strategy for prevention first and a clean response plan second.",
    price: 36.99,
    total_pages: 142,
    image: bookIdentityTheft,
    tag: "Critical",
    stripe_price_id: "price_1SjwOUJ8osfwYbX7qlhBavay",
    category: "privacy",
    ideal_for: "adults protecting their own identity, family members, and aging relatives",
    outcomes: [
      "Understand the first assets thieves target when they want to become you on paper.",
      "Use freezes, alerts, and account controls to reduce the blast radius of fraud.",
      "Respond in a prioritized order when identity data has already leaked.",
      "Keep better records so recovery and reporting move faster.",
    ],
    risk_signals: [
      "You see unexplained account alerts, denials, or mail tied to credit activity.",
      "Old personal data is assumed harmless because the breach seems outdated.",
      "Key identity proofs such as SSN, DOB, and address live in too many exposed places.",
      "You rely on monitoring alone without locking the channels thieves actually use.",
    ],
    controls: [
      "Freeze credit files and protect your primary email and mobile accounts aggressively.",
      "Use banking alerts and review statements for micro-transactions and address changes.",
      "Limit storage of sensitive documents in unprotected inboxes and cloud folders.",
      "Keep a response packet with bureau contacts, bank numbers, and document copies.",
    ],
    response_plan: [
      "Lock down credit, banking, and telecom access in the first response wave.",
      "File the necessary reports while evidence is organized and recent.",
      "Replace exposed credentials and review every recovery path tied to them.",
      "Keep a timeline so repeated fraud activity can be linked together clearly.",
    ],
    practice_plan: [
      "Check credit and high-value accounts on a recurring calendar.",
      "Refresh document storage and deletion habits after tax season or major life events.",
      "Review dependent and elder records, not just your own.",
      "Treat identity defense as a system spanning banking, healthcare, and telecom.",
    ],
    chapter_titles: [
      "How Identity Theft Starts",
      "Signals That Someone Is Using Your Name",
      "Prevention That Actually Changes Risk",
      "First Moves After Exposure",
      "Maintaining Long-Term Identity Defense",
    ],
  },
  {
    id: "book-business-cyber",
    slug: "business-cybersecurity",
    name: "Business Cybersecurity",
    subtitle: "Operational security for leaders who cannot afford informal systems",
    description: "Protect customers, staff, and revenue with repeatable business security standards.",
    longDescription:
      "Business Cybersecurity is written for owners, operators, and managers who need practical governance more than technical theater. It turns cyber risk into policies, responsibilities, and controls that can survive turnover, growth, and daily pressure.",
    price: 49.99,
    total_pages: 156,
    image: bookBusinessCyber,
    tag: "Professional",
    stripe_price_id: "price_1SjwOYJ8osfwYbX7yBrF06h5",
    category: "business",
    ideal_for: "small businesses, nonprofits, executive teams, and office managers",
    outcomes: [
      "Translate cyber risk into responsibilities that business teams can actually own.",
      "Set standards for access, vendor trust, payments, and incident escalation.",
      "Reduce dependence on one highly technical person for every security decision.",
      "Prepare the business to respond clearly when fraud or compromise happens.",
    ],
    risk_signals: [
      "Critical processes depend on shared passwords or untracked vendor access.",
      "Payment changes can be approved by email alone.",
      "Security knowledge lives in one employee instead of the business system.",
      "Policies exist on paper but are invisible to daily operations.",
    ],
    controls: [
      "Use role-based access, MFA, documented approvals, and separation of duties.",
      "Treat vendor onboarding and offboarding as security events, not admin chores.",
      "Create simple response playbooks for wire fraud, phishing, and device loss.",
      "Run recurring staff training tied to the real workflows people use.",
    ],
    response_plan: [
      "Freeze the business process involved before debating root cause.",
      "Notify banking, IT, leadership, and legal or insurance contacts quickly.",
      "Preserve records of the request, approval path, and affected systems.",
      "Communicate to staff in plain language so confusion does not create a second incident.",
    ],
    practice_plan: [
      "Review access, vendors, and approval paths every quarter.",
      "Update training examples whenever the business adds tools or payment channels.",
      "Run one tabletop scenario at a level the team can realistically absorb.",
      "Measure security by how decisions get made, not how many tools are installed.",
    ],
    chapter_titles: [
      "Cybersecurity as an Operating Discipline",
      "Where Business Risk Actually Enters",
      "Controls That Scale with the Organization",
      "Response and Escalation Under Pressure",
      "Keeping Standards Alive as the Business Changes",
    ],
  },
  {
    id: "book-ai-management",
    slug: "ai-management-guide",
    name: "AI Management Guide",
    subtitle: "Governance for teams adopting AI faster than policy can keep up",
    description: "Use AI productively at work without letting access, quality, or accountability drift.",
    longDescription:
      "AI Management Guide helps managers govern AI use as a business system instead of a collection of experiments. It centers on human review, data boundaries, tool selection, change management, and what responsible adoption looks like when pressure to move fast is intense.",
    price: 34.99,
    total_pages: 132,
    image: bookAiManagement,
    tag: "Business",
    stripe_price_id: "price_1SjwOaJ8osfwYbX7hc4XzTHo",
    category: "ai",
    ideal_for: "team leads, founders, operations managers, and policy owners",
    outcomes: [
      "Create clear expectations for where AI can and cannot be used at work.",
      "Reduce data leakage and quality failures caused by ungoverned experimentation.",
      "Build human review into high-consequence workflows.",
      "Evaluate AI tools against business needs instead of vendor hype.",
    ],
    risk_signals: [
      "Employees are pasting sensitive information into tools without oversight.",
      "AI output is entering customer-facing work without quality checks.",
      "Leaders confuse tool adoption with real process improvement.",
      "No one owns policy, approvals, or the consequences of bad output.",
    ],
    controls: [
      "Set approved tool lists, data classes, and review requirements.",
      "Use pilot programs with measurable goals before expanding access broadly.",
      "Require escalation paths for legal, financial, and customer-impacting decisions.",
      "Document when AI is used so accountability remains clear.",
    ],
    response_plan: [
      "Suspend the workflow, not just the person, when an AI error carries real risk.",
      "Map what data, customers, or decisions were affected by the failure.",
      "Adjust permissions and policy before reopening access.",
      "Communicate lessons learned so the same failure mode is less likely elsewhere.",
    ],
    practice_plan: [
      "Review approved tools and usage patterns on a regular cadence.",
      "Tie AI governance to onboarding, procurement, and process design.",
      "Retire tools that create hidden labor or trust problems.",
      "Treat AI policy as living operations documentation, not a one-time memo.",
    ],
    chapter_titles: [
      "What Responsible AI Adoption Looks Like",
      "Failure Modes Managers Miss First",
      "Governance Before Scale",
      "Handling an AI Process Breakdown",
      "Running AI as a Managed System",
    ],
  },
  {
    id: "book-being-real-ai",
    slug: "being-real-in-ai-world",
    name: "Being Real in AI World",
    subtitle: "Authenticity, boundaries, and human judgment in synthetic environments",
    description: "Stay grounded and human when automation starts shaping attention, trust, and identity.",
    longDescription:
      "Being Real in AI World explores how synthetic content and automated systems affect authenticity, relationships, and judgment. It helps readers keep their voice, values, and discernment intact even when digital life rewards speed and simulation.",
    price: 27.99,
    total_pages: 108,
    image: bookBeingRealAi,
    tag: "Philosophy",
    stripe_price_id: "price_1SjwObJ8osfwYbX7SMFj8psB",
    category: "ai",
    ideal_for: "students, creators, professionals, and anyone navigating AI-heavy culture",
    outcomes: [
      "Name the pressures that make synthetic interactions feel more efficient than real ones.",
      "Protect your values and voice while still using modern tools productively.",
      "Recognize when convenience is eroding authenticity, trust, or self-awareness.",
      "Set healthier boundaries around automated content and relationships.",
    ],
    risk_signals: [
      "You outsource reflection or communication so completely that your own voice blurs.",
      "Synthetic interactions feel safer only because they ask less of you emotionally.",
      "Convenience becomes the reason for decisions that should be values-based.",
      "People treat fluency and realism as proof of sincerity.",
    ],
    controls: [
      "Keep important conversations and commitments grounded in direct human accountability.",
      "Use AI as a draft partner, not a substitute for judgment and integrity.",
      "Create personal boundaries for emotional disclosure to synthetic systems.",
      "Regularly compare digital habits against the values you say you hold.",
    ],
    response_plan: [
      "Step back from automated mediation when a relationship or decision feels hollow or distorted.",
      "Re-center on direct conversation, written reflection, or trusted human review.",
      "Notice what pressure made the synthetic option feel irresistible in the first place.",
      "Adjust the tool, context, or boundary rather than simply blaming yourself.",
    ],
    practice_plan: [
      "Reserve certain decisions and conversations for fully human spaces.",
      "Audit your creative and emotional workflows for over-automation.",
      "Keep one habit that reconnects expression to lived experience instead of generated output.",
      "Treat authenticity as something practiced, not assumed.",
    ],
    chapter_titles: [
      "Why Authenticity Feels Harder in the AI Era",
      "Signals That Convenience Is Replacing Judgment",
      "Boundaries That Keep You Real",
      "Resetting After a Synthetic Drift",
      "Practicing Human-Centered Technology Use",
    ],
  },
  {
    id: "book-auth-personalities",
    slug: "auth-of-personalities",
    name: "Auth of Personalities",
    subtitle: "Identity verification for people, personas, and public-facing trust",
    description: "Learn how to verify who you are really dealing with when personalities are packaged online.",
    longDescription:
      "Auth of Personalities focuses on a hard modern problem: people increasingly meet through profiles, brands, public personas, and partial context. This book helps readers verify identity beyond surface presentation and avoid costly trust mistakes.",
    price: 32.99,
    total_pages: 120,
    image: bookAuthPersonalities,
    tag: "Advanced",
    stripe_price_id: "price_1SjwOdJ8osfwYbX7MPe7VAm2",
    category: "privacy",
    ideal_for: "online professionals, daters, recruiters, community leaders, and cautious social users",
    outcomes: [
      "Separate presentation style from verified identity when assessing trust online.",
      "Use layered checks before money, access, or emotional commitment are involved.",
      "Recognize the tactics used to manufacture credibility through profile design and borrowed authority.",
      "Build a verification habit that still leaves room for healthy connection.",
    ],
    risk_signals: [
      "The person offers a compelling story but resists verifiable specifics.",
      "Authority is implied through titles, aesthetics, or followers rather than proof.",
      "Contact repeatedly moves toward privacy, exclusivity, or dependency before verification.",
      "You feel pressure to trust the vibe because the persona is polished.",
    ],
    controls: [
      "Verify identity through independent records, references, or real-time interaction.",
      "Treat profile consistency as a clue, not proof.",
      "Use staged trust so access and disclosure increase only after validation.",
      "Keep financial and administrative decisions separate from personality-driven influence.",
    ],
    response_plan: [
      "Pause contact when inconsistencies or avoidance patterns become visible.",
      "Capture handles, messages, and claimed details before confronting the person.",
      "Warn others if the same persona appears to be targeting a wider group.",
      "Close off any accounts, payments, or permissions linked to the relationship.",
    ],
    practice_plan: [
      "Use a standard identity-check checklist before high-trust online engagements.",
      "Discuss ambiguous cases with a trusted third party before escalating commitment.",
      "Revisit your own attraction to charisma, authority, or exclusivity.",
      "Treat verification as respect for reality, not cynicism.",
    ],
    chapter_titles: [
      "Why Personality Is Not Proof",
      "Red Flags in Curated Identity",
      "Layered Verification for Real Trust",
      "What to Do When the Persona Cracks",
      "Keeping Discernment Without Closing Off",
    ],
  },
  {
    id: "book-auth-friendship-v2",
    slug: "auth-of-friendship-v2",
    name: "Auth of Friendship V2",
    subtitle: "Safer digital relationships in an era of impersonation and emotional fraud",
    description: "Build genuine online trust without making yourself easy to manipulate or impersonate.",
    longDescription:
      "Auth of Friendship V2 applies identity and trust verification to friendships, communities, and long-running digital relationships. It is especially useful for people who make meaningful connections online but want better boundaries, pacing, and proof.",
    price: 29.99,
    total_pages: 110,
    image: bookAuthFriendshipV2,
    tag: "Volume 2",
    stripe_price_id: "price_1SjwOfJ8osfwYbX7WKUTFPZz",
    category: "social",
    ideal_for: "teens, adults, moderators, and people active in online communities",
    outcomes: [
      "Recognize how digital friendship can be manipulated without looking obviously malicious.",
      "Use pacing and verification so trust grows on evidence instead of urgency.",
      "Reduce risk around meetups, money requests, secrets, and platform switching.",
      "Preserve warmth and openness without abandoning discernment.",
    ],
    risk_signals: [
      "The friendship intensifies unusually fast and asks for loyalty before proof.",
      "Requests for secrecy or money are framed as tests of care.",
      "The person resists normal verification or real-world context.",
      "Conflicts are used to isolate you from other friends or moderators.",
    ],
    controls: [
      "Use staged trust for personal details, private chats, and real-world meetings.",
      "Verify identity before moving to money, travel, or emotional dependency.",
      "Keep some friendships anchored in shared spaces instead of only private channels.",
      "Talk openly about boundaries before pressure makes the conversation harder.",
    ],
    response_plan: [
      "Step back and review the full pattern rather than arguing one suspicious moment.",
      "Save messages and community context before blocking or reporting.",
      "Involve moderators, family, or trusted friends when manipulation feels sticky.",
      "Close off payment methods or account access that grew out of the friendship.",
    ],
    practice_plan: [
      "Revisit your boundaries when a friendship becomes emotionally intense.",
      "Normalize verifying people before major favors or in-person plans.",
      "Keep at least one trusted person aware of significant digital relationships.",
      "Remember that healthy friendship can survive respectful verification.",
    ],
    chapter_titles: [
      "What Real Friendship Requires Online",
      "Manipulation Hidden Inside Connection",
      "Boundaries and Verification That Protect Both People",
      "Responding When Trust Is Misused",
      "Building Safer Digital Community",
    ],
  },
  {
    id: "book-cyber-kids",
    slug: "cyber-awareness-for-kids",
    name: "Cyber Awareness for Kids",
    subtitle: "Age-appropriate safety lessons for children growing up online",
    description: "Teach kids how to spot danger, ask for help, and make safer choices online.",
    longDescription:
      "Cyber Awareness for Kids gives adults a structured way to teach children about online trust, privacy, and pressure. It focuses on simple concepts children can remember and repeat, while also helping parents avoid fear-based teaching.",
    price: 19.99,
    total_pages: 88,
    image: bookCyberKids,
    tag: "Kids",
    stripe_price_id: "price_1SjwOgJ8osfwYbX7BFT7VyBl",
    category: "family",
    ideal_for: "parents, guardians, teachers, and children learning digital habits early",
    outcomes: [
      "Teach kids the difference between kind, tricky, and unsafe online behavior.",
      "Give children simple rules they can use before clicking, sharing, or chatting.",
      "Create a family culture where asking for help is normal and safe.",
      "Support screen safety without relying on fear or constant surveillance alone.",
    ],
    risk_signals: [
      "A child is told to keep a chat, gift, or game interaction secret.",
      "An online contact asks for photos, location, or account details.",
      "Game rewards or social approval are used to bypass family rules.",
      "Kids assume someone is safe because they are funny, young, or seem familiar.",
    ],
    controls: [
      "Use short, repeated rules children can say back in their own words.",
      "Keep devices and games tied to age-appropriate privacy settings and supervision.",
      "Teach children to pause and show an adult anything confusing or urgent.",
      "Practice what to do with friend requests, in-game chats, and links.",
    ],
    response_plan: [
      "Reassure the child first so fear does not become the lesson.",
      "Save the message or username before blocking or reporting the contact.",
      "Review what happened together and connect it back to the family rule set.",
      "Adjust settings, contacts, or device placement if the pattern may repeat.",
    ],
    practice_plan: [
      "Use short weekly check-ins instead of one big safety talk.",
      "Replay real examples with children so the lesson feels concrete.",
      "Praise kids for speaking up even when they already clicked or replied.",
      "Update rules as games, apps, and ages change.",
    ],
    chapter_titles: [
      "Teaching Safety Without Fear",
      "The Tricky Situations Kids Need to Recognize",
      "Simple Rules That Children Can Use",
      "Helping a Child After Something Goes Wrong",
      "Growing Safer Digital Habits Together",
    ],
  },
  {
    id: "book-smart-home",
    slug: "smart-home-security",
    name: "Smart Home Security",
    subtitle: "Protect connected devices before convenience becomes an entry point",
    description: "Secure cameras, speakers, routers, doorbells, and other connected home technology.",
    longDescription:
      "Smart Home Security shows how convenience devices create real attack paths when setup is rushed or forgotten. It helps households secure routers, connected devices, permissions, and vendor trust without abandoning helpful technology.",
    price: 28.99,
    total_pages: 104,
    image: bookSmartHome,
    tag: "IoT",
    stripe_price_id: "price_1SjwOiJ8osfwYbX7crdnnxDP",
    category: "tech",
    ideal_for: "homeowners, renters, caregivers, and anyone running connected devices at home",
    outcomes: [
      "Understand how smart devices expand the attack surface inside a home.",
      "Set up routers, guest networks, and device permissions more safely.",
      "Reduce privacy leaks from cameras, microphones, and cloud integrations.",
      "Make future device purchases with better security judgment.",
    ],
    risk_signals: [
      "Devices still use default passwords or vague vendor accounts.",
      "One compromise could expose cameras, locks, speakers, and appliances together.",
      "You trust device brands based on convenience or price rather than support quality.",
      "Family members install new smart devices without a shared setup process.",
    ],
    controls: [
      "Use strong router settings, separate guest networks, and unique device credentials.",
      "Limit cloud integrations and third-party skills to what is truly necessary.",
      "Review microphone, camera, and sharing permissions device by device.",
      "Favor vendors that support updates, disclosure, and clear admin controls.",
    ],
    response_plan: [
      "Disconnect suspicious devices from the network before resetting everything blindly.",
      "Change router, admin, and vendor account credentials in a deliberate order.",
      "Review event logs, sharing settings, and access invitations after a concern.",
      "Replace abandoned devices if the vendor can no longer support them safely.",
    ],
    practice_plan: [
      "Audit connected devices quarterly and remove the ones nobody uses.",
      "Treat every new smart device like a new account that needs secure setup.",
      "Review household access whenever guests, roommates, or caregivers change.",
      "Keep convenience behind trust, not ahead of it.",
    ],
    chapter_titles: [
      "How Smart Homes Create Hidden Risk",
      "Weak Spots in Everyday Device Use",
      "Safer Setup for Routers and Devices",
      "When a Connected Home Feels Compromised",
      "Keeping Convenience on Your Terms",
    ],
  },
  {
    id: "book-phishing-defense",
    slug: "email-phishing-defense",
    name: "Email Phishing Defense",
    subtitle: "Spot manipulative email before it becomes a login, invoice, or malware problem",
    description: "Recognize phishing patterns and build response habits that make email safer.",
    longDescription:
      "Email Phishing Defense is a focused guide to one of the most successful attack channels in the world. It teaches readers how scammers use urgency, brand mimicry, and account fear to bypass judgment and gain access quickly.",
    price: 25.99,
    total_pages: 98,
    image: bookPhishingDefense,
    tag: "Email",
    stripe_price_id: "price_1SjwOjJ8osfwYbX7QoqGc9FQ",
    category: "scam",
    ideal_for: "employees, families, and anyone who manages a busy inbox",
    outcomes: [
      "Identify the visual and behavioral patterns behind most phishing emails.",
      "Verify messages without clicking the very link asking for trust.",
      "Reduce the likelihood that one compromised inbox becomes a wider breach.",
      "Respond faster when suspicious email has already been opened or answered.",
    ],
    risk_signals: [
      "The message pressures you with account closure, billing failure, or unusual activity.",
      "Display names look normal while domains or reply paths do not.",
      "Attachments or links arrive without context but ask for immediate review.",
      "The email tries to move you away from your normal approval or login path.",
    ],
    controls: [
      "Use bookmarks and known login routes instead of email links for important accounts.",
      "Train yourself to inspect sender details, domains, and attachment types.",
      "Protect your email account with strong MFA because it controls other recovery paths.",
      "Report suspicious messages centrally if you are in a family or business environment.",
    ],
    response_plan: [
      "Stop interacting and preserve the message before deleting it.",
      "Change credentials and review sessions if you entered anything into a linked site.",
      "Run malware checks and isolate the device if an attachment was opened.",
      "Warn affected coworkers or family members if the phish may spread through you.",
    ],
    practice_plan: [
      "Use weekly inbox reviews to reinforce what suspicious patterns look like.",
      "Keep phishing examples for teaching instead of relying on memory.",
      "Normalize skepticism toward all unexpected account messages.",
      "Treat reporting as part of daily hygiene, not an escalation reserved for experts.",
    ],
    chapter_titles: [
      "Why Phishing Still Works",
      "Email Signals That Deserve a Hard Stop",
      "Inbox Habits That Block the Attack",
      "After the Click: Response Priorities",
      "Building an Anti-Phishing Culture",
    ],
  },
  {
    id: "book-banking-safety",
    slug: "banking-and-financial-safety",
    name: "Banking & Financial Safety",
    subtitle: "Protect money movement, account access, and trust around financial decisions",
    description: "Secure online banking, transfers, and financial routines before criminals redirect them.",
    longDescription:
      "Banking & Financial Safety is built around the moments where money can move fast: logins, transfers, new payees, urgent calls, and payment method changes. It helps readers reduce financial exposure before a single bad decision cascades.",
    price: 31.99,
    total_pages: 126,
    image: bookBankingSafety,
    tag: "Finance",
    stripe_price_id: "price_1SjwOlJ8osfwYbX7jMwpmurh",
    category: "finance",
    ideal_for: "adults managing bills, investments, and family or small-business finances online",
    outcomes: [
      "Protect the accounts and decisions that move real money quickly.",
      "Use alerts, approvals, and verification to reduce financial fraud risk.",
      "Spot fake bank communications and social engineering around payments.",
      "Know how to respond when a transaction or login looks wrong.",
    ],
    risk_signals: [
      "A payment change request arrives through email alone.",
      "A caller uses fear about fraud to rush you into 'fixing' the issue live.",
      "Small unusual charges or account notices are ignored as harmless noise.",
      "The same device, number, or inbox controls too many recovery options.",
    ],
    controls: [
      "Turn on transaction alerts and require stronger verification for sensitive changes.",
      "Use saved contact channels for banks and financial institutions instead of inbound requests.",
      "Separate browsing, email, and financial workflows when possible.",
      "Review account permissions, payees, and linked apps on a recurring schedule.",
    ],
    response_plan: [
      "Call the bank immediately through a trusted number if money or access may be at risk.",
      "Freeze cards, transfers, or account activity before investigating details.",
      "Document timestamps, caller claims, and transaction references carefully.",
      "Review connected email and phone security because they often explain the breach path.",
    ],
    practice_plan: [
      "Schedule weekly statement and alert review, even when nothing seems wrong.",
      "Use a two-person verification rule for unusual family or business transfers.",
      "Recheck beneficiaries, automatic payments, and linked services quarterly.",
      "Treat financial calm as the result of discipline, not luck.",
    ],
    chapter_titles: [
      "How Financial Fraud Finds Openings",
      "Warnings You Should Never Dismiss",
      "Controls Around Money Movement",
      "Containing a Banking Incident",
      "Keeping Financial Routines Strong",
    ],
  },
  {
    id: "book-mobile-security",
    slug: "mobile-phone-security",
    name: "Mobile Phone Security",
    subtitle: "Protect the device that now controls identity, banking, and daily life",
    description: "Secure your smartphone settings, apps, and recovery paths before one device becomes one point of failure.",
    longDescription:
      "Mobile Phone Security focuses on the modern reality that phones are now wallet, communicator, authenticator, and recovery channel all at once. It teaches readers how to reduce app risk, carrier risk, and device-loss risk without making the phone unusable.",
    price: 23.99,
    total_pages: 94,
    image: bookMobileSecurity,
    tag: "Mobile",
    stripe_price_id: "price_1SjwOmJ8osfwYbX7mo35N9ap",
    category: "tech",
    ideal_for: "smartphone users on iPhone or Android who rely on mobile-first workflows",
    outcomes: [
      "Understand why the phone is often the key to every other account.",
      "Lock down app permissions, device access, and carrier recovery settings.",
      "Reduce the risk of loss, theft, malicious apps, and SIM-related fraud.",
      "Recover more cleanly if the phone is lost or compromised.",
    ],
    risk_signals: [
      "Too many important services depend on one unlocked or weakly protected phone.",
      "Apps request broad permissions that have nothing to do with their function.",
      "Carrier security and account PIN settings have never been reviewed.",
      "You assume app store availability is the same as app trustworthiness.",
    ],
    controls: [
      "Use strong device locks, biometric access, and encrypted backups.",
      "Review app permissions and remove unused or low-trust apps regularly.",
      "Protect the carrier account with a PIN or port-out safeguards.",
      "Separate authenticator apps, password managers, and recovery notes thoughtfully.",
    ],
    response_plan: [
      "Trigger device lock or remote wipe if the phone is lost or stolen.",
      "Contact the carrier quickly if account takeover or SIM swap is possible.",
      "Reset high-value account access in order of dependency, starting with email.",
      "Review backup health before restoring blindly to a replacement device.",
    ],
    practice_plan: [
      "Treat app installs as security decisions, not just convenience choices.",
      "Do a monthly permission and notification audit.",
      "Keep offline copies of the contacts and recovery steps you would need in a phone emergency.",
      "Rehearse what to do if the phone disappears so panic does not drive the response.",
    ],
    chapter_titles: [
      "Why the Phone Became the Master Key",
      "Everyday Mobile Weak Points",
      "Stronger Device and App Controls",
      "Responding to Loss, Theft, or Takeover",
      "Keeping Mobile Security Manageable",
    ],
  },
  {
    id: "book-crypto-defense",
    slug: "crypto-scam-defense",
    name: "Crypto Scam Defense",
    subtitle: "Protect digital assets from fraud, hype, and irreversible mistakes",
    description: "Learn the fraud patterns, wallet risks, and verification rules that matter in crypto.",
    longDescription:
      "Crypto Scam Defense is built for readers who know the technology may be legitimate but understand the surrounding ecosystem is full of manipulation. It focuses on wallet hygiene, platform risk, social engineering, and the irreversible nature of many crypto transactions.",
    price: 34.99,
    total_pages: 130,
    image: bookCryptoDefense,
    tag: "Crypto",
    stripe_price_id: "price_1StJmsJ8osfwYbX7ioMIlJB0",
    category: "finance",
    ideal_for: "newer investors, curious adopters, and families protecting loved ones from crypto hype",
    outcomes: [
      "Recognize the difference between crypto education and crypto manipulation.",
      "Protect wallets, seed phrases, and exchange access more effectively.",
      "Spot social, romantic, and investment pressure tactics tied to digital assets.",
      "Respond faster when funds, accounts, or devices may be exposed.",
    ],
    risk_signals: [
      "An opportunity claims guaranteed returns, urgency, or inside access.",
      "The other party wants you to move off reputable platforms into private channels.",
      "Seed phrases or wallet recovery data are treated casually or stored in cloud notes.",
      "Education is replaced by status language, screenshots, and fear of missing out.",
    ],
    controls: [
      "Use hardware wallets or high-trust custody practices for meaningful amounts.",
      "Verify platform reputation, support quality, and withdrawal rules before funding.",
      "Keep seed phrases offline and separate from the devices they protect.",
      "Use a skepticism rule for all recommendations arriving through social media or dating channels.",
    ],
    response_plan: [
      "Move remaining funds only after confirming the wallet path is clean and trusted.",
      "Change exchange credentials and review device security if account compromise is suspected.",
      "Preserve wallet addresses, transaction hashes, and conversation history for investigators.",
      "Warn contacts if the scammer may use your name or profile to reach others.",
    ],
    practice_plan: [
      "Review holdings, wallet access, and exchange exposure on a fixed schedule.",
      "Keep speculative activity separate from essential savings and bills.",
      "Treat every new token, platform, or scheme as untrusted until verified.",
      "Remember that irreversible transactions demand slower judgment, not faster enthusiasm.",
    ],
    chapter_titles: [
      "Why Crypto Fraud Feels Different",
      "Red Flags in Wallets, Platforms, and Promises",
      "Controls for Assets That Do Not Come Back Easily",
      "Response After Exposure or Loss",
      "Keeping Discipline in a Hype-Driven Market",
    ],
  },
  {
    id: "book-romance-scam",
    slug: "romance-scam-awareness",
    name: "Romance Scam Awareness",
    subtitle: "Protect emotional trust before it is converted into financial harm",
    description: "Learn the pace, scripts, and manipulation patterns behind modern romance fraud.",
    longDescription:
      "Romance Scam Awareness explains how emotional manipulation works long before the money request arrives. It helps readers keep compassion and hope intact while still using verification, pacing, and outside perspective to protect themselves.",
    price: 28.99,
    total_pages: 116,
    image: bookRomanceScam,
    tag: "Relationships",
    stripe_price_id: "price_1StJmtJ8osfwYbX7cCVawnfv",
    category: "scam",
    ideal_for: "dating app users, older adults, caregivers, and people supporting someone in an online relationship",
    outcomes: [
      "Recognize the stages of romance scams before the financial ask becomes central.",
      "Use verification and pacing without apologizing for caution.",
      "Protect loneliness, grief, and hope from becoming attack vectors.",
      "Respond with clarity if you or someone you love is already entangled.",
    ],
    risk_signals: [
      "Intimacy accelerates before basic identity and life details are verified.",
      "The person resists live video, meeting in person, or everyday proof of reality.",
      "A crisis appears that only you can solve with urgent money or secrecy.",
      "You feel pressure to defend the relationship from friends or family concerns.",
    ],
    controls: [
      "Use reverse image checks, live verification, and third-party perspective early.",
      "Separate emotional connection from money, travel, and account access completely.",
      "Treat repeated excuses against verification as evidence, not a temporary inconvenience.",
      "Keep loved ones informed when a relationship becomes serious online.",
    ],
    response_plan: [
      "Pause payments and preserve the full conversation history before confronting the person.",
      "Alert banks, payment services, and platforms if funds or credentials were shared.",
      "Bring in a trusted outside voice because isolation sustains the scam.",
      "Protect against follow-on scams that target prior victims with fake recovery promises.",
    ],
    practice_plan: [
      "Normalize slow trust and direct verification in all online dating.",
      "Review your emotional pressure points during lonely or high-stress seasons.",
      "Keep standards steady even when the relationship feels unusually meaningful.",
      "Treat outside concern as data worth considering, not disloyalty.",
    ],
    chapter_titles: [
      "Why Romance Scams Feel So Convincing",
      "Signals Hidden in the Courtship Pattern",
      "Verification and Boundaries That Protect the Heart",
      "Breaking the Scam Cycle Safely",
      "Dating with More Clarity and Less Risk",
    ],
  },
  {
    id: "book-voice-clone",
    slug: "voice-clone-detection",
    name: "Voice Clone Detection",
    subtitle: "Family and business safeguards against AI-generated phone trust",
    description: "Detect synthetic voice calls before fear, urgency, or care turns into fraud.",
    longDescription:
      "Voice Clone Detection focuses on a highly emotional threat: hearing a trusted voice used to create panic or obedience. The book gives readers fast verification methods that work under stress when the voice sounds real enough to override judgment.",
    price: 31.99,
    total_pages: 120,
    image: bookVoiceClone,
    tag: "AI Safety",
    stripe_price_id: "price_1StJmuJ8osfwYbX7s4o4JB2a",
    category: "ai",
    ideal_for: "families, executive assistants, office managers, and anyone likely to act on urgent calls",
    outcomes: [
      "Understand how little audio an attacker may need to imitate a trusted voice.",
      "Use code words, callbacks, and secondary verification before acting.",
      "Recognize emotional pressure tactics that pair perfectly with cloned audio.",
      "Create family or workplace rules that survive panic.",
    ],
    risk_signals: [
      "The call creates crisis and isolation before giving time to verify.",
      "The voice sounds familiar, but the story bypasses normal communication patterns.",
      "You are told not to contact other family members or coworkers.",
      "The request jumps quickly to money transfer, gift cards, or wire instructions.",
    ],
    controls: [
      "Set family or workplace code words for distress scenarios.",
      "Verify high-stakes requests through a second known number or messaging path.",
      "Limit public audio oversharing where possible without assuming silence is the only answer.",
      "Teach everyone that sounding real is no longer proof of identity.",
    ],
    response_plan: [
      "End the call and initiate your own callback process immediately.",
      "Document the number, claims, and requested payment path before details fade.",
      "Warn the broader family or team if the same voice could be used elsewhere.",
      "Report the attempt to carriers, banks, or internal security contacts when applicable.",
    ],
    practice_plan: [
      "Refresh code words and emergency contact trees regularly.",
      "Drill one calm verification script until it is automatic under stress.",
      "Treat all surprise crisis calls as unverified until checked.",
      "Review public audio exposure when family or business roles change.",
    ],
    chapter_titles: [
      "How Voice Cloning Changes Fraud",
      "When Familiar Voices Should Raise Alarm",
      "Verification Paths That Beat Panic",
      "Responding to a Suspicious Call",
      "Keeping Family and Teams Ready",
    ],
  },
  {
    id: "book-medicare-fraud",
    slug: "medicare-fraud-protection",
    name: "Medicare Fraud Protection",
    subtitle: "Guard healthcare benefits, identity, and trust around senior care",
    description: "Protect Medicare numbers, billing history, and senior healthcare decisions from fraud.",
    longDescription:
      "Medicare Fraud Protection focuses on one of the most sensitive intersections of identity, health, and money. It helps seniors and caregivers distinguish real healthcare administration from exploitative calls, fake offers, and billing abuse.",
    price: 26.99,
    total_pages: 106,
    image: bookMedicareFraud,
    tag: "Healthcare",
    stripe_price_id: "price_1StJmvJ8osfwYbX7NqgadyPs",
    category: "seniors",
    ideal_for: "Medicare beneficiaries, caregivers, and adult children helping with healthcare matters",
    outcomes: [
      "Recognize how Medicare-related scams are framed and delivered.",
      "Protect benefit numbers and healthcare paperwork more carefully.",
      "Review billing and notices with clearer expectations.",
      "Respond faster if a number, provider interaction, or claim looks wrong.",
    ],
    risk_signals: [
      "You are offered free equipment or services in exchange for a Medicare number.",
      "The caller claims urgency around coverage changes or immediate enrollment.",
      "Billing notices contain services or providers you do not recognize.",
      "Healthcare trust is used to lower your skepticism about identity questions.",
    ],
    controls: [
      "Keep Medicare information as protected as banking or Social Security data.",
      "Use official channels for plan, provider, and claim questions.",
      "Review summary notices and explanation of benefits consistently.",
      "Involve a trusted caregiver or family member before acting on confusing requests.",
    ],
    response_plan: [
      "Report suspicious provider or billing activity through the right Medicare channels quickly.",
      "Document dates, providers, numbers, and services tied to the concern.",
      "Freeze related identity avenues if broader data exposure is possible.",
      "Tell caregivers or family so repeated contact is easier to intercept.",
    ],
    practice_plan: [
      "Check Medicare notices on a routine schedule instead of letting them pile up.",
      "Keep healthcare contacts organized in one trusted place.",
      "Use a second person for review when major healthcare changes are proposed.",
      "Treat medical urgency and administrative urgency as different things.",
    ],
    chapter_titles: [
      "Why Healthcare Fraud Targets Seniors",
      "Claims, Calls, and Offers That Should Not Be Trusted",
      "Safer Handling of Medicare Information",
      "What to Do When a Claim Looks Wrong",
      "Maintaining Confidence in Healthcare Administration",
    ],
  },
  {
    id: "book-email-safety",
    slug: "email-safety-essentials",
    name: "Email Safety Essentials",
    subtitle: "A cleaner, safer inbox for daily communication and account protection",
    description: "Reduce inbox risk with better habits for attachments, links, account messages, and settings.",
    longDescription:
      "Email Safety Essentials covers the broader daily discipline of email safety, not only phishing campaigns. It helps readers keep inboxes organized, lower exposure to malicious content, and protect the account that usually powers password resets everywhere else.",
    price: 22.99,
    total_pages: 92,
    image: bookEmailSafety,
    tag: "Email",
    stripe_price_id: "price_1StJmxJ8osfwYbX7UPSnS1v8",
    category: "scam",
    ideal_for: "anyone whose email account serves as the hub for work, shopping, and recovery",
    outcomes: [
      "Use email more intentionally as a security-critical system, not just a message bucket.",
      "Reduce risk from attachments, links, spam, and account impersonation.",
      "Organize important communications so fake urgency stands out faster.",
      "Protect email settings and recovery options that affect the rest of your accounts.",
    ],
    risk_signals: [
      "Important and unimportant mail are mixed together with no structure.",
      "Unexpected attachments or login prompts feel routine because the inbox is noisy.",
      "Recovery settings are outdated, weak, or dependent on one compromised device.",
      "Spam fatigue lowers your ability to detect high-risk messages quickly.",
    ],
    controls: [
      "Use folders, filters, and starred contacts to make suspicious mail more visible.",
      "Protect the mailbox with strong MFA and recovery hygiene.",
      "Open attachments only when the sender, expectation, and file type all make sense.",
      "Unsubscribe and clean up aggressively so attention is not constantly diluted.",
    ],
    response_plan: [
      "Review sent items, forwarding rules, and sessions if the account behaves strangely.",
      "Change credentials and recovery options before diving into inbox cleanup.",
      "Warn contacts if your mailbox may have been used to reach them.",
      "Preserve suspicious messages for reporting before mass deleting them.",
    ],
    practice_plan: [
      "Use a weekly inbox reset to keep important patterns visible.",
      "Review filters and forwarding rules monthly.",
      "Retire old email addresses from sensitive accounts when possible.",
      "Treat inbox clarity as a security control, not just a productivity preference.",
    ],
    chapter_titles: [
      "Why Inbox Hygiene Matters",
      "Signals Hidden Inside Daily Email Noise",
      "Safer Habits for Links, Attachments, and Settings",
      "Responding to Mailbox Trouble",
      "Keeping the Inbox Calm and Defensible",
    ],
  },
  {
    id: "book-tax-scam",
    slug: "tax-scam-prevention",
    name: "Tax Scam Prevention",
    subtitle: "Protect filings, refunds, and identity during the most rushed season of the year",
    description: "Learn how tax-season pressure is used to steal money, data, and identity.",
    longDescription:
      "Tax Scam Prevention focuses on the specific mix of urgency, fear, and administrative confusion that makes tax season such a productive time for criminals. It helps readers protect filing information, recognize fake tax authorities, and respond if returns or identities are compromised.",
    price: 29.99,
    total_pages: 108,
    image: bookTaxScam,
    tag: "Finance",
    stripe_price_id: "price_1StJmyJ8osfwYbX7tb11WOIS",
    category: "finance",
    ideal_for: "taxpayers, small business owners, retirees, and families managing yearly filing duties",
    outcomes: [
      "Recognize the scripts and timing used in IRS and refund-related scams.",
      "Protect the data, documents, and portals involved in filing season.",
      "Verify tax communications without relying on inbound messages.",
      "Act quickly if someone files in your name or intercepts your refund path.",
    ],
    risk_signals: [
      "A caller threatens immediate legal action or demands payment now.",
      "A message promises a refund shortcut or asks for filing credentials by email or text.",
      "Tax paperwork is stored or shared casually through insecure channels.",
      "Fear of deadlines makes unusual instructions feel legitimate.",
    ],
    controls: [
      "Use trusted preparers, secure portals, and known IRS contact routes only.",
      "Protect tax documents like identity documents because they often contain everything needed for fraud.",
      "Track filing status deliberately instead of waiting for inbound alerts.",
      "Store prior-year records securely for comparison and anomaly detection.",
    ],
    response_plan: [
      "Contact the tax authority or preparer through verified channels immediately when something looks off.",
      "Preserve notices, transcripts, and communication history.",
      "Harden identity defenses if filing information may have leaked.",
      "Document the event carefully so follow-up agencies can connect the issue.",
    ],
    practice_plan: [
      "Prepare documents early to reduce deadline-driven decision quality.",
      "Review tax account access and storage habits every season.",
      "Keep a consistent filing workflow instead of improvising each year.",
      "Treat tax urgency as a signal to slow down, not speed up.",
    ],
    chapter_titles: [
      "Why Tax Season Creates Opportunity for Scammers",
      "Threats Hidden in Filing Pressure",
      "Safer Handling of Tax Documents and Notices",
      "What to Do When a Filing Problem Appears",
      "Building a Cleaner Tax Workflow Each Year",
    ],
  },
  {
    id: "book-tech-support",
    slug: "tech-support-fraud-defense",
    name: "Tech Support Fraud Defense",
    subtitle: "Stay calm when pop-ups, callers, and fake experts demand control",
    description: "Learn how fake support scams create panic and how to shut them down safely.",
    longDescription:
      "Tech Support Fraud Defense explains how scammers impersonate Microsoft, Apple, antivirus vendors, and device repair services to gain payment or remote control. It helps readers separate real troubleshooting from manipulative theater.",
    price: 25.99,
    total_pages: 100,
    image: bookTechSupport,
    tag: "Tech",
    stripe_price_id: "price_1StJmzJ8osfwYbX7SE1V5Dnn",
    category: "tech",
    ideal_for: "older adults, home users, office staff, and anyone uncomfortable with computer error messages",
    outcomes: [
      "Recognize fake support alerts, calls, and browser-lock tactics quickly.",
      "Avoid giving remote access or payment to unverified support contacts.",
      "Use safer routes for real troubleshooting when a device has a genuine problem.",
      "Respond correctly if a scammer already touched the machine or account.",
    ],
    risk_signals: [
      "A pop-up claims your device is locked or infected and gives one urgent number to call.",
      "Support reaches out to you first instead of responding to your request.",
      "The solution begins with remote access before identity or warranty details are confirmed.",
      "You are pushed toward gift cards, wire transfers, or repeated subscription fees.",
    ],
    controls: [
      "Close suspicious browser tabs or restart the device instead of engaging the alert.",
      "Use official vendor sites and known support portals when help is actually needed.",
      "Keep backups and software updates current so panic is less persuasive.",
      "Train family members to ask a trusted person before granting remote access.",
    ],
    response_plan: [
      "Disconnect the device from the network if remote access or malware may have been involved.",
      "Remove remote tools, change credentials, and review financial exposure promptly.",
      "Document the fraud path, payment attempt, and any installed software.",
      "Tell other household members or coworkers so the same script does not work twice.",
    ],
    practice_plan: [
      "Save official support contacts before a problem happens.",
      "Use routine maintenance so common issues are less likely to spark panic.",
      "Teach one shared rule: real support almost never begins with fear.",
      "Treat every alarming support message as unverified until you initiated the contact.",
    ],
    chapter_titles: [
      "How Fake Support Creates Panic",
      "Red Flags in Error Messages and Phone Scripts",
      "Safer Troubleshooting Paths",
      "Cleaning Up After a Support Scam",
      "Keeping Tech Problems from Becoming Fraud Events",
    ],
  },
  {
    id: "book-grandparent-scam",
    slug: "grandparent-scam-defense",
    name: "Grandparent Scam Defense",
    subtitle: "Family safeguards against emergency calls built on love and panic",
    description: "Stop fake family crises from turning fear into fast irreversible payments.",
    longDescription:
      "Grandparent Scam Defense focuses on one of the most emotionally loaded fraud patterns in circulation. It helps families create verification rituals that work even when a call sounds urgent, personal, and heartbreakingly real.",
    price: 24.99,
    total_pages: 94,
    image: bookGrandparentScam,
    tag: "Family",
    stripe_price_id: "price_1StJn0J8osfwYbX7t2Ta3TxZ",
    category: "family",
    ideal_for: "grandparents, parents, caregivers, and close-knit families",
    outcomes: [
      "Recognize the emotional structure behind fake family emergencies.",
      "Use family verification methods that do not depend on memory under stress.",
      "Protect older relatives without making them feel monitored or infantilized.",
      "Respond faster if money or information was already shared.",
    ],
    risk_signals: [
      "The caller begs for secrecy from parents, siblings, or other relatives.",
      "The story requires immediate payment through unusual channels.",
      "The details are dramatic but oddly vague when challenged calmly.",
      "You feel compelled to act first and verify later because someone you love might suffer.",
    ],
    controls: [
      "Use family code words and callback trees for emergency situations.",
      "Agree in advance that no one will be offended by verification during a crisis.",
      "Keep official family contact information easy to reach without searching.",
      "Teach all generations that urgent emotion is exactly when systems matter most.",
    ],
    response_plan: [
      "End the call and begin your family callback sequence immediately.",
      "Capture what was said, what number was used, and what payment was requested.",
      "Notify other relatives so the same story does not spread through the family.",
      "Contact financial institutions fast if any transaction has already started.",
    ],
    practice_plan: [
      "Refresh family code words and contact trees regularly.",
      "Use holidays or reunions to rehearse verification in a low-stress setting.",
      "Keep grandparents included in the process instead of making decisions around them.",
      "Treat every family emergency call as a moment for systems, not improvisation.",
    ],
    chapter_titles: [
      "Why Family Love Is an Attack Surface",
      "The Pressure Pattern Behind Emergency Calls",
      "Family Systems That Stop the Scam",
      "What to Do When Panic Already Took Over",
      "Keeping Every Generation Prepared",
    ],
  },
  {
    id: "book-investment-fraud",
    slug: "investment-fraud-guide",
    name: "Investment Fraud Guide",
    subtitle: "Disciplined due diligence for offers that arrive wrapped in confidence",
    description: "Learn how to test investment claims before hype, pressure, and status cost you real money.",
    longDescription:
      "Investment Fraud Guide helps readers evaluate investment opportunities with structure instead of emotion. It centers on due diligence, advisor verification, fraud patterns, and the social pressure that often accompanies financial scams.",
    price: 36.99,
    total_pages: 136,
    image: bookInvestmentFraud,
    tag: "Investing",
    stripe_price_id: "price_1StJn1J8osfwYbX77tR8VN6p",
    category: "finance",
    ideal_for: "retirees, professionals, families protecting savings, and cautious investors",
    outcomes: [
      "Identify the pressure tactics that often hide poor or fraudulent investments.",
      "Use a repeatable due diligence process before moving money.",
      "Separate legitimate opportunity from affinity fraud, secrecy, and manufactured exclusivity.",
      "Respond faster if you suspect a fraudulent advisor or scheme.",
    ],
    risk_signals: [
      "The opportunity promises unusually smooth or guaranteed returns.",
      "Trust is built on social similarity, faith, status, or insider language instead of transparency.",
      "You are discouraged from seeking outside review or waiting.",
      "Documents are vague, changing, or overly polished without real substance.",
    ],
    controls: [
      "Verify licenses, registrations, and custody arrangements independently.",
      "Use written due diligence questions before every major investment decision.",
      "Separate long-term savings from speculative or relationship-driven opportunities.",
      "Require a cooling-off period before acting on any urgent offer.",
    ],
    response_plan: [
      "Stop additional transfers and gather every statement, promise, and communication.",
      "Notify brokers, banks, and regulators as appropriate while evidence is organized.",
      "Document who introduced the investment and how trust was established.",
      "Protect against secondary fraud from fake recovery services or new offers.",
    ],
    practice_plan: [
      "Use a standing checklist instead of evaluating each opportunity from scratch.",
      "Review advisor relationships and account statements with a skeptical eye regularly.",
      "Invite a second informed person into major decisions.",
      "Treat slow diligence as a strength in any market environment.",
    ],
    chapter_titles: [
      "How Investment Scams Borrow Trust",
      "Pressure, Exclusivity, and Affinity Red Flags",
      "Due Diligence That Protects Capital",
      "What to Do When an Investment Looks Wrong",
      "Keeping Discipline in Wealth Decisions",
    ],
  },
  {
    id: "book-charity-scam",
    slug: "charity-scam-awareness",
    name: "Charity Scam Awareness",
    subtitle: "Give generously without funding manipulation, guilt, or fake causes",
    description: "Verify causes and campaigns before compassion is converted into fraud.",
    longDescription:
      "Charity Scam Awareness helps donors keep generosity strong while making verification a normal part of giving. It focuses on emotional urgency, disaster-based solicitation, fake nonprofits, and the payment habits that make charitable fraud harder to reverse.",
    price: 21.99,
    total_pages: 90,
    image: bookCharityScam,
    tag: "Giving",
    stripe_price_id: "price_1StJn2J8osfwYbX7i25vJA5t",
    category: "social",
    ideal_for: "donors, faith communities, volunteers, and families that give during crises",
    outcomes: [
      "Recognize the cues of charitable fraud without becoming cynical about real causes.",
      "Verify organizations, campaigns, and peer-to-peer appeals before donating.",
      "Choose payment and recordkeeping habits that protect both generosity and accountability.",
      "Respond intelligently when a giving campaign appears deceptive.",
    ],
    risk_signals: [
      "A crisis is used to push immediate giving without verifiable organizational detail.",
      "The appeal leans on guilt, pressure, or emotional imagery more than transparency.",
      "Donation channels direct you away from official websites or tax documentation.",
      "A familiar friend or community figure shares a campaign that has not been verified.",
    ],
    controls: [
      "Use official organization websites and trusted charity databases before donating.",
      "Prefer payment methods with records and fraud protections.",
      "Check whether the stated impact, contact details, and nonprofit status align.",
      "Pause before sharing campaigns publicly if you have not verified them yourself.",
    ],
    response_plan: [
      "Stop additional giving until the campaign is validated independently.",
      "Preserve receipts, links, and outreach messages for dispute or reporting.",
      "Warn your network if a suspicious appeal circulated through community trust.",
      "Review other recent campaigns if one fraudulent appeal got through.",
    ],
    practice_plan: [
      "Keep a shortlist of trusted organizations for crisis giving.",
      "Decide donation criteria before emotional events unfold.",
      "Review yearly giving records for transparency and tax accuracy.",
      "Let generosity stay open while standards stay firm.",
    ],
    chapter_titles: [
      "Why Giving Is Easy to Exploit",
      "Emotional Appeals That Need Verification",
      "Safer Ways to Donate and Share",
      "When a Campaign Looks Fraudulent",
      "Generosity with Better Standards",
    ],
  },
];

export const BOOK_CATALOG: BookItem[] = BOOK_SEEDS.map(createBook);

export function getBookById(id: string): BookItem | undefined {
  return BOOK_CATALOG.find((book) => book.id === id);
}

export function getBookBySlug(slug: string): BookItem | undefined {
  return BOOK_CATALOG.find((book) => book.slug === slug);
}

export function getBooksByCategory(category: BookCategory): BookItem[] {
  return BOOK_CATALOG.filter((book) => book.category === category);
}

export function getRecommendations(ownedBookIds: string[], limit = 6): BookItem[] {
  const ownedBooks = BOOK_CATALOG.filter((book) => ownedBookIds.includes(book.id));
  const ownedCategories = [...new Set(ownedBooks.map((book) => book.category))];
  const relatedCategories = new Set<BookCategory>();

  ownedCategories.forEach((category) => {
    CATEGORY_RELATIONS[category]?.forEach((related) => relatedCategories.add(related));
  });

  const unownedBooks = BOOK_CATALOG.filter((book) => !ownedBookIds.includes(book.id));
  const scoredBooks = unownedBooks.map((book) => {
    let score = 1;

    if (relatedCategories.has(book.category)) score += 2;
    if (book.tag === "Best Seller" || book.tag === "Featured") score += 1;

    return { book, score };
  });

  scoredBooks.sort((left, right) => right.score - left.score);

  return scoredBooks.slice(0, limit).map((item) => item.book);
}
