import type { BookChapter } from "@/config/bookCatalog";

/**
 * Understanding AI — A Plain English Guide
 * InVision Network Press — Dayton/Kettering, Ohio 2026
 * 10 chapters (0–9), ~115 pages, accessible non-technical audience
 */
export const UNDERSTANDING_AI_PLAIN_CHAPTERS: BookChapter[] = [
  {
    chapter_number: 0,
    chapter_title: "Title & Copyright Page",
    page_start: 1,
    page_end: 3,
    content_html: `<article class="chapter-content front-matter"><div style="text-align:center; padding: 3em 0;"><p style="font-size:0.8em; letter-spacing:0.15em; text-transform:uppercase; color:#888;">InVision Network Press</p><h1 style="font-size:2.2em; margin: 0.5em 0;">Understanding AI</h1><p style="font-size:1.2em; color:#555; margin-bottom:2em;">A Plain English Guide for Curious, Non-Technical Readers</p><p>By the InVision Network Education Team</p><p style="margin-top:3em; font-size:0.9em; color:#777;">Dayton, Ohio &middot; 2026</p></div><hr style="margin: 3em 0;" /><div style="font-size:0.85em; color:#555; line-height:1.9;"><p>Copyright &copy; 2026 InVision Network. All rights reserved.</p><p>InVision Network Press &middot; Kettering, Ohio 45440</p><p><em>For educational purposes only.</em></p></div></article>`,
  },

  {
    chapter_number: 1,
    chapter_title: "Introduction — AI Is Already Living in Your Devices",
    page_start: 4,
    page_end: 17,
    content_html: `<article class="chapter-content">
<h2>Chapter 1: Introduction — AI Is Already Living in Your Devices</h2>

<p>Here is something worth knowing before you read a single word more: you already use artificial intelligence every day. You have been using it for years. It is not in a laboratory somewhere, waiting to be unleashed. It is not a distant technology that science fiction writers imagined for some future century. It is in your pocket right now, in the phone you use to take photos and make calls. It is in your email inbox, quietly sorting the spam from the real messages. It is in the app that told you which route to take to avoid traffic this morning. It is in the service that knows, somehow, that after finishing one show you would probably enjoy that other show.</p>

<p>The gap between what AI actually is and what the word "AI" conjures in most people's minds is enormous. The movies gave us a very specific image: a humanoid robot with glowing eyes, or a smooth-talking computer that decides one day it does not need humans anymore. Real AI, the AI that exists in 2026 and that is rapidly becoming part of every aspect of daily life, looks nothing like that. It looks like a spam filter. It looks like a suggested reply. It looks like face unlock on your phone. It looks like a chatbot on a company website. It looks boring, until you realize how much of your world it is quietly shaping.</p>

<p>This book is for people who are curious about AI and who want to make better decisions in a world where AI is increasingly present — but who do not have a computer science degree and do not want one. You do not need to know how to program. You do not need to understand mathematics. You do not need to have followed the news about AI closely. This book will meet you wherever you are and give you a clear, honest, jargon-free picture of what AI is, how it works in plain terms, where it shows up in your life, and what you should think about when it does.</p>

<h3>The Reality Check</h3>

<p>Let us clear up a few common misconceptions right at the start, because they tend to get in the way of clear thinking about AI.</p>

<p>AI does not think. It processes. It does not understand what it is saying or doing. It finds patterns and generates outputs based on those patterns. When a chatbot answers your question, it is not reasoning through the problem the way you would. It is producing a statistically likely response based on vast amounts of text it has processed. Sometimes this looks exactly like reasoning. Sometimes it produces responses that are completely wrong with complete confidence. Both of these things are features of the same underlying process.</p>

<p>AI is not one thing. The word "AI" is used to describe an enormous range of different technologies with different capabilities, different limitations, and different risks. The AI in your spam filter and the AI in a medical imaging diagnostic system and the AI in a self-driving car are all called AI, but they work on different principles, were built for completely different purposes, and have almost nothing in common technically. When someone says "AI will change everything," it is worth asking: which AI? For which things? On what timeline?</p>

<p>AI is not neutral. Every AI system reflects choices made by the people who built it — choices about what data to use for training, what goals to optimize for, what errors are acceptable, and whose values to encode. These choices have consequences that often fall hardest on people who had no say in making them. Understanding this is not about being pessimistic about AI. It is about being a more informed user and citizen in a world where AI is making more and more decisions that affect your life.</p>

<h3>Who This Book Is For</h3>

<p>This book is for the person who keeps hearing about AI and wants to actually understand it. It is for the parent who wonders what their child means when they say they used AI to help with homework. It is for the Ohio small business owner who is curious about whether AI tools could help their business and wants to evaluate them intelligently. It is for the retired professional who wants to understand what is actually happening when their phone recognizes their face. It is for anyone who has felt a little left behind by the speed of technological change and wants to catch up without having to pretend to be a computer scientist.</p>

<p>Each chapter builds on the last, but the book is also designed so that you can jump to the chapters most relevant to your interests. If you want to understand how AI works at a basic level, start at the beginning and read through Chapter 3. If you are primarily concerned about scams and fraud, jump to Chapter 5. If you want to know how to protect your privacy, Chapter 6 and beyond are most relevant. If you want a reference for AI terms, Chapter 9's glossary will serve you well.</p>

<p>The goal is not to make you an expert. It is to make you an informed, confident person in a world where AI is becoming unavoidable. That is a reachable goal, and this book will help you get there.</p>
</article>`,
  },

  {
    chapter_number: 2,
    chapter_title: "How Machine Learning Works — Plain English",
    page_start: 18,
    page_end: 31,
    content_html: `<article class="chapter-content">
<h2>Chapter 2: How Machine Learning Works — Plain English</h2>

<p>Machine learning is the technology at the heart of most modern AI. Understanding it at a basic level will make everything else in this book click into place. The good news is that the core concept is not complicated, even if the mathematics underneath it are.</p>

<h3>Learning From Examples Instead of Rules</h3>

<p>The traditional way to program a computer is to write rules. If you wanted to write a program that could sort your email, you might write rules like: if the email is from an unknown sender AND contains the words "click here to claim your prize," mark it as spam. The problem with rules is that you have to anticipate every case in advance. Spammers quickly learned to slightly alter their wording so the rules would not catch them. The rules had to be updated constantly, and they were always a step behind.</p>

<p>Machine learning takes a completely different approach. Instead of writing rules, you show the computer thousands of examples and let it figure out the patterns itself. For spam filtering, you might show it 100,000 emails labeled "spam" and 100,000 emails labeled "not spam," and let it find the patterns that distinguish them. The computer does not receive a list of rules — it infers rules from the examples. This is more flexible, more adaptable, and scales to problems where writing explicit rules is impossible.</p>

<h3>Three Types of Machine Learning</h3>

<p><strong>Supervised learning</strong> is what the spam filter example describes: you provide labeled examples (this is spam, this is not spam), and the system learns to classify new examples. Most of the AI in your daily life — image recognition, voice recognition, recommendation systems — is based on supervised learning.</p>

<p><strong>Unsupervised learning</strong> is used when you do not have labels. Instead of classifying examples into pre-defined categories, the system finds natural groupings in the data. This is how streaming services discover that certain groups of users tend to like the same shows — not because anyone told the system what the groups were, but because the system found them in viewing patterns.</p>

<p><strong>Reinforcement learning</strong> is the type used to train AI systems that need to take actions over time — like playing a game or controlling a robot. The system receives feedback (rewards and penalties) based on the results of its actions and learns to take actions that maximize rewards. This is how DeepMind's AI systems learned to play chess and Go at superhuman levels.</p>

<h3>Training Data: Where AI Learns From</h3>

<p>The examples used to teach a machine learning system are called training data, and they are the most important ingredient in any AI system. The quality and characteristics of the training data determine what the system can do well and where it will fail. An image recognition system trained mostly on photos taken in bright daylight will perform worse in dim lighting. A speech recognition system trained mostly on American English accents will perform worse on British or Australian accents. A hiring recommendation system trained on historical hiring data will perpetuate historical biases.</p>

<h3>The Difference Between AI, Machine Learning, and Deep Learning</h3>

<p>These three terms get used interchangeably in casual conversation but they are not the same thing. Artificial intelligence is the broad category — any system that performs tasks that would otherwise require human intelligence. Machine learning is a subset of AI — systems that learn from data rather than following explicitly programmed rules. Deep learning is a subset of machine learning — systems that use large neural networks with many layers to find very complex patterns in data. Deep learning is responsible for the most impressive recent AI achievements, including large language models like ChatGPT.</p>
</article>`,
  },

  {
    chapter_number: 3,
    chapter_title: "Generative AI — What ChatGPT and Similar Tools Are",
    page_start: 32,
    page_end: 44,
    content_html: `<article class="chapter-content">
<h2>Chapter 3: Generative AI — What ChatGPT and Similar Tools Are</h2>

<p>Generative AI refers to AI systems that produce new content — text, images, audio, video — rather than just classifying or analyzing existing content. ChatGPT, Claude, Gemini, DALL-E, Midjourney, and similar tools are all forms of generative AI. They have gotten enormous attention because their outputs are surprisingly human-like, and because they have made AI accessible to people who had never interacted with it before.</p>

<h3>Large Language Models: Next-Word Prediction at Massive Scale</h3>

<p>At the core of tools like ChatGPT is a type of AI called a Large Language Model, or LLM. The name is descriptive: it is a model of language, it is based on large amounts of text, and it generates text by predicting what word (or more precisely, what token) is most likely to come next given everything that came before it.</p>

<p>This sounds simple, but it turns out that getting very good at predicting the next word requires understanding an enormous amount about how language works, what concepts mean, how arguments are structured, what counts as a relevant answer to a question, and countless other things that we think of as intelligence. The result is a system that can write essays, answer questions, summarize documents, translate languages, write code, and engage in extended conversation — all from the underlying mechanism of next-word prediction applied at enormous scale.</p>

<h3>Why LLMs "Hallucinate"</h3>

<p>One of the most important things to understand about LLMs is that they sometimes produce confident, plausible-sounding statements that are completely false. This is called hallucination. It happens because the system is generating statistically likely text, not retrieving verified facts. When asked about something it does not have reliable information about, it may generate text that sounds like a real answer but is not.</p>

<p>Hallucination is not a bug that will be fixed in the next version — it is an inherent property of systems that generate text by predicting likely continuations. The practical implication is that you should verify any specific factual claims made by an LLM — particularly names, dates, statistics, citations, and URLs — before relying on them.</p>

<h3>Image and Video Generation</h3>

<p>Tools like DALL-E, Midjourney, and Stable Diffusion generate images from text descriptions. Sora and similar tools generate video. These systems work on similar principles to LLMs but applied to visual rather than textual data. They have learned patterns from enormous datasets of images paired with text descriptions, and they generate new images that match text prompts by combining and recombining visual patterns from their training.</p>

<p>The implications of realistic AI-generated images and video extend beyond creative applications. Chapter 5 discusses how these tools are being used for scams and fraud — an increasingly serious concern that every reader of this book should understand.</p>
</article>`,
  },

  {
    chapter_number: 4,
    chapter_title: "AI in Daily Life — Search, Email, and Voice Assistants",
    page_start: 45,
    page_end: 55,
    content_html: `<article class="chapter-content">
<h2>Chapter 4: AI in Daily Life — Search, Email, and Voice Assistants</h2>

<p>The most consequential AI systems are often the ones you notice least — because they work invisibly in the background of tools you use every day without thinking about them. This chapter describes the AI that is most present in ordinary daily life.</p>

<h3>Google's AI-Powered Search</h3>

<p>Google's search engine has used machine learning for over a decade. Modern Google search uses AI at every stage: understanding the intent behind your query, ranking results based on predicted relevance and quality, generating the "featured snippets" that appear at the top of results pages, and increasingly, providing direct AI-generated answers through Google's AI Overview feature. When Google decides which result to show you first, that decision involves AI models assessing hundreds of signals about your query, your search history, your location, and the content of billions of web pages.</p>

<h3>Email: Spam Filtering and Smart Compose</h3>

<p>Your email's spam filter is one of the oldest and most reliable AI systems in everyday use. Modern spam filters use machine learning to evaluate every email that arrives and decide whether it belongs in your inbox or spam folder, based on patterns learned from billions of labeled examples. Gmail's Smart Compose feature — which suggests words and phrases as you type — is a language model similar in principle to ChatGPT, just smaller and trained on email-specific data.</p>

<h3>Alexa, Siri, and Google Assistant</h3>

<p>Voice assistants use AI at multiple stages. When you speak, a speech recognition model converts your audio into text. A natural language understanding model interprets what you meant. A response generation system produces a reply. A text-to-speech model converts the reply back to audio. Each of these stages involves a separate AI system, and improving any one of them improves the overall experience. The AI in voice assistants is more limited than LLMs — it is optimized for short, task-oriented interactions, not extended conversation.</p>

<h3>Recommendation Systems</h3>

<p>Netflix, YouTube, Spotify, TikTok, and virtually every content platform use recommendation systems to decide what to show you next. These systems analyze your behavior — what you watched, what you skipped, how long you watched before stopping — and compare it to the behavior of millions of other users to find patterns. If many people who watched the same shows you watched also enjoyed a particular show you have not seen, the system recommends that show to you.</p>

<p>Recommendation systems are effective at keeping your attention. They are less reliably effective at broadening your interests, exposing you to diverse perspectives, or prioritizing content that is good for you over content that is merely engaging. Chapter 5 of the privacy companion to this guide discusses how recommendation systems can reinforce existing beliefs and create filter bubbles.</p>
</article>`,
  },

  {
    chapter_number: 5,
    chapter_title: "When AI Is Used Against You — Scams and Deepfakes",
    page_start: 56,
    page_end: 67,
    content_html: `<article class="chapter-content">
<h2>Chapter 5: When AI Is Used Against You — Scams and Deepfakes</h2>

<p>The same AI tools that provide convenience and capability to legitimate users are available to criminals, and they have been adopted enthusiastically. AI has made several categories of fraud dramatically more scalable, more convincing, and more difficult to detect. Understanding what these attacks look like is essential for anyone who uses a phone, email, or the internet.</p>

<h3>AI-Powered Phishing Emails</h3>

<p>Traditional phishing emails were often easy to spot: poor grammar, generic salutations, awkward phrasing that clearly did not come from a native English speaker. AI has largely eliminated these tells. LLMs can generate grammatically perfect, contextually appropriate, personalized phishing emails at scale. A criminal who purchases a list of email addresses can feed them into an AI system that generates personalized emails for each recipient, referencing their employer, their location, and contextual information scraped from social media — all automatically, at essentially zero marginal cost per email.</p>

<h3>Voice Cloning for Phone Scams</h3>

<p>AI voice cloning tools can produce a convincing imitation of a specific person's voice from as little as three seconds of audio — and three seconds of audio is available for almost anyone who has ever posted a video online, appeared in a news story, or been recorded in any public context. Criminals have used voice cloning to impersonate family members in distress ("Grandma, I'm in jail, I need money"), to impersonate executives in business fraud calls, and to defeat voice authentication systems. The FBI and FTC have both issued warnings about AI voice cloning fraud.</p>

<h3>Deepfake Video</h3>

<p>Deepfake video uses AI to replace one person's face and voice in a video with another person's face and voice. The results have become increasingly convincing as the technology has improved. Deepfake videos have been used to create fake videos of executives making statements they never made, to generate fake evidence in legal disputes, and to create non-consensual intimate images using the faces of real people. In business contexts, deepfake video calls have been used to impersonate executives in order to authorize fraudulent transactions.</p>

<h3>How to Detect AI-Generated Content</h3>

<p>There is no foolproof method for detecting AI-generated text, audio, or video, and detection tools are in an ongoing arms race with generation tools. However, several practical approaches can help:</p>

<ul>
  <li>For unexpected phone calls from family members in distress: establish a family code word that only real family members would know, and ask for it before taking any action</li>
  <li>For unusual video calls from executives or clients: call back on a verified number before authorizing any transaction</li>
  <li>For suspicious emails: verify through a separate channel before clicking any link or providing any information</li>
  <li>For AI-generated images: look for physically impossible details — extra fingers, asymmetric features, background anomalies — that AI image generators still occasionally produce</li>
</ul>

<h3>Why AI Makes Scams More Scalable and Convincing</h3>

<p>The fundamental shift AI has brought to fraud is one of scale and personalization at low cost. A human fraudster can make a limited number of calls per day. An AI system can conduct thousands of voice-cloned calls simultaneously. A human writer can craft a limited number of personalized phishing emails. An AI system can generate millions. This is not a reason for panic, but it is a reason to maintain appropriate skepticism toward any communication that asks you to take an urgent action involving money, credentials, or sensitive information — regardless of how convincing it sounds.</p>
</article>`,
  },

  {
    chapter_number: 6,
    chapter_title: "AI and Your Privacy — What's Being Collected",
    page_start: 68,
    page_end: 78,
    content_html: `<article class="chapter-content">
<h2>Chapter 6: AI and Your Privacy — What's Being Collected</h2>

<p>AI systems are hungry for data — they learn from it, improve from it, and in many cases generate revenue from it. Understanding what AI tools do with your data, and what choices you have about it, is an increasingly important form of digital literacy.</p>

<h3>The Free Product Tradeoff</h3>

<p>Many AI tools are offered free of charge to users. This is not philanthropy. The business model is typically one of two things: using your data and interactions to improve the AI system (which becomes a more valuable product), or using data about you to serve you targeted advertising. When you use a free AI tool, read the terms of service to understand whether your inputs — the things you type or say to the AI — are used to train the model. Some services use your inputs for training by default; others do not. Many offer an opt-out.</p>

<h3>Training Data Opt-Outs</h3>

<p>OpenAI, Google, Anthropic, and other major AI providers offer varying levels of opt-out from training data use. OpenAI allows users to disable training data use in account settings. Google offers similar controls. For sensitive inputs — anything involving personal, medical, financial, or confidential information — check the service's data use policy before using it. If the policy is unclear, assume your inputs may be used for training and adjust what you share accordingly.</p>

<h3>What Stays in the Model vs. What's Stored Per User</h3>

<p>There is an important distinction between information that is incorporated into the model during training (which becomes part of the AI's general knowledge and is not retrievable as your specific data) and information that is stored in your account or session (which can be retrieved and deleted). Most AI chat interfaces store your conversation history in your account. This history can typically be deleted through account settings. Information that the model "learned" from during training is different — it cannot be removed from the model's parameters after the fact.</p>

<h3>Why "Private Mode" Is Not What You Think</h3>

<p>Many AI chat interfaces offer a "temporary chat" or "private" mode that does not save your conversation history in your account. This is useful for limiting what is stored on the service's servers, but it does not make your connection private from a network perspective, and it does not necessarily prevent the session data from being used for model improvement (depending on the service's policy). Private mode in AI tools is not the same as private browsing in a web browser, and neither is a guarantee of genuine privacy. Read the specific service's documentation to understand exactly what the private mode does and does not protect.</p>
</article>`,
  },

  {
    chapter_number: 7,
    chapter_title: "Evaluating AI Tools Before You Trust Them",
    page_start: 79,
    page_end: 90,
    content_html: `<article class="chapter-content">
<h2>Chapter 7: Evaluating AI Tools Before You Trust Them</h2>

<p>New AI tools appear at an extraordinary rate. Many are genuinely useful. Some are poorly designed. Some are dishonest about their capabilities or their data practices. Having a consistent framework for evaluating AI tools before you commit to using them for anything important will save you time and protect you from bad decisions.</p>

<h3>Five Questions to Ask About Any AI Tool</h3>

<p><strong>1. Who built this?</strong> A tool built by an established company with a track record, a public privacy policy, and identifiable leadership is meaningfully different from a tool built by an unknown party with no accountability. Search for the company name and look for news coverage, reviews, and any history of privacy incidents or legal problems. Anonymous or pseudonymous AI tools should be treated with significant skepticism.</p>

<p><strong>2. What data do they use?</strong> Where did the training data come from? Is it licensed appropriately? For image generators and other creative AI tools, this matters for both legal and ethical reasons — many tools were trained on copyrighted material without the creators' consent. For AI tools that will handle your personal information, understand what data the tool collects about you and how it is used.</p>

<p><strong>3. Can I opt out?</strong> Specifically, can you opt out of having your inputs used for training? Can you delete your account and have your data removed? Can you download your data? These opt-out rights matter, and their presence or absence tells you something about how the company views its relationship with users.</p>

<p><strong>4. What happens to my inputs?</strong> Everything you type or say to an AI tool is an input. If you are using an AI tool to draft a legal document, review a medical situation, or handle any sensitive information, you need to know whether those inputs are stored, who can access them, and whether they will be used for training. Treat the AI tool's input handling the way you would treat any other place you store sensitive information.</p>

<p><strong>5. Is there a human in the loop?</strong> For decisions with significant consequences — medical advice, financial decisions, legal guidance — ask whether there is a human expert involved in reviewing or validating the AI's output. AI tools marketed as replacements for professional judgment in high-stakes domains deserve extra scrutiny.</p>

<h3>How to Read a Privacy Policy for AI Tools</h3>

<p>Privacy policies are long and deliberately difficult to read. For AI tools, focus on three sections: the section describing what data is collected, the section describing how data is used (specifically whether it is used for training), and the section describing your rights and choices (opt-out, deletion, download). These sections will typically tell you what you need to know in two to three pages if you read them with those questions in mind.</p>

<h3>Red Flags in AI Marketing</h3>

<ul>
  <li>Claims that the AI is "completely private" or "doesn't collect any data" without specific explanation of how this is technically achieved</li>
  <li>Claims that the AI can provide professional medical, legal, or financial advice without any disclaimer about professional consultation</li>
  <li>No identifiable company, privacy policy, or terms of service</li>
  <li>Marketing that emphasizes what the AI can do without addressing any of its limitations</li>
  <li>Very high-pressure sales tactics, especially for AI tools with subscription commitments</li>
</ul>
</article>`,
  },

  {
    chapter_number: 8,
    chapter_title: "The Next Wave — What AI Will Do in the Near Future",
    page_start: 91,
    page_end: 102,
    content_html: `<article class="chapter-content">
<h2>Chapter 8: The Next Wave — What AI Will Do in the Near Future</h2>

<p>Making predictions about AI is a notoriously uncertain business — the field has surprised experts repeatedly, both by advancing faster than expected in some areas and by proving more stubborn than expected in others. With that caveat clearly stated, there are several near-future developments that are either already beginning or are reliably anticipated.</p>

<h3>Agentic AI</h3>

<p>Current AI tools mostly respond to prompts — you ask, they answer. Agentic AI takes actions on your behalf over time without requiring a prompt for each step. An AI agent might be given the task of scheduling a meeting, and it would search your calendar, check the other parties' availability, compose an invitation, send it, and follow up — all without you being involved in each step. Agentic AI is already appearing in enterprise software and will become more common in consumer applications. The key question is how much autonomy these agents should have and how humans should maintain oversight of their actions.</p>

<h3>AI in Healthcare Diagnostics</h3>

<p>AI diagnostic tools are already approved by the FDA for specific medical imaging applications — detecting diabetic retinopathy, identifying certain cancer patterns in radiology images, and flagging cardiac abnormalities. The near future will bring more AI-assisted diagnostics, with AI systems flagging potential issues for physician review rather than replacing physician judgment. For patients, this will likely mean faster and more consistent screening for certain conditions, particularly in settings where specialist radiologists or cardiologists are in limited supply.</p>

<h3>Workplace Automation Effects</h3>

<p>AI will change the nature of many jobs, though predictions about mass unemployment have historically overstated the effect and understated adaptation. The jobs most affected in the near term will be those involving routine production of text, code, or analysis — tasks where AI can produce a first draft faster than a human. The jobs least affected will involve complex human judgment, physical presence, emotional intelligence, and skilled trades. For Ohio workers and Ohio small business owners, the practical near-term question is not "will AI take all the jobs?" but "how will AI change the specific tasks in my specific work?"</p>

<h3>What AGI Means and Why the Timeline Is Debated</h3>

<p>Artificial General Intelligence (AGI) refers to an AI system capable of performing any intellectual task that a human can perform — flexible, general-purpose intelligence rather than narrow, task-specific intelligence. Current AI systems, including the most sophisticated large language models, are not AGI. They can be extraordinarily capable within their domains but do not generalize the way humans do. When AGI will be achieved — if it ever is — is one of the most hotly debated questions in the field. Estimates from serious researchers range from "within ten years" to "never." The most honest answer is that nobody knows, and claims of certainty in either direction should be treated skeptically.</p>

<h3>How to Think About AI Progress Without Panic or Hype</h3>

<p>The best framework for thinking about AI progress is probably the same one that serves well for any rapidly changing technology: focus on specific, concrete impacts rather than sweeping narratives, maintain appropriate skepticism about both utopian and dystopian predictions, stay curious and continue learning, and remember that humans have navigated major technological transitions before and will navigate this one too.</p>
</article>`,
  },

  {
    chapter_number: 9,
    chapter_title: "Plain English Glossary of AI Terms",
    page_start: 103,
    page_end: 115,
    content_html: `<article class="chapter-content">
<h2>Chapter 9: Plain English Glossary of AI Terms</h2>

<p>This glossary defines the AI terms you are most likely to encounter, in plain language with examples. Technical precision has been traded for clarity — readers who want rigorous technical definitions should consult a computer science reference.</p>

<h3>Core Concepts</h3>

<p><strong>Algorithm:</strong> A set of step-by-step instructions that a computer follows to accomplish a task. An algorithm is not magic — it is just a recipe. The interesting question is always what the algorithm is trying to accomplish and what data it is working with.</p>

<p><strong>Artificial Intelligence (AI):</strong> Any system that performs tasks typically associated with human intelligence — understanding language, recognizing patterns, making decisions, generating content. The term is broad and covers many different technologies.</p>

<p><strong>Machine Learning:</strong> A subset of AI in which systems learn to perform tasks by finding patterns in data, rather than being explicitly programmed with rules. Most modern AI is based on machine learning.</p>

<p><strong>Deep Learning:</strong> A powerful subset of machine learning that uses large neural networks with many layers. Deep learning is responsible for most of the impressive AI advances of the past decade, including voice recognition, image recognition, and large language models.</p>

<p><strong>Neural Network:</strong> A computational structure loosely inspired by how neurons in the brain connect to each other. A neural network consists of layers of nodes connected by adjustable weights. During training, the weights are adjusted until the network produces correct outputs for the training data.</p>

<p><strong>Training Data:</strong> The dataset of examples used to teach a machine learning system. The quality and characteristics of training data determine what the system can do well and where it will fail.</p>

<h3>Language AI Terms</h3>

<p><strong>Large Language Model (LLM):</strong> An AI system trained on vast amounts of text that can generate, summarize, translate, and answer questions about text. ChatGPT, Claude, Gemini, and similar chat AI tools are based on large language models.</p>

<p><strong>Hallucination:</strong> When an LLM produces confident-sounding text that is factually incorrect. Hallucination happens because LLMs generate statistically likely text rather than retrieving verified facts.</p>

<p><strong>Prompt:</strong> The input you give to an AI system — the question you type, the instruction you provide, or the content you want the AI to respond to. Better prompts tend to produce better results.</p>

<p><strong>Token:</strong> The unit of text that LLMs work with. A token is roughly equivalent to a word or word fragment. LLMs have a context window — a maximum number of tokens they can process at once — which limits how much text they can consider in a single interaction.</p>

<p><strong>Inference:</strong> The process of using a trained AI model to produce outputs. Training is what happens when the model learns from data. Inference is what happens when you use the model to answer a question or generate content.</p>

<p><strong>Fine-Tuning:</strong> Additional training applied to an already-trained model to adapt it for a specific purpose or domain. A general-purpose LLM might be fine-tuned on medical literature to make it better at answering medical questions.</p>

<p><strong>RAG (Retrieval-Augmented Generation):</strong> A technique that combines an LLM with a search system. Instead of relying solely on what the model learned during training, a RAG system searches a database of documents and uses the retrieved information to inform its response. This reduces hallucination for questions about specific documents or recent events.</p>

<h3>Systems and Behavior</h3>

<p><strong>Agent (AI Agent):</strong> An AI system that can take actions over time to accomplish a goal, rather than just responding to a single prompt. An AI agent might browse the web, run code, send emails, and interact with other software to complete a task.</p>

<p><strong>Bias:</strong> Systematic errors in an AI system's outputs that result from problems in the training data or training process. An AI hiring tool trained on historical hiring data may replicate historical biases against certain groups. Bias in AI is a serious and active area of research.</p>

<p><strong>Model:</strong> The trained AI system itself — the mathematical structure and the parameters (weights) that have been adjusted during training. When someone refers to "using a model," they mean using the trained system to produce outputs.</p>

<p><strong>Generative AI:</strong> AI systems that produce new content — text, images, audio, or video — rather than just classifying or analyzing existing content.</p>

<p><strong>Deepfake:</strong> AI-generated media that realistically depicts a person saying or doing something they never said or did. Deepfakes can be created for entertainment, satire, art, or fraud.</p>

<p><strong>Supervised Learning:</strong> Training a machine learning system using labeled examples — data that includes both the input and the correct answer. The system learns to produce correct answers for new inputs.</p>

<p><strong>Unsupervised Learning:</strong> Training a machine learning system on data without labels. The system finds natural patterns and groupings in the data without being told what to look for.</p>

<p><strong>Reinforcement Learning:</strong> Training a machine learning system by rewarding desired behaviors and penalizing undesired ones. Used for AI systems that need to take sequences of actions, like game-playing AI or robotics.</p>

<p><strong>Natural Language Processing (NLP):</strong> The branch of AI focused on enabling computers to understand, interpret, and generate human language. NLP is the technology behind speech recognition, machine translation, and conversational AI.</p>

<p><strong>Computer Vision:</strong> The branch of AI focused on enabling computers to understand and interpret visual information — images and video. Computer vision powers facial recognition, self-driving vehicle systems, and medical imaging AI.</p>
</article>`,
  },
];
