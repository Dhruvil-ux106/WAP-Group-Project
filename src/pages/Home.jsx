import { playlists } from "../data/data";
import Card from "./components/Card";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      {playlists.map((p) => (
        <Card key={p.id} title={p.title} />
      ))}
    </div>
  );
}