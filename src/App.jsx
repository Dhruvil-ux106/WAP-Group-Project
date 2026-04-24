import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Player from "./Components/Player";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Library from "./pages/Library";
import "./App.css";

export default function App() {
const [currentTrack, setCurrentTrack] = useState(null);
const [isPlaying, setIsPlaying] = useState(false);
const [queue, setQueue] = useState([]);
const [currentIndex, setCurrentIndex] = useState(-1);
const [customPlaylists, setCustomPlaylists] = useState(() => {
try {
const raw = localStorage.getItem("customPlaylists");
return raw ? JSON.parse(raw) : [];
 } catch {
return [];
 }
 });

useEffect(() => {
localStorage.setItem("customPlaylists", JSON.stringify(customPlaylists));
 }, [customPlaylists]);

const playTrackFromList = (trackList, startIndex = 0, sourceLabel = "Playlist") => {
if (!trackList || trackList.length === 0) {
return;
 }

const normalizedQueue = trackList.map((track) => ({
...track,
sourceLabel
 }));

const safeIndex = Math.max(0, Math.min(startIndex, normalizedQueue.length - 1));
setQueue(normalizedQueue);
setCurrentIndex(safeIndex);
setCurrentTrack(normalizedQueue[safeIndex]);
setIsPlaying(true);
 };

const playNext = () => {
if (queue.length === 0) {
return;
 }
const nextIndex = (currentIndex + 1) % queue.length;
setCurrentIndex(nextIndex);
setCurrentTrack(queue[nextIndex]);
setIsPlaying(true);
 };

const playPrev = () => {
if (queue.length === 0) {
return;
 }
const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
setCurrentIndex(prevIndex);
setCurrentTrack(queue[prevIndex]);
setIsPlaying(true);
 };

const addTrackToCustomPlaylist = (track) => {
const input = window.prompt("Enter playlist name");
if (!input) {
return;
 }

const playlistName = input.trim();
if (!playlistName) {
return;
 }

setCustomPlaylists((prev) => {
const existingIndex = prev.findIndex(
 (item) => item.name.toLowerCase() === playlistName.toLowerCase()
 );

if (existingIndex === -1) {
return [
...prev,
 {
id: `custom-${Date.now()}`,
name: playlistName,
tracks: [{ ...track, sourceLabel: playlistName }]
 }
 ];
 }

const next = [...prev];
const alreadyAdded = next[existingIndex].tracks.some((t) => t.id === track.id);
if (!alreadyAdded) {
 next[existingIndex] = {
...next[existingIndex],
tracks: [...next[existingIndex].tracks, { ...track, sourceLabel: playlistName }]
 };
 }
return next;
 });
 };

return (
<BrowserRouter>
<div className="app-shell">
<Sidebar />

<main className="app-main">
<Navbar />

<div className="main-panel">
<Routes>
<Route path="/" element={<Home />} />
<Route
path="/playlist/:id"
element={
<Playlist
playTrackFromList={playTrackFromList}
currentTrack={currentTrack}
addTrackToCustomPlaylist={addTrackToCustomPlaylist}
/>
}
/>
<Route
path="/search"
element={
<Search
playTrackFromList={playTrackFromList}
currentTrack={currentTrack}
addTrackToCustomPlaylist={addTrackToCustomPlaylist}
/>
}
/>
<Route
path="/library"
element={
<Library
customPlaylists={customPlaylists}
playTrackFromList={playTrackFromList}
currentTrack={currentTrack}
/>
}
/>
</Routes>
</div>

</main>

<Player
currentTrack={currentTrack}
isPlaying={isPlaying}
setIsPlaying={setIsPlaying}
onNext={playNext}
onPrev={playPrev}
onEnded={playNext}
/>
</div>
</BrowserRouter>
 );
}