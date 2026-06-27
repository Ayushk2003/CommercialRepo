export default function DropsSection({ content }) {
  return (
    <section className="section compact" id="drops" aria-labelledby="dropsTitle">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="dropsTitle">{content.title}</h2>
        </div>
      </div>
      <div className="drop-board">
        {content.items.map((drop) => (
          <article key={drop.title}>
            <span className="drop-time">{drop.time}</span>
            <strong>{drop.title}</strong>
            <p>{drop.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
