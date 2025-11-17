import React from "react";
import { Link } from "react-router-dom";
import {
  clearFeedHistory,
  clearProgress,
  clearReflections,
  clearWalkState,
} from "../../utils/storage.js";

const SettingsPage: React.FC = () => {
  const handleResetJourney = () => {
    clearProgress();
    clearWalkState();
    clearFeedHistory();
    alert("Your journey progress has been reset.");
  };

  const handleClearReflections = () => {
    clearReflections();
    alert("All reflections have been cleared.");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-blue-700">Settings</p>
          <h1 className="text-3xl font-bold text-slate-900">Manage Your Journey</h1>
          <p className="mt-2 text-slate-600">
            Reset on-device progress or clear saved reflections whenever you need a fresh start.
          </p>
        </div>
        <Link to="/" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
          ← Back to Walks
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Journey Data</p>
              <h2 className="text-xl font-semibold text-slate-900">Reset Journey Progress</h2>
              <p className="text-sm text-slate-600">
                Clears your walk state, feed history, and progress so you can begin again.
              </p>
            </div>
            <span className="text-2xl" aria-hidden>
              🧭
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetJourney}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-black"
          >
            Reset Journey Progress
          </button>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Reflections</p>
              <h2 className="text-xl font-semibold text-slate-900">Clear All Reflections</h2>
              <p className="text-sm text-slate-600">
                Remove every saved reflection from this device, including journal entries.
              </p>
            </div>
            <span className="text-2xl" aria-hidden>
              📝
            </span>
          </div>
          <button
            type="button"
            onClick={handleClearReflections}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-100"
          >
            Clear All Reflections
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
