/**
 * Research status.
 *
 * One active, unpublished study. Everything here is described as work in
 * progress: the method is fixed, the results are not in, and nothing is
 * claimed about the outcome. If it produces a paper or a public repository,
 * link it from `outputs` and move the entry into `past` with its real date.
 */

export const researchLastVerified = "2026-08-23"

export interface ResearchProject {
  title: string
  affiliation: string
  affiliationNote?: string
  role: string
  period: string
  /** Shown verbatim in the status readout. Keep it honest. */
  stage: string
  question: string
  summary: string
  /** What is actually being compared. No outcomes, only design. */
  design: string[]
  /** Guards against the failure modes that make tabular results meaningless. */
  rigour: string[]
  datasets: { name: string; href?: string }[]
  outputs: { label: string; href: string }[]
}

export const research = {
  status: "active" as const,
  statusLabel: "In progress, unpublished",
  headline: "One study, still running.",
  body: [
    "I am working on a reproducible study of training-time masking: whether deliberately hiding features during training makes classical tabular classifiers hold up when the data they meet later has gaps the training data did not.",
    "It is not published and there are no results to report yet. What exists is a fixed protocol and a working pipeline, which is the part worth being careful about, because tabular benchmarks are unusually easy to accidentally cheat at.",
  ],

  current: [
    {
      title: "Training-time masking for robust tabular classification",
      affiliation: "Thapar Institute of Engineering & Technology",
      /** External to the degree: the study runs at Thapar, the degree is at IIT Jodhpur. */
      affiliationNote: "External research project, alongside the degree at IIT Jodhpur",
      role: "Undergraduate researcher",
      /** No start year on record, so none is invented. Set it once you confirm the date. */
      period: "Ongoing",
      stage: "Protocol fixed, experiments running",
      question:
        "If a model will eventually see records with missing fields, does simulating that damage during training buy real robustness, or just a worse model?",
      summary:
        "A controlled comparison of masking strategies for classical tabular classification under synthetic missingness shift. The point is the protocol as much as the finding: same preprocessing, same splits, same model, with the masking regime as the only thing that varies.",
      design: [
        "Three training regimes compared: clean training, uniform feature masking, and structured block masking.",
        "Logistic Regression as the classifier, held fixed so the masking regime is the only moving part.",
        "Evaluation across both clean and masked test conditions, so a regime cannot look good by simply degrading everything equally.",
      ],
      rigour: [
        "Leakage-aware preprocessing: every transform is fitted on the training split only, never on the full dataset.",
        "Median imputation paired with explicit missingness indicators, so the model can distinguish an imputed value from an observed one.",
        "Standardization and one-hot encoding applied inside the same train-only discipline.",
        "Missingness is synthetic and controlled, which is what makes the shift measurable rather than anecdotal.",
      ],
      datasets: [
        { name: "Bank Marketing" },
        { name: "Online Shoppers Purchasing Intention" },
      ],
      outputs: [],
    },
  ] satisfies ResearchProject[],

  /**
   * Empty by design. Populate only with published, publicly linkable work,
   * keeping the original date and status.
   */
  past: [] as Array<{
    title: string
    year: string
    status: string
    summary: string
    href?: string
  }>,
}
