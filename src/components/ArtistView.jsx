import React from 'react';
import { Play, Pause, Award } from 'lucide-react';
import SongList from './SongList';
import MediaCard from './MediaCard';

function ArtistView({
  artist,
  songs,
  albums,
  onPlaySong,
  likedSongIds,
  onLikeToggle,
  currentTrackId,
  isPlaying,
  onTogglePlay,
  onViewChange,
}) {
  const isCurrentArtistPlaying =
    songs.length > 0 &&
    songs.some((song) => song.id === currentTrackId) &&
    isPlaying;

  const handlePlayClick = () => {
    if (songs.length === 0) return;
    
    const isSongByArtistActive = songs.some((song) => song.id === currentTrackId);
    if (isSongByArtistActive) {
      onTogglePlay(); // Pause or Resume
    } else {
      onPlaySong(songs[0]); // Play first song of this artist
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      {/* 1. Giant Banner Header */}
      <div
        className="h-60 md:h-80 w-full rounded-lg bg-cover bg-center flex flex-col justify-end p-6 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(18,18,18,0.95)), url(${artist.bannerUrl})`,
        }}
      >
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-1 text-xs font-bold text-sky-400">
            <Award className="w-4 h-4 fill-current" />
            <span>Verified Artist</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight my-1 leading-none">
            {artist.name}
          </h1>
          <span className="text-xs text-spotify-gray font-semibold">
            {artist.followers} monthly listeners
          </span>
        </div>
      </div>

      {/* 2. Play Actions Row */}
      <div className="flex items-center gap-4 shrink-0 py-1">
        <button
          type="button"
          onClick={handlePlayClick}
          className="w-14 h-14 bg-spotify-green hover:bg-spotify-green-hover text-black flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label={isCurrentArtistPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentArtistPlaying ? (
            <Pause className="w-6 h-6 fill-black text-black" />
          ) : (
            <Play className="w-6 h-6 fill-black text-black ml-1" />
          )}
        </button>
      </div>

      {/* 3. Biography Summary */}
      <div className="bg-spotify-light/30 rounded-lg p-4 max-w-3xl">
        <h3 className="font-bold text-sm text-white mb-2">About the Artist</h3>
        <p className="text-xs text-spotify-gray leading-relaxed">{artist.bio}</p>
      </div>

      {/* 4. Popular Songs List */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-white">Popular songs</h2>
        {songs.length > 0 ? (
          <SongList
            songs={songs}
            currentTrackId={currentTrackId}
            isPlaying={isPlaying}
            onPlaySong={onPlaySong}
            likedSongIds={likedSongIds}
            onLikeToggle={onLikeToggle}
          />
        ) : (
          <div className="text-spotify-gray text-xs">No tracks found.</div>
        )}
      </div>

      {/* 5. Albums Grid Row */}
      {albums.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 text-white">Albums</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {albums.map((album) => (
              <div
                key={album.id}
                onClick={() => onViewChange({ type: 'album', id: album.id })}
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
      )}
    </div>
  );
}

export default ArtistView;
