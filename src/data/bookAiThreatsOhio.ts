import type { BookChapter } from "@/config/bookCatalog";

/**
 * AI Threats: What Ohio Families Need to Know
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 11 chapters (0–10), ~140 pages, multigenerational audience, empowering tone
 */
export const AI_THREATS_OHIO_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter">
<div style="text-align:center; padding: 3em 0;">
  <p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p>
  <h1 style="font-size:2.2em; margin: 0.5em 0;">AI Threats: What Ohio Families Need to Know</h1>
  <p style="font-size:1.2em; color:#555; margin-bottom:2em;">A Plain-Language Guide for Families Protecting Every Generation</p>
  <p>By the InVision Network Education Team</p>
  <p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio &middot; 2026</p>
</div>

<hr style="margin: 3em 0;" />

<div style="font-size:0.85em; color:#555; line-height:1.9;">
  <p>Copyright &copy; 2026 InVision Network. All rights reserved.</p>
  <p>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.</p>
  <p>ISBN: 978-0-000000-01-7 (Digital Edition)</p>
  <p>Published by InVision Network Press<br/>Kettering, Ohio 45440<br/>www.invisionnetwork.org</p>
  <p>First digital edition, 2026.</p>
  <p><em>The information in this book is provided for educational purposes only. While every effort has been made to ensure accuracy, the landscape of artificial intelligence and online threats changes rapidly. Always verify current information with trusted sources such as the Federal Trade Commission (FTC) at ftc.gov, the Ohio Attorney General at ohioattorneygeneral.gov, or the FBI's Internet Crime Complaint Center at ic3.gov. InVision Network is not liable for decisions made based on this content.</em></p>
  <p><em>All case studies and family scenarios in this book are fictional composites created for educational illustration. Any resemblance to actual persons, living or dead, or to real events is purely coincidental.</em></p>
</div>
</article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "What AI Actually Is (A Plain-Language Explanation)",
    page_start: 4,
    page_end: 16,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: What AI Actually Is (A Plain-Language Explanation)</h2>

<p>Before we talk about what AI can do to harm your family, we need to talk about what AI actually is. That might sound like a detour, but it is the most important foundation this book can give you. When you understand how AI works at a basic level, every threat we describe in later chapters will make immediate sense. And more importantly, you will stop feeling like AI is some kind of dark magic that only experts can understand. It is not. It is a tool. A powerful tool that can be used well or badly, the same as a car, a kitchen knife, or a telephone.</p>

<p>Let us start with the simplest possible description: artificial intelligence is software that learns patterns from large amounts of data and uses those patterns to make predictions or generate outputs. That is it. That is the whole thing. Everything else is a variation on that core idea.</p>

<h3>Pattern Recognition, Not Thinking</h3>

<p>The most important thing to understand about AI is that it does not think. It does not understand. It recognizes patterns, and it applies those patterns to new situations. This distinction matters more than almost anything else in this book, because the most dangerous thing about AI is that it can seem like it is thinking when it is not.</p>

<p>Here is a concrete example. Imagine you wanted to teach a child to recognize dogs. You might show them ten thousand pictures of dogs and say "dog" each time, then show them ten thousand pictures of other animals and say "not a dog." After enough repetitions, the child starts to get it right. They are learning patterns: four legs, fur, certain face shapes, certain ear shapes, certain body proportions. An AI image-recognition system does exactly this, but it does it with millions of images instead of thousands, and it processes them in seconds instead of years.</p>

<p>Now here is the key: that AI system does not know what a dog is. It has no concept of a dog as a living creature, an animal, a companion, a species with a history and biology. It has a statistical model of pixel patterns associated with the label "dog." When it sees a new image, it compares the pixel patterns to its model and outputs a probability score. If the score is high enough, it says "dog." If you show it a picture of a dog that looks very different from anything in its training data — perhaps a very unusual breed photographed in unusual lighting — it may say "not a dog." The AI is not wrong because it is stupid. It is wrong because it is doing pattern matching, not understanding.</p>

<p>This matters because it explains why AI can be simultaneously impressive and deeply unreliable. It can be right 99% of the time in situations that are similar to its training data. And it can be confidently, completely wrong in situations that are slightly different. That combination — high confidence combined with potential for confident errors — is one of the most important things to remember about AI throughout this book.</p>

<h3>Machine Learning vs. Rule-Based Systems</h3>

<p>Before the current era of AI, most computer software was what we call rule-based. A programmer would write a list of rules: if the customer has been with us for more than two years, offer them a discount; if the account balance is below fifty dollars, send a warning; if the email contains the word "unsubscribe," process it as an opt-out request. Rule-based systems are predictable because the rules are visible and specific. You can audit them. You can understand exactly why the system made any given decision.</p>

<p>Machine learning systems are fundamentally different. Instead of being programmed with explicit rules, they are trained on data. You give the system thousands or millions of examples, and it builds its own internal model of what the right answer looks like. The rules it develops are not written down anywhere in plain language. They exist as billions of numerical weights in a mathematical structure called a neural network. No human being can read those weights and understand exactly why the system does what it does. Even the engineers who built the system often cannot fully explain a specific decision it makes.</p>

<p>This is not a minor technical detail. It has real implications for how AI can be used, and misused. A rule-based spam filter can be audited: you can see exactly which words or patterns it flags. A machine-learning spam filter is more effective, but its decision-making is partly opaque. The same goes for AI systems that decide whether to show you a particular news article, whether your loan application should be approved, or whether you should receive a particular advertisement. These systems are making decisions that affect your life, and their reasoning is not always fully transparent even to the people who built them.</p>

<h3>Why AI Can Seem Convincing</h3>

<p>Here is something that surprises many people when they first encounter modern AI: it is extremely good at producing outputs that seem human. Text generated by AI reads smoothly. Images generated by AI look realistic. Voice generated by AI sounds like real speech, and in some cases like a specific real person. This is not because AI has become human. It is because AI has been trained on enormous amounts of human-generated content and has become very good at producing outputs that statistically resemble that content.</p>

<p>Think about what "a convincing email" looks like. It has proper grammar. It uses appropriate vocabulary. It references things that are relevant to the recipient. It has a plausible structure: a greeting, a reason for writing, a request, a closing. A machine-learning system trained on millions of emails can produce text that hits all of these marks reliably, without any human writer involved. The email can mention your bank by name, your city, even details pulled from your public social media profiles. To a reader who is not specifically looking for signs of AI generation, it can appear completely legitimate.</p>

<p>This convincingness is what makes AI a powerful tool in the wrong hands. Scammers who previously had to personally write and send each fraudulent email can now generate thousands of highly personalized, grammatically perfect fraudulent emails in minutes. Voice actors who previously had to record audio to fake a specific person's voice can now use AI to clone that voice from as little as a few seconds of audio. These capabilities did not exist even five years ago. They exist now, they are improving rapidly, and they are already being used against Ohio families.</p>

<h3>How AI Gets Things Wrong — Confidently</h3>

<p>We mentioned earlier that AI can be confidently wrong. This is worth examining more carefully because it affects how you should think about AI-generated information in general, not just in scam contexts.</p>

<p>When a human expert is uncertain about something, they usually signal that uncertainty. They say "I think" or "I believe" or "you might want to check this." They hedge. AI systems, particularly the large language models that power tools like ChatGPT, do not always hedge appropriately. They produce text with the same confident, smooth tone whether they are describing something they have seen millions of examples of or something they are essentially guessing about. This tendency to produce confident-sounding errors is known in the AI field as "hallucination," though that word can make it sound more mysterious than it is. It is simply the system generating plausible-sounding text that happens to be incorrect.</p>

<p>For families, this has two practical implications. First, do not assume that AI-generated information is accurate just because it sounds confident and reads well. If your child uses an AI tool to help with a school report, or if you use an AI assistant to get information about a medical question, you need to verify important claims through reliable sources. Second, when you encounter a voice call or a text message or an email that sounds very convincing, the convincingness itself is no longer a reliable signal of authenticity. A scammer using AI tools can produce something that sounds completely legitimate. Conviction is not the same as correctness, and polish is not the same as truth.</p>

<h3>The Ohio Factory Floor: An Analogy That Helps</h3>

<p>The Dayton area has a long history in manufacturing. For generations, factories throughout the Miami Valley built everything from automobile parts to defense systems. In recent years, many of these facilities have adopted AI-powered quality control systems. Cameras monitor the production line. AI software analyzes each component as it comes off the line, comparing it against patterns learned from thousands of good parts and thousands of defective parts. When the AI spots an anomaly, it flags the part for human review or automatically removes it from the line.</p>

<p>This is a useful analogy for how AI works more generally. The quality control AI does not understand what the part is for. It does not know that the widget it is inspecting will eventually end up in a car that carries a family down Interstate 75. It simply compares patterns. It is very good at this, fast, and consistent in ways that human inspectors cannot always match. But it can also be fooled by a defective part that happens to look like a good one in certain lighting, or by a good part that is slightly different in appearance due to a legitimate design change that happened after the AI was trained.</p>

<p>The engineers at these facilities know this. They do not trust the AI blindly. They understand its capabilities and its limitations. They use it as a powerful tool while maintaining human oversight for anything important. That is exactly the mindset this book wants to give you: not distrust of AI, not fear of AI, but clear-eyed understanding of what it can do, what it cannot do, and where you need to apply your own judgment.</p>

<h3>AI That Helps You vs. AI That Can Be Used Against You</h3>

<p>It is important to say clearly that AI is not inherently dangerous. The same technology that powers voice-cloning scams also powers the voice assistants that help elderly individuals with limited mobility control their homes. The same pattern-recognition technology that enables deepfake video also enables cancer-detection algorithms that identify tumors in medical imaging with remarkable accuracy. The same text-generation technology that produces phishing emails also helps students with learning disabilities write more fluently, and helps non-native speakers communicate more effectively.</p>

<p>The technology itself is neutral. What matters is who is using it, for what purpose, and what safeguards are in place. Throughout this book, we will be focusing on the ways AI is being used against families — because that is where the practical danger lies for people reading this guide right now. But we do not want to leave you with the impression that AI is simply an enemy to be feared. It is a tool. Like all powerful tools, it can build things or break things depending on whose hands it is in.</p>

<p>Your job, as a family member in 2026, is to understand enough about how the tool works that you can recognize when it is being used against you. You do not need to become an AI engineer. You do not need to understand the mathematics of neural networks. You need to understand the patterns of how AI-powered threats present themselves, and what you can do in response. That is what the rest of this book provides.</p>

<h3>Three Things Your Family Can Do This Week</h3>

<ul>
  <li><strong>Have one dinner-table conversation about AI.</strong> Ask each family member: "What do you think AI is? What have you seen it do?" You may be surprised by the range of answers. Children often have more hands-on experience with AI tools than parents or grandparents. Grandparents often have sharper skepticism than grandchildren. Share what you have learned from this chapter.</li>
  <li><strong>Try an AI tool together.</strong> Go to a free AI assistant (many are available on the web) and ask it a question you already know the answer to. Notice how it responds. Notice how confident it sounds. Then check whether its answer is completely accurate. This exercise — asking something verifiable and checking the result — will calibrate your sense of what AI can and cannot do.</li>
  <li><strong>Name your family's "AI skeptic."</strong> Every family benefits from having someone whose informal role is to raise an eyebrow at things that seem too convenient, too urgent, or too perfectly targeted. This does not need to be a formal job. It just means agreeing, as a family, that when something surprising and stressful arrives electronically, someone's job is to slow everyone down and ask: could this be AI-generated? Could this be fake? We will spend the rest of this book giving that person the tools to answer those questions well.</li>
</ul>

<p>In the next chapter, we move from the abstract to the very concrete: the phone call that is not who you think it is. If you have elderly parents who use the phone frequently, or children whose voices have already appeared in videos online, the next chapter is essential reading.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "Voice Cloning: When the Phone Call Isn't Who You Think",
    page_start: 17,
    page_end: 30,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: Voice Cloning: When the Phone Call Isn't Who You Think</h2>

<p>Of all the AI-powered threats that families face today, voice cloning is perhaps the most psychologically powerful. It attacks something that human beings have relied on for trust and connection since before recorded history: the sound of a familiar voice. When you hear someone you love — the timbre, the rhythm, the particular way they breathe before they speak — your brain registers recognition at a deep, nearly automatic level. Voice cloning can exploit that recognition. And it can do so with unsettling accuracy.</p>

