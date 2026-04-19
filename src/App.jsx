import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar"; // ADD THIS

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />   {/* ADD HERE */}
        <div>Main</div>
      </div>

    </div>
  );
}