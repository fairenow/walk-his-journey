import { Link } from "react-router-dom";
import { journeyScenes, phases } from "../data/journeys.ts";

export default function Discover() {
  const orderedPhases = [...phases].sort((a, b) => a.order - b.order);
  const scenesByPhase = orderedPhases.map((phase) => ({
    phase,
    scenes: journeyScenes
      .filter((scene) => scene.phaseId === phase.id)
      .sort((a, b) => a.order - b.order),
  }));

  return (
    <div className="space-y-10">
      <section>
        <p className="text-xs font-semibold tracking-wide text-[color:var(--deep-teal)] uppercase">
          Discover
        </p>
        <h1 className="text-3xl font-bold mt-1">The Journey of Jesus</h1>
        <p className="text-sm text-gray-700 mt-3 max-w-2xl">
          Explore Jesus’ life from Nazareth to the empty tomb. Tap any journey
          to learn what happened there, who He met, and what it means for us.
        </p>
      </section>

      {scenesByPhase.map(({ phase, scenes }) => (
        <section key={phase.id} className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">{phase.title}</h2>
            <p className="text-sm text-slate-600 max-w-3xl">{phase.description}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {scenes.map((scene) => (
              <Link
                key={scene.id}
                to={`/journey/${scene.id}`}
                className="bg-white/90 rounded-2xl p-5 shadow-sm border border-white/60 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl" aria-hidden>
                      {scene.icon}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{scene.title}</p>
                      <p className="text-xs text-[color:var(--deep-teal)]">{scene.approxDate}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{scene.cardBlurb}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[color:var(--deep-teal)]">Open →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
