import { useEffect, useState } from "react";
import { getMonsterList, getMonster } from "../services/api";
import Card from "../components/Card";
import Loader from "../components/Loader";

const PAGE_SIZE = 12;

export default function Bestiary() {
  const [list, setList] = useState([]);  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [details, setDetails] = useState({});  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMonsterList()
      .then((data) => setList(data.results))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = list.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    visible.forEach((m) => {
      if (!details[m.index]) {
        getMonster(m.index)
          .then((d) => setDetails((prev) => ({ ...prev, [m.index]: d })))
          .catch(() => {});
      }
    });
  }, [page, search, list]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  if (loading) return <Loader text="Invocando criaturas..." />;
  if (error) return <p className="error">💀⚠️💀 {error}</p>;

  return (
    <section className="module">
      <h2>Bestiario</h2>

      <input
        className="input"
        type="search"
        placeholder="Buscar monstruo"
        value={search}
        onChange={handleSearch}
      />

      <p className="muted">{filtered.length} criaturas encontradas</p>

      <div className="grid">
        {visible.map((m) => {
          const d = details[m.index];
          return (
            <Card
              key={m.index}
              title={m.name}
              subtitle={d ? `${d.size} ${d.type}` : "Cargando..."}
              image={d?.image ? `https://www.dnd5eapi.co${d.image}` : null}
              stats={
                d
                  ? [
                      { label: "Armadura (AC)", value: d.armor_class?.[0]?.value ?? "-" },
                      { label: "Puntos de golpe (HP)", value: d.hit_points },
                      { label: "Desafío (CR)", value: d.challenge_rating },
                    ]
                  : []
              }
            />
          );
        })}
      </div>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Anterior
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
          Siguiente
        </button>
      </div>
    </section>
  );
}