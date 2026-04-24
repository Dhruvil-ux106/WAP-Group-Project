import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlists } from "../data/data";
import SongRow from "../Components/SongRow";
import { fetchPlaylistTracks } from "../services/musicApi";

export default function Playlist({ playTrackFromList, currentTrack, addTrackToCustomPlaylist }) {
const { id } = useParams();
const playlist = playlists.find((p) => String(p.id) === String(id));
const [tracks, setTracks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
let active = true;

const loadTracks = async () => {
if (!playlist) {
return;
 }

setLoading(true);
setError("");

try {
const list = await fetchPlaylistTracks(playlist, 22);
if (active) {
setTracks(list);
 }
 } catch {
if (active) {
setError("Could not load tracks right now.");
 }
 } finally {
if (active) {
setLoading(false);
 }
 }
 };

loadTracks();

return () => {
active = false;
 };
 }, [playlist]);

if (!playlist) {
return (
<div style={{ padding: "20px 30px", color: "white" }}>
<h1 style={{ marginBottom: "8px" }}>Playlist not found</h1>
<p style={{ color: "#b3b3b3" }}>Try opening another playlist from Home.</p>
</div>
 );
 }
return (
<div style={{ padding: "20px 30px", color: "white" }}>
<div style={{ display: "flex", gap: "18px", marginBottom: "20px", alignItems: "flex-end" }}>
<img
src={playlist.cover}
alt={playlist.title}
style={{ width: "180px", height: "180px", objectFit: "cover", borderRadius: "8px" }}
/>
<div>
<p style={{ margin: 0, color: "#b3b3b3", fontSize: "12px", letterSpacing: "0.08em" }}>PLAYLIST</p>
<h1 style={{ fontSize: "36px", margin: "8px 0" }}>{playlist.title}</h1>
<p style={{ color: "#aaa", marginTop: 0 }}>{playlist.description}</p>
<p style={{ color: "#b3b3b3", margin: "0 0 14px" }}>{tracks.length} songs</p>
<button
type="button"
onClick={() => playTrackFromList(tracks, 0, playlist.title)}
disabled={tracks.length === 0}
style={{
background: "#1db954",
color: "#101010",
border: "none",
borderRadius: "999px",
padding: "10px 18px",
fontWeight: 700,
cursor: tracks.length === 0 ? "not-allowed" : "pointer"
 }}
>
 Play
</button>
</div>
</div>

{loading && <p style={{ color: "#b3b3b3" }}>Loading songs...</p>}
{error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

{!loading && tracks.map((track, i) => (
<SongRow
key={`${track.id}-${i}`}
index={i}
track={track}
active={currentTrack?.id === track.id}
onAddToPlaylist={addTrackToCustomPlaylist}
onPlay={() => playTrackFromList(tracks, i, playlist.title)}
/>
 ))}
</div>
 );
}
