import { ArrowLeft, Clapperboard, Home, SearchX, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-40 pb-10 text-white">
      {/* Background Glow */}

      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Badge */}

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200">
          <Sparkles size={16} fill="currentColor" />
          Oops...
        </div>

        {/* Icon */}

        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-indigo-500/20 bg-white/5 shadow-[0_0_50px_rgba(99,102,241,0.18)] backdrop-blur-xl">
          <SearchX size={64} className="text-indigo-300" />
        </div>

        {/* 404 */}

        <h1 className="mt-10 text-8xl font-black tracking-tight text-indigo-300 md:text-9xl">
          404
        </h1>

        {/* Heading */}

        <h2 className="mt-6 text-3xl font-bold md:text-4xl">
          Looks like this scene never made the final cut.
        </h2>

        {/* Description */}

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          The page you're looking for doesn't exist, has been moved, or perhaps
          Lumos hasn't discovered it yet.
        </p>

        {/* Movie Quote */}

        <div className="mt-12 w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(99,102,241,0.08)]">
          <div className="flex justify-center">
            <Clapperboard className="text-amber-300" size={28} />
          </div>

          <p className="mt-5 text-xl italic text-amber-200">
            "Every great story has a few deleted scenes."
          </p>

          <p className="mt-2 text-slate-400">
            Let's get you back to the main feature.
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-3 font-semibold transition hover:bg-indigo-500"
          >
            <Home size={18} />
            Back Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 font-semibold transition hover:border-indigo-400 hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Previous Page
          </button>
        </div>

        {/* Footer */}

        <p className="mt-14 text-sm tracking-wide text-slate-500">
          Error Code • 404 • Lumos couldn't find this page
        </p>
      </div>
    </div>
  );
}

export default NotFound;
