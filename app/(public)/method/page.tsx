import type { Metadata } from 'next';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Method | Findkey',
  description:
    'Findkey applies a structured reasoning protocol to live issues: stakeholder mapping, the Four Truths framework, and historical context.',
};

export default function MethodPage() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <header className={styles.hero}>
            <h1 className={styles.heading}>The Method</h1>
            <p className={styles.heroCopy}>
            Findkey applies a structured reasoning protocol to live issues.
            <br />
            The objective is not persuasion.
            <br />
            The objective is clarity.
            </p>
            <p className={styles.heroCopy}>Before conclusions, we map structure.</p>
          </header>

          <section className={styles.section}>
            <p className={styles.label}>Foundation</p>
            <h2 className={styles.sectionHeading}>Stakeholder Mapping</h2>
            <p className={styles.bodyCopy}>
            Every issue affects different actors differently. Before evaluating
            arguments, we identify who is affected, who holds power, and how
            costs and benefits are distributed.
            </p>
            <p className={styles.bodyCopy}>
            This step prevents debate from becoming abstract. It makes the
            system legible.
            </p>

            <ul className={styles.list}>
              <li>Direct stakeholders</li>
              <li>Indirect stakeholders</li>
              <li>Decision-makers</li>
              <li>Cost bearers</li>
              <li>Beneficiaries</li>
            </ul>
          </section>

          <section className={styles.section}>
            <p className={styles.label}>Framework</p>
            <h2 className={styles.sectionHeading}>The Four Truths</h2>
            <p className={styles.bodyCopy}>
              Public issues often blend multiple layers of reality. Findkey separates them into four
              categories to reduce conflation and improve clarity.
            </p>

            <div className={styles.truthBlocks}>
            <div>
              <h3 className={styles.truthHeading}>Structural Truth</h3>
              <p className={styles.truthSubtitle}>How the system actually works.</p>
              <p className={styles.bodyCopy}>
                Legal architecture, institutional rules, economic mechanics, and
                procedural constraints. This layer defines what is possible and
                what is not.
              </p>
            </div>

            <div className={styles.separator} />

            <div>
              <h3 className={styles.truthHeading}>Empirical Truth</h3>
              <p className={styles.truthSubtitle}>What measurable evidence shows.</p>
              <p className={styles.bodyCopy}>
                Data, documented outcomes, and observable results. This layer
                distinguishes what has happened from what is assumed.
              </p>
            </div>

            <div className={styles.separator} />

            <div>
              <h3 className={styles.truthHeading}>Incentive Truth</h3>
              <p className={styles.truthSubtitle}>Who benefits, who loses, and why.</p>
              <p className={styles.bodyCopy}>
                Incentives shape behavior. This layer identifies the rewards,
                risks, and constraints facing the major actors, and explains why
                patterns persist.
              </p>
            </div>

            <div className={styles.separator} />

            <div>
              <h3 className={styles.truthHeading}>Emotional Truth</h3>
              <p className={styles.truthSubtitle}>What people are feeling, and why it resonates.</p>
              <p className={styles.bodyCopy}>
                Narratives, identity, fear, hope, and perceived dignity. Emotion
                is not dismissed. It is identified as a distinct layer that
                shapes reaction and intensity.
              </p>
            </div>
          </div>
          </section>

          <section className={styles.section}>
            <p className={styles.label}>Context</p>
            <h2 className={styles.sectionHeading}>Historical Context</h2>
            <p className={styles.bodyCopy}>
            No issue emerges in isolation. Findkey situates each topic within
            precedent, prior policy cycles, technological shifts, and
            institutional evolution.
            </p>
            <p className={styles.bodyCopy}>
            Historical context reduces present bias and clarifies whether a
            conflict is new, cyclical, or structural.
            </p>
          </section>

          <section className={styles.section}>
            <p className={styles.label}>Application</p>
            <h2 className={styles.sectionHeading}>Why Structure Matters</h2>
            <p className={styles.bodyCopy}>
            Arguments collapse when layers are conflated. Data is mistaken for
            morality. Emotion is presented as evidence. Incentives are framed as
            virtue.
            </p>
            <p className={styles.bodyCopy}>
            Separating these layers reduces escalation, clarifies tradeoffs, and
            improves articulation without telling anyone what to think.
            </p>

            <p className={styles.emphasis}>The goal is not to win arguments.</p>
            <p className={styles.emphasis}>It is to understand what is actually being argued.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
