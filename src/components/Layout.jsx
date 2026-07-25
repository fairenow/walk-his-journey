import Header from './Header.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-3 py-3 sm:px-6 sm:py-8 w-full">
        {children}
      </main>
    </div>
  );
}
