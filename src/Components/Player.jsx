import { useEffect, useMemo, useRef, useState } from "react";

export default function Player({ currentTrack, isPlaying, setIsPlaying, onNext, onPrev, onEnded }) {
const [progress, setProgress] = useState(0);
const [duration, setDuration] = useState(0);
const audioRef = useRef(null);

useEffect(() => {
const audio = audioRef.current;
if (!audio) {
return;
 }

const handleTimeUpdate = () => {
if (!audio.duration || Number.isNaN(audio.duration)) {
setProgress(0);
return;
 }
setProgress((audio.currentTime / audio.duration) * 100);
 };

const handleLoadedMetadata = () => {
setDuration(audio.duration || 0);
 };

const handleEnded = () => {
if (onEnded) {
onEnded();
 }
 };

 audio.addEventListener("timeupdate", handleTimeUpdate);
 audio.addEventListener("loadedmetadata", handleLoadedMetadata);
 audio.addEventListener("ended", handleEnded);

return () => {
 audio.removeEventListener("timeupdate", handleTimeUpdate);
 audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
 audio.removeEventListener("ended", handleEnded);
 };
 }, [onEnded]);

useEffect(() => {
const audio = audioRef.current;
const streamUrl = currentTrack?.fullUrl || currentTrack?.audioUrl || currentTrack?.previewUrl;
if (!audio || !streamUrl) {
return;
 }

 audio.src = streamUrl;
setProgress(0);
setDuration(0);

if (isPlaying) {
 audio.play().catch(() => {
setIsPlaying(false);
 });
 }
 }, [currentTrack, setIsPlaying]);

useEffect(() => {
const audio = audioRef.current;
const streamUrl = currentTrack?.fullUrl || currentTrack?.audioUrl || currentTrack?.previewUrl;
if (!audio || !streamUrl) {
return;
 }

if (isPlaying) {
 audio.play().catch(() => {
setIsPlaying(false);
 });
 } else {
 audio.pause();
 }
 }, [isPlaying, currentTrack, setIsPlaying]);

const progressLabel = useMemo(() => {
const seconds = Math.floor((progress / 100) * (duration || 0));
const mins = Math.floor(seconds / 60);
const secs = String(seconds % 60).padStart(2, "0");
return `${mins}:${secs}`;
 }, [progress, duration]);

const totalLabel = useMemo(() => {
const seconds = Math.floor(duration || 0);
const mins = Math.floor(seconds / 60);
const secs = String(seconds % 60).padStart(2, "0");
return `${mins}:${secs}`;
 }, [duration]);

const seekTrack = (value) => {
const audio = audioRef.current;
setProgress(value);
if (!audio || !audio.duration) {
return;
 }
 audio.currentTime = (value / 100) * audio.duration;
 };

const streamUrl = currentTrack?.fullUrl || currentTrack?.audioUrl || currentTrack?.previewUrl;
const canPlayAudio = Boolean(streamUrl);

return (
<div
style={{
position: "fixed",
bottom: 0,
left: 0,
right: 0,
height: "90px",
background: "#0b0b0b",
borderTop: "1px solid #2a2a2a",
color: "#fff",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
padding: "0 14px",
zIndex: 20
 }}
>
<audio ref={audioRef} preload="metadata" />

<div style={{ minWidth: "240px", display: "grid", gridTemplateColumns: "56px 1fr", gap: "10px", alignItems: "center" }}>
<img
src={currentTrack?.artwork || "https://dummyimage.com/56x56/1f1f1f/999.png&text=%E2%99%AB"}
alt={currentTrack?.title || "track"}
style={{ width: "56px", height: "56px", borderRadius: "6px", objectFit: "cover" }}
/>
<div>
<div style={{ fontWeight: 700, fontSize: "13px" }}>
{currentTrack?.title || "No song selected"}
</div>
<div style={{ fontSize: "11px", color: "#b3b3b3" }}>
{currentTrack?.artist || currentTrack?.sourceLabel || "Select any track to start"}
</div>
</div>
</div>

<div
style={{
display: "flex",
flexDirection: "column",
alignItems: "center",
gap: "8px",
width: "min(560px, 56vw)"
 }}
>
<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
<button
type="button"
onClick={onPrev}
style={{ background: "transparent", border: "none", color: "#b3b3b3", cursor: "pointer", fontSize: "14px" }}
>
 ⏮
</button>

<button
onClick={() => canPlayAudio && setIsPlaying((prev) => !prev)}
disabled={!canPlayAudio}
style={{
background: canPlayAudio ? "#1db954" : "#4a4a4a",
border: "none",
borderRadius: "999px",
width: "34px",
height: "34px",
cursor: canPlayAudio ? "pointer" : "not-allowed",
fontSize: "14px"
 }}
aria-label={isPlaying ? "Pause" : "Play"}
>
{isPlaying ? "❚❚" : "▶"}
</button>

<button
type="button"
onClick={onNext}
style={{ background: "transparent", border: "none", color: "#b3b3b3", cursor: "pointer", fontSize: "14px" }}
>
 ⏭
</button>
</div>

<div style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px" }}>
<span style={{ fontSize: "11px", color: "#b3b3b3", minWidth: "34px" }}>{progressLabel}</span>
<input
type="range"
min="0"
max="100"
value={progress}
onChange={(e) => seekTrack(Number(e.target.value))}
style={{ width: "100%", accentColor: "#fff" }}
/>
<span style={{ fontSize: "11px", color: "#b3b3b3", minWidth: "34px" }}>{totalLabel}</span>
</div>
</div>

<div style={{ minWidth: "180px", textAlign: "right", color: "#b3b3b3", fontSize: "12px", display: "flex", gap: "12px", justifyContent: "flex-end", alignItems: "center" }}>
<span>⤴</span>
<span>≡</span>
<span>🖵</span>
<span style={{ width: "64px", height: "4px", borderRadius: "999px", background: "#7f7f7f", display: "inline-block" }} />
</div>
</div>
 );
}
