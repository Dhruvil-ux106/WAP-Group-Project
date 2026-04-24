import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SongRow from "../Components/SongRow";
import { searchTracks } from "../services/musicApi";

export default function Search({ playTrackFromList, currentTrack, addTrackToCustomPlaylist }) {
const location = useLocation();
const [query, setQuery] = useState(() => {
const params = new URLSearchParams(location.search);
return params.get("q") || "weeknd";
 });
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const quickArtists = [
"weeknd",
"travis scott",
"playboi carti",
"future",
"don toliver",
"arijit singh",
"dua lipa"
 ];

useEffect(() => {
const params = new URLSearchParams(location.search);
const q = params.get("q");
if (q && q !== query) {
setQuery(q);
 }
 }, [location.search, query]);

useEffect(() => {
let active = true;

const timer = setTimeout(async () => {
setLoading(true);
const tracks = await searchTracks(query, 25);
if (active) {
setResults(tracks);
setLoading(false);
 }
 }, 350);

return () => {
 active = false;
clearTimeout(timer);
 };
 }, [query]);

return (
<div style={{ padding: "20px", color: "white" }}>
<h1 style={{ marginBottom: "14px" }}>Search</h1>
<input
type="text"
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="Search songs or artists"
style={{
width: "100%",
maxWidth: "560px",
background: "#2a2a2a",
color: "#fff",
border: "1px solid #3a3a3a",
borderRadius: "999px",
padding: "12px 16px",
marginBottom: "16px"
 }}
/>

<div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
{quickArtists.map((artist) => (
<button
key={artist}
type="button"
onClick={() => setQuery(artist)}
style={{
background: "#202020",
color: "#fff",
border: "1px solid #333",
borderRadius: "999px",
padding: "6px 12px",
cursor: "pointer",
textTransform: "capitalize"
 }}
>
{artist}
</button>
 ))}
</div>

{loading && <p style={{ color: "#b3b3b3" }}>Searching...</p>}

{!loading && results.length === 0 && (
<p style={{ color: "#b3b3b3" }}>No songs found. Try another query.</p>
 )}

{!loading && results.map((track, i) => (
<SongRow
key={`${track.id}-${i}`}
index={i}
track={track}
active={currentTrack?.id === track.id}
onAddToPlaylist={addTrackToCustomPlaylist}
onPlay={() => playTrackFromList(results, i, "Search")}
/>
 ))}
</div>
 );
}