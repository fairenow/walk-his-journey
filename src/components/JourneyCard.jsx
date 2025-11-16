import { Link } from 'react-router-dom';
import { getMiles } from '../utils/storage.js';
import ProgressBar from './ProgressBar.jsx';

export default function JourneyCard({ journey }) {
  const miles = getMiles(journey.id);
  const pct = Math.min((miles / journey.distanceMiles) * 100, 100);

  return (
    <div className="border rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-white transition hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-3xl mb-2" aria-hidden="true">{journey.icon}</div>
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
        <Link
          to={`/walk/${journey.id}`}
          className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition"
        >
          Continue →
        </Link>
      </div>
    </div>
  );
}
