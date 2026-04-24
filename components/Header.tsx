"use client";
import Link from 'next/link';
import { Calendar, QrCode } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#030712]/60 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
             <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">NexEvent</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="text-foreground transition-colors">Feed</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Organizer Dashboard</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-white">
            <QrCode className="w-4 h-4" />
            Scan QR
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
