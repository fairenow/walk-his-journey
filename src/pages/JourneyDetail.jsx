import { Link, useParams } from 'react-router-dom';
import { journeys } from '../data/journeys.js';
import { journeyScenes } from '../data/journeys.ts';
import { getMiles } from '../utils/storage.js';
import ProgressBar from '../components/ProgressBar.jsx';
import Button from '../components/Button.jsx';

export default function JourneyDetail() {
  const { id } = useParams();
  const journey = journeyScenes.find((scene) => scene.id === id) ?? journeys.find((j) => j.id === id);

  if (!journey) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-500">Journey not found.</p>
        <Link to="/" className="text-blue-700">
          ← Back to list
        </Link>
      </div>
    );
  }

  const miles = getMiles(id);
  const totalMiles = journey.distanceMi ?? journey.distanceMiles ?? 0;
  const pct = totalMiles ? Math.min((miles / totalMiles) * 100, 100) : 0;
  const description = journey.summary ?? journey.cardBlurb ?? journey.description ?? journey.tagLine;
  const scriptureList = journey.scriptureRefs
    ? journey.scriptureRefs.map((ref) => `${ref.book} ${ref.ref}`).join(', ')
    : journey.scriptures?.join(', ') ?? journey.scripture ?? '—';
  const unlockedMilestones = (journey.milestones || []).filter((m) => miles >= m.thresholdMiles);

  return (
    <div className="space-y-6">
      <Link to="/" className="text-blue-700">
        ← Back
      </Link>

      <div className="rounded-xl bg-white p-6 shadow-sm space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase font-semibold text-[color:var(--deep-teal)]">Journey Detail</p>
          <h1 className="text-3xl font-bold mt-1 flex items-center gap-2">
            <span>{journey.icon ?? '👣'}</span>
            <span>{journey.title}</span>
          </h1>
          {journey.approxDate && <p className="text-xs text-[color:var(--deep-teal)]">{journey.approxDate}</p>}
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <p className="text-xs text-gray-500 mt-1">Scriptures: {scriptureList}</p>
        </header>

        <section className="bg-white/90 rounded-2xl p-5 shadow space-y-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Your Progress</h2>
            <div className="mt-2 space-y-2">
              <ProgressBar percent={pct} />
              <p className="text-sm text-gray-700">
                {totalMiles ? `${miles} / ${totalMiles} miles logged` : `${miles} miles logged`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to={`/walk/${journey.id}`} className="btn-primary">
              Walk This Journey →
            </Link>
            <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Jump to Top
            </Button>
          </div>
        </section>

        <section className="bg-white/90 rounded-2xl p-5 shadow">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Unlocked Insights</h2>
          {unlockedMilestones.length === 0 && (
            <p className="text-sm text-gray-600">
              Start walking this journey to unlock more about what Jesus did here.
            </p>
          )}
          <div className="space-y-3">
            {unlockedMilestones.map((m) => (
              <div key={m.label}>
                <h3 className="text-sm font-semibold">{m.label}</h3>
                <p className="text-sm text-gray-700 mt-1">{m.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
