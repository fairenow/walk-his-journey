import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { journeyScenes } from "../../../data/journeys.ts";

const StatPill: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm text-blue-50/90 shadow-inner shadow-black/30">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-100/70">{label}</p>
    <p className="text-base font-semibold text-white">{value}</p>
  </div>
);

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-4 rounded-3xl border border-amber-100/80 bg-white/85 p-6 text-slate-800 shadow-[0_14px_35px_rgba(0,0,0,0.12)]">
    <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-amber-900">
      <span className="h-1.5 w-6 rounded-full bg-amber-400" />
      <h2>{title}</h2>
    </div>
    <div className="space-y-3 text-sm leading-relaxed">{children}</div>
  </section>
);

const SceneDetailPage: React.FC = () => {
  const { id } = useParams();

  const scene = useMemo(() => journeyScenes.find((item) => item.id === id), [id]);

  const distanceLabel = useMemo(() => {
    if (!scene) return "";
    if (scene.distanceMi) return `${scene.distanceMi} miles`;
    if (scene.distanceKm) return `${scene.distanceKm} km`;
    return "Distance unknown";
  }, [scene]);

  const peopleInvolved = useMemo(() => {
    if (!scene) return [] as string[];
    const combined = [...scene.travelParty, ...scene.peopleMet];
    return Array.from(new Set(combined));
  }, [scene]);

  if (!scene) {
    return (
      <div className="-mx-4 -mt-2 space-y-4 rounded-[28px] bg-gradient-to-b from-[#FDF2E9] to-[#F7E2C4] px-4 py-8 text-slate-900 sm:-mx-6 sm:px-6">
        <p className="text-sm text-slate-700">Scene not found.</p>
        <Link to="/discover" className="text-sm font-semibold text-amber-800 underline">
          ← Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="-mx-4 -mt-2 space-y-8 rounded-[28px] bg-gradient-to-b from-[#FDF2E9] to-[#F7E2C4] px-4 py-8 text-slate-900 sm:-mx-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1a2f] via-[#102441] to-[#0c1a2f] p-6 text-white shadow-[0_26px_70px_rgba(0,0,0,0.36)]">
        <div className="absolute -left-16 -top-16 h-36 w-36 rotate-12 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-32 w-32 -rotate-12 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-inner shadow-black/40">
              <span aria-hidden>{scene.icon}</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/80">
                <span className="rounded-full bg-white/10 px-3 py-1">{scene.phaseTitle}</span>
                {scene.approxDate ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-blue-50">{scene.approxDate}</span>
                ) : null}
              </div>
              <h1 className="text-3xl font-bold drop-shadow-sm sm:text-4xl">{scene.title}</h1>
              <p className="text-sm text-blue-100/80">{scene.tagLine}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatPill label="Route" value={`${scene.from} → ${scene.to}`} />
            <StatPill label="Distance" value={distanceLabel} />
            <StatPill
              label="Scripture"
              value={scene.scriptureRefs.map((ref) => `${ref.book} ${ref.ref}`).join(" · ") || "Multiple passages"}
            />
          </div>
          <p className="text-sm leading-relaxed text-blue-50/90">{scene.summary}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <DetailSection title="Description">
            <p>{scene.youthTakeaway}</p>
          </DetailSection>

          <DetailSection title="Relevant moments">
            {scene.keyMoments.length ? (
              <ul className="space-y-2">
                {scene.keyMoments.map((moment) => (
                  <li
                    key={moment}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-2 text-sm text-slate-800"
                  >
                    <span className="mt-0.5 text-amber-500">•</span>
                    <span className="leading-relaxed">{moment}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600">Moments coming soon.</p>
            )}
          </DetailSection>
        </div>

        <div className="space-y-4">
          <DetailSection title="Miracles">
            {scene.miracles.length ? (
              <ul className="space-y-2 text-slate-800">
                {scene.miracles.map((miracle) => (
                  <li
                    key={miracle}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-2 text-sm text-slate-800"
                  >
                    {miracle}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600">No miracles are recorded for this journey scene.</p>
            )}
          </DetailSection>

          <DetailSection title="People involved">
            {peopleInvolved.length ? (
              <div className="flex flex-wrap gap-2">
                {peopleInvolved.map((person) => (
                  <span
                    key={person}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-2 text-sm text-slate-800"
                  >
                    {person}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">People details coming soon.</p>
            )}
          </DetailSection>

          <DetailSection title="Scripture">
            <div className="space-y-2">
              {scene.scriptureRefs.map((ref) => (
                <div
                  key={`${ref.book}-${ref.ref}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-2 text-sm text-slate-800"
                >
                  <span className="text-amber-600">📖</span>
                  <span className="font-semibold text-slate-900">{ref.book}</span>
                  <span className="text-slate-700">{ref.ref}</span>
                </div>
              ))}
            </div>
          </DetailSection>
        </div>
      </div>

      <div className="pt-2">
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md shadow-black/30 transition hover:bg-white"
        >
          ← Back to Discover
        </Link>
      </div>
    </div>
  );
};

export default SceneDetailPage;
