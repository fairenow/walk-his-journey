import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label="footsteps">
          👣
        </span>
        <span className="text-lg font-semibold tracking-tight">Walk His Journey</span>
      </div>
      <nav className="flex items-center gap-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-black">
          Walk
        </Link>
        <Link to="/discover" className="hover:text-black">
          Discover
        </Link>
        <Link to="/journal" className="hover:text-black">
          Journal
        </Link>
        <Link to="/settings" className="hover:text-black">
          Settings
        </Link>
      </nav>
    </header>
  );
}
