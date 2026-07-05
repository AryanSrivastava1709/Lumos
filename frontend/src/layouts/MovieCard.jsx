import { Calendar, Languages, Star } from "lucide-react";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const {
    title,
    original_title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  } = movie;

  const posterUrl = poster_path ? `${TMDB_IMAGE_BASE_URL}${poster_path}` : null;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : "N/A";

  const fiveStarRating =
    typeof vote_average === "number" ? (vote_average / 2).toFixed(1) : "N/A";

  const roundedStars =
    typeof vote_average === "number" ? Math.round(vote_average / 2) : 0;

  return (
    <article className="group w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            No Poster
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-amber-300">
          <Star size={12} fill="currentColor" />
          {fiveStarRating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="line-clamp-2 text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mt-1 line-clamp-1 text-sm text-slate-400">
          {original_title}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {releaseYear}
          </span>

          <span className="flex items-center gap-1">
            <Languages size={13} />
            {original_language?.toUpperCase()}
          </span>
        </div>

        <div className="mt-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={14}
              fill={index < roundedStars ? "currentColor" : "none"}
              className={
                index < roundedStars ? "text-amber-300" : "text-slate-600"
              }
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