<p>This chapter will explain how voice cloning technology works, what scammers do with it, how families in Ohio are being targeted right now, and — most importantly — what your family can do to protect itself. The goal is not to make you afraid of the telephone. The goal is to make you dangerous to the people who would misuse it against you.</p>

<h3>How Voice Cloning Actually Works</h3>

<p>Voice cloning is a form of machine learning, specifically trained on audio data. To create a voice clone, a system needs recordings of a specific person's voice. Using a technique called text-to-speech synthesis trained on that audio, the system learns the acoustic characteristics that make that voice unique: the precise frequencies, the cadence, the way the person emphasizes certain words, the quality of their consonants and vowels. Once that model is built, the system can generate new speech in that voice — reading any text that is provided to it — without the original person saying a word.</p>

<p>How much audio does it take? This is where the technology has become genuinely alarming. Early voice cloning systems required hours of clear, high-quality audio. Professional systems used for legitimate purposes — audiobook narration, post-production film editing — still work best with long, clean recordings. But modern AI voice cloning tools, including some that are freely available online, can produce a recognizable approximation of a person's voice from as little as three to five seconds of audio. Some systems claim to work from even shorter samples.</p>

<p>Where does that audio come from? It is all around us. If your grandchild has appeared in a birthday video posted on Facebook, a holiday video on Instagram, a school performance clip on YouTube, or even a brief video in a family group chat, their voice is captured. If your adult child has done a podcast interview, a public video call recording, or appeared in a news segment, their voice is out there. Scammers do not need to break into anything to get it. They just need to find a recording that is publicly available — or, in some cases, a recording that someone in the family accidentally shared more broadly than they intended.</p>

<h3>The Grandparent Scam, Upgraded</h3>

<p>The grandparent scam has existed for years. In its original form, a fraudster would call an elderly person pretending to be a grandchild — usually claiming to be in trouble, needing bail money or emergency cash, and asking the grandparent not to tell Mom and Dad because of the embarrassment. Many grandparents, acting out of love and urgency, would send money before verifying anything.</p>

<p>This scam worked even when the caller sounded nothing like the actual grandchild, because the fraudster could exploit the emotional state of the grandparent — the panic of hearing "it's me, it's Kevin, please don't tell anyone" — to overwhelm critical thinking. When a loved one seems to be in distress, the brain prioritizes responding to the distress over analyzing whether the distress is real. Scammers have always known this.</p>

<p>Now imagine that same scam, except the voice on the phone actually sounds like Kevin. The same pitch, the same slight Midwestern accent, the same nervous way he talks when he is upset. The same pause before he says "Grandma." For a grandparent who loves Kevin and has heard his voice thousands of times, this is not just convincing. It is nearly indistinguishable from the real thing.</p>

<p>This is not hypothetical. Families across the country, including Ohio families, have reported exactly these calls. The Federal Trade Commission documented a significant rise in AI voice-cloning-enabled fraud beginning in 2023, and the tactic has continued to grow. The FBI's Internet Crime Complaint Center has received thousands of reports, and law enforcement agencies in Ohio have issued public warnings about the technique.</p>

<h3>A Story from Cincinnati: The Call About Kevin</h3>

<p>Margaret is seventy-three years old and lives alone in a comfortable home in Cincinnati's Delhi Township, not far from where she and her late husband raised their family. Her grandson Kevin is twenty-six and lives in Columbus, where he works in software development. Margaret and Kevin talk on the phone every Sunday evening. She knows his voice as well as she knows her own.</p>

<p>On a Wednesday afternoon in late winter, Margaret's phone rings. The number shows an out-of-area area code, which is not unusual — Kevin's office has called her from different numbers before. She answers.</p>

<p>"Grandma?" The voice is Kevin's. There is no question. It is his voice, nervous and a little strained, the way it sounds when he has bad news. "Grandma, I'm in trouble. I need you to not panic, okay?"</p>

<p>Margaret's heart immediately begins racing. "Kevin? What happened? Are you okay?"</p>

<p>"I got into an accident. On I-75 near Dayton. I'm okay, I'm not hurt, but the other driver is saying I was at fault and the police are here and they're saying I need to post bail — I know this sounds crazy, I'm so embarrassed, please don't tell Mom yet. I just need — Grandma, I need three thousand dollars. I can pay you back by Friday."</p>

<p>Everything about the call feels real. The voice is real. The fear in the voice is real. The geography makes sense — Kevin drives through Dayton when he visits family. The request not to tell his mother matches Kevin's personality; he hates worrying her. And then a second voice comes on the line, a man who identifies himself as a police officer, who explains that Kevin is being held at the Montgomery County Justice Center and that bail can be posted via wire transfer or gift cards.</p>

<p>Margaret is standing in her kitchen, her hand shaking slightly. She wants to call Kevin's mother immediately but Kevin asked her not to. She wants to call Kevin's cell phone but the "officer" says Kevin's phone was damaged in the accident and he cannot receive calls. Everything is designed to prevent her from doing the one thing that would save her: making a verification call.</p>

<p>Margaret, fortunately, had read about this scam in a newsletter from her local senior center. She paused. She said, "I need to call you back." The caller protested that there was no time. She said, very firmly, "I will call you back." She hung up.</p>

<p>She immediately called Kevin's cell phone. Kevin picked up on the second ring. He was at his desk in Columbus. He had not been in any accident. He was fine. The voice that had sounded exactly like him was a clone.</p>

<h3>The Psychology of the Moment</h3>

<p>Let us look at what that phone call was designed to do, because understanding the design helps you resist it.</p>

<p>The caller established immediate emotional stakes: someone you love is in danger. This activates the brain's threat-response system, which is not designed for careful analysis. It is designed for fast action. Scammers exploit this deliberately.</p>

<p>The caller created urgency: there is a deadline, bail must be posted now. Urgency prevents deliberate thinking. Every moment you spend verifying is a moment the scammer loses control of the situation.</p>

<p>The caller created secrecy: do not tell anyone else. This cuts you off from the most powerful protection you have — other people in your family who might help you think clearly.</p>

<p>The caller removed verification pathways: the "damaged phone" story preemptively closes the most obvious escape route, which is calling the person directly.</p>

<p>And underneath all of it, the caller deployed a voice that was designed to bypass your critical thinking by triggering your love and recognition. Your brain wanted the call to be real because the alternative — that your grandson is actually fine but you thought for ten minutes he was in jail — is uncomfortable but easy to recover from. Your brain did not want to be the person who hesitated when Kevin needed help.</p>

<p>Understanding this psychology does not mean you are foolish for feeling it. It means the scammers are sophisticated. And it gives you something to work with: a counter-script, a protocol, a plan that you have already agreed to before the panic arrives.</p>

<h3>The Family Code Word</h3>

<p>The most effective single defense against voice cloning scams is a family code word. This is a word or short phrase that only family members know — not posted anywhere online, not used in any other context — that any family member can use to verify their identity in an emergency call.</p>

<p>Here is how it works. Your family agrees on a code word. Let us say it is "bluebell." If Margaret had a code word with Kevin, the moment she suspected anything, she could say: "Kevin, what is our family word?" If the caller is really Kevin, he says "bluebell" and the call continues. If the caller is an AI clone — which does not know the word — they cannot produce it, and the scam collapses.</p>

<p>Some families worry that a clever scammer could say "I forgot the word, I'm panicking." This is a valid concern. The protocol should be: if the family word cannot be produced, treat the call as unverified and hang up. Real Kevin can call back on his own phone or have someone else verify. A few minutes of inconvenience for real Kevin is worth preventing thousands of dollars in losses.</p>

<p>The code word needs to be:</p>
<ul>
  <li>Something that would not appear in any social media post, profile, or public communication</li>
  <li>Something specific enough that it cannot be guessed easily</li>
  <li>Something that every relevant family member has memorized, not just written down</li>
  <li>Changed immediately if you have any reason to believe it has been compromised</li>
</ul>

<h3>Verification Protocols: A Practical System</h3>

<p>Beyond the code word, every family should have a clear, pre-agreed protocol for handling distress calls that involve money. The key principles are:</p>

<p><strong>Always call back on a number you already know.</strong> If someone calls claiming to be a family member in trouble, hang up and call that family member's known phone number directly. If they truly are in trouble, they or someone near them will be reachable. If they are not reachable, call another family member. The caller's claim that phones are unavailable or damaged is almost always part of the scam.</p>

<p><strong>Never send money before verification.</strong> No emergency is so time-sensitive that it cannot survive a ten-minute pause to verify identity. Real legal emergencies involve real lawyers, real police, and real processes that have built-in delays. Legitimate bail bondsmen and law enforcement agencies do not demand payment in the next fifteen minutes. The urgency is manufactured.</p>

<p><strong>Gift cards are never a legitimate payment method for legal emergencies.</strong> This bears repeating: no court, no bail bondsman, no legitimate emergency service accepts gift cards as payment. Ever. If anyone on the phone is asking you to buy gift cards and read the numbers off, you are being scammed. Full stop.</p>

<p><strong>Designate a verification partner.</strong> Every family member who might receive an emergency call — especially elderly parents who live alone — should have one specific person they can call immediately when something seems off. This person does not need to be local. They just need to be reachable, calm, and trusted. When in doubt, call the verification partner before doing anything else.</p>

<h3>Teaching Kids About This Too</h3>

<p>Children and teenagers need to understand that their voices online can be used against their grandparents. This is not a reason to ban children from appearing in videos. It is a reason to explain to them, in age-appropriate terms, that scammers can copy voices from recordings and that this makes the family code word important. Children who understand why the code word exists are more likely to take it seriously, remember it, and remind grandparents to use it.</p>

<p>Have this conversation at the dinner table. Explain what voice cloning is. You can even demonstrate it safely using publicly available AI voice tools to show how a voice can sound different from what it actually is. Seeing — or hearing — is believing. A child who has heard a demonstration of voice cloning understands intuitively why the family code word matters.</p>

<h3>If You Think You Were Targeted</h3>

<p>If you receive what appears to be a voice-cloning scam call, the steps are straightforward. First, do not send any money. Second, hang up. Third, call the family member whose voice was used, on their real number. Fourth, report the call to the FTC at reportfraud.ftc.gov and to the Ohio Attorney General's office at ohioattorneygeneral.gov/consumers. Fifth, talk to your family about updating or creating a family code word.</p>

<p>If you did send money before realizing it was a scam, contact your bank or wire service immediately. Act within the first hour if possible — financial institutions can sometimes reverse wire transfers if caught quickly enough. Then file a report with local police, the FTC, and the FBI's IC3 at ic3.gov. You are not alone in this. Thousands of families have been targeted and many have recovered fully, especially when they acted quickly.</p>

<p>The voice on the phone sounded like Kevin. But Kevin is fine. And because Margaret paused, she still has her savings, her peace of mind, and a story she now tells every person she knows. Knowledge, passed on, is its own kind of protection.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Deepfakes: When Seeing Is No Longer Believing",
    page_start: 31,
    page_end: 44,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Deepfakes: When Seeing Is No Longer Believing</h2>

<p>For most of human history, seeing something with your own eyes was close to the gold standard of evidence. Photographs could be faked, but it was difficult. Video was even harder to manipulate. When you saw footage of an event, you could be reasonably confident that the event had occurred, at least approximately as depicted. That era is over. The technology to create convincing fake video — what we call deepfakes — has become accessible enough that it is no longer restricted to sophisticated state actors or major film studios. Anyone with a laptop, a decent internet connection, and a few hours can now create video and images that are difficult or impossible to distinguish from real footage without specialized tools.</p>

<p>This chapter explains what deepfakes are, how they are made, how they are being used against families right now, and how to build the visual and informational skepticism that protects your family in a world where you can no longer assume a video is real just because it looks real.</p>

<h3>What Is a Deepfake?</h3>

<p>The term "deepfake" comes from "deep learning" combined with "fake." It refers to synthetic media — images, video, or audio — that has been generated or manipulated using deep learning AI systems to convincingly depict events or people in ways that did not actually occur.</p>

<p>There are several distinct types of deepfake technology, each with different implications:</p>

