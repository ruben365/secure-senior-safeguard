import type { BookChapter } from "@/config/bookCatalog";

/** Full content for Social Media Privacy for Families (~115 pages) */
export const SOCIAL_MEDIA_PRIVACY_FAMILY_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Social Media Privacy for Families</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">What You Share Lives Longer Than You Think</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio · 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright © 2026 InVision Network. All rights reserved.</p><p>Published by InVision Network Press, Kettering, Ohio 45440</p><p><em>For educational purposes only.</em></p></div></article>`,
  },
  {
    chapter_number: 1,
    chapter_title: "What You Share Lives Longer Than You Think",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
    <h2>Chapter 1: What You Share Lives Longer Than You Think</h2>

    <p>There is a photograph of a four-year-old girl in a Dayton backyard, taken on a summer afternoon in 2017. She is wearing a striped bathing suit, laughing at something off-camera, her hair in a ponytail that has mostly come apart. Her mother posted it to Facebook that evening with a caption about how fast summer goes. Seventeen family members and friends liked it. A grandmother commented that it was the most precious thing she had ever seen.</p>

    <p>In 2026, that photograph still exists. Not just in the mother's Facebook archive — in the caches of data aggregators who scraped public social media. In backup systems Facebook maintains in data centers in three states. In the browser history of everyone who clicked the link when it was shared. In a screenshot taken by someone who has since left the mother's friends list. In a data broker's profile of the family, cross-referenced with the address visible in the background of the photo and the school district tag the mother used three posts later.</p>

    <p>The four-year-old is now thirteen. She did not consent to that photograph's publication, its aggregation, or its continued existence across systems she has no knowledge of and no access to. She almost certainly would not want it in the data broker's database. Nobody asked her.</p>

    <h3>The Permanence of Digital Content</h3>

    <p>Digital content is permanent in a way that is genuinely difficult to internalize, because deletion feels like erasure and it is not. When you delete a post from Facebook, Facebook removes it from public view — but the company's own data systems retain the content for varying periods, and anything that was shared, cached, or scraped before deletion continues to exist. The internet archive (archive.org) crawls public web pages continuously. Screenshots are taken in seconds. Data brokers operate continuously, ingesting publicly available information and building persistent profiles that are not governed by any delete button on any social media platform.</p>

    <p>This is not a reason to avoid social media or to post nothing. It is a reason to approach social media posting with the explicit understanding that what you share publicly is, for practical purposes, permanent. And what you share with a "friends" list of 400 people is not meaningfully private — it is shared with 400 people, some of whom will leave your life, some of whom were never close to you, and some of whom may have interests that are not aligned with yours.</p>

    <h3>Data Broker Aggregation</h3>

    <p>Data brokers are companies that collect publicly available information — social media posts, property records, voter registrations, court records, business filings — and aggregate it into detailed personal profiles that they sell to marketers, employers, landlords, insurance companies, private investigators, and anyone else willing to pay. The major brokers include Spokeo, Whitepages, BeenVerified, MyLife, and Intelius. A typical data broker profile includes name, age, address history, phone numbers, email addresses, names of relatives, property ownership, estimated income, and social media profiles — all assembled without the subject's knowledge or consent.</p>

    <p>For Ohio families, this aggregation has specific implications. Ohio property records are public and searchable, which means your home address is often the anchor point for a data broker's profile of your family. Voter registration rolls, which are public in Ohio, add birthdates and often phone numbers. Social media adds photos, relationship information, and behavioral patterns. The result is that a motivated person — a stalker, a scammer, an abusive ex, a criminal — can assemble a detailed profile of your family from information that is technically public but that you never intended to be compiled and sold.</p>

    <h3>The Oversharing Epidemic</h3>

    <p>Social media's design incentivizes sharing. Platforms reward engagement with notifications, likes, and the pleasurable neurological response to social validation. The more emotionally resonant the content — a photo of your child's first day of school, a post about a difficult day, an announcement of a new home or job — the more engagement it tends to receive, which reinforces the sharing behavior. This is not accidental. It is the product of years of deliberate platform design intended to maximize content production and time-on-platform.</p>

    <p>The result is a culture of oversharing that most people do not experience as a problem until something goes wrong — until a stalker uses location-tagged posts to establish a target's routine, until a school bully finds ammunition in family photos, until an employer finds social content that complicates a hiring decision, until a divorce proceeding surfaces posts that were made in a different context. The time to develop a thoughtful relationship with what you share is before any of those things happen, not after.</p>

    <h3>What This Book Teaches</h3>

    <p>This book is a practical guide to social media privacy for families — not a manifesto for digital abstinence, but a specific, actionable set of steps that reduce risk without eliminating connection. It walks through the privacy settings of every major platform your family is likely to use. It explains the data broker ecosystem and how to opt out. It addresses the specific issue of sharenting — the practice of posting about your children — with the seriousness it deserves. And it provides a framework for creating a family privacy policy that reflects your family's values and protects everyone in it, including the members who are too young to protect themselves.</p>
    </article>`,
  },
  {
    chapter_number: 2,
    chapter_title: "Facebook Privacy Settings — The 2026 Practical Guide",
    page_start: 17,
    page_end: 28,
    content_html: `<article class="chapter-content">
    <h2>Chapter 2: Facebook Privacy Settings — The 2026 Practical Guide</h2>

    <p>Facebook's privacy settings are both more comprehensive than most users realize and more difficult to navigate than they should be. The company has a long history of setting privacy defaults in the direction of maximum disclosure and requiring active steps to reduce it. As of 2026, the core privacy architecture is controlled through the Privacy Center (accessible from the main menu on both mobile and desktop), but many specific settings are buried in submenus that require deliberate navigation.</p>

    <h3>Audience Controls for Posts, Stories, and Photos</h3>

    <p>The audience selector — the dropdown that appears when you create a post — lets you choose who sees each piece of content: Public, Friends, Friends except..., Specific friends, or Only me. The default for new accounts is Friends, but the default carries over from your last post, which means a single accidental Public post sets the default for everything that follows until you change it. Review the audience selector on every post before publishing.</p>

    <p>For photos specifically, go to Settings and Privacy > Settings > Profile and Tagging. Here you can control who can see posts you're tagged in, who can tag you in posts, and whether tagged posts appear on your profile before you review them. Enabling "Review posts you're tagged in before they appear on your profile" prevents others from publishing content about you without your awareness.</p>

    <h3>Who Can Find You by Phone or Email</h3>

    <p>Facebook allows users to search for accounts using phone numbers and email addresses — which means anyone with your phone number can find your Facebook profile if this setting is left on. Go to Settings > Privacy > How People Find and Contact You. Change "Who can look you up using the phone number you provided?" from Everyone to Friends or Only me. Do the same for email. This prevents your profile from being discoverable by data brokers and strangers who have obtained your contact information through other means.</p>

    <h3>Activity Off-Facebook Settings</h3>

    <p>This is the setting most users do not know exists. Facebook tracks your activity on other websites and apps — not just your activity on Facebook itself — through the Facebook Pixel, a tracking code that third-party websites install. Your browsing history, shopping behavior, and app usage on other platforms feeds back into Facebook's advertising profile for you. Go to Settings > Your Facebook Information > Off-Facebook Activity to see what has been collected and to disconnect this data from your account. Note that disconnecting does not stop the collection — it only stops the association with your account.</p>

    <h3>Friend List Visibility and Ad Preferences</h3>

    <p>Your friend list is public by default. Go to your profile, click Friends, and then click the pencil icon to change who can see your friends list. Setting this to Only Me prevents people from using your connections to identify and target your family members. For ad preferences, go to Settings > Ads to review what categories Facebook has assigned to you and to opt out of categories you find intrusive or inaccurate. You can also download all your Facebook data (Settings > Your Facebook Information > Download Your Information) to see exactly what the platform has collected about you.</p>
    </article>`,
  },
  {
    chapter_number: 3,
    chapter_title: "Instagram and TikTok — Visual Oversharing and Location Risks",
    page_start: 29,
    page_end: 39,
    content_html: `<article class="chapter-content">
    <h2>Chapter 3: Instagram and TikTok — Visual Oversharing and Location Risks</h2>

    <p>Visual platforms create privacy risks that text-based social media does not, because photographs contain information that was not intentionally shared. A photo of your child on the first day of school communicates the child's approximate age, the school name (often visible on the building, their backpack, or a sign), the neighborhood, the date and time (if location services are enabled), and enough detail about your family's daily routine to be useful to someone building a profile. Most parents who post these photos are not thinking about this — they are thinking about grandparents who want to see the milestone. Both things are true simultaneously.</p>

    <h3>Photo Metadata</h3>

    <p>Every photograph taken on a modern smartphone embeds metadata — data about the data — that includes the date and time of the photo, and often the precise GPS coordinates of where the photo was taken. This metadata is called EXIF data, and it is invisible in the photo itself but readable by any application or person who accesses the original file. Instagram, as of 2026, strips EXIF data from photos uploaded to the platform. TikTok does as well. However, if you share the original photo file through other channels — email, iMessage, cloud storage, third-party apps — the GPS coordinates travel with it.</p>

    <p>The practical implication: sharing original photo files with strangers, or with large "friends" lists that include people you do not know well, can disclose your home address, your children's school location, and your daily patterns without your awareness. Use the camera's settings or a metadata-stripping app to remove EXIF data before sharing original files outside of major social platforms.</p>

    <h3>Location Tags and Real-Time Disclosure</h3>

    <p>Adding a location tag to a post is a deliberate act that most users understand. What is less understood is that posting photos in real time — while you are at a location, rather than after you have left — tells anyone watching your feed where you are right now. A pattern of real-time posts from your neighborhood, your gym, your children's school, and your workplace creates a schedule that a motivated person can use to predict your movements. The simple practice of posting photos an hour after you have left a location eliminates this risk without eliminating the post.</p>

    <h3>TikTok Data Concerns for Families</h3>

    <p>TikTok collects a broad range of user data including browsing history, device identifiers, keystroke patterns, clipboard contents, and precise location. The platform's privacy policy permits the transfer of this data to servers in China under certain circumstances, which has prompted regulatory concern at federal and state levels. Ohio state employees are prohibited from TikTok on government devices. For families, the decision about whether to permit children to use TikTok should be made with full knowledge of the platform's data practices, not just its content. At minimum, TikTok should not be granted location permissions on any device where precise location is sensitive.</p>
    </article>`,
  },
  {
    chapter_number: 4,
    chapter_title: "Your Digital Footprint — What It Reveals About You",
    page_start: 40,
    page_end: 49,
    content_html: `<article class="chapter-content">
    <h2>Chapter 4: Your Digital Footprint — What It Reveals About You</h2>

    <p>A digital footprint is the aggregate of everything that can be learned about a person through digital sources — their own social media, records databases, data brokers, news archives, court records, and any other publicly accessible digital information. Most people have a much larger footprint than they realize, because most of the data that comprises it was collected without their active participation.</p>

    <h3>The Digital Footprint Audit</h3>

    <p>Conducting a footprint audit on yourself takes about an hour and produces useful information about your current exposure. Search your full name in quotation marks on Google, Bing, and DuckDuckGo. Search your name plus city, your name plus employer, your name plus family members' names. Search your phone number and email address. Visit Spokeo.com, Whitepages.com, BeenVerified.com, and MyLife.com and search for your own name. Document what you find — not to be alarmed, but to understand your baseline and then take steps to reduce it.</p>

    <h3>What Employers, Criminals, and Marketers Use</h3>

    <p>Employers routinely search candidates' social media before interviews and hiring decisions. Content that seems benign in a social context — photos from a party, strong political opinions, complaints about a previous employer — can affect hiring decisions without the candidate's knowledge. More relevantly for this book, criminals use exactly the same public data sources to target scams and crimes. A profile that reveals your approximate income, your home address, your travel schedule, your family structure, and your financial institutions provides a scammer with the specifics needed to make a targeted phishing attempt feel personal and credible. Marketers use this data to segment audiences for advertising — a use that feels less threatening but contributes to the same data ecosystem that criminals exploit.</p>

    <h3>How Data Is Aggregated</h3>

    <p>Data aggregation works by linking records that share common identifiers — your name, phone number, address, or email — across different databases. Your Facebook profile links to your LinkedIn through your name and employer. Your LinkedIn links to property records through your address. Property records link to voter registration through your name and address. Voter registration adds your birthdate. The result is a profile that no single database contains but that emerges from cross-referencing all of them. Data brokers do this aggregation at scale, processing millions of records to produce the profiles they sell.</p>
    </article>`,
  },
  {
    chapter_number: 5,
    chapter_title: "Children's Privacy — COPPA, Sharenting, and Monitoring",
    page_start: 50,
    page_end: 59,
    content_html: `<article class="chapter-content">
    <h2>Chapter 5: Children's Privacy — COPPA, Sharenting, and Monitoring</h2>

    <p>Children cannot meaningfully consent to the digital presence their parents create for them. A child photographed at birth and posted to social media has begun accumulating a public digital record before they have any awareness of what that means. By the time that child is old enough to understand privacy — and to care about it — years of content exist that they did not choose and may not want.</p>

    <h3>The Sharenting Problem</h3>

    <p>Sharenting — the practice of parents sharing content about their children on social media — is nearly universal. A 2024 survey found that American parents post an average of 900 photos of their children online before the child's fifth birthday. The posts are motivated by genuine love and the desire to share joy with extended family and community. The risks are less visible: the permanent aggregation of those images, the potential for content to be shared beyond the intended audience, the accumulation of identifying information about a child who cannot consent, and the creation of a digital record that the child will inherit at the age of digital accountability.</p>

    <p>A responsible approach to sharenting includes: keeping children's social media presence on private accounts rather than public ones, avoiding photos that disclose school names or locations, not posting content that the child might find embarrassing or humiliating at an older age, and having an explicit conversation with older children about what they are comfortable with being shared publicly. Some families adopt a policy of not posting images of children's faces on public accounts at all — a choice that is more mainstream than it was five years ago.</p>

    <h3>COPPA and Its Limits</h3>

    <p>The Children's Online Privacy Protection Act requires websites and apps directed at children under thirteen to obtain verifiable parental consent before collecting personal data. In practice, COPPA's protections are limited by weak age verification, broad exemptions for "general audience" platforms that are nonetheless used by children, and enforcement resources that are insufficient to police the scale of the internet. Ohio has not yet passed a state-level children's privacy law that goes beyond COPPA, though several such bills have been introduced in the General Assembly.</p>

    <h3>Monitoring vs. Respecting Privacy</h3>

    <p>Parents have both the legal authority and the parental responsibility to monitor their minor children's online activity. The tension is developmental: an approach to monitoring that is appropriate for a ten-year-old is not appropriate for a sixteen-year-old. The most effective monitoring approach is transparent — children know that parents have access to their accounts and can see their activity — and is paired with an explicit understanding that the purpose is safety, not surveillance. Covert monitoring that a teenager discovers typically damages trust in ways that are counterproductive to safety.</p>
    </article>`,
  },
  {
    chapter_number: 6,
    chapter_title: "Location Data — Geotagging and Real-World Risk",
    page_start: 60,
    page_end: 69,
    content_html: `<article class="chapter-content">
    <h2>Chapter 6: Location Data — Geotagging and Real-World Risk</h2>

    <p>Your smartphone knows where you are at all times. Whether it shares that information — and with whom — depends on the permissions you have granted to each application. Most people grant location permissions reflexively during app setup and then forget they have done so. The result is that dozens of applications may be tracking your location continuously, and some of that data is shared with third parties, aggregated by data brokers, and occasionally available in data breaches.</p>

    <h3>How Platforms Harvest Location</h3>

    <p>Instagram, Snapchat, and TikTok all request location permissions during setup. Instagram uses location data to serve local content and advertising. Snapchat's Snap Map feature uses location to display users' positions to their friends list in real time. TikTok collects location as part of its broader data collection. On iOS, each app's location access can be reviewed and restricted in Settings > Privacy & Security > Location Services. On Android, the same control is in Settings > Location > App Permissions. Review this list and set every social media application to "While Using" rather than "Always" — this prevents background location collection when the app is not open.</p>

    <h3>Check-In Culture and What It Tells Criminals</h3>

    <p>Checking in at restaurants, gyms, vacation destinations, and social events seems innocuous — and for most people, most of the time, it is. The risk is specific: repeated check-ins create a publicly visible pattern of your routine, your frequented locations, and your schedule. For a burglar, a pattern of vacation check-ins confirms that the home is unoccupied. For a stalker, gym and restaurant check-ins establish routine and predictability. The simplest mitigation is to post about locations after leaving them rather than in real time, and to avoid check-ins that disclose your home neighborhood.</p>

    <h3>Family Tracking Apps — Pro and Con</h3>

    <p>Apps like Life360, Google Family Sharing, and Apple's Find My are actively used by Ohio families for legitimate safety purposes — knowing where a teenager is, locating a child after school, coordinating family logistics. They are genuinely useful tools. The privacy considerations are: these apps require children to share their real-time location with parents, which is appropriate for younger children but requires renegotiation as children develop. The apps also store location history on the company's servers, which creates data that exists outside your control. Review each app's data retention and sharing policies, and consider whether your family's tracking needs can be met with a setting that does not involve continuous background tracking.</p>
    </article>`,
  },
  {
    chapter_number: 7,
    chapter_title: "Data Brokers — What They Know and How to Opt Out",
    page_start: 70,
    page_end: 79,
    content_html: `<article class="chapter-content">
    <h2>Chapter 7: Data Brokers — What They Know and How to Opt Out</h2>

    <p>Data brokers operate legally and largely outside public awareness. They collect, aggregate, and sell personal information about virtually every American adult, and increasingly about children as well. Opting out is your legal right, and the process, while tedious, is effective — for a period of time. Brokers re-add information as new public records become available, which means opt-out is an ongoing process rather than a one-time solution.</p>

    <h3>The Major Brokers and How to Opt Out</h3>

    <p><strong>Spokeo:</strong> Go to spokeo.com/optout. Search for your listing, click the listing, copy the URL, and paste it into the opt-out form. Spokeo removes listings within a few days. You may need to repeat this process for multiple listings under your name.</p>

    <p><strong>Whitepages:</strong> Go to whitepages.com/suppression_requests. Search for your listing and submit a removal request. Whitepages charges a fee for expedited removal but also offers free removal that takes longer. Use the free option.</p>

    <p><strong>BeenVerified:</strong> Go to beenverified.com/opt-out. Search for your record, select it, and submit your email for a confirmation link. Click the link to complete removal.</p>

    <p><strong>MyLife:</strong> Go to mylife.com/ccpa/index.pubview. Submit an opt-out request. MyLife's process is more involved than most and may require follow-up.</p>

    <p><strong>Intelius:</strong> Go to intelius.com/opt-out. Submit your information for removal. Intelius also owns a number of subsidiary sites (PeopleLookup, USSearch) that require separate opt-outs.</p>

    <h3>Opt-Out Services</h3>

    <p>Services like DeleteMe (joindeleteme.com) automate the opt-out process across dozens of data brokers and re-submit removals quarterly as brokers re-add information. These services cost between $100 and $150 per year per person. For families with heightened privacy concerns — those with public-facing professions, domestic violence situations, or stalking history — the cost is worth it. For most families, a manual annual opt-out from the five to ten largest brokers provides meaningful protection at no cost.</p>

    <h3>Why Opt-Outs Only Last So Long</h3>

    <p>Data brokers ingest public records continuously. Ohio property records, court filings, and voter registrations are updated regularly and re-scraped by brokers. An opt-out removes the current listing but does not prevent the broker from re-adding information from future public record ingestions. This is why periodic re-checking and re-opting-out is necessary, and why services that automate the process provide ongoing value. The goal is not to achieve zero presence — that is not achievable — but to make your family's information harder to find and aggregate, which raises the cost for anyone attempting to compile a detailed profile.</p>
    </article>`,
  },
  {
    chapter_number: 8,
    chapter_title: "Building a Family Privacy Policy",
    page_start: 80,
    page_end: 89,
    content_html: `<article class="chapter-content">
    <h2>Chapter 8: Building a Family Privacy Policy</h2>

    <p>A family privacy policy is a shared agreement about what your family posts online about itself and about each other. It is not a contract enforced with penalties — it is a set of shared values and norms that everyone in the household understands and has participated in creating. The process of creating it is as valuable as the policy itself, because it opens conversation about privacy, consent, and respect in ways that individual rules cannot.</p>

    <h3>Age-Appropriate Social Media Rules</h3>

    <p>Different ages require different rules. For children under ten: no independent social media accounts; parents maintain strict control over what is posted about the child. For preteens (ten to twelve): supervised accounts if any, parents have login access, nothing is posted without parent review. For teenagers: more independence, but within agreed-upon parameters about content, audience, and privacy settings. The specific rules matter less than the consistent application of the principle that privacy is a family value worth protecting deliberately.</p>

    <h3>The "Ask Before You Post" Rule</h3>

    <p>The most universally applicable rule for families is the "ask before you post" norm for photos and content that include other family members. This means: before you post a photo that includes your spouse, your child, your sibling, or your parent, you ask them whether they are comfortable with the post. This applies to grandparents who want to share photos of grandchildren. It applies to teenagers who want to post about their siblings. It applies to adults who want to share family news that affects people other than themselves. The norm builds a culture of consent within the family that extends naturally to how family members think about others' privacy generally.</p>

    <h3>Written Family Agreements</h3>

    <p>Writing the policy down — even informally — serves several purposes. It makes the norms explicit and shared, rather than assumed and contested. It creates a reference point for conversations when norms are violated. And it models the kind of deliberate, thoughtful relationship with technology that we want children to develop. A family privacy agreement does not need to be formal. It can be a list on the refrigerator, a note in the family's shared documents folder, or a few bullet points in a family group chat that everyone acknowledges. The content matters more than the format.</p>
    </article>`,
  },
  {
    chapter_number: 9,
    chapter_title: "When Privacy Has Already Been Compromised",
    page_start: 90,
    page_end: 100,
    content_html: `<article class="chapter-content">
    <h2>Chapter 9: When Privacy Has Already Been Compromised</h2>

    <p>Privacy violations are not hypothetical future events for many Ohio families — they are current or recent realities. Account hacking, doxxing, revenge posting, and image-based abuse are all happening now, to real people, with real consequences for their safety and wellbeing. Knowing what to do when privacy has been compromised is as important as knowing how to prevent it.</p>

    <h3>Account Hacking Response</h3>

    <p>When a social media account is hacked, act quickly: attempt to regain access through the platform's account recovery process (which usually involves a verified phone number or backup email), change the password immediately if access is restored, review connected apps and revoke any that are unfamiliar, and notify your contacts that your account was compromised so they do not act on messages the hacker may have sent. If the account cannot be recovered, report it as compromised to the platform — most platforms have a dedicated process for this that bypasses the normal login requirement.</p>

    <h3>Doxxing Response</h3>

    <p>Doxxing — the publication of someone's private information (address, phone number, family members' names) by a hostile party — is a form of harassment that can have real-world safety consequences. If your family has been doxxed, take screenshots of all published information for evidence, contact the platform to report the content for removal, contact local police if there are threats attached to the disclosure, and consider whether a change in routine (temporarily not posting location-based content, notifying your children's schools of the situation) is warranted. The Ohio Attorney General's office has resources for victims of online harassment and can advise on legal options.</p>

    <h3>NCMEC for Child Sexual Abuse Material</h3>

    <p>If sexual images of a minor are being shared or threatened online, contact the NCMEC CyberTipline (report.cybertip.org) immediately. NCMEC is the federally designated clearinghouse for reporting child sexual exploitation online and works directly with the FBI and federal prosecutors. Platform reporting should also occur simultaneously — all major platforms have expedited processes for removing CSAM — but NCMEC reporting is critical for law enforcement action. Do not delete the evidence before law enforcement advises you to do so.</p>

    <h3>Ohio AG for Identity Theft and Platform Reporting</h3>

    <p>The Ohio Attorney General's Consumer Protection Section (800-282-0515, ohioattorneygeneral.gov) handles identity theft complaints and can assist with the dispute process for fraudulent accounts or credit lines opened in your name. Platform reporting procedures for harassment and privacy violations are available through each platform's help center — document every report you file, including the date, what you reported, and the platform's response. This documentation is essential if escalation to law enforcement becomes necessary.</p>
    </article>`,
  },
];
