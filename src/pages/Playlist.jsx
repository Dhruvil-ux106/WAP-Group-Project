import { useParams } from "react-router-dom";
import { playlists } from "../data/data";

export default function Playlist() {
  const { id } = useParams();
  const playlist = playlists.find(p => p.id == id);

  return <h1 style={{ color: "white" }}>{playlist.title}</h1>;
}