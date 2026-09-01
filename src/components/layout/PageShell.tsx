import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollManager } from './ScrollManager';

export function PageShell() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollManager />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