<p><strong>Face-swapping video</strong> takes a person's face from one video and maps it onto another person's body in a different video. The AI learns the contours, expressions, and lighting of the source face and applies them in real time to the target video. The result is a video that appears to show one person doing or saying what was actually done or said by someone else.</p>

<p><strong>Lip-sync manipulation</strong> takes existing footage of a real person and alters just the lip and mouth movements to match a different audio track. This allows the creation of a video that appears to show a real person saying words they never said, using their own real appearance and mannerisms, with only the lip movements altered. It is subtler than full face-swapping and can be harder to detect.</p>

<p><strong>Full face and body generation</strong> creates entirely synthetic people who do not exist at all. Websites that generate fake profile photos use this technology. The people in the photos look completely real because they are trained on real faces, but they are entirely AI-generated composites. No such person exists.</p>

<p><strong>Still image manipulation</strong> alters photographs to add or remove elements, change contexts, or create scenes that never occurred. A photo of a real person in one setting can be altered to place them in a different setting, or with different people, or doing something they were not actually doing.</p>

<h3>How Children's Photos Can Be Misused</h3>

<p>Many Ohio parents share photos and videos of their children freely on social media. Birthday party photos, school performance videos, sports team pictures, vacation snapshots — these are expressions of parental joy and family connection, and there is nothing inherently wrong with sharing them. But every image shared publicly is potentially accessible to anyone, including people who might misuse AI tools to manipulate those images.</p>

<p>We want to be careful here not to create unnecessary fear. The vast majority of children's photos shared online are never misused. But parents should be aware of two specific risks. First, AI-generated inappropriate content involving minors is an increasing concern for law enforcement. Second, altered images of children can be used for other forms of harassment, including cyberbullying where a child's face is inserted into embarrassing or humiliating fake scenarios.</p>

<p>The practical response is not to delete all your family photos from the internet, though some families do choose to keep their children's images completely private. The practical response is to be intentional about what you share and where, to use privacy settings that limit your audience to people you actually know, and to have age-appropriate conversations with your children about the permanence of images online and the fact that AI tools can alter images in ways that were not previously possible.</p>

<h3>Romantic Deepfake Fraud and Elderly Targets</h3>

<p>Romance fraud targeting elderly individuals has existed for years, traditionally involving a fraudster who creates a fake identity and builds an emotional relationship over time, eventually asking for money. AI deepfake technology has supercharged this threat in a disturbing way.</p>

<p>Scammers now use AI-generated face images and AI-generated video to create fake personas that can hold video calls. An elderly person who insists on seeing their "online love interest" via video chat before sending money might, in the past, have been protected by that requirement. Today, a scammer with AI tools can appear on a video call as a completely synthetic person who looks real. They can maintain a fake identity across multiple calls, with a consistent appearance and mannerisms.</p>

<p>The emotional devastation when these frauds are discovered is significant. Victims often lose both substantial money and the belief that a relationship they treasured was real. The isolation that many elderly individuals experience can make the prospect of a caring, attentive romantic partner feel deeply compelling — which is exactly what scammers exploit.</p>

<p>Protecting elderly family members from this threat requires open, non-judgmental conversations. The message should never be "online relationships are dangerous and you should not have them." The message should be: "It is okay to want connection. And we can help you verify that the person you are connecting with is real, because we care about you." We will explore this more in Chapter 7.</p>

<h3>Political Deepfakes and Ohio</h3>

<p>Ohio is a perennial battleground state. Statewide and national elections here receive enormous attention, and Ohio voters are frequently targeted with political messaging — both legitimate and illegitimate. Deepfake technology has entered political discourse in a way that should concern every Ohio voter regardless of political affiliation.</p>

<p>Consider a fictional but entirely plausible scenario. A video appears on Facebook showing a Columbus city councilmember making a statement that seems shocking — perhaps appearing to endorse something deeply controversial or to say something embarrassing. The video is shared rapidly within local political Facebook groups, picked up by social media accounts, and begins generating passionate responses. Some people share it in outrage. Some share it in support. Within twenty-four hours, tens of thousands of people have seen it.</p>

<p>Then investigators look more carefully and realize: the video is a deepfake. The councilmember's face has been inserted into different footage. The words were never spoken. But by the time the debunking reaches most of the people who saw the original, the damage is done. Impressions have been formed. Votes may be influenced. The fake has already done its work.</p>

<p>This is not hypothetical. Variations on this scenario have occurred in jurisdictions across the United States. Ohio's close elections make it a particularly attractive target for political manipulation, including manipulation using AI-generated content. Being skeptical of surprising political videos — especially ones that appear during campaign season, especially ones that show a politician saying something dramatically out of character — is a civic responsibility in 2026, not a form of political cynicism.</p>

<h3>The SIFT Method: Your Personal Verification System</h3>

<p>The most practical tool we can give you for navigating a world where images and video may not be authentic is a method called SIFT. It was originally developed by media literacy educators and is now widely used by fact-checkers and journalists. Here is how it works:</p>

<p><strong>S — Stop.</strong> Before you share, react, or believe something surprising or emotionally provocative, pause. The urgency you feel to share immediately is often manufactured by the content itself. Take a breath. Give yourself thirty seconds. Nothing legitimate and important will be lost in thirty seconds of reflection.</p>

<p><strong>I — Investigate the source.</strong> Where did this video or image come from? Not the person who shared it with you — where did they get it? Who originally posted it? Is the original source a reputable news organization, an official account of the person depicted, or an anonymous account with three followers and a creation date from last week? The origin of a piece of content tells you an enormous amount about its reliability.</p>

<p><strong>F — Find better coverage.</strong> If a video shows something genuinely significant — a politician saying something dramatic, a shocking event occurring somewhere — that event should be covered by multiple independent news sources. If you can only find the claim on one social media account and nowhere else, that is a significant red flag. Legitimate major events have multiple witnesses and multiple reports.</p>

<p><strong>T — Trace the original.</strong> Try to find the original context for the image or video. Reverse image search (available on Google Images and other search engines) can tell you where an image first appeared and how it has been used in different contexts. This often reveals that an image claimed to show one thing was originally a completely unrelated photograph.</p>

<h3>Technical Signs of Deepfakes</h3>

<p>While AI-generated video is improving rapidly, there are still technical artifacts that can signal manipulation, especially in lower-quality deepfakes. Look for:</p>

<ul>
  <li>Unnatural blinking or lack of blinking — early deepfake systems struggled with eyes</li>
  <li>Mismatched lighting between the face and the background</li>
  <li>Blurring or distortion around the hairline and ear edges, where face-swapping seams can appear</li>
  <li>Inconsistent skin texture or color between different parts of the face</li>
  <li>Teeth that look oddly shaped, extra white, or slightly blurred</li>
  <li>Ear jewelry, glasses, or facial hair that behaves strangely at the edges</li>
  <li>The person's face seeming slightly "floaty" or disconnected from their neck and shoulders</li>
</ul>

<p>These artifacts are becoming less common as the technology improves, so their absence does not prove authenticity. But their presence is a strong signal that something has been manipulated.</p>

<h3>Tools for Verification</h3>

<p>Several free online tools can help verify the authenticity of images and video. Google's reverse image search allows you to upload an image or paste a URL and see where else that image appears online. TinEye is another reverse image search engine that is particularly good at finding earlier versions of altered images. For video, websites like InVid and WeVerify provide tools specifically designed for journalist-level video verification, including tools that extract individual frames for reverse image search.</p>

<p>These tools are not foolproof. A high-quality deepfake specifically designed to fool verification tools can be very difficult to detect even with them. But they catch a large percentage of the lower-effort fake content that spreads most widely on social media, which is also the content most likely to reach your family.</p>

<h3>A Family Practice for Information Hygiene</h3>

<p>The most powerful protection against deepfakes is not a technology tool. It is a family practice of healthy skepticism combined with a commitment to verify before you share. Here are some conversation-starting questions you can ask at the dinner table:</p>

<ul>
  <li>"Did you see that video going around about [topic]? Does anyone know if it is real?"</li>
  <li>"Where did this come from? Have you seen it reported anywhere reliable?"</li>
  <li>"This seems surprising. Let us look it up before we share it."</li>
</ul>

<p>These conversations, normalized as a family practice, build the kind of media literacy that no software filter can provide. Children who grow up in families that ask these questions develop habits of mind that serve them throughout their lives. And elderly family members who hear these questions asked regularly become more comfortable raising their own doubts, rather than feeling embarrassed to admit uncertainty.</p>

<p>The world has changed. Seeing is no longer automatically believing. But Ohio families who understand that change — and who have simple tools and habits for navigating it — are far less vulnerable than those who do not.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "AI-Powered Phishing: Why the Scam Emails Look Real Now",
    page_start: 45,
    page_end: 57,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: AI-Powered Phishing: Why the Scam Emails Look Real Now</h2>

<p>Most people who have been using email for more than a decade remember what phishing emails used to look like. They had obvious red flags: subject lines full of misspellings, frantic claims about urgent account problems, messages that started with "Dear Valued Customer" and went on to describe improbable situations in awkward grammar. The Nigerian prince emails of the early internet era were so obviously fraudulent that they became a cultural joke. The very absurdity of the premise was, in retrospect, part of the design — scammers were filtering for people who would not catch the obvious errors, targeting the most credulous rather than wasting time on skeptics.</p>

<p>That era is over. AI-powered phishing has produced something qualitatively different: personalized, grammatically perfect, contextually accurate fraudulent messages that can fool people who are smart, educated, and experienced with technology. Understanding how this happened — and what it means for your family — is essential for anyone who uses email, text messages, or social media platforms in 2026.</p>

<h3>How AI Makes Phishing Personal</h3>

<p>The key difference between old-style phishing and AI-powered phishing is personalization. Traditional phishing was a mass-broadcast operation: send the same suspicious email to a million addresses and hope a small percentage of recipients are banking with the institution you are impersonating and confused enough to click. AI-powered phishing works differently. It starts with reconnaissance.</p>

<p>Before a sophisticated phishing message reaches you, automated systems may have already gathered substantial information about you from publicly available sources. Your LinkedIn profile shows where you work, your job title, your employment history, and likely the names of some of your colleagues. Your Facebook profile may show where you bank, what neighborhood you live in, what causes you support, and where your children go to school. Your participation in online forums, your public comments, your tagged photos — all of this information is accessible to anyone who looks for it, and AI systems can aggregate it automatically.</p>

<p>Armed with this profile, an AI system can generate an email that mentions your real employer, references a plausible situation at that employer, uses your name correctly, mimics the formatting and tone of legitimate emails from institutions you actually use, and presents a scenario that is tailored to your specific situation. This is called "spear phishing" — targeted phishing aimed at a specific individual rather than a mass audience. What has changed is that AI has made spear phishing scalable. What used to require a human researcher spending hours on each target can now be done automatically for thousands of targets simultaneously.</p>

<h3>Ohio Banks in the Crosshairs</h3>

<p>Ohio has a distinctive banking landscape. Fifth Third Bank, headquartered in Cincinnati, has extensive presence throughout the state. Huntington Bancshares, headquartered in Columbus, is one of the largest regional banks in the Midwest. KeyBank has a major Ohio presence. First Federal Savings and Loan and dozens of local credit unions — the Dayton area has Ohio Credit Union League members with loyal, long-standing customer bases — round out the picture.</p>

<p>Scammers know this geography. AI-powered phishing campaigns targeting Ohio residents often specifically impersonate Fifth Third Bank or Huntington, because these are the institutions most likely to have a relationship with a random Ohio resident. An email that says "Your Fifth Third account requires immediate verification" will hit a real Fifth Third customer far more often in Ohio than it would in, say, Texas. And a phishing email that references your real account type, your real branch location, or a recent real transaction (derived from data purchased from data brokers or leaked from a previous breach) can be nearly indistinguishable from legitimate bank communication.</p>

<p>Here is an example of what a high-quality AI-generated phishing email might look like, and why it is more dangerous than the old kind:</p>

<p><em>Subject: Important update required for your Fifth Third Advantage Checking account</em></p>

