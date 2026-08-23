/* ============================================================
   CAREERCOMPASS — vanilla JS single-page app
   ============================================================ */

const EYE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>`;

// ============================================================
// DATA
// ============================================================
// `group` = coarse category (used by prose-fallback templates).
// `subgroup` = fine-grained field shown in the picker & report.
const CAREERS = [
  // Finance & Markets
  { id: "ib", label: "Investment Banker", group: "Business & Money", subgroup: "Finance & Markets", plain: "Helps big companies buy other companies. Long hours, high pay, lots of spreadsheets.", tag: "M&A analyst at a bulge bracket bank" },
  { id: "quant", label: "Quant Trader", group: "Business & Money", subgroup: "Finance & Markets", plain: "Uses math and code to trade stocks and make (or lose) money fast.", tag: "prop desk, systematic strategies" },
  { id: "trader", label: "Public Markets Trader", group: "Business & Money", subgroup: "Finance & Markets", plain: "Buys and sells stocks, bonds, or currencies all day. Fast decisions, real money.", tag: "sell-side trading desk" },
  { id: "accountant", label: "Accountant", group: "Business & Money", subgroup: "Finance & Markets", plain: "Keeps a company's numbers honest and audited. Detail-heavy, deadline-driven.", tag: "Big Four audit / senior associate" },
  { id: "actuary", label: "Actuary", group: "Business & Money", subgroup: "Finance & Markets", plain: "Uses statistics to price risk for insurance and pensions. Long exams, stable pay.", tag: "life / P&C insurer" },

  // Strategy & Consulting
  { id: "consult", label: "Management Consultant", group: "Business & Money", subgroup: "Strategy & Consulting", plain: "Companies hire you to solve their biggest problems. Lots of travel, slide decks, meetings.", tag: "MBB firm, client on-site" },
  { id: "strategist", label: "Corporate Strategist", group: "Business & Money", subgroup: "Strategy & Consulting", plain: "Figures out where a company should place its next bet. Fewer clients, deeper dives.", tag: "in-house strategy team, Fortune 500" },

  // Entrepreneurship & Product
  { id: "founder", label: "Startup Founder", group: "Business & Money", subgroup: "Entrepreneurship & Product", plain: "Starts a company from scratch. High risk, high freedom, mostly chaos.", tag: "early-stage founder, pre-revenue" },
  { id: "pm", label: "Product Manager", group: "Business & Money", subgroup: "Entrepreneurship & Product", plain: "Decides what an app or product should do next. Talks to everyone all day.", tag: "B2C app, growth stage" },
  { id: "vc", label: "Venture Capitalist", group: "Business & Money", subgroup: "Entrepreneurship & Product", plain: "Picks which startups to fund. Half judgement, half hustle, long feedback loop.", tag: "early-stage VC firm" },
  { id: "growth", label: "Growth Lead", group: "Business & Money", subgroup: "Entrepreneurship & Product", plain: "Runs experiments to make more users show up and stick. Half marketing, half data.", tag: "growth team at a scale-up" },

  // Marketing & Brand
  { id: "marketing", label: "Brand Marketer", group: "Business & Money", subgroup: "Marketing & Brand", plain: "Builds how people feel about a brand. Half creative, half data.", tag: "D2C brand, performance + creative" },
  { id: "pr", label: "PR Lead", group: "Business & Money", subgroup: "Marketing & Brand", plain: "Shapes what the press and public say about a company. Crisis calls at 2am.", tag: "in-house comms, growth-stage" },
  { id: "smm", label: "Social Media Manager", group: "Business & Money", subgroup: "Marketing & Brand", plain: "Runs a brand's voice on TikTok, IG, X. Trends move faster than approval chains.", tag: "consumer brand, always-on" },

  // Software & Engineering
  { id: "swe", label: "Software Engineer", group: "Tech & Science", subgroup: "Software & Engineering", plain: "Writes code to build apps, websites, or systems. Deep focus work.", tag: "product team at a scale-up" },
  { id: "dataeng", label: "Data Engineer", group: "Tech & Science", subgroup: "Software & Engineering", plain: "Builds the pipes that move data from where it's made to where it's used.", tag: "platform team at a data-heavy company" },
  { id: "secureng", label: "Security Engineer", group: "Tech & Science", subgroup: "Software & Engineering", plain: "Finds ways attackers could break in, then closes them. Paranoid by profession.", tag: "product security, mid-size tech" },

  // Data, AI & Research
  { id: "ml", label: "AI / ML Engineer", group: "Tech & Science", subgroup: "Data, AI & Research", plain: "Trains computers to learn from data — like the systems behind ChatGPT.", tag: "applied ML at a tech company" },
  { id: "econ", label: "Economist", group: "Tech & Science", subgroup: "Data, AI & Research", plain: "Studies how money, jobs, and markets work at the country level.", tag: "central bank / policy research" },
  { id: "astro", label: "Astrophysicist", group: "Tech & Science", subgroup: "Data, AI & Research", plain: "Studies stars, planets, and space using big telescopes and lots of data.", tag: "research astronomer at a university" },
  { id: "datasci", label: "Data Scientist", group: "Tech & Science", subgroup: "Data, AI & Research", plain: "Turns messy data into decisions. Half statistician, half storyteller.", tag: "analytics team at a product company" },
  { id: "researchsci", label: "Research Scientist", group: "Tech & Science", subgroup: "Data, AI & Research", plain: "Publishes new science. Grants, papers, and long payoffs.", tag: "R&D lab / university" },

  // Design & Architecture
  { id: "designer", label: "Product Designer", group: "Tech & Science", subgroup: "Design & Architecture", plain: "Designs how apps look and feel. Sketches, prototypes, lots of feedback.", tag: "UX/UI at a product startup" },
  { id: "architect", label: "Architect", group: "Creative", subgroup: "Design & Architecture", plain: "Designs buildings people will live and work in for decades.", tag: "design firm, urban projects" },
  { id: "indusdesign", label: "Industrial Designer", group: "Creative", subgroup: "Design & Architecture", plain: "Designs physical products — chairs, phones, cars. Form meets manufacturing.", tag: "consumer hardware studio" },
  { id: "gamedesign", label: "Game Designer", group: "Creative", subgroup: "Design & Architecture", plain: "Designs how a game feels to play — rules, levels, moment-to-moment fun.", tag: "mid-size game studio" },

  // Medicine & Health
  { id: "doctor", label: "Doctor", group: "People & Impact", subgroup: "Medicine & Health", plain: "Diagnoses and treats patients. Years of training, high stakes, real lives.", tag: "hospital medicine, residency" },
  { id: "nurse", label: "Nurse", group: "People & Impact", subgroup: "Medicine & Health", plain: "Front-line patient care. Long shifts on your feet, life-and-death moments.", tag: "hospital floor nurse" },
  { id: "therapist", label: "Therapist", group: "People & Impact", subgroup: "Medicine & Health", plain: "Helps people work through hard things by talking. Deep listening as a job.", tag: "clinical psychologist, private practice" },
  { id: "dentist", label: "Dentist", group: "People & Impact", subgroup: "Medicine & Health", plain: "Fixes teeth. Precise handwork, own your own practice, predictable hours.", tag: "private practice dentist" },
  { id: "vet", label: "Veterinarian", group: "People & Impact", subgroup: "Medicine & Health", plain: "Doctor for animals. Ranges from puppies to livestock, emotional and physical.", tag: "small-animal clinic" },

  // Law, Policy & Public Service
  { id: "law", label: "Corporate Lawyer", group: "People & Impact", subgroup: "Law, Policy & Public Service", plain: "Writes and negotiates contracts for big deals. Detail-obsessed and deadline-driven.", tag: "M&A practice, big firm" },
  { id: "policy", label: "Policy Analyst", group: "People & Impact", subgroup: "Law, Policy & Public Service", plain: "Researches how laws and rules should change. Slow-moving, high-leverage.", tag: "think tank / govt agency" },
  { id: "diplomat", label: "Diplomat", group: "People & Impact", subgroup: "Law, Policy & Public Service", plain: "Represents a country abroad. Postings move every few years.", tag: "foreign service officer" },

  // Media, Writing & Film
  { id: "journalist", label: "Journalist", group: "People & Impact", subgroup: "Media, Writing & Film", plain: "Digs up stories that matter. Interviews, writing, tight deadlines.", tag: "news reporter at a major outlet" },
  { id: "director", label: "Film Director", group: "Creative", subgroup: "Media, Writing & Film", plain: "Turns a script into a movie. Leads a huge team through months of chaos.", tag: "narrative feature, mid-budget" },
  { id: "novelist", label: "Novelist", group: "Creative", subgroup: "Media, Writing & Film", plain: "Writes books. Mostly alone, mostly for years before anyone reads it.", tag: "working novelist, mid-list" },
  { id: "musician", label: "Musician", group: "Creative", subgroup: "Media, Writing & Film", plain: "Makes music for a living. Craft + business + touring stamina.", tag: "independent recording artist" },
  { id: "actor", label: "Actor", group: "Creative", subgroup: "Media, Writing & Film", plain: "Performs on stage or screen. Constant auditions, sparse steady work.", tag: "working actor, film + theatre" },
  { id: "photographer", label: "Photographer", group: "Creative", subgroup: "Media, Writing & Film", plain: "Sees things others don't and captures them. Freelance rhythm.", tag: "editorial / commercial photographer" },

  // Education & Coaching
  { id: "teacher", label: "Teacher", group: "People & Impact", subgroup: "Education & Coaching", plain: "Explains hard ideas so 30 kids get them. Endless energy required.", tag: "high school teacher, public school" },
  { id: "professor", label: "University Professor", group: "People & Impact", subgroup: "Education & Coaching", plain: "Teaches at university and does research. Long path, real autonomy after tenure.", tag: "tenure-track faculty" },
  { id: "coach", label: "Coach", group: "People & Impact", subgroup: "Education & Coaching", plain: "Trains athletes or teams. Half tactician, half psychologist.", tag: "sport coach, competitive level" },

  // Craft & Trades
  { id: "chef", label: "Chef", group: "Creative", subgroup: "Craft & Trades", plain: "Runs a professional kitchen. Physical, precise, unforgiving.", tag: "head chef, fine dining" },
  { id: "carpenter", label: "Carpenter", group: "Creative", subgroup: "Craft & Trades", plain: "Builds and finishes real things in wood. Hands, tools, visible results.", tag: "custom / finish carpentry" },
  { id: "mechanic", label: "Mechanic", group: "Creative", subgroup: "Craft & Trades", plain: "Diagnoses and fixes what other people can't. Grease, tools, satisfaction.", tag: "auto shop / specialty vehicles" },
  { id: "pilot", label: "Pilot", group: "Creative", subgroup: "Craft & Trades", plain: "Flies commercial aircraft. Precision under pressure, life on a schedule.", tag: "commercial airline pilot" },
];
const CAREER_GROUPS = ["Business & Money", "Tech & Science", "People & Impact", "Creative"];
const CAREER_SUBGROUPS = [
  "Finance & Markets",
  "Strategy & Consulting",
  "Entrepreneurship & Product",
  "Marketing & Brand",
  "Software & Engineering",
  "Data, AI & Research",
  "Design & Architecture",
  "Medicine & Health",
  "Law, Policy & Public Service",
  "Media, Writing & Film",
  "Education & Coaching",
  "Craft & Trades",
];
// One-line description of what draws someone to each subgroup — shown under the
// subgroup's fit score on the report. Kept honest to the field, not flattering.
const SUBGROUP_WHY = {
  "Finance & Markets": "You're comfortable with numbers, risk, and high-stakes decisions where the scoreboard is money.",
  "Strategy & Consulting": "You like structuring messy problems and being the outsider who tells a company what to do.",
  "Entrepreneurship & Product": "You want ownership and would rather ship something imperfect than argue about it.",
  "Marketing & Brand": "You care about how things feel to real people and can hold creative and analytical in the same head.",
  "Software & Engineering": "You'd rather build a working system than talk about one, and you don't mind long stretches of quiet focus.",
  "Data, AI & Research": "You want to understand things deeply and are patient enough for long feedback loops.",
  "Design & Architecture": "You care how things look, feel, and work — and can hold shape, function, and constraint at once.",
  "Medicine & Health": "You want to help people in a concrete, physical way and can hold responsibility under pressure.",
  "Law, Policy & Public Service": "You care about rules and their consequences, and can argue precisely without losing the plot.",
  "Media, Writing & Film": "You have a point of view and want it to reach people — through words, images, or moving pictures.",
  "Education & Coaching": "You get real satisfaction from someone else getting better because of you.",
  "Craft & Trades": "You'd rather make something real with your hands than move ideas around on a screen.",
};
const SIM_READY = new Set(["ib", "swe", "doctor", "founder", "marketing", "teacher", "ml", "law", "chef", "consult", "architect", "econ", "quant", "journalist", "director", "designer", "pm", "astro"]);

const INTERESTS_QUIZ = {
  key: "interests",
  title: "What actually interests you?",
  subtitle: "12 quick questions. No wrong answers.",
  scale: ["Not me at all", "Kinda not me", "Neutral", "Kinda me", "Very me"],
  items: [
    { q: "I like breaking down messy problems into logical steps." },
    { q: "I get lost in drawing, writing, or making things look good." },
    { q: "I feel energized after a long conversation with someone new." },
    { q: "I'd rather build something with my hands than just talk about it." },
    { q: "I've thought about starting my own thing — a business, a club, a channel." },
    { q: "I ask 'but why?' a lot, even when people are tired of it." },
    { q: "Numbers, patterns, and puzzles genuinely excite me." },
    { q: "I care a lot about helping people — even strangers." },
    { q: "I'd pick a hands-on project over a research paper every time." },
    { q: "I like being in charge and convincing people to try my ideas." },
    { q: "I lose track of time when I'm making art, music, or writing." },
    { q: "I want to understand how something works, not just use it." },
  ],
};

const STRENGTHS_QUIZ = {
  key: "strengths",
  title: "What are you actually good at?",
  subtitle: "Rate yourself honestly. This isn't a school report.",
  scale: ["Not a strength", "Below average", "Okay", "Strong", "Really strong"],
  items: [
    { q: "Solving hard math or logic problems." },
    { q: "Writing something so clearly a stranger gets it in one read." },
    { q: "Talking in front of a room without freezing." },
    { q: "Coming up with ideas nobody else thought of." },
    { q: "Sitting with one hard task for hours without giving up." },
    { q: "Getting a group to actually finish a project." },
    { q: "Noticing when a friend is upset before they say anything." },
    { q: "Fixing, building, or making something physical work." },
    { q: "Spotting the flaw in someone's argument." },
    { q: "Convincing someone to change their mind." },
  ],
};

const WEAKNESSES_QUIZ = {
  key: "weaknesses",
  title: "Where do you struggle?",
  subtitle: "Being honest here makes the report way more useful.",
  scale: ["Never a problem", "Rarely", "Sometimes", "Often", "Constant issue"],
  items: [
    { q: "I put off tasks until the last possible minute." },
    { q: "I open a book, then I'm on my phone 10 minutes later." },
    { q: "I avoid saying what I think if it might upset someone." },
    { q: "I quit projects when they get boring, even if they matter." },
    { q: "I redo work until it's 'perfect' and miss deadlines." },
    { q: "I skim the fine print and later realize I missed something." },
    { q: "Being around people all day exhausts me." },
    { q: "I need someone else to keep me on track." },
  ],
};

const VALUES_QUIZ = {
  key: "values",
  title: "What do you actually want out of work?",
  subtitle: "Pick what matters most — not what sounds good.",
  scale: ["Doesn't matter", "Slightly matters", "Matters some", "Matters a lot", "Non-negotiable"],
  items: [
    { q: "Earning a lot — enough to buy what I want without thinking." },
    { q: "Actually helping people or the planet in a real way." },
    { q: "Setting my own schedule and being my own boss." },
    { q: "Working somewhere people recognize the name." },
    { q: "Knowing my paycheck will show up every month, no surprises." },
    { q: "Learning something new almost every week." },
    { q: "Being home for dinner, weekends off, real vacations." },
    { q: "Making things — writing, designing, building — that are mine." },
  ],
};

const WORKSTYLE_QUIZ = {
  key: "workstyle",
  title: "How do you work best?",
  subtitle: "Pick the option that feels more like you.",
  binary: true,
  items: [
    { q: "You'd rather work…", opts: [{ label: "Alone, deep focus", tag: "solo" }, { label: "In a team, bouncing ideas", tag: "team" }] },
    { q: "You'd rather have…", opts: [{ label: "A clear plan for the day", tag: "structured" }, { label: "Freedom to figure it out", tag: "flexible" }] },
    { q: "You care more about…", opts: [{ label: "The big picture", tag: "bigpicture" }, { label: "Getting every detail right", tag: "detail" }] },
    { q: "You'd rather…", opts: [{ label: "Move fast, ship, iterate", tag: "fast" }, { label: "Go slow, get it right", tag: "careful" }] },
    { q: "Risk-wise, you're more…", opts: [{ label: "Bet big, could lose", tag: "risk" }, { label: "Steady, safe wins", tag: "safe" }] },
    { q: "You'd rather learn by…", opts: [{ label: "Reading and studying first", tag: "theory" }, { label: "Just doing it and failing", tag: "doing" }] },
    { q: "You lead by…", opts: [{ label: "Being the loudest voice", tag: "front" }, { label: "Making others look good", tag: "back" }] },
    { q: "You'd rather…", opts: [{ label: "One deep obsession", tag: "specialist" }, { label: "Many things at once", tag: "generalist" }] },
  ],
};

const QUIZZES = [INTERESTS_QUIZ, STRENGTHS_QUIZ, WEAKNESSES_QUIZ, VALUES_QUIZ, WORKSTYLE_QUIZ];

// ============================================================
// SCORING ENGINE — maps quiz answers to career fit (fully local, no API)
// ============================================================
const QUIZ_TAGS = {
  interests: [
    { analytical: 2, investigative: 1 }, { creative: 2 }, { social: 2 },
    { practical: 2 }, { entrepreneurial: 2 }, { investigative: 2, analytical: 1 },
    { analytical: 2 }, { social: 2 }, { practical: 2 },
    { entrepreneurial: 2, social: 1 }, { creative: 2 }, { investigative: 2 },
  ],
  strengths: [
    { logic: 2 }, { writing: 2 }, { speaking: 2 }, { creativity: 2 },
    { focus: 2 }, { leadership: 2 }, { empathy: 2 }, { hands: 2 },
    // Q8: "spotting the flaw in someone's argument" — pure logic, no writing.
    // Was mis-tagged as {logic:1, writing:1} which double-counted argument
    // critique into writing scores.
    { logic: 2 }, { speaking: 2 },
  ],
  weaknesses: [
    { procrastination: 2 }, { focus_bad: 2 }, { conflict_avoid: 2 },
    { boredom: 2 }, { perfectionism: 2 }, { detail_bad: 2 },
    { social_drain: 2 }, { focus_bad: 1, procrastination: 1 },
  ],
  values: [
    { money: 2 }, { impact: 2 }, { freedom: 2 }, { prestige: 2 },
    { stability: 2 }, { growth: 2 }, { balance: 2 }, { creativity_val: 2 },
  ],
};

// Each entry: [quizKey, dimension, direction (+1 want high / -1 want low), weight]
const CAREER_FIT = {
  ib: [
    ["interests","analytical",1,3],["interests","entrepreneurial",1,1],
    ["strengths","logic",1,3],["strengths","focus",1,2],["strengths","speaking",1,1],
    ["values","money",1,3],["values","prestige",1,3],
    ["values","balance",-1,4],["values","stability",-1,2],["values","freedom",-1,1],
    ["weaknesses","procrastination",-1,2],["weaknesses","detail_bad",-1,3],
    ["weaknesses","boredom",-1,2],["weaknesses","social_drain",-1,1],
    ["workstyle","detail",1,2],["workstyle","structured",1,1],["workstyle","front",1,1],
  ],
  consult: [
    ["interests","analytical",1,3],["interests","social",1,2],["interests","entrepreneurial",1,1],
    ["strengths","speaking",1,3],["strengths","logic",1,2],["strengths","writing",1,2],["strengths","leadership",1,1],
    ["values","money",1,2],["values","prestige",1,3],["values","growth",1,2],
    ["values","balance",-1,3],["values","stability",-1,2],
    ["weaknesses","social_drain",-1,3],["weaknesses","procrastination",-1,1],
    ["workstyle","team",1,2],["workstyle","bigpicture",1,2],["workstyle","fast",1,1],["workstyle","generalist",1,1],
  ],
  quant: [
    ["interests","analytical",1,3],["interests","investigative",1,3],
    ["strengths","logic",1,3],["strengths","focus",1,3],
    ["values","money",1,3],["values","growth",1,2],
    ["values","balance",-1,3],["values","stability",-1,2],
    ["weaknesses","focus_bad",-1,3],["weaknesses","procrastination",-1,2],
    ["workstyle","solo",1,2],["workstyle","detail",1,2],["workstyle","specialist",1,2],
  ],
  founder: [
    ["interests","entrepreneurial",1,3],["interests","creative",1,2],["interests","social",1,1],
    ["strengths","leadership",1,3],["strengths","speaking",1,2],["strengths","creativity",1,2],
    ["values","freedom",1,3],["values","growth",1,3],["values","creativity_val",1,1],
    ["values","stability",-1,4],["values","balance",-1,3],
    ["weaknesses","conflict_avoid",-1,2],["weaknesses","perfectionism",-1,1],
    ["weaknesses","social_drain",-1,2],
    ["workstyle","flexible",1,2],["workstyle","fast",1,2],["workstyle","risk",1,3],
    ["workstyle","generalist",1,2],["workstyle","front",1,1],
  ],
  pm: [
    ["interests","analytical",1,2],["interests","social",1,2],["interests","creative",1,1],["interests","entrepreneurial",1,1],
    ["strengths","writing",1,2],["strengths","speaking",1,2],["strengths","empathy",1,2],["strengths","leadership",1,2],
    ["values","growth",1,2],["values","money",1,2],["values","prestige",1,1],["values","creativity_val",1,1],
    ["weaknesses","conflict_avoid",-1,2],["weaknesses","social_drain",-1,2],
    ["workstyle","team",1,2],["workstyle","flexible",1,1],["workstyle","bigpicture",1,2],["workstyle","generalist",1,2],
  ],
  marketing: [
    ["interests","creative",1,3],["interests","social",1,2],["interests","analytical",1,1],
    ["strengths","writing",1,3],["strengths","creativity",1,3],["strengths","empathy",1,1],
    ["values","creativity_val",1,3],["values","growth",1,1],
    ["weaknesses","social_drain",-1,2],
    ["workstyle","team",1,1],["workstyle","flexible",1,1],["workstyle","fast",1,2],
  ],
  swe: [
    ["interests","analytical",1,3],["interests","investigative",1,2],["interests","practical",1,2],
    ["strengths","logic",1,3],["strengths","focus",1,3],
    ["values","money",1,2],["values","growth",1,2],["values","freedom",1,1],["values","balance",1,1],
    ["weaknesses","focus_bad",-1,3],["weaknesses","procrastination",-1,2],
    ["workstyle","solo",1,2],["workstyle","detail",1,2],["workstyle","specialist",1,1],
  ],
  ml: [
    ["interests","analytical",1,3],["interests","investigative",1,3],
    ["strengths","logic",1,3],["strengths","focus",1,3],
    ["values","money",1,2],["values","growth",1,3],["values","prestige",1,2],
    ["weaknesses","focus_bad",-1,3],
    ["workstyle","solo",1,2],["workstyle","structured",1,1],["workstyle","specialist",1,2],
  ],
  designer: [
    ["interests","creative",1,3],["interests","social",1,1],["interests","analytical",1,1],
    ["strengths","creativity",1,3],["strengths","empathy",1,2],
    ["values","creativity_val",1,3],["values","balance",1,1],["values","growth",1,1],
    ["workstyle","team",1,1],["workstyle","flexible",1,1],["workstyle","detail",1,2],
  ],
  econ: [
    ["interests","analytical",1,2],["interests","investigative",1,3],
    ["strengths","logic",1,2],["strengths","writing",1,3],["strengths","focus",1,2],
    ["values","stability",1,2],["values","growth",1,2],["values","impact",1,2],
    ["workstyle","solo",1,1],["workstyle","theory",1,3],["workstyle","careful",1,2],["workstyle","specialist",1,1],
  ],
  astro: [
    ["interests","investigative",1,3],["interests","analytical",1,3],
    ["strengths","logic",1,3],["strengths","focus",1,3],["strengths","writing",1,2],
    ["values","growth",1,3],["values","impact",1,1],
    ["values","money",-1,3],["values","stability",-1,2],
    ["weaknesses","focus_bad",-1,3],["weaknesses","boredom",-1,3],["weaknesses","procrastination",-1,2],
    ["workstyle","solo",1,2],["workstyle","theory",1,3],["workstyle","careful",1,2],["workstyle","specialist",1,2],
  ],
  doctor: [
    ["interests","investigative",1,2],["interests","social",1,3],["interests","practical",1,2],
    ["strengths","focus",1,3],["strengths","empathy",1,3],["strengths","hands",1,2],
    ["values","stability",1,2],["values","impact",1,3],["values","prestige",1,2],
    ["values","balance",-1,3],
    ["weaknesses","procrastination",-1,3],["weaknesses","detail_bad",-1,3],["weaknesses","boredom",-1,1],
    ["weaknesses","social_drain",-1,3],
    ["workstyle","structured",1,2],["workstyle","careful",1,2],["workstyle","detail",1,2],["workstyle","team",1,1],
  ],
  law: [
    ["interests","analytical",1,2],["interests","investigative",1,2],
    ["strengths","writing",1,3],["strengths","speaking",1,3],["strengths","logic",1,3],["strengths","focus",1,2],
    ["values","money",1,3],["values","prestige",1,3],["values","stability",1,1],
    ["values","balance",-1,3],
    ["weaknesses","detail_bad",-1,3],["weaknesses","procrastination",-1,2],
    ["workstyle","structured",1,2],["workstyle","detail",1,3],["workstyle","careful",1,2],["workstyle","specialist",1,1],
  ],
  teacher: [
    ["interests","social",1,3],["interests","investigative",1,1],
    ["strengths","speaking",1,3],["strengths","empathy",1,3],["strengths","leadership",1,1],
    ["values","impact",1,3],["values","balance",1,1],["values","stability",1,2],
    ["values","money",-1,2],
    ["weaknesses","social_drain",-1,3],
    ["workstyle","team",1,1],["workstyle","structured",1,2],["workstyle","front",1,2],
  ],
  journalist: [
    ["interests","investigative",1,3],["interests","social",1,2],["interests","creative",1,1],
    ["strengths","writing",1,3],["strengths","speaking",1,1],["strengths","empathy",1,1],
    ["values","impact",1,3],["values","creativity_val",1,1],["values","growth",1,1],
    ["values","stability",-1,2],["values","money",-1,2],
    ["weaknesses","procrastination",-1,2],["weaknesses","conflict_avoid",-1,2],
    ["workstyle","flexible",1,1],["workstyle","fast",1,2],["workstyle","generalist",1,1],
  ],
  director: [
    ["interests","creative",1,3],["interests","social",1,2],["interests","entrepreneurial",1,1],
    ["strengths","leadership",1,3],["strengths","creativity",1,3],["strengths","empathy",1,2],
    ["values","creativity_val",1,3],["values","freedom",1,2],
    ["values","stability",-1,3],["values","balance",-1,2],
    ["weaknesses","conflict_avoid",-1,2],
    ["workstyle","team",1,1],["workstyle","flexible",1,1],["workstyle","bigpicture",1,2],["workstyle","front",1,2],
  ],
  architect: [
    ["interests","creative",1,2],["interests","practical",1,2],["interests","analytical",1,1],
    ["strengths","creativity",1,3],["strengths","hands",1,1],["strengths","focus",1,2],
    ["values","creativity_val",1,3],["values","stability",1,1],["values","impact",1,1],
    ["weaknesses","detail_bad",-1,2],["weaknesses","procrastination",-1,1],
    ["workstyle","solo",1,1],["workstyle","careful",1,2],["workstyle","detail",1,2],["workstyle","specialist",1,1],
  ],
  chef: [
    ["interests","creative",1,2],["interests","practical",1,3],
    ["strengths","hands",1,3],["strengths","focus",1,2],["strengths","creativity",1,2],["strengths","leadership",1,1],
    ["values","creativity_val",1,2],
    ["values","balance",-1,3],["values","money",-1,1],
    ["weaknesses","focus_bad",-1,3],["weaknesses","perfectionism",-1,1],
    ["workstyle","fast",1,2],["workstyle","detail",1,2],["workstyle","team",1,1],
  ],
};

const DIM_LABELS = {
  interests: {
    analytical: "logical problem-solving", creative: "creative expression",
    social: "connecting with people", practical: "hands-on building",
    entrepreneurial: "starting new things", investigative: "deep understanding",
  },
  strengths: {
    logic: "logic and reasoning", writing: "writing clearly",
    speaking: "public speaking", creativity: "coming up with ideas",
    focus: "long deep focus", leadership: "leading groups",
    empathy: "reading people", hands: "hands-on skill",
  },
  weaknesses: {
    procrastination: "putting things off", focus_bad: "losing focus fast",
    conflict_avoid: "avoiding hard conversations", boredom: "quitting when bored",
    perfectionism: "perfectionism", detail_bad: "missing small details",
    social_drain: "getting drained by people",
  },
  values: {
    money: "high income", impact: "real-world impact", freedom: "freedom and autonomy",
    prestige: "prestige and status", stability: "stability and safety",
    growth: "constant learning", balance: "work-life balance",
    creativity_val: "creative expression",
  },
};

const FIELD_MAP = {
  "Business & Money": "Business, Finance & Strategy",
  "Tech & Science": "Technology & Research",
  "People & Impact": "People, Service & Impact",
  "Creative": "Creative & Design",
};

const WORKSTYLE_OPPOSITE = {
  solo: "team", team: "solo",
  structured: "flexible", flexible: "structured",
  bigpicture: "detail", detail: "bigpicture",
  fast: "careful", careful: "fast",
  risk: "safe", safe: "risk",
  theory: "doing", doing: "theory",
  front: "back", back: "front",
  specialist: "generalist", generalist: "specialist",
};

const CROSS_BLEND = {
  strengths: {
    logic:      [["interests","analytical",0.15],["weaknesses","focus_bad",-0.10]],
    writing:    [["interests","creative",0.10],["strengths","logic",0.08]],
    speaking:   [["interests","social",0.15],["weaknesses","social_drain",-0.12]],
    creativity: [["interests","creative",0.15],["weaknesses","boredom",-0.08]],
    focus:      [["weaknesses","focus_bad",-0.15],["weaknesses","boredom",-0.10]],
    leadership: [["interests","entrepreneurial",0.12],["weaknesses","conflict_avoid",-0.10]],
    empathy:    [["interests","social",0.12],["weaknesses","social_drain",-0.08]],
    hands:      [["interests","practical",0.15]],
  },
  weaknesses: {
    procrastination: [["strengths","focus",-0.12],["weaknesses","boredom",0.08]],
    focus_bad:       [["strengths","focus",-0.15],["interests","investigative",-0.08]],
    boredom:         [["strengths","creativity",-0.10],["interests","investigative",-0.08]],
    conflict_avoid:  [["strengths","leadership",-0.12],["strengths","speaking",-0.08]],
    perfectionism:   [["strengths","focus",0.10],["weaknesses","detail_bad",-0.10]],
    detail_bad:      [["strengths","focus",-0.10],["weaknesses","perfectionism",-0.08]],
    social_drain:    [["interests","social",-0.12],["strengths","empathy",-0.08]],
  },
  interests: {
    analytical:      [["strengths","logic",0.12],["interests","investigative",0.08]],
    creative:        [["strengths","creativity",0.12],["values","creativity_val",0.08]],
    social:          [["strengths","empathy",0.10],["strengths","speaking",0.08]],
    practical:       [["strengths","hands",0.12]],
    entrepreneurial: [["strengths","leadership",0.10],["values","freedom",0.08]],
    investigative:   [["strengths","logic",0.10],["strengths","focus",0.08]],
  },
  values: {
    money:          [["interests","entrepreneurial",0.08],["values","prestige",0.06]],
    impact:         [["interests","social",0.10],["strengths","empathy",0.06]],
    freedom:        [["interests","entrepreneurial",0.08],["values","balance",0.06]],
    prestige:       [["values","money",0.06],["interests","entrepreneurial",0.06]],
    stability:      [["values","balance",0.08]],
    growth:         [["interests","investigative",0.08],["strengths","focus",0.06]],
    balance:        [["values","stability",0.06]],
    creativity_val: [["interests","creative",0.10],["strengths","creativity",0.08]],
  },
};

function scoreDimensions() {
  const dims = { interests: {}, strengths: {}, weaknesses: {}, values: {}, workstyle: {} };
  for (const key of ["interests","strengths","weaknesses","values"]) {
    const tags = QUIZ_TAGS[key];
    const ans = state.quizAnswers[key] || {};
    const raw = {}, maxRaw = {};
    for (let i = 0; i < tags.length; i++) {
      if (ans[i] === undefined) continue;
      for (const [dim, weight] of Object.entries(tags[i])) {
        maxRaw[dim] = (maxRaw[dim] || 0) + 4 * weight;
        raw[dim] = (raw[dim] || 0) + ans[i] * weight;
      }
    }
    for (const dim of Object.keys(maxRaw)) {
      dims[key][dim] = maxRaw[dim] ? Math.round((raw[dim] || 0) / maxRaw[dim] * 100) : 0;
    }
  }
  const wsAns = state.quizAnswers.workstyle || {};
  const wsQuiz = QUIZZES.find(q => q.key === "workstyle");
  for (let i = 0; i < wsQuiz.items.length; i++) {
    if (wsAns[i]) dims.workstyle[wsAns[i]] = 1;
  }
  for (const [category, dimBlends] of Object.entries(CROSS_BLEND)) {
    for (const [dim, sources] of Object.entries(dimBlends)) {
      if (dims[category][dim] === undefined) continue;
      let adj = 0;
      for (const [srcCat, srcDim, w] of sources) {
        const v = dims[srcCat]?.[srcDim];
        if (v === undefined) continue;
        adj += (v - 50) * w;
      }
      dims[category][dim] = Math.max(0, Math.min(100, Math.round(dims[category][dim] + adj)));
    }
  }
  return dims;
}

function fitCareer(careerId, dims) {
  const fit = CAREER_FIT[careerId];
  if (!fit) return 50;
  let numerator = 0, denominator = 0;
  for (const [group, dim, dir, weight] of fit) {
    let userVal;
    if (group === "workstyle") {
      const opp = WORKSTYLE_OPPOSITE[dim];
      const answered = dims.workstyle[dim] || (opp && dims.workstyle[opp]);
      // If the paired question wasn't answered, treat as neutral rather than a "no" vote.
      userVal = answered ? (dims.workstyle[dim] ? 100 : 0) : 50;
    } else userVal = dims[group][dim] ?? 0;
    const alignment = dir === 1 ? userVal : 100 - userVal;
    numerator += alignment * weight;
    denominator += 100 * weight;
  }
  const raw = denominator ? numerator / denominator : 0.5;
  return Math.max(22, Math.min(96, Math.round(raw * 100)));
}

function topKeys(obj, n = 3) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]);
}

function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }

// Fine-grained band label for a 0-100 dim score. Adjacent bands read
// distinctly so two users with 65 vs 75 in the same dim get different copy.
function scoreBand(n) {
  if (n >= 88) return "off-the-charts";
  if (n >= 80) return "very high";
  if (n >= 72) return "unusually high";
  if (n >= 64) return "clearly above average";
  if (n >= 56) return "solidly above middle";
  if (n >= 48) return "middling";
  if (n >= 40) return "on the low side";
  return "low";
}

// Score-aware sentence fragment for a dim. Uses the actual number.
function dimPhrase(label, score) {
  return `${label} (${score})`;
}

// ============================================================
// PHRASE BANKS — for combinatorial mad-libs. Each dim has 4 alternate
// phrasings for INTEREST_PHRASE (noun-phrase pull), STRENGTH_PHRASE
// (noun-phrase capability), and VALUE_CLAUSE (a sentence-fitting tail
// clause). Selection is deterministic on the user's actual scores, so
// a 3-point difference in one dim reliably swings to a different
// phrase across many slots. The total unique output space is huge.
// ============================================================
const INTEREST_PHRASE = {
  analytical: ["systems and patterns", "problems that need a proof", "the mechanism underneath things", "how the parts connect"],
  creative: ["making something out of nothing", "getting ideas onto a page", "the craft of building things people feel", "creative work you own"],
  social: ["reading a room and responding", "the messy pull of other people", "understanding what someone actually needs", "conversations that go somewhere"],
  practical: ["shipping something you can touch", "hands-on work with real outcomes", "building things that end the day existing", "concrete artifacts, not slide decks"],
  entrepreneurial: ["starting new things from zero", "owning the outcome, good or bad", "making a small bet that could grow", "building something that didn't exist yesterday"],
  investigative: ["deep questions with slow answers", "getting to the bottom of things", "long-form curiosity", "the 'but why' problem people give up on"],
};
const STRENGTH_PHRASE = {
  logic: ["sharp logic", "clear reasoning under pressure", "structured thinking", "analytical rigor"],
  writing: ["disciplined writing", "clarity on the page", "written craft", "the ability to turn thought into prose"],
  speaking: ["real presence in a room", "spoken clarity", "voice that carries", "on-your-feet articulation"],
  creativity: ["generative range", "inventive instinct", "the ability to see what isn't there yet", "creative jump"],
  focus: ["long deep focus", "the endurance to sit with a problem", "concentration that outlasts the room", "focus most people your age don't have"],
  leadership: ["a natural pull-others-along instinct", "leadership range", "the ability to be trusted with the room", "authority without loudness"],
  empathy: ["real emotional attunement", "the ability to read subtle cues", "sensitivity that shows up as a skill", "sharp people-reading"],
  hands: ["hands-on skill", "tactile intelligence", "the ability to build a thing that works", "practical craft"],
};
const VALUE_CLAUSE = {
  money: [
    "and money is on the list, honestly and openly",
    "and you want real financial upside — no need to pretend otherwise",
    "and the paycheck matters in a way you're not going to hide from",
    "and you're clear-eyed about wanting to be paid well",
  ],
  impact: [
    "and you want the day to matter for someone else",
    "and you want work that actually changes something",
    "and impact isn't optional for you",
    "and you'd rather leave a real dent than a big paycheck",
  ],
  freedom: [
    "and autonomy isn't a bonus — it's a filter",
    "and owning your calendar matters more than owning a title",
    "and you want to be your own boss on a random Tuesday",
    "and freedom over your day is non-negotiable",
  ],
  prestige: [
    "and you want the field to know your name",
    "and being genuinely respected in a real community matters",
    "and you want to be near the top of whatever you pick",
    "and status inside a serious field is honestly on the list",
  ],
  stability: [
    "and you want ground that feels solid, not a lottery ticket",
    "and predictability is a real filter for you",
    "and a paycheck you can count on matters more than upside",
    "and you want the base of your life to be steady",
  ],
  growth: [
    "and you measure a job by what you're becoming, not just what you're earning",
    "and staying still would feel like moving backwards",
    "and you want to be sharper every year",
    "and you'd take the harder learning curve over the easier plateau",
  ],
  balance: [
    "and your life outside work is louder than most people your age would admit",
    "and evenings and weekends matter — not as recovery, as the point",
    "and you're not willing to trade the whole 20s away",
    "and a real life next to the job isn't optional",
  ],
  creativity_val: [
    "and you have to make things that are yours",
    "and shipping your own work is core to who you are",
    "and you'd rather build than manage what others built",
    "and being the maker matters more than being the manager",
  ],
};
const WEAKNESS_PHRASE = {
  procrastination: ["putting things off until they're urgent", "leaving hard things until the last minute", "delaying the start", "avoiding the first move"],
  focus_bad: ["losing focus fast", "attention that skitters", "difficulty staying with one thing", "the pull to check something else"],
  conflict_avoid: ["ducking hard conversations", "smoothing over instead of naming things", "avoiding the direct ask", "swallowing what you should say"],
  boredom: ["quitting when it stops being new", "a low tolerance for repetition", "the itch when things settle down", "restlessness with the same thing"],
  perfectionism: ["holding onto something until it's perfect", "the trap of one more revision", "not shipping until every corner is right", "quiet fear of releasing something imperfect"],
  detail_bad: ["missing small details", "letting little things slip past", "the last 10% that gets away", "precision that fades under fatigue"],
  social_drain: ["needing recovery time after people", "the tank running low after a full day of humans", "social bandwidth that empties fast", "energy that peoples' attention costs"],
};

// Deterministic seed drawn from actual dim scores. Two profiles with even
// small score differences produce different seeds and land on different
// slots below.
function profileSeed(dims) {
  let n = 17;
  for (const cat of ["interests","strengths","values","weaknesses"]) {
    const obj = dims[cat] || {};
    for (const [k, v] of Object.entries(obj).sort()) {
      // ASCII sum keeps the seed stable across runs and browsers
      let ks = 0; for (let i = 0; i < k.length; i++) ks = (ks * 31 + k.charCodeAt(i)) & 0x7fffffff;
      n = (n * 131 + ks * (v|0)) & 0x7fffffff;
    }
  }
  return n;
}

// Pick from a pool with a per-slot salt so different slots on the same
// user pick independently — otherwise every slot would rotate together.
function pickSlot(pool, seed, salt) {
  if (!pool || !pool.length) return null;
  return pool[((seed ^ (salt * 2654435761)) >>> 0) % pool.length];
}

// Wrap a phrase-bank lookup with fallback to the plain DIM_LABELS name.
function phraseFor(bank, key, seed, salt) {
  const pool = bank[key];
  if (!pool) return null;
  return pickSlot(pool, seed, salt);
}

// 10 headline skeletons × 4 variants per dim slot = tens of thousands of
// distinct outputs. Selected deterministically by the profile seed so the
// same user always gets the same headline, and two users with even a small
// score difference land on different slots.
const REPORT_HEADLINE_TEMPLATES = [
  ({iP, sP, vC, iN, sN}) => `You're pulled toward ${iP} (${iN}), backed by ${sP} (${sN}) — ${vC}.`,
  ({iP, sP, vC, iN, sN}) => `Your ${sP} (${sN}) meets a real interest in ${iP} (${iN}) — ${vC}.`,
  ({iP, sP, vC, iN, sN}) => `The clearest signal in your quizzes: ${sP} at ${sN}, and a pull toward ${iP} at ${iN}. ${cap(vC)}.`,
  ({iP, sP, vC, iN, sN}) => `${cap(iP)} runs your engine — you scored ${iN} there — and your ${sP} (${sN}) is what will make it work. ${cap(vC)}.`,
  ({iP, sP, vC, iN, sN}) => `Between your pull toward ${iP} (${iN}) and your ${sP} (${sN}), the shape of your career is already visible — ${vC}.`,
  ({iP, sP, vC, iN, sN}) => `Two numbers tell your story: ${iP} at ${iN}, and ${sP} at ${sN}. ${cap(vC)}.`,
  ({iP, sP, vC, iN, sN}) => `You're built for work involving ${iP} (${iN}) — your ${sP} (${sN}) makes it more than a preference, it's leverage. ${cap(vC)}.`,
  ({iP, sP, vC, iN, sN}) => `Your ${iP} pull scored ${iN}, and your ${sP} scored ${sN} — the interest is real AND you have the raw material to act on it. ${cap(vC)}.`,
  ({iP, sP, vC, iN, sN}) => `${cap(sP)} (${sN}) plus ${iP} (${iN}) — that pair puts you on a shortlist most Grade 10 profiles don't reach. ${cap(vC)}.`,
  ({iP, sP, vC, iN, sN}) => `Read your quizzes together and one line falls out: ${iP} (${iN}) as the interest, ${sP} (${sN}) as the strength, ${vC.replace(/^and /, "")} as the aim.`,
];

// Headline variants for when only interest OR only strength or only value cleared.
const HEADLINE_PARTIAL_INTEREST = [
  ({iP, iN}) => `Your one strong signal is a pull toward ${iP} — it scored ${iN}, and nothing else in your profile is close.`,
  ({iP, iN}) => `${cap(iP)} (${iN}) is the loudest thing in your quizzes — the rest of the profile is quiet, so start there.`,
  ({iP, iN}) => `You lean toward ${iP} (${iN}) — a real signal, though the strengths to back it haven't yet shown up.`,
  ({iP, iN}) => `The interest is clear: ${iP} at ${iN}. What's less clear is the strength to power it — that's the next thing to test.`,
];
const HEADLINE_PARTIAL_STRENGTH = [
  ({sP, sN}) => `Your one clear strength is ${sP} at ${sN} — start from the strength, work backward to which fields pay best for it.`,
  ({sP, sN}) => `${cap(sP)} scored ${sN} — everything else clustered near the middle, so pick a field that pays for this and figure out fit from there.`,
  ({sP, sN}) => `The number that stands out: ${sP} at ${sN}. Interests will follow the strength if you let them.`,
  ({sP, sN}) => `You've got real ${sP} (${sN}) but the interests haven't sharpened — that's normal, and the strength gives you time to explore.`,
];
const HEADLINE_PARTIAL_VALUE = [
  ({vC, vN}) => `Your quizzes didn't strongly sort your interests or strengths — but your top value scored ${vN}, ${vC}. Start the search from that.`,
  ({vC, vN}) => `The only thing that punched above the middle was the value: ${vN}. ${cap(vC)}. That's a filter, not a job description — but it's a real one.`,
];

function generateHeadline(dims) {
  const iEntries = Object.entries(dims.interests || {}).sort((a,b) => b[1] - a[1]);
  const sEntries = Object.entries(dims.strengths || {}).sort((a,b) => b[1] - a[1]);
  const vEntries = Object.entries(dims.values || {}).sort((a,b) => b[1] - a[1]);
  const [ti, ts] = [iEntries[0], sEntries[0]];
  const [tv] = [vEntries[0]];

  const iStrong = ti && ti[1] >= 55;
  const sStrong = ts && ts[1] >= 55;
  const vStrong = tv && tv[1] >= 55;

  if (!iStrong && !sStrong && !vStrong) {
    return "Your scores clustered near the middle across almost every dimension — a real signal in itself. It usually means you haven't yet had the experiences that force preferences to sharpen. Try things wildly different from each other — the contrast is what teaches you.";
  }

  const seed = profileSeed(dims);
  const slot = { iN: ti?.[1]||0, sN: ts?.[1]||0, vN: tv?.[1]||0 };
  slot.iP = iStrong ? phraseFor(INTEREST_PHRASE, ti[0], seed, 11) : null;
  slot.sP = sStrong ? phraseFor(STRENGTH_PHRASE, ts[0], seed, 23) : null;
  slot.vC = vStrong ? phraseFor(VALUE_CLAUSE, tv[0], seed, 41) : null;

  if (iStrong && sStrong && vStrong) {
    const tpl = pickSlot(REPORT_HEADLINE_TEMPLATES, seed, 7);
    return tpl(slot);
  }
  if (iStrong) return pickSlot(HEADLINE_PARTIAL_INTEREST, seed, 13)(slot);
  if (sStrong) return pickSlot(HEADLINE_PARTIAL_STRENGTH, seed, 17)(slot);
  return pickSlot(HEADLINE_PARTIAL_VALUE, seed, 19)(slot);
}

// Sentence pools for the profile paragraph. Each pool has 5-6 variants so
// two users with the same dim ordering pick different sentences based on
// their exact score seed.
const PROFILE_INTEREST_SPLIT = [
  ({i1P, i1N, i2P, i2N}) => `Your interests split roughly evenly between ${i1P} (${i1N}) and ${i2P} (${i2N}) — that's a real duality, not indecision.`,
  ({i1P, i1N, i2P, i2N}) => `You're pulled in two directions at once: ${i1P} (${i1N}) and ${i2P} (${i2N}). Careers that touch both feel most natural.`,
  ({i1P, i1N, i2P, i2N}) => `The interest quiz sorted you into two clusters — ${i1P} (${i1N}) and ${i2P} (${i2N}) — barely apart. Don't force yourself to pick one yet.`,
  ({i1P, i1N, i2P, i2N}) => `Two interests punched above the middle together: ${i1P} at ${i1N}, and ${i2P} right behind at ${i2N}. That combination narrows the field usefully.`,
  ({i1P, i1N, i2P, i2N}) => `You're a genuine hybrid — ${i1P} (${i1N}) and ${i2P} (${i2N}) both showed up strong, which is rarer than it looks at your age.`,
];
const PROFILE_INTEREST_SOLO = [
  ({iP, iN}) => `${cap(iP)} is your strongest interest at ${iN} — ${scoreBand(iN)} for a Grade 10 profile.`,
  ({iP, iN}) => `The interest that pulled ahead was ${iP} at ${iN}. Everything else scored well below.`,
  ({iP, iN}) => `${cap(iP)} scored ${iN} — the clearest lane your quizzes pointed to.`,
  ({iP, iN}) => `One interest carried the day: ${iP} at ${iN}. That's the direction to test first.`,
  ({iP, iN}) => `The score to notice: ${iP} at ${iN} — ${scoreBand(iN)}, and nothing else in the interest quiz is close.`,
];
const PROFILE_STRENGTH_DUO = [
  ({s1P, s1N, s2P, s2N}) => `Your ${s1P} (${s1N}) is where you have most leverage; ${s2P} at ${s2N} is the reliable second gear.`,
  ({s1P, s1N, s2P, s2N}) => `Two strengths anchor the profile: ${s1P} (${s1N}) as the primary, and ${s2P} (${s2N}) as backup. Careers that reward both compound fast.`,
  ({s1P, s1N, s2P, s2N}) => `You're strongest at ${s1P} (${s1N}), with ${s2P} (${s2N}) right behind — the pair is worth more than the sum of the parts.`,
  ({s1P, s1N, s2P, s2N}) => `The strength picture: ${s1P} at ${s1N}, then ${s2P} at ${s2N}. Look for roles that need both, not just one.`,
  ({s1P, s1N, s2P, s2N}) => `Your ${s1P} scored ${s1N} and your ${s2P} scored ${s2N} — that combo is what will separate you from people with the same interests.`,
];
const PROFILE_STRENGTH_SOLO = [
  ({sP, sN}) => `Your one clear strength is ${sP} at ${sN} — everything else scored below 55, so this is what you build around first.`,
  ({sP, sN}) => `${cap(sP)} at ${sN} is the only strength that punched above the middle. That narrows the "start here" list nicely.`,
  ({sP, sN}) => `The strengths quiz gave one clear answer: ${sP} (${sN}). Everything else is background.`,
  ({sP, sN}) => `You have real ${sP} (${sN}) but the other strength dimensions are quiet — this is the one to lean on now.`,
];
const PROFILE_VALUE_DUO = [
  ({v1P, v1N, v2P, v2N}) => `You want ${v1P} (${v1N}) and ${v2P} (${v2N}) — both scored high enough that trading one away will feel wrong even when the offer is good.`,
  ({v1P, v1N, v2P, v2N}) => `Two values matter roughly equally: ${v1P} (${v1N}) and ${v2P} (${v2N}). That's a filter, not a personality quirk.`,
  ({v1P, v1N, v2P, v2N}) => `You'll want ${v1P} (${v1N}) AND ${v2P} (${v2N}) at once. That combo shortens the shortlist significantly.`,
  ({v1P, v1N, v2P, v2N}) => `${cap(v1P)} scored ${v1N} and ${v2P} scored ${v2N} — both are real, and pretending only one matters would be dishonest.`,
];
const PROFILE_VALUE_SOLO = [
  ({vP, vN}) => `What you actually want is ${vP} — it topped the values quiz at ${vN}, well ahead of everything else.`,
  ({vP, vN}) => `One value dominated: ${vP} at ${vN}. That should be the primary filter on any career shortlist.`,
  ({vP, vN}) => `The values quiz was clear: ${vP} at ${vN} is what you want out of work.`,
  ({vP, vN}) => `${cap(vP)} scored ${vN} — the loudest thing the values quiz said about you.`,
];
const PROFILE_WEAKNESS_HIGH = [
  ({wP, wN}) => `The friction to watch is ${wP} at ${wN} — high enough that it will bite you if you pick a career where it's central to the job.`,
  ({wP, wN}) => `${cap(wP)} scored ${wN} — that's the one to plan around, not deny.`,
  ({wP, wN}) => `Real friction shows up in ${wP} (${wN}). Careers that fight this every day will drain you fast.`,
  ({wP, wN}) => `Your biggest structural risk: ${wP} at ${wN}. Not fatal, but factor it in when picking a field.`,
];
const PROFILE_WEAKNESS_MID = [
  ({wP, wN}) => `${cap(wP)} scored ${wN} — real but manageable if you know it's there.`,
  ({wP, wN}) => `A mid-level watch-out: ${wP} at ${wN}. Fine most days, sharp under real pressure.`,
  ({wP, wN}) => `${cap(wP)} sits at ${wN} — the kind of thing that costs you occasionally but doesn't define you.`,
];

function generateProfile(dims) {
  const FLOOR = 55;
  const takeAll = (obj) => Object.entries(obj || {}).sort((a,b) => b[1] - a[1]);
  const iAll = takeAll(dims.interests);
  const sAll = takeAll(dims.strengths);
  const vAll = takeAll(dims.values);
  const wAll = takeAll(dims.weaknesses);
  const seed = profileSeed(dims);

  const parts = [];

  // ---- Interest sentence
  const iStrong = iAll.filter(([_, v]) => v >= FLOOR);
  if (iStrong.length >= 2 && (iStrong[0][1] - iStrong[1][1]) <= 12) {
    const slot = {
      i1P: phraseFor(INTEREST_PHRASE, iStrong[0][0], seed, 3) || DIM_LABELS.interests[iStrong[0][0]],
      i1N: iStrong[0][1],
      i2P: phraseFor(INTEREST_PHRASE, iStrong[1][0], seed, 5) || DIM_LABELS.interests[iStrong[1][0]],
      i2N: iStrong[1][1],
    };
    parts.push(pickSlot(PROFILE_INTEREST_SPLIT, seed, 3)(slot));
  } else if (iStrong.length >= 1) {
    const slot = {
      iP: phraseFor(INTEREST_PHRASE, iStrong[0][0], seed, 3) || DIM_LABELS.interests[iStrong[0][0]],
      iN: iStrong[0][1],
    };
    parts.push(pickSlot(PROFILE_INTEREST_SOLO, seed, 4)(slot));
  }

  // ---- Strength sentence
  const sStrong = sAll.filter(([_, v]) => v >= FLOOR);
  if (sStrong.length >= 2) {
    const slot = {
      s1P: phraseFor(STRENGTH_PHRASE, sStrong[0][0], seed, 7) || DIM_LABELS.strengths[sStrong[0][0]],
      s1N: sStrong[0][1],
      s2P: phraseFor(STRENGTH_PHRASE, sStrong[1][0], seed, 11) || DIM_LABELS.strengths[sStrong[1][0]],
      s2N: sStrong[1][1],
    };
    parts.push(pickSlot(PROFILE_STRENGTH_DUO, seed, 8)(slot));
  } else if (sStrong.length === 1) {
    const slot = {
      sP: phraseFor(STRENGTH_PHRASE, sStrong[0][0], seed, 7) || DIM_LABELS.strengths[sStrong[0][0]],
      sN: sStrong[0][1],
    };
    parts.push(pickSlot(PROFILE_STRENGTH_SOLO, seed, 9)(slot));
  }

  // ---- Value sentence
  const vStrong = vAll.filter(([_, v]) => v >= FLOOR);
  if (vStrong.length >= 2 && (vStrong[0][1] - vStrong[1][1]) <= 12) {
    const slot = {
      v1P: DIM_LABELS.values[vStrong[0][0]], v1N: vStrong[0][1],
      v2P: DIM_LABELS.values[vStrong[1][0]], v2N: vStrong[1][1],
    };
    parts.push(pickSlot(PROFILE_VALUE_DUO, seed, 13)(slot));
  } else if (vStrong.length >= 1) {
    const slot = {
      vP: DIM_LABELS.values[vStrong[0][0]], vN: vStrong[0][1],
    };
    parts.push(pickSlot(PROFILE_VALUE_SOLO, seed, 14)(slot));
  }

  // ---- Weakness sentence
  const wTop = wAll[0];
  if (wTop && wTop[1] >= 60) {
    const slot = {
      wP: phraseFor(WEAKNESS_PHRASE, wTop[0], seed, 17) || DIM_LABELS.weaknesses[wTop[0]],
      wN: wTop[1],
    };
    parts.push(pickSlot(PROFILE_WEAKNESS_HIGH, seed, 18)(slot));
  } else if (wTop && wTop[1] >= 50) {
    const slot = {
      wP: phraseFor(WEAKNESS_PHRASE, wTop[0], seed, 17) || DIM_LABELS.weaknesses[wTop[0]],
      wN: wTop[1],
    };
    parts.push(pickSlot(PROFILE_WEAKNESS_MID, seed, 19)(slot));
  }

  if (!parts.length) return "Your answers didn't clearly separate any interest, strength, or value — either you're genuinely balanced or picked the middle option a lot. Retake the quizzes and lean toward the ends of the scale where you can.";
  return parts.join(" ");
}

function getSuperpowers(dims) {
  const top = Object.entries(dims.strengths).filter(([_, v]) => v >= 55).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const result = top.map(([k]) => cap(DIM_LABELS.strengths[k]));
  const filler = ["Willingness to try new things", "Genuine curiosity", "Self-awareness"];
  while (result.length < 3) result.push(filler[result.length]);
  return result;
}

function getWatchouts(dims) {
  const top = Object.entries(dims.weaknesses).filter(([_, v]) => v >= 50).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (top.length === 0) return ["Being too hard on yourself", "Comparing yourself to others"];
  return top.map(([k]) => cap(DIM_LABELS.weaknesses[k]));
}

function whyCareerFits(careerId, dims) {
  const fit = CAREER_FIT[careerId];
  const aligned = fit.filter(([g, d, dir]) => dir === 1).map(([g, d, dir, w]) => {
    const uv = g === "workstyle" ? (dims.workstyle[d] ? 100 : 0) : (dims[g][d] || 0);
    return { g, d, w, uv, score: uv * w };
  }).filter(x => x.uv >= 40).sort((a, b) => b.score - a.score);
  if (aligned.length === 0) return "A moderate overall match — not your strongest signal, but not a bad fit.";
  const top = aligned[0];
  const label = top.g === "workstyle" ? "preferred way of working" : (DIM_LABELS[top.g]?.[top.d] || top.d);
  const t = [`Plays directly to your ${label}.`, `Matches your ${label} well.`, `Built for your ${label}.`, `Uses your ${label} every day.`];
  return t[(careerId.length + top.d.length) % t.length];
}

function whyAvoid(careerId, dims) {
  const fit = CAREER_FIT[careerId];
  const misaligned = fit.map(([g, d, dir, w]) => {
    const uv = g === "workstyle" ? (dims.workstyle[d] ? 100 : 0) : (dims[g][d] || 0);
    const alignment = dir === 1 ? uv : 100 - uv;
    return { g, d, dir, w, uv, gap: (100 - alignment) * w };
  }).sort((a, b) => b.gap - a.gap);
  const top = misaligned[0];
  if (!top) return "Doesn't match your general profile.";
  const label = top.g === "workstyle" ? "way of working" : (DIM_LABELS[top.g]?.[top.d] || top.d);
  if (top.dir === 1) return `Needs strong ${label} — that's not your top signal.`;
  return `Would clash with your ${label}.`;
}

function getTopFields(scoredCareers) {
  // Only playable (sim-ready) careers count toward a subgroup's average — locked
  // entries have no CAREER_FIT so they'd all default to 50 and drag things toward
  // the mean. Subgroups with no playable careers are dropped entirely.
  const subs = {};
  for (const c of scoredCareers) {
    if (!SIM_READY.has(c.id)) continue;
    const key = c.subgroup || c.group;
    if (!subs[key]) subs[key] = { total: 0, count: 0 };
    subs[key].total += c.fit;
    subs[key].count += 1;
  }
  const arr = Object.entries(subs)
    .map(([sub, { total, count }]) => ({ field: sub, fit: Math.round(total / count) }))
    .sort((a, b) => b.fit - a.fit);
  // Cap at 3 AND require fit ≥ 55 so weak subgroups drop off — the old code
  // sliced 4 out of exactly 4, so every group always showed regardless of fit.
  const kept = arr.filter(x => x.fit >= 55).slice(0, 3);
  const out = kept.length ? kept : arr.slice(0, 1);
  return out.map(x => ({
    field: x.field,
    fit: x.fit,
    why: SUBGROUP_WHY[x.field] || "Aligns with your profile.",
  }));
}

function generatePlan(scoredCareers, dims) {
  const top = scoredCareers[0];
  const specific = {
    ib: "Learn how a company is valued — try a free 'Intro to Financial Modeling' course on YouTube (Corporate Finance Institute is a good start).",
    consult: "Pick a company you use daily and write a one-page 'here's what I'd change and why' memo. Rewrite it monthly.",
    quant: "Learn Python + basic probability. Try Kaggle's beginner competitions to see if you love the puzzle.",
    founder: "Sell something. Anything. Cookies, tuition, a Notion template. Feel what earning $1 from a stranger is like.",
    pm: "Pick an app you love. Write down 3 features it's missing and why they matter. Post it online, take feedback.",
    marketing: "Run a tiny Instagram or Substack for 3 months in a niche you actually care about. Track what makes people click.",
    swe: "Build a small app that solves your own problem. Ship it. Doesn't have to be pretty.",
    ml: "Do Andrew Ng's free 'AI for Everyone' course, then try training a tiny model on Hugging Face.",
    designer: "Redesign an ugly app you use. Post before/after on Twitter or LinkedIn. Ask for critique.",
    econ: "Read one economics book (start with Freakonomics), then follow one economist online. Try explaining news through an economic lens.",
    astro: "Go outside on a clear night and find three things with a free star app. Then read one short article about what telescopes actually measure — and see if the questions still pull at you.",
    doctor: "Shadow a doctor for a day (ask family, friends, or a nearby hospital). Watch if the environment energizes or drains you.",
    law: "Read one landmark court judgment (a U.S. Supreme Court case is a good start). Write down what convinced you or didn't.",
    teacher: "Teach a younger sibling or neighbor a hard subject for a month. See if their 'aha' moment lights you up.",
    journalist: "Pitch and write one story for your school paper or Medium. Interview a real person. Feel the deadline.",
    director: "Make a 3-minute short film on your phone. Get 5 people to watch it and give honest feedback.",
    architect: "Sketch or model your dream building for a real site near you. Study one architect you admire deeply.",
    chef: "Work in a real kitchen for a week (even a small café) during vacation. See if the pace suits you.",
  }[top.id] || "Find someone who works in your top field and ask for 15 minutes of their time — just one honest conversation.";

  // Only use a value-specific plan when the top value clears 55 — otherwise
  // the "based on your top value" copy is dishonest for flat profiles.
  const dvKey = topKeys(dims.values, 1)[0];
  const dominantValue = (dvKey && (dims.values[dvKey] || 0) >= 55) ? dvKey : null;
  const valuePlan = {
    money: "Look up how much the top 10% in your target field actually earn — locally and globally. Make sure you're chasing it for the right reasons.",
    impact: "Volunteer 4 hours a week with an org whose mission you care about. See if the day-to-day work matches the mission.",
    freedom: "Try a side project with total autonomy for one month. Notice if you rise to it or need external structure.",
    prestige: "Ask honestly: whose approval are you chasing? Write it down. Then decide if that's a strong enough reason.",
    stability: "Talk to two adults in stable jobs you respect. Ask what they wish they'd known at 15.",
    growth: "Pick one new skill outside school this semester. Track how long it stays interesting.",
    balance: "Shadow someone in your top career for a full day. Watch what time they actually go home.",
    creativity_val: "Publish something you made — writing, art, video — every 2 weeks for 3 months. See what feedback comes back.",
  }[dominantValue] || "Read one book about your top field this month. Not a textbook — a memoir or biography from someone actually in it.";

  const generic = "Talk to 3 adults working in your top field. Ask what surprised them about the job vs. what they expected as students.";
  return [specific, valuePlan, generic];
}

// ============================================================
// SIM SCRIPTS — hand-authored career day scenarios (no API needed)
// Each scene: { time, scene, stat:{label,tone}, choices:[strings], tones:[good|neutral|bad] }
// Last scene has empty choices to signal end.
// ============================================================
const SIM_SCRIPTS = {
  ib: {
    intro: "You're a first-year analyst at a big investment bank in NYC. Your client wants to buy a smaller company. Your job today: build a spreadsheet that estimates what it's worth. No right answers — just pick how you'd naturally work.",
    start: "s1",
    scenes: {
      // ONE DAY, THREE RUNNING THREADS. Your senior (a person), the lunchtime
      // rumor about hidden problems (a truth you either wire in or duck), and
      // the 22% customer-concentration number (a guess that walks into a client
      // meeting as fact if you don't own it). Each thread comes back more than
      // once, and how you left it earlier changes both the words AND the options
      // you get later. Kept short and plain on purpose.
      s1: { time: "8:45 AM",
        scene: "Your boss sent a 52-page report at 6 AM with one line: 'Need a value estimate by end of day.' You have 9 hours. Where do you start?",
        stat: { label: "First move", tone: "neutral" },
        choices: [
          { text: "Read all 52 pages first. ~90 min. Then build.", mins: 90, tone: 42, next: "s2" },
          { text: "Open the spreadsheet now. Skim the report as you go.", mins: 20, tone: 82, next: "s2" },
          { text: "Ask your senior: 'What are the 2-3 things I need to know first?'", mins: 10, tone: 92, sets: { askedSenior: true }, next: "s2" }
        ] },
      // THREAD (senior) — framed by whether you leaned on them at 8:45.
      s2: { time: "9:30 AM",
        scene: (ctx) => ctx.has("askedSenior")
          ? "Your senior stops back. 'Boss will want three estimates, not one. Trading multiples is the one she'll grill you on.' Same 8 hours."
          : "Your senior stops by: 'Boss will want three estimates, not one.' Same 8 hours. The first one is barely started.",
        stat: { label: "Triple the work", tone: "bad" },
        choices: [
          { text: "Build all three at once. Jump between them.", tone: 70, next: "s3" },
          { text: "Nail the main one first. Rush the other two after.", tone: 55, next: "s3" },
          { text: "Do the main one. By 3 PM, decide if the others are realistic.", tone: 90, next: "s3" }
        ] },
      // THREAD (senior) can turn ugly here: ghosting the call is the mistake
      // you'll get a chance to own up to at 10:15 PM.
      s3: { time: "10:45 AM",
        scene: "A senior analyst pulls you into a 40-minute call about a different deal. 'Just listen — you'll learn.' You have no role in it. Your spreadsheet is 15% done.",
        stat: { label: "Spreadsheet at 15%", tone: "bad" },
        choices: [
          { text: "Full attention. Take notes. This is how you learn.", mins: 55, tone: 20, mark: { id: "behind", note: "you sat through a call that had nothing to do with your model" }, next: "s4" },
          { text: "Mute, camera off, keep building. Learn on a lighter day.", mins: 5, tone: 88, mark: { id: "ghostedCall", note: "you muted a senior's call to build through it" }, next: "s4" },
          { text: "Camera on, look engaged, half-build in the background.", mins: 35, tone: 52, next: "s4" }
        ] },
      s4: { time: "12:15 PM",
        scene: (ctx) => ctx.has("behind")
          ? "That call ran 55 minutes, not 40. Your spreadsheet is still 15% done. Now you open a 200-page yearly report — under 4 hours until your boss expects a first look."
          : ctx.has("ghostedCall")
            ? "You skipped the call and pushed the model to 25%. Now you open the company's yearly report for real numbers. 200+ pages. You need sales, costs, cash flow, and risks."
            : "You open the company's yearly report for real numbers. 200+ pages. You need sales, costs, cash flow, and risks.",
        stat: (ctx) => ctx.has("behind") ? { label: "Behind schedule", tone: "bad" } : { label: "200 pages", tone: "neutral" },
        choices: [
          { text: "Read it front to back. 90 min. Miss nothing.", mins: 90, tone: 22, next: "s5" },
          { text: "Jump straight to the numbers section. 25 min.", mins: 25, tone: 82, next: "s5" },
          { text: "Search the PDF for 'revenue,' 'customer,' 'risks.' 12 min.", mins: 12, tone: 88, next: "s5" }
        ] },
      // THREAD (rumor) begins.
      s5: { time: "1:30 PM",
        scene: "Lunch. Someone mentions a rumor: another bank passed on this deal last week, saying the company had 'hidden problems.' Four hours until your model is due.",
        stat: { label: "Rumor, no source", tone: "neutral" },
        choices: [
          { text: "Spend 30 min after lunch digging for red flags in the numbers.", mins: 30, tone: 90, sets: { dugForFlags: true }, next: "s6" },
          { text: "Stay on the model. A rumor without a source stays a rumor.", mins: 0, tone: 58, mark: { id: "dismissedRumor", note: "you brushed off a rumor another bank walked from" }, next: "s6" },
          { text: "Ask your senior: 'Heard this? Should I look into it?'", mins: 10, tone: 74, sets: { askedAboutRumor: true }, next: "s6" }
        ] },
      // THREAD (churn) begins — and if you dug at lunch, a gated option lets
      // you tie the rumor into the churn number instead of guessing.
      s6: { time: "3:00 PM",
        scene: (ctx) => ctx.has("dugForFlags")
          ? "Boss messages: 'What if they lose their biggest customer? That's 22% of sales.' You dug into red flags at lunch — the biggest one was their top customer's contract coming up for renewal next year."
          : ctx.has("askedAboutRumor")
            ? "Boss messages: 'What if they lose their biggest customer? That's 22% of sales.' Your senior said the rumor was worth a look — you haven't gotten to it yet."
            : "Boss messages: 'What if the company loses its biggest customer? That's 22% of sales.' You have no data on how likely. You have to guess.",
        stat: { label: "The 22% question", tone: "neutral" },
        choices: (ctx) => {
          const arr = [
            { text: "Look up how often companies lose big customers. 45 min, but solid.", mins: 45, tone: 66, sets: { researchedChurn: true }, next: "s7" },
            { text: "Pick a number from your gut (say 15%), model it, move on.", mins: 5, tone: 80, mark: { id: "guessedChurn", note: "you picked the churn number out of thin air" }, next: "s7" },
            { text: "Make it a slider — boss can change it herself when she reviews.", mins: 20, tone: 82, sets: { sliderChurn: true }, next: "s7" }
          ];
          if (ctx.has("dugForFlags"))
            arr.push({ text: "Use the renewal risk you found at lunch as your base case.", mins: 25, tone: 92, mark: { id: "linkedRumorToChurn", note: "you tied the lunchtime rumor into a real churn risk" }, next: "s7" });
          return arr;
        } },
      // THREAD (churn) continues — recovery option only exists BECAUSE you guessed.
      s7: { time: "5:00 PM",
        scene: "Your spreadsheet says the company is worth $1.0–1.4B. The client wants to offer $1.15B. Time to write the one-page summary that lands on their desk tomorrow.",
        stat: { label: "Summary time", tone: "neutral" },
        choices: (ctx) => {
          const arr = [
            { text: "One page. Just the range, the offer, the midpoint. Read in 30 sec.", mins: 25, tone: 82, next: "s8" },
            { text: "Two pages. The range, the three methods, the assumptions behind each.", mins: 45, tone: 68, next: "s8" },
            { text: "One page, three cases: best, likely, worst — a short story for each.", mins: 40, tone: 86, next: "s8" }
          ];
          if (ctx.has("guessedChurn"))
            arr.push({ text: "Same one-pager, but footnote the 15% guess so nobody reads it as fact.", mins: 15, tone: 90, mark: { id: "flaggedGuess", note: "you footnoted your churn guess before it hardened into fact" }, next: "s8" });
          return arr;
        } },
      s8: { time: "6:30 PM",
        scene: "Boss: 'Assume the buyer saves 15% on costs after combining. Rebuild.' The answer shifts. How much do you show?",
        stat: { label: "New assumption", tone: "neutral" },
        choices: [
          { text: "Just add it. The number updates. Move on.", mins: 10, tone: 66 },
          { text: "Add it, plus a small table showing the answer at 5%, 10%, 15%.", mins: 25, tone: 90 },
          { text: "Add it, plus a note next to every guess in the spreadsheet.", mins: 35, tone: 60 }
        ],
        // flag-driven pivot: if you asked your senior for context at 8:45 AM,
        // that relationship pays off now — they offer to co-review.
        next: (flags) => flags.askedSenior ? "s9_helped" : "s9_solo" },
      // THREAD (rumor) BITES: if you dismissed it and never wired it in, the
      // boss's own review names it. And a "make it right" option only exists
      // because you skipped it. (Never surfaced if you researched or slidered.)
      s9_solo: { time: "8:20 PM",
        scene: (ctx) => (ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn") && !ctx.has("salvaged"))
          ? "Boss sends 34 review comments. 28 are formatting, 6 change the numbers — and one asks: 'Did you check contract renewals? I heard another bank walked from this over concentration risk.' Version 3 by 10:30 PM. You're on your own."
          : "Boss sends 34 review comments. 28 are formatting, 6 change the numbers. She wants version 3 by 10:30 PM. You're on your own.",
        stat: (ctx) => (ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn"))
          ? { label: "She's onto the rumor", tone: "bad" }
          : { label: "34 comments · solo", tone: "bad" },
        choices: (ctx) => {
          const arr = [
            { text: "Do all 34 in her order. Predictable.", mins: 75, tone: 50, next: "s10" },
            { text: "Do the 6 real ones first. Formatting last, in case time runs out.", mins: 55, tone: 90, next: "s10" },
            { text: "Message another first-year: 'Can you take formatting?'", mins: 40, tone: 68, mark: { id: "askedPeer", note: "you leaned on a first-year to swallow your formatting" }, next: "s10" }
          ];
          if (ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn"))
            arr.push({ text: "Pull the renewal contracts you skipped at lunch. Get ahead of her question.", mins: 50, tone: 88, mark: { id: "salvaged", note: "you dragged the rumor into the model before she asked twice" }, next: "s10" });
          return arr;
        } },
      s9_helped: { time: "8:20 PM",
        scene: (ctx) => (ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn") && !ctx.has("salvaged"))
          ? "Boss sends 34 comments — one asks about contract renewals ('I heard another bank walked from this'). Your senior offers: 'I can take formatting if you take the numbers. Yes or no?'"
          : "Boss sends 34 review comments. 28 are formatting, 6 change the numbers. She wants version 3 by 10:30 PM. Your senior messages first: 'I can take formatting if you take the numbers. Yes or no?'",
        stat: (ctx) => (ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn"))
          ? { label: "She's onto the rumor", tone: "bad" }
          : { label: "34 comments · offered help", tone: "neutral" },
        choices: (ctx) => {
          const arr = [
            { text: "'Yes, please — I'll own the 6 real edits.'", mins: 45, tone: 86, next: "s10" },
            { text: "'Thanks, I've got it — you've done enough today.'", mins: 70, tone: 52, next: "s10" },
            { text: "'Can you take formatting and spot-check my number changes?'", mins: 40, tone: 90, next: "s10" }
          ];
          if (ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn"))
            arr.push({ text: "'Yes — and can you scan the contracts for renewal risk? I skipped it at lunch.'", mins: 55, tone: 92, mark: { id: "salvaged", note: "you pulled your senior in to catch what you missed on the rumor" }, next: "s10" });
          return arr;
        } },
      // THREAD (senior) BITES: if you muted his call and never asked him
      // anything else, he's short. A one-line apology exists only because of
      // what you did. If you already built the relationship, this is easy.
      s10: { time: "10:15 PM",
        scene: (ctx) => {
          if (ctx.has("ghostedCall") && !ctx.has("apologizedSenior") && !ctx.has("askedSenior"))
            return "You send version 3. Your senior messages: 'Free to chat?' Two words, flat. You know he clocked that you muted his call earlier.";
          if (ctx.has("askedSenior"))
            return "You send version 3. Your senior messages: 'Free for a quick chat?' The tone is easy — you've been in each other's day.";
          return "You send version 3. Boss is in a meeting, silent. You order dinner. Your senior messages: 'Free for a quick chat?' No context.";
        },
        stat: (ctx) => (ctx.has("ghostedCall") && !ctx.has("apologizedSenior") && !ctx.has("askedSenior"))
          ? { label: "You owe him one", tone: "bad" }
          : { label: "Interruption", tone: "neutral" },
        choices: (ctx) => {
          const arr = [
            { text: "'Sure — call me now.'", mins: 15, tone: 84, next: "s11" },
            { text: "'Give me 15 min, finishing something.'", mins: 25, tone: 66, next: "s11" },
            { text: "'What's up? Text me?'", mins: 8, tone: 54, next: "s11" }
          ];
          if (ctx.has("ghostedCall") && !ctx.has("apologizedSenior"))
            arr.push({ text: "'Call me now — and about the meeting earlier: I muted, sorry.'", mins: 20, tone: 88, mark: { id: "apologizedSenior", note: "you owned that you muted your senior's call" }, next: "s11" });
          return arr;
        } },
      s11: { time: "11:50 PM",
        scene: "Boss is back: 'The slides are fine, but the story doesn't flow. Recommendation on page one, then analysis, then details. Print-ready by 8 AM.' You've been at this 15 hours. That's ~90 more minutes.",
        stat: { label: "One last rework", tone: "bad" },
        choices: [
          { text: "Restructure exactly as she said. She was clear.", mins: 70, tone: 86, next: "s12" },
          { text: "Just move the summary to page one and tighten a few slides.", mins: 25, tone: 24, next: "s12" },
          { text: "Walk to your senior: 'Is this a full rework or just moving pages?'", mins: 45, tone: 60, next: "s12" }
        ] },
      // The day, read back to you. Every thread you left open — or made right —
      // gets named. Recovery (salvaged, flaggedGuess, apologizedSenior)
      // rewrites the guilt.
      s12: { time: "7:45 AM (Wed)",
        scene: (ctx) => {
          const threads = [];
          // senior
          if (ctx.has("ghostedCall") && !ctx.has("apologizedSenior") && !ctx.has("askedSenior"))
            threads.push("a senior who noticed you muted his call");
          else if (ctx.has("apologizedSenior"))
            threads.push("a senior you owned up to about the call");
          else if (ctx.has("askedSenior"))
            threads.push("a senior who now knows what you're worth");
          // rumor
          if (ctx.has("linkedRumorToChurn"))
            threads.push("a rumor you built into the model as a real risk");
          else if (ctx.has("salvaged"))
            threads.push("a rumor you almost skipped but pulled back in");
          else if (ctx.has("dismissedRumor"))
            threads.push("a rumor you shrugged off");
          else if (ctx.has("dugForFlags"))
            threads.push("red flags you dug up but didn't wire in");
          // churn number
          if (ctx.has("flaggedGuess"))
            threads.push("a churn guess you owned in a footnote");
          else if (ctx.has("guessedChurn"))
            threads.push("a churn number about to walk in as fact");
          else if (ctx.has("sliderChurn"))
            threads.push("the churn number handed to your boss as a dial");
          else if (ctx.has("researchedChurn"))
            threads.push("a churn number you actually researched");
          // peer
          if (ctx.has("askedPeer"))
            threads.push("a first-year holding your formatting");

          const hid = (ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn") && !ctx.has("salvaged"))
            || (ctx.has("guessedChurn") && !ctx.has("flaggedGuess"))
            || (ctx.has("ghostedCall") && !ctx.has("apologizedSenior") && !ctx.has("askedSenior"));
          const clean = !hid && (ctx.has("linkedRumorToChurn") || ctx.has("flaggedGuess") || ctx.has("apologizedSenior") || ctx.has("askedSenior") || ctx.has("researchedChurn"));

          const close = clean
            ? " Nothing you're carrying into that room is something you tried to hide. This is the job."
            : hid
              ? " Part of what's in there is something you're hoping nobody looks at too closely. This is the job."
              : " You'll never know how much you shaped it. This is the job.";
          const opener = "You're back in. Boss glances at your slides: 'Client meeting at 10 — you're in the room,' and keeps walking.";
          const middle = threads.length
            ? ` In two hours a $1.15B decision gets made, partly on what you built last night, and you walk in with ${oxford(threads)}.`
            : " In two hours a $1.15B decision gets made, partly on what you built last night.";
          return opener + middle + close;
        },
        stat: (ctx) => {
          const debts = [
            ctx.has("dismissedRumor") && !ctx.has("linkedRumorToChurn") && !ctx.has("salvaged"),
            ctx.has("guessedChurn") && !ctx.has("flaggedGuess"),
            ctx.has("ghostedCall") && !ctx.has("apologizedSenior") && !ctx.has("askedSenior")
          ].filter(Boolean).length;
          return debts >= 2
            ? { label: "The bill comes due", tone: "bad" }
            : debts === 0
              ? { label: "A day you'd run again", tone: "good" }
              : { label: "Day 2", tone: "neutral" };
        },
        choices: [] }
    }
  },
  swe: {
    intro: "You're a mid-level engineer at a growing shopping app used by 2 million people. Today you're the main engineer on a payments feature that's already been delayed twice.",
    start: "s1",
    scenes: {
      s1: { time: "9:15 AM",
        scene: "47 unread Slack messages. 3 teammates are blocked waiting on your code review. Yesterday's bug is half-solved. The team meeting is in 30 minutes.",
        stat: { label: "Morning sort-out", tone: "neutral" },
        choices: [
          { text: "Sort through Slack first — 20 min to see what's going on before the meeting.", mins: 20, tone: 66, next: "s2" },
          { text: "Do the 3 pending code reviews first. Teammates are blocked.", mins: 35, tone: 88, sets: { unblockedTeam: true }, next: "s2" },
          { text: "Reopen yesterday's bug while your brain is fresh.", mins: 40, tone: 50, next: "s2_headsdown" }
        ] },
      s2: { time: "10:00 AM",
        scene: "Time to build the refund flow. It touches three connected systems, the written notes are two years out of date, and nobody on your team wrote any of it.",
        stat: { label: "Reading old code", tone: "bad" },
        choices: [
          { text: "Read all three systems top to bottom. ~3 hours, but you'll understand it.", mins: 180, tone: 70, next: "s3_context" },
          { text: "Read only the functions your code will call. Fix the rest if it breaks.", mins: 45, tone: 84, next: "s3_context" },
          { text: "Skim function names, guess what they do, write your code, run it.", mins: 15, tone: 18, next: "s3_burned" }
        ] },
      s2_headsdown: { time: "10:00 AM",
        scene: "You missed the team meeting, half-focused on yesterday's bug. Your manager messaged twice. You still have to build the refund flow across three systems with two-year-old notes.",
        stat: { label: "Behind before you started", tone: "bad" },
        choices: [
          { text: "Message your manager: 'Missed the meeting — here's where I am and what I'll finish today.'", mins: 10, tone: 90, next: "s3_context" },
          { text: "Head down. Catch up on what you missed by reading the code carefully.", mins: 60, tone: 66, next: "s3_context" },
          { text: "Skim function names, guess what they do, write your code, run it.", mins: 15, tone: 18, next: "s3_burned" }
        ] },
      s3_context: { time: "11:30 AM",
        scene: "While reading old code, you spot a real bug you didn't cause — rare, silent, nobody's complained. Fixing it properly is half a day.",
        stat: { label: "Not your bug", tone: "neutral" },
        choices: [
          { text: "Fix it now while you have context. Half a day, but it's gone.", mins: 240, tone: 74, next: "s4" },
          { text: "File a detailed bug report for that team. Keep moving on your feature.", mins: 20, tone: 86, next: "s4" },
          { text: "Post in the team channel: 'Anyone care about this?'", mins: 5, tone: 54, next: "s4" }
        ] },
      s3_burned: { time: "11:30 AM",
        scene: "You guessed at the function names, and your refund code silently returns wrong amounts for partial orders. You only caught it because a test balance looked odd. Two hours gone.",
        stat: { label: "Guess bit you", tone: "bad" },
        choices: [
          { text: "Stop. Go back and actually read the code you called into. 45 min.", mins: 45, tone: 90, next: "s4" },
          { text: "Patch the one case you saw, keep moving.", mins: 15, tone: 18, next: "s4" },
          { text: "Message the team channel: 'Anyone remember how partial refunds are shaped?'", mins: 5, tone: 78, next: "s4" }
        ] },
      s4: { time: "1:00 PM",
        scene: "Your feature works on your laptop. You push it to the shared test environment and get a blank white page. No error anywhere. Same code, different place.",
        stat: { label: "Ghost bug", tone: "bad" },
        choices: [
          { text: "Read the final file the browser actually loads. Slow, but you'll find it.", mins: 60, tone: 76, next: "s5" },
          { text: "Undo your last three changes one at a time to isolate what broke it.", mins: 40, tone: 84, next: "s5" },
          { text: "Blame the setup. Restart it, tag the systems team.", mins: 15, tone: 24, next: "s5" }
        ] },
      s5: { time: "2:15 PM",
        scene: "Found it — code you upgraded last week quietly changed how it works. Four-line fix. It works. Nobody will ever know you lost 90 minutes to this. This is most of the job.",
        stat: { label: "Quiet fix", tone: "good" },
        choices: [
          { text: "Spend an hour writing tests so this can't happen silently again.", mins: 60, tone: 84, next: "s6" },
          { text: "Move on to the next thing. Tests can happen later.", mins: 0, tone: 50, next: "s6" },
          { text: "Write a short note for the team so nobody else loses 90 minutes to this.", mins: 15, tone: 80, next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "Design messages: 'quick, three small visual tweaks to checkout.' Same minute, your product manager: 'also let's add guest checkout for the campaign.' That second one is a two-week feature, not a quick ask.",
        stat: { label: "Two asks at once", tone: "bad" },
        choices: [
          { text: "Reply to both now: visuals this afternoon, guest checkout planned separately.", mins: 15, tone: 86, next: "s7" },
          { text: "Take an hour to work out what's realistic before replying to either.", mins: 60, tone: 62, next: "s7" },
          { text: "'Yes to all, I'll figure it out.' Squeeze both in tonight.", mins: 10, tone: 22, next: "s7" }
        ] },
      s7: { time: "4:45 PM",
        scene: "Your intern is stuck on yesterday's task — a typo she can't see. Helping properly costs 15 minutes. Pointing at it costs 30 seconds.",
        stat: { label: "Interruption", tone: "neutral" },
        choices: [
          { text: "Sit with her 15 min, ask questions until she spots it herself.", mins: 15, tone: 88, sets: { taughtIntern: true }, next: "s8" },
          { text: "Point at the line: 'Look here.' Back to work in 30 seconds.", mins: 2, tone: 58, next: "s8" },
          { text: "'Give me 30 min to finish this, then I'll come to you.'", mins: 40, tone: 62, next: "s8" }
        ] },
      s8: { time: "5:45 PM",
        scene: "Your code passes all local tests. The testing team has left and won't check it till tomorrow. You're on emergency duty from 8 PM.",
        stat: { label: "Ship or wait", tone: "neutral" },
        choices: [
          { text: "Push to the test system now. It's ready when the testers open their laptops.", mins: 15, tone: 84, next: "s9" },
          { text: "Wait until tomorrow morning. Fresh eyes if anything breaks.", mins: 0, tone: 60, next: "s9" },
          { text: "Push it live behind a hidden switch. Faster feedback, higher risk.", mins: 25, tone: 48, next: "s9" }
        ] },
      s9: { time: "7:30 PM",
        scene: "The office is emptying. Your feature works, but 'works' and 'works well' aren't the same — there are no automated tests yet. Nobody's asking you to stay.",
        stat: { label: "Invest or leave", tone: "neutral" },
        choices: [
          { text: "Stay 90 more minutes to write proper tests. Saves someone a bad day next month.", mins: 90, tone: 82 },
          { text: "Head home. If it breaks, deal with it then.", mins: 0, tone: 48 },
          { text: "Push what you have, point out the risky parts to the testers.", mins: 20, tone: 84 }
        ],
        next: (flags) => flags.taughtIntern ? "s10_supported" : "s10_solo" },
      s10_solo: { time: "10:20 PM",
        scene: "At home. Your pager goes off — a different service is failing on 8% of requests. Not your code, but you're on emergency duty for the whole team tonight. 15 minutes before it reaches your manager.",
        stat: { label: "Real page · solo", tone: "bad" },
        choices: [
          { text: "Acknowledge it, follow that team's emergency guide. ~20 min if it's known.", mins: 20, tone: 86, next: "s11" },
          { text: "Acknowledge it, ask that team's emergency contact: 'Is this yours or should I take it?'", mins: 15, tone: 82, next: "s11" },
          { text: "Wait 10 minutes, see if it clears on its own.", mins: 10, tone: 20, next: "s11" }
        ] },
      s10_supported: { time: "10:20 PM",
        scene: "At home. Your pager goes off — a different service is failing on 8% of requests. Your intern messages: 'Saw the alert, I can pull records while you dig in — need me to?' That 15 minutes earlier paid you back.",
        stat: { label: "Real page · not alone", tone: "neutral" },
        choices: [
          { text: "'Yes — pull the last hour of logs, I'll take it and follow the guide.'", mins: 25, tone: 86, next: "s11" },
          { text: "'Thanks — get some sleep, I've got it.'", mins: 35, tone: 58, next: "s11" },
          { text: "'Message the service owner too — is this ours or theirs?' Split the work.", mins: 15, tone: 82, next: "s11" }
        ] },
      s11: { time: "11:15 PM",
        scene: "It's a problem in someone else's code, not fixable from your side. You update the team channel and try to sleep. Instead you're wired, and Slack has 14 new messages.",
        stat: { label: "Wired at 11", tone: "neutral" },
        choices: [
          { text: "Close Slack. Deal with it tomorrow — they'll message you if it's urgent.", mins: 0, tone: 82, next: "s12" },
          { text: "Quick pass: help anyone who's stuck, snooze the rest. Then sleep.", mins: 15, tone: 84, next: "s12" },
          { text: "Read all 14, reply to none. Catch up tomorrow.", mins: 20, tone: 30, next: "s12" }
        ] },
      s12: { time: "9:00 AM (Thu)",
        scene: "The testers found two rare bugs overnight — one real bug, one false alarm. You fix the real one before the meeting. Someone says 'nice work' about yesterday's fix. Nobody claps. A thing that didn't exist yesterday now quietly works for 2 million people, and only you know it took 15 hours.",
        stat: { label: "Shipped", tone: "good" },
        choices: [] }
    }
  },
  doctor: {
    intro: "You're a first-year doctor at a busy public hospital in Boston. Today: a 24-hour shift. You go home tomorrow morning — if nothing goes badly wrong.",
    start: "s1",
    scenes: {
      s1: { time: "6:45 AM",
        scene: "You reach the hospital. At 7 you walk the ward with the senior doctor, bed to bed. You've read 8 files. One — a 45-year-old man with kidney failure and confusing lab numbers — is the kind of case she uses to see who's paying attention.",
        stat: { label: "You're the intern", tone: "neutral" },
        choices: [
          { text: "Offer to present the hard case.", mins: 30, tone: 84, sets: { prepped: true }, next: "s2_prepped" },
          { text: "Present the easy cases. Let someone else take the hard one.", mins: 12, tone: 30, next: "s2_caught" },
          { text: "Check the lab numbers with the night doctor before 7.", mins: 20, tone: 88, sets: { prepped: true }, next: "s2_prepped" }
        ] },
      s2_prepped: { time: "7:15 AM",
        scene: "At his bed, the senior doctor asks why the man's potassium jumped overnight. You prepped, so you know two possible reasons. High potassium can stop the heart — she's watching whether you sound rehearsed or thoughtful.",
        stat: { label: "You know the answer", tone: "neutral" },
        choices: [
          { text: "'Two options — his kidneys getting worse, or his blood pressure drug. I'd stop the drug and recheck at noon.'", mins: 5, tone: 92, next: "s3" },
          { text: "'His kidneys are getting worse.' Confident, single answer.", mins: 3, tone: 44, next: "s3" },
          { text: "'Two options — but let me check his overnight fluids before I commit.'", mins: 12, tone: 84, next: "s3" }
        ] },
      s2_caught: { time: "7:15 AM",
        scene: "At his bed, the senior doctor skips the easy cases and asks YOU why the man's potassium jumped overnight. High potassium can stop the heart. You have three seconds before the silence gets uncomfortable.",
        stat: { label: "Silence is loud", tone: "bad" },
        choices: [
          { text: "'Not sure — could be his kidneys getting worse, or one of his drugs.'", mins: 4, tone: 82, next: "s3" },
          { text: "Guess confidently: 'It's the blood pressure medication.'", mins: 3, tone: 12, next: "s3" },
          { text: "'I don't know — I'll dig in and update you in 10 minutes.'", mins: 15, tone: 88, next: "s3" }
        ] },
      s3: { time: "9:00 AM",
        scene: "You have to explain a cancer treatment to a scared 60-year-old man and his wife. They speak little English, and the medical words don't translate. They nod, but clearly don't understand.",
        stat: { label: "They need to understand", tone: "neutral" },
        choices: [
          { text: "Draw it on paper. Sit with them 20 minutes. Miss your next patient.", mins: 20, tone: 80, next: "s4" },
          { text: "Hand them a printed pamphlet, ask them to bring family who speaks English.", mins: 5, tone: 22, next: "s4" },
          { text: "Find a nurse who speaks their language, sit with them together.", mins: 25, tone: 92, next: "s4" }
        ] },
      s4: { time: "11:30 AM",
        scene: "The senior hands you 4 new patients to examine before lunch. One is an 82-year-old woman, barely conscious, on 9 drugs from 3 different doctors. Untangling those alone takes an hour.",
        stat: { label: "4 patients, 1 hard one", tone: "bad" },
        choices: [
          { text: "Do the hardest one first, while you're still fresh.", mins: 40, tone: 80, next: "s5" },
          { text: "Do the three quick ones first, save the hard one for last.", mins: 35, tone: 52, next: "s5" },
          { text: "Send her son to fetch her actual medicine packets while you start on her.", mins: 25, tone: 88, next: "s5" }
        ] },
      s5: { time: "12:45 PM",
        scene: "You've missed lunch. A nurse calls you: a patient's blood pressure is crashing fast. You're the closest doctor. Could be infection, bleeding, or a drug reaction.",
        stat: { label: "Crashing fast", tone: "bad" },
        choices: [
          { text: "Sprint over. Check she's breathing and her pulse first.", mins: 25, tone: 92, next: "s6" },
          { text: "Ask the nurse to start a drip while you finish your paperwork.", mins: 30, tone: 12, next: "s6" },
          { text: "Call your senior for advice on the phone as you walk over.", mins: 20, tone: 60, next: "s6" }
        ] },
      s6: { time: "1:15 PM",
        scene: "The patient is settling. You notice she was given a drug this morning that her chart said to pause. Someone missed the note — and so did you, this morning.",
        stat: { label: "System failure, and yours", tone: "neutral" },
        choices: [
          { text: "Write down exactly what happened, tell your senior, flag the shift change.", mins: 20, tone: 88, next: "s7_owned" },
          { text: "Fix the patient, quietly mention it to the nurse, leave it there.", mins: 6, tone: 48, next: "s7_quiet" },
          { text: "Blame the previous shift in your notes. Protect yourself.", mins: 10, tone: 15, next: "s7_blamed" }
        ] },
      s7_owned: { time: "3:30 PM",
        scene: "Your senior has already read your report. 'Good — that's the kind of resident I can trust with more.' She wants to hear how you're thinking about the miss.",
        stat: { label: "You owned it", tone: "good" },
        choices: [
          { text: "Explain your reasoning honestly and calmly.", mins: 12, tone: 86, next: "s8" },
          { text: "Apologize deeply. Don't defend the call.", mins: 8, tone: 56, next: "s8" },
          { text: "Say the shift-change process needs fixing, not just you.", mins: 15, tone: 84, next: "s8" }
        ] },
      s7_quiet: { time: "3:30 PM",
        scene: "Your senior stops by, arms crossed but not angry: 'Let's talk about this morning.' She's watching how you explain your own decisions, not just what you did.",
        stat: { label: "Uncomfortable talk", tone: "neutral" },
        choices: [
          { text: "Explain your reasoning honestly and calmly.", mins: 12, tone: 86, next: "s8" },
          { text: "Apologize deeply. Don't defend the call.", mins: 8, tone: 56, next: "s8" },
          { text: "Point out you were actually right in the end.", mins: 15, tone: 24, next: "s8" }
        ] },
      s7_blamed: { time: "3:30 PM",
        scene: "Your senior stops by, and this time she IS annoyed. She's read your notes. 'You pointed the finger at the night shift. Let's talk about that.'",
        stat: { label: "Now it's harder", tone: "bad" },
        choices: [
          { text: "Own it: 'You're right — I saw the note and missed it too.'", mins: 10, tone: 90, next: "s8" },
          { text: "Defend it. The night shift is where it started.", mins: 8, tone: 18, next: "s8" },
          { text: "Apologize, ask to rewrite the entry with your name on the miss.", mins: 20, tone: 88, next: "s8" }
        ] },
      s8: { time: "5:00 PM",
        scene: "You have 15 minutes to eat and finish notes. Your senior mentions casually: 'The department needs help on a research project — thought of you.' A real opportunity. Also more work, and you already sleep 5 hours a night.",
        stat: { label: "Career opportunity", tone: "neutral" },
        choices: [
          { text: "'Yes — I'd love to. Can we talk about how much work this weekend?'", mins: 8, tone: 84, next: "s9" },
          { text: "'Interested — can I take a week to think about it?'", mins: 5, tone: 78, next: "s9" },
          { text: "'Thank you, but I'm too stretched right now. Can I revisit in 3 months?'", mins: 5, tone: 74, next: "s9" }
        ] },
      s9: { time: "7:00 PM",
        scene: "12 hours in. A family arrives — their father died at another hospital this morning and they want you to explain the death report. You're the only doctor free. Not really your job. They're shattered.",
        stat: { label: "Grieving family", tone: "neutral" },
        choices: [
          { text: "Sit with them, read the report properly, explain it gently.", mins: 25, tone: 76, next: "s10" },
          { text: "Explain you can't officially weigh in, but stay with them 5 minutes.", mins: 6, tone: 86, next: "s10" },
          { text: "Give a quick guess based on what they show you.", mins: 4, tone: 20, next: "s10" }
        ] },
      s10: { time: "10:15 PM",
        scene: "A 34-year-old with severe asthma is brought in gasping, oxygen dangerously low. Treatment is ready — but his family is loud, panicked, and arguing next to the bed.",
        stat: { label: "Chaos at the bedside", tone: "bad" },
        choices: [
          { text: "Firmly but politely ask the family to step outside for 10 minutes.", mins: 8, tone: 86, next: "s11" },
          { text: "Ignore the family. Focus on the patient.", mins: 2, tone: 60, next: "s11" },
          { text: "Have the nurse manage the family while you work.", mins: 5, tone: 88, next: "s11" }
        ] },
      s11: { time: "12:40 AM",
        scene: "Patient stable. You've eaten once in 18 hours. You lie down for 30 minutes. Your phone rings 12 minutes in — a new patient, possible dengue.",
        stat: { label: "12 minutes of sleep", tone: "bad" },
        choices: [
          { text: "Get up, go see the patient properly.", mins: 40, tone: 84, next: "s12" },
          { text: "Ask the nurse to start standard tests. Come see in 30 minutes.", mins: 35, tone: 78, next: "s12" },
          { text: "Ask them to hold the patient until you're up in 20 more minutes.", mins: 25, tone: 26, next: "s12" }
        ] },
      s12: { time: "3:00 AM",
        scene: "You helped deliver a baby at 1:40 AM — your first this month. Too tired to feel proud. Rounds start in 4 hours. This is Tuesday. There are twelve more shifts like this ahead, and residency is three years long.",
        stat: { label: "First 21 hours done", tone: "neutral" },
        choices: [] }
    }
  },
  founder: {
    intro: "You're the CEO of a 3-person startup in San Francisco building a productivity app for students. You've raised $500K, with 8 months of money left. Today is a normal chaotic Wednesday.",
    start: "f1",
    scenes: {
      // ONE DAY, THREE RUNNING THREADS. Maya (the angry user), Sam (your lead
      // engineer), and your co-founder each come back more than once, and how you
      // left them earlier changes both the words AND the options you get later.
      // Kept short and plain on purpose.
      f1: { time: "8:30 AM",
        scene: "14 Slack messages. Maya, a user with 30K followers, says the app wiped her notes. She wants a refund — and might post about it.",
        stat: { label: "Trouble before coffee", tone: "bad" },
        choices: [
          { text: "Call Maya yourself. It's 20 minutes you don't have.", mins: 20, tone: 90, sets: { handledDirectly: true }, next: "f2" },
          { text: "Send an apology, a refund, and recovery steps.", mins: 35, tone: 74, next: "f2" },
          { text: "Reply from the company account, keep building.", mins: 10, tone: 50, mark: { id: "wentPublic", note: "you let it go public before you knew what broke" }, next: "f2" }
        ] },
      // THREAD (Maya) continues — framed by how f1 went.
      f2: { time: "9:15 AM",
        scene: (ctx) => ctx.has("handledDirectly")
          ? "The call worked — Maya's holding off. And you learn the truth: her notes aren't gone. A sync bug your own team shipped is hiding them."
          : ctx.has("wentPublic")
            ? "Maya posted. 40 replies already. Then you find the truth: her notes aren't gone — a sync bug your team shipped is hiding them."
            : "Maya goes quiet, for now. You dig in: her notes aren't gone. A sync bug your team shipped is hiding them.",
        stat: { label: "The bug was yours", tone: "bad" },
        choices: [
          { text: "Tell Maya it was our bug. Walk her through the fix.", mins: 40, tone: 90, next: "f3" },
          { text: "Just fix it. No need to get into whose fault it was.", mins: 20, tone: 50, mark: { id: "hidBug", note: "you never told Maya the bug was yours" }, next: "f3" },
          { text: "Get her notes back now. Do the real fix tomorrow.", mins: 15, tone: 58, next: "f3" }
        ] },
      // THREAD (co-founder) begins.
      f3: { time: "10:30 AM",
        scene: "Your co-founder messages: 'Let's add AI to everything. Investors will love it.' You've spent 4 months on the current plan.",
        stat: { label: "Pivot pressure", tone: "neutral" },
        choices: [
          { text: "Block 30 minutes. Pressure-test it with data.", mins: 40, tone: 88, next: "f4" },
          { text: "Trust the 4 months of data. Finish the plan.", mins: 5, tone: 70, next: "f4" },
          { text: "Green-light it. If investors want AI, move fast.", mins: 20, tone: 22, mark: { id: "greenlitAI", note: "you greenlit AI on a whim this morning" }, next: "f4" }
        ] },
      // THREAD (users) begins.
      f4: { time: "11:30 AM",
        scene: "You check the numbers. More sign-ups. But fewer people come back after a week — 22%, down from 27%.",
        stat: { label: "Fewer users returning", tone: "bad" },
        choices: [
          { text: "Book 5 user calls tomorrow. It costs your deck day.", mins: 35, tone: 90, next: "f5" },
          { text: "Ship a welcome-screen fix. You're guessing at the cause.", mins: 90, tone: 52, next: "f5" },
          { text: "Ride the sign-up growth. Revisit after the raise.", mins: 2, tone: 16, mark: { id: "ignoredRetention", note: "you waved off the drop in returning users" }, next: "f5" }
        ] },
      // THREAD (investor) begins.
      f5: { time: "12:30 PM",
        scene: "An investor you've chased for months writes: 'Free Thursday? Let's talk about a bigger raise.' You're not ready.",
        stat: { label: "Rare chance", tone: "neutral" },
        choices: [
          { text: "Say yes. Be honest Thursday about where you are.", mins: 8, tone: 86, sets: { investorThursday: true }, next: "f6" },
          { text: "Say yes. Spend the week buffing the numbers first.", mins: 20, tone: 22, sets: { investorThursday: true }, mark: { id: "paddedNumbers", note: "you spent days dressing up the numbers for Thursday" }, next: "f6" },
          { text: "Push to next month. Risk the second no.", mins: 8, tone: 80, next: "f6" }
        ] },
      // THREAD (users) BITES: if you ignored the drop, Sam names it as he quits.
      // And a "make it right" option only exists because you skipped it.
      f6: { time: "2:00 PM",
        scene: (ctx) => ctx.has("ignoredRetention")
          ? "Sam, your lead engineer, closes the door. 'Google offered me 3x. And that drop you waved off this morning? I flagged it weeks ago. I'm done building on stuff we pretend is fine.'"
          : "Sam, your lead engineer, closes the door. 'Google offered me 3x, plus stock. I want to stay — but I have to think.' He's why the product works.",
        stat: (ctx) => ctx.has("ignoredRetention")
          ? { label: "This one's on you", tone: "bad" }
          : { label: "You can't outpay Google", tone: "bad" },
        choices: [
          { when: (ctx) => ctx.has("ignoredRetention"),
            text: "'You were right. Give me an hour — I'll fix what I skipped.'", mins: 60, tone: 92, mark: { id: "madeAmends", note: "you owned the retention miss and won Sam back" }, next: "f7" },
          { text: "Offer more equity, a title, and a real conversation.", mins: 30, tone: 84, next: "f7" },
          { text: "Wish him well. You can't outpay Google.", mins: 15, tone: 40, mark: { id: "lostEngineer", note: "you let Sam walk to Google" }, next: "f7" }
        ] },
      // THREAD (co-founder) BITES: the AI you greenlit is now a demo demanding a
      // real answer. If you greenlit it, backing out now is a visible flip-flop.
      f7: { time: "3:30 PM",
        scene: (ctx) => ctx.has("greenlitAI")
          ? "Your co-founder drops a demo on your desk — the AI feature you greenlit this morning. Half-working. 'You said yes. Are we doing this, or not?'"
          : ctx.has("lostEngineer")
            ? "Your co-founder shows a demo they built alone last night. Half-working. With Sam leaving, they ask: who finishes it?"
            : "Your co-founder shows a demo they built in secret — a note summarizer. Half-working. They want a yes or no.",
        stat: (ctx) => ctx.has("greenlitAI")
          ? { label: "The bet you made", tone: "bad" }
          : { label: "Surprise demo", tone: "neutral" },
        choices: [
          { text: "Test it 4 weeks. Let users decide.", mins: 25, tone: 88, next: "f8" },
          { when: (ctx) => ctx.has("greenlitAI"),
            text: "Kill it now. You've changed your mind.", mins: 5, tone: 42, mark: { id: "flipFlopped", note: "you greenlit AI, then killed it hours later" }, next: "f8" },
          { when: (ctx) => !ctx.has("greenlitAI"),
            text: "Pass. It pulls focus from the plan.", mins: 5, tone: 54, next: "f8" },
          { text: "Go all in. Bet the company on AI.", mins: 40, tone: 18, mark: { id: "betOnAI", note: "you bet the company on a half-built AI demo" }, next: "f8" }
        ] },
      // THREAD (Maya) RETURNS — but only in the form you actually caused. Called
      // her and she becomes a public fan; went public and the morning thread has
      // legs; kept it quiet and there's no tweet at all, just a review. No public
      // moment is invented from nothing.
      f8: { time: "5:00 PM",
        scene: (ctx) => {
          const publicMaya = ctx.has("handledDirectly") || ctx.has("wentPublic");
          if (!publicMaya)
            return "No public blow-up today. But a new app-store review is climbing: 'Loved it — then it lost my notes.'";
          const base = ctx.has("handledDirectly")
            ? "Maya posts, unprompted: 'This founder actually called me and sorted it.' 400 likes and climbing."
            : "Your morning reply to Maya is getting quoted around — 400 people watching how this lands.";
          return (ctx.has("hidBug") && !ctx.has("cameClean"))
            ? base + " You're the only one who knows you never said the bug was yours. A reply asks: 'so what caused it?'"
            : base;
        },
        stat: (ctx) => {
          const publicMaya = ctx.has("handledDirectly") || ctx.has("wentPublic");
          if (!publicMaya) return { label: "A quieter cost", tone: "neutral" };
          return (ctx.has("hidBug") && !ctx.has("cameClean"))
            ? { label: "Public, with a catch", tone: "bad" }
            : { label: "Eyes on you", tone: "good" };
        },
        choices: (ctx) => {
          const publicMaya = ctx.has("handledDirectly") || ctx.has("wentPublic");
          if (!publicMaya) {
            // No viral moment — the bug's public cost is a lone review instead.
            return [
              { text: "Reply to the review. Offer to make it right.", mins: 20, tone: 84, next: "f9" },
              { text: "Ship the fix first, reply once it's live.", mins: 30, tone: 66, next: "f9" },
              { text: "Leave it. One review won't move things.", mins: 2, tone: 34, next: "f9" }
            ];
          }
          const arr = [{ text: "Reply openly — thank her, name the fix.", mins: 20, tone: 82, next: "f9" }];
          if (ctx.has("hidBug"))
            arr.push({ text: "Come clean — say the bug was yours.", mins: 25, tone: 90, mark: { id: "cameClean", note: "you owned the bug in public in the end" }, next: "f9" });
          else
            arr.push({ text: "Screenshot it for the investor deck.", mins: 5, tone: 45, next: "f9" });
          arr.push({ text: "Stay focused. Let it ride.", mins: 2, tone: 38, next: "f9" });
          return arr;
        } },
      // THREAD (users) continues — the real reason people leave.
      f9: { time: "6:30 PM",
        scene: "Two user calls, same story: 'I love it for a week, then I forget it.' It's a habit problem, not a feature problem.",
        stat: { label: "You learned something", tone: "good" },
        choices: [
          { text: "Write it up tonight. Send it to your co-founder.", mins: 45, tone: 86, next: "f10" },
          { text: "Sit on it. Two calls isn't enough.", mins: 2, tone: 52, next: "f10" },
          { text: "Just add reminder pings next release.", mins: 30, tone: 34, next: "f10" }
        ] },
      // THREAD (co-founder) continues — the money question you dodged all day.
      f10: { time: "8:00 PM",
        scene: "Your co-founder finds you: 'What if we can't raise?' You've dodged this all day.",
        stat: { label: "The question you avoided", tone: "bad" },
        choices: [
          { text: "Open the numbers. Be honest with them.", mins: 40, tone: 88, next: "f11" },
          { text: "'We'll raise. Don't spiral — focus on the product.'", mins: 10, tone: 22, mark: { id: "dismissedCofounder", note: "you brushed off your co-founder instead of facing it" }, next: "f11" },
          { text: "Cut costs tonight. Chase revenue over growth.", mins: 60, tone: 82, next: "f11" }
        ] },
      // THREADS (investor + users + co-founder) CONVERGE. If you brushed off your
      // co-founder, she's in the room now. If you ignored the drop, this is the
      // second time you'd look away.
      f11: { time: "10:00 PM",
        scene: (ctx) => ctx.has("dismissedCofounder")
          ? "You draft the investor update. Your co-founder is still up, watching. 'You told me not to worry. So — do we tell them the truth?'"
          : ctx.has("ignoredRetention")
            ? "You draft the investor update. That drop you waved off this morning is still there. Say it — or look away again?"
            : "You draft the investor update. Do you say the retention drop out loud, or bury it?",
        stat: (ctx) => (ctx.has("ignoredRetention") || ctx.has("dismissedCofounder"))
          ? { label: "Honesty test, again", tone: "bad" }
          : { label: "Honesty test", tone: "neutral" },
        choices: [
          { text: "Lead with the drop, then your fix.", mins: 30, tone: 88, next: "f12" },
          { text: "Fold it into the growth story.", mins: 20, tone: 40, mark: { id: "hidFromInvestors", note: "you buried the drop in the investor update" }, next: "f12" },
          { text: "Leave it out this month.", mins: 5, tone: 18, mark: { id: "hidFromInvestors", note: "you left the drop out of the update entirely" }, next: "f12" }
        ] },
      // The day, read back to you. Every thread you left open — or made right —
      // gets named. Recovery (came clean, made amends) rewrites the guilt.
      f12: { time: "11:45 PM",
        scene: (ctx) => {
          const bugHidden = ctx.has("hidBug") && !ctx.has("cameClean");
          const dropHidden = ctx.has("hidFromInvestors") || (ctx.has("ignoredRetention") && !ctx.has("madeAmends"));
          const threads = [];
          // engineer
          if (ctx.has("lostEngineer")) threads.push("Sam already gone to Google");
          else if (ctx.has("madeAmends")) threads.push("Sam staying because you finally listened");
          else threads.push("Sam staying for now");
          // bug / Maya
          if (ctx.has("cameClean")) threads.push("a bug you owned up to in the end");
          else if (bugHidden) threads.push("a bug you never admitted was yours");
          // AI
          if (ctx.has("betOnAI")) threads.push("the company bet on a half-built AI demo");
          else if (ctx.has("flipFlopped")) threads.push("an AI idea you greenlit then killed");
          else if (ctx.has("greenlitAI")) threads.push("an AI bet you made on a feeling");
          // users
          if (dropHidden) threads.push("a user drop you kept looking away from");
          else threads.push("users you're finally trying to win back");
          // numbers / co-founder
          if (ctx.has("paddedNumbers")) threads.push("numbers you dressed up for Thursday");
          if (ctx.has("dismissedCofounder")) threads.push("a co-founder you brushed off");
          // investor — only "Thursday" if you actually took the meeting
          threads.push(ctx.has("investorThursday")
            ? "an investor across the table Thursday"
            : "an investor you put off till next month");
          // Maya — only public if you called her or went public; otherwise she's
          // just a refund who quietly moved on.
          if (ctx.has("handledDirectly") || ctx.has("wentPublic"))
            threads.push("Maya, now telling 30K people about you");
          else
            threads.push("Maya, refunded and gone quiet");

          const hid = bugHidden || ctx.has("hidFromInvestors") || ctx.has("paddedNumbers");
          const clean = !hid && !ctx.has("lostEngineer") && !ctx.has("dismissedCofounder") && !ctx.has("betOnAI");
          const close = clean
            ? "You keep going. It's yours — the win, the mess, all of it. And nothing you're carrying tonight is something you hid."
            : hid
              ? "You keep going. It's yours — all of it. Especially the parts you're hoping nobody looks at too closely."
              : "You keep going. It's yours — the win, the mess, all of it.";
          return `You eat dinner at your desk. Money running low, ${oxford(threads)}. ${close}`;
        },
        stat: (ctx) => {
          const bugHidden = ctx.has("hidBug") && !ctx.has("cameClean");
          const debts = [bugHidden, ctx.has("lostEngineer"),
            ctx.has("ignoredRetention") && !ctx.has("madeAmends"),
            ctx.has("hidFromInvestors"), ctx.has("paddedNumbers"),
            ctx.has("dismissedCofounder"), ctx.has("betOnAI")].filter(Boolean).length;
          return debts >= 3
            ? { label: "The bill comes due", tone: "bad" }
            : debts === 0
              ? { label: "A day you'd run again", tone: "good" }
              : { label: "Another 15 hours down", tone: "neutral" };
        },
        choices: [] }
    }
  },
  marketing: {
    intro: "You're Head of Marketing at a growing skincare brand in Los Angeles. Team of 6. Today's job: nail the launch of a new sunscreen, in 12 days. Also today: everything else.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "Your ad agency sent the sunscreen launch concept. It's moody, black-and-white, 'edgy.' Your gut says sunscreen should feel warm and fun. Their creative director will get defensive.",
        stat: { label: "Taste call, morning 1", tone: "neutral" },
        choices: [
          { text: "Reject it cleanly: 'This misses. Give us warm, fun, and inviting.'", mins: 15, tone: 84, sets: { rejectedAgency: true }, next: "s2" },
          { text: "Approve it. Trust the agency — they've done bigger launches than you.", mins: 5, tone: 30, sets: { approvedAgency: true }, next: "s2" },
          { text: "Ask them to make both, then test each with real users for a week.", mins: 40, tone: 86, next: "s2" }
        ] },
      s2: { time: "10:30 AM",
        scene: "Weekly review. Last week's ads cost $5,000 and brought in $1,500. You're spending far more than the ads make back.",
        stat: { label: "Losing on ads", tone: "bad" },
        choices: [
          { text: "Kill the weak campaigns today. Move that budget to what's working.", mins: 45, tone: 88, next: "s3" },
          { text: "Blame the tracking, say it's broken, keep spending.", mins: 5, tone: 16, next: "s3_denial" },
          { text: "Cut spend by 60% and watch what happens for a week.", mins: 20, tone: 78, next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "You dig in. Two campaigns are making real money. Three are burning cash — and those three are your boss's pet project, brand videos she's attached to.",
        stat: { label: "Politics vs. numbers", tone: "bad" },
        choices: [
          { text: "Kill her pet campaigns. Walk into her office and explain the data.", mins: 30, tone: 88, next: "s4" },
          { text: "Kill them quietly while she's on vacation. Easier to explain after.", mins: 10, tone: 20, next: "s4" },
          { text: "Cut them by 80% instead of killing them. Save face, half-solve it.", mins: 20, tone: 58, next: "s4" }
        ] },
      s3_denial: { time: "11:30 AM",
        scene: "You told the team the tracking is broken. Now your CEO's assistant wants the updated numbers she promised the board today. Two hours to either fix the story or fix the numbers.",
        stat: { label: "Story you can't hold", tone: "bad" },
        choices: [
          { text: "Come clean: 'Tracking is fine — the campaigns are underperforming. Here's the plan.'", mins: 35, tone: 86, next: "s4" },
          { text: "Buy time: 'Data team is re-checking, will send by end of day.'", mins: 8, tone: 44, next: "s4" },
          { text: "Send lightly-tweaked numbers that make last week look better.", mins: 25, tone: 12, next: "s4" }
        ] },
      s4: { time: "1:00 PM",
        scene: "An influencer with 200K followers wants $1,000 for one sunscreen post. Decent likes and comments, but her audience is 62% men. Your product targets women.",
        stat: { label: "Wrong audience", tone: "neutral" },
        choices: [
          { text: "Politely decline: 'Wrong fit here — let's talk next quarter.'", mins: 8, tone: 82, next: "s5" },
          { text: "Take it. It's 200K people, and some of those men have partners and moms.", mins: 5, tone: 28, next: "s5" },
          { text: "Negotiate to $500 for one test post. Measure if it actually leads to sales.", mins: 20, tone: 76, next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "Your junior marketer, six months in, hands you the website page text. It's a 6/10. Fixing it yourself takes 45 minutes. Teaching her to fix it takes 90. It goes live tomorrow.",
        stat: { label: "Fix or teach", tone: "neutral" },
        choices: [
          { text: "Sit with her for 90 minutes and walk through what's wrong together.", mins: 90, tone: 84, sets: { taughtJunior: true }, next: "s6" },
          { text: "Fix it yourself in 45. Send her a before/after to study.", mins: 45, tone: 64, next: "s6" },
          { text: "Approve it as-is and ship. She'll learn on the next one.", mins: 5, tone: 26, next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "You're testing an ad line: 'Sunscreen that doesn't make you look pale.' Could land well — plenty of people hate the white film it leaves. Could also stir anger about skin-tone bias.",
        stat: { label: "Risky angle", tone: "bad" },
        choices: [
          { text: "Reframe it: 'Invisible finish for every skin tone.' Same idea, no risk.", mins: 20, tone: 84, next: "s7" },
          { text: "Push it as-is. Bold works.", mins: 5, tone: 30, next: "s7" },
          { text: "Bring it to your CEO. Let her make the call.", mins: 15, tone: 54, next: "s7" }
        ] },
      s7: { time: "4:15 PM",
        scene: "Your bestselling face wash is out of stock in 3 major delivery zones. The warehouse team knew last Friday and never told marketing. Your ads have been sending people to a page that says 'unavailable here.'",
        stat: { label: "Wasted ad spend", tone: "bad" },
        choices: [
          { text: "Pause those zones in your ad targeting now, then talk to the warehouse team.", mins: 25, tone: 88, next: "s8" },
          { text: "Send an angry message to the warehouse team. Keep the ads running.", mins: 5, tone: 18, next: "s8" },
          { text: "Redirect that traffic to the sunscreen pre-order page instead.", mins: 20, tone: 84, next: "s8" }
        ] },
      s8: { time: "5:00 PM",
        scene: "Your CEO stops by: 'Give me the sunscreen strategy in one sentence.' You have 30 things running across every channel. She has 90 seconds.",
        stat: { label: "Distill the story", tone: "neutral" },
        choices: [
          { text: "'We're convincing people daily sunscreen isn't optional — as normal as moisturizer.'", mins: 10, tone: 86 },
          { text: "List the top 6 things quickly.", mins: 15, tone: 34 },
          { text: "'We're going to own the sunscreen conversation online in 6 months.'", mins: 8, tone: 80 }
        ],
        next: (flags) => flags.rejectedAgency ? "s9_reshoot" : flags.approvedAgency ? "s9_stuck" : "s9_reshoot" },
      s9_reshoot: { time: "6:00 PM",
        scene: "Your agency comes back with a warmer, better concept — but wants $1,800 more to reshoot. The launch budget is already tight.",
        stat: { label: "Money on the line", tone: "neutral" },
        choices: [
          { text: "'Reshoot within what we already paid for. This was your first delivery.'", mins: 15, tone: 82, next: "s10" },
          { text: "Pay the extra. This needs to be right.", mins: 10, tone: 58, next: "s10" },
          { text: "Compromise: reshoot only the main product shot, keep the rest.", mins: 25, tone: 80, next: "s10" }
        ] },
      s9_stuck: { time: "6:00 PM",
        scene: "The moody concept you approved this morning is printed and goes into paid ads tomorrow. Your junior brings you a Reddit thread — early users are calling the visuals 'depressing.' You have 18 hours to react.",
        stat: { label: "Approved too fast", tone: "bad" },
        choices: [
          { text: "Kill the launch ads tonight. Negotiate an emergency reshoot at cost.", mins: 45, tone: 84, next: "s10" },
          { text: "Ship it as-is. Plan a fun follow-up ad for week 2.", mins: 10, tone: 46, next: "s10" },
          { text: "Cut a lighter 15-second edit yourself tonight from spare footage. Lead with that.", mins: 75, tone: 82, next: "s10" }
        ] },
      s10: { time: "7:30 PM",
        scene: "Launch is in 12 days and four things are still unresolved. But three different people messaged you today saying your last campaign made them buy. That's feedback no dashboard shows you.",
        stat: { label: "Real feedback", tone: "good" },
        choices: [
          { text: "Screenshot the messages. Save them for next quarter.", mins: 5, tone: 56, next: "s11" },
          { text: "Reply to each personally, thank them, ask a follow-up question.", mins: 40, tone: 84, next: "s11" },
          { text: "Forward them to the CEO to lift her mood after the numbers talk.", mins: 8, tone: 68, next: "s11" }
        ] },
      s11: { time: "9:15 PM",
        scene: "In a cab home, you draft tomorrow's plan on your phone. You realize you never ate lunch. Twelve days to launch. A thousand things could still go wrong. You still love this job.",
        stat: { label: "Planning on the ride home", tone: "good" },
        choices: [] }
    }
  },
  teacher: {
    intro: "You teach Grade 10 math at a public school in Chicago — 36 kids in your homeroom, plus 4 other sections. Today: quadratic equations, a topic half the class hates and one kid loves.",
    start: "s1",
    scenes: {
      s1: { time: "7:45 AM",
        scene: "Staff room, 20 minutes before class. Your co-teacher is venting — a student's parents complained about his grade and the principal wants her to change it. You know the student. He earned that grade.",
        stat: { label: "Colleague at breaking point", tone: "bad" },
        choices: [
          { text: "'Hold the grade. I'll come with you to the principal if you want.'", mins: 15, tone: 84, sets: { backedColleague: true }, next: "s2" },
          { text: "'Not worth the fight. Change it and move on.'", mins: 5, tone: 28, next: "s2" },
          { text: "Listen carefully, don't offer an opinion. Be a friend, not an advisor.", mins: 12, tone: 58, next: "s2" }
        ] },
      s2: { time: "8:15 AM",
        scene: "Homework check. 22 kids did it, 14 didn't. Of the 14: 3 didn't bother, 6 never do it (something's off at home), 5 tried and got stuck on one hard question.",
        stat: { label: "Class starts in 5", tone: "neutral" },
        choices: [
          { text: "Spend 10 minutes redoing that question on the board for everyone.", mins: 10, tone: 82, next: "s3_engaged" },
          { text: "Give the whole class the same warning: 'This is unacceptable.'", mins: 3, tone: 24, next: "s3_tense" },
          { text: "Pull the 5 stuck kids aside during break. Handle the rest privately.", mins: 20, tone: 86, next: "s3_engaged" }
        ] },
      s3_engaged: { time: "9:45 AM",
        scene: "Mid-lesson, a student asks you to re-explain something you covered 10 minutes ago. The class is with you today — nobody rolls their eyes, they just wait.",
        stat: { label: "Class is with you", tone: "good" },
        choices: [
          { text: "Explain it again, differently — with a real-world example this time.", mins: 8, tone: 86, next: "s4" },
          { text: "Ask another student to explain it to her instead.", mins: 4, tone: 80, next: "s4" },
          { text: "'We covered this — see me right after class and we'll go over it.'", mins: 3, tone: 56, next: "s4" }
        ] },
      s3_tense: { time: "9:45 AM",
        scene: "You started class on a warning. Mid-lesson, a student asks you to re-explain something you covered 10 minutes ago. Half the class visibly rolls their eyes.",
        stat: { label: "Class is on edge", tone: "bad" },
        choices: [
          { text: "Explain it again, differently — with a real-world example this time.", mins: 8, tone: 84, next: "s4" },
          { text: "Ask another student to explain it to her instead.", mins: 4, tone: 78, next: "s4" },
          { text: "'We covered this — see me right after class and we'll go over it.'", mins: 3, tone: 34, next: "s4" }
        ] },
      s4: { time: "10:30 AM",
        scene: "A usually punctual student walks in 12 minutes late, no bag, red-eyed. The whole class watches.",
        stat: { label: "Something's wrong", tone: "bad" },
        choices: [
          { text: "'Come in, catch up.' Pull her aside quietly during the next activity.", mins: 6, tone: 88, next: "s5" },
          { text: "Follow policy: 'That's a late mark, please sit down.'", mins: 2, tone: 24, next: "s5" },
          { text: "Skip the moment, teach, catch her at the end of class.", mins: 10, tone: 60, next: "s5" }
        ] },
      s5: { time: "11:15 AM",
        scene: "You catch her in the corridor after class. Her parents fought again last night, she didn't sleep, and she's holding it together for school. She doesn't want a counselor and doesn't want you to call anyone.",
        stat: { label: "Trust given", tone: "neutral" },
        choices: [
          { text: "Respect what she asked. Check in on her privately every day this week.", mins: 15, tone: 82, next: "s6" },
          { text: "Report it to the school counselor anyway. That's the rule.", mins: 10, tone: 64, next: "s6" },
          { text: "Offer to talk to her homeroom teacher confidentially.", mins: 12, tone: 76, next: "s6" }
        ] },
      s6: { time: "12:30 PM",
        scene: "Lunch. You planned to grade 40 tests. Instead a colleague vents about the new admin software, and another drops an unsigned field trip form you haven't reviewed.",
        stat: { label: "Lunch already gone", tone: "bad" },
        choices: [
          { text: "Eat, read and sign the form, grade tonight instead.", mins: 25, tone: 82 },
          { text: "Skip lunch, grade during the break.", mins: 40, tone: 50 },
          { text: "Eat, don't grade, don't sign. Protect your lunch.", mins: 5, tone: 54 }
        ],
        next: (flags) => flags.backedColleague ? "s7_ally" : "s7_alone" },
      s7_ally: { time: "1:30 PM",
        scene: "Your co-teacher stops by. 'Principal backed off — I told him you'd come with me. Thank you.' She leaves you a coffee. Meanwhile: your top student is texting under his desk, second time this week.",
        stat: { label: "Small return", tone: "good" },
        choices: [
          { text: "Take the phone quietly. Tell him to see you after class.", mins: 3, tone: 82, next: "s8" },
          { text: "Call him out publicly — make an example, especially since he's the top kid.", mins: 2, tone: 26, next: "s8" },
          { text: "Ignore it for now. Address it privately after class.", mins: 10, tone: 62, next: "s8" }
        ] },
      s7_alone: { time: "1:30 PM",
        scene: "Your top student is texting under his desk — second time this week. He gets top marks without trying. You're already worn out from a morning where you kept your head down.",
        stat: { label: "Discipline call", tone: "neutral" },
        choices: [
          { text: "Take the phone quietly. Tell him to see you after class.", mins: 3, tone: 82, next: "s8" },
          { text: "Call him out publicly — make an example, especially since he's the top kid.", mins: 2, tone: 26, next: "s8" },
          { text: "Ignore it for now. Address it privately after class.", mins: 10, tone: 60, next: "s8" }
        ] },
      s8: { time: "2:30 PM",
        scene: "Free period, 90 minutes. Options: grade 20 tests, prep tomorrow's lesson, or answer 8 unread parent emails.",
        stat: { label: "90 minutes, 3 things", tone: "neutral" },
        choices: [
          { text: "Prep tomorrow's lesson. Teaching well tomorrow serves 180 kids.", mins: 50, tone: 82, next: "s9" },
          { text: "Grade 20 tests. Kids and parents want scores.", mins: 60, tone: 60, next: "s9" },
          { text: "Answer parent emails. Saves you trouble later.", mins: 35, tone: 58, next: "s9" }
        ] },
      s9: { time: "3:30 PM",
        scene: "School's out. 40 tests still to grade. You also promised your own kid you'd be at their football game at 5 — a 25-minute drive.",
        stat: { label: "40 tests, one game", tone: "bad" },
        choices: [
          { text: "Grade 10 now, drive to the game, finish the rest tonight.", mins: 30, tone: 84, next: "s10" },
          { text: "Skip the game. Finish grading.", mins: 90, tone: 30, next: "s10" },
          { text: "Go to the game, grade half-heartedly during it.", mins: 45, tone: 34, next: "s10" }
        ] },
      s10: { time: "5:15 PM",
        scene: "At the game, your kid scores a goal — you see it. Between plays, a parent's email pops up, complaining you're 'too harsh in grading.'",
        stat: { label: "Not now", tone: "neutral" },
        choices: [
          { text: "Put the phone away. This is your kid's moment. Reply tonight.", mins: 2, tone: 86, next: "s11" },
          { text: "Reply now, briefly, to defuse it.", mins: 6, tone: 32, next: "s11" },
          { text: "Read it, don't reply. Don't let it ruin the evening.", mins: 3, tone: 58, next: "s11" }
        ] },
      s11: { time: "9:30 PM",
        scene: "Kids asleep. 30 of 40 tests graded, one parent email still to answer. Another parent emails: 'My daughter said your class helped her finally understand math. Thank you.' You save that one.",
        stat: { label: "One good email", tone: "good" },
        choices: [
          { text: "Answer the difficult parent tonight, briefly. Finish the tests in the morning.", mins: 25, tone: 80, next: "s12" },
          { text: "Finish the 10 tests. Answer the parent tomorrow when you're less tired.", mins: 60, tone: 76, next: "s12" },
          { text: "Sleep. Answer everything tomorrow.", mins: 0, tone: 58, next: "s12" }
        ] },
      s12: { time: "10:45 PM",
        scene: "Lights off. Tomorrow: a new lesson, a check-in, a reply, unfinished tests. This is Wednesday — 22 more school days this term, each one like this in some shape. Somewhere out there, a kid you taught will remember you as the reason math finally made sense. You don't know who yet. You sleep.",
        stat: { label: "One day of many", tone: "neutral" },
        choices: [] }
    }
  },
  ml: {
    intro: "You're a machine-learning engineer at a food delivery app in San Francisco. Your job today: fix the program that predicts delivery times. It's 4 minutes off, and complaints are climbing.",
    start: "s1",
    scenes: {
      s1: { time: "9:15 AM",
        scene: "Last night's training finished — the new program is 6% worse than the one already live. You have no idea why. The team meeting is in 45 minutes and your manager will ask.",
        stat: { label: "Model got worse", tone: "bad" },
        choices: [
          { text: "Dig into the training records now. 30 min, might spot it before the meeting.", mins: 30, tone: 78, next: "s2_diagnosed" },
          { text: "Say 'still investigating' at the meeting, look properly after.", mins: 2, tone: 54, next: "s2_blind" },
          { text: "Compare the two setups side by side. Fastest way to spot the difference.", mins: 15, tone: 86, next: "s2_diagnosed" }
        ] },
      s2_diagnosed: { time: "10:30 AM",
        scene: "You walked into the meeting with a theory, and you were right. The new weather data you added is missing 40% of its values for the last month. The program treats missing as zero, which breaks predictions in the rain.",
        stat: { label: "Cause found", tone: "good" },
        choices: [
          { text: "Drop the weather data for now and train it again.", mins: 25, tone: 58, next: "s3" },
          { text: "Fill the missing numbers with the monthly average and train it again.", mins: 20, tone: 50, next: "s3" },
          { text: "Fix where the data comes from first, then train it again.", mins: 75, tone: 88, next: "s3" }
        ] },
      s2_blind: { time: "10:30 AM",
        scene: "You dodged the meeting with 'still investigating.' Now your manager messages: 'The product manager is asking — what's the story?' You just found it: the new weather data is missing 40% of its values, and the program treats missing as zero.",
        stat: { label: "Answer under pressure", tone: "bad" },
        choices: [
          { text: "Message your manager the honest cause plus a 4-hour fix timeline.", mins: 10, tone: 88, next: "s3" },
          { text: "'It was a data issue — fixing now.' Vague, buys time.", mins: 3, tone: 50, next: "s3" },
          { text: "Drop the weather data quietly, train it again, don't tell anyone yet.", mins: 20, tone: 20, next: "s3" }
        ] },
      s3: { time: "11:45 AM",
        scene: "The product manager messages: 'CEO wants a demo of \"how AI is improving delivery\" for investors on Friday.' That's 48 hours away. Your model isn't ready and you have no slides.",
        stat: { label: "Demo in 48h", tone: "bad" },
        choices: [
          { text: "'The current model is 4 min off — I can show an honest before/after by Friday.'", mins: 10, tone: 86, next: "s4" },
          { text: "Say yes. Spend tonight making a hand-picked demo look impressive.", mins: 90, tone: 18, next: "s4" },
          { text: "'I can demo the previous model's wins. The new one isn't ready.'", mins: 8, tone: 80, next: "s4" }
        ] },
      s4: { time: "12:30 PM",
        scene: "You check the training machines. Another team is running a huge job — you're stuck in line for 3 hours. You could bump them (they're just experimenting) or wait.",
        stat: { label: "Stuck in line", tone: "neutral" },
        choices: [
          { text: "Ask their lead: 'Can I go first? This one affects real customers.'", mins: 5, tone: 86, next: "s5" },
          { text: "Wait the 3 hours. Use them to write your test properly.", mins: 120, tone: 78, next: "s5" },
          { text: "Kill their job. Yours affects real users, theirs doesn't.", mins: 10, tone: 20, next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "While waiting, you eyeball the training data. Deliveries in one zip code have times that look impossible — 2 minutes for a 4-mile ride. Someone on the delivery side is faking the numbers.",
        stat: { label: "Bad labels", tone: "bad" },
        choices: [
          { text: "Filter that zip code out and retrain. Log what you found.", mins: 25, tone: 62, next: "s6" },
          { text: "Filter it out silently. Not your problem — the delivery team will handle it.", mins: 10, tone: 26, next: "s6" },
          { text: "Message the delivery data lead: 'Seeing something weird — can we talk?'", mins: 20, tone: 86, sets: { flaggedOps: true }, next: "s6" }
        ] },
      s6: { time: "3:15 PM",
        scene: "A junior data scientist messages: 'Quick question — my code's been running for 40 min, is that normal?' It's a five-minute problem for you and she's clearly stuck. Your job is queued.",
        stat: { label: "Small interruption", tone: "neutral" },
        choices: [
          { text: "Screen share for 10 min and walk through what she's actually doing.", mins: 10, tone: 82, next: "s7" },
          { text: "Send her a link to the guide. You'll help properly tomorrow.", mins: 2, tone: 56, next: "s7" },
          { text: "Send a one-line hint: 'You're loading the whole table — just take a piece.'", mins: 4, tone: 84, next: "s7" }
        ] },
      s7: { time: "4:30 PM",
        scene: "Training finishes. The new program is 2.8 min off — a real improvement. But break the numbers down and predictions are 30% worse for deliveries after 10 PM. Late night is a small group of users. Nobody would notice.",
        stat: { label: "Hidden downgrade", tone: "bad" },
        choices: [
          { text: "Launch it. The overall number is what the bosses track.", mins: 5, tone: 22, next: "s8" },
          { text: "Don't launch. Look into the late-night group first, even if it takes 2 more days.", mins: 120, tone: 78, next: "s8" },
          { text: "Launch it behind a switch — old program at night, new one for the rest.", mins: 25, tone: 88, next: "s8" }
        ] },
      s8: { time: "5:45 PM",
        scene: "Late night has fewer riders, so the predictions are just less reliable. Fixing it properly means collecting more data or building a separate model. Neither happens today.",
        stat: { label: "No clean fix today", tone: "neutral" },
        choices: [
          { text: "Write it down clearly in the launch notes. Launch with the switch.", mins: 20, tone: 88 },
          { text: "Add a 'we're aware' note in tiny text. Launch without the switch.", mins: 5, tone: 24 },
          { text: "Delay the launch until next week and solve it properly.", mins: 30, tone: 62 }
        ],
        next: (flags) => flags.flaggedOps ? "s9_alliance" : "s9" },
      s9: { time: "7:00 PM",
        scene: "You start the launch notes — what changed, how you measured it, what the risks are. Your manager messages: 'Skip the notes, just launch it, we'll write it up later.' 'Later' rarely happens.",
        stat: { label: "Corners to cut", tone: "neutral" },
        choices: [
          { text: "Push back: 'I'll write a short version tonight — 30 min, and it saves us later.'", mins: 30, tone: 84, next: "s10" },
          { text: "Skip the notes, launch tonight. She's the manager.", mins: 5, tone: 28, next: "s10" },
          { text: "Launch the program, write the notes first thing tomorrow.", mins: 10, tone: 74, next: "s10" }
        ] },
      s9_alliance: { time: "7:00 PM",
        scene: "The delivery data lead replies: 'You were right — we found three zip codes gaming delivery times. Owe you one.' You start the launch notes. Your manager messages: 'Skip the notes, just launch it, we'll write it up later.'",
        stat: { label: "Corners to cut · with backup", tone: "neutral" },
        choices: [
          { text: "Push back: 'Short version tonight — 30 min. Also looping in delivery on the data issue.'", mins: 35, tone: 86, next: "s10" },
          { text: "Skip the notes, launch tonight. She's the manager.", mins: 5, tone: 28, next: "s10" },
          { text: "Launch the program, write the notes tomorrow — signed with delivery too.", mins: 15, tone: 76, next: "s10" }
        ] },
      s10: { time: "8:30 PM",
        scene: "The program is going live. You watch the dashboards — speed is fine, error rate is fine. Ten minutes in, one number ticks up: prediction failures, 0.1% to 0.4%. Small. Not zero.",
        stat: { label: "Something's off", tone: "bad" },
        choices: [
          { text: "Undo it immediately. Investigate tomorrow.", mins: 10, tone: 62, next: "s11" },
          { text: "Watch 20 more min. If it climbs, undo it. If it holds, dig in.", mins: 20, tone: 80, next: "s11" },
          { text: "Message the emergency engineer, keep the program up, split the decision.", mins: 8, tone: 82, next: "s11" }
        ] },
      s11: { time: "10:00 PM",
        scene: "It's one rare case — pickup orders with no restaurant location — that the new program doesn't handle. 0.4% of traffic, silently failing. A 2-line fix. Your food is getting cold on the desk.",
        stat: { label: "Two-line fix", tone: "neutral" },
        choices: [
          { text: "Fix it, ship, eat, sleep.", mins: 45, tone: 82, next: "s12" },
          { text: "Undo it for tonight. Fix it fresh tomorrow morning.", mins: 10, tone: 76, next: "s12" },
          { text: "Send those orders to the old program. Ship the fix tomorrow.", mins: 25, tone: 84, next: "s12" }
        ] },
      s12: { time: "8:45 AM (Fri)",
        scene: "You get in. Overnight, the program shaved 1.2 min off delivery time predictions for millions of orders. Nobody outside your team will ever notice. The CEO's demo goes fine. Somewhere across the city, a hungry person got a slightly more accurate delivery estimate. That was your day.",
        stat: { label: "Quiet win", tone: "good" },
        choices: [] }
    }
  },
  law: {
    intro: "You're a second-year associate at a big NYC law firm, on the team that handles company takeovers. Your client is buying a $300M trucking company. Signing is Friday. Today: hunt for hidden problems in that company, and draft the contract.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "The partner forwarded a 340-page draft from the other side's lawyers at 2 AM: 'Mark your changes. Point out anything scary. By 6 PM.' You have ten hours to read, mark up, and think.",
        stat: { label: "340 pages", tone: "bad" },
        choices: [
          { text: "Read cover to cover, marking as you go. Slowest, safest.", mins: 150, tone: 58, next: "s2_solo" },
          { text: "Skim first, then read the risky parts closely — promises, payout limits, conditions.", mins: 60, tone: 86, next: "s2_solo" },
          { text: "Split it with the other junior lawyer. You take promises, she takes conditions.", mins: 50, tone: 78, sets: { split: true }, next: "s2_shared" }
        ] },
      s2_solo: { time: "10:15 AM",
        scene: "You hit the cancel clause — the part that lets your client back out if the deal goes bad. It doesn't cover anything the government does — and the government is investigating this company right now. So if that kills the deal, your client still has to buy.",
        stat: { label: "Real risk", tone: "bad" },
        choices: [
          { text: "Point it out clearly in your edits. Say we want that gap closed.", mins: 20, tone: 84, next: "s3" },
          { text: "Note it but don't push. Your boss will decide.", mins: 8, tone: 56, next: "s3" },
          { text: "Push hard in your edits, plus a one-page note on why.", mins: 45, tone: 86, next: "s3" }
        ] },
      s2_shared: { time: "10:15 AM",
        scene: "The other junior lawyer messages: 'Seller's promises look clean. But the cancel clause doesn't cover government action — and this company is being investigated. Thoughts?' You both know the file. Fast.",
        stat: { label: "You saw it together", tone: "good" },
        choices: [
          { text: "'Flag it. Say we want that gap closed. I'll write the wording.'", mins: 25, tone: 86, next: "s3" },
          { text: "'Note it, let the boss decide. She may want to give this one up.'", mins: 8, tone: 56, next: "s3" },
          { text: "'Push hard on it — I'll write the one-page note now.'", mins: 40, tone: 84, next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "A first-year asks what the 'seller's promises' section really does — the part where the seller swears the company is what they claim. Explaining properly takes 15 minutes. Nobody explained it to you either; you learned by getting yelled at.",
        stat: { label: "Teach or push through", tone: "neutral" },
        choices: [
          { text: "Sit with her 15 min. Give her the explanation you wish you got.", mins: 15, tone: 82, next: "s4" },
          { text: "Send her a short note from an old deal. Self-serve.", mins: 5, tone: 74, next: "s4" },
          { text: "'I'll explain over lunch, remind me.'", mins: 3, tone: 58, next: "s4" }
        ] },
      s4: { time: "12:45 PM",
        scene: "The client's own top lawyer calls: 'Is this deal safe to sign Friday? The board wants a yes or no.' You've been on the deal a month. There is no clean yes. Nothing is ever fully safe.",
        stat: { label: "Client wants certainty", tone: "bad" },
        choices: [
          { text: "'It's safe to sign, with three points I'll email you in an hour.' Then send them.", mins: 60, tone: 86, next: "s5" },
          { text: "'Yes — the risks are standard for a deal this size.'", mins: 5, tone: 20, next: "s5" },
          { text: "'I need to check with my partner before I give you an answer.'", mins: 10, tone: 58, next: "s5" }
        ] },
      s5: { time: "1:45 PM",
        scene: "Old files turn up a quiet side deal nobody mentioned — the company promised one seller exclusive rights for 20 years. If it holds, it kills half the savings your client is paying for. Your client has never seen it.",
        stat: { label: "Maybe a deal-breaker", tone: "bad" },
        choices: [
          { text: "Tell your boss immediately. Don't touch the client yet.", mins: 10, tone: 88, sets: { escalated: true }, next: "s6" },
          { text: "Ask their lawyers about it first. It may have been cancelled.", mins: 25, tone: 70, next: "s6" },
          { text: "Edit the main contract to exclude it. Don't raise it now.", mins: 35, tone: 12, sets: { buried: true }, next: "s6" }
        ] },
      s6: { time: "3:00 PM",
        scene: "Your boss reviews your work: 'Fine. Now sit in on a 30-min call about something else — I need someone taking notes.' Different client, different deal, no context. Your edits are 40% done.",
        stat: { label: "Not your deal", tone: "neutral" },
        choices: [
          { text: "Attend, take notes, half-work your edits in the background.", mins: 60, tone: 54, next: "s7" },
          { text: "Attend, full attention. The edits can slip an hour.", mins: 60, tone: 78, next: "s7" },
          { text: "'I'd love to, but my edits are due at 6 — can a first-year take it?'", mins: 5, tone: 82, next: "s7" }
        ] },
      s7: { time: "4:30 PM",
        scene: "The other side emails: 'Your limit on payouts is unreasonable. Raise it to 30% by tomorrow morning or we walk.' They won't walk. Everyone knows they won't walk. But the email is on record.",
        stat: { label: "Just pressure", tone: "neutral" },
        choices: [
          { text: "Reply calmly, restate your position, don't move.", mins: 15, tone: 84 },
          { text: "Call your boss. This is above your level to answer.", mins: 10, tone: 76 },
          { text: "Reply giving a little (20%) to look reasonable.", mins: 12, tone: 30 }
        ],
        next: (flags) => flags.buried ? "s8_exposed" : "s8" },
      s8: { time: "5:45 PM",
        scene: "The client's own lawyer calls back: 'The board is nervous — send me a one-page risk note tonight. Plain English, no lawyer words.' Your drafts are long and full of lawyer words. Not one page. Not plain English.",
        stat: { label: "Translate for humans", tone: "neutral" },
        choices: [
          { text: "Write from scratch — three risks, one paragraph each, no lawyer words.", mins: 60, tone: 86, next: "s9" },
          { text: "Trim your existing note. Faster, but still lawyer-y.", mins: 25, tone: 48, next: "s9" },
          { text: "Send a bullet list — top 5 risks, one line each.", mins: 15, tone: 82, next: "s9" }
        ] },
      s8_exposed: { time: "5:45 PM",
        scene: "The other side found the side deal you tried to bury and just quoted it back at you. Your boss walks in, quiet: 'Was there a side deal I don't know about?' The board also wants a one-page risk note tonight.",
        stat: { label: "You should've told her", tone: "bad" },
        choices: [
          { text: "'Yes — I found it this morning and should have brought it to you. Here's what I know.'", mins: 12, tone: 88, next: "s9" },
          { text: "'They're overstating it. My edits handle it.'", mins: 6, tone: 16, next: "s9" },
          { text: "'I flagged it in my edits. But I should have told you. Sorry.'", mins: 10, tone: 82, next: "s9" }
        ] },
      s9: { time: "7:15 PM",
        scene: "You catch a typo in a definition that changes the meaning — 'net of taxes' vs 'net of tax.' Small in words, huge in dollars. It's on your side's draft. Fixing it late looks sloppy. Not fixing it might cost the client $4M.",
        stat: { label: "Your team's mistake", tone: "bad" },
        choices: [
          { text: "Tell your boss immediately, own it, fix it in the next round.", mins: 15, tone: 88, next: "s10" },
          { text: "Quietly fix it in the next round. Hope the other side doesn't notice.", mins: 20, tone: 22, next: "s10" },
          { text: "Leave it. It's ambiguous either way — don't draw attention.", mins: 2, tone: 15, next: "s10" }
        ] },
      s10: { time: "9:30 PM",
        scene: "Your boss drops a stack of printouts on your desk: 'Redo the section on what has to be true before we sign — I don't like it. By 9 AM.' No other guidance. It's a four-hour job.",
        stat: { label: "Vague rework", tone: "bad" },
        choices: [
          { text: "Start now, work till it's done, sleep at 2 AM.", mins: 180, tone: 54, next: "s11" },
          { text: "Ask her one question first: 'What specifically bothered you?'", mins: 120, tone: 86, next: "s11" },
          { text: "Do a rough version tonight, polish at 7 AM tomorrow.", mins: 100, tone: 74, next: "s11" }
        ] },
      s11: { time: "11:45 PM",
        scene: "Still at your desk. You realize you haven't spoken to your family in three days. Your mother messages: 'Hey — everything okay?' You have 45 minutes of work left. She'll be asleep by then.",
        stat: { label: "Small human moment", tone: "neutral" },
        choices: [
          { text: "Call her for 5 min now. The work will wait 5 min.", mins: 6, tone: 84, next: "s12" },
          { text: "Reply: 'All good, will call tomorrow.' Get back to it.", mins: 2, tone: 60, next: "s12" },
          { text: "Ignore it. Deal with it tomorrow when you're less tired.", mins: 0, tone: 30, next: "s12" }
        ] },
      s12: { time: "9:15 AM (Fri)",
        scene: "Signing day. You're in the room but you don't speak — partners speak. Documents get signed. Someone shakes hands. Your edits are somewhere in the 340 pages that just became legally binding on a $300M deal. In a year, if a fight breaks out over that clause you flagged, someone will pull the file and see your name on it. Or they won't, and you'll never know it mattered.",
        stat: { label: "Deal closed", tone: "good" },
        choices: [] }
    }
  },
  chef: {
    intro: "You're the head chef of a fine dining restaurant in NYC. One star. 68 diners booked tonight, including a food critic your publicist won't name. Service starts at 7. Right now it's 9 AM and nothing is prepped.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "The fish delivery is on the counter — sea bass for tonight's main course. You smell it. It's not fresh. This is your supplier of five years, and 68 diners are depending on it.",
        stat: { label: "Bad fish", tone: "bad" },
        choices: [
          { text: "Call the supplier, refuse the delivery, demand fresh by 2 PM.", mins: 20, tone: 86, next: "s2_wait" },
          { text: "Accept it. Cook it hotter to hide it. Nobody will know.", mins: 5, tone: 10, next: "s2_hidden" },
          { text: "Refuse it. Redesign the main course around what's in the big fridge.", mins: 45, tone: 84, next: "s2_pivot" }
        ] },
      s2_wait: { time: "10:15 AM",
        scene: "The supplier promised fresh fish by 2 PM, taken off the bill. Now your sous chef — your number two — doesn't show up and won't answer his phone. Six hours of prep, nobody to do it.",
        stat: { label: "Sous chef missing", tone: "bad" },
        choices: [
          { text: "Split his work across your junior cooks. Cover his stations yourself if needed.", mins: 30, tone: 78, next: "s3" },
          { text: "Call your former sous chef who owes you a favor. Beg her to come in for one night.", mins: 15, tone: 84, next: "s3" },
          { text: "Simplify the menu. Kill two dishes. Nobody notices what isn't there.", mins: 20, tone: 66, next: "s3" }
        ] },
      s2_hidden: { time: "10:15 AM",
        scene: "The fish is in the big fridge. Now your sous chef doesn't show up and won't answer his phone. Six hours of prep, nobody to do it — and 68 diners riding on fish you know isn't right.",
        stat: { label: "Two problems, one lie", tone: "bad" },
        choices: [
          { text: "Come to your senses. Refuse the fish, redesign around the fridge, split the prep.", mins: 60, tone: 84, next: "s3" },
          { text: "Push through. Cover his stations yourself and hope the fish holds.", mins: 35, tone: 12, next: "s3" },
          { text: "Kill the fish dish and two others. A tight, honest menu tonight.", mins: 30, tone: 68, next: "s3" }
        ] },
      s2_pivot: { time: "10:15 AM",
        scene: "You've redesigned around the big fridge — a lamb main instead. Then your sous chef doesn't show up and won't answer his phone. He was doing the starter bites, pasta, and two sauces.",
        stat: { label: "Sous chef missing", tone: "bad" },
        choices: [
          { text: "Split his work across your junior cooks. Cover his stations yourself if needed.", mins: 30, tone: 78, next: "s3" },
          { text: "Call your former sous chef who owes you a favor. Beg her to come in for one night.", mins: 15, tone: 84, next: "s3" },
          { text: "Simplify further. Two mains only tonight. The cleanest menu wins.", mins: 25, tone: 66, next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "The owner drops by: 'A regular is bringing his wife tonight — she can't eat gluten, it makes her seriously ill. There's a big-Instagram couple on table 4 we must impress. And six tables want the full tasting menu.' None of this was on the sheet.",
        stat: { label: "Owner surprises", tone: "bad" },
        choices: [
          { text: "Design a gluten-free version of every course tonight, for one table.", mins: 90, tone: 60, next: "s4" },
          { text: "Simplify: pick 3 courses she can eat, serve them separately.", mins: 40, tone: 84, next: "s4" },
          { text: "Refuse the extra tasting menus, do the gluten-free table, ignore table 4.", mins: 35, tone: 34, next: "s4" }
        ] },
      s4: { time: "12:45 PM",
        scene: "You catch your youngest cook slicing garlic while checking his phone. He cuts his thumb — deep. He's bleeding on the board. Two hours from service, and he's your only garlic prep.",
        stat: { label: "Blood on the board", tone: "bad" },
        choices: [
          { text: "Send him to the pharmacy. Bandage it properly. Back in 45 min if he can hold a knife.", mins: 50, tone: 84, sets: { caredForCook: true }, next: "s5" },
          { text: "Bandage him yourself. Back to the station in 15 min.", mins: 15, tone: 52, next: "s5" },
          { text: "Send him home. Take his prep yourself, add 2 hours to your day.", mins: 120, tone: 66, next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "Yesterday's Yelp review lands: 3 stars, 'overrated, cold pasta, rude waiter.' It's from table 12. You remember table 12 — the pasta was sent back once and remade. Your team did nothing wrong.",
        stat: { label: "Unfair review", tone: "bad" },
        choices: [
          { text: "Reply politely, apologise, invite him back for dinner on the house.", mins: 12, tone: 84, next: "s6" },
          { text: "Reply publicly, defend the team, correct the record.", mins: 20, tone: 26, next: "s6" },
          { text: "Ignore it. Focus on tonight.", mins: 0, tone: 58, next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "Fresh fish arrives — but only 12 kg. You need 15. That's enough for 60 of 68 diners if you serve smaller portions. The alternative is switching 8 diners to a different main mid-service.",
        stat: { label: "12 kg for 68", tone: "bad" },
        choices: [
          { text: "Serve slightly smaller portions across the board. Nobody notices 15%.", mins: 10, tone: 66, next: "s7" },
          { text: "Offer the last 8 diners a free upgrade to the tasting menu instead.", mins: 20, tone: 84, next: "s7" },
          { text: "Save the fish for tasting-menu tables and VIPs. Put the rest on chicken.", mins: 25, tone: 60, next: "s7" }
        ] },
      s7: { time: "5:00 PM",
        scene: "Staff dinner before service. Morale is low — everyone knows about the sous chef. You sit down with the team for 15 minutes. This is the last calm moment of the day.",
        stat: { label: "Team is watching", tone: "neutral" },
        choices: [
          { text: "Address it head-on: 'One down. We cover for each other. We serve 68 tonight.'", mins: 10, tone: 84 },
          { text: "Say nothing. Eat. Move on. They know the drill.", mins: 3, tone: 50 },
          { text: "Ask each cook: 'Anything you need from me tonight?' Then answer.", mins: 15, tone: 86 }
        ],
        next: (flags) => flags.caredForCook ? "s8_backed" : "s8" },
      s8: { time: "7:45 PM",
        scene: "45 minutes into service. Orders are stacking up. You spot a plate about to leave — the sauce has split and looks wrong. The waiter is already reaching for it.",
        stat: { label: "Split sauce", tone: "bad" },
        choices: [
          { text: "'Stop.' Take the plate back, remake it in 4 minutes. The table waits.", mins: 5, tone: 86, next: "s9" },
          { text: "Wipe the split and send it. The table won't notice.", mins: 1, tone: 20, next: "s9" },
          { text: "Send it, tell the waiter to plate it in front of the guest so it looks fresh.", mins: 3, tone: 16, next: "s9" }
        ] },
      s8_backed: { time: "7:45 PM",
        scene: "45 minutes into service. Your youngest cook — bandaged thumb and all — is holding the garlic and sauce station like he's got something to prove. He catches a split sauce before it leaves the kitchen: 'Chef, this one's off.' You didn't have to see it.",
        stat: { label: "Team caught it", tone: "good" },
        choices: [
          { text: "'Good eye. Remake it. Four minutes.'", mins: 5, tone: 86, next: "s9" },
          { text: "Take it over yourself and remake it faster.", mins: 4, tone: 60, next: "s9" },
          { text: "'Send it — the table won't notice.'", mins: 1, tone: 20, next: "s9" }
        ] },
      s9: { time: "9:00 PM",
        scene: "Table 4 sends the fish back: 'too salty.' You taste the sauce. It's fine — aged fish just tastes sharper, that's not salt. But they're the customer.",
        stat: { label: "Not actually wrong", tone: "neutral" },
        choices: [
          { text: "Send out a new course, apologise, take the dish off the bill.", mins: 10, tone: 78, next: "s10" },
          { text: "Come out yourself, explain the flavour, offer to remake it.", mins: 8, tone: 84, next: "s10" },
          { text: "Remake it milder. Don't argue. Keep the orders moving.", mins: 6, tone: 68, next: "s10" }
        ] },
      s10: { time: "10:30 PM",
        scene: "Two hours in, 22 diners still to go. Table 9 — you think that's the critic — ordered the tasting menu. Every course out of that kitchen for the next 90 minutes goes to that table. You could plate them yourself.",
        stat: { label: "Critic's tasting", tone: "neutral" },
        choices: [
          { text: "Serve every course yourself. Slower service for other tables.", mins: 60, tone: 54, next: "s11" },
          { text: "Trust your cooks. Check each plate before it leaves the kitchen.", mins: 25, tone: 86, next: "s11" },
          { text: "Serve the two showpiece courses yourself, let the cooks handle the rest.", mins: 35, tone: 82, next: "s11" }
        ] },
      s11: { time: "12:15 AM",
        scene: "Last table left 20 minutes ago. Kitchen closed. You talk the team through it — 4 minutes, standing up. One cook is nearly crying (overcooked a duck). One is grinning (nailed his first solo sauce).",
        stat: { label: "Team talk", tone: "neutral" },
        choices: [
          { text: "Praise the win publicly. Take the cook who made the mistake aside privately.", mins: 12, tone: 86, next: "s12" },
          { text: "Address everything to the whole team. Honest, no favourites.", mins: 15, tone: 56, next: "s12" },
          { text: "Just say 'good service, get home safe.' Full talk tomorrow.", mins: 3, tone: 64, next: "s12" }
        ] },
      s12: { time: "1:40 AM",
        scene: "You lock up. In the cab home you check Instagram — table 4 posted the fish course. 'Best in the city.' No mention of sending it back. You laugh once, quietly. Tomorrow: prep at 9, brunch at noon, dinner at 7. Six more days like this before your one day off. You wouldn't trade it for anything, most days.",
        stat: { label: "Service done", tone: "good" },
        choices: [] }
    }
  },
  architect: {
    intro: "You're a young architect at a small studio in Portland. Today's job: design a library for a rural elementary school. Kids will use it for the next 30 years. The land is small. The budget is small. What you draw will really get built.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "You open the file. One line from the client: 'Please design a library for our kids.' You have the land size and one photo. That's it.",
        stat: { label: "Cold start", tone: "neutral" },
        choices: [
          { text: "Drive out to the school first. Half a day gone, but you'll see the site.", mins: 240, tone: 82, sets: { visited: true }, next: "s2_site" },
          { text: "Start sketching at your desk. You've done libraries before.", mins: 20, tone: 48, next: "s2_desk" },
          { text: "Call the principal for 30 min. Ask what the kids actually need.", mins: 30, tone: 86, sets: { asked: true }, next: "s2_desk" }
        ] },
      s2_site: { time: "11:30 AM",
        scene: "You're at the school. Kids show you where they read now — under a big oak tree. Cool in the shade, hot in the sun, dust everywhere. There's no other quiet corner in the school.",
        stat: { label: "You've seen it", tone: "good" },
        choices: [
          { text: "Design a low building next to the tree. Use it for shade.", mins: 60, tone: 80, next: "s3" },
          { text: "Design a tall two-floor building on the far side. More space.", mins: 75, tone: 50, next: "s3" },
          { text: "Design an open room with one open side — like sitting under the tree.", mins: 55, tone: 86, next: "s3" }
        ] },
      s2_desk: { time: "10:00 AM",
        scene: "You sketch. A neat square building, big windows, tiled roof. It looks good on paper. But you don't know whether kids will want to sit inside it.",
        stat: { label: "Nice on paper", tone: "neutral" },
        choices: [
          { text: "Send the sketch. The deadline is tight.", mins: 10, tone: 30, next: "s3" },
          { text: "Stop. Drive out to the site tomorrow morning.", mins: 20, tone: 82, sets: { visited: true }, next: "s3" },
          { text: "Email the sketch to the school first. Wait for a reaction.", mins: 15, tone: 60, next: "s3" }
        ] },
      s3: { time: "1:00 PM",
        scene: "The land has two old trees on it. Cutting them means a bigger, easier building. Keeping them means designing around their shape.",
        stat: { label: "Trees or space", tone: "neutral" },
        choices: [
          { text: "Cut both. Cleaner design. More room inside.", mins: 30, tone: 28, next: "s4" },
          { text: "Keep both. Build around them — free natural shade.", mins: 45, tone: 86, next: "s4" },
          { text: "Keep the big one, cut the small one.", mins: 35, tone: 58, next: "s4" }
        ] },
      s4: { time: "2:30 PM",
        scene: "Your senior peeks at the drawing: 'Nice, but is this what a 7-year-old wants, or what an award jury wants?' It's a fair question.",
        stat: { label: "Who is this for?", tone: "neutral" },
        choices: [
          { text: "Redraw with small doors, low shelves, a soft floor. Built for kids.", mins: 60, tone: 86, next: "s5" },
          { text: "Keep it. It's already good architecture.", mins: 5, tone: 46, next: "s5" },
          { text: "Add a small kid-height reading nook. Keep the rest.", mins: 25, tone: 74, next: "s5" }
        ] },
      s5: { time: "3:30 PM",
        scene: "Time to pick a roof. Three options fit the budget.",
        stat: { label: "Roof choice", tone: "neutral" },
        choices: [
          { text: "Concrete slab. Lasts 40 years. Gets hot inside in summer.", mins: 25, tone: 48, next: "s6" },
          { text: "Sloped tin roof with a wood ceiling. Cooler. Needs repair every 5 years.", mins: 30, tone: 82, next: "s6" },
          { text: "Sloped clay tile. Cool and beautiful. Costs 15% more.", mins: 35, tone: 66, next: "s6" }
        ] },
      s6: { time: "4:30 PM",
        scene: "The client messages: 'Can we also add a small computer room?' No extra budget. No extra space in your plan.",
        stat: { label: "New ask", tone: "bad" },
        choices: [
          { text: "Squeeze it in. Three computers in one corner.", mins: 30, tone: 50, next: "s7" },
          { text: "Reply: 'Let's build the library first. Add computers later.'", mins: 10, tone: 82, next: "s7" },
          { text: "Reply: 'Yes, but we'd have to drop the reading porch. Your call.'", mins: 20, tone: 80, next: "s7" }
        ] },
      s7: { time: "5:45 PM",
        scene: "The engineer checks your drawing: 'The walls are too thin for the roof you picked.' Thicker walls means 8% less room inside.",
        stat: { label: "Engineer says no", tone: "bad" },
        choices: [
          { text: "Trust her. Thicker walls, smaller room.", mins: 40, tone: 84 },
          { text: "Switch to a lighter roof so the walls can stay thin.", mins: 60, tone: 82 },
          { text: "Argue. You've seen thinner walls hold this roof before.", mins: 25, tone: 18 }
        ],
        next: (flags) => flags.visited ? "s8_saw" : (flags.asked ? "s8_heard" : "s8_blind") },
      s8_saw: { time: "6:45 PM",
        scene: "You remember one thing from the site visit — a small kid asked you, 'Sir, will there be a window we can see the tree from?' Easy to forget on paper.",
        stat: { label: "The kid's question", tone: "good" },
        choices: [
          { text: "Add a big low window facing the tree. Kid-height.", mins: 30, tone: 86, next: "s9" },
          { text: "Note it in the file for later. Focus on the main drawing.", mins: 10, tone: 52, next: "s9" },
          { text: "Design the whole reading corner around that one window.", mins: 60, tone: 88, next: "s9" }
        ] },
      s8_heard: { time: "6:45 PM",
        scene: "You remember something from the principal's call — the power gets flaky every afternoon in summer storms. Your design has one small window. It'll be dark inside by 3 PM.",
        stat: { label: "Unreliable power", tone: "bad" },
        choices: [
          { text: "Add three more big windows. Redo the light plan.", mins: 75, tone: 84, next: "s9" },
          { text: "Add a skylight over the reading area.", mins: 30, tone: 82, next: "s9" },
          { text: "Leave it. Kids can go outside if it gets dark.", mins: 5, tone: 24, next: "s9" }
        ] },
      s8_blind: { time: "6:45 PM",
        scene: "You realise you never checked which way the sun hits the land. The reading wall might take harsh afternoon sun straight on.",
        stat: { label: "You skipped the site", tone: "bad" },
        choices: [
          { text: "Stop. Check the map, rotate the design.", mins: 45, tone: 86, next: "s9" },
          { text: "Send it as-is. The deadline is close.", mins: 5, tone: 26, next: "s9" },
          { text: "Add a shade wall on the west side.", mins: 25, tone: 66, next: "s9" }
        ] },
      s9: { time: "8:00 PM",
        scene: "Ready to send. One design or three?",
        stat: { label: "How much choice", tone: "neutral" },
        choices: [
          { text: "One clear design. Confident.", mins: 45, tone: 78, next: "s10" },
          { text: "Three options. Let the client pick.", mins: 90, tone: 56, next: "s10" },
          { text: "Two — the one you love and a cheaper backup.", mins: 65, tone: 82, next: "s10" }
        ] },
      s10: { time: "9:00 PM",
        scene: "Video call with the client. He loves the design. Then: 'Can you put my name on the front wall? Big letters.'",
        stat: { label: "The client is happy", tone: "neutral" },
        choices: [
          { text: "Say yes. He's paying.", mins: 5, tone: 30, next: "s11" },
          { text: "Say no, kindly: 'This is the kids' library — no names on it.'", mins: 8, tone: 82, next: "s11" },
          { text: "Offer a small plaque near the door instead.", mins: 15, tone: 80, next: "s11" }
        ] },
      s11: { time: "10:15 PM",
        scene: "You send the final drawings. Building starts in a month. You won't be there every day. Small mistakes will happen — a wall slightly off, the wrong tile colour. You'll see this building every time you drive past for the rest of your life.",
        stat: { label: "Handoff", tone: "neutral" },
        choices: [
          { text: "Plan two site visits during construction. Your time, unpaid.", mins: 20, tone: 82, next: "s12" },
          { text: "Trust the builder. Move to the next project.", mins: 3, tone: 52, next: "s12" },
          { text: "Ask a junior to visit weekly and send photos.", mins: 10, tone: 80, next: "s12" }
        ] },
      s12: { time: "2 years later",
        scene: "You drive past. The library is there. Kids inside, reading. One window is smaller than you drew — the builder changed it. Someone painted a mural you never designed. It's not exactly your building. But it's a real place, and 40 kids read in it every day. This is the job.",
        stat: { label: "Built", tone: "good" },
        choices: [] }
    }
  },
  econ: {
    intro: "You're a young economist at the Federal Reserve in Washington, D.C. Today: egg prices jumped 60% in one month. Your boss wants a short note by 6 PM — why it happened, and what to do. Millions of families are feeling this at the grocery store.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "Two data files land in your inbox. One from farmers, one from market traders. Your boss: 'Note by 6 PM.' You have 9 hours.",
        stat: { label: "Where to start", tone: "neutral" },
        choices: [
          { text: "Read every file top to bottom before touching a spreadsheet.", mins: 120, tone: 52, next: "s2" },
          { text: "Open the data and start making charts right away.", mins: 20, tone: 78, next: "s2" },
          { text: "Call one farmer and one trader first. Real voices before numbers.", mins: 45, tone: 84, sets: { talked: true }, next: "s2" }
        ] },
      s2: { time: "10:30 AM",
        scene: "You spot the pattern. Prices rose in September, mostly in the Midwest. Two stories fit — a bird flu outbreak, or middlemen holding back supply. The numbers alone can't tell you which.",
        stat: { label: "Two stories", tone: "neutral" },
        choices: [
          { text: "Pick 'bird flu.' It's the safe answer and mostly right in past years.", mins: 5, tone: 30, next: "s3" },
          { text: "Write both stories. Say plainly: 'We need more to be sure.'", mins: 40, tone: 84, next: "s3" },
          { text: "Spend 30 min pulling real bird flu outbreak numbers from the government.", mins: 30, tone: 86, sets: { checked: true }, next: "s3" }
        ] },
      s3: { time: "12:00 PM",
        scene: "Your boss walks past: 'By the way — the Treasury Secretary might mention eggs in a press conference tomorrow. Your note may go up the chain.' Pressure doesn't change the truth. It does change how carefully you write.",
        stat: { label: "It might go to the top", tone: "neutral" },
        choices: [
          { text: "Same note. Truth is truth.", mins: 5, tone: 84, next: "s4" },
          { text: "Soften it. Don't upset anyone.", mins: 15, tone: 20, next: "s4" },
          { text: "Same note, plus a 3-line summary at the top for a busy reader.", mins: 20, tone: 88, next: "s4" }
        ] },
      s4: { time: "1:30 PM",
        scene: "Lunch. A senior tells you: 'Last year the government asked us to call rising prices \"temporary.\" It wasn't. We looked bad.' You'll get the same pressure to sound calm this time.",
        stat: { label: "Sound calm or be right", tone: "bad" },
        choices: [
          { text: "Write 'temporary' if that's what they want.", mins: 10, tone: 18, next: "s5" },
          { text: "Write what the data says: 'likely high for 3 months.'", mins: 20, tone: 84, next: "s5" },
          { text: "Show two paths — 'if X, temporary; if Y, longer.' Let the reader judge.", mins: 35, tone: 82, next: "s5" }
        ] },
      s5: { time: "3:00 PM",
        scene: "You need one number: how much will eggs push overall prices up next month? Your model gives a range — 0.3% to 0.8%. Small numbers, big country.",
        stat: { label: "Pick a number", tone: "neutral" },
        choices: [
          { text: "Pick 0.5%, the middle. Simple.", mins: 5, tone: 74, next: "s6" },
          { text: "Show the full range. Honest about what you don't know.", mins: 30, tone: 84, next: "s6" },
          { text: "Pick 0.3%. Sounds better in headlines.", mins: 5, tone: 16, next: "s6" }
        ] },
      s6: { time: "4:00 PM",
        scene: "You spot something odd. The farm file shows egg stocks in storage are normal. So supply isn't actually down — prices rose because the middlemen got nervous. That's a completely different story.",
        stat: { label: "The story just changed", tone: "bad" },
        choices: [
          { text: "Rewrite the whole note with the new story. 2 hours of work.", mins: 120, tone: 84, next: "s7" },
          { text: "Add a short paragraph about the middlemen. Keep the main story.", mins: 25, tone: 58, next: "s7" },
          { text: "Ignore it. One file could be wrong. Stay with bird flu.", mins: 3, tone: 24, next: "s7" }
        ] },
      s7: { time: "5:00 PM",
        scene: "Your boss reads a draft: 'The recommendation is missing. What should we actually do?' You have to suggest an action.",
        stat: { label: "Recommend something", tone: "neutral" },
        choices: [
          { text: "'Let it settle. Prices usually come back within 2 months.'", mins: 10, tone: 54 },
          { text: "'The government should release eggs from its own storage this week.'", mins: 20, tone: 84 },
          { text: "'We need one more week to decide.'", mins: 8, tone: 28 }
        ],
        next: (flags) => flags.talked ? "s8_voices" : "s8_solo" },
      s8_voices: { time: "5:45 PM",
        scene: "You have real quotes from your morning calls. One farmer told you: 'We get 50 cents. Stores sell at $4. The middlemen are eating the gap.' That one line makes the note come alive.",
        stat: { label: "Real voice", tone: "good" },
        choices: [
          { text: "Add the quote to the note. A human voice in an official note.", mins: 10, tone: 80, next: "s9" },
          { text: "Keep it formal. Quotes look unprofessional.", mins: 3, tone: 54, next: "s9" },
          { text: "Put the quote in the top summary. It hits harder there.", mins: 12, tone: 84, next: "s9" }
        ] },
      s8_solo: { time: "5:45 PM",
        scene: "You realise you never spoke to a single farmer or trader today. Your note is entirely from spreadsheets. It reads a bit dry.",
        stat: { label: "All spreadsheet, no people", tone: "neutral" },
        choices: [
          { text: "Call one farmer now, quickly. Add one line.", mins: 25, tone: 82, next: "s9" },
          { text: "Send it as-is. You're an economist, not a journalist.", mins: 3, tone: 54, next: "s9" },
          { text: "Ask a colleague to read the tone before you send.", mins: 20, tone: 74, next: "s9" }
        ] },
      s9: { time: "6:30 PM",
        scene: "You send it. Twenty minutes later, a senior messages: 'One page. Plain English. For the Secretary.' It's 6:50 PM and your draft is full of complicated words.",
        stat: { label: "Surprise ask", tone: "bad" },
        choices: [
          { text: "Rewrite it carefully yourself. 90 minutes.", mins: 90, tone: 82, next: "s10" },
          { text: "Ask a writer at work to put it in plain words. You handle the substance.", mins: 40, tone: 84, next: "s10" },
          { text: "Send a rough plain-English version. Fix it tomorrow.", mins: 20, tone: 30, next: "s10" }
        ] },
      s10: { time: "9:15 PM",
        scene: "On the subway home you see a woman arguing with a grocery cashier: '$8 for a dozen eggs? Are you serious?' The cashier shrugs. This is exactly why your note matters.",
        stat: { label: "Real life", tone: "neutral" },
        choices: [
          { text: "Note it down for tomorrow. Real detail helps future writing.", mins: 8, tone: 80, next: "s11" },
          { text: "Just look out the window. You're off the clock.", mins: 0, tone: 58, next: "s11" },
          { text: "Message your boss: 'Just saw a real fight over egg prices. This is the story.'", mins: 5, tone: 62, next: "s11" }
        ] },
      s11: { time: "8:00 AM (Wed)",
        scene: "Your boss messages: 'The Treasury Secretary used one line from your note in her press conference this morning.' You watch the clip. Your sentence, in her mouth, on national TV. Nobody knows it was you.",
        stat: { label: "Anonymous impact", tone: "good" },
        choices: [
          { text: "Screenshot it. Keep it for yourself.", mins: 3, tone: 78, next: "s12" },
          { text: "Post it on LinkedIn. Take the credit.", mins: 15, tone: 30, next: "s12" },
          { text: "Do nothing. The work is the reward.", mins: 0, tone: 68, next: "s12" }
        ] },
      s12: { time: "9:30 AM",
        scene: "You get to your desk. Egg prices are still high. Your note nudged one decision. It didn't fix the country, and it probably won't next month either. But some small policy will move because someone read the range you calculated. This is the job.",
        stat: { label: "Day 2", tone: "good" },
        choices: [] }
    }
  },
  consult: {
    intro: "You're a first-year associate at a top strategy consulting firm, on-site with a struggling retail chain in NYC. They're losing $10M a month. Your team of 4 has 3 weeks to say why and what to do. Today is day 6.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "Your manager messages: 'By 10 AM I need which stores make money and which lose it. Finance chief at 11.' You have sales data. No cost data. No template.",
        stat: { label: "90 min, no data", tone: "bad" },
        choices: [
          { text: "Build it with rough cost assumptions. Flag them clearly.", mins: 180, tone: 84, next: "s2" },
          { text: "Push back: '11 is unrealistic. Honest version by 2 PM.'", mins: 150, tone: 78, next: "s2" },
          { text: "Ask the client's finance team for the cost data. Wait.", mins: 90, tone: 34, next: "s2" }
        ] },
      s2: { time: "10:00 AM",
        scene: "Numbers land. 42 stores are losing money — but 12 opened this year, where losses are normal. Show all 42 and you spook the client. Hide the 12 and you're hiding data.",
        stat: { label: "Story vs. truth", tone: "neutral" },
        choices: [
          { text: "Show all 42. Tag the 12 new stores separately.", mins: 35, tone: 88, next: "s3_honest" },
          { text: "Show only the 30 older stores. Cleaner story.", mins: 20, tone: 24, next: "s3_challenged" },
          { text: "Show all 42, no tags. Let the finance chief ask.", mins: 15, tone: 60, next: "s3_challenged" }
        ] },
      s3_honest: { time: "11:15 AM",
        scene: "The finance chief studies your slide and nods. 'Thanks for separating the new stores — most before you didn't.' Then: 'One store's totals don't match what my team sent last week.'",
        stat: { label: "Trust earned", tone: "good" },
        choices: [
          { text: "'Good catch — I'll check it against your team's numbers right after.'", mins: 20, tone: 86, next: "s4" },
          { text: "'Data-entry issue on our side. I'll fix it today.'", mins: 25, tone: 78, next: "s4" },
          { text: "Defend the number hard. You checked it yourself.", mins: 10, tone: 26, next: "s4" }
        ] },
      s3_challenged: { time: "11:15 AM",
        scene: "The finance chief interrupts your slide: 'These numbers are wrong. My team gave me different totals last week.' The room goes quiet. Your manager looks at you.",
        stat: { label: "Client pushback", tone: "bad" },
        choices: [
          { text: "'These are what your team sent Monday — happy to compare side by side after.'", mins: 25, tone: 84, next: "s4" },
          { text: "'Let me re-check and come back this afternoon.'", mins: 40, tone: 74, next: "s4" },
          { text: "Defend the numbers hard. You know they're right.", mins: 10, tone: 26, next: "s4" }
        ] },
      s4: { time: "12:30 PM",
        scene: "Lunch. The client's operations head sits next to you, venting: 'Consultants never get how it really works.' He's the one person you most need on your side, and he won't give you time.",
        stat: { label: "The person you need", tone: "neutral" },
        choices: [
          { text: "Listen. Ask about his 20 years in retail. Don't sell anything.", mins: 30, tone: 86, sets: { earnedOps: true }, next: "s5" },
          { text: "Politely walk him through how you work. Show him you get it.", mins: 15, tone: 30, next: "s5" },
          { text: "Ask for 30 min this week to actually learn from him.", mins: 20, tone: 84, sets: { earnedOps: true }, next: "s5" }
        ] },
      s5: { time: "2:00 PM",
        scene: "You have 3 store visits scheduled. Your manager wants you back to fix the finance chief's slides. You can only do one.",
        stat: { label: "Slides vs. stores", tone: "neutral" },
        choices: [
          { text: "Visit one store, take detailed notes, do the slides tonight.", mins: 180, tone: 80, next: "s6" },
          { text: "Skip the visits, fix the slides. Manager first.", mins: 90, tone: 56, next: "s6" },
          { text: "Send a junior on the visits, do the slides yourself.", mins: 120, tone: 82, next: "s6" }
        ] },
      s6: { time: "3:30 PM",
        scene: "45 minutes watching a 'loss-making' store. It's packed. Half the customers walk out — only one checkout counter is open. That won't show up in any spreadsheet.",
        stat: { label: "Real insight", tone: "good" },
        choices: [
          { text: "Photograph everything. Count walkouts for 30 min. Real data.", mins: 40, tone: 84, next: "s7" },
          { text: "Note it and move on. One store isn't enough.", mins: 5, tone: 56, next: "s7" },
          { text: "Ask the store manager: 'Why only one counter?'", mins: 10, tone: 82, next: "s7" }
        ] },
      s7: { time: "5:00 PM",
        scene: "Back at the client office. Your junior — day 4 on her first project — hands you her analysis. The whole approach is off. Presenting it would embarrass her and the team.",
        stat: { label: "First-week junior", tone: "neutral" },
        choices: [
          { text: "Sit with her, walk through it, redo it together in 45 min.", mins: 45, tone: 84 },
          { text: "Redo it yourself tonight, show her tomorrow.", mins: 60, tone: 56 },
          { text: "Point out the flaw and let her redo it.", mins: 10, tone: 62 }
        ],
        next: (flags) => flags.earnedOps ? "s8_intel" : "s8" },
      s8: { time: "6:30 PM",
        scene: "Your manager messages: 'Partner tomorrow at 9 — run-through of week 1 findings. 15 slides. Story first. By midnight.'",
        stat: { label: "Partner tomorrow", tone: "bad" },
        choices: [
          { text: "Draft the story on paper first — 30 min — before opening PowerPoint.", mins: 30, tone: 84, next: "s9" },
          { text: "Open PowerPoint, start with the data, build slides as you go.", mins: 45, tone: 30, next: "s9" },
          { text: "Reuse last week's slides as a base. Update the numbers.", mins: 20, tone: 52, next: "s9" }
        ] },
      s8_intel: { time: "6:30 PM",
        scene: "The operations head emails you five bullets — 20 years of hard experience. 'Two of your ideas we've tried. One we haven't.' Your manager messages: 'Partner tomorrow at 9 — 15 slides, by midnight.'",
        stat: { label: "Real ammunition", tone: "good" },
        choices: [
          { text: "Draft the story on paper — his framing plus your store data.", mins: 35, tone: 84, next: "s9" },
          { text: "Open PowerPoint, start with the data, build slides as you go.", mins: 45, tone: 30, next: "s9" },
          { text: "Lead with his 'we haven't tried this' idea. Build the slides around it.", mins: 25, tone: 86, next: "s9" }
        ] },
      s9: { time: "8:15 PM",
        scene: "Mid-slide. The finance chief's assistant emails: 'He wants an 8 AM call before your partner meeting.' 8 AM means briefing the partner at 7. Your slides finish at 11 PM.",
        stat: { label: "Squeezed", tone: "bad" },
        choices: [
          { text: "Warn your manager tonight. She'll want to prep at 7 AM.", mins: 10, tone: 84, next: "s10" },
          { text: "Handle the 8 AM call yourself. Don't mention it.", mins: 30, tone: 26, next: "s10" },
          { text: "Ask your manager to take the call so you can finish the slides.", mins: 15, tone: 62, next: "s10" }
        ] },
      s10: { time: "10:00 PM",
        scene: "Hotel. Your headline — 'not enough checkout counters' — rests on one store visit. True, but not enough to convince a skeptical finance chief.",
        stat: { label: "One example", tone: "neutral" },
        choices: [
          { text: "Call it a theory to test in week 2. Not a conclusion yet.", mins: 10, tone: 84, next: "s11" },
          { text: "Present it as a finding. You saw it, you know it's right.", mins: 5, tone: 28, next: "s11" },
          { text: "Cut it. Only include what you can fully prove.", mins: 8, tone: 44, next: "s11" }
        ] },
      s11: { time: "11:45 PM",
        scene: "Slides sent. Your manager replies in 4 minutes: 'Slide 7 is buried — that's your best insight. Move it up. Rework the flow.' 15 hours in. Another 45 minutes.",
        stat: { label: "One more edit", tone: "bad" },
        choices: [
          { text: "Do it. She's right, they're better slides.", mins: 60, tone: 82, next: "s12" },
          { text: "Push back: 'It's fine — the client likes context first.'", mins: 10, tone: 30, next: "s12" },
          { text: "Move the slide, skip the flow rework. Half-do it and send.", mins: 25, tone: 50, next: "s12" }
        ] },
      s12: { time: "7:00 AM (Sat)",
        scene: "Briefing your partner in the hotel lobby over black coffee. She flips through in 90 seconds: 'Good — but cut slides 3 and 4, they're weak.' You spent four hours on those two slides. She's right. This is the job.",
        stat: { label: "Day 7 begins", tone: "neutral" },
        choices: [] }
    }
  },
  quant: {
    intro: "You're new at a small trading firm in NYC. Your job: write code that uses math to trade stocks. Today your boss wants you to test one small idea with a little real money.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "You get in early. Your boss messages: 'Try one small idea today. Use only a little money. Show me by 5 PM.' The market opens in 30 minutes.",
        stat: { label: "Where to start?", tone: "neutral" },
        choices: [
          { text: "Ask a senior teammate: 'What kind of ideas work here?'", mins: 15, tone: 84, sets: { asked: true }, next: "s2" },
          { text: "Open old stock data and start hunting for patterns.", mins: 60, tone: 78, next: "s2" },
          { text: "Read the morning news first. Ideas start there.", mins: 30, tone: 54, next: "s2" }
        ] },
      s2: { time: "9:30 AM",
        scene: "The market opens. You spot something: a small stock often jumps 15 minutes after a bigger stock jumps. Maybe a real pattern. Maybe just luck.",
        stat: { label: "Maybe a pattern", tone: "neutral" },
        choices: [
          { text: "Test it on 2 years of past data. Takes 1 hour.", mins: 60, tone: 86, next: "s3_careful" },
          { text: "Test it on last week only. Faster — 15 minutes.", mins: 15, tone: 32, next: "s3_rushed" },
          { text: "Trade a tiny amount right now and see what happens.", mins: 10, tone: 22, next: "s3_rushed" }
        ] },
      s3_careful: { time: "11:00 AM",
        scene: "You tested on 2 years. It worked 58% of the time. Not amazing, but real. You feel good about the numbers.",
        stat: { label: "Real pattern", tone: "good" },
        choices: [
          { text: "Write clean code so tomorrow you can run it faster.", mins: 50, tone: 78, next: "s4" },
          { text: "Skip ahead to trading. You did the homework.", mins: 10, tone: 48, next: "s4" },
          { text: "Show your test to a senior before risking money.", mins: 20, tone: 86, next: "s4" }
        ] },
      s3_rushed: { time: "11:00 AM",
        scene: "The rushed test showed 71% wins — but only across 12 trades. That's too small to trust. Your gut wants to trade. Your math says you don't know yet.",
        stat: { label: "Test too small", tone: "bad" },
        choices: [
          { text: "Go back and test properly. 45 minutes lost, but safer.", mins: 45, tone: 84, next: "s4" },
          { text: "Trust the small test. Trade a tiny amount.", mins: 10, tone: 24, next: "s4" },
          { text: "Ask a senior: 'Is 12 trades enough to trust?'", mins: 12, tone: 82, next: "s4" }
        ] },
      s4: { time: "12:15 PM",
        scene: "Time to decide how much money. You have $5,000 to work with today. First real trade. Real losses. Real gains.",
        stat: { label: "How much?", tone: "neutral" },
        choices: [
          { text: "Start with $500. Small feels safe.", mins: 10, tone: 80, next: "s5" },
          { text: "Go big — the full $5,000. If it works, huge win.", mins: 10, tone: 16, next: "s5" },
          { text: "$1,500 — big enough to matter, small enough to survive a loss.", mins: 10, tone: 86, next: "s5" }
        ] },
      s5: { time: "1:00 PM",
        scene: "Lunch. Someone at the next desk whispers: 'A friend at another firm says this stock will shoot up today. Sure thing.' No proof — just a tip.",
        stat: { label: "Rumor, no proof", tone: "neutral" },
        choices: [
          { text: "Ignore it. Your job is math, not gossip.", mins: 3, tone: 84, next: "s6" },
          { text: "Ask for proof. If it's real, use it.", mins: 25, tone: 56, next: "s6" },
          { text: "Trade on it. A tip is a tip.", mins: 5, tone: 14, next: "s6" }
        ] },
      s6: { time: "2:30 PM",
        scene: "Your strategy is losing. Down $420 in an hour. Your gut says stop. Your plan says wait and ride it out.",
        stat: { label: "Losing money", tone: "bad" },
        choices: [
          { text: "Stop now. Losses can grow fast.", mins: 5, tone: 76, next: "s7" },
          { text: "Stick to the plan. This is why you tested.", mins: 5, tone: 84, next: "s7" },
          { text: "Add MORE money — buy the dip. It'll bounce.", mins: 10, tone: 12, next: "s7" }
        ] },
      s7: { time: "3:30 PM",
        scene: "Your boss walks by: 'How's it going?' You have to tell her exactly where you are. No dodging.",
        stat: { label: "Honesty check", tone: "neutral" },
        choices: [
          { text: "'Down $420. I've set a limit — if it drops more, I stop.'", mins: 8, tone: 86, next: "s8" },
          { text: "'It's fine, still testing.' Buy time.", mins: 5, tone: 22, next: "s8" },
          { text: "'Down $420 and honestly nervous — can I show you the numbers?'", mins: 20, tone: 82, next: "s8" }
        ] },
      s8: { time: "4:15 PM",
        scene: "Your boss adds a twist: 'Also — check if your idea still works on days when the market itself is falling.' You only tested on normal days.",
        stat: { label: "New question", tone: "neutral" },
        choices: [
          { text: "Pick the worst 20 days last year. Test only on those.", mins: 40, tone: 84 },
          { text: "Build a full simulation from scratch. Proper science.", mins: 150, tone: 60 },
          { text: "Guess. Say 'probably works.' Move on.", mins: 3, tone: 18 }
        ],
        next: (flags) => flags.asked ? "s9_helped" : "s9_solo" },
      s9_helped: { time: "4:30 PM",
        scene: "The senior you asked this morning messages you: 'Saw your message. I already have a falling-market program — want it?' Your morning question just saved you an hour.",
        stat: { label: "Help arrives", tone: "good" },
        choices: [
          { text: "'Yes please — I'll run it and share what I learn.'", mins: 45, tone: 84, next: "s10" },
          { text: "'Thanks, but let me try building it myself first.'", mins: 90, tone: 54, next: "s10" },
          { text: "'Send it — and can we walk through it together after?'", mins: 60, tone: 86, next: "s10" }
        ] },
      s9_solo: { time: "4:30 PM",
        scene: "You never talked to anyone this morning. Now you're building the falling-market test alone, with 30 minutes on the clock and a loud floor around you.",
        stat: { label: "No help lined up", tone: "bad" },
        choices: [
          { text: "Keep it simple — pick 5 bad days, test on those, send it.", mins: 40, tone: 82, next: "s10" },
          { text: "Try to build the full thing. You might not finish in time.", mins: 120, tone: 30, next: "s10" },
          { text: "Ask a senior right now, even if it's late.", mins: 15, tone: 78, next: "s10" }
        ] },
      s10: { time: "5:15 PM",
        scene: "The market closes. Final: down $280 for the day. Your idea worked half the time. Not a win, not a disaster. Your boss wants a one-page report by tomorrow.",
        stat: { label: "Day done", tone: "neutral" },
        choices: [
          { text: "One page. The numbers, plus one line: 'Idea is weak — don't bet more on it.'", mins: 25, tone: 86, next: "s11" },
          { text: "A long report with lots of charts and explanations.", mins: 90, tone: 54, next: "s11" },
          { text: "Wait — run the idea overnight and try to save it.", mins: 120, tone: 20, next: "s11" }
        ] },
      s11: { time: "8:00 PM",
        scene: "You could stay late and try a new idea, or go home and come back sharper tomorrow. Nobody is asking you to stay.",
        stat: { label: "Stay or go", tone: "neutral" },
        choices: [
          { text: "Go home. A rested brain beats a tired one.", mins: 0, tone: 82, next: "s12" },
          { text: "One more hour. Write down what you learned today.", mins: 60, tone: 78, next: "s12" },
          { text: "Stay till midnight. Grinding is what gets you promoted.", mins: 240, tone: 30, next: "s12" }
        ] },
      s12: { time: "9:00 AM (Tue)",
        scene: "Back at your desk. Down $280 out of $5,000. In quant trading, most ideas fail. The trick is to fail small, learn something, and try again. Today you learned something. On to idea #2.",
        stat: { label: "Day 2 begins", tone: "neutral" },
        choices: [] }
    }
  },
  journalist: {
    intro: "You're a young reporter at a news website. Your editor gives you one story: 'A factory near town may be dumping bad chemicals in the river. Fish are dying. Get me the truth by 6 PM.' Go.",
    start: "s1",
    scenes: {
      s1: { time: "8:30 AM",
        scene: "You have 9 hours. Where do you start?",
        stat: { label: "First move", tone: "neutral" },
        choices: [
          { text: "Drive to the river now. See it with your own eyes.", mins: 90, tone: 84, next: "s2" },
          { text: "Call the factory first. Ask for their side.", mins: 20, tone: 56, next: "s2" },
          { text: "Read old news about this factory. 45 minutes of homework.", mins: 45, tone: 82, sets: { prepared: true }, next: "s2" }
        ] },
      s2: { time: "9:30 AM",
        scene: "You reach the river. The water is brown, it smells sharp, and there are dead fish on the bank. A fisherman is packing up. He looks tired and doesn't trust reporters.",
        stat: { label: "First witness", tone: "neutral" },
        choices: [
          { text: "Sit with him. Share water. Ask nothing for 10 minutes.", mins: 25, tone: 86, next: "s3_trusted" },
          { text: "Get straight to it: 'How long has the river been like this?'", mins: 10, tone: 54, next: "s3_neutral" },
          { text: "Take photos first. Talk to him after.", mins: 15, tone: 30, next: "s3_neutral" }
        ] },
      s3_trusted: { time: "10:30 AM",
        scene: "He opens up. 'Fish started dying six weeks ago. Same time the factory began running at night.' It's a start — but one man's word isn't a story.",
        stat: { label: "Something to follow", tone: "good" },
        choices: [
          { text: "Ask if he'll let you use his name.", mins: 10, tone: 80, next: "s4" },
          { text: "Ask him for two more fishermen who'll talk.", mins: 25, tone: 84, next: "s4" },
          { text: "Thank him quietly, write it down, look for proof next.", mins: 8, tone: 78, next: "s4" }
        ] },
      s3_neutral: { time: "10:30 AM",
        scene: "He shrugs and gives you the basics — yes, fish are dying, yes, the factory runs at night. No details. No name. You'll need harder proof.",
        stat: { label: "Cold trail", tone: "bad" },
        choices: [
          { text: "Try another fisherman further up the river.", mins: 45, tone: 78, next: "s4" },
          { text: "Head to the factory. Ask them directly.", mins: 60, tone: 58, next: "s4" },
          { text: "Order a water test. Costs $100.", mins: 30, tone: 86, next: "s4" }
        ] },
      s4: { time: "12:00 PM",
        scene: "Lunch. Your phone lights up: a video on Twitter appears to show the factory pipe dumping at night. 200 shares. No name behind it.",
        stat: { label: "Anonymous video", tone: "neutral" },
        choices: [
          { text: "Message the poster. Ask when and where it was filmed.", mins: 20, tone: 84, next: "s5" },
          { text: "Use it. It matches everything else you've heard.", mins: 3, tone: 20, next: "s5" },
          { text: "Check the video against the fisherman's timeline first.", mins: 25, tone: 86, next: "s5" }
        ] },
      s5: { time: "1:30 PM",
        scene: "You reach the factory gate. The manager comes out smiling too big: 'We follow every rule. We can show you our reports.' He won't let you inside.",
        stat: { label: "Managed message", tone: "neutral" },
        choices: [
          { text: "Take his statement. Ask sharp follow-up questions.", mins: 30, tone: 82, next: "s6" },
          { text: "Push to see inside. If he refuses, that's part of the story.", mins: 45, tone: 66, next: "s6" },
          { text: "Accept the reports. Check them later.", mins: 15, tone: 60, next: "s6" }
        ] },
      s6: { time: "3:00 PM",
        scene: "Your editor calls: 'A bigger paper is running their version tomorrow. If we post tonight at 8, we're first. If we wait, we're second.'",
        stat: { label: "Speed vs. truth", tone: "bad" },
        choices: [
          { text: "'Give me 24 hours — I need to check where the video came from.'", mins: 10, tone: 84, next: "s7" },
          { text: "'We publish tonight. Being first matters.'", mins: 5, tone: 22, next: "s7" },
          { text: "Publish what's solid tonight. Add the video tomorrow with proof.", mins: 20, tone: 86, next: "s7" }
        ] },
      s7: { time: "3:45 PM",
        scene: "A former factory worker calls: 'Yes, they dump at night to save money.' He won't use his name. Publishing on one hidden source is risky.",
        stat: { label: "Anonymous source", tone: "neutral" },
        choices: [
          { text: "Find a second source who says the same thing.", mins: 60, tone: 86, next: "s8" },
          { text: "Use him. Write it as 'a former employee said.'", mins: 5, tone: 50, next: "s8" },
          { text: "Don't use him. Not solid enough on its own.", mins: 3, tone: 78, next: "s8" }
        ] },
      s8: { time: "4:30 PM",
        scene: "The water test result arrives — chemicals are 6x higher than allowed. Signed by a real lab. Real. Provable.",
        stat: { label: "Hard proof", tone: "good" },
        choices: [
          { text: "Lead the story with the number. It speaks for itself.", mins: 10, tone: 84 },
          { text: "Put the number halfway down. Build up to it.", mins: 15, tone: 60 },
          { text: "Wait. Get a second lab test before you print it.", mins: 90, tone: 62 }
        ],
        next: (flags) => flags.prepared ? "s9_pattern" : "s9_missed" },
      s9_pattern: { time: "4:45 PM",
        scene: "Because you read the old news this morning, you remember: two years ago the same factory was fined for the same thing. This isn't a slip — it's a pattern. Your story just got stronger.",
        stat: { label: "Bigger story", tone: "good" },
        choices: [
          { text: "Add the pattern. This is the real headline.", mins: 40, tone: 86, next: "s10" },
          { text: "Save the pattern for a follow-up piece tomorrow.", mins: 5, tone: 56, next: "s10" },
          { text: "Add it, but call your editor first. She'll want to know.", mins: 15, tone: 84, next: "s10" }
        ] },
      s9_missed: { time: "4:45 PM",
        scene: "The factory's name rings a bell. A quick search: they were fined two years ago for the exact same thing. You almost missed the pattern because you skipped the background reading.",
        stat: { label: "Almost missed it", tone: "bad" },
        choices: [
          { text: "Add the pattern. Push the deadline 30 minutes.", mins: 30, tone: 84, next: "s10" },
          { text: "Skip it. No time to check properly.", mins: 0, tone: 28, next: "s10" },
          { text: "Call your editor: 'I need 30 min. I found the second half of the story.'", mins: 35, tone: 86, next: "s10" }
        ] },
      s10: { time: "5:30 PM",
        scene: "Your editor reads the draft: 'Cut 200 words. The number, the fish, the pattern — put those first. Everything else after.'",
        stat: { label: "Editor cuts", tone: "neutral" },
        choices: [
          { text: "Do it. She's right.", mins: 25, tone: 82, next: "s11" },
          { text: "Push back. The story needs context first.", mins: 10, tone: 30, next: "s11" },
          { text: "Do most of it, keep one bit you're attached to.", mins: 15, tone: 56, next: "s11" }
        ] },
      s11: { time: "7:00 PM",
        scene: "The story is written. The lawyer reads it: 'The word illegal is strong. Do you have signed proof they broke the law?' You have the water test. Not a court ruling.",
        stat: { label: "Words matter", tone: "neutral" },
        choices: [
          { text: "Change 'illegal' to 'above legal limits.' Same fact, safer.", mins: 3, tone: 84, next: "s12" },
          { text: "Keep 'illegal.' The test proves it.", mins: 2, tone: 50, next: "s12" },
          { text: "Ask the lawyer to rewrite that one line.", mins: 15, tone: 78, next: "s12" }
        ] },
      s12: { time: "8:15 PM",
        scene: "The story goes live. 400 shares in 20 minutes. The fisherman texts: 'thank you.' The factory posts a denial. Next morning, the pollution board says they're investigating. You didn't fix the river. But now thousands of people know.",
        stat: { label: "Day one done", tone: "good" },
        choices: [] }
    }
  },
  director: {
    intro: "You're a young film director in Los Angeles shooting your first short film — 15 minutes long. Today is day one on set. 20 people are waiting for you to tell them what to do. You have 3 days to shoot the whole thing.",
    start: "s1",
    scenes: {
      s1: { time: "6:30 AM",
        scene: "You reread the script one last time. The big emotional scene at the end feels flat. You've felt this for a week and haven't fixed it. Shooting starts at 9.",
        stat: { label: "Weak ending", tone: "bad" },
        choices: [
          { text: "Rewrite the ending now. Two hours. You might crack it.", mins: 120, tone: 78, sets: { rewrote: true }, next: "s2" },
          { text: "Shoot it as written. Fix it later in editing.", mins: 5, tone: 28, next: "s2" },
          { text: "Call your writer friend for 20 minutes. Get one fresh idea.", mins: 20, tone: 84, sets: { asked: true }, next: "s2" }
        ] },
      s2: { time: "9:00 AM",
        scene: "You're on set. Your lead actor texts: 'Stuck in traffic. 90 minutes late.' The whole crew is standing around. Every minute costs money.",
        stat: { label: "Lead is late", tone: "bad" },
        choices: [
          { text: "Shoot the shots that don't need the lead. Rearrange the schedule.", mins: 45, tone: 86, next: "s3" },
          { text: "Send everyone on a long break. Save your energy.", mins: 90, tone: 24, next: "s3" },
          { text: "Rehearse with the other actors so it's tight when the lead arrives.", mins: 40, tone: 80, next: "s3" }
        ] },
      s3: { time: "11:30 AM",
        scene: "The lead is here. First take of the big scene. It's… okay. Not great. He's trying, but you can feel it's not landing.",
        stat: { label: "Flat performance", tone: "neutral" },
        choices: [
          { text: "Say 'perfect' and move on. Don't hurt his confidence.", mins: 2, tone: 26, next: "s4" },
          { text: "Pull him aside. Tell him one specific thing to try, quietly.", mins: 8, tone: 88, next: "s4" },
          { text: "Give a big note in front of everyone so the crew knows you're in charge.", mins: 10, tone: 20, next: "s4" }
        ] },
      s4: { time: "1:00 PM",
        scene: "Lunch break. Your camera person shows you the footage on a small screen. The light in the background looks wrong. You didn't notice on set.",
        stat: { label: "Ugly light", tone: "bad" },
        choices: [
          { text: "Reshoot the morning scenes after lunch. Costs you an hour.", mins: 60, tone: 78, next: "s5" },
          { text: "Keep it. Fix the color later on the computer.", mins: 5, tone: 54, next: "s5" },
          { text: "Ask the camera person: 'Can we save it with one big light?' Try that first.", mins: 25, tone: 84, next: "s5" }
        ] },
      s5: { time: "3:00 PM",
        scene: "A 9-year-old actor has one line in the next scene. She's tired and starting to cry. Her mom is watching from the side, tense.",
        stat: { label: "Kid melting down", tone: "bad" },
        choices: [
          { text: "Give her a 20-minute break with snacks. Shoot around her.", mins: 20, tone: 86, next: "s6" },
          { text: "Do the take fast — one try — and let her go home.", mins: 10, tone: 58, next: "s6" },
          { text: "Push through. She'll get it in 5 more takes.", mins: 45, tone: 20, next: "s6" }
        ] },
      s6: { time: "5:00 PM",
        scene: "The sun is dropping fast. You planned one more outdoor scene today. Losing daylight means losing the shot.",
        stat: { label: "Losing light", tone: "bad" },
        choices: [
          { text: "Skip the fancy shot. Get one clean wide shot fast.", mins: 25, tone: 84 },
          { text: "Try the fancy shot anyway. You might get lucky.", mins: 50, tone: 26 },
          { text: "Move the scene to tomorrow. Send the crew home early, they're tired.", mins: 15, tone: 78 }
        ],
        next: (flags) => (flags.rewrote || flags.asked) ? "s7_ready" : "s7_stuck" },
      s7_ready: { time: "7:00 PM",
        scene: "Time for the big emotional scene. Because you fixed it this morning, you know what you want. You tell the actor one simple thing: 'You're not sad — you're trying not to be sad.' His face changes.",
        stat: { label: "New idea lands", tone: "good" },
        choices: [
          { text: "One take, close-up on his face. Trust it.", mins: 15, tone: 80, next: "s8" },
          { text: "Three takes, different angles. Choose later in editing.", mins: 40, tone: 84, next: "s8" },
          { text: "Ten takes, just to be safe.", mins: 110, tone: 54, next: "s8" }
        ] },
      s7_stuck: { time: "7:00 PM",
        scene: "Time for the big emotional scene. You still don't know what you want. The actor keeps asking 'what am I feeling here?' and your answer keeps changing. The crew is starting to notice.",
        stat: { label: "You froze", tone: "bad" },
        choices: [
          { text: "Admit it: 'Let's take 15 minutes. I need to think.'", mins: 15, tone: 84, next: "s8" },
          { text: "Fake confidence. Pick any direction and stick with it.", mins: 5, tone: 26, next: "s8" },
          { text: "Let the actor try his own version. Sometimes they know better.", mins: 20, tone: 80, next: "s8" }
        ] },
      s8: { time: "9:30 PM",
        scene: "Done for day one. Your producer pulls you aside: 'A famous actor said he'd do a small role for free — but only tomorrow morning, 6 AM.' That means rewriting a whole scene tonight.",
        stat: { label: "Free star, big cost", tone: "neutral" },
        choices: [
          { text: "Say yes. A famous face on screen sells the film.", mins: 30, tone: 52, next: "s9" },
          { text: "Say no. Your script doesn't need him. Sleep matters.", mins: 5, tone: 82, next: "s9" },
          { text: "Say yes, but keep his role tiny — 10 seconds, no new writing.", mins: 15, tone: 84, next: "s9" }
        ] },
      s9: { time: "Day 4 · 10:00 AM",
        scene: "Shooting is done. You sit with the editor. The first version is 22 minutes. Your target is 15. Something has to go.",
        stat: { label: "7 minutes too long", tone: "bad" },
        choices: [
          { text: "Cut your favorite scene. It's beautiful, but the story works without it.", mins: 60, tone: 86, next: "s10" },
          { text: "Cut small bits from every scene. Keep everything, just shorter.", mins: 120, tone: 32, next: "s10" },
          { text: "Show two people you trust and ask what to cut.", mins: 90, tone: 80, next: "s10" }
        ] },
      s10: { time: "Week 3",
        scene: "Small test showing — 6 friends. Three love it. Two are polite. One says 'I got confused around the middle.' Confused is real feedback.",
        stat: { label: "Middle is muddy", tone: "neutral" },
        choices: [
          { text: "Believe the one confused person. Re-edit the middle.", mins: 90, tone: 84, next: "s11" },
          { text: "Trust the three who loved it. Ship it as-is.", mins: 10, tone: 52, next: "s11" },
          { text: "Show it to 6 more strangers before deciding.", mins: 180, tone: 80, next: "s11" }
        ] },
      s11: { time: "Month 2",
        scene: "The film is done. You post it online. In one week, 4,000 people watch it. A few strangers message you: 'this scene made me cry.' A film critic tweets one line about it. Your mom calls, proud. The scene you fought hardest for is the one people quote back to you. This is the job.",
        stat: { label: "It exists now", tone: "good" },
        choices: [] }
    }
  },
  designer: {
    intro: "You're a product designer at a small startup that makes a math learning app for kids. Today's job: redesign the home screen. Real kids will use whatever you draw. Your product manager wants it by Friday.",
    start: "s1",
    scenes: {
      s1: { time: "9:30 AM",
        scene: "One line from your product manager: 'Make the home screen more fun. Kids are getting bored.' No drawings. No data attached.",
        stat: { label: "Vague brief", tone: "neutral" },
        choices: [
          { text: "Open your design file and start drawing. You have ideas already.", mins: 20, tone: 48, next: "s2_draw" },
          { text: "Ask your product manager for the data first. What are kids actually doing?", mins: 25, tone: 84, sets: { data: true }, next: "s2_data" },
          { text: "Watch 3 kids use the current app for 20 min each. See it live.", mins: 60, tone: 88, sets: { watched: true }, next: "s2_watch" }
        ] },
      s2_draw: { time: "11:00 AM",
        scene: "You've drawn a bright, cartoony screen. Big buttons, a silly monster mascot. It looks fun. But you're guessing what kids like — you're 26, not 9.",
        stat: { label: "Pretty guess", tone: "neutral" },
        choices: [
          { text: "Show it to your product manager. Get quick feedback.", mins: 15, tone: 56, next: "s3" },
          { text: "Stop. Find one real kid to react to it before you go further.", mins: 45, tone: 86, sets: { watched: true }, next: "s3" },
          { text: "Draw three more screens so your manager has options.", mins: 50, tone: 54, next: "s3" }
        ] },
      s2_data: { time: "11:00 AM",
        scene: "Your product manager sends the data. Kids open the app, tap around for 90 seconds, then leave. Most never reach the second lesson. The home screen is where they lose them.",
        stat: { label: "Real problem", tone: "good" },
        choices: [
          { text: "Design a home screen that shows just one 'next thing to do.'", mins: 40, tone: 88, next: "s3" },
          { text: "Add more buttons so kids can pick anything.", mins: 30, tone: 24, next: "s3" },
          { text: "Add a big animation on open so it feels alive.", mins: 35, tone: 52, next: "s3" }
        ] },
      s2_watch: { time: "11:00 AM",
        scene: "You watched three kids. All three ignored the menu on the left. Two tapped the mascot thinking it was a game. One kid said 'where do I start?' out loud.",
        stat: { label: "You saw it", tone: "good" },
        choices: [
          { text: "Kill the side menu. Put in one big 'Start here' button.", mins: 30, tone: 86, next: "s3" },
          { text: "Make the mascot actually clickable. Turn the confusion into a feature.", mins: 45, tone: 88, next: "s3" },
          { text: "Add a tutorial that pops up the first time.", mins: 25, tone: 54, next: "s3" }
        ] },
      s3: { time: "1:00 PM",
        scene: "Color time. Your first draft is bright red, blue and yellow. Loud. Fun. But red is also the color your app uses for 'wrong answer.'",
        stat: { label: "Color clash", tone: "neutral" },
        choices: [
          { text: "Switch the main color to green. Save red only for mistakes.", mins: 30, tone: 86, next: "s4" },
          { text: "Keep red. Kids won't notice.", mins: 3, tone: 26, next: "s4" },
          { text: "Use softer colors — pastel blue and yellow.", mins: 40, tone: 78, next: "s4" }
        ] },
      s4: { time: "2:30 PM",
        scene: "You share your screen with the lead engineer. She looks at it for 10 seconds: 'The bouncing animation on every button will eat phone battery. Can we lose it?'",
        stat: { label: "Engineer says no", tone: "bad" },
        choices: [
          { text: "Drop the bouncing. Keep one small animation on tap only.", mins: 20, tone: 84, next: "s5" },
          { text: "Fight for it. Kids love the bounce.", mins: 15, tone: 26, next: "s5" },
          { text: "Ask her: 'What can we afford, animation-wise?' Design to that.", mins: 20, tone: 86, next: "s5" }
        ] },
      s5: { time: "3:30 PM",
        scene: "Your product manager messages: 'Quick add — can you put a parents' dashboard button on the home screen too?' That button is for grown-ups. Kids will tap it and get confused.",
        stat: { label: "Manager squeeze", tone: "bad" },
        choices: [
          { text: "Yes, but tiny — corner only, with a lock icon.", mins: 20, tone: 84, next: "s6" },
          { text: "No: 'Parents' stuff belongs in Settings, not the home screen.'", mins: 8, tone: 82, next: "s6" },
          { text: "Sure, add a big button. Your manager will be happy.", mins: 10, tone: 26, next: "s6" }
        ] },
      s6: { time: "4:30 PM",
        scene: "You show your design to a designer friend: 'A color-blind kid won't be able to tell these buttons apart. Everything is by color alone.'",
        stat: { label: "Some kids can't use it", tone: "bad" },
        choices: [
          { text: "Add small icons on every button, not just color. Redo it.", mins: 45, tone: 84 },
          { text: "Note it as a 'fix it later' job. Ship the current design.", mins: 5, tone: 26 },
          { text: "Add icons, and test with a color-blind filter tool right now.", mins: 60, tone: 88 }
        ],
        next: (flags) => (flags.watched || flags.data) ? "s7_smart" : "s7_blind" },
      s7_smart: { time: "5:30 PM",
        scene: "Because you saw real kids (or checked the data) earlier, you know they lose interest fast. You add one simple thing: a small streak counter — 'You've done math 3 days in a row!' It costs nothing to build.",
        stat: { label: "Small smart addition", tone: "good" },
        choices: [
          { text: "Put it right at the top. First thing kids see.", mins: 15, tone: 76, next: "s8" },
          { text: "Put it in a corner. Don't overdo it.", mins: 10, tone: 82, next: "s8" },
          { text: "Save it for next week. Ship the basic version first.", mins: 5, tone: 58, next: "s8" }
        ] },
      s7_blind: { time: "5:30 PM",
        scene: "You realise you never actually watched a kid use this. You've been designing for an imaginary child in your head. Your manager is waiting for the file.",
        stat: { label: "No real signal", tone: "bad" },
        choices: [
          { text: "Send Friday's file, but book kid testing for next week.", mins: 20, tone: 80, next: "s8" },
          { text: "Delay by two days. Watch real kids first.", mins: 120, tone: 82, next: "s8" },
          { text: "Ship it. Trust your gut.", mins: 5, tone: 28, next: "s8" }
        ] },
      s8: { time: "6:30 PM",
        scene: "Time to hand it over. You could send a rough design file and let the engineer guess, or spend 45 min writing exact notes for spacing, colors, and tap sizes.",
        stat: { label: "How much detail", tone: "neutral" },
        choices: [
          { text: "Write the notes. Saves engineers a whole day of back-and-forth.", mins: 45, tone: 84, next: "s9" },
          { text: "Just send the file. Answer questions in Slack tomorrow.", mins: 5, tone: 52, next: "s9" },
          { text: "Send the file plus a 5-min video walking through it.", mins: 20, tone: 86, next: "s9" }
        ] },
      s9: { time: "Next Friday",
        scene: "The new home screen is live. The team runs a test — half the kids see the old one, half see yours. After a week: your version keeps kids 40% longer. But 6% of parents complain it's 'too colorful.'",
        stat: { label: "Kids up, parents mixed", tone: "good" },
        choices: [
          { text: "Ship your version to everyone. Kids are the users.", mins: 10, tone: 74, next: "s10" },
          { text: "Add a 'calm mode' switch for parents who want it.", mins: 60, tone: 88, next: "s10" },
          { text: "Roll it back. Parents pay the subscription.", mins: 20, tone: 34, next: "s10" }
        ] },
      s10: { time: "3 months later",
        scene: "You open the app. That mascot you sketched on day one is on the screens of 80,000 kids. A parent sends a photo — her daughter drew the mascot in her school notebook. Somewhere else, an engineer secretly hates one of your color choices. This is the job.",
        stat: { label: "Real users", tone: "good" },
        choices: [] }
    }
  },
  pm: {
    intro: "You're a product manager at a food delivery app used by 3 million people. Today you decide what your team of 6 engineers will build next month. You don't write code or draw designs. You decide what matters and keep people unstuck.",
    start: "s1",
    scenes: {
      s1: { time: "9:00 AM",
        scene: "Your boss wants a new feature launched in 4 weeks. You have three ideas on your list. You have to pick one.",
        stat: { label: "First pick", tone: "neutral" },
        choices: [
          { text: "Look at the last 3 months of data. Pick where users quit most.", mins: 45, tone: 86, sets: { data: true }, next: "s2" },
          { text: "Call 5 users this morning. Ask what's annoying.", mins: 90, tone: 84, sets: { asked: true }, next: "s2" },
          { text: "Pick the idea your CEO likes. Safe.", mins: 5, tone: 28, next: "s2" }
        ] },
      s2: { time: "10:30 AM",
        scene: "You've picked: let users schedule an order for later, like breakfast for tomorrow morning. You explain it to your lead engineer. He listens, then says: 'This is 8 weeks of work, not 4. Payments alone will take 2.'",
        stat: { label: "Reality check", tone: "bad" },
        choices: [
          { text: "Cut the feature in half. Ship 'schedule up to 12 hours ahead' only.", mins: 30, tone: 86, next: "s3" },
          { text: "Push the deadline. Tell your boss 4 weeks won't work.", mins: 15, tone: 78, next: "s3" },
          { text: "Say 'try to make it happen.' Trust him to figure it out.", mins: 5, tone: 24, next: "s3" }
        ] },
      s3: { time: "12:00 PM",
        scene: "Two teammates disagree in a meeting. The engineer wants a simple design. The designer wants a fancier one. They both look at you.",
        stat: { label: "You decide", tone: "neutral" },
        choices: [
          { text: "Simple version now. Fancy version next month if users love it.", mins: 15, tone: 84, next: "s4" },
          { text: "Fancy version. First impressions matter.", mins: 10, tone: 52, next: "s4" },
          { text: "Ask them to build a tiny test version of both. Test with 20 users.", mins: 90, tone: 86, next: "s4" }
        ] },
      s4: { time: "1:30 PM",
        scene: "Lunch. Your data analyst messages: 'Only 3% of users asked for scheduling in surveys.' Your gut said this was a bigger deal.",
        stat: { label: "Weak signal", tone: "bad" },
        choices: [
          { text: "Kill the feature. Pick a bigger problem.", mins: 20, tone: 74, next: "s5" },
          { text: "Keep going. Surveys under-count what people actually do.", mins: 5, tone: 54, next: "s5" },
          { text: "Ask the analyst: 'How many users tried to schedule and failed?' Different question.", mins: 25, tone: 88, next: "s5" }
        ] },
      s5: { time: "3:00 PM",
        scene: "Your customer support lead walks over: '15 users complained yesterday that their delivery driver called them 4 times.' A small annoyance. Three days of engineering work to fix.",
        stat: { label: "Small fix, real pain", tone: "neutral" },
        choices: [
          { text: "Squeeze it into next week. Small fixes build user trust.", mins: 25, tone: 82, next: "s6" },
          { text: "Ignore it. You have a big feature to ship.", mins: 3, tone: 30, next: "s6" },
          { text: "File it. Fix it right after the big launch.", mins: 10, tone: 62, next: "s6" }
        ] },
      s6: { time: "4:30 PM",
        scene: "Marketing wants to announce the new feature next Friday with a big campaign. Engineers say it'll be 'mostly ready' but not fully tested by then.",
        stat: { label: "Launch too early?", tone: "bad" },
        choices: [
          { text: "Push marketing's date back one week. Test properly.", mins: 20, tone: 82, next: "s7" },
          { text: "Launch to 10% of users on Friday. Full launch after.", mins: 45, tone: 86, next: "s7" },
          { text: "Launch on Friday. Fix bugs as users find them.", mins: 10, tone: 22, next: "s7" }
        ] },
      s7: { time: "5:30 PM",
        scene: "Your CEO drops in: 'Add restaurant reviews to the app. Yelp has them, we should too.' She says it like it's small. It is not small.",
        stat: { label: "Boss adds more work", tone: "bad" },
        choices: [
          { text: "'Yes — after this launch. It's a 6-week project on its own.'", mins: 10, tone: 82 },
          { text: "'Yes ma'am.' Add it to the team's plate.", mins: 5, tone: 24 },
          { text: "Ask: 'What problem is this solving?' Understand before agreeing.", mins: 20, tone: 86 }
        ],
        next: (flags) => (flags.data || flags.asked) ? "s8_grounded" : "s8_shaky" },
      s8_grounded: { time: "6:30 PM",
        scene: "Because you looked at the data (or talked to users) this morning, you can tell your CEO: 'Reviews are #7 in our user complaints. Scheduling is #2. Let's finish scheduling first.' She nods.",
        stat: { label: "Numbers win", tone: "good" },
        choices: [
          { text: "Also send her a one-page note tomorrow. She'll want to share it.", mins: 40, tone: 80, next: "s9" },
          { text: "Great, moving on. Don't overdo it.", mins: 3, tone: 58, next: "s9" },
          { text: "Offer to run a 2-week reviews test after scheduling launches.", mins: 25, tone: 84, next: "s9" }
        ] },
      s8_shaky: { time: "6:30 PM",
        scene: "Your CEO asks: 'So what do our users actually want most?' You don't have a clean answer. You mumble something about 'user feedback.' She looks unconvinced.",
        stat: { label: "You winged it", tone: "bad" },
        choices: [
          { text: "Admit it: 'Let me pull the numbers and get back to you tomorrow.'", mins: 15, tone: 84, next: "s9" },
          { text: "Sound confident. Repeat what your engineer said last week.", mins: 5, tone: 24, next: "s9" },
          { text: "Book a week of talking to users this week. Never be here again.", mins: 45, tone: 86, next: "s9" }
        ] },
      s9: { time: "Launch day",
        scene: "The scheduling feature is live. First 24 hours: 12,000 users try it. 900 orders fail because of a bug in the payment step. The support inbox is exploding.",
        stat: { label: "Bug in the live app", tone: "bad" },
        choices: [
          { text: "Turn the feature off for now. Fix it. Turn it back on in a day.", mins: 30, tone: 86, next: "s10" },
          { text: "Keep it on. Refund the 900 users. Tell engineers to fix it live.", mins: 60, tone: 50, next: "s10" },
          { text: "Blame the engineers publicly so leadership knows it wasn't you.", mins: 10, tone: 14, next: "s10" }
        ] },
      s10: { time: "One month later",
        scene: "The bug is fixed. 40,000 people now schedule orders every day. Nobody outside your team knows how many small decisions this took. Your engineer messages: 'Thanks for cutting it down in week one. We'd still be building otherwise.' Nobody sees you draw or code — but this feature exists because of the choices you made. This is the job.",
        stat: { label: "Quiet win", tone: "good" },
        choices: [] }
    }
  },
  astro: {
    intro: "You study space at a university. Twelve days ago a star in a far-away galaxy blew up and got millions of times brighter. Tonight you have one booked slot on a huge telescope in Chile, which you control from your laptop. It's your only slot for months, and the star is already fading. No right answers — just pick how you'd naturally work.",
    start: "s1",
    scenes: {
      s1: { time: "2:00 PM",
        scene: "Your slot runs 7 PM to midnight. You need a plan: what to point at, in what order, for how long. The weather page says clouds might roll in late.",
        stat: { label: "5 hours of sky", tone: "neutral" },
        choices: [
          { text: "Write the full plan now, minute by minute.", mins: 80, tone: 52, next: "s2" },
          { text: "Sketch a rough order and leave room to change it live.", mins: 25, tone: 84, next: "s2" },
          { text: "Message the telescope operator: 'What usually goes wrong on nights like this?'", mins: 15, tone: 86, sets: { asked: true }, next: "s2" }
        ] },
      s2: { time: "3:15 PM",
        scene: "The program that turns telescope pictures into a brightness number was written by a student who graduated. You test it on last week's pictures. It crashes.",
        stat: { label: "Your main tool is broken", tone: "bad" },
        choices: [
          { text: "Rewrite the whole thing yourself. Clean, but it eats the afternoon.", mins: 150, tone: 34, next: "s3" },
          { text: "Find the one line that breaks and patch it. Ugly, but working.", mins: 40, tone: 86, next: "s3" },
          { text: "Skip it tonight — measure the first few pictures by hand, fix it tomorrow.", mins: 20, tone: 58, next: "s3" }
        ] },
      s3: { time: "4:30 PM",
        scene: "Email from a team in Japan: they've been watching the same star and plan to publish in three weeks. Whoever publishes first gets the credit.",
        stat: { label: "Someone else is on it", tone: "bad" },
        choices: [
          { text: "Reply: 'Want to put our data together and publish it as one team?'", mins: 20, tone: 84, next: "s4" },
          { text: "Say nothing. Work faster and hope your night goes better than theirs.", mins: 5, tone: 48, next: "s4" },
          { text: "Spend an hour reading everything they've published to see how far ahead they are.", mins: 60, tone: 54, next: "s4" }
        ] },
      s4: { time: "5:45 PM",
        scene: "A student you look after knocks: their project is stuck and it's due Friday. The telescope opens in 75 minutes and you haven't eaten.",
        stat: { label: "Student stuck", tone: "neutral" },
        choices: [
          { text: "Give them 30 minutes now. Eat at your desk.", mins: 35, tone: 76, next: "s5" },
          { text: "'Send me the question in writing — I'll answer it tonight between shots.'", mins: 10, tone: 84, next: "s5" },
          { text: "'Tomorrow morning, I promise.' Then eat properly and set up.", mins: 45, tone: 60, next: "s5" }
        ] },
      s5: { time: "7:00 PM",
        scene: "The telescope opens. Your first pictures come back with bright straight scratches across them — satellites passing overhead. Two of your five pictures are ruined.",
        stat: { label: "Ruined pictures", tone: "bad" },
        choices: [
          { text: "Take extra pictures of everything, so a few ruined ones don't matter.", mins: 45, tone: 84, next: "s6" },
          { text: "Keep going. Clean the scratches out of the pictures later.", mins: 10, tone: 78, next: "s6" },
          { text: "Stop and check when the satellites pass, then plan around them.", mins: 30, tone: 62, next: "s6" }
        ] },
      s6: { time: "8:15 PM",
        scene: "The star is fainter than you expected. You can take a few long pictures (clearer, but you miss fast changes) or lots of short ones (grainier, but you see it change hour by hour).",
        stat: { label: "No second try", tone: "neutral" },
        choices: [
          { text: "A few long ones. Clean numbers you can trust.", mins: 60, tone: 62, next: "s7" },
          { text: "Lots of short ones. Watching it change is why you're here.", mins: 55, tone: 84, next: "s7" },
          { text: "Half the night each way. Split the difference.", mins: 60, tone: 58, next: "s7" }
        ] },
      s7: { time: "9:30 PM",
        scene: "The weather updates: clouds at 11 PM, not 1 AM. You have two hours left, not four. Your list still has the exploded star and a second one you promised a colleague.",
        stat: { label: "Half the night gone", tone: "bad" },
        choices: [
          { text: "Everything left goes to your star. Apologise to your colleague tomorrow.", mins: 20, tone: 82, next: "s8" },
          { text: "Twenty minutes on their target, the rest on yours.", mins: 25, tone: 80, next: "s8" },
          { text: "Split it evenly. You promised — even if both sets end up thin.", mins: 20, tone: 30, next: "s8" }
        ] },
      s8: { time: "10:30 PM",
        scene: "Your rough numbers say the star is fading faster than any explosion you've read about. Either you've found something new, or something in your setup is wrong.",
        stat: { label: "Too good to be true", tone: "neutral" },
        choices: [
          { text: "Assume it's your mistake until proven otherwise. Check your setup.", mins: 30, tone: 88 },
          { text: "Post it in the group chat right now — 'anyone seen this before?'", mins: 10, tone: 50 },
          { text: "Point at a normal star nearby. If that looks wrong too, it's your setup.", mins: 25, tone: 86 }
        ],
        // flag-driven pivot: if you asked the operator for advice at 2 PM,
        // they're watching your night now and tip you off about the clouds.
        next: (flags) => flags.asked ? "s9_helped" : "s9_solo" },
      s9_solo: { time: "11:10 PM",
        scene: "Clouds are closing in. Maybe 25 minutes of clear sky left, and three things still on your list. Nobody else is awake to ask.",
        stat: { label: "25 minutes · alone", tone: "bad" },
        choices: [
          { text: "Take the one measurement that decides tomorrow's answer.", mins: 25, tone: 86, next: "s10" },
          { text: "Grab all three fast. Something is better than nothing.", mins: 25, tone: 56, next: "s10" },
          { text: "Keep re-taking the same shot until the clouds hit.", mins: 25, tone: 24, next: "s10" }
        ] },
      s9_helped: { time: "11:10 PM",
        scene: "Clouds are closing in — maybe 25 minutes of clear sky left. The operator you messaged at 2 PM pings you: 'There's a clear gap to the east for about ten minutes. Want me to swing over?'",
        stat: { label: "25 minutes · a tip-off", tone: "neutral" },
        choices: [
          { text: "'Yes — take the gap, then straight back to my star.'", mins: 25, tone: 80, next: "s10" },
          { text: "'No, stay where we are. I don't want to lose the star.'", mins: 25, tone: 58, next: "s10" },
          { text: "'Your call — you know this sky better than I do.'", mins: 25, tone: 82, next: "s10" }
        ] },
      s10: { time: "11:50 PM",
        scene: "The telescope shuts for the night. You have 240 pictures and no idea yet what they say. Your colleague in Japan is awake and online.",
        stat: { label: "Night over", tone: "neutral" },
        choices: [
          { text: "Back everything up twice, write half a page on how the night went, sleep.", mins: 40, tone: 86, next: "s11" },
          { text: "Run the numbers now while you're still wired. Sleep after.", mins: 90, tone: 56, next: "s11" },
          { text: "Message Japan: 'Got a full night. Still up for doing this together?'", mins: 25, tone: 80, next: "s11" }
        ] },
      s11: { time: "9:15 AM (Thu)",
        scene: "You wake up to a chart made from last night's pictures. The star is fading in a pattern nobody has written about. It might be a real discovery, or a smudge on a mirror. Finding out will take eight months, four more nights like this one, and a lot of people telling you you're wrong. This is the job.",
        stat: { label: "Day 2", tone: "neutral" },
        choices: [] }
    }
  }
};

// GENERIC group templates — cover the other 11 careers. $LABEL is replaced with career.label
const GENERIC_BY_GROUP = {
  "Business & Money": {
    intro: (label) => `A real day as a ${label}. Pressure, a client on the line, a moving deadline, and at least three things you weren't told about last week.`,
    scenes: [
      { time: "8:45 AM",
        scene: "You get to the office. A senior forwards a 40-page document at 6 AM titled 'need a summary and a recommendation by end of day.' No context on what the client actually wants.",
        stat: { label: "Cold start", tone: "neutral" },
        choices: ["Reply 'On it,' skim first — get the shape, then dig", "Read carefully cover-to-cover before touching a spreadsheet or memo", "Ask the senior for a quick call before starting"],
        tones: ["good", "neutral", "good"], minutes: [25, 90, 10] },
      { time: "10:00 AM",
        scene: "You realize the deadline is tighter than you thought. There's a decision meeting at 2 PM that you weren't invited to but should have been. Your work will be discussed with or without you.",
        stat: { label: "Surprise meeting", tone: "bad" },
        choices: ["Ask to be added — 'I should be in the room, my work is on the agenda'", "Prep aggressively without pushing to attend, brief someone senior beforehand", "Wing it, trust your instincts, hope for the best"],
        tones: ["good", "good", "bad"], minutes: [10, 60, 3] },
      { time: "11:15 AM",
        scene: "A junior colleague asks for 15 minutes of your time on their piece of the same project. They're stuck on something you've already solved. Helping = 30 min real cost. Ignoring = they'll flounder for 2 hours.",
        stat: { label: "Team math", tone: "neutral" },
        choices: ["Give them 15 focused minutes now — cheaper for the team", "Point them at your old work, let them figure it out", "'Not now — come back at 4' — buys focus, delays their day"],
        tones: ["good", "neutral", "neutral"], minutes: [15, 5, 5] },
      { time: "12:30 PM",
        scene: "You get to the client's actual data. Something doesn't add up — a number in the summary contradicts a number in the appendix. Neither is highlighted. You could ask the client (slow, embarrassing), or just pick one and move on.",
        stat: { label: "Real inconsistency", tone: "bad" },
        choices: ["Email the client contact — 'quick clarification'", "Pick the more conservative number, footnote your assumption", "Pick the more favourable number, move on, don't flag it"],
        tones: ["good", "good", "bad"], minutes: [20, 10, 3] },
      { time: "2:00 PM",
        scene: "In the meeting (you got in), someone senior confidently states a fact that changes the whole conclusion — and you know it's wrong. Nobody else has spoken up.",
        stat: { label: "Speak or stay quiet", tone: "neutral" },
        choices: ["Politely correct them right now, with the specific source", "Message them 1:1 after the meeting, gently", "Stay silent — this isn't your call, above your level"],
        tones: ["good", "good", "bad"], minutes: [8, 12, 0] },
      { time: "3:15 PM",
        scene: "Post-meeting, your boss asks you to draft the follow-up email to the client. She'll review before it goes out. She has 6 other things on her plate today and reviews are slow.",
        stat: { label: "Draft your voice", tone: "neutral" },
        choices: ["Draft in her voice — she'll approve faster, less back-and-forth", "Draft in your best professional voice, let her edit", "Draft 3 versions with different tones, ask her to pick"],
        tones: ["good", "good", "bad"], minutes: [40, 30, 70] },
      { time: "4:30 PM",
        scene: "You spot a big risk in the plan that nobody's raised. Flagging it will delay everything by 3 days. Not flagging it might blow up in 3 weeks and be much worse.",
        stat: { label: "Now or later?", tone: "bad" },
        choices: ["Flag it — a 3-day delay beats a 3-week disaster", "Note it in a personal doc, leave the team alone", "Discuss with one trusted peer first before deciding to raise it"],
        tones: ["good", "bad", "good"], minutes: [25, 8, 20] },
      { time: "5:45 PM",
        scene: "The client contact replies with the clarification — and it changes your recommendation entirely. Your existing draft is now half wrong. You have 90 minutes.",
        stat: { label: "Reset the memo", tone: "bad" },
        choices: ["Rewrite from the new numbers, don't force old conclusions", "Adjust the numbers, keep the structure, save time", "Push the deadline back to tomorrow morning"],
        tones: ["good", "neutral", "neutral"], minutes: [75, 30, 10] },
      { time: "7:15 PM",
        scene: "You're at 85%. A friend messages: 'dinner at 8 — you in?' Your boss hasn't confirmed whether she needs more from you tonight after her review.",
        stat: { label: "Waiting on your boss", tone: "neutral" },
        choices: ["Push through, send by 8, then decide about dinner", "'Trying to make it — will confirm by 7:45.'", "Cancel dinner up front — tonight is not the night"],
        tones: ["good", "good", "neutral"], minutes: [50, 45, 10] },
      { time: "8:40 PM",
        scene: "Boss sends back 12 comments. 3 need real thinking. 9 are formatting — font, spacing, one comma. She wants v2 tonight.",
        stat: { label: "12 comments", tone: "bad" },
        choices: ["Do the 3 real ones first, formatting second — protect the thinking", "Do all 12 in order, don't argue", "Push back on the formatting — 'happy to do these tomorrow morning'"],
        tones: ["good", "good", "neutral"], minutes: [55, 70, 15] },
      { time: "10:30 PM",
        scene: "You send v2. Boss replies 'Thanks.' No feedback beyond that. You order DoorDash. Tomorrow starts at 8 AM. This job is a marathon and today was 15 miles.",
        stat: { label: "Day done", tone: "neutral" }, choices: [], tones: [] }
    ]
  },
  "Tech & Science": {
    intro: (label) => `A real day as a ${label}. Deep work day, a small team, a real deliverable, and something is probably going to break.`,
    scenes: [
      { time: "9:15 AM",
        scene: "You open your laptop. Two things wait: one deep problem that needs 4+ uninterrupted hours, and a Slack channel filling up with small questions and pings. Your calendar is empty. Nobody will protect your focus but you.",
        stat: { label: "Focus vs. noise", tone: "neutral" },
        choices: ["Mute Slack, block 4 hours, tell the team you're focusing", "Answer everyone quickly first, then focus for the rest of the day", "Alternate — 25 min focused, 5 min Slack, repeat"],
        tones: ["good", "neutral", "bad"], minutes: [10, 60, 45] },
      { time: "10:30 AM",
        scene: "You hit a hard technical problem. Two hours in, no progress. The obvious solution is ugly and slightly wrong — it'll work today but it'll bite someone in three months.",
        stat: { label: "Stuck", tone: "bad" },
        choices: ["Sit with it another hour — the right answer is close", "Ship the ugly fix now, file a note to fix it properly", "Ask a smarter colleague for a focused 15 minutes"],
        tones: ["good", "neutral", "good"], minutes: [60, 15, 20] },
      { time: "12:00 PM",
        scene: "You solved it — the right way, in 45 focused minutes. You feel great. Now the day feels like it just started.",
        stat: { label: "Small high", tone: "good" },
        choices: ["Document how you solved it before you forget — save the next person the pain", "Move straight to the next task, momentum matters", "Take a 15-minute break, then write it up"],
        tones: ["good", "neutral", "good"], minutes: [30, 2, 25] },
      { time: "1:00 PM",
        scene: "Your manager asks for a status update on a project you thought was on hold. Turns out expectations changed two weeks ago and nobody explicitly told you. She's mildly annoyed.",
        stat: { label: "Expectations mismatch", tone: "bad" },
        choices: ["Clarify politely: 'I had it on hold — here's what I can deliver by Friday'", "Just apologize and catch up over the weekend", "Push back: 'nobody told me' — technically true, professionally weak"],
        tones: ["good", "bad", "neutral"], minutes: [15, 60, 5] },
      { time: "2:15 PM",
        scene: "You find a bug in a system that isn't yours. It's serious — nobody has reported it, but under a certain input it will produce silently wrong output. Fixing it will take a day. Nobody asked you to.",
        stat: { label: "Not your area", tone: "neutral" },
        choices: ["Recreate it cleanly, write it up, send the owner exact steps to hit it", "Fix it yourself. Someone has to.", "Ignore it — not your problem, not your team"],
        tones: ["good", "good", "bad"], minutes: [45, 90, 0] },
      { time: "3:30 PM",
        scene: "A colleague sends you 400 lines of their code to check over. The approach is fine, but 6 small things could be much cleaner. Reading it properly = 45 minutes. A quick 'looks good' = 3 minutes.",
        stat: { label: "Craft vs. speed", tone: "neutral" },
        choices: ["Fully review, comment specifically on all 6 things", "Review the top 2 issues, ship approval", "Approve quickly — you trust the person"],
        tones: ["good", "good", "bad"], minutes: [50, 15, 3] },
      { time: "4:45 PM",
        scene: "The marketing lead walks over: 'quick question — can you just move a button in the app?' In your world, moving that button needs 3 sign-offs and might break how you measure everything.",
        stat: { label: "Trivial to them, real to you", tone: "neutral" },
        choices: ["Explain the actual work involved patiently, offer a lightweight alternative", "'Yes, sure' — do it quickly, don't loop in the team", "'Put it in a request, like everyone else' — protect the queue"],
        tones: ["good", "bad", "good"], minutes: [20, 25, 4] },
      { time: "6:00 PM",
        scene: "The thing you built works, but you're not fully sure it's right. You could ship now, or spend 2 more hours on the weird cases that might break it — blank inputs, huge numbers, no internet.",
        stat: { label: "Craft vs. done", tone: "neutral" },
        choices: ["Test the edge cases — quality is cheaper before ship, expensive after", "Ship it. Iterate if it breaks.", "Ship the safe part, keep the risky part behind a switch you can flip off remotely"],
        tones: ["good", "neutral", "good"], minutes: [60, 5, 30] },
      { time: "7:30 PM",
        scene: "At 8 PM you're on call — the one who gets woken up if the live app breaks tonight. You could stop now, or squeeze in one more change before risky pushes are off-limits.",
        stat: { label: "One more thing?", tone: "neutral" },
        choices: ["Stop now — no risky pushes right before on-call", "One small tested change, then stop", "Push the last change, ship it, celebrate"],
        tones: ["good", "neutral", "bad"], minutes: [0, 25, 40] },
      { time: "9:45 PM",
        scene: "Your phone alerts: something in the live app is broken. Not your part — but you're on call for the whole team tonight. 15 minutes to respond before your manager gets pulled in.",
        stat: { label: "First page", tone: "bad" },
        choices: ["Take it, open the team's guide for known problems, follow the steps calmly", "Take it, ask the team that owns that part: 'yours or mine?'", "Wait 10 minutes, hope it clears on its own"],
        tones: ["good", "good", "bad"], minutes: [25, 12, 10] },
      { time: "11:00 PM",
        scene: "Sorted — another team's system had a hiccup, not really your problem. You wrap up notes for tomorrow. What you built today didn't exist this morning. Nobody said thank you. That has to be enough some days.",
        stat: { label: "Made a thing", tone: "good" }, choices: [], tones: [] }
    ]
  },
  "People & Impact": {
    intro: (label) => `A real day as a ${label}. High-empathy day, tough conversations, someone's outcome depends on you, and no version of this is measured in a spreadsheet.`,
    scenes: [
      { time: "8:30 AM",
        scene: "You walk in. Someone is already waiting for you. They look nervous. You have 15 minutes before your first scheduled thing and they clearly weren't in your calendar.",
        stat: { label: "Unplanned ask", tone: "neutral" },
        choices: ["Give them your full attention now, adjust the rest of your day", "'Give me 20 minutes — I'll come find you'", "Multitask — listen while you set up your day"],
        tones: ["good", "neutral", "bad"], minutes: [30, 25, 10] },
      { time: "9:45 AM",
        scene: "In the middle of the conversation you realize you don't actually know the answer to something they need. Admitting it could damage trust. Making something up will bite you (and them) later.",
        stat: { label: "Credibility on the line", tone: "bad" },
        choices: ["Say 'I don't know — I'll find out by end of day' and mean it", "Give a confident-sounding guess", "Redirect them to someone else who might know"],
        tones: ["good", "bad", "neutral"], minutes: [25, 3, 5] },
      { time: "11:00 AM",
        scene: "Group session. Two people in the room disagree strongly, tensions are rising, one is more junior and getting talked over.",
        stat: { label: "Group dynamics", tone: "neutral" },
        choices: ["Pause the argument, explicitly ask the quieter person 'what do you think?'", "Let it play out — adults, they'll figure it out", "Interject with your own opinion to shift the frame"],
        tones: ["good", "bad", "neutral"], minutes: [10, 5, 6] },
      { time: "12:30 PM",
        scene: "Someone reacts emotionally to something you had to tell them. They're not angry at you personally — they're just upset, and you're the person who's in front of them.",
        stat: { label: "Hold the space", tone: "neutral" },
        choices: ["Sit with them quietly, don't rush the moment", "Try to fix it fast — offer solutions", "Give them privacy, tell them you'll come back in 20 minutes"],
        tones: ["good", "bad", "neutral"], minutes: [20, 12, 5] },
      { time: "1:30 PM",
        scene: "You have 30 minutes before your next thing. You planned to eat. Instead you notice a colleague working through lunch, red-eyed, obviously not okay.",
        stat: { label: "Your lunch or theirs", tone: "neutral" },
        choices: ["Sit down next to them, ask how they're doing, eat together", "Give them privacy — the last thing they want is attention", "Send a quiet 'how are you' message from your desk"],
        tones: ["good", "neutral", "good"], minutes: [30, 2, 3] },
      { time: "2:30 PM",
        scene: "A colleague privately asks you to cover for something they got wrong — 'just say I was in the meeting.' It's not a huge deal, but it is a small lie.",
        stat: { label: "Loyalty vs. honesty", tone: "neutral" },
        choices: ["Refuse gently — 'help them own it, I'll help them draft the apology instead'", "Cover — friends first, small stakes", "Stay out of it, don't answer directly"],
        tones: ["good", "bad", "neutral"], minutes: [25, 10, 3] },
      { time: "3:45 PM",
        scene: "Someone you helped weeks ago comes back to say thank you — properly, in person. Not because they had to. You could rush to your next thing or let this moment breathe.",
        stat: { label: "Rare pause", tone: "good" },
        choices: ["Sit with them for 5 minutes, actually hear it — this is why the work exists", "Thank them briefly, get back to the day", "'Not now — thank you though, we'll catch up soon'"],
        tones: ["good", "neutral", "bad"], minutes: [8, 2, 1] },
      { time: "4:30 PM",
        scene: "Bureaucratic paperwork. A form, a report, a compliance thing. It'll take 45 minutes and it's due today. Nobody but you will ever read it.",
        stat: { label: "Paper-shuffling", tone: "bad" },
        choices: ["Just do it — the alternative is doing it later plus a follow-up email", "Half-fill it, submit, hope for the best", "Skip it — 'urgent client thing came up' — deal with it Monday"],
        tones: ["good", "bad", "bad"], minutes: [25, 8, 2] },
      { time: "5:30 PM",
        scene: "You've been 'on' for other people all day. You're drained. Someone else stops by and needs 30 more minutes.",
        stat: { label: "Empty tank", tone: "bad" },
        choices: ["Give the 30 minutes — this is what the work is, on the days it's hard", "Be honest — 'I'm tapped out today, can we do this first thing tomorrow?'", "Give 10 focused minutes, close it out"],
        tones: ["neutral", "good", "neutral"], minutes: [35, 6, 12] },
      { time: "6:45 PM",
        scene: "You wrap the day's scheduled work. Then you notice one loose end — a follow-up call you promised someone yesterday and haven't made. It's after hours. It can wait until tomorrow. But you said today.",
        stat: { label: "Promise vs. energy", tone: "neutral" },
        choices: ["Make the call now — you said you would", "Text them tonight: 'I owe you a proper call — tomorrow morning?'", "Let it slide, address tomorrow, they'll forget"],
        tones: ["good", "good", "bad"], minutes: [20, 4, 0] },
      { time: "8:15 PM",
        scene: "You get home. Someone specific was helped today because of you. You'll never fully know how much. You carry a small piece of their day into your evening. That's the whole job in one sentence.",
        stat: { label: "Day done", tone: "good" }, choices: [], tones: [] }
    ]
  },
  "Creative": {
    intro: (label) => `A real day as a ${label}. Mid-project, deadline coming, taste is on the line, and you have a client who thinks 'make it pop' is direction.`,
    scenes: [
      { time: "9:30 AM",
        scene: "You start the day looking at yesterday's work. It's fine. But 'fine' is the enemy. There's a version that's actually good — you just don't know what it is yet.",
        stat: { label: "Fine or good?", tone: "neutral" },
        choices: ["Refine it — 'good' is often one step from 'great,' if you can see it", "Scrap it, start fresh with a bolder idea", "Ship it — 'fine' meets the brief, save your energy"],
        tones: ["good", "good", "bad"], minutes: [45, 90, 5] },
      { time: "10:30 AM",
        scene: "Three pieces of work you admire are sitting open in your browser. You're intimidated. Yours looks worse next to them. The temptation is to copy.",
        stat: { label: "Reference trap", tone: "neutral" },
        choices: ["Close the tabs — trust your own eye, come back to them later", "Work out why each one works, borrow the thinking not the look", "Copy the best one outright, change it from there"],
        tones: ["good", "good", "bad"], minutes: [5, 35, 15] },
      { time: "12:00 PM",
        scene: "A client gives feedback that's clearly wrong. It would make the work worse. But they're the client, they're paying, and pushing back has a cost.",
        stat: { label: "Push back?", tone: "bad" },
        choices: ["Push back with specific reasoning, offer two alternatives that keep the intent", "Just do what they said, save the fight for something bigger", "Half-do it, hope they don't notice"],
        tones: ["good", "neutral", "bad"], minutes: [30, 15, 20] },
      { time: "1:30 PM",
        scene: "Lunch. Alone. You could scroll social media (comparing your work to strangers' greatest hits) or read something that has nothing to do with your craft.",
        stat: { label: "Input matters", tone: "neutral" },
        choices: ["Read a book or an article — new inputs feed the work", "Scroll strangers' work briefly, then close it", "Scroll — you'll rest your brain"],
        tones: ["good", "neutral", "bad"], minutes: [40, 15, 35] },
      { time: "2:30 PM",
        scene: "You get stuck. The idea in your head won't come out right in the actual work. You've stared at it for an hour.",
        stat: { label: "Creative block", tone: "bad" },
        choices: ["Step away — walk, coffee, reset. Your brain will keep working in the background.", "Force it — keep going until it breaks the block", "Show it to someone you trust for a fresh gut check"],
        tones: ["good", "bad", "good"], minutes: [25, 60, 15] },
      { time: "3:45 PM",
        scene: "A newer colleague shows you their work-in-progress. It's not there yet — you can see three specific things missing. They're clearly hoping for validation.",
        stat: { label: "Honest vs. kind", tone: "neutral" },
        choices: ["Be specific and honest, kindly. 'Here's what's working, here's what isn't yet.'", "'Looks great' — spare their feelings", "Ask them first: 'what do you think isn't working yet?' — turn it into their own critique"],
        tones: ["good", "bad", "good"], minutes: [15, 3, 12] },
      { time: "5:00 PM",
        scene: "A revision request comes back from the client. This is the fourth round. Objectively, round 2 was better than round 4. They've talked themselves in circles.",
        stat: { label: "Diplomatic honesty", tone: "bad" },
        choices: ["Present rounds 2 and 4 side by side, ask them to choose — data over opinion", "Do round 5 as asked, save your energy", "Quietly hand back a tidied-up version of round 2, don't mention it"],
        tones: ["good", "neutral", "neutral"], minutes: [25, 60, 20] },
      { time: "6:15 PM",
        scene: "Your project manager asks you to 'quickly show progress' in a meeting tomorrow. Showing half-baked work is risky. Skipping the meeting looks bad.",
        stat: { label: "Show or don't", tone: "neutral" },
        choices: ["Show one specific piece you're happy with, tightly framed, ask specific feedback", "Show a broad progress overview, no work", "Skip the meeting — 'deep in the work, will send an update'"],
        tones: ["good", "neutral", "bad"], minutes: [30, 20, 2] },
      { time: "7:00 PM",
        scene: "The work is close. One more push and it'll be right. Everyone else has left the studio. Nobody will know if you cut this corner.",
        stat: { label: "Standards test", tone: "neutral" },
        choices: ["Do the push. You'll know.", "Cut the corner — good enough", "Do part of it, note the rest as 'v2' for tomorrow"],
        tones: ["good", "bad", "neutral"], minutes: [50, 5, 25] },
      { time: "9:00 PM",
        scene: "Wrapping up. You look at what you made today next to what you made a year ago. Same job, better craft. You didn't feel yourself getting better in real time. But it's there in the work.",
        stat: { label: "Skill compounding", tone: "good" },
        choices: ["Save one specific improvement to a personal 'growth' folder — you'll want it next year", "Just close the laptop, tomorrow is another day", "Post the work — the world should see it"],
        tones: ["good", "good", "neutral"], minutes: [10, 0, 20] },
      { time: "10:45 PM",
        scene: "You finish. It's not perfect. But it's yours. Tomorrow someone will critique it, someone else will love it, and you'll critique it too. Tonight, you look at it and know you didn't cheat the work.",
        stat: { label: "Made", tone: "good" }, choices: [], tones: [] }
    ]
  }
};

// Verdict content per career
const CAREER_INSIGHTS = {
  ib: {
    reality: "Hours are brutal — 80-100 per week for 2-3 years. Pay starts at $110-150K plus bonus, $500K-1M by VP level. Path: analyst → associate → VP → MD. Most people quit after 2 years and move to private equity, hedge funds, or startups. It's a golden ticket, but the ticket costs your 20s.",
    fitFor: "someone genuinely obsessed with money, prestige, and being in the room where big decisions happen — who thrives on stress and can grind 80-hour weeks in their 20s without cracking.",
    energized: ["Being in the room where huge deals close", "High-stakes deadline pressure", "Making big-number decisions with real consequences", "The precision of a clean model", "Getting a 'good work' from a partner", "Fast learning by osmosis from senior bankers"],
    drained: ["Zero control over your evenings and weekends", "Endless minor formatting on decks", "Political games with senior bankers", "Cancelling every plan you make", "Feeling replaceable for the first 2 years", "Watching your health quietly deteriorate"],
    dos: [
      "Get exceptionally good at Excel and PowerPoint — it's your job",
      "Always double-check numbers, then check them again — a wrong number kills your reputation",
      "Be responsive on chat, even at 11 PM — visibility matters here",
      "Build a real network with your analyst class — they'll be your professional peers for 20 years",
      "Save aggressively in the first two years — your future self needs the runway to quit"
    ],
    donts: [
      "Never say 'that's not my job' — in IB, everything is your job",
      "Don't hide mistakes — they always surface, and hiding them is what actually ends careers",
      "Don't overpromise on turnarounds you can't deliver — better to say 8 AM tomorrow than 11 PM tonight and miss",
      "Don't compare yourself publicly to your peers — the ranking system will do that for you",
      "Don't burn bridges when you leave — the industry is small and everyone remembers"
    ]
  },
  swe: {
    reality: "Best entry-level pay in tech: $150-250K total comp at top companies (FAANG and up). Real work is 40-50 hours/week, mostly reading and debugging existing code rather than writing new stuff. Path: engineer → senior → staff → principal, or move into tech-lead / engineering management. Skills compound faster here than in most careers.",
    fitFor: "someone who can sit with a hard problem for hours, doesn't need constant human interaction, and gets a real kick from making something work exactly the way they intended.",
    energized: ["The moment code finally runs correctly", "Quiet deep-focus stretches", "Learning new systems from the inside", "Elegant abstractions clicking into place", "Fixing a bug nobody else could find", "Shipping something users actually use"],
    drained: ["Debugging someone else's messy legacy code", "Meetings that should have been Slack messages", "3 AM on-call pages", "Being told to 'just add AI' by product folks", "Long code reviews on tiny changes", "Explaining the same technical constraint to non-technical people repeatedly"],
    dos: [
      "Read code more than you write it — most of your job is understanding what already exists",
      "Write tests (small automated checks) even when nobody asks — future-you will thank you",
      "Communicate proactively — an update every few days beats a surprise slip",
      "Learn one thing deeply per quarter, not five things shallowly",
      "Own your bugs publicly — 'I broke it, I'll fix it' builds more trust than clever excuses"
    ],
    donts: [
      "Don't over-engineer — the simplest solution that works is almost always the right one",
      "Don't skip code reviews to look busy — reviewing well is high-leverage work",
      "Don't work on obviously the wrong thing just because it was assigned — flag it, then either fix scope or execute",
      "Don't ignore incidents just because they're 'not your service' — the on-call rotation is a team promise",
      "Don't measure yourself in lines of code — measure yourself in problems solved"
    ]
  },
  astro: {
    reality: "The long road: a physics degree, then 5-6 years of a PhD (paid roughly $30-40K a year), then 3-6 more years of short research jobs, moving city or country each time. Permanent university jobs are rare — often 100+ applicants each. Those who get one earn $80-150K. Many leave for data or software work, where the same skills pay 2-3x. You do it because the questions won't let you go.",
    fitFor: "someone who can stay with one question for years without a clear answer, loves the maths behind the pretty pictures, and would rather be right slowly than famous quickly.",
    energized: ["Being the first person to see something", "A messy pile of data finally making sense", "Nights on a mountain or a telescope screen", "Arguing about ideas with people smarter than you", "Explaining space to people who light up", "Questions that are bigger than your career"],
    drained: ["Years of short contracts and moving countries", "Watching friends earn triple in tech", "Writing funding applications that mostly get rejected", "Clouds killing a night you waited six months for", "Results that take a decade to confirm", "Fixing other people's broken code at 2 AM"],
    dos: [
      "Get genuinely good at coding and statistics — that's most of the actual job, not the telescope",
      "Write things down the same night, while you still remember why you did it that way",
      "Check your own setup before you announce a discovery — it's usually the setup",
      "Say yes to sharing work with other teams — space is too big to be territorial",
      "Build a backup skill you'd be happy using, because the permanent jobs are few"
    ],
    donts: [
      "Don't fall in love with a result before you've tried to prove it wrong",
      "Don't hide a mistake in your data — someone will rerun it, and they always do",
      "Don't measure yourself against the one person in your year who got famous",
      "Don't treat public talks as a chore — they're how the funding and the next generation happen",
      "Don't stay in a group where nobody has time to teach you — the first years decide the rest"
    ]
  },
  doctor: {
    reality: "4 years of undergrad + 4 years of med school + 3-7 years of residency. Residency means 80+ hour weeks for modest pay ($60-75K per year). Real specialist income ($250-500K, higher in some specialties) doesn't hit until early 30s. Med-school debt is significant. High burnout, high divorce rate — but real, direct, life-altering impact and lifelong respect.",
    fitFor: "someone with unshakeable focus under pressure, deep empathy, and the emotional stamina to keep caring even when patients don't get better and their families are hurting.",
    energized: ["Actually helping someone in real pain", "Solving a hard diagnostic puzzle", "The trust patients place in you", "A patient walking out better than they came in", "Teaching juniors what you learned the hard way", "A clean, correct procedure that goes exactly right"],
    drained: ["Bureaucratic paperwork and hospital politics", "Losing patients you couldn't save", "Years of low pay while non-medical friends earn 3x", "Sleep-deprived clinical judgement", "Families that don't listen or blame you unfairly", "The emotional cost of holding hard news"],
    dos: [
      "Take clinical notes seriously — they're the record if something goes wrong",
      "Learn to explain complex diagnoses in plain everyday words",
      "Sleep whenever you can, even 20 minutes — fatigue is a clinical error",
      "Escalate early when a case is beyond your level — nobody rewards heroism that ends badly",
      "Build a specialist skill your peers don't have — that's how you charge more later"
    ],
    donts: [
      "Never fake certainty when you don't know — patients trust honesty more than confidence",
      "Don't break protocol without a very good reason and documenting it clearly",
      "Don't take patient outcomes personally — you can do everything right and still lose",
      "Don't skip your own health — the burnout rate in this profession is real and specific",
      "Don't let a colleague push a patient's care off on you without formal handoff"
    ]
  },
  founder: {
    reality: "9 out of 10 startups fail. If yours works, you might make $10-100M+ over a decade. If it doesn't, you're older with a resume that says 'founder' — which reads great to some employers and weird to others. Path: idea → validate → build → sell → raise → hire → grow → sell/IPO/die. No safety net, no boss, no default paycheck.",
    fitFor: "someone who genuinely cannot stop building things, who enjoys uncertainty, doesn't need external permission to act, and can hear 'no' 500 times without losing conviction.",
    energized: ["Owning the whole thing — success and failure", "Fast decisions with no committees", "Building something from nothing", "A user saying your product changed their life", "Hiring someone who's better than you", "Closing a customer you fought for"],
    drained: ["Constant financial stress and runway math", "Being publicly wrong on Twitter", "Firing people you actually like", "Investors who ghosts after 'looks interesting'", "Selling every day, even when you hate selling", "The emotional whiplash of good day / bad day / good day"],
    dos: [
      "Talk to users constantly — every week, at minimum 3 conversations, in weeks 1 through 500",
      "Track your runway (months of money left) obsessively — it's the only truly non-negotiable number",
      "Hire slow, fire fast — every senior founder says this and it's still hard to actually do",
      "Ship, measure, iterate — perfectionism kills startups faster than bad product",
      "Be honest with your team about the state of the company — they'll figure it out anyway"
    ],
    donts: [
      "Don't take investor money you don't need — every dollar is a tightening obligation",
      "Don't chase trends (AI, crypto, whatever's hot) unless it's genuinely on your roadmap",
      "Don't hide bad news from the board — surprises kill investor trust permanently",
      "Don't build in secret for a year — get real users on ugly v1 as fast as you can",
      "Don't confuse press/awards/social media with actual traction — vanity metrics are seductive"
    ]
  },
  marketing: {
    reality: "Entry-level pay: $60-90K. Grows fast if you produce hits ($150-300K by senior marketer, $400K+ as CMO). 40-50 hour weeks in normal orgs, chaotic in startups and around launches. The best marketers eventually own P&L (Profit and Loss — the actual business results), not just campaigns.",
    fitFor: "someone who can hold both a creative vision and a data spreadsheet at the same time, and loves reading people's psychology to figure out why they actually buy.",
    energized: ["Watching a campaign go viral", "Testing a wild creative idea and having it work", "Understanding exactly why people bought", "A customer message that says 'your ad made me buy'", "Killing a bad campaign with clean data", "Nailing brand voice on a launch"],
    drained: ["Endless minor tweaks to ad copy", "Getting blamed when sales miss for any reason", "Trend-chasing forever — 'we need a TikTok strategy'", "Agency politics and reshoot budgets", "Reporting to leadership who don't understand what actually drove sales", "Watching a great creative die because of a broken landing page"],
    dos: [
      "Own the numbers — return on ad spend, cost to get a customer, lifetime value — don't hand-wave the math",
      "Kill underperforming campaigns fast — sunk cost is the marketer's kryptonite",
      "Talk to customers, not just look at dashboards — dashboards lie in specific ways",
      "Write ad copy that sounds like a human, not a corporate press release",
      "Build a portfolio of hits you can point to when you interview for the next job"
    ],
    donts: [
      "Don't chase every platform trend — pick the 2 that fit your customer and go deep",
      "Don't be defensive when creative gets killed — the data is the data",
      "Don't ship risky angles (political, cultural) without stress-testing them with real users first",
      "Don't measure success by impressions alone — impressions don't pay salaries",
      "Don't build a team that only says yes — you'll ship worse work"
    ]
  },
  teacher: {
    reality: "Starting salary: $45-60K (public schools; higher in cities and top private schools; pension + summers off in most public districts). Real income growth is slow ($70-90K even at senior level). Balance is great during term, brutal during exam season and admissions. Emotional labor is huge and mostly invisible on payslips.",
    fitFor: "someone who lights up when a struggling student finally 'gets it,' has patience to explain the same idea five different ways without frustration, and measures success in impact rather than salary.",
    energized: ["When a struggling student's face changes as they understand", "Being genuinely remembered by students 10 years later", "Long summer and winter breaks", "The rhythm of teaching a topic well after several iterations", "Watching a shy kid stand up and present", "A kid choosing your subject for their college major because of your class"],
    drained: ["Grading 40 essentially identical papers", "Parents who don't listen and blame you for their child's marks", "Low pay relative to your effort and hours", "Administrative bureaucracy and reporting", "The one kid in every class you can't reach", "Being expected to be everything (counsellor, guardian, disciplinarian) with no support"],
    dos: [
      "Learn every student's name in the first two weeks — being seen changes performance",
      "Build a bank of examples for every concept — repeat is the medium, not a failure",
      "Push back on unreasonable grading changes — your credibility is your currency long-term",
      "Save the 'thank you' emails and messages — you'll need them in dark weeks",
      "Protect your evenings ferociously — teaching is a marathon, not a sprint week"
    ],
    donts: [
      "Don't humiliate students publicly to make an example — it's the fastest way to lose the room",
      "Don't grade during your kid's football game (or equivalent) — you'll do neither well",
      "Don't take a colleague's or parent's frustration personally when it's really about their own kid",
      "Don't skip lesson prep because you 'know the material' — the material is not the lesson",
      "Don't ignore your own child's teacher parent meetings because you're teaching — set the boundary"
    ]
  },
  consult: {
    reality: "Entry pay at MBB (McKinsey/Bain/BCG): $110-125K base + bonus, rising fast. Path: analyst → consultant → manager → partner. You'll travel 3-4 days per week to client sites, make slides for a living, and get exit options into almost any industry after 2-3 years.",
    fitFor: "someone who can quickly get up to speed on unfamiliar industries, is comfortable presenting to senior executives at 25, and likes solving structured problems more than building something long-term.",
    energized: ["Cracking a hard business problem from scratch", "Learning a new industry in a week", "Presenting to a CEO who takes your recommendation", "Diverse project types every few months", "Sharp, ambitious peers", "Exit options into almost anything"],
    drained: ["Sunday-night flights, Thursday-night flights, every week", "Client politics you can't influence", "Slides that need one more revision, forever", "Being an outsider on every team", "Recommendations that get politely ignored", "The performative side of consulting culture"],
    dos: [
      "Get exceptional at structuring ambiguous problems on a blank whiteboard",
      "Build strong relationships with your case teams — they'll write your reviews",
      "Own the answer, not the process — clients pay for insights, not frameworks",
      "Say the uncomfortable thing in client meetings when it matters — that's the value-add",
      "Use every case to build one deep functional skill you can carry into your next role"
    ],
    donts: [
      "Don't hide behind frameworks when you don't know the answer — clients smell it",
      "Don't overpromise to clients — the delivery falls on your team",
      "Don't skip travel time recovery — the burnout is real and gradual",
      "Don't take internal feedback personally — the up-or-out system is a machine, not a judgement",
      "Don't stay 5+ years unless partner is the actual goal — the exit value plateaus"
    ]
  },
  quant: {
    reality: "Entry pay at top quant firms: $200-500K first year all-in. Path: junior researcher/trader → senior → PM (portfolio manager). Work is heavily code and math, minimal client contact, extreme intellectual difficulty, and directly tied to P&L.",
    fitFor: "someone with deep math intuition, comfort with probability and uncertainty, and the emotional discipline to not blow up when a good bet loses money.",
    energized: ["A strategy backtesting well and holding up live", "The purity of numbers vs. politics", "Working with people who genuinely think in probabilities", "A profit day where you understood exactly why it worked", "Elegant statistical or ML insights", "Compensation directly tied to your performance"],
    drained: ["Losing days you did nothing wrong on", "Watching a beautiful strategy get arbitraged (copied) away", "Regulatory paperwork", "The isolation of pure quant desks", "Explaining what you do to non-quants at family dinners", "The pressure of live money on your ideas"],
    dos: [
      "Master statistics and probability at the intuitive level, not just formulas",
      "Build a research process you can defend to skeptical colleagues",
      "Track your P&L honestly and post-mortem losing days ruthlessly",
      "Learn one language really well (Python or C++) and use it for real, not just notebooks",
      "Read papers weekly — the field moves fast"
    ],
    donts: [
      "Don't overfit — a strategy that fits history perfectly usually fails live",
      "Don't chase the last winning trade — momentum bias will bleed you slowly",
      "Don't scale up a strategy right after it starts working — that's when it fails",
      "Don't hide losses — every quant firm's culture rewards honest post-mortems",
      "Don't skip risk management for a 'high conviction' trade"
    ]
  },
  pm: {
    reality: "Entry-level PM roles are competitive and often require 2-3 years of prior industry experience. Pay: $130-200K at product startups/tech, more at senior levels. You'll never write the code, design the UI, or ship the ad — but you're accountable for whether the product is good.",
    fitFor: "someone who genuinely loves users and can hold conflicting stakeholder inputs in their head at once — engineering wants scope small, design wants scope quality, sales wants scope wide.",
    energized: ["A feature you shipped that users love", "Turning a fuzzy problem into a shipped solution", "Watching a team execute a well-scoped roadmap", "User research sessions with real customers", "Aligning conflicting stakeholders into one decision", "Data confirming a hypothesis you had"],
    drained: ["Meetings, all day, every day", "Being blamed for delays you didn't cause", "Endless prioritization arguments", "Executives who change strategy every quarter", "Producing PRDs (product requirement docs) nobody reads", "Being the person with no direct authority over anyone"],
    dos: [
      "Talk to users every week — nothing replaces this",
      "Say no to features 90% of the time — good PMs are known for what they cut",
      "Write short, sharp PRDs — long docs are usually a substitute for clear thinking",
      "Own the metric — 'the north star,' not the shipped list",
      "Give credit publicly to your engineers and designers — they did the work"
    ],
    donts: [
      "Don't design the UI yourself — trust your designer",
      "Don't estimate engineering — trust your engineers",
      "Don't play political games in exec review meetings — they read as weak",
      "Don't accept vague success criteria from execs — pin them down before you start",
      "Don't ship features to hit deadlines when the feature isn't ready — you'll pay for it in support tickets"
    ]
  },
  ml: {
    reality: "Fastest-growing salaries in tech ($180-400K at 2-5 years, $500K-1M+ at senior/staff level, higher at top AI labs). Work is 70% data cleaning, 20% model training, 10% deploying. Path: ML engineer → senior → staff → research scientist / applied lead. AI is genuinely reshaping this field year to year.",
    fitFor: "someone who's comfortable with ambiguity, loves probability and statistics, and can debug both code and reasoning at the same time.",
    energized: ["A model beating the baseline meaningfully", "Reading a fresh research paper that changes your approach", "Debugging a training run that finally converges", "Deploying a system that noticeably improves user experience", "The pace of the field — genuinely new stuff every month", "Talented, curious peers"],
    drained: ["Data cleaning that takes 6 weeks and feels like nothing", "Training runs that fail overnight", "Explaining 'no, we can't just fine-tune GPT for that' for the 20th time", "GPU shortages and cost anxieties", "Regulatory conversations you're not equipped for", "The gap between paper accuracy and production reality"],
    dos: [
      "Master the fundamentals (linear algebra, probability) — the field will keep shifting on top of them",
      "Reproduce results before trusting them — even famous papers have subtle bugs",
      "Build end-to-end (data → model → deployed) at least once, even if crappy",
      "Instrument your models in production — model quality drifts over time",
      "Keep a running notes file of what you tried and why — you'll re-derive it otherwise"
    ],
    donts: [
      "Don't use a huge model when a small one works — cost adds up fast",
      "Don't skip evaluation — a model without a real metric is a demo, not a product",
      "Don't hype your work — the field is mature enough to spot inflated claims",
      "Don't ignore data quality — model tricks can't fix bad training data",
      "Don't ship without an offline eval set (a held-out benchmark you actually trust)"
    ]
  },
  designer: {
    reality: "Entry-level pay: $90-140K, higher at product startups and top tech. Path: designer → senior → staff / design lead, or move into UX research or product management. Portfolio matters far more than a degree.",
    fitFor: "someone with strong visual taste, patience for feedback cycles, and the ability to translate a product manager's fuzzy problem into a specific screen a user can use.",
    energized: ["A prototype that immediately feels right", "User testing sessions with real users", "A crit (design critique) that improves the work", "Fixing a UX problem that engineers thought was a technical problem", "Building your own systems and reusable components", "A user saying 'I love this feature'"],
    drained: ["Endless minor feedback rounds ('can you make it pop?')", "Being told to design something after engineering already committed to a spec", "Justifying design decisions to non-designers", "Legacy UIs that need to stay consistent with your new work", "Slow tooling and slow file syncs", "Being seen as 'the visual person' instead of a product thinker"],
    dos: [
      "Ship real work into your portfolio, not just concept work",
      "Learn just enough front-end code to speak engineering's language",
      "Take crit publicly, defend decisions with the user in mind not your ego",
      "Sit in on user research even when it's not your feature",
      "Own the details — spacing, typography, motion — those are where designers actually distinguish themselves"
    ],
    donts: [
      "Don't gold-plate features that will get killed — pace your effort with confidence in the roadmap",
      "Don't over-explain your process in reviews — good design speaks first",
      "Don't dismiss engineering constraints as inconvenient — they're usually the shape of the actual problem",
      "Don't chase Dribbble aesthetics that don't serve real users",
      "Don't skip accessibility — 15% of users are affected"
    ]
  },
  econ: {
    reality: "PhD is common (5-6 years), Master's is minimum. Entry pay at the Fed / central banks: $80-120K, higher at IMF/World Bank/consulting. Path: research → senior researcher → policy advisor or academic. It's slow-burn intellectual work with modest pay for the credentialling required.",
    fitFor: "someone who genuinely enjoys thinking about systems and incentives at the scale of countries, has patience for years-long research cycles, and doesn't need fast feedback.",
    energized: ["A research finding that shifts how you understand a policy", "Long, deep engagement with a hard question", "Being consulted by policymakers who take your work seriously", "Debating peers who genuinely care about the ideas", "Time to think — actually think, not react", "Access to data that no one else has cleaned"],
    drained: ["Slow feedback loops (papers take years)", "Policy conversations that ignore your evidence", "The academic job market grind", "Being far from any tangible outcome", "Modest pay compared to peers who went into finance or consulting", "Bureaucratic institutional politics"],
    dos: [
      "Learn to code (Python, R, Stata) at a level where you can clean any dataset yourself",
      "Build one deep methodological skill (causal inference, macro modelling, network econ)",
      "Write clearly — bad writing kills good economics research",
      "Cultivate a network across academia, policy, and think tanks — the roles blur",
      "Care about a real question, not just publishable ones — the good work comes from the former"
    ],
    donts: [
      "Don't chase publication venues over ideas — your CV should tell a coherent story",
      "Don't overfit your models to make them 'work' — reviewers will spot it",
      "Don't dismiss policy folks who don't speak your language — they hold the levers you want to move",
      "Don't ignore under-studied datasets — the interesting questions are often hiding there",
      "Don't skip networking at conferences — economics is more relational than it looks"
    ]
  },
  law: {
    reality: "4-year undergrad + 3-year law school + bar exam. Entry pay at top corporate firms: $225K base first year, rising fast into the $300-400K range by mid-level. Life is document-review-heavy in early years, high-stakes and high-pressure at senior levels. Litigation and public-interest paths are slower and lower-paid but more independent.",
    fitFor: "someone with obsessive attention to detail, comfort with dense text, and the patience to work in a hierarchy where the first 5 years are largely paying dues.",
    energized: ["Winning a negotiation because you spotted a comma that mattered", "The precision of well-written contract language", "Working on genuinely important corporate deals", "Being the person who read the whole thing", "Complex intellectual problems", "The trust clients place in you when it counts"],
    drained: ["Sixty-hour weeks doing document review", "Client urgency at 11 PM", "Redlines (contract edits) at 2 AM before a signing", "Partner politics", "Being blamed for opposing counsel's positions", "The slow path to independence"],
    dos: [
      "Get exceptionally good at contract drafting — it's leverage forever",
      "Track your billable hours and quality separately — both matter",
      "Never miss a deadline — legal deadlines are ruthlessly enforced",
      "Learn to negotiate — many lawyers can draft but not many can close",
      "Read the actual documents fully — associates who skim get caught"
    ],
    donts: [
      "Don't give legal advice you're not qualified to give — even informally",
      "Don't fight for a bad clause your senior asked you to include — flag it clearly",
      "Don't burn bridges with opposing counsel — you'll see them again",
      "Don't complain publicly about partners — legal networks are small and gossipy",
      "Don't skip the boring documents — that's where the traps hide"
    ]
  },
  journalist: {
    reality: "Entry pay: $40-60K at major outlets, much less at smaller ones. Path: reporter → senior reporter → editor / bureau chief, or freelance/independent. The field is contracting economically but the best individual journalists have never had more direct reach.",
    fitFor: "someone with intense curiosity, willingness to knock on doors, and the emotional resilience to be told 'no comment' constantly.",
    energized: ["A source finally trusting you enough to talk", "A piece that shifts a public conversation", "The chase — following the thread of a story", "Working sources for months and closing it", "A byline you're proud of", "Real deadline pressure with a real audience"],
    drained: ["Constant financial insecurity", "Editors who kill your best angles", "Trolls after every published story", "Sources who stop trusting you", "Layoffs and shrinking newsrooms", "Being fact-checked into blandness"],
    dos: [
      "Protect your sources' anonymity absolutely — one mistake ends your career",
      "Verify twice before publishing — a wrong story costs more than a slow one",
      "Build a beat (a specific area you cover) and become the expert in it",
      "Learn to write short — most readers don't get past paragraph 3",
      "Publish work that gets attention on your own byline (a Substack, a podcast) — the outlet may not survive"
    ],
    donts: [
      "Never fabricate — even a small quote — it's the one sin that ends careers instantly",
      "Don't fall for narratives that flatter your priors — bad journalism starts here",
      "Don't publish before you've called the other side for comment",
      "Don't take PR pitches as facts — they're marketing dressed as tips",
      "Don't burn a source for a single story — sources are your capital"
    ]
  },
  director: {
    reality: "There's no salary — it's project-by-project. First feature might pay $50-100K total; a hit director makes $1-10M+ per project at senior level, plus back-end. Path: shorts → assistant director → indie feature → studio feature. Success is 40% craft, 40% relationships, 20% who you know and when.",
    fitFor: "someone with a specific point of view and the tenacity to survive years of rejection, cold pitches, and other people's failed projects on the way to their own.",
    energized: ["A scene coming together on set", "An actor finding the thing you couldn't articulate", "The edit turning material into meaning", "A film festival premiere with your audience", "A crew that trusts you", "Being the person who decides"],
    drained: ["Waiting years between films", "Money running out mid-shoot", "Producers changing your vision", "Bad festival cuts", "Being famous enough to be criticized publicly", "Endless meetings that lead nowhere"],
    dos: [
      "Direct short films constantly — cheap ways to learn",
      "Build a crew of people you trust and work with them repeatedly",
      "Watch films with a notebook — steal specific techniques",
      "Say what you actually think in creative meetings — indecisive directors get taken advantage of",
      "Own the vision — everyone else will try to compromise it"
    ],
    donts: [
      "Don't wait for permission — start making things now with what you have",
      "Don't cast for chemistry you don't see in the room",
      "Don't sign contracts without a lawyer reading them",
      "Don't be precious with your material — audiences will tell you what's working",
      "Don't chase awards over the work — the awards follow good work, not the reverse"
    ]
  },
  architect: {
    reality: "5-year B.Arch (or 4-year undergrad + 3-year M.Arch) + long internship + licensing exams. Entry pay: $55-75K (low relative to years of study). Real income comes 10+ years in when you have your own firm or become a design principal ($150-400K+). It's a slow, craft-heavy career with visible, permanent output.",
    fitFor: "someone who thinks in space, has patience for years-long projects, and can hold a design vision through the practical grinding of budgets, contractors, and codes.",
    energized: ["A building coming out of the ground looking like the drawing", "A client who trusts your judgement", "Sketching in a real quiet moment", "Solving a hard site constraint elegantly", "Physical materials (wood, stone, concrete)", "Seeing your work standing in the world 20 years later"],
    drained: ["Working overnights on a competition entry that doesn't win", "Contractors who ignore your specifications", "Clients who redesign your work themselves", "Building codes and regulatory approvals", "Low pay for the years of training", "Firms where you draw toilets for 5 years before anyone lets you design"],
    dos: [
      "Learn one CAD or 3D tool exceptionally well — Revit or Rhino for most",
      "Sketch by hand daily — it's the fastest way to think about space",
      "Visit good architecture in person — photos flatten what matters",
      "Build a portfolio of thoughtful projects, even student ones",
      "Understand construction as well as design — the two decouple in bad architects"
    ],
    donts: [
      "Don't undercharge to win projects — the market equilibrates around it",
      "Don't chase style trends — your best work is quieter than the awards think",
      "Don't dismiss clients' 'ugly' preferences — they live in it, not you",
      "Don't ignore budgets — architects who can't hit budget don't get repeat clients",
      "Don't skip site visits — drawings only get you 60% of the way"
    ]
  },
  chef: {
    reality: "Culinary school + years of low-paid line cook work before any authority. Entry pay: $30-40K a year for line cooks, senior chefs and head chefs at good restaurants earn $80-150K, top head chefs $200K+. Ownership path (your own restaurant) is high-risk. It's physical, hierarchical, brutally paced work.",
    fitFor: "someone with real physical stamina, extreme attention to detail on repetitive tasks, and the ability to keep going during a Saturday-night service when everything is on fire (sometimes literally).",
    energized: ["A perfect plate going out the pass (the counter between kitchen and floor)", "The choreography of a busy service running clean", "Developing a new dish that clicks", "The physical satisfaction of the work", "A guest sending compliments to the kitchen", "A crew that has your back on a hard night"],
    drained: ["Nights, weekends, holidays — always", "Sixteen-hour days on your feet", "Burns, cuts, chronic back pain", "Bad restaurant owners", "Being at the mercy of ingredient availability", "The gap between your food dreams and your budget"],
    dos: [
      "Master knife skills — it's the foundation everything sits on",
      "Learn to work clean — mise en place (prep in place) is 80% of professional cooking",
      "Respect the hierarchy — kitchens run on it",
      "Taste everything you make, always",
      "Cook staff meal well — the crew works harder for chefs who feed them"
    ],
    donts: [
      "Don't undertip your dishwashers — they're the reason service runs",
      "Don't get into ego fights with front-of-house — you're one restaurant, not two",
      "Don't skip prep to look busy on the line — bad prep breaks service later",
      "Don't stay at a restaurant with a toxic chef — kitchens without respect don't produce good food long-term",
      "Don't open your own restaurant on a whim — the math is unforgiving"
    ]
  }
};

const GENERIC_INSIGHTS_BY_GROUP = {
  "Business & Money": {
    reality: (label) => `As a ${label}, expect long hours, high stakes, and rooms full of people who talk fast. Pay ranges wildly but the top of this field pays extremely well. Path is competitive and mostly about who trusts you with more responsibility over time.`,
    fitFor: (label) => `someone who's competitive, comfortable with pressure, reads people well, and can grind through crunch periods without losing composure.`,
    energized: ["Making high-stakes decisions", "Recognition when you win", "The pace of change", "Fast learning by osmosis", "Being trusted with more scope"],
    drained: ["Politics and hierarchy", "Long hours during crunch", "Owning results even when the team dropped the ball", "Cancelled plans", "Zero control over your evenings"],
    dos: [
      "Be aggressively responsive to seniors — visibility is currency here",
      "Track every deliverable, every commitment — nothing slips silently",
      "Learn to structure ambiguous problems on a blank page",
      "Build strong relationships with your peer class — they'll be your network for 20 years",
      "Deliver early when you can — creates optionality when things go wrong"
    ],
    donts: [
      "Never say 'that's not my job' — everything is your job in this field",
      "Don't hide mistakes — they surface, and hiding is what ends careers",
      "Don't burn bridges when you leave — the industry is small",
      "Don't overpromise on turnarounds",
      "Don't measure your worth in bonus size alone — the field is designed to keep you chasing"
    ]
  },
  "Tech & Science": {
    reality: (label) => `As a ${label}, most days are quiet, focused, and behind a screen (or a lab bench). Progress is slow but real. Skills compound fast in this field, and the best in it pair deep technical depth with the ability to explain complex ideas simply.`,
    fitFor: (label) => `someone who can hold a hard problem in their head for hours, is comfortable being wrong on the way to being right, and prefers making things over selling things.`,
    energized: ["The moment something works", "Deep-focus stretches", "Learning constantly", "Elegant solutions clicking into place", "Working with sharp technical peers"],
    drained: ["Interruption-heavy days", "Debugging messy legacy work", "Explaining the same technical concept to non-technical people repeatedly", "Meetings that could have been messages", "Rewriting work because a stakeholder changed their mind"],
    dos: [
      "Read more than you write — most of the work is understanding what already exists",
      "Communicate proactively — an update every few days beats a surprise",
      "Learn one thing deeply per quarter, not five shallowly",
      "Own your work publicly — 'I broke it, I'll fix it' builds trust",
      "Document what you learn — you'll re-derive it otherwise"
    ],
    donts: [
      "Don't over-engineer — the simplest solution that works is usually right",
      "Don't work on obviously the wrong thing — flag it, then execute or fix scope",
      "Don't skip fundamentals — the field will keep shifting on top of them",
      "Don't measure yourself in output volume — measure yourself in problems solved",
      "Don't burn out chasing perfection — the shipped version teaches you more"
    ]
  },
  "People & Impact": {
    reality: (label) => `As a ${label}, your work is deeply human. You'll rarely be rich from this, but you'll have days that mean something. Emotional labor is the biggest hidden cost — plan for it, protect your evenings, and build the recovery habits early.`,
    fitFor: (label) => `someone who genuinely cares about other people's outcomes, can hold hard emotions without collapsing, and measures success in changed lives rather than currency.`,
    energized: ["Direct, visible impact on someone", "Trust from the people you help", "Work with obvious meaning", "Long-term relationships that build over years", "Being genuinely remembered by someone you helped"],
    drained: ["Emotional exhaustion", "Bureaucracy blocking the actual work", "Low pay relative to effort", "The one person you couldn't reach", "Being expected to be everything with no institutional support"],
    dos: [
      "Set boundaries early — this field will happily consume all of you",
      "Save the 'thank you' messages — you'll need them in dark weeks",
      "Learn to say the difficult thing kindly",
      "Build a support system of peers who understand the work",
      "Protect one weekly practice that isn't about anyone else — sanity depends on it"
    ],
    donts: [
      "Don't fake certainty when you don't have it — the people you serve trust honesty more",
      "Don't take other people's frustration personally when it's really about their situation",
      "Don't skip your own recovery — the burnout is real, quiet, and gradual",
      "Don't measure your worth by the person who's still struggling",
      "Don't stay silent when systems around you are hurting the people you're meant to help"
    ]
  },
  "Creative": {
    reality: (label) => `As a ${label}, income is unpredictable and taste is your currency. You'll be rejected constantly. The top of this field is famous and well-paid; the middle is comfortable; the bottom is hard. Craft compounds over decades and isn't easy to shortcut.`,
    fitFor: (label) => `someone with strong taste, willingness to be publicly judged, and enough discipline to make things even when nobody's asking them to.`,
    energized: ["Making something that didn't exist before", "A real audience reacting to your work", "Autonomy over what you spend your day on", "The specific joy of taste applied", "A collaborator who elevates your work"],
    drained: ["Client feedback that ignores craft", "Financial uncertainty between projects", "The gap between your vision and your current skill", "Being publicly critiqued", "Working on projects that die in production"],
    dos: [
      "Ship real work into your portfolio — concepts don't build a reputation",
      "Consume the best of your medium daily — inputs shape outputs",
      "Take critique seriously without taking it personally",
      "Build a body of work over decades, not a single hit",
      "Save money aggressively when work is coming in — feast/famine is the rhythm"
    ],
    donts: [
      "Don't gold-plate work that will get killed — pace effort to project confidence",
      "Don't chase Dribbble/Instagram aesthetics that don't serve the actual project",
      "Don't take a low-paying gig from a client who doesn't respect the craft — it teaches you the wrong lessons",
      "Don't compare your day-to-day to another creative's greatest hits",
      "Don't skip the boring craft skills — that's where good creatives distinguish themselves"
    ]
  }
};

// Headline bands ladder with the (relative) score: `elite` is a near-flawless day
// — as good as the scenes allow — and each band down reads distinctly, so a 60
// and a 50 don't get the same verdict. Bands are chosen by score in
// buildLocalVerdict, capped by the coarse tier guards so a friction-heavy day
// can't be headlined as a clean one.
const HEADLINE_TEMPLATES = {
  elite: [
    "You played this like you'd done it for years. This is your lane.",
    "About as clean as this day gets. A fit this strong is hard to argue with.",
    "Near-flawless. If any career is yours, this one's a real candidate."
  ],
  high: [
    "You handled it — this could actually be your lane.",
    "Fit is strong. Worth digging deeper.",
    "You didn't just survive today, you thrived. Explore this more."
  ],
  solid: [
    "A good day with a few misses — there's real fit here to sharpen.",
    "More right than wrong. Promising, not a lock yet.",
    "You held your own. The gaps look learnable, not fatal."
  ],
  mid: [
    "You made it through. Parts worked, parts didn't.",
    "There's real signal both ways — don't rule it out yet.",
    "A mixed day. Depends on which parts felt worth it to you."
  ],
  low: [
    "Leaning no. More misses than makes, though a couple of instincts landed.",
    "You got through it, but you were swimming upstream most of the day.",
    "Probably not your lane — not a flat no, but the day fought you more than it flowed."
  ],
  bust: [
    "Your choices today say this isn't the one.",
    "The day never came together — this isn't a fit worth forcing.",
    "A hard no. What the work rewarded and what you reached for kept missing each other."
  ]
};

function loadScript(career) {
  if (SIM_SCRIPTS[career.id]) return SIM_SCRIPTS[career.id];
  const groupTpl = GENERIC_BY_GROUP[career.group] || GENERIC_BY_GROUP["Business & Money"];
  return {
    intro: groupTpl.intro(career.label),
    scenes: groupTpl.scenes,
  };
}

// ------------------------------------------------------------
// OPTION QUALITY — graded, not hardline
// Every choice carries a quality on a continuous 0..100 scale rather than a flat
// good/bad/neutral bucket. An option can be graded two ways:
//   • a NUMBER (inline `tone: 72`, or a numeric entry in the scene's `tones`
//     array) — used directly, so an author can say "this is a 72, a good-but-not-
//     ideal call", not just a generic "good";
//   • a LABEL — the three legacy labels keep their exact old values (good=100,
//     neutral=50, bad=0) so no existing run's score moves, plus optional
//     in-between labels (solid/weak/…) that sit inside [0,100] as sugar.
// The SCORE is computed from the raw number, so gradation flows straight through.
// The report's prose, ratios and best/worst-call picks read the coarse bucket via
// toneCategory(), so one place decides what still counts as a "good" or "bad"
// call and every existing report stays identical.
// ------------------------------------------------------------
const TONE_VAL = {
  awful: 0, bad: 0, poor: 20, weak: 35,
  meh: 40, neutral: 50, okay: 50,
  fair: 60, solid: 75, strong: 90,
  good: 100, great: 100,
};
function qualityOf(tone) {
  if (typeof tone === "number" && isFinite(tone)) return Math.max(0, Math.min(100, tone));
  return TONE_VAL[tone] ?? 50;
}
// Collapse a graded quality into the three buckets the report is written against.
// Thresholds are set so the legacy anchors (100/50/0) each land in their own
// bucket, so existing content reports exactly as before.
function toneCategory(tone) {
  const q = qualityOf(tone);
  return q >= 67 ? "good" : q >= 34 ? "neutral" : "bad";
}

function buildLocalVerdict(career, tones, log = [], timing = null) {
  const total = tones.length || 1;

  // Per-scene scoring, blending two views of each pick:
  //   relative — where the pick landed inside that scene's own best..worst range.
  //              Rewards taking the best option that was actually on the table.
  //   absolute — the raw quality of the pick, so a "good" always beats a "neutral"
  //              even in a scene that was easy.
  // Both are normalised to 0..1, so a flawless run lands near 100 and a run of
  // worst-available picks lands near 0. Anything in between spreads out properly.
  const choiceEntries = (log || []).filter(e => e && e.choice != null && Array.isArray(e.tones) && e.tones.length);

  // Score one option against the scene it appeared in.
  const gradeOption = (sceneTones, tone) => {
    const vals = sceneTones.map(t => qualityOf(t));
    const bestVal = Math.max(...vals);
    const worstVal = Math.min(...vals);
    const val = qualityOf(tone);
    return {
      // Every option identical => the scene can't discriminate; give full credit.
      relative: bestVal === worstVal ? 1 : (val - worstVal) / (bestVal - worstVal),
      absolute: val / 100,
    };
  };
  const blend = (rel, abs, n) => 100 * (0.6 * (rel / n) + 0.4 * (abs / n));

  let sumRelative = 0, sumAbsolute = 0;      // what the player actually did
  let baseRelative = 0, baseAbsolute = 0;    // what random clicking would have done
  let bestRelative = 0, bestAbsolute = 0;    // picking the best option every time
  let worstRelative = 0, worstAbsolute = 0;  // picking the WORST option every time — the true floor
  let scored = 0;
  for (let i = 0; i < choiceEntries.length; i++) {
    const sceneTones = choiceEntries[i].tones;
    const pickedTone = tones[i];
    if (pickedTone == null) continue;
    const picked = gradeOption(sceneTones, pickedTone);
    sumRelative += picked.relative;
    sumAbsolute += picked.absolute;
    // Exact expected score of a uniform-random pick on THIS scene.
    for (const t of sceneTones) {
      const opt = gradeOption(sceneTones, t);
      baseRelative += opt.relative / sceneTones.length;
      baseAbsolute += opt.absolute / sceneTones.length;
    }
    const vals = sceneTones.map(t => qualityOf(t));
    const bestVal = Math.max(...vals);
    const worstVal = Math.min(...vals);
    // The ceiling for THIS scene: the best option (relative 1, absolute = its quality).
    bestRelative += 1;
    bestAbsolute += bestVal / 100;
    // The floor for THIS scene: the worst option (relative 0, absolute = its quality).
    // A scene where every option is identical can't discriminate, so its floor and
    // ceiling coincide (relative 1 both ways) and it drops out of the spread.
    worstRelative += bestVal === worstVal ? 1 : 0;
    worstAbsolute += worstVal / 100;
    scored++;
  }

  // Anchor the scale to the two extremes a player can actually reach on THEIR
  // scenes: picking the WORST option every time is the true zero, picking the best
  // every time is the top. (Earlier this floored at *random clicking* — but random
  // already scores ~62/100 on these well-written scenes, so it crushed every solid-
  // but-imperfect day toward the bottom. The floor is now "you actively made the
  // worst call every time", which is what a 0 should mean.) Random clicking is kept
  // only as a diagnostic: `beatRandom` flags whether the day cleared what guessing
  // would earn — the real "this might not be your fit" signal — without defining 0.
  let behaviorScore, beatRandom = true;
  if (scored === 0) {
    behaviorScore = 50;
  } else {
    const rawScore = blend(sumRelative, sumAbsolute, scored);
    const randomScore = blend(baseRelative, baseAbsolute, scored);
    const bestScore = blend(bestRelative, bestAbsolute, scored);
    const worstScore = blend(worstRelative, worstAbsolute, scored);
    beatRandom = rawScore >= randomScore;
    // worst -> 5, best -> 97, linear in between.
    behaviorScore = 5 + (rawScore - worstScore) / Math.max(1e-9, bestScore - worstScore) * 92;
  }
  behaviorScore = Math.max(0, Math.min(100, behaviorScore));

  // Tally the three report buckets on the SAME relative-to-best ruler the score
  // is built from, so the badges and the number can never tell opposite stories.
  // A pick is "in the pocket" when it lands near the best option that scene
  // actually offered, "friction" when it sits near the bottom AND wasn't strong
  // on its own merits, and "defensible" in between. (The old tally bucketed each
  // pick's absolute quality in isolation — so a day of second-best picks read as
  // "7 in the pocket, 0 friction" while the score, measured against the best
  // option available, sat at 49. Same run, opposite stories.) The 0.6/0.4
  // relative/absolute weighting mirrors blend() above; the absolute floor on
  // friction keeps an objectively strong pick (say quality 90) from being called
  // friction just because a marginally better option existed.
  let good = 0, bad = 0, neutral = 0;
  for (let i = 0; i < total; i++) {
    const pickedTone = tones[i];
    const sceneTones = i < choiceEntries.length ? choiceEntries[i].tones : null;
    if (pickedTone == null) { neutral++; continue; }
    if (!sceneTones) {
      // No scene context for this pick — fall back to its absolute bucket.
      const c = toneCategory(pickedTone);
      if (c === "good") good++; else if (c === "bad") bad++; else neutral++;
      continue;
    }
    const { relative, absolute } = gradeOption(sceneTones, pickedTone);
    const pq = 0.6 * relative + 0.4 * absolute;
    if (pq >= 0.72) good++;
    else if (pq < 0.40 && absolute < 0.67) bad++;
    else neutral++;
  }
  const goodRatio = good / total;
  const badRatio = bad / total;

  const dims = scoreDimensions();
  const hasQuizData = ["interests","strengths","weaknesses","values","workstyle"]
    .some(k => Object.values(dims[k] || {}).some(v => v > 0));
  const profileFit = hasQuizData ? fitCareer(career.id, dims) : 55;

  // Blend in profile fit only when there IS a profile. With no quiz answers the
  // old code mixed in a flat 55, which isn't information about this player — it's
  // a placeholder that can only pull the score toward the middle, and it capped a
  // flawless day at 89. No quiz means the report is a pure read on the day.
  let score = Math.round(hasQuizData ? behaviorScore * 0.80 + profileFit * 0.20 : behaviorScore);
  const penalty = 0;

  // Time management is a real part of doing the job, so it moves the number —
  // but it's a modifier, not a third pillar. Running long is penalised harder
  // than running early: in every one of these careers, the day has an end.
  const timeAdj = timing && timing.scored ? timeAdjustment(timing.drift) : 0;
  score += timeAdj;

  score = Math.max(15, Math.min(99, score));
  // Thresholds sit on the worst→best anchored scale (worst play ~5, best ~97):
  // "high" is a day clearly in the top half, "low" is down near worst-play territory.
  let tier = score >= 64 ? "high" : score >= 38 ? "mid" : "low";
  // The headline (tier) and the day-read (raw ratios) must never contradict each
  // other on the same report. A clean day can't be headlined as rough, and a day
  // full of friction can't be headlined as a strong fit, whatever the profile
  // component did to the number.
  if (tier === "high" && badRatio > 0.25) tier = "mid";
  // Only rescue a low-tier day if it actually beat chance — a respectable-looking
  // tally that scored at-or-below random is exactly the case this report exists to catch.
  if (tier === "low" && beatRandom && goodRatio >= 0.5 && badRatio <= 0.25) tier = "mid";

  const insight = CAREER_INSIGHTS[career.id] || (() => {
    const g = GENERIC_INSIGHTS_BY_GROUP[career.group] || GENERIC_INSIGHTS_BY_GROUP["Business & Money"];
    return {
      reality: g.reality(career.label),
      fitFor: g.fitFor(career.label),
      energized: g.energized,
      drained: g.drained,
      dos: g.dos,
      donts: g.donts,
    };
  })();
  // Finer headline band, on the worst→best anchored scale (worst play ~5, best ~97).
  // A day of solid-but-imperfect calls lands ~72, so the bands read the top half as
  // real fit and the bottom as approaching worst-play. The bottom is NOT one flat
  // "low": a soft no (38–49) leans against, a hard floor (<38) reads clearly worse.
  //   elite ≥88  near-flawless             high ≥74  strong day, minor gaps
  //   solid ≥64  clearly in the top half (real fit, gaps to sharpen)
  //   mid   ≥50  genuinely mixed
  //   low   ≥38  a soft no — leaning against
  //   bust  <38  down near worst-play — a hard no
  let headlineBand = score >= 88 ? "elite"
    : score >= 74 ? "high"
    : score >= 64 ? "solid"
    : score >= 50 ? "mid"
    : score >= 38 ? "low"
    : "bust";
  // The coarse tier is a hard floor AND ceiling on the language: a mid-tier day can
  // never surface solid/high/elite prose (that was the "61 → Promising" bug), and a
  // low-tier day always reads as the bust floor. Within the high tier, the finer
  // band above applies (its floor is aligned to the high-tier floor, 64).
  if (tier === "low") headlineBand = "bust";
  if (tier === "mid" && (headlineBand === "solid" || headlineBand === "high" || headlineBand === "elite")) headlineBand = "mid";
  const templates = HEADLINE_TEMPLATES[headlineBand];
  const headline = templates[Math.abs((career.id.length + tones.length) % templates.length)];
  const dayRead = buildDayRead({ good, bad, neutral, total, goodRatio, badRatio, belowRandom: !beatRandom, tier, nearPerfect: score >= 90 });

  // Detailed, per-choice reasoning that references specific decisions + quiz dims
  const reasoning = buildDetailedReasoning({
    good, bad, neutral, total, goodRatio, badRatio,
    score, tier, career, profileFit, behaviorScore, penalty,
    tones, log, dims, hasQuizData,
  });

  const choiceLog = (log || []).filter(e => e && e.choice !== null && e.choice !== undefined);
  const energized = personalizeEnergized(insight, dims, tones, choiceLog, career, hasQuizData);
  const drained = personalizeDrained(insight, dims, tones, choiceLog, career, hasQuizData);

  return {
    score,
    headline,
    dayRead,
    reasoning,
    energized,
    drained,
    reality: insight.reality,
    fitFor: insight.fitFor,
    dos: (insight.dos || []).slice(0, 5),
    donts: (insight.donts || []).slice(0, 5),
    timeRead: timing && timing.scored ? buildTimeRead(timing, career) : null,
    tally: {
      good, bad, neutral, total,
      profileFit: Math.round(profileFit),
      behaviorScore: Math.round(behaviorScore),
      ...(timing && timing.scored ? { drift: Math.round(timing.drift), finishedAt: timing.finishedAt, timeAdj } : {}),
    },
  };
}

// Score modifier for how the day's clock ended up. Zero at ±20 min (nobody hits
// a schedule exactly); worst case -8 for a badly blown day, best case +4 for
// finishing with real time in hand.
function timeAdjustment(drift) {
  if (drift > 20) return -Math.min(8, Math.round((drift - 20) / 22));
  if (drift < -20) return Math.min(4, Math.round((-drift - 20) / 30));
  return 0;
}

// One honest line about where the clock ended up, and what that says.
function buildTimeRead(timing, career) {
  const d = Math.round(timing.drift);
  const at = timing.finishedAt;
  const role = career.label.toLowerCase();
  const article = /^[aeiou]/.test(role) ? "an" : "a";
  const ending = at ? `, wrapping around ${at}` : "";
  if (d > 90) {
    return `You ended the day roughly ${formatDur(d)} past where it was supposed to end${ending}. You took the thorough option almost every time one was offered, and the hours went somewhere. For ${article} ${role} that isn't automatically wrong — but it is a choice, and it cost you the evening while someone downstream waited.`;
  }
  if (d > 30) {
    return `You finished about ${formatDur(d)} behind schedule${ending}. A few deep dives ran long. That's a normal way to work — just know it compounds, and it costs you most on the days something urgent lands at 5 PM.`;
  }
  if (d < -60) {
    return `You came in roughly ${formatDur(d)} ahead of schedule${ending}. You consistently took the fast option. That's real speed — but look back at the calls above for the ones where moving quickly meant you never saw what you were skipping past.`;
  }
  if (d < -20) {
    return `You finished about ${formatDur(d)} ahead of schedule${ending}. You kept moving without gutting the work, and banked time is exactly what absorbs the surprise nobody plans for.`;
  }
  return `You landed close to schedule${ending}. You spent the slow option where it mattered and moved fast where it didn't. That's the actual skill here — not being fast or thorough, but knowing which one the moment is asking for.`;
}

// ============================================================
// PERSONALIZED ENERGIZED / DRAINED
// ============================================================
function personalizeEnergized(insight, dims, tones, choiceLog, career, hasQuizData) {
  const items = [];
  const s = dims.strengths || {};
  const i = dims.interests || {};
  const v = dims.values || {};

  // 1. Tie to strongest strength (if strong enough)
  if (hasQuizData) {
    const strengthItem = strengthEnergizer(s, career);
    if (strengthItem) items.push(strengthItem);
  }

  // 2. Best sim moment — quote it
  const bestMoment = pickBestMoment(choiceLog, tones, career);
  if (bestMoment) items.push(momentEnergizer(bestMoment, career));

  // 3. Tie to top matching interest or value
  if (hasQuizData) {
    const interestItem = interestEnergizer(i, career);
    if (interestItem && !items.some(x => x === interestItem)) items.push(interestItem);
    else {
      const valueItem = valueEnergizer(v, career);
      if (valueItem) items.push(valueItem);
    }
  }

  // 4. Fill with career defaults (skip near-duplicates)
  const defaults = insight.energized || [];
  for (const d of defaults) {
    if (items.length >= 4) break;
    if (!items.some(x => x.toLowerCase().includes(d.toLowerCase().slice(0, 25)))) items.push(d);
  }

  return items.slice(0, 4);
}

function personalizeDrained(insight, dims, tones, choiceLog, career, hasQuizData) {
  const items = [];
  const w = dims.weaknesses || {};
  const v = dims.values || {};
  const s = dims.strengths || {};

  // 1. Tie to top weakness (specific % + why this career punishes it)
  if (hasQuizData) {
    const weaknessItem = weaknessDrainer(w, career);
    if (weaknessItem) items.push(weaknessItem);
  }

  // 2. Worst sim moment — quote it
  const worstMoments = pickWorstMoments(choiceLog, tones, career, 1);
  if (worstMoments.length) items.push(momentDrainer(worstMoments[0], career));

  // 3. Value/career mismatch
  if (hasQuizData) {
    const mismatchItem = valueMismatchDrainer(v, career);
    if (mismatchItem) items.push(mismatchItem);
  }

  // 4. Fill with career defaults
  const defaults = insight.drained || [];
  for (const d of defaults) {
    if (items.length >= 4) break;
    if (!items.some(x => x.toLowerCase().includes(d.toLowerCase().slice(0, 25)))) items.push(d);
  }

  return items.slice(0, 4);
}

function strengthEnergizer(s, career) {
  const careerLower = career.label.toLowerCase();
  const cands = [];
  if ((s.logic || 0) >= 60) cands.push({ score: s.logic, msg: `Applying your logic strength (${s.logic}%) — a huge share of a ${careerLower}'s day is exactly this` });
  if ((s.focus || 0) >= 60) cands.push({ score: s.focus, msg: `Long deep-focus stretches — your focus at ${s.focus}% is your natural gear, and this career gives you real windows for it` });
  if ((s.creativity || 0) >= 65) cands.push({ score: s.creativity, msg: `The moments that need original thinking — your creativity (${s.creativity}%) is what would carry those` });
  if ((s.empathy || 0) >= 65) cands.push({ score: s.empathy, msg: `Reading the room correctly — your empathy (${s.empathy}%) shows up as a strength in every interaction here` });
  if ((s.leadership || 0) >= 65) cands.push({ score: s.leadership, msg: `Taking ownership before anyone asks — your leadership (${s.leadership}%) is the exact trait seniors watch for` });
  if ((s.speaking || 0) >= 65) cands.push({ score: s.speaking, msg: `Being trusted in front of the room — your speaking strength (${s.speaking}%) matters here more than most careers` });
  if ((s.writing || 0) >= 65) cands.push({ score: s.writing, msg: `The moments that need clean written communication — your writing (${s.writing}%) shows up as an unfair advantage here` });
  cands.sort((a, b) => b.score - a.score);
  return cands[0]?.msg || null;
}

function interestEnergizer(int, career) {
  const cands = [];
  if ((int.analytical || 0) >= 60) cands.push({ score: int.analytical, msg: `The problem-solving side of the work — your analytical interest (${int.analytical}%) makes those moments feel like play` });
  if ((int.creative || 0) >= 60) cands.push({ score: int.creative, msg: `The moments that let you shape the output — your creative pull (${int.creative}%) makes those feel earned` });
  if ((int.social || 0) >= 60) cands.push({ score: int.social, msg: `The people-facing parts of the job — your interest in connecting (${int.social}%) turns those into fuel, not tax` });
  if ((int.entrepreneurial || 0) >= 60) cands.push({ score: int.entrepreneurial, msg: `Being handed something to build from scratch — your entrepreneurial pull (${int.entrepreneurial}%) reads those as opportunities` });
  if ((int.investigative || 0) >= 65) cands.push({ score: int.investigative, msg: `Going deep on why something works — your investigative pull (${int.investigative}%) makes the research phase feel worthwhile` });
  if ((int.practical || 0) >= 60) cands.push({ score: int.practical, msg: `Making something real that ships — your practical interest (${int.practical}%) needs an output at the end of the day` });
  cands.sort((a, b) => b.score - a.score);
  return cands[0]?.msg || null;
}

function valueEnergizer(v, career) {
  const grp = career.group;
  if ((v.money || 0) >= 65 && grp === "Business & Money") return `The financial upside — your quiz shows money value at ${v.money}%, and this is a career that actually delivers on it`;
  if ((v.impact || 0) >= 65 && grp === "People & Impact") return `Seeing your work change someone's day — your impact value (${v.impact}%) is exactly what this career hands you`;
  if ((v.creativity_val || 0) >= 65 && grp === "Creative") return `Owning what you make — your creativity value (${v.creativity_val}%) needs this and this career gives it`;
  if ((v.freedom || 0) >= 65) return `The moments of autonomy — your freedom value (${v.freedom}%) makes those feel like the whole point`;
  if ((v.growth || 0) >= 65) return `The steep learning curve — your growth value (${v.growth}%) reads this as a feature, not a stress`;
  if ((v.prestige || 0) >= 65) return `Being genuinely respected in the field — your prestige value (${v.prestige}%) makes the ladder feel worth climbing`;
  return null;
}

function momentEnergizer(moment, career) {
  const shortChoice_ = shortChoice(moment.choice);
  return `That ${moment.time} moment — when you chose "${shortChoice_.length > 60 ? shortChoice_.slice(0, 57) + "…" : shortChoice_}" — days built around that feeling would light you up`;
}

function weaknessDrainer(w, career) {
  const careerLower = career.label.toLowerCase();
  const cands = [];
  if ((w.conflict_avoid || 0) >= 55) cands.push({ score: w.conflict_avoid, msg: `The constant hard conversations — your conflict-avoidance (${w.conflict_avoid}%) means these would cost you double what they cost a natural fit` });
  if ((w.social_drain || 0) >= 55) cands.push({ score: w.social_drain, msg: `The daily people-load — your quiz shows people-drain at ${w.social_drain}%, and this career doesn't let up on it` });
  if ((w.procrastination || 0) >= 55) cands.push({ score: w.procrastination, msg: `The tasks nobody's checking on — your procrastination (${w.procrastination}%) meets a job where nobody will chase you, and it costs you` });
  if ((w.perfectionism || 0) >= 55) cands.push({ score: w.perfectionism, msg: `The "ship it, we'll fix it" tempo — your perfectionism (${w.perfectionism}%) fights this career's speed at every deadline` });
  if ((w.boredom || 0) >= 55) cands.push({ score: w.boredom, msg: `The repetitive stretches — your quiz shows quitting-when-bored at ${w.boredom}%, and there are more of those here than the brochure admits` });
  if ((w.focus_bad || 0) >= 55) cands.push({ score: w.focus_bad, msg: `The interruption-heavy rhythm — your focus-loss (${w.focus_bad}%) means you'd lose the day to context-switching alone` });
  if ((w.detail_bad || 0) >= 55) cands.push({ score: w.detail_bad, msg: `The precision this career demands — your detail-slip (${w.detail_bad}%) is exactly what would compound into visible mistakes here` });
  cands.sort((a, b) => b.score - a.score);
  return cands[0]?.msg || null;
}

function valueMismatchDrainer(v, career) {
  const grp = career.group;
  if ((v.balance || 0) >= 65 && (grp === "Business & Money" || grp === "People & Impact")) return `The evenings and weekends this career eats — your balance value (${v.balance}%) would feel constantly violated`;
  if ((v.stability || 0) >= 65 && grp === "Creative") return `The income uncertainty — your stability value (${v.stability}%) meets a career where next month's paycheck isn't a given`;
  if ((v.money || 0) >= 65 && (grp === "People & Impact" || grp === "Creative")) return `The ceiling on early-career pay — your money value (${v.money}%) meets a field where meaningful money comes late, if at all`;
  if ((v.freedom || 0) >= 70 && grp === "Business & Money") return `The hierarchy and face-time — your freedom value (${v.freedom}%) meets a career where senior approval gates almost everything`;
  if ((v.creativity_val || 0) >= 65 && grp === "Business & Money") return `The repetitive execution work — your need for creative expression (${v.creativity_val}%) doesn't get much room here` ;
  return null;
}

function momentDrainer(moment, career) {
  const shortChoice_ = shortChoice(moment.choice);
  return `The ${moment.time} kind of moment — when you chose "${shortChoice_.length > 60 ? shortChoice_.slice(0, 57) + "…" : shortChoice_}" — days full of these would grind you down`;
}

function buildDetailedReasoning({ good, bad, neutral, total, goodRatio, badRatio, score, tier, career, profileFit, behaviorScore, penalty, tones, log, dims, hasQuizData }) {
  const lines = [];
  const goodPct = Math.round(goodRatio * 100);
  const badPct = Math.round(badRatio * 100);
  const careerLower = career.label.toLowerCase();

  // Align log to tones (log may include a closing beat with choice: null)
  const choiceLog = (log || []).filter(e => e && e.choice !== null && e.choice !== undefined);

  // --- 1. OPENING — overall pattern
  if (tier === "high")
    lines.push({
      kind: "opening",
      label: "The pattern",
      body: `Your instincts matched what a real ${careerLower} would do in ${good} of ${total} scenes (${goodPct}%). That's not luck — that's a pattern. The moves that separate insiders from tourists in this career showed up in your specific choices.`,
    });
  else if (tier === "mid")
    lines.push({
      kind: "opening",
      label: "The pattern",
      body: `Across ${total} decisions, ${good} were in-the-pocket (${goodPct}%) and ${bad} hit friction (${badPct}%). That's a middle-of-the-pack day — and unfortunately, this career doesn't reward middle-of-the-pack. First-year attrition is highest for exactly this profile.`,
    });
  else
    lines.push({
      kind: "opening",
      label: "The pattern",
      body: `${bad} of your ${total} decisions ran into real friction (${badPct}%). In ${careerLower} work, friction compounds — one call that lands wrong in the morning becomes a crisis at 8 PM. Your score reflects what your specific choices would cost you here, not just your average.`,
    });

  // --- 2. FRICTION — up to 2, quote the specific scenes that didn't land in the
  // pocket. These are the exact scenes the opening just counted as friction, so we
  // rank on the SAME relative-to-best ruler the tally uses (not each pick's absolute
  // tone), otherwise the report can advertise "2 friction" and then explain none.
  const worstMoments = pickWorstMoments(choiceLog, tones, career, 2);
  worstMoments.forEach((m) => {
    // A truly poor call reads as "the miss"; a defensible-but-not-best one that
    // still cost you ground reads as "the friction point" — honest either way.
    // "Miss" uses the SAME bar as the tally's friction bucket (pq<0.40 AND the
    // option wasn't objectively decent), so the number of "miss" lines can never
    // exceed the "N friction" badge — an objectively-fine pick that was merely
    // second-best is a friction point, not a miss.
    const hard = (m.pq ?? 0) < 0.40 && (m.absolute ?? 1) < 0.67;
    lines.push({
      kind: "miss",
      label: `${m.time} — ${hard ? "the miss" : "the friction point"}`,
      body: buildMissLine(m, dims, career, hasQuizData),
    });
  });

  // --- 3. BEST CALL — quote the strongest good moment
  const bestMoment = pickBestMoment(choiceLog, tones, career);
  if (bestMoment) {
    lines.push({
      kind: "clutch",
      label: `${bestMoment.time} — the clutch call`,
      body: buildClutchLine(bestMoment, dims, career, hasQuizData),
    });
  }

  // --- 4. PROFILE TIE-IN — how their report predicted this
  if (hasQuizData) {
    lines.push({
      kind: "profile",
      label: "What your report predicted",
      body: buildProfileTieIn(dims, career, tier, profileFit),
    });
  }

  // --- 5. MATH — transparent scoring
  lines.push({
    kind: "math",
    label: "The math",
    body: hasQuizData
      ? `Score = 80% behaviour (${Math.round(behaviorScore)}) + 20% quiz profile alignment (${Math.round(profileFit)}). Behaviour is measured against what guessing would have earned on your exact scenes, so picking the right call in a scene where most options were already workable counts for less than one where the room for error was real. Behaviour outweighs profile because on a real Tuesday, only your calls actually matter.`
      : `Score = 100% behaviour (${Math.round(behaviorScore)}) — you haven't taken the quiz, so there's no profile to weigh in and this is a pure read on the day. Behaviour is measured against what guessing would have earned on your exact scenes, so picking the right call in a scene where most options were already workable counts for less than one where the room for error was real.`,
  });

  return lines;
}

// Per-scene pick quality on the same relative-to-best ruler the score and the
// good/neutral/bad tally use: pq = 0.6·(where the pick landed in this scene's own
// best..worst range) + 0.4·(the pick's raw quality). A scene "landed in the
// pocket" at pq ≥ 0.72 — everything below that is the friction the opening counts.
function scenePickQuality(sceneTones, pickedTone) {
  if (!Array.isArray(sceneTones) || !sceneTones.length || pickedTone == null) return null;
  const vals = sceneTones.map(t => qualityOf(t));
  const best = Math.max(...vals), worst = Math.min(...vals);
  const val = qualityOf(pickedTone);
  const relative = best === worst ? 1 : (val - worst) / (best - worst);
  const absolute = val / 100;
  return { pq: 0.6 * relative + 0.4 * absolute, relative, absolute };
}

// Surface the scenes that DIDN'T land in the pocket — the exact friction the
// opening counts. We rank on the relative-to-best pq (weakest first), not each
// pick's absolute tone, so a decent-looking call that left clear ground on the
// table still gets explained. Falling short of the best available option is the
// whole lesson, so we never go silent on it just because the pick wasn't awful.
function pickWorstMoments(log, tones, career, n = 2) {
  const friction = [];
  for (let i = 0; i < log.length && i < tones.length; i++) {
    const q = scenePickQuality(log[i]?.tones, tones[i]);
    if (!q || q.pq >= 0.72) continue; // 0.72 = the "in the pocket" bar from the tally
    friction.push({
      ...log[i], idx: i, pq: q.pq, relative: q.relative, absolute: q.absolute,
      // Prefer the higher-stakes scenes when there are more than n to choose from,
      // but break ties toward the genuinely weaker pick.
      weight: (log[i].stat?.tone === "bad" ? 2 : log[i].stat?.tone === "neutral" ? 1 : 0.5) + (1 - q.pq),
    });
  }
  friction.sort((a, b) => b.weight - a.weight);
  return friction.slice(0, n);
}

function pickBestMoment(log, tones, career) {
  const goods = [];
  for (let i = 0; i < log.length && i < tones.length; i++) {
    if (toneCategory(tones[i]) === "good") goods.push({ ...log[i], idx: i, weight: log[i].stat?.tone === "bad" ? 2 : log[i].stat?.tone === "neutral" ? 1 : 0.5 });
  }
  if (!goods.length) return null;
  goods.sort((a, b) => b.weight - a.weight);
  return goods[0];
}

function shortChoice(text) {
  if (!text) return "";
  const t = String(text).trim();
  return t.length > 140 ? t.slice(0, 137) + "…" : t;
}

function buildMissLine(m, dims, career, hasQuizData) {
  const stakes = m.stat?.tone === "bad" ? "high-pressure" : m.stat?.tone === "neutral" ? "mid-pressure" : "quiet";
  // Same bar as the friction tally, so "miss" prose only fires on a genuine miss.
  const hard = (m.pq ?? 0) < 0.40 && (m.absolute ?? 1) < 0.67; // poor call vs. defensible-but-not-best
  const careerLower = career.label.toLowerCase();
  const parts = [];
  parts.push(`At ${m.time}, in a ${stakes} moment, you chose: "${shortChoice(m.choice)}".`);

  // Why this choice left ground on the table — honest about how far short it fell.
  if (hard) {
    parts.push(`That's the ${stakes === "high-pressure" ? "shortcut that costs people their reputation in this field" : "choice that reads as passive to seniors who watch closely"} — the version an experienced ${careerLower} would make looks very different.`);
  } else {
    parts.push(`It's not a bad call — it holds up, and it counts as defensible, not a miss. But it wasn't the best move on the table, and in ${careerLower} work the gap between "fine" and "sharp" is exactly what seniors notice. That's the ground this scene left on the table.`);
  }

  // Show the stronger call from the same scene, so the lesson is concrete.
  const better = pickBetterChoice(m);
  if (better) {
    parts.push(hard
      ? `The stronger call was: "${shortChoice(better)}" — that's what a seasoned ${careerLower} would have done here.`
      : `The sharper call was: "${shortChoice(better)}" — same situation, a little more of what this career actually rewards. That's the move to notice for next time.`);
  }

  // Tie to profile if available
  if (hasQuizData) {
    const tie = tieMissToProfile(dims);
    if (tie) parts.push(tie);
  }

  return parts.join(" ");
}

// From the scene's own choices, pick the highest-quality option that isn't what
// the user chose — the single best move that was still on the table. With graded
// scores this is a real "best alternative", not just the first option tagged good.
function pickBetterChoice(m) {
  const choices = m.choices || [];
  const tones = m.tones || [];
  const chosen = m.choice;
  let best = null;
  let bestQ = -1;
  for (let i = 0; i < choices.length; i++) {
    const c = choices[i];
    const text = choiceText(c);
    if (text === chosen) continue;
    const q = qualityOf(choiceTone(c, tones, i));
    // Only worth surfacing if it clears the "neutral" bar.
    if (q >= 34 && q > bestQ) { bestQ = q; best = text; }
  }
  return best;
}

function buildClutchLine(m, dims, career, hasQuizData) {
  const stakes = m.stat?.tone === "bad" ? "under real pressure" : m.stat?.tone === "neutral" ? "when the stakes were normal" : "in a routine moment";
  const parts = [];
  parts.push(`At ${m.time}, ${stakes}, you chose: "${shortChoice(m.choice)}".`);
  parts.push(`That's the call a senior in this career actually makes — and importantly, it's not the obvious or comfortable one. You showed real judgment there.`);

  if (hasQuizData) {
    const tie = tieClutchToProfile(dims);
    if (tie) parts.push(tie);
  }

  return parts.join(" ");
}

function tieMissToProfile(dims) {
  const w = dims.weaknesses || {};
  const s = dims.strengths || {};
  const v = dims.values || {};
  const candidates = [];
  if ((w.conflict_avoid || 0) >= 55) candidates.push({ dim: "conflict_avoid", score: w.conflict_avoid, msg: `Your report shows conflict-avoidance at ${w.conflict_avoid}% — the compass predicted you'd default to the "safe" option when the room got tense. This is exactly that moment.` });
  if ((w.procrastination || 0) >= 55) candidates.push({ dim: "procrastination", score: w.procrastination, msg: `Your report shows procrastination at ${w.procrastination}% — you tend to delay uncomfortable calls, which is what happened here.` });
  if ((w.perfectionism || 0) >= 60 && (w.procrastination || 0) >= 50) candidates.push({ dim: "perfectionism", score: w.perfectionism, msg: `Your report flagged perfectionism (${w.perfectionism}%) + procrastination (${w.procrastination}%) — you froze looking for the "right" answer instead of picking the workable one.` });
  if ((w.social_drain || 0) >= 55 && (s.speaking || 0) < 55) candidates.push({ dim: "social_drain", score: w.social_drain, msg: `Your report shows people-drain at ${w.social_drain}% and moderate speaking (${s.speaking}%) — reaching for the passive option here matches that profile exactly.` });
  if ((v.balance || 0) >= 60) candidates.push({ dim: "balance", score: v.balance, msg: `Your report shows balance at ${v.balance}% — you value your evenings, and this choice looks like an attempt to protect them. Fair, but this career rarely lets you.` });
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.msg || null;
}

function tieClutchToProfile(dims) {
  const s = dims.strengths || {};
  const i = dims.interests || {};
  const candidates = [];
  if ((s.logic || 0) >= 65) candidates.push({ score: s.logic, msg: `Your report shows logic at ${s.logic}% — this is your natural strength on display. When the situation asked for structured thinking, you delivered.` });
  if ((s.focus || 0) >= 65) candidates.push({ score: s.focus, msg: `Your report shows focus at ${s.focus}% — you didn't get pulled by the distractions, which is exactly what your quiz predicted.` });
  if ((s.empathy || 0) >= 65) candidates.push({ score: s.empathy, msg: `Your report shows empathy at ${s.empathy}% — you read the room correctly. That's the strength that made this call.` });
  if ((s.leadership || 0) >= 65) candidates.push({ score: s.leadership, msg: `Your report shows leadership at ${s.leadership}% — you took ownership when you didn't have to. That instinct is what senior people watch for.` });
  if ((i.investigative || 0) >= 70) candidates.push({ score: i.investigative, msg: `Your report shows investigative at ${i.investigative}% — you went for the option that actually digs into the problem, which is what the sim rewards here.` });
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0]?.msg || null;
}

function buildProfileTieIn(dims, career, tier, profileFit) {
  const topInterest = Object.entries(dims.interests || {}).sort((a, b) => b[1] - a[1])[0];
  const topStrength = Object.entries(dims.strengths || {}).sort((a, b) => b[1] - a[1])[0];
  const topWeakness = Object.entries(dims.weaknesses || {}).sort((a, b) => b[1] - a[1])[0];
  const topValue = Object.entries(dims.values || {}).sort((a, b) => b[1] - a[1])[0];

  const parts = [];
  parts.push(`Your quiz profile predicted a ${profileFit}/100 fit for ${career.label} — ${profileFit >= 70 ? "strong" : profileFit >= 55 ? "moderate" : "weak"}.`);

  if (topInterest && topInterest[1] >= 60 && topStrength && topStrength[1] >= 60) {
    parts.push(`Your top interest (${DIM_LABELS.interests[topInterest[0]]}, ${topInterest[1]}%) and top strength (${DIM_LABELS.strengths[topStrength[0]]}, ${topStrength[1]}%) both ${tier === "high" ? "aligned with what the sim rewarded" : tier === "mid" ? "partly matched what the sim rewarded — but not enough to carry a whole day" : "pulled you in a different direction from what this career needs"}.`);
  }

  if (topWeakness && topWeakness[1] >= 55 && (tier === "low" || tier === "mid")) {
    parts.push(`Your top friction point (${DIM_LABELS.weaknesses[topWeakness[0]]}, ${topWeakness[1]}%) is exactly the trait this career punishes hardest.`);
  }

  if (topValue && topValue[1] >= 65) {
    const valMatch = valueMatchesCareer(topValue[0], career.group);
    parts.push(`Your top value (${DIM_LABELS.values[topValue[0]]}, ${topValue[1]}%) ${valMatch ? "aligns" : "doesn't fully align"} with what this career actually delivers day-to-day.`);
  }

  return parts.join(" ");
}

function valueMatchesCareer(valueKey, group) {
  const map = {
    money: ["Business & Money"],
    impact: ["People & Impact"],
    creativity_val: ["Creative"],
    prestige: ["Business & Money", "Tech & Science"],
    growth: ["Tech & Science", "Business & Money"],
    freedom: ["Creative", "Business & Money"],
    stability: ["People & Impact", "Tech & Science"],
    balance: ["People & Impact"],
  };
  return (map[valueKey] || []).includes(group);
}

function buildDayRead({ good, bad, neutral, total, goodRatio, badRatio, belowRandom, tier, nearPerfect }) {
  // A near-flawless day — you took the best call on the table almost every time.
  // This is the top of what the scenes allow, so name it as such.
  if (nearPerfect && badRatio <= 0.15)
    return `You took the strongest call available in ${good} of ${total} scenes and dodged the traps in the rest — about as well as this day can be played. That's not guessing; that's the read of someone who belongs here.`;
  // Gated on tier, not on the raw tally alone: a strong-looking tally can still
  // score mid once it is measured against what guessing would have earned, and
  // the day-read must not promise a fit the headline is about to walk back.
  if (tier === "high" && goodRatio >= 0.65 && badRatio <= 0.15)
    return `${good} of your ${total} instincts matched what actually works in this role — the shape of someone who'd fit here.`;
  // A day can look respectable on the raw tally and still be at-or-below what
  // guessing would have earned, because most scenes carry more than one workable
  // option. Say so plainly rather than calling it "mixed".
  if (belowRandom)
    return `${good} of ${total} calls landed — but the ones that didn't were the ones that mattered, and on the whole you'd have done about as well picking at random. That's the part worth sitting with.`;
  if (goodRatio >= 0.5 && badRatio <= 0.25)
    return `${good} moves matched the role, ${neutral} ${neutral === 1 ? "was" : "were"} defensible, ${bad} hit friction. A workable day — you'd hold your own with a few rough edges.`;
  if (badRatio > goodRatio)
    return `${bad} of your choices ran into friction versus ${good} that matched — that's more resistance than someone in their lane would feel. The discomfort was signal, not noise.`;
  if (badRatio > 0.35)
    return `${good} moves matched the role, ${bad} hit friction. In a career this unforgiving, ${bad} friction points is a lot.`;
  if (neutral / total >= 0.7)
    return `Almost every call you made was the defensible one — ${neutral} of ${total}. Nothing blew up, but nothing landed either. In this role that reads as hedging, and hedging is its own answer.`;
  return `Mixed day — ${good} in the pocket, ${bad} in friction, ${neutral} defensible. Not obviously your lane, not obviously wrong for you either.`;
}


function buildLocalReport() {
  const dims = scoreDimensions();
  // Locked careers (no sim yet, no CAREER_FIT tuning) score a flat 50 — exclude
  // them from every ranking, otherwise they pollute "actual jobs" and "avoid".
  const scored = CAREERS.filter(c => SIM_READY.has(c.id))
    .map(c => ({ ...c, fit: fitCareer(c.id, dims) }))
    .sort((a, b) => b.fit - a.fit);
  const avoid = scored.filter(c => c.fit < 55).slice(-3).reverse();

  const enrichedTop = scored.slice(0, 5).map(c => {
    const ins = CAREER_INSIGHTS[c.id] || (() => {
      const g = GENERIC_INSIGHTS_BY_GROUP[c.group] || GENERIC_INSIGHTS_BY_GROUP["Business & Money"];
      return { reality: g.reality(c.label), fitFor: g.fitFor(c.label), dos: g.dos, donts: g.donts };
    })();
    return {
      career: c.label,
      group: c.group,
      subgroup: c.subgroup || c.group,
      fit: c.fit,
      why: whyCareerFits(c.id, dims),
      reality: ins.reality,
      fitFor: ins.fitFor,
      dos: (ins.dos || []).slice(0, 4),
      donts: (ins.donts || []).slice(0, 4),
    };
  });

  const signature = buildSignature(dims);
  const patterns = buildPatterns(dims);
  const contrasts = buildContrasts(dims);
  const quizBreakdown = buildQuizBreakdown(dims);
  const simInsights = state.completedSims.length ? buildSimInsights(state.completedSims) : null;

  return {
    headline: generateHeadline(dims),
    profile: generateProfile(dims),
    signature,
    compass: buildCompass(dims),
    compassFits: scored.slice(0, 3).map(c => ({
      career: c.label,
      fit: c.fit,
      why: whyCareerFits(c.id, dims),
    })),
    quizBreakdown,
    patterns,
    contrasts,
    topFields: getTopFields(scored),
    topCareers: enrichedTop,
    avoid: avoid.map(c => ({ career: c.label, why: whyAvoid(c.id, dims), group: c.group })),
    superpowers: getSuperpowers(dims),
    watchouts: getWatchouts(dims),
    sixMonthPlan: generatePlan(scored, dims),
    simInsights,
  };
}

// Per-quiz breakdown — what the test results actually said
function buildQuizBreakdown(dims) {
  const takeTop = (obj, n = 3, threshold = 40) => Object.entries(obj)
    .filter(([_, v]) => v >= threshold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);

  const bands = (score) => {
    if (score >= 75) return "very strong";
    if (score >= 60) return "strong";
    if (score >= 45) return "moderate";
    if (score >= 30) return "mild";
    return "weak";
  };

  const sections = [];

  // Interests
  const topInterests = takeTop(dims.interests, 3, 35);
  if (topInterests.length) {
    sections.push({
      key: "interests",
      title: "What actually interests you",
      lead: topInterests[0] ? `Your strongest pull is toward ${DIM_LABELS.interests[topInterests[0][0]]}.` : "",
      bars: topInterests.map(([k, v]) => ({ label: cap(DIM_LABELS.interests[k]), score: v, band: bands(v) })),
      takeaway: interestTakeaway(topInterests),
    });
  }

  // Strengths
  const topStrengths = takeTop(dims.strengths, 4, 40);
  if (topStrengths.length) {
    sections.push({
      key: "strengths",
      title: "What you're actually good at",
      lead: `You're strongest at ${DIM_LABELS.strengths[topStrengths[0][0]]}${topStrengths[1] ? ` and ${DIM_LABELS.strengths[topStrengths[1][0]]}` : ""}.`,
      bars: topStrengths.map(([k, v]) => ({ label: cap(DIM_LABELS.strengths[k]), score: v, band: bands(v) })),
      takeaway: strengthTakeaway(topStrengths),
    });
  }

  // Weaknesses — threshold 55 so "Sometimes" (Likert 2 = 50%) doesn't surface as a real struggle.
  const topWeak = takeTop(dims.weaknesses, 3, 55);
  if (topWeak.length) {
    sections.push({
      key: "weaknesses",
      title: "Where you struggle",
      lead: topWeak[0] ? `Your biggest friction point: ${DIM_LABELS.weaknesses[topWeak[0][0]]}.` : "",
      bars: topWeak.map(([k, v]) => ({ label: cap(DIM_LABELS.weaknesses[k]), score: v, band: bands(v) })),
      takeaway: weaknessTakeaway(topWeak),
    });
  } else {
    sections.push({
      key: "weaknesses",
      title: "Where you struggle",
      lead: "You didn't flag any major friction points — either you're self-aware and steady, or being a bit generous with yourself.",
      bars: [],
      takeaway: "No dominant weakness dimension surfaced. Watch for this next year — most people find their real friction only after they hit real deadlines.",
    });
  }

  // Values
  const topValues = takeTop(dims.values, 3, 45);
  if (topValues.length) {
    sections.push({
      key: "values",
      title: "What you actually want out of work",
      lead: topValues[0] ? `${cap(DIM_LABELS.values[topValues[0][0]])} matters most to you.` : "",
      bars: topValues.map(([k, v]) => ({ label: cap(DIM_LABELS.values[k]), score: v, band: bands(v) })),
      takeaway: valuesTakeaway(topValues),
    });
  }

  // Work style — different structure (categorical picks)
  const wsPicks = Object.keys(dims.workstyle).filter(k => dims.workstyle[k]);
  if (wsPicks.length) {
    sections.push({
      key: "workstyle",
      title: "How you work best",
      lead: `You picked ${wsPicks.length} preference${wsPicks.length > 1 ? "s" : ""} for how you like to work.`,
      picks: wsPicks.map(k => k.replace(/_/g, " ")),
      takeaway: workstyleTakeaway(wsPicks),
    });
  }

  return sections;
}

function interestTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("analytical") && set.has("investigative"))
    return "You're the kind of person who wants to understand things at the root, not just use them. Careers built on deep thinking will feel like home.";
  if (set.has("creative") && set.has("entrepreneurial"))
    return "You want to make things AND launch them into the world. That combination is rarer than either one alone — it's the founder-artist profile.";
  if (set.has("social") && set.has("creative"))
    return "You're drawn to work that mixes storytelling with human connection. Marketing, journalism, teaching, and film all live here.";
  if (set.has("practical") && set.has("analytical"))
    return "You want to build things that work — and understand why they work. Engineering, product, medicine, architecture all reward this combination.";
  if (set.has("entrepreneurial"))
    return "You're pulled toward starting things. That energy is the raw material for founding a company, but also for leading inside one.";
  return "Your interest profile leans in one clear direction. Careers that don't play to your dominant interest will feel like uphill work.";
}

function strengthTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("focus") && set.has("logic"))
    return "Deep-focus + logical reasoning is the exact combo that reward-compounds in engineering, research, quant work, and medicine. Rare and valuable.";
  if (set.has("creativity") && set.has("writing"))
    return "You have taste AND the discipline to translate ideas into finished output. Most creative people have one, not both.";
  if (set.has("empathy") && set.has("speaking"))
    return "You read the room and can talk to it. Teaching, therapy, sales, and any people-leading role rewards this combination.";
  if (set.has("leadership") && set.has("speaking"))
    return "You're built to be in front. Look for careers where being visible early is a feature, not a bug.";
  return "You have real strengths here — the question isn't whether they're valuable, but which career pays you the most for exactly these.";
}

function weaknessTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("procrastination") && set.has("perfectionism"))
    return "The perfectionism-procrastination loop is the classic \"brilliant but can't ship\" trap. Look for careers with tight external deadlines that force output — solo craft careers will burn you.";
  if (set.has("social_drain"))
    return "People drain you. That's not a flaw — but it means you need real recovery time, and client-heavy careers (sales, consulting, hospitality) will run you down. Deep-focus work is your friend.";
  if (set.has("boredom"))
    return "You quit things when they get boring. Look for careers with genuine variety — early startups, journalism, medicine, or roles that rotate you through problems.";
  if (set.has("conflict_avoid"))
    return "You avoid hard conversations. In careers where the hard conversation IS the job (management, therapy, senior leadership), you'll need to build this deliberately.";
  return "Every dominant weakness cuts off some careers cleanly. Better to know now than in year three.";
}

function valuesTakeaway(top) {
  const set = new Set(top.map(([k]) => k));
  if (set.has("money") && set.has("balance"))
    return "You want serious money and real work-life balance. Both are possible — but rarely in year 1. Most people who end up with both got the money first, then bought the balance.";
  if (set.has("freedom") && set.has("stability"))
    return "You want autonomy AND predictability. Look at established solo careers (medicine, law, senior craft roles) or senior positions at stable companies. Avoid raw startups.";
  if (set.has("impact") && set.has("money"))
    return "Impact and money together is possible — but narrower than either alone. Look at impact-investing, tech-for-good, or founding something that solves a real problem.";
  if (set.has("creativity_val") && set.has("prestige"))
    return "You want to make things AND be known for them. Both are possible but usually delayed — most respected creatives went unknown for 5–10 years first.";
  if (top[0] && top[0][0] === "impact")
    return "Meaning matters more than money to you. That's clarifying — a lot of high-paying careers will feel hollow, and you'd be right to skip them.";
  if (top[0] && top[0][0] === "money")
    return "You're honest about wanting real financial rewards. That's clarifying — the careers that pay well demand specific tradeoffs, and you're ready for them.";
  return "Your value profile is what should filter your career list first. Careers that violate your top value will burn you out even if you're technically good at them.";
}

function workstyleTakeaway(picks) {
  const set = new Set(picks);
  const parts = [];
  if (set.has("solo")) parts.push("You work best alone with deep focus — steer toward craft, research, or engineering roles that protect quiet stretches");
  if (set.has("team")) parts.push("You work best with a team — solo research or senior craft roles will feel isolating");
  if (set.has("structured")) parts.push("You need a clear plan — early-stage startups will feel like chaos");
  if (set.has("flexible")) parts.push("You want room to figure it out — rigid corporate roles will suffocate");
  if (set.has("bigpicture")) parts.push("You care about the big picture — pure execution roles will bore you");
  if (set.has("detail")) parts.push("You care about every detail — careers built on precision (law, medicine, engineering, editing) reward this");
  if (set.has("fast")) parts.push("You want to move fast — slow-moving traditional industries will frustrate you");
  if (set.has("careful")) parts.push("You'd rather go slow and get it right — fast startup cultures will feel reckless to you");
  if (set.has("risk")) parts.push("You're comfortable with big bets — startup and founder paths fit");
  if (set.has("safe")) parts.push("You prefer steady, safe wins — established companies and government roles fit");
  if (set.has("theory")) parts.push("You want to understand before doing — research and academia reward this");
  if (set.has("doing")) parts.push("You learn by trying and failing — startup and hands-on roles fit");
  if (set.has("front")) parts.push("You lead by being the loudest voice — CEO / director / speaker roles fit");
  if (set.has("back")) parts.push("You lead by making others look good — behind-the-scenes producer, chief-of-staff, senior mentor roles fit");
  if (set.has("specialist")) parts.push("You want one deep obsession — expert / craft / research roles reward this");
  if (set.has("generalist")) parts.push("You want many things at once — founder, PM, journalist, and consulting roles reward this");
  if (!parts.length) return "Your work-style preferences should filter your career list at the environment level — before job title even matters.";
  return parts.slice(0, 3).join("; ") + ".";
}

// A short, distinctive 2-line "signature" — what makes this student specific
// Signature — 1-2 sentence "who this person is at their core" line.
// Composed from slot pools so two users with the same top interest but
// different secondary strengths (or different exact scores) diverge.
const SIG_INTEREST_STRENGTH = [
  ({iP, iN, sP, sN, s2P, s2N}) => `Your pull toward ${iP} (${iN}) runs on ${sP} (${sN})${s2P ? `, backed by ${s2P} at ${s2N}` : ""} — that's the engine to build a career around.`,
  ({iP, iN, sP, sN, s2P, s2N}) => `${cap(iP)} (${iN}) is the pull; ${sP} (${sN}) is what makes it more than a preference${s2P ? `, and ${s2P} at ${s2N} keeps it durable` : ""}.`,
  ({iP, iN, sP, sN, s2P, s2N}) => `You're wired for ${iP} (${iN}) and you have the ${sP} (${sN}) to actually do it${s2P ? ` — ${s2P} at ${s2N} is the safety net` : ""}.`,
  ({iP, iN, sP, sN, s2P, s2N}) => `Two numbers point in the same direction: ${iP} at ${iN} (interest) and ${sP} at ${sN} (strength)${s2P ? `, with ${s2P} (${s2N}) as a second strength that fits` : ""}.`,
  ({iP, iN, sP, sN, s2P, s2N}) => `The pattern is clear: ${iP} (${iN}) is where your attention wants to go, and ${sP} (${sN}) is what you're actually good at when it gets there${s2P ? `. ${cap(s2P)} at ${s2N} adds range.` : "."}`,
  ({iP, iN, sP, sN, s2P, s2N}) => `You're the ${iP}-plus-${sP} shape — ${iN} on the interest, ${sN} on the strength${s2P ? `, and ${s2P} at ${s2N} rounds it out` : ""}. That combination is rarer than you'd think.`,
];
const SIG_INTEREST_ONLY = [
  ({iP, iN}) => `You're drawn to ${iP} (${iN}) — the interest is real, but the strengths to power it haven't yet cleared the middle.`,
  ({iP, iN}) => `Your ${iP} pull scored ${iN}. What's missing is the strength to convert it — that's your next thing to build.`,
  ({iP, iN}) => `${cap(iP)} (${iN}) is loud in your quizzes; the strengths quiz was quieter. The interest is the compass; you need to sharpen a strength to move.`,
];
const SIG_STRENGTH_ONLY = [
  ({sP, sN}) => `Your one clear strength is ${sP} at ${sN} — start from the strength, work backward to which fields pay best for it.`,
  ({sP, sN}) => `${cap(sP)} scored ${sN} — that's the leverage. The interest side hasn't sharpened yet, but the strength buys you time to explore.`,
  ({sP, sN}) => `You've got real ${sP} (${sN}). The question isn't whether it's useful — it's which field pays most for exactly this.`,
];
const SIG_NEUTRAL = [
  "Nothing in your scores punched above the middle yet — that's real signal, not a bug. It usually means you haven't had the experiences that force preferences to sharpen.",
  "Your scores landed near the middle across the board. That's more common than you'd think at your age, and it's a real signal to go try wildly different things.",
  "The quizzes didn't sort you into a strong lane. Two paths: retake them and lean toward the ends of each scale, or use the sim to force yourself into decisions and see what surfaces.",
];

// Value tail — 4 skeleton variants per value key so users with the same
// top value but different scores get different sentences.
const SIG_VALUE_TAIL = {
  money: [
    (n) => `Money matters (${n}) — not the only thing, but on the list and honestly there.`,
    (n) => `You're clear that the paycheck matters (${n}) — no need to pretend otherwise.`,
    (n) => `Financial upside scored ${n} — treat that as a filter, not a dirty secret.`,
    (n) => `Getting paid well is on your list (${n}). The careers that do it best demand specific tradeoffs; you're ready for them.`,
  ],
  impact: [
    (n) => `Impact scored ${n} — you want the day to matter for someone else.`,
    (n) => `You want work that changes something (${n}). A lot of high-paying jobs will feel hollow to you; skip them.`,
    (n) => `Meaning outranked money on your list (${n}) — that clarifies which fields are actually candidates.`,
    (n) => `Real-world impact hit ${n} — the compass will point away from careers that only pay well.`,
  ],
  freedom: [
    (n) => `Autonomy over your day scored ${n} — that filters out about 80% of first jobs on its own.`,
    (n) => `Freedom hit ${n} — you'll be miserable in any job that treats your calendar as company property.`,
    (n) => `Owning your time matters (${n}). Solo, freelance, senior, and founder tracks are where this gets satisfied first.`,
    (n) => `${n} on autonomy means the classic "put in your dues" path will chafe more than usual — pick fields that trust juniors early.`,
  ],
  prestige: [
    (n) => `Being respected at the top of a field matters (${n}) — pick a field where the top is worth being at.`,
    (n) => `Prestige scored ${n} — that's honest, and it should shape which fields you enter, not just which jobs.`,
    (n) => `You want the field to know your name (${n}). Fine — but the long apprenticeship is the price.`,
    (n) => `Status inside a serious community scored ${n} — a real filter, not a shallow one.`,
  ],
  stability: [
    (n) => `Stability scored ${n} — a trustworthy path, not a lottery ticket, is what you want.`,
    (n) => `You want the ground to feel solid (${n}). Established fields with clear paths (medicine, law, corporate engineering) fit; startup roulette doesn't.`,
    (n) => `${n} on stability means volatility will cost you more than it costs most people. Pick institutions, not adventures.`,
    (n) => `A steady paycheck ranks higher than upside for you (${n}) — don't feel bad about it; a lot of people fake the opposite.`,
  ],
  growth: [
    (n) => `Learning scored ${n} — you'll measure jobs by what you're becoming, not just by what you're earning.`,
    (n) => `${n} on growth means a plateau is worse than a paycut for you.`,
    (n) => `You want to be sharper every year (${n}). Filter for cultures where senior people are still learning.`,
    (n) => `${n} on growth is a real filter — most people say they want it; you'll notice fast when it's absent.`,
  ],
  balance: [
    (n) => `Life outside work scored ${n} — louder than most Grade 10 profiles would admit.`,
    (n) => `Balance hit ${n} — the "grind culture" tracks (finance, early startups, big-law) will drain you faster than they build you.`,
    (n) => `${n} on balance means the specific company matters more than the field — some in the same field respect evenings, most don't.`,
    (n) => `You want a real life next to the job (${n}). Not selfish — clarifying. Rule out any culture that treats it as weakness.`,
  ],
  creativity_val: [
    (n) => `Making things you own scored ${n} — not managing what others make.`,
    (n) => `${n} on creative-ownership means "manager of a creative team" won't scratch it long-term. You need to be the maker.`,
    (n) => `You want to be the one shipping (${n}) — filter for roles where the output has your name on it.`,
    (n) => `Creative ownership hit ${n} — a real filter. Most creative-adjacent jobs are actually creative-adjacent-management; you'd notice.`,
  ],
};

function buildSignature(dims) {
  const iEntries = Object.entries(dims.interests || {}).sort((a,b) => b[1] - a[1]);
  const sEntries = Object.entries(dims.strengths || {}).sort((a,b) => b[1] - a[1]);
  const wEntries = Object.entries(dims.weaknesses || {}).sort((a,b) => b[1] - a[1]);
  const vEntries = Object.entries(dims.values || {}).sort((a,b) => b[1] - a[1]);
  const [ti, ts] = [iEntries[0], sEntries[0]];
  const [ts2] = [sEntries[1]];
  const tw = wEntries[0];
  const [v1, v2] = vEntries;
  const iStrong = ti && ti[1] >= 55;
  const sStrong = ts && ts[1] >= 55;
  const wStrong = tw && tw[1] >= 55;
  const seed = profileSeed(dims);

  const pieces = [];

  if (iStrong && sStrong) {
    const slot = {
      iP: phraseFor(INTEREST_PHRASE, ti[0], seed, 29) || DIM_LABELS.interests[ti[0]],
      iN: ti[1],
      sP: phraseFor(STRENGTH_PHRASE, ts[0], seed, 31) || DIM_LABELS.strengths[ts[0]],
      sN: ts[1],
      s2P: ts2 && ts2[1] >= 55 ? (phraseFor(STRENGTH_PHRASE, ts2[0], seed, 37) || DIM_LABELS.strengths[ts2[0]]) : null,
      s2N: ts2 && ts2[1] >= 55 ? ts2[1] : null,
    };
    pieces.push(pickSlot(SIG_INTEREST_STRENGTH, seed, 43)(slot));
  } else if (iStrong) {
    pieces.push(pickSlot(SIG_INTEREST_ONLY, seed, 47)({
      iP: phraseFor(INTEREST_PHRASE, ti[0], seed, 29) || DIM_LABELS.interests[ti[0]],
      iN: ti[1],
    }));
  } else if (sStrong) {
    pieces.push(pickSlot(SIG_STRENGTH_ONLY, seed, 53)({
      sP: phraseFor(STRENGTH_PHRASE, ts[0], seed, 31) || DIM_LABELS.strengths[ts[0]],
      sN: ts[1],
    }));
  } else {
    pieces.push(pickSlot(SIG_NEUTRAL, seed, 59));
  }

  // Value piece — combined phrase when two top values are close & both >=60,
  // else score-specific single-value phrase from the pool.
  const s1 = v1?.[1] || 0, s2v = v2?.[1] || 0;
  const close = v1 && v2 && s1 >= 60 && s2v >= 60 && (s1 - s2v) <= 15;

  if (close) {
    const combined = combinedValuePhrase(v1[0], v2[0]);
    if (combined) { pieces.push(combined); return pieces.join(" "); }
  }
  if (v1 && s1 >= 55) {
    const pool = SIG_VALUE_TAIL[v1[0]];
    if (pool) pieces.push(pickSlot(pool, seed, 61)(s1));
    else pieces.push(`Your top value is ${DIM_LABELS.values[v1[0]]} (${s1}).`);
  } else if (wStrong) {
    pieces.push(`Your loudest signal is a weakness (${DIM_LABELS.weaknesses[tw[0]]} at ${tw[1]}) — worth naming, because it will show up on the job whether you plan for it or not.`);
  }

  return pieces.join(" ");
}

// Single-value phrasings — assert what's true, don't deny what might also be
function singleValuePhrase(v) {
  return {
    money: "Real financial rewards are on your list, and prominently.",
    impact: "You want work that actually changes something for someone.",
    freedom: "Autonomy over your day matters to you.",
    prestige: "Being genuinely respected at the top of your field matters.",
    stability: "A trustworthy path — not a lottery ticket — is what you want.",
    growth: "You measure a career by what you learn as much as what you earn.",
    balance: "Your life outside work matters as much as inside.",
    creativity_val: "Making things you own — not just running things — is core to you.",
  }[v] || null;
}

// When two top values are close, name both honestly
function combinedValuePhrase(a, b) {
  const key = [a, b].sort().join("+");
  return {
    "money+stability": "You want financial upside AND a paycheck you can trust — demanding but not impossible.",
    "balance+money": "Money AND real work-life balance — most people who end up with both got the money first, then bought the balance.",
    "balance+stability": "A safe path with real evenings — that's your shortlist.",
    "impact+money": "Impact AND money — a narrower list, but real.",
    "freedom+stability": "Autonomy AND predictability — you'd fit senior roles at stable companies more than raw startups.",
    "creativity_val+prestige": "Making things AND being known for them — both take a decade, both are possible.",
    "growth+stability": "You want to grow hard AND feel safe — established companies with strong learning cultures fit best.",
    "freedom+money": "You want to earn well AND own your calendar — that combination usually comes after you've earned first.",
    "growth+money": "You want to learn AND earn — you'd thrive where compensation tracks skill, not seniority.",
    "impact+stability": "You want meaningful work AND a paycheck you can count on — medicine, teaching, and policy roles fit.",
    "creativity_val+freedom": "You want to make things AND own your calendar — freelance and founder paths sit here.",
    "creativity_val+money": "Making things AND getting paid well for them — a narrow but growing list (product design, senior creative director, filmmaker).",
    "balance+impact": "Meaningful work AND real evenings — a rare combination, but not impossible in policy, teaching, or established nonprofits.",
    "impact+prestige": "You want to be known for work that matters — not just work that pays.",
    "growth+prestige": "Learning hard AND being recognized for it — the classic top-of-field profile.",
    "creativity_val+growth": "You want to make things AND get better at making them every year — the craft profile.",
    "balance+growth": "You want to grow AND still be home for dinner — established companies with real learning cultures.",
    "balance+freedom": "You want to own your time in two directions — freelance, senior craft, and small business paths fit best.",
    "freedom+impact": "Freedom AND meaningful work — a common founder profile, but also senior consulting and independent research.",
    "freedom+growth": "Autonomy AND constant learning — the classic self-directed profile.",
  }[key] || null;
}

// Behavioural patterns — enumerated dynamically from the user's actual score
// pairs, then scored so we only surface the strongest 4. Every pattern's copy
// bakes in the exact numbers so two users with slightly different scores get
// visibly different sentences.
function buildPatterns(dims) {
  const s = dims.strengths || {}, w = dims.weaknesses || {}, v = dims.values || {}, i = dims.interests || {};
  const g = (obj, k) => obj[k] || 0;
  const candidates = [];

  // Rarity phrase whose wording shifts with the pair's average strength.
  const rare = (a, b) => {
    const avg = (a + b) / 2;
    if (avg >= 78) return "Genuinely uncommon at this age";
    if (avg >= 68) return "A rare combination";
    if (avg >= 60) return "An unusual combination";
    return "A notable combination";
  };

  const push = (a, b, title, detail) => {
    // Score = min of the pair (both must be high to matter) + a bonus for how
    // far above threshold. Ties broken by which pair has the higher secondary.
    const rank = Math.min(a, b) + (a + b) / 20;
    candidates.push({ rank, title, detail });
  };

  // ---- STRENGTH × STRENGTH pairs
  if (g(s,"speaking") >= 60 && g(s,"leadership") >= 60)
    push(s.speaking, s.leadership,
      `Front-of-room capable (${s.speaking} speaking, ${s.leadership} leadership)`,
      `${rare(s.speaking, s.leadership)} — most people fear the room; you scan it. In careers where visibility compounds (management, teaching, sales, founding), this is a multiplier from year one.`);

  if (g(s,"focus") >= 65 && g(s,"logic") >= 60)
    push(s.focus, s.logic,
      `Long-focus problem-solver (focus ${s.focus}, logic ${s.logic})`,
      `You can sit with a hard problem for hours without needing to talk it out — that focus number is ${scoreBand(s.focus)}, paired with logic at ${s.logic}. Engineering, research, quant work, and diagnostic medicine reward this rhythm.`);

  if (g(s,"creativity") >= 65 && g(s,"focus") >= 55)
    push(s.creativity, s.focus,
      `Creative AND finisher (creativity ${s.creativity}, focus ${s.focus})`,
      `Most creative people don't ship; most finishers don't invent. Your creativity at ${s.creativity} plus focus at ${s.focus} is the signature of people who get respected in creative fields, not just called talented.`);

  if (g(s,"writing") >= 60 && g(s,"logic") >= 60)
    push(s.writing, s.logic,
      `Thinks clearly on paper (writing ${s.writing}, logic ${s.logic})`,
      `You can hold a hard argument in your head and get it down clearly — writing at ${s.writing} with logic at ${s.logic}. Law, research, senior consulting, and journalism are built on this exact pairing.`);

  if (g(s,"empathy") >= 60 && g(s,"speaking") >= 55)
    push(s.empathy, s.speaking,
      `Reads AND talks to a room (empathy ${s.empathy}, speaking ${s.speaking})`,
      `You notice what people actually feel and can respond to it out loud. That's the exact combination that separates a good teacher, therapist, or manager from a technically-fine one.`);

  if (g(s,"hands") >= 60 && g(i,"practical") >= 55)
    push(s.hands, i.practical,
      `Needs to make things real (hands ${s.hands}, practical interest ${i.practical})`,
      `You want a day that ends with an artifact you can touch — engineering, surgery, architecture, kitchens, industrial design all fit this energy.`);

  if (g(s,"leadership") >= 60 && g(i,"entrepreneurial") >= 60)
    push(s.leadership, i.entrepreneurial,
      `Builder profile (leadership ${s.leadership}, entrepreneurial interest ${i.entrepreneurial})`,
      `You want to lead AND you're drawn to starting things. Founder / product / general-management paths are where this pair pays fastest.`);

  if (g(s,"empathy") >= 60 && g(s,"writing") >= 55)
    push(s.empathy, s.writing,
      `Sensitive AND articulate (empathy ${s.empathy}, writing ${s.writing})`,
      `You notice subtle things about people and can put them into words. Fiction, journalism, therapy, UX research — anywhere the job is naming what others can only feel.`);

  // ---- WEAKNESS × WEAKNESS / WEAKNESS × VALUE
  if (g(w,"procrastination") >= 60 && g(w,"perfectionism") >= 60)
    push(w.procrastination, w.perfectionism,
      `The perfectionism → procrastination loop (${w.perfectionism} / ${w.procrastination})`,
      `Both scored above 60. That's not laziness — it's fear of shipping something imperfect. Look for cultures where "ship, then iterate" is the norm (product, startups, journalism) rather than "one perfect submission" (academia, some parts of law).`);

  if (g(w,"social_drain") >= 60 && g(v,"balance") >= 60)
    push(w.social_drain, v.balance,
      `Needs recovery time (social drain ${w.social_drain}, balance value ${v.balance})`,
      `People drain you and you value your evenings. Client-heavy careers (sales, hospitality, front-line consulting) will burn you out fast; look for roles where deep-focus days are protected.`);

  if (g(w,"conflict_avoid") >= 60 && g(s,"leadership") >= 55)
    push(w.conflict_avoid, s.leadership,
      `Leads but dodges friction (leadership ${s.leadership}, conflict-avoidance ${w.conflict_avoid})`,
      `You have the instinct to lead but avoid hard conversations. In careers where the hard conversation IS the job (management, therapy, HR, senior legal), you'll need to build this deliberately — it's learnable but rarely from a book.`);

  if (g(w,"boredom") >= 60 && g(v,"stability") >= 60)
    push(w.boredom, v.stability,
      `Bored fast but wants safe (boredom ${w.boredom}, stability ${v.stability})`,
      `You get bored quickly but also want a stable path — that's a real tension. Look for stable-yet-varied roles: rotational programs at big companies, hospital medicine, teaching different subjects.`);

  // ---- VALUE × VALUE
  if (g(v,"money") >= 60 && g(v,"impact") >= 60)
    push(v.money, v.impact,
      `Wants money AND meaning (${v.money} / ${v.impact})`,
      `Often called impossible — it isn't, but it narrows the field. Impact-investing, health tech, climate tech, or founding something that solves a real problem are where both scores get satisfied at once.`);

  if (g(v,"freedom") >= 65 && g(s,"focus") >= 55)
    push(v.freedom, s.focus,
      `Autonomy is non-negotiable AND you can use it (${v.freedom} / focus ${s.focus})`,
      `Most people who crave freedom struggle without structure — your focus at ${s.focus} means you probably wouldn't. Solo craft, freelance, founder, and independent research paths all sit here.`);

  if (g(v,"stability") >= 60 && g(v,"growth") >= 60)
    push(v.stability, v.growth,
      `Wants to grow AND feel safe (${v.growth} / ${v.stability})`,
      `Look at established companies with strong internal learning cultures, or slower-moving fields where expertise compounds over years (medicine, law, architecture) rather than raw startup chaos.`);

  if (g(v,"creativity_val") >= 60 && g(v,"freedom") >= 60)
    push(v.creativity_val, v.freedom,
      `Wants to make things AND own the calendar (${v.creativity_val} / ${v.freedom})`,
      `The freelance-creative / founder-artist profile. Real, but almost always requires 2-5 years of unglamorous training in someone else's shop first.`);

  if (g(v,"growth") >= 60 && g(v,"prestige") >= 60)
    push(v.growth, v.prestige,
      `Wants to master AND be recognised (${v.growth} / ${v.prestige})`,
      `The classic top-of-field profile — surgeons, senior researchers, respected creative directors. All require a long unglamorous apprenticeship where recognition doesn't yet exist.`);

  // ---- INTEREST × STRENGTH sanity
  if (g(i,"analytical") >= 60 && g(s,"logic") >= 65)
    push(i.analytical, s.logic,
      `Pattern-oriented mind (analytical interest ${i.analytical}, logic strength ${s.logic})`,
      `Both scores line up — the interest is real, not just wishful. Data, research, engineering, and quantitative finance will feel like home.`);

  if (g(i,"investigative") >= 60 && g(s,"focus") >= 60)
    push(i.investigative, s.focus,
      `Real curiosity, real patience (investigative ${i.investigative}, focus ${s.focus})`,
      `You ask "but why?" and can actually sit with the answer. Research, medicine, and long-form journalism all pay for this exact rhythm.`);

  candidates.sort((a, b) => b.rank - a.rank);
  return candidates.slice(0, 4).map(({ title, detail }) => ({ title, detail }));
}

// Tensions — where the profile disagrees with itself. Enumerated dynamically,
// scored by how strong BOTH sides are, then the top 3 are surfaced. Every
// tension bakes in the exact numbers so a 62 vs 88 pairing reads differently.
function buildContrasts(dims) {
  const v = dims.values || {}, w = dims.weaknesses || {}, s = dims.strengths || {}, i = dims.interests || {};
  const g = (obj, k) => obj[k] || 0;
  const cands = [];
  const push = (a, b, text) => cands.push({ rank: Math.min(a, b), text });

  if (g(v,"money") >= 60 && g(v,"balance") >= 60)
    push(v.money, v.balance,
      `You want serious money (${v.money}) AND real work-life balance (${v.balance}). Both are possible — but almost never in the same first job. The people who end up with both usually got the money first (5-10 years of long weeks) and bought back the balance later.`);

  if (g(v,"money") >= 60 && g(v,"stability") >= 60)
    push(v.money, v.stability,
      `You want financial upside (${v.money}) AND a paycheck you can count on (${v.stability}). Medicine, senior engineering, and mid-career corporate roles unlock both — but expect the first 5 years to feel like you had to pick one.`);

  if (g(v,"freedom") >= 60 && g(v,"stability") >= 60)
    push(v.freedom, v.stability,
      `Autonomy (${v.freedom}) AND predictability (${v.stability}) pull in opposite directions. The paths that hold both — established solo practices, senior roles at stable companies, tenured academia — all require putting in years first under someone else's calendar.`);

  if (g(s,"creativity") >= 60 && g(v,"prestige") >= 60)
    push(s.creativity, v.prestige,
      `You're creative (${s.creativity}) AND want to be respected (${v.prestige}). The uncomfortable truth: most respected creatives went unpaid and unknown for 5-10 years. Decide now whether that lag is acceptable — most people who quit did so in year 3.`);

  if (g(v,"impact") >= 60 && g(v,"money") >= 60 && g(w,"social_drain") >= 55)
    push(v.impact, w.social_drain,
      `You want impact (${v.impact}) and money (${v.money}), but people-heavy work drains you (social-drain ${w.social_drain}). Most impact-and-money careers are relational — look at deep-research, product-engineering, or writing paths where impact travels through the artifact, not through the daily meeting.`);

  if (g(v,"creativity_val") >= 60 && g(v,"stability") >= 60)
    push(v.creativity_val, v.stability,
      `Making things (${v.creativity_val}) AND a stable income (${v.stability}) is the hardest common combo. The workable versions are salaried creative roles (product designer, in-house writer, staff filmmaker) — not freelance, not "founder-artist," at least not first.`);

  if (g(v,"impact") >= 60 && g(v,"prestige") >= 60)
    push(v.impact, v.prestige,
      `You want to matter (${v.impact}) AND to be known (${v.prestige}). Not contradictory — but be honest with yourself about which is louder when you're making a career choice, because most jobs weight one heavily.`);

  if (g(s,"leadership") >= 60 && g(w,"conflict_avoid") >= 55)
    push(s.leadership, w.conflict_avoid,
      `You want to lead (${s.leadership}) but avoid hard conversations (${w.conflict_avoid}). Leadership is almost entirely the hard conversation. This is learnable, but you'll need to build it deliberately — most people don't.`);

  if (g(i,"entrepreneurial") >= 60 && g(v,"stability") >= 60)
    push(i.entrepreneurial, v.stability,
      `You're pulled toward starting things (${i.entrepreneurial}) but also want stability (${v.stability}). "Intrapreneur" roles (product, growth, corporate innovation) or founding after 3-5 years in a stable job usually fit better than a raw first-job startup.`);

  if (g(v,"growth") >= 65 && g(v,"balance") >= 65)
    push(v.growth, v.balance,
      `You want fast growth (${v.growth}) AND real evenings (${v.balance}). The lever is company choice, not job title — some cultures compound skill without burning weekends. Ask about hours before ambition when interviewing.`);

  cands.sort((a, b) => b.rank - a.rank);
  return cands.slice(0, 3).map(x => x.text);
}

function buildSimInsights(sims) {
  const total = sims.length;
  const scores = sims.map(s => s.verdict.score);
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / total);
  const best = sims.slice().sort((a, b) => b.verdict.score - a.verdict.score)[0];
  const worst = sims.slice().sort((a, b) => a.verdict.score - b.verdict.score)[0];
  const spread = Math.max(...scores) - Math.min(...scores);
  let read;
  if (total === 1)
    read = `You've lived one career day so far — ${best.career} scored ${best.verdict.score}. Try one more from a very different field to see if this was a fluke or a real signal.`;
  else if (spread >= 25)
    read = `Your career scores are all over the place (${best.career} at ${best.verdict.score}, ${worst.career} at ${worst.verdict.score}) — meaning your quiz profile and your behaviour disagreed on some careers. That's actually great data: the ones where they agreed are the truest signal.`;
  else if (avg >= 70)
    read = `You handled every career day well on average (${avg}/100). That means you're adaptable — but it also means the sims aren't fully differentiating you yet. Try a career you're pretty sure you'd hate — that contrast will sharpen the report.`;
  else if (avg <= 45)
    read = `Your sim scores are low across the board (${avg}/100). Either the careers you tried aren't yours, OR you're in a mood that made you second-guess yourself. Try again in a week and compare.`;
  else
    read = `Across ${total} sim${total > 1 ? "s" : ""} you averaged ${avg}/100 — mostly middle scores. That usually means you haven't found your lane yet. Try wildly different careers to force the contrast.`;
  return { count: total, average: avg, best: best.career, worst: worst.career, read };
}

// ============================================================
// LLM PROMPTS
// ============================================================
const SIM_SYSTEM = `You simulate one work day in a career, for a 15-16 year old student who has never had a real job. Write in second person, present tense ("You're at your desk when…").

LANGUAGE RULES:
- Use simple, everyday words. Say "use" not "leverage", "keep trying" not "iterate", "person who cares" not "stakeholder".
- If you must use a technical term or acronym, explain it right away in parentheses. Example: "The MD (the senior boss) wants a DCF (a spreadsheet showing what the company is worth) by 6pm."
- Never assume the student knows job jargon — explain everything, every time.

WHAT TO SHOW:
- The real feel of the job: boring parts, pressure, office politics, small wins.
- Each turn: a clock time, a short 2-3 sentence scene, then 3 real choices with no obvious right answer.
- Remember earlier choices — bad calls should cause problems later in the day.
- The day has 11-12 decisions total, morning to evening, then it ends.

Reply with ONLY raw JSON, no markdown:
{"time":"9:15 AM","scene":"...","choices":["...","...","..."],"stat":{"label":"short status e.g. 'Boss is waiting'","tone":"neutral|good|bad"},"done":false}
After 11-12 decisions, set done:true, choices:[], and make scene the last beat of the day.`;

const VERDICT_SYSTEM = `You are a blunt, insightful career coach analyzing how a Grade 10 student behaved during a simulated day at a specific career. Based on their profile, quiz results, and every choice they made, produce a fit report. Be honest — if it's a bad fit, say so and why. No flattery, but be encouraging about what DID work.

Use simple, warm language. Avoid jargon.

Respond ONLY with raw JSON:
{"score":72,"headline":"one punchy sentence verdict","energized":["...","..."],"drained":["...","..."],"reality":"2-3 sentences of blunt reality about this career they should know (hours, real path, what actually gets people ahead)","fitFor":"one sentence describing the kind of person this job IS right for"}`;

const COMPARE_SYSTEM = `You are a career coach. The student has simulated multiple careers AND completed personality/interest/values quizzes. Compare all their data and tell them which career actually fits them best.

Respond ONLY with raw JSON:
{"winner":"career name","ranking":[{"career":"...","score":72,"oneLiner":"..."}],"reasoning":"3-4 sentences on why the winner fits, referencing specific behavior AND quiz results","nextStep":"one concrete thing to do in the next 6 months to test this in real life"}`;

const REPORT_SYSTEM = `You are a career coach writing a comprehensive Career Compass Report for a Grade 10 student. You have their full profile: interests, strengths, weaknesses, values, work style, and any career simulations they've completed.

Write in warm, direct, jargon-free language a 15-year-old will understand. Be specific and actionable.

Respond ONLY with raw JSON:
{
  "headline": "one-sentence summary of who this student is (as a future worker)",
  "profile": "3-4 sentence portrait of their personality and how they work best",
  "topFields": [{"field":"e.g. Finance & Strategy","fit":85,"why":"one sentence"}],
  "topCareers": [{"career":"specific job title","fit":88,"why":"one sentence using their actual quiz results"}],
  "avoid": [{"career":"specific job title","why":"one sentence"}],
  "superpowers": ["short phrase","short phrase","short phrase"],
  "watchouts": ["short phrase","short phrase"],
  "sixMonthPlan": ["specific thing to try","specific thing to try","specific thing to try"]
}
Include 3-5 topFields, 4-6 topCareers, 2-3 avoid, 3 superpowers, 2-3 watchouts, 3 plan items.`;

// ============================================================
// STATE
// ============================================================
const store = {
  get(k, fallback) {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// Per-account key namespace — data is stored under cc_u:{email}:{base} when logged in,
// or cc_{base} for the guest / not-logged-in state
function dataKey(base, email) {
  return email ? `cc_u:${email}:${base}` : `cc_${base}`;
}

const _initUser = store.get("cc_user", null);
const _initEmail = _initUser?.email || null;

const state = {
  screen: store.get("cc_screen", "landing"),
  user: _initUser,
  dark: store.get("cc_dark_v2", true),
  quizAnswers: store.get(dataKey("quizAnswers", _initEmail), {}),
  completedSims: store.get(dataKey("sims", _initEmail), []),
  report: store.get(dataKey("report", _initEmail), null),

  // ephemeral
  currentQuiz: null,
  currentQuizIdx: 0,
  authMode: "signup",
  careerFilter: "All",
  currentCareer: null,
  sim: { log: [], current: null, history: [], loading: false, error: null },
  simNote: false,
  palette: false,
  lastVerdict: null,
  compareResult: null,
  reportLoading: false,
  reportError: null,
};

// One-time migration: if the logged-in user has empty user-namespaced data but there IS
// legacy global data (from before this fix), pull it into the user's namespace so they
// don't lose progress on the upgrade.
if (_initEmail) {
  const hasUserData = Object.keys(state.quizAnswers).length || state.completedSims.length || state.report;
  if (!hasUserData) {
    const legacyQ = store.get("cc_quizAnswers", null);
    const legacyS = store.get("cc_sims", null);
    const legacyR = store.get("cc_report", null);
    const hasLegacy = (legacyQ && Object.keys(legacyQ).length) || (legacyS && legacyS.length) || legacyR;
    if (hasLegacy) {
      state.quizAnswers = legacyQ || {};
      state.completedSims = legacyS || [];
      state.report = legacyR || null;
    }
  }
}

function persist() {
  store.set("cc_screen", state.screen);
  store.set("cc_user", state.user);
  store.set("cc_dark_v2", state.dark);
  const email = state.user?.email || null;
  store.set(dataKey("quizAnswers", email), state.quizAnswers);
  store.set(dataKey("sims", email), state.completedSims);
  store.set(dataKey("report", email), state.report);
}

// Called on successful login — swap current data with the user's saved data
function loadAccountData(email) {
  state.quizAnswers = store.get(dataKey("quizAnswers", email), {});
  state.completedSims = store.get(dataKey("sims", email), []);
  state.report = store.get(dataKey("report", email), null);
}

// Transient bottom-of-screen note (e.g. support email). Non-blocking, auto-dismisses.
function showNote(msg) {
  document.querySelector(".app-note")?.remove();
  const el = document.createElement("div");
  el.className = "app-note";
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.dark ? "dark" : "light");
}

// ============================================================
// LLM
// ============================================================
async function askClaude(messages, system, maxTokens = 1200) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });
  const data = await res.json();
  const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
  const clean = text.replace(/```json|```/g, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  return JSON.parse(clean.slice(start, end + 1));
}

// ============================================================
// HELPERS
// ============================================================
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function scoreClass(s) { return s >= 75 ? "high" : s >= 50 ? "mid" : "low"; }

function scoreRing(score, size = 88) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const color = score >= 75 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)";
  const offset = c * (1 - score / 100);
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="flex-shrink:0">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="8" />
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="8"
        stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"
        transform="rotate(-90 ${size/2} ${size/2})" style="transition:stroke-dashoffset .8s ease" />
      <text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="central"
        style="font-family:var(--font-mono);font-weight:600;letter-spacing:-0.02em;font-size:${size*0.32}px;fill:var(--ink)">${score}</text>
    </svg>`;
}

function spinner(label) {
  return `<div class="spinner"><span class="spinner-dot"></span>${esc(label)}</div>`;
}

function profileText() {
  const parts = [];
  for (const q of QUIZZES) {
    const ans = state.quizAnswers[q.key] || {};
    const answered = Object.keys(ans).length;
    if (answered === 0) continue;
    let summary;
    if (q.binary) {
      summary = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${it.opts.find(o => o.tag === ans[i])?.label}` : null).filter(Boolean).slice(0, 4).join("; ");
    } else {
      summary = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} (${q.scale[ans[i]]})` : null).filter(Boolean).slice(0, 4).join("; ");
    }
    parts.push(`${q.title}: ${summary}`);
  }
  return parts.join("\n\n") || "(no assessment data yet)";
}

function fullProfileText() {
  const parts = [];
  for (const q of QUIZZES) {
    const ans = state.quizAnswers[q.key] || {};
    if (Object.keys(ans).length === 0) continue;
    let lines;
    if (q.binary) {
      lines = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${it.opts.find(o => o.tag === ans[i])?.label}` : null).filter(Boolean).join("\n");
    } else {
      lines = q.items.map((it, i) => ans[i] !== undefined ? `${it.q} → ${q.scale[ans[i]]}` : null).filter(Boolean).join("\n");
    }
    parts.push(`## ${q.title}\n${lines}`);
  }
  const sims = state.completedSims.map((s) =>
    `Career: ${s.career} (score ${s.verdict.score})\nHeadline: ${s.verdict.headline}\nEnergized: ${s.verdict.energized.join("; ")}\nDrained: ${s.verdict.drained.join("; ")}`
  ).join("\n\n");
  return parts.join("\n\n") + (sims ? `\n\n## Career Sims\n${sims}` : "");
}

// ============================================================
// TOP NAV
// ============================================================
// Authed "hub" screens get the left sidebar chrome instead of the top bar.
const SIDEBAR_SCREENS = new Set(["dashboard", "careers", "sim", "report", "compare", "verdict", "quiz-result"]);

function renderNav() {
  const u = state.user;
  // On sidebar screens the left rail carries all chrome — no top bar.
  if (u && SIDEBAR_SCREENS.has(state.screen)) return "";

  const initial = u ? esc((u.name || u.email)[0].toUpperCase()) : "";
  const shortName = u ? esc(u.name?.split(" ")[0] || u.email.split("@")[0]) : "";
  return `
    <div class="nav">
      <div class="nav-inner">
        <button class="logo" data-action="home">
          <img class="logo-mark" src="logo.png" alt="" />
          <span class="logo-text">The Early Builder</span>
        </button>
        <div class="nav-actions">
          ${u ? `
            <button class="cmdk-trigger" data-action="open-palette" aria-label="Open command menu">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
              <span class="cmdk-trigger-label">Search</span>
              <kbd class="cmdk-kbd">⌘K</kbd>
            </button>
            <div class="user-chip" title="${esc(u.email)}">
              <span class="user-avatar">${initial}</span>
              <span>${shortName}</span>
            </div>
            <button class="btn btn-ghost btn-sm" data-action="logout">Sign out</button>
          ` : (state.screen !== "login" ? `
            <button class="nav-link" data-action="go" data-screen="login">Sign in</button>
            <button class="btn btn-primary btn-sm" data-action="go" data-screen="login">Get started</button>
          ` : "")}
          <button class="theme-toggle" data-action="toggle-theme" aria-label="Toggle theme">
            <span class="theme-toggle-thumb">${state.dark ? "☾" : "☀"}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Left sidebar (authed hub screens) ────────────────────────────
function renderSidebar() {
  const u = state.user;
  const initial = u ? esc((u.name || u.email)[0].toUpperCase()) : "";
  const shortName = u ? esc(u.name?.split(" ")[0] || u.email.split("@")[0]) : "";
  const simsDone = state.completedSims.length;
  const items = [
    { screen: "dashboard", label: "Dashboard", icon: `<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>` },
    { screen: "careers", label: "Careers", icon: `<rect x="2.5" y="6.5" width="19" height="13" rx="2"/><path d="M8.5 6.5V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/>` },
    { screen: "report", label: "Report", icon: `<path d="M4 19V5a1 1 0 0 1 1-1h11l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M8 12h8M8 16h5"/>`, disabled: !state.report },
    { screen: "compare", label: "Compare", icon: `<path d="M12 3v18"/><path d="M6 8l-3 4 3 4"/><path d="M18 8l3 4-3 4"/>`, disabled: simsDone < 2 },
  ];
  const nav = items.map(it => {
    const active = state.screen === it.screen;
    if (it.disabled) {
      return `<span class="side-item disabled" title="Not ready yet"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>${it.label}</span>`;
    }
    return `<button class="side-item ${active ? "active" : ""}" data-action="go" data-screen="${it.screen}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>${it.label}
    </button>`;
  }).join("");

  return `
    <aside class="sidebar">
      <button class="side-logo" data-action="home">
        <img class="logo-mark" src="logo.png" alt="" />
        <span class="logo-text">The Early Builder</span>
      </button>
      <button class="side-cmdk" data-action="open-palette">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        <span>Search or jump…</span>
        <kbd class="cmdk-kbd">⌘K</kbd>
      </button>
      <nav class="side-nav">${nav}</nav>
      <div class="side-foot">
        <div class="user-chip side-user" title="${esc(u?.email || "")}">
          <span class="user-avatar">${initial}</span>
          <span>${shortName}</span>
        </div>
        <div class="side-foot-row">
          <button class="theme-toggle" data-action="toggle-theme" aria-label="Toggle theme">
            <span class="theme-toggle-thumb">${state.dark ? "☾" : "☀"}</span>
          </button>
          <button class="side-signout" data-action="logout">Sign out</button>
        </div>
      </div>
    </aside>
  `;
}

// ── Command palette (⌘K) ─────────────────────────────────────────
function paletteCommands() {
  const cmds = [];
  cmds.push({ label: "Go to Dashboard", hint: "Screen", action: "go", screen: "dashboard", kw: "home" });
  cmds.push({ label: "Browse Careers", hint: "Screen", action: "go", screen: "careers", kw: "simulate jobs" });
  if (state.report) cmds.push({ label: "Open Compass Report", hint: "Screen", action: "go", screen: "report", kw: "results insights" });
  if (state.completedSims.length >= 2) cmds.push({ label: "Compare careers", hint: "Screen", action: "go", screen: "compare", kw: "versus" });
  QUIZZES.forEach(q => {
    const done = Object.keys(state.quizAnswers[q.key] || {}).length === q.items.length;
    cmds.push({ label: q.title, hint: done ? "Quiz · done" : "Quiz", action: "go", screen: (done ? "quiz-result:" : "quiz:") + q.key, kw: "assessment test " + q.key });
  });
  CAREERS.filter(c => SIM_READY.has(c.id)).forEach(c => {
    cmds.push({ label: "Simulate: " + c.label, hint: "Sim · " + (c.subgroup || c.group), action: "start-sim", careerId: c.id, kw: "live day " + (c.subgroup || c.group).toLowerCase() });
  });
  cmds.push({ label: (state.dark ? "Switch to light theme" : "Switch to dark theme"), hint: "Action", action: "toggle-theme", kw: "appearance mode" });
  cmds.push({ label: "Sign out", hint: "Action", action: "logout", kw: "log out" });
  return cmds;
}

function renderCommandPalette() {
  const cmds = paletteCommands();
  const rows = cmds.map((c, i) => {
    const attrs = c.screen ? `data-screen="${esc(c.screen)}"` : c.careerId ? `data-career-id="${esc(c.careerId)}"` : "";
    const search = (c.label + " " + (c.kw || "") + " " + c.hint).toLowerCase();
    return `<button class="cmdk-item ${i === 0 ? "active" : ""}" role="option"
        data-action="${c.action}" ${attrs} data-search="${esc(search)}" data-from-palette="1">
      <span class="cmdk-item-label">${esc(c.label)}</span>
      <span class="cmdk-item-hint">${esc(c.hint)}</span>
    </button>`;
  }).join("");
  return `
    <div class="cmdk-backdrop" data-action="close-palette">
      <div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command menu">
        <div class="cmdk-input-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="cmdk-input" class="cmdk-input" type="text" placeholder="Search screens, quizzes, simulations…" autocomplete="off" spellcheck="false" />
          <kbd class="cmdk-kbd">ESC</kbd>
        </div>
        <div class="cmdk-list" id="cmdk-list">${rows}</div>
        <div class="cmdk-empty" id="cmdk-empty" hidden>No matches.</div>
      </div>
    </div>
  `;
}

// ============================================================
// LANDING
// ============================================================
// Wire the palette after it's in the DOM: focus input, filter on type,
// keep an "active" row for arrow-key + Enter selection.
function mountPalette() {
  const input = document.getElementById("cmdk-input");
  const list = document.getElementById("cmdk-list");
  if (!input || !list) return;
  input.focus();
  const empty = document.getElementById("cmdk-empty");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let firstVisible = null;
    list.querySelectorAll(".cmdk-item").forEach(el => {
      const match = !q || el.dataset.search.includes(q);
      el.hidden = !match;
      el.classList.remove("active");
      if (match && !firstVisible) firstVisible = el;
    });
    if (firstVisible) firstVisible.classList.add("active");
    if (empty) empty.hidden = !!firstVisible;
  });
}

function paletteMove(dir) {
  const list = document.getElementById("cmdk-list");
  if (!list) return;
  const items = [...list.querySelectorAll(".cmdk-item")].filter(el => !el.hidden);
  if (!items.length) return;
  let idx = items.findIndex(el => el.classList.contains("active"));
  if (idx < 0) idx = 0;
  items[idx].classList.remove("active");
  idx = (idx + dir + items.length) % items.length;
  items[idx].classList.add("active");
  items[idx].scrollIntoView({ block: "nearest" });
}

function paletteEnter() {
  const active = document.querySelector("#cmdk-list .cmdk-item.active:not([hidden])");
  if (active) active.click();
}

function closePalette() { if (state.palette) { state.palette = false; render(true); } }

// Monochrome line icons (lucide-style), keyed by career id. Inner SVG paths only.
const CAREER_ICON = {
  ib: `<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 13h20"/>`,
  consult: `<path d="M2 4h20"/><path d="M3 4v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4"/><path d="M12 15v5"/><path d="M9 20l3-3 3 3"/>`,
  quant: `<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>`,
  founder: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`,
  pm: `<circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>`,
  marketing: `<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>`,
  swe: `<path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/>`,
  ml: `<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M20 9h2M20 15h2M2 9h2M2 15h2"/>`,
  designer: `<path d="M15.5 3.5l5 5-9.5 9.5-5-5z"/><path d="M6 13l-3 8 8-3"/><path d="M13.5 5.5l5 5"/>`,
  econ: `<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>`,
  doctor: `<path d="M5 3H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2h-1"/><path d="M8 16v1a5 5 0 0 0 5 5 5 5 0 0 0 5-5v-4"/><circle cx="20" cy="10" r="2"/>`,
  law: `<path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
  teacher: `<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5"/>`,
  journalist: `<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>`,
  director: `<path d="M20.2 6L3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"/><path d="M6.2 5.3l3.1 3.9M12.4 3.4l3.1 4M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
  architect: `<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>`,
  chef: `<path d="M17 21a1 1 0 0 0 1-1v-5.35c1.36-.9 2.35-2.6 2.35-4.5A4.5 4.5 0 0 0 16 5.5a4.5 4.5 0 0 0-8 0A4.5 4.5 0 0 0 3.65 10c0 1.9.99 3.6 2.35 4.5V20a1 1 0 0 0 1 1z"/><path d="M6 17h12"/>`,
  astro: `<path d="M10.06 12.49l-6.18 1.32a.93.93 0 0 1-1.11-.7l-.54-2.15a1.07 1.07 0 0 1 .69-1.27l13.5-4.44"/><path d="M13.56 11.75l4.33-.92"/><path d="M16 21l-3.1-6.21"/><path d="M16.49 5.94a2 2 0 0 1 1.45-2.43l1.09-.27a1 1 0 0 1 1.21.73l1.52 6.06a1 1 0 0 1-.73 1.21l-1.09.27a2 2 0 0 1-2.43-1.45z"/><path d="M6.16 8.63l1.11 4.46"/><path d="M8 21l3.1-6.21"/>`,
};
function careerIcon(id, size = 20) {
  const p = CAREER_ICON[id];
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p || `<circle cx="12" cy="12" r="1.5"/>`}</svg>`;
}
const CAREER_TILE_ACCENT = { "Business & Money": "", "Tech & Science": "cool", "People & Impact": "warm", "Creative": "warm" };

function renderLanding() {
  const ctaScreen = state.user ? "dashboard" : "login";
  const primaryLabel = state.user ? "Open your dashboard →" : "Start free — 2 min →";
  const n = CAREERS.length;

  return `
    <div class="page hz rise">
      <div class="hz-glow" aria-hidden="true"></div>
      <div class="hz-grid" aria-hidden="true"></div>

      <!-- NAV -->
      <div class="hz-nav">
        <button class="hz-brand" data-action="home"><img class="logo-mark" src="logo.png" alt="" style="width:30px;height:30px" /><span class="hz-brand-name">The Early Builder</span></button>
        <div class="hz-nav-links">
          <button class="hz-nav-link" data-action="scroll" data-target="how">How it works</button>
          <button class="hz-nav-link" data-action="scroll" data-target="careers">Careers</button>
          <button class="hz-nav-link" data-action="scroll" data-target="compass">Compass</button>
          <button class="hz-btn-ghost hz-nav-ghost-hide" data-action="go" data-screen="login">Sign in</button>
          <button class="hz-btn-white" data-action="go" data-screen="${ctaScreen}">${state.user ? "Dashboard" : "Get started"}</button>
        </div>
      </div>

      <!-- HERO -->
      <div style="position:relative;padding:80px 40px 0;max-width:900px;margin:0 auto;text-align:center">
        <div class="hz-badge"><b>NEW</b> Live a full day inside ${n} careers <span style="color:var(--sub)">→</span></div>
        <h1 class="hz-h1">Figure out what to <span class="grad-txt">actually</span> do with your life.</h1>
        <p class="hz-lede">Take real assessments, live real careers, and get one honest report on what fits.</p>
        <div style="display:flex;gap:12px;margin-bottom:24px;justify-content:center;flex-wrap:wrap">
          <button class="hz-cta-white" data-action="go" data-screen="${ctaScreen}">${primaryLabel}</button>
          <button class="hz-cta-ghost" data-action="scroll" data-target="how">See how it works</button>
        </div>
      </div>

      <!-- HERO MEDIA -->
      <div style="position:relative;padding:0 40px 84px;max-width:1160px;margin:0 auto">
        <div class="hz-hero-media" style="aspect-ratio:16/9;border:1px solid var(--line2);border-radius:20px;background:var(--panel);overflow:hidden">
          <svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif" style="display:block;width:100%;height:100%">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#16161C"/>
      <stop offset="1" stop-color="#0C0C10"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.6">
      <stop offset="0" stop-color="#2A2A38" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#2A2A38" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="barfill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#F7F8F8"/>
      <stop offset="1" stop-color="#C4C5CC"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <rect width="1600" height="900" fill="url(#glow)"/>
  <!-- SIDEBAR -->
  <rect x="0" y="0" width="300" height="900" fill="#0E0E12"/>
  <line x1="300" y1="0" x2="300" y2="900" stroke="#FFFFFF" stroke-opacity="0.07"/>
  <rect x="28" y="40" width="30" height="30" rx="8" fill="#FFFFFF"/>
  <circle cx="43" cy="55" r="7" fill="none" stroke="#08080B" stroke-width="2"/>
  <path d="M43 50 L46 55 L43 60 L40 55 Z" fill="#08080B"/>
  <text x="72" y="61" font-size="17" font-weight="600" fill="#F7F8F8">The Early Builder</text>
  <rect x="20" y="130" width="260" height="46" rx="11" fill="#FFFFFF" fill-opacity="0.06"/>
  <rect x="40" y="147" width="14" height="14" rx="4" fill="#F7F8F8"/>
  <text x="70" y="159" font-size="15" font-weight="500" fill="#F7F8F8">Dashboard</text>
  <rect x="40" y="205" width="14" height="14" rx="4" fill="#5C616B"/>
  <text x="70" y="217" font-size="15" fill="#8A8F98">Assessments</text>
  <rect x="40" y="263" width="14" height="14" rx="4" fill="#5C616B"/>
  <text x="70" y="275" font-size="15" fill="#8A8F98">Careers</text>
  <rect x="40" y="321" width="14" height="14" rx="4" fill="#5C616B"/>
  <text x="70" y="333" font-size="15" fill="#8A8F98">Compass report</text>
  <rect x="40" y="379" width="14" height="14" rx="4" fill="#5C616B"/>
  <text x="70" y="391" font-size="15" fill="#8A8F98">Settings</text>
  <rect x="20" y="800" width="260" height="60" rx="12" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.07"/>
  <circle cx="52" cy="830" r="15" fill="#1D1D25"/>
  <text x="52" y="835" font-size="13" font-weight="600" fill="#8A8F98" text-anchor="middle">A</text>
  <text x="80" y="826" font-size="14" font-weight="500" fill="#F7F8F8">Alex Rivera</text>
  <text x="80" y="845" font-size="12" fill="#5C616B">Free plan</text>
  <!-- MAIN -->
  <text x="356" y="104" font-size="13" letter-spacing="3" fill="#5C616B" font-family="'JetBrains Mono', ui-monospace, monospace">YOUR COMPASS · UPDATED JUST NOW</text>
  <text x="356" y="158" font-size="38" font-weight="600" fill="#F7F8F8">Good morning, Alex.</text>
  <!-- stat cards -->
  <rect x="356" y="210" width="380" height="150" rx="14" fill="#131318" stroke="#FFFFFF" stroke-opacity="0.08"/>
  <text x="380" y="250" font-size="11" letter-spacing="1.5" fill="#5C616B" font-family="'JetBrains Mono', ui-monospace, monospace">OVERALL</text>
  <text x="380" y="304" font-size="40" font-weight="600" fill="#4CC38A">72%</text>
  <rect x="380" y="326" width="332" height="7" rx="3.5" fill="#1D1D25"/>
  <rect x="380" y="326" width="239" height="7" rx="3.5" fill="#4CC38A"/>
  <rect x="760" y="210" width="380" height="150" rx="14" fill="#131318" stroke="#FFFFFF" stroke-opacity="0.08"/>
  <text x="784" y="250" font-size="11" letter-spacing="1.5" fill="#5C616B" font-family="'JetBrains Mono', ui-monospace, monospace">CAREERS LIVED</text>
  <text x="784" y="304" font-size="40" font-weight="600" fill="#F7F8F8">3</text>
  <text x="784" y="336" font-size="13" fill="#8A8F98">of 12 available</text>
  <rect x="1164" y="210" width="380" height="150" rx="14" fill="#131318" stroke="#FFFFFF" stroke-opacity="0.08"/>
  <text x="1188" y="250" font-size="11" letter-spacing="1.5" fill="#5C616B" font-family="'JetBrains Mono', ui-monospace, monospace">TOP FIT</text>
  <text x="1188" y="304" font-size="40" font-weight="600" fill="#F7F8F8">88</text>
  <text x="1188" y="336" font-size="13" fill="#8A8F98">Product Manager</text>
  <!-- career fit panel -->
  <rect x="356" y="390" width="1188" height="290" rx="14" fill="#101014" stroke="#FFFFFF" stroke-opacity="0.08"/>
  <text x="384" y="436" font-size="18" font-weight="600" fill="#F7F8F8">Career fit</text>
  <text x="1516" y="435" font-size="11" letter-spacing="1.5" fill="#5C616B" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace">TOP 4 OF 12</text>
  <text x="384" y="493" font-size="15" fill="#D4D5D8">Product Manager</text>
  <rect x="700" y="483" width="700" height="10" rx="5" fill="#1D1D25"/>
  <rect x="700" y="483" width="616" height="10" rx="5" fill="url(#barfill)"/>
  <text x="1516" y="493" font-size="14" font-weight="600" fill="#F7F8F8" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace">88</text>
  <text x="384" y="541" font-size="15" fill="#D4D5D8">Startup Founder</text>
  <rect x="700" y="531" width="700" height="10" rx="5" fill="#1D1D25"/>
  <rect x="700" y="531" width="567" height="10" rx="5" fill="url(#barfill)"/>
  <text x="1516" y="541" font-size="14" font-weight="600" fill="#F7F8F8" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace">81</text>
  <text x="384" y="589" font-size="15" fill="#D4D5D8">UX Designer</text>
  <rect x="700" y="579" width="700" height="10" rx="5" fill="#1D1D25"/>
  <rect x="700" y="579" width="518" height="10" rx="5" fill="url(#barfill)"/>
  <text x="1516" y="589" font-size="14" font-weight="600" fill="#F7F8F8" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace">74</text>
  <text x="384" y="637" font-size="15" fill="#D4D5D8">Data Analyst</text>
  <rect x="700" y="627" width="700" height="10" rx="5" fill="#1D1D25"/>
  <rect x="700" y="627" width="483" height="10" rx="5" fill="url(#barfill)"/>
  <text x="1516" y="637" font-size="14" font-weight="600" fill="#F7F8F8" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace">69</text>
  <!-- compass CTA -->
  <rect x="356" y="712" width="1188" height="96" rx="14" fill="#FFFFFF"/>
  <circle cx="412" cy="760" r="18" fill="none" stroke="#08080B" stroke-width="2"/>
  <path d="M412 748 L417 760 L412 772 L407 760 Z" fill="#F2555A"/>
  <circle cx="412" cy="760" r="2.4" fill="#08080B"/>
  <text x="452" y="754" font-size="17" font-weight="600" fill="#08080B">Generate your Compass report</text>
  <text x="452" y="778" font-size="13" fill="#08080B" fill-opacity="0.55">Everything's ready — takes about 20 seconds</text>
  <rect x="1400" y="738" width="116" height="44" rx="22" fill="#08080B"/>
  <text x="1458" y="765" font-size="14" font-weight="600" fill="#FFFFFF" text-anchor="middle" font-family="'JetBrains Mono', ui-monospace, monospace">Open →</text>
</svg>
        </div>
      </div>

      <!-- CAREERS MARQUEE -->
      <div style="position:relative;padding:52px 0 60px;max-width:1240px;margin:0 auto;overflow:hidden">
        <div style="font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--faint);text-transform:uppercase;margin-bottom:22px;padding:0 40px">${n} careers you can live · one honest day each</div>
        <div class="hz-marq-mask">
          <div class="hz-marq">
            ${[...CAREERS, ...CAREERS].map(c => `<span class="hz-chip">${esc(c.label)}</span>`).join("")}
          </div>
        </div>
      </div>

      <!-- WHY IT WORKS -->
      <div id="tests" style="position:relative;padding:100px 40px;max-width:1240px;margin:0 auto">
        <div style="text-align:center;max-width:640px;margin:0 auto 64px">
          <div class="hz-eyebrow" style="margin-bottom:18px">Why it works</div>
          <h3 style="font-weight:600;font-size:clamp(28px,4vw,38px);line-height:1.2;letter-spacing:-.03em;margin:0 0 18px;color:var(--ink)">Career advice that's tested, not guessed.</h3>
          <p style="font-size:16px;line-height:1.7;color:var(--sub);margin:0">Most career quizzes stop at a label. We put you inside the job first.</p>
        </div>
        <div class="hz-adv3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:0">
          <div style="padding:0 40px 0 0;border-right:1px solid var(--line)">
            <svg viewBox="0 0 100 80" style="width:100px;height:80px;display:block;margin-bottom:36px;color:var(--ink2)" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="28" y="8" width="44" height="64" rx="4"></rect><path d="M40 8v-4h20v4"></path><path d="M37 34l7 7 15-15"></path><path d="M37 52h26M37 60h18"></path></svg>
            <div style="font-size:17px;font-weight:600;margin-bottom:10px;color:var(--ink)">Backed by real assessments</div>
            <div style="font-size:14px;color:var(--sub);line-height:1.65;max-width:280px">Five research-informed tests measure interests, aptitude, and values — not a 5-minute personality meme.</div>
          </div>
          <div style="padding:0 40px;border-right:1px solid var(--line)">
            <svg viewBox="0 0 100 80" style="width:100px;height:80px;display:block;margin-bottom:36px;color:var(--ink2)" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="18" width="72" height="48" rx="5"></rect><path d="M14 30h72"></path><circle cx="23" cy="24" r="1.6" fill="currentColor" stroke="none"></circle><circle cx="31" cy="24" r="1.6" fill="currentColor" stroke="none"></circle><path d="M42 40l16 10-16 10z" fill="currentColor" stroke="none"></path></svg>
            <div style="font-size:17px;font-weight:600;margin-bottom:10px;color:var(--ink)">Live the job before you choose it</div>
            <div style="font-size:14px;color:var(--sub);line-height:1.65;max-width:280px">Simulated days put you in real decisions — budget calls, deadlines, tradeoffs — so the fit score means something.</div>
          </div>
          <div style="padding:0 0 0 40px">
            <svg viewBox="0 0 100 80" style="width:100px;height:80px;display:block;margin-bottom:36px;color:var(--ink2)" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="28" width="20" height="38" rx="3" opacity=".35"></rect><rect x="40" y="20" width="20" height="46" rx="3" opacity=".6"></rect><rect x="64" y="10" width="20" height="56" rx="3"></rect><path d="M69 24h10M69 32h10M69 40h6"></path></svg>
            <div style="font-size:17px;font-weight:600;margin-bottom:10px;color:var(--ink)">One report, not fifty tabs</div>
            <div style="font-size:14px;color:var(--sub);line-height:1.65;max-width:280px">Everything synthesised into a single compass you can revisit, share with a counselor, or hand to your parents.</div>
          </div>
        </div>
      </div>

      <!-- ISOMETRIC FEATURE -->
      <div style="position:relative;background-image:radial-gradient(var(--line2) 1px,transparent 1px);background-size:26px 26px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
        <div class="hz-iso" style="display:grid;grid-template-columns:1fr 1fr;max-width:1240px;margin:0 auto;min-height:520px">
          <div style="padding:64px 40px;border-right:1px solid var(--line);display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <h4 style="font-weight:600;font-size:clamp(32px,4.4vw,46px);line-height:1.08;letter-spacing:-.03em;margin:0 0 28px;color:var(--ink)">Every choice quietly builds your fit score.</h4>
              <p style="font-family:var(--mono);font-size:14px;line-height:1.75;color:var(--sub);margin:0;max-width:400px">No trivia, no "pick your favorite color." The engine scores decisiveness, empathy, and risk tolerance from what you actually do under pressure.</p>
            </div>
          </div>
          <div style="position:relative;padding:48px 40px;display:flex;align-items:center;justify-content:center;overflow:hidden">
            <div style="position:relative;width:340px;height:280px">
              <div style="position:absolute;left:20px;top:130px;width:260px;height:120px;transform:perspective(700px) rotateX(52deg) rotateZ(-38deg) skew(6deg);border:1px solid var(--line2);border-radius:14px;background:var(--panel2)"></div>
              <div style="position:absolute;left:60px;top:70px;width:260px;height:120px;transform:perspective(700px) rotateX(52deg) rotateZ(-38deg) skew(6deg);border:1px solid var(--accline);border-radius:14px;background:linear-gradient(135deg,rgba(255,255,255,.35),rgba(94,106,210,.15))"></div>
              <div style="position:absolute;left:100px;top:10px;width:260px;height:120px;transform:perspective(700px) rotateX(52deg) rotateZ(-38deg) skew(6deg);border:1px solid var(--line2);border-radius:14px;background:var(--panel2)"></div>
              <span style="position:absolute;left:-14px;top:163px;font-family:var(--mono);font-size:10px;color:var(--faint);letter-spacing:.06em">RESPONSES</span>
              <span style="position:absolute;left:280px;top:56px;font-family:var(--mono);font-size:10px;color:var(--acclite);letter-spacing:.06em">FIT SCORE</span>
              <span style="position:absolute;left:79px;top:39px;font-family:var(--mono);font-size:10px;color:var(--faint);letter-spacing:.06em">TRAITS</span>
              <div style="position:absolute;left:16px;top:179px;width:1px;height:20px;background:var(--line2)"></div>
              <div style="position:absolute;left:300px;top:70px;width:1px;height:20px;background:var(--accline)"></div>
              <div style="position:absolute;left:98px;top:59px;width:1px;height:20px;background:var(--line2)"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CAREER LIBRARY -->
      <div id="careers" style="position:relative;padding:100px 40px 110px;max-width:1240px;margin:0 auto">
        <div class="hz-split2" style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;margin-bottom:44px">
          <h4 style="font-weight:600;font-size:clamp(34px,4.6vw,48px);line-height:1.08;letter-spacing:-.035em;margin:0;color:var(--ink)">A growing library of ${n} careers</h4>
          <div><p style="font-size:17px;line-height:1.65;color:var(--sub);margin:0">From surgeon to startup founder to film director — a growing library of full days, built to feel like the real thing.</p></div>
        </div>
        <div style="position:relative;border:1px solid var(--line2);border-radius:18px;background:var(--panel);overflow:hidden;box-shadow:0 30px 80px -50px rgba(0,0,0,.9)">
          <div style="display:flex;align-items:center;gap:10px;padding:14px 20px;border-bottom:1px solid var(--line)"><span style="width:22px;height:22px;border-radius:6px;background:var(--accsoft);display:grid;place-items:center;color:var(--acclite);font-size:11px;font-family:var(--mono)">${n}</span><span style="font-size:13px;color:var(--ink2)">Career library</span></div>
          <div style="padding:28px 34px;display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px">
            ${CAREERS.map((c, i) => `
              <button class="hz-lib-card" data-action="go" data-screen="${ctaScreen}" style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 8px;border:1px solid ${i === 0 ? "var(--accline)" : "var(--line)"};background:${i === 0 ? "var(--accsoft)" : "transparent"};border-radius:12px;cursor:pointer;color:inherit">
                <span style="display:grid;place-items:center;color:${i === 0 ? "var(--acclite)" : "var(--sub)"}">${careerIcon(c.id, 20)}</span>
                <span style="font-size:11px;color:${i === 0 ? "var(--acclite)" : "var(--sub)"};text-align:center;line-height:1.3">${esc(c.label)}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- HOW IT WORKS -->
      <div id="how" style="position:relative;padding:100px 40px;max-width:1240px;margin:0 auto">
        <div class="hz-eyebrow" style="margin-bottom:18px;text-align:center">How it works</div>
        <h3 style="font-weight:600;font-size:clamp(28px,3.6vw,34px);line-height:1.2;letter-spacing:-.03em;margin:0 0 60px;text-align:center;color:var(--ink)">From "I don't know" to a plan, in three steps.</h3>
        <div style="position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:40px">
          <div style="position:absolute;top:19px;left:16.5%;right:16.5%;height:1px;background:repeating-linear-gradient(90deg,var(--line2) 0 6px,transparent 6px 12px)"></div>
          ${[
            ["1", "Answer what you actually feel", "Five short assessments on interests, skills, struggles, values, and work style — about 15 minutes total."],
            ["2", "Live the day, not the label", `Step into a real shift — deadlines, budgets, hard calls — inside any of ${n} careers, as many times as you want.`],
            ["3", "Get one honest verdict", "A fit score, a real reason behind it, and a compass report you can bring to a counselor or your parents."],
          ].map(([num, t, d]) => `
            <div style="position:relative">
              <div style="width:38px;height:38px;border-radius:50%;background:var(--bg);border:1px solid var(--accline);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:14px;color:var(--acclite);margin-bottom:22px">${num}</div>
              <div style="font-size:17px;font-weight:600;margin-bottom:8px;color:var(--ink)">${t}</div>
              <div style="font-size:14px;color:var(--sub);line-height:1.6">${d}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- VERDICT PREVIEW -->
      <div style="position:relative;padding:100px 40px 110px;max-width:1240px;margin:0 auto">
        <div class="hz-split2" style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;margin-bottom:44px">
          <h4 style="font-weight:600;font-size:clamp(34px,4.6vw,48px);line-height:1.08;letter-spacing:-.035em;margin:0;color:var(--ink)">The verdict you can't get from a quiz</h4>
          <div><p style="font-size:17px;line-height:1.65;color:var(--sub);margin:0">Most students walk in expecting to confirm what they already believe. Living the day surfaces the one thing a quiz never could — how it actually feels.</p></div>
        </div>
        <div style="position:relative;border:1px solid var(--line2);border-radius:18px;background:var(--panel);overflow:hidden;box-shadow:0 30px 80px -50px rgba(0,0,0,.9)">
          <div style="display:flex;align-items:center;gap:10px;padding:14px 20px;border-bottom:1px solid var(--line)"><span style="width:22px;height:22px;border-radius:6px;background:var(--accsoft);display:grid;place-items:center;color:var(--acclite);font-size:11px">✓</span><span style="font-size:13px;color:var(--ink2)">Verdict · Surgeon</span></div>
          <div style="padding:40px;display:grid;grid-template-columns:auto 1fr;gap:40px;align-items:center">
            <div style="position:relative;width:130px;height:130px;flex:none">
              <div style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(var(--red) 0% 34%,var(--panel3) 34% 100%);-webkit-mask:radial-gradient(farthest-side,transparent 70%,#000 71%);mask:radial-gradient(farthest-side,transparent 70%,#000 71%)"></div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:600;letter-spacing:-.02em;color:var(--red)">34</div>
            </div>
            <div>
              <div style="font-size:16px;font-weight:600;margin-bottom:8px;color:var(--ink)">Not the fit you expected? That's the point.</div>
              <div style="font-size:14px;color:var(--sub);line-height:1.6;max-width:480px">This student came in planning to study medicine. A 6-hour simulated procedure changed their mind before four years of tuition would have.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TESTIMONIALS -->
      <div style="position:relative;padding:35px 40px 100px;max-width:1240px;margin:0 auto">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px">
          <div style="font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--faint);text-transform:uppercase">What students say</div>
        </div>
        <div class="hz-t3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
          ${[
            ["rgba(255,255,255,.14)", "var(--acclite)", "I thought I wanted to be a surgeon until the simulator made me sit through a 6-hour procedure. Turns out I hated it — and I never would've known otherwise.", "M", "#fff", "Maya T. · Grade 11"],
            ["rgba(76,195,138,.12)", "var(--green)", "Every college fair felt the same until I did the founder simulation. It's the first thing that made a career feel real instead of a brochure.", "J", "linear-gradient(135deg,#4CC38A,#3D8BFF)", "Jordan K. · Grade 9"],
            ["rgba(224,169,60,.12)", "var(--amber)", "My counselor used the report to help pick my electives. First time career advice actually connected to something I'd done, not just a test score.", "P", "linear-gradient(135deg,#E5A94E,#F76FB3)", "Priya S. · Grade 12"],
          ].map(([glow, quoteCol, quote, initial, avBg, who]) => `
            <div style="position:relative;padding:36px;border:1px solid var(--line);border-radius:18px;background:var(--panel);overflow:hidden">
              <div style="position:absolute;left:0;top:0;width:200px;height:200px;background:radial-gradient(circle,${glow},transparent 68%);pointer-events:none"></div>
              <span style="position:relative;display:block;font-size:36px;line-height:1;color:${quoteCol};opacity:.5;font-weight:600;margin-bottom:14px">&ldquo;</span>
              <div style="position:relative;font-size:16px;line-height:1.6;font-weight:500;letter-spacing:-.005em;color:var(--ink);margin-bottom:22px">${quote}</div>
              <div style="position:relative;display:flex;align-items:center;gap:10px"><span style="width:28px;height:28px;border-radius:50%;background:${avBg};display:grid;place-items:center;font-size:11px;font-weight:600;color:${initial === "M" ? "#08080B" : "#fff"};flex:none">${initial}</span><div style="font-size:12.5px;color:var(--sub)">${who}</div></div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- COMPASS PREVIEW -->
      <div id="compass" style="position:relative;height:90px;background-image:repeating-linear-gradient(90deg,var(--line2) 0 1px,transparent 1px 10px);-webkit-mask-image:linear-gradient(180deg,#000,transparent);mask-image:linear-gradient(180deg,#000,transparent)"></div>
      <div style="position:relative;padding:20px 40px 100px;max-width:1160px;margin:0 auto">
        <div style="text-align:center;max-width:600px;margin:0 auto 44px">
          <div class="hz-eyebrow" style="margin-bottom:16px">Your compass</div>
          <h3 style="font-weight:600;font-size:clamp(28px,3.6vw,34px);line-height:1.2;letter-spacing:-.03em;margin:0;color:var(--ink)">Everything you've done, in one place.</h3>
        </div>
        <div class="hz-compass-preview" style="position:relative;border:1px solid var(--line2);border-radius:16px;background:var(--panel);overflow:hidden;box-shadow:0 40px 100px -50px rgba(0,0,0,.95);display:grid;grid-template-columns:260px 1fr">
          <div style="padding:26px 22px;border-right:1px solid var(--line)">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px"><span style="width:38px;height:38px;border-radius:50%;background:var(--brand);display:grid;place-items:center;font-size:14px;font-weight:600;color:var(--on-brand)">A</span><div><div style="font-size:13.5px;font-weight:600;color:var(--ink)">Alex Rivera</div><div style="font-size:11px;color:var(--faint)">Grade 10</div></div></div>
            <div style="font-family:var(--mono);font-size:10px;letter-spacing:.12em;color:var(--faint);text-transform:uppercase;margin-bottom:12px">Progress</div>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${[["Assessments", "4 / 5", 80, "var(--green)"], ["Careers explored", `6 / ${n}`, 33, "var(--sky)"], ["Compass complete", "62%", 62, "var(--grad)"]].map(([lbl, val, pct, col]) => `
                <div><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px"><span style="color:var(--ink2)">${lbl}</span><span style="font-family:var(--mono);color:var(--sub)">${val}</span></div><div style="height:4px;border-radius:999px;background:var(--panel3);overflow:hidden"><span style="display:block;height:100%;width:${pct}%;background:${col}"></span></div></div>
              `).join("")}
            </div>
          </div>
          <div style="padding:26px 28px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px"><div style="font-size:13.5px;font-weight:600;color:var(--ink)">Recent career fits</div><span style="font-size:12px;color:var(--acclite)">View all</span></div>
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:22px">
              ${[["director", "Film Director", "Strong fit", 88, "var(--green)", "var(--greensoft)"], ["chef", "Chef", "Worth exploring", 71, "var(--amber)", "var(--ambersoft)"], ["ib", "Investment Banker", "Weak fit", 41, "var(--sub)", "var(--accsoft)"]].map(([id, nm, tag, sc, col, bg]) => `
                <div style="display:flex;align-items:center;gap:12px"><span style="width:30px;height:30px;border-radius:8px;background:${bg};display:grid;place-items:center;color:${col}">${careerIcon(id, 16)}</span><div style="flex:1"><div style="font-size:13px;font-weight:500;color:var(--ink)">${nm}</div><div style="font-size:10.5px;color:var(--faint)">${tag}</div></div><span style="font-family:var(--mono);font-size:13px;font-weight:600;color:${col}">${sc}</span></div>
              `).join("")}
            </div>
            <div style="font-family:var(--mono);font-size:10px;letter-spacing:.12em;color:var(--faint);text-transform:uppercase;margin-bottom:10px">Recent activity</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;justify-content:space-between;font-size:12.5px"><span style="color:var(--ink2)">Completed <span style="color:var(--acclite)">Film Director</span> simulation</span><span style="color:var(--faint)">6 hours ago</span></div>
              <div style="display:flex;justify-content:space-between;font-size:12.5px"><span style="color:var(--ink2)">Finished <span style="color:var(--acclite)">Skills &amp; aptitude</span> assessment</span><span style="color:var(--faint)">2 days ago</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER CTA -->
      <div style="position:relative;padding:110px 40px;text-align:center;overflow:hidden">
        <div style="position:absolute;left:50%;top:-80px;transform:translateX(-50%);width:600px;height:300px;background:radial-gradient(50% 60% at 50% 40%,rgba(255,255,255,.18),transparent 70%);pointer-events:none"></div>
        <h3 style="position:relative;font-weight:600;font-size:clamp(30px,4.4vw,40px);line-height:1.15;letter-spacing:-.03em;margin:0 0 28px;color:var(--ink)">Stop guessing. Start living the day.</h3>
        <button class="hz-cta-white" data-action="go" data-screen="${ctaScreen}" style="position:relative">${primaryLabel}</button>
      </div>
    </div>
  `;
}

// ============================================================
// LOGIN
// ============================================================
function renderLogin() {
  const isSignup = state.authMode === "signup";
  return `
    <div class="hz-login rise">
      <!-- left: brand / narrative -->
      <div class="hz-login-brand">
        <div class="hz-login-glow" aria-hidden="true"></div>
        <button class="hz-brand hz-login-logo" data-action="home"><img class="logo-mark" src="logo.png" alt="" style="width:30px;height:30px" /><span class="hz-brand-name">The Early Builder</span></button>
        <div class="hz-login-narr">
          <h2 class="hz-login-h">Your future, <span class="grad-txt">before</span> you commit to it.</h2>
          <p class="hz-login-p">Real assessments and career simulations to help you choose with confidence — before you spend years training for the wrong thing.</p>
          <div class="hz-login-steps">
            <div class="hz-login-step"><span class="hz-login-step-n">1</span><span>Take 5 science-backed assessments</span></div>
            <div class="hz-login-step"><span class="hz-login-step-n">2</span><span>Live a full day inside careers you're curious about</span></div>
            <div class="hz-login-step"><span class="hz-login-step-n">3</span><span>Get one honest report on what fits you</span></div>
          </div>
        </div>
      </div>

      <!-- right: form (our real inputs, unchanged) -->
      <div class="hz-login-form">
        <div class="hz-login-inner">
          <div class="hz-login-kicker">${isSignup ? "Create your account" : "Welcome back"}</div>
          <h3 class="hz-login-title">${isSignup ? "Let's build your compass" : "Sign in to your compass"}</h3>
          <div class="auth-tabs">
            <button class="auth-tab ${isSignup ? "active" : ""}" data-action="auth-mode" data-mode="signup">Sign up</button>
            <button class="auth-tab ${!isSignup ? "active" : ""}" data-action="auth-mode" data-mode="signin">Sign in</button>
          </div>
          <form id="auth-form" onsubmit="return false">
            ${isSignup ? `
              <label class="label">Your name</label>
              <input class="input" id="auth-name" name="name" placeholder="Alex Rivera" autocomplete="name" />
              <div style="height:14px"></div>
              <label class="label">Grade</label>
              <select class="select" id="auth-grade" name="grade">
                ${["6","7","8","9","10","11","12","College"].map(g => `<option value="${g}"${g==="10"?" selected":""}>Grade ${g}</option>`).join("")}
              </select>
              <div style="height:14px"></div>
            ` : ""}
            <label class="label">Email</label>
            <input class="input" id="auth-email" name="email" type="email" placeholder="you@school.com" autocomplete="email" required />
            <div style="height:14px"></div>
            <label class="label">Password</label>
            <div class="input-pw-wrap">
              <input class="input" id="auth-password" name="password" type="password" placeholder="${isSignup ? "Min. 6 characters" : "Your password"}" autocomplete="${isSignup ? "new-password" : "current-password"}" required />
              <button type="button" class="pw-toggle" data-action="toggle-pw" aria-label="Show password">${EYE_ICON}</button>
            </div>
            ${isSignup ? `
              <div style="height:14px"></div>
              <label class="label">Confirm password</label>
              <div class="input-pw-wrap">
                <input class="input" id="auth-confirm" name="confirm" type="password" placeholder="Same as above" autocomplete="new-password" required />
                <button type="button" class="pw-toggle" data-action="toggle-pw" aria-label="Show password">${EYE_ICON}</button>
              </div>
            ` : ""}
            <div id="auth-error" class="auth-error" style="display:none"></div>
            <div style="height:20px"></div>
            <button class="btn btn-primary btn-block" data-action="auth-submit">
              ${isSignup ? "Create account" : "Sign in"}
            </button>
          </form>
          <div class="auth-note">Your account and data are stored securely and only visible to you.</div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
  const u = state.user;
  const quizProgress = QUIZZES.map(q => {
    const total = q.items.length;
    const done = Object.keys(state.quizAnswers[q.key] || {}).length;
    return { key: q.key, title: q.title, done, total, pct: Math.round(done / total * 100) };
  });
  const overallPct = Math.round(quizProgress.reduce((a, b) => a + b.pct, 0) / quizProgress.length);
  const quizzesDone = quizProgress.filter(q => q.pct === 100).length;
  const simsDone = state.completedSims.length;
  const reportReady = !!state.report;
  const firstName = esc(u?.name?.split(" ")[0] || "there");

  let nextStep;
  if (quizzesDone < 5) {
    const nq = quizProgress.find(q => q.pct < 100);
    nextStep = { title: nq.title, meta: `${nq.done}/${nq.total} answered · ~2 min`, action: `quiz:${nq.key}` };
  } else if (simsDone === 0) {
    nextStep = { title: "Live your first career day", meta: "6 careers · ~5 min", action: "careers" };
  } else if (simsDone < 2) {
    nextStep = { title: "Try one more career", meta: "contrast sharpens your report", action: "careers" };
  } else if (!reportReady) {
    nextStep = { title: "Generate your Compass report", meta: "everything's ready", action: "report" };
  } else {
    nextStep = { title: "Revisit your Compass report", meta: "or live another career", action: "report" };
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const careersTotal = CAREERS.length;
  const bestSim = state.completedSims.reduce((best, s) => (!best || s.verdict.score > best.verdict.score ? s : best), null);
  const firstIncomplete = quizProgress.findIndex(q => q.pct < 100);
  const tierOf = (sc) => sc >= 75 ? { t: "Strong fit", c: "var(--green)", bg: "var(--greensoft)" }
    : sc >= 60 ? { t: "Worth exploring", c: "var(--amber)", bg: "var(--ambersoft)" }
    : { t: "Weak fit", c: "var(--sub)", bg: "var(--accsoft)" };
  const iconFor = (label) => { const c = CAREERS.find(x => x.label === label); return c ? careerIcon(c.id, 16) : `<circle cx="12" cy="12" r="1.5"/>`; };

  return `
    ${renderNav()}
    <div class="dash2 rise">
      <div class="dash2-glow" aria-hidden="true"></div>

      <div class="dash2-head">
        <div>
          <div class="dash2-eyebrow">${greeting}</div>
          <h1 class="dash2-h1">Welcome back, ${firstName}</h1>
        </div>
        <button class="dash2-search" data-action="open-palette">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg>
          Search <span class="dash2-kbd">⌘K</span>
        </button>
      </div>

      <button class="dash2-next" data-action="go" data-screen="${nextStep.action}">
        <span class="dash2-next-icon">▶</span>
        <span class="dash2-next-body">
          <span class="dash2-next-kicker">${quizzesDone < 5 ? "Pick up where you left off" : simsDone === 0 ? "Time for the fun part" : !reportReady ? "You're ready" : "Keep going"}</span>
          <span class="dash2-next-title">${esc(nextStep.title)}</span>
          <span class="dash2-next-meta">${esc(nextStep.meta)}</span>
        </span>
        <span class="dash2-next-btn">${quizzesDone < 5 || simsDone > 0 ? "Resume" : "Start"} →</span>
      </button>

      <div class="dash2-stats">
        <div class="dash2-stat">
          <div class="dash2-stat-k">Assessments</div>
          <div class="dash2-stat-v">${quizzesDone}<span class="dash2-stat-of"> / 5</span></div>
          <div class="dash2-stat-bar"><span style="width:${quizzesDone / 5 * 100}%;background:var(--green)"></span></div>
        </div>
        <div class="dash2-stat">
          <div class="dash2-stat-k">Careers explored</div>
          <div class="dash2-stat-v">${simsDone}<span class="dash2-stat-of"> / ${careersTotal}</span></div>
          <div class="dash2-stat-bar"><span style="width:${Math.round(simsDone / careersTotal * 100)}%;background:var(--sky)"></span></div>
        </div>
        <div class="dash2-stat">
          <div class="dash2-stat-k">Top fit so far</div>
          <div class="dash2-stat-v" style="color:var(--acclite)">${bestSim ? bestSim.verdict.score : "—"}</div>
          <div class="dash2-stat-sub">${bestSim ? esc(bestSim.career) : "Live a career to find out"}</div>
        </div>
      </div>

      <div class="dash2-cols">
        <div class="dash2-card">
          <div class="dash2-card-head">
            <div class="dash2-card-title">Recent career fits</div>
            ${simsDone >= 2 ? `<button class="dash2-viewall" data-action="go" data-screen="compare">Compare all</button>` : ""}
          </div>
          <div class="dash2-fits">
            ${simsDone === 0
              ? `<div class="dash2-empty">Nothing here yet. The founder day is a popular first pick — five minutes of glorious chaos.</div>`
              : state.completedSims.slice(0, 5).map(s => {
                  const tier = tierOf(s.verdict.score);
                  return `
                    <div class="dash2-fit">
                      <span class="dash2-fit-icon" style="background:${tier.bg};color:${tier.c}">${iconFor(s.career)}</span>
                      <span class="dash2-fit-body">
                        <span class="dash2-fit-name">${esc(s.career)}</span>
                        <span class="dash2-fit-tier">${tier.t}</span>
                      </span>
                      <span class="dash2-fit-score" style="color:${tier.c}">${s.verdict.score}</span>
                    </div>
                  `;
                }).join("")}
          </div>
          <button class="dash2-add" data-action="go" data-screen="careers">
            <span>${simsDone === 0 ? "Live your first career day" : "Simulate another career"}</span>
            <span>→</span>
          </button>
        </div>

        <div class="dash2-card">
          <div class="dash2-card-title" style="margin-bottom:16px">Finish your compass</div>
          <div class="dash2-check-list">
            ${quizProgress.map((q, i) => {
              const done = q.pct === 100;
              const current = !done && i === firstIncomplete;
              return `
                <button class="dash2-check-row" data-action="go" data-screen="${done ? `quiz-result:${q.key}` : `quiz:${q.key}`}">
                  <span class="dash2-check ${done ? "done" : current ? "current" : ""}">${done ? "✓" : ""}</span>
                  <span class="dash2-check-name ${done ? "done" : current ? "" : "todo"}">${esc(q.title)}</span>
                  ${!done ? `<span class="dash2-check-pct">${q.pct}%</span>` : ""}
                </button>
              `;
            }).join("")}
          </div>
          <div class="dash2-report ${reportReady ? "ready" : ""}">
            <div class="dash2-report-k">${reportReady ? "Your report is ready" : "Compass report"}</div>
            <div class="dash2-report-v">${reportReady ? "View anytime" : `Unlocks after ${Math.max(0, 3 - quizzesDone)} more ${3 - quizzesDone === 1 ? "quiz" : "quizzes"}`}</div>
            ${quizzesDone >= 3 ? `<button class="dash2-report-btn" data-action="go" data-screen="report">${reportReady ? "Open report →" : "Generate report →"}</button>` : ""}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// QUIZ RUNNER
// ============================================================
function renderQuiz() {
  const quiz = QUIZZES.find(q => q.key === state.currentQuiz);
  if (!quiz) return renderDashboard();
  const answers = state.quizAnswers[quiz.key] || {};
  const idx = state.currentQuizIdx;
  const item = quiz.items[idx];
  const progress = (idx / quiz.items.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return `
    ${renderNav()}
    <div class="container" style="max-width:620px">
      <div class="rise">
        <button class="back-link" data-action="go" data-screen="dashboard">← BACK TO DASHBOARD</button>
        <div class="kicker">${esc(quiz.title.toUpperCase())} · ${idx + 1} / ${quiz.items.length}</div>
        <div class="progress"><div class="progress-bar" style="width:${progress}%"></div></div>

        <div class="card mt-lg mb-lg" style="padding:28px;">
          <div class="quiz-question">${esc(item.q)}</div>
          ${quiz.binary
            ? `<div class="stack-sm">${item.opts.map((o, i) => `
                <button class="quiz-option" data-action="quiz-answer" data-value="${esc(o.tag)}">
                  <span><span class="quiz-option-key">${String.fromCharCode(65 + i)}</span> &nbsp; ${esc(o.label)}</span>
                </button>
              `).join("")}</div>`
            : `<div class="stack-sm">${quiz.scale.map((label, val) => `
                <button class="quiz-option" data-action="quiz-answer" data-value="${val}">
                  <span>${esc(label)}</span>
                  <span class="mono" style="font-size:11px;color:var(--faint);">${val + 1}</span>
                </button>
              `).join("")}</div>`}
        </div>

        <div class="quiz-nav">
          <button class="btn btn-ghost btn-sm" data-action="quiz-nav" data-dir="prev" ${idx === 0 ? "disabled" : ""}>← Previous</button>
          <div class="text-sub" style="font-size:12px;">${answeredCount} / ${quiz.items.length} answered</div>
          <button class="btn btn-ghost btn-sm" data-action="quiz-nav" data-dir="next"
            ${idx === quiz.items.length - 1 || answers[idx] === undefined ? "disabled" : ""}>Next →</button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// QUIZ RESULT (per-quiz breakdown)
// ============================================================
function renderQuizResult() {
  const key = state.currentQuiz;
  const quiz = QUIZZES.find(q => q.key === key);
  if (!quiz) return renderDashboard();
  const answers = state.quizAnswers[key] || {};
  const total = quiz.items.length;
  const done = Object.keys(answers).length;

  // If not fully done — bounce back to the quiz itself
  if (done < total) { go(`quiz:${key}`); return ""; }

  // Compute this quiz's dimension scores in isolation
  const dims = scoreSingleQuiz(key);
  const bands = (score) => {
    if (score >= 75) return "very strong";
    if (score >= 60) return "strong";
    if (score >= 45) return "moderate";
    if (score >= 30) return "mild";
    return "weak";
  };
  const sortedDims = Object.entries(dims).filter(([_, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const takeaway = quizTakeawayFor(key, sortedDims);

  // Meta: quiz idx among all quizzes
  const quizIdx = QUIZZES.findIndex(q => q.key === key);

  return `
    ${renderNav()}
    <div class="container wide rise">
      <button class="back-link" data-action="go" data-screen="dashboard">← BACK TO DASHBOARD</button>

      <div class="mb-lg" style="padding-bottom:24px;border-bottom:1px solid var(--line);">
        <h1 class="lin-h lin-h1" style="margin-bottom:12px;">${esc(quiz.title)}</h1>
        <p class="sub-text" style="max-width:640px;font-size:17px;">You answered ${done} of ${total} questions. Here's what your answers actually mapped to — dimension by dimension.</p>
      </div>

      <!-- Dimension bars -->
      <div class="mb-lg">
        <h2 class="lin-h lin-h2" style="margin-bottom:16px;">The signal, in bars.</h2>
        ${sortedDims.length ? `
          <div class="card" style="padding:28px;">
            <div class="stack-md">
              ${sortedDims.map(([dim, score]) => {
                const band = bands(score);
                const gradient = band === "very strong" || band === "strong" ? "var(--grad-brand)" : band === "moderate" ? "var(--grad-warm)" : "var(--sub)";
                const label = DIM_LABELS[key]?.[dim] || dim.replace(/_/g, " ");
                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">
                      <span style="font-size:15.5px;font-weight:600;">${esc(cap(label))}</span>
                      <span class="mono" style="font-size:12.5px;color:var(--sub);">${score}% · ${esc(band)}</span>
                    </div>
                    <div style="height:8px;background:var(--bg-alt);border-radius:999px;overflow:hidden;">
                      <div style="height:100%;width:${score}%;background:${gradient};transition:width .6s ease;"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        ` : `<div class="card" style="padding:22px;color:var(--sub);">No dimension signal from this quiz — likely because most answers were in the middle.</div>`}
      </div>

      <!-- Takeaway -->
      <div class="mb-lg">
        <div class="panel panel-pad" style="border-left:3px solid var(--brand);background:var(--brand-soft);">
          <span class="section-label accent">What this means</span>
          <div class="lin-h lin-h2" style="margin-bottom:12px;color:var(--brand-ink);">${esc(takeaway.headline)}</div>
          <p style="font-size:15px;line-height:1.65;color:var(--ink-soft);margin:0;">${esc(takeaway.body)}</p>
        </div>
      </div>

      <!-- Your answers -->
      <div class="mb-lg">
        <h2 class="lin-h lin-h2" style="margin-bottom:16px;">What you actually said.</h2>
        <div class="card card-flat">
          ${quiz.items.map((it, i) => {
            const ans = answers[i];
            const label = quiz.binary
              ? (it.opts.find(o => o.tag === ans)?.label || "—")
              : (ans !== undefined ? quiz.scale[ans] : "—");
            return `
              <div style="display:grid;grid-template-columns:36px 1fr auto;gap:16px;align-items:center;padding:16px 20px;border-bottom:1px solid var(--line);">
                <span class="mono" style="font-size:11px;color:var(--faint);letter-spacing:0.5px;">${String(i + 1).padStart(2, "0")}</span>
                <div style="font-size:14.5px;line-height:1.5;">${esc(it.q)}</div>
                <span class="badge ${ans >= 3 ? "badge-brand" : ans === 2 ? "badge" : "badge"}" style="font-size:11px;">${esc(label)}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="row" style="padding-top:20px;border-top:1px solid var(--line);">
        <button class="btn btn-primary" data-action="go" data-screen="dashboard">← Back to dashboard</button>
        <button class="btn btn-ghost" data-action="retake-quiz" data-key="${key}">Retake this quiz</button>
        ${state.report ? `<button class="btn btn-ghost" data-action="go" data-screen="report">See full compass report →</button>` : ""}
      </div>
    </div>
  `;
}

// Score a single quiz in isolation (like scoreDimensions but for one quiz only)
function scoreSingleQuiz(key) {
  const dims = {};
  if (key === "workstyle") {
    const wsAns = state.quizAnswers.workstyle || {};
    const wsQuiz = QUIZZES.find(q => q.key === "workstyle");
    for (let i = 0; i < wsQuiz.items.length; i++) if (wsAns[i]) dims[wsAns[i]] = 1;
    return dims;
  }
  const tags = QUIZ_TAGS[key];
  const ans = state.quizAnswers[key] || {};
  const raw = {}, maxRaw = {};
  for (let i = 0; i < tags.length; i++) {
    for (const [dim, weight] of Object.entries(tags[i])) {
      maxRaw[dim] = (maxRaw[dim] || 0) + 4 * weight;
      if (ans[i] !== undefined) raw[dim] = (raw[dim] || 0) + ans[i] * weight;
    }
  }
  for (const dim of Object.keys(maxRaw)) {
    dims[dim] = maxRaw[dim] ? Math.round((raw[dim] || 0) / maxRaw[dim] * 100) : 0;
  }
  return dims;
}

function quizTakeawayFor(key, sortedDims) {
  if (!sortedDims.length) return { headline: "Neutral profile.", body: "Most answers landed in the middle — this quiz didn't produce a strong signal in any direction. That's not a wrong answer; it just means the compass will lean on the other four quizzes to place you." };
  const [topDim, topScore] = sortedDims[0];
  const [secondDim] = sortedDims[1] || [null];
  const label = DIM_LABELS[key]?.[topDim] || topDim.replace(/_/g, " ");
  if (key === "interests") {
    if (topDim === "analytical") return { headline: `You're pulled toward logical problem-solving.`, body: `Your strongest interest is analytical thinking (${topScore}%). Careers that reward this: engineering, quant work, medicine, research. Careers that will bore you: pure-sales, hospitality, or roles built around fast improvisation.` };
    if (topDim === "creative") return { headline: `You're pulled toward creative expression.`, body: `Your strongest interest is creative expression (${topScore}%). Careers that reward this: design, writing, film, marketing, architecture. Careers that will drain you: highly repetitive execution, pure compliance work.` };
    if (topDim === "social") return { headline: `You're pulled toward connecting with people.`, body: `Your strongest interest is people (${topScore}%). Careers that reward this: teaching, therapy, sales, hospitality, medicine. Careers that will isolate you: solo deep-focus roles.` };
    if (topDim === "practical") return { headline: `You're pulled toward hands-on building.`, body: `Your strongest interest is practical building (${topScore}%). Careers that reward this: engineering, architecture, chef work, surgery. Careers that will frustrate you: purely abstract or advisory roles.` };
    if (topDim === "entrepreneurial") return { headline: `You're pulled toward starting things.`, body: `Your strongest interest is entrepreneurial energy (${topScore}%). Careers that reward this: founding, product management, growth roles, franchise ownership. Careers that will constrain you: heavily-hierarchical corporate roles.` };
    if (topDim === "investigative") return { headline: `You're pulled toward deep understanding.`, body: `Your strongest interest is investigative depth (${topScore}%). Careers that reward this: research, medicine, journalism, quant, PhD paths. Careers that will bore you: fast-moving generalist roles.` };
  }
  if (key === "strengths") return { headline: `Your top strength is ${label}.`, body: `You scored ${topScore}% on ${label}${secondDim ? ` and ${DIM_LABELS.strengths[secondDim]} came in second (${sortedDims[1][1]}%)` : ""}. Careers that pay you well for exactly this combination are the ones where these strengths carry weight day-to-day — and where their absence would be obvious.` };
  if (key === "weaknesses") return { headline: `Your biggest friction: ${label}.`, body: `${label} is your top-flagged weakness (${topScore}%). Careers where this trait would compound (the ones where the trait IS the job, not a side skill) are the ones to filter out first. Careers where you can work around it with structure and external deadlines are still viable.` };
  if (key === "values") return { headline: `${cap(label)} matters most to you.`, body: `${cap(label)} scored ${topScore}% as your top value. Careers that violate this value — even if you're technically good at them — will burn you out. Your report should filter career recommendations by this value first, before job title.` };
  if (key === "workstyle") return { headline: `Your work style is set.`, body: `You picked ${sortedDims.length} preference${sortedDims.length > 1 ? "s" : ""} for how you like to work. These filter your career shortlist at the environment level, not the title level.` };
  return { headline: `${cap(label)} is what stood out.`, body: `Your strongest signal on this quiz was ${label} at ${topScore}%.` };
}

// ============================================================
// CAREER PICKER
// ============================================================
function renderCareers() {
  const filtered = state.careerFilter === "All" ? CAREERS : CAREERS.filter(c => (c.subgroup || c.group) === state.careerFilter);
  return `
    ${renderNav()}
    <div class="container wide rise">
      <button class="back-link" data-action="go" data-screen="dashboard">← BACK</button>
      <div class="mb-lg">
        <span class="section-label accent">Career simulations</span>
        <h1 class="lin-h lin-h1" style="margin-bottom:8px;">What do you want to try?</h1>
        <p class="lin-sub">Live one full working day. Every decision has consequences. Takes ~5 minutes.</p>
      </div>

      <div class="filter-row">
        ${["All", ...CAREER_SUBGROUPS].map(g => `
          <button class="filter-chip ${state.careerFilter === g ? "active" : ""}" data-action="filter-career" data-group="${esc(g)}">${esc(g)}</button>
        `).join("")}
      </div>

      <div class="career-grid">
        ${filtered.map(c => {
          const done = state.completedSims.find(s => s.career === c.label);
          const ready = SIM_READY.has(c.id);
          if (!ready) {
            return `
              <button class="career-card coming-soon" disabled aria-disabled="true">
                <div class="career-card-top">
                  <span class="badge badge-soon">COMING SOON</span>
                </div>
                <div class="career-card-cat">${esc((c.subgroup || c.group).toUpperCase())}</div>
                <div class="career-card-title">${esc(c.label)}</div>
                <div class="career-card-desc">${esc(c.plain)}</div>
              </button>
            `;
          }
          return `
            <button class="career-card ${done ? "done" : ""}" data-action="start-sim" data-career-id="${esc(c.id)}">
              <div class="career-card-top">
                ${done ? `<span class="badge badge-brand">${done.verdict.score}</span>` : ""}
              </div>
              <div class="career-card-cat">${esc((c.subgroup || c.group).toUpperCase())}</div>
              <div class="career-card-title">${esc(c.label)}</div>
              <div class="career-card-desc">${esc(c.plain)}</div>
            </button>
          `;
        }).join("")}
      </div>

      <div class="custom-career" id="suggest-career">
        <div style="font-weight:600;font-size:14.5px;margin-bottom:6px;">Don't see the career you want?</div>
        <div class="text-sub" style="font-size:13px;line-height:1.5;">Suggest it and we'll build a real simulation for it next. Email us at <a data-action="mailto-suggest" style="color:var(--brand);cursor:pointer;">theearlybuilder@gmail.com</a>.</div>
      </div>
    </div>
  `;
}

// ============================================================
// SIMULATOR
// ============================================================
function renderSim() {
  const career = state.currentCareer;
  if (!career) { state.screen = "careers"; return renderCareers(); }
  const s = state.sim;

  const branching = isBranchingScript(s.script);
  const scenes = branching
    ? Object.values(s.script.scenes || {})
    : (s.script.scenes || []);
  const totalScenes = scenes.length;
  const seen = Math.min(s.log.length + (s.current ? 1 : 0), totalScenes);
  const pct = totalScenes > 1 ? Math.round(((seen - 1) / (totalScenes - 1)) * 100) : 0;
  const timeNow = s.current ? s.current.time : (s.log.length ? s.log[s.log.length - 1].time : "");
  const decisionScenes = scenes.filter(sc => sc.choices && sc.choices.length).length;
  const decisionNum = Math.min(s.pickedTones.length + 1, decisionScenes);
  const clock = simClockState();
  const timeStakes = s.current && sceneHasTimeStakes(s.current);

  return `
    ${renderNav()}
    <div class="container sim-container">
      <div class="sim-topbar">
        <div class="sim-topbar-row">
          <div>
            <div class="sim-kicker"><span class="sim-live-dot"></span>NOW SIMULATING</div>
            <div class="sim-title">${esc(career.label)}</div>
          </div>
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="careers">Quit shift</button>
        </div>
        <div class="sim-day">
          <div class="sim-day-track">
            <div class="sim-day-fill" style="width:${Math.max(pct, 2)}%"></div>
            ${scenes.map((_, i) => `<span class="sim-day-dot ${i < seen - 1 ? "past" : i === seen - 1 ? "now" : ""}" style="left:${totalScenes > 1 ? (i / (totalScenes - 1)) * 100 : 0}%"></span>`).join("")}
          </div>
          <div class="sim-day-meta">
            <span class="mono">${esc(clock ? clock.label : timeNow)}</span>
            ${s.current && s.current.choices.length ? `<span class="mono">DECISION ${decisionNum} OF ${decisionScenes}</span>` : `<span class="mono">${seen >= totalScenes ? "SHIFT ENDING" : "…"}</span>`}
          </div>
        </div>
        ${clock ? `
          <div class="sim-clock sim-clock-${clock.status}">
            <div class="sim-clock-main">
              <span class="sim-clock-label">YOUR CLOCK</span>
              <span class="sim-clock-time mono">${esc(clock.label)}</span>
            </div>
            <div class="sim-clock-drift">
              ${clock.status === "on"
                ? `<span class="sim-clock-pill on">On schedule</span>`
                : clock.status === "behind"
                  ? `<span class="sim-clock-pill behind">${formatDur(clock.drift)} behind</span>`
                  : `<span class="sim-clock-pill ahead">${formatDur(clock.drift)} banked</span>`}
              <span class="sim-clock-sched mono">scheduled ${esc(formatClock(clock.scheduled))}</span>
            </div>
          </div>
        ` : ""}
      </div>

      ${s.script.intro && s.log.length === 0 ? `
        <div class="sim-brief rise">
          <div class="sim-brief-label">YOUR BRIEF</div>
          <div class="sim-brief-text">${esc(s.script.intro)}</div>
        </div>
      ` : ""}

      <div class="sim-log">
        ${s.log.map(e => `
          <div class="sim-entry past rise">
            <span class="sim-node"></span>
            <div class="sim-time">${esc(e.actualTime || e.time)}</div>
            <div class="sim-scene">${esc(e.scene)}</div>
            ${e.choice ? `<div class="sim-choice-past">
              <span class="sim-choice-past-tag">YOUR MOVE</span>${esc(e.choice)}
              ${typeof e.mins === "number" && typeof e.par === "number" && e.mins !== e.par
                ? `<span class="sim-choice-past-cost ${e.mins > e.par ? "slow" : "fast"} mono">${e.mins > e.par ? "+" : "−"}${formatDur(e.mins - e.par)}</span>`
                : ""}
            </div>` : ""}
          </div>
        `).join("")}

        ${s.current ? `
          <div class="sim-entry now rise">
            <span class="sim-node live"></span>
            <div class="sim-now-card">
              <div class="sim-now-head">
                <span class="sim-time-chip mono">${esc(clock ? clock.label : s.current.time)}</span>
                ${s.current.stat ? `<span class="sim-stat-chip mono">${esc(resolveStat(s.current, s).label)}</span>` : ""}
              </div>
              <div class="sim-scene current">${esc(resolveSceneText(s.current, s))}</div>
              ${s.current.choices.length ? `
                <div class="sim-choices">
                  <div class="sim-choices-label">What do you do?${timeStakes ? `<span class="sim-choices-hint">times are what each one costs your day</span>` : ""}</div>
                  ${s.current.choices.map((c, i) => {
                    const m = timeStakes ? choiceMins(s.current, c, i) : null;
                    return `
                    <button class="sim-choice" data-action="sim-choose" data-idx="${i}">
                      <span class="sim-choice-key mono">${String.fromCharCode(65 + i)}</span>
                      <span class="sim-choice-text">${esc(choiceText(c))}</span>
                      ${m !== null ? `<span class="sim-choice-cost mono">${m === 0 ? "no time" : formatDur(m)}</span>` : ""}
                    </button>`;
                  }).join("")}
                  ${s.log.length > 0 ? `
                    <button class="btn btn-ghost btn-sm sim-back-btn" data-action="sim-back" style="margin-top:12px;">← Back to previous</button>
                  ` : ""}
                </div>
              ` : ""}
            </div>
          </div>
        ` : ""}

        ${s.loading ? `<div class="sim-entry loading"><span class="sim-node"></span>${spinner(s.log.length === 0 ? "clocking you in…" : "what happens next…")}</div>` : ""}
        ${s.error ? `<div class="text-red" style="font-size:13.5px;">${esc(s.error)} <button data-action="sim-retry" style="color:var(--brand);background:none;border:none;cursor:pointer;font-size:13.5px;text-decoration:underline;">retry</button></div>` : ""}
      </div>
    </div>
    ${state.simNote ? renderTimeNote() : ""}
  `;
}

// One-time explainer for the day clock. Shown when a shift starts, dismissable
// for good via the checkbox (stored outside the per-account namespace — it's a
// UI preference, not progress).
function renderTimeNote() {
  return `
    <div class="modal-backdrop" data-action="close-time-note">
      <div class="modal time-note" role="dialog" aria-modal="true" aria-labelledby="time-note-title">
        <div class="time-note-kicker mono">BEFORE YOU CLOCK IN</div>
        <h3 id="time-note-title">The clock is running.</h3>
        <p>Some options show how long they take — <span class="time-note-chip mono">25m</span>, <span class="time-note-chip mono">1h 30m</span>. That's real time out of your day, and the simulation runs on it.</p>
        <p>Go thorough and you'll fall behind. Move fast and you bank time, but you might miss something. Neither is automatically right — <strong>the point is what you choose to spend it on.</strong></p>
        <p class="time-note-sub">Your clock sits at the top of the shift, next to how far ahead or behind schedule you are.</p>
        <label class="time-note-check">
          <input type="checkbox" id="time-note-hide" />
          <span>Don't show this again</span>
        </label>
        <button class="btn btn-primary" data-action="close-time-note">Start the shift</button>
      </div>
    </div>
  `;
}

// ============================================================
// VERDICT
// ============================================================
function renderVerdict() {
  const lv = state.lastVerdict;
  if (!lv) return renderDashboard();
  const { career, verdict } = lv;
  const tier = verdict.score >= 78
      ? { cls: "good", icon: "✦", label: "Strong fit", note: "one of your best yet" }
    : verdict.score >= 62
      ? { cls: "warn", icon: "◆", label: "Mixed fit", note: "real upside, real friction" }
    : verdict.score >= 48
      ? { cls: "warn", icon: "◆", label: "Worth a look", note: "with eyes open" }
      : { cls: "bad", icon: "▲", label: "Not your fit", note: "and that's useful to know" };
  const quick = [
    { k: "What clicked",  v: (verdict.energized && verdict.energized[0]) || "—", accent: false },
    { k: "Watch out for", v: (verdict.drained && verdict.drained[0]) || "—", accent: false },
    { k: "Best fit for",  v: verdict.fitFor || "—", accent: true },
  ];
  return `
    ${renderNav()}
    <div class="container wide rise">
      <div class="mono" style="font-size:11.5px;color:var(--faint);letter-spacing:.16em;margin-bottom:26px;text-transform:uppercase;text-align:center;">
        Your verdict · ${esc(career)}
      </div>

      <!-- Centered score hero -->
      <div class="verdict-hero mb-lg">
        ${scoreRing(verdict.score, 176)}
        <div class="mono" style="font-size:10.5px;letter-spacing:.14em;color:var(--faint);text-transform:uppercase;margin-top:8px;">Fit score</div>
        <div class="verdict-pill ${tier.cls}">${tier.icon} ${tier.label}${tier.note ? ` — ${tier.note}` : ""}</div>
        <h1 class="verdict-headline" style="max-width:640px;margin:18px auto 0;">${esc(verdict.headline)}</h1>
        ${verdict.dayRead ? `<p style="font-size:16px;line-height:1.6;color:var(--sub);max-width:560px;margin:14px auto 0;">${esc(verdict.dayRead)}</p>` : ""}
      </div>

      <!-- 3-up quick read -->
      <div class="verdict-quick mb-lg">
        ${quick.map(q => `
          <div class="vq-card">
            <div class="mono vq-k">${q.k.toUpperCase()}</div>
            <div class="vq-b${q.accent ? " accent" : ""}">${esc(q.v)}</div>
          </div>
        `).join("")}
      </div>

      <!-- Signals from the day -->
      ${verdict.tally ? `
        <div class="card mb-lg" style="padding:22px 32px;">
          <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
            <div style="padding:8px 14px;background:var(--green-soft);color:var(--green);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.4px;">${verdict.tally.good} IN THE POCKET</div>
            <div style="padding:8px 14px;background:var(--bg-alt);color:var(--sub);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.4px;">${verdict.tally.neutral} DEFENSIBLE</div>
            <div style="padding:8px 14px;background:var(--red-soft);color:var(--red);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.4px;">${verdict.tally.bad} FRICTION</div>
            ${typeof verdict.tally.drift === "number" ? `
              <div style="padding:8px 14px;background:${verdict.tally.drift > 20 ? "var(--amber-soft);color:var(--amber)" : verdict.tally.drift < -20 ? "var(--green-soft);color:var(--green)" : "var(--bg-alt);color:var(--sub)"};border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;letter-spacing:0.4px;">
                ${verdict.tally.drift > 20 ? `${formatDur(verdict.tally.drift)} BEHIND` : verdict.tally.drift < -20 ? `${formatDur(verdict.tally.drift)} BANKED` : "ON SCHEDULE"}
              </div>
            ` : ""}
          </div>
        </div>
      ` : ""}

      ${verdict.timeRead ? `
        <div class="card mb-lg" style="padding:30px;">
          <div class="mono" style="font-size:10px;font-weight:700;letter-spacing:.16em;color:var(--brand);margin-bottom:10px;">HOW YOU SPENT THE DAY</div>
          <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:24px;letter-spacing:-0.3px;line-height:1.25;margin-bottom:12px;">
            ${verdict.tally && verdict.tally.finishedAt ? `You clocked out at ${esc(verdict.tally.finishedAt)}.` : "Where the hours went."}
          </div>
          <p style="font-size:14.5px;line-height:1.7;color:var(--sub);margin:0;max-width:660px;">${esc(verdict.timeRead)}</p>
        </div>
      ` : ""}

      <!-- Why this score -->
      ${verdict.reasoning && verdict.reasoning.length ? `
        <div class="card mb-lg" style="padding:30px;">
          <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:26px;letter-spacing:-0.3px;line-height:1.25;margin-bottom:8px;">
            The full read on your day.
          </div>
          <p style="font-size:14.5px;color:var(--sub);line-height:1.6;margin:0 0 24px;max-width:640px;">Every score walks you through the specific choices you made, ties them to your quiz profile, and shows how the math actually landed.</p>
          <div class="stack-md">
            ${verdict.reasoning.map((entry) => {
              const isString = typeof entry === "string";
              const kind = isString ? "opening" : entry.kind;
              const label = isString ? "" : entry.label;
              const body = isString ? entry : entry.body;
              const palette = {
                opening: { bg: "var(--brand-soft)", ink: "var(--brand-ink)", accent: "var(--brand)" },
                miss:    { bg: "var(--red-soft)",   ink: "var(--red)",       accent: "var(--red)" },
                clutch:  { bg: "var(--green-soft)", ink: "var(--green)",     accent: "var(--green)" },
                profile: { bg: "var(--amber-soft)", ink: "var(--amber)",     accent: "var(--amber)" },
                math:    { bg: "var(--bg-alt)",     ink: "var(--sub)",       accent: "var(--sub)" },
              }[kind] || { bg: "var(--bg-alt)", ink: "var(--sub)", accent: "var(--sub)" };
              return `
                <div style="padding:18px 20px;background:${palette.bg};border-radius:14px;border-left:3px solid ${palette.accent};">
                  ${label ? `<div class="mono" style="font-size:10.5px;color:${palette.ink};letter-spacing:0.8px;margin-bottom:8px;text-transform:uppercase;font-weight:700;">${esc(label)}</div>` : ""}
                  <div style="font-size:14.5px;line-height:1.65;color:var(--ink);">${esc(body)}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Reality check -->
      <div class="card mb-lg" style="padding:28px;">
        <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:22px;letter-spacing:-0.3px;line-height:1.35;margin-bottom:14px;">
          What this career actually looks like.
        </div>
        <div style="font-size:15px;line-height:1.7;color:var(--ink-soft);">${esc(verdict.reality)}</div>
        <div style="font-size:14px;line-height:1.6;color:var(--sub);margin-top:18px;padding-top:16px;border-top:1px solid var(--line);">
          <b style="color:var(--ink)">Best fit for:</b> ${esc(verdict.fitFor)}
        </div>
      </div>

      <!-- Energized / Drained -->
      <div class="super-grid mb-lg">
        <div class="card super-card green">
          <div class="mono" style="font-size:11px;color:var(--green);letter-spacing:1px;margin-bottom:14px;">WHAT WOULD ENERGIZE YOU</div>
          ${verdict.energized.map(e => `<div class="super-item"><span class="text-green" style="margin-right:6px;">+</span>${esc(e)}</div>`).join("")}
        </div>
        <div class="card super-card amber">
          <div class="mono" style="font-size:11px;color:var(--red);letter-spacing:1px;margin-bottom:14px;">WHAT WOULD DRAIN YOU</div>
          ${verdict.drained.map(e => `<div class="super-item"><span style="color:var(--red);margin-right:6px;">–</span>${esc(e)}</div>`).join("")}
        </div>
      </div>

      <!-- Do's and Don'ts -->
      ${verdict.dos && verdict.dos.length ? `
      <div class="mb-lg">
        <h2 class="lin-h lin-h2" style="margin-bottom:16px;">Do's and don'ts, from people who did it.</h2>
        <div class="super-grid">
          <div class="card">
            <div class="mono" style="font-size:11px;color:var(--green);letter-spacing:1px;margin-bottom:14px;">DO</div>
            ${verdict.dos.map(d => `<div style="font-size:14.5px;line-height:1.55;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line);"><span class="text-green" style="font-weight:700;margin-right:8px;">✓</span>${esc(d)}</div>`).join("")}
          </div>
          <div class="card">
            <div class="mono" style="font-size:11px;color:var(--red);letter-spacing:1px;margin-bottom:14px;">DON'T</div>
            ${verdict.donts.map(d => `<div style="font-size:14.5px;line-height:1.55;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--line);"><span class="text-red" style="font-weight:700;margin-right:8px;">×</span>${esc(d)}</div>`).join("")}
          </div>
        </div>
      </div>
      ` : ""}

      <div class="row" style="padding-top:20px;border-top:1px solid var(--line);">
        <button class="btn btn-primary" data-action="go" data-screen="careers">Simulate another →</button>
        ${state.completedSims.length >= 2 ? `<button class="btn btn-ghost" data-action="go" data-screen="compare">Compare careers</button>` : ""}
        <button class="btn btn-ghost" data-action="go" data-screen="dashboard">Back to dashboard</button>
      </div>
    </div>
  `;
}

// ============================================================
// REPORT
// ============================================================

// Five headline axes, blended from the raw quiz dimensions.
function buildCompass(dims) {
  const i = dims.interests || {}, s = dims.strengths || {}, v = dims.values || {};
  const avg = (...xs) => {
    const a = xs.filter(x => typeof x === "number");
    return a.length ? Math.round(a.reduce((p, c) => p + c, 0) / a.length) : 0;
  };
  // A 5-point self-report can't tell "literally none" from "weakest option," and
  // no human has zero focus/freedom — so floor every axis at a small baseline.
  // This also stops the single-source axes (Focus, Freedom) from pinning to dead
  // centre when the multi-source axes never can.
  const FLOOR = 15;
  const floor = (n) => Math.max(FLOOR, n);
  return [
    { label: "Analytical", score: floor(avg(i.analytical, s.logic)) },
    { label: "Creative",   score: floor(avg(i.creative, s.creativity)) },
    { label: "Focus",      score: floor(avg(s.focus)) },
    { label: "Connection", score: floor(avg(i.social, s.empathy, s.speaking)) },
    { label: "Freedom",    score: floor(avg(v.freedom)) },
  ];
}

// Static SVG radar. viewBox is padded so axis labels never spill into
// neighbouring content — the labels live inside the box, not outside it.
function renderCompassRadar(compass) {
  const W = 420, H = 320, cx = 210, cy = 150, R = 96, N = compass.length;
  const ang = (i) => (-90 + i * 360 / N) * Math.PI / 180;
  const pt = (i, r) => [cx + Math.cos(ang(i)) * r, cy + Math.sin(ang(i)) * r];
  const fmt = (n) => n.toFixed(1);

  let grid = "";
  [0.25, 0.5, 0.75, 1].forEach((f) => {
    const p = compass.map((_, i) => pt(i, R * f).map(fmt).join(",")).join(" ");
    grid += `<polygon points="${p}" fill="none" stroke="var(--line)" stroke-width="1"/>`;
  });

  let axes = "", labels = "";
  compass.forEach((d, i) => {
    const [x, y] = pt(i, R);
    axes += `<line x1="${cx}" y1="${cy}" x2="${fmt(x)}" y2="${fmt(y)}" stroke="var(--line)" stroke-width="1"/>`;
    const [lx, ly] = pt(i, R + 20);
    const anchor = Math.abs(lx - cx) < 8 ? "middle" : (lx > cx ? "start" : "end");
    const baseline = ly < cy - 8 ? "auto" : (ly > cy + 8 ? "hanging" : "middle");
    labels += `<text class="radar-label" x="${fmt(lx)}" y="${fmt(ly)}" text-anchor="${anchor}" dominant-baseline="${baseline}">${d.label.toUpperCase()}</text>`;
  });

  const dataPts = compass.map((d, i) => pt(i, R * Math.max(4, d.score) / 100).map(fmt).join(",")).join(" ");
  const dots = compass.map((d, i) => {
    const [x, y] = pt(i, R * Math.max(4, d.score) / 100);
    return `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="3.5" fill="var(--brand)"/>`;
  }).join("");

  return `<svg class="radar-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Your compass across five dimensions">
    ${grid}${axes}
    <polygon points="${dataPts}" fill="var(--brand-soft)" fill-opacity="0.6" stroke="var(--brand)" stroke-width="1.75" stroke-linejoin="round"/>
    ${dots}${labels}
  </svg>`;
}

function compassFitTag(fit) {
  if (fit >= 75) return { cls: "strong", label: "STRONG" };
  if (fit >= 60) return { cls: "mixed", label: "MIXED" };
  return { cls: "stretch", label: "STRETCH" };
}

function renderReport() {
  if (state.reportLoading) {
    return `
      ${renderNav()}
      <div class="container">
        <div style="padding:60px 0;text-align:center;">
          <div class="lin-h lin-h1" style="margin-bottom:14px;">Building your compass…</div>
          <div class="text-sub" style="font-size:14px;margin-bottom:24px;">Analyzing every answer you gave.</div>
          ${spinner("reading between the lines…")}
        </div>
      </div>
    `;
  }
  const r = state.report;
  if (!r) {
    return `
      ${renderNav()}
      <div class="container">
        ${state.reportError ? `<div class="text-red mb-md">${esc(state.reportError)}</div>` : ""}
        <button class="btn btn-primary" data-action="generate-report">Generate report</button>
      </div>
    `;
  }
  return `
    ${renderNav()}
    <div class="container wide rise">
      <button class="back-link" data-action="go" data-screen="dashboard">← BACK TO DASHBOARD</button>

      <div class="report-header">
        <div class="mono" style="font-size:12px;color:var(--brand);letter-spacing:1.5px;margin-bottom:12px;">
          THE CAREER COMPASS REPORT
        </div>
        <h1 class="report-title">${esc(r.headline)}</h1>
        <p class="sub-text" style="max-width:640px;font-size:18px;">${esc(r.profile)}</p>
        ${r.signature ? `
          <div style="margin-top:26px;padding:22px 26px;border-left:3px solid var(--brand);background:var(--brand-soft);border-radius:0 12px 12px 0;">
            <div class="mono" style="font-size:11px;color:var(--brand-ink);letter-spacing:1px;margin-bottom:8px;">YOUR SIGNATURE</div>
            <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:22px;line-height:1.35;letter-spacing:-0.3px;color:var(--brand-ink);">${esc(r.signature)}</div>
          </div>
        ` : ""}
      </div>

      <!-- Compass radar -->
      ${r.compass && r.compass.length ? `
        <div class="compass-viz card">
          <div class="compass-viz-chart">
            ${renderCompassRadar(r.compass)}
          </div>
          <div class="compass-viz-fits">
            <div class="mono" style="font-size:11px;color:var(--brand);letter-spacing:1px;margin-bottom:4px;">YOUR TOP MATCHES</div>
            ${(r.compassFits || []).map(f => {
              const t = compassFitTag(f.fit);
              return `
                <div class="compass-fit">
                  <div class="compass-fit-score">${f.fit}</div>
                  <div class="compass-fit-body">
                    <div class="compass-fit-name">${esc(f.career)}</div>
                    <div class="compass-fit-tag ${t.cls}">${t.label}</div>
                    <div class="compass-fit-why">${esc(f.why)}</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Superpowers + Watchouts -->
      <div class="super-grid">
        <div class="card super-card green">
          <div class="mono" style="font-size:11px;color:var(--green);letter-spacing:1px;margin-bottom:12px;">YOUR SUPERPOWERS</div>
          ${r.superpowers.map(s => `<div class="super-item"><span class="text-green" style="margin-right:6px;">★</span>${esc(s)}</div>`).join("")}
        </div>
        <div class="card super-card amber">
          <div class="mono" style="font-size:11px;color:var(--amber);letter-spacing:1px;margin-bottom:12px;">WATCH OUT FOR</div>
          ${r.watchouts.map(s => `<div class="super-item"><span class="text-amber" style="margin-right:6px;">⚠</span>${esc(s)}</div>`).join("")}
        </div>
      </div>

      <!-- Quiz results breakdown — what the tests actually said -->
      ${r.quizBreakdown && r.quizBreakdown.length ? `
        <div class="mb-lg">
          <h2 class="lin-h lin-h2" style="margin-bottom:16px;">What the five quizzes actually said.</h2>
          <p class="sub-text" style="max-width:640px;font-size:15px;margin-bottom:24px;">Before the career recommendations, here's the raw signal — dimension by dimension, from your own answers.</p>
          <div class="stack-md">
            ${r.quizBreakdown.map((s, i) => `
              <div class="card" style="padding:26px;">
                <div style="display:flex;gap:12px;align-items:baseline;margin-bottom:14px;flex-wrap:wrap;">
                  <span class="mono" style="font-size:11px;color:var(--faint);letter-spacing:0.5px;">0${i+1} · QUIZ ${i+1} OF 5</span>
                </div>
                <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:26px;letter-spacing:-0.3px;line-height:1.15;margin-bottom:10px;">${esc(s.title)}</div>
                <div style="font-size:15px;line-height:1.6;color:var(--ink-soft);margin-bottom:${s.bars || s.picks ? "18px" : "0"};">${esc(s.lead)}</div>
                ${s.bars && s.bars.length ? `
                  <div class="stack-sm" style="margin-bottom:18px;">
                    ${s.bars.map(b => `
                      <div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                          <span style="font-size:14px;font-weight:600;">${esc(b.label)}</span>
                          <span class="mono" style="font-size:12px;color:var(--sub);">${b.score}% · ${esc(b.band)}</span>
                        </div>
                        <div style="height:6px;background:var(--bg-alt);border-radius:999px;overflow:hidden;">
                          <div style="height:100%;width:${b.score}%;background:${b.band === 'very strong' || b.band === 'strong' ? 'var(--grad-brand)' : b.band === 'moderate' ? 'var(--grad-warm)' : 'var(--sub)'};"></div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                ` : ""}
                ${s.picks && s.picks.length ? `
                  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
                    ${s.picks.map(p => `<span class="badge badge-brand">${esc(p)}</span>`).join("")}
                  </div>
                ` : ""}
                <div style="padding:14px 16px;background:var(--bg-alt);border-radius:10px;border-left:3px solid var(--brand);">
                  <div class="mono" style="font-size:10.5px;color:var(--brand);letter-spacing:0.8px;margin-bottom:6px;">WHAT THIS MEANS</div>
                  <div style="font-size:14px;line-height:1.6;color:var(--ink-soft);">${esc(s.takeaway)}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Patterns -->
      ${r.patterns && r.patterns.length ? `
        <div class="mb-lg">
          <h2 class="lin-h lin-h2" style="margin-bottom:16px;">What your answers keep telling us.</h2>
          <div class="stack-md">
            ${r.patterns.map(p => `
              <div class="card" style="padding:22px;">
                <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:22px;letter-spacing:-0.3px;line-height:1.2;margin-bottom:8px;">${esc(p.title)}</div>
                <div style="font-size:14.5px;color:var(--sub);line-height:1.65;">${esc(p.detail)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Contrasts / tensions -->
      ${r.contrasts && r.contrasts.length ? `
        <div class="mb-lg">
          <h2 class="lin-h lin-h2" style="margin-bottom:16px;">You want two things that don't obviously coexist.</h2>
          <div class="stack-sm">
            ${r.contrasts.map(c => `
              <div class="card" style="padding:20px 22px;border-left:3px solid var(--amber);background:var(--amber-soft);">
                <div style="font-size:14.5px;line-height:1.6;color:var(--ink);">${esc(c)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Fields that fit -->
      <div class="mb-lg">
        <h2 class="lin-h lin-h2" style="margin-bottom:16px;">Where you'll thrive.</h2>
        <div class="card card-flat">
          ${r.topFields.map(f => `
            <div class="fit-row">
              <div class="fit-score ${scoreClass(f.fit)}">${f.fit}</div>
              <div style="flex:1;">
                <div class="fit-title">${esc(f.field)}</div>
                <div class="fit-desc">${esc(f.why)}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Top careers with do's/don'ts inline -->
      <div class="mb-lg">
        <h2 class="lin-h lin-h2" style="margin-bottom:16px;">Actual jobs — with the honest playbook.</h2>
        <div class="stack-lg">
          ${r.topCareers.map((c, i) => `
            <div class="card" style="padding:26px;">
              <div class="row-between mb-md" style="gap:16px;align-items:flex-start;">
                <div>
                  <div class="mono" style="font-size:11px;color:var(--faint);letter-spacing:0.5px;margin-bottom:6px;">#${i+1} · ${esc(c.subgroup || c.group)}</div>
                  <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:28px;letter-spacing:-0.4px;line-height:1.1;">${esc(c.career)}</div>
                </div>
                <span class="badge ${c.fit >= 75 ? "badge-good" : c.fit >= 60 ? "badge-warn" : ""}" style="font-size:13px;padding:6px 10px;">${c.fit}% fit</span>
              </div>
              <div style="font-size:14.5px;color:var(--ink-soft);line-height:1.6;margin-bottom:16px;">${esc(c.why)}</div>
              ${c.reality ? `
                <div style="font-size:13.5px;color:var(--sub);line-height:1.6;padding:14px 16px;background:var(--bg-alt);border-radius:10px;margin-bottom:16px;">
                  <span style="font-weight:600;color:var(--ink);">Reality:</span> ${esc(c.reality)}
                </div>
              ` : ""}
              ${(c.dos && c.dos.length) || (c.donts && c.donts.length) ? `
                <div class="super-grid" style="gap:12px;">
                  ${c.dos && c.dos.length ? `
                    <div style="padding:14px 16px;background:var(--green-soft);border-radius:10px;">
                      <div class="mono" style="font-size:10.5px;color:var(--green);letter-spacing:1px;margin-bottom:8px;">DO</div>
                      ${c.dos.map(d => `<div style="font-size:13px;line-height:1.5;margin-bottom:6px;color:var(--ink);"><span class="text-green" style="font-weight:700;margin-right:6px;">✓</span>${esc(d)}</div>`).join("")}
                    </div>
                  ` : ""}
                  ${c.donts && c.donts.length ? `
                    <div style="padding:14px 16px;background:var(--red-soft);border-radius:10px;">
                      <div class="mono" style="font-size:10.5px;color:var(--red);letter-spacing:1px;margin-bottom:8px;">DON'T</div>
                      ${c.donts.map(d => `<div style="font-size:13px;line-height:1.5;margin-bottom:6px;color:var(--ink);"><span class="text-red" style="font-weight:700;margin-right:6px;">×</span>${esc(d)}</div>`).join("")}
                    </div>
                  ` : ""}
                </div>
              ` : ""}
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Avoid -->
      ${r.avoid && r.avoid.length ? `
        <div class="mb-lg">
          <h2 class="lin-h lin-h2" style="margin-bottom:16px;">Save yourself the years.</h2>
          <div class="card card-flat">
            ${r.avoid.map(a => `
              <div style="padding:16px 20px;border-bottom:1px solid var(--line);">
                <div style="font-weight:600;font-size:15.5px;margin-bottom:4px;">× ${esc(a.career)} <span style="color:var(--faint);font-size:12px;font-weight:400;margin-left:6px;">${esc(a.group || "")}</span></div>
                <div style="font-size:13.5px;color:var(--sub);line-height:1.55;">${esc(a.why)}</div>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}

      <!-- Sim insights, if any -->
      ${r.simInsights ? `
        <div class="mb-lg">
          <h2 class="lin-h lin-h2" style="margin-bottom:16px;">Behavioural signal, not just quiz answers.</h2>
          <div class="card" style="padding:24px;">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid var(--line);">
              <div>
                <div class="mono" style="font-size:11px;color:var(--sub);letter-spacing:0.5px;margin-bottom:6px;">SIMULATED</div>
                <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:28px;letter-spacing:-0.4px;line-height:1;">${r.simInsights.count}</div>
              </div>
              <div>
                <div class="mono" style="font-size:11px;color:var(--sub);letter-spacing:0.5px;margin-bottom:6px;">AVERAGE FIT</div>
                <div class="fit-score ${scoreClass(r.simInsights.average)}" style="font-size:28px;width:auto;">${r.simInsights.average}</div>
              </div>
              <div>
                <div class="mono" style="font-size:11px;color:var(--sub);letter-spacing:0.5px;margin-bottom:6px;">BEST FIT SO FAR</div>
                <div style="font-family:var(--font-sans);font-weight:700;letter-spacing:-0.02em;font-size:20px;letter-spacing:-0.2px;line-height:1.2;">${esc(r.simInsights.best)}</div>
              </div>
            </div>
            <div style="font-size:15px;line-height:1.65;color:var(--ink-soft);">${esc(r.simInsights.read)}</div>
          </div>
        </div>
      ` : ""}

      <!-- Six month plan -->
      <div class="mb-lg">
        <div style="padding:32px 0;">
          <div class="mono" style="font-size:12px;color:var(--brand);letter-spacing:1px;margin-bottom:10px;">YOUR NEXT 6 MONTHS</div>
          <h2 class="lin-h lin-h2" style="margin:0 0 20px;">Try this to test your fit for real.</h2>
          ${r.sixMonthPlan.map((p, i) => `
            <div class="plan-item">
              <span class="plan-num">${i + 1}</span>
              <div class="plan-text">${esc(p)}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="row" style="padding-top:20px;border-top:1px solid var(--line);">
        <button class="btn btn-primary" data-action="go" data-screen="careers">Try more careers →</button>
        <button class="btn btn-ghost" data-action="regenerate-report">Regenerate report</button>
        <button class="btn btn-ghost" data-action="print">Print / save PDF</button>
      </div>
    </div>
  `;
}

// ============================================================
// COMPARE
// ============================================================
function renderCompare() {
  const c = state.compareResult;
  if (!c) {
    return `
      ${renderNav()}
      <div class="container">
        <div style="padding:60px 0;text-align:center;">
          <div class="lin-h lin-h1" style="margin-bottom:20px;">Comparing your careers…</div>
          ${spinner("weighing the choices…")}
        </div>
      </div>
    `;
  }
  const cols = c.ranking.length;
  // One grid: a narrow row-label column + one column per career.
  const gridCols = `132px repeat(${cols}, minmax(190px, 1fr))`;
  const scoreCls = (s) => scoreClass(s); // high / mid / low — same ruler as everywhere else

  const headCells = c.ranking.map((r, i) => `
    <div class="cmp-cell head ${i === 0 ? "cmp-col-winner" : ""}">
      <div class="cmp-rank ${i === 0 ? "first" : ""}">#${i + 1}${i === 0 ? " · TOP PICK" : ""}</div>
      <div class="cmp-name">${esc(r.career)}</div>
    </div>`).join("");

  const scoreCells = c.ranking.map((r, i) => `
    <div class="cmp-cell ${i === 0 ? "cmp-col-winner" : ""}">
      <div class="cmp-scorecell ${scoreCls(r.score)}">${r.score}</div>
    </div>`).join("");

  const readCells = c.ranking.map((r, i) => `
    <div class="cmp-cell ${i === 0 ? "cmp-col-winner" : ""}">
      <div class="cmp-oneliner">${esc(r.oneLiner)}</div>
    </div>`).join("");

  const verdictCells = c.ranking.map((r, i) => `
    <div class="cmp-cell ${i === 0 ? "cmp-col-winner" : ""}">
      ${i === 0 ? `<span class="cmp-badge win">Winner</span>` : `<span class="cmp-badge">Runner-up</span>`}
    </div>`).join("");

  return `
    ${renderNav()}
    <div class="container rise">
      <button class="back-link" data-action="go" data-screen="dashboard">← BACK TO DASHBOARD</button>

      <div style="margin-bottom:22px;">
        <span class="section-label accent">Head to head · ${state.completedSims.length} careers</span>
        <h1 class="lin-h lin-h1">${esc(c.winner)}</h1>
      </div>

      <div class="cmp">
        <div class="cmp-scroll">
          <div class="cmp-grid" style="grid-template-columns:${gridCols};">
            <div class="cmp-row">
              <div class="cmp-rowlabel">Career</div>
              ${headCells}
            </div>
            <div class="cmp-row">
              <div class="cmp-rowlabel">Fit score</div>
              ${scoreCells}
            </div>
            <div class="cmp-row">
              <div class="cmp-rowlabel">The read</div>
              ${readCells}
            </div>
            <div class="cmp-row">
              <div class="cmp-rowlabel">Verdict</div>
              ${verdictCells}
            </div>
          </div>
        </div>
      </div>

      <div class="panel panel-pad mb-md">
        <span class="section-label accent">Why</span>
        <div style="font-size:15px;line-height:1.65;margin-bottom:22px;color:var(--ink-soft);">${esc(c.reasoning)}</div>
        <span class="section-label" style="color:var(--amber);">Next 6 months</span>
        <div style="font-size:15px;line-height:1.65;color:var(--ink-soft);">${esc(c.nextStep)}</div>
      </div>

      <div class="row">
        <button class="btn btn-primary" data-action="go" data-screen="careers">Test another career</button>
        <button class="btn btn-ghost" data-action="go" data-screen="report">See full report</button>
        <button class="btn btn-ghost" data-action="go" data-screen="dashboard">Dashboard</button>
      </div>
    </div>
  `;
}

// ============================================================
// LEGAL PAGES
// ============================================================
function renderLegalShell(title, kicker, updated, sections) {
  return `
    ${renderNav()}
    <div class="container rise" style="max-width:780px;">
      <button class="back-link" data-action="go" data-screen="landing">← BACK TO HOME</button>

      <div class="mb-lg" style="padding-bottom:24px;border-bottom:1px solid var(--line);">
        <div class="mono" style="font-size:11px;letter-spacing:1.2px;color:var(--sub);margin-bottom:14px;">${esc(kicker)}</div>
        <h1 class="lin-h lin-h1" style="margin-bottom:12px;">${esc(title)}</h1>
        <p class="sub-text" style="font-size:15px;color:var(--sub);">Last updated: ${esc(updated)}</p>
      </div>

      <div class="legal-body" style="font-size:16px;line-height:1.75;color:var(--fg);">
        ${sections.map(s => `
          <section style="margin-bottom:38px;">
            <h2 class="lin-h lin-h2" style="margin:0 0 12px;">${esc(s.h)}</h2>
            ${s.body}
          </section>
        `).join("")}
      </div>

      <div style="padding:28px 0 60px;border-top:1px solid var(--line);margin-top:20px;">
        <p style="font-size:14px;color:var(--sub);margin:0 0 14px;">Questions? Email <a href="mailto:theearlybuilder@gmail.com" style="color:var(--brand);">theearlybuilder@gmail.com</a>.</p>
        <div class="row" style="gap:10px;flex-wrap:wrap;">
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="privacy">Privacy</button>
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="terms">Terms</button>
          <button class="btn btn-ghost btn-sm" data-action="go" data-screen="disclaimer">Disclaimer</button>
        </div>
      </div>
    </div>
  `;
}

function renderPrivacy() {
  return renderLegalShell("Privacy Policy", "LEGAL · PRIVACY", "July 13, 2026", [
    { h: "The short version.", body: `
      <p>The Early Builder is a self-reflection tool for students. We collect the minimum needed to make your compass work — your quiz answers, career simulation choices, and the email you sign up with. We do not sell your data. We do not run ads based on it. Your career answers are yours.</p>
    ` },
    { h: "What we collect.", body: `
      <ul>
        <li><strong>Account info:</strong> email address, name (if you provide one), and a hashed password.</li>
        <li><strong>Compass data:</strong> quiz answers, career simulation choices, verdicts, and generated report content.</li>
        <li><strong>Usage:</strong> pages visited, features used, approximate device/browser info, and rough location (country-level) from your IP for security and analytics.</li>
        <li><strong>Cloud storage:</strong> we save your progress to a secure cloud database (Firebase) so it syncs across devices and doesn't get lost between sessions. You can request deletion at any time.</li>
      </ul>
    ` },
    { h: "What we don't collect.", body: `
      <ul>
        <li>Payment or bank details — The Early Builder is free for students during our current phase.</li>
        <li>Government IDs, phone numbers, or physical addresses.</li>
        <li>Contact lists, social graphs, or anything from other apps.</li>
        <li>Precise GPS location.</li>
      </ul>
    ` },
    { h: "How we use it.", body: `
      <p>We use your data to (1) run the product — score your quizzes, generate simulations and reports; (2) improve the product — figure out which questions are confusing, which careers people want that we don't yet cover; (3) keep it secure — detect abuse and prevent account takeovers; (4) email you occasionally about your compass. Nothing else.</p>
    ` },
    { h: "Who we share it with.", body: `
      <p>A small number of infrastructure providers help us run The Early Builder — hosting, email delivery, analytics, and error monitoring. They only see what they need to do their job, and they're contractually bound to keep it confidential. We do not sell your data to advertisers, recruiters, colleges, coaching companies, or anyone else. If a career-adjacent service ever wants to reach our users, they can advertise on the site — they never get your data.</p>
    ` },
    { h: "How long we keep it.", body: `
      <p>We keep your account and compass data as long as your account exists. If you delete your account, we remove your personal data within 30 days. Aggregated, non-identifiable statistics (e.g. "34% of engineering students picked X") may be retained.</p>
    ` },
    { h: "Your rights.", body: `
      <p>You can view, export, or delete your data at any time by emailing <a href="mailto:theearlybuilder@gmail.com" style="color:var(--brand);">theearlybuilder@gmail.com</a>. If you're in the EU, UK, or California, you have additional rights under GDPR / CCPA — the right to access, correct, port, and erase your data, and to object to processing. We'll honor those requests within 30 days.</p>
    ` },
    { h: "Cookies.", body: `
      <p>We use a small number of first-party cookies (and localStorage) to keep you signed in and remember your progress. We use privacy-respecting analytics — no third-party ad trackers, no cross-site fingerprinting.</p>
    ` },
    { h: "Kids.", body: `
      <p>The Early Builder is intended for users 13 and older. If you're under 13, please don't create an account. If we learn we've collected data from a child under 13, we'll delete it.</p>
    ` },
    { h: "Changes.", body: `
      <p>If we materially change this policy, we'll notify you by email or by a banner in the app before the change takes effect. Continued use after the effective date means you accept the new policy.</p>
    ` }
  ]);
}

function renderTerms() {
  return renderLegalShell("Terms of Service", "LEGAL · TERMS", "July 13, 2026", [
    { h: "The deal.", body: `
      <p>By using The Early Builder you agree to these terms. If you don't agree, don't use the product. These terms are written in plain English on purpose — no clever traps.</p>
    ` },
    { h: "Who can use it.", body: `
      <p>You need to be at least 13 years old, and old enough in your country to consent to an online service without a parent. You agree to give accurate information when you sign up, keep your login secure, and not share your account.</p>
    ` },
    { h: "What The Early Builder is (and isn't).", body: `
      <p>The Early Builder is a self-reflection and career-exploration tool. The quizzes, simulations, verdicts, and reports are <strong>guidance, not advice</strong>. We are not your career counselor, therapist, doctor, financial advisor, or lawyer. Don't base major life decisions on the app alone — talk to real humans who know you.</p>
    ` },
    { h: "Your content.", body: `
      <p>You own your answers, choices, and anything you write into the product. By using The Early Builder, you grant us a limited license to store and process your content only to run the product for you and to improve it in aggregate, non-identifiable ways. We won't publish your content, sell it, or attribute it to you without your consent.</p>
    ` },
    { h: "Our content.", body: `
      <p>The quiz questions, career simulations, report templates, code, design, and everything else we made are owned by The Early Builder. You can use them personally through the product. You can't scrape them, repackage them, resell them, or feed them into a competing product.</p>
    ` },
    { h: "Acceptable use.", body: `
      <p>Don't do anything illegal, abusive, or harmful with The Early Builder. Specifically, don't (a) try to break into other accounts, (b) probe or attack our infrastructure, (c) scrape at scale, (d) upload malware, or (e) use The Early Builder to harass anyone. We can suspend accounts that break these rules.</p>
    ` },
    { h: "AI-generated content.", body: `
      <p>Parts of the product — reports, verdicts, some career text — are generated with the help of AI models. Generated content can be wrong, incomplete, or biased. Treat it as a starting point for your own thinking, not as a source of truth. Verify anything that matters.</p>
    ` },
    { h: "Availability.", body: `
      <p>We try to keep The Early Builder running smoothly, but we don't promise uptime, uninterrupted service, or that your data will always be recoverable. Back up anything you care about.</p>
    ` },
    { h: "Pricing.", body: `
      <p>The Early Builder is currently free for students. If we introduce paid tiers, we'll tell you before your existing usage becomes a paid feature — and free features will stay free.</p>
    ` },
    { h: "Ending it.", body: `
      <p>You can delete your account any time. We can suspend or terminate accounts that break these terms or that put other users or our infrastructure at risk. If we terminate your account without cause, we'll help you export your data.</p>
    ` },
    { h: "Warranties and liability.", body: `
      <p>The Early Builder is provided "as is," without warranties of any kind. To the maximum extent permitted by law, we're not liable for indirect, incidental, or consequential damages, and our total liability for any claim is limited to $100 (or the amount you've paid us in the last 12 months, whichever is greater).</p>
    ` },
    { h: "Governing law.", body: `
      <p>These terms are governed by the laws of the State of Delaware, United States. Disputes go to the state and federal courts located in Delaware, unless a mandatory local law says otherwise.</p>
    ` },
    { h: "Changes.", body: `
      <p>We may update these terms as the product evolves. For material changes, we'll notify you at least 14 days in advance. Continued use after the effective date means you accept the new terms.</p>
    ` }
  ]);
}

function renderDisclaimer() {
  return renderLegalShell("Disclaimer", "LEGAL · DISCLAIMER", "July 13, 2026", [
    { h: "Read this before betting your life on a quiz.", body: `
      <p>The Early Builder helps you think about your career. It does not decide it for you. Everything below is common sense, but we're saying it out loud so nobody is surprised.</p>
    ` },
    { h: "Not professional advice.", body: `
      <p>Nothing on The Early Builder is career, legal, financial, medical, or psychological advice. Career fit is complicated — the app looks at a slice of it. For big decisions, talk to people who know you personally and to qualified professionals when relevant.</p>
    ` },
    { h: "Career simulations are simplified.", body: `
      <p>A 15-minute simulation cannot capture what a career actually feels like across ten years. We compress days into scenes, exaggerate contrasts, and omit boring middles. That's the point — but it also means the simulation is a caricature, not a documentary.</p>
    ` },
    { h: "Salary and market data.", body: `
      <p>Salary ranges, market demand indicators, and "day in the life" descriptions are approximate and change quickly. They are based on public data and our editorial judgment at the time of writing. Don't quote them in negotiations.</p>
    ` },
    { h: "AI limitations.", body: `
      <p>Some content is AI-generated. AI models make mistakes, hallucinate facts, reflect biases in their training data, and can be confidently wrong. Cross-check anything important.</p>
    ` },
    { h: "No guarantees of outcome.", body: `
      <p>Using The Early Builder will not guarantee you a job, an internship, admission, income, or happiness in any career. It's a mirror, not a magic wand.</p>
    ` },
    { h: "External links.", body: `
      <p>We sometimes link to other sites for context — colleges, employers, articles. We don't control those sites and aren't responsible for what they say or do.</p>
    ` }
  ]);
}

// ============================================================
// ROUTER
// ============================================================
function renderAppFooter() {
  const signedIn = !!state.user;
  const assessmentsLink = signedIn
    ? `<a data-action="go" data-screen="dashboard">Assessments</a>`
    : `<a data-action="landing-scroll" data-target="tests">Assessments</a>`;
  const simsLink = signedIn
    ? `<a data-action="go" data-screen="careers">Career simulations</a>`
    : `<a data-action="landing-scroll" data-target="careers">Career simulations</a>`;
  const reportLink = signedIn
    ? `<a data-action="go" data-screen="${state.report ? "report" : "dashboard"}">Compass report</a>`
    : `<a data-action="landing-scroll" data-target="compass">Compass report</a>`;
  return `
    <footer class="saas-footer gutter">
      <div class="saas-footer-grid">
        <div>
          <div class="saas-footer-brand"><img class="logo-mark" src="logo.png" alt="" style="width:32px;height:32px;" /> The Early Builder</div>
          <div class="saas-footer-tag">The honest career compass for students who haven't figured it out yet — which is all of them.</div>
        </div>
        <div class="saas-footer-col">
          <div class="saas-footer-col-title">Product</div>
          ${assessmentsLink}
          ${simsLink}
          ${reportLink}
        </div>
        <div class="saas-footer-col">
          <div class="saas-footer-col-title">Company</div>
          <a data-action="landing-scroll" data-target="how">How it works</a>
          <a data-action="mailto-team">Contact</a>
          <a data-action="suggest-career">Suggest a career</a>
        </div>
        <div class="saas-footer-col">
          <div class="saas-footer-col-title">Legal</div>
          <a data-action="go" data-screen="privacy">Privacy</a>
          <a data-action="go" data-screen="terms">Terms</a>
          <a data-action="go" data-screen="disclaimer">Disclaimer</a>
        </div>
      </div>
      <div class="saas-footer-bottom">
        <div>© 2026 The Early Builder · Built for students, not recruiters.</div>
      </div>
    </footer>
  `;
}

function render(preserveScroll = false) {
  applyTheme();
  const scrollY = window.scrollY;
  const app = document.getElementById("app");
  let html;
  let includeFooter = true;
  // Guard: authed-only screens must not render without a valid session.
  const AUTHED_ONLY = ["dashboard", "quiz", "quiz-result", "careers", "sim", "verdict", "report", "compare"];
  if (!state.user && AUTHED_ONLY.includes(state.screen)) { state.screen = "login"; }
  if (state.screen === "landing") { html = renderLanding(); }
  else if (state.screen === "login") { html = renderLogin(); includeFooter = false; }
  else if (state.screen === "dashboard") html = renderDashboard();
  else if (state.screen === "quiz") html = renderQuiz();
  else if (state.screen === "quiz-result") html = renderQuizResult();
  else if (state.screen === "careers") html = renderCareers();
  else if (state.screen === "sim") html = renderSim();
  else if (state.screen === "verdict") html = renderVerdict();
  else if (state.screen === "report") html = renderReport();
  else if (state.screen === "compare") html = renderCompare();
  else if (state.screen === "privacy") html = renderPrivacy();
  else if (state.screen === "terms") html = renderTerms();
  else if (state.screen === "disclaimer") html = renderDisclaimer();
  else { html = renderLanding(); }
  if (includeFooter) html += renderAppFooter();

  // Chrome: left sidebar on authed hub screens, slim top bar elsewhere.
  const useSidebar = !!state.user && SIDEBAR_SCREENS.has(state.screen);
  document.body.dataset.chrome = useSidebar ? "sidebar" : "topbar";
  if (useSidebar) html = renderSidebar() + `<div class="app-main">${html}</div>`;
  if (state.palette) html += renderCommandPalette();

  app.innerHTML = html;
  window.scrollTo({ top: preserveScroll ? scrollY : 0, behavior: "instant" });
  if (state.palette) mountPalette();
  persist();
}

function softRender() {
  applyTheme();
  const app = document.getElementById("app");
  let html;
  if (state.screen === "sim") html = renderSim();
  else if (state.screen === "quiz") html = renderQuiz();
  else return render();
  const scrollY = window.scrollY;
  app.innerHTML = html;
  window.scrollTo({ top: scrollY });
  persist();
}

// ============================================================
// ACTIONS
// ============================================================
async function go(screen) {
  state.screen = screen;
  if (screen.startsWith("quiz-result:")) {
    const key = screen.split(":")[1];
    state.currentQuiz = key;
    state.screen = "quiz-result";
  } else if (screen.startsWith("quiz:")) {
    const key = screen.split(":")[1];
    state.currentQuiz = key;
    const answers = state.quizAnswers[key] || {};
    const quiz = QUIZZES.find(q => q.key === key);
    let firstUnanswered = 0;
    for (let i = 0; i < quiz.items.length; i++) if (answers[i] === undefined) { firstUnanswered = i; break; }
    state.currentQuizIdx = firstUnanswered;
    state.screen = "quiz";
  }
  if (screen === "report" && !state.report && !state.reportLoading) {
    render();
    await generateReport();
    return;
  }
  if (screen === "compare" && !state.compareResult) {
    state.compareResult = null;
    render();
    await runCompare();
    return;
  }
  render();
}

function quizAnswer(value) {
  const quiz = QUIZZES.find(q => q.key === state.currentQuiz);
  const key = quiz.key;
  const val = quiz.binary ? value : Number(value);
  const cur = state.quizAnswers[key] || {};
  const previousAnswer = cur[state.currentQuizIdx];
  state.quizAnswers[key] = { ...cur, [state.currentQuizIdx]: val };
  // If an existing answer just changed, the cached report is stale
  if (previousAnswer !== undefined && previousAnswer !== val) {
    state.report = null;
  }
  if (state.currentQuizIdx < quiz.items.length - 1) {
    state.currentQuizIdx++;
    render();
  } else {
    state.screen = "dashboard";
    render();
  }
}

// Branching-format helpers: a script is branching when it defines `start`
// and `scenes` is a map keyed by id. Choices are objects {text,tone,sets?,next?}.
// A `next` (on choice or scene) may be a string id or (flags)=>id.
function isBranchingScript(script) {
  return typeof script.start === "string" && !Array.isArray(script.scenes);
}
function choiceText(c) { return typeof c === "string" ? c : c.text; }
function choiceTone(c, sceneTones, idx) {
  if (typeof c === "object" && c.tone) return c.tone;
  return sceneTones ? sceneTones[idx] : "neutral";
}
function resolveNextKey(scene, choice, flags, ctx) {
  const pick = (typeof choice === "object" && choice.next) || scene.next || null;
  if (!pick) return null;
  // Legacy routers take (flags); newer ones can take (flags, ctx) to read the
  // consequence ledger, drift, and live clock. Extra args are ignored by old code.
  return typeof pick === "function" ? pick(flags, ctx) : pick;
}

// ------------------------------------------------------------
// DYNAMIC PROSE + CONSEQUENCE MEMORY
// A scene's `scene` text and `stat.label` may be a plain string OR a function of
// the run's live state — so a later beat can read what you did earlier and say
// it out loud. The context a scene sees is "state on arrival": every flag set
// and mark left by prior choices, the minutes of drift you've built, and the
// clock as it actually reads right now (not the scheduled time on the label).
//
// This is what makes a bad call come back to bite you: choices leave `mark`s in
// an ordered ledger (id + a short human note + when it happened), and downstream
// scenes gate their routing and rewrite their prose off that ledger.
// ------------------------------------------------------------

// Live clock for any scene time + the run's current drift. "8:30 AM" + 25 min
// behind reads "8:55 AM". Non-clock labels ("Week 3") return null.
function clockFor(timeStr, drift) {
  const scheduled = parseClock(timeStr);
  if (scheduled == null) return null;
  const d = drift || 0;
  return {
    scheduled, drift: d, actual: scheduled + d,
    label: formatClock(scheduled + d),
    status: d > 20 ? "behind" : d < -20 ? "ahead" : "on",
  };
}

// The state a scene sees the moment the player lands on it.
function buildSceneCtx(scene, s) {
  const flags = (s && s.flags) || {};
  const marks = (s && s.marks) || [];
  const byId = (id) => marks.find(m => m && m.id === id);
  const ctx = {
    flags, marks,
    drift: (s && s.drift) || 0,
    spent: (s && s.spent) || 0,
    clock: clockFor(scene && scene.time, s && s.drift),
    // has(): true if a flag OR a mark of that id is present. mark(): the record.
    has: (id) => !!flags[id] || !!byId(id),
    mark: byId,
    // Minutes remaining until a deadline ("1:00 AM"), read off the live clock —
    // so prose like "you have {n} left" tells the truth after slow choices.
    timeLeft: (deadline) => {
      const c = clockFor(scene && scene.time, s && s.drift);
      const end = parseClock(deadline);
      if (!c || end == null) return null;
      let mins = end - c.actual;
      if (mins < -720) mins += 1440; // deadline is past midnight
      return mins;
    },
  };
  return ctx;
}

// "a, b and c" — for stitching a dynamic list of the day's loose threads into
// one closing sentence.
function oxford(list) {
  const xs = (list || []).filter(Boolean);
  if (xs.length <= 1) return xs[0] || "";
  return xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1];
}

// Resolve a scene field that may be a string or a (ctx)=>string function.
function resolveField(val, scene, s) {
  return typeof val === "function" ? val(buildSceneCtx(scene, s)) : val;
}
function resolveSceneText(scene, s) {
  return scene ? (resolveField(scene.scene, scene, s) || "") : "";
}
function resolveStat(scene, s) {
  if (!scene || !scene.stat) return null;
  // `stat` may be the object itself, a (ctx)=>object, or an object whose `label`
  // is a (ctx)=>string. Resolve the outer function first, then the label.
  const raw = typeof scene.stat === "function" ? scene.stat(buildSceneCtx(scene, s)) : scene.stat;
  if (!raw) return null;
  return { ...raw, label: resolveField(raw.label, scene, s) };
}
// ------------------------------------------------------------
// OPTION ORDER
// The scene bank is heavily front-loaded: the first option is the "good" one in
// 86% of scenes. Left alone, that means a player who just clicks the top choice
// every time scores like an expert, which makes the whole verdict meaningless.
// So option order is randomised per run.
//
// The shuffle is SEEDED rather than random-per-call, because getScene is also
// hit when re-rendering and when the player steps back a scene — an unseeded
// shuffle would rearrange the options under their cursor. Seeding on
// (run seed, scene key) keeps a given scene's order fixed for the whole run
// while varying it between runs.
// ------------------------------------------------------------

function hashSeed(str) {
  let h = 2166136261 >>> 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

// mulberry32 — small, fast, deterministic.
function seededRandom(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Permute a scene's options. `choices` may carry tone/mins inline (object form)
// or in parallel `tones`/`minutes` arrays (array form) — both are reordered in
// lockstep so index-based lookups stay correct. Returns a copy; the script
// itself is shared across runs and must not be mutated.
function shuffleSceneChoices(scene, seed) {
  if (!scene || !Array.isArray(scene.choices) || scene.choices.length < 2) return scene;
  const order = scene.choices.map((_, i) => i);
  const rand = seededRandom(seed);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const out = { ...scene, choices: order.map(i => scene.choices[i]) };
  if (Array.isArray(scene.tones)) out.tones = order.map(i => scene.tones[i]);
  if (Array.isArray(scene.minutes)) out.minutes = order.map(i => scene.minutes[i]);
  return out;
}

// Options can change with the day. `scene.choices` may be a (ctx)=>array, and
// any individual choice may carry `when: (ctx)=>bool` to appear only under the
// right history — so a lie earlier can remove the easy out and add a "come clean"
// option that only exists because of what you did. Resolved against arrival state
// BEFORE the shuffle, so gating and option order compose cleanly.
function resolveSceneChoices(scene, s) {
  if (!scene) return scene;
  let choices = scene.choices;
  const dynamic = typeof choices === "function"
    || (Array.isArray(choices) && choices.some(c => c && typeof c.when === "function"));
  if (!dynamic) return scene;
  const ctx = buildSceneCtx(scene, s);
  if (typeof choices === "function") choices = choices(ctx) || [];
  choices = choices.filter(c => !(c && typeof c.when === "function") || c.when(ctx));
  return { ...scene, choices };
}

function getScene(script, key, seed, s) {
  if (key == null) return null;
  const scene = script.scenes[key];
  if (!scene) return scene;
  const resolved = resolveSceneChoices(scene, s);
  return shuffleSceneChoices(resolved, hashSeed(`${seed || 0}:${key}`));
}

// ============================================================
// DAY CLOCK
// Every option carries `mins` — how much of the day it eats. The scene's own
// clock time is the schedule; the running clock is where you ACTUALLY are.
// Pick the thorough option and you fall behind; pick the fast one and you bank
// time. Drift is what the timeline and the verdict both read from.
// ============================================================

// Minutes a choice costs. Object choices carry `mins`; the array format carries
// a parallel `minutes` array on the scene. Missing data => null (no time cost).
function choiceMins(scene, choice, idx) {
  if (choice && typeof choice === "object" && typeof choice.mins === "number") return choice.mins;
  if (scene && Array.isArray(scene.minutes) && typeof scene.minutes[idx] === "number") return scene.minutes[idx];
  return null;
}

// Every option's cost for a scene, or null if the scene isn't time-scored.
function sceneMins(scene) {
  if (!scene || !scene.choices || !scene.choices.length) return null;
  const all = scene.choices.map((c, i) => choiceMins(scene, c, i));
  return all.every(m => m === null) ? null : all;
}

// The scene's expected spend — the median option. Beat it and you bank time,
// exceed it and you fall behind. Using the median (rather than a hand-authored
// par) keeps the baseline honest as scenes get rebalanced.
function scenePar(scene) {
  const all = sceneMins(scene);
  if (!all) return null;
  const vals = all.filter(m => m !== null).sort((a, b) => a - b);
  if (!vals.length) return null;
  const mid = Math.floor(vals.length / 2);
  return vals.length % 2 ? vals[mid] : Math.round((vals[mid - 1] + vals[mid]) / 2);
}

// A scene only shows time labels when the options actually differ on time —
// three 10-minute options are not a time decision, so we don't pretend they are.
function sceneHasTimeStakes(scene) {
  const all = sceneMins(scene);
  if (!all) return false;
  const vals = all.filter(m => m !== null);
  return vals.length > 1 && Math.max(...vals) - Math.min(...vals) >= 10;
}

// "8:45 AM" / "12:15 PM" -> minutes since midnight. Anything else (e.g. "Week 3",
// "2 years later") isn't a clock time and returns null, which resets the day.
function parseClock(str) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(String(str || "").trim());
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (/PM/i.test(m[3])) h += 12;
  return h * 60 + Number(m[2]);
}

function formatClock(mins) {
  let m = ((Math.round(mins) % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const suffix = h24 < 12 ? "AM" : "PM";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m % 60).padStart(2, "0")} ${suffix}`;
}

// "1h 20m" / "45m" — used for both option costs and drift.
function formatDur(mins) {
  const m = Math.abs(Math.round(mins));
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}

// "7:45 AM (Wed)" — an authored next-day scene. A bare "12:40 AM" is not: it's the
// same shift crossing midnight. Only the day-of-week parenthetical marks a new day.
function hasDayMarker(str) {
  return /\((mon|tue|wed|thu|fri|sat|sun)/i.test(String(str || ""));
}

// Does moving from `prev` to `next` mean a genuinely new day (the shift is over,
// so the drift you built resets and belongs to the day that just closed), or the
// same shift continuing? Three things end the day: `next` isn't a clock time at all
// ("Week 3", "2 years later"); `next` carries an explicit day-of-week marker
// ("7:45 AM (Wed)"); or the clock jumps so far backwards it can only be the next
// morning after sleep. A shift that simply crosses midnight and keeps going — an
// ER resident's 7 AM → 12:40 AM → 3 AM, or a banker's 10:30 PM → 1:40 AM — is NOT
// a new day: its backward wrap is small, so drift and the finish time carry through
// the whole continuous shift instead of freezing at the midnight rollover.
function isNewDay(prev, next) {
  const prevC = parseClock(prev);
  const nextC = parseClock(next);
  if (prevC == null || nextC == null) return true;
  if (hasDayMarker(next)) return true;
  if (nextC < prevC) {
    const forwardWrap = nextC + 1440 - prevC; // minutes forward, wrapping past midnight
    return forwardWrap >= 300; // ≥5h back = slept and restarted; <5h = same overnight shift
  }
  return false;
}

// Where the player actually is, given the schedule and what they've spent.
// Returns null for scenes with no clock (e.g. "3 months later").
function simClockState() {
  const s = state.sim;
  if (!s || !s.script) return null;
  const scene = s.current || (s.log.length ? s.log[s.log.length - 1] : null);
  const scheduled = parseClock(scene && scene.time);
  if (scheduled == null) return null;
  const drift = s.drift || 0;
  return {
    scheduled,
    actual: scheduled + drift,
    drift,
    label: formatClock(scheduled + drift),
    status: drift > 20 ? "behind" : drift < -20 ? "ahead" : "on",
  };
}

async function startSim(career) {
  state.currentCareer = career;
  state.screen = "sim";
  const script = loadScript(career);
  const startKey = isBranchingScript(script) ? script.start : 0;
  state.sim = {
    script,
    sceneKey: startKey,
    // Per-run seed for option-order shuffling. Fixed for the run so a scene's
    // options don't move when re-rendered or stepped back to.
    seed: (Math.random() * 0xFFFFFFFF) >>> 0,
    log: [],
    current: null,
    pickedTones: [],
    flags: {},
    marks: [],         // consequence ledger: choices that should resurface later
    drift: 0,          // minutes behind (+) or ahead (-) of schedule, this day
    spent: 0,          // total minutes the player has burned on decisions
    peakDrift: 0,      // worst point of the day — the verdict reads this
    endOfDayDrift: null, // drift snapshot taken when the working day closes
    endOfDayAt: null,    // clock reading at that moment
    loading: true,
    error: null,
  };
  state.simNote = !store.get("cc_simTimeNoteHidden", false);
  render();
  // brief "clocking in" pause for feel
  await new Promise((r) => setTimeout(r, 700));
  state.sim.current = getScene(script, startKey, state.sim.seed, state.sim);
  state.sim.loading = false;
  render();
}

async function simChoose(choice) {
  const s = state.sim;
  const cur = s.current;
  if (!cur) return;
  const idx = cur.choices.indexOf(choice);
  const tone = idx >= 0 ? choiceTone(choice, cur.tones, idx) : "neutral";
  const text = choiceText(choice);

  // Snapshot the scene text/stat the player actually read — resolved against the
  // state they ARRIVED with, before this pick's flags/drift land. History must
  // show the words that were on screen, not a re-resolution under later state.
  const resolvedSceneText = resolveSceneText(cur, s);
  const resolvedStat = resolveStat(cur, s);

  // apply flag sets (branching format)
  if (typeof choice === "object" && choice.sets) {
    Object.assign(s.flags, choice.sets);
  }

  // Leave a mark in the consequence ledger. A mark is a flag with a memory:
  // downstream scenes gate on its id AND can quote its `note`/`time` back to you.
  if (typeof choice === "object" && choice.mark) {
    const mk = choice.mark;
    s.marks.push({
      ...mk,
      sceneKey: s.sceneKey,
      time: cur.time,
      choiceText: text,
    });
    if (mk.id) s.flags[mk.id] = true;
  }

  // Time cost of this pick, measured against what the scene expected.
  const mins = idx >= 0 ? choiceMins(cur, choice, idx) : null;
  const par = scenePar(cur);
  const driftBefore = s.drift;
  if (mins !== null && par !== null) {
    s.drift += mins - par;
    s.spent += mins;
    s.peakDrift = Math.max(s.peakDrift, s.drift);
  }

  // Resolve every option's tone up front. Scenes come in two shapes: the object
  // format carries `tone` on each choice, the array format carries a parallel
  // `scene.tones`. Logging `cur.tones` directly only captured the second kind —
  // and since every career script uses the first, the verdict's behaviour model
  // was silently receiving nothing to score. Normalise to a real array here.
  const sceneTones = cur.choices.map((c, i) => choiceTone(c, cur.tones, i));

  s.pickedTones.push(tone);
  s.log.push({
    time: cur.time, scene: resolvedSceneText, choice: text, stat: resolvedStat, key: s.sceneKey,
    flagsBefore: {...s.flags}, marksBefore: s.marks.map(m => ({...m})),
    choices: cur.choices, tones: sceneTones,
    mins, par, driftBefore, driftAfter: s.drift,
    // What the clock actually read when this scene started, drift included.
    actualTime: parseClock(cur.time) != null ? formatClock(parseClock(cur.time) + driftBefore) : cur.time,
  });
  s.current = null;

  // pick next scene key. Routers can read the ledger via ctx (2nd arg), built
  // from the state this pick just produced.
  if (isBranchingScript(s.script)) {
    s.sceneKey = resolveNextKey(cur, choice, s.flags, buildSceneCtx(cur, s));
  } else {
    s.sceneKey = s.sceneKey + 1;
  }
  s.loading = true;
  softRender();

  await new Promise((r) => setTimeout(r, 700));
  const next = getScene(s.script, s.sceneKey, s.seed, s);

  if (!next) {
    // no more scenes — finish
    s.loading = false;
    await finishSim();
    return;
  }

  // Crossing into a new day (or a scene with no clock at all) closes the books
  // on the drift you built up — you don't start Wednesday 40 minutes late.
  if (isNewDay(cur.time, next.time)) {
    // Lock in the FIRST clock-based day only. Some scripts run several epilogue
    // segments ("Day 4", "Week 3", "Month 2") and each is a boundary — without
    // this guard, an epilogue's drift would overwrite the shift the report is about.
    if (s.endOfDayDrift == null && parseClock(cur.time) != null) {
      s.endOfDayDrift = s.drift;
      s.endOfDayAt = formatClock(parseClock(cur.time) + s.drift);
    }
    s.drift = 0;
  }

  if (!next.choices || next.choices.length === 0) {
    // closing beat, log it and finish. Resolve the epilogue against the full
    // ledger — this is where the day's mistakes get named back to you.
    s.log.push({
      time: next.time, scene: resolveSceneText(next, s), choice: null, stat: resolveStat(next, s), key: s.sceneKey,
      actualTime: parseClock(next.time) != null ? formatClock(parseClock(next.time) + s.drift) : next.time,
    });
    s.loading = false;
    softRender();
    await new Promise((r) => setTimeout(r, 4500));
    await finishSim();
    return;
  }

  s.current = next;
  s.loading = false;
  softRender();
}

function simBack() {
  const s = state.sim;
  if (!s || s.loading || s.log.length === 0) return;
  const last = s.log.pop();
  if (last && last.choice != null) s.pickedTones.pop();
  // Rewind the clock to exactly where it stood before that pick.
  if (last && typeof last.driftBefore === "number") {
    s.drift = last.driftBefore;
    if (typeof last.mins === "number") s.spent = Math.max(0, s.spent - last.mins);
    s.peakDrift = s.log.reduce((mx, e) => Math.max(mx, e.driftAfter || 0), 0);
    // Stepping back may put us before a day boundary; the day-end snapshot gets
    // retaken when the player crosses it again.
    s.endOfDayDrift = null;
    s.endOfDayAt = null;
  }
  if (isBranchingScript(s.script)) {
    // restore flags snapshot from the entry we just popped
    if (last && last.flagsBefore) {
      // flagsBefore was snapshotted AFTER applying that turn's sets; the
      // pre-turn state is the previous entry's flagsBefore (or {}).
      const prev = s.log[s.log.length - 1];
      s.flags = prev && prev.flagsBefore ? { ...prev.flagsBefore } : {};
      // The consequence ledger rewinds the same way — marks left by the pick we
      // just undid must un-happen, or a callback would fire for a road not taken.
      s.marks = prev && prev.marksBefore ? prev.marksBefore.map(m => ({...m})) : [];
    }
    s.sceneKey = last ? last.key : s.script.start;
  } else {
    s.sceneKey = s.log.length;
  }
  s.current = getScene(s.script, s.sceneKey, s.seed, s);
  s.error = null;
  softRender();
}

async function finishSim() {
  const s = state.sim;
  // The drift that matters is the one you ended the working day on — if the
  // script rolled over into a second day, that reset banked the real number.
  const finalDrift = s.endOfDayDrift != null ? s.endOfDayDrift : (s.drift || 0);
  // The last scene the player actually made a decision in — not the epilogue,
  // which is often set the next morning or weeks later.
  const lastDecision = [...s.log].reverse().find(e => typeof e.driftAfter === "number");
  const fallbackAt = lastDecision && parseClock(lastDecision.time) != null
    ? formatClock(parseClock(lastDecision.time) + lastDecision.driftAfter)
    : null;
  const timing = {
    drift: finalDrift,
    peakDrift: s.peakDrift || 0,
    spent: s.spent || 0,
    finishedAt: s.endOfDayAt || fallbackAt,
    scored: s.log.some(e => typeof e.mins === "number"),
  };
  const v = buildLocalVerdict(state.currentCareer, state.sim.pickedTones, state.sim.log, timing);
  state.completedSims = [
    ...state.completedSims.filter((x) => x.career !== state.currentCareer.label),
    { career: state.currentCareer.label, verdict: v, date: new Date().toISOString() },
  ];
  state.lastVerdict = { career: state.currentCareer.label, verdict: v };
  // Report references simInsights and Compare references all sims — new sim = stale
  state.report = null;
  state.compareResult = null;
  state.screen = "verdict";
  render();
}

async function generateReport() {
  const quizzesDone = QUIZZES.filter(q => Object.keys(state.quizAnswers[q.key] || {}).length === q.items.length).length;
  if (quizzesDone < 5) {
    state.reportError = `You need to finish all 5 quizzes first. ${5 - quizzesDone} still to go.`;
    render();
    return;
  }
  state.reportLoading = true;
  state.reportError = null;
  render();
  await new Promise((r) => setTimeout(r, 900));
  try {
    state.report = buildLocalReport();
  } catch (e) {
    console.error(e);
    state.reportError = "Report generation failed. Please refresh and try again.";
  }
  state.reportLoading = false;
  render();
}

async function runCompare() {
  await new Promise((r) => setTimeout(r, 800));
  const sims = state.completedSims.slice().sort((a, b) => b.verdict.score - a.verdict.score);
  if (sims.length === 0) { state.compareResult = null; render(); return; }
  const winner = sims[0];
  const runnerUp = sims[1];
  const ranking = sims.map((s) => ({
    career: s.career,
    score: s.verdict.score,
    oneLiner: s.verdict.headline,
  }));
  const gap = runnerUp ? winner.verdict.score - runnerUp.verdict.score : 20;
  let reasoning;
  if (gap >= 15) {
    reasoning = `${winner.career} was a clear standout — you scored ${winner.verdict.score}, well ahead of the pack. What worked: ${winner.verdict.energized.join(" and ")}. What didn't drag you down: you handled the pressure better than in the other sims.`;
  } else if (gap >= 5) {
    reasoning = `${winner.career} came out on top with a score of ${winner.verdict.score}, but it's close. You showed up strongly for ${winner.verdict.energized[0]}, and your choices matched what this career actually rewards. ${runnerUp ? runnerUp.career : ""} was a real contender.`;
  } else {
    reasoning = `${winner.career} technically edged out the others, but the gap is thin. You did well across careers — meaning your fit is broad, not narrow. Trust the qualitative signal: which day did you actually enjoy?`;
  }
  const dims = scoreDimensions();
  const topValue = topKeys(dims.values, 1)[0] || "growth";
  const nextStepMap = {
    money: `Track how much people in ${winner.career} actually earn — 5 years in, 10 years in. Not the top 1%. The median.`,
    impact: `Volunteer or shadow someone in ${winner.career} for a week. See if the daily impact matches what you're imagining.`,
    freedom: `Try one month of self-directed work adjacent to ${winner.career}. No external deadlines. See if you rise to it.`,
    prestige: `Interview two people in ${winner.career}. Ask what the prestigious version of the job actually looks like day-to-day.`,
    stability: `Look up the typical career ladder in ${winner.career} — years to reach each level, exit paths. Make sure the middle looks livable.`,
    growth: `Pick one skill core to ${winner.career} and commit to 90 days of it. See if you stay curious past the honeymoon.`,
    balance: `Shadow someone senior in ${winner.career}. Watch what time they actually leave. Notice their weekends.`,
    creativity_val: `Make a portfolio piece in the style of ${winner.career} in the next 3 months. Share it. Track real feedback.`,
  };
  const nextStep = nextStepMap[topValue] || `Talk to 3 people working in ${winner.career} today. Ask them what they wish they'd known at 15.`;
  state.compareResult = { winner: winner.career, ranking, reasoning, nextStep };
  render();
}

// ============================================================
// EVENT DELEGATION
// ============================================================
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;

  if (action === "open-palette") { state.palette = true; render(true); return; }
  if (action === "close-palette") {
    // Backdrop carries the action; clicks inside the panel bubble up, so only a
    // hit on the backdrop itself should dismiss.
    if (e.target === btn) closePalette();
    return;
  }
  // Selecting a palette command closes the palette, then runs the action below.
  if (btn.dataset.fromPalette) state.palette = false;

  if (action === "home") { go(state.user ? "dashboard" : "landing"); }
  else if (action === "go") { go(btn.dataset.screen); }
  else if (action === "logout") {
    // Save this user's data under their namespace before clearing state
    persist();
    state.user = null;
    // Reset in-memory state to what the guest would see
    state.quizAnswers = store.get(dataKey("quizAnswers", null), {});
    state.completedSims = store.get(dataKey("sims", null), []);
    state.report = store.get(dataKey("report", null), null);
    go("landing");
  }
  else if (action === "toggle-theme") { state.dark = !state.dark; render(true); }
  else if (action === "scroll") { document.getElementById(btn.dataset.target)?.scrollIntoView({ behavior: "smooth" }); }
  else if (action === "landing-scroll") {
    const target = btn.dataset.target;
    if (state.screen === "landing") {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      go("landing").then(() => {
        setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }), 0);
      });
    }
  }
  else if (action === "faq-toggle") { btn.closest(".faq-item")?.classList.toggle("open"); }
  else if (action === "mailto-team") { showNote("For support, email theearlybuilder@gmail.com"); }
  else if (action === "mailto-suggest") { window.location.href = "mailto:theearlybuilder@gmail.com?subject=" + encodeURIComponent("Career suggestion for The Early Builder") + "&body=" + encodeURIComponent("I'd love to see a simulation for: \n\nWhy it interests me: "); }
  else if (action === "suggest-career") {
    // Route to the in-app suggestion block on the Careers screen instead of
    // launching a generic mailto (which felt like it "opened something else").
    const flash = () => setTimeout(() => {
      const el = document.getElementById("suggest-career");
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("suggest-flash");
      setTimeout(() => el.classList.remove("suggest-flash"), 1800);
    }, 0);
    if (state.screen === "careers") flash();
    else go("careers").then(flash);
  }
  else if (action === "auth-mode") { state.authMode = btn.dataset.mode; render(); }
  else if (action === "auth-submit") {
    const errEl = document.getElementById("auth-error");
    const showErr = (msg) => { errEl.textContent = msg; errEl.style.display = "block"; };
    errEl.style.display = "none";

    const email = document.getElementById("auth-email")?.value?.trim();
    const password = document.getElementById("auth-password")?.value;

    if (!email || !password) { showErr("Please fill in all fields."); return; }

    const accounts = store.get("cc_accounts", {});

    if (state.authMode === "signup") {
      const name = document.getElementById("auth-name")?.value?.trim() || email.split("@")[0];
      const grade = document.getElementById("auth-grade")?.value || "10";
      const confirm = document.getElementById("auth-confirm")?.value;
      if (!name) { showErr("Please enter your name."); return; }
      if (password.length < 6) { showErr("Password must be at least 6 characters."); return; }
      if (password !== confirm) { showErr("Passwords don't match."); return; }
      if (accounts[email]) { showErr("An account with that email already exists. Sign in instead."); return; }
      accounts[email] = { name, grade, password, joined: new Date().toISOString() };
      store.set("cc_accounts", accounts);
      state.user = { name, email, grade, joined: accounts[email].joined };
      // Fresh account = fresh state
      state.quizAnswers = {};
      state.completedSims = [];
      state.report = null;
    } else {
      const acct = accounts[email];
      if (!acct) { showErr("No account found with that email. Sign up first."); return; }
      if (acct.password !== password) { showErr("Incorrect password."); return; }
      state.user = { name: acct.name, email, grade: acct.grade, joined: acct.joined };
      // Load THIS user's saved data from their namespace
      loadAccountData(email);
    }
    go("dashboard");
  }
  else if (action === "toggle-pw") {
    const wrap = btn.closest(".input-pw-wrap");
    const input = wrap?.querySelector("input");
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    btn.classList.toggle("pw-toggle-active", input.type === "text");
  }
  else if (action === "quiz-answer") { quizAnswer(btn.dataset.value); }
  else if (action === "retake-quiz") {
    const key = btn.dataset.key;
    state.quizAnswers = { ...state.quizAnswers, [key]: {} };
    // Retaking a quiz means the report is stale
    state.report = null;
    go(`quiz:${key}`);
  }
  else if (action === "quiz-nav") {
    const dir = btn.dataset.dir;
    const quiz = QUIZZES.find(q => q.key === state.currentQuiz);
    if (dir === "prev" && state.currentQuizIdx > 0) state.currentQuizIdx--;
    if (dir === "next" && state.currentQuizIdx < quiz.items.length - 1) state.currentQuizIdx++;
    render();
  }
  else if (action === "filter-career") { state.careerFilter = btn.dataset.group; render(); }
  else if (action === "start-sim") {
    const career = CAREERS.find(c => c.id === btn.dataset.careerId);
    if (career) startSim(career);
  }
  else if (action === "sim-choose") {
    const idx = Number(btn.dataset.idx);
    simChoose(state.sim.current.choices[idx]);
  }
  else if (action === "close-time-note") {
    // The backdrop carries the same action so clicking outside dismisses — but
    // clicks *inside* the dialog bubble up to it, so only treat a hit on the
    // backdrop itself as an outside click.
    if (btn.classList.contains("modal-backdrop") && e.target !== btn) return;
    if (document.getElementById("time-note-hide")?.checked) store.set("cc_simTimeNoteHidden", true);
    state.simNote = false;
    softRender();
  }
  else if (action === "sim-back") { simBack(); }
  else if (action === "sim-retry") { startSim(state.currentCareer); }
  else if (action === "generate-report") { generateReport(); }
  else if (action === "regenerate-report") { state.report = null; generateReport(); }
  else if (action === "print") { window.print(); }
});

document.addEventListener("keydown", (e) => {
  // ⌘K / Ctrl-K toggles the command palette (signed-in only).
  if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
    if (state.user) { e.preventDefault(); state.palette = !state.palette; render(true); }
    return;
  }
  if (state.palette) {
    if (e.key === "Escape") { e.preventDefault(); closePalette(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); paletteMove(1); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); paletteMove(-1); return; }
    if (e.key === "Enter") { e.preventDefault(); paletteEnter(); return; }
    return;
  }

  if (e.key === "Escape" && state.simNote) {
    if (document.getElementById("time-note-hide")?.checked) store.set("cc_simTimeNoteHidden", true);
    state.simNote = false;
    softRender();
    return;
  }

  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
  // Keyboard-first option selection on quiz + sim screens.
  if (!typing && state.screen === "quiz") {
    const opts = [...document.querySelectorAll(".quiz-option")];
    let i = -1;
    if (/^[1-9]$/.test(e.key)) i = Number(e.key) - 1;
    else if (/^[a-eA-E]$/.test(e.key)) i = e.key.toLowerCase().charCodeAt(0) - 97;
    if (i >= 0 && opts[i]) { e.preventDefault(); opts[i].click(); return; }
  }
  if (!typing && state.screen === "sim") {
    const choices = [...document.querySelectorAll(".sim-choice")];
    if (/^[a-eA-E]$/.test(e.key)) {
      const i = e.key.toLowerCase().charCodeAt(0) - 97;
      if (choices[i]) { e.preventDefault(); choices[i].click(); return; }
    }
  }

  if (e.key === "Enter") {
    if (document.activeElement?.tagName === "INPUT" && document.getElementById("auth-form")?.contains(document.activeElement)) {
      const btn = document.querySelector('[data-action="auth-submit"]');
      btn?.click();
    }
  }
});

// ============================================================
// BOOT
// ============================================================
render();
