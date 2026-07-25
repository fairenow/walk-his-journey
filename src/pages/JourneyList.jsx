import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOCATION_PERMISSION_KEY = 'whj_tracking_allowed_v1';

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export default function JourneyList() {
  const navigate = useNavigate();
  const [locationReady, setLocationReady] = useState(
    () => localStorage.getItem(LOCATION_PERMISSION_KEY) === 'true'
  );
  const [isRequesting, setIsRequesting] = useState(false);
  const [locationError, setLocationError] = useState('');

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationError('Location isn’t available in this browser.');
      return;
    }

    setIsRequesting(true);
    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      () => {
        localStorage.setItem(LOCATION_PERMISSION_KEY, 'true');
        setLocationReady(true);
        setIsRequesting(false);
      },
      () => {
        localStorage.removeItem(LOCATION_PERMISSION_KEY);
        setLocationReady(false);
        setIsRequesting(false);
        setLocationError('Turn on location access to begin your walk.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const startWalk = () => navigate('/walk/feed', { state: { startWalking: true } });

  return (
    <section className="app-panel min-h-[calc(100dvh-8.5rem)] sm:min-h-[700px]">
      <div className="app-panel-backdrop" />
      <div className="absolute -right-16 top-24 h-72 w-72 rounded-full border border-white/5" />
      <div className="absolute -left-24 top-40 h-80 w-80 rounded-full border border-white/5" />

      <div className="app-panel-content flex min-h-[calc(100dvh-8.5rem)] flex-col items-center px-6 pb-8 pt-12 text-center sm:min-h-[700px] sm:px-12 sm:pt-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-100/30 bg-blue-100/10 shadow-lg shadow-black/10">
          <span className="text-2xl" aria-hidden="true">✦</span>
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-blue-100/80">A guided prayer walk</p>
        <h1 className="mt-3 max-w-xl font-serif text-5xl leading-[0.98] tracking-tight text-white sm:text-7xl">
          Walk with <span className="italic text-blue-200">Jesus</span>
        </h1>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-blue-100/75 sm:text-lg">
          Take a walk. Receive scripture and quiet prompts along the way.
        </p>

        <div className="mt-auto w-full max-w-md pt-12">
          {!locationReady ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-5 text-left backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
                  <LocationIcon />
                </span>
                <div>
                  <h2 className="font-semibold text-white">Share your location</h2>
                  <p className="mt-1 text-sm leading-relaxed text-blue-100/65">
                    Your movement unlocks moments as you walk. Location stays on this device.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={requestLocation}
                disabled={isRequesting}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-300/60 bg-emerald-400/90 px-6 py-4 text-base font-bold text-emerald-950 shadow-lg transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-wait disabled:opacity-70"
              >
                <LocationIcon />
                {isRequesting ? 'Checking location…' : 'Allow location'}
              </button>
              {locationError ? <p className="mt-3 text-center text-sm text-red-100" role="alert">{locationError}</p> : null}
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-blue-100/75">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
                Location ready
              </div>
              <button
                type="button"
                onClick={startWalk}
                className="group flex w-full items-center justify-center gap-3 rounded-[1.5rem] border border-emerald-300/60 bg-emerald-400/90 px-8 py-6 text-xl font-extrabold tracking-[0.14em] text-emerald-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                START WALK
                <span className="text-2xl transition group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
            </div>
          )}
          <p className="mt-6 text-xs text-blue-100/45">Walk safely and stay aware of your surroundings.</p>
        </div>
      </div>
    </section>
  );
}
