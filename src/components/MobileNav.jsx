import React from 'react';
import { Home, Search, Heart } from 'lucide-react';

function MobileNav({ currentView, onViewChange }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-black/95 backdrop-blur-md border-t border-spotify-light/10 flex items-center justify-around text-spotify-gray z-50 px-6">
      <button
        type="button"
        onClick={() => onViewChange({ type: 'home' })}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200 ${
          currentView.type === 'home' ? 'text-white font-semibold' : 'hover:text-white'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[9px]">Home</span>
      </button>

      <button
        type="button"
        onClick={() => onViewChange({ type: 'search' })}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200 ${
          currentView.type === 'search' ? 'text-white font-semibold' : 'hover:text-white'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[9px]">Search</span>
      </button>

      <button
        type="button"
        onClick={() => onViewChange({ type: 'liked' })}
        className={`flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200 ${
          currentView.type === 'liked' ? 'text-spotify-green font-semibold' : 'hover:text-white'
        }`}
      >
        <Heart className="w-5 h-5" />
        <span className="text-[9px]">Liked</span>
      </button>
    </div>
  );
}

export default MobileNav;
