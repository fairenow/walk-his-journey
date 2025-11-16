import { Route, Routes } from 'react-router-dom';
import JourneyList from './pages/JourneyList.jsx';
import JourneyDetail from './pages/JourneyDetail.jsx';
import WalkMode from './pages/WalkMode.jsx';
import PrayerWalk from './pages/PrayerWalk.jsx';
import Journal from './pages/Journal.jsx';
import Layout from './components/Layout.jsx';

export default function App() {
  return (
    <Layout>
      <div className="relative animate-fadeIn">
        <Routes>
          <Route path="/" element={<JourneyList />} />
          <Route path="/journey/:id" element={<JourneyDetail />} />
          <Route path="/walk/:id" element={<WalkMode />} />
          <Route path="/prayer/:id" element={<PrayerWalk />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </div>
    </Layout>
  );
}
