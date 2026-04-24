import { fallbackTracks } from "../data/data";

const ITUNES_URL = "https://itunes.apple.com/search";

const normalizeTrack = (item) => ({
id: String(item.trackId || item.collectionId || `${item.artistName}-${item.trackName}`),
title: item.trackName || "Unknown title",
artist: item.artistName || "Unknown artist",
album: item.collectionName || "Unknown album",
artwork: item.artworkUrl100 || item.artworkUrl60 || "",
duration: item.trackTimeMillis ? Math.floor(item.trackTimeMillis / 1000) : 0,
previewUrl: item.previewUrl || ""
});

const fetchItunes = async (term, limit = 20) => {
const params = new URLSearchParams({
 term,
entity: "song",
limit: String(limit)
 });

const response = await fetch(`${ITUNES_URL}?${params.toString()}`);
if (!response.ok) {
throw new Error("Failed to fetch tracks");
 }

const data = await response.json();
return (data.results || []).map(normalizeTrack);
};

const findFallbackMatches = (query, limit = 24) => {
const q = query.toLowerCase();
const matches = fallbackTracks.filter((track) => (
 track.title.toLowerCase().includes(q)
|| track.artist.toLowerCase().includes(q)
|| track.album.toLowerCase().includes(q)
 ));

if (matches.length > 0) {
return matches.slice(0, limit);
 }

return fallbackTracks.slice(0, Math.min(limit, fallbackTracks.length));
};

export const fetchPlaylistTracks = async (playlist, limit = 20) => {
if (Array.isArray(playlist?.localTracks) && playlist.localTracks.length > 0) {
return playlist.localTracks;
 }

try {
const tracks = await fetchItunes(playlist.query, limit);
if (tracks.length === 0) {
return fallbackTracks;
 }
return tracks;
 } catch {
return fallbackTracks;
 }
};

export const searchTracks = async (query, limit = 24) => {
if (!query || query.trim().length < 2) {
return [];
 }

try {
const results = await fetchItunes(query.trim(), limit);
if (results.length > 0) {
return results;
 }
return findFallbackMatches(query, limit);
 } catch {
return findFallbackMatches(query, limit);
 }
};
