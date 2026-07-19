import React, { useState } from 'react';
import { Home, Search, Library, Plus, ArrowRight, X } from 'lucide-react';
import { mockLibrary } from '../data/mockData';
import LibraryItem from './LibraryItem';

function Sidebar({ activeTab, setActiveTab }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter) => {
    // If the clicked filter is already active, reset it to 'all'
    setActiveFilter(activeFilter === filter ? 'all' : filter);
  };

  const filteredLibrary = mockLibrary.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type.toLowerCase() === activeFilter;
  });

  return (
    <aside className="w-[300px] h-full flex flex-col gap-2 shrink-0">
      {/* Upper Panel: Main Navigation */}
      <div className="bg-spotify-black rounded-lg p-5 flex flex-col gap-4">
        {/* Home Button */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex items-center gap-4 w-full cursor-pointer transition-colors duration-200 text-left ${
            activeTab === 'home' ? 'text-white' : 'text-spotify-gray hover:text-white'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="font-bold text-sm">Home</span>
        </button>

        {/* Search Button */}
        <button
          type="button"
          onClick={() => setActiveTab('search')}
          className={`flex items-center gap-4 w-full cursor-pointer transition-colors duration-200 text-left ${
            activeTab === 'search' ? 'text-white' : 'text-spotify-gray hover:text-white'
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="font-bold text-sm">Search</span>
        </button>
      </div>

      {/* Lower Panel: Library Shelf */}
      <div className="flex-1 bg-spotify-black rounded-lg p-5 flex flex-col gap-4 overflow-hidden">
        {/* Library Header */}
        <div className="flex items-center justify-between text-spotify-gray shrink-0">
          <div className="flex items-center gap-3 hover:text-white transition-colors duration-200 cursor-pointer">
            <Library className="w-6 h-6" />
            <span className="font-bold text-sm">Your Library</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Create playlist or folder"
              className="hover:text-white hover:bg-spotify-light p-1.5 rounded-full transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Show more"
              className="hover:text-white hover:bg-spotify-light p-1.5 rounded-full transition-all duration-200 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills Toolbar */}
        <div className="flex items-center gap-2 shrink-0 pb-1 overflow-x-auto scrollbar-none">
          {activeFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="bg-spotify-light hover:bg-spotify-hover text-white p-1 rounded-full cursor-pointer transition duration-200"
              aria-label="Clear filter"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => handleFilterClick('playlist')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
              activeFilter === 'playlist'
                ? 'bg-white text-black'
                : 'bg-spotify-light text-white hover:bg-spotify-hover'
            }`}
          >
            Playlists
          </button>

          <button
            type="button"
            onClick={() => handleFilterClick('artist')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
              activeFilter === 'artist'
                ? 'bg-white text-black'
                : 'bg-spotify-light text-white hover:bg-spotify-hover'
            }`}
          >
            Artists
          </button>

          <button
            type="button"
            onClick={() => handleFilterClick('album')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 ${
              activeFilter === 'album'
                ? 'bg-white text-black'
                : 'bg-spotify-light text-white hover:bg-spotify-hover'
            }`}
          >
            Albums
          </button>
        </div>

        {/* Scrollable Library Cards Box */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1">
          {activeFilter === 'all' && (
            <>
              {/* Card 1: Create Playlist */}
              <div className="bg-spotify-light rounded-lg p-4 flex flex-col gap-3 shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">Create your first playlist</h3>
                  <p className="text-xs text-spotify-gray">It's easy, we'll help you</p>
                </div>
                <button
                  type="button"
                  className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full w-fit hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Create playlist
                </button>
              </div>

              {/* Card 2: "Browse podcasts" */}
              <div className="bg-spotify-light rounded-lg p-4 flex flex-col gap-3 shrink-0">
                <div>
                  <h3 className="font-bold text-sm text-white mb-1">Let's find some podcasts to follow</h3>
                  <p className="text-xs text-spotify-gray">We'll keep you updated on new episodes</p>
                </div>
                <button
                  type="button"
                  className="bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full w-fit hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Browse podcasts
                </button>
              </div>
            </>
          )}

          {/* Dynamic Library Shelf List */}
          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-spotify-light/20">
            {filteredLibrary.map((item) => (
              <LibraryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;