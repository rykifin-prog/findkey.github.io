import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Philosophy | Findkey",
  description:
    "Findkey exists to support clearer thinking and calmer communication by separating structural, empirical, incentive, and emotional claims.",
};

export default function PhilosophyPage() {
  return (
    <main className="w-full">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <header className="max-w-3xl">
          <h1 className="font-serif text-5xl leading-tight">Philosophy</h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">
            Findkey is infrastructure for reasoning.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-300">
            It does not tell readers what to think. It provides a consistent way
            to see what is being argued.
          </p>
          <div className="mt-10 h-px w-full bg-neutral-800" />
        </header>

        {/* Section: The Problem */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Orientation
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            Clarity before the conversation
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            Many public conversations fail for a simple reason: people argue at
            different layers without realizing it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Structural constraints are treated like opinions. Feelings are
            treated like evidence. Incentives are treated like virtue. And
            isolated facts are treated like conclusions.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Findkey exists to separate these layers so disagreement can be
            navigated with precision rather than escalation.
          </p>
        </section>

        <div className="mt-14 h-px w-full bg-neutral-800" />

        {/* Section: What Findkey Is */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Commitments
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            What Findkey is
          </h2>

          <ul className="mt-6 space-y-3 text-base leading-relaxed text-neutral-300 list-disc pl-5">
            <li>A structured protocol applied to live issues.</li>
            <li>
              A calm, repeatable format that improves clarity through
              consistency.
            </li>
            <li>
              A weekly case study archive that models disciplined reasoning in
              practice.
            </li>
            <li>
              A tool for curious professionals who want to see beyond headlines.
            </li>
          </ul>
        </section>

        <div className="mt-14 h-px w-full bg-neutral-800" />

        {/* Section: What Findkey Is Not */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Boundaries
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            What Findkey is not
          </h2>

          <ul className="mt-6 space-y-3 text-base leading-relaxed text-neutral-300 list-disc pl-5">
            <li>Not a news organization.</li>
            <li>Not commentary.</li>
            <li>Not ideological persuasion.</li>
            <li>Not debate coaching or social performance.</li>
            <li>Not a forum or discussion platform.</li>
          </ul>

          <p className="mt-6 text-base leading-relaxed text-neutral-300">
            The work is the diagram. What readers do with it is their choice.
          </p>
        </section>

        <div className="mt-14 h-px w-full bg-neutral-800" />

        {/* Section: Why Membership Exists */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Membership
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            Why membership exists
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            The methodology is transparent and self-contained. The value of
            membership is the consistent application of that methodology to live
            issues, week after week.
          </p>

          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            A recipe book is useful. A kitchen that cooks on a disciplined cadence
            creates habit, calibration, and compounding skill.
          </p>

          <p className="mt-6 text-base leading-relaxed text-neutral-300">
            If readers internalize the framework and eventually rely on it
            independently, that is success.
          </p>
        </section>

        <div className="mt-14 h-px w-full bg-neutral-800" />

        {/* Section: Tone + Standard */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Standard
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            Calm and quietly advantaged
          </h2>

          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            Findkey aims for a specific internal outcome: readers become calmer,
            clearer, and more difficult to manipulate.
          </p>

          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            The advantage is not rhetorical dominance. It is perceptual
            stability—seeing behind the curtain of how arguments are assembled.
          </p>

          <p className="mt-8 text-base leading-relaxed text-neutral-200">
            Clarity is not a posture.
          </p>
          <p className="mt-1 text-base leading-relaxed text-neutral-200">
            It is a practice.
          </p>
        </section>
      </div>
    </main>
  );
}
