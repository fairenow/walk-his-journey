import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Walk', end: true },
  { to: '/history', label: 'History' },
  { to: '/discover', label: 'Discover' },
  { to: '/journal', label: 'Journal' },
  { to: '/settings', label: 'Settings' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMenuOpen]);

  const linkClassName = ({ isActive }) =>
    `transition hover:text-slate-950 ${isActive ? 'font-semibold text-slate-950' : 'text-slate-600'}`;

  return (
    <header className="relative z-40 flex items-center justify-between gap-4 bg-white/85 px-4 py-3 shadow-sm backdrop-blur sm:px-6 sm:py-4">
      <Link to="/" className="flex items-center gap-3 hover:no-underline">
        <img
          src="/jesus_walk.png"
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-base font-semibold tracking-tight sm:text-lg">Walk His Journey</span>
      </Link>

      <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm sm:flex">
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClassName}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div ref={menuRef} className="sm:hidden">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {isMenuOpen ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        {isMenuOpen ? (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute left-3 right-3 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/20"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-base font-semibold transition hover:bg-slate-100 hover:no-underline ${
                    isActive ? 'bg-blue-50 text-blue-900' : 'text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
