import { motion } from "motion/react";
import { useMemo } from "react";

const movieIcons = [
  { icon: "🎬", top: "12%", left: "10%" },
  { icon: "🍿", top: "25%", left: "82%" },
  { icon: "🎭", top: "72%", left: "14%" },
  { icon: "🎞️", top: "80%", left: "84%" },
  { icon: "📽️", top: "52%", left: "7%" },
  { icon: "⭐", top: "40%", left: "91%" },
  { icon: "🎥", top: "18%", left: "52%" },
  { icon: "🎦", top: "60%", left: "52%" },
];

const shootingStars = [
  { top: "18%", left: "8%", delay: 2, duration: 1.5 },
  { top: "34%", left: "62%", delay: 9, duration: 1.8 },
];

function BackgroundOverlay() {
  const stars = useMemo(
    () =>
      Array.from({ length: 58 }, (_, index) => ({
        top: `${(index * 23) % 100}%`,
        left: `${(index * 37) % 100}%`,
        size: (index % 3) + 1,
        duration: (index % 5) + 4,
        delay: (index % 7) * 0.35,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        top: `${(index * 31) % 100}%`,
        left: `${(index * 47) % 100}%`,
        size: (index % 4) + 2,
        delay: (index % 6) * 0.6,
        duration: 9 + (index % 5),
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e1b4b_0%,#121421_28%,#090b12_62%,#030305_100%)]" />

      {[
        [
          "left-1/2 top-0 h-[720px] w-[720px] -translate-x-1/2 bg-indigo-500/12 blur-[230px]",
          18,
          [-40, 40, -40],
          [-20, 20, -20],
        ],
        [
          "bottom-0 left-0 h-[520px] w-[520px] bg-violet-500/10 blur-[200px]",
          20,
          [20, -20, 20],
          [0, 30, 0],
        ],
        [
          "right-0 top-1/3 h-[460px] w-[460px] bg-pink-500/8 blur-[190px]",
          22,
          [0, 30, 0],
          [20, -20, 20],
        ],
        [
          "right-1/3 bottom-0 h-[460px] w-[460px] bg-cyan-400/8 blur-[190px]",
          25,
          [-80, 80, -80],
          [40, -40, 40],
        ],
      ].map(([cls, dur, x, y], i) => (
        <motion.div
          key={i}
          animate={{ x, y, rotate: [0, 4, -4, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute rounded-full ${cls}`}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.10) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {movieIcons.map((item) => (
        <div
          key={item.icon}
          className="absolute select-none text-5xl opacity-[0.075]"
          style={{ top: item.top, left: item.left }}
        >
          {item.icon}
        </div>
      ))}

      {stars.map((star, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.12, 0.55, 0.12],
            scale: [1, 1.45, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            boxShadow: "0 0 6px rgba(255,255,255,.35)",
          }}
        />
      ))}

      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.22, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-indigo-300/25 blur-sm"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
          }}
        />
      ))}

      {shootingStars.map((star, index) => (
        <motion.div
          key={index}
          animate={{
            x: [0, 460],
            y: [0, 190],
            opacity: [0, 0.75, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 12,
            ease: "easeOut",
          }}
          className="absolute h-px w-32 rotate-[-24deg] rounded-full bg-linear-to-r from-transparent via-white/80 to-transparent shadow-[0_0_14px_rgba(255,255,255,0.45)]"
          style={{ top: star.top, left: star.left }}
        />
      ))}

      <div className="absolute -left-45 top-1/3 h-115 w-115 rounded-full bg-violet-400/5 blur-[190px]" />
      <div className="absolute -right-45 bottom-1/4 h-115 w-115 rounded-full bg-cyan-400/5 blur-[190px]" />
      <div className="absolute left-1/2 top-0 h-155 w-155 -translate-x-1/2 rounded-full bg-indigo-200/5 blur-[240px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_26%,rgba(0,0,0,0.84)_100%)]" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

export default BackgroundOverlay;
