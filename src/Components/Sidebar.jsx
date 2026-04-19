import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{ width: "200px", background: "black", color: "white", padding: "20px" }}>
      <h2>Spotify</h2>

      <Link to="/" style={{ display: "block", color: "white", margin: "10px 0" }}>
        Home
      </Link>

      <Link to="/search" style={{ display: "block", color: "white", margin: "10px 0" }}>
        Search
      </Link>
    </div>
  );
}