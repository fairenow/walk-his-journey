import { Link, Route, Routes } from 'react-router-dom';
import JourneyList from './pages/JourneyList.jsx';
import JourneyDetail from './pages/JourneyDetail.jsx';
import WalkMode from './pages/WalkMode.jsx';
import PrayerWalk from './pages/PrayerWalk.jsx';
import Journal from './pages/Journal.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
            <span role="img" aria-label="footsteps">
              🚶
            </span>
            <span>Walk His Journey</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium text-blue-700">
            <Link to="/" className="hover:text-blue-900">
              Home
            </Link>
            <Link to="/journal" className="hover:text-blue-900">
              Journal
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Routes>
          <Route path="/" element={<JourneyList />} />
          <Route path="/journey/:id" element={<JourneyDetail />} />
          <Route path="/walk/:id" element={<WalkMode />} />
          <Route path="/prayer/:id" element={<PrayerWalk />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </main>
    </div>
  );
}
