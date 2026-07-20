import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MobileNav from './components/MobileNav';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import MediaCard from './components/MediaCard';
import SongList from './components/SongList';
import { Search as SearchIcon, Heart, Play, Pause } from 'lucide-react';
import { mockPlaylists, mockAlbums, mockSongs, mockArtists } from './data/mockData';

function App() {
  // Navigation View Router state
  // Types: 'home', 'search', 'liked', 'album', 'playlist', 'artist'
  const [view, setView] = useState({ type: 'home', id: null });

  // Search Input state
  const [searchQuery, setSearchQuery] = useState('');

  // Global Playback states
  const [currentTrack, setCurrentTrack] = useState(mockSongs[0]); // Default to first track
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [likedSongIds, setLikedSongIds] = useState(['song-1', 'song-3']); // Pre-liked items

  // HTML5 Audio Reference
  const audioRef = useRef(null);

  // Play / Pause HTML5 Audio Syncing
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Audio playback prevented or interrupted:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Volume Syncing
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle native audio time update event
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  // Handle track ending
  const handleAudioEnded = () => {
    handleNextTrack();
  };

  // Custom Seek Handler (passed to Player component)
  const handleSeekTime = (newTime) => {
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Playback Control Handlers
  const handlePlaySong = (song) => {
    if (currentTrack?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(song);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handlePlayToggle = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const handleLikeToggle = (songId) => {
    setLikedSongIds((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const handleNextTrack = () => {
    const currentIndex = mockSongs.findIndex((s) => s.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockSongs.length;
    handlePlaySong(mockSongs[nextIndex]);
  };

  const handlePreviousTrack = () => {
    const currentIndex = mockSongs.findIndex((s) => s.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + mockSongs.length) % mockSongs.length;
    handlePlaySong(mockSongs[prevIndex]);
  };

  // Search filter matches
  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render View helper
  const renderCurrentView = () => {
    switch (view.type) {
      case 'home':
        return (
          <div className="flex flex-col gap-8 pb-10">
            {/* Greeting */}
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome to Spotify</h1>
              <p className="text-spotify-gray text-sm">Real audio playback is active! Click play on any song.</p>
            </div>

            {/* Playlists section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Made for you</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {mockPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => setView({ type: 'playlist', id: playlist.id })}
                  >
                    <MediaCard
                      id={playlist.id}
                      title={playlist.title}
                      subtitle={playlist.description}
                      imageUrl={playlist.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Albums section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Popular albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {mockAlbums.map((album) => (
                  <div
                    key={album.id}
                    onClick={() => setView({ type: 'album', id: album.id })}
                  >
                    <MediaCard
                      id={album.id}
                      title={album.title}
                      subtitle={`${album.artist} • ${album.year}`}
                      imageUrl={album.imageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Song list section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Trending tracks</h2>
              <SongList
                songs={mockSongs}
                currentTrackId={currentTrack?.id}
                isPlaying={isPlaying}
                onPlaySong={handlePlaySong}
                likedSongIds={likedSongIds}
                onLikeToggle={handleLikeToggle}
                onViewChange={setView}
              />
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="flex flex-col gap-6 pb-10 animate-fadeIn">
            {/* Search Input bar */}
            <div className="relative w-full max-w-md shrink-0">
              <SearchIcon className="w-5 h-5 text-spotify-gray absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="What do you want to play?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] text-white text-sm pl-12 pr-4 py-3 rounded-full outline-none border border-transparent focus:border-white/20 transition-all duration-200"
              />
            </div>

            {searchQuery === '' ? (
              // Default categories grid
              <div>
                <h2 className="text-xl font-bold mb-4 text-white">Browse all</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {[
                    { title: 'Podcasts', bg: 'bg-[#27856A]' },
                    { title: 'New Releases', bg: 'bg-[#1E3264]' },
                    { title: 'Pop', bg: 'bg-[#E1306C]' },
                    { title: 'Lofi', bg: 'bg-[#503750]' },
                    { title: 'Chill', bg: 'bg-[#F59B23]' },
                    { title: 'Hip-Hop', bg: 'bg-[#BC5900]' },
                  ].map((cat, i) => (
                    <div
                      key={i}
                      className={`${cat.bg} aspect-square rounded-lg p-4 font-bold text-lg cursor-pointer hover:scale-105 active:scale-95 transition duration-200 relative overflow-hidden`}
                    >
                      <span>{cat.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Filtered list search results
              <div className="flex flex-col gap-6">
                {filteredSongs.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-white">Songs matching query</h2>
                    <SongList
                      songs={filteredSongs}
                      currentTrackId={currentTrack?.id}
                      isPlaying={isPlaying}
                      onPlaySong={handlePlaySong}
                      likedSongIds={likedSongIds}
                      onLikeToggle={handleLikeToggle}
                      onViewChange={setView}
                    />
                  </div>
                ) : (
                  <div className="text-spotify-gray text-sm py-10 text-center">
                    No matching results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'liked':
        const likedSongs = mockSongs.filter((song) => likedSongIds.includes(song.id));
        const isLikedPlaylistPlaying =
          likedSongs.length > 0 &&
          likedSongs.some((song) => song.id === currentTrack?.id) &&
          isPlaying;

        return (
          <div className="flex flex-col gap-6 pb-10 animate-fadeIn">
            {/* Header banner */}
            <div className="flex flex-col md:flex-row items-end gap-6 pb-2 bg-gradient-to-t from-spotify-black to-purple-900/40 p-6 rounded-lg">
              <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 rounded flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.6)] shrink-0 self-center md:self-auto">
                <Heart className="w-24 h-24 text-white fill-white animate-pulse" />
              </div>
              <div className="flex flex-col text-center md:text-left">
                <span className="text-xs font-bold text-white uppercase tracking-wider hidden md:inline">
                  Playlist
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight my-2 leading-none">
                  Liked Songs
                </h1>
                <span className="text-xs font-semibold text-spotify-gray">
                  <span className="text-white font-bold">You</span> • {likedSongs.length} songs
                </span>
              </div>
            </div>

            {/* Play actions */}
            {likedSongs.length > 0 && (
              <div className="flex items-center gap-4 py-1">
                <button
                  type="button"
                  onClick={() => {
                    const isSongLikedActive = likedSongs.some((s) => s.id === currentTrack?.id);
                    if (isSongLikedActive) {
                      setIsPlaying(!isPlaying);
                    } else {
                      handlePlaySong(likedSongs[0]);
                    }
                  }}
                  className="w-14 h-14 bg-spotify-green hover:bg-spotify-green-hover text-black flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  {isLikedPlaylistPlaying ? (
                    <Pause className="w-6 h-6 fill-black text-black" />
                  ) : (
                    <Play className="w-6 h-6 fill-black text-black ml-1" />
                  )}
                </button>
              </div>
            )}

            {/* Tracks */}
            <div>
              {likedSongs.length > 0 ? (
                <SongList
                  songs={likedSongs}
                  currentTrackId={currentTrack?.id}
                  isPlaying={isPlaying}
                  onPlaySong={handlePlaySong}
                  likedSongIds={likedSongIds}
                  onLikeToggle={handleLikeToggle}
                  onViewChange={setView}
                />
              ) : (
                <div className="text-center py-20 text-spotify-gray">
                  <Heart className="w-12 h-12 text-spotify-light mx-auto mb-4" />
                  <p className="font-semibold text-white mb-1">Songs you like will appear here</p>
                  <p className="text-xs">Save songs by clicking the heart icon.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'album':
        const activeAlbum = mockAlbums.find((a) => a.id === view.id);
        const albumSongs = mockSongs.filter((s) => s.albumId === view.id);
        return (
          <AlbumView
            collection={activeAlbum}
            songs={albumSongs}
            currentTrackId={currentTrack?.id}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            likedSongIds={likedSongIds}
            onLikeToggle={handleLikeToggle}
            onTogglePlay={handlePlayToggle}
            onViewChange={setView}
          />
        );

      case 'playlist':
        const activePlaylist = mockPlaylists.find((p) => p.id === view.id);
        const playlistSongs = mockSongs.filter((s) => activePlaylist?.songIds.includes(s.id));
        return (
          <AlbumView
            collection={activePlaylist}
            songs={playlistSongs}
            currentTrackId={currentTrack?.id}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            likedSongIds={likedSongIds}
            onLikeToggle={handleLikeToggle}
            onTogglePlay={handlePlayToggle}
            onViewChange={setView}
          />
        );

      case 'artist':
        const activeArtist = mockArtists.find((a) => a.id === view.id);
        const artistSongs = mockSongs.filter((s) => s.artistId === view.id);
        const artistAlbums = mockAlbums.filter((a) => a.artistId === view.id);
        return (
          <ArtistView
            artist={activeArtist}
            songs={artistSongs}
            albums={artistAlbums}
            currentTrackId={currentTrack?.id}
            isPlaying={isPlaying}
            onPlaySong={handlePlaySong}
            likedSongIds={likedSongIds}
            onLikeToggle={handleLikeToggle}
            onTogglePlay={handlePlayToggle}
            onViewChange={setView}
          />
        );

      default:
        return <div>View not found.</div>;
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden relative pb-14 md:pb-0">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Upper section: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden p-2 gap-2">
        {/* Persistent Desktop Sidebar */}
        <Sidebar currentView={view} onViewChange={setView} />

        {/* Main View Area */}
        <main className="flex-1 flex flex-col bg-spotify-black rounded-lg overflow-hidden relative">
          {/* Top Navbar */}
          <Navbar />

          {/* Dynamic Scrollable Page Content Router */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderCurrentView()}
          </div>
        </main>
      </div>

      {/* Bottom Media Bar */}
      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        onNextTrack={handleNextTrack}
        onPreviousTrack={handlePreviousTrack}
        likedSongIds={likedSongIds}
        onLikeToggle={handleLikeToggle}
        currentTime={currentTime}
        setCurrentTime={handleSeekTime}
        volume={volume}
        setVolume={setVolume}
      />

      {/* Mobile navigation floating bar */}
      <MobileNav currentView={view} onViewChange={setView} />
    </div>
  );
}

export default App;
