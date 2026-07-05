import { Heart } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}

        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span>Created with</span>

          <Heart
            size={15}
            fill="currentColor"
            className="animate-pulse text-red-500"
          />

          <span>by</span>

          <a
            href="https://ara-sr.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-300 transition duration-300 hover:text-amber-200 hover:underline"
          >
            Aryan
          </a>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/aryan-srivastava-17ar09/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-blue-400"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="https://www.instagram.com/ara.youknow?igsh=d2VvYm5rdTgyZTRu"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-pink-400"
          >
            <FaInstagram size={20} />
          </a>

          <a
            href="https://github.com/AryanSrivastava1709"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-white"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
