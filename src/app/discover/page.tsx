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
    <article className="relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg shadow-black/30">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-inner shadow-black/40">
          <span aria-hidden>{scene.icon}</span>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/80">
            <span className="rounded-full bg-white/10 px-3 py-1">{scene.phaseTitle}</span>
            {scene.approxDate ? (
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-blue-50">{scene.approxDate}</span>
            ) : null}
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white drop-shadow-sm">{scene.title}</h3>
            <p className="text-sm text-blue-100/80">{scene.tagLine}</p>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-blue-50/90">{scene.summary}</p>

      <div className="grid gap-3 text-sm text-blue-50/90 sm:grid-cols-3 sm:gap-4">
        <div className="rounded-2xl bg-black/20 p-3 shadow-inner shadow-black/30">
          <p className="text-[11px] uppercase tracking-[0.14em] text-blue-100/70">Travel</p>
          <p className="font-semibold text-white">
            {scene.from} → {scene.to}
          </p>
          <p className="text-xs text-blue-100/70">{formatDistance(scene.distanceMi, scene.distanceKm)}</p>
        </div>
        <div className="rounded-2xl bg-black/20 p-3 shadow-inner shadow-black/30">
          <p className="text-[11px] uppercase tracking-[0.14em] text-blue-100/70">Scripture</p>
          <p className="font-semibold text-white">{scriptureRefs || "Multiple passages"}</p>
        </div>
        <div className="rounded-2xl bg-black/20 p-3 shadow-inner shadow-black/30">
          <p className="text-[11px] uppercase tracking-[0.14em] text-blue-100/70">Lessons</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {lessons.map((theme) => (
              <span
                key={theme}
                className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white shadow-inner shadow-black/30"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs text-blue-100/70">
          <p className="font-semibold uppercase tracking-[0.18em] text-[11px]">Travel party</p>
          <p className="text-sm text-white/90">{scene.travelParty.join(", ")}</p>
        </div>
        <Link
          to={`/discover/${scene.id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md shadow-black/30 transition hover:bg-white"
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
    <div className="space-y-10 text-white">
      <section className="space-y-3 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1d33] via-[#0f2742] to-[#0d1d33] p-6 shadow-2xl shadow-black/30">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100/80">Discover</p>
        <h1 className="text-3xl font-bold drop-shadow-sm">The Journey of Jesus</h1>
        <p className="text-sm text-blue-100/80 sm:max-w-2xl">
          Explore every moment using the same source as the live Journey feed. Tap any scene to see its story, scripture, travel details, and key lessons.
        </p>
      </section>

      {scenesByPhase.map(({ phase, scenes }) => (
        <section key={phase.id} className="space-y-4">
          <div className="space-y-1 px-1 text-blue-50/90">
            <h2 className="text-lg font-semibold text-white">{phase.title}</h2>
            <p className="text-sm text-blue-100/80 sm:max-w-3xl">{phase.description}</p>
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
