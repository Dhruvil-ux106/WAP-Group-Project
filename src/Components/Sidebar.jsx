import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: window.innerWidth < 600 ? "80px" : "220px",
        background: "#000",
        color: "#fff",
        padding: "20px",
        height: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Spotify</h2>

      {/* Home Link */}
      <Link
        to="/"
        style={{
          display: "block",
          margin: "10px 0",
          color: "white",
          textDecoration: "none"
        }}
        onMouseOver={(e) => (e.target.style.color = "#1db954")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        Home
      </Link>

      {/* Search Link */}
      <Link
        to="/search"
        style={{
          display: "block",
          margin: "10px 0",
          color: "white",
          textDecoration: "none"
        }}
        onMouseOver={(e) => (e.target.style.color = "#1db954")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        Search
      </Link>
    </div>
  );
}