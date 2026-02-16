import Link from 'next/link';
import styles from './page.module.css';

const frameworkItems = [
  {
    title: 'Structural Truth',
    body: 'What are the parts of the system, and how do they interact? This layer maps the mechanics so the issue is not reduced to slogans.'
  },
  {
    title: 'Empirical Truth',
    body: 'What can we verify with evidence right now? This layer separates measured facts from assumptions and marks where confidence is low.'
  },
  {
    title: 'Incentive Truth',
    body: 'What does each actor gain or lose? This layer explains behavior through incentives instead of good-versus-bad stories.'
  },
  {
    title: 'Emotional Truth',
    body: 'What are people feeling, and why do those feelings persist? This layer gives context for reactions that data alone cannot explain.'
  }
];

export default function PhilosophyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topNav}>
          <Link href="/">Home</Link>
          <Link href="/pricing">Pricing</Link>
          <span className={styles.current}>Philosophy</span>
        </div>

        <header className={styles.header}>
          <p className={styles.kicker}>Findkey Philosophy</p>
          <h1>Think in systems before taking sides.</h1>
          <p>
            Findkey exists to improve judgment, not to win arguments. We turn noisy public issues
            into clear maps of structure, evidence, incentives, and human response so professionals
            can reason with discipline and act with confidence.
          </p>
        </header>

        <section>
          <h2>What we are fundamentally building</h2>
          <p>
            Most commentary rewards speed, certainty, and emotional heat. That format can be useful
            for entertainment, but it is weak for decision-making. Findkey is built on a different
            belief: careful structure beats strong opinion when stakes are real.
          </p>
        </section>

        <section>
          <h2>The method: issue diagramming</h2>
          <p>
            Every issue is decomposed into distinct truth layers so readers can see the full shape
            of a problem before forming a view. The model is repeatable, which means you can compare
            topics with the same lens instead of starting from scratch each week.
          </p>
          <ul className={styles.frameworkList}>
            {frameworkItems.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <p>
            Traditional opinion writing compresses these layers into a single narrative voice.
            Findkey keeps them separate on purpose, so tradeoffs and uncertainty stay visible.
          </p>
        </section>

        <section>
          <h2>Who this is for</h2>
          <p>
            Findkey serves ambitious professionals, operators, and builders who are expected to make
            choices under uncertainty. They face information overload, biased framing, and fractured
            context across sources. They do not need more takes; they need cleaner reasoning.
          </p>
        </section>

        <section>
          <h2>What readers gain</h2>
          <p>
            Readers get cognitive clarity: a sharper view of what matters and what does not. They
            gain language for real tradeoffs, not false binaries. Over time, the framework becomes a
            practical mental model they can reuse in meetings, writing, strategy, and policy work.
          </p>
        </section>

        <section className={styles.closing}>
          <h2>Our commitment</h2>
          <p>
            We publish with a calm tone, explicit evidence standards, and clear uncertainty labeling.
            If you value rigor over rhetoric, a Findkey subscription gives you a weekly practice in
            disciplined thinking—designed to improve the quality of your decisions, not just your
            opinions.
          </p>
          <Link href="/pricing" className={styles.cta}>
            View subscription options
          </Link>
        </section>
      </div>
    </main>
  );
}
