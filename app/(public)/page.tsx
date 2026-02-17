import styles from './page.module.css';

export default function PublicLandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <section>
          <div className={styles.brand}>FINDKEY</div>

          <h1 className={styles.heading}>Clarity before the conversation.</h1>
          <span className={styles.tagline}>Civilizing Discourse.</span>

          <p className={styles.description}>
            A clear, balanced view of every side of an issue — so you understand where others
            are coming from before you speak.
          </p>

          <form
            action="https://buttondown.com/api/emails/embed-subscribe/findkey"
            method="post"
            className={styles.signup}
          >
            <label htmlFor="landing-email" className="visually-hidden">
              Enter your email
            </label>
            <input
              id="landing-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className={styles.signupInput}
            />
            <br />
            <button type="submit" className={styles.signupButton}>
              Become a member
            </button>
          </form>
        </section>

        <aside className={styles.previewCard} aria-label="Sample email preview">
          <div className={styles.previewLabel}>Sample weekly brief</div>
          <div className={styles.emailMeta}>
            From: Findkey &lt;brief@findkey.io&gt;
            <br />
            Subject line preview for subscribers
          </div>
          <div className={styles.emailSubject}>This week: Where the housing debate actually splits</div>
          <div className={styles.emailBody}>
            <p>Hi there,</p>
            <p>
              This week we map the strongest arguments on housing affordability, zoning reform,
              and public investment — without the usual shouting.
            </p>
            <ul>
              <li>
                <strong>Core tension:</strong> speed vs. stability in local neighborhoods
              </li>
              <li>
                <strong>What each side gets right:</strong> fairness, supply, and long-term impact
              </li>
              <li>
                <strong>Conversation starter:</strong> one question to ask before taking a position
              </li>
            </ul>
            <p>You leave with a clearer understanding of why reasonable people disagree.</p>
            <p>— The Findkey team</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
