import { playlists } from "../data/data";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", color: "white" }}>

      {/* Heading */}
      <h1 style={{ marginBottom: "20px", fontSize: "28px" }}>
        Good Evening
      </h1>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "20px"
        }}
      >
        {playlists.map((p) => (
          <Card
            key={p.id}
            title={p.title}
            onClick={() => navigate(`/playlist/${p.id}`)}
          />
        ))}
      </div>

    </div>
  );
}