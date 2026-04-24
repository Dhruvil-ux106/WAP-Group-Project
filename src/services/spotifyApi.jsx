const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || window.location.origin;
const SPOTIFY_SCOPES = ["user-top-read"];

const TOKEN_KEY = "spotify_token";
const TOKEN_EXPIRY_KEY = "spotify_token_expiry";
const REFRESH_TOKEN_KEY = "spotify_refresh_token";
const PKCE_VERIFIER_KEY = "spotify_pkce_verifier";

const base64UrlEncode = (arrayBuffer) => {
const bytes = new Uint8Array(arrayBuffer);
let binary = "";
 bytes.forEach((byte) => {
 binary += String.fromCharCode(byte);
 });
return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const randomString = (length = 64) => {
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let output = "";
const randomValues = crypto.getRandomValues(new Uint8Array(length));
 randomValues.forEach((value) => {
 output += chars[value % chars.length];
 });
return output;
};

const createCodeChallenge = async (verifier) => {
const data = new TextEncoder().encode(verifier);
const digest = await crypto.subtle.digest("SHA-256", data);
return base64UrlEncode(digest);
};

const saveToken = (accessToken, expiresIn, refreshToken) => {
const expiryTime = Date.now() + expiresIn * 1000 - 60000;
 localStorage.setItem(TOKEN_KEY, accessToken);
 localStorage.setItem(TOKEN_EXPIRY_KEY, String(expiryTime));
if (refreshToken) {
 localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
 }
};

const getStoredToken = () => {
const token = localStorage.getItem(TOKEN_KEY);
const expiry = Number(localStorage.getItem(TOKEN_EXPIRY_KEY) || "0");
if (!token || !expiry || Date.now() > expiry) {
return "";
 }
return token;
};

const refreshAccessToken = async () => {
const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
if (!refreshToken || !SPOTIFY_CLIENT_ID) {
return "";
 }

const body = new URLSearchParams({
grant_type: "refresh_token",
refresh_token: refreshToken,
client_id: SPOTIFY_CLIENT_ID
 });

const response = await fetch("https://accounts.spotify.com/api/token", {
method: "POST",
headers: {
"Content-Type": "application/x-www-form-urlencoded"
 },
 body
 });

if (!response.ok) {
return "";
 }

const data = await response.json();
saveToken(data.access_token, data.expires_in, data.refresh_token || refreshToken);
return data.access_token;
};

const consumeAuthCodeFromUrl = async () => {
const url = new URL(window.location.href);
const code = url.searchParams.get("code");
if (!code || !SPOTIFY_CLIENT_ID) {
return "";
 }

const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
if (!verifier) {
return "";
 }

const body = new URLSearchParams({
grant_type: "authorization_code",
 code,
redirect_uri: SPOTIFY_REDIRECT_URI,
client_id: SPOTIFY_CLIENT_ID,
code_verifier: verifier
 });

const response = await fetch("https://accounts.spotify.com/api/token", {
method: "POST",
headers: {
"Content-Type": "application/x-www-form-urlencoded"
 },
 body
 });

if (!response.ok) {
return "";
 }

const data = await response.json();
saveToken(data.access_token, data.expires_in, data.refresh_token);

 sessionStorage.removeItem(PKCE_VERIFIER_KEY);
 url.searchParams.delete("code");
 url.searchParams.delete("state");
 window.history.replaceState({}, "", url.toString());

return data.access_token;
};

export const isSpotifyConfigured = () => Boolean(SPOTIFY_CLIENT_ID);

export const connectSpotify = async () => {
if (!SPOTIFY_CLIENT_ID) {
return;
 }

const verifier = randomString(64);
const challenge = await createCodeChallenge(verifier);
 sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);

const params = new URLSearchParams({
response_type: "code",
client_id: SPOTIFY_CLIENT_ID,
scope: SPOTIFY_SCOPES.join(" "),
redirect_uri: SPOTIFY_REDIRECT_URI,
code_challenge_method: "S256",
code_challenge: challenge
 });

 window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getSpotifyToken = async () => {
if (!SPOTIFY_CLIENT_ID) {
return "";
 }

const fromCode = await consumeAuthCodeFromUrl();
if (fromCode) {
return fromCode;
 }

const stored = getStoredToken();
if (stored) {
return stored;
 }

return refreshAccessToken();
};

const spotifyRequest = async (path) => {
const token = await getSpotifyToken();
if (!token) {
return null;
 }

const response = await fetch(`https://api.spotify.com/v1${path}`, {
headers: {
Authorization: `Bearer ${token}`
 }
 });

if (!response.ok) {
return null;
 }

return response.json();
};

export const fetchSpotifyMadeForYou = async (limit = 6) => {
const data = await spotifyRequest(`/search?q=${encodeURIComponent("made for you")}&type=playlist&limit=${limit}`);
const playlists = data?.playlists?.items || [];

return playlists
 .filter(Boolean)
 .map((item) => ({
id: item.id,
title: item.name,
subtitle: item.description ? item.description.replace(/<[^>]*>/g, "") : "From Spotify",
image: item.images?.[0]?.url || "",
onClickPath: "/search"
 }));
};
