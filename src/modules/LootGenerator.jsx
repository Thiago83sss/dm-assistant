import { useEffect, useState } from "react";
import {
  getEquipmentList,
  getEquipment,
  getMagicItemList,
  getMagicItem,
} from "../services/api";
import { generateCoins, lootRules, pickRandom } from "../utils/loot";
import Card from "../components/Card";
import Loader from "../components/Loader";

const CR_OPTIONS = ["0", "1/8", "1/4", "1/2", "1", "2", "3", "4", "5", "6", "8", "10", "12", "15", "17", "20", "24", "30"];

const COIN_INFO = {
  cp: { name: "Cobre", icon: "😐🟤😐" },
  sp: { name: "Plata", icon: "🤨⚪🤨" },
  gp: { name: "Oro", icon: "🥵🟡🥵" },
  pp: { name: "Platino", icon: "🤑🔷🤑" },
};

export default function LootGenerator() {
  const [cr, setCr] = useState("1");
  const [equipmentList, setEquipmentList] = useState([]);
  const [magicList, setMagicList] = useState([]);
  const [loot, setLoot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getEquipmentList(), getMagicItemList()])
      .then(([eq, mg]) => {
        setEquipmentList(eq.results);
        setMagicList(mg.results);
      })
      .catch((e) => setError(e.message));
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const coins = generateCoins(cr);
      const { items: count, magicChance } = lootRules(cr);

      const items = [];
      for (let i = 0; i < count; i++) {
        const isMagic = Math.random() < magicChance;
        const source = isMagic ? magicList : equipmentList;
        const ref = pickRandom(source);
        const detail = isMagic ? await getMagicItem(ref.index) : await getEquipment(ref.index);
        items.push({ ...detail, isMagic });
      }
      setLoot({ coins, items, cr });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="module">
      <h2>Generador de Botín</h2>

      <label className="label">
        Nivel de desafío del monstruo derrotado (CR)
        <select className="input" value={cr} onChange={(e) => setCr(e.target.value)}>
          {CR_OPTIONS.map((c) => (
            <option key={c} value={c}>CR {c}</option>
          ))}
        </select>
      </label>

      <button
        className="btn"
        onClick={handleGenerate}
        disabled={loading || equipmentList.length === 0}
      >
        {loading ? "Saqueando..." : "💰 Obtener botín 💰"}
      </button>

      {error && <p className="error">⚠️ {error}</p>}
      {loading && <Loader text="Buscando tesoros..." />}

      {loot && !loading && (
        <div className="loot">
          <h3>Monedas obtenidas (CR {loot.cr})</h3>
          <div className="coins">
            {Object.entries(loot.coins)
              .filter(([, v]) => v > 0)
              .map(([k, v]) => (
                <div key={k} className="coin">
                  <span className="coin__icon">{COIN_INFO[k].icon}</span>
                  <strong>{v}</strong>
                  <small>{COIN_INFO[k].name}</small>
                </div>
              ))}
          </div>

          <h3>Objetos encontrados</h3>
          {loot.items.length === 0 && <p className="muted">Esta vez no hubo objetos.</p>}
          <div className="grid">
            {loot.items.map((it, i) => (
              <Card
                key={`${it.index}-${i}`}
                title={it.name}
                subtitle={it.isMagic ? `✨ Mágico · ${it.rarity?.name ?? ""}` : it.equipment_category?.name}
                stats={
                  it.isMagic
                    ? [{ label: "Rareza", value: it.rarity?.name ?? "-" }]
                    : [
                        { label: "Costo", value: it.cost ? `${it.cost.quantity} ${it.cost.unit}` : "-" },
                        { label: "Peso", value: it.weight ?? "-" },
                      ]
                }
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}