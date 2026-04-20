import bookAiFundamentals from "@/assets/book-ai-fundamentals.jpg";
import { AI_FUNDAMENTALS_CHAPTERS } from "@/data/aiFundamentalsContent";
import { SENIORS_SCAM_GUIDE_CHAPTERS } from "@/data/bookSeniorsScamGuide";
import { AI_THREATS_OHIO_CHAPTERS } from "@/data/bookAiThreatsOhio";
import { BUSINESS_PLAYBOOK_CHAPTERS } from "@/data/bookBusinessPlaybook";
import { VOICE_CLONING_GUIDE_CHAPTERS } from "@/data/bookVoiceCloningGuide";
import { GRANDPARENTS_DIGITAL_CHAPTERS } from "@/data/bookGrandparentsDigital";
import { MEDICARE_SCAM_DEFENSE_CHAPTERS } from "@/data/bookMedicareScamDefense";
import { ONLINE_DATING_SENIORS_CHAPTERS } from "@/data/bookOnlineDatingSeniors";
import { RETIREMENT_FRAUD_CHAPTERS } from "@/data/bookRetirementFraud";
import { KIDS_ONLINE_SAFETY_CHAPTERS } from "@/data/bookKidsOnlineSafety";
import { FAMILY_EMERGENCY_CHAPTERS } from "@/data/bookFamilyEmergency";
import { SOCIAL_MEDIA_PRIVACY_FAMILY_CHAPTERS } from "@/data/bookSocialMediaPrivacyFamily";
import { SMART_HOME_SECURITY_CHAPTERS } from "@/data/bookSmartHomeSecurity";
import { EMPLOYEE_TRAINING_CHAPTERS } from "@/data/bookEmployeeTraining";
import { HIPAA_COMPLIANCE_CHAPTERS } from "@/data/bookHipaaCompliance";
import { PCI_DSS_CHAPTERS } from "@/data/bookPciDss";
import { REMOTE_WORK_CHAPTERS } from "@/data/bookRemoteWork";
import { CYBER_INSURANCE_CHAPTERS } from "@/data/bookCyberInsurance";
import { UNDERSTANDING_AI_PLAIN_CHAPTERS } from "@/data/bookUnderstandingAiPlain";
import { PRIVACY_AI_AGE_CHAPTERS } from "@/data/bookPrivacyAiAge";
import { CRYPTOCURRENCY_SAFETY_CHAPTERS } from "@/data/bookCryptocurrencySafety";
import { VETERAN_DIGITAL_CHAPTERS } from "@/data/bookVeteranDigital";
import { CHURCH_NONPROFIT_CHAPTERS } from "@/data/bookChurchNonprofit";
import { REAL_ESTATE_SECURITY_CHAPTERS } from "@/data/bookRealEstateSecurity";
import { DATA_BREACH_LEGAL_CHAPTERS } from "@/data/bookDataBreachLegal";
import { OHIO_DIRECTORY_CHAPTERS } from "@/data/bookOhioDirectory";
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
  chapter_titles: string[];
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

/** Map of book IDs to custom full-content chapters */
const CUSTOM_CHAPTERS: Record<string, BookChapter[]> = {
  "book-ai-fundamentals": AI_FUNDAMENTALS_CHAPTERS,
  "book-seniors-scam-guide": SENIORS_SCAM_GUIDE_CHAPTERS,
  "book-ai-threats-ohio": AI_THREATS_OHIO_CHAPTERS,
  "book-business-playbook": BUSINESS_PLAYBOOK_CHAPTERS,
  "book-voice-cloning-guide": VOICE_CLONING_GUIDE_CHAPTERS,
  "book-grandparents-digital": GRANDPARENTS_DIGITAL_CHAPTERS,
  "book-medicare-scam-defense": MEDICARE_SCAM_DEFENSE_CHAPTERS,
  "book-online-dating-seniors": ONLINE_DATING_SENIORS_CHAPTERS,
  "book-retirement-fraud": RETIREMENT_FRAUD_CHAPTERS,
  "book-kids-online-safety": KIDS_ONLINE_SAFETY_CHAPTERS,
  "book-family-emergency": FAMILY_EMERGENCY_CHAPTERS,
  "book-social-media-privacy-family": SOCIAL_MEDIA_PRIVACY_FAMILY_CHAPTERS,
  "book-smart-home-security": SMART_HOME_SECURITY_CHAPTERS,
  "book-employee-training": EMPLOYEE_TRAINING_CHAPTERS,
  "book-hipaa-compliance": HIPAA_COMPLIANCE_CHAPTERS,
  "book-pci-dss": PCI_DSS_CHAPTERS,
  "book-remote-work": REMOTE_WORK_CHAPTERS,
  "book-cyber-insurance": CYBER_INSURANCE_CHAPTERS,
  "book-understanding-ai-plain": UNDERSTANDING_AI_PLAIN_CHAPTERS,
  "book-privacy-ai-age": PRIVACY_AI_AGE_CHAPTERS,
  "book-cryptocurrency-safety": CRYPTOCURRENCY_SAFETY_CHAPTERS,
  "book-veteran-digital": VETERAN_DIGITAL_CHAPTERS,
  "book-church-nonprofit": CHURCH_NONPROFIT_CHAPTERS,
  "book-real-estate-security": REAL_ESTATE_SECURITY_CHAPTERS,
  "book-data-breach-legal": DATA_BREACH_LEGAL_CHAPTERS,
  "book-ohio-directory": OHIO_DIRECTORY_CHAPTERS,
};

