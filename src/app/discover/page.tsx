import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { journeyScenes, phases } from "../../data/journeys.ts";

const formatDistance = (miles: number | null, km: number | null) => {
  if (miles) return `${miles} mi`;
  if (km) return `${km} km`;
  return "Distance unknown";
};

const DiscoverSceneCard: React.FC<{ scene: (typeof journeyScenes)[number] }> = ({ scene }) => {
  const scriptureRefs = scene.scriptureRefs.map((ref) => `${ref.book} ${ref.ref}`).join(" · ");
  const lessons = scene.themes.slice(0, 3);

  return (
    <article className="relative flex flex-col gap-5 rounded-3xl border border-amber-200/70 bg-[#FFF8F0] p-6 text-slate-900 shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200/70 bg-white/80 text-3xl text-amber-700 shadow-inner shadow-amber-200/60">
          <span aria-hidden>{scene.icon}</span>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-700/90">
            <span className="rounded-full bg-white/70 px-3 py-1 text-amber-800 shadow-inner shadow-amber-200/70">{scene.phaseTitle}</span>
            {scene.approxDate ? (
              <span className="rounded-full bg-white/70 px-3 py-1 text-amber-800 shadow-inner shadow-amber-200/70">{scene.approxDate}</span>
            ) : null}
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-950 drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)]">{scene.title}</h3>
            <p className="text-sm text-slate-700">{scene.tagLine}</p>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-slate-800">{scene.summary}</p>

      <div className="grid gap-3 text-sm text-slate-800 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-2xl border border-amber-200/80 bg-amber-100/70 px-4 py-3 shadow-inner">
          <p className="text-[11px] uppercase tracking-[0.14em] text-amber-800">Travel</p>
          <p className="font-semibold text-slate-950">
            {scene.from} → {scene.to}
          </p>
          <p className="text-xs text-amber-800/90">{formatDistance(scene.distanceMi, scene.distanceKm)}</p>
        </div>
        <div className="rounded-2xl border border-amber-200/80 bg-amber-100/70 px-4 py-3 shadow-inner">
          <p className="text-[11px] uppercase tracking-[0.14em] text-amber-800">Scripture</p>
          <p className="font-semibold text-slate-950">{scriptureRefs || "Multiple passages"}</p>
        </div>
        <div className="rounded-2xl border border-amber-200/80 bg-amber-100/70 px-4 py-3 shadow-inner">
          <p className="text-[11px] uppercase tracking-[0.14em] text-amber-800">Lessons</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {lessons.map((theme) => (
              <span
                key={theme}
                className="inline-flex items-center rounded-full border border-amber-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-amber-800 shadow-inner shadow-amber-200/80"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-700">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800">Travel party</p>
          <p className="text-sm font-semibold text-slate-900">{scene.travelParty.join(", ")}</p>
        </div>
        <Link
          to={`/discover/${scene.id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-amber-300 transition hover:bg-amber-400"
        >
          Open Scene
          <span aria-hidden>→</span>
        </Link>
      </div>
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
    <div className="-mx-4 -mt-2 space-y-10 rounded-[28px] bg-gradient-to-b from-[#FDF2E9] to-[#F9D9A9] px-4 py-8 sm:-mx-6 sm:px-6">
      <section className="space-y-3 rounded-3xl border border-amber-200/70 bg-white/70 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">Discover</p>
        <h1 className="text-3xl font-bold text-slate-950 drop-shadow-[0_2px_6px_rgba(0,0,0,0.14)]">The Journey of Jesus</h1>
        <p className="text-sm text-slate-700 sm:max-w-2xl">
          Explore every moment using the same source as the live Journey feed. Tap any scene to see its story, scripture, travel details, and key lessons.
        </p>
      </section>

      {scenesByPhase.map(({ phase, scenes }) => (
        <section key={phase.id} className="space-y-4">
          <div className="space-y-1 px-1 text-slate-700">
            <h2 className="text-lg font-semibold text-slate-950">{phase.title}</h2>
            <p className="text-sm sm:max-w-3xl">{phase.description}</p>
          </div>
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
