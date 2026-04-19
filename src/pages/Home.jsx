import { playlists } from "../data/data";
import Card from "./components/Card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px"
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