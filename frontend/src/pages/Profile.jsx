import { LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginOrCreateUser } from "../services/userService";

function Profile({ username, setUsername, setStatus }) {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const trimmedInput = usernameInput.trim();

    if (!trimmedInput) {
      return;
    }

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
    }
  };

  const handleLogout = () => {
    setUsername("");
    setStatus("");
    localStorage.removeItem("username");
    localStorage.removeItem("status");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-7 text-center shadow-[0_0_35px_rgba(99,102,241,0.1)] backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-300/10 text-amber-200">
          <UserRound size={28} />
        </div>

        {username ? (
          <>
            <p className="text-sm font-medium text-indigo-200">Signed in as</p>
            <h1 className="mt-2 wrap-break-words text-3xl font-bold text-white">
              {username}
            </h1>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-6 py-3 font-semibold text-red-200 transition-colors duration-300 hover:border-red-300 hover:bg-red-500/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Welcome to Lumos</h1>
            <p className="mt-3 text-slate-300">
              Choose a username to talk to me.
            </p>

            <form onSubmit={handleLogin} className="mt-7 flex flex-col gap-4">
              <input
                type="text"
                value={usernameInput}
                onChange={(event) => setUsernameInput(event.target.value)}
                placeholder="Enter username"
                className="rounded-full border border-white/10 bg-black/25 px-5 py-3 text-white outline-none transition-colors duration-300 placeholder:text-slate-500 focus:border-amber-300/60"
              />

              <button
                type="submit"
                className="cursor-pointer rounded-full border border-amber-400/60 bg-zinc-900/40 px-6 py-3 font-semibold text-amber-200 transition-colors duration-300 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
              >
                Let's talk! 😁
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
