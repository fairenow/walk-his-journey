import React, { useMemo } from "react";
import { journeyScenes, phases } from "../../data/journeys.ts";
import { getBiblePassageUrl } from "../../utils/bible.js";

const formatDistance = (miles: number | null, km: number | null) => {
  if (miles) return `${miles} miles`;
  if (km) return `${km} km`;
  return "Not recorded";
};

const Fact: React.FC<{ label: string; value: string; className?: string }> = ({ label, value, className = "" }) => (
  <div className={`min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-inner shadow-black/20 ${className}`}>
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200/70">{label}</p>
    <p className="mt-2 break-words text-lg font-bold leading-snug text-white [overflow-wrap:anywhere] sm:text-xl">{value}</p>
  </div>
);

const DiscoverSceneCard: React.FC<{ scene: (typeof journeyScenes)[number] }> = ({ scene }) => {
  const scriptureRefs =
    scene.scriptureRefs.map((ref) => `${ref.book} ${ref.ref}`).join(" · ") || "Multiple passages";
  const primaryScripture = scene.scriptureRefs[0];
  const bibleUrl = primaryScripture
    ? getBiblePassageUrl(primaryScripture.book, primaryScripture.ref)
    : "https://bible.guidedstepswellness.com";

  return (
    <article className="flex flex-col rounded-[1.75rem] border border-white/10 bg-black/20 p-5 text-white shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
      <div className="min-w-0">
        <p className="break-words text-xs font-bold uppercase tracking-[0.16em] text-blue-200/70">{scene.phaseTitle}</p>
        <h3 className="mt-2 break-words font-serif text-2xl font-semibold leading-tight text-white [overflow-wrap:anywhere] sm:text-3xl">{scene.title}</h3>
      </div>

      <p className="mt-5 text-base leading-relaxed text-blue-100/75">{scene.cardBlurb}</p>

      <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
        <Fact className="sm:col-span-2" label="Where" value={`${scene.from} to ${scene.to}`} />
        <Fact label="When" value={scene.approxDate || "Date unknown"} />
        <Fact label="How far" value={formatDistance(scene.distanceMi, scene.distanceKm)} />
        <Fact className="sm:col-span-2" label="Scripture" value={scriptureRefs} />
      </div>

      <a
        href={bibleUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-300/60 bg-emerald-400/90 px-6 py-4 text-base font-extrabold tracking-wide text-emerald-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        aria-label={`Read ${primaryScripture ? `${primaryScripture.book} ${primaryScripture.ref}` : "this passage"} in the Bible reader`}
      >
        Read in the Bible
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
    <div className="app-panel min-h-screen px-4 py-10 sm:px-8 sm:py-14">
      <div className="app-panel-backdrop" />
      <div className="pointer-events-none absolute -left-44 top-40 h-80 w-80 rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -right-40 top-72 h-80 w-80 rounded-full border border-white/5" />

      <div className="app-panel-content space-y-12">
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-100/80">Discover His journey</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight text-white sm:text-6xl">
            Where did <span className="italic text-blue-200">Jesus</span> walk?
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-blue-100/70 sm:text-lg">
            See the place, time, distance, and Scripture for every journey.
          </p>
        </section>

        {scenesByPhase.map(({ phase, scenes }) => (
          <section key={phase.id} className="mx-auto max-w-5xl space-y-5">
            <div className="border-l-4 border-emerald-400 pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/60">Journey chapter</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {phase.title}
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {scenes.map((scene) => (
                <DiscoverSceneCard key={scene.id} scene={scene} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
