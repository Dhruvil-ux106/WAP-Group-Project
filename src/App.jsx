import Sidebar from "./Components/Sidebar";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>Main</div>
    </div>
  );
}