<p><em>Dear [Your Name], We recently detected unusual activity on your account ending in 4827. As part of our commitment to protecting your financial security, we require you to verify your identity within 24 hours to maintain uninterrupted access. This activity was detected from an IP address in [Your State], which is consistent with your usage pattern but triggered our fraud detection system due to an unexpected transaction amount. Please verify your information by clicking the button below. If you do not verify within 24 hours, your account will be temporarily suspended as a precautionary measure. We apologize for any inconvenience.</em></p>

<p>Notice what is sophisticated about this. It uses a real bank name. It references a plausible account type. It includes a partial account number (which could be from a real breach or simply guessed). It provides a plausible explanation for why a normal-seeming transaction triggered a flag. It creates urgency without being hysterical about it. The grammar is perfect. The tone is institutional and professional. And it has a clear call to action — click this button — that leads to a fake website designed to capture your banking credentials.</p>

<h3>How to Inspect an Email Before You Click Anything</h3>

<p>The good news is that even the most sophisticated phishing email has to make the target do something — usually click a link or download an attachment — to be effective. The link or attachment is where the scam lives. And links can be inspected without clicking them.</p>

<p><strong>Hover before you click.</strong> On a computer, if you move your mouse pointer over a link without clicking, most email clients will show you the actual web address that the link leads to, usually at the bottom of your screen. Compare that address carefully to the legitimate website of the organization the email claims to represent. A legitimate Fifth Third email will have a link that goes to a web address ending in 53.com or fifththird.com. A phishing email might go to fifththird-security.com, or 53-verification.net, or some other variation that looks similar but is controlled by scammers.</p>

<p><strong>Check the sender's actual email address.</strong> The display name in your email client might say "Fifth Third Bank Security Team" but the actual sending address is fiftthird@gmail-banking.info. Always look at the full email address, not just the display name. Legitimate institutional emails come from their own domains.</p>

<p><strong>Go directly rather than clicking.</strong> If you receive an email about your bank account, do not click any link in the email. Open a new browser tab, type your bank's address directly, and log in through the real website. If there is a genuine issue with your account, it will be visible there. This takes thirty extra seconds and completely neutralizes the risk of a phishing link.</p>

<p><strong>Call using the number on the back of your card.</strong> For anything involving your bank account, credit card, or financial accounts, the number on the back of your physical card or statement is the safest way to reach the real institution. Do not call any number provided in a suspicious email.</p>

<h3>Urgency Plus Authority: The Formula to Recognize</h3>

<p>AI-powered phishing messages, like all effective scams, rely on a combination of urgency and authority. Urgency creates pressure to act before thinking clearly. Authority — impersonating a trusted institution — makes the action feel justified and safe.</p>

<p>When you notice both elements in a message — "you must act within 24 hours" plus "this is your bank/the IRS/Social Security Administration" — treat that combination as a red flag, not as a reason to comply. Legitimate institutions do not operate this way. Your real bank will not suspend your account without multiple prior notices and opportunities to resolve the issue. The real IRS does not demand immediate payment via phone or email. Social Security does not threaten to suspend your benefits in a text message.</p>

<p>In fact, you can use the presence of this urgency-authority combination as a quick mental test. The more urgent an email or message insists it is, and the more it claims to come from an authoritative source, the more carefully you should scrutinize it before taking any action.</p>

<h3>Phishing That Targets Children at School</h3>

<p>Older children and teenagers face their own phishing risks, often through school-related channels. School districts use email systems, Google Classroom, Microsoft Teams, or similar platforms, and scammers who target children may impersonate these school systems or the platforms themselves.</p>

<p>Common school-targeted phishing includes fake notifications about a suspended school account, fake communications about a school club or activity, fake prize notifications claiming a student has won something through a school-related contest, and fake job offers for teenagers claiming to be from a local business the student has expressed interest in.</p>

<p>Children are often less experienced at recognizing the warning signs of phishing and more likely to click first and think later, especially on a phone where previewing links is more difficult. Building the habit of verifying suspicious messages with a trusted adult before clicking — not because children are stupid, but because the scams are sophisticated — is one of the most valuable digital literacy lessons a family can instill.</p>

<h3>A Family Exercise: Spot the Fake</h3>

<p>One of the most effective ways to build phishing resistance in your family is to practice together. Here is a simple exercise that can be done in fifteen minutes around the kitchen table:</p>

<p>Find two emails — one real email from your bank or an institution you use, and one example phishing email (the FBI and FTC both publish examples of real phishing attempts on their websites). Print or show both. Then, as a family, look for:</p>

<ul>
  <li>The sender's actual email address</li>
  <li>Whether the link destination matches the claimed organization</li>
  <li>Any urgency language</li>
  <li>Any requests for personal information, passwords, or payment</li>
  <li>The overall tone: does it feel like legitimate institutional communication?</li>
</ul>

<p>Doing this exercise once builds awareness that would otherwise take years of experience to develop. And it opens a conversation that can continue: when a suspicious message arrives in the future, family members are more likely to bring it to the group rather than clicking alone.</p>

<h3>If You Clicked a Suspicious Link</h3>

<p>If you clicked a link before you realized it was suspicious, do not panic. Your immediate steps should be:</p>

<ul>
  <li>Do not enter any login credentials, passwords, or personal information on the page you landed on, even if it looks legitimate</li>
  <li>Close the browser tab immediately</li>
  <li>Run a malware scan on your device using security software</li>
  <li>Change the password for any account the email claimed to be from, using a different device if possible</li>
  <li>Enable two-factor authentication on important accounts if you have not already done so</li>
  <li>Monitor your accounts for unusual activity over the next several weeks</li>
  <li>Report the phishing attempt to the FTC at reportphishing.ftc.gov</li>
</ul>

<p>Most phishing attempts that are caught before credentials are entered do not result in account compromise. The immediate action that matters most is not entering information on the fake site. Everything after that is recovery and prevention.</p>

<p>The scam emails look real now. They look real because AI makes them look real. But the fundamental mechanics of what they are trying to get you to do have not changed. They still need you to click something, enter something, or call someone. And every moment you take to pause, inspect, and verify is a moment where you maintain control. That moment of pause is the most powerful tool you have.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "Social Media Manipulation: How AI Shapes What Your Family Sees",
    page_start: 58,
    page_end: 71,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: Social Media Manipulation: How AI Shapes What Your Family Sees</h2>

<p>Every time a family member opens Facebook, scrolls through TikTok, or checks Instagram, they are interacting with an AI system that is working very hard to decide what they see next. This is not a conspiracy theory. It is how these platforms work, and it is described, in varying levels of clarity, in their own public documentation. The AI systems that power social media recommendation engines are among the most sophisticated and extensively developed in the world, and they have been optimized, over years of experimentation, to maximize one thing: the time you spend on the platform.</p>

<p>That optimization goal — more time on platform — has produced effects that were not always anticipated or intended, but that have real consequences for families. This chapter explains how those recommendation algorithms work, what AI-generated fake profiles and bot networks are doing on social media right now, how these systems affect different members of your family differently, and what practical steps your family can take to maintain healthier relationships with social media in an age of AI manipulation.</p>

<h3>How Recommendation Algorithms Work</h3>

<p>When you first sign up for a social media platform, the system knows very little about you. It might know your age and zip code if you provided them, and it knows what you clicked on to get to the signup page. Very quickly, though, it begins to learn. Every post you pause on for more than a second, every video you watch to the end, every link you follow, every account you visit — all of this behavior is tracked and fed into a machine-learning model that is building a profile of what you find engaging.</p>

<p>Over time, this profile becomes highly detailed. The algorithm learns not just broad preferences but specific emotional states. It learns that you click on content about local politics more often on evenings when you have been scrolling for more than twenty minutes, or that outrage-triggering content makes you more likely to comment, which the algorithm registers as high engagement and responds to by showing you more outrage-triggering content. None of this is the result of any human decision-maker at the platform company. It is the emergent behavior of a machine-learning system that has been optimized to maximize engagement without specific instructions about what kind of engagement to produce.</p>

<p>The result, documented by researchers across multiple platforms and countries, is that recommendation algorithms tend to favor emotionally intense content. Content that makes you angry, afraid, outraged, or deeply entertained performs better by engagement metrics than content that is accurate, nuanced, or calming. This is not a flaw in the algorithm's execution. It is the correct result of optimizing for the wrong thing — engagement time, rather than wellbeing or accuracy.</p>

<h3>Echo Chambers and Their Costs</h3>

<p>A well-documented consequence of recommendation algorithms is the formation of echo chambers: information environments in which a person primarily encounters content that confirms their existing beliefs, from accounts and communities that share their worldview. Echo chambers are not created intentionally by the platforms. They emerge because showing people content they already agree with is a reliable way to maximize engagement — disagreement sometimes provokes engagement but also causes users to leave the platform.</p>

<p>Echo chambers have real costs for families. When different family members have been in different information environments for months or years, they may find themselves looking at the same news event and having completely different understandings of what happened, because they have been receiving completely different sets of facts, framings, and interpretations. This can make family conversations about current events feel frustrating and disconnected. It can erode trust within families when one member simply cannot understand how another family member could believe something that seems obviously wrong.</p>

<p>Understanding that this dynamic is, at least partly, a structural result of how recommendation algorithms work — rather than a personal failing of the family member who holds different views — can help. The algorithm has been showing your elderly parent one set of content for years. It has been showing your teenager another set. Their views have been shaped, in part, by systems designed to maximize their individual engagement, not by some unified pursuit of truth.</p>

<h3>Fake Profiles, Bot Networks, and Synthetic Engagement</h3>

<p>Social media platforms are full of accounts that are not human. This is not a secret — the platforms themselves publish estimates of the percentage of accounts they believe are fake or automated, and the numbers are substantial. What AI has done is make fake accounts dramatically more convincing and fake engagement dramatically more scalable.</p>

<p>An AI-generated fake profile can have a realistic-looking photo (using the face-generation technology described in Chapter 3), a detailed biography, a posting history that covers months or years, responses to comments that sound natural, and apparent connections to real people and communities. Building this kind of convincing fake persona used to take significant human effort. AI tools can now generate them in bulk.</p>

<p>Bot networks — coordinated groups of fake accounts — can be used to artificially inflate the apparent popularity of a piece of content. If a post receives ten thousand likes in an hour, it will be shown to more people by the recommendation algorithm, which interprets high engagement as a signal that the content is interesting. Scammers, foreign influence operations, political campaigns, and commercial interests all use fake engagement to make content appear more popular than it actually is, which causes the algorithm to amplify it further. This creates a feedback loop where artificial engagement begets real algorithmic amplification.</p>

<p>"Coordinated inauthentic behavior" is the term platforms use for this phenomenon. In plain language: it means a coordinated effort to fake the appearance of organic popularity in order to manipulate recommendation algorithms into amplifying content that would not spread on its own merits.</p>

<h3>How Elderly Parents Are Targeted Through Facebook Groups</h3>

<p>Facebook groups — communities organized around shared interests, local identity, or shared values — are a particular vulnerability for elderly users, who often use Facebook as their primary social media platform and who may rely heavily on local community groups for news and social connection. Scammers and misinformation operations have identified these groups as high-value targets.</p>

<p>Consider a fictional but representative scenario. A Facebook group called "Ohio Seniors Health News" is created with an appealing description and immediately populated with a mix of legitimate-seeming health content — articles about managing diabetes, advice on Medicare enrollment, information about senior exercise programs — and occasional posts promoting health misinformation, fraudulent supplements, or scam health services. The group grows because it appears to serve a real community need. Elderly members join it because it seems relevant to their lives. Real members begin to treat it as a trusted source, and they share its content, which reaches their networks, which adds to the group's apparent legitimacy.</p>

<p>This is not speculation. Variations on this pattern have been documented extensively in Ohio and across the country. Fake local news pages, fake community Facebook groups, and fake neighborhood alert groups have all been used to spread health misinformation, political manipulation, and outright scam advertisements to elderly users who believed they were getting trusted local information.</p>

<h3>How Teenagers Are Affected Differently</h3>

<p>Teenagers on TikTok and Instagram face a different but equally significant problem. The recommendation algorithms on these platforms are extraordinarily effective — TikTok's "For You Page" is considered one of the most powerful recommendation systems ever built for consumer engagement. It can identify and amplify content that resonates with a specific user's emotional state with remarkable speed.</p>

