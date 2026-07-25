import React, { useMemo } from "react";
import { journeyScenes, phases } from "../../data/journeys.ts";

const BIBLE_READER_URL = "https://bible.guidedstepswellness.com";

const formatDistance = (miles: number | null, km: number | null) => {
  if (miles) return `${miles} miles`;
  if (km) return `${km} km`;
  return "Not recorded";
};

const Fact: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-inner shadow-black/20">
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200/70">
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
    </div>
    <p className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl">{value}</p>
  </div>
);

const DiscoverSceneCard: React.FC<{ scene: (typeof journeyScenes)[number] }> = ({ scene }) => {
  const scriptureRefs =
    scene.scriptureRefs.map((ref) => `${ref.book} ${ref.ref}`).join(" · ") || "Multiple passages";

  return (
    <article className="flex flex-col rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#102b4c] to-[#0b1a2f] p-5 text-white shadow-xl shadow-black/20 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-inner shadow-black/30">
          <span aria-hidden>{scene.icon}</span>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200/70">{scene.phaseTitle}</p>
          <h3 className="mt-1 text-2xl font-bold leading-tight text-white sm:text-3xl">{scene.title}</h3>
        </div>
      </div>

      <p className="mt-5 text-base leading-relaxed text-blue-100/75">{scene.cardBlurb}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Fact label="Where" value={`${scene.from} → ${scene.to}`} icon="⌖" />
        <Fact label="When" value={scene.approxDate || "Date unknown"} icon="◷" />
        <Fact label="How far" value={formatDistance(scene.distanceMi, scene.distanceKm)} icon="↗" />
        <Fact label="Scripture" value={scriptureRefs} icon="✦" />
      </div>

      <a
        href={BIBLE_READER_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-300/60 bg-emerald-400/90 px-6 py-4 text-base font-extrabold tracking-wide text-emerald-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        aria-label={`Read ${scriptureRefs} in the Bible reader`}
      >
        Read in the Bible
        <span aria-hidden>↗</span>
      </a>
    </article>
  );
};

const DiscoverPage: React.FC = () => {
  const scenesByPhase = useMemo(
    () =>
      [...phases]
        .sort((a, b) => a.order - b.order)
        .map((phase) => ({
          phase,
          scenes: journeyScenes
            .filter((scene) => scene.phaseId === phase.id)
            .sort((a, b) => a.order - b.order),
        })),
    []
  );

  return (
    <div className="-mx-3 -my-3 min-h-screen space-y-10 bg-gradient-to-b from-[#0b1a2f] via-[#0f243f] to-[#0b1a2f] px-4 py-8 sm:-mx-6 sm:-my-8 sm:px-6 sm:py-10">
      <section className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200/70">Discover His journey</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">Where did Jesus walk?</h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-blue-100/70">
          See the place, time, distance, and Scripture for every journey.
        </p>
      </section>

      {scenesByPhase.map(({ phase, scenes }) => (
        <section key={phase.id} className="mx-auto max-w-5xl space-y-4">
          <h2 className="border-l-4 border-emerald-400 pl-4 text-xl font-bold text-white sm:text-2xl">
            {phase.title}
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            {scenes.map((scene) => (
              <DiscoverSceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DiscoverPage;
