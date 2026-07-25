import React from "react";
import {
  clearFeedHistory,
  clearProgress,
  clearReflections,
  clearWalkState,
} from "../../utils/storage.js";

type SettingActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  destructive?: boolean;
  onClick: () => void;
};

const SettingAction: React.FC<SettingActionProps> = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  destructive = false,
  onClick,
}) => (
  <section className="app-surface flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
    <div className="max-w-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/60">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-blue-100/65">{description}</p>
    </div>
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-xl border px-5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
        destructive
          ? "border-red-300/40 bg-red-500/15 text-red-100 hover:bg-red-500/25"
          : "border-white/15 bg-white/90 text-slate-900 hover:bg-white"
      }`}
    >
      {buttonLabel}
    </button>
  </section>
);

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
    <div className="app-panel min-h-[calc(100dvh-8.5rem)] px-5 py-10 sm:px-10 sm:py-14">
      <div className="app-panel-backdrop" />
      <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full border border-white/5" />

      <div className="app-panel-content mx-auto max-w-3xl">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-100/70">On this device</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-white sm:text-6xl">Settings</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-blue-100/65">
            Manage your locally saved journey and journal data.
          </p>
        </header>

        <div className="mt-12 space-y-4">
          <SettingAction
            eyebrow="Walking"
            title="Start the journey over"
            description="Clear distance, progress, and devotional feed history."
            buttonLabel="Reset progress"
            onClick={handleResetJourney}
          />
          <SettingAction
            eyebrow="Journal"
            title="Remove saved reflections"
            description="Delete every journal entry and reflection stored on this device."
            buttonLabel="Clear reflections"
            destructive
            onClick={handleClearReflections}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
