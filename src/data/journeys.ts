export type ScriptureRef = {
  book: string;
  ref: string; // "2:1–20" etc.
};

export type JourneyScene = {
  id: string;
  phaseId: string;
  order: number;

  // High-level identity
  title: string;
  tagLine: string; // short epic-hook line
  phaseTitle: string;

  // Time & place
  approxDate: string; // "c. 6–4 BC", "c. AD 27–29"
  from: string;
  to: string;
  distanceMi: number | null;
  distanceKm: number | null;

  // Story elements
  travelParty: string[];
  peopleMet: string[];
  miracles: string[];
  keyMoments: string[]; // bullet moments in story
  themes: string[]; // youth-friendly themes
  scriptureRefs: ScriptureRef[];

  // Youth-facing content
  summary: string; // 2–3 sentence “what happened”
  youthTakeaway: string; // 2–3 sentence life application
  cardBlurb: string; // 1–2 sentence teaser for cards

  // Storyboard / art hooks
  storyboardBeat: string; // visual scene direction (for designers)
  visualPrompt: string; // prompt-like text for illustrators / AI image tools

  // UI hints
  icon: string; // emoji or short tag
  colorHint: string; // Tailwind-ish string like "from-amber-300 to-rose-400"
};

export type JourneyPhase = {
  id: string;
  title: string;
  order: number;
  description: string;
};

export const phases: JourneyPhase[] = [
  {
    id: "phase0",
    title: "Before the Spotlight (Birth to Age 30)",
    order: 0,
    description:
      "From manger to quiet carpenter, Jesus’ life begins far from the spotlight but close to the heart of God."
  },
  {
    id: "phase1",
    title: "Launch of the Mission (Baptism to First Signs)",
    order: 1,
    description:
      "Jesus steps onto the public stage—baptized, tested, and ready to flip the world’s idea of power upside down."
  },
  {
    id: "phase2",
    title: "Galilee on Fire (Early Ministry Explodes)",
    order: 2,
    description:
      "In small towns and by a simple lake, crowds grow, miracles multiply, and the kingdom of God becomes impossible to ignore."
  },
  // You’ll add phase3–5 later in the same pattern.
];

