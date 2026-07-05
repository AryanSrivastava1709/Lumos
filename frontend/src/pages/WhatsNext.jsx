import {
  ArrowLeft,
  Brain,
  Calendar,
  CheckCircle2,
  Heart,
  Mic,
  PlayCircle,
  Sparkles,
  Star,
  Tv,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function WhatsNext() {
  const navigate = useNavigate();

  const currentFeatures = [
    "AI-powered mood based recommendations",
    "Movie & TV series suggestions",
    "Natural language conversations",
    "Responsive modern interface",
    "Feeling Lucky mode",
    "Persistent conversations using local storage",
  ];

  const upcomingFeatures = [
    {
      icon: Brain,
      title: "Personalized AI Memory",
      text: "Lumos will remember your favorite genres, actors, and viewing habits to make every recommendation feel personal.",
    },
    {
      icon: Star,
      title: "Watchlist & Favorites",
      text: "Save movies you love and create personal collections to revisit anytime.",
    },
    {
      icon: PlayCircle,
      title: "Streaming Availability",
      text: "Know exactly where every movie or show is available to watch.",
    },
    {
      icon: Tv,
      title: "Smarter Recommendations",
      text: "Recommendations based on mood, genre, runtime, language, cast, and viewing history.",
    },
    {
      icon: Mic,
      title: "Voice Conversations",
      text: "Talk naturally with Lumos using your voice instead of typing.",
    },
    {
      icon: UserRound,
      title: "User Accounts",
      text: "Secure login, personalized recommendations, and synced watch history.",
    },
  ];

  const futureVision = [
    "AI explains why every recommendation matches your mood.",
    "Daily mood check-ins with personalized suggestions.",
    "Group recommendations for friends and family.",
    "Interactive trailer previews.",
    "Weekly personalized movie digest.",
    "Dark & Light themes.",
    "Multi-language conversations.",
    "Emotion timeline and watch history.",
  ];

  return (
    <div className="min-h-screen px-6 pt-32 pb-20 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}

        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-slate-300 transition hover:border-indigo-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Hero */}

        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200">
            <Sparkles size={16} fill="currentColor" />
            What's Next
          </div>

          <h1 className="mt-6 text-5xl font-bold md:text-6xl">
            The Future of Lumos
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Lumos is continuously evolving into an intelligent AI movie
            companion. This roadmap highlights where the project is today and
            where it's headed next.
          </p>
        </div>

        {/* Current */}

        <section className="mt-20">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-400" />
            <h2 className="text-3xl font-bold">Available Today</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {currentFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-green-400/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <CheckCircle2 size={20} className="text-green-400" />

                <p className="text-slate-200">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming */}

        <section className="mt-24">
          <div className="flex items-center gap-3">
            <Calendar className="text-indigo-300" />
            <h2 className="text-3xl font-bold">Coming Soon</h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="mt-3 leading-7 text-slate-300">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Vision */}

        <section className="mt-24 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-10 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Heart className="text-amber-300" />
            <h2 className="text-3xl font-bold">Long-Term Vision</h2>
          </div>

          <p className="mt-5 max-w-4xl leading-8 text-slate-300">
            The goal is to transform Lumos from a recommendation engine into a
            true AI entertainment companion that understands emotions, remembers
            preferences, and helps people discover stories they'll genuinely
            love.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {futureVision.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <Sparkles size={18} className="mt-1 text-amber-300" />

                <p className="text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}

        <div className="mt-20 text-center">
          <p className="text-2xl font-semibold italic text-amber-200">
            Every release brings Lumos one step closer to becoming your personal
            AI movie companion.
          </p>

          <p className="mt-5 text-slate-400">
            Thank you for being part of the journey. ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhatsNext;
