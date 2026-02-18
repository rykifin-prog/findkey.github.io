import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Method | Findkey",
  description:
    "Findkey applies a structured reasoning protocol to live issues: stakeholder mapping, the Four Truths framework, and historical context.",
};

export default function MethodPage() {
  return (
    <main className="w-full">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-4xl">
        {/* Hero */}
        <header className="max-w-3xl">
          <h1 className="font-serif text-5xl leading-tight">The Method</h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">
            Findkey applies a structured reasoning protocol to live issues.
            <br />
            The objective is not persuasion.
            <br />
            The objective is clarity.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-neutral-300">
            Before conclusions, we map structure.
          </p>
          <div className="mt-10 h-px w-full bg-neutral-800" />
        </header>

        {/* Section: Stakeholder Mapping */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Foundation
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            Stakeholder Mapping
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            Every issue affects different actors differently. Before evaluating
            arguments, we identify who is affected, who holds power, and how
            costs and benefits are distributed.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            This step prevents debate from becoming abstract. It makes the
            system legible.
          </p>

          <ul className="mt-6 space-y-2 text-base leading-relaxed text-neutral-300 list-disc pl-5">
            <li>Direct stakeholders</li>
            <li>Indirect stakeholders</li>
            <li>Decision-makers</li>
            <li>Cost bearers</li>
            <li>Beneficiaries</li>
          </ul>
        </section>

        <div className="mt-14 h-px w-full bg-neutral-800" />

        {/* Section: Four Truths */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Framework
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            The Four Truths
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            Public issues often blend multiple layers of reality. Findkey
            separates them into four categories to reduce conflation and improve
            clarity.
          </p>

          {/* Truth blocks */}
          <div className="mt-10 space-y-10">
            <div>
              <h3 className="text-xl font-semibold">Structural Truth</h3>
              <p className="mt-2 italic text-neutral-400">
                How the system actually works.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-300">
                Legal architecture, institutional rules, economic mechanics, and
                procedural constraints. This layer defines what is possible and
                what is not.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-800" />

            <div>
              <h3 className="text-xl font-semibold">Empirical Truth</h3>
              <p className="mt-2 italic text-neutral-400">
                What measurable evidence shows.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-300">
                Data, documented outcomes, and observable results. This layer
                distinguishes what has happened from what is assumed.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-800" />

            <div>
              <h3 className="text-xl font-semibold">Incentive Truth</h3>
              <p className="mt-2 italic text-neutral-400">
                Who benefits, who loses, and why.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-300">
                Incentives shape behavior. This layer identifies the rewards,
                risks, and constraints facing the major actors, and explains why
                patterns persist.
              </p>
            </div>

            <div className="h-px w-full bg-neutral-800" />

            <div>
              <h3 className="text-xl font-semibold">Emotional Truth</h3>
              <p className="mt-2 italic text-neutral-400">
                What people are feeling, and why it resonates.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-300">
                Narratives, identity, fear, hope, and perceived dignity. Emotion
                is not dismissed. It is identified as a distinct layer that
                shapes reaction and intensity.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-14 h-px w-full bg-neutral-800" />

        {/* Section: Historical Context */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Context
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            Historical Context
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            No issue emerges in isolation. Findkey situates each topic within
            precedent, prior policy cycles, technological shifts, and
            institutional evolution.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Historical context reduces present bias and clarifies whether a
            conflict is new, cyclical, or structural.
          </p>
        </section>

        <div className="mt-14 h-px w-full bg-neutral-800" />

        {/* Section: Why Structure Matters */}
        <section className="mt-14 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Application
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-snug">
            Why Structure Matters
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-300">
            Arguments collapse when layers are conflated. Data is mistaken for
            morality. Emotion is presented as evidence. Incentives are framed as
            virtue.
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Separating these layers reduces escalation, clarifies tradeoffs, and
            improves articulation without telling anyone what to think.
          </p>

          <p className="mt-8 text-base leading-relaxed text-neutral-200">
            The goal is not to win arguments.
          </p>
          <p className="mt-1 text-base leading-relaxed text-neutral-200">
            It is to understand what is actually being argued.
          </p>
        </section>
        </div>
      </div>
    </main>
  );
}
