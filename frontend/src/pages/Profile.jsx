import { LogOut, UserRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginOrCreateUser } from "../services/userService";

function Profile({ username, setUsername, setStatus }) {
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const trimmedInput = usernameInput.trim();

    if (!trimmedInput || loading) return;

    setLoading(true);

    try {
      const data = await loginOrCreateUser(trimmedInput);

      setUsername(data.username);
      setStatus(data.status);

      localStorage.setItem("username", data.username);
      localStorage.setItem("status", data.status);

      navigate("/chat");
    } catch (error) {
      console.error(error);
      alert("Unable to login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUsername("");
    setStatus("");

    localStorage.removeItem("username");
    localStorage.removeItem("status");
    localStorage.removeItem("movieQuery");
    localStorage.removeItem("aiMessage");
    localStorage.removeItem("movies");

    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 pt-24 text-white">
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border border-white/10
          bg-white/5
          p-6 sm:p-8
          text-center
          backdrop-blur-xl
          shadow-[0_0_35px_rgba(99,102,241,0.1)]
          opacity-0
          animate-[fadeUp_.45s_ease-out_forwards]
        "
      >
        <div
          className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-amber-300/10
            text-amber-200
            animate-[float_4s_ease-in-out_infinite]
          "
        >
          <UserRound size={28} />
        </div>

        {username ? (
          <>
            <p className="text-sm font-medium text-indigo-200">Signed in as</p>

            <h1 className="mt-2 break-words text-2xl sm:text-3xl font-bold text-white">
              {username}
            </h1>

            <button
              type="button"
              onClick={handleLogout}
              className="
                mt-8
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-red-400/40
                bg-red-500/10
                px-6
                py-3
                font-semibold
                text-red-200
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-red-300
                hover:bg-red-500/20
                active:translate-y-0
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Lumos</h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Choose a username to talk to me.
            </p>

            <form onSubmit={handleLogin} className="mt-7 flex flex-col gap-4">
              <input
                type="text"
                value={usernameInput}
                disabled={loading}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-black/25
                  px-5
                  py-3
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-slate-500
                  focus:border-amber-300/60
                  focus:bg-black/35
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-amber-400/60
                  bg-zinc-900/40
                  px-6
                  py-3
                  font-semibold
                  text-amber-200
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-indigo-500
                  hover:bg-indigo-600
                  hover:text-white
                  active:translate-y-0
                  disabled:cursor-not-allowed
                  disabled:hover:translate-y-0
                  disabled:border-white/10
                  disabled:bg-white/10
                  disabled:text-slate-300
                "
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Let's talk! 😁"
                )}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}

export default Profile;
