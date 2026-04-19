export default function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#181818",
        padding: "15px",
        margin: "10px",
        color: "white",
        cursor: "pointer"
      }}
    >
      {title}
    </div>
  );
}