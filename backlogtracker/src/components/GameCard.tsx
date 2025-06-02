'use client';
// components/GameCard.tsx
import React from "react";

type GameCardProps = {
  title: string;
  coverUrl: string;
  description?: string;
  genres?: string[];
  status?: string; // e.g. "Playing", "Completed", etc.
};

export default function GameCard({
  title,
  coverUrl,
  description,
  genres = [],
  status,
}: GameCardProps) {
  return (
    <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Cover Art */}
      <img
        src={coverUrl}
        alt={title}
        className="w-24 h-32 sm:w-32 sm:h-40 object-cover"
      />

      {/* Info Section */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-600">
          {status && (
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {status}
            </span>
          )}
          {genres.map((genre) => (
            <span
              key={genre}
              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
