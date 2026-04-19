import { Link } from "react-router-dom";

export default function Sidebar() {
  const isMobile = window.innerWidth < 600;

  return (
    <div
      style={{
        width: isMobile ? "80px" : "220px",
        background: "#000",
        color: "#fff",
        padding: "20px",
        height: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: isMobile ? "16px" : "22px" }}>
        Spotify
      </h2>

      {/* Home */}
      <Link
        to="/"
        style={{
          display: "block",
          margin: "10px 0",
          color: "white",
          textDecoration: "none",
          fontSize: isMobile ? "12px" : "16px"
        }}
        onMouseOver={(e) => (e.target.style.color = "#1db954")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        {isMobile ? "H" : "Home"}
      </Link>

      {/* Search */}
      <Link
        to="/search"
        style={{
          display: "block",
          margin: "10px 0",
          color: "white",
          textDecoration: "none",
          fontSize: isMobile ? "12px" : "16px"
        }}
        onMouseOver={(e) => (e.target.style.color = "#1db954")}
        onMouseOut={(e) => (e.target.style.color = "white")}
      >
        {isMobile ? "S" : "Search"}
      </Link>
    </div>
  );
}