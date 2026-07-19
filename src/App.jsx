import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { mockPlaylists, mockAlbums } from './data/mockData';
import MediaCard from './components/MediaCard';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Upper section: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden p-2 gap-2">
        {/* Sidebar Container */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col bg-spotify-black rounded-lg overflow-hidden relative">
          {/* Navbar Header */}
          <Navbar />
          
          {/* Scrollable Page Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'home' ? (
              <div className="flex flex-col gap-8">
                <div>
                  <h1 className="text-3xl font-bold mb-1">Welcome to Spotify</h1>
                  <p className="text-spotify-gray text-sm">We are building this step by step!</p>
                </div>

                {/* Playlists Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-white">Made for you</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {mockPlaylists.map((playlist) => (
                      <MediaCard
                        key={playlist.id}
                        id={playlist.id}
                        title={playlist.title}
                        subtitle={playlist.description}
                        imageUrl={playlist.imageUrl}
                      />
                    ))}
                  </div>
                </div>

                {/* Albums Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-white">Popular albums</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {mockAlbums.map((album) => (
                      <MediaCard
                        key={album.id}
                        id={album.id}
                        title={album.title}
                        subtitle={`${album.artist} • ${album.year}`}
                        imageUrl={album.imageUrl}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold mb-4">Search</h1>
                <p className="text-spotify-gray">Search page placeholder. Soon we'll add search capability here!</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Playback Bar (Footer) */}
      <footer className="h-20 bg-black flex items-center px-4 border-t border-spotify-light/20">
        <p className="text-spotify-gray">Player Placeholder</p>
      </footer>
    </div>
  );
}

export default App;
