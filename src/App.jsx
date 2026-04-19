import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";

export default function App() {
  return (
    <BrowserRouter>

      <div style={{ display: "flex", height: "100vh" }}>
        
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          
          <Navbar />

          <Routes>
            <Route path="/" element={<h1 style={{ color: "white" }}>Home</h1>} />
            <Route path="/search" element={<h1 style={{ color: "white" }}>Search</h1>} />
          </Routes>

        </div>

        <Player />

      </div>

    </BrowserRouter>
  );
}