const TABS = [
  { id: "bestiary", label: "Bestiario", icon: "🥵🐉🥵" },
  { id: "loot", label: "Botín", icon: "💰💰💰" },
  { id: "dice", label: "Dados", icon: "🎰🎲🎰" },
];

export default function Navbar({ active, onChange }) {
  return (
    <nav className="navbar">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`navbar__btn ${active === t.id ? "is-active" : ""}`}
          onClick={() => onChange(t.id)}
        >
          <span className="navbar__icon">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}