import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const titles = {
"/": "Home",
"/search": "Search",
"/library": "Your Library"
};

export default function Navbar() {
const location = useLocation();
const navigate = useNavigate();
const [searchInput, setSearchInput] = useState("");

const title = location.pathname.startsWith("/playlist/")
? "Playlist"
: (titles[location.pathname] || "Spotify Clone");

useEffect(() => {
const params = new URLSearchParams(location.search);
const q = params.get("q") || "";
if (location.pathname === "/search") {
setSearchInput(q);
 }
 }, [location.pathname, location.search]);

const submitGlobalSearch = () => {
const value = searchInput.trim();
if (!value) {
navigate("/search");
return;
 }
navigate(`/search?q=${encodeURIComponent(value)}`);
 };

return (
<div
style={{
display: "flex",
alignItems: "center",
justifyContent: "space-between",
marginBottom: "12px",
padding: "0 2px"
 }}
>
<div style={{ display: "flex", gap: "8px", minWidth: "86px" }}>
<button
type="button"
onClick={() => navigate(-1)}
style={{ background: "#090909", color: "#a6a6a6", border: "1px solid #242424", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer" }}
>
 ←
</button>
<button
type="button"
onClick={() => navigate(1)}
style={{ background: "#090909", color: "#a6a6a6", border: "1px solid #242424", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer" }}
>
 →
</button>
</div>

<form
onSubmit={(e) => {
 e.preventDefault();
submitGlobalSearch();
 }}
style={{ width: "min(640px, 72%)", background: "#101115", border: "1px solid #2b2b2b", borderRadius: "999px", padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}
>
<button
type="submit"
style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#242424", display: "grid", placeItems: "center", color: "#d8d8d8", border: "none", cursor: "pointer" }}
>
 ⌕
</button>
<input
value={searchInput}
onChange={(e) => setSearchInput(e.target.value)}
placeholder="What do you want to play?"
style={{
background: "transparent",
color: "#f1f1f1",
border: "none",
outline: "none",
fontSize: "14px",
flex: 1
 }}
/>
<span style={{ color: "#6f6f6f", fontSize: "18px" }}>☰</span>
</form>

<div
style={{
width: "34px",
height: "34px",
borderRadius: "50%",
background: "#2d2d2d",
display: "grid",
placeItems: "center",
fontWeight: 700,
color: "#efefef",
border: "1px solid #414141"
 }}
title={title}
>
 U
</div>
</div>
 );
}
