import { Route, Routes } from 'react-router-dom';
import JourneyList from './pages/JourneyList.jsx';
import JourneyDetail from './pages/JourneyDetail.jsx';
import WalkMode from './pages/WalkMode.jsx';
import PrayerWalk from './pages/PrayerWalk.jsx';
import Journal from './pages/Journal.jsx';
import Layout from './components/Layout.jsx';
import WalkFeedPage from './app/walk/feed/page.tsx';
import SettingsPage from './app/settings/page.tsx';
import DiscoverPage from './app/discover/page.tsx';
import SceneDetailPage from './app/discover/[id]/page.tsx';

export default function App() {
  return (
    <Layout>
      <div className="relative animate-fadeIn">
        <Routes>
          <Route path="/" element={<JourneyList />} />
          <Route path="/journey/:id" element={<JourneyDetail />} />
          <Route path="/walk/:id" element={<WalkMode />} />
          <Route path="/walk/feed" element={<WalkFeedPage />} />
          <Route path="/prayer/:id" element={<PrayerWalk />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/discover/:id" element={<SceneDetailPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Layout>
  );
}
