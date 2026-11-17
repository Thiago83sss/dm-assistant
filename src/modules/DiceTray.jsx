import { useState } from "react";

const DICE = [4, 6, 8, 10, 12, 20, 100];

export default function DiceTray() {
  const [selected, setSelected] = useState(20);
  const [result, setResult] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const roll = () => {
    setRolling(true);

    
    let ticks = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * selected) + 1);
      ticks++;
      if (ticks >= 10) {
        clearInterval(interval);
        const final = Math.floor(Math.random() * selected) + 1; // rango 1..N
        setResult(final);
        setHistory((h) => [{ die: selected, value: final }, ...h].slice(0, 8));
        setRolling(false);
      }
    }, 60);
  };

  const isCrit = selected === 20 && result === 20 && !rolling;
  const isFail = selected === 20 && result === 1 && !rolling;

  return (
    <section className="module">
      <h2>Bandeja de dados</h2>

      <div className="dice-select">
        {DICE.map((d) => (
          <button
            key={d}
            className={`die-btn ${selected === d ? "is-active" : ""}`}
            onClick={() => setSelected(d)}
          >
            d{d}
          </button>
        ))}
      </div>

      <div
        className={`die-result ${rolling ? "is-rolling" : ""} ${isCrit ? "is-crit" : ""} ${isFail ? "is-fail" : ""}`}
      >
        {result ?? "?"}
      </div>

      {isCrit && <p className="crit-text">¡CRÍTICO! 🤑🎉🤑</p>}
      {isFail && <p className="fail-text">¡PIFIA! 💀💀💀</p>}

      <button className="btn" onClick={roll} disabled={rolling}>
        🎲 Lanzar d{selected}
      </button>

      {history.length > 0 && (
        <div className="history">
          <h3>Historial</h3>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                d{h.die} → <strong>{h.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}