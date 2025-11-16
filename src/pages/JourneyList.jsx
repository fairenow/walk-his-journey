import { Link } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import Button from '../components/Button.jsx';
import { journeys } from '../data/journeys.js';
import { clearProgress } from '../utils/storage.js';

export default function JourneyList() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-wide text-blue-700">Prototype</p>
        <h1 className="text-3xl font-bold text-slate-900">Walk His Journey</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Walk the distances Jesus walked and unlock each part of His story. Log your miles,
          reflect, and pray as you go.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button onClick={clearProgress} variant="secondary">
          Reset Progress
        </Button>
        <Link to="/journal" className="btn-primary">
          Open Journal
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        {journeys.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </section>
    </div>
  );
}
