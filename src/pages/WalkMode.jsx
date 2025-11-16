import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { journeys } from '../data/journeys.js';
import { getMiles, updateProgress } from '../utils/storage.js';
import ProgressBar from '../components/ProgressBar.jsx';
import Button from '../components/Button.jsx';

export default function WalkMode() {
  const { id } = useParams();
  const journey = journeys.find((j) => j.id === id);
  const [amount, setAmount] = useState('');
  const currentMiles = getMiles(id);

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

  function logMiles() {
    const value = Number(amount);
    if (Number.isNaN(value) || value <= 0) {
      alert('Please enter a positive number of miles.');
      return;
    }
    updateProgress(id, currentMiles + value);
    setAmount('');
    alert('Miles logged!');
  }

  const pct = Math.min((currentMiles / journey.distanceMiles) * 100, 100);

  return (
    <div className="space-y-6">
      <Link to={`/journey/${id}`} className="text-blue-700">
        ← Back
      </Link>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Walk Mode</h1>
        <p className="text-slate-700">
          Log your miles for: <strong>{journey.title}</strong>
        </p>

        <div className="mt-4 space-y-2">
          <ProgressBar percent={pct} />
          <p className="text-sm text-slate-600">
            {currentMiles} / {journey.distanceMiles} miles logged
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block text-sm font-medium text-slate-700" htmlFor="miles">
            Miles walked today
          </label>
          <input
            id="miles"
            type="number"
            min="0"
            className="w-full rounded-md border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="e.g., 3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button onClick={logMiles}>Log Miles</Button>
          <Link to={`/prayer/${id}`} className="btn-primary block text-center">
            Start Prayer Walk →
          </Link>
        </div>
      </div>
    </div>
  );
}
