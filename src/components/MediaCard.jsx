import React from 'react';
import { Play } from 'lucide-react';

function MediaCard({ title, subtitle, imageUrl, id }) {
  return (
    <div className="group bg-spotify-black hover:bg-spotify-light p-4 rounded-lg transition-all duration-300 cursor-pointer flex flex-col relative w-full select-none">
      {/* Cover Image Container */}
      <div className="relative mb-4 w-full aspect-square overflow-hidden rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Floating Green Play Button Overlay */}
        <button
          type="button"
          aria-label={`Play ${title}`}
          className="absolute bottom-2 right-2 bg-spotify-green hover:bg-spotify-green-hover text-black p-3 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.3)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-black text-black" />
        </button>
      </div>

      {/* Texts info */}
      <div className="flex flex-col min-w-0">
        <h3 className="font-bold text-sm text-white mb-1 truncate">{title}</h3>
        <p className="text-xs text-spotify-gray line-clamp-2 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default MediaCard;
