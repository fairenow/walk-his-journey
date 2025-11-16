import { Link } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import Button from '../components/Button.jsx';
import { journeyScenes } from '../data/journeys.ts';
import { clearProgress } from '../utils/storage.js';

export default function JourneyList() {
  const scenesByPhase = Array.from(
    journeyScenes.reduce((map, scene) => {
      if (!map.has(scene.phaseTitle)) {
        map.set(scene.phaseTitle, []);
      }
      map.get(scene.phaseTitle).push(scene);
      return map;
    }, new Map())
  ).map(([phaseTitle, scenes]) => ({
    phaseTitle,
    scenes: scenes.sort((a, b) => a.order - b.order),
    order: Math.min(...scenes.map((s) => s.order)),
  }));

  scenesByPhase.sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="w-full h-28 bg-[url('/banner-journey.png')] bg-cover bg-center rounded-lg mb-2"></div>
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-blue-700">Prototype</p>
          <h1 className="text-3xl font-bold text-slate-900">Walk His Journey</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Walk the distances Jesus walked and unlock each part of His story. Log your miles,
            reflect, and pray as you go.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button onClick={clearProgress} variant="secondary">
          Reset Progress
        </Button>
        <Link to="/journal" className="btn-primary">
          Open Journal
        </Link>
      </div>

      <div className="space-y-8">
        {scenesByPhase.map(({ phaseTitle, scenes }) => (
          <section key={phaseTitle} className="space-y-3">
            <div className="flex items-baseline gap-2">
              <div className="h-2 w-2 rounded-full bg-[color:var(--deep-teal)]" />
              <h2 className="text-xl font-semibold text-slate-900">{phaseTitle}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {scenes.map((scene) => (
                <JourneyCard key={scene.id} journey={scene} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
