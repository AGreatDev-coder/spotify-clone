import React, { useState } from 'react';
import {
  Play,
  Pause,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
  ListMusic,
  Laptop2,
  Maximize2,
} from 'lucide-react';

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <footer className="h-20 w-full bg-black border-t border-spotify-light/20 px-4 flex items-center justify-between select-none shrink-0 z-50">
      {/* 1. Left Section: Track Info */}
      <div className="flex items-center gap-3 w-1/3 min-w-0">
        <img
          src="https://picsum.photos/id/103/100/100"
          alt="Current Track Cover"
          className="w-14 h-14 object-cover rounded shadow-md shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
            Get Lucky
          </span>
          <span className="text-xs text-spotify-gray truncate hover:text-white hover:underline cursor-pointer">
            Daft Punk
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
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
            className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Previous track"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
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

        {/* Progress Bar (Visual Mockup) */}
        <div className="w-full flex items-center gap-2 text-[10px] text-spotify-gray font-semibold">
          <span>1:45</span>
          <div className="flex-1 h-1 bg-spotify-hover rounded-full relative group cursor-pointer">
            {/* Green progress fill */}
            <div className="w-[45%] h-full bg-white group-hover:bg-spotify-green rounded-full transition-colors duration-150" />
            {/* Hover Handle knob */}
            <div className="w-3.5 h-3.5 bg-white rounded-full absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 shadow-md hidden group-hover:block" />
          </div>
          <span>3:45</span>
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
        <div className="flex items-center gap-2 group w-32">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="hover:text-white hover:scale-105 active:scale-95 transition cursor-pointer shrink-0"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          
          <div className="flex-1 h-1 bg-spotify-hover rounded-full relative group cursor-pointer">
            {/* Volume progress fill */}
            <div
              className={`h-full rounded-full transition-colors duration-150 ${
                isMuted ? 'w-0' : 'w-[70%] bg-white group-hover:bg-spotify-green'
              }`}
            />
            {/* Volume Handle knob */}
            {!isMuted && (
              <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 shadow-md hidden group-hover:block" />
            )}
          </div>
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
