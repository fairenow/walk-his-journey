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
