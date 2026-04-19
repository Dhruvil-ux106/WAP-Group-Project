import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";

export default function App() {
  return (
    <BrowserRouter>  {/* ADD THIS */}

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1 }}>
          <Navbar />

          <Routes>   {/* ADD THIS */}
            <Route path="/" element={<h1>Home</h1>} />
          </Routes>

        </div>

        <Player />
      </div>

    </BrowserRouter>
  );
}