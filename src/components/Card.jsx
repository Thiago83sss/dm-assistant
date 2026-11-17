export default function Card({ title, subtitle, image, stats = [], children, onClick }) {
  return (
    <article className="card" onClick={onClick}>
      {image && <img className="card__img" src={image} alt={title} loading="lazy" />}
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        {subtitle && <p className="card__subtitle">{subtitle}</p>}

        {stats.length > 0 && (
          <ul className="card__stats">
            {stats.map((s) => (
              <li key={s.label}>
                <span className="card__stat-label">{s.label}</span>
                <span className="card__stat-value">{s.value}</span>
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>
    </article>
  );
}