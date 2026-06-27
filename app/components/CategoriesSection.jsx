export default function CategoriesSection({ content }) {
  return (
    <section className="section" id="categories" aria-labelledby="categoriesTitle">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="categoriesTitle">{content.title}</h2>
        </div>
        <a className="text-link" href={content.link.href}>{content.link.label}</a>
      </div>
      <div className="category-grid">
        {content.featured.map((item) => (
          <article className={`category-tile ${item.className}`} key={item.label}>
            <div><span>{item.label}</span><strong>{item.text}</strong></div>
          </article>
        ))}
        {content.mini.map((item) => (
          <article className={`mini-category ${item.tone}`} key={item.label}><span>{item.label}</span><strong>{item.text}</strong></article>
        ))}
      </div>
    </section>
  );
}