<p>For most teenagers, most of the time, this means a steady stream of content that is entertaining, culturally relevant, and socially connective. But for teenagers who are struggling — experiencing depression, anxiety, body image issues, social isolation, or other difficulties — the algorithm can identify the type of content they engage most intensely with during those struggles and show them more of it. A teenager who pauses longer on content about eating disorders, self-harm, or suicidal ideation may find more of this content appearing in their feed, not because anyone intended this outcome, but because the algorithm identified it as content that holds their attention.</p>

<p>This is one of the most serious concerns in children's mental health research right now, and it is directly related to how AI recommendation systems work. The algorithm does not know that a teenager is vulnerable. It knows only that certain content produces measurable engagement signals from this particular user, and it optimizes for those signals.</p>

<h3>How to Check Whether an Account Is Real</h3>

<p>Several quick checks can help identify whether a social media account is likely to be real or a fake created to manipulate:</p>

<ul>
  <li><strong>Account age and activity history.</strong> Newly created accounts that have suddenly become very active, especially around a controversial topic or election, are suspicious. Look at when the account was created and whether the activity pattern makes sense for a real person.</li>
  <li><strong>Profile photo.</strong> Right-click on a profile photo and use "search image" or save the image and upload it to Google's reverse image search. If the photo appears in many different contexts with different names, it is likely a stock photo or AI-generated image being used to create a fake identity.</li>
  <li><strong>Content pattern.</strong> Does the account post exclusively about one political issue or one narrow topic? Does every post come from the same source? Authentic human accounts have varied content — personal updates, shared articles on different topics, reactions to current events across a wide range.</li>
  <li><strong>Engagement quality.</strong> Bot-boosted posts often have many likes but few substantive comments, or comments that are generic and non-specific ("So true!" "This is exactly right!" without any content engagement).</li>
</ul>

<h3>Media Literacy Conversations at the Dinner Table</h3>

<p>The most durable protection against social media manipulation is the habit of asking questions about what you are consuming before you accept it and share it. These habits are most powerfully formed in conversation, and the dinner table has historically been where families form shared habits and values.</p>

<p>Here are some conversation-starters that work across generations:</p>

<ul>
  <li>"I saw something interesting on Facebook today. Let me show you — does this seem real to you?"</li>
  <li>"How does your For You Page on TikTok feel lately? Is there stuff on there that is bothering you?"</li>
  <li>"I noticed Grandma shared something that I think might not be accurate. How should we talk to her about that without making her feel bad?"</li>
  <li>"What do you think the people who run these apps actually want us to do when we use them?"</li>
</ul>

<p>These conversations do not need to be lectures. They work best as genuine curiosity — an older family member genuinely asking a younger one to explain TikTok, or a younger family member helping an older one understand why a Facebook group might not be trustworthy. The knowledge flows both ways, and the habit of questioning builds in everyone.</p>

<p>Social media is not going away, and nor should it. It connects families across distances, preserves memories, builds communities, and enables forms of creativity and expression that did not exist a generation ago. The goal is not to leave these platforms but to use them with clear eyes — understanding the AI systems that shape what you see, and making conscious choices rather than reactive ones.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "Children's Online Safety in the Age of AI",
    page_start: 72,
    page_end: 86,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: Children's Online Safety in the Age of AI</h2>

<p>Raising children in the digital age has always required navigating unfamiliar territory. Parents today are doing something no generation of parents has done before: raising children whose emotional and social development is being shaped, in part, by AI systems that were designed by adults for adult commercial purposes and deployed at scale before their effects on developing minds were fully understood. That is a serious statement, and it deserves serious attention — not panic, but careful, informed thought about how to help children develop healthy relationships with technology in a world that is changing faster than our parenting frameworks can keep up.</p>

<p>This chapter addresses several distinct aspects of children's online safety in the AI age: how AI-powered platforms are designed to maximize engagement in ways that affect children's development; how predators use AI tools; how to talk with children about these issues in age-appropriate ways; and what resources are available to Ohio families.</p>

<h3>Designed to Be Irresistible: The Slot Machine Psychology</h3>

<p>The comparison between social media and slot machines is not an exaggeration invented by critics. It comes from the designers and engineers of these platforms themselves — many of whom have spoken publicly about the deliberate application of behavioral psychology principles to maximize user engagement. The parallel is specific and technical.</p>

<p>Slot machines are highly effective at creating compulsive behavior because they use a technique called variable-ratio reinforcement: rewards arrive unpredictably, after a variable number of actions. This unpredictability is, counterintuitively, more compelling than predictable rewards. A lever that paid off every ten pulls would be much easier to stop pulling than one that pays off unpredictably — sometimes on the second pull, sometimes on the fiftieth.</p>

<p>Social media pulls are designed to work on the same principle. You scroll, and sometimes you find something that makes you feel wonderful — a post from a friend you care about, a video that makes you laugh, a comment that validates something you shared. And sometimes you scroll for minutes finding nothing that interesting. The unpredictability is not accidental. It is engineered. And it is particularly effective on developing brains, which are more susceptible to these reinforcement patterns than adult brains and which are also in the critical period where habits of attention and self-regulation are being established.</p>

<p>AI makes this worse by personalizing the reinforcement schedule. A slot machine gives the same payoff to every player. An AI recommendation system learns exactly what each individual child finds most engaging — which topics, which creators, which emotional tones, which visual styles — and optimizes the feed to maximize that specific child's engagement. It is like a slot machine that has learned exactly which kind of reward you find most irresistible and puts more of exactly that at unpredictable intervals in your feed.</p>

<h3>Predators and AI Tools</h3>

<p>Online predators have always attempted to build relationships with children through digital channels, presenting false identities and manipulating children's trust over time. AI tools have enhanced several aspects of this threat.</p>

<p>AI-generated conversation can maintain more consistent, engaging, and emotionally calibrated interaction than a human predator managing many conversations simultaneously. AI-generated profile photos and social media presence can create a more convincing fake persona. AI image generation can produce content designed to appeal to specific children based on their visible interests.</p>

<p>The pattern of grooming — the gradual process by which predators build trust, normalize inappropriate content, create secrecy, and isolate children from protective adults — has not fundamentally changed. What has changed is the scale and polish with which these approaches can be deployed. Parents should know the warning signs of grooming regardless of AI, because the AI tools enhance an existing threat rather than creating an entirely new one:</p>

<ul>
  <li>A new online "friend" who shows unusual interest in the child and asks for personal information quickly</li>
  <li>A child who becomes secretive about their online activity or quickly closes a device when a parent approaches</li>
  <li>Unexplained gifts, games, or gift cards received online</li>
  <li>A child who refers to a new "friend" whom no family member or schoolmate seems to know</li>
  <li>Changes in behavior, withdrawal from family or existing friends, or apparent distress after online time</li>
</ul>

<p>These warning signs should prompt conversation, not accusation. The most protective thing you can do is maintain an open relationship with your child where they feel comfortable bringing uncomfortable things to you without fear of losing their devices or your trust. The instinct to immediately punish or remove access when something concerning emerges can backfire by teaching children to hide problems rather than disclose them.</p>

<h3>AI-Generated Content and Children</h3>

<p>One of the most serious concerns in child safety law enforcement is the generation and distribution of AI-produced inappropriate content involving minors. This is not a topic for extended discussion in a family guide, but parents should be aware that it exists and that the existence of photos or videos of a child online — however innocent and family-oriented they may be — could theoretically provide source material for this technology.</p>

<p>The appropriate response is not to eliminate all images of your children from the internet, though some families choose to do this and it is a completely reasonable choice. The response is to be thoughtful about what you post publicly and to use privacy settings that limit audiences to people you actually know and trust. A birthday video posted to a private Facebook group visible only to family and close friends presents a dramatically different risk profile than the same video posted publicly. Taking five minutes to review your social media privacy settings is worthwhile protection.</p>

<h3>Age-Appropriate Conversations About AI and Online Safety</h3>

<p>The way you discuss AI and online safety with your children should change as they grow. Here is a general framework for different developmental stages:</p>

<p><strong>Ages 5-8: Simple rules and positive framing.</strong> Young children benefit from clear, simple rules without detailed explanations of frightening things. "We always tell a grown-up before we talk to someone new online." "The computer has programs that decide what you see, and they are not always showing you good things." "If something makes you feel weird or scared online, you can always tell me and you will not be in trouble." Emphasize safety as coming to a trusted adult, not secrecy or punishment.</p>

<p><strong>Ages 9-12: Beginning media literacy.</strong> Children in this age range can begin to understand that apps are designed to make them want to stay on them longer, and that this is not necessarily in their interest. They can learn the basics of evaluating whether something they see online is true. They can begin to understand that people online are not always who they say they are. Use real examples (news stories, family experiences) rather than abstract warnings.</p>

<p><strong>Ages 13-17: Deeper engagement with how AI works.</strong> Teenagers can and should understand how recommendation algorithms work, how AI generates fake content, and how their data is being used to build profiles that are used to sell them things or influence their beliefs. This knowledge is empowering, not frightening, at this age. Teenagers who understand the mechanics of the systems they use are far better equipped to use them consciously rather than reactively.</p>

<h3>Parental Control Tools: Capabilities and Limits</h3>

<p>A wide range of parental control and content filtering tools are available for phones, tablets, and computers. These tools can block access to specific websites or categories of content, set screen time limits, provide reports on app usage, and in some cases monitor communications. They have real value, particularly for younger children.</p>

<p>However, they have significant limits that parents should understand. No filter catches everything — new websites and apps emerge constantly, and determined teenagers can often find workarounds. More fundamentally, filters address access rather than judgment. A teenager who is blocked from a harmful website but who has not developed the internal capacity to recognize and resist harmful content will find another route to it. The goal is to use filters as one tool among many, while investing primarily in the conversations and relationship quality that build genuine judgment and resilience.</p>

<p>Some specific tools worth being aware of: Screen Time on Apple devices and Digital Wellbeing on Android devices are built-in and free. Google Family Link allows parents to manage children's Android devices remotely. Various third-party services offer more extensive monitoring and filtering. None of these replace the fundamental importance of relationship and conversation.</p>

<h3>Ohio Resources for Families</h3>

<p>Ohio families are not without support in navigating these issues. The Ohio Cyber Reserve is a state program that provides cybersecurity expertise and education to communities across Ohio. The Ohio Attorney General's office maintains a cybercrime unit and consumer protection resources specifically related to online threats. The Internet Crimes Against Children Task Force has an Ohio chapter that investigates online exploitation and provides training and resources for families and educators.</p>

<p>At the federal level, the National Center for Missing and Exploited Children (NCMEC) maintains resources specifically for parents on online safety, including up-to-date information on current threats. The Cyberbullying Research Center publishes evidence-based guidance for families on a wide range of online safety topics. These are not just bureaucratic resources — they are staffed by people who understand the specific, current threats facing children and who have practical, tested advice to offer.</p>

<h3>Building a Family Technology Agreement</h3>

<p>One of the most effective structural tools a family can use is a written technology agreement — a simple, collaborative document that the whole family helps create, that sets expectations for how technology is used in the household. The key word is collaborative: a technology agreement that children help create is one they are far more likely to honor than one that is handed down as a set of rules.</p>

<p>A family technology agreement might include: where devices are and are not used (no phones at dinner, devices charged outside bedrooms at night); expectations around screen time on school nights; what family members agree to do before sharing personal information or images online; what to do if something upsetting or scary happens online; and how decisions about new apps or platforms will be made together.</p>

<p>The agreement is less important as a contract to be enforced and more important as a structure for ongoing conversation. Revisit it every six months. Let it evolve as children grow and as the technology landscape changes. The act of creating and revising it together is itself the most important outcome — it normalizes the conversation, which is what protects children most effectively.</p>

<p>Children who grow up in families that talk openly, regularly, and without shame about technology are measurably more likely to disclose problems when they arise, and measurably less likely to be seriously harmed by the threats this chapter describes. That openness does not happen by accident. It is built, over time, in exactly the kinds of conversations this book is trying to start.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Protecting Your Elderly Parents from AI Threats",
    page_start: 87,
    page_end: 100,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Protecting Your Elderly Parents from AI Threats</h2>

<p>If you are an adult child or caregiver reading this chapter, you may already be concerned about an elderly parent's safety online. Perhaps you have noticed them sharing misinformation on Facebook. Perhaps they have received suspicious phone calls and mentioned them only in passing, not wanting to worry you. Perhaps you are not sure how to raise the subject without making them feel surveilled or condescended to — without the conversation becoming one where they feel you are saying they cannot take care of themselves.</p>

