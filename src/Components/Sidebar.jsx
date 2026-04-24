import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchTracks } from "../services/musicApi";

export default function Sidebar() {
const [artistPhotos, setArtistPhotos] = useState([]);

const navButtonStyle = ({ isActive }) => ({
width: "42px",
height: "42px",
borderRadius: "10px",
display: "grid",
placeItems: "center",
color: isActive ? "#fff" : "#a8a8a8",
background: isActive ? "#5d4df7" : "rgba(255,255,255,0.06)",
textDecoration: "none",
fontSize: "18px",
marginBottom: "10px"
 });

useEffect(() => {
let active = true;

const loadArtistPhotos = async () => {
const artists = ["Travis Scott", "Playboi Carti", "Future", "Don Toliver", "The Weeknd", "Dua Lipa"];

try {
const results = await Promise.all(artists.map((artist) => searchTracks(artist, 8)));
if (!active) {
return;
 }

const photos = artists.map((artist, index) => {
const list = results[index] || [];
const artistTrack = list.find((track) => track.artist?.toLowerCase().includes(artist.toLowerCase())) || list[0];
return {
name: artist,
image: artistTrack?.artwork || ""
 };
 });

setArtistPhotos(photos);
 } catch {
if (active) {
setArtistPhotos(
 artists.map((artist) => ({
name: artist,
image: ""
 }))
 );
 }
 }
 };

loadArtistPhotos();

return () => {
 active = false;
 };
 }, []);

return (
<div
style={{
width: "78px",
background: "#0b0b0b",
color: "#fff",
padding: "14px 10px",
height: "100vh",
boxSizing: "border-box",
borderRight: "1px solid #1b1b1b",
display: "flex",
flexDirection: "column",
alignItems: "center",
gap: "8px"
 }}
>
<div style={{ color: "#b5b5b5", fontSize: "22px", marginBottom: "2px" }}>||◁</div>

<NavLink
to="/"
style={navButtonStyle}
end
title="Home"
>
 ⌂
</NavLink>

<NavLink
to="/search"
style={navButtonStyle}
title="Search"
>
 ⌕
</NavLink>

<NavLink
to="/library"
style={navButtonStyle}
title="Library"
>
 ♡
</NavLink>

<div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#0f8f5d", display: "grid", placeItems: "center", marginTop: "2px" }}>
 ▮
</div>

<div style={{ width: "100%", height: "1px", background: "#252525", margin: "6px 0" }} />

<div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
{artistPhotos.map((artist, index) => (
 artist.image ? (
<img
key={`${artist.name}-${index}`}
src={artist.image}
alt={artist.name}
title={artist.name}
style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "1px solid #2b2b2b" }}
/>
 ) : (
<div
key={`${artist.name}-${index}`}
title={artist.name}
style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#252525", display: "grid", placeItems: "center", color: "#ddd", fontSize: "10px", border: "1px solid #2b2b2b" }}
>
{artist.name.slice(0, 2).toUpperCase()}
</div>
 )
 ))}
</div>
</div>
 );
}