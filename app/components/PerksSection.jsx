import { CheckCircle2, CreditCard, Sparkles } from "lucide-react";

const icons = {
  check: CheckCircle2,
  credit: CreditCard,
  sparkles: Sparkles
};

export default function PerksSection({ content }) {
  return (
    <section className="perks" id="perks" aria-labelledby="perksTitle">
      <div>
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="perksTitle">{content.title}</h2>
      </div>
      <ul>
        {content.items.map((item) => {
          const Icon = icons[item.icon] || Sparkles;
          return <li key={item.title}><Icon size={24} /><strong>{item.title}</strong><span>{item.text}</span></li>;
        })}
      </ul>
    </section>
  );
}
