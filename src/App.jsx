import { Route, Routes } from 'react-router-dom';
import Journal from './pages/Journal.jsx';
import Layout from './components/Layout.jsx';
import WalkFeedPage from './app/walk/feed/page.tsx';
import SettingsPage from './app/settings/page.tsx';
import DiscoverPage from './app/discover/page.tsx';
import SceneDetailPage from './app/discover/[id]/page.tsx';
import HistoryPage from './app/history/page.tsx';

export default function App() {
  return (
    <Layout>
      <div className="relative animate-fadeIn">
        <Routes>
          <Route path="/" element={<WalkFeedPage />} />
          <Route path="/walk/feed" element={<WalkFeedPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/discover/:id" element={<SceneDetailPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Layout>
  );
}
