import React, { useEffect, useState } from "react";
import { useTracking } from "../../../tracking/TrackingContext";
import { DistanceUnit, formatDistance } from "../../../utils/distance";

function LocationMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export default function WalkFeedPage() {
  const { totalDistanceMeters, activeSession, isTracking, wantsTracking, error, lastUpdatedAt, startTracking, stopTracking } = useTracking();
  const [unit, setUnit] = useState<DistanceUnit>(() => (localStorage.getItem("whj_distance_unit") as DistanceUnit) || "mi");

  const changeUnit = (next: DistanceUnit) => {
    localStorage.setItem("whj_distance_unit", next);
    setUnit(next);
  };

  useEffect(() => {
    const syncWhenVisible = () => {
      if (document.visibilityState === "visible" && wantsTracking && !isTracking) startTracking();
    };
    document.addEventListener("visibilitychange", syncWhenVisible);
    window.addEventListener("focus", syncWhenVisible);
    return () => {
      document.removeEventListener("visibilitychange", syncWhenVisible);
      window.removeEventListener("focus", syncWhenVisible);
    };
  }, [isTracking, startTracking, wantsTracking]);

  return (
    <div className="app-panel min-h-[calc(100dvh-8.5rem)] border border-white/10">
      <div className="app-panel-backdrop" />
      <div className="pointer-events-none absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="app-panel-content flex min-h-[calc(100dvh-8.5rem)] flex-col px-6 py-9 sm:px-12 sm:py-12">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-100/65">All-time distance</p>
            <h1 className="mt-1 font-serif text-3xl text-white">Your walk</h1>
          </div>
          <div className="flex rounded-xl border border-white/10 bg-white/5 p-1" aria-label="Distance unit">
            {(["mi", "km"] as DistanceUnit[]).map((item) => (
              <button type="button" key={item} onClick={() => changeUnit(item)} className={`rounded-lg px-3 py-2 text-xs font-extrabold uppercase transition ${unit === item ? "bg-white text-slate-900" : "text-blue-100/65"}`}>{item}</button>
            ))}
          </div>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-14 text-center" aria-live="polite">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/10 text-emerald-300 shadow-[0_0_45px_rgba(52,211,153,0.14)]">
            <LocationMark />
          </div>
          <div className="mt-7 flex items-end justify-center gap-3">
            <span className="font-serif text-[clamp(4.5rem,20vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-white">{formatDistance(totalDistanceMeters, unit)}</span>
            <span className="mb-2 text-lg font-bold uppercase tracking-[0.16em] text-blue-100/55 sm:mb-4 sm:text-2xl">{unit}</span>
          </div>
          <p className="mt-5 text-sm text-blue-100/65">
            {activeSession ? `${formatDistance(activeSession.distanceMeters, unit)} ${unit} this walk` : "Ready for your next walk"}
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-100/55">
            <span className={`h-2 w-2 rounded-full ${isTracking ? "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" : "bg-white/30"}`} />
            {isTracking ? "Location tracking is on" : wantsTracking ? "Reconnecting to location…" : "Location tracking is off"}
          </div>
          {lastUpdatedAt && isTracking ? <p className="mt-2 text-[11px] text-blue-100/35">Last location {new Date(lastUpdatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p> : null}
        </section>

        {error ? <p className="mb-4 rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-center text-sm text-red-50" role="alert">{error}</p> : null}

        <div className="mx-auto w-full max-w-md">
          <button type="button" onClick={activeSession ? stopTracking : startTracking} className={`flex w-full items-center justify-center gap-3 rounded-[1.5rem] border px-8 py-5 text-lg font-extrabold tracking-[0.12em] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${activeSession ? "border-red-300/40 bg-white/10 text-white hover:bg-white/15" : "border-emerald-300/60 bg-emerald-400/90 text-emerald-950 hover:bg-emerald-400"}`}>
            {activeSession ? "FINISH WALK" : "START WALK"}
          </button>
          <p className="mt-5 text-center text-xs leading-relaxed text-blue-100/45">
            Keep this site open or install it for the best tracking. Mobile browsers may pause location after the browser is fully closed.
          </p>
        </div>
      </div>
    </div>
  );
}
