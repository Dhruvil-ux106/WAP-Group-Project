import { useParams } from "react-router-dom";
import { playlists } from "../data/data";
import SongRow from "./components/SongRow";



export default function Playlist() {
  const { id } = useParams();
  const playlist = playlists.find(p => p.id == id);
  return (
  <div style={{ padding: "20px 30px", color: "white" }}>
    
    <div style={{ marginBottom: "25px" }}>
      <h1 style={{ fontSize: "30px", marginBottom: "5px" }}>
        {playlist.title}
      </h1>
      <p style={{ color: "#aaa" }}>
        {playlist.songs.length} songs
      </p>
    </div>

    {playlist.songs.map((s, i) => (
      <SongRow key={i} name={s} />
    ))}

  </div>)}
    


  
