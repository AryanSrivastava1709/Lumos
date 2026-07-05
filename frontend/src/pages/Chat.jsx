import { Clapperboard, Dice5, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MovieCard from "../layouts/MovieCard";
import luckyPrompts from "../prompts/lukcyPrompts";
import chatWithLumos from "../services/chatService";

// --- Typewriter effect for the AI message ---
// `skipAnimation` renders the full text instantly (used for content
// restored from localStorage on page load/refresh).
function TypewriterText({ text, speed = 18, skipAnimation, onComplete }) {
  const [displayed, setDisplayed] = useState(skipAnimation ? text : "");
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (skipAnimation) {
      setDisplayed(text);
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
      return;
    }

    setDisplayed("");
    hasCompletedRef.current = false;
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        hasCompletedRef.current = true;
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, skipAnimation]);

  return (
    <p className="text-base sm:text-lg leading-8 sm:leading-9 text-slate-200">
      {displayed}
      {displayed.length < text.length && (
        <span className="ml-0.5 inline-block w-2 animate-pulse text-indigo-300">
          |
        </span>
      )}
    </p>
  );
}

// --- Heading + grid wrapper, sequenced with a shared stagger timeline ---
// delayChildren pushes the grid's stagger start slightly after the
// heading has faded in, so the two feel like one fluid sequence
// instead of two separate pops.
const sectionVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function RecommendedMovies({ movies }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="show"
      className="mt-10"
    >
      <motion.h3
        variants={headingVariants}
        className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
      >
        Recommended Movies
      </motion.h3>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4">
        {movies.map((movie) => (
          <motion.div key={movie.id} variants={cardVariants}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Chat({ username, status }) {
  const [query, setQuery] = useState(
    () => localStorage.getItem("movieQuery") || ""
  );
  const [aiMessage, setAiMessage] = useState(
    () => localStorage.getItem("aiMessage") || ""
  );
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem("movies");
    return stored ? JSON.parse(stored) : [];
  });

  const [savedMessage, setSavedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // True only right after a fresh API response — controls whether the
  // typewriter animates or just snaps to full text.
  const [isFreshResponse, setIsFreshResponse] = useState(false);
  // Whether the typewriter has finished, gating the movie grid reveal.
  const [textDone, setTextDone] = useState(!isFreshResponse);
  // Bump on every successful response so components treat it as new.
  const [resultId, setResultId] = useState(0);

  const saveQuery = (nextQuery) => {
    const trimmedQuery = nextQuery.trim();

    if (!trimmedQuery) {
      setSavedMessage("Tell Lumos your mood first.");
      return false;
    }

    localStorage.setItem("movieQuery", trimmedQuery);
    setQuery(trimmedQuery);
    setSavedMessage("Saved. Lumos knows what mood you are in.");
    return true;
  };

  const handleRecommend = async (e) => {
    e.preventDefault();
    const isValid = saveQuery(query);
    if (!isValid) return;

    setIsLoading(true);
    setTextDone(false);

    try {
      const data = await chatWithLumos(username, query);
      setAiMessage(data.ai_message);
      setMovies(data.recommended_movies.movies);
      localStorage.setItem("aiMessage", data.ai_message);
      localStorage.setItem(
        "movies",
        JSON.stringify(data.recommended_movies.movies)
      );
      setIsFreshResponse(true);
      setResultId((id) => id + 1);
    } catch (error) {
      console.error(error);
      alert("Unable to retrieve chat");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeelingLucky = () => {
    const randomPrompt =
      luckyPrompts[Math.floor(Math.random() * luckyPrompts.length)];

    localStorage.setItem("movieQuery", randomPrompt);
    setQuery(randomPrompt);
    setSavedMessage("Feeling lucky mood saved.");
  };

  const hasResult = Boolean(aiMessage);

  return (
    <div className="min-h-screen px-6 pt-36 pb-16 text-white">
      {/* Prompt Card */}
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_0_35px_rgba(99,102,241,0.1)] backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-300/10 text-amber-200">
          <Clapperboard size={28} />
        </div>

        <p className="text-2xl font-medium text-indigo-200">
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
              disabled={isLoading}
              className="cursor-pointer flex items-center justify-center gap-2 rounded-full border border-amber-400/50 py-3 font-semibold text-amber-200 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles size={18} />
              Recommend
            </button>

            <button
              type="button"
              onClick={handleFeelingLucky}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 py-3 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Dice5 size={18} />
              Feeling Lucky
            </button>
          </div>
        </form>

        {savedMessage && <p className="mt-5 text-amber-200">{savedMessage}</p>}
      </div>

      {/* Loading state */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-14 flex w-full max-w-5xl items-center justify-center gap-3 px-4 sm:px-6"
          >
            <Loader2 className="animate-spin text-indigo-300" size={22} />
            <span className="text-slate-300">Analyzing your emotion...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lumos Response */}
      <AnimatePresence mode="wait">
        {!isLoading && hasResult && (
          <motion.div
            key={resultId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto mt-14 w-full max-w-5xl px-4 sm:px-6"
          >
            <div className="rounded-3xl border border-indigo-500/20 bg-white/5 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.12)]">
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

              <div className="mt-6 border-l-2 border-indigo-400/40 pl-4 sm:pl-6">
                <TypewriterText
                  text={aiMessage}
                  skipAnimation={!isFreshResponse}
                  onComplete={() => setTextDone(true)}
                />
              </div>
            </div>

            {/* Recommended Movies heading + grid, revealed together
                once the typewriter finishes */}
            {movies.length > 0 && textDone && (
              <RecommendedMovies movies={movies} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chat;
