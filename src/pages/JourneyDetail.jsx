import { Link, useParams } from 'react-router-dom';
import { journeys } from '../data/journeys.js';
import { getMiles } from '../utils/storage.js';
import ProgressBar from '../components/ProgressBar.jsx';
import Button from '../components/Button.jsx';

export default function JourneyDetail() {
  const { id } = useParams();
  const journey = journeys.find((j) => j.id === id);

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
  const pct = Math.min((miles / journey.distanceMiles) * 100, 100);

  return (
    <div className="space-y-6">
      <Link to="/" className="text-blue-700">
        ← Back
      </Link>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{journey.title}</h1>
        <p className="mt-2 text-slate-600">{journey.description}</p>

        <div className="mt-4 space-y-2 text-slate-700">
          <p>
            <span className="font-semibold">Scripture:</span> {journey.scripture}
          </p>
          <p className="font-semibold text-slate-800">Your Progress</p>
          <ProgressBar percent={pct} />
          <p>
            {miles} / {journey.distanceMiles} miles logged
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={`/walk/${journey.id}`} className="btn-primary">
            Walk This Journey →
          </Link>
          <Button variant="secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Jump to Top
          </Button>
        </div>
      </div>
    </div>
  );
}
