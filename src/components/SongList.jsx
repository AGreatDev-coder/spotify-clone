import React from 'react';
import { Play, Pause, Clock, Heart } from 'lucide-react';

// Helper function: Converts seconds into MM:SS format
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${paddedSeconds}`;
}

// Stateful track row component synced with global states
function SongRow({
  song,
  index,
  isActive,
  isCurrentPlaying,
  isLiked,
  onPlayClick,
  onLikeToggle,
  onViewChange,
}) {
  return (
    <div className="grid grid-cols-[24px_4fr_3fr_120px] gap-4 items-center px-4 py-2 hover:bg-white/10 rounded-md group text-sm text-spotify-gray transition duration-200 cursor-pointer">
      {/* Play/Pause Button / Track Index */}
      <div className="w-6 h-6 flex items-center justify-center relative shrink-0">
        <span
          className={`block group-hover:hidden text-xs font-semibold ${
            isActive ? 'text-spotify-green' : 'text-spotify-gray'
          }`}
        >
          {isCurrentPlaying ? (
            // Tiny equalizer style animation placeholder or simple text check
            <span className="text-spotify-green animate-pulse">▶</span>
          ) : (
            index + 1
          )}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayClick();
          }}
          className="hidden group-hover:block text-white cursor-pointer"
          aria-label={isCurrentPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-white text-white" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white text-white" />
          )}
        </button>
      </div>

      {/* Song Cover art & Titles */}
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={song.imageUrl}
          alt={song.title}
          className="w-10 h-10 rounded object-cover shrink-0 shadow-md"
        />
        <div className="flex flex-col min-w-0">
          <span
            className={`font-semibold truncate text-sm hover:underline cursor-pointer ${
              isActive ? 'text-spotify-green' : 'text-white'
            }`}
          >
            {song.title}
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              if (onViewChange) onViewChange({ type: 'artist', id: song.artistId });
            }}
            className="text-xs text-spotify-gray hover:text-white hover:underline truncate cursor-pointer"
          >
            {song.artist}
          </span>
        </div>
      </div>

      {/* Album Name Link */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          if (onViewChange) onViewChange({ type: 'album', id: song.albumId });
        }}
        className="hidden md:block truncate text-spotify-gray hover:text-white hover:underline transition duration-200 cursor-pointer"
      >
        {song.album}
      </span>

      {/* Heart Action & Song Duration */}
      <div className="flex items-center justify-end gap-4 pr-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLikeToggle(song.id);
          }}
          className={`cursor-pointer transition-all duration-200 ${
            isLiked ? 'opacity-100' : 'opacity-40 hover:opacity-100'
          }`}
          aria-label={isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isLiked
                ? 'text-spotify-green fill-spotify-green'
                : 'text-spotify-gray hover:text-white'
            }`}
          />
        </button>
        <span className="text-xs font-semibold w-10 text-right">
          {formatDuration(song.duration)}
        </span>
      </div>
    </div>
  );
}

// Refactored SongList
function SongList({
  songs,
  currentTrackId,
  isPlaying,
  onPlaySong,
  likedSongIds,
  onLikeToggle,
  onViewChange,
}) {
  return (
    <div className="w-full flex flex-col select-none">
      {/* Table Headers */}
      <div className="grid grid-cols-[24px_4fr_3fr_120px] gap-4 items-center px-4 py-2 border-b border-spotify-light/20 text-xs font-bold text-spotify-gray uppercase tracking-wider">
        <span className="text-center">#</span>
        <span>Title</span>
        <span className="hidden md:block">Album</span>
        <span className="flex justify-end pr-8">
          <Clock className="w-4 h-4" />
        </span>
      </div>

      {/* Song Rows */}
      <div className="flex flex-col gap-0.5 mt-2">
        {songs.map((song, index) => {
          const isActive = song.id === currentTrackId;
          const isCurrentPlaying = isActive && isPlaying;
          const isLiked = likedSongIds.includes(song.id);

          return (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              isActive={isActive}
              isCurrentPlaying={isCurrentPlaying}
              isLiked={isLiked}
              onPlayClick={() => onPlaySong(song)}
              onLikeToggle={onLikeToggle}
              onViewChange={onViewChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SongList;
