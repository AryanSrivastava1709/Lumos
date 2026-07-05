import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Hero Text */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center gap-5"
        >
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
            I am <span className="text-amber-300">Lumos</span>{" "}
            <span className="relative inline-flex items-center justify-center">
              {/* Glow */}
              <motion.span
                animate={{
                  opacity: [0.4, 0.9, 0.4],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-8 w-8 rounded-full bg-amber-300 blur-xl"
              />

              {/* Star */}
              <span className="relative text-amber-300">🌟</span>
            </span>
          </h1>

          <h2 className="text-xl font-semibold italic text-indigo-200 sm:text-2xl">
            Every mood deserves the perfect story.
          </h2>

          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Tell me how you're feeling, grab some popcorn, and let me light the
            way to your next favorite movie or series.
          </p>

          <p className="text-xl font-semibold italic text-amber-200 sm:text-2xl">
            May the mood be with you. 🌌
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={() => navigate("/chat")}
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: [
              "0 0 0px rgba(251,191,36,0)",
              "0 0 20px rgba(251,191,36,0.18)",
              "0 0 0px rgba(251,191,36,0)",
            ],
          }}
          transition={{
            delay: 0.75,
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
            boxShadow: {
              delay: 1.4,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.04,
            y: -2,
            transition: {
              duration: 0.2,
            },
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="mt-10 cursor-pointer rounded-full border border-amber-400/60 bg-zinc-900/40 px-9 py-4 text-lg font-semibold tracking-wide text-amber-200 backdrop-blur-md transition-colors duration-300 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
        >
          🎬 Talk to Lumos
        </motion.button>
      </div>
    </div>
  );
}

export default Home;
