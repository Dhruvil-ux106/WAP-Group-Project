import { useEffect, useState } from "react";
import { playlists } from "../data/data";
import { fallbackTracks } from "../data/data";
import { useNavigate } from "react-router-dom";
import { searchTracks } from "../services/musicApi";
import { connectSpotify, fetchSpotifyMadeForYou, getSpotifyToken, isSpotifyConfigured } from "../services/spotifyApi";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop";
const FALLBACK_IMAGES = [
"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop",
"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop",
"https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&auto=format&fit=crop",
"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop",
"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop",
"https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&auto=format&fit=crop"
];

export default function Home() {
const navigate = useNavigate();
const [spotifyConnected, setSpotifyConnected] = useState(false);
const [madeForYouItems, setMadeForYouItems] = useState(() => fallbackTracks.map((track) => ({
id: track.id,
title: track.title,
subtitle: `${track.artist} • ${track.album}`,
image: track.artwork,
onClick: () => navigate("/search")
 })));

const quickTiles = [
...playlists.map((item) => ({
id: item.id,
title: item.title,
image: item.cover,
onClick: () => navigate(`/playlist/${item.id}`)
 })),
...fallbackTracks.slice(0, 3).map((track) => ({
id: `track-${track.id}`,
title: track.artist,
image: track.artwork,
onClick: () => navigate("/search")
 }))
 ].slice(0, 8);

const musicFridayItems = playlists.map((item) => ({
id: item.id,
title: item.title,
subtitle: item.description,
image: item.cover,
onClick: () => navigate(`/playlist/${item.id}`)
 }));

useEffect(() => {
let active = true;

const loadMadeForYou = async () => {
if (isSpotifyConfigured()) {
const token = await getSpotifyToken();
if (token && active) {
setSpotifyConnected(true);
const spotifyItems = await fetchSpotifyMadeForYou(6);
if (spotifyItems.length > 0) {
setMadeForYouItems(
 spotifyItems.map((item) => ({
id: item.id,
title: item.title,
subtitle: item.subtitle || "From Spotify",
image: item.image,
onClick: () => navigate(item.onClickPath || "/search")
 }))
 );
return;
 }
 }
 }

const artists = ["Travis Scott", "Playboi Carti", "Future", "Don Toliver", "The Weeknd", "Dua Lipa"];

try {
const resultLists = await Promise.all(artists.map((artist) => searchTracks(artist, 8)));
if (!active) {
return;
 }

const seenArtwork = new Set();
const pickedTracks = [];

for (const list of resultLists) {
const pick = list.find((track) => track.artwork && !seenArtwork.has(track.artwork)) || list[0];
if (!pick) {
continue;
 }
 seenArtwork.add(pick.artwork);
 pickedTracks.push(pick);
 }

if (pickedTracks.length < 6) {
const flat = resultLists.flat();
for (const track of flat) {
if (pickedTracks.length >= 6) {
break;
 }
if (!track?.id || pickedTracks.some((item) => item.id === track.id)) {
continue;
 }
 pickedTracks.push(track);
 }
 }

if (pickedTracks.length > 0) {
setMadeForYouItems(
 pickedTracks.slice(0, 6).map((track) => ({
id: track.id,
title: track.title,
subtitle: `${track.artist} • ${track.album}`,
image: track.artwork,
onClick: () => navigate("/search")
 }))
 );
 }
 } catch {
 }
 };

loadMadeForYou();

return () => {
 active = false;
 };
 }, [navigate]);

return (
<div className="home-wrap">
<div className="chip-row">
<button className="chip active" type="button">All</button>
<button className="chip" type="button">Music</button>
<button className="chip" type="button">Podcasts</button>
</div>

<div className="quick-grid">
{quickTiles.map((tile) => (
<button key={tile.id} type="button" className="quick-tile" onClick={tile.onClick}>
<img
src={tile.image || DEFAULT_IMAGE}
alt={tile.title}
onError={(e) => {
 e.currentTarget.src = DEFAULT_IMAGE;
 }}
/>
<span>{tile.title}</span>
</button>
 ))}
</div>

<section>
<div className="section-head">
<h2>It&apos;s New Music Friday!</h2>
<a href="#">Show all</a>
</div>

<div className="album-row">
{musicFridayItems.map((item) => (
<article key={item.id} className="album-card" onClick={item.onClick}>
<img
src={item.image || DEFAULT_IMAGE}
alt={item.title}
onError={(e) => {
 e.currentTarget.src = DEFAULT_IMAGE;
 }}
/>
<h3>{item.title}</h3>
<p>{item.subtitle}</p>
</article>
 ))}
</div>
</section>

<section>
<div className="section-head">
<h2>Made For You</h2>
{isSpotifyConfigured() ? (
 spotifyConnected ? (
<a href="#">Spotify Connected</a>
 ) : (
<button
type="button"
className="chip"
onClick={() => {
connectSpotify();
 }}
>
 Connect Spotify
</button>
 )
 ) : (
<a href="#">Show all</a>
 )}
</div>

<div className="album-row">
{madeForYouItems.map((item, index) => (
<article key={item.id} className="album-card" onClick={item.onClick}>
<img
src={item.image || DEFAULT_IMAGE}
alt={item.title}
onError={(e) => {
const fallback = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length] || DEFAULT_IMAGE;
 e.currentTarget.src = fallback;
 }}
/>
<h3>{item.title}</h3>
<p>{item.subtitle}</p>
</article>
 ))}
</div>
</section>
</div>
 );
}