import SongRow from "../Components/SongRow";

export default function Library({ customPlaylists, playTrackFromList, currentTrack }) {
return (
<div style={{ padding: "20px", color: "white" }}>
<h1 style={{ marginTop: 0 }}>Your Playlists</h1>

{customPlaylists.length === 0 && (
<p style={{ color: "#b3b3b3" }}>
 Add songs from Search or Playlist using + Add.
</p>
 )}

{customPlaylists.map((playlist) => (
<section key={playlist.id} style={{ marginBottom: "30px" }}>
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
<h2 style={{ marginBottom: "10px" }}>{playlist.name}</h2>
<button
type="button"
onClick={() => playTrackFromList(playlist.tracks, 0, playlist.name)}
disabled={playlist.tracks.length === 0}
style={{
background: "#1db954",
color: "#101010",
border: "none",
borderRadius: "999px",
padding: "8px 14px",
fontWeight: 700,
cursor: playlist.tracks.length === 0 ? "not-allowed" : "pointer"
 }}
>
 Play All
</button>
</div>

{playlist.tracks.map((track, i) => (
<SongRow
key={`${playlist.id}-${track.id}-${i}`}
index={i}
track={track}
active={currentTrack?.id === track.id}
onPlay={() => playTrackFromList(playlist.tracks, i, playlist.name)}
/>
 ))}
</section>
 ))}
</div>
 );
}
