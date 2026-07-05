import { Clapperboard, Dice5, Sparkles } from "lucide-react";
import { useState } from "react";
import MovieCard from "../layouts/MovieCard";
import luckyPrompts from "../prompts/lukcyPrompts";

const ai_message =
  "I'm sorry to hear you're feeling down, but I'm here for you. I've selected some wonderful, heartwarming Hindi films that are perfect for lifting your spirits and bringing a little light into your day.";

const movies = [
  {
    id: 20453,
    title: "3 Idiots",
    original_title: "3 Idiots",
    vote_average: 8.002,
    poster_path: "/66A9MqXOyVFCssoloscw79z8Tew.jpg",
    release_date: "2009-12-23",
    original_language: "hi",
  },
  {
    id: 19404,
    title: "Dilwale Dulhania Le Jayenge",
    original_title: "दिलवाले दुल्हनिया ले जायेंगे",
    vote_average: 8.51,
    poster_path: "/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg",
    release_date: "1995-10-20",
    original_language: "hi",
  },
  {
    id: 297222,
    title: "PK",
    original_title: "पीके",
    vote_average: 7.7,
    poster_path: "/z2x2Y4tncefsIU7h82gmUM5vnBJ.jpg",
    release_date: "2014-12-18",
    original_language: "hi",
  },
  {
    id: 493623,
    title: "Hichki",
    original_title: "हिचकी",
    vote_average: 7.597,
    poster_path: "/awN7MPVHcubWEqfo7T5jidx3xYY.jpg",
    release_date: "2018-03-23",
    original_language: "hi",
  },
  {
    id: 360814,
    title: "Dangal",
    original_title: "दंगल",
    vote_average: 7.871,
    poster_path: "/jLiA1WW3kL1K9lYfYmVj57RD74N.jpg",
    release_date: "2016-12-21",
    original_language: "hi",
  },
  {
    id: 1464795,
    title: "Daadi Ki Shaadi",
    original_title: "दादी की शादी",
    vote_average: 9,
    poster_path: "/hKbQjE5ZcZUpuzApEjyoVCUWwdx.jpg",
    release_date: "2026-05-08",
    original_language: "hi",
  },
];

function Chat({ username, status }) {
  const [query, setQuery] = useState(
    () => localStorage.getItem("movieQuery") || ""
  );

  const [savedMessage, setSavedMessage] = useState("");

  const saveQuery = (nextQuery) => {
    const trimmedQuery = nextQuery.trim();

    if (!trimmedQuery) {
      setSavedMessage("Tell Lumos your mood first.");
      return;
    }

    localStorage.setItem("movieQuery", trimmedQuery);
    setQuery(trimmedQuery);
    setSavedMessage("Saved. Lumos knows what mood you are in.");
  };

  const handleRecommend = (e) => {
    e.preventDefault();
    saveQuery(query);
  };

  const handleFeelingLucky = () => {
    const randomPrompt =
      luckyPrompts[Math.floor(Math.random() * luckyPrompts.length)];

    localStorage.setItem("movieQuery", randomPrompt);
    setQuery(randomPrompt);
    setSavedMessage("Feeling lucky mood saved.");
  };

  return (
    <div className="min-h-screen px-6 pt-24 pb-16 text-white">
      {/* Prompt Card */}
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_0_35px_rgba(99,102,241,0.1)] backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-300/10 text-amber-200">
          <Clapperboard size={28} />
        </div>

        <p className="text-sm font-medium text-indigo-200">
          {status === "created"
            ? `Welcome, ${username}`
            : `Welcome back, ${username}`}
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          What are you in the mood for?
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Write your feeling, mood, or the kind of movie or series you want
          Lumos to find for you.
        </p>

        <form onSubmit={handleRecommend} className="mt-8">
          <textarea
            rows={5}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: I am scared and want something dark..."
            className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-5 text-white outline-none"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full border border-amber-400/50 py-3 font-semibold text-amber-200 hover:bg-indigo-600"
            >
              <Sparkles size={18} />
              Recommend
            </button>

            <button
              type="button"
              onClick={handleFeelingLucky}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 font-semibold"
            >
              <Dice5 size={18} />
              Feeling Lucky
            </button>
          </div>
        </form>

        {savedMessage && <p className="mt-5 text-amber-200">{savedMessage}</p>}
      </div>

      {/* Lumos Response */}

      <div className="mx-auto mt-14 max-w-5xl">
        <div className="rounded-3xl border border-indigo-500/20 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.12)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl shadow-lg">
              ✨
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-wide text-indigo-200">
                Lumos
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Your AI Movie Companion
              </p>
            </div>
          </div>

          <div className="mt-6 border-l-2 border-indigo-400/40 pl-6">
            <p className="text-lg leading-9 text-slate-200">{ai_message}</p>
          </div>
        </div>
      </div>

      {/* Movies */}

      <div className="mx-auto mt-10 max-w-7xl">
        <div className="grid grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
