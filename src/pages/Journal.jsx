import { Link } from 'react-router-dom';
import { getJournal } from '../utils/storage.js';
import { journeys } from '../data/journeys.js';

export default function Journal() {
  const entries = getJournal();

  const journeyTitle = (id) => journeys.find((j) => j.id === id)?.title ?? 'Journey';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-blue-700">Reflections</p>
          <h1 className="text-3xl font-bold text-slate-900">My Journal</h1>
          <p className="mt-2 text-slate-600">
            Saved prayer walk reflections appear here. Capture what God is showing you along the way.
          </p>
        </div>
        <Link to="/" className="btn-secondary">
          ← Home
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
          No journal entries yet. Start a Prayer Walk to add your first reflection.
        </div>
      ) : (
        <div className="grid gap-4">
          {entries.map((entry, index) => (
            <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{journeyTitle(entry.journeyId)}</p>
              <p className="text-xs text-slate-500">{entry.date}</p>
              <p className="mt-3 text-slate-800 whitespace-pre-line">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
