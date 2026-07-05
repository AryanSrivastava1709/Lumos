import { Film, Heart, MessageCircle, Sparkles } from "lucide-react";

function About() {
  const features = [
    {
      icon: Heart,
      title: "Mood first",
      text: "Lumos listens to how you feel before suggesting what to watch.",
    },
    {
      icon: Film,
      title: "Movies and series",
      text: "Find stories that match your taste, genre, language, and moment.",
    },
    {
      icon: MessageCircle,
      title: "Natural chat",
      text: "Just describe your mood like you would to a friend.",
    },
  ];

  return (
    <div className="min-h-screen px-6 pb-16 pt-32 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200">
          <Sparkles size={16} fill="currentColor" />
          About Lumos
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Your mood-aware movie companion.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
          Lumos helps you discover movies and series based on what you are
          feeling, what kind of story you want, and the mood you want to end
          with.
        </p>

        <div className="mt-12 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_0_35px_rgba(99,102,241,0.08)] backdrop-blur-xl"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-200">
                  <Icon size={22} />
                </div>

                <h2 className="text-xl font-semibold text-white">
                  {feature.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-300">{feature.text}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-12 max-w-2xl text-xl font-semibold italic text-amber-200 sm:text-2xl">
          Every feeling has a story waiting for it.
        </p>
      </div>
    </div>
  );
}

export default About;
