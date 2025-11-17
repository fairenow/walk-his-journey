import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJournal, saveReflection } from '../utils/storage.js';
import { journeyScenes } from '../data/journeys.ts';
import { journeys } from '../data/journeys.js';

export default function Journal() {
  const [entries, setEntries] = useState(() => getJournal());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const sceneOptions = useMemo(
    () => [...journeyScenes].sort((a, b) => a.order - b.order),
    []
  );

  const journeyTitle = (id) => {
    return (
      journeyScenes.find((scene) => scene.id === id)?.title ||
      journeys.find((journey) => journey.id === id)?.title ||
      'Journey'
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedScene((current) => current || sceneOptions[0]?.id || '');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setText('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      alert('Please enter your reflection before saving.');
      return;
    }

    saveReflection(selectedScene, text.trim(), title);
    setEntries(getJournal());
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-blue-700">Reflections</p>
          <h1 className="text-3xl font-bold text-slate-900">My Journal</h1>
          <p className="mt-2 text-slate-600">
            Saved prayer walk reflections appear here. Capture what God is showing you along the way.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            + New Reflection
          </button>
          <Link to="/" className="btn-secondary">
            ← Home
          </Link>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
          <p>No journal entries yet.</p>
          <p className="mt-1">Start a Prayer Walk or add your first reflection right here.</p>
          <button
            type="button"
            onClick={openModal}
            className="mt-4 inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Start your first reflection
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {entries.map((entry, index) => (
            <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{journeyTitle(entry.journeyId)}</p>
              <p className="text-xs text-slate-500">{entry.date}</p>
              {entry.title ? (
                <h2 className="mt-2 text-lg font-semibold text-slate-900">{entry.title}</h2>
              ) : null}
              <p className="mt-3 whitespace-pre-line text-slate-800">{entry.text}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">New Reflection</p>
                <h2 className="text-2xl font-bold text-slate-900">Capture your thoughts</h2>
                <p className="mt-1 text-sm text-slate-600">Link this reflection to a journey scene and save it to your journal.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 transition hover:text-slate-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                  <span>Journey scene</span>
                  <span className="text-xs font-normal text-slate-500">Required</span>
                </div>
                <select
                  required
                  value={selectedScene}
                  onChange={(event) => setSelectedScene(event.target.value)}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                >
                  {sceneOptions.map((scene) => (
                    <option key={scene.id} value={scene.id}>
                      {scene.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-slate-800">Title (optional)</span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="A short headline for this reflection"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </label>

              <label className="block space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                  <span>Reflection</span>
                  <span className="text-xs font-normal text-slate-500">Required</span>
                </div>
                <textarea
                  required
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Write what stood out, what you sensed, or how you'll respond."
                  className="h-40 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </label>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Save reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
