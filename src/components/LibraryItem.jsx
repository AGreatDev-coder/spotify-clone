import React from 'react';

function LibraryItem({ item }) {
  const isArtist = item.type === 'Artist';

  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-spotify-hover/40 active:bg-spotify-hover/70 transition-all duration-200 cursor-pointer">
      {/* Thumbnail Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`w-12 h-12 shrink-0 object-cover ${
          isArtist ? 'rounded-full' : 'rounded-md'
        }`}
      />

      {/* Info labels */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-white truncate">{item.title}</h4>
        <p className="text-xs text-spotify-gray truncate">
          <span>{item.type}</span>
          <span className="mx-1.5">•</span>
          <span>{item.creator}</span>
        </p>
      </div>
    </div>
  );
}

export default LibraryItem;
