import type { RichText } from "../types";
import type { Finding } from "../es/research";

/**
 * Short report on the master's thesis (page /en/research).
 * Source: REPORTE_CORTO_EN.md, adapted to US English and to the edits made on the Spanish web version.
 * Same shape as content/es/research.ts.
 */

export const research = {
  metaTitle: "AI and tech talent development in Colombia",
  metaDescription:
    "Short report on the master's thesis by Juan David Ramírez Jaramillo (Malmö University, 2025): six findings on how generative AI is being used to develop tech talent in Colombia, and a guide with five steps and five principles.",

  ids: { why: "why", method: "how", findings: "findings", guide: "guide", conclusion: "conclusion", collaborate: "work-together" },

  hero: {
    eyebrow: "Research · Master's thesis",
    title: [{ text: "Bridging the " }, { text: "Skill Gap", accent: "yellow" }] as RichText,
    subtitle: "The role of AI in developing tech talent in Colombia",
    tagline: "What I found and what I recommend",
    meta: "Short report on my master's thesis · Malmö University · September 2025",
    actions: {
      // PDF generated from /en/research/pdf with: npm run report:pdf
      report: {
        label: "Download report",
        href: "/docs/Report_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf" as string | undefined,
      },
      thesis: {
        label: "Download thesis",
        options: [
          {
            label: "Download PDF",
            href: "/docs/Tesis_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf" as string | undefined,
            kind: "download" as const,
          },
          {
            label: "Read on DiVA",
            href: "/go/diva" as string | undefined,
            kind: "external" as const,
          },
        ],
      },
    },
    stats: [
      { value: "13", label: "people interviewed" },
      { value: "7", label: "organizations" },
      { value: "10", label: "academic studies reviewed" },
    ],
    index: [
      { label: "Why", href: "#why" },
      { label: "How", href: "#how" },
      { label: "Findings", href: "#findings" },
      { label: "The guide", href: "#guide" },
      { label: "Conclusion", href: "#conclusion" },
      { label: "Let's work together", href: "#work-together", cta: true },
    ],
  },

  why: {
    eyebrow: "Why I did this study",
    title: [{ text: "What you know today can fall " }, { text: "short", accent: "yellow" }, { text: " fast" }] as RichText,
    paragraphs: [
      "In tech, what you know how to do today can fall short in a couple of years. Companies need to keep their teams up to date within their field (upskilling) and, more and more, help people move into new roles (reskilling). Generative AI (Claude, Gemini, ChatGPT) promises to make that learning more personalized, faster and cheaper.",
      "I wanted to understand whether that promise was coming true in Colombia: how generative AI is being used to develop tech talent, what is holding it back, and what could be done to make better use of it.",
    ],
    upskilling: { label: "Upskilling", text: "Keeping teams up to date within their field" },
    reskilling: { label: "Reskilling", text: "Helping people move into new roles" },
    promise: ["More personalized", "Faster", "Cheaper"],
    question: ["How is it being used?", "What is holding it back?", "What could be done better?"],
  },

  method: {
    eyebrow: "How I did it",
    title: [{ text: "A " }, { text: "qualitative", accent: "yellow" }, { text: " study with professionals and companies" }] as RichText,
    paragraphs: [
      "It was a qualitative, exploratory and inductive study. Between January and April 2025, I held in-depth, semi-structured interviews with 13 people from 7 organizations that develop tech talent in Colombia: 6 tech professionals, 4 talent and learning leaders, and 3 educators. Participants came from multinational and Colombian software companies, an edtech and two universities, ICESI and EAFIT. I also reviewed 10 recent academic studies and compared what I heard with Colombia's national AI policy (CONPES 4144 of 2025 and the MinCiencias Roadmap of 2024).",
      "To analyze the interviews I used thematic analysis. I started with codes drawn from the interview guide and added the ones that emerged from the conversations, until I reached 43 codes grouped into 9 categories. By reading and comparing them again and again, they came together into 5 themes and 14 general findings, which were finally summarized into the 6 specific findings in this report.",
    ],
    analysis: [
      { value: "43", label: "codes" },
      { value: "9", label: "categories" },
      { value: "5", label: "themes" },
      { value: "14", label: "general findings" },
      { value: "6", label: "specific findings" },
    ],
    people: [
      { label: "Tech professionals", value: 6, color: "#ffbd42", icon: "cpu" },
      { label: "Talent and learning leaders", value: 4, color: "#71c0fd", icon: "users" },
      { label: "Educators", value: 3, color: "#4a7af5", icon: "graduation-cap" },
    ],
    orgs: [
      { label: "Software companies", detail: "multinational and Colombian", icon: "network" },
      { label: "An edtech", detail: "", icon: "lightbulb" },
      { label: "Two universities", detail: "ICESI and EAFIT", icon: "graduation-cap" },
    ],
    sources: [
      { label: "In-depth interviews", detail: "13 people · Jan to Apr 2025" },
      { label: "Literature review", detail: "10 recent academic studies" },
      { label: "National AI policy", detail: "CONPES 4144 of 2025 · MinCiencias Roadmap 2024" },
    ],
  },

  findingsIntro: {
    eyebrow: "What I found and what I recommend",
    title: [{ text: "Six " }, { text: "findings", accent: "yellow" }] as RichText,
    labels: { found: "What I found", means: "What it means", recommend: "What I recommend" },
  },

  findings: [
    {
      id: "finding-1",
      number: "01",
      short: "AI came in through the back door",
      title: [{ text: "AI has already entered training, but through the " }, { text: "back door", accent: "yellow" }],
      icon: "sparkles",
      visual: "pilots",
      found: [
        "There are real uses: drafting content, analyzing engagement and satisfaction surveys, building learning paths on platforms, assistants that suggest what to study to reach a role in three years, and internal labs where employees test AI on business problems. Some of those labs even turned into services sold to clients.",
        "But almost all of it consists of isolated pilots, driven by one enthusiastic person or team and disconnected from the training strategy. One of the companies, with a strong tech profile, was not yet using AI to train its people. None of the organizations had a coherent framework for doing so.",
      ],
      means:
        "The problem is not a lack of interest. It is that nobody really knows where to start, and without a framework, pilots last a few months and are forgotten. On top of that, when an initiative starts in an area other than learning and development, questions of ownership come up.",
      recommend:
        "Before buying tools or launching pilots, define what AI will be used for in training, with a clear learning goal. And connect the experiments that already exist with the team responsible for developing people, so that what is learned in a lab reaches the training programs.",
    },
    {
      id: "finding-2",
      number: "02",
      short: "The obstacle is readiness",
      title: [{ text: "The obstacle is not technology, it is the " }, { text: "readiness", accent: "yellow" }, { text: " of people and organizations" }],
      icon: "users",
      visual: "barriers",
      found: [
        "The heaviest barriers are human and organizational. HR teams have strong people skills, but often see AI as \"something technical, not my thing\". Many teachers have access to the tools but don't really understand how they work, which limits how they use them in class.",
        "Hype also plays a role: several interviewees warned against investing in technology because it is trendy, without understanding what it is for. And outside the major cities, there is still a basic problem of connectivity, devices and mobile data.",
      ],
      means:
        "There is a paradox: the people who should lead AI training are often the ones who use it the least or understand it the least. Being \"ready\" for AI is not about having the tools, it is about having people who know how to lead it and a shared understanding of what you are trying to achieve.",
      recommend:
        "Train the trainers first: HR teams, learning leaders and teachers. Create a shared decision-making space, such as an advisory board, where HR, instructors, tech leads, managers and learners define the purpose of the strategy together. And in low-connectivity settings, adapt the design (for example, short content delivered through channels people already use) instead of assuming everyone has access.",
    },
    {
      id: "finding-3",
      number: "03",
      short: "Without purpose, people disengage",
      title: [{ text: "Access is not enough: without " }, { text: "purpose", accent: "yellow" }, { text: ", people disengage" }],
      icon: "target",
      visual: "route",
      found: [
        "Even with platforms, content and licenses available, many people are not motivated to learn something new. It is not rejection, it is inertia. People start out enthusiastic and lose interest quickly if they don't understand how it helps them in their role or career. One professional put it this way: show him a roadmap and he moves forward; throw all the content at him and he switches off.",
        "I also found that AI can change the trainer's role: if it is only used to do the same things faster, it is wasted; if it frees trainers from mechanical tasks, it gives them time for what makes the biggest difference, such as critical thinking, creativity and leadership.",
      ],
      highlight: { text: "Show him a roadmap and he moves forward; throw all the content at him and he switches off.", source: "A tech professional" },
      means:
        "AI does not motivate on its own. It works when it organizes and guides learning toward a goal the person recognizes as their own.",
      recommend:
        "Design learning paths by role and by personal goal, not course catalogs. Use AI to show the way (what to learn, in what order and why), not just to produce more content. And use the time AI saves so that trainers can design challenges and give better support.",
    },
    {
      id: "finding-4",
      number: "04",
      short: "Learning how to learn",
      title: [{ text: "Profiles are changing, and the key skill is " }, { text: "learning how to learn", accent: "yellow" }],
      icon: "brain",
      visual: "profile",
      found: [
        "Companies are already looking for hybrid profiles: people who can code but who also understand the business, analyze data, and know how to lead and communicate. Even project coordination roles now need to understand data and AI.",
        "The most valued skill is learning fast, knowing how to find information and knowing how to check whether what you found is correct. At the same time, many companies still screen candidates by formal degrees rather than demonstrated skills.",
      ],
      highlight: { text: "It is no longer a list of courses, it is a different logic of training.", source: "An educator" },
      means:
        "Training for a fixed position is no longer enough. As one educator put it, it is no longer a list of courses, it is a different logic of training. And if companies don't recognize what people learn through paths other than a degree, the impact of any AI-supported training stays limited.",
      recommend:
        "Include the skills of learning, unlearning and verifying information in every program. Train for combinations of skills (technical, business, data, communication), not just for tools. And move toward hiring and promotion processes that recognize demonstrated skills, not only degrees.",
    },
    {
      id: "finding-5",
      number: "05",
      short: "Trust has to be earned",
      title: [{ text: "There is interest, but " }, { text: "trust", accent: "yellow" }, { text: " has to be earned" }],
      icon: "heart-handshake",
      visual: "trust",
      found: [
        "Interviewees see the potential, but they are wary. They worry that AI gives answers that sound right but are wrong (this happens even to technical professionals), that it is biased and that it is not transparent. One company decided not to automate critical decisions because it did not want AI to be seen as an oracle.",
        "On top of this, Colombian public policy is heading in the right direction but has not yet turned into practical guidance, especially for education. Several interviewees said that everyone is doing the best they can.",
      ],
      means:
        "Until there are clear rules from outside, each organization has to set its own. And training cannot stop at teaching people how to use the tool: it has to teach them to question it.",
      recommend:
        "Create internal policies for the responsible use of AI, with HR involved and not only legal or technical teams. Always keep a person reviewing what AI produces, especially in decisions that affect people. And teach people to doubt, to cross-check and not to accept every automated answer as valid.",
    },
    {
      id: "finding-6",
      number: "06",
      short: "Nobody is measuring whether it works",
      title: [{ text: "Nobody is " }, { text: "measuring", accent: "yellow" }, { text: " whether it works" }],
      icon: "search",
      visual: "measure",
      found: [
        "None of the participating companies had thought about how to evaluate AI-supported training. There was no plan, no indicators and no idea of what success would look like.",
        "Some interviewees acknowledged this as a problem: if you don't know whether it saves time or improves performance, it is very hard to justify scaling the initiative.",
      ],
      means:
        "Today, AI is seen mainly as a tool for producing content, not as part of a strategy that needs follow-up and accountability. It is the weakest point and, at the same time, the biggest opportunity.",
      recommend:
        "Define from the start what counts as success. Measure whether training improves performance, closes specific gaps or supports career growth, not just how many courses were completed. Use AI to analyze progress and feedback data, but with people interpreting the results. And ask learners how they experience AI: whether they trust it and whether they feel supported or replaced.",
    },
  ] satisfies Finding[],

  guide: {
    eyebrow: "The guide",
    title: [{ text: "How to move from isolated pilots to a " }, { text: "strategy", accent: "yellow" }] as RichText,
    intro:
      "Based on these findings, I built a practical guide for companies and educational institutions that want to bring generative AI into talent development. It has two parts that work together:",
    parts: [
      { label: "Five steps", text: "say what to do and in what order." },
      { label: "Five principles", text: "say how to know whether it is being done well at each step." },
    ],
    origin: {
      title: "Where the steps come from",
      text: "The steps follow the ADDIE model (Analyze, Design, Develop, Implement, Evaluate), one of the most widely used frameworks in the world for designing training programs. I did not invent it. I used it as a structure to organize, at each stage, the recommendations that came out of the interviews and the literature. The advantage is that many learning teams already know it, so AI becomes part of a familiar process instead of something separate.",
    },
    stepsTitle: "The five steps",
    steps: [
      {
        letter: "A",
        name: "Analyze",
        what: "Understand what the organization needs before adopting anything",
        ai: [
          "Diagnose the skills each role requires (AI can analyze job descriptions and profiles).",
          "Assess whether the organization is ready: leadership, trainer capacity and openness to change, not just technology.",
          "Involve HR, trainers, tech leads and learners from the start.",
          "Define what AI will be used for.",
        ],
      },
      {
        letter: "D",
        name: "Design",
        what: "Define what will be learned, how and with which resources",
        ai: [
          "Create personalized learning paths based on each person's goal.",
          "Use AI to simulate how someone in the target role would experience the program, to spot missing topics.",
          "Have human experts validate and adjust everything.",
        ],
      },
      {
        letter: "D",
        name: "Develop",
        what: "Produce the materials and activities",
        ai: [
          "Use AI to draft texts, cases, exercises or slides.",
          "Create versions of the same content for different roles or levels.",
          "Human review of everything AI produces.",
        ],
      },
      {
        letter: "I",
        name: "Implement",
        what: "Bring the training to people",
        ai: [
          "Start with small pilots in controlled environments, such as internal labs.",
          "Support learners and trainers through the change.",
          "Use AI assistants that answer questions, suggest the next step and track progress, which makes it possible to reach more people with fewer resources.",
        ],
      },
      {
        letter: "E",
        name: "Evaluate",
        what: "Measure the impact and adjust",
        ai: [
          "Measure changes in performance and gaps closed, not just courses completed.",
          "Use AI to analyze progress and feedback, with people interpreting.",
          "Also assess learners' trust and perceptions.",
        ],
      },
    ],
    principlesTitle: "The five principles",
    principlesIntro:
      "The principles are not an extra step. They came out of tensions that showed up again and again in the interviews, and they apply across all five stages. They work as checkpoint questions before each decision.",
    principles: [
      {
        name: "Intentional use and readiness",
        meaning: "AI is adopted because of a clear learning strategy, with leadership support, not because of hype or market pressure",
        question: "Why are we using AI here, and are we ready to do it?",
        icon: "target",
      },
      {
        name: "Learning integrity and ethics",
        meaning: "Everything AI produces is reviewed with pedagogical and ethical judgment",
        question: "Who reviewed this, and against what criteria?",
        icon: "user-round-check",
      },
      {
        name: "Personalization with purpose",
        meaning: "Personalization responds to the real needs of the role and to the person's goals",
        question: "Does this bring the person closer to a goal they recognize as their own?",
        icon: "rocket",
      },
      {
        name: "Active and reflective learning",
        meaning: "People learn by experimenting, with autonomy and by questioning AI, not by passively consuming content",
        question: "Is the person doing and thinking, or just receiving content?",
        icon: "lightbulb",
      },
      {
        name: "Equity and access",
        meaning: "Solutions must be accessible and affordable, especially in low-resource settings",
        question: "Does this reduce or widen the access gaps that already exist?",
        icon: "globe",
      },
    ],
    example: {
      title: "An example of how they combine",
      text: "In the Develop step, AI makes it possible to produce materials quickly. The integrity principle requires a person to review them, the active learning principle asks for those materials to be challenges and not just readings, and the equity principle is a reminder that they also have to work where connectivity is low.",
      step: 2,
      principles: [1, 3, 4],
    },
  },

  conclusion: {
    eyebrow: "The conclusion",
    title: [{ text: "It doesn't depend on the tool, but on " }, { text: "how it is used", accent: "yellow" }] as RichText,
    text: "Generative AI can help close the skills gap in Colombia. It can make training more accessible, more affordable and better suited to each person, and open the door to roles that were previously out of reach. But that outcome doesn't depend on the tool, it depends on how it is used: with a clear purpose, with people prepared to lead it, with human judgment at every step and with a way to measure whether it works.",
    conditions: ["A clear purpose", "People prepared to lead it", "Human judgment at every step", "A way to measure whether it works"],
    question:
      "The underlying question is not only what AI can do, because today it can do almost anything we can imagine, but what kind of learning and development spaces we want to create, who we want to include and how we are going to evaluate them.",
  },

  next: {
    eyebrow: "What comes next",
    title: [{ text: "Are these findings still " }, { text: "true", accent: "yellow" }, { text: "?" }] as RichText,
    text: "The interviews took place in March and April 2025. Generative AI changes very quickly, and some things probably look different now. That is why the next stage of this work is to compare the findings with what is happening today: what has moved forward, what has stayed the same and what has appeared that was not on the radar.",
    timeline: [
      { when: "2025", label: "Interviews, literature and public policy" },
      { when: "2025", label: "Findings and guide" },
      { when: "Today", label: "Compare with what is happening now", current: true },
    ],
    checks: ["What has moved forward", "What has stayed the same", "What appeared that was not on the radar"],
  },

  collaborate: {
    eyebrow: "Let's work together",
    title: [{ text: "I'd love to " }, { text: "talk", accent: "yellow" }, { text: " with you" }] as RichText,
    intro:
      "If you work on these topics, want to learn about the guide or talk about the research, or want to be part of the next phase, let's talk. This invitation is for individuals and organizations alike.",
    options: [
      {
        label: "Let's talk about the research",
        text: "I present it to you or your team and we exchange ideas. If these topics interest you, we can explore questions or projects together.",
      },
      {
        label: "Be part of the next phase",
        text: "You tell me how the use of AI in your work has changed since 2025 and we compare your experience with the findings. I'll share the updated results with you before they are published.",
      },
      {
        label: "Let's apply the guide",
        text: "We review where you or your organization stand and design a small pilot, with a clear way to measure whether it works.",
      },
    ],
    audiences: [
      {
        label: "Individuals",
        items: ["Tech professionals", "Talent and learning leaders", "Teachers", "Researchers"],
      },
      {
        label: "Organizations",
        items: ["Tech companies", "Edtechs and NGOs", "Higher education institutions"],
      },
    ],
    closing: "More ideas. More connections.",
    author: "Juan David Ramírez Jaramillo",
    cta: "Let's talk",
  },

  labels: {
    sectionsNav: "Report sections",
    photoAlt: "Juan David Ramírez presenting his master's thesis defense at Malmö University",
    promise: "The promise of generative AI",
    question: "What I wanted to understand in Colombia",
    orgs: "7 organizations that develop tech talent",
    sources: "Three sources compared",
    analysis: "Thematic analysis",
    ladder: "Ways to work together",
    audienceTabs: "Who this invitation is for",
    partsJoin: "which",
    participants: {
      head: "people interviewed, by profile",
      of: "of",
      caption: "People interviewed by profile",
      profile: "Profile",
      people: "People",
    },
    guide: {
      what: "What it involves",
      ai: "What to do with AI",
      principle: "Principle",
      matrix: "Steps × principles",
      matrixLead: "Each principle is a checkpoint question at each of the five steps. Pick a step above or see the example.",
      hideExample: "Hide the example",
      matrixCaption: "The five principles apply at each of the five steps",
      applies: "Applies",
    },
    pdf: {
      title: "(PDF)",
      toc: "Contents",
      webVersion: "Interactive web version:",
      contactTag: "Let's talk",
      webTag: "Web report",
      footer: "Malmö University · 2025",
    },
  },

  visuals: {
    skills: { current: "Current role", next: "New role" },
    pilots: {
      aria: "Isolated AI pilots around the training strategy, not connected to it",
      center: ["Training", "strategy"],
      items: ["Content drafts", "Engagement surveys", "Platform learning paths", "Career assistants", "Internal labs"],
      stat: "0 of 7",
      statText: "organizations had a coherent framework for using AI in training",
    },
    barriers: {
      items: [
        { t: "HR teams:", d: "see AI as \"something technical, not my thing\"" },
        { t: "Teachers:", d: "have access, but don't really understand how it works" },
        { t: "Hype:", d: "investing in technology without understanding what it is for" },
        { t: "Connectivity:", d: "devices and mobile data are missing outside the major cities" },
      ],
      paradoxLabel: "The paradox",
      paradox: "The people who should lead AI training are often the ones who use it the least or understand it the least.",
    },
    route: {
      aria: "An unordered catalog of courses versus a route of steps toward a goal",
      catalog: "Catalog",
      catalogResult: "switches off",
      route: "Route",
      goal: "goal",
      routeResult: "moves forward",
    },
    profile: {
      aria: "Hybrid profile: coding, understanding the business, analyzing data, and leading and communicating, around learning how to learn",
      nodes: ["Coding", "Understanding\nthe business", "Analyzing data", "Leading and\ncommunicating"],
      center: ["Learning", "how to learn"],
      chips: ["Learning fast", "Finding information", "Checking if it is correct"],
    },
    trust: {
      concerns: ["Answers that sound right but are wrong", "Bias", "Lack of transparency"],
      aria: "What AI produces goes through a person who reviews it before a decision that affects people",
      ai: "AI",
      person: ["A person", "reviews"],
      decision: "Decision",
    },
    measure: {
      zeroText: "evaluation plans, indicators or definitions of success among the participating companies",
      head: "What to measure",
      no: "Only courses completed",
      items: ["Better performance", "Specific gaps closed", "Career growth", "Learners' trust"],
    },
  },
};
