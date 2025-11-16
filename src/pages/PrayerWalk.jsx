import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { journeys } from '../data/journeys.js';
import { saveReflection } from '../utils/storage.js';
import Button from '../components/Button.jsx';

export default function PrayerWalk() {
  const { id } = useParams();
  const journey = journeys.find((j) => j.id === id);
  const [text, setText] = useState('');

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

  function save() {
    if (!text.trim()) {
      alert('Write a reflection before saving.');
      return;
    }
    saveReflection(id, text.trim());
    setText('');
    alert('Reflection saved!');
  }

  return (
    <div className="space-y-6">
      <Link to={`/walk/${id}`} className="text-blue-700">
        ← Back
      </Link>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Prayer Walk</h1>
        <p className="mt-4 text-slate-700">{journey.reflectionPrompt}</p>

        <textarea
          className="mt-4 h-48 w-full rounded-md border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Your reflection..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={save}>Save Reflection</Button>
          <Link to="/journal" className="btn-secondary">
            Go to Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
