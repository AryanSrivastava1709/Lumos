import Header from "./layouts/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import BackgroundOverlay from "./layouts/BackgroundOverlay";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [status, setStatus] = useState(() => {
    return localStorage.getItem("status") || "";
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506]">
      <BackgroundOverlay />
      <Header />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/chat"
            element={
              username ? (
                <Chat username={username} status={status} />
              ) : (
                <Navigate to="/profile" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                username={username}
                setUsername={setUsername}
                setStatus={setStatus}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
