export default function Card({ title, subtitle, image, onClick }) {
 return (
<div
onClick={onClick}
style={{
background: "#181818",
padding: "15px",
borderRadius: "8px",
color: "white",
cursor: "pointer",
transition: "all 0.2s ease"
 }}
onMouseOver={(e) => {
e.currentTarget.style.background = "#282828";
e.currentTarget.style.transform = "scale(1.05)";
 }}
onMouseOut={(e) => {
e.currentTarget.style.background = "#181818";
e.currentTarget.style.transform = "scale(1)";
 }}
>
<img
src={image}
alt={title}
style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "6px", marginBottom: "12px" }}
/>
<p style={{ fontWeight: "bold", fontSize: "14px", margin: "0 0 6px" }}>{title}</p>
<p style={{ fontSize: "12px", color: "#b3b3b3", margin: 0, lineHeight: 1.4 }}>{subtitle}</p>
</div>
 );
}