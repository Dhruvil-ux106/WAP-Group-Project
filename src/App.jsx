import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player"; 

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />
        <div>Main</div>
      </div>

      <Player /> {/* ADD HERE */}
    </div>
  );
}