function createBook(seed: BookSeed): BookItem {
  const totalPages = normalizePageCount(seed);
  return {
    ...seed,
    author: BOOK_AUTHOR,
    total_pages: totalPages,
    bulk_price: toCurrency(seed.price * 0.8),
    chapters: CUSTOM_CHAPTERS[seed.id] ?? createChapters({ ...seed, total_pages: totalPages }),
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
    total_pages: 170,
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
      "AI Norms: Ethics, Safety Rules, and Regulatory Frameworks",
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

  // ── InVision Original Books ────────────────────────────────────────────────

  {
    id: "book-seniors-scam-guide",
    slug: "seniors-scam-guide",
    name: "The Senior's Guide to Scam Prevention",
    subtitle: "How to recognize, avoid, and recover from today's most dangerous frauds",
    description: "A warm, accessible guide written specifically for adults 65+ on spotting scams before they strike.",
    longDescription:
      "The Senior's Guide to Scam Prevention walks through the most dangerous frauds targeting older Americans — phone scams, Medicare fraud, grandparent scams, romance scams, and more — using real Ohio case studies and practical scripts you can use the moment something feels wrong.",
    price: 9.99,
    total_pages: 150,
    image: bookGrandparentScam,
    tag: "New",
    stripe_price_id: "price_1TOPGeJ8osfwYbX728o4KUmm", // prod_UN9YEGivYHPkpQ
    category: "seniors",
    ideal_for: "adults 65 and older, caregivers, and family members supporting elderly relatives",
    outcomes: [
      "Recognize the warning signs of the most common scams targeting older adults.",
      "Use simple phone and email scripts to shut down fraud attempts immediately.",
      "Set up a family safety net that protects you without giving up independence.",
      "Know exactly what to do — and who to call — if something goes wrong.",
    ],
    risk_signals: [
      "Caller creates urgency, panic, or secrecy about a family member or financial account.",
      "Payment is requested via gift cards, wire transfer, or cryptocurrency.",
      "Someone claims to be from Medicare, Social Security, or the IRS and threatens consequences.",
      "A new online friend is asking for personal information or financial help.",
    ],
    controls: [
      "Always hang up and call back using a number you find independently — not one the caller provides.",
      "Never pay any bill or emergency request with gift cards under any circumstances.",
      "Create a family code word for real emergencies so you can verify calls from loved ones.",
      "Pause 24 hours before sending any money, even to people you trust.",
    ],
    response_plan: [
      "Contact your bank immediately if any account information was shared or money was sent.",
      "Report the scam to the FTC at reportfraud.ftc.gov and your local police.",
      "Tell a trusted family member or friend what happened — you do not have to handle it alone.",
      "Save all records of the contact: call logs, screenshots, gift card receipts.",
    ],
    practice_plan: [
      "Review one new scam type each month with family or at your senior center.",
      "Keep the family code word updated and share it with your most trusted contacts.",
      "Check your credit report once a year at annualcreditreport.com for unfamiliar accounts.",
      "Place your bank's fraud line number on a card by your telephone.",
    ],
    chapter_titles: [
      "Why Scammers Target Seniors — and Why That's Not Your Fault",
      "Phone Scams: The Calls That Sound Real",
      "Email and Text Scams: Spotting Fakes",
      "The Grandparent Scam and How to Stop It Cold",
      "Medicare, Social Security, and Benefits Fraud",
      "Romance Scams: When the Relationship Isn't Real",
      "Online Shopping and Tech Support Scams",
      "Investment and Lottery Fraud",
      "What to Do If You've Been Scammed",
      "Staying Safe Going Forward",
      "Your Family Safety Network",
    ],
  },

  {
    id: "book-ai-threats-ohio",
    slug: "ai-threats-ohio",
    name: "AI Threats: What Ohio Families Need to Know",
    subtitle: "A plain-language guide to protecting every generation from AI-powered fraud",
    description: "From voice cloning to deepfakes, this guide helps Ohio families understand and defend against AI-powered threats.",
    longDescription:
      "AI Threats: What Ohio Families Need to Know cuts through the hype to explain how artificial intelligence is being used against families right now — voice cloning grandparent scams on I-75, AI-personalized phishing targeting Fifth Third Bank customers, deepfake videos spreading political misinformation across Ohio communities. It gives every generation practical tools to stay safe without living in fear.",
    price: 14.99,
    total_pages: 140,
    image: bookCyberKids,
    tag: "New",
    stripe_price_id: "price_1TOPH2J8osfwYbX7YWvT9VDZ", // prod_UN9Y5DfaRrMMiK
    category: "family",
    ideal_for: "families with children and elderly parents, multigenerational Ohio households",
    outcomes: [
      "Explain what AI is in plain language so every generation in your family understands.",
      "Recognize voice cloning, deepfakes, and AI-powered phishing before they cause harm.",
      "Set up a family code word system and verification protocols that work under pressure.",
      "Protect children, teenagers, and elderly relatives from the specific AI threats targeting them.",
    ],
    risk_signals: [
      "A phone call sounds exactly like a family member but something feels slightly off.",
      "An email from your bank or employer uses your name and personal details but still asks for credentials.",
      "A video or photo of a public figure seems real but the content is shocking or out of character.",
      "Your child is engaging with an online contact they've never met in person.",
    ],
    controls: [
      "Create a family code word that any member can request during a suspicious call to verify identity.",
      "Always call back on a trusted number before responding to any emergency request.",
      "Apply the SIFT method (Stop, Investigate, Find better coverage, Trace the original) to suspicious media.",
      "Review social media privacy settings quarterly as a family.",
    ],
    response_plan: [
      "Hang up immediately on any call that creates urgency before verification is complete.",
      "Report AI-generated fraud to the FTC, FBI IC3, and Ohio Attorney General.",
      "Preserve all evidence before deleting anything — screenshots, call logs, URLs.",
      "Contact an elder law attorney or AARP Fraud Watch if a family member was victimized.",
    ],
    practice_plan: [
      "Hold a monthly 15-minute family safety check-in to discuss new threats.",
      "Test your family code word system every six months.",
      "Review children's social media accounts together as part of an ongoing conversation.",
      "Update privacy settings on all family smart home devices seasonally.",
    ],
    chapter_titles: [
      "What AI Actually Is: A Plain-Language Explanation",
      "Voice Cloning: When the Phone Call Isn't Who You Think",
      "Deepfakes: When Seeing Is No Longer Believing",
      "AI-Powered Phishing: Why the Scam Emails Look Real Now",
      "Social Media Manipulation: How AI Shapes What Your Family Sees",
      "Children's Online Safety in the Age of AI",
      "Protecting Your Elderly Parents from AI Threats",
      "Smart Home Privacy: Alexa, Ring, and AI in Your House",
      "Privacy in the AI Age: What Big Tech Knows About Your Family",
    ],
  },

  {
    id: "book-business-playbook",
    slug: "business-cybersecurity-playbook",
    name: "Small Business Cybersecurity Playbook",
    subtitle: "A practical guide to protecting your business, your customers, and your bottom line",
    description: "The complete cybersecurity playbook for Ohio small businesses with 5–50 employees.",
    longDescription:
      "Small Business Cybersecurity Playbook gives Ohio business owners the exact steps, policies, and frameworks used by companies that survive cyberattacks — and the ones that prevent them in the first place. Built around ROI, real breach costs, and practical Ohio business scenarios, this book pays for itself the first time you stop a phishing email before it becomes a $180,000 ransomware recovery.",
    price: 19.99,
    total_pages: 170,
    image: bookBusinessCyber,
    tag: "New",
    stripe_price_id: "price_1TOPHKJ8osfwYbX7WmFnVhzw", // prod_UN9YKPeBTvydAP
    category: "business",
    ideal_for: "Ohio small business owners, managers, and operations leads with 5–50 employees",
    outcomes: [
      "Calculate your actual breach risk and build a security budget that prevents a $180K loss for $15K/year.",
      "Set up email authentication, MFA, and password management that stops 99% of account takeovers.",
      "Create an incident response plan your team can execute without an IT department.",
      "Understand what cyber insurance actually covers and what it requires you to have in place.",
    ],
    risk_signals: [
      "Employees share passwords or use the same credentials across business and personal accounts.",
      "Wire transfers, payroll changes, or vendor payment updates are approved by one person via email.",
      "Business data has not been backed up and tested in more than 30 days.",
      "Former employees still have access to email, payroll, or company banking.",
    ],
    controls: [
      "Require MFA on all business banking, email, payroll, and accounting accounts today.",
      "Implement dual-person approval for any wire transfer or banking information change.",
      "Run the 3-2-1 backup rule: three copies of critical data, two media types, one stored offsite.",
      "Revoke all system access within four hours of any employee departure.",
    ],
    response_plan: [
      "Isolate affected devices from your network immediately — unplug ethernet, disable Wi-Fi.",
      "Call your cyber insurance hotline before calling IT support or paying any ransom.",
      "Notify affected customers according to Ohio's data breach notification law within 45 days.",
      "Preserve all system logs and communications for law enforcement and insurance claims.",
    ],
    practice_plan: [
      "Test your backup restoration monthly — a backup you haven't tested is a backup you don't have.",
      "Run a phishing simulation on your team every quarter using a free CISA or Google tool.",
      "Review user access rights quarterly and remove permissions that are no longer needed.",
      "Complete Ohio SBDC's free cybersecurity assessment annually to benchmark your progress.",
    ],
    chapter_titles: [
      "Why Small Businesses Are Now Primary Targets",
      "Taking Stock: Your Current Risk Profile",
      "Email Defense: Your Biggest Vulnerability",
      "Ransomware: What It Is, How It Spreads, How to Survive It",
      "Passwords and Access Control: Simple Rules That Save You",
      "Securing Your Network and Devices",
      "Payment Card and Banking Security",
      "Customer Data Protection and Privacy Law",
      "Remote Work Security for Small Teams",
      "Vendor and Supply Chain Risk",
      "Cyber Insurance: What You Need to Know",
      "Employee Training: Your Human Firewall",
      "Incident Response: When Something Goes Wrong",
      "The 90-Day Cybersecurity Roadmap",
    ],
  },

  {
    id: "book-voice-cloning-guide",
    slug: "voice-cloning-deepfakes-guide",
    name: "Voice Cloning & Deepfakes: A Family Safety Guide",
    subtitle: "Understanding and defending against AI-generated deception",
    description: "A narrative-driven guide to how voice cloning and deepfakes work — and how to protect your family from them.",
    longDescription:
      "Voice Cloning & Deepfakes: A Family Safety Guide reads like a page-turner while teaching real defense. Through compelling Ohio case studies — a Columbus woman who nearly fell for a voice-cloned grandmother call, a widower from Canton deceived by a six-month AI-generated romance — it explains exactly how synthetic media is being weaponized against families today, and builds practical protection into every chapter.",
    price: 12.99,
    total_pages: 130,
    image: bookVoiceClone,
    tag: "New",
    stripe_price_id: "price_1TOPHRJ8osfwYbX7fa0zpzXt", // prod_UN9YO1Hm6ZuzN6
    category: "ai",
    ideal_for: "general public, families with elderly relatives, anyone who uses social media",
    outcomes: [
      "Understand how voice cloning and deepfakes work well enough to recognize them under pressure.",
      "Set up a family code word system that defeats even the most convincing voice-cloned calls.",
      "Protect elderly relatives from the grandparent scam upgraded with AI-cloned voices.",
      "Apply the SIFT method to any suspicious audio or video before acting or sharing.",
    ],
    risk_signals: [
      "A caller sounds exactly like a loved one but the request involves urgency and secrecy.",
      "A video of a public figure includes shocking or unexpected statements.",
      "A romantic interest you've never met is building deep emotional rapport and avoiding video calls.",
      "Someone asks you to reduce your social media footprint because a family member's voice was harvested.",
    ],
    controls: [
      "Create a family code word that any member can ask for to verify identity on any call.",
      "Always call back on a trusted number before responding to any emergency claim.",
      "Apply SIFT before sharing any emotionally charged audio, video, or image online.",
      "Review privacy settings for all accounts where family members post audio or video publicly.",
    ],
    response_plan: [
      "Hang up immediately when the code word test fails and call back on the real number.",
      "Report voice cloning fraud to the FTC at reportfraud.ftc.gov and FBI IC3 at ic3.gov.",
      "Contact AARP Fraud Watch at 1-877-908-3360 for free confidential counseling.",
      "Preserve all evidence — call logs, screenshots, message records — before blocking the scammer.",
    ],
    practice_plan: [
      "Test your family code word system every six months with a quick rehearsal call.",
      "Review the social media footprint of elderly relatives annually and adjust privacy settings.",
      "Share one voice cloning or deepfake story per month with family to keep awareness high.",
      "Check in with elderly relatives after any suspicious call, even if they hung up correctly.",
    ],
    chapter_titles: [
      "The Day My Grandmother Called My Phone",
      "How Voice Cloning Works: The Technology Explained Simply",
      "Deepfake Video and Photos: When Your Eyes Lie",
      "The Grandparent Scam, Upgraded",
      "How Criminals Get Your Voice — and How to Reduce Your Exposure",
      "The Family Code Word System",
      "Protecting Children and Teenagers from Deepfakes",
      "Romance Scams and AI-Generated Personas",
      "Political Deepfakes and Information Integrity",
    ],
  },

  {
    id: "book-grandparents-digital",
    slug: "digital-safety-grandparents",
    name: "Digital Safety for Grandparents",
    subtitle: "A friendly guide to staying safe and connected online",
    description: "A gentle, encouraging guide written specifically for adults 70+ who want to use technology confidently and safely.",
    longDescription:
      "Digital Safety for Grandparents is the kind, patient companion that tech manuals never are. Written in simple language with no condescension, it covers the most important safety topics for adults 70 and older: spotting phone scams, understanding why gift cards are always fraud, protecting Medicare information, and building a personal safety team. Real Ohio stories, real phone numbers, and real peace of mind.",
    price: 9.99,
    total_pages: 90,
    image: bookSeniorTechSafety,
    tag: "New",
    stripe_price_id: "price_1TOPHtJ8osfwYbX7SdjyFDLU", // prod_UN9Z5r3VNr3MLz
    category: "seniors",
    ideal_for: "adults 70 and older, and family members who want to share a resource with elderly loved ones",
    outcomes: [
      "Recognize the most dangerous scam types targeting older adults with confidence.",
      "Know with certainty that gift cards are never a legitimate form of payment — ever.",
      "Protect your Medicare and Social Security information from fraudulent callers.",
      "Build a personal safety team so you always have someone to ask when something seems off.",
    ],
    risk_signals: [
      "A caller says there's an emergency involving a grandchild and asks you not to tell anyone.",
      "Anyone asks you to pay a bill, fine, or emergency by buying gift cards.",
      "A caller says your Medicare or Social Security benefits are suspended and threatens consequences.",
      "A new online friend you've never met is asking for personal information or money.",
    ],
    controls: [
      "Hang up and call back on the number printed on the back of your Medicare card or bank card.",
      "Say out loud: 'Gift cards are never real payment' — no legitimate organization will ever ask.",
      "Do not share your Medicare number, Social Security number, or bank account with callers.",
      "Write your family member's phone number on paper next to your telephone.",
    ],
    response_plan: [
      "If you sent money or shared information, call your bank right away — even if it's embarrassing.",
      "Call 1-877-FTC-HELP to report the scam to the Federal Trade Commission.",
      "Tell your trusted family member or friend what happened — you did nothing wrong.",
      "If gift cards were purchased, keep the receipts and report to the card company immediately.",
    ],
    practice_plan: [
      "Keep the phone numbers for your bank and Medicare printed next to your telephone.",
      "Call your trusted family member before sending any money anyone asks for unexpectedly.",
      "Check your bank statement once a month for charges you don't recognize.",
      "Remember: it is always okay to hang up and call back. Real callers will understand.",
    ],
    chapter_titles: [
      "You Are Not Alone — And You Are Not Too Old",
      "The Phone Call That Isn't Real",
      "Email: What's Real and What's Not",
      "Gift Cards Are Never Payment",
      "Staying Safe on Facebook and the Internet",
      "Your Medicare and Social Security — Protect Them",
      "Your Computer and Phone — Basic Safety Steps",
    ],
  },

  // ── SENIOR SAFETY ────────────────────────────────────────────────────────────
  {
    id: "book-medicare-scam-defense",
    slug: "medicare-insurance-scam-defense",
    name: "Medicare & Insurance Scam Defense",
    subtitle: "Stop benefit fraud before it drains your coverage and your savings",
    description: "Recognize Medicare and insurance scams targeting older Americans, and know exactly what to do when fraud strikes.",
    longDescription:
      "Medicare & Insurance Scam Defense explains how scammers exploit Medicare's complexity, the annual enrollment period, and insurance confusion to steal billions from seniors each year. With Ohio-specific resources, real-world scripts, and step-by-step recovery guidance, this book gives beneficiaries the tools to protect their coverage and their identity.",
    price: 11.99,
    total_pages: 115,
    image: bookMedicareFraud,
    tag: "Senior Safety",
    stripe_price_id: "price_placeholder_book_06",
    category: "seniors",
    ideal_for: "Medicare beneficiaries, adults 65+, and family members helping manage benefits",
    outcomes: [
      "Recognize every major Medicare and insurance scam targeting Ohio seniors.",
      "Verify legitimate Medicare contact and protect your Medicare number.",
      "Know exactly what to do — and who to call — when fraud occurs.",
      "Use Ohio-specific resources including OSHIIP and the Senior Medicare Patrol.",
    ],
    risk_signals: [
      "A caller claims your Medicare card needs to be replaced or your benefits are suspended.",
      "You're offered free medical equipment, genetic testing, or supplies in exchange for your Medicare number.",
      "An insurance agent pressures you to switch plans during an unsolicited call.",
      "A caller threatens to cancel your coverage unless you provide payment or personal information.",
    ],
    controls: [
      "Never give your Medicare number to anyone who contacts you first.",
      "Review your Medicare Summary Notice monthly for charges you don't recognize.",
      "Call 1-800-MEDICARE directly to verify any contact claiming to be from Medicare.",
      "Contact Ohio OSHIIP at 1-800-686-1578 before making any insurance changes.",
    ],
    response_plan: [
      "Call 1-800-MEDICARE immediately to report fraud and flag your account.",
      "Contact the Ohio Senior Medicare Patrol at 1-800-488-6070 for free assistance.",
      "File a complaint with the Ohio Attorney General at 1-800-282-0515.",
      "Document all contact details, numbers, and what was requested before you forget.",
    ],
    practice_plan: [
      "Review your Medicare Summary Notice within two weeks of receiving it each month.",
      "Keep your Medicare number stored securely — share it only with your own doctors.",
      "Update your list of trusted contacts at the start of each Annual Enrollment Period.",
      "Attend one Ohio SMP education event per year to stay current on new scam patterns.",
    ],
    chapter_titles: [
      "The $3 Billion Medicare Blindspot",
      "How Medicare Works and Where Fraud Hides",
      "The Medicare Card and Identity Scam",
      "Durable Medical Equipment and Free Testing Scams",
      "Insurance Agent and Plan Switching Fraud",
      "Benefits Verification and Utility Assistance Scams",
      "How to Verify Legitimate Medicare Contact",
      "What to Do When You're Targeted",
      "Building Permanent Medicare Fraud Defenses",
    ],
  },
  {
    id: "book-online-dating-seniors",
    slug: "online-dating-safety-seniors",
    name: "Online Dating Safety for Seniors",
    subtitle: "Find real connection online while protecting your heart and your savings",
    description: "Understand romance scams, recognize predator tactics, and enjoy online dating safely as an adult 60+.",
    longDescription:
      "Online Dating Safety for Seniors addresses the fastest-growing fraud targeting older adults: romance scams that cost Americans over $1.3 billion every year. Written with warmth and respect, this book helps adults 60+ enjoy online connection while recognizing the grooming tactics, fake profiles, and emotional manipulation that fraudsters use to steal money from people looking for companionship.",
    price: 9.99,
    total_pages: 95,
    image: bookRomanceScam,
    tag: "Senior Safety",
    stripe_price_id: "price_placeholder_book_07",
    category: "seniors",
    ideal_for: "adults 60+ exploring online dating, widows and widowers, and concerned family members",
    outcomes: [
      "Recognize the grooming timeline and emotional manipulation patterns in romance scams.",
      "Use reverse image search and other tools to verify online contacts.",
      "Apply safe online dating practices that protect without eliminating connection.",
      "Know how to help a friend or family member who may be in a romance scam.",
    ],
    risk_signals: [
      "A new online contact declares love or deep connection unusually quickly.",
      "They claim to be abroad — military, offshore oil rig, working in another country.",
      "They avoid video calls or always experience 'technical problems' during calls.",
      "Any financial request arrives, no matter how small or how logical the story sounds.",
    ],
    controls: [
      "Use Google reverse image search and Google Lens on every new contact's photo.",
      "Apply the 90-day rule: no financial discussion of any kind in the first three months.",
      "Always tell a trusted friend or family member about every new online relationship.",
      "Verify identity through multiple platforms before increasing emotional investment.",
    ],
    response_plan: [
      "Stop all contact and document everything before blocking the account.",
      "Report to the FTC at reportfraud.ftc.gov and FBI IC3 at ic3.gov.",
      "Contact your bank immediately if any money was transferred.",
      "Reach out to AARP Fraud Watch at 1-877-908-3360 for confidential support.",
    ],
    practice_plan: [
      "Run a reverse image search on every new online contact — make it a habit.",
      "Review your privacy settings on all platforms you use for dating quarterly.",
      "Share one romance scam story per month with a friend to keep awareness high.",
      "Consult a trusted family member before any financial decision involving someone you met online.",
    ],
    chapter_titles: [
      "Love Online and the Long Con",
      "How Romance Scams Are Engineered",
      "Platform-by-Platform Risks for Adults 60+",
      "Red Flags Most People Miss",
      "Safe Online Dating Practices That Actually Work",
      "When Someone You Love Is Being Scammed",
      "If It Has Already Happened — Recovery and Reporting",
    ],
  },
  {
    id: "book-retirement-fraud",
    slug: "protecting-retirement-savings-fraud",
    name: "Protecting Your Retirement Savings from Fraud",
    subtitle: "Investment scams, Ponzi schemes, and financial advisor red flags every retiree must know",
    description: "Defend your retirement nest egg against the investment scams, fake advisors, and Ponzi schemes targeting Ohio retirees.",
    longDescription:
      "Protecting Your Retirement Savings from Fraud gives pre-retirees and retirees the tools to protect their life savings from investment fraud. Covering Ponzi schemes, affinity fraud, fake financial advisors, IRA targeting, and the new frontier of cryptocurrency investment scams, this book includes step-by-step verification tools and Ohio Division of Securities resources.",
    price: 14.99,
    total_pages: 140,
    image: bookInvestmentFraud,
    tag: "Senior Safety",
    stripe_price_id: "price_placeholder_book_08",
    category: "finance",
    ideal_for: "pre-retirees and retirees 55+, anyone managing an IRA or 401(k), family financial decision-makers",
    outcomes: [
      "Identify the four phases of investment fraud before you're fully committed.",
      "Verify financial advisors using FINRA BrokerCheck, SEC EDGAR, and Ohio Division of Securities.",
      "Recognize Ponzi schemes, affinity fraud, and fake credentials before money moves.",
      "Know the recovery path after financial fraud including Ohio AG resources.",
    ],
    risk_signals: [
      "The investment guarantees unusually high or consistent returns with minimal risk.",
      "Your advisor discourages you from seeking a second opinion or independent review.",
      "Trust is built on shared church membership, ethnicity, or community — not on transparency.",
      "Documents are vague, changing, or unavailable for independent review.",
    ],
    controls: [
      "Verify every advisor at brokercheck.finra.org before transferring any funds.",
      "Contact Ohio Division of Securities at 1-877-683-7841 to check complaints.",
      "Require a cooling-off period of at least 48 hours before any major financial decision.",
      "Never allow a rollover or IRA transfer to be rushed under time pressure.",
    ],
    response_plan: [
      "Stop additional transfers immediately and preserve every statement and communication.",
      "File complaints with FINRA, the SEC, and the Ohio Division of Securities simultaneously.",
      "Contact the Ohio Attorney General at 1-800-282-0515 for restitution resources.",
      "Consult an elder law attorney — many offer free initial consultations in Ohio.",
    ],
    practice_plan: [
      "Run an annual check of your advisor's FINRA BrokerCheck record for new complaints.",
      "Review all investment account statements monthly even when markets are calm.",
      "Keep a written log of every advisor communication for reference.",
      "Invite a trusted second person into all major investment discussions.",
    ],
    chapter_titles: [
      "Your Savings Are Their Target",
      "How Investment Scams Are Structured",
      "Ponzi Schemes and Pyramid Operations",
      "Affinity Fraud — When the Scammer Looks Like You",
      "Fake Financial Advisors and Credential Fraud",
      "IRA and 401(k) Targeting",
      "Annuity Fraud and Unsuitable Products",
      "Cryptocurrency and the New Retirement Fraud Frontier",
      "Red Flags for Bad Financial Products",
      "How to Vet Advisors and Verify Credentials",
      "Recovery After Financial Fraud",
    ],
  },

  // ── FAMILY PROTECTION ────────────────────────────────────────────────────────
  {
    id: "book-kids-online-safety",
    slug: "parental-guide-kids-online-safety",
    name: "Parental Guide to Kids' Online Safety",
    subtitle: "Social media, gaming, cyberbullying, and predator awareness for parents in 2026",
    description: "Raise confident digital citizens by understanding the real risks on every platform your children use.",
    longDescription:
      "Parental Guide to Kids' Online Safety gives parents the platform-specific knowledge, conversation scripts, and parental control strategies needed to protect children online without destroying trust. Covering social media, gaming, cyberbullying, screen time, and predator awareness with age-appropriate guidance, this is the book Ohio parents have needed.",
    price: 12.99,
    total_pages: 120,
    image: bookCyberKids,
    tag: "Family",
    stripe_price_id: "price_placeholder_book_09",
    category: "family",
    ideal_for: "parents of children ages 8–18, school counselors, and pediatricians advising families",
    outcomes: [
      "Understand the real risks on every major platform your children use.",
      "Recognize cyberbullying and predator grooming behaviors before they escalate.",
      "Have productive safety conversations with children without shutting them down.",
      "Know when to involve school administrators, law enforcement, or counselors.",
    ],
    risk_signals: [
      "A child is told to keep any online relationship, game, or interaction secret.",
      "New devices, accounts, or gifts appear that a parent didn't approve.",
      "A child becomes secretive, withdrawn, or upset after device use.",
      "An online contact asks for photos, location information, or in-person meetings.",
    ],
    controls: [
      "Establish family technology agreements early and revisit them as children age.",
      "Use iOS Screen Time or Android Family Link to set healthy boundaries.",
      "Keep devices in common areas during evening hours for younger children.",
      "Know the platforms your children use — create your own accounts and explore them.",
    ],
    response_plan: [
      "Reassure the child first — your response to the problem determines whether they'll report next time.",
      "Save screenshots and document usernames before blocking or deleting anything.",
      "Report to NCMEC CyberTipline at missingkids.org for sexual exploitation concerns.",
      "Contact school administration for cyberbullying and local police for criminal conduct.",
    ],
    practice_plan: [
      "Hold brief weekly technology check-ins as part of normal family conversation.",
      "Update parental controls when a child gets a new device or platform account.",
      "Review each platform's privacy settings together as a teaching moment.",
      "Praise children for speaking up about online concerns — reinforce the behavior.",
    ],
    chapter_titles: [
      "Raising Safe Digital Citizens in 2026",
      "Social Media by Platform — Age-Appropriate Risks",
      "Gaming Risks — Friend Requests, Voice Chat, and Virtual Currency",
      "Cyberbullying — Recognition and What Parents Can Do",
      "Predator Awareness — Warning Signs and Prevention",
      "Screen Time — Health, Balance, and Family Agreements",
      "Parental Controls That Actually Work",
      "The Conversation — Talking About Online Safety",
      "When to Involve School, Police, or Counselors",
    ],
  },
  {
    id: "book-family-emergency",
    slug: "family-emergency-communication-playbook",
    name: "Family Emergency Communication Playbook",
    subtitle: "Protocols for disasters, medical crises, cyber incidents, and family impersonation",
    description: "Build a family communication system that works when phones are down, relatives are panicking, and every second matters.",
    longDescription:
      "Family Emergency Communication Playbook helps Ohio families build the communication systems, contact trees, and decision protocols that actually function under pressure. Covering natural disasters, medical emergencies, cyber incidents, and the grandparent scam, this practical guide ensures that every family member knows exactly what to do when normal stops working.",
    price: 9.99,
    total_pages: 95,
    image: bookFamilySafety,
    tag: "Family",
    stripe_price_id: "price_placeholder_book_10",
    category: "family",
    ideal_for: "parents, adult children, caregivers, and multigenerational Ohio families",
    outcomes: [
      "Build a family communication tree that works even when phone lines fail.",
      "Create tested protocols for weather emergencies, medical crises, and account compromise.",
      "Establish an impersonation defense that protects every generation from the grandparent scam.",
      "Keep your plan current with quarterly reviews that take under 30 minutes.",
    ],
    risk_signals: [
      "Different family members have different numbers for the same emergency contact.",
      "No out-of-state contact point exists to coordinate during a local emergency.",
      "The family has never practiced what to do if a phone is lost or cell service fails.",
      "A caller claiming to be a family member creates urgency without a code word verification.",
    ],
    controls: [
      "Designate one out-of-state contact that every family member knows by memory.",
      "Create a family code word for real emergencies and rehearse it twice a year.",
      "Keep a printed emergency card in every vehicle and at your primary residence.",
      "Sign up for Ohio Emergency Management's text alert system.",
    ],
    response_plan: [
      "Call back on a trusted number before responding to any urgent claim from a family member.",
      "Move all communication to a pre-agreed group call format for multi-person emergencies.",
      "Document who received what message and what was done — confusion is part of the damage.",
      "Contact Ohio EMA at 614-889-7150 or local emergency services for physical disasters.",
    ],
    practice_plan: [
      "Review your family communication plan at the start of tornado season (March) and winter season (November).",
      "Update contact cards whenever a family member changes phone numbers.",
      "Run one tabletop drill per year where you talk through a scenario without acting it out.",
      "Rotate the family code word annually and verify everyone knows the new one.",
    ],
    chapter_titles: [
      "When Normal Stops Working",
      "Building Your Family Communication Tree",
      "Natural Disaster Protocols — Ohio Weather Events",
      "Medical Emergencies — Hospital Communication and Health Information",
      "Cyber Incidents — Account Compromise as a Family Emergency",
      "Impersonation Emergencies — When Someone Claims to Be Family",
      "Keeping Your Plan Current and Tested",
    ],
  },
  {
    id: "book-social-media-privacy-family",
    slug: "social-media-privacy-families",
    name: "Social Media Privacy for Families",
    subtitle: "Platform-by-platform privacy settings, digital footprint management, and family agreements",
    description: "Control what social media knows about your family, protect your children's digital footprint, and build a family privacy policy that sticks.",
    longDescription:
      "Social Media Privacy for Families goes platform by platform — Facebook, Instagram, TikTok, and beyond — to give parents and families the exact privacy settings, opt-out strategies, and family agreements needed to manage their digital footprint. From sharenting risks to data brokers to location tagging, this is the guide families need to protect their privacy together.",
    price: 11.99,
    total_pages: 115,
    image: bookSocialMediaSafety,
    tag: "Family",
    stripe_price_id: "price_placeholder_book_11",
    category: "privacy",
    ideal_for: "parents, families with social media users of any age, and anyone concerned about their digital footprint",
    outcomes: [
      "Apply current privacy settings on every major platform your family uses.",
      "Understand your digital footprint and take practical steps to reduce unnecessary exposure.",
      "Protect children's privacy online including sharenting risks and COPPA compliance.",
      "Build a family privacy policy that every member agrees to and actually follows.",
    ],
    risk_signals: [
      "Family members share location data, check-ins, or vacation plans publicly.",
      "Children's photos are posted online without consideration of their privacy.",
      "The family's home address, school, or daily routine can be inferred from social posts.",
      "Data brokers have compiled a detailed profile that includes your children's information.",
    ],
    controls: [
      "Audit your Facebook privacy settings using the Privacy Checkup tool quarterly.",
      "Turn off location services for Instagram, TikTok, and Snapchat on all family devices.",
      "Download your Facebook and Google data annually to see what they have collected.",
      "Opt out of at least three major data broker sites every six months.",
    ],
    response_plan: [
      "Lock down affected accounts and change passwords if a privacy breach is discovered.",
      "Report doxxing or harassment to the platform and to local law enforcement.",
      "Submit opt-out requests to data brokers immediately if sensitive data is exposed.",
      "Contact the Ohio AG at 1-800-282-0515 for identity theft support.",
    ],
    practice_plan: [
      "Schedule a family privacy audit every six months — check settings on all platforms together.",
      "Update the family social media agreement when children join new platforms.",
      "Review tagged photos and location data monthly using platform-provided tools.",
      "Discuss one new privacy topic each month at the dinner table.",
    ],
    chapter_titles: [
      "What You Share Lives Longer Than You Think",
      "Facebook Privacy Settings — The 2026 Practical Guide",
      "Instagram and TikTok — Visual Oversharing and Location Risks",
      "Your Digital Footprint — What It Reveals About You",
      "Children's Privacy — COPPA, Sharenting, and Monitoring",
      "Location Data — Geotagging and Real-World Risk",
      "Data Brokers — What They Know and How to Opt Out",
      "Building a Family Privacy Policy",
      "When Privacy Has Already Been Compromised",
    ],
  },
  {
    id: "book-smart-home-security",
    slug: "smart-home-security-family-guide",
    name: "Smart Home Security: A Family Guide",
    subtitle: "Secure your router, cameras, smart speakers, locks, and every connected device at home",
    description: "Protect your connected home from the router out — cameras, speakers, locks, IoT appliances, and everything in between.",
    longDescription:
      "Smart Home Security: A Family Guide shows Ohio homeowners how to secure the 15+ internet-connected devices in a typical modern home without abandoning convenience. From router configuration to camera privacy to smart lock vulnerabilities, this practical guide walks through every device category with plain-language instructions and family-friendly setup protocols.",
    price: 12.99,
    total_pages: 120,
    image: bookSmartHome,
    tag: "Family",
    stripe_price_id: "price_placeholder_book_12",
    category: "tech",
    ideal_for: "homeowners and renters with smart devices, parents, and anyone setting up a new connected home",
    outcomes: [
      "Secure your home router as the gateway protecting all connected devices.",
      "Configure smart cameras, locks, and speakers with privacy-first settings.",
      "Isolate IoT devices from your primary network using guest network segmentation.",
      "Know what to do and who to contact when a smart home device is compromised.",
    ],
    risk_signals: [
      "Smart devices still use factory-default passwords and usernames.",
      "All devices — work laptop, smart TV, baby monitor — share the same WiFi network.",
      "Smart camera or doorbell footage is stored in a cloud account with a weak password.",
      "New devices are connected to the network without updating their firmware first.",
    ],
    controls: [
      "Change the router's default admin password and update its firmware immediately.",
      "Create a separate guest network for all IoT devices and keep work devices on the primary network.",
      "Enable two-factor authentication on every smart device cloud account.",
      "Check for and install firmware updates on all smart devices quarterly.",
    ],
    response_plan: [
      "Disconnect the suspected device from the network before resetting or investigating.",
      "Change router, admin, and all related cloud account passwords in a deliberate sequence.",
      "Review your router's device list to identify any unauthorized connections.",
      "Report compromised cameras to local law enforcement and the device manufacturer.",
    ],
    practice_plan: [
      "Audit all connected devices once per quarter and remove anything no longer in use.",
      "Check for firmware updates on router and smart devices at the start of each month.",
      "Review cloud account access logs for cameras and smart speakers every 60 days.",
      "Add new devices to an inventory list with purchase date, default credentials changed date, and last firmware update.",
    ],
    chapter_titles: [
      "The Connected Home's Hidden Attack Surface",
      "Router Security — The Gateway to Everything",
      "Smart Speakers and Privacy — Alexa, Google Home, Siri",
      "Security Cameras — Smart Setup vs. Risky Defaults",
      "Smart Locks and Doorbells — Convenience vs. Vulnerability",
      "IoT Appliances and Baby Monitors — The Forgotten Attack Surfaces",
      "Guest Networks, Visitors, and Contractors",
      "When Your Smart Home Gets Hacked",
      "Setting Up a New Smart Home Securely",
    ],
  },

  // ── BUSINESS SECURITY ────────────────────────────────────────────────────────
  {
    id: "book-employee-training",
    slug: "employee-cybersecurity-training-manual",
    name: "Employee Cybersecurity Training Manual",
    subtitle: "A ready-to-use training program for small business employees",
    description: "Train your entire team to recognize and stop cyber threats with this ready-to-use employee cybersecurity training program.",
    longDescription:
      "Employee Cybersecurity Training Manual is the complete training program Ohio small businesses need — built for non-technical employees and deployable without an IT department. Covering phishing, passwords, social engineering, remote work, data handling, and incident reporting, it includes module quizzes, policy templates, and a culture-building guide that makes security a business habit.",
    price: 24.99,
    total_pages: 175,
    image: bookBusinessCyber,
    tag: "Business",
    stripe_price_id: "price_placeholder_book_13",
    category: "business",
    ideal_for: "small business owners, office managers, HR directors, and operations leads responsible for team security",
    outcomes: [
      "Train employees to recognize phishing, social engineering, and credential theft.",
      "Implement password managers, MFA, and data handling policies across your team.",
      "Create a no-blame reporting culture so incidents surface faster.",
      "Use built-in quizzes, policy templates, and cultural tools to make security last.",
    ],
    risk_signals: [
      "Employees regularly share passwords or use the same credentials for work and personal accounts.",
      "There is no clear process for reporting suspicious email, calls, or activity.",
      "New employees receive no security training during onboarding.",
      "Wire transfer or payroll changes can be approved by a single employee via email alone.",
    ],
    controls: [
      "Deploy a business password manager and require unique credentials for all work accounts.",
      "Require MFA on email, payroll, banking, and any cloud storage system.",
      "Establish a clear, named escalation path for suspected security incidents.",
      "Run phishing simulations quarterly to measure and improve employee awareness.",
    ],
    response_plan: [
      "Isolate any device or account suspected of compromise before attempting cleanup.",
      "Document who saw what and when — the incident timeline is essential for recovery.",
      "Contact your cyber insurer before engaging third-party forensics to preserve coverage.",
      "Notify affected customers according to Ohio's 45-day breach notification requirement.",
    ],
    practice_plan: [
      "Deliver one 15-minute security training module per month at team meetings.",
      "Run an annual security review that includes policy updates and access audits.",
      "Reward employees who report suspicious activity — recognition reinforces reporting.",
      "Update training content whenever a new scam type targets your industry.",
    ],
    chapter_titles: [
      "Your Employees Are Target #1",
      "Phishing Recognition and Email Security",
      "Password Security and Credential Management",
      "Safe Browsing and Internet Use Policies",
      "Device Security — Laptops, Phones, and Tablets",
      "Social Engineering — Phone and In-Person Attacks",
      "Data Classification and Handling Rules",
      "Remote and Hybrid Work Security",
      "Third-Party and Vendor Risk",
      "Incident Recognition and Reporting Procedures",
      "Social Media and Business Reputation",
      "Module Assessments — Knowledge Check Quizzes",
      "Small Business Policy Templates",
      "Building a Security Culture That Lasts",
    ],
  },
  {
    id: "book-hipaa-compliance",
    slug: "hipaa-compliance-small-healthcare-practices",
    name: "HIPAA Compliance for Small Healthcare Practices",
    subtitle: "Privacy, security, and breach response for Ohio dental offices, clinics, and solo practices",
    description: "Navigate HIPAA's Privacy Rule, Security Rule, and breach notification requirements with an Ohio-focused plain-language guide built for small practices.",
    longDescription:
      "HIPAA Compliance for Small Healthcare Practices translates federal law into practical action for Ohio dental offices, therapy practices, chiropractors, urgent care clinics, and solo providers. Covering PHI identification, the Privacy and Security Rules, EHR security, Business Associate Agreements, and breach notification — with Ohio-specific context including HB 220 Safe Harbor — this is the compliance resource your practice actually needs.",
    price: 19.99,
    total_pages: 145,
    image: bookDigitalPrivacy,
    tag: "Business",
    stripe_price_id: "price_placeholder_book_14",
    category: "business",
    ideal_for: "Ohio dental offices, therapy practices, chiropractors, urgent care clinics, and solo healthcare providers",
    outcomes: [
      "Identify Protected Health Information (PHI) and apply the minimum necessary standard.",
      "Implement the HIPAA Security Rule's required and addressable safeguards for a small practice.",
      "Execute Business Associate Agreements with all required vendors.",
      "Follow Ohio's 45-day breach notification process and HHS reporting requirements.",
    ],
    risk_signals: [
      "Staff members share EHR login credentials or use one account for all users.",
      "Patient records are stored on unencrypted devices or in unsecured cloud accounts.",
      "No Business Associate Agreement exists for your billing service, IT vendor, or EHR provider.",
      "Staff training records for HIPAA are incomplete or more than 12 months old.",
    ],
    controls: [
      "Complete and document a formal HIPAA risk analysis — it is required, not optional.",
      "Require unique user IDs and strong passwords in your EHR system for every staff member.",
      "Execute written Business Associate Agreements with every vendor who touches PHI.",
      "Implement automatic device locking and encrypt all laptops, tablets, and phones used for PHI.",
    ],
    response_plan: [
      "Activate your breach response plan immediately — the 60-day notification clock starts at discovery.",
      "Engage HIPAA-experienced legal counsel before issuing any notifications.",
      "Notify affected individuals and HHS (for breaches of 500+ records, also notify media).",
      "Document the breach investigation, findings, and all notifications for OCR review.",
    ],
    practice_plan: [
      "Conduct a HIPAA risk analysis annually and document remediation of identified gaps.",
      "Train all staff annually on HIPAA requirements and document the training with sign-off sheets.",
      "Review your Business Associate Agreement inventory every 12 months.",
      "Update your Notice of Privacy Practices whenever your practice's privacy operations change.",
    ],
    chapter_titles: [
      "HIPAA Is Not Optional — Even for Small Ohio Practices",
      "Protected Health Information — What Counts and What Doesn't",
      "The HIPAA Privacy Rule — Patient Rights and Practice Obligations",
      "The Security Rule — Administrative, Physical, and Technical Safeguards",
      "Electronic Health Records Security — EHR Platform Compliance",
      "Ohio-Specific Healthcare Privacy Law and Context",
      "Staff Training Requirements and Documentation",
      "Business Associate Agreements — What You Must Have in Writing",
      "Breach Notification — The 60-Day Clock",
      "HHS Audits — What to Expect and How to Prepare",
      "Maintaining Compliance — Annual Reviews and Updates",
    ],
  },
  {
    id: "book-pci-dss",
    slug: "pci-dss-credit-card-security-small-business",
    name: "PCI DSS Made Simple: Credit Card Security for Small Business",
    subtitle: "Payment security compliance in plain English for Ohio retailers and service businesses",
    description: "Understand PCI DSS compliance, secure your payment environment, and protect customer card data without an IT department.",
    longDescription:
      "PCI DSS Made Simple translates the Payment Card Industry Data Security Standard into plain English for Ohio small business owners. Covering merchant levels, the Self-Assessment Questionnaire, network segmentation, cardholder data protection, and the annual compliance roadmap, this book gives retailers, restaurants, and service businesses everything they need to protect customer payment data and avoid the devastating cost of a card breach.",
    price: 14.99,
    total_pages: 115,
    image: bookBankingSafety,
    tag: "Business",
    stripe_price_id: "price_placeholder_book_15",
    category: "business",
    ideal_for: "Ohio retailers, restaurants, service businesses, and any small business that accepts credit or debit cards",
    outcomes: [
      "Understand which PCI DSS requirements apply to your specific business and merchant level.",
      "Build a secure payment environment with proper network segmentation and terminal management.",
      "Complete your Self-Assessment Questionnaire and satisfy your acquiring bank's requirements.",
      "Reduce cardholder data exposure by eliminating unnecessary storage and using tokenization.",
    ],
    risk_signals: [
      "Your POS system shares a network with office computers, guest WiFi, or security cameras.",
      "You store card numbers, CVVs, or full track data after a transaction is complete.",
      "POS terminal software has not been updated in more than 90 days.",
      "Multiple employees share the same POS login credentials.",
    ],
    controls: [
      "Segment your payment environment from all other business systems using a dedicated network.",
      "Deploy P2PE-certified payment terminals that encrypt card data at the point of swipe.",
      "Assign unique user IDs to every employee who uses payment systems.",
      "Run quarterly vulnerability scans and apply patches within 30 days of release.",
    ],
    response_plan: [
      "Contact your acquiring bank and payment processor immediately when a breach is suspected.",
      "Do not attempt forensics yourself — preserve evidence and engage a PCI Forensic Investigator.",
      "Notify card brands (Visa, Mastercard) through your acquirer — they control the investigation.",
      "Document all remediation steps for the post-incident compliance report.",
    ],
    practice_plan: [
      "Complete your SAQ annually and submit attestation to your acquiring bank before the deadline.",
      "Run quarterly internal scans of your cardholder data environment.",
      "Inspect POS terminals for skimming devices weekly — place a tamper-evident seal on each.",
      "Review employee access to payment systems whenever staff changes occur.",
    ],
    chapter_titles: [
      "Why Payment Security Is Every Business Owner's Problem",
      "PCI DSS Explained — The 12 Requirements in Plain English",
      "Building a Secure Payment Environment",
      "Network Security for Small Business Payment Systems",
      "Cardholder Data — Store Nothing You Don't Need",
      "Vulnerability Management — Patches, Scans, and Antivirus",
      "Access Control — Who Can See Payment Data?",
      "Monitoring and Testing — How You Know If Something Went Wrong",
      "Your PCI Compliance Roadmap for Ohio Small Businesses",
    ],
  },
  {
    id: "book-remote-work",
    slug: "remote-work-security-handbook",
    name: "Remote Work Security Handbook",
    subtitle: "VPN, home network, BYOD policies, and video call security for distributed teams",
    description: "Secure your remote workforce from the home router out — practical guidance for Ohio small businesses with remote or hybrid employees.",
    longDescription:
      "Remote Work Security Handbook gives Ohio small business owners and their remote teams the security controls, policies, and habits needed to work safely outside the office. Covering home network security, VPN selection, endpoint management, BYOD policy, video conferencing security, and physical security, this handbook provides everything needed to build a secure distributed workforce.",
    price: 12.99,
    total_pages: 120,
    image: bookMobileSecurity,
    tag: "Business",
    stripe_price_id: "price_placeholder_book_16",
    category: "business",
    ideal_for: "small business owners with remote employees, operations managers, and remote workers themselves",
    outcomes: [
      "Secure home networks and implement VPN for all remote business access.",
      "Enforce endpoint security on remote laptops, phones, and tablets.",
      "Build and communicate a clear BYOD policy that protects company data.",
      "Address the physical security risks unique to remote and home office environments.",
    ],
    risk_signals: [
      "Remote employees connect to business systems over home WiFi with no VPN.",
      "Personal and work applications coexist on the same unmanaged device.",
      "Video conferences lack waiting rooms, passwords, or screen-sharing restrictions.",
      "No formal BYOD policy exists — employees use personal devices at their own discretion.",
    ],
    controls: [
      "Require VPN for all remote access to company systems — configure it as always-on.",
      "Deploy MDM (Mobile Device Management) to enforce security policies on remote devices.",
      "Mandate disk encryption, auto-lock, and strong passwords on all business devices.",
      "Require waiting rooms and passwords on all video conferences involving sensitive topics.",
    ],
    response_plan: [
      "Remotely wipe any device reported lost or stolen using MDM before investigating further.",
      "Revoke VPN and cloud access immediately when an employee leaves or is terminated.",
      "Document the incident including device details, last known location, and accounts accessed.",
      "Notify cyber insurer and legal counsel if company data may have been exposed.",
    ],
    practice_plan: [
      "Audit VPN logs and remote access monthly for unusual connection patterns.",
      "Review and update your BYOD policy whenever team composition or tools change.",
      "Test remote wipe capability on enrolled devices during quarterly security reviews.",
      "Run an annual remote work security assessment to identify gaps in policy vs. practice.",
    ],
    chapter_titles: [
      "The Expanded Attack Surface of Remote Work",
      "Home Network Security — The First Line of Defense",
      "VPN — Why You Need One and How to Choose It",
      "Endpoint Security for Remote Workers",
      "BYOD Policies That Actually Work",
      "Video Conferencing Security",
      "Cloud Storage and File Sharing — Secure Practices",
      "Physical Security for Remote Workers",
      "Building a Remote Work Security Policy for Ohio Small Businesses",
    ],
  },
  {
    id: "book-cyber-insurance",
    slug: "cyber-insurance-buyers-guide",
    name: "Cyber Insurance Buyer's Guide",
    subtitle: "How to evaluate, purchase, and use cyber insurance for your Ohio small business",
    description: "Understand what cyber insurance actually covers, what it excludes, how to calculate your needs, and how to file a claim.",
    longDescription:
      "Cyber Insurance Buyer's Guide gives Ohio small business owners the knowledge to purchase cyber coverage that actually protects them. Covering first-party and third-party coverage, the growing list of exclusions, the underwriting application process, claim filing, and Ohio-specific considerations including the Data Protection Act Safe Harbor, this guide prevents the common mistake of having insurance that doesn't pay when it's needed most.",
    price: 14.99,
    total_pages: 115,
    image: bookEmailSafety,
    tag: "Business",
    stripe_price_id: "price_placeholder_book_17",
    category: "business",
    ideal_for: "Ohio small business owners, CFOs, operations managers, and any business leader evaluating cyber coverage",
    outcomes: [
      "Understand exactly what cyber insurance covers and — critically — what it excludes.",
      "Calculate the right coverage level based on your data inventory and breach cost exposure.",
      "Navigate the underwriting application to get accurate coverage at the best premium.",
      "Execute the claims process effectively after an incident without losing coverage.",
    ],
    risk_signals: [
      "Your general liability or BOP policy has not been reviewed for cyber exclusions.",
      "Your cyber insurance application answers were estimated rather than verified.",
      "You have not implemented the security controls your policy's underwriting questionnaire asked about.",
      "No one in your organization knows the exact steps to initiate a cyber insurance claim.",
    ],
    controls: [
      "Implement all five controls that most reduce cyber premiums: MFA, EDR, backup testing, email filtering, and an incident response plan.",
      "Document your security posture in writing — underwriters reward what can be demonstrated.",
      "Read your policy's exclusions section before signing — war exclusions and prior incident clauses are common.",
      "Designate one person responsible for claim initiation and insurer communication.",
    ],
    response_plan: [
      "Call your cyber insurer before engaging any third-party forensics or paying any ransom.",
      "Preserve evidence in an unmodified state — unauthorized remediation may void coverage.",
      "Document all incident-related expenses from the first hour for reimbursement.",
      "Engage your insurer-approved breach counsel — using outside counsel may not be covered.",
    ],
    practice_plan: [
      "Review your cyber policy at renewal for coverage gaps and exclusion changes.",
      "Update your underwriting application answers annually to reflect security improvements.",
      "Run a tabletop exercise that includes your cyber insurer's claims process.",
      "Compare coverage from at least three carriers at each renewal cycle.",
    ],
    chapter_titles: [
      "Cyber Insurance Is No Longer Optional for Ohio Small Businesses",
      "What Cyber Insurance Actually Covers",
      "The Exclusions — What Most Policies Won't Pay For",
      "Calculating Your Coverage Needs",
      "Evaluating Cyber Insurance Providers",
      "The Application and Underwriting Process",
      "Making a Claim — What Happens After an Incident",
      "Ohio Small Business Considerations",
      "Building Insurability — What Makes You a Good Risk",
    ],
  },

  // ── TECHNOLOGY & AI ──────────────────────────────────────────────────────────
  {
    id: "book-understanding-ai-plain",
    slug: "understanding-ai-plain-english-guide",
    name: "Understanding AI: A Plain English Guide",
    subtitle: "What AI is, how it works, how it affects your daily life — for non-technical readers",
    description: "Gain enough AI literacy to make sound decisions, evaluate new tools, and recognize when AI is being used against you.",
    longDescription:
      "Understanding AI: A Plain English Guide gives non-technical readers the AI literacy they actually need — not machine learning theory, but the practical knowledge to evaluate new tools, understand AI's impact on daily life, recognize AI-powered scams, and make informed decisions. Written for curious adults who want clarity without jargon.",
    price: 11.99,
    total_pages: 115,
    image: bookAiFundamentals,
    tag: "Technology",
    stripe_price_id: "price_placeholder_book_18",
    category: "ai",
    ideal_for: "non-technical adults, seniors curious about AI, and anyone who wants clarity without jargon",
    outcomes: [
      "Explain what AI is in plain language and understand the difference between AI, ML, and LLMs.",
      "Recognize how AI already affects your daily life in search, email, and voice assistants.",
      "Identify when AI is being used against you in scams, deepfakes, and manipulation.",
      "Evaluate new AI tools using a practical five-question framework.",
    ],
    risk_signals: [
      "An AI-powered email, call, or message sounds unusually personal or urgent.",
      "A video or image of a public figure or family member seems implausible.",
      "An AI tool asks for more personal information than its function requires.",
      "Someone uses AI jargon and hype to pressure you into trusting an offer.",
    ],
    controls: [
      "Apply the five-question framework before trusting any AI tool: who built it, what data, can I opt out, what happens to my inputs, is there human oversight?",
      "Use source verification for any AI-generated content before sharing or acting on it.",
      "Keep sensitive personal data out of public AI tools that are not end-to-end encrypted.",
      "Maintain human approval for any decision involving money, identity, or legal obligation.",
    ],
    response_plan: [
      "Stop interacting with any AI tool or output that creates urgency, requests credentials, or feels manipulative.",
      "Verify suspicious AI-generated content through an independent, trusted source.",
      "Report AI-powered fraud to the FTC at reportfraud.ftc.gov and FBI IC3 at ic3.gov.",
      "Inform family members when AI fraud patterns are targeting your community.",
    ],
    practice_plan: [
      "Review one new AI development per month from a trusted technology publication.",
      "Test any new AI tool in a limited, low-stakes context before granting broad access.",
      "Share the five-question AI evaluation framework with one person per quarter.",
      "Update your understanding of AI scam patterns at least twice per year.",
    ],
    chapter_titles: [
      "AI Is Already Living in Your Devices",
      "How Machine Learning Works — Plain English",
      "Generative AI — What ChatGPT and Similar Tools Are",
      "AI in Daily Life — Search, Email, and Voice Assistants",
      "When AI Is Used Against You — Scams and Deepfakes",
      "AI and Your Privacy — What's Being Collected",
      "Evaluating AI Tools Before You Trust Them",
      "The Next Wave — What AI Will Do in the Near Future",
      "Plain English Glossary of AI Terms",
    ],
  },
  {
    id: "book-privacy-ai-age",
    slug: "protecting-privacy-ai-age",
    name: "Protecting Your Privacy in the AI Age",
    subtitle: "Data collection, facial recognition, voice assistants, and opt-out strategies that work",
    description: "Take back control of your personal data in a world where AI systems collect, profile, and target you at every turn.",
    longDescription:
      "Protecting Your Privacy in the AI Age gives readers the practical knowledge and specific tools to reduce their data exposure in an AI-powered world. Covering facial recognition, voice assistants, search engine profiling, social media targeting, data brokers, and effective opt-out strategies, this book turns abstract privacy concerns into concrete, actionable steps.",
    price: 12.99,
    total_pages: 115,
    image: bookBeingRealAi,
    tag: "Privacy",
    stripe_price_id: "price_placeholder_book_19",
    category: "privacy",
    ideal_for: "privacy-conscious adults, parents, professionals, and anyone concerned about AI data collection",
    outcomes: [
      "Understand how AI systems build profiles from your data across multiple platforms.",
      "Reduce facial recognition and voice assistant data exposure with specific settings.",
      "Opt out of data broker databases and enforce your privacy rights under applicable law.",
      "Build a privacy-first digital lifestyle using free and low-cost tools.",
    ],
    risk_signals: [
      "Your smart speaker responds to background conversations you didn't intend to trigger.",
      "Your social media feed shows ads that seem to know conversations you had privately.",
      "Data broker websites list your home address, relatives, and phone number.",
      "Your employer, insurer, or lender can access AI-generated profiles built from your data.",
    ],
    controls: [
      "Audit your Google account's activity controls and disable ad personalization.",
      "Delete your voice history from Alexa, Google, and Siri on a monthly schedule.",
      "Opt out of Spokeo, Whitepages, MyLife, BeenVerified, and Intelius every six months.",
      "Use Firefox with uBlock Origin and the Global Privacy Control setting enabled.",
    ],
    response_plan: [
      "Submit data deletion requests to any platform that has violated your privacy expectations.",
      "File a complaint with the FTC if a company fails to honor a verifiable opt-out request.",
      "Freeze your credit at all three bureaus if sensitive financial data is exposed.",
      "Consult an Ohio consumer law attorney if your data rights have been materially violated.",
    ],
    practice_plan: [
      "Conduct a quarterly permission audit on your phone — review every app's access to location, camera, and microphone.",
      "Download your social media data annually to audit what platforms have collected.",
      "Rotate through data broker opt-outs on a six-month cycle.",
      "Review your privacy tool stack annually — new tools emerge and old ones change ownership.",
    ],
    chapter_titles: [
      "The Privacy War You Didn't Know You Joined",
      "How AI Systems Collect and Profile You",
      "Facial Recognition — Where It's Watching",
      "Voice Assistants and the Always-On Microphone",
      "Search Engines, Recommendations, and Filter Bubbles",
      "Social Media's AI Targeting and Data Machine",
      "Opt-Out Strategies That Actually Work",
      "Privacy Tools — Browsers, VPNs, and Settings",
      "Living a Privacy-First Life in an AI World",
    ],
  },
  {
    id: "book-cryptocurrency-safety",
    slug: "cryptocurrency-safety-avoiding-scams",
    name: "Cryptocurrency Safety: Avoiding Digital Currency Scams",
    subtitle: "Bitcoin scams, fake exchanges, wallet security, and investment fraud in the crypto space",
    description: "Navigate cryptocurrency safely — understand wallet security, exchange risks, and the sophisticated scams draining accounts every day.",
    longDescription:
      "Cryptocurrency Safety: Avoiding Digital Currency Scams covers the complete threat landscape facing anyone who owns, trades, or is considering cryptocurrency. From wallet security and exchange selection to pig butchering scams, fake ICOs, and NFT fraud, this book gives readers the specific knowledge needed to protect digital assets and recognize the sophisticated social engineering that makes crypto fraud so devastating.",
    price: 14.99,
    total_pages: 140,
    image: bookCryptoDefense,
    tag: "Technology",
    stripe_price_id: "price_placeholder_book_20",
    category: "finance",
    ideal_for: "current and prospective crypto investors, retirement savers exploring alternatives, and fraud prevention advocates",
    outcomes: [
      "Understand how cryptocurrency works well enough to recognize common attack vectors.",
      "Secure wallets using cold storage and hardware keys for any significant holdings.",
      "Recognize pig butchering, fake ICOs, exchange fraud, and NFT scams before losing assets.",
      "Know the Ohio tax and legal landscape for cryptocurrency and how to report fraud.",
    ],
    risk_signals: [
      "A new online contact is steering you toward a cryptocurrency investment platform.",
      "A platform promises consistent daily or weekly returns on crypto investments.",
      "You're being asked to move funds to a 'private wallet' or 'secure platform' a contact recommends.",
      "Your seed phrase or private key has been requested by anyone for any reason.",
    ],
    controls: [
      "Never share your seed phrase or private keys with anyone — no legitimate service will ever ask.",
      "Use hardware wallets for any cryptocurrency holdings exceeding one month's income.",
      "Stick to regulated exchanges: Coinbase, Kraken, and Gemini for U.S. users.",
      "Enable 2FA with an authenticator app — never SMS — on all exchange accounts.",
    ],
    response_plan: [
      "Stop all transfers immediately if you suspect a scam and do not invest more to 'recover' losses.",
      "Report to FBI IC3 at ic3.gov — include all transaction IDs, wallet addresses, and communication.",
      "Contact the FTC at reportfraud.ftc.gov and your state AG.",
      "Consult a blockchain forensics firm to document the fraud trail for law enforcement.",
    ],
    practice_plan: [
      "Review your exchange account security settings and active sessions monthly.",
      "Check that your hardware wallet firmware is current every quarter.",
      "Keep a record of every crypto transaction for IRS reporting requirements.",
      "Apply the 5% rule: never allocate more than 5% of investable assets to cryptocurrency.",
    ],
    chapter_titles: [
      "Digital Money's Fraud Problem",
      "How Cryptocurrency Actually Works — Plain English",
      "Wallet Security — Hot Wallets, Cold Storage, and Hardware Keys",
      "Exchange Security — Choosing and Using Platforms Safely",
      "The Most Common Crypto Scams",
      "Pig Butchering — The Long Con That Ruins Lives",
      "Fake ICOs, Pump-and-Dump, and Influencer Fraud",
      "NFT Scams and Digital Asset Fraud",
      "Recovering From Crypto Fraud — and Why It's Hard",
      "Tax and Legal Considerations in Ohio",
      "Building a Cautious Crypto Strategy",
    ],
  },

  // ── OHIO COMMUNITY ───────────────────────────────────────────────────────────
  {
    id: "book-veteran-digital",
    slug: "ohio-veterans-guide-digital-safety",
    name: "Ohio Veteran's Guide to Digital Safety",
    subtitle: "VA scams, benefits fraud, veteran community security, and Ohio veteran resources",
    description: "Protect your benefits, your identity, and your savings from the scams and frauds specifically targeting Ohio veterans.",
    longDescription:
      "Ohio Veteran's Guide to Digital Safety addresses the specific fraud threats targeting Ohio's 700,000+ veterans: VA impersonation, pension poaching, veteran community infiltration, and the mental health and isolation factors that fraudsters deliberately exploit. Written with the directness veterans appreciate and packed with Ohio-specific resources from ODVA to the DAV, this guide helps veterans build a secure digital life after service.",
    price: 9.99,
    total_pages: 95,
    image: bookPhishingDefense,
    tag: "Ohio",
    stripe_price_id: "price_placeholder_book_21",
    category: "seniors",
    ideal_for: "Ohio veterans of all ages, military spouses, and VSO staff supporting veterans",
    outcomes: [
      "Recognize VA impersonation calls, pension scams, and military-themed investment fraud.",
      "Verify online veteran communities and organizations before sharing personal information.",
      "Access Ohio's veteran support network including ODVA, DAV, and VFW resources.",
      "Build a secure digital life that protects the benefits and savings earned through service.",
    ],
    risk_signals: [
      "A caller claims to be from the VA and needs personal information to process a benefit.",
      "An online financial advisor is targeting you specifically as a veteran with a 'veteran-exclusive' offer.",
      "An online veteran community or charity cannot be verified through Charity Navigator or GuideStar.",
      "Someone is pressuring you to act quickly on a financial decision related to your pension or disability.",
    ],
    controls: [
      "Access VA services only through VA.gov — never through a link in an email or text.",
      "Verify any VA contact by calling the main VA line at 1-800-827-1000.",
      "Check veteran charities at charitynavigator.org before donating.",
      "Contact your county Veterans Service Commission for free, accredited claims assistance.",
    ],
    response_plan: [
      "Report VA benefit fraud to the VA OIG hotline at 1-800-488-8244.",
      "Contact Ohio DVS at 888-DVS-OHIO for state-level assistance and resources.",
      "File a complaint with the FTC at reportfraud.ftc.gov for financial fraud.",
      "Reach Veterans Crisis Line at 988 (press 1) for mental health support if needed.",
    ],
    practice_plan: [
      "Review your VA.gov account security settings and benefit payment information annually.",
      "Connect with your local VFW or DAV post for community connection and peer support.",
      "Verify any financial product claiming veteran benefits through Ohio Division of Securities.",
      "Keep your DD-214 stored securely — both digitally and in a fireproof physical location.",
    ],
    chapter_titles: [
      "Why Veterans Are High-Value Targets",
      "VA Benefit Scams and Government Impersonation",
      "Veteran-Specific Financial Fraud and Pension Scams",
      "Online Veteran Communities — Real vs. Infiltrated",
      "Mental Health, Isolation, and Exploitation",
      "Ohio Veteran Resources — DAV, VFW, ODVA, VSOs",
      "Building a Secure Post-Service Digital Life",
    ],
  },
  {
    id: "book-church-nonprofit",
    slug: "church-nonprofit-cybersecurity-guide",
    name: "Church & Nonprofit Cybersecurity Guide",
    subtitle: "Protecting donor data, email security, and cyber resilience for faith communities and Ohio nonprofits",
    description: "Protect your organization's donor data, financial records, and reputation with a cybersecurity approach built for nonprofits and faith communities.",
    longDescription:
      "Church & Nonprofit Cybersecurity Guide gives Ohio nonprofits and faith communities the specific cybersecurity guidance they need — on a nonprofit budget, with volunteer staff, and without an IT department. Covering email security, donor data protection, ransomware response, secure donation processing, and Ohio's breach notification requirements, this guide makes cybersecurity accessible for mission-driven organizations.",
    price: 14.99,
    total_pages: 115,
    image: bookCharityScam,
    tag: "Ohio",
    stripe_price_id: "price_placeholder_book_22",
    category: "business",
    ideal_for: "Ohio nonprofit executive directors, church administrators, board members, and volunteer leaders",
    outcomes: [
      "Protect your organization from business email compromise and the CEO impersonation wire fraud.",
      "Secure donor data and implement PCI-compliant donation processing.",
      "Train staff and volunteers on cybersecurity without a dedicated IT budget.",
      "Understand Ohio's nonprofit breach notification obligations and how to respond to an incident.",
    ],
    risk_signals: [
      "Your executive director or pastor's email address has been impersonated in a wire fraud attempt.",
      "Donor records are stored in an unencrypted spreadsheet or shared without access controls.",
      "Multiple volunteers share a single login for your online giving platform.",
      "Your organization has never tested data backups or run a tabletop security exercise.",
    ],
    controls: [
      "Enable two-factor authentication on all organizational email accounts immediately.",
      "Implement a dual-approval process for any wire transfer or banking information change.",
      "Use separate logins for every staff member and volunteer with access to donor data.",
      "Back up donor records and financial data weekly to an encrypted, off-site location.",
    ],
    response_plan: [
      "Contain the compromise by changing compromised credentials and isolating affected systems.",
      "Notify your cyber insurer before engaging outside forensics or public communication.",
      "Follow Ohio's 45-day breach notification law if donor personal information was exposed.",
      "Report to the Ohio AG Charitable Law Section if charitable funds were fraudulently diverted.",
    ],
    practice_plan: [
      "Deliver a 30-minute cybersecurity training at least annually for all staff and volunteers.",
      "Review donation platform security settings and user access quarterly.",
      "Apply for Microsoft 365 Nonprofit or Google Workspace for Nonprofits for free secure email.",
      "Access free CISA resources for nonprofits at cisa.gov to stay current without budget.",
    ],
    chapter_titles: [
      "Nonprofits and Churches Are Under Attack",
      "Email Security for Faith Communities and Nonprofits",
      "Protecting Donor Data and Financial Records",
      "Secure Donation Processing and Website Safety",
      "Staff and Volunteer Training on a Nonprofit Budget",
      "Ransomware — What Happens When Your Organization Is Hit",
      "Social Media Safety for Nonprofits and Churches",
      "Legal Compliance and Reporting Obligations",
      "Building Cyber Resilience on a Nonprofit Budget",
    ],
  },
  {
    id: "book-real-estate-security",
    slug: "real-estate-transaction-security-ohio",
    name: "Real Estate Transaction Security in Ohio",
    subtitle: "Wire fraud, title company scams, closing day security, and agent verification",
    description: "Protect your home purchase or sale from wire fraud and real estate scams — an Ohio-specific guide from contract to keys.",
    longDescription:
      "Real Estate Transaction Security in Ohio addresses the fastest-growing financial crime in the state's housing market: wire fraud that intercepts closing funds. With $446M lost nationally to real estate wire fraud in 2022, Ohio buyers and sellers need specific protocols for verifying title companies, securing closing instructions, and protecting funds on closing day. This guide covers every stage of the transaction.",
    price: 12.99,
    total_pages: 120,
    image: bookOnlineShopping,
    tag: "Ohio",
    stripe_price_id: "price_placeholder_book_23",
    category: "finance",
    ideal_for: "Ohio homebuyers, sellers, real estate agents, title officers, and anyone involved in a real estate transaction",
    outcomes: [
      "Recognize real estate wire fraud and know the email compromise pattern that makes it happen.",
      "Verify your title company, real estate agent, and closing attorney through official Ohio channels.",
      "Execute closing day security protocols that protect your wire transfer.",
      "Know how to respond in the first 72 hours if you wire to the wrong account.",
    ],
    risk_signals: [
      "Wiring instructions arrive by email without a previous phone call to verify.",
      "Your agent or title company's email address is slightly different from the one you've been using.",
      "You receive a last-minute change to closing day wiring instructions.",
      "Your title company cannot confirm wiring instructions by calling a number you find independently.",
    ],
    controls: [
      "Call your title company at a number from their official website to verify wiring instructions before any transfer.",
      "Verify your title company's license at the Ohio Department of Insurance portal.",
      "Establish a dedicated communication channel with your title company at contract signing.",
      "Confirm wiring instructions in person or by video call if possible on closing day.",
    ],
    response_plan: [
      "Call your bank immediately to initiate a wire recall — speed is critical in the first 72 hours.",
      "Contact the FBI IC3 at ic3.gov and the Ohio AG at 1-800-282-0515.",
      "File a FinCEN complaint if the fraud involved a financial institution.",
      "Preserve all email communications, wire confirmation receipts, and account statements.",
    ],
    practice_plan: [
      "Before starting any real estate transaction, establish your verification protocol with your agent.",
      "Confirm your title company contact information from their official website before proceeding.",
      "Keep printed copies of verified wiring instructions in a secure location before closing day.",
      "If purchasing real estate, review this book's closing day protocol at least one week before closing.",
    ],
    chapter_titles: [
      "Ohio's Wire Fraud Epidemic in Real Estate",
      "How Real Estate Wire Fraud Works",
      "Verifying Your Title Company, Agent, and Attorney in Ohio",
      "Secure Communication Throughout the Transaction",
      "Closing Day Security Protocols",
      "Rental Fraud — Fake Listings and Landlord Scams in Ohio",
      "Mortgage and Refinancing Fraud",
      "Ohio Real Estate Law and Fraud Reporting",
      "After Closing — Long-Term Security for Ohio Homeowners",
    ],
  },
  {
    id: "book-data-breach-legal",
    slug: "ohio-data-breach-legal-guide-small-business",
    name: "Small Business Owner's Legal Guide to Data Breaches",
    subtitle: "Ohio breach notification law, liability, incident response, and prevention as legal strategy",
    description: "Understand Ohio's data breach notification law, your legal liability, and how to respond to a breach without destroying your business.",
    longDescription:
      "Small Business Owner's Legal Guide to Data Breaches gives Ohio small business owners plain-English guidance on their breach notification obligations, liability exposure, and incident response requirements under Ohio Revised Code 1347.12 and the Ohio Data Protection Act. Including the Safe Harbor defense, regulatory reporting, class action risk, and how to use breach prevention as a legal strategy, this book helps owners prepare before the breach — not scramble after.",
    price: 16.99,
    total_pages: 115,
    image: bookIdentityTheft,
    tag: "Ohio",
    stripe_price_id: "price_placeholder_book_24",
    category: "business",
    ideal_for: "Ohio small business owners, office managers, HR directors, and board members responsible for data privacy",
    outcomes: [
      "Understand Ohio's 45-day breach notification requirement and who must be notified.",
      "Build an incident response plan that preserves the Ohio Data Protection Act Safe Harbor defense.",
      "Know when to engage breach counsel and IT forensics and in what order.",
      "Reduce legal liability through documented security programs and employee training.",
    ],
    risk_signals: [
      "Your business stores customer personal information without a documented data security program.",
      "No written incident response plan exists — the response to a breach would be improvised.",
      "Your business has never conducted a formal data inventory or risk assessment.",
      "No cyber insurance or breach response retainer is in place.",
    ],
    controls: [
      "Implement a written information security program aligned with NIST CSF or CIS Controls to qualify for Ohio's Safe Harbor.",
      "Conduct a formal data inventory to know exactly what personal information you hold and where.",
      "Establish a breach response retainer with a HIPAA/breach-experienced law firm.",
      "Document all security training, risk assessments, and remediation activities with timestamps.",
    ],
    response_plan: [
      "Contact breach counsel immediately — do not issue any notifications or public statements first.",
      "Engage a PFI (forensic investigation firm) under attorney-client privilege to preserve privilege.",
      "Initiate notifications within Ohio's 45-day window after completing the required risk assessment.",
      "Notify the Ohio AG for any breach affecting 500 or more Ohio residents.",
    ],
    practice_plan: [
      "Conduct an annual risk assessment and document remediation steps with completion dates.",
      "Review your incident response plan after every industry breach event — even if it didn't affect you.",
      "Deliver HIPAA, data handling, and breach recognition training annually with signed acknowledgments.",
      "Review your cyber insurance policy annually to ensure coverage matches your current data footprint.",
    ],
    chapter_titles: [
      "Ohio's Data Breach Notification Law and Why Every Business Owner Needs to Understand It",
      "Defining a Data Breach Under Ohio Law",
      "The Notification Obligation — Who, When, and How",
      "Building Your Incident Response Plan",
      "Legal Liability and Exposure Management",
      "Working with Breach Counsel and IT Forensics",
      "Regulatory Reporting — Ohio AG, FTC, and Sector Regulators",
      "Class Action Defense and Insurance Coordination",
      "Breach Prevention as Legal Risk Management",
    ],
  },
  {
    id: "book-ohio-directory",
    slug: "complete-ohio-cybersecurity-resource-directory",
    name: "The Complete Ohio Cybersecurity Resource Directory",
    subtitle: "Every Ohio resource: agencies, hotlines, free services, training programs, and legal contacts",
    description: "The definitive quick-reference directory of every cybersecurity and fraud resource available to Ohio residents, businesses, seniors, and veterans.",
    longDescription:
      "The Complete Ohio Cybersecurity Resource Directory compiles every federal agency, Ohio state program, free service, nonprofit resource, and legal contact that Ohio residents need after a cyber incident or fraud — organized by incident type and audience. From the FTC and FBI IC3 to Ohio OSHIIP, the Senior Medicare Patrol, the Ohio Cyber Reserve, and county-level legal aid offices, this is the reference guide that belongs in every Ohio home and business.",
    price: 7.99,
    total_pages: 75,
    image: bookTaxScam,
    tag: "Ohio",
    stripe_price_id: "price_placeholder_book_25",
    category: "scam",
    ideal_for: "all Ohio residents, fraud victims, community organizations, and anyone helping others navigate a cyber incident",
    outcomes: [
      "Find the right reporting agency and resource within minutes of a cyber incident or fraud.",
      "Access Ohio-specific programs for seniors, veterans, nonprofits, and small businesses.",
      "Understand which agency handles which type of fraud — and how to contact them.",
      "Use the quick reference decision tree to immediately know your first call after any incident.",
    ],
    risk_signals: [
      "You've been targeted by a scam but don't know where to report or who can help.",
      "A family member was victimized and you need to navigate multiple agencies simultaneously.",
      "Your business experienced a breach and you're uncertain which regulators must be notified.",
      "You want to prepare before an incident — not scramble after.",
    ],
    controls: [
      "Save the key Ohio AG fraud line (1-800-282-0515) in your phone before you need it.",
      "Create a printed quick-reference card with the five most important numbers for your situation.",
      "Register for Ohio EMA alerts and know your county's emergency management contact.",
      "Complete an annual free credit check at annualcreditreport.com for early breach detection.",
    ],
    response_plan: [
      "Use the decision tree in Chapter 5 to identify your first call based on the incident type.",
      "Call the Ohio AG Consumer Protection line at 1-800-282-0515 for most fraud incidents.",
      "File at FBI IC3 (ic3.gov) for internet crime and FTC (reportfraud.ftc.gov) for all consumer fraud.",
      "Contact InVision Network at invisionnetwork.org for free guidance if you need a next step.",
    ],
    practice_plan: [
      "Review this directory annually — agency contacts and program details change.",
      "Share the quick reference chapter with family members and coworkers.",
      "Bookmark the three websites you use most: reportfraud.ftc.gov, ic3.gov, ohioattorneygeneral.gov.",
      "Check Have I Been Pwned (haveibeenpwned.com) quarterly for early breach alerts.",
    ],
    chapter_titles: [
      "Ohio's Safety Net for Cyber Victims",
      "Federal Agencies and Reporting Resources",
      "Ohio State Agencies and Programs",
      "Free Services, Training Programs, and Community Resources",
      "Quick Reference Directory — Hotlines and Contacts",
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
