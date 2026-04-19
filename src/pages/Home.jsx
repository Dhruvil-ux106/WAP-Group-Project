import { playlists } from "../data/data";
import Card from "./components/Card";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      {playlists.map((p) => (
        <Card
    key={p.id}
    title={p.title}
    onClick={() => navigate(`/playlist/${p.id}`)}
/>
      ))}
    </div>
  );
}