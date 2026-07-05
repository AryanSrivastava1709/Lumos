import Header from "./layouts/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import BackgroundOverlay from "./layouts/BackgroundOverlay";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050506]">
      <BackgroundOverlay />
      <Header />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
