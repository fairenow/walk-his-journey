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
  moments: string[]; // playable feed moments, can mirror keyMoments
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

type JourneySceneInput = Omit<JourneyScene, "moments"> & { moments?: string[] };

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
  {
    id: "phase3",
    title: "The Wide World Awakens (Beyond Galilee)",
    order: 3,
    description:
      "Jesus pushes past hometown borders—storms calm, demons scream, and outsiders discover they’re not outside His love. Every step stretches the disciples’ faith."
  },
  {
    id: "phase4",
    title: "The Road to the Cross (Perea, Jericho, Jerusalem)",
    order: 4,
    description:
      "With the cross up ahead, Jesus walks with purpose and compassion—teaching, healing, confronting corruption, and welcoming the lost. This is His most focused march."
  },
  {
    id: "phase5",
    title: "Death Defeated (Resurrection & Beyond)",
    order: 5,
    description:
      "What looked like the end becomes the beginning. Jesus walks again—this time in glory—restoring hope, opening Scripture, and launching the movement that changes the world."
  }
];

const journeySceneInputs: JourneySceneInput[] = [
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
    moments: [
      "Jesus walks away from the quiet workshop in Nazareth toward the river.",
      "He joins the same baptism line as everyone else, no VIP treatment.",
      "John hesitates, but Jesus insists on stepping under the water.",
      "As He rises, the sky rips open and light floods the riverbank.",
      "A dove-like glow settles on Him—the Holy Spirit resting and empowering.",
      "The Father’s voice declares love over Him before any miracles are done.",
      "Crowds whisper, wondering who this humble man really is."
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
    moments: [
      "Fresh from baptism, the Spirit guides Jesus into the silent wild.",
      "Forty long days pass with no food, only prayer and grit.",
      "The enemy whispers shortcuts: bread from stones, fame without the cross.",
      "Jesus fires back with Scripture instead of arguments.",
      "He refuses to jump for applause or bow for power.",
      "Angels care for Him as He walks out stronger than He entered."
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
    moments: [
      "Back in His hometown synagogue, Jesus reads Isaiah and quietly claims it.",
      "Wonder shifts to rage; neighbors drag Him toward a cliff edge.",
      "He walks through the angry crowd untouched and keeps going.",
      "Jesus settles in Capernaum, swapping carpenter tools for a lakeside mission base.",
      "He looks ordinary fishermen in the eye and invites them to follow.",
      "At sundown, the town shows up with sickness and fear—and leaves healed and free.",
      "What Nazareth pushed away, Galilee embraces."
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
    moments: [
      "Jesus shows up to celebrate with friends and family in Cana.",
      "The music slows as whispers spread—there’s no wine left.",
      "Mary quietly points the crisis to Jesus and tells servants to trust Him.",
      "Stone jars splash full of water; no one knows what He’s planning.",
      "The master sips and blinks—it’s the best drink of the night.",
      "Joy roars back, and the disciples realize this gentle miracle is a sign."
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
    moments: [
      "Before sunrise, Jesus heads from village to village with His crew.",
      "He teaches in small synagogues and people hear authority they’ve never felt.",
      "A leper kneels in the street; Jesus touches the untouchable and skin clears.",
      "A packed house erupts as friends rip open a roof to lower their paralyzed buddy.",
      "Jesus forgives him first, then tells him to walk—and he does.",
      "At a tax booth, Jesus locks eyes with Matthew and offers a new life.",
      "Dinner fills with outsiders as religious leaders wonder how grace can sit at that table."
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
    moments: [
      "Crowds climb the hill carrying questions, sickness, and curiosity.",
      "Jesus sits and His disciples lean in close to catch every word.",
      "He blesses the poor in spirit, the meek, the merciful—the people usually overlooked.",
      "He calls His followers salt and light, made to change the flavor of the world.",
      "Hard topics surface: anger, lust, enemies, generosity, prayer, and worry.",
      "He teaches the Lord’s Prayer and invites them to trust the Father’s care.",
      "Jesus ends with a picture: build your life on rock by actually living what He says."
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
    moments: [
      "Two crowds collide at Nain’s gate—one mourning, one following Jesus.",
      "Jesus locks eyes with a widow whose only son lies still and silent.",
      "He tells her not to cry and places a hand on the bier, stopping the march.",
      "His voice cuts through grief: the young man sits up breathing again.",
      "Shock turns to celebration as the town realizes God has visited them."
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
  },

  // =========================
  // PHASE 3 – WIDER REACH: BEYOND GALILEE
  // =========================

  {
    id: "3.1-storm-gerasenes",
    phaseId: "phase3",
    phaseTitle: "The Wide World Awakens (Beyond Galilee)",
    order: 1,

    title: "Storm → Shore: Power No One Can Ignore",
    tagLine:
      "In one night, nature bows, demons flee, and a whole region is shaken awake.",

    approxDate: "Mid-ministry",
    from: "Capernaum (west shore)",
    to: "Gerasenes/Gadarenes (east shore)",
    distanceMi: 5,
    distanceKm: 8,

    travelParty: ["Jesus", "The Twelve"],
    peopleMet: [
      "Terrified disciples",
      "Demon-possessed man (‘Legion’)",
      "Pig herders",
      "Townspeople"
    ],

    miracles: [
      "Storm calmed instantly",
      "Thousands of demons cast out",
      "Man restored to his right mind"
    ],

    keyMoments: [
      "A violent storm hits—waves slamming the boat.",
      "Jesus sleeps through chaos until the disciples panic.",
      "He speaks one sentence—nature obeys.",
      "They step onto shore and meet a man possessed.",
      "Jesus drives out ‘Legion,’ sending the demons into pigs.",
      "The man becomes a missionary to his region."
    ],

    moments: [
      "The disciples push off at dusk while Jesus naps in the boat.",
      "Wind explodes into waves; panic rises until they shake Him awake.",
      "Jesus speaks to the storm like it’s a rowdy child—and the sea goes silent.",
      "On the far shore, a screaming, chained man rushes out but falls at Jesus’ feet.",
      "Demons beg to leave; He sends them into pigs that stampede into the water.",
      "The man sits clothed and calm, hearing his name instead of his torment.",
      "Jesus sends him home to tell his story so others can find freedom too."
    ],

    themes: [
      "Jesus has authority over things that terrify you.",
      "The enemy cannot chain what Jesus comes to free.",
      "Your testimony matters more than your history."
    ],

    scriptureRefs: [
      { book: "Mark", ref: "4:35–41" },
      { book: "Mark", ref: "5:1–20" },
      { book: "Matthew", ref: "8:23–34" },
      { book: "Luke", ref: "8:22–39" }
    ],

    summary:
      "A storm nearly sinks the disciples until Jesus silences wind and waves. On the other shore, a tormented man meets the One who can set him free. His transformation shakes the whole region.",

    youthTakeaway:
      "When chaos hits and your mind spirals, Jesus is not overwhelmed. He can bring peace to storms outside—and storms inside.",

    cardBlurb:
      "One night. One storm. One broken man. One unstoppable Savior.",

    storyboardBeat:
      "Thunder crashes, disciples scream, Jesus rises calmly. Cut to sudden calm. Smash-cut to the shoreline where a wild, chained man rushes out—only to freeze under Jesus’ gaze.",

    visualPrompt:
      "Animated stormy sea, small fishing boat in giant waves, bright flash of calm, eerie rocky shoreline with a distressed man approaching, dramatic lighting.",

    icon: "🌩",
    colorHint: "from-indigo-400 to-blue-300"
  },

  {
    id: "3.2-nazareth-rejection",
    phaseId: "phase3",
    phaseTitle: "The Wide World Awakens (Beyond Galilee)",
    order: 2,

    title: "Capernaum → Nazareth: Hometown Walls",
    tagLine: "Familiarity tries to cage destiny.",

    approxDate: "Mid-ministry",
    from: "Capernaum",
    to: "Nazareth",
    distanceMi: 20,
    distanceKm: 32,

    travelParty: ["Jesus", "Disciples"],
    peopleMet: ["Nazareth synagogue", "Old neighbors", "Local teachers"],

    miracles: ["Very few—because of unbelief"],

    keyMoments: [
      "Jesus returns home with His disciples.",
      "The synagogue crowd is amazed… then offended.",
      "They question His authority because they knew Him as a kid.",
      "Jesus remarks, ‘A prophet is without honor in his hometown.’"
    ],

    moments: [
      "Jesus walks familiar streets with a new team trailing behind.",
      "His teaching stuns neighbors until old memories cloud their view.",
      "‘Isn’t this the carpenter?’ echoes through the synagogue.",
      "Their unbelief shuts doors—only a few receive healing.",
      "Jesus leaves town, heart steady, taking His mission to those ready to listen."
    ],

    themes: [
      "People who know your past may resist your growth.",
      "Not everyone will celebrate what God is doing in you.",
      "Faith matters—it shapes what you experience."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "13:53–58" },
      { book: "Mark", ref: "6:1–6" }
    ],

    summary:
      "Jesus returns to Nazareth. At first, people listen—but soon old assumptions choke fresh revelation. Their unbelief blocks what Jesus desires to do.",

    youthTakeaway:
      "Don’t let the voices from your past decide your future. Jesus understands being underestimated by familiar faces.",

    cardBlurb:
      "The town that raised Him tries to box Him in again.",

    storyboardBeat:
      "Nazareth’s dusty streets. People whisper. In the synagogue, faces shift from curiosity to hostility as Jesus speaks. Camera zooms on His steady eyes.",

    visualPrompt:
      "Animated village synagogue, tense crowd, Jesus standing at a scroll, people crossing arms and shaking heads.",

    icon: "🏘",
    colorHint: "from-stone-300 to-rose-300"
  },

  {
    id: "3.3-bethsaida-5000",
    phaseId: "phase3",
    phaseTitle: "The Wide World Awakens (Beyond Galilee)",
    order: 3,

    title: "Galilee → Bethsaida: The Impossible Lunch",
    tagLine: "Thousands gather. Little food. One miracle that never gets old.",

    approxDate: "Later Galilean ministry",
    from: "Near Capernaum",
    to: "Remote hills near Bethsaida",
    distanceMi: 3,
    distanceKm: 5,

    travelParty: ["Jesus", "Disciples", "5,000+ crowd"],
    peopleMet: ["Hungry crowds", "Overwhelmed disciples"],

    miracles: [
      "Feeding 5,000",
      "Walking on water",
      "Calming wind again"
    ],

    keyMoments: [
      "Jesus withdraws but crowds chase Him.",
      "Disciples panic about feeding everyone.",
      "A boy offers his small lunch.",
      "Jesus multiplies it until everyone is full.",
      "That night, He walks on water to reach His disciples."
    ],

    moments: [
      "Jesus tries to rest, but thousands sprint along the shore to meet Him.",
      "He teaches and heals anyway, seeing them like sheep without a shepherd.",
      "As the sun drops, the disciples stress about feeding everyone.",
      "A boy hands over his small lunch; Jesus lifts it in thanks.",
      "Baskets keep filling until every stomach is full and leftovers spill over.",
      "That night the disciples face fierce wind—Jesus walks across the waves to them.",
      "Fear turns to worship as He climbs in and the storm quits."
    ],

    themes: [
      "Give Jesus what you have—even if it feels small.",
      "When God calls you to help people, He provides the strength.",
      "Faith grows in storms and scarcity."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "14:13–33" },
      { book: "Mark", ref: "6:30–52" },
      { book: "Luke", ref: "9:10–17" },
      { book: "John", ref: "6:1–21" }
    ],

    summary:
      "Crowds chase Jesus to a remote place. With a boy’s tiny lunch, He feeds everyone. Later, He walks across the waves to reach His disciples.",

    youthTakeaway:
      "Never underestimate what God can do with the small things you’re willing to share. Miracles often start with just one yes.",

    cardBlurb:
      "A hungry crowd. A tiny lunch. A miracle that people still talk about 2,000 years later.",

    storyboardBeat:
      "Wide shot of massive crowd on hillside, disciples stressed. Close-up on boy handing bread. Explosion of joyful faces as baskets overflow. Night boat scene—Jesus walking calmly on dark water.",

    visualPrompt:
      "Animated lakeside hillside full of people, sunset lighting, small bread and fish in hands, night scene with glowing figure walking on moonlit waves.",

    icon: "🍞",
    colorHint: "from-amber-200 to-blue-300"
  },

  {
    id: "3.4-tyre-sidon",
    phaseId: "phase3",
    phaseTitle: "The Wide World Awakens (Beyond Galilee)",
    order: 4,

    title: "Galilee → Tyre & Sidon: The Bold Outsider",
    tagLine: "A desperate mom refuses to take no for an answer.",

    approxDate: "Later Galilean ministry",
    from: "Galilee",
    to: "Tyre & Sidon region",
    distanceMi: 40,
    distanceKm: 64,

    travelParty: ["Jesus", "Disciples"],
    peopleMet: ["Syrophoenician woman", "Her demon-tormented daughter"],

    miracles: [
      "Demon cast out at a distance"
    ],

    keyMoments: [
      "Jesus enters Gentile territory.",
      "A desperate mom begs Jesus to help her daughter.",
      "Jesus tests her faith—she holds firm.",
      "He heals the girl instantly."
    ],

    moments: [
      "Jesus slips into Tyre and Sidon, hoping for quiet in a foreign region.",
      "Word spreads anyway; a desperate mom tracks Him down and drops to her knees.",
      "The disciples feel awkward and want to send her away.",
      "Jesus tests her with hard words, and she answers with humble, fierce faith.",
      "He smiles, honors her trust, and frees her daughter from miles away.",
      "She heads home to find peace where chaos ruled."
    ],

    themes: [
      "Persistent faith breaks through barriers.",
      "Jesus’ mercy crosses cultural lines.",
      "Desperation can be holy."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "15:21–28" },
      { book: "Mark", ref: "7:24–30" }
    ],

    summary:
      "In foreign territory, a bold mother begs Jesus for her daughter’s freedom. Her persistent faith wins the day, and Jesus heals the girl instantly.",

    youthTakeaway:
      "God honors real, persistent faith—even when you feel like an outsider or you don’t ‘fit.’ Jesus hears you.",

    cardBlurb:
      "She refuses to leave without a miracle—and she gets one.",

    storyboardBeat:
      "Coastal city streets, a desperate woman kneels before Jesus. Emotional close-up of her resolve. Jesus nods, and a rush of light signals distant healing.",

    visualPrompt:
      "Animated ancient coastal city, emotional woman kneeling before a compassionate teacher, warm Mediterranean colors.",

    icon: "🌊",
    colorHint: "from-cyan-200 to-purple-300"
  },

  {
    id: "3.5-decapolis-4000",
    phaseId: "phase3",
    phaseTitle: "The Wide World Awakens (Beyond Galilee)",
    order: 5,

    title: "Decapolis: Compassion for the Forgotten",
    tagLine: "A Gentile crowd gets a front-row seat to God’s love.",

    approxDate: "Later ministry",
    from: "Tyre/Sidon route",
    to: "Decapolis region",
    distanceMi: 60,
    distanceKm: 96,

    travelParty: ["Jesus", "Disciples", "Crowds"],
    peopleMet: ["Deaf man", "Gentile crowds"],

    miracles: [
      "Healing a deaf man",
      "Feeding the 4,000"
    ],

    keyMoments: [
      "Jesus heals a man who cannot hear or speak.",
      "Crowds gather—again with little food.",
      "Jesus multiplies bread and fish for 4,000+ people."
    ],

    moments: [
      "In the Gentile hills, crowds press in for a glimpse of hope.",
      "Friends bring a deaf man; Jesus pulls him aside and gently touches his ears and tongue.",
      "‘Be opened,’ He says—the man hears and speaks for the first time.",
      "People stay for days soaking up every word until food runs out.",
      "Moved with compassion, Jesus blesses a few loaves and fish.",
      "Everyone eats until full, with baskets of leftovers proving love is not scarce."
    ],

    themes: [
      "Jesus opens physical and spiritual ears.",
      "Compassion drives miracles.",
      "Outsiders aren’t outside God’s love."
    ],

    scriptureRefs: [
      { book: "Mark", ref: "7:31–37" },
      { book: "Mark", ref: "8:1–10" }
    ],

    summary:
      "In the Gentile-heavy region of Decapolis, Jesus heals a deaf man and feeds a massive crowd. Compassion flows where others overlook.",

    youthTakeaway:
      "Jesus isn’t just for church kids or ‘religious’ people. He cares deeply about those who feel far away.",

    cardBlurb:
      "Open ears. Loosened tongues. Baskets overflowing.",

    storyboardBeat:
      "Scene of a deaf man looking confused as Jesus gently touches his ears. Crowd amazes as he speaks. Huge crowd sits down as food multiplies across hillsides.",

    visualPrompt:
      "Animated mixed-ethnicity crowd in ancient hills, joyful reactions, man surprised at hearing for first time.",

    icon: "👂",
    colorHint: "from-blue-200 to-amber-300"
  },

  {
    id: "3.6-caesarea-philippi",
    phaseId: "phase3",
    phaseTitle: "The Wide World Awakens (Beyond Galilee)",
    order: 6,

    title: "Galilee → Caesarea Philippi: The Turning Point",
    tagLine: "One question decides everything.",

    approxDate: "Late ministry",
    from: "Galilee",
    to: "Caesarea Philippi",
    distanceMi: 30,
    distanceKm: 48,

    travelParty: ["Jesus", "The Twelve"],
    peopleMet: ["Disciples only"],

    miracles: [],

    keyMoments: [
      "Jesus leads His disciples far north, away from crowds.",
      "In the shadows of pagan temples, He asks, ‘Who do you say I am?’",
      "Peter confesses: ‘You are the Christ.’",
      "Jesus predicts His death for the first time."
    ],

    moments: [
      "Jesus takes the crew on a long walk north, far from familiar crowds.",
      "Surrounded by shrines to false gods, He asks what people say about Him.",
      "Then He makes it personal: ‘Who do you say I am?’",
      "Peter blurts out the truth—Jesus is the Messiah.",
      "Jesus affirms him and immediately talks about the cross and resurrection ahead.",
      "He invites them to follow by carrying their own cross-sized yes to God."
    ],

    themes: [
      "Every disciple must answer Jesus’ question personally.",
      "Revelation often comes in quiet, far-from-home places.",
      "The path to glory runs through sacrifice."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "16:13–28" },
      { book: "Mark", ref: "8:27–9:1" },
      { book: "Luke", ref: "9:18–27" }
    ],

    summary:
      "Far from Galilee’s crowds, Jesus asks His disciples who they believe He truly is. Peter answers boldly. Jesus begins revealing the road ahead: suffering, death, resurrection.",

    youthTakeaway:
      "Your relationship with Jesus can’t be based on someone else’s opinion. At some point, you have to answer the question: Who is He to you?",

    cardBlurb:
      "In a place full of fake gods, the real Messiah asks the real question.",

    storyboardBeat:
      "Quiet mountainside near pagan shrines. Jesus turns toward disciples. Peter steps forward, eyes burning, declaring the truth. Somber mood as Jesus predicts His suffering.",

    visualPrompt:
      "Animated rocky landscape with ancient shrines in background, small group discussion, dramatic lighting.",

    icon: "❓",
    colorHint: "from-purple-200 to-indigo-300"
  },

  // =========================
  // PHASE 4 – THE ROAD TO THE CROSS
  // =========================

  {
    id: "4.1-galilee-perea",
    phaseId: "phase4",
    phaseTitle: "The Road to the Cross (Perea, Jericho, Jerusalem)",
    order: 1,

    title: "Galilee → Perea: Countdown to the Cross",
    tagLine: "Crowds swell. Conversations sharpen. The mission accelerates.",

    approxDate: "Final ministry year",
    from: "Galilee",
    to: "Perea (beyond the Jordan)",
    distanceMi: 80,
    distanceKm: 130,

    travelParty: ["Jesus", "Disciples", "Large crowds"],
    peopleMet: ["Pharisees", "Children & their parents", "Rich young ruler"],

    miracles: [
      "Various healings not location-specific"
    ],

    keyMoments: [
      "Teaching on marriage, divorce, and commitment.",
      "Blessing children while disciples try to send them away.",
      "Rich young ruler walks away from Jesus sad.",
      "Jesus continues toward Jerusalem with determination."
    ],

    moments: [
      "Jesus leaves Galilee and crosses the Jordan with crowds trailing.",
      "He teaches hard truths about faithfulness and commitment.",
      "Disciples try to manage the moment, but Jesus pulls children close and blesses them.",
      "A wealthy seeker runs up with big questions and walks away unwilling to let go.",
      "Jesus reminds everyone that the last can be first in His kingdom.",
      "With the cross ahead, He keeps moving toward Jerusalem."
    ],

    themes: [
      "Jesus embraces children and the overlooked.",
      "Following Him means surrender—not just rule-keeping.",
      "Your heart posture matters more than your achievements."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "19:1–30" },
      { book: "Mark", ref: "10:1–31" },
      { book: "Luke", ref: "18:15–30" }
    ],

    summary:
      "On the way to Jerusalem, Jesus travels through Perea. He welcomes children, challenges a rich seeker, teaches tough truths, and keeps moving toward His destiny.",

    youthTakeaway:
      "Jesus is not just inviting you to believe something—He’s inviting you to follow Him with your whole life. What you cling to most tightly is often what He asks you to trust Him with.",

    cardBlurb:
      "Kids run up. A rich man walks away. Jesus keeps walking forward.",

    storyboardBeat:
      "Riverside scenes with parents pushing through the crowd, Jesus kneeling to bless children. Rich young ruler leaving with slumped shoulders. Jesus’ face set like flint toward Jerusalem.",

    visualPrompt:
      "Animated riverside region, children smiling, wealthy young man walking away sadly, Jesus teaching crowds by the water.",

    icon: "🚶‍♂️",
    colorHint: "from-yellow-200 to-orange-300"
  },

  {
    id: "4.2-perea-jericho",
    phaseId: "phase4",
    phaseTitle: "The Road to the Cross (Perea, Jericho, Jerusalem)",
    order: 2,

    title: "Perea → Jericho: Lost Causes Found",
    tagLine: "A blind man sees. A corrupt man changes. Grace overturns everything.",

    approxDate: "Last weeks before the cross",
    from: "Perea",
    to: "Jericho",
    distanceMi: 20,
    distanceKm: 32,

    travelParty: ["Jesus", "Disciples", "Crowds"],
    peopleMet: ["Bartimaeus and other blind beggars", "Zacchaeus the tax collector"],

    miracles: [
      "Blind men healed outside Jericho"
    ],

    keyMoments: [
      "Blind beggars cry out, ‘Son of David, have mercy!’",
      "Jesus restores their sight.",
      "Zacchaeus climbs a tree to see Jesus.",
      "Jesus invites Himself to Zacchaeus’ house.",
      "Zacchaeus repents with radical generosity."
    ],

    moments: [
      "On the road into Jericho, blind men shout for mercy while the crowd shushes them.",
      "Jesus stops in His tracks, listens, and opens their eyes to light and color.",
      "Inside the city, Zacchaeus is too short to see, so he scrambles up a sycamore tree.",
      "Jesus looks up, calls him by name, and invites Himself over for dinner.",
      "Around the table, greed melts; Zacchaeus promises generosity and payback.",
      "Jesus declares salvation has come to this house as He resumes the road to Jerusalem."
    ],

    themes: [
      "Jesus sees people society tries to silence.",
      "Salvation changes how you handle money and wrongs.",
      "No one is too far gone for grace."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "20:29–34" },
      { book: "Mark", ref: "10:46–52" },
      { book: "Luke", ref: "18:35–43" },
      { book: "Luke", ref: "19:1–10" }
    ],

    summary:
      "As Jesus approaches Jericho, He heals blind men who refuse to stay quiet. Inside the city, He calls Zacchaeus out of a sycamore tree and transforms his heart and priorities.",

    youthTakeaway:
      "Jesus doesn’t just heal what’s broken; He mends what’s corrupt. He can restore your vision—and your values.",

    cardBlurb:
      "Shouts from the roadside. A man in a tree. A Savior with time for both.",

    storyboardBeat:
      "Crowded Jericho road, blind beggar shouting while crowd tries to hush him. Sudden clarity as sight returns. Then high camera angle looking down from Zacchaeus’ tree as Jesus looks up and smiles.",

    visualPrompt:
      "Animated ancient city gates, blind man crying out, wealthy man perched in tree, joyful transformation scene.",

    icon: "🌳",
    colorHint: "from-amber-200 to-green-300"
  },

  {
    id: "4.3-jericho-jerusalem",
    phaseId: "phase4",
    phaseTitle: "The Road to the Cross (Perea, Jericho, Jerusalem)",
    order: 3,

    title: "Jericho → Jerusalem: The King on a Donkey",
    tagLine: "Palm branches wave. Prophecies unfold. The countdown accelerates.",

    approxDate: "Final week",
    from: "Jericho",
    to: "Jerusalem",
    distanceMi: 17,
    distanceKm: 27,

    travelParty: ["Jesus", "The Twelve", "Passover pilgrims"],
    peopleMet: ["Mary, Martha, Lazarus", "Crowds shouting ‘Hosanna!’"],

    miracles: [
      "Raising of Lazarus (prior days)",
      "Prophetic fulfillment of Zechariah 9:9"
    ],

    keyMoments: [
      "Steep climb from Jericho to Jerusalem.",
      "Jesus stays in Bethany with Mary, Martha, Lazarus.",
      "Crowds welcome Him with palm branches.",
      "Jesus enters Jerusalem riding a young donkey."
    ],

    moments: [
      "Jesus and the disciples push up the rugged road from Jericho toward Jerusalem.",
      "They rest with friends in Bethany, sharing meals with Mary, Martha, and Lazarus.",
      "Jesus sends for a young donkey and chooses a humble ride instead of a war horse.",
      "Crowds spread cloaks and palm branches, shouting ‘Hosanna!’ as He enters.",
      "The city buzzes—some celebrate, some question, all notice the peaceful King.",
      "Jesus looks over Jerusalem with tears, knowing the hard week ahead."
    ],

    themes: [
      "Jesus is a different kind of King—gentle, not ruthless.",
      "Crowds can celebrate you today and question you tomorrow.",
      "Prophecy meets reality in Jesus’ arrival."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "21:1–11" },
      { book: "Mark", ref: "11:1–10" },
      { book: "Luke", ref: "19:28–44" },
      { book: "John", ref: "12:1–19" }
    ],

    summary:
      "Jesus climbs steep roads to Jerusalem, stays with friends in Bethany, then enters the city on a donkey as crowds spread cloaks and palm branches, shouting ‘Hosanna!’",

    youthTakeaway:
      "Jesus doesn’t lead with force—He leads with humility. True strength doesn’t have to show off.",

    cardBlurb:
      "A humble King on a borrowed donkey. Cheers echo across Jerusalem.",

    storyboardBeat:
      "Jericho desert path winding upward. Jesus riding a donkey cresting the Mount of Olives. Clouds of dust, palm branches, excited faces, and a bittersweet look in Jesus’ eyes.",

    visualPrompt:
      "Animated ancient road into Jerusalem, palm branches waving, joyful crowds, gentle teacher figure on donkey.",

    icon: "🌿",
    colorHint: "from-green-200 to-gold-300"
  },

  {
    id: "4.4-bethany-jerusalem",
    phaseId: "phase4",
    phaseTitle: "The Road to the Cross (Perea, Jericho, Jerusalem)",
    order: 4,

    title: "Bethany ↔ Jerusalem: Confrontation & Compassion",
    tagLine: "Jesus cleanses the Temple, confronts corruption, and teaches with fire.",

    approxDate: "Sunday–Thursday of Passion Week",
    from: "Bethany",
    to: "Jerusalem (Temple)",
    distanceMi: 2,
    distanceKm: 3,

    travelParty: ["Jesus", "Disciples"],
    peopleMet: [
      "Money changers",
      "Chief priests",
      "Pharisees",
      "Crowds",
      "Widow giving two coins"
    ],

    miracles: [
      "Cursing of the fig tree",
      "Various healings in the Temple courts"
    ],

    keyMoments: [
      "Jesus curses a fruitless fig tree.",
      "He clears the Temple of corruption.",
      "He debates religious leaders all week.",
      "He teaches on end times, love, and judgment.",
      "A widow drops her two coins—Jesus praises her gift."
    ],

    moments: [
      "Each morning Jesus walks from Bethany toward the Temple courts.",
      "A leafy fig tree with no fruit becomes a living lesson about empty religion.",
      "Inside the Temple, He flips tables and blocks injustice from making money off worship.",
      "Leaders fire questions; Jesus answers with parables, wisdom, and courage.",
      "He teaches about loving God, loving neighbors, and the coming kingdom.",
      "Quietly, He points out a widow’s tiny offering as the biggest gift of the day.",
      "Nights end back in Bethany, resting with friends before returning to the fight."
    ],

    themes: [
      "God cares about fruitfulness, not just appearances.",
      "Jesus hates injustice and exploitation.",
      "Real devotion is about sacrifice, not show."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "21–25" },
      { book: "Mark", ref: "11–13" },
      { book: "Luke", ref: "19:45–21:38" }
    ],

    summary:
      "During Passion Week, Jesus commutes between Bethany and Jerusalem. He clears the Temple, confronts leaders, teaches boldly, and prepares His disciples for what’s ahead.",

    youthTakeaway:
      "Jesus is not passive about injustice—He confronts it. Your faith should change how you treat people, especially the vulnerable.",

    cardBlurb:
      "Tables fly. Leaders fume. Truth hits like lightning.",

    storyboardBeat:
      "Jesus flipping tables; coins scattering; religious leaders’ shocked faces. Fig tree withered by morning. Jesus teaching crowds on Temple steps with intensity.",

    visualPrompt:
      "Animated Temple courts, busy crowds, dramatic confrontation scene, Jesus teaching passionately.",

    icon: "⚖️",
    colorHint: "from-red-300 to-amber-300"
  },

  {
    id: "4.5-last-supper-gethsemane",
    phaseId: "phase4",
    phaseTitle: "The Road to the Cross (Perea, Jericho, Jerusalem)",
    order: 5,

    title: "Upper Room → Gethsemane: The Longest Night",
    tagLine: "A meal of love. A prayer of agony. A kiss of betrayal.",

    approxDate: "Thursday night",
    from: "Upper Room (Jerusalem)",
    to: "Gethsemane (Mount of Olives)",
    distanceMi: 1,
    distanceKm: 1.6,

    travelParty: ["Jesus", "The Eleven", "(Later) Judas and soldiers"],
    peopleMet: ["Disciples", "Judas", "Temple guards"],

    miracles: [
      "Institution of the Lord’s Supper",
      "Healing of servant’s ear"
    ],

    keyMoments: [
      "Jesus washes His disciples’ feet.",
      "He shares the Passover meal and explains the new covenant.",
      "He prays in agony while disciples fall asleep.",
      "Judas arrives with soldiers.",
      "Jesus is arrested after healing a wounded servant."
    ],

    moments: [
      "Disciples prepare an upstairs room as Jerusalem buzzes for Passover.",
      "Jesus kneels and washes dusty feet, redefining greatness.",
      "He breaks bread and lifts a cup, naming a new covenant of forgiveness.",
      "Whispers of betrayal swirl; Judas slips out into the night.",
      "In Gethsemane’s dark garden, Jesus wrestles and surrenders in prayer.",
      "Friends keep dozing while He sweats like blood for the world.",
      "Torches arrive; Jesus heals a cut ear and chooses arrest instead of escape."
    ],

    themes: [
      "Jesus serves even those who will betray Him.",
      "Real strength is surrender to God’s will.",
      "Love stays steady even when friends fail."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "26" },
      { book: "Mark", ref: "14" },
      { book: "Luke", ref: "22" },
      { book: "John", ref: "13–18" }
    ],

    summary:
      "Jesus shares His last meal with His disciples, washes their feet, and prays in Gethsemane. Judas arrives with soldiers, and Jesus is arrested after showing compassion even in the chaos.",

    youthTakeaway:
      "Jesus knows what it feels like to be betrayed, abandoned, and misunderstood. Yet He still chooses love. He understands your deepest emotional pain.",

    cardBlurb:
      "Bread broken. Tears falling. Torches approaching.",

    storyboardBeat:
      "Dimly lit upper room, intimate meal, Jesus kneeling to wash feet. Nighttime garden scene, Jesus sweating like blood, disciples asleep. Torches glow as soldiers approach.",

    visualPrompt:
      "Animated upper room with candlelight, foot-washing scene, dark olive grove with moonlit trees and approaching torches.",

    icon: "🍞",
    colorHint: "from-indigo-200 to-blue-300"
  },

  {
    id: "4.6-trial-cross-tomb",
    phaseId: "phase4",
    phaseTitle: "The Road to the Cross (Perea, Jericho, Jerusalem)",
    order: 6,

    title: "Jerusalem → Golgotha: Love on a Cross",
    tagLine: "Darkness falls. Curtains tear. The world changes forever.",

    approxDate: "Friday (Good Friday)",
    from: "Jerusalem",
    to: "Golgotha → nearby tomb",
    distanceMi: 1,
    distanceKm: 1.6,

    travelParty: ["Jesus", "Soldiers", "Women disciples", "John", "Crowds"],
    peopleMet: ["Pilate", "Herod", "Roman soldiers", "Two criminals", "Women at the cross"],

    miracles: [
      "Darkness at noon",
      "Temple curtain torn",
      "Signs at His death"
    ],

    keyMoments: [
      "Unjust trials before Jewish leaders, Herod, Pilate.",
      "Scourging and crown of thorns.",
      "Jesus carries His cross; Simon of Cyrene helps.",
      "He forgives His executioners.",
      "He promises paradise to a repentant criminal.",
      "He dies with a loud cry: ‘It is finished.’"
    ],

    moments: [
      "Through the night Jesus is dragged between religious leaders, Herod, and Pilate.",
      "Crowds choose Barabbas while soldiers mock Him with thorns and a purple cloak.",
      "Weak from beating, He stumbles under the cross until Simon is forced to help carry it.",
      "Nails slam into wood; Jesus prays forgiveness over the people hurting Him.",
      "A criminal beside Him reaches out and hears a promise of paradise that very day.",
      "Darkness covers noon; Jesus cries, ‘It is finished,’ and the Temple curtain tears.",
      "Joseph of Arimathea buries Him in a nearby tomb, stone sealed while friends watch."
    ],

    themes: [
      "This is what love looks like.",
      "Forgiveness is possible even in the deepest pain.",
      "Jesus takes our place and absorbs our sin."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "27" },
      { book: "Mark", ref: "15" },
      { book: "Luke", ref: "23" },
      { book: "John", ref: "18–19" }
    ],

    summary:
      "Jesus endures unjust trials, brutal suffering, and crucifixion. Darkness falls as He dies. His body is placed in a nearby tomb, watched by faithful women.",

    youthTakeaway:
      "You matter to Jesus so much that He took the weight of your sin, shame, fear, and mistakes onto Himself. You are not a mistake—your life was worth His sacrifice.",

    cardBlurb:
      "A cross on a hill. The world holding its breath.",

    storyboardBeat:
      "Slow-motion procession toward Golgotha. Cross raised against darkening sky. Curtain ripping inside Temple. Tearful women watching. Stone rolled across the tomb.",

    visualPrompt:
      "Animated crucifixion scene with respectful reverence: silhouetted cross against dark sky, grieving women, Temple curtain tearing symbolically.",

    icon: "✝️",
    colorHint: "from-red-500 to-purple-500"
  },

  // =========================
  // PHASE 5 – RESURRECTION & BEYOND
  // =========================

  {
    id: "5.1-resurrection-appearances",
    phaseId: "phase5",
    phaseTitle: "Death Defeated (Resurrection & Beyond)",
    order: 1,

    title: "Tomb → Jerusalem: The World Wakes Up",
    tagLine: "Stones don’t stand a chance against resurrection power.",

    approxDate: "Resurrection Sunday",
    from: "Garden tomb",
    to: "Jerusalem and surrounding areas",
    distanceMi: 1,
    distanceKm: 1.6,

    travelParty: ["Risen Jesus", "Mary Magdalene", "Women disciples", "The Eleven"],
    peopleMet: ["Mary Magdalene", "Other women", "Disciples"],

    miracles: [
      "Resurrection",
      "Appearance through locked doors"
    ],

    keyMoments: [
      "Mary finds the stone rolled away.",
      "Jesus appears to her and calls her by name.",
      "Jesus appears in locked room to frightened disciples.",
      "Thomas later sees and believes."
    ],

    moments: [
      "Before sunrise, women hurry to the tomb and freeze—the stone is already rolled back.",
      "Angels announce that Jesus is alive, not stolen.",
      "Mary lingers in tears until Jesus says her name and hope explodes.",
      "The women sprint to tell the disciples, hearts pounding.",
      "That night, doors locked tight, Jesus appears in the room with peace on His lips.",
      "He shows His scars and breathes courage into His friends.",
      "A week later Thomas touches the wounds himself and moves from doubt to worship."
    ],

    themes: [
      "Jesus knows your name and calls you personally.",
      "Doubt is not disqualified—bring it to Jesus.",
      "Death doesn’t get the final word."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "28:1–10" },
      { book: "Luke", ref: "24:1–49" },
      { book: "John", ref: "20:1–29" }
    ],

    summary:
      "Jesus rises from the dead and appears to His followers. Fear turns to joy, and doubt turns to faith as He reveals Himself alive again.",

    youthTakeaway:
      "Your story isn't over. If Jesus beat death, He can raise hope in your life too.",

    cardBlurb:
      "Tear-streaked eyes. An empty tomb. A name spoken that changes everything.",

    storyboardBeat:
      "Mary crying outside the open tomb, then Jesus appearing behind her. Locked room scene with disciples gasping as Jesus appears. Thomas touching Jesus’ wounds.",

    visualPrompt:
      "Animated empty tomb at sunrise, emotional reunion, peaceful resurrected figure in locked room.",

    icon: "🌅",
    colorHint: "from-amber-300 to-sky-300"
  },

  {
    id: "5.2-emmaus",
    phaseId: "phase5",
    phaseTitle: "Death Defeated (Resurrection & Beyond)",
    order: 2,

    title: "Jerusalem → Emmaus: Hearts on Fire",
    tagLine: "A mysterious Stranger turns heartbreak into burning hope.",

    approxDate: "Resurrection Sunday",
    from: "Jerusalem",
    to: "Emmaus",
    distanceMi: 7,
    distanceKm: 11,

    travelParty: ["Two disciples", "Jesus (unrecognized at first)"],
    peopleMet: ["Cleopas and another disciple"],

    miracles: [
      "Eyes opened to recognize Jesus"
    ],

    keyMoments: [
      "Two discouraged disciples walk home.",
      "Jesus joins them but they don’t realize it.",
      "He opens Scripture and explains everything.",
      "Their eyes open when He breaks bread.",
      "They sprint back to Jerusalem with joy."
    ],

    moments: [
      "Two disappointed disciples leave Jerusalem, replaying the weekend in their heads.",
      "A Stranger walks up, listens, and asks what’s weighing them down.",
      "He walks mile after mile opening the Scriptures and their hearts start to burn.",
      "At dinner He breaks bread; suddenly they recognize Jesus and He vanishes.",
      "Adrenaline replaces exhaustion—they run back to Jerusalem with the news."
    ],

    themes: [
      "Jesus walks with you even when you don’t feel Him.",
      "Scripture opens hearts to truth.",
      "Hope moves you—sometimes it runs miles."
    ],

    scriptureRefs: [
      { book: "Luke", ref: "24:13–35" }
    ],

    summary:
      "Two disciples walk away from Jerusalem discouraged. Jesus joins them, opens Scripture, and reveals Himself in the breaking of bread. Hope explodes—they run back to tell the others.",

    youthTakeaway:
      "Even when you don’t feel God, He is walking right beside you. Don’t quit—your Emmaus moment is coming.",

    cardBlurb:
      "A long walk, a deep conversation, and a dinner that reveals everything.",

    storyboardBeat:
      "Road with late-afternoon light, Jesus walking beside two sad disciples. Animated Scripture scenes illustrating His explanations. Dinner table moment where eyes widen.",

    visualPrompt:
      "Animated dusty road, sunset lighting, three walking figures, warm dinner scene.",

    icon: "🔥",
    colorHint: "from-orange-300 to-red-300"
  },

  {
    id: "5.3-galilee-commission-ascension",
    phaseId: "phase5",
    phaseTitle: "Death Defeated (Resurrection & Beyond)",
    order: 3,

    title: "Galilee → The World: The Mission Begins",
    tagLine: "A mountain meeting. A worldwide assignment. A promise that still stands.",

    approxDate: "40 days after resurrection",
    from: "Jerusalem",
    to: "Galilee → Jerusalem (Mount of Olives)",
    distanceMi: 70,
    distanceKm: 112,

    travelParty: ["Jesus", "The Eleven", "Possibly other disciples"],
    peopleMet: ["Disciples"],

    miracles: [
      "Ascension",
      "Final instructions empowered by the Spirit"
    ],

    keyMoments: [
      "Disciples meet Jesus on a mountain in Galilee.",
      "Jesus gives the Great Commission.",
      "Back near Jerusalem, Jesus blesses them.",
      "He ascends as they watch.",
      "Angels promise He will return."
    ],

    moments: [
      "On a Galilee mountain, the risen Jesus meets His friends—some worship, some still doubt.",
      "He hands them the mission: make disciples everywhere, baptize, teach, and go.",
      "Jesus promises His presence every step of the way.",
      "They return toward Jerusalem ready to wait for the Spirit.",
      "On the Mount of Olives, Jesus lifts His hands in blessing.",
      "He rises into the clouds as angels remind them the story isn’t over."
    ],

    themes: [
      "Every believer is sent.",
      "The gospel is for all nations.",
      "You are never alone—Jesus goes with you."
    ],

    scriptureRefs: [
      { book: "Matthew", ref: "28:16–20" },
      { book: "Acts", ref: "1:1–11" }
    ],

    summary:
      "Jesus gathers His followers, gives them the mission to make disciples of all nations, and ascends into heaven with the promise of His presence and return.",

    youthTakeaway:
      "If you follow Jesus, you have a purpose bigger than yourself. You’re part of a global story that’s still unfolding.",

    cardBlurb:
      "A mountain moment that sends a movement into motion.",

    storyboardBeat:
      "Galilee mountain sunrise, Jesus commissioning disciples. Cut to Mount of Olives with Jesus rising, disciples staring upward, angels appearing.",

    visualPrompt:
      "Animated mountaintop with golden sunrise, disciples gathered around radiant teacher, ascension scene with clouds of light.",

    icon: "🌍",
    colorHint: "from-blue-300 to-purple-400"
  }
];

export const journeyScenes: JourneyScene[] = journeySceneInputs.map((scene) => ({
  ...scene,
  moments: scene.moments ?? scene.keyMoments,
}));

