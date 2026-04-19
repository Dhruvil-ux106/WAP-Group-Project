import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#000",
      color: "#fff",
      padding: "20px",
      height: "100vh"
    }}>
      <h2 style={{ marginBottom: "20px" }}>Spotify</h2>

      <Link to="/" style={{ display: "block", margin: "10px 0", color: "white" }}>
        Home
      </Link>

      <Link to="/search" style={{ display: "block", margin: "10px 0", color: "white" }}>
        Search
      </Link>
    </div>
  );
}