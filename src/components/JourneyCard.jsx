import { Link } from 'react-router-dom';
import { getMiles } from '../utils/storage.js';

export default function JourneyCard({ journey }) {
  const miles = getMiles(journey.id);
  const pct = Math.min((miles / journey.distanceMiles) * 100, 100);
  const description = journey.summary ?? journey.description;

  return (
    <div className="bg-[color:var(--card-white)] rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-[color:var(--deep-teal)] font-semibold">
            Journey
          </p>
          <h2 className="text-lg font-semibold mt-1">{journey.title}</h2>
          <p className="text-xs text-gray-500 mt-1">Total: {journey.distanceMiles} mi</p>
        </div>
        <div className="text-2xl">{journey.icon ?? '👣'}</div>
      </div>

      <p className="text-sm text-gray-700 mt-3">{description}</p>

      <div className="mt-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[color:var(--sunrise-gold)] to-[color:var(--sunset-orange)]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>
            {miles} of {journey.distanceMiles} miles logged
          </span>
          <Link to={`/walk/${journey.id}`} className="text-[color:var(--deep-teal)] font-medium">
            Continue →
          </Link>
        </div>
      </div>

      {journey.milestones && (
        <div className="mt-3 flex flex-wrap gap-2">
          {journey.milestones.map((m) => {
            const unlocked = miles >= m.thresholdMiles;
            return (
              <span
                key={m.label}
                className={
                  'px-2 py-1 rounded-full text-[10px] font-medium ' +
                  (unlocked
                    ? 'bg-[color:var(--sunrise-gold)] text-[color:var(--ink-dark)]'
                    : 'bg-gray-200 text-gray-500')
                }
              >
                {unlocked ? '✓ ' : '• '}
                {m.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
