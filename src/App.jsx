import { Link, Route, Routes } from 'react-router-dom';
import JourneyList from './pages/JourneyList.jsx';
import JourneyDetail from './pages/JourneyDetail.jsx';
import WalkMode from './pages/WalkMode.jsx';
import PrayerWalk from './pages/PrayerWalk.jsx';
import Journal from './pages/Journal.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight">
            <span className="text-3xl" role="img" aria-label="footsteps">
              👣
            </span>
            <span>Walk His Journey</span>
          </Link>

          <nav className="flex gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-black">
              Home
            </Link>
            <Link to="/journal" className="hover:text-black">
              Journal
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 py-8">
        <div className="absolute inset-0 bg-[url('/map-texture.png')] opacity-10 pointer-events-none" aria-hidden="true"></div>
        <div className="relative z-10 animate-fadeIn">
          <Routes>
            <Route path="/" element={<JourneyList />} />
            <Route path="/journey/:id" element={<JourneyDetail />} />
            <Route path="/walk/:id" element={<WalkMode />} />
            <Route path="/prayer/:id" element={<PrayerWalk />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
