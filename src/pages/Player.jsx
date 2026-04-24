import { useState } from "react";

export default function Player() {
const [song, setSong] = useState("No song playing");

return (
<div
style={{
position: "fixed",
bottom: 0,
width: "100%",
background: "#000000ff",
color: "white",
padding: "12px",
borderTop: "1px solid #000000ff",
display: "flex",
justifyContent: "space-between",
alignItems: "center"
 }}
>
<div>
<p style={{ margin: 0 }}>{song}</p>
</div>
<div>
<button>⏮</button>
<button>▶</button>
<button>⏭</button>
</div>
<div>
<input type="range" />
</div>
</div>
 );
}