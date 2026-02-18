import type { Metadata } from 'next';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Philosophy | Findkey',
  description:
    'Findkey exists to support clearer thinking and calmer communication by separating structural, empirical, incentive, and emotional claims.',
};

export default function PhilosophyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <header className={styles.hero}>
            <h1 className={styles.heading}>Philosophy</h1>
            <p className={styles.heroCopy}>Findkey is infrastructure for reasoning.</p>
            <p className={styles.heroCopy}>
              It does not tell readers what to think. It provides a consistent way to see what is
              being argued.
            </p>
          </header>

          <section className={styles.section}>
            <p className={styles.label}>Orientation</p>
            <h2 className={styles.sectionHeading}>Clarity before the conversation</h2>
            <p className={styles.bodyCopy}>
              Many public conversations fail for a simple reason: people argue at different layers
              without realizing it.
            </p>
            <p className={styles.bodyCopy}>
              Structural constraints are treated like opinions. Feelings are treated like evidence.
              Incentives are treated like virtue. And isolated facts are treated like conclusions.
            </p>
            <p className={styles.bodyCopy}>
              Findkey exists to separate these layers so disagreement can be navigated with
              precision rather than escalation.
            </p>
          </section>

          <section className={styles.section}>
            <p className={styles.label}>Commitments</p>
            <h2 className={styles.sectionHeading}>What Findkey is</h2>
            <ul className={styles.list}>
              <li>A structured protocol applied to live issues.</li>
              <li>A calm, repeatable format that improves clarity through consistency.</li>
              <li>A weekly case study archive that models disciplined reasoning in practice.</li>
              <li>A tool for curious professionals who want to see beyond headlines.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <p className={styles.label}>Boundaries</p>
            <h2 className={styles.sectionHeading}>What Findkey is not</h2>
            <ul className={styles.list}>
              <li>Not a news organization.</li>
              <li>Not commentary.</li>
              <li>Not ideological persuasion.</li>
              <li>Not debate coaching or social performance.</li>
              <li>Not a forum or discussion platform.</li>
            </ul>
            <p className={styles.bodyCopy}>
              The work is the diagram. What readers do with it is their choice.
            </p>
          </section>

          <section className={styles.section}>
            <p className={styles.label}>Membership</p>
            <h2 className={styles.sectionHeading}>Why membership exists</h2>
            <p className={styles.bodyCopy}>
              The methodology is transparent and self-contained. The value of membership is the
              consistent application of that methodology to live issues, week after week.
            </p>
            <p className={styles.bodyCopy}>
              A recipe book is useful. A kitchen that cooks on a disciplined cadence creates habit,
              calibration, and compounding skill.
            </p>
            <p className={styles.bodyCopy}>
              If readers internalize the framework and eventually rely on it independently, that is
              success.
            </p>
          </section>

          <section className={styles.section}>
            <p className={styles.label}>Standard</p>
            <h2 className={styles.sectionHeading}>Calm and quietly advantaged</h2>
            <p className={styles.bodyCopy}>
              Findkey aims for a specific internal outcome: readers become calmer, clearer, and
              more difficult to manipulate.
            </p>
            <p className={styles.bodyCopy}>
              The advantage is not rhetorical dominance. It is perceptual stability—seeing behind
              the curtain of how arguments are assembled.
            </p>
            <p className={styles.emphasis}>Clarity is not a posture.</p>
            <p className={styles.emphasis}>It is a practice.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
