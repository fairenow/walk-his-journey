import React, { useState } from "react";
import { useTracking } from "../../tracking/TrackingContext";
import { DistanceUnit, formatDistance } from "../../utils/distance";

const dateFormat = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" });

export default function HistoryPage() {
  const { sessions, activeSession, clearHistory } = useTracking();
  const [unit, setUnit] = useState<DistanceUnit>(() => (localStorage.getItem("whj_distance_unit") as DistanceUnit) || "mi");
  const allSessions = activeSession ? [activeSession, ...sessions] : sessions;

  const changeUnit = (next: DistanceUnit) => {
    localStorage.setItem("whj_distance_unit", next);
    setUnit(next);
  };

  return (
    <div className="app-panel min-h-[calc(100dvh-8.5rem)] p-6 sm:p-10">
      <div className="app-panel-backdrop" />
      <div className="app-panel-content mx-auto max-w-2xl">
        <header className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-100/65">Your activity</p>
            <h1 className="mt-2 font-serif text-5xl text-white">History</h1>
          </div>
          <div className="flex rounded-xl bg-white/10 p-1" aria-label="Distance unit">
            {(["mi", "km"] as DistanceUnit[]).map((item) => (
              <button key={item} onClick={() => changeUnit(item)} className={`rounded-lg px-3 py-2 text-xs font-bold uppercase ${unit === item ? "bg-white text-slate-900" : "text-blue-100"}`}>{item}</button>
            ))}
          </div>
        </header>

        <div className="mt-10 space-y-3">
          {allSessions.length ? allSessions.map((session) => (
            <article key={session.id} className="app-surface flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-semibold text-white">{dateFormat.format(new Date(session.startedAt))}</p>
                <p className="mt-1 text-xs text-blue-100/60">
                  {session.endedAt ? `${new Date(session.startedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} – ${new Date(session.endedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}` : "Walking now"}
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{formatDistance(session.distanceMeters, unit)} <span className="text-sm uppercase text-blue-100/60">{unit}</span></p>
            </article>
          )) : (
            <div className="app-surface px-6 py-16 text-center">
              <p className="text-lg font-semibold text-white">Your walks will show up here.</p>
              <p className="mt-2 text-sm text-blue-100/60">Start tracking from the Walk tab to record your first walk.</p>
            </div>
          )}
        </div>
        {sessions.length ? <button onClick={clearHistory} className="mt-8 text-sm font-semibold text-blue-100/60 underline hover:text-white">Clear completed history</button> : null}
      </div>
    </div>
  );
}