export const journeyScenes: JourneyScene[] = [
  // =========================
  // PHASE 0 – BEFORE PUBLIC MINISTRY
  // =========================

  {
    id: "0.1-nazareth-bethlehem",
    phaseId: "phase0",
    phaseTitle: "Before the Spotlight (Birth to Age 30)",
    order: 1,
    title: "Nazareth → Bethlehem: The King in a Stable",
    tagLine: "The Savior of the world shows up in the last place anyone expects.",
    approxDate: "c. 6–4 BC",
    from: "Nazareth",
    to: "Bethlehem",
    distanceMi: 75,
    distanceKm: 120,
    travelParty: ["Mary", "Joseph"],
    peopleMet: ["Innkeepers", "Shepherds", "Angels", "Later: Magi"],
    miracles: [
      "Virgin birth",
      "Angelic announcement to shepherds"
    ],
    keyMoments: [
      "A poor, engaged couple travels for a government census.",
      "No guest room is available; Jesus is born and placed in a manger.",
      "Angels announce the good news to terrified shepherds in the fields.",
      "Shepherds become the first messengers of the Messiah’s arrival."
    ],
    themes: [
      "God shows up in humble places, not just big stages.",
      "Heaven notices people the world ignores (like shepherds).",
      "Real greatness doesn’t always look impressive on the outside."
    ],
    scriptureRefs: [
      { book: "Luke", ref: "2:1–20" },
      { book: "Matthew", ref: "1:18–25" }
    ],
    summary:
      "Jesus is born in Bethlehem, not in a palace but in a place where animals eat. Shepherds, not celebrities, get the first invite to see Him. Heaven announces that hope has stepped into human history.",
    youthTakeaway:
      "You don’t have to be rich, popular, or perfect for God to show up in your life. If Jesus chose a manger and shepherds, He can absolutely choose you too.",
    cardBlurb:
      "A long, dusty road leads to a crowded town—and the King of Kings arrives in a feeding trough.",
    storyboardBeat:
      "Camera follows Mary and Joseph’s tired footsteps into Bethlehem at sunset. Hard cut to a quiet stable: straw, animal sounds, then soft light as Jesus is born. Angels explode across the night sky over shepherds, then we zoom back to the tiny baby wrapped in cloths.",
    visualPrompt:
      "Animated movie style, warm golden light in a rustic stable, young Middle Eastern couple with a newborn baby in a manger, curious shepherds entering, soft animals in the background, starry night with a bright star overhead.",
    icon: "⭐️",
    colorHint: "from-amber-300 to-rose-400"
  },

  {
    id: "0.2-bethlehem-egypt",
    phaseId: "phase0",
    phaseTitle: "Before the Spotlight (Birth to Age 30)",
    order: 2,
    title: "Bethlehem → Egypt: Escape in the Night",
    tagLine: "The baby King becomes a refugee before He can even walk.",
    approxDate: "c. 4–3 BC",
    from: "Bethlehem",
    to: "Egypt (region)",
    distanceMi: 90,
    distanceKm: 145,
    travelParty: ["Mary", "Joseph", "Infant Jesus"],
    peopleMet: ["Egyptian locals (unnamed)"],
    miracles: [
      "Angelic warning in a dream",
      "God’s protection over the holy family"
    ],
    keyMoments: [
      "Magi leave; Herod plots to kill the child.",
      "Joseph wakes from a dream and immediately packs to flee at night.",
      "The family crosses into a foreign land as strangers.",
      "Herod’s violent order hits Bethlehem, but God’s plan stands."
    ],
    themes: [
      "God protects His promises even when the world feels dangerous.",
      "Jesus knows what it’s like to be an outsider and refugee.",
      "Obedience sometimes means moving fast when God speaks."
    ],
    scriptureRefs: [
      { book: "Matthew", ref: "2:13–18" }
    ],
    summary:
      "Right after the joy of Jesus’ birth, danger erupts. Herod tries to kill Him, so His family escapes to Egypt in the night. Jesus spends part of His childhood in a land that isn’t home.",
    youthTakeaway:
      "God’s plan for your life is bigger than the threats against it. Jesus understands fear, uncertainty, and starting over in a new place. You’re never alone when life suddenly changes.",
    cardBlurb:
      "From lullaby to emergency escape: the family runs under starlight toward safety.",
    storyboardBeat:
      "Nighttime in Bethlehem, Joseph jolts awake, eyes wide from a dream. Quick-cut montage: rushed packing, Mary clutching baby Jesus, donkey footsteps in the dark, distant palace torches, then a wide shot of them crossing into Egypt at dawn.",
    visualPrompt:
      "Animated cinematic frame, tense nighttime escape from a small ancient town, Middle Eastern family leading a donkey with a baby, glowing star fading behind them, warm sunrise on the horizon of Egypt.",
    icon: "🏃‍♂️",
    colorHint: "from-slate-700 to-amber-400"
  },

  {
    id: "0.3-egypt-nazareth",
    phaseId: "phase0",
    phaseTitle: "Before the Spotlight (Birth to Age 30)",
    order: 3,
    title: "Egypt → Nazareth: Growing Up Off the Grid",
    tagLine: "The future world-changer spends decades in a small-town workshop.",
    approxDate: "c. 1 BC – AD 1+",
    from: "Egypt (region)",
    to: "Nazareth",
    distanceMi: 140,
    distanceKm: 225,
    travelParty: ["Mary", "Joseph", "Young Jesus"],
    peopleMet: ["Locals in Nazareth"],
    miracles: [],
    keyMoments: [
      "Another dream tells Joseph it’s safe to return.",
      "The family settles in Nazareth, far from the big city spotlight.",
      "Jesus grows up learning, working, and obeying His parents.",
      "Prophecies about the Messiah being a Nazarene quietly come true."
    ],
    themes: [
      "Most of Jesus’ life was ordinary before it was public.",
      "God does deep work in seasons no one is posting about.",
      "Where you start doesn’t limit what God can do through you."
    ],
    scriptureRefs: [
      { book: "Matthew", ref: "2:19–23" },
      { book: "Luke", ref: "2:39–40" }
    ],
    summary:
      "Jesus returns from Egypt and grows up in Nazareth, a small, unimpressive town. For years He lives a normal-looking life: learning, working with wood, and growing in wisdom and favor with God and people.",
    youthTakeaway:
      "Don’t underestimate your ‘Nazareth years.’ Quiet seasons, boring jobs, and normal days can be training ground for big calling later. God sees your growth even when nobody else is paying attention.",
    cardBlurb:
      "Before crowds and miracles, there were sawdust, chores, and a tiny town called Nazareth.",
    storyboardBeat:
      "Dissolve from the dusty road to a workshop in Nazareth. Young Jesus hands Joseph a tool. Quick cuts: Jesus learning, playing with neighborhood kids, watching travelers, then a slow zoom out showing Nazareth as a dot in a big world.",
    visualPrompt:
      "Animated slice-of-life in a small Middle Eastern village, young boy helping in a carpentry shop, warm afternoon light, simple homes, hills in the background.",
    icon: "🪵",
    colorHint: "from-emerald-200 to-amber-200"
  },

  {
    id: "0.4-nazareth-jerusalem-nazareth",
    phaseId: "phase0",
    phaseTitle: "Before the Spotlight (Birth to Age 30)",
    order: 4,
    title: "Nazareth → Jerusalem → Nazareth: The Boy in the Temple",
    tagLine: "A 12-year-old quietly shocks the religious experts.",
    approxDate: "c. AD 8–10",
    from: "Nazareth",
    to: "Jerusalem and back",
    distanceMi: 65,
    distanceKm: 105,
    travelParty: ["Jesus", "Mary", "Joseph", "Relatives", "Neighbors"],
    peopleMet: ["Temple teachers", "Pilgrims in Jerusalem"],
    miracles: [],
    keyMoments: [
      "Jesus travels with His family to Jerusalem for Passover.",
      "On the way home, His parents realize He’s missing.",
      "They find Him in the Temple, calmly discussing Scripture with experts.",
      "He tells them He must be about His Father’s business—but returns home obediently."
    ],
    themes: [
      "Spiritual hunger can show up early in life.",
      "Jesus balances divine calling with honoring His parents.",
      "Asking questions is a powerful part of faith."
    ],
    scriptureRefs: [
      { book: "Luke", ref: "2:41–52" }
    ],
    summary:
      "During a Passover trip, Jesus stays behind in the Temple, surprising religious teachers with His understanding. His parents find Him after three anxious days, and He explains that He was in His Father’s house.",
    youthTakeaway:
      "God can stir big questions and a real sense of purpose in you at a young age. It’s okay to be curious, to dig into Scripture, and to take God seriously even if others your age don’t.",
    cardBlurb:
      "Lost? Not really. Jesus is exactly where He’s meant to be—asking deep questions in His Father’s house.",
    storyboardBeat:
      "Crowded festival streets in Jerusalem, then a sudden realization: Mary and Joseph can’t find Jesus. Fast-paced search montage, then a quiet Temple room where Jesus sits calmly among older teachers, eyes bright, discussing Scripture.",
    visualPrompt:
      "Animated Temple interior, young Middle Eastern boy sitting among older rabbis, scrolls open, sunlight streaming in, parents entering with relief and confusion.",
    icon: "📜",
    colorHint: "from-sky-200 to-amber-300"
  },

  // =========================
  // PHASE 1 – LAUNCH OF PUBLIC MINISTRY
  // =========================

  {
    id: "1.1-nazareth-jordan",
    phaseId: "phase1",
    phaseTitle: "Launch of the Mission (Baptism to First Signs)",
    order: 1,
    title: "Nazareth → Jordan River: The Sky Opens",
    tagLine: "Jesus steps into the water and heaven steps into the moment.",
    approxDate: "c. AD 27–29",
    from: "Nazareth",
    to: "Jordan region near Jericho",
    distanceMi: 65,
    distanceKm: 105,
    travelParty: ["Jesus (solo, then crowds around John)"],
    peopleMet: ["John the Baptist", "Crowds", "Religious observers"],
    miracles: [
      "Heavens open",
      "Spirit descends like a dove",
      "Voice of the Father declares Jesus as Son"
    ],
    keyMoments: [
      "Jesus leaves His quiet life in Nazareth and heads toward John.",
      "He steps into the Jordan to be baptized like everyone else.",
      "As He comes up out of the water, the sky opens.",
      "The Spirit descends, and the Father’s voice announces Jesus publicly."
    ],
    themes: [
      "Jesus identifies with ordinary sinners even though He’s sinless.",
      "The Trinity shows up in one powerful scene: Father, Son, Spirit.",
      "Every calling has a moment where you step forward and say yes."
    ],
    scriptureRefs: [
      { book: "Matthew", ref: "3:13–17" },
      { book: "Mark", ref: "1:9–11" },
      { book: "Luke", ref: "3:21–22" }
    ],
    summary:
      "Jesus travels from Nazareth to the Jordan River and asks John to baptize Him. As He comes up out of the water, the Spirit descends like a dove and the Father declares, “This is my beloved Son.”",
    youthTakeaway:
      "When you publicly say yes to God, heaven is not silent. You may not hear a voice in the sky, but your obedience matters in ways you can’t see yet.",
    cardBlurb:
      "One quiet man steps into the water—and the universe pays attention.",
    storyboardBeat:
      "Wide shot of the Jordan River with crowds lining the banks. John is waist-deep, preaching. Jesus steps into the water. As He goes under and rises, we cut to the sky tearing open, a shimmering dove-shaped light descending, and the faint echo of a loving voice.",
    visualPrompt:
      "Animated riverside scene, Middle Eastern crowd in simple clothing, one man being baptized, light breaking through the clouds, a dove-shaped glow descending, water ripples reflecting the light.",
    icon: "🕊",
    colorHint: "from-sky-300 to-cyan-400"
  },

  {
    id: "1.2-jordan-wilderness",
    phaseId: "phase1",
    phaseTitle: "Launch of the Mission (Baptism to First Signs)",
    order: 2,
    title: "Jordan → Wilderness: Tested in the Silence",
    tagLine: "Before Jesus speaks to crowds, He fights battles no one sees.",
    approxDate: "Immediately after baptism",
    from: "Jordan River",
    to: "Judean wilderness",
    distanceMi: null,
    distanceKm: null,
    travelParty: ["Jesus alone"],
    peopleMet: ["Satan (tempter)", "Angels"],
    miracles: [
      "Sustained fasting for 40 days",
      "Victory over intense temptation without sin"
    ],
    keyMoments: [
      "The Spirit leads Jesus away from the crowds into isolation.",
      "After 40 days of fasting, temptation hits at full force.",
      "Satan attacks Jesus’ identity and mission with twisted offers.",
      "Jesus responds each time with Scripture, staying faithful."
    ],
    themes: [
      "Your private battles prepare you for your public calling.",
      "The enemy often attacks identity first: who you are and whose you are.",
      "God’s Word is not just a book; it’s a weapon in real struggles."
    ],
    scriptureRefs: [
      { book: "Matthew", ref: "4:1–11" },
      { book: "Luke", ref: "4:1–13" }
    ],
    summary:
      "Right after being publicly affirmed, Jesus is led into the wilderness for 40 days of fasting and temptation. Alone, hungry, and exhausted, He refuses every shortcut Satan offers.",
    youthTakeaway:
      "Just because you’re being tempted doesn’t mean you’re weak; it might mean you’re dangerous to the enemy. God can use quiet, lonely, or hard seasons to strengthen you for what’s next.",
    cardBlurb:
      "No crowds, no spotlight—just sand, silence, and a showdown in the desert.",
    storyboardBeat:
      "Fade from the bright river scene to a harsh, sun-baked wilderness. Long shadows, empty landscape. Jesus walks alone. Three confrontations: stones glinting like bread, a dizzying temple rooftop shot, a panoramic view of kingdoms. Each time, the Word cuts through the lies.",
    visualPrompt:
      "Animated desert wilderness, lone figure walking in heat shimmer, harsh rocky terrain, symbolic montage of temptations, strong but calm expression as he resists.",
    icon: "🏜",
    colorHint: "from-amber-200 to-stone-400"
  },

  {
    id: "1.3-wilderness-nazareth-capernaum",
    phaseId: "phase1",
    phaseTitle: "Launch of the Mission (Baptism to First Signs)",
    order: 3,
    title: "Wilderness → Nazareth → Capernaum: From Rejection to Home Base",
    tagLine: "Jesus is pushed out of His hometown and plants His mission by the lake.",
    approxDate: "Early ministry",
    from: "Judean wilderness",
    to: "Nazareth → Capernaum",
    distanceMi: 20,
    distanceKm: 32,
    travelParty: ["Jesus", "Later: Peter, Andrew, James, John, others"],
    peopleMet: [
      "Nazareth synagogue crowd",
      "Fishing families around Capernaum"
    ],
    miracles: [
      "Casting out a demon in the synagogue",
      "Healing Peter’s mother-in-law",
      "Many healings and deliverances at Capernaum"
    ],
    keyMoments: [
      "Jesus reads Isaiah in Nazareth and announces the prophecy is fulfilled.",
      "His hometown rejects Him, even trying to push Him off a cliff.",
      "He moves to Capernaum by the Sea of Galilee.",
      "He calls fishermen to follow Him and begins healing and delivering people."
    ],
    themes: [
      "Sometimes the people who knew your past struggle to see your calling.",
      "Rejection doesn’t cancel your mission; it can redirect it.",
      "Jesus starts building a team from ordinary workers, not religious elites."
    ],
    scriptureRefs: [
      { book: "Luke", ref: "4:16–31" },
      { book: "Matthew", ref: "4:13–22" },
      { book: "Mark", ref: "1:16–34" }
    ],
    summary:
      "Jesus returns to Nazareth, announces His mission, and is rejected by His own people. He then relocates to Capernaum, where He launches His ministry, calls disciples, and begins healing and freeing people.",
    youthTakeaway:
      "If some people in your circle don’t understand your growth or calling, you’re in good company. God can move you from rooms that reject you into spaces where your purpose comes alive.",
    cardBlurb:
      "He walks into His hometown with good news—and walks out with a near-death experience and a new home base by the lake.",
    storyboardBeat:
      "Nazareth synagogue interior: Jesus reading Isaiah, eyes locked with the crowd. Faces shift from curiosity to anger. Cliffside tension scene, then a mysterious break as He walks through the crowd unharmed. Cut to the bright, breezy Sea of Galilee shoreline where fishermen tug nets and Jesus calls them to follow.",
    visualPrompt:
      "Animated synagogue interior, tense crowd, cliff edge with dramatic lighting, then tranquil lakeside fishing village with blue water and simple wooden boats.",
    icon: "🌊",
    colorHint: "from-sky-300 to-emerald-300"
  },

  {
    id: "1.4-capernaum-cana",
    phaseId: "phase1",
    phaseTitle: "Launch of the Mission (Baptism to First Signs)",
    order: 4,
    title: "Capernaum → Cana: Water into Wedding Joy",
    tagLine: "The first miracle is not a lightning bolt—it’s a quiet rescue of a party.",
    approxDate: "Very early Galilean ministry",
    from: "Capernaum",
    to: "Cana",
    distanceMi: 18,
    distanceKm: 29,
    travelParty: ["Jesus", "Mary", "Disciples"],
    peopleMet: ["Wedding hosts", "Servants", "Master of the feast"],
    miracles: [
      "Water turned into high-quality wine"
    ],
    keyMoments: [
      "A village wedding runs out of wine—social disaster incoming.",
      "Mary brings the problem to Jesus and tells the servants to obey Him.",
      "Jesus has servants fill jars with water and take some to the master.",
      "The water has become wine; the party is saved, and only a few know why."
    ],
    themes: [
      "Jesus cares about regular, human moments like celebrations and friendships.",
      "Obedience behind the scenes can unlock miracles no one sees.",
      "God’s timing (‘My hour has not yet come’) matters—but so does His compassion."
    ],
    scriptureRefs: [
      { book: "John", ref: "2:1–12" }
    ],
    summary:
      "Jesus attends a wedding in Cana where the wine runs out. Behind the scenes, He turns water in large jars into excellent wine, rescuing the celebration and quietly revealing His glory to His disciples.",
    youthTakeaway:
      "God is not only present in your biggest crises; He’s also present at your hangouts, parties, and little moments. He can turn ordinary things into something surprisingly beautiful.",
    cardBlurb:
      "No spotlight, no stage—just a wedding, some empty jars, and a quiet miracle that flips the vibe from ‘embarrassing’ to ‘unforgettable.’",
    storyboardBeat:
      "Candlelit village wedding, dancing and laughter slowly fading as whispers spread: no more wine. Mary’s knowing glance to Jesus. Servants hauling heavy stone jars, confused. Close-up: clear water is poured, then the master’s shocked smile as he tastes rich wine.",
    visualPrompt:
      "Animated village wedding under string lights, joyful Middle Eastern crowd, clay jars being filled, transformation moment suggested with glow or sparkle in the water, warm, celebratory atmosphere.",
    icon: "🍷",
    colorHint: "from-rose-300 to-amber-300"
  },

  // =========================
  // PHASE 2 – EARLY GALILEAN MINISTRY
  // =========================

  {
    id: "2.1-galilee-circuit",
    phaseId: "phase2",
    phaseTitle: "Galilee on Fire (Early Ministry Explodes)",
    order: 1,
    title: "Galilee Circuit: Synagogues, Streets, and Shocked Crowds",
    tagLine: "News spreads like wildfire as villages watch sickness and shame lose their grip.",
    approxDate: "Early in public ministry",
    from: "Capernaum",
    to: "Towns throughout Galilee (loop)",
    distanceMi: null,
    distanceKm: null,
    travelParty: ["Jesus", "Core disciples (Peter, Andrew, James, John, others)"],
    peopleMet: ["Synagogue leaders", "Lepers", "Paralytics", "Tax collectors", "Crowds"],
    miracles: [
      "Healing a man with leprosy",
      "Healing a paralyzed man lowered through a roof",
      "Many exorcisms and healings"
    ],
    keyMoments: [
      "Jesus teaches in synagogues with unexpected authority.",
      "A leper kneels and asks to be made clean; Jesus touches him.",
      "Friends tear open a roof to lower their paralyzed friend to Jesus.",
      "Jesus forgives sins publicly, shaking religious categories.",
      "He calls a tax collector, Matthew/Levi, to follow Him."
    ],
    themes: [
      "Jesus runs toward people others avoid.",
      "Faith sometimes tears through ceilings to get to Jesus.",
      "Jesus doesn’t just heal bodies; He confronts shame and guilt.",
      "No one is too ‘cancelled’ for Jesus to invite into His team."
    ],
    scriptureRefs: [
      { book: "Matthew", ref: "4:23–25" },
      { book: "Matthew", ref: "8:1–4" },
      { book: "Matthew", ref: "9:1–13" },
      { book: "Mark", ref: "1:35–45" },
      { book: "Mark", ref: "2:1–17" },
      { book: "Luke", ref: "5:12–32" }
    ],
    summary:
      "Jesus circles through the towns of Galilee, teaching, healing, and casting out demons. Rooms overflow, roofs break open, and sinners and outcasts find themselves face-to-face with mercy.",
    youthTakeaway:
      "You are not too broken, messy, or ‘unclean’ for Jesus. He’s the one who is willing to get close when everyone else pulls back. And if you’re a friend, you can be the one who refuses to let obstacles stop you from bringing people to Him.",
    cardBlurb:
      "Packed houses, broken roofs, stunned leaders—Galilee has never seen days like these.",
    storyboardBeat:
      "Fast-cut montage: Jesus on village roads, in synagogues, touching a leper’s shoulder, friends sweating as they lower a stretcher through a ceiling, religious leaders gasping, forgiven faces turning from despair to joy.",
    visualPrompt:
      "Animated busy village streets and small synagogue interiors, crowds pressing in, dramatic rooftop scene with friends lowering a stretcher, expressive faces of hope and shock.",
    icon: "🔥",
    colorHint: "from-amber-300 to-red-400"
  },

  {
    id: "2.2-capernaum-hillside",
    phaseId: "phase2",
    phaseTitle: "Galilee on Fire (Early Ministry Explodes)",
    order: 2,
    title: "Capernaum → Hillside: The Upside-Down Kingdom",
    tagLine: "Jesus sits down on a hill and flips the world’s values upside down.",
    approxDate: "Early, as crowds grow",
    from: "Near Capernaum",
    to: "Hillside overlooking the Sea of Galilee",
    distanceMi: 2,
    distanceKm: 3,
    travelParty: ["Jesus", "Disciples", "Large crowd from many regions"],
    peopleMet: ["Disciples", "Crowds from Galilee, Judea, Decapolis"],
    miracles: [
      "Many healings as people come to be cured"
    ],
    keyMoments: [
      "Crowds gather on a hillside to hear Jesus teach.",
      "He opens His mouth with the Beatitudes: ‘Blessed are the poor in spirit…’",
      "He describes a kingdom where the meek, the merciful, and the persecuted are honored.",
      "He teaches on anger, lust, enemies, giving, prayer, and worry.",
      "He calls His listeners to build on rock, not sand."
    ],
    themes: [
      "Jesus blesses people the world overlooks.",
      "Following Him means heart change, not just behavior change.",
      "The way up in God’s kingdom often starts with kneeling down.",
      "Your foundation matters more than your appearance."
    ],
    scriptureRefs: [
      { book: "Matthew", ref: "5–7" },
      { book: "Luke", ref: "6:17–49" }
    ],
    summary:
      "On a hillside by the lake, Jesus delivers a long, powerful message about what life in His kingdom really looks like. He blesses the broken, confronts hypocrisy, and teaches people how to live with God at the center.",
    youthTakeaway:
      "You don’t have to chase the same ‘wins’ the world chases. Jesus invites you into a way of life that’s honest, deep, and different—and it starts with who you are inside, not just what you post.",
    cardBlurb:
      "A simple hillside becomes the stage for the greatest TED Talk that never got uploaded.",
    storyboardBeat:
      "Wide shot of a hillside with the Sea of Galilee glimmering below. People settle on the grass, kids fidget, disciples sit close. Jesus sits, begins to speak, and we see quick visual vignettes of His teachings—peacemakers, secret givers, houses on rock vs sand—coming to life around Him.",
    visualPrompt:
      "Animated hillside with a seated teacher figure, crowds listening on the grass, calm blue lake in the background, visual metaphors (house on rock, house on sand) ghosted in the sky.",
    icon: "⛰",
    colorHint: "from-emerald-200 to-sky-300"
  },

  {
    id: "2.3-capernaum-nain",
    phaseId: "phase2",
    phaseTitle: "Galilee on Fire (Early Ministry Explodes)",
    order: 3,
    title: "Capernaum → Nain: Tears Turned Back",
    tagLine: "A funeral procession meets a Savior who refuses to walk past pain.",
    approxDate: "Mid-Galilean ministry",
    from: "Capernaum area",
    to: "Nain",
    distanceMi: 22,
    distanceKm: 35,
    travelParty: ["Jesus", "Disciples", "Large crowd"],
    peopleMet: ["Widow of Nain", "Her dead son", "Townspeople"],
    miracles: [
      "Raising the widow’s only son from the dead"
    ],
    keyMoments: [
      "Jesus approaches the town gate just as a funeral procession exits.",
      "He sees a widow who has lost her only son—her future security gone.",
      "He is moved with compassion and tells her not to cry.",
      "He touches the bier, speaks to the dead young man, and raises him.",
      "Fear and praise erupt; news spreads everywhere."
    ],
    themes: [
      "Jesus sees your pain before you say a word.",
      "Compassion moves Him to action, not just sympathy.",
      "He has authority over death itself."
    ],
    scriptureRefs: [
      { book: "Luke", ref: "7:11–17" }
    ],
    summary:
      "On the road into Nain, Jesus collides with a funeral on the way out. Seeing a grieving widow who has lost everything, He stops the procession, speaks to her son, and brings him back to life.",
    youthTakeaway:
      "Jesus doesn’t just walk by your grief. When life feels like one long funeral march—loss, disappointment, heartbreak—He is the kind of Savior who steps toward you, not away from you.",
    cardBlurb:
      "Two crowds meet at the city gate: one following death, one following Life.",
    storyboardBeat:
      "Dusty road outside Nain, one crowd leaving with a funeral, another arriving with Jesus at the front. Slow-motion focus on the widow’s face, then Jesus’ compassionate eyes. He gently stops the procession, touches the bier, and the young man sits up to gasps and shouts.",
    visualPrompt:
      "Animated ancient village gate, funeral procession with mourners, coffin-like bier carried by men, teacher figure stopping the group, emotional mother, sudden joy as the young man sits up.",
    icon: "💔",
    colorHint: "from-slate-300 to-rose-300"
  }
];

