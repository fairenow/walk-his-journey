import { Link } from 'react-router-dom';

export default function JourneyList() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-900 via-slate-900 to-blue-950 text-white shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.15),transparent_35%)]" />
        <div className="relative z-10 grid gap-8 p-8 sm:grid-cols-2 sm:items-center sm:gap-12 sm:p-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-blue-100/80">Journey feed</p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Walk with Jesus—one moment at a time</h1>
            <p className="max-w-xl text-lg text-blue-100/90">
              Every step can become a prayer. Slow down, listen for His presence, and let the next
              devotional moment meet you right where you are.
            </p>
            <div className="space-y-3">
              <Link
                to="/walk/feed"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Start Walking With Jesus
              </Link>
              <p className="text-sm text-blue-100/80">
                Your movement stays on your device. No accounts. No tracking outside this app.
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-black/30 backdrop-blur">
            <div className="flex items-center gap-3 text-blue-100/90">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl" aria-hidden>
                🏛️
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-blue-100/70">Begin the journey</p>
                <p className="text-base font-semibold">Follow in His footsteps</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-blue-100/80">
              Press start when you head out. As you move, the live feed will surface scenes from Jesus’
              path with prayer prompts, scripture, and reflections to guide your time.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-4 text-sm text-blue-50 shadow-inner shadow-black/40">
                <p className="font-semibold text-white">Live devotional feed</p>
                <p className="mt-1 text-blue-100/80">New moments appear as your distance grows.</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 text-sm text-blue-50 shadow-inner shadow-black/40">
                <p className="font-semibold text-white">Stay present</p>
                <p className="mt-1 text-blue-100/80">No accounts. Just you, your steps, and Jesus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