<p>That concern about how to have the conversation is one of the most important things in this chapter, because how you approach these conversations matters enormously. Done well, these conversations protect elderly family members while preserving their dignity and autonomy. Done poorly, they can damage your relationship and make elderly parents less likely to come to you when something genuinely alarming happens. This chapter addresses both the practical threats targeting elderly individuals and the interpersonal dynamics of helping without harming.</p>

<h3>Why Elderly Family Members Are Disproportionately Targeted</h3>

<p>Scammers target elderly individuals not because they are less intelligent or less capable, but because of specific structural factors that make elderly individuals statistically more vulnerable to certain attacks.</p>

<p>First, accumulated wealth. People in their sixties, seventies, and eighties are more likely to have paid off mortgages, accumulated savings, and received inheritances than younger adults who are still building toward these things. They have more to take. This is not a moral failing — it is the result of a lifetime of work and saving.</p>

<p>Second, phone habits and trust. Many elderly Americans grew up in an era when the telephone was used primarily by people they knew, and when answering an unknown caller was a social norm rather than an invitation to fraud. Phone-based scam calls are particularly effective against people who were raised to be polite to callers and who may not have developed the habitual skepticism toward unknown calls that younger people have.</p>

<p>Third, social isolation. Many elderly individuals, particularly those who are widowed or who live in rural areas, experience significant loneliness. Scammers who build relationships — even brief, fraudulent ones — are offering something that isolation-created vulnerability makes appealing: attention, concern, apparent connection. Romantic fraud and "friends in need" fraud exploit this dynamic directly.</p>

<p>Fourth, cognitive changes. Normal aging involves some changes in how information is processed and how quickly unfamiliar situations can be evaluated. This does not mean cognitive decline, and it is important not to conflate normal aging with incapacity. But it does mean that high-pressure, rapidly-evolving situations — like a scam call that escalates over ten minutes — may be harder to navigate effectively for an eighty-year-old than for a forty-year-old.</p>

<p>Fifth, unfamiliarity with AI capabilities. The speed at which AI capabilities have developed means that people who did not grow up with digital technology may not have updated mental models for what is now technically possible. If an elderly parent believes that a voice on the phone must be real because it sounds exactly like their grandchild, and they do not know that AI can clone voices from seconds of audio, they are working with an outdated framework for evaluating the call.</p>

<h3>Having the Conversation Without Being Condescending</h3>

<p>The single most important principle for talking with elderly parents about AI threats is this: lead with love and curiosity, not with warning and restriction. Here is the difference in practice.</p>

<p>A warning-and-restriction approach sounds like: "Mom, I'm worried you're going to get scammed. You need to stop answering calls from numbers you don't know, and you shouldn't be in those Facebook groups." This approach, however well-intentioned, positions the adult child as the authority and the parent as the problem. It is likely to produce defensiveness and to reduce the parent's willingness to share future concerns, because sharing concerns would feel like proving the adult child's point.</p>

<p>A love-and-curiosity approach sounds like: "Mom, I was reading about something really disturbing — there's technology now that can clone someone's voice from just a few seconds of audio. I've been thinking about our family and I wanted to talk about it with you. Have you ever gotten a call that felt a little off?" This approach treats the parent as a partner in the conversation. It shares information rather than issuing instructions. It invites their experience rather than dismissing it.</p>

<p>Share this book. Read it together. Ask your elderly parent what they think about the scenarios described, not as a test but as a genuine conversation. Their intuitions and experiences are valuable. An elderly person who has been receiving suspicious calls for years has often developed specific, astute observations about the patterns of those calls that would benefit the whole family to hear.</p>

<h3>Setting Up a Family Safety Net</h3>

<p>A family safety net for elderly members does not require expensive technology or complex systems. It requires clear roles, agreed-upon protocols, and regular communication. Here is a framework that works for many families:</p>

<p><strong>A designated tech-help person.</strong> Every elderly family member should have one specific person in the family — or a trusted close friend — who is their go-to for anything technology-related or suspicious. Not "call any of us," but a specific named person. This removes ambiguity in moments of stress and ensures that questions get answered rather than falling into the gap of "I didn't want to bother anyone."</p>

<p><strong>A shared family group chat.</strong> A group text or messaging thread that includes all relevant family members creates a low-effort channel for sharing suspicious things. The instruction is simple: "If you're not sure about something you received, screenshot it and send it to the group chat before doing anything." This takes the decision out of the hands of one person and puts it in front of everyone, including someone who is likely to recognize the pattern.</p>

<p><strong>The pause button principle.</strong> Agree as a family on one simple rule: before sending any money — for any reason, to anyone, in any amount — wait twenty-four hours. No exceptions. Real emergencies, real legal situations, and real financial needs can wait twenty-four hours. The urgency that scammers manufacture cannot survive a twenty-four-hour pause, which is why scammers work so hard to prevent it.</p>

<h3>Medicare and Social Security Scam Calls</h3>

<p>Two of the most frequently impersonated institutions in scam calls targeting elderly individuals are Medicare and the Social Security Administration. AI voice technology has made these impersonations significantly more convincing, including calls that use official-sounding department names, reference real program features, and are delivered in voices that sound professionally institutional.</p>

<p>Your elderly parent needs to know these fundamental facts: Medicare will never call you unsolicited and ask for your Medicare number or other personal information. If your Medicare information has changed, you will receive written notice, not a phone call. The Social Security Administration does not call people to threaten suspension of benefits over the phone. If there is a genuine issue with a Social Security payment, the process involves written correspondence, not a phone call demanding immediate payment to avoid arrest.</p>

<p>Any call claiming to be from Medicare or Social Security that involves a request for payment, a threat of account suspension or arrest, or a request to verify personal information should be treated as a scam call and hung up on immediately. The caller ID on these calls is often spoofed to appear to come from real government numbers — do not trust caller ID. Hang up and, if concerned, call Social Security or Medicare directly using the official numbers found on their official websites or your physical benefit cards.</p>

<h3>PASSPORT and Scammer Impersonation</h3>

<p>PASSPORT is Ohio's long-term care Medicaid waiver program, administered by the Ohio Department of Medicaid and operated through Area Agencies on Aging across the state. It provides home-based care services to eligible elderly and disabled Ohioans, allowing them to remain in their homes rather than entering nursing facilities. It is a genuinely valuable program that serves hundreds of thousands of Ohioans.</p>

<p>And it has been impersonated by scammers. Callers pretending to be PASSPORT representatives have contacted elderly Ohioans claiming that their benefits are at risk, that they need to provide updated personal information to avoid a lapse in services, or that a special enrollment opportunity is available that requires immediate action and sometimes a processing fee. These calls can be very convincing because PASSPORT is a real, Ohio-specific program with real caseworkers who do contact participants by phone.</p>

<p>The protective information is simple: PASSPORT representatives will never ask for a fee or payment over the phone. If you receive a call claiming to be from PASSPORT that involves any financial request, hang up and call your local Area Agency on Aging directly using the number from an official Ohio government website. Legitimate PASSPORT staff will understand your caution and will never penalize you for verifying their identity through a callback.</p>

<h3>Helping Elderly Parents Recognize AI-Generated Voices</h3>

<p>Beyond the code word system described in Chapter 2, there are some additional cognitive tools that can help elderly parents recognize suspicious calls even when the voice sounds real.</p>

<p>First, help them understand that a voice sounding exactly like someone they know is no longer proof that it is that person. This is a genuinely new fact about the world, and it requires updating a very old intuition. A conversation about it — perhaps using the Cincinnati story from Chapter 2 — helps make the fact concrete and memorable.</p>

<p>Second, help them build the habit of slowing down in any call that involves money. The speed and urgency of scam calls is deliberately designed to prevent the kind of careful thought that would catch the fraud. Agreeing in advance that no financial request over the phone will be acted on that same day gives an elderly parent a pre-loaded response: "I'm going to have to call you back after I talk to my son." This response does not require evaluating whether the call is real in the moment. It is a policy that applies uniformly.</p>

<h3>Caregiver Tips</h3>

<p>For family members who are serving as caregivers to elderly parents with significant cognitive challenges, additional considerations apply. Individuals with memory conditions or significant cognitive decline are at substantially elevated risk for financial exploitation, both from strangers and, sadly, from people in trusted positions. If you are in a caregiving role, consider working with an elder law attorney to establish appropriate financial safeguards, including limited power of attorney arrangements, bank account alerts for unusual transactions, and clear documentation of financial decision-making processes. These protections are not about distrust — they are about building a structure that protects your loved one from exploitation by people who do not share your values or your love.</p>

<p>The Ohio State Bar Association maintains a referral service for elder law attorneys, and many Area Agencies on Aging can connect families with resources for legal and financial planning in the context of elder care. These are real, local resources staffed by people who understand Ohio families and Ohio law.</p>

<p>Your elderly parent has spent a lifetime navigating challenges that you cannot fully imagine. They deserve a safety net that honors their history while protecting them from threats that did not exist when they developed their current habits. Building that safety net is one of the most loving things a family can do together.</p>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "Smart Home Privacy: Alexa, Ring, and AI in Your House",
    page_start: 101,
    page_end: 113,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: Smart Home Privacy: Alexa, Ring, and AI in Your House</h2>

<p>The number of AI-powered devices in American homes has grown dramatically in the past decade. Smart speakers like Amazon Echo and Google Home sit in kitchens and living rooms, ready to answer questions and control other smart devices with a word. Video doorbells like Ring and Nest capture footage of who comes and goes. Smart thermostats learn household schedules. Smart TVs monitor viewing habits. Baby monitors and security cameras stream video to cloud servers. For many families, these devices have become so integrated into daily life that it is easy to forget they are always listening, watching, or collecting data in some way.</p>

<p>This chapter is not an argument against smart home devices. For many families, and particularly for elderly individuals who live alone, these devices provide genuine value: safety monitoring, easy communication, household management, entertainment. The goal of this chapter is to give you an accurate picture of what these devices actually do, what data they actually collect, where that data goes, and what simple steps you can take to protect your family's privacy without giving up the benefits you are getting.</p>

<h3>How Always-On Devices Actually Work</h3>

<p>Smart speakers like Amazon Echo devices are not recording everything you say, all the time. The way they actually work is more nuanced, and understanding it will help you make informed decisions. Echo devices have a dedicated chip that is always listening for the specific acoustic pattern of the wake word — "Alexa" — using on-device processing that never sends audio to Amazon's servers. This local processing happens in real time, continuously, but it is pattern-matching, not recording.</p>

<p>When the wake word is detected, the device activates and begins recording audio, which is sent to Amazon's servers for processing. The servers use much more powerful AI systems than could fit on the small device to understand what was said and formulate a response. The response is sent back to the device and spoken out loud. After the interaction, a recording of it is stored on Amazon's servers.</p>

<p>Amazon (and similar services) does retain recordings of your voice interactions. You can listen to and delete these recordings in your account settings — Amazon provides this capability. Amazon has also acknowledged that, in some cases, human reviewers listen to a small sample of interactions to improve the AI's understanding. This was disclosed publicly after investigative reporting in 2019, and since then companies have added controls that allow users to opt out of this review process.</p>

<p>Occasionally, smart speakers also activate by mistake — detecting something in ambient conversation that sounds like the wake word. These false activations can result in unintended recordings. This is not routine surveillance; it is an error in the wake-word detection system. But it does mean that the device may occasionally record conversations you did not intend to share. Knowing this is possible allows you to make an informed choice about where you place these devices.</p>

<h3>What Data Is Actually Collected and Retained</h3>

<p>Smart speaker companies collect voice recordings of your interactions, usage patterns (what time of day you use the device, which features you use most), and data from connected devices and services (your calendar, your music services, your shopping history if you use the speaker for purchases). This data is used to improve the AI systems, to personalize your experience, and for advertising purposes depending on the platform.</p>

<p>Ring and similar video doorbell and camera systems collect video footage, motion sensor data, and in some cases audio. Ring in particular has had a complex history with law enforcement data sharing — the company previously had partnerships with police departments that allowed police to request footage from Ring devices without a warrant, under certain conditions. After public criticism and regulatory scrutiny, Ring changed some of these practices, but the overall landscape of how home security camera footage can be accessed by third parties is something families should be aware of.</p>

