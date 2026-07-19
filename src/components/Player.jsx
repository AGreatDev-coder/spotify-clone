import React, { useState } from 'react';
import {
  Play,
  Pause,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Heart,
  Volume1,
  Volume2,
  VolumeX,
  ListMusic,
  Laptop2,
  Maximize2,
} from 'lucide-react';

// Helper function: Converts seconds into MM:SS format
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${minutes}:${paddedSeconds}`;
}

function Player({
  currentTrack,
  isPlaying,
  onPlayToggle,
  onNextTrack,
  onPreviousTrack,
  likedSongIds,
  onLikeToggle,
  currentTime,
  setCurrentTime,
  volume,
  setVolume,
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(70);

  const duration = currentTrack ? currentTrack.duration : 0;
  const isLiked = currentTrack ? likedSongIds.includes(currentTrack.id) : false;

  // Click handler to seek through progress bar
  const handleProgressBarClick = (e) => {
    if (!currentTrack) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = Math.max(0, Math.min(duration, Math.floor(percentage * duration)));
    setCurrentTime(newTime);
  };

  // Click handler to seek through volume bar
  const handleVolumeBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newVolume = Math.max(0, Math.min(100, Math.floor(percentage * 100)));
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  // Mute toggle handler
  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  // Render Volume Icon based on current level
  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="w-5 h-5" />;
    }
    if (volume < 50) {
      return <Volume1 className="w-5 h-5" />;
    }
    return <Volume2 className="w-5 h-5" />;
  };

  // Fallback / Placeholder when no track is playing
  if (!currentTrack) {
    return (
      <footer className="h-20 w-full bg-black border-t border-spotify-light/20 px-4 flex items-center justify-center text-spotify-gray select-none shrink-0 z-50">
        <span className="text-sm font-semibold">Select a song to start playing</span>
      </footer>
    );
  }

  return (
    <footer className="h-20 w-full bg-black border-t border-spotify-light/20 px-4 flex items-center justify-between select-none shrink-0 z-50">
      {/* 1. Left Section: Track Info */}
      <div className="flex items-center gap-3 w-1/3 min-w-0">
        <img
          src={currentTrack.imageUrl}
          alt={currentTrack.title}
          className="w-14 h-14 object-cover rounded shadow-md shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
            {currentTrack.title}
          </span>
          <span className="text-xs text-spotify-gray truncate hover:text-white hover:underline cursor-pointer">
            {currentTrack.artist}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onLikeToggle(currentTrack.id)}
          className="cursor-pointer p-1 transition ml-2"
          aria-label={isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
        >
          <Heart
            className={`w-4 h-4 ${
              isLiked ? 'text-spotify-green fill-spotify-green' : 'text-spotify-gray hover:text-white'
            }`}
          />
        </button>
      </div>

      {/* 2. Center Section: Playback Controls & Progress */}
      <div className="flex flex-col items-center gap-2 w-1/3 min-w-[300px]">
        {/* Playback Buttons */}
        <div className="flex items-center gap-5 text-spotify-gray">
          <button
            type="button"
            className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onPreviousTrack}
            className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Previous track"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            type="button"
            onClick={onPlayToggle}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer shadow-md"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-black text-black" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={onNextTrack}
            className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Next track"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button
            type="button"
            className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Repeat"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar (Interactive seek bar) */}
        <div className="w-full flex items-center gap-2 text-[10px] text-spotify-gray font-semibold">
          <span className="w-7 text-right">{formatDuration(currentTime)}</span>
          <button
            type="button"
            onClick={handleProgressBarClick}
            className="flex-1 h-1 bg-spotify-hover rounded-full relative group cursor-pointer text-left"
            aria-label="Seek timeline"
          >
            {/* Green progress fill */}
            <div
              style={{ width: `${(currentTime / duration) * 100}%` }}
              className="h-full bg-white group-hover:bg-spotify-green rounded-full transition-all duration-100"
            />
            {/* Hover Handle knob */}
            <div
              style={{ left: `${(currentTime / duration) * 100}%` }}
              className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md hidden group-hover:block"
            />
          </button>
          <span className="w-7 text-left">{formatDuration(duration)}</span>
        </div>
      </div>

      {/* 3. Right Section: Volume & Utilities */}
      <div className="flex items-center justify-end gap-3 w-1/3 text-spotify-gray">
        <button
          type="button"
          className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
          aria-label="Queue"
        >
          <ListMusic className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
          aria-label="Connect to a device"
        >
          <Laptop2 className="w-5 h-5" />
        </button>
        
        {/* Volume controls */}
        <div className="flex items-center gap-2 w-32">
          <button
            type="button"
            onClick={handleMuteToggle}
            className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer shrink-0"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {renderVolumeIcon()}
          </button>
          
          <button
            type="button"
            onClick={handleVolumeBarClick}
            className="flex-1 h-1 bg-spotify-hover rounded-full relative group cursor-pointer text-left"
            aria-label="Adjust volume"
          >
            {/* Volume progress fill */}
            <div
              style={{ width: `${volume}%` }}
              className="h-full bg-white group-hover:bg-spotify-green rounded-full transition-all duration-100"
            />
            {/* Volume Handle knob */}
            {volume > 0 && (
              <div
                style={{ left: `${volume}%` }}
                className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md hidden group-hover:block"
              />
            )}
          </button>
        </div>

        <button
          type="button"
          className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
          aria-label="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}

export default Player;
