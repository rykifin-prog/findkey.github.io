import styles from '../section-page.module.css';

export const metadata = {
  title: 'Method'
};

export default function MethodPage() {
  return (
    <main className={styles.page}>
      <span className={styles.eyebrow}>How we work</span>
      <h1 className={styles.title}>The Findkey Method</h1>
      <p className={styles.lead}>
        Every brief is built to help you understand how an issue works, why people disagree, and
        what tradeoffs are unavoidable.
      </p>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2>What Findkey is</h2>
          <p>
            Findkey is a weekly briefing service for curious independents. We write in clear,
            plain language and show what the evidence can and cannot prove.
          </p>
        </section>

        <section className={styles.card}>
          <h2>The Four Truth Framework</h2>
          <ul className={styles.list}>
            <li>
              <strong>Structural truth:</strong> How the system is designed and where pressure
              points sit.
            </li>
            <li>
              <strong>Empirical truth:</strong> What measurable evidence is strongest right now.
            </li>
            <li>
              <strong>Incentive truth:</strong> Which incentives shape behavior for each actor.
            </li>
            <li>
              <strong>Emotional truth:</strong> What people fear, value, and protect in the debate.
            </li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2>Stakeholder Map</h2>
          <p>
            We start by mapping who is affected directly, who carries second-order effects, and who
            controls decisions. This keeps the brief grounded in real people, not abstractions.
          </p>
        </section>

        <section className={styles.card}>
          <h2>What you get each week</h2>
          <p>
            Members receive one concise issue brief, source notes with confidence labels, and a
            practical set of downstream consequences and core tradeoffs to discuss with others.
          </p>
        </section>
      </div>
    </main>
  );
}
