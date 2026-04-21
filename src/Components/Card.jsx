export default function Card({ title, onClick }) {
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
     <p style={{ fontWeight: "bold", fontSize: "14px" }}>{title}</p>
    </div>
  );
}