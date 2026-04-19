export default function SongRow({ name }) {
  return (
    <div
      style={{
        padding: "10px",
        borderBottom: "1px solid #333",
        cursor: "pointer"
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = "#282828")}
      onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {name}
    </div>
  );
}