<p>Smart TVs collect viewing data — what you watch, when, for how long, what you pause or skip — and this data is valuable to both the TV manufacturers and advertisers. Most smart TVs participate in "automatic content recognition" programs that continuously fingerprint what is displayed on the screen, including from cable or satellite inputs, to build detailed viewing profiles. This is generally disclosed in terms of service documents that most people do not read. You can typically opt out in the TV's privacy settings.</p>

<h3>Security Risks for Home Networks</h3>

<p>Smart home devices are only as secure as the network they are connected to, and many home networks have security weaknesses that create real risks.</p>

<p>Default passwords are one of the most common vulnerabilities. Many smart home devices come with factory-set default usernames and passwords that are the same for every device of that model. If these defaults are not changed, anyone who knows the default credentials (which are often published in device manuals that are publicly available) can potentially access the device on your network. Changing default passwords is one of the simplest and most effective security steps you can take.</p>

<p>Router security is another critical factor. Your home router is the gateway between all your devices and the internet, and it is also a potential entry point for attackers. Routers also have default passwords that should be changed. Routers should have their firmware updated regularly (many modern routers do this automatically, but it is worth checking). Using the strongest encryption option your router supports — currently WPA3, or WPA2 if WPA3 is not available — provides an important layer of protection.</p>

<p>Network segmentation is a more advanced but very useful security technique. Modern routers allow you to create separate wireless networks — typically called a "guest network" — that are isolated from your main network. Putting your smart home devices on the guest network means that if a smart home device is compromised, the attacker cannot easily access your computers, phones, or other devices that hold more sensitive information. This does not require technical expertise to set up on most modern routers.</p>

<h3>Rural Ohio Considerations</h3>

<p>Families in rural Ohio often have older home networking equipment than urban counterparts, for a combination of reasons: older housing stock, less frequent ISP-driven equipment upgrades, and sometimes more complex network setups that evolved organically over years. An older router running firmware that has not been updated in several years may have known security vulnerabilities that have been patched in more recent versions.</p>

<p>If you are not sure when your router firmware was last updated, log into your router's admin panel (usually accessible by typing 192.168.1.1 or 192.168.0.1 in your web browser) and look for a firmware update option. Your ISP — whether that is AEP Ohio Fiber, Spectrum, WOW!, or a local rural cooperative — may also be able to help you assess whether your equipment needs updating, and some providers offer equipment upgrades as part of their service.</p>

<p>Rural broadband connectivity has improved significantly in Ohio in recent years, with funding through programs like the USDA's ReConnect Program and Ohio's BroadbandOhio initiative. If you are getting new or improved internet service, use the opportunity to also get a current-generation router rather than continuing with older equipment.</p>

<h3>Simple Security Steps That Make a Real Difference</h3>

