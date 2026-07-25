import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 bg-white/85 backdrop-blur shadow-sm sm:px-6 sm:py-4">
      <div className="flex items-center gap-3">
        <img
          src="/jesus_walk.png"
          alt="Walk His Journey logo"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-base font-semibold tracking-tight sm:text-lg">Walk His Journey</span>
      </div>
      <nav className="flex items-center gap-4 text-sm text-gray-600 sm:gap-6">
        <Link to="/" className="hover:text-black">
          Walk
        </Link>
        <Link to="/discover" className="hidden hover:text-black sm:block">
          Discover
        </Link>
        <Link to="/journal" className="hidden hover:text-black sm:block">
          Journal
        </Link>
        <Link to="/settings" className="hover:text-black">
          Settings
        </Link>
      </nav>
    </header>
  );
}
