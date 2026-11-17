export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <p>{text}</p>
    </div>
  );
}