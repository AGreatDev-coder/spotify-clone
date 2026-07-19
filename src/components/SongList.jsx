import React, { useState } from 'react';
import { Play, Clock, Heart } from 'lucide-react';

// Helper function: Converts seconds into MM:SS format
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${paddedSeconds}`;
}

// 1. Child Row Component: Manages its own local 'isLiked' state
function SongRow({ song, index }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="grid grid-cols-[24px_4fr_3fr_120px] gap-4 items-center px-4 py-2 hover:bg-white/10 rounded-md group text-sm text-spotify-gray transition duration-200 cursor-pointer">
      {/* Play Button / Track Index */}
      <div className="w-6 h-6 flex items-center justify-center relative shrink-0">
        <span className="block group-hover:hidden text-xs text-spotify-gray font-semibold">
          {index + 1}
        </span>
        <button
          type="button"
          aria-label={`Play ${song.title}`}
          className="hidden group-hover:block text-white cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white text-white" />
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
          <span className="font-semibold text-white truncate text-sm">
            {song.title}
          </span>
          <span className="text-xs text-spotify-gray group-hover:text-white/70 truncate">
            {song.artist}
          </span>
        </div>
      </div>

      {/* Album Name */}
      <span className="hidden md:block truncate text-spotify-gray group-hover:text-white transition duration-200">
        {song.album}
      </span>

      {/* Heart Action & Song Duration */}
      <div className="flex items-center justify-end gap-4 pr-4">
        {/* Heart button: stays visible if liked, otherwise fades in on row hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevents click event from triggering playing state on the row
            setIsLiked(!isLiked);
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

// 2. Main List Component
function SongList({ songs }) {
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
        {songs.map((song, index) => (
          <SongRow key={song.id} song={song} index={index} />
        ))}
      </div>
    </div>
  );
}

export default SongList;
