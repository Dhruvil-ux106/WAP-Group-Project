const formatDuration = (seconds) => {
 const safe = Number(seconds) || 0;
const mins = Math.floor(safe / 60);
const secs = String(safe % 60).padStart(2, "0");
return `${mins}:${secs}`;
};

export default function SongRow({ track, onPlay, active, index, onAddToPlaylist }) {
return (
<div
onClick={onPlay}
style={{
padding: "10px",
borderBottom: "1px solid #333",
cursor: "pointer",
color: active ? "#1db954" : "#fff",
fontWeight: active ? 700 : 500,
display: "grid",
gridTemplateColumns: "38px 1fr auto auto",
gap: "10px",
alignItems: "center"
 }}
onMouseOver={(e) => (e.currentTarget.style.background = "#282828")}
onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
>
<span style={{ color: "#b3b3b3", fontSize: "12px" }}>{active ? "▶" : index + 1}</span>
<div style={{ overflow: "hidden" }}>
<div style={{ fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
{track.title}
</div>
<div style={{ fontSize: "12px", color: "#b3b3b3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
{track.artist}
</div>
</div>
{onAddToPlaylist && (
<button
type="button"
onClick={(e) => {
e.stopPropagation();
onAddToPlaylist(track);
 }}
style={{
border: "1px solid #3f3f3f",
background: "transparent",
color: "#e5e5e5",
borderRadius: "999px",
padding: "4px 10px",
cursor: "pointer",
fontSize: "11px"
 }}
>
 + Add
</button>
 )}
<span style={{ color: "#b3b3b3", fontSize: "12px" }}>{formatDuration(track.duration)}</span>
</div>
 );
}