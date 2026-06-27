export default function ClothingComingSoon({ content }) {
  return (
    <section className="clothing-coming" id="clothing-coming-soon" aria-labelledby="clothingComingSoonTitle">
      <div className="clothing-inner">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="clothingComingSoonTitle">{content.title}</h2>
        <p className="clothing-desc">{content.description}</p>

        <div className="coming-bullets" role="list">
          {content.bullets.map((b) => (
            <div className="coming-bullet" role="listitem" key={b.title}>
              <strong>{b.title}</strong>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

