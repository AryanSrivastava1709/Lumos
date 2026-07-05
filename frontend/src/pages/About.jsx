import { ArrowRight, Film, Heart, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Mood First",
      text: "Lumos understands how you're feeling before suggesting the perfect movie or series.",
    },
    {
      icon: Film,
      title: "Smart Recommendations",
      text: "Discover stories that match your mood, genre preferences, language, and vibe.",
    },
    {
      icon: MessageCircle,
      title: "Natural Conversations",
      text: "Talk to Lumos like a friend. No filters, no keywords—just tell it how you feel.",
    },
  ];

  return (
    <div className="min-h-screen px-6 pt-32 pb-20 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge */}

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200">
          <Sparkles size={16} fill="currentColor" />
          About Lumos
        </div>

        {/* Heading */}

        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Your AI companion for discovering stories that match your emotions.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
          Whether you're feeling joyful, nostalgic, anxious, or simply don't
          know what to watch, Lumos helps you find movies and TV series that
          perfectly fit your current mood through natural conversation and AI.
        </p>

        {/* Feature Cards */}

        <div className="mt-14 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl shadow-[0_0_35px_rgba(99,102,241,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-200">
                  <Icon size={22} />
                </div>

                <h2 className="text-xl font-semibold">{feature.title}</h2>

                <p className="mt-3 leading-7 text-slate-300">{feature.text}</p>
              </div>
            );
          })}
        </div>

        {/* Quote */}

        <p className="mt-14 max-w-2xl text-xl font-semibold italic text-amber-200 sm:text-2xl">
          Every feeling has a story waiting for it.
        </p>

        {/* What's Next Card */}

        <div className="mt-16 w-full rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(99,102,241,0.12)]">
          <h2 className="text-3xl font-bold">Lumos is just getting started.</h2>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-slate-300">
            This version focuses on intelligent mood-based recommendations.
            Future releases will introduce personalized AI memory, watchlists,
            streaming platform integration, voice conversations, and many more
            features to make Lumos your ultimate movie companion.
          </p>

          <button
            onClick={() => navigate("/whats-next")}
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 font-semibold transition-all duration-300 hover:bg-indigo-500"
          >
            Explore What's Next
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
