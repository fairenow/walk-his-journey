import { Link, useParams } from 'react-router-dom';
import { journeyScenes } from '../data/journeys.ts';
import { getMiles } from '../utils/storage.js';

export default function JourneyDetail() {
  const { id } = useParams();
  const scene = journeyScenes.find((item) => item.id === id);
  const milesWalked = scene ? getMiles(scene.id) : 0;
  const totalMiles = scene?.distanceMi ?? scene?.distanceMiles ?? 0;
  const progressRatio = totalMiles ? Math.min(milesWalked / totalMiles, 1) : 1;
  const youthTakeawayThreshold = totalMiles ? Math.min(totalMiles * 0.25, totalMiles) : 0;
  const fullMomentsThreshold = totalMiles ? Math.min(totalMiles * 0.6, totalMiles) : 0;
  const youthTakeawayUnlocked = !totalMiles || milesWalked >= youthTakeawayThreshold;
  const themesUnlocked = !totalMiles || milesWalked >= totalMiles;

  const keyMomentsToShow = !scene
    ? []
    : scene.keyMoments.slice(
        0,
        !totalMiles
          ? scene.keyMoments.length
          : Math.max(1, Math.ceil(progressRatio * scene.keyMoments.length))
      );

  const allMomentsUnlocked = keyMomentsToShow.length === (scene?.keyMoments.length ?? 0);

  if (!scene) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">Journey not found.</p>
        <Link to="/" className="text-blue-700">
          ← Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="text-blue-700">
        ← Back
      </Link>

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-indigo-50 shadow-xl ring-1 ring-slate-200">
        <div className="absolute -left-10 -top-10 h-40 w-40 rotate-6 rounded-full bg-gradient-to-br from-sky-200/50 to-indigo-200/50 blur-3xl" />
        <div className="absolute -right-14 bottom-4 h-32 w-32 -rotate-12 rounded-full bg-gradient-to-br from-indigo-200/50 to-purple-200/40 blur-3xl" />

        <header className="relative border-b border-white/60 px-6 py-8 sm:px-10">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-inner ring-1 ring-white/70">
              {scene.icon || '🎬'}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase text-[color:var(--deep-teal)]">
                <span className="rounded-full bg-white/80 px-3 py-1 shadow-sm ring-1 ring-white">Storyboard Scene</span>
                {scene.approxDate && (
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[color:var(--deep-teal)] shadow-sm ring-1 ring-white/80">{scene.approxDate}</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 drop-shadow-sm sm:text-4xl">{scene.title}</h1>
              <p className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-3 text-sm font-semibold text-amber-900 shadow-sm ring-1 ring-amber-200">
                <span className="text-lg">✨</span>
                <span>{scene.tagLine}</span>
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <p>{scene.phaseTitle}</p>
                {totalMiles ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200">
                    <span className="text-indigo-500">📏</span>
                    {milesWalked} / {totalMiles} mi logged
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <div className="relative space-y-5 px-6 py-8 sm:px-10">
          <Section title="What Happened" accent="bg-sky-500">
            <p className="text-base leading-relaxed text-slate-800">{scene.summary}</p>
          </Section>

          <Section title="Scene Highlights" accent="bg-indigo-500">
            <ul className="space-y-2 text-slate-800">
              {keyMomentsToShow.map((moment) => (
                <li key={moment} className="flex items-start gap-3 rounded-xl bg-white/70 px-3 py-2 shadow-inner ring-1 ring-slate-100">
                  <span className="mt-0.5 text-indigo-500">•</span>
                  <span className="leading-relaxed">{moment}</span>
                </li>
              ))}
            </ul>
            {!allMomentsUnlocked && totalMiles ? (
              <p className="text-xs text-indigo-700/90">
                Keep walking—log {Math.max(fullMomentsThreshold - milesWalked, 0).toFixed(1)} more miles to unlock every moment in this scene.
              </p>
            ) : null}
          </Section>

          <Section title="Why It Matters" accent="bg-amber-500">
            <div className="space-y-4">
              {youthTakeawayUnlocked ? (
                <p className="text-base leading-relaxed text-slate-800">{scene.youthTakeaway}</p>
              ) : (
                <div className="rounded-xl bg-amber-50/80 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
                  Walk {Math.max(youthTakeawayThreshold - milesWalked, 0).toFixed(1)} more miles to unlock this takeaway.
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {(themesUnlocked ? scene.themes : scene.themes.slice(0, 1)).map((theme) => (
                  <span key={theme} className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
                    {theme}
                  </span>
                ))}
                {!themesUnlocked && scene.themes.length > 1 ? (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                    Walk {Math.max(totalMiles - milesWalked, 0).toFixed(1)} more miles to reveal all themes
                  </span>
                ) : null}
              </div>
            </div>
          </Section>

          <Section title="In Your Bible" accent="bg-emerald-500">
            <div className="space-y-2">
              {scene.scriptureRefs.map((ref) => (
                <div key={`${ref.book}-${ref.ref}`} className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 shadow-inner ring-1 ring-emerald-100">
                  <span className="text-emerald-600">📖</span>
                  <span className="text-slate-800 font-semibold">{ref.book}</span>
                  <span className="text-slate-600">{ref.ref}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="For Artists" accent="bg-purple-500">
            <div className="space-y-3 text-slate-800">
              <p className="leading-relaxed">
                <span className="font-semibold">Storyboard Beat:</span> {scene.storyboardBeat}
              </p>
              <p className="leading-relaxed text-slate-700">
                <span className="font-semibold">Visual Prompt:</span> {scene.visualPrompt}
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, accent, children }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-lg shadow-slate-200/40">
      <div className={`absolute -left-8 top-4 h-8 w-8 rotate-12 rounded-full ${accent} blur-md opacity-60`} />
      <div className="relative flex items-center gap-2">
        <span className={`h-1.5 w-6 rounded-full ${accent}`} />
        <h2 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">{title}</h2>
      </div>
      <div className="relative mt-4 space-y-3 text-sm text-slate-700">{children}</div>
    </section>
  );
}
