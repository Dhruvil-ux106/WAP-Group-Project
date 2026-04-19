export default function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
  background: "#181818",
  padding: "20px",
  margin: "10px",
  borderRadius: "8px"
}}
    >
      {title}
    </div>
  );
}