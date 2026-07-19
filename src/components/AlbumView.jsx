import React from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import SongList from './SongList';

function AlbumView({
  collection,
  songs,
  onPlaySong,
  likedSongIds,
  onLikeToggle,
  currentTrackId,
  isPlaying,
  onTogglePlay,
  onViewChange,
}) {
  const isCurrentCollectionPlaying =
    songs.length > 0 &&
    songs.some((song) => song.id === currentTrackId) &&
    isPlaying;

  const handlePlayClick = () => {
    if (songs.length === 0) return;
    
    const isSongInCollectionActive = songs.some((song) => song.id === currentTrackId);
    if (isSongInCollectionActive) {
      onTogglePlay(); // Pause or Resume
    } else {
      onPlaySong(songs[0]); // Start playing first song of this collection
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none animate-fadeIn">
      {/* 1. Header Hero Panel */}
      <div className="flex flex-col md:flex-row items-end gap-6 pb-2">
        <img
          src={collection.imageUrl}
          alt={collection.title}
          className="w-48 h-48 md:w-56 md:h-56 object-cover rounded shadow-[0_12px_40px_rgba(0,0,0,0.6)] shrink-0 self-center md:self-auto"
        />
        <div className="flex flex-col min-w-0 text-center md:text-left w-full">
          <span className="text-xs font-bold text-white uppercase tracking-wider hidden md:inline">
            {collection.songIds ? 'Playlist' : 'Album'}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight my-2 line-clamp-2 leading-none">
            {collection.title}
          </h1>
          <div className="text-xs font-semibold text-spotify-gray flex flex-wrap items-center justify-center md:justify-start gap-1">
            {collection.artist && (
              <>
                <span
                  onClick={() => onViewChange({ type: 'artist', id: collection.artistId })}
                  className="text-white hover:underline cursor-pointer font-bold"
                >
                  {collection.artist}
                </span>
                <span>•</span>
              </>
            )}
            {collection.year && (
              <>
                <span>{collection.year}</span>
                <span>•</span>
              </>
            )}
            <span className="text-white">{songs.length} songs</span>
          </div>
        </div>
      </div>

      {/* 2. Play Actions Row */}
      <div className="flex items-center gap-4 shrink-0 py-2">
        <button
          type="button"
          onClick={handlePlayClick}
          className="w-14 h-14 bg-spotify-green hover:bg-spotify-green-hover text-black flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label={isCurrentCollectionPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentCollectionPlaying ? (
            <Pause className="w-6 h-6 fill-black text-black" />
          ) : (
            <Play className="w-6 h-6 fill-black text-black ml-1" />
          )}
        </button>
      </div>

      {/* 3. Song Table */}
      <div className="mt-2">
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
          <div className="text-center py-10 text-spotify-gray text-sm">
            No songs in this collection.
          </div>
        )}
      </div>
    </div>
  );
}

export default AlbumView;