<ul>
  <li><strong>Change all default passwords.</strong> On every smart home device and on your router. Use passwords that are long (at least twelve characters), unique (not reused from other accounts), and random (not your pet's name or your birth year). A password manager can help you keep track of these.</li>
  <li><strong>Mute the microphone when not using the smart speaker.</strong> Every Echo and Google Home device has a physical mute button that disconnects the microphone at the hardware level. When you are having private conversations and do not need the speaker, press mute. The indicator light (red for Echo) shows when the microphone is physically off.</li>
  <li><strong>Review and delete recordings periodically.</strong> In the Amazon Alexa app and the Google Home app, you can review and delete your voice interaction history. Setting a reminder to do this quarterly is a reasonable privacy practice.</li>
  <li><strong>Disable features you do not use.</strong> Voice purchasing on Alexa requires a PIN by default, but confirm this in your settings. If you do not use your smart speaker for shopping, disable that feature entirely.</li>
  <li><strong>Check smart TV privacy settings.</strong> Go into your smart TV's settings menu and look for "privacy" or "data collection" options. Disable automatic content recognition if it is enabled.</li>
  <li><strong>Keep device firmware updated.</strong> Most smart home devices update automatically, but verify this in each device's app. Firmware updates often include security patches for newly discovered vulnerabilities.</li>
</ul>

<h3>If You Think Your Smart Home Device Was Compromised</h3>

<p>Signs that a smart home device may have been compromised include: the device activating when no wake word was spoken and it is not a false activation pattern you recognize; unusual network activity (some routers can show you which devices are sending and receiving data); device settings changing without your action; or unknown devices appearing on your network list.</p>

<p>If you suspect compromise, the immediate steps are: change the password on the device and on your router; check the device's app for any unauthorized account connections and revoke them; consider doing a factory reset on the device and setting it up fresh; and contact the device manufacturer's support line for guidance specific to your model.</p>

<p>Smart home devices offer real value for Ohio families. The family that uses an Echo to help an elderly parent with arthritis control the lights and thermostat by voice, without needing to navigate small buttons and controls, is using technology in a way that genuinely improves quality of life. The family that uses a Ring doorbell to check whether a package has arrived, or whether an elderly parent's home caregiver has shown up, is using technology in a way that provides real peace of mind. These are not small things. The goal is not to abandon these tools but to use them with appropriate knowledge of what they are doing and with simple precautions that meaningfully reduce their risks.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Privacy in the AI Age: What Big Tech Knows About Your Family",
    page_start: 114,
    page_end: 127,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Privacy in the AI Age: What Big Tech Knows About Your Family</h2>

<p>Most people have a vague sense that technology companies know quite a bit about them. What most people do not appreciate is the scale and specificity of what is actually known, and how AI has transformed the data broker industry from a relatively limited commercial nuisance into something with profound implications for personal privacy. This chapter will give you an honest picture of what information exists about your family in digital form, how AI systems aggregate and use that information, what your legal rights are, and what practical steps you can take to reduce your family's digital footprint without significant inconvenience.</p>

<h3>The Data Broker Ecosystem</h3>

<p>Data brokers are companies whose primary business is collecting, aggregating, and selling personal information. This industry has existed since before the internet — credit reporting agencies like Equifax, Experian, and TransUnion are the most familiar examples — but the digital age has expanded it dramatically. Today, hundreds of companies collect information about individuals from dozens or hundreds of sources and sell it to marketers, insurers, employers, government agencies, and anyone else willing to pay.</p>

<p>The sources of data brokered information include: public records (property records, court filings, voter registration, professional licenses — all of which are public in Ohio and most states); data purchased from retailers and loyalty programs (your grocery store loyalty card tracks everything you buy); data from app developers who sell location data and usage data; social media activity that users have made public; data from browser tracking pixels and advertising networks; and data from previous breaches of other companies that has been purchased and integrated.</p>

<p>What AI adds to this picture is the capacity to correlate and enrich these data streams in ways that were not previously possible. An AI system can take your name and address from a public record, your estimated income from a property tax record, your health-related search queries from a data broker who purchased them from an app, your political activity from voter registration records, your purchasing patterns from a retail data broker, and your location history from a mapping app, and combine them into a detailed profile of who you are, what you care about, how you are likely to make purchasing decisions, and how you might respond to specific kinds of messages. This profile does not exist in any one place; it is assembled on demand from many sources, connected by AI systems that are very good at linking records across databases.</p>

<h3>How Advertising AI Profiles Children</h3>

<p>Federal law — specifically the Children's Online Privacy Protection Act, known as COPPA — prohibits websites and apps from collecting personal information from children under thirteen without verifiable parental consent. This law has real teeth and is actively enforced by the Federal Trade Commission. However, it has significant gaps, and advertising AI has developed sophisticated ways to work around its edges.</p>

<p>One approach is inference. Even if an app does not explicitly collect a child's age, it can infer from behavior patterns, content preferences, and device usage that a user is likely a minor, and apply this inferred categorization in advertising targeting. Another approach is the "family account" problem: if a child uses a parent's Google or Amazon account, the data collected on that account is attributed to the parent, with no COPPA protections for the child's actual behavior. A third approach is through games, educational apps, and entertainment platforms that nominally require users to be thirteen or older but do minimal age verification, effectively collecting data on child users in a legal gray area.</p>

<p>The practical result is that children who use smartphones, tablets, and the internet are being profiled in detail, even if the law theoretically prohibits it for under-thirteens. This profile follows them as they age, and by the time they are adults, they may have years of behavioral data about their interests, purchasing patterns, political inclinations, and social connections that they had no meaningful opportunity to consent to as children.</p>

<h3>Ohio Privacy Law and Federal Protections</h3>

<p>Ohio has been developing its privacy law framework. The Ohio Personal Privacy Act has been the subject of ongoing legislative discussion, and Ohio consumers should stay current with developments at the Ohio Attorney General's office. Federally, in addition to COPPA, the General Data Protection Regulation (GDPR) — while a European law — has influenced how some major tech companies handle data globally, and some of its consumer rights provisions are available to Ohio residents who request them from companies that have adopted GDPR-aligned policies.</p>

<p>The most important existing federal rights for Ohio families to know: you have the right to see your credit file from each of the three major credit bureaus once per year for free, at annualcreditreport.com. You have the right to dispute inaccurate information in your credit file. Under COPPA, you have the right to request that a company delete personal information collected from your child under thirteen. Some states have stronger privacy laws than Ohio currently does — California's CCPA/CPRA is the strongest state privacy law in the country — and companies that comply with California law often extend those rights to customers in other states by request.</p>

<h3>What "Opt Out" Actually Means and How to Do It</h3>

<p>Many data brokers offer opt-out processes that allow individuals to request removal of their information from the broker's database. The reality of these opt-outs is more complicated than the name suggests. Opting out of one data broker does not remove your information from the hundreds of others. The information may return to the broker's database from other sources after the opt-out. And the process of opting out of each broker individually is time-consuming — the major brokers include Acxiom, Spokeo, Whitepages, BeenVerified, and many others, each with its own opt-out process.</p>

<p>Services exist that will manage the opt-out process on your behalf for an annual fee. For families with significant privacy concerns, these can be worth the cost. For families willing to invest a few hours, manually opting out of the most commonly used data brokers — Acxiom, Spokeo, WhitePages, BeenVerified, and Intelius being among the largest — is meaningful even if it does not eliminate all data broker records.</p>

<p>Within specific apps and services, "opt out of personalized advertising" settings are available in most major platforms. On iPhone, this setting is in Settings > Privacy & Security > Tracking. On Android, it is in Settings > Google > Ads. On Facebook, you can limit ad targeting based on data from third parties in your Facebook settings under "Ads." These opt-outs reduce the use of your data for targeted advertising but do not eliminate data collection entirely.</p>

<h3>Data Minimization: Reducing Your Digital Footprint</h3>

<p>Data minimization is the practice of sharing less personal information with digital services than you are asked to share — particularly information that is not strictly necessary for the service you are using. This is not paranoia. It is a reasonable response to the fact that information you share voluntarily today may be aggregated, sold, or breached tomorrow in ways you cannot anticipate.</p>

<p>Practical data minimization steps include: using a secondary email address for signups you expect to be casual or temporary; providing only required information when registering for services (many optional fields can simply be left blank); using a payment service like Apple Pay or PayPal for online purchases rather than entering your credit card directly into a website you are not sure about; and declining to connect social media accounts to third-party apps when the connection is not essential to the service.</p>

<h3>Browser Privacy Settings and Search Alternatives</h3>

<p>Standard web browsing on Chrome or Safari generates significant tracking data. Privacy-focused alternatives include the Firefox browser (with privacy-enhancing add-ons like uBlock Origin and Privacy Badger), the Brave browser (which blocks trackers and ads by default), and the DuckDuckGo browser on mobile. For search, DuckDuckGo offers a privacy-respecting alternative to Google that does not build a profile of your search queries. These changes do not require giving up functionality — they simply route your internet use through channels that collect less data.</p>

<p>HTTPS is the encrypted version of web communication that protects your data in transit between your device and websites. Ensure you are only entering sensitive information on sites that show "https://" in the address bar (indicated by a padlock icon in most browsers). Most reputable sites now use HTTPS by default, but the habit of checking is valuable.</p>

<h3>Social Media Privacy Settings Walkthroughs</h3>

<p>Facebook: Go to Settings &amp; Privacy, then Settings, then Privacy. Review who can see your future posts, your friends list, and whether search engines can index your profile. Under "Ads," review and limit data sources used for ad targeting. Under "Face Recognition," disable facial recognition if it concerns you.</p>

<p>Google: Go to myaccount.google.com and review "Data &amp; Privacy." You can pause Web &amp; App Activity, Location History, and YouTube History. Review what third-party apps have access to your Google account and revoke access to any you do not actively use.</p>

<p>Apple: Review Location Services in Settings to see which apps are tracking your location and how often. Review Privacy &amp; Security settings to see which apps have access to your contacts, photos, camera, and microphone. Deny access to any app that does not clearly need it.</p>

<h3>The Family Privacy Audit</h3>

<p>A family privacy audit is a structured review of your family's digital footprint that can be done in an evening, once a year. Here is a simple framework:</p>

<ul>
  <li>Google each family member's name and note what public information appears. This is what anyone can find about you without special tools.</li>
  <li>Log in to each major service you use (Google, Apple, Facebook, Amazon) and review what data they have about you and what third-party access you have authorized.</li>
  <li>Review the passwords you use across your accounts. Use a password manager to generate unique, strong passwords for any account that shares a password with another.</li>
  <li>Check whether any of your email addresses have appeared in known data breaches, using the free service at haveibeenpwned.com.</li>
  <li>Decide, together as a family, what information you are comfortable being public and what you would prefer to protect, and take the specific steps needed to move toward that preference.</li>
</ul>

<p>Privacy is not an all-or-nothing thing. You do not have to delete all your social media accounts or use a different name online to meaningfully improve your family's privacy posture. Small, targeted steps — changing your default search engine, reviewing which apps have your location, deleting accounts you no longer use — have real effects on the amount of data being collected about your family. The goal is not perfect privacy in an age when that is essentially impossible. The goal is thoughtful, intentional choices about what you share and with whom.</p>
</article>`,
  },

  {
    chapter_number: 10,
    chapter_title: "Family Communication Protocols: Your AI Safety Plan",
    page_start: 128,
    page_end: 140,
    content_html: `<article class="chapter-content">
<h2>Chapter 10: Family Communication Protocols: Your AI Safety Plan</h2>

<p>You have read nine chapters about how AI is being used to threaten Ohio families. You have learned about voice cloning, deepfakes, AI-powered phishing, social media manipulation, children's online safety, elderly parent protection, smart home privacy, and data collection. That is a lot of information. This final chapter is about what you do with it — how you translate understanding into action, how you build the specific structures and habits that protect your family, and why families who communicate openly are, in the end, remarkably resilient against the threats we have described.</p>

<p>Let us start with the most important sentence in this book: technology is a tool, and families who talk to each other are hard to fool.</p>

<p>The scams and manipulation tactics described in this book almost all share a common element: they depend on isolation. Voice cloning scams work by cutting you off from other family members who could verify the call. Phishing works by presenting a plausible scenario before you have time to consult anyone. Social media manipulation works by inserting you into an information environment shaped by algorithms rather than trusted relationships. Every single threat in this book is significantly weakened the moment you have a conversation about it with another person you trust.</p>

<p>That is the real security system. Not software. Not filters. Families who talk to each other openly and without shame about the things they encounter online.</p>

<h3>The Family Code Word System</h3>

<p>We discussed code words in Chapter 2 in the context of voice cloning. Here we want to make it more concrete and complete, because the code word system is simple, free, and one of the most effective single protective measures a family can implement.</p>

<p>Your family code word should meet these criteria: it is known by all family members who might be involved in an emergency call (typically parents, grandparents, and adult children at minimum); it is not found anywhere in your public social media profiles or in any document that could be accessed by someone outside the family; it is memorable without being obvious (not the family dog's name or the street you grew up on, both of which might be guessable from social media); and it is something you have agreed on in advance as a family, not improvised in the moment.</p>

<p>The protocol is equally important: if someone calls claiming to be a family member in distress, and they cannot produce the code word when asked, the call is treated as unverified. You hang up. You call the family member on their known number. You do not send money, you do not provide information, and you do not allow the caller's urgency or emotional pressure to override the protocol. The protocol exists precisely because urgency and emotional pressure are the tools scammers use. The protocol is your pre-made decision that removes the urgency from the equation.</p>

<p>Write the code word down and put it somewhere safe — not in your phone, where someone who has your phone could find it, but in a physical location like your address book or a home safe. Tell the relevant family members the word in person, not by text or email. Revisit it every year to ensure everyone still remembers it.</p>

<h3>Regular Family Safety Meetings</h3>

<p>We know "family safety meeting" sounds formal and possibly off-putting. In practice, this does not have to be a scheduled event at a conference table. It can be fifteen minutes at the dinner table, once a month, with a loose agenda and no particular gravity. The key is regularity and inclusion — everyone who is part of your safety network participates, including elderly parents who might otherwise be the last to hear about new threats.</p>

<p>Here is a simple monthly agenda that works for most families:</p>

<p><em>Round one:</em> "Has anyone received anything suspicious this month — a call, an email, a text, something on Facebook — that felt off? Tell us about it." This round is non-judgmental. The point is not to evaluate whether the person should have known better. The point is to get the information into the family conversation.</p>

<p><em>Round two:</em> "Is there anything new in AI threats or online scams that we should know about?" One family member might have seen a news story. A teenager might know about something circulating at school. An elderly parent might have received a warning from their bank. This is how families update their shared knowledge.</p>

<p><em>Round three:</em> "Is there anything we should change or improve about how we handle suspicious things?" This is where protocols get updated, code words get refreshed, and individual family members who need additional support can ask for it without embarrassment.</p>

<p>Done monthly, fifteen minutes at a time, this meeting becomes one of the most valuable things a family does for its collective security. It builds habits of sharing rather than isolating. It creates a baseline of shared information that makes everyone more effective at recognizing threats. And it models, for children, the habit of treating online safety as a normal family conversation rather than a shameful secret topic.</p>

<h3>Creating a Trusted Contact List</h3>

<p>Every family member — especially elderly parents who live alone — should have a written "trusted contact list" that includes the full names and multiple phone numbers of the people they can call in any situation involving uncertainty, distress, or a suspicious request. This list should include:</p>

<ul>
  <li>Immediate family members, with cell and home numbers</li>
  <li>The designated tech-help person from Chapter 7</li>
  <li>Their primary care physician's office</li>
  <li>Their bank's official customer service number (from the back of their debit or credit card)</li>
  <li>The Ohio Attorney General's consumer protection hotline: 1-800-282-0515</li>
  <li>The local police non-emergency line</li>
</ul>

<p>This list should be printed on paper and kept in an accessible, known location — not just on a phone that might be unavailable or compromised in an emergency. Review and update it once a year. Make sure every family member who has a trusted contact list knows where it is and knows that they are encouraged to use it whenever something feels wrong.</p>

<h3>How to Report AI-Related Fraud in Ohio</h3>

<p>If you or a family member is victimized by an AI-powered scam or fraud, reporting it matters. Your report contributes to investigations that protect other families, and in some cases reporting quickly can result in recovery of lost funds. Here are the specific channels:</p>

<p><strong>Ohio Attorney General's office:</strong> Report consumer fraud, including AI-powered phone scams and online fraud, at ohioattorneygeneral.gov/consumers or by calling 1-800-282-0515. The office has a dedicated consumer protection section.</p>

<p><strong>Federal Trade Commission:</strong> Report fraud at reportfraud.ftc.gov. The FTC uses reports to identify patterns and bring enforcement actions against scammers. Reporting here is one of the most direct ways your experience translates into protection for others.</p>

<p><strong>FBI Internet Crime Complaint Center (IC3):</strong> Report internet-related crimes, including romance fraud, investment fraud, and phishing, at ic3.gov. IC3 reviews reports and refers them to federal, state, and local law enforcement.</p>

<p><strong>Your local police department:</strong> File a local police report for any fraud, even if you think local police cannot pursue an internet-based scammer directly. The police report creates an official record that may be required if you pursue recovery through your bank or insurance.</p>

<p><strong>Your bank or financial institution:</strong> Report suspected fraud to your bank immediately, ideally within the hour if you sent money. Wire transfers can sometimes be recalled if reported within twenty-four hours. Contact the fraud department directly, using the number on the back of your card or on your official statement.</p>

<h3>Recovery Steps If a Family Member Was Victimized</h3>

<p>If someone in your family was victimized by an AI-powered scam, the first and most important thing to say is: this is not their fault. Sophisticated AI tools are designed specifically to bypass normal skepticism and exploit normal human emotions like love, fear, and trust. The fact that it worked does not mean the person is foolish. It means the scammers were effective.</p>

<p>The practical recovery steps depend on the type of fraud. For financial losses: contact your bank immediately, file the reports listed above, and contact an elder law attorney if the losses are significant. For identity theft resulting from information given to a scammer: place a fraud alert on your credit reports (contact any one of the three bureaus and they are required to notify the others), review your credit reports for unauthorized accounts, change passwords on any account that may have been compromised, and consider placing a credit freeze. For emotional recovery: recognize that shame and self-blame are normal but not helpful, and seek support — from family, from a trusted pastor or counselor, or from a fraud victim support service.</p>

<p>AARP's Fraud Watch Network offers a helpline at 877-908-3360 where trained fraud specialists can help victims understand their options and connect with resources. This service is free and available to anyone, not just AARP members.</p>

<h3>The Family AI Safety Pledge</h3>

<p>Some families find it helpful to make their commitments explicit. Here is a simple pledge that family members can discuss and adapt to their own values and circumstances:</p>

<p><em>We commit to talking openly about the things we see and experience online, without judgment and without shame. We commit to pausing before acting on any urgent financial request, regardless of how it comes to us. We commit to verifying before sending money — always — even when the voice on the phone sounds exactly like someone we love. We commit to sharing suspicious things with each other rather than dealing with them alone. We commit to updating our knowledge as threats evolve, and to protecting our most vulnerable members without diminishing their dignity or independence. And we commit to recovering together when something goes wrong, because what matters most is each other.</em></p>

<p>This is not a legal document. It is a shared intention that makes the conversation ongoing rather than a one-time event.</p>

<h3>Your Quick-Reference Card: Print This and Put It on the Fridge</h3>

<p>Cut out or copy this card and put it somewhere your whole family can see it:</p>

<ul>
  <li><strong>Family code word:</strong> _________________ (write it in pen, keep it private)</li>
  <li><strong>Rule 1:</strong> Never send money before 24 hours and family verification</li>
  <li><strong>Rule 2:</strong> Gift cards are never legitimate emergency payment — never</li>
  <li><strong>Rule 3:</strong> Hang up, then call back on the real number</li>
  <li><strong>Rule 4:</strong> When in doubt, send a message to the family group chat before doing anything</li>
  <li><strong>Report fraud:</strong> Ohio AG 1-800-282-0515 | FTC reportfraud.ftc.gov | FBI ic3.gov</li>
  <li><strong>AARP Fraud Helpline:</strong> 877-908-3360</li>
</ul>

<h3>An Empowering Conclusion</h3>

<p>We want to end this book where we began: with the truth about the balance of power here. AI technology is powerful, and it is being used against Ohio families in ways that are sophisticated and evolving. That is real. And it deserves to be taken seriously.</p>

<p>But families who communicate openly are not easy targets. The scams described in this book are specifically designed to exploit isolation, panic, and secrecy. Every one of them is weakened by a family that shares information, pauses before acting, verifies before sending, and asks for help without embarrassment. You have those capabilities. You have always had them. What this book has given you is the specific knowledge to apply them effectively against AI-specific threats.</p>

<p>The grandmother who hangs up and calls her real grandson's number has won. The parent who shows their child a phishing email and says "let's figure out together if this is real" has given their child a tool they will use for the rest of their lives. The adult child who sits down with their elderly parent and agrees on a code word, without condescension and with genuine affection, has built something that a fraudster's algorithm cannot touch.</p>

<p>The technology will keep changing. The specific techniques described in this book will evolve. New threats will emerge. And you will continue to learn, to adapt, and to protect each other — because that is what Ohio families do, and it always has been.</p>

<p>Thank you for reading. Share what you have learned. Start the conversations. Your family is more resilient than any AI threat that exists today.</p>
</article>`,
  },
];
