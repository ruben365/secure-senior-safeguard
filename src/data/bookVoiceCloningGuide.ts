import type { BookChapter } from "@/config/bookCatalog";

/** Full content for Voice Cloning & Deepfakes: A Family Safety Guide (~130 pages) */
export const VOICE_CLONING_GUIDE_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content">
    <h2>Voice Cloning &amp; Deepfakes: A Family Safety Guide</h2>
    <p><em>Understanding and Defending Against AI-Generated Deception</em></p>
    <p><strong>By the InVision Network Education Team</strong></p>
    <p>InVision Network Press<br />Dayton / Kettering, Ohio<br />2026</p>

    <h3>Copyright Notice</h3>
    <p>Copyright &copy; 2026 InVision Network Press. All rights reserved.</p>
    <p>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.</p>
    <p>For permission requests, write to the publisher at:<br />InVision Network Press<br />Dayton / Kettering, Ohio</p>
    <p>The information provided in this book is for educational purposes only. While every effort has been made to ensure accuracy, the authors and publisher make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information. Technology and fraud tactics evolve rapidly; readers are encouraged to verify current guidance from law enforcement and consumer protection agencies.</p>
    <p>Case studies and scenarios presented in this book are fictional composites created for illustrative purposes. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.</p>
    <p>First Edition, 2026<br />Printed in the United States of America</p>
    <p>ISBN: 978-1-XXXXXX-XX-X</p>
    </article>`,
  },
  {
    chapter_number: 1,
    chapter_title: "The Day My Grandmother Called My Phone",
    page_start: 4,
    page_end: 14,
    content_html: `<article class="chapter-content">
    <h2>Chapter 1: The Day My Grandmother Called My Phone</h2>

    <p>It was a Tuesday afternoon in October — the kind of grey, drizzly day that settles over Columbus like a worn blanket — when Rachel's phone lit up with her grandmother's name. Rachel was mid-meeting at the insurance office where she worked, her laptop screen filled with a spreadsheet she had been arguing with for the better part of an hour. She almost let it go to voicemail. But it was Grandma Eleanor, who lived alone in a condo in Dublin, and Rachel had a habit of picking up for her.</p>

    <p>"Honey, it's me," the voice said.</p>

    <p>Something in Rachel's chest loosened. That voice. The slightly reedy quality of it, the Ohio vowels stretched just so, the warmth that came through even a poor cell connection. It sounded exactly like Eleanor. It had Eleanor's particular rhythm of speech, the way she started sentences with a slight exhale, the gentle urgency she used when she had news to share.</p>

    <p>"Grandma? Are you okay?"</p>

    <p>"I've had an accident, honey. Near Ohio State — I was trying to get to that bakery you like, and I bumped another car. The police are here and they're saying I need to post something before they tow the car. I'm so embarrassed. I didn't want to call your mother and worry her. Could you send me twenty-five hundred on Venmo? I'll pay you back Thursday when Harold drives me to the bank."</p>

    <p>Rachel's hand had already moved toward her laptop to open a new browser tab. The voice was right. The logic was plausible — Eleanor did sometimes drive into Columbus. The bakery detail landed perfectly; there was a specific place on High Street that Rachel had mentioned just last month. The embarrassment in the voice sounded real. The request not to tell Rachel's mother sounded exactly like something Eleanor would say.</p>

    <p>Then Rachel paused.</p>

    <p>Her grandmother always called her "sweetheart." Not "honey." Not ever "honey." In thirty-four years, Rachel could not remember a single instance of her grandmother using that word. It was sweetheart, always. It was the word Eleanor used when she was proud of Rachel, when she was worried about her, when she was saying goodbye. Sweetheart was Eleanor's word.</p>

    <p>This voice had said "honey."</p>

    <p>Rachel made an excuse, hung up, and called her grandmother back on the number she'd had memorized since childhood. Eleanor answered on the second ring, entirely fine, sitting in her condo watching the Weather Channel, nowhere near Ohio State, not in any trouble whatsoever. She had not called Rachel that day.</p>

    <p>A scammer had almost taken $2,500 from a thirty-four-year-old woman who works in insurance — someone whose literal job involves thinking about risk — because the voice on the phone sounded exactly like her grandmother. One word saved her. One word that was in the original voice samples but not in the scammer's script.</p>

    <h3>This Is Not Science Fiction</h3>

    <p>If you picked up this book expecting a warning about some future threat, here is the news that cannot wait: the threat is here. Voice cloning technology — the ability to capture someone's voice from a short audio sample and use artificial intelligence to make that voice say anything — is not a research experiment. It is not a capability limited to well-funded intelligence agencies or sophisticated criminal organizations. It is a consumer product. Some of the tools that can replicate a human voice convincingly enough to fool a family member can be accessed for free on the internet. Others cost less than a streaming subscription.</p>

    <p>In 2023 alone, the Federal Trade Commission received reports of hundreds of millions of dollars lost to phone scams that involved voice impersonation. That number almost certainly understates the true scale, because most people never report fraud, especially when they feel ashamed. The FBI's Internet Crime Complaint Center has flagged AI-assisted voice fraud as one of the fastest-growing categories of consumer crime in the country. Ohio's Attorney General office issued a consumer alert specifically about AI voice cloning scams in the summer of 2024, warning families across the state about exactly the kind of call Rachel received.</p>

    <p>So where do the scammers get the voice samples? Everywhere.</p>

    <p>That video you posted to Facebook of Grandma Eleanor at Christmas dinner, laughing and telling a story — that is a voice sample. The voicemail greeting on her phone, the one where she says her name and asks you to leave a message — that is a voice sample. The video from her church's Facebook livestream where she's singing in the choir — that is a voice sample. The clip from your cousin's graduation party that ended up on TikTok — that is a voice sample. Ten seconds of clear audio is enough for some AI systems to begin building a model. Thirty seconds gives a workable clone. A few minutes of audio produces a voice indistinguishable from the original to most human ears.</p>

    <p>The process, once the samples are collected, is almost automated. The scammer uploads the audio to one of several commercially available voice AI platforms. The system analyzes the pitch, the rhythm, the particular resonances and textures that make someone's voice uniquely theirs. It builds a model. From that model, it can generate new speech — any words, in that voice, in real time or pre-recorded. The scammer then calls the target with a script, either playing a pre-generated clip or using a tool that translates their own voice into the cloned voice live during the call.</p>

    <p>What makes this so effective is not just the technical quality of the clone. It is the combination of a convincing voice with a carefully constructed emotional scenario. Love plus urgency plus the specific shame of "don't tell anyone" equals a decision made before the rational mind can fully engage. Rachel's instinct to help her grandmother, the plausible details, the time pressure — these were not accidents. They are a formula that has been refined by scammers over decades of grandparent fraud, now supercharged by technology that can make any voice say the words.</p>

    <h3>Deepfakes: When the Voice Is Only the Beginning</h3>

    <p>Voice cloning is part of a larger family of technologies grouped under the term "deepfakes" — AI-generated or AI-manipulated media that presents false information in a convincing format. This includes not just cloned voices but also videos where someone's face has been replaced with another person's face, where a person's lips are made to match words they never spoke, and where entirely fictional people are generated from scratch and presented as real. A scammer can now create a fake romantic partner with a generated photo, sustain a months-long relationship through AI-written text messages, and then escalate to a voice call using a cloned voice — all without any real human ever being on the other end of the relationship.</p>

    <p>These tools were created with legitimate purposes in mind. Accessibility technology for people who have lost their voice. Dubbing films into other languages. Creating voiceovers for videos without expensive recording sessions. Memorial technology that lets families hear a deceased loved one's voice. Entertainment. The companies that build these tools have terms of service that prohibit their use for fraud. But terms of service cannot stop a determined bad actor, and the bad actors have noticed.</p>

    <h3>What This Book Will Do</h3>

    <p>This book is not meant to frighten you. Rachel's story ends well because she knew one specific thing about her grandmother — a tiny detail that created a crack in the scam. This book is full of details like that. Patterns to notice. Questions to ask. Systems to put in place before the call comes, so that when it comes, you have a plan.</p>

    <p>In the chapters that follow, we will walk through exactly how voice cloning and deepfake technology works — in plain language, without jargon, with analogies you can hold onto. We will look at who is being targeted and why. We will spend real time on the grandparent scam, which has been transformed by voice cloning from a rough approximation into something genuinely frightening. We will talk about how criminals get voice samples and what you can reasonably do to reduce your family's exposure. And we will give you concrete, practical tools: the family code word system, the verification protocol, the list of people to call in Ohio if something happens.</p>

    <p>By the time you finish this book, you will understand what Rachel understood in that moment of hesitation. You will know what your scam-proof word is — the word your grandmother always uses, the one a stranger running a script will never think to include. You will have talked to your elderly relatives about this in a way that respects their dignity and gives them power rather than fear. You will have checked your family's social media settings and thought about what voice samples you are putting into the world.</p>

    <p>The scammer's greatest weapon is the assumption that this will never happen to your family. Let's take that weapon away.</p>
    </article>`,
  },
  {
    chapter_number: 2,
    chapter_title: "How Voice Cloning Works: The Technology Explained Simply",
    page_start: 15,
    page_end: 26,
    content_html: `<article class="chapter-content">
    <h2>Chapter 2: How Voice Cloning Works: The Technology Explained Simply</h2>

    <p>You don't need to understand the engineering to protect yourself from voice cloning. But you do need to understand it well enough to believe it. Because the biggest obstacle to taking this threat seriously is the feeling that it can't really be that good — that surely a computer-generated voice would sound robotic, slightly off, unconvincing to anyone paying real attention. That feeling is wrong, and this chapter is going to explain why.</p>

    <h3>What a Voice Actually Is</h3>

    <p>Before we talk about cloning a voice, it helps to think about what a voice actually contains. When you hear someone's voice, you are picking up on a remarkable amount of information simultaneously. There is pitch — how high or low the voice sits on the musical scale. There is timbre — the particular texture and color of the voice, what makes a cello sound different from a violin even when playing the same note. There is rhythm — how the person paces their speech, where they pause, how long syllables last. There is accent — the specific shapes that vowels and consonants take based on where and how someone grew up. There is prosody — the musical rise and fall of sentences, the way questions sound different from statements.</p>

    <p>All of these characteristics together form what voice scientists call a "voiceprint." It is as individual as a fingerprint, and it is what allows you to recognize your grandmother's voice after not hearing it for six months, or to know your partner is in a bad mood from five words spoken from the next room. We are extraordinarily good at recognizing voices — which is exactly why voice cloning is so dangerous when it works.</p>

    <h3>How AI Learns a Voice</h3>

    <p>Think of the AI system as an extraordinarily attentive student who has been asked to learn to impersonate someone. The student listens to recordings of the target person speaking. With each recording, the student gets better at noticing patterns: this person tends to raise their pitch at the end of questions, they have a slight drawl on long vowels, they breathe before certain kinds of sentences, they have a particular way of saying "well" that sounds like an exhale before a thought.</p>

    <p>The AI system does exactly this, but instead of keeping mental notes, it builds a mathematical model — essentially a very complex set of numbers that describes all the patterns it has detected. This model is what engineers call a "voice model" or "voice embedding." Once the model exists, it can be used to generate new audio. The system takes any text you give it, runs that text through the voice model, and produces audio that sounds like the target person saying those words — even words they have never actually spoken.</p>

    <p>How much audio does this take? The answer has been changing rapidly, and not in a reassuring direction. In the earlier days of voice cloning research — five or six years ago — you needed thirty minutes of clean, high-quality audio to build a useful voice model. That requirement shrank to about ten minutes, then to five, then to three. Some of the most recent research systems have demonstrated convincing voice cloning from a single clip of three to five seconds. Five seconds. The length of your grandmother saying "Hello, this is Eleanor, leave me a message."</p>

    <p>The practical threshold for a scam-quality clone — convincing enough to fool a worried family member during a high-stress phone call — is probably somewhere between ten and thirty seconds of clear audio. That threshold is crossed by the voicemail greetings of millions of Americans right now.</p>

    <h3>The Software Pipeline: From Sample to Scam</h3>

    <p>The process works in several stages that have become increasingly automated. First, the criminal collects audio samples. These come from social media videos, voicemail greetings, YouTube content, church livestreams — anywhere the target person's voice appears in public digital form. The audio is extracted and cleaned; background noise can be filtered out with widely available tools.</p>

    <p>Second, the audio is uploaded to a voice cloning platform. Several of these exist with legitimate commercial purposes. ElevenLabs is one of the best-known — a platform built initially to help creators produce professional voiceovers without expensive studio recording. It allows users to create custom voice models from uploaded samples. Voice.ai is another, oriented toward real-time voice modification. Microsoft's VALL-E is a research system that demonstrated convincing cloning from just three seconds of audio; while not commercially available in its research form, the techniques it demonstrated have been incorporated into other tools. These platforms exist for legitimate uses — accessibility, entertainment, dubbing, content creation — but their capabilities can be directed toward fraud by anyone willing to violate their terms of service.</p>

    <p>Third, once the voice model is trained, the criminal writes a script. The script needs the right details: the target's name, a plausible scenario, specific geography that fits the relationship. It needs urgency. It needs a reason the victim shouldn't verify by calling other people. And it uses the payment method most resistant to recovery: gift cards, Venmo, wire transfer, cryptocurrency.</p>

    <p>Fourth, the criminal places the call. Some use pre-recorded audio clips, playing them through the phone while staying silent themselves. Others use real-time voice modification software that converts their own voice into the cloned voice as they speak. Real-time cloning is harder and produces slightly lower quality results, but it allows for more dynamic conversation — the fake "grandmother" can respond to what the victim says, ask clarifying questions, push back on hesitation.</p>

    <h3>What the Clone Cannot Do Well</h3>

    <p>This is the section that might save your family real money, so read it carefully. For all its impressive capabilities, voice cloning technology has weaknesses, and knowing them helps you probe a suspicious call.</p>

    <p>First, the clone is limited to what was in the training data. If your grandmother has a particular phrase she uses — "sweetheart," a specific family expression, a nickname for you that only she uses — the clone will not know to use it unless that exact word appeared prominently in the audio samples. Scammers write generic scripts. Generic scripts miss the specific vocabulary of a real relationship.</p>

    <p>Second, the clone handles unexpected interruptions poorly. If you ask an off-script question — "What did we have for dinner at Thanksgiving last year?" or "What's the name of my cat?" — the scammer operating the real-time system has to improvise, and the voice quality often degrades noticeably under unscripted pressure. Pre-recorded clips simply cannot respond at all. Either the line goes oddly quiet, or there is a jarring non-answer.</p>

    <p>Third, strong emotional variation is difficult to replicate convincingly. Real distress, genuine laughter, the specific quality of someone crying — these are hard for voice models to produce accurately from short training clips. A cloned voice often sounds "flat" in moments of high emotion, or the emotional quality sounds slightly off, like someone performing an emotion they have only read about.</p>

    <p>Fourth, unusual vocabulary or technical terms that weren't in the training data can produce odd pronunciation. If the training clips were casual conversation and you introduce specialized terminology, the clone may mispronounce words in ways the real person never would.</p>

    <h3>The Historical Context</h3>

    <p>It is worth pausing to appreciate how quickly this technology has moved. Voice synthesis — making computers generate speech — has existed for decades. Think of the robotic voices on early GPS devices, or the automated phone trees of the 1990s. They were obviously artificial. They had the cadence of machines.</p>

    <p>The first serious neural network approaches to voice synthesis appeared in academic papers around 2016 and 2017. By 2019, researchers were publishing results showing voice cloning that could fool listeners some of the time. By 2021, commercial platforms were launching. By 2023, voice cloning scams had become common enough to generate widespread law enforcement warnings. In roughly seven years, the technology moved from university research paper to widespread criminal tool. The next seven years will almost certainly bring capabilities we cannot fully anticipate.</p>

    <p>This is why the defenses in this book are not primarily technological. They are behavioral and relational. Technology will keep improving; the human systems for authentication and verification — the family code word, the callback protocol, the trusted contact — are durable in ways that no app or filter can match. The best defense against a very good fake is something the fake cannot know: what is real between you and the people you love.</p>
    </article>`,
  },
  {
    chapter_number: 3,
    chapter_title: "Deepfake Video and Photos: When Your Eyes Lie",
    page_start: 27,
    page_end: 40,
    content_html: `<article class="chapter-content">
    <h2>Chapter 3: Deepfake Video and Photos: When Your Eyes Lie</h2>

    <p>The human brain is a pattern-recognition machine that evolved to be extraordinarily good at reading faces. We developed this ability over hundreds of thousands of years because faces contain critical survival information — is this person trustworthy, threatening, familiar, a stranger? We read micro-expressions in fractions of a second without conscious thought. This ability is so deeply wired that we see faces in clouds and wood grain. We are, in a sense, programmed to believe faces.</p>

    <p>Deepfake technology exploits that programming directly. And just like voice cloning, the quality of deepfake video and photos has moved in the last few years from an interesting research curiosity to something that can fool careful, intelligent, well-meaning people under the right circumstances.</p>

    <h3>How Video Deepfakes Work</h3>

    <p>The dominant technique for creating deepfake video involves what researchers call Generative Adversarial Networks, or GANs. The name is technical but the concept is illuminating. A GAN works by setting two AI systems against each other: a "generator" that creates fake images, and a "discriminator" that tries to detect whether an image is real or fake. The generator keeps trying to fool the discriminator. The discriminator keeps getting better at spotting fakes. Through this adversarial process, both systems improve, and the generator eventually learns to produce images that the discriminator — and human observers — cannot reliably distinguish from real ones.</p>

    <p>For face-swap deepfakes, the generator is trained on thousands of images of the target person's face. It learns to map the target's facial geometry — the specific distances between their features, the way their skin texture changes with lighting, how their expressions move — onto the face of a different person in an existing video. The result is a video where someone else's body and voice appear to be the target person.</p>

    <p>More recent deepfake systems use "diffusion models" — a different AI architecture that works by starting with random noise and gradually refining it into a coherent image. Diffusion models have proven particularly effective at generating highly realistic still images and are increasingly used in video contexts as well. They are behind many of the astonishing AI-generated images that circulate on social media.</p>

    <p>Lip-sync deepfakes are a specialized variant: rather than replacing a face, they manipulate the mouth of a real person to match audio they never actually spoke. These are used to put false words into real politicians' mouths, to fabricate statements by business leaders, and to create fake confessions or endorsements.</p>

    <h3>Still Image Deepfakes</h3>

    <p>The website ThisPersonDoesNotExist.com became famous around 2019 for demonstrating something deeply unsettling: it generates photorealistic portraits of human faces that belong to no one. Every face on the site was created entirely by AI. The faces have pores, asymmetries, hair with individual strands catching the light, eyes that reflect the room around them. They look like photographs of real people. They are not.</p>

    <p>Scammers use AI-generated faces for profile photos on dating sites, on LinkedIn, on Facebook, in emails that need to appear to come from a real human being. They use them to create fake romantic interests, fake investment advisors, fake customer service representatives for non-existent companies. The face that looks trustworthy and approachable in a profile photo might have never existed anywhere outside a computer's calculations.</p>

    <p>Photo manipulation — taking a real person's photo and altering it — has also advanced dramatically. AI can now change facial expressions, swap backgrounds, alter ages, change physical features, and compose a target person's real face into situations or contexts they were never part of.</p>

    <h3>How Deepfakes Are Used in Fraud</h3>

    <p>The most emotionally devastating application of deepfake technology in fraud is the romance scam. This is worth spending real time on, because it affects more people than most realize and causes damage that goes far beyond financial loss.</p>

    <p>Consider the story of Margaret, a 61-year-old woman from Toledo. Margaret had been widowed for three years when she received a connection request on Facebook from a man named "David," whose profile showed a handsome, silver-haired man who described himself as a civil engineer working on infrastructure projects abroad. His photos showed someone who looked successful and kind. His early messages were thoughtful and gentle. He asked about her life, her late husband, her children, her interests. He shared his own stories — a daughter in college, a difficult marriage that had ended years ago, a longing for a real connection. Over the first weeks, the messages became daily. Then multiple times a day.</p>

    <p>Over six months, David became the most significant relationship in Margaret's life. He understood her. He made her feel seen. When she expressed doubts about whether a real relationship could develop from an online connection, he was patient and reassuring. When she mentioned a problem with her car, he expressed concern and offered to help when he got back to the States. He always had an explanation for why he couldn't video chat properly — the internet connection on the project site was unreliable, his camera was broken, he would fix it soon. When they did finally try a video call, the image was blurry and kept freezing, showing barely enough to confirm a face and a voice that matched the messages.</p>

    <p>Then the crisis came. David's project had hit a problem. A payment from his contracting company was delayed, and he needed funds to pay his crew or the whole project would be shut down and he would lose his contract. He was so embarrassed to ask. He would repay her in full within two weeks when the payment cleared. He had never asked anyone for anything like this. He asked for $8,000.</p>

    <p>Margaret sent the money. She had spent six months building a relationship with a person who did not exist. His profile photos were AI-generated. His story was a script refined through thousands of iterations of the same con. The video call had been a low-quality clip assembled from AI-generated video. The warm, understanding man who knew everything about her had been assembled from her own words, reflected back at her with calculated intimacy.</p>

    <p>Margaret lost $8,000. She lost six months of emotional investment. She lost the grief of ending a relationship that had felt real and meaningful — because even knowing it was a fraud, she mourned it. The financial damage, she later said, was easier to process than the feeling that she had been made to love someone who was never there.</p>

    <h3>Celebrity Impersonation and Investment Scams</h3>

    <p>Another common use of deepfakes: fake videos of celebrities and public figures endorsing investment products, cryptocurrency schemes, or financial opportunities. A convincing deepfake of a well-known businessman or celebrity appearing to personally endorse an investment can drive enormous traffic to fraudulent platforms. Ohio has seen residents lose significant sums to investment scams promoted through deepfake celebrity endorsements circulating on social media.</p>

    <h3>How to Detect Deepfakes</h3>

    <p>Detection is not foolproof, but there are reliable signs to look for:</p>

    <ul>
      <li><strong>Unnatural blinking:</strong> Early deepfakes famously failed to replicate natural blinking patterns. Modern systems have improved, but unnatural blink rate — blinking too fast, too slow, or asymmetrically — remains a signal worth noting.</li>
      <li><strong>Ear and hair rendering:</strong> AI has particular difficulty with the complex geometry of ears and the individual strands of hair, especially at the edges where hair meets background. Look for areas where hair looks smudged, where edges seem blurred or artificial, or where the ear seems oddly shaped.</li>
      <li><strong>Facial boundary artifacts:</strong> In face-swap deepfakes, there is often a subtle seam or blurring at the boundary between the swapped face and the original head and neck. Lighting may also be inconsistent — the face lighting doesn't quite match the environment lighting.</li>
      <li><strong>Eye reflections:</strong> Human eyes reflect light in consistent patterns. Deepfake eyes sometimes have inconsistent or asymmetrical reflections, or reflections that don't match the light sources in the scene.</li>
      <li><strong>Background consistency:</strong> In AI-generated photos especially, look at the background behind the subject. Is the background sharp in ways that seem inconsistent with depth of field? Are objects in the background oddly distorted or incomplete?</li>
    </ul>

    <p>For still photos, the reverse image search is your first tool. Right-click any suspicious profile photo and search for it on Google Images or TinEye. AI-generated photos will return no results. Photos stolen from real people will often return matches on other accounts, sometimes with different names. If a profile photo returns zero matches across the entire internet, be cautious — it may have been generated specifically for the fraudulent account.</p>

    <p>For video, the SIFT method provides a practical framework: Stop, Investigate the source, Find better coverage, Trace claims to their origin. Before accepting a video as real, especially one that provokes a strong emotional reaction — outrage, alarm, excitement — ask where it came from. Is it verifiable through a second credible source? Is the source associated with the video a real, established outlet?</p>

    <p>The metadata check: photos and videos contain embedded data about when and where they were created. Tools like Jeffrey's Exif Viewer (a free web-based tool) can extract this data. AI-generated images often lack the GPS coordinates, camera model data, and other metadata that genuine photographs contain. The absence of metadata is not proof of fakery, but its presence is evidence of authenticity.</p>

    <p>None of these techniques is perfect, and the technology is improving faster than detection methods. The most durable defense is not technical detection — it is the behavioral principle of verification before action. Before you send money, before you share information, before you make a major decision based on what you saw in a photo or video, verify through a separate, trusted channel.</p>
    </article>`,
  },
  {
    chapter_number: 4,
    chapter_title: "The Grandparent Scam, Upgraded",
    page_start: 41,
    page_end: 52,
    content_html: `<article class="chapter-content">
    <h2>Chapter 4: The Grandparent Scam, Upgraded</h2>

    <p>The grandparent scam has been around for decades. It is one of the oldest phone frauds in America, and it has always worked on the same basic principle: call an older adult, claim to be their grandchild in trouble, manufacture urgency, and request untraceable payment before they can think clearly or consult with family. It worked before smartphones. It worked before the internet. It worked because it weaponized love.</p>

    <p>For many years, the limitation of the grandparent scam was the voice. Callers had to hope that the victim's relationship with their grandchild was not close enough for the voice to be immediately recognizable as wrong, or they had to rely on the confusion of a startled elderly person who wasn't quite sure they were hearing correctly. Experienced grandparents learned to be suspicious of unfamiliar voices claiming to be family. The scam worked often enough to remain widespread, but it could be defeated by a victim who simply said "you don't sound like yourself."</p>

    <p>Voice cloning has removed that limitation entirely.</p>

    <h3>Earl's Story</h3>

    <p>Earl is 76 years old. He lives alone in Springfield, Ohio, in the house where he and his wife Dorothy raised their three children before Dorothy passed away from cancer in 2019. He has five grandchildren, and the one he is closest to is his grandson Marcus, 24, who goes to school in Bowling Green and calls every Sunday without fail.</p>

    <p>On a Wednesday morning in March, Earl's phone rang at 9:15. The caller ID showed a number he didn't recognize, which he almost didn't answer. But he answered it.</p>

    <p>"Grandpa? It's Marcus. I'm in trouble and I need you to stay calm."</p>

    <p>The voice was Marcus's voice. Earl knew it the way he knew his own reflection — the specific timbre of it, the particular way Marcus started sentences when he was nervous, the Ohio State undergraduate who had been raised on Earl's cooking and Earl's stories. It was Marcus's voice. Earl was certain.</p>

    <p>"Marcus, what's wrong?"</p>

    <p>The story came out in a rush, convincingly distressed. Marcus had been driving back from a friend's place in Columbus the night before. He'd been in a minor accident, and — Marcus was embarrassed to say this, but he owed Earl the truth — there had been a beer in the car. Just one, from hours before, but the police found it and now he'd been charged and he was calling from a detention facility in Franklin County. He needed Earl to post bond. A lawyer was going to call in a few minutes to explain everything. The most important thing was that Marcus needed Earl not to call his parents — this was so embarrassing, and Marcus needed to handle it himself, and he didn't want his mom and dad to know.</p>

    <p>Earl said he understood. He said of course he would help. He said not to worry.</p>

    <p>Three minutes later, a second call came from a man who identified himself as an attorney named Robert Chandler. He explained, in a clipped, professional tone, that Marcus's bond had been set at $8,000 and that it needed to be paid by end of day to avoid Marcus being transferred to a different facility and held over the weekend. Mr. Chandler regretted that bond payments in these situations needed to be made in gift cards — Google Play or Apple — due to regulations around inmate accounts. He would call back in thirty minutes.</p>

    <p>Earl drove to Meijer. Then to Walgreens. Then to CVS. He spread the purchases across three stores because he had a vague memory of reading that gift card scams involved large purchases at single locations and he thought this would help somehow. He bought $8,000 in gift cards over the course of ninety minutes. He called back the number "Mr. Chandler" had provided and read the codes from the backs of the cards. The man thanked him and said Marcus would be released within a few hours.</p>

    <p>Marcus called that Sunday, as he did every Sunday, cheerful and unbothered, from his apartment in Bowling Green. He had not been in Columbus. He had not been arrested. He had not been in any trouble. When Earl described what had happened, Marcus wept. Earl did not weep. He was very quiet for a long time and then he said he felt like a fool.</p>

    <p>He was not a fool. He was a loving grandfather who trusted his ears, and his ears were lied to by a machine.</p>

    <h3>The Emotional Mechanism</h3>

    <p>The grandparent scam works because it assembles three of the most powerful human psychological forces and directs them at a single decision.</p>

    <p>First: love. The deepest, least-rational kind. Grandparent-grandchild relationships are often characterized by uncomplicated affection, the kind that adults develop more complicated versions of with their own children. The love of a grandparent for a grandchild is frequently the emotional center of an older adult's life. It is not susceptible to argument.</p>

    <p>Second: urgency. The scenario always involves time pressure. "By end of business today." "Before he gets transferred." "The arraignment is in two hours." Urgency is the enemy of verification. When we believe something must be decided now, we skip the steps we would otherwise take. Scammers know this and engineer it deliberately.</p>

    <p>Third: shame. "Don't tell your mother and father." This component of the script is brilliant in its cruelty. It gives the victim a reason not to consult with the people who could most quickly identify the fraud. It frames the secrecy as a form of respect for the grandchild's autonomy and dignity. It isolates the victim from their support network at exactly the moment they most need it.</p>

    <p>Voice cloning adds a fourth element that has historically been absent: authentication. The voice says this is Marcus. The voice provides the confirmation that rational caution would otherwise require. Without voice cloning, the scam had a crack — you couldn't be entirely sure it was your grandchild. With voice cloning, that crack is sealed.</p>

    <h3>The Gift Card Demand</h3>

    <p>Every version of this scam that involves gift cards is a scam. This is not an oversimplification. There is no legitimate legal system in America, at any level, that accepts bond payments in Google Play gift cards. There is no legitimate government agency, court system, bail bondsman, or attorney who will ask you to purchase gift cards and read them codes over the phone. Gift cards are demanded because they are functionally untraceable and completely irreversible. Once those codes are read over the phone, the money is gone. No bank can claw it back. No fraud investigation will recover it. The criminals know this. The demand for gift cards is itself the proof of fraud.</p>

    <h3>Protecting Your Elderly Relatives</h3>

    <p>The most effective protection is the family code word system, which we will detail in Chapter 6. But there are additional steps worth taking now:</p>

    <ul>
      <li><strong>The family emergency contact rule:</strong> Establish in advance — at a family dinner, in a phone call, in a family group text — that any family emergency requiring money will always be verified through a second family member. Not because you don't trust the person calling. Because you know that criminals can clone voices, and verification is the only way to be sure.</li>
      <li><strong>The always-call-back rule:</strong> For any call involving an emergency or a request for money, always hang up and call the person back on their known number. If it was really Marcus, Marcus can be reached on his regular cell phone. If the "emergency" somehow prevents that, that is itself a red flag.</li>
      <li><strong>The gift card rule:</strong> Teach every older adult in your family a single sentence: "No legitimate emergency requires gift cards." If anyone asking for help specifically requests gift cards, wire transfers, cryptocurrency, or Venmo, it is a scam without exception.</li>
      <li><strong>The no-shame conversation:</strong> Talk to your elderly relatives about this before it happens. Earl felt like a fool. He shouldn't have. But the shame of being victimized prevents people from reporting, which prevents others from being warned. Tell your family explicitly: this scam is sophisticated, it fools smart people, and being victimized by it is not a sign of diminished capacity. It is a sign of having a loving heart.</li>
    </ul>

    <p>These conversations are not comfortable. They require acknowledging a vulnerability, having a frank discussion about technology with people who may resist it, and potentially navigating the hurt feelings of an older relative who hears the subtext as "I don't trust your judgment." But Earl's $8,000 is gone. The discomfort of the conversation is infinitely preferable to the aftermath of the call.</p>
    </article>`,
  },
  {
    chapter_number: 5,
    chapter_title: "How Criminals Get Your Voice — and How to Reduce Your Exposure",
    page_start: 53,
    page_end: 63,
    content_html: `<article class="chapter-content">
    <h2>Chapter 5: How Criminals Get Your Voice — and How to Reduce Your Exposure</h2>

    <p>There is a question that comes up whenever families learn about voice cloning scams: where do the criminals get the voice samples? The answer, unfortunately, is everywhere — and most of it is freely and publicly available because we put it there.</p>

    <p>This chapter is not meant to make you feel surveilled or paranoid. It is meant to help you understand the actual exposure landscape so that you can make informed decisions about what to post, what to share, and what to adjust. The goal is not to disappear from the internet. The goal is to think about your voice the way you might think about your home address: something you don't need to publish in every public space, even when you have nothing to hide.</p>

    <h3>Where Your Voice Lives Online</h3>

    <p>Start with the most common and overlooked source: voicemail greetings. Right now, millions of Americans have a voicemail greeting that says their name, their number, and asks callers to leave a message. That greeting is accessible to anyone who calls the number, including criminals who systematically call numbers from data breach lists. If the greeting says "You've reached Eleanor Hartwell at 614-555-XXXX" — that is a voice sample with a name attached, which is exactly what a scammer needs to begin building a targeted profile.</p>

    <p>Social media videos are the next major source. Think about what your family posts on Facebook, Instagram, TikTok, and YouTube. Holiday gatherings. Birthday parties. Graduations. Church performances. Local events. The community parade where someone's grandmother was interviewed by a local TV station's social media team. A Sunday dinner video that got thirty likes and was forgotten about. Each of these contains voice audio. Each of them, if publicly accessible, is a potential sample.</p>

    <p>Ohio provides some particularly common scenarios. Church communities in the Dayton and Columbus areas regularly livestream services on Facebook — often with the video remaining publicly accessible afterward. A senior congregation member who regularly participates visibly in services, who gives a testimonial or reads a passage, might have ten minutes of clear, emotionally resonant voice audio publicly available and easily downloadable. Local news channels frequently post community interest clips to their social media feeds — a neighbor commenting on a zoning issue, a retiree at a city council meeting, a grandparent at a school event. High school graduation ceremonies in Ohio are routinely filmed and posted by proud families; the grandparents visible and audible in those videos are sources of voice samples.</p>

    <p>YouTube channels maintained by family members, community organizations, or local businesses often contain video of the same individuals repeatedly. A few hours of content featuring the same person is more than sufficient for a high-quality voice model.</p>

    <h3>How Little Is Too Much</h3>

    <p>Here is the uncomfortable arithmetic: a competent criminal working with modern voice cloning tools needs approximately ten seconds of clear audio to begin building a functional voice model. Thirty seconds produces a model that can fool most people in a high-stress phone call. A few minutes of audio produces a model nearly indistinguishable from the original.</p>

    <p>Almost every public-facing social media profile belonging to an active adult over 60 in America today contains at least thirty seconds of clear voice audio. Many contain several minutes. Some contain hours. The exposure, for most families, is not a question of whether voice samples are available — it is a question of how much.</p>

    <h3>What You Can Reasonably Do</h3>

    <p>The reasonable goal here is reduction, not elimination. You cannot scrub all of your voice from the internet, and attempting to do so would require giving up participation in modern digital life in ways that are neither practical nor necessary. But you can take specific, meaningful steps that reduce the ease of access to high-quality samples:</p>

    <ul>
      <li><strong>Change your voicemail greeting.</strong> Replace a greeting that includes your name with a simple "Please leave a message after the tone" or "You've reached this number." An unnamed greeting eliminates the name-voice pairing that makes a sample immediately useful. This takes two minutes and costs you nothing.</li>
      <li><strong>Review the privacy settings on your social media accounts.</strong> On Facebook, most privacy settings can be adjusted to "Friends only" for posts and videos. If your grandmother has Facebook, her videos should not be visible to the general public. Instagram accounts can be set to private. TikTok videos can be restricted. This limits the pool of people who can access video content of your family members to people who are already connected to them.</li>
      <li><strong>Consider what you post publicly.</strong> Not everything needs to go on public social media. A family birthday video can be shared privately with family members rather than posted publicly for the world to see and index. This doesn't mean not sharing — it means being intentional about who can see what.</li>
      <li><strong>Talk to your church or community organization.</strong> If your elderly relatives participate in livestreamed events, ask whether the videos need to be public after the broadcast. Many churches post their services publicly as a ministry. This is valuable. It is also a source of voice samples for every regular participant. Some churches have added simple notices about this; others have moved to password-protected viewing for recorded archives.</li>
    </ul>

    <h3>What You Cannot Reasonably Do</h3>

    <p>You cannot eliminate your family's voice presence from the internet entirely. You cannot prevent every possible recording. You cannot ensure that no one who ever recorded a holiday gathering posted a clip somewhere. News coverage, public records, phone directories, community event recordings — voices end up in digital spaces in ways that are beyond any individual's control.</p>

    <p>This is why the defensive strategies in the following chapters — the code word, the callback rule, the verification protocol — are so important. They are not dependent on reducing exposure. They work even if a criminal has a perfect voice clone of everyone in your family. They work because they move authentication from the voice to a shared secret that the voice cannot reproduce.</p>

    <h3>The Family Conversation</h3>

    <p>The most useful action you can take from this chapter is not technical. It is having a specific conversation with your family about their social media habits and their voicemail greetings. This conversation does not need to be alarming. You can frame it simply: "I read something about voice cloning scams and I wanted to share some simple things our family can do to be safer. Can we talk about it?"</p>

    <p>Older relatives, in particular, are often more receptive to these conversations than younger family members assume. They may not fully understand the technology, but they understand being deceived, and they understand protecting their family. Lead with the practical steps — the voicemail greeting change, the privacy settings review — rather than with the technology explanation. The goal is action, not comprehension of the underlying mechanism.</p>
    </article>`,
  },
  {
    chapter_number: 6,
    chapter_title: "The Family Code Word System",
    page_start: 64,
    page_end: 74,
    content_html: `<article class="chapter-content">
    <h2>Chapter 6: The Family Code Word System</h2>

    <p>Here is the single most important piece of practical advice in this book, and you can implement it before you finish this chapter: choose a family code word and share it with the people you love.</p>

    <p>The code word is simple. It is memorable. It costs nothing to set up. It requires no technology. And it defeats voice cloning completely, because a machine can replicate a voice perfectly and still not know what your family decided over Sunday dinner.</p>

    <h3>How the Code Word Works</h3>

    <p>The system operates on one principle: there is a specific word or short phrase that every member of your family knows, that no one outside the family knows, and that any family member can request from any caller claiming to be a family member in an emergency. If the caller can provide the word, the call is almost certainly genuine. If the caller cannot provide the word, or if the call is coming from a voice but the response is a strange silence, a changed subject, or an implausible excuse — hang up and call back on the known number.</p>

    <p>The code word is not a name. It is not a birthday. It is not something that could be guessed or researched from public information. It is something specific and arbitrary: a word that has meaning to your family, or no particular meaning at all, that has been agreed upon in advance.</p>

    <p>Good code words: a family nickname for a pet that passed away years ago, an inside reference from a family trip, a word that one family member invented or mispronounced as a child, a word with no obvious connection to any member of the family — "pineapple," "Kettering," "tangerine," "Dayton Flyers," the name of a childhood home's street. The best code words are ones that your family will remember but that a scammer reading your social media would never think to include in a script.</p>

    <p>Bad code words: your maiden name, an address, a phone number, anything that appears in public documents, anything that has been mentioned in social media posts, anything predictable ("our family color," "dad's favorite team" when dad has clearly stated his team publicly).</p>

    <h3>Setting It Up: Step by Step</h3>

    <p>Choose the moment deliberately. A family gathering, a phone call chain, a family group text thread — whatever format your family uses to share information. The code word needs to reach every person who might be called: adult children, spouses, grandparents, older teenagers who have their own phones and could be targeted. The setup takes five minutes.</p>

    <p>Say something like: "I want to share something that could protect our family. I've been reading about AI voice cloning scams — calls where criminals use technology to make their voice sound exactly like someone we know. I want us to have a code word that anyone can use to verify they're really talking to a family member. The word is [your chosen word]. If you ever get a call from someone claiming to be family and asking for money or help, ask for the code word. If they can't give it, hang up and call us back."</p>

    <p>Write it down somewhere secure — not in your phone contacts, not in a notes app, somewhere physical where you will find it. The people who most need the code word system are often the people who would be least able to remember it in a high-stress situation. A card in a wallet, a note on the refrigerator — practical and retrievable.</p>

    <h3>Having the Conversation with Elderly Relatives</h3>

    <p>The most important recipients of the code word are often the most complicated to deliver it to. Older adults — the primary targets of voice cloning scams — sometimes resist conversations about fraud protection because they hear an implication that their judgment cannot be trusted. The way you frame this conversation matters.</p>

    <p>Do not begin with "There are scammers who target people your age." Begin with your own vulnerability: "I read about a scam that almost got someone my age, and it made me think our whole family needs to be more careful." Do not present the code word as a safeguard against poor judgment. Present it as a safeguard against extraordinary technology: "The voice cloning is so good that it's fooling people who should know better. The code word is protection for all of us, not just you."</p>

    <p>Reinforce the code word by using it. The next time you call your elderly relative, give them the code word proactively, before they ask for it. "By the way, Mom, it's the real me — pineapple." This normalizes the system and demonstrates that using it is not shameful or cumbersome. It is just something your family does now.</p>

    <h3>The Code Word in Practice: Scenarios</h3>

    <p>A call comes in claiming to be from your grandson. The voice sounds right. The story involves an emergency. You feel the pull of urgency. You ask: "Can you give me the family word?" If the caller is genuinely your grandson, he will give it immediately. If the caller is a scammer, several things might happen: silence, an excuse ("I forgot it," "I never knew it"), anger designed to shame you into continuing ("You don't trust me?"), or a pivot to another manipulation. None of these outcomes are what your grandson would do. Your grandson would say "pineapple" without hesitation.</p>

    <p>A call comes from someone claiming to be a lawyer or law enforcement official about a family member. Ask for the family member directly. If the family member is "unavailable," tell the caller you will call back and hang up. Then call the family member on their known number. Do not call back any number the suspicious caller provided. Do not be moved by urgency.</p>

    <h3>The Pause, Verify, Act Framework</h3>

    <p>The code word is one component of a broader decision framework for any call involving an emergency or a request for money or personal information:</p>

    <ul>
      <li><strong>Pause:</strong> Do not act immediately. Tell the caller you will call them back. If the situation is genuinely an emergency, sixty seconds of verification will not change the outcome. If the caller insists you cannot hang up, that insistence is itself a red flag. Legitimate emergencies accommodate sixty seconds.</li>
      <li><strong>Verify:</strong> Call the person the caller claimed to be on their known number. Call a family member who would know about a real emergency. Ask for the code word. Check a second source before acting.</li>
      <li><strong>Act:</strong> Only after verification. If you've confirmed through a trusted second channel that the emergency is real, then help. If you cannot confirm, do not act on the original call.</li>
    </ul>

    <p>The framework is simple to describe and genuinely difficult to follow in a moment of high emotional stress. That is why the code word matters: it gives you a specific, concrete step to execute in the pause stage, something you can do even when your hands are shaking and your heart is already with the person you love who you believe is in trouble. Ask for the word. Wait for the word. The word is the test.</p>

    <h3>Code Word Maintenance</h3>

    <p>Change the code word once a year, or any time there is reason to believe it may have been compromised. A scammer who successfully extracted the code word from one target could use it against others. A family member who has been victimized should be gently asked if they ever provided the word during the scam call. If so, change it family-wide and treat the change as routine security hygiene rather than a blame event.</p>
    </article>`,
  },
  {
    chapter_number: 7,
    chapter_title: "Protecting Children and Teenagers from Deepfakes",
    page_start: 75,
    page_end: 87,
    content_html: `<article class="chapter-content">
    <h2>Chapter 7: Protecting Children and Teenagers from Deepfakes</h2>

    <p>When most people think about deepfake victims, they picture adults — grandparents targeted by voice cloning, lonely widows in romance scams. But minors face a set of deepfake-related harms that are distinct, severe, and urgently important for parents to understand. The threats against children are different from the financial fraud targeting adults. They center on reputation, psychological harm, and — in the most serious cases — the creation of non-consensual intimate imagery that is one of the most devastating forms of digital abuse.</p>

    <h3>The Specific Risks Facing Minors</h3>

    <p>The most serious risk is AI-generated non-consensual intimate imagery, sometimes abbreviated NCII. This involves taking real photos of a minor — photos from social media, a school website, a sports team photo, a completely innocent family picture — and using AI to place that minor's face onto fabricated explicit content. This technology has been used against teenagers in schools across the United States, including in Ohio. In documented cases, students have created and distributed AI-generated NCII of classmates, causing devastating psychological harm to the victims and their families.</p>

    <p>This is not a theoretical concern. It is happening in schools with children as young as twelve and thirteen. The perpetrators in documented cases have been peers — other students who used consumer AI tools that required no technical skill. The barriers to this particular form of abuse have collapsed.</p>

    <p>Beyond NCII, deepfakes threaten minors through synthetic impersonation — creating fake social media profiles using a real child's photos to spread rumors, bully them, or manipulate their peers. A fake account that looks like your child, posting things your child never said, is a tool of social destruction that can upend their school experience. AI-generated fake messages purportedly from trusted adults — teachers, coaches, family friends — can be used to manipulate minors into dangerous situations or to extract personal information.</p>

    <h3>Age-Appropriate Conversations</h3>

    <p>For children ages 8 through 12, the conversation does not need to be alarming or technical. It needs to plant two durable ideas: not everything you see online is real, and you can always come to a trusted adult if something seems wrong.</p>

    <p>You can say something like: "You know how movies can make it look like characters are doing things they couldn't really do? Computers can now make it look like real people are doing or saying things they never did. So if you ever see a photo or video of someone you know that seems weird or wrong, come tell me before you do anything else. You're not in trouble. You just need to tell me." This framing preserves the child's sense of safety, establishes a reporting channel, and doesn't burden them with technical detail they don't need.</p>

    <p>For teenagers ages 13 through 17, the conversation can and should go deeper. Teenagers are both potential victims and potential perpetrators. They need to understand not just that deepfakes exist, but why people make them, what the legal consequences are, and how to respond if they are targeted.</p>

    <p>Ohio law on non-consensual intimate imagery is relevant here. Ohio Revised Code 2917.211 criminalizes the nonconsensual distribution of private sexual images, and Ohio has updated its statutes to address AI-generated content. As of 2026, Ohio law addresses deepfake intimate imagery, and perpetrators — including minors in some circumstances — can face criminal consequences. Teenagers should know this explicitly. The impulse to create or share AI-generated NCII of a classmate needs to encounter the clear understanding that it is a crime with real legal consequences, not just a social transgression.</p>

    <p>Teenagers should also understand the landscape of detection and reporting. If someone shares a deepfake of you, that is not something to be ashamed of. It is something to report — to a parent, to a school administrator, to the platform where it appeared, and potentially to law enforcement.</p>

    <h3>What to Do if Your Child Is Targeted</h3>

    <p>If you discover that your child has been the subject of deepfake abuse — NCII, impersonation, or other synthetic manipulation — the steps are specific and important:</p>

    <ul>
      <li><strong>Preserve evidence first.</strong> Before reporting to the platform, take screenshots of everything: the image or video itself, the account that posted it, any comments, the URL. Platforms remove content when reported, which is good, but the evidence disappears with it. Save everything before taking any further action.</li>
      <li><strong>Report to the platform.</strong> Every major social media platform has a reporting mechanism for non-consensual intimate imagery and impersonation. Use it. Platforms are legally obligated to respond to these reports and most have dedicated trust and safety teams for NCII.</li>
      <li><strong>Report to the school.</strong> If the perpetrator is a student or the incident is occurring within a school community, the school administration needs to be involved. Ohio schools are required to have policies on cyberbullying that encompass this kind of harm.</li>
      <li><strong>Consider reporting to law enforcement.</strong> Ohio law provides criminal remedies for deepfake NCII. The decision to pursue criminal reporting involves considerations specific to your situation; an attorney or victim advocate can help you think through it.</li>
      <li><strong>Protect your child's emotional wellbeing.</strong> The discovery that deepfake NCII of you exists is a deeply traumatic experience. Children and teenagers who experience this need to hear clearly and immediately that this is not their fault, that they did nothing wrong, and that the shame belongs entirely to the person who created it. Mental health support should be considered.</li>
    </ul>

    <h3>The Social Media Footprint Conversation</h3>

    <p>Parents make decisions constantly about posting photos of their children publicly. A graduation photo, a sports victory, a first day of school, a family vacation — these are normal expressions of family pride and connection. But a public social media post containing clear photos of a minor is a potential source of training data for deepfake systems.</p>

    <p>This does not mean you should never post photos of your children. It means considering whether those posts need to be public. On Facebook, Instagram, and most other platforms, you can share the photos with your network — friends, family, people you actually know — without making them publicly accessible to the entire internet. The setting change takes seconds. The protection is meaningful.</p>

    <p>For teenagers who have their own social media accounts, this becomes a conversation rather than a parental decision. Teenagers are establishing their own digital identities, and rigid restrictions on social media participation are often counterproductive. A better approach is to help them understand what public-facing content means in the context of deepfake risk — not to frighten them, but to give them genuinely useful information for making their own decisions. A teenager who understands why their account settings matter is more likely to maintain them than one who was simply told to.</p>

    <h3>Monitoring Tools and Parental Controls</h3>

    <p>There are legitimate monitoring tools available to parents — apps that filter content, track location, or alert parents to concerning online activity. These tools have a place, especially for younger children. But for teenagers, heavy surveillance often damages the trust relationship that is ultimately more protective than any software filter. A teenager who knows they can tell a parent about something alarming they encountered online — because that parent has demonstrated a non-punitive response — is safer than a teenager who hides everything to avoid losing their phone.</p>

    <p>The most effective monitoring tool is an ongoing, honest, non-judgmental conversation. It does not require any app. It requires showing up consistently, responding to disclosures without overreaction, and making clear that your child's safety is always more important than your comfort with what you might hear.</p>
    </article>`,
  },
  {
    chapter_number: 8,
    chapter_title: "Romance Scams and AI-Generated Personas",
    page_start: 88,
    page_end: 100,
    content_html: `<article class="chapter-content">
    <h2>Chapter 8: Romance Scams and AI-Generated Personas</h2>

    <p>Loneliness is not a character flaw. It is a human experience that intensifies after loss — the loss of a partner, the end of a long marriage, the quiet that settles into a house when children have grown and moved away. And loneliness is the condition that AI-assisted romance scammers have learned to identify and exploit with extraordinary precision.</p>

    <p>The romance scam predates AI entirely. People have been impersonating romantic partners for financial gain since the first letter-writing fraud in history. But AI has transformed what was once a labor-intensive, skill-dependent scheme into something that can be run at scale, with minimal investment, targeting vulnerable people with synthetic emotional intimacy that is nearly indistinguishable from the real thing.</p>

    <h3>Robert's Story</h3>

    <p>Robert is 68 years old and lives in Canton, Ohio. He spent thirty-nine years as a machinist at a manufacturing plant before he retired. His wife of forty-one years, Patricia, passed away eighteen months before the story we are about to tell. His two adult children live out of state. His social life had contracted in the years since Patricia's decline, and the months after her death were quiet in a way that sometimes felt physical, like pressure behind the eyes.</p>

    <p>In November, Robert received a Facebook friend request from a woman named Christine. Her profile photo showed a woman in her early sixties — warm smile, well-dressed, the kind of photo that communicates both approachability and success. Her profile said she was from Toronto originally, now living in Ottawa, working as an interior designer. They had three mutual friends — people Robert knew vaguely from a regional manufacturing group he was part of on Facebook.</p>

    <p>Robert accepted the request. Christine messaged him within a day. She had noticed his profile and was impressed by his background in manufacturing — her late father had worked in a similar industry and she had always admired people who built things with their hands. She asked about his work. She asked about his family. Her messages were warm and curious and showed that she had actually read what he'd written, because she referenced specific things he'd said in later messages. She did not rush anything.</p>

    <p>Over the following weeks, the messages became daily. Christine shared her own story: widowed four years ago, her husband had been a kind man but they had grown apart in the last years of the marriage; her children were grown and busy; she had her work, which she loved, and her friends, but there was a loneliness to her life that she was only beginning to acknowledge. Robert recognized this loneliness immediately. He understood it from the inside.</p>

    <p>When he suggested a phone call, Christine was warm but a little hesitant — she preferred to communicate by message at first, she said, she'd been hurt before. A few weeks later they did speak by phone. Her voice was exactly what her messages had suggested: thoughtful, slightly reserved, with a hint of a Canadian accent and a laugh that sounded like she'd been holding it back. She called him "Robert" and not "Bob," which he appreciated; Patricia had always called him Robert.</p>

    <p>By February — three months into the relationship — Robert was more emotionally invested in Christine than he had been in anything since Patricia's death. He thought about her throughout the day. He told his daughter that he had met someone online and it was going well, though he was being careful. His daughter asked if they had met in person yet. Not yet, Robert said. Christine had a project in Vancouver that kept getting extended. She was coming to Ohio in the spring.</p>

    <p>In March, the crisis came. Christine's biggest client — a real estate developer she had worked with for years — had suddenly frozen the payment on a major project she had completed. She was owed $180,000 and the dispute was going to take months to resolve legally. In the meantime, she had a staff payroll due and a materials invoice that could not wait. She was mortified to be in this situation. She had never asked anyone for anything like this. Could Robert lend her $15,000 just until the payment cleared? She would repay him with interest. She would transfer the money to him the moment the developer paid her, which her lawyer expected to happen within thirty days.</p>

    <p>Robert almost sent the money. He had $15,000 in a savings account. He had spent four months building a relationship with this woman. He loved her. He almost sent it.</p>

    <p>His daughter called the night before he was planning to make the transfer. She had been uneasy about the situation for weeks and had done some research. She asked Robert to do a reverse image search on Christine's profile photo. He did it, right there on the phone with his daughter walking him through it. The photo returned no matches — because AI-generated photos return no matches. They exist nowhere else on the internet.</p>

    <p>His daughter then asked if they had ever had a video call that was clear and in real time. Robert thought about it. There had been video calls, but they had always been blurry, freezing, poor quality. Christine always blamed her internet connection. Robert had assumed it was a technology issue. His daughter recognized it for what it was: a deepfake video, too unstable to hold up under real scrutiny, just plausible enough to pass in short clips.</p>

    <p>Robert did not send the money. He was not victimized financially. He was, however, devastated — not primarily because he had nearly lost $15,000, but because he had spent four months loving someone who did not exist. Every warm exchange, every understanding word, every moment of connection had been algorithmically generated to feel real. The grief of losing that relationship, he later told his daughter, was not so different from the grief of losing Patricia. It was the loss of a person. The fact that the person was never there to begin with did not make the feeling less real.</p>

    <h3>How AI-Assisted Romance Scams Work</h3>

    <p>The modern AI-assisted romance scam assembles several technologies into a coherent deception. The profile photo is AI-generated — no reverse image search will find it. The messages are AI-written, using large language models that produce warm, emotionally attuned responses that adapt to what the victim shares. The voice for phone calls is cloned from audio samples gathered online. The "video calls" use AI-generated video or carefully managed low-quality clips that are just good enough to prevent abandonment. The entire persona is synthetic, maintained by one or more human operators who may be running dozens of these relationships simultaneously.</p>

    <h3>Warning Signs</h3>

    <ul>
      <li><strong>Never meets in person.</strong> There is always an obstacle — a work commitment abroad, a family crisis, a project that keeps extending, a health issue. If a relationship has developed significantly over months with no in-person meeting and no clear, specific plan for one, this is a significant warning sign.</li>
      <li><strong>Video calls are always problematic.</strong> The internet is always bad on their end. The camera is always broken. The calls are always brief and low quality. This protects the deepfake from extended scrutiny.</li>
      <li><strong>Financial requests follow the emotional investment.</strong> There is always a period of building trust and attachment before any money request. The first request is often framed as an emergency, an aberration, something deeply embarrassing to ask for. It is followed by others.</li>
      <li><strong>Isolation from family and friends.</strong> The scammer often discourages sharing the relationship with others, framing it as a desire for privacy, or expressing hurt when the victim consults family about the relationship.</li>
    </ul>

    <h3>How to Verify an Online Romantic Interest</h3>

    <p>Reverse image search every profile photo. A real person's photos will return matches on other accounts, or their own public social media. AI-generated photos will return nothing, because they exist nowhere else. Photos stolen from a real person will return matches on accounts with a different name.</p>

    <p>Insist on a live, real-time video call at a time of your choosing. Tell them the time five minutes before, so there is no opportunity to prepare a clip. Ask them to hold up a piece of paper with a word you specify, in real time. AI real-time video deepfakes exist but are significantly harder to deploy convincingly than audio cloning; a live, spontaneous video call remains one of the most effective verification tools available.</p>

    <p>Ask specific, local knowledge questions. A person who claims to be from Toronto should know specific things about Toronto — neighborhoods, transit systems, local landmarks — that a generic script would not include. Knowledge gaps in specific local detail are a warning sign.</p>

    <p>Never send money, regardless of how real the relationship feels. This is the rule without exception. No genuine romantic interest who cares about you will place you in a situation where your love for them requires a wire transfer. Any financial request, in any relationship conducted primarily online, should be treated as a red flag requiring extensive verification before any action.</p>
    </article>`,
  },
  {
    chapter_number: 9,
    chapter_title: "Political Deepfakes and Information Integrity",
    page_start: 101,
    page_end: 112,
    content_html: `<article class="chapter-content">
    <h2>Chapter 9: Political Deepfakes and Information Integrity</h2>

    <p>Not every deepfake is trying to take your money. Some are trying to take something harder to recover: your accurate understanding of the world. Political deepfakes — AI-generated or AI-manipulated content designed to distort political reality — are increasingly common, increasingly sophisticated, and operating in an environment already saturated with genuine political conflict that makes distinguishing real from fake genuinely difficult.</p>

    <p>This chapter is not about politics. It is about the specific threat that AI-generated media poses to your ability to make informed judgments, regardless of what political beliefs you hold. The same tools that create fake grandmothers can create fake politicians. The same principles that protect you from financial fraud can protect you from informational manipulation.</p>

    <h3>Ohio as a Target</h3>

    <p>Ohio's significance as a perennial swing state in national elections makes it a particularly high-value target for political manipulation campaigns. Affecting a few hundred thousand voters in key Ohio counties has historically been sufficient to shift electoral outcomes with national consequences. This means that when AI-generated political content is deployed for maximum impact, Ohio is consistently in the crosshairs.</p>

    <p>The playbook for political deepfakes typically involves one of several approaches. Fake video of a candidate saying something inflammatory or disqualifying — either fabricated entirely or manipulated from real footage — circulated on social media with inflammatory framing. Synthetic audio presented as a secret recording of a political figure making embarrassing or incriminating statements. AI-generated "news articles" with made-up quotes attributed to real public figures. Fake endorsements — video or audio of a respected figure appearing to endorse a candidate or position they actually oppose.</p>

    <p>These pieces of content do not need to be believed by everyone to be effective. They need to create enough confusion and doubt that voters are uncertain about what is real. The goal is often not to change minds but to suppress certainty, to make people feel that they cannot know the truth and therefore might as well stay home or vote on gut feeling rather than research.</p>

    <h3>The SIFT Method</h3>

    <p>The most practical media literacy framework for the current information environment is SIFT, developed by digital literacy educator Mike Caulfield. It stands for Stop, Investigate the source, Find better coverage, Trace claims to their origin.</p>

    <p><strong>Stop:</strong> Before engaging with content — before sharing it, reacting to it, forwarding it, making a decision based on it — stop. The impulse to immediately react is exactly what the creators of manipulative content are counting on. Your emotional response, whether outrage or joy or alarm, is the intended first action. Pausing interrupts that sequence.</p>

    <p><strong>Investigate the source:</strong> Who created this content? Where did it first appear? Is the source an established news organization with a track record of accuracy and accountability, or is it an account created last month with no history? What do you actually know about the outlet or person presenting this? Investigating the source often takes less than sixty seconds and will filter out a significant proportion of AI-generated political content.</p>

    <p><strong>Find better coverage:</strong> If a piece of content is making a significant factual claim — a politician said something notable, an event occurred, a study proved something — look for coverage of that claim from multiple established news sources. If a video of a politician saying something extraordinary is circulating widely but no major news organizations are covering it, that absence is informative. Genuine newsworthy statements by major political figures are covered by multiple credible outlets. Content that only exists in one place, or only on social media, deserves significant skepticism.</p>

    <p><strong>Trace claims to their origin:</strong> Follow the chain back to the original source of a claim. "My cousin forwarded this video" is not a source. "A social media account posted this clip" is not a source. Find where the claim or video first appeared and evaluate that original context before accepting or sharing.</p>

    <h3>The Emotional Reaction Pause</h3>

    <p>There is a specific practice worth building into your information consumption habits: before you share, forward, or act on any piece of political content that produces a strong emotional reaction — outrage, vindication, alarm, triumph — wait ten minutes and verify the source.</p>

    <p>This practice is grounded in how manipulation works. Content designed to deceive is almost always designed to provoke. The stronger your emotional reaction, the more skeptical you should be, not because strong reactions are always wrong, but because genuine content and manufactured content both exist in the emotional space, and manufactured content is specifically engineered to get there first. The ten-minute pause is not about suppressing your response. It is about giving the rational mind ten minutes to catch up with the emotional one.</p>

    <p>The "if this were true I'd expect it everywhere" test is a related heuristic. If a sitting governor said something genuinely outrageous or disqualifying on camera, the video would be covered by every major news outlet in Ohio within hours. If you see a clip that is supposedly from a major figure but is only circulating on social media with no news coverage, ask yourself why. The answer is usually either that the content is fabricated, or that it is being misrepresented in context.</p>

    <h3>Talking to Family Members Who Share Deepfakes</h3>

    <p>One of the more delicate challenges of the current moment is navigating situations where a family member shares political content that you believe to be AI-generated or false. Direct confrontation rarely works. "That's fake" tends to produce defensiveness rather than reconsideration, because the person who shared it has attached their judgment and their values to the content. Challenging the content can feel like challenging them.</p>

    <p>A more effective approach is curious inquiry. "Where did you see this? I'm curious who made the original video." "I tried to find news coverage of this and couldn't find anything — do you know where it was first reported?" These questions do not accuse. They invite collaboration in finding out what's true, rather than setting up an argument about who is right. They also model the kind of source-checking that is useful for everyone.</p>

    <p>If a family member shares something and then discovers it was fabricated, respond with grace rather than victory. "I'm glad we checked" is more useful than "I told you so." The goal is not to win the argument. The goal is to build a family culture of verification that protects everyone.</p>

    <h3>What Is Coming: Watermarks and Provenance</h3>

    <p>There are serious efforts underway to build technical solutions to the deepfake problem. Content provenance standards — systems that attach verifiable metadata to media at the point of creation, establishing a chain of custody from camera to viewer — are being developed by coalitions of news organizations, technology companies, and research institutions. The Coalition for Content Provenance and Authenticity (C2PA) has established technical standards that some media organizations and camera manufacturers are beginning to adopt.</p>

    <p>These systems will help, eventually. They will not help immediately, and they will not catch all manufactured content — a deepfake video that does not go through the provenance system will simply lack the provenance tag, which is informative but not conclusive. The behavioral skills in this chapter — the SIFT method, the emotional reaction pause, the source investigation — are durable because they do not depend on any technological standard being universally adopted.</p>
    </article>`,
  },
  {
    chapter_number: 10,
    chapter_title: "Your Family's Deepfake Defense Plan",
    page_start: 113,
    page_end: 130,
    content_html: `<article class="chapter-content">
    <h2>Chapter 10: Your Family's Deepfake Defense Plan</h2>

    <p>You have now read about voice cloning and how it works. You have heard about Earl in Springfield and the $8,000 in gift cards, about Margaret in Toledo and six months spent loving a person who never existed, about Robert in Canton who almost sent money to a synthetic woman named Christine. You understand how deepfake videos are created, how political manipulation campaigns deploy AI-generated media, how children can be victimized by the same technology that enables financial fraud. You understand the code word and the callback rule and the emotional mechanism the scammers exploit.</p>

    <p>Now the question is: what are you going to do with what you know?</p>

    <p>This chapter is your action guide. Not a list of abstract recommendations, but a practical plan organized by timeline, because the difference between understanding a threat and being protected from it is the specific actions you take this week, and then the habits you build over the months and years that follow. Technology will keep advancing. The specific tools scammers use will evolve. The principles that protect your family will not.</p>

    <h3>Section 1: Immediate Actions — This Week</h3>

    <h3>Step 1: Set Up the Family Code Word</h3>

    <p>Before you do anything else on this list, do this. Right now, if possible — put down this book and send a family group text. If you do not have a family group text, this is a good week to start one. The message can be simple:</p>

    <p>"I've been reading about AI voice cloning scams — technology that can make a computer sound exactly like a family member calling for help. I want us all to be protected. I'm proposing we use a family code word that anyone can ask for if a call seems suspicious. My suggestion is [your chosen word]. Reply if you're okay with this word, or suggest something else. This only works if everyone knows it."</p>

    <p>If you have elderly relatives who are not in a group text, call them personally. This conversation deserves a phone call. Walk them through the code word, explain why it matters using the story from this book — Earl's story tends to land well with older adults — and end the call by confirming they have the word somewhere they will find it.</p>

    <p>Your code word should be memorable, specific to your family, and not obvious from any public information about you. If you're struggling to choose one, here are a few approaches: a word one of your children mispronounced as a toddler that became a family word (these are often perfect — deeply memorable, completely unknown outside the family), a specific detail from a memorable family trip, or simply an arbitrary but memorable word that you agree on now — "tangerine," "Bowling Green," "the blue umbrella."</p>

    <h3>Step 2: Review Social Media Privacy Settings</h3>

    <p>On Facebook, go to Settings and Privacy, then Privacy Settings. Set "Who can see your future posts" to Friends. Review past posts using the "Limit Past Posts" option to change all past posts from Public to Friends. Go to Profile Settings and review what is publicly visible on your profile — your profile photo is almost always public by default, which is worth knowing but acceptable. The video content is more important. Consider reviewing and restricting your most video-heavy posts, especially any that feature elderly relatives.</p>

    <p>On Instagram, go to your profile, tap the three lines, select Settings and Privacy, then Account Privacy. Toggle "Private Account" on if you are comfortable with it. If you want to keep a public account for professional or community reasons, that is a reasonable choice — but be aware that your public content is accessible to anyone.</p>

    <p>On TikTok, go to Settings and Privacy, then Privacy. Set your account to Private if you are primarily using the platform for personal content rather than public creation. Review your existing videos and consider whether any of them should be Friends Only rather than public.</p>

    <h3>Step 3: Change Voicemail Greetings</h3>

    <p>Call every elderly relative in your family and ask them what their voicemail greeting says. If it includes their name, help them change it to something anonymous — "You've reached this number, please leave a message" — or help them do it yourself if you're able to. Then check your own greeting. If your voicemail greetings include your name, remove it. This is a small change with meaningful protective value.</p>

    <h3>Step 4: Have the Verification Conversation</h3>

    <p>Using the language from Chapter 4 and Chapter 6, have a direct conversation with the elderly adults in your family about what to do if they receive a call from a family member in trouble. You can use this script as a starting point:</p>

    <p>"I want to talk to you about something important. There are scammers right now who use AI to make their voice sound exactly like someone you love — a grandchild, a nephew, a close friend. The calls sound completely real. If you ever get a call from someone claiming to be family and asking for money — especially if they want gift cards, or if they say not to tell anyone — I want you to do one thing before anything else: ask for our code word. If they can't give it, hang up and call me directly. You're not in trouble. You didn't do anything wrong. You're just verifying. And remember: no real emergency needs gift cards."</p>

    <h3>Section 2: Ongoing Habits</h3>

    <h3>Regular Family Security Check-Ins</h3>

    <p>Treat family security like any other thing you maintain: make it regular rather than reactive. Once every few months — perhaps at a seasonal family gathering, or in a family group text thread — check in about the following: Has anyone received a suspicious call, text, or message? Has anyone been asked for money or gift cards under unusual circumstances? Does everyone still remember the code word? Have circumstances changed — new elderly relatives, changes in living situations, teenagers who now have their own accounts and phone numbers — that require updating the protection plan?</p>

    <p>These check-ins do not need to be formal or alarming. "Quick security check: we haven't had any weird calls or scam attempts, have we? Just making sure everyone's good" in a group text takes thirty seconds and creates a communication channel that makes future conversations easier.</p>

    <h3>The Decision Flowchart for Suspicious Contacts</h3>

    <p>When a contact arrives — call, text, email, message — that involves a claimed emergency, a request for money, a request for personal information, or anything that produces a feeling of urgency, work through the following:</p>

    <p>First question: Is this contact expected? Did I know this person was going to reach out? If no, proceed with heightened caution.</p>

    <p>Second question: Is this request something this person would normally make through this channel? Would my grandson normally ask me for money through a cold phone call without warning? If no, treat as suspicious.</p>

    <p>Third question: Is there urgency that prevents verification? Am I being told I cannot hang up, cannot call other family members, cannot take time to think? If yes, this is a manipulation tactic. Hang up.</p>

    <p>Fourth question: Can I verify this through a second channel? Can I call the person on their known number, text a family member who would know about a real emergency, use the code word? If yes, do so before any action. If the verification fails or is somehow blocked, treat the original contact as fraud.</p>

    <p>Final question: Is the requested payment method a gift card, wire transfer, or cryptocurrency? If yes, it is a scam without exception. No legitimate emergency, legal situation, or government agency accepts these payment forms. Do not proceed.</p>

    <h3>Who to Call in Ohio</h3>

    <p>When you encounter fraud or suspected fraud, reporting it protects the next potential victim. Ohio has specific resources:</p>

    <ul>
      <li><strong>Ohio Attorney General Consumer Protection:</strong> 800-282-0515 or ohioattorneygeneral.gov/Individuals-and-Families/Consumers. The AG's office investigates consumer fraud and can provide guidance on reporting and recovery options.</li>
      <li><strong>FTC Report Fraud:</strong> reportfraud.ftc.gov. The Federal Trade Commission's fraud reporting center collects reports that inform enforcement and help identify fraud patterns. Reports are analyzed for trends and used to build cases against large fraud operations.</li>
      <li><strong>FBI Internet Crime Complaint Center:</strong> ic3.gov. For internet-based crimes, including AI voice cloning scams that involve wire fraud or significant financial loss. The IC3 forwards complaints to appropriate federal, state, and local law enforcement agencies.</li>
      <li><strong>AARP Fraud Watch Network:</strong> 1-877-908-3360. The AARP helpline is staffed by trained specialists who can provide advice and emotional support for fraud victims and their families. AARP does not require membership for this service.</li>
      <li><strong>Ohio Elder Abuse Hotline:</strong> 1-855-644-6277. For cases involving elderly victims where the exploitation may constitute elder abuse under Ohio law.</li>
    </ul>

    <h3>Section 3: If You Have Been Victimized</h3>

    <p>If you or a family member has been victimized by a voice cloning, deepfake romance, or related AI-assisted fraud, the first hours matter. Here is what to do:</p>

    <p><strong>Stop all contact with the scammer immediately.</strong> Do not engage further. Do not respond to messages. Do not send additional money. If you are in the middle of the scam and realize it, the correct action is to stop completely, even if the scammer claims this will make things worse. Things cannot be made worse by stopping. They can be made significantly worse by continuing.</p>

    <p><strong>Document everything.</strong> Before deleting any messages, calls, or accounts, screenshot and preserve all communications. Write down, as specifically as you can remember, what was said in phone calls, what payment methods were used, what names and phone numbers the scammer used. This documentation may be important for law enforcement and for your bank.</p>

    <p><strong>Contact your bank immediately if money was sent.</strong> If you wired money or authorized a bank transfer within the last 24 to 48 hours, your bank may be able to reverse or freeze the transaction. Call the bank's fraud line — not the general customer service line — immediately. For gift cards, contact the issuing retailer's fraud line (Google, Apple, Amazon all have processes for this); recovery is not guaranteed but occasionally possible in the first hours.</p>

    <p><strong>Report to authorities.</strong> File reports with the FTC, the FBI IC3, and your local law enforcement. You may feel that the amounts involved are too small for law enforcement to care about, or that nothing will come of reporting. This feeling is understandable and, in the short term, sometimes accurate — individual case investigation is not guaranteed. But aggregate reports lead to investigations, pattern identification, and arrests. Your report is part of a larger case that may take years to develop.</p>

    <p><strong>Do not be ashamed.</strong> This is easier to say than to feel. The shame of being victimized is real and heavy. But the shame belongs to the people who built the tools and wrote the scripts and made the calls. It does not belong to the people who loved someone and tried to help, or who responded to the deep human desire for connection, or who trusted their ears and their hearts in a world where those things were reliable until very recently. Shame about victimization keeps people silent, and silence is the scammer's greatest ally. Tell someone. Let them help.</p>

    <h3>The Closing Thought</h3>

    <p>This book has covered a lot of dark material. It has asked you to sit with the knowledge that the voice of someone you love can be replicated by a machine, that a photo can lie, that a video can lie, that months of emotional intimacy can be generated by software. That is a lot to hold.</p>

    <p>But here is the thing that remains true, and will always remain true: the scammer's greatest advantage is the assumption that your family will not talk about this. That you will not warn each other. That you will not have the slightly awkward conversation about code words and callback rules. That you will not check in with your grandmother after reading something alarming, or ask your teenager how they're feeling about what they see online.</p>

    <p>Every one of those conversations is a wall that did not exist before. The technology will keep improving. The tools will get cheaper and better and more accessible. The scammers will adapt their scripts. But a family that talks openly about these threats, that has established authentication systems, that has built a culture of verification rather than vulnerability — that family is genuinely harder to victimize. Not because of any app or filter or technical countermeasure. Because of human connection, which is ultimately what all of this is about.</p>

    <p>The scammer called Earl because he knew Earl loved Marcus. The scammer called Margaret because she was lonely. The scammer almost got Robert because he missed Patricia. Every fraud story in this book is, at its heart, a story about someone being taken advantage of because they loved someone or wanted to be loved. That capacity for love is not the problem. It is the most important thing about us. The problem is the people who decided to weaponize it.</p>

    <p>Do not let them win by becoming afraid to love, afraid to help, afraid to answer the phone. Instead, let them lose to your family's code word, your callback rule, your sixty-second pause before acting. Let them lose to a grandmother who asks for the word and hangs up when she doesn't get it. Let them lose to a family that talks.</p>

    <p>That is the defense plan. It is already within your reach.</p>
    </article>`,
  },
];
