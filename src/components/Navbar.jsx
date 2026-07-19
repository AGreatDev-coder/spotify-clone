import React from 'react';
import { Bell,ChevronLeft, ChevronRight, Download, User } from 'lucide-react';

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-spotify-black/60 backdrop-blur-md px-6 py-3 sticky top-0 z-50">
      {/* Left Navigation Arrows */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Go back"
          disabled
          className="w-8 h-8 rounded-full bg-black/70 text-spotify-gray flex items-center justify-center cursor-not-allowed opacity-60"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Go forward"
          disabled
          className="w-8 h-8 rounded-full bg-black/70 text-spotify-gray flex items-center justify-center cursor-not-allowed opacity-60"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right User Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Explore Premium Button */}
        <button
          type="button"
          className="hidden md:block bg-white text-black font-bold text-sm px-4 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          Explore Premium
        </button>

        {/* Install App Button */}
        <button
          type="button"
          className="bg-black text-white font-bold text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5 hover:scale-105 hover:bg-spotify-hover active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Install App</span>
        </button>

        {/* Bell Icon (Notification Bell) */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-8 h-8 rounded-full bg-black text-spotify-gray flex items-center justify-center hover:scale-105 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          {/* Green dot badge positioned relative to this button */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-spotify-green rounded-full"></span>
        </button>

        {/* Profile Avatar Button */}
        <button
          type="button"
          aria-label="User Profile"
          className="w-8 h-8 rounded-full bg-black text-spotify-gray flex items-center justify-center hover:scale-105 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;