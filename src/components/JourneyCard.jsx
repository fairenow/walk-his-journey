import { Link } from 'react-router-dom';
import { getMiles } from '../utils/storage.js';

export default function JourneyCard({ journey }) {
  const miles = getMiles(journey.id);
  const totalMiles = journey.distanceMi ?? journey.distanceMiles ?? 0;
  const pct = totalMiles ? Math.min((miles / totalMiles) * 100, 100) : 0;
  const description = journey.cardBlurb ?? journey.summary ?? journey.description;

  return (
    <div className="bg-[color:var(--card-white)] rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--deep-teal)] font-semibold">Journey Scene</p>
          <h2 className="text-lg font-semibold mt-1">{journey.title}</h2>
          <p className="text-xs text-gray-500 mt-1">
            Distance: {totalMiles ? `${totalMiles} mi` : 'Distance coming soon'}
          </p>
        </div>
        <div className="text-2xl">{journey.icon ?? '👣'}</div>
      </div>

      {journey.tagLine && <p className="text-sm text-[color:var(--deep-teal)] mt-3">{journey.tagLine}</p>}
      <p className="text-sm text-gray-700 mt-2">{description}</p>

      <div className="mt-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[color:var(--sunrise-gold)] to-[color:var(--sunset-orange)]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>
            {totalMiles ? `${miles} of ${totalMiles} miles logged` : `${miles} miles logged`} ({pct.toFixed(0)}%)
          </span>
          <Link to={`/walk/${journey.id}`} className="text-[color:var(--deep-teal)] font-medium">
            Continue →
          </Link>
        </div>
      </div>
    </div>
  );
}
