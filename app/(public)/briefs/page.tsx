import type { Metadata } from 'next';

import styles from './page.module.css';

const briefEntries = [
  {
    title: 'Housing Supply vs. Local Control',
    question:
      'How can cities add enough homes quickly while preserving neighborhood stability and trust?',
    stakeholders: ['Renters', 'Homeowners', 'City Planning Departments', 'Developers'],
    status: 'Public Preview →',
  },
  {
    title: 'AI in Classrooms',
    question:
      'What is the fair role of AI tools in learning without weakening core reading and writing skills?',
    stakeholders: ['Students', 'Teachers', 'School Administrators', 'Parents'],
    status: 'Member Full Brief →',
  },
  {
    title: 'Transit Safety Enforcement',
    question:
      'Which mix of policing, social services, and infrastructure changes improves safety most reliably?',
    stakeholders: ['Daily Riders', 'Transit Agencies', 'City Governments', 'Service Workers'],
    status: 'Member Full Brief →',
  },
];

const briefArchitecture = [
  'Core Question',
  'Stakeholder Map',
  'Structural Truth',
  'Empirical Truth',
  'Incentive Truth',
  'Emotional Truth',
  'Downstream Consequences',
  'Conversation Articulation',
];

export const metadata: Metadata = {
  title: 'Weekly Issue Briefs | Findkey',
  description:
    'See how Findkey briefs are structured each week, with clear issue mapping, stakeholders, evidence, and articulation-ready outputs.',
};

export default function BriefsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1 className={styles.title}>Weekly Issue Briefs</h1>
          <p className={styles.subtext}>
            Each week, one live issue.
            <br />
            Mapped clearly.
            <br />
            Argued fairly.
            <br />
            Structured for articulation.
          </p>
        </header>

        <section className={styles.section} aria-labelledby="brief-includes-heading">
          <h2 id="brief-includes-heading" className={styles.sectionTitle}>
            What a Brief Includes
          </h2>
          <p className={styles.sectionIntro}>Every brief follows the same architecture.</p>

          <ul className={styles.architectureList}>
            {briefArchitecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="sample-briefs-heading">
          <h2 id="sample-briefs-heading" className={styles.sectionTitle}>
            Sample Briefs
          </h2>

          <div className={styles.cards}>
            {briefEntries.map((entry) => (
              <article key={entry.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{entry.title}</h3>
                <p className={styles.cardRow}>
                  <strong>Core Question:</strong> {entry.question}
                </p>
                <p className={styles.cardRow}>
                  <strong>Stakeholders:</strong> {entry.stakeholders.join(', ')}
                </p>
                <p className={styles.cardStatus}>
                  <strong>Status:</strong> {entry.status}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.conversion} aria-labelledby="membership-heading">
          <h2 id="membership-heading" className={styles.sectionTitle}>
            Become a Member
          </h2>
          <p className={styles.conversionCopy}>
            Access full weekly briefs and the complete archive.
          </p>

          <form
            action="https://buttondown.com/api/emails/embed-subscribe/findkey"
            method="post"
            className={styles.signup}
          >
            <label htmlFor="briefs-email" className="visually-hidden">
              Enter your email
            </label>
            <input
              id="briefs-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className={styles.signupInput}
            />
            <button type="submit" className={styles.signupButton}>
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
