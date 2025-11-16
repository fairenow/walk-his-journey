import { Link } from 'react-router-dom';
import { getMiles } from '../utils/storage.js';
import ProgressBar from './ProgressBar.jsx';

export default function JourneyCard({ journey }) {
  const miles = getMiles(journey.id);
  const pct = Math.min((miles / journey.distanceMiles) * 100, 100);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{journey.title}</h2>
          <p className="text-sm text-slate-500">Total: {journey.distanceMiles} mi</p>
        </div>
        <Link to={`/journey/${journey.id}`} className="text-sm font-medium text-blue-700">
          Open →
        </Link>
      </div>

      <p className="mt-3 text-sm text-slate-700">{journey.description}</p>

      <ProgressBar percent={pct} />

      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span>
          {miles} of {journey.distanceMiles} miles logged
        </span>
        <Link to={`/walk/${journey.id}`} className="text-blue-700 hover:text-blue-900">
          Continue
        </Link>
      </div>
    </div>
  );